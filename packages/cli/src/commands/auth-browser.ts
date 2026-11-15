import { defineCommand } from 'citty';
import { resolveTokenAsync } from '../lib/auth-store.js';
import { type Environment, getPortalUrl } from '../lib/environment.js';
import { isInteractive } from '../lib/interactive.js';
import { getStage } from '../lib/profiles.js';
import { BOLD, CYAN, DIM, RED, RESET, YELLOW } from '../lib/utils.js';

/** Portal route that turns the token in the URL fragment into a browser session (epilot360-login). */
export const CLI_SESSION_PATH = '/cli-session';

/**
 * Token types without a person behind them. `api` covers user-created API tokens and Agent Auth tokens:
 * their user id is the token id, so the portal cannot load a user for them.
 */
const NON_PERSON_TOKEN_TYPES = new Set(['api', 'journey', 'portal', 'portal_preview', 'contact_identification']);

type Claims = {
  exp?: number;
  iss?: string;
  token_type?: string;
  user_id?: string;
  org_id?: string;
  email?: string;
  read_only?: boolean;
  anonymize?: boolean;
  'custom:ivy_user_id'?: string;
  'custom:ivy_org_id'?: string;
};

export type BrowserSessionTokenCheck =
  | { ok: true; claims: Claims; expiresAt?: Date }
  | { ok: false; reason: 'invalid' | 'expired' | 'no_user' };

const decodeClaims = (token: string): Claims | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
    return claims && typeof claims === 'object' ? (claims as Claims) : null;
  } catch {
    return null;
  }
};

/** Mirrors auth-service's `parseTokenSessionClaims`: only person-bound, unexpired JWTs can back a portal session. */
export const checkBrowserSessionToken = (token: string, now: number = Date.now()): BrowserSessionTokenCheck => {
  const claims = decodeClaims(token);
  if (!claims) return { ok: false, reason: 'invalid' };

  const expiresAt = typeof claims.exp === 'number' ? new Date(claims.exp * 1000) : undefined;
  if (expiresAt && expiresAt.getTime() <= now) return { ok: false, reason: 'expired' };

  const userId = claims['custom:ivy_user_id'] ?? claims.user_id;
  const orgId = claims['custom:ivy_org_id'] ?? claims.org_id;
  if (!userId || !orgId || (claims.token_type && NON_PERSON_TOKEN_TYPES.has(claims.token_type))) {
    return { ok: false, reason: 'no_user' };
  }

  return { ok: true, claims, expiresAt };
};

/**
 * Same-origin, path-absolute only (`/app/...`). Anything else is dropped so the URL can never point the portal
 * somewhere else; the portal enforces the same rule.
 */
export const normalizePortalPath = (path?: string): string | undefined => {
  if (!path) return undefined;
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  if (withSlash.startsWith('//') || withSlash.includes('\\')) return undefined;
  return withSlash;
};

/**
 * The token goes into the URL fragment, which browsers never send to a server: it stays out of
 * CDN/access logs and Referer headers. The portal strips it from the address bar on load.
 */
export const buildBrowserSessionUrl = (portalUrl: string, token: string, path?: string): string => {
  const fragment = new URLSearchParams({ token });
  const redirect = normalizePortalPath(path);
  if (redirect) fragment.set('redirect', redirect);
  return `${portalUrl}${CLI_SESSION_PATH}#${fragment.toString()}`;
};

const STAGE_TO_ENV: Record<string, Environment> = { prod: 'production', staging: 'staging', dev: 'dev' };

const resolvePortalEnvironment = (args: { 'use-dev'?: boolean; 'use-staging'?: boolean }): Environment => {
  if (args['use-dev']) return 'dev';
  if (args['use-staging']) return 'staging';
  return STAGE_TO_ENV[getStage() ?? 'prod'] ?? 'production';
};

const formatRemaining = (expiresAt: Date, now: number = Date.now()): string => {
  const minutes = Math.max(0, Math.round((expiresAt.getTime() - now) / 60000));
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 60 * 48) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  return `${Math.floor(minutes / 1440)} days`;
};

