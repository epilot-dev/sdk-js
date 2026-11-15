import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  credentialsFromToken,
  describeExpiredToken,
  loadCredentials,
  resolveToken,
  resolveTokenAsync,
  resolveTokenSource,
  saveCredentials,
} from '../src/lib/auth-store.js';
import { ProfileNotFoundError, loadProfiles, upsertProfile } from '../src/lib/profiles.js';
import { readTokenFromStdin } from '../src/lib/token-input.js';
import { captureOutput, pipeStdin, stripAnsi, useTempConfigDir } from './helpers/fake-aap.js';

let tmp: ReturnType<typeof useTempConfigDir>;

beforeEach(() => {
  tmp = useTempConfigDir();
});
afterEach(() => {
  tmp.restore();
  delete process.env.EPILOT_TOKEN;
});

const jwt = (claims: Record<string, unknown>) =>
  `eyJhbGciOiJSUzI1NiJ9.${Buffer.from(JSON.stringify(claims)).toString('base64url')}.c2lnbmF0dXJl`;

const inOneHour = () => Math.floor((Date.now() + 3600_000) / 1000);
const anHourAgo = () => Math.floor((Date.now() - 3600_000) / 1000);

describe('saveCredentials', () => {
  it('stores a token for a named profile without touching the default login', () => {
    saveCredentials({ token: 'my-own-login', org_id: '1' });
    saveCredentials({ token: jwt({ org_id: '911210', exp: inOneHour() }) }, 'agent-911');

    expect(loadCredentials()).toMatchObject({ token: 'my-own-login', org_id: '1' });
    expect(resolveToken()).toBe('my-own-login');
    expect(resolveTokenSource(undefined, 'agent-911')).toMatchObject({
      source: 'profile',
      profileName: 'agent-911',
      creds: { org_id: '911210' },
    });
  });

  it('treats EPILOT_PROFILE as a named profile', () => {
    process.env.EPILOT_PROFILE = 'agent-911';
    saveCredentials({ token: 'pre-minted' });
    expect(existsSync(join(tmp.configDir, 'credentials.json'))).toBe(false);
    expect(loadProfiles().profiles['agent-911'].token).toBe('pre-minted');
  });

  it('without a profile, still writes the legacy credentials.json', () => {
    saveCredentials({ token: 'my-own-login' });
    expect(JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8')).token).toBe('my-own-login');
  });

  it('keeps org, user and expiry from the JWT claims, explicit values win', () => {
    const exp = inOneHour();
    saveCredentials({ token: jwt({ org_id: 911210, user_id: 'user_42', exp }) }, 'a');
    expect(loadProfiles().profiles.a).toMatchObject({
      org_id: '911210',
      user_id: 'user_42',
      expires_at: new Date(exp * 1000).toISOString(),
    });

    saveCredentials({ token: jwt({ org_id: '911210', exp }), org_id: '739224', expires_at: 'x' }, 'b');
    expect(loadProfiles().profiles.b).toMatchObject({ org_id: '739224', expires_at: 'x' });
  });

  it('replaces the metadata of a previous token in the profile', () => {
    saveCredentials({ token: jwt({ org_id: '911210', exp: anHourAgo() }) }, 'a');
    saveCredentials({ token: 'opaque-token' }, 'a');
    expect(loadProfiles().profiles.a).toEqual({ name: 'a', token: 'opaque-token' });
  });
});

describe('credentialsFromToken', () => {
  it('returns no metadata for opaque tokens', () => {
    expect(credentialsFromToken('opaque')).toEqual({ token: 'opaque' });
  });
});

describe('expired tokens', () => {
  it('does not fall back to the default login and explains how to recover', () => {
    saveCredentials({ token: 'my-own-login' });
    const exp = anHourAgo();
    saveCredentials({ token: jwt({ org_id: '911210', exp }) }, 'agent-911');

    expect(resolveToken(undefined, 'agent-911')).toBeNull();
    expect(describeExpiredToken(undefined, 'agent-911')).toBe(
      `Token of profile "agent-911" expired at ${new Date(exp * 1000).toISOString()} — request a new one and store it with: epilot auth token --profile agent-911 <token>`,
    );
    expect(describeExpiredToken('flag-token', 'agent-911')).toBeNull();
    expect(describeExpiredToken()).toBeNull();
  });

  it('describes an expired default login', () => {
    saveCredentials({ token: jwt({ exp: anHourAgo() }) });
    expect(resolveToken()).toBeNull();
    expect(describeExpiredToken()).toContain('Stored token expired at');
  });
});

describe('epilot profile create --token', () => {
  it('stores org and expiry decoded from the token', async () => {
    const output = captureOutput();
    try {
      const exp = inOneHour();
      const cmd = (await import('../src/commands/profile.js')).default;
      const create = (cmd.subCommands as any).create as { run: (ctx: any) => Promise<void> };
      await create.run({ args: { name: 'agent-911', token: jwt({ org_id: '911210', exp }) } });
      expect(loadProfiles().profiles['agent-911']).toMatchObject({
        org_id: '911210',
        expires_at: new Date(exp * 1000).toISOString(),
      });
      expect(existsSync(join(tmp.configDir, 'credentials.json'))).toBe(false);
    } finally {
      output.restore();
    }
  });
});

describe('a profile named explicitly that does not exist', () => {
  const NOT_FOUND = 'Profile "agent-911" not found. Create it with: epilot profile create agent-911 --token …';
  let output: ReturnType<typeof captureOutput>;
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    output = captureOutput();
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as never);
    saveCredentials({ token: 'my-own-login', org_id: '1' });
  });
  afterEach(() => {
    exitSpy.mockRestore();
    output.restore();
  });

  it('--profile: exits 1 instead of falling back to the default login', async () => {
    expect(() => resolveToken(undefined, 'agent-911')).toThrow(ProfileNotFoundError);
    expect(() => resolveTokenSource(undefined, 'agent-911')).toThrow(NOT_FOUND);
    expect(() => describeExpiredToken(undefined, 'agent-911')).toThrow(ProfileNotFoundError);
    await expect(resolveTokenAsync(undefined, 'agent-911')).rejects.toThrow(ProfileNotFoundError);
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stripAnsi(output.out.stderr)).toContain(`${NOT_FOUND}\n`);
  });

  it('EPILOT_PROFILE: exits 1 as well', async () => {
    process.env.EPILOT_PROFILE = 'agent-911';
    expect(() => resolveToken()).toThrow(NOT_FOUND);
    await expect(resolveTokenAsync()).rejects.toThrow(NOT_FOUND);
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('--token and EPILOT_TOKEN still win over the profile', async () => {
    expect(resolveToken('flag-token', 'agent-911')).toBe('flag-token');
    process.env.EPILOT_TOKEN = 'env-token';
    expect(resolveToken(undefined, 'agent-911')).toBe('env-token');
    expect(await resolveTokenAsync(undefined, 'agent-911')).toBe('env-token');
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('an existing profile and the default login resolve as before', () => {
    upsertProfile('local', { server: 'http://localhost:3000' });
    expect(resolveToken(undefined, 'local')).toBe('my-own-login');
    expect(resolveToken()).toBe('my-own-login');
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('commands that create the profile still work', async () => {
    process.env.EPILOT_PROFILE = 'from-env';
    const profile = (await import('../src/commands/profile.js')).default;
    await ((profile.subCommands as any).create as { run: (ctx: any) => Promise<void> }).run({
      args: { name: 'from-env', token: 'created' },
    });
    expect(resolveToken()).toBe('created');
    delete process.env.EPILOT_PROFILE;

    const authToken = (await import('../src/commands/auth-token.js')).default;
    await authToken.run!({ args: { token: 'stored', profile: 'agent-911' } } as any);
    expect(resolveToken(undefined, 'agent-911')).toBe('stored');
    expect(loadCredentials()?.token).toBe('my-own-login');
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('epilot auth status --profile exits 1', async () => {
    const auth = (await import('../src/commands/auth.js')).default;
    const status = (auth.subCommands as any).status as { run: (ctx: any) => Promise<void> };
    await expect(status.run({ args: { profile: 'agent-911' } })).rejects.toThrow(ProfileNotFoundError);
    expect(stripAnsi(output.out.stderr)).toContain(NOT_FOUND);
    expect(output.out.stdout).not.toContain('Authenticated');
  });
});

describe('reading the token from stdin', () => {
  it('reads and trims piped input', async () => {
    expect(await readTokenFromStdin(Readable.from(['  tok-123\n']) as any)).toBe('tok-123');
  });

  it('epilot profile create <name> --token - stores the piped token and never prints it', async () => {
    const output = captureOutput();
    const token = jwt({ org_id: '911210', exp: inOneHour() });
    const stdin = pipeStdin(`${token}\n`);
    try {
      const cmd = (await import('../src/commands/profile.js')).default;
      await ((cmd.subCommands as any).create as { run: (ctx: any) => Promise<void> }).run({
        args: { name: 'agent-911', token: '-' },
      });
      const stored = loadProfiles().profiles['agent-911'];
      expect(stored).toMatchObject({ token, org_id: '911210' });
      expect(output.out.stdout).not.toContain(token.slice(0, 20));
    } finally {
      stdin.restore();
      output.restore();
    }
  });

  it('epilot profile create <name> --token - with empty stdin exits 1', async () => {
    const output = captureOutput();
    const stdin = pipeStdin('  \n');
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as never);
    try {
      const cmd = (await import('../src/commands/profile.js')).default;
      await ((cmd.subCommands as any).create as { run: (ctx: any) => Promise<void> }).run({
        args: { name: 'agent-911', token: '-' },
      });
      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(output.out.stderr).toContain('No token provided');
      expect(loadProfiles().profiles['agent-911']).toBeUndefined();
    } finally {
      exitSpy.mockRestore();
      stdin.restore();
      output.restore();
    }
  });
});
