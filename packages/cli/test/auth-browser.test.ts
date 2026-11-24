import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { saveCredentials } from '../src/lib/auth-store.js';
import { setStage } from '../src/lib/profiles.js';
import { captureOutput, stripAnsi, useTempConfigDir } from './helpers/fake-aap.js';

const openMock = vi.fn();
const confirmMock = vi.fn();

vi.mock('open', () => ({ default: (...args: unknown[]) => openMock(...args) }));
vi.mock('@inquirer/prompts', () => ({ confirm: (...args: unknown[]) => confirmMock(...args) }));

const {
  BROWSER_SESSION_MAX_MS,
  buildBrowserSessionUrl,
  checkBrowserSessionToken,
  describeSessionPrincipal,
  formatConfirmationCode,
  generateConfirmationCode,
  normalizePortalPath,
} = await import('../src/commands/auth-browser.js');
const command = (await import('../src/commands/auth-browser.js')).default;

const b64 = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const makeToken = (claims: Record<string, unknown>) => `${b64({ alg: 'RS256' })}.${b64(claims)}.signature`;
const inOneHour = () => Math.floor(Date.now() / 1000) + 3600;

const cognitoToken = () =>
  makeToken({
    iss: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_pool',
    token_use: 'id',
    'custom:ivy_user_id': 'user-1',
    'custom:ivy_org_id': 'org-1',
    exp: inOneHour(),
  });

const assumeToken = (extra: Record<string, unknown> = {}) =>
  makeToken({
    token_type: 'assume',
    user_id: 'user-1',
    org_id: 'org-1',
    exp: inOneHour(),
    ...extra,
  });

const apiToken = (extra: Record<string, unknown> = {}) =>
  makeToken({
    token_type: 'api',
    token_id: 'api_tok',
    token_name: 'ERP sync',
    user_id: 'api_tok',
    org_id: 'org-1',
    exp: inOneHour(),
    ...extra,
  });

const agentToken = () =>
  apiToken({
    token_id: 'agent_tok',
    token_name: 'Agent: Claude',
    user_id: 'agent_tok',
    actor: { type: 'agent', agent_name: 'Claude', host_name: 'epilot MCP (Claude)', user_id: 'user-1' },
  });

describe('checkBrowserSessionToken', () => {
  it('accepts Cognito id, assume, API and agent tokens', () => {
    expect(checkBrowserSessionToken(cognitoToken()).ok).toBe(true);
    expect(checkBrowserSessionToken(assumeToken({ read_only: true })).ok).toBe(true);
    expect(checkBrowserSessionToken(apiToken()).ok).toBe(true);
    expect(checkBrowserSessionToken(agentToken()).ok).toBe(true);
  });

  it('caps the session at 8 hours, also for tokens without expiry', () => {
    const now = Date.now();
    const check = checkBrowserSessionToken(apiToken({ exp: undefined }), now);

    expect(check.ok && check.sessionEndsAt.getTime()).toBe(now + BROWSER_SESSION_MAX_MS);
  });

  it('describes who the browser acts as', () => {
    const principal = (token: string) => {
      const check = checkBrowserSessionToken(token);
      return check.ok ? describeSessionPrincipal(check.claims) : null;
    };

    expect(principal(cognitoToken())).toBe('as you');
    expect(principal(apiToken())).toBe('as the API token "ERP sync"');
    expect(principal(agentToken())).toBe('as the AI agent Claude (epilot MCP (Claude)) on your behalf');
  });

  it.each([
    ['garbage', 'not-a-jwt', 'invalid'],
    ['expired tokens', assumeToken({ exp: 1 }), 'expired'],
    ['portal tokens', makeToken({ token_type: 'portal', user_id: 'u', org_id: 'o' }), 'unsupported'],
    ['journey tokens', makeToken({ token_type: 'journey', user_id: 'u', org_id: 'o' }), 'unsupported'],
    ['app tokens', makeToken({ token_type: 'app', user_id: 'u', org_id: 'o' }), 'unsupported'],
    ['tokens without org', makeToken({ user_id: 'u' }), 'no_user'],
  ])('rejects %s', (_label, token, reason) => {
    expect(checkBrowserSessionToken(token)).toEqual({ ok: false, reason });
  });
});

describe('buildBrowserSessionUrl', () => {
  it('puts token and landing path in the URL fragment', () => {
    const url = new URL(
      buildBrowserSessionUrl('https://portal.epilot.cloud', 'a.b.c', 'K7QM2XPA', '/app/entity/contact'),
    );

    expect(url.origin).toBe('https://portal.epilot.cloud');
    expect(url.pathname).toBe('/cli-session');
    expect(url.search).toBe('');
    const fragment = new URLSearchParams(url.hash.slice(1));
    expect(fragment.get('token')).toBe('a.b.c');
    expect(fragment.get('redirect')).toBe('/app/entity/contact');
    expect(fragment.get('code')).toBe('K7QM2XPA');
  });

  it('generates unambiguous 8-character codes', () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateConfirmationCode()));

    expect(codes.size).toBeGreaterThan(45);
    for (const code of codes) expect(code).toMatch(/^[A-HJKMNP-Z2-9]{8}$/);
    expect(formatConfirmationCode('K7QM2XPA')).toBe('K7QM-2XPA');
  });

  it.each([
    ['app/entity', '/app/entity'],
    ['//evil.com', undefined],
    ['/\\evil.com', undefined],
    [undefined, undefined],
  ])('normalizes path %s', (input, expected) => {
    expect(normalizePortalPath(input)).toBe(expected);
  });
});