const REASON_MESSAGES: Record<'invalid' | 'expired' | 'no_user', string> = {
  invalid: 'The stored token is not a valid JWT.',
  expired: 'The stored token has expired.',
  no_user:
    'This token is not bound to a user (API and agent tokens cannot open a portal session). Log in with your user account first.',
};

export default defineCommand({
  meta: {
    name: 'browser',
    description: 'Open the epilot portal in your browser, signed in with the CLI token',
  },
  args: {
    path: {
      type: 'positional',
      required: false,
      description: 'Portal path to open after sign-in (e.g. /app/entity/contact)',
    },
    open: {
      type: 'boolean',
      description: 'Open the browser without asking (--no-open: only print the URL)',
    },
    json: { type: 'boolean', description: 'Print {"url", "expires_at"} as JSON' },
    interactive: { type: 'boolean', default: true, description: 'Prompt before opening the browser' },
    token: { type: 'string', alias: 't', description: 'Token to use instead of the stored one' },
    profile: { type: 'string', description: 'Profile whose token to use (or EPILOT_PROFILE env)' },
    'use-dev': { type: 'boolean', description: 'Use dev environment (portal.dev.epilot.cloud)' },
    'use-staging': { type: 'boolean', description: 'Use staging environment (portal.staging.epilot.cloud)' },
  },
  run: async ({ args }) => {
    const profileName = args.profile || process.env.EPILOT_PROFILE;
    const token = await resolveTokenAsync(args.token, profileName);

    if (!token) {
      process.stderr.write(`${RED}Not authenticated.${RESET}\n`);
      process.stderr.write(`Run ${BOLD}epilot auth login${RESET} first.\n`);
      process.exit(1);
      return;
    }

    const check = checkBrowserSessionToken(token);
    if (!check.ok) {
      process.stderr.write(`${RED}Cannot open a browser session: ${REASON_MESSAGES[check.reason]}${RESET}\n`);
      process.stderr.write(`Run ${BOLD}epilot auth login${RESET} to get a user token.\n`);
      process.exit(1);
      return;
    }

    const portalUrl = getPortalUrl(resolvePortalEnvironment(args));
    const url = buildBrowserSessionUrl(portalUrl, token, args.path as string | undefined);

    if (args.json) {
      process.stdout.write(`${JSON.stringify({ url, expires_at: check.expiresAt?.toISOString() ?? null })}\n`);
    } else {
      // The URL is the only thing on stdout, so `epilot auth browser | pbcopy` and `$(epilot auth browser)` work.
      process.stdout.write(`${url}\n`);
    }

    // Everything for humans goes to stderr.
    const { claims, expiresAt } = check;
    const modes = [claims.read_only && 'read-only', claims.anonymize && 'anonymized'].filter(Boolean);
    process.stderr.write(
      `\n${YELLOW}This URL signs the browser in as you${modes.length ? ` (${modes.join(', ')})` : ''}. Treat it like a password: do not share or paste it.${RESET}\n`,
    );
    if (expiresAt) {
      process.stderr.write(
        `${DIM}The browser session ends with the CLI token at ${expiresAt.toISOString()} (in ${formatRemaining(expiresAt)}).${RESET}\n`,
      );
    }

    const canPrompt =
      isInteractive({ interactive: args.interactive }) && !!process.stdin.isTTY && !!process.stderr.isTTY;
    let shouldOpen = args.open === true;
    if (args.open === undefined && canPrompt && !args.json) {
      const { confirm } = await import('@inquirer/prompts');
      try {
        shouldOpen = await confirm({ message: 'Open in your browser?', default: true }, { output: process.stderr });
      } catch {
        shouldOpen = false; // Ctrl+C: the URL is already printed
      }
    }

    if (!shouldOpen) return;

    try {
      const open = (await import('open')).default;
      await open(url);
      process.stderr.write(`${CYAN}Browser opened.${RESET} Confirm the session there.\n`);
    } catch {
      process.stderr.write(`${YELLOW}Could not open the browser. Open the URL above manually.${RESET}\n`);
    }
  },
});
