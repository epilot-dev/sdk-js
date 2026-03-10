import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

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
  /** Custom headers */
  headers?: Record<string, string>;
};

export type ProfileConfig = {
  /** Currently active profile name */
  active?: string;
  /** Named profiles */
  profiles: Record<string, Profile>;
};

const getConfigDir = (): string => {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const base = xdgConfig || join(homedir(), '.config');
  return join(base, 'epilot');
};

const getProfilesPath = (): string => join(getConfigDir(), 'profiles.json');

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

export const listProfiles = (): { name: string; profile: Profile; active: boolean }[] => {
  const config = loadProfiles();
  return Object.entries(config.profiles).map(([name, profile]) => ({
    name,
    profile,
    active: config.active === name,
  }));
};
