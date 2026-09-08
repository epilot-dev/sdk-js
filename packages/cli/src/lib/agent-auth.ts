/**
 * Agent Auth Protocol support for the CLI: host/agent key storage under
 * ~/.config/epilot/agent-auth/, client construction, token issuance and
 * silent refresh.
 *
 * - Host  = this machine (one key pair, `agent-auth/host.json`).
 * - Agent = one per profile (`agent-auth/agents/<profile|default>.json`).
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  type AgentIdentity,
  AgentAuthClient,
  AgentAuthError,
  type Ed25519Jwk,
  type EpilotIssuedAccessToken,
  type KeyPair,
  epilotAgentAuthIssuer,
  generateKeyPair,
  issueEpilotAccessToken,
  keyPairFromPrivateJwk,
} from '@epilot/agent-auth';
import { type Credentials, saveCredentials } from './auth-store.js';
import type { Environment } from './environment.js';
import { getConfigDir, getResolvedProfile, resolveProfileName } from './profiles.js';
import { BOLD, RESET, YELLOW } from './utils.js';

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

// ─── Token issuance & refresh ────────────────────────────────────────────────

export type IssueTokenOptions = {
  readOnly?: boolean;
  anonymize?: boolean;
  /** Profile to store the credentials in (same resolution as `epilot auth login --profile`). */
  profileName?: string;
};

/**
 * Issue an epilot access token for an organization through the agent and
 * persist it exactly where `epilot auth login` stores credentials. Also
 * remembers the organization/access level on the agent record for refresh.
 */
export const issueTokenForOrg = async (
  loaded: LoadedAgentIdentity,
  orgId: string,
  options: IssueTokenOptions = {},
): Promise<EpilotIssuedAccessToken> => {
  const issued = await issueEpilotAccessToken(loaded.client, loaded.identity, {
    organization_id: orgId,
    ...(options.readOnly !== undefined ? { read_only: options.readOnly } : {}),
    ...(options.anonymize !== undefined ? { anonymize: options.anonymize } : {}),
  });

  const creds: Credentials = {
    token: issued.token,
    org_id: issued.organization_id ?? orgId,
    user_id: issued.user_id,
    expires_at: issued.expires_at,
    ...(issued.email ? { name: issued.email } : {}),
  };
  saveCredentials(creds, options.profileName);

  saveAgentRecord(
    {
      ...loaded.record,
      org_id: creds.org_id,
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
 * organization and store it. Returns the valid token, or null when the
 * profile has no agent or no organization to issue for.
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
  process.stderr.write(`Run ${BOLD}epilot auth login${RESET} to authenticate again.\n`);
};
