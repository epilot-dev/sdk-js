import { defineCommand } from 'citty';
import { createHash, randomInt } from 'node:crypto';
import { resolveTokenAsync } from '../lib/auth-store.js';
import { type Environment, getPortalUrl } from '../lib/environment.js';
import { isInteractive } from '../lib/interactive.js';
import { getStage } from '../lib/profiles.js';
import { BOLD, CYAN, DIM, RED, RESET, YELLOW } from '../lib/utils.js';

/** Portal route that turns the token in the URL fragment into a browser session (epilot360-login). */
export const CLI_SESSION_PATH = '/cli-session';

/**
 * Token types that can back a portal session (mirrors auth-service): Cognito tokens have no `token_type`,
 * `assume` tokens are a user's own restricted token, `api` covers API tokens and Agent Auth tokens. Customer-facing
 * and preview tokens (portal, journey, portal_preview, contact_identification, app) never.
 */
const SESSION_TOKEN_TYPES = new Set(['assume', 'api']);

/** Mirrors auth-service TOKEN_SESSION_MAX_SECONDS: a browser session never outlasts this, whatever the token. */
export const BROWSER_SESSION_MAX_MS = 8 * 60 * 60 * 1000;

type Claims = {
  exp?: number;
  iss?: string;
  token_type?: string;
  user_id?: string;
  org_id?: string;
  email?: string;
  token_name?: string;
  actor?: { type?: string; agent_name?: string; host_name?: string };
  read_only?: boolean;
  anonymize?: boolean;
  'custom:ivy_user_id'?: string;
  'custom:ivy_org_id'?: string;
};

export type BrowserSessionTokenCheck =
  | { ok: true; claims: Claims; expiresAt?: Date; sessionEndsAt: Date }
  | { ok: false; reason: 'invalid' | 'expired' | 'no_user' | 'unsupported' };

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

