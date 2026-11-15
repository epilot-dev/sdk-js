import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  credentialsFromToken,
  describeExpiredToken,
  loadCredentials,
  resolveToken,
  resolveTokenSource,
  saveCredentials,
} from '../src/lib/auth-store.js';
import { loadProfiles } from '../src/lib/profiles.js';
import { captureOutput, useTempConfigDir } from './helpers/fake-aap.js';

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
    saveCredentials({ token: jwt({ org_id: '911210', exp: inOneHour() }) }, 'loginas-911');

    expect(loadCredentials()).toMatchObject({ token: 'my-own-login', org_id: '1' });
    expect(resolveToken()).toBe('my-own-login');
    expect(resolveTokenSource(undefined, 'loginas-911')).toMatchObject({
      source: 'profile',
      profileName: 'loginas-911',
      creds: { org_id: '911210' },
    });
  });

  it('treats EPILOT_PROFILE as a named profile', () => {
    process.env.EPILOT_PROFILE = 'loginas-911';
    saveCredentials({ token: 'login-as' });
    expect(existsSync(join(tmp.configDir, 'credentials.json'))).toBe(false);
    expect(loadProfiles().profiles['loginas-911'].token).toBe('login-as');
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
    saveCredentials({ token: jwt({ org_id: '911210', exp }) }, 'loginas-911');

    expect(resolveToken(undefined, 'loginas-911')).toBeNull();
    expect(describeExpiredToken(undefined, 'loginas-911')).toBe(
      `Token of profile "loginas-911" expired at ${new Date(exp * 1000).toISOString()} — request a new one and store it with: epilot auth token --profile loginas-911 <token>`,
    );
    expect(describeExpiredToken('flag-token', 'loginas-911')).toBeNull();
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
      const create = (cmd.subCommands as any).create as { run: (ctx: any) => void };
      create.run({ args: { name: 'loginas-911', token: jwt({ org_id: '911210', exp }) } });
      expect(loadProfiles().profiles['loginas-911']).toMatchObject({
        org_id: '911210',
        expires_at: new Date(exp * 1000).toISOString(),
      });
      expect(existsSync(join(tmp.configDir, 'credentials.json'))).toBe(false);
    } finally {
      output.restore();
    }
  });
});