describe('epilot auth browser', () => {
  let tmp: ReturnType<typeof useTempConfigDir>;
  let output: ReturnType<typeof captureOutput>;
  let exitSpy: ReturnType<typeof vi.spyOn>;
  const tty = { stdin: process.stdin.isTTY, stdout: process.stdout.isTTY, stderr: process.stderr.isTTY };

  const setTty = (value: boolean) => {
    process.stdin.isTTY = value;
    process.stdout.isTTY = value;
    process.stderr.isTTY = value;
  };

  const run = (args: Record<string, unknown> = {}) => command.run!({ args: { interactive: true, ...args } } as any);

  beforeEach(() => {
    tmp = useTempConfigDir();
    output = captureOutput();
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    openMock.mockReset().mockResolvedValue(undefined);
    confirmMock.mockReset();
    delete process.env.EPILOT_TOKEN;
  });

  afterEach(() => {
    output.restore();
    tmp.restore();
    exitSpy.mockRestore();
    process.stdin.isTTY = tty.stdin;
    process.stdout.isTTY = tty.stdout;
    process.stderr.isTTY = tty.stderr;
  });

  it('hides the token when stdout is not a terminal, and does not open the browser', async () => {
    setTty(false);
    const token = cognitoToken();
    saveCredentials({ token });

    await run();

    expect(output.out.stdout.trim()).toBe('https://portal.epilot.cloud/cli-session#token=<hidden>');
    expect(output.out.stdout).not.toContain(token);
    expect(stripAnsi(output.out.stderr)).not.toContain(token);
    expect(stripAnsi(output.out.stderr)).toContain('--print-url');
    expect(stripAnsi(output.out.stderr)).toMatch(/Confirmation code: [A-Z0-9]{4}-[A-Z0-9]{4}/);
    expect(confirmMock).not.toHaveBeenCalled();
    expect(openMock).not.toHaveBeenCalled();
  });

  it('--print-url prints the full URL even when stdout is not a terminal', async () => {
    setTty(false);
    const token = cognitoToken();
    saveCredentials({ token });

    await run({ 'print-url': true });

    const url = new URL(output.out.stdout.trim());
    expect(new URLSearchParams(url.hash.slice(1)).get('token')).toBe(token);
  });

  it('--open opens the full URL without printing it when stdout is not a terminal', async () => {
    setTty(false);
    const token = cognitoToken();
    saveCredentials({ token });

    await run({ open: true });

    expect(output.out.stdout).not.toContain(token);
    expect(openMock.mock.calls[0][0]).toContain(`#token=${token}`);
  });

  it('offers to open the browser in interactive shells', async () => {
    setTty(true);
    saveCredentials({ token: assumeToken({ read_only: true, anonymize: true }) });
    confirmMock.mockResolvedValue(true);

    await run({ path: '/app/entity/contact' });

    expect(confirmMock).toHaveBeenCalledOnce();
    expect(openMock).toHaveBeenCalledWith(output.out.stdout.trim());
    expect(output.out.stdout).toContain('redirect=%2Fapp%2Fentity%2Fcontact');
    expect(stripAnsi(output.out.stderr)).toContain('(read-only, anonymized)');
  });

  it('respects a declined prompt', async () => {
    setTty(true);
    saveCredentials({ token: cognitoToken() });
    confirmMock.mockResolvedValue(false);

    await run();

    expect(openMock).not.toHaveBeenCalled();
  });

  it('--open opens without asking, --no-open never opens', async () => {
    setTty(true);
    saveCredentials({ token: cognitoToken() });

    await run({ open: true });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(openMock).toHaveBeenCalledOnce();

    openMock.mockClear();
    await run({ open: false });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(openMock).not.toHaveBeenCalled();
  });

  it('targets the configured stage and --use-dev', async () => {
    setTty(false);
    saveCredentials({ token: cognitoToken() });

    setStage('staging');
    await run();
    expect(output.out.stdout).toContain('https://portal.staging.epilot.cloud/cli-session#');

    output.out.stdout = '';
    await run({ 'use-dev': true });
    expect(output.out.stdout).toContain('https://portal.dev.epilot.cloud/cli-session#');
  });

  it('--json prints url, code and expiry (url hidden unless --print-url)', async () => {
    setTty(false);
    saveCredentials({ token: cognitoToken() });

    await run({ json: true });

    const parsed = JSON.parse(output.out.stdout);
    expect(parsed.url).toBe('https://portal.epilot.cloud/cli-session#token=<hidden>');
    expect(parsed.code).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    expect(new Date(parsed.expires_at).getTime()).toBeGreaterThan(Date.now());

    output.out.stdout = '';
    await run({ json: true, 'print-url': true });
    const full = JSON.parse(output.out.stdout);
    const fragment = new URLSearchParams(new URL(full.url).hash.slice(1));
    expect(fragment.get('code')).toBe(full.code.replace('-', ''));
  });

  it('opens a session for an agent token and says who acts', async () => {
    setTty(false);

    await run({ token: agentToken() });

    expect(exitSpy).not.toHaveBeenCalled();
    expect(output.out.stdout).toMatch(/^https:\/\/portal\.epilot\.cloud\/cli-session#token=<hidden>/);
    expect(stripAnsi(output.out.stderr)).toContain('as the AI agent Claude (epilot MCP (Claude)) on your behalf');
  });

  it('refuses customer-facing tokens with a hint', async () => {
    setTty(false);

    await run({ token: makeToken({ token_type: 'portal', user_id: 'u', org_id: 'org-1' }) });

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(output.out.stdout).toBe('');
    expect(stripAnsi(output.out.stderr)).toContain('cannot open a 360 portal session');
  });

  it('asks to log in without a token', async () => {
    setTty(false);

    await run();

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stripAnsi(output.out.stderr)).toContain('epilot auth login');
  });
});
