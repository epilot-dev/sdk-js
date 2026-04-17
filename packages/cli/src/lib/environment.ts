export type Environment = 'production' | 'staging' | 'dev';

export const PORTAL_URLS: Record<Environment, string> = {
  production: 'https://portal.epilot.cloud',
  staging: 'https://portal.staging.epilot.cloud',
  dev: 'https://portal.dev.epilot.cloud',
};

export const getPortalUrl = (env: Environment = 'production'): string => {
  return PORTAL_URLS[env];
};

export const resolveEnvironment = (useDev?: boolean, useStaging?: boolean): Environment => {
  if (useDev) return 'dev';
  if (useStaging) return 'staging';
  return 'production';
};
