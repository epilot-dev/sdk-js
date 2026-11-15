import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { RED, RESET } from './utils.js';

export type Profile = {
  /** Display name */
  name: string;
  /** Override server URL (e.g. http://localhost:3000, https://dev.epilot.cloud) */
  server?: string;
  /** Bearer token for this profile */
  token?: string;
  /** Org ID */
  org_id?: string;
  /** User ID */
  user_id?: string;
  /** Token expiry */
  expires_at?: string;
  /** Access profile the token was issued with (Agent Auth logins only, e.g. "read", "config:write") */
  access_profile?: string;
  /** Custom headers */
  headers?: Record<string, string>;
};

export type ProfileConfig = {
  /** Currently active profile name */
  active?: string;
  /** Named profiles */
  profiles: Record<string, Profile>;
  /** Global stage preference: 'prod' | 'dev' | 'staging' */
  stage?: string;
};

/** CLI config directory: `$XDG_CONFIG_HOME/epilot` or `~/.config/epilot`. */
export const getConfigDir = (): string => {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const base = xdgConfig || join(homedir(), '.config');
  return join(base, 'epilot');
};

const getProfilesPath = (): string => join(getConfigDir(), 'profiles.json');

/** Where the Agent Auth agent of a profile is stored (`agent-auth/agents/<profile>.json`). */
export const agentRecordPath = (profileKey: string): string =>
  join(getConfigDir(), 'agent-auth', 'agents', `${profileKey}.json`);

export const loadProfiles = (): ProfileConfig => {
  const path = getProfilesPath();
  if (!existsSync(path)) return { profiles: {} };
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as ProfileConfig;
  } catch {
    return { profiles: {} };
  }
};

export const saveProfiles = (config: ProfileConfig): void => {
  const dir = getConfigDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(getProfilesPath(), JSON.stringify(config, null, 2), { mode: 0o600 });
};

/**
 * Resolve the effective profile name.
 *
 * Priority:
 * 1. --profile flag (passed explicitly)
 * 2. EPILOT_PROFILE env var
 * 3. Active profile from config
 * 4. "default" if it exists
 */
export const resolveProfileName = (flagProfile?: string): string | null => {
  if (flagProfile) return flagProfile;
  if (process.env.EPILOT_PROFILE) return process.env.EPILOT_PROFILE;
  const config = loadProfiles();
  if (config.active) return config.active;
  if (config.profiles.default) return 'default';
  return null;
};

/** The profile named explicitly with --profile or EPILOT_PROFILE (not the active or default one). */
export const explicitProfileName = (flagProfile?: string): string | undefined =>
  flagProfile || process.env.EPILOT_PROFILE || undefined;

/**
 * True when the profile is in profiles.json, or an Agent Auth agent is stored for it
 * (an `auth login --agent --profile` whose organization is not chosen yet).
 */
export const profileExists = (name: string): boolean =>
  Boolean(loadProfiles().profiles[name]) || existsSync(agentRecordPath(name));

export class ProfileNotFoundError extends Error {
  constructor(readonly profileName: string) {
    super(`Profile "${profileName}" not found. Create it with: epilot profile create ${profileName} --token …`);
    this.name = 'ProfileNotFoundError';
  }
}

/**
 * Exit 1 when a profile is named explicitly (--profile / EPILOT_PROFILE) but does not exist, so a
 * command never falls back to another token (e.g. the default login in credentials.json, possibly
 * another organization). Throws ProfileNotFoundError should `process.exit` return (stubbed in tests).
 */
export const ensureExplicitProfileExists = (flagProfile?: string): void => {
  const name = explicitProfileName(flagProfile);
  if (!name || profileExists(name)) return;
  const error = new ProfileNotFoundError(name);
  process.stderr.write(`${RED}${error.message}${RESET}\n`);
  process.exit(1);
  throw error;
};

/**
 * Get the resolved profile (from --profile flag, env, or active).
 */
export const getResolvedProfile = (flagProfile?: string): Profile | null => {
  const name = resolveProfileName(flagProfile);
  if (!name) return null;
  const config = loadProfiles();
  return config.profiles[name] ?? null;
};

export const getActiveProfile = (): Profile | null => {
  return getResolvedProfile();
};

export const setActiveProfile = (name: string): boolean => {
  const config = loadProfiles();
  if (!config.profiles[name]) return false;
  config.active = name;
  saveProfiles(config);
  return true;
};

export const upsertProfile = (name: string, profile: Partial<Profile>): void => {
  const config = loadProfiles();
  config.profiles[name] = { name, ...config.profiles[name], ...profile };
  saveProfiles(config);
};

export const deleteProfile = (name: string): boolean => {
  const config = loadProfiles();
  if (!config.profiles[name]) return false;
  delete config.profiles[name];
  if (config.active === name) config.active = undefined;
  saveProfiles(config);
  return true;
};

export const getStage = (): string | undefined => {
  const config = loadProfiles();
  return config.stage;
};

export const setStage = (stage: string | undefined): void => {
  const config = loadProfiles();
  config.stage = stage;
  saveProfiles(config);
};

export const listProfiles = (): { name: string; profile: Profile; active: boolean }[] => {
  const config = loadProfiles();
  return Object.entries(config.profiles).map(([name, profile]) => ({
    name,
    profile,
    active: config.active === name,
  }));
};
