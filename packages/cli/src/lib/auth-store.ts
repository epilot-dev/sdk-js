import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { getResolvedProfile, upsertProfile, resolveProfileName } from './profiles.js';

export type Credentials = {
  token: string;
  org_id?: string;
  user_id?: string;
  name?: string;
  expires_at?: string;
  /** Access profile the token was issued with (Agent Auth logins only). */
  access_profile?: string;
};

const getConfigDir = (): string => {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const base = xdgConfig || join(homedir(), '.config');
  return join(base, 'epilot');
};

const getCredentialsPath = (): string => {
  return join(getConfigDir(), 'credentials.json');
};

/** Read credentials.json without the expiry filter. */
const readStoredCredentials = (): Credentials | null => {
  const path = getCredentialsPath();
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as Credentials;
  } catch {
    return null;
  }
};

/** True when `expiresAt` is a valid timestamp in the past. */
export const isTokenExpired = (expiresAt?: string): boolean =>
  Boolean(expiresAt) && new Date(expiresAt as string).getTime() < Date.now();

export const loadCredentials = (): Credentials | null => {
  const creds = readStoredCredentials();
  return creds && !isTokenExpired(creds.expires_at) ? creds : null;
};

/**
 * Decode a JWT payload without verifying the signature.
 * Returns null if the token is not a JWT.
 */
export const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
    return payload && typeof payload === 'object' ? payload : null;
  } catch {
    return null;
  }
};

const claimString = (value: unknown): string | undefined =>
  typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;

/**
 * Non-secret metadata read from the token's JWT claims (not verified): org, user and expiry.
 * Fields are undefined for opaque tokens or missing claims.
 */
export const credentialsFromToken = (token: string): Credentials => {
  const claims = decodeJwtPayload(token);
  return {
    token,
    org_id: claimString(claims?.org_id ?? claims?.['custom:ivy_org_id']),
    user_id: claimString(claims?.user_id ?? claims?.['custom:ivy_user_id']),
    expires_at: typeof claims?.exp === 'number' ? new Date(claims.exp * 1000).toISOString() : undefined,
  };
};

/**
 * Save credentials. Org, user and expiry not passed explicitly are taken from the token's JWT claims.
 *
 * - Named profile (`profileName` or EPILOT_PROFILE): stored only in that profile. The default login in
 *   credentials.json is left untouched, so e.g. a short-lived "login as" token never replaces your own login.
 * - Otherwise: stored in the active profile (if any) and in the legacy credentials.json.
 */
export const saveCredentials = (input: Credentials, profileName?: string): void => {
  const fromToken = credentialsFromToken(input.token);
  const creds: Credentials = {
    ...input,
    org_id: input.org_id ?? fromToken.org_id,
    user_id: input.user_id ?? fromToken.user_id,
    expires_at: input.expires_at ?? fromToken.expires_at,
  };

  const namedProfile = profileName || process.env.EPILOT_PROFILE;
  const targetProfile = namedProfile || resolveProfileName();
  if (targetProfile) {
    upsertProfile(targetProfile, {
      token: creds.token,
      org_id: creds.org_id,
      user_id: creds.user_id,
      expires_at: creds.expires_at,
      access_profile: creds.access_profile,
    });
  }
  if (namedProfile) return;

  // Default login: also save to legacy credentials.json
  const dir = getConfigDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(getCredentialsPath(), JSON.stringify(creds, null, 2), { mode: 0o600 });
};

export const removeCredentials = (): boolean => {
  const path = getCredentialsPath();
  if (!existsSync(path)) return false;
  unlinkSync(path);
  return true;
};

export type TokenSource = 'flag' | 'env' | 'profile' | 'credentials';

export type ResolvedToken = {
  source: TokenSource;
  /** Profile the token is stored in (source "profile"). */
  profileName?: string;
  /** Stored credentials, including expired ones. Flag/env tokens only carry the token. */
  creds: Credentials;
};

/**
 * Find the token a command would use and where it comes from, without filtering
 * expired stored tokens (see `resolveToken`).
 *
 * Priority:
 * 1. --token flag
 * 2. EPILOT_TOKEN env var
 * 3. Active/selected profile token
 * 4. Legacy credentials.json
 */
export const resolveTokenSource = (flagToken?: string, flagProfile?: string): ResolvedToken | null => {
  if (flagToken) return { source: 'flag', creds: { token: flagToken } };

  const envToken = process.env.EPILOT_TOKEN;
  if (envToken) return { source: 'env', creds: { token: envToken } };

  // Check profile (resolves from --profile flag, EPILOT_PROFILE env, or active)
  const profile = getResolvedProfile(flagProfile);
  if (profile?.token) {
    return {
      source: 'profile',
      profileName: resolveProfileName(flagProfile) ?? profile.name,
      creds: {
        token: profile.token,
        org_id: profile.org_id,
        user_id: profile.user_id,
        expires_at: profile.expires_at,
        access_profile: profile.access_profile,
      },
    };
  }

  // Fallback to legacy credentials
  const creds = readStoredCredentials();
  return creds?.token ? { source: 'credentials', creds } : null;
};

/**
 * Resolve token from multiple sources (see `resolveTokenSource`).
 * An expired stored token resolves to null; it never falls through to another source.
 */
export const resolveToken = (flagToken?: string, flagProfile?: string): string | null => {
  const resolved = resolveTokenSource(flagToken, flagProfile);
  if (!resolved || isTokenExpired(resolved.creds.expires_at)) return null;
  return resolved.creds.token;
};

/**
 * When the token a command would use is stored and expired, a message saying so and
 * how to get going again. Null otherwise.
 */
export const describeExpiredToken = (flagToken?: string, flagProfile?: string): string | null => {
  const resolved = resolveTokenSource(flagToken, flagProfile);
  if (!resolved || !isTokenExpired(resolved.creds.expires_at)) return null;
  if (resolved.source === 'profile') {
    return (
      `Token of profile "${resolved.profileName}" expired at ${resolved.creds.expires_at} — request a new one ` +
      `and store it with: epilot auth token --profile ${resolved.profileName} <token>`
    );
  }
  return `Stored token expired at ${resolved.creds.expires_at} — request a new one or run: epilot auth login`;
};

/**
 * Like `resolveToken`, but silently refreshes the token first when the
 * resolved profile has an Agent Auth identity and its token is missing or
 * about to expire. Flags and env vars still win. Profiles without an agent
 * (plain `epilot auth login`, `--token`, `auth token`) are untouched.
 */
export const resolveTokenAsync = async (flagToken?: string, flagProfile?: string): Promise<string | null> => {
  if (flagToken) return flagToken;
  if (process.env.EPILOT_TOKEN) return process.env.EPILOT_TOKEN;

  const { refreshTokenIfNeeded, isAgentGoneError, printLoginAgainHint } = await import('./agent-auth.js');
  try {
    const refreshed = await refreshTokenIfNeeded(flagProfile);
    if (refreshed) return refreshed;
  } catch (error) {
    if (isAgentGoneError(error)) printLoginAgainHint(error);
    // Any other failure (network, server) falls back to whatever token is stored.
  }

  return resolveToken(flagToken, flagProfile);
};
