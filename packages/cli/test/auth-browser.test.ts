import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { saveCredentials } from '../src/lib/auth-store.js';
import { setStage } from '../src/lib/profiles.js';
import { captureOutput, stripAnsi, useTempConfigDir } from './helpers/fake-aap.js';

const openMock = vi.fn();
const confirmMock = vi.fn();

vi.mock('open', () => ({ default: (...args: unknown[]) => openMock(...args) }));
vi.mock('@inquirer/prompts', () => ({ confirm: (...args: unknown[]) => confirmMock(...args) }));

const { buildBrowserSessionUrl, checkBrowserSessionToken, normalizePortalPath } = await import(
  '../src/commands/auth-browser.js'
);
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

describe('checkBrowserSessionToken', () => {
  it('accepts Cognito id tokens and assume tokens', () => {
    expect(checkBrowserSessionToken(cognitoToken()).ok).toBe(true);
    expect(checkBrowserSessionToken(assumeToken({ read_only: true })).ok).toBe(true);
  });

  it.each([
    ['garbage', 'not-a-jwt', 'invalid'],
    ['expired tokens', assumeToken({ exp: 1 }), 'expired'],
    ['API tokens', makeToken({ token_type: 'api', user_id: 'api_x', org_id: 'org-1' }), 'no_user'],
    ['agent tokens', makeToken({ token_type: 'api', user_id: 'agent_x', org_id: 'org-1', actor: {} }), 'no_user'],
    ['portal tokens', makeToken({ token_type: 'portal', user_id: 'u', org_id: 'o' }), 'no_user'],
    ['tokens without org', makeToken({ user_id: 'u' }), 'no_user'],
  ])('rejects %s', (_label, token, reason) => {
    expect(checkBrowserSessionToken(token)).toEqual({ ok: false, reason });
  });
});

describe('buildBrowserSessionUrl', () => {
  it('puts token and landing path in the URL fragment', () => {
    const url = new URL(buildBrowserSessionUrl('https://portal.epilot.cloud', 'a.b.c', '/app/entity/contact'));

    expect(url.origin).toBe('https://portal.epilot.cloud');
    expect(url.pathname).toBe('/cli-session');
    expect(url.search).toBe('');
    const fragment = new URLSearchParams(url.hash.slice(1));
    expect(fragment.get('token')).toBe('a.b.c');
    expect(fragment.get('redirect')).toBe('/app/entity/contact');
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

  it('prints only the URL on stdout and does not open the browser when not interactive', async () => {
    setTty(false);
    const token = cognitoToken();
    saveCredentials({ token });

    await run();

    const url = output.out.stdout.trim();
    expect(url).toBe(`https://portal.epilot.cloud/cli-session#token=${token}`);
    expect(stripAnsi(output.out.stderr)).toContain('Treat it like a password');
    expect(confirmMock).not.toHaveBeenCalled();
    expect(openMock).not.toHaveBeenCalled();
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

  it('--json prints url and expiry', async () => {
    setTty(false);
    saveCredentials({ token: cognitoToken() });

    await run({ json: true });

    const parsed = JSON.parse(output.out.stdout);
    expect(parsed.url).toMatch(/^https:\/\/portal\.epilot\.cloud\/cli-session#token=/);
    expect(new Date(parsed.expires_at).getTime()).toBeGreaterThan(Date.now());
  });

  it('refuses API tokens with a hint', async () => {
    setTty(false);

    await run({ token: makeToken({ token_type: 'api', user_id: 'api_1', org_id: 'org-1' }) });

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(output.out.stdout).toBe('');
    expect(stripAnsi(output.out.stderr)).toContain('not bound to a user');
  });

  it('asks to log in without a token', async () => {
    setTty(false);

    await run();

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stripAnsi(output.out.stderr)).toContain('epilot auth login');
  });
});
