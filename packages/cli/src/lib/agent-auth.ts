/**
 * Agent Auth Protocol support for the CLI (opt-in via `epilot auth login --agent`):
 * host/agent key storage under ~/.config/epilot/agent-auth/, client construction,
 * token issuance and silent refresh.
 *
 * - Host  = this machine (one key pair, `agent-auth/host.json`).
 * - Agent = one per profile (`agent-auth/agents/<profile|default>.json`).
 *
 * Profiles without an agent record (plain browser login, `--token`, `auth token`)
 * are never touched by anything in here.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  type AccessProfile,
  type AgentIdentity,
  AgentAuthClient,
  AgentAuthError,
  type Ed25519Jwk,
  type EpilotIssuedAccessToken,
  type KeyPair,
  epilotAgentAuthIssuer,
  generateKeyPair,
  isAccessProfile,
  issueEpilotAccessToken,
  keyPairFromPrivateJwk,
} from '@epilot/agent-auth';
import { type Credentials, saveCredentials } from './auth-store.js';
import type { Environment } from './environment.js';
import { getConfigDir, getResolvedProfile, resolveProfileName } from './profiles.js';
import { BOLD, DIM, RESET, YELLOW } from './utils.js';

export type HostRecord = {
  privateKey: Ed25519Jwk;
  thumbprint: string;
  created_at: string;
};

export type AgentRecord = {
  agent_id: string;
  host_id: string;
  privateKey: Ed25519Jwk;
  issuer: string;
  name: string;
  created_at: string;
  /** Organization the current token was issued for (used for silent refresh). */
  org_id?: string;
  /** Access profile the current token was issued with (re-used on refresh). */
  access_profile?: AccessProfile;
  /** Access level the current token was issued with (re-used on refresh). */
  read_only?: boolean;
  anonymize?: boolean;
};

export type LoadedAgentIdentity = {
  identity: AgentIdentity;
  record: AgentRecord;
  client: AgentAuthClient;
  /** Storage key: the resolved profile name, or "default". */
  profileKey: string;
};

/** Refresh when the token is missing or expires within this window. */
export const REFRESH_WINDOW_MS = 2 * 60 * 1000;

const agentAuthDir = (): string => join(getConfigDir(), 'agent-auth');
const hostPath = (): string => join(agentAuthDir(), 'host.json');
const agentsDir = (): string => join(agentAuthDir(), 'agents');

/** Storage key for the agent of a profile. */
export const agentProfileKey = (profileName?: string): string => resolveProfileName(profileName) ?? 'default';

export const agentPath = (profileName?: string): string => join(agentsDir(), `${agentProfileKey(profileName)}.json`);

const readJson = <T>(path: string): T | null => {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as T;
  } catch {
    return null;
  }
};

const writeSecret = (path: string, value: unknown): void => {
  mkdirSync(join(path, '..'), { recursive: true, mode: 0o700 });
  writeFileSync(path, JSON.stringify(value, null, 2), { mode: 0o600 });
};

// ─── Host key ────────────────────────────────────────────────────────────────

export const loadHostKey = (): KeyPair | null => {
  const record = readJson<HostRecord>(hostPath());
  if (!record?.privateKey?.d) return null;
  try {
    return keyPairFromPrivateJwk(record.privateKey);
  } catch {
    return null;
  }
};

/** Load the host key for this machine, creating it on first use. */
export const ensureHostKey = (): KeyPair => {
  const existing = loadHostKey();
  if (existing) return existing;
  const key = generateKeyPair();
  const record: HostRecord = {
    privateKey: key.privateKey,
    thumbprint: key.thumbprint,
    created_at: new Date().toISOString(),
  };
  writeSecret(hostPath(), record);
  return key;
};

// ─── Agent records ───────────────────────────────────────────────────────────

export const loadAgentRecord = (profileName?: string): AgentRecord | null => {
  const record = readJson<AgentRecord>(agentPath(profileName));
  return record?.agent_id && record.privateKey?.d ? record : null;
};

export const saveAgentRecord = (record: AgentRecord, profileName?: string): void => {
  writeSecret(agentPath(profileName), record);
};

export const deleteAgentRecord = (profileName?: string): boolean => {
  const path = agentPath(profileName);
  if (!existsSync(path)) return false;
  rmSync(path);
  return true;
};

// ─── Client ──────────────────────────────────────────────────────────────────

/** Issuer for an environment; `EPILOT_AGENT_AUTH_ISSUER` overrides (useful for local servers). */
export const resolveAgentAuthIssuer = (env: Environment = 'production'): string =>
  process.env.EPILOT_AGENT_AUTH_ISSUER || epilotAgentAuthIssuer(env);

export const getAgentAuthClient = (envOrIssuer: Environment | string = 'production'): AgentAuthClient => {
  const baseUrl = /^https?:\/\//.test(envOrIssuer) ? envOrIssuer : resolveAgentAuthIssuer(envOrIssuer as Environment);
  return new AgentAuthClient({ baseUrl });
};

/** Load the agent identity (keys + client) stored for a profile, or null when the profile has no agent. */
export const loadAgentIdentity = (profileName?: string): LoadedAgentIdentity | null => {
  const record = loadAgentRecord(profileName);
  const hostKey = loadHostKey();
  if (!record || !hostKey) return null;
  try {
    const agentKey = keyPairFromPrivateJwk(record.privateKey);
    return {
      identity: { hostKey, agentKey, agentId: record.agent_id },
      record,
      client: getAgentAuthClient(record.issuer),
      profileKey: agentProfileKey(profileName),
    };
  } catch {
    return null;
  }
};