/** Mirrors auth-service's `parseTokenSessionClaims`: unexpired user, assume, API and agent tokens with user + org. */
export const checkBrowserSessionToken = (token: string, now: number = Date.now()): BrowserSessionTokenCheck => {
  const claims = decodeClaims(token);
  if (!claims) return { ok: false, reason: 'invalid' };

  const expiresAt = typeof claims.exp === 'number' ? new Date(claims.exp * 1000) : undefined;
  if (expiresAt && expiresAt.getTime() <= now) return { ok: false, reason: 'expired' };

  const userId = claims['custom:ivy_user_id'] ?? claims.user_id;
  const orgId = claims['custom:ivy_org_id'] ?? claims.org_id;
  if (claims.token_type !== undefined && !SESSION_TOKEN_TYPES.has(claims.token_type)) {
    return { ok: false, reason: 'unsupported' };
  }
  if (!userId || !orgId) return { ok: false, reason: 'no_user' };

  const sessionEndsAt = new Date(
    Math.min(expiresAt?.getTime() ?? Number.POSITIVE_INFINITY, now + BROWSER_SESSION_MAX_MS),
  );
  return { ok: true, claims, expiresAt, sessionEndsAt };
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
/** Unambiguous characters only (no 0/O, 1/I/L): the user types the code from the terminal into the portal. */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** 8-character confirmation code, shown as `XXXX-XXXX`. */
export const generateConfirmationCode = (): string =>
  Array.from({ length: 8 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join('');

export const formatConfirmationCode = (code: string): string => `${code.slice(0, 4)}-${code.slice(4)}`;

/**
 * Binds the link to the code shown in the terminal: base64url(SHA-256(`<CODE>.<token>`)). The portal
 * (epilot360-login `/cli-session`) only switches the browser's session after the user types the code, so a link
 * someone else sends cannot do it with one click.
 */
export const confirmationCheck = (code: string, token: string): string =>
  createHash('sha256').update(`${code}.${token}`).digest('base64url');

export const buildBrowserSessionUrl = (portalUrl: string, token: string, code: string, path?: string): string => {
  const fragment = new URLSearchParams({ token, check: confirmationCheck(code, token) });
  const redirect = normalizePortalPath(path);
  if (redirect) fragment.set('redirect', redirect);
  return `${portalUrl}${CLI_SESSION_PATH}#${fragment.toString()}`;
};

/** The URL with its credential replaced, for output that may be logged or captured. */
export const redactBrowserSessionUrl = (url: string): string => url.replace(/#.*$/, '#token=<hidden>');

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

/** Who the browser session acts as, for the terminal note. */
export const describeSessionPrincipal = (claims: Claims): string => {
  if (claims.token_type === 'api' && claims.actor?.type === 'agent') {
    const agent = [claims.actor.agent_name, claims.actor.host_name && `(${claims.actor.host_name})`]
      .filter(Boolean)
      .join(' ');
    return `as the AI agent ${agent || claims.token_name || ''} on your behalf`.replace(/\s+/g, ' ');
  }
  if (claims.token_type === 'api') return `as the API token${claims.token_name ? ` "${claims.token_name}"` : ''}`;
  return 'as you';
};

const REASON_MESSAGES: Record<'invalid' | 'expired' | 'no_user' | 'unsupported', string> = {
  invalid: 'The stored token is not a valid JWT.',
  expired: 'The stored token has expired.',
  no_user: 'The token has no user or organization.',
  unsupported: 'This kind of token (portal, journey, preview or app token) cannot open a 360 portal session.',
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
    'print-url': {
      type: 'boolean',
      description: 'Print the full URL (it contains your token) even when the output is not a terminal',
    },
    json: { type: 'boolean', description: 'Print {"url", "code", "expires_at"} as JSON' },
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
      process.stderr.write(`Run ${BOLD}epilot auth login${RESET} for a fresh token.\n`);
      process.exit(1);
      return;
    }

    const portalUrl = getPortalUrl(resolvePortalEnvironment(args));
    const code = generateConfirmationCode();
    const url = buildBrowserSessionUrl(portalUrl, token, code, args.path as string | undefined);

    // The URL is a credential. Print it only to a terminal (or on explicit --print-url): when stdout is captured
    // (AI agents, CI, scripts) it would end up in transcripts and logs.
    const showUrl = Boolean(args['print-url']) || !!process.stdout.isTTY;
    const printedUrl = showUrl ? url : redactBrowserSessionUrl(url);

    if (args.json) {
      process.stdout.write(
        `${JSON.stringify({ url: printedUrl, code: formatConfirmationCode(code), expires_at: check.sessionEndsAt.toISOString() })}\n`,
      );
    } else {
      // The URL is the only thing on stdout, so `epilot auth browser | pbcopy` and `$(epilot auth browser)` work.
      process.stdout.write(`${printedUrl}\n`);
    }

    // Everything for humans goes to stderr.
    const { claims, sessionEndsAt } = check;
    const modes = [claims.read_only && 'read-only', claims.anonymize && 'anonymized'].filter(Boolean);
    process.stderr.write(
      `\n${YELLOW}This URL signs the browser in ${describeSessionPrincipal(claims)}${modes.length ? ` (${modes.join(', ')})` : ''}. Treat it like a password: do not share or paste it.${RESET}\n`,
    );
    process.stderr.write(
      `${DIM}The browser session ends at ${sessionEndsAt.toISOString()} (in ${formatRemaining(sessionEndsAt)}).${RESET}\n`,
    );
    process.stderr.write(
      `\n  Confirmation code: ${BOLD}${formatConfirmationCode(code)}${RESET}  ${DIM}(the portal asks for it before switching)${RESET}\n`,
    );
    if (!showUrl) {
      process.stderr.write(
        `\n${DIM}The URL contains your token, so it is hidden: this output is not a terminal. Use ${RESET}--open${DIM} to open it in a browser on this machine, or ${RESET}--print-url${DIM} to print it.${RESET}\n`,
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
      process.stderr.write(
        `${YELLOW}Could not open the browser. ${showUrl ? 'Open the URL above manually.' : 'Run again with --print-url and open the URL manually.'}${RESET}\n`,
      );
    }
  },
});
