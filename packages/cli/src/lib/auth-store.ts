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

export const loadCredentials = (): Credentials | null => {
  const path = getCredentialsPath();
  if (!existsSync(path)) return null;

  try {
    const raw = readFileSync(path, 'utf-8');
    const creds = JSON.parse(raw) as Credentials;

    if (creds.expires_at) {
      const expiry = new Date(creds.expires_at);
      if (expiry < new Date()) return null;
    }

    return creds;
  } catch {
    return null;
  }
};

/**
 * Save credentials. If a profile is active, store into the profile.
 * Also saves to legacy credentials.json for backwards compat.
 */
export const saveCredentials = (creds: Credentials, profileName?: string): void => {
  // Save to profile if one is specified or active
  const targetProfile = profileName || resolveProfileName();
  if (targetProfile) {
    upsertProfile(targetProfile, {
      token: creds.token,
      org_id: creds.org_id,
      user_id: creds.user_id,
      expires_at: creds.expires_at,
      access_profile: creds.access_profile,
    });
  }

  // Also save to legacy credentials.json
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

/**
 * Resolve token from multiple sources.
 *
 * Priority:
 * 1. --token flag
 * 2. EPILOT_TOKEN env var
 * 3. Active/selected profile token
 * 4. Legacy credentials.json
 */
export const resolveToken = (flagToken?: string, flagProfile?: string): string | null => {
  if (flagToken) return flagToken;

  const envToken = process.env.EPILOT_TOKEN;
  if (envToken) return envToken;

  // Check profile (resolves from --profile flag, EPILOT_PROFILE env, or active)
  const profile = getResolvedProfile(flagProfile);
  if (profile?.token) {
    // Check profile token expiry
    if (profile.expires_at) {
      const expiry = new Date(profile.expires_at);
      if (expiry < new Date()) return null;
    }
    return profile.token;
  }

  // Fallback to legacy credentials
  const creds = loadCredentials();
  return creds?.token ?? null;
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