/**
 * A plain login (browser callback, `--token`, `auth token`) supersedes an agent
 * that was registered for the same profile: revoke it (best effort) and forget
 * it locally, so the silent refresh never replaces the plain token.
 */
export const forgetAgentForProfile = async (
  profileName: string | undefined,
  out: (s: string) => void = (s) => process.stdout.write(s),
): Promise<boolean> => {
  const loaded = loadAgentIdentity(profileName);
  if (!loaded) return false;
  try {
    await loaded.client.revokeAgent(loaded.identity.hostKey, loaded.identity.agentId);
    out(`${DIM}Agent ${loaded.record.agent_id} from a previous --agent login revoked.${RESET}\n`);
  } catch (error) {
    const reason = error instanceof AgentAuthError ? error.code : 'error';
    out(`${DIM}Could not revoke agent ${loaded.record.agent_id} (${reason}); removing it locally.${RESET}\n`);
  }
  deleteAgentRecord(profileName);
  return true;
};

// ─── Token issuance & refresh ────────────────────────────────────────────────

export type IssueTokenOptions = {
  /** Access profile to issue under; defaults to the matched grant's profile server-side. */
  profile?: AccessProfile;
  readOnly?: boolean;
  anonymize?: boolean;
  /** Profile to store the credentials in (same resolution as `epilot auth login --profile`). */
  profileName?: string;
};

/**
 * Issue an epilot access token for an organization through the agent and
 * persist it exactly where `epilot auth login` stores credentials. Also
 * remembers the organization/profile/access level on the agent record for refresh.
 */
export const issueTokenForOrg = async (
  loaded: LoadedAgentIdentity,
  orgId: string,
  options: IssueTokenOptions = {},
): Promise<EpilotIssuedAccessToken> => {
  const issued = await issueEpilotAccessToken(loaded.client, loaded.identity, {
    organization_id: orgId,
    ...(options.profile !== undefined ? { access_profile: options.profile } : {}),
    ...(options.readOnly !== undefined ? { read_only: options.readOnly } : {}),
    ...(options.anonymize !== undefined ? { anonymize: options.anonymize } : {}),
  });

  const accessProfile = isAccessProfile(issued.access_profile) ? issued.access_profile : options.profile;
  const creds: Credentials = {
    token: issued.token,
    org_id: issued.organization_id ?? orgId,
    user_id: issued.user_id,
    expires_at: issued.expires_at,
    ...(accessProfile ? { access_profile: accessProfile } : {}),
    ...(issued.email ? { name: issued.email } : {}),
  };
  saveCredentials(creds, options.profileName);

  saveAgentRecord(
    {
      ...loaded.record,
      org_id: creds.org_id,
      access_profile: accessProfile,
      read_only: issued.read_only ?? options.readOnly,
      anonymize: issued.anonymize ?? options.anonymize,
    },
    options.profileName,
  );
  return issued;
};

const expiresSoon = (expiresAt?: string): boolean => {
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt).getTime();
  return Number.isNaN(expiry) || expiry - Date.now() < REFRESH_WINDOW_MS;
};

/**
 * Silent refresh: when the resolved profile has an agent identity and its
 * token is missing or about to expire, issue a fresh token for the profile's
 * organization (same access profile as before) and store it. Returns the
 * valid token, or null when the profile has no agent or no organization to
 * issue for.
 *
 * Throws AgentAuthError when issuance fails (e.g. agent_revoked).
 */
export const refreshTokenIfNeeded = async (flagProfile?: string): Promise<string | null> => {
  const loaded = loadAgentIdentity(flagProfile);
  if (!loaded) return null;

  const profile = getResolvedProfile(flagProfile);
  const current = profile?.token ? profile : loadStoredCredentials();
  if (current?.token && !expiresSoon(current.expires_at)) return current.token;

  const orgId = current?.org_id ?? loaded.record.org_id;
  if (!orgId) return null;

  const issued = await issueTokenForOrg(loaded, orgId, {
    profile: loaded.record.access_profile,
    readOnly: loaded.record.read_only,
    anonymize: loaded.record.anonymize,
    profileName: flagProfile,
  });
  return issued.token;
};

/** Read credentials.json without the expiry filter (the refresh needs the org id of an expired token). */
const loadStoredCredentials = (): Credentials | null => readJson<Credentials>(join(getConfigDir(), 'credentials.json'));

/** Codes after which the agent cannot be used anymore and the user has to log in again. */
export const isAgentGoneError = (error: unknown): error is AgentAuthError =>
  error instanceof AgentAuthError &&
  ['agent_revoked', 'agent_expired', 'agent_rejected', 'agent_not_found', 'host_revoked'].includes(error.code);

export const printLoginAgainHint = (error: AgentAuthError): void => {
  process.stderr.write(`${YELLOW}Agent session is no longer valid (${error.code}).${RESET} `);
  process.stderr.write(`Run ${BOLD}epilot auth login --agent${RESET} to authenticate again.\n`);
};

// ─── Formatting ──────────────────────────────────────────────────────────────

/** "expires in 23h" / "expires in 6d" / "expires in 12m" / "expired" for an ISO timestamp. */
export const formatExpiresIn = (expiresAt: string | undefined, now = Date.now()): string | undefined => {
  if (!expiresAt) return undefined;
  const diffMs = new Date(expiresAt).getTime() - now;
  if (Number.isNaN(diffMs)) return undefined;
  if (diffMs <= 0) return 'expired';
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `expires in ${Math.max(1, minutes)}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `expires in ${hours}h`;
  return `expires in ${Math.floor(hours / 24)}d`;
};
