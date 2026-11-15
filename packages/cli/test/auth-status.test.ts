import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { generateKeyPair } from '@epilot/agent-auth';
import { ensureHostKey, loadAgentRecord, saveAgentRecord } from '../src/lib/agent-auth.js';
import { loadCredentials, saveCredentials } from '../src/lib/auth-store.js';
import { loadProfiles } from '../src/lib/profiles.js';
import {
  ISSUER,
  createState,
  startFakeAap,
  useTempConfigDir,
  captureOutput,
  stripAnsi,
  type FakeState,
} from './helpers/fake-aap.js';

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;

const HOUR = 3600_000;

beforeAll(() => {
  state = createState({ agentStatus: 'active' });
  server = startFakeAap(state);
});
afterAll(() => server.close());

beforeEach(() => {
  tmp = useTempConfigDir();
  output = captureOutput();
  process.env.EPILOT_AGENT_AUTH_ISSUER = ISSUER;
  Object.assign(state, createState({ agentStatus: 'active' }));
});
afterEach(() => {
  output.restore();
  tmp.restore();
  delete process.env.EPILOT_AGENT_AUTH_ISSUER;
});

const authSub = async (name: 'status' | 'logout') => {
  const cmd = (await import('../src/commands/auth.js')).default;
  return (cmd.subCommands as any)[name] as { run: (ctx: any) => Promise<void> };
};

const seedAgent = () => {
  ensureHostKey();
  saveAgentRecord({
    agent_id: 'agent_1',
    host_id: 'host_1',
    privateKey: generateKeyPair().privateKey,
    issuer: ISSUER,
    name: 'epilot CLI @ test',
    created_at: '2026-01-01T00:00:00Z',
    org_id: '739224',
    access_profile: 'config:write',
  });
};

describe('epilot auth status', () => {
  it('plain login: prints the token status without an agent block', async () => {
    saveCredentials({ token: 'manual-token', org_id: '739224', user_id: 'user_1' });
    await (await authSub('status')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Authenticated');
    expect(plain).toContain('Org:     739224');
    expect(plain).not.toContain('Agent Auth');
    expect(plain).not.toContain('Profile:');
    expect(state.polls).toBe(0);
  });

  it('plain login: keeps the day-count expiry label and the "Not authenticated" hint', async () => {
    await (await authSub('status')).run({ args: {} });
    expect(stripAnsi(output.out.stdout)).toBe('Not authenticated.\nRun epilot auth login to authenticate.\n');

    output.out.stdout = '';
    const expiresAt = new Date(Date.now() + 3.5 * 24 * HOUR).toISOString();
    saveCredentials({ token: 'manual-token', expires_at: expiresAt });
    await (await authSub('status')).run({ args: {} });
    expect(stripAnsi(output.out.stdout)).toContain(`Expires: ${expiresAt} (3 days)`);
    expect(state.polls).toBe(0);
  });

  it('agent login: prints the access profile, grants with expiry and reason', async () => {
    seedAgent();
    saveCredentials({
      token: 'tok_739224_1',
      org_id: '739224',
      user_id: 'user_1',
      access_profile: 'config:write',
      expires_at: new Date(Date.now() + HOUR).toISOString(),
    });
    state.grants = [
      { id: 'grant_1', capability: 'epilot.organizations.list', status: 'active' },
      {
        id: 'grant_2',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '739224', read_only: true, anonymize: true },
      },
      {
        id: 'grant_3',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '739224', access_profile: 'config:write' },
        expires_at: new Date(Date.now() + 23.5 * HOUR).toISOString(),
        reason: 'Fix the PV registration journey mapping',
      },
      {
        id: 'grant_4',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '911210', access_profile: 'data:read' },
        expires_at: new Date(Date.now() - HOUR).toISOString(),
      },
      {
        id: 'grant_5',
        capability: 'epilot.access_token.issue',
        status: 'pending',
        constraints: { organization_id: '911210', access_profile: 'full' },
        reason: 'Import meter readings from the portal export',
      },
    ];
    await (await authSub('status')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Profile: config:write (Change configuration)');
    expect(plain).toContain('Agent Auth');
    expect(plain).toContain('Agent:   agent_1');
    expect(plain).toContain('Status:  active');
    expect(plain).toMatch(/739224\s+active read, anonymized/);
    expect(plain).toMatch(
      /739224\s+active config:write, expires in 23h \(active\) — "Fix the PV registration journey mapping"/,
    );
    expect(plain).toMatch(/911210\s+expired data:read, anonymized, expired/);
    expect(plain).toMatch(/911210\s+pending full — "Import meter readings from the portal export"/);
  });
});

const preMintedJwt = (claims: Record<string, unknown>) =>
  `eyJhbGciOiJSUzI1NiJ9.${Buffer.from(JSON.stringify(claims)).toString('base64url')}.c2lnbmF0dXJl`;

const PRE_MINTED_CLAIMS = {
  token_type: 'api',
  org_id: '911210',
  user_id: 'user_42',
  token_id: 'agent_tok_1',
  read_only: true,
  anonymize: true,
  actor: { type: 'agent', client: 'support-agent', user_id: 'admin_1', approval_id: 'appr_7' },
};

describe('epilot auth status: effective token', () => {
  afterEach(() => {
    delete process.env.EPILOT_TOKEN;
  });

  it('reports a named profile as the source and decodes the pre-minted claims, never the token', async () => {
    saveCredentials({ token: 'my-own-login' });
    const token = preMintedJwt({ ...PRE_MINTED_CLAIMS, exp: Math.floor((Date.now() + 2 * HOUR) / 1000) });
    saveCredentials({ token }, 'agent-911');

    await (await authSub('status')).run({ args: { profile: 'agent-911' } });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Authenticated (API Token)');
    expect(plain).toContain('Org:     911210');
    expect(plain).toContain('User:    user_42');
    expect(plain).toContain('Token ID: agent_tok_1');
    expect(plain).toContain('Access:  read-only');
    expect(plain).toContain('Data:    anonymized');
    expect(plain).toContain('Actor:   agent via support-agent (approval appr_7)');
    expect(plain).toMatch(/Expires: \S+ \(1h 59m\)/);
    expect(plain).toContain('Source:  profile "agent-911"');
    expect(plain).not.toContain(token.slice(0, 20));
  });

  it('reports --token and EPILOT_TOKEN over stored credentials', async () => {
    saveCredentials({ token: 'my-own-login', org_id: '1' });
    const token = preMintedJwt(PRE_MINTED_CLAIMS);

    await (await authSub('status')).run({ args: { token } });
    expect(stripAnsi(output.out.stdout)).toContain('Source:  --token flag');
    expect(stripAnsi(output.out.stdout)).toContain('Org:     911210');

    output.out.stdout = '';
    process.env.EPILOT_TOKEN = token;
    await (await authSub('status')).run({ args: {} });
    expect(stripAnsi(output.out.stdout)).toContain('Source:  EPILOT_TOKEN env var');

    output.out.stdout = '';
    delete process.env.EPILOT_TOKEN;
    await (await authSub('status')).run({ args: {} });
    expect(stripAnsi(output.out.stdout)).toContain('Source:  credentials.json (default login)');
    expect(stripAnsi(output.out.stdout)).toContain('Org:     1');
  });

  it('shows an expired profile token as expired', async () => {
    const exp = Math.floor((Date.now() - HOUR) / 1000);
    saveCredentials({ token: preMintedJwt({ ...PRE_MINTED_CLAIMS, exp }) }, 'agent-911');

    await (await authSub('status')).run({ args: { profile: 'agent-911' } });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Token expired (API Token) — request a new one');
    expect(plain).toContain(`Expires: ${new Date(exp * 1000).toISOString()} (expired)`);
  });
});

describe('epilot auth logout', () => {
  it('plain login: removes credentials without contacting Agent Auth', async () => {
    saveCredentials({ token: 'manual-token' });
    await (await authSub('logout')).run({ args: {} });
    expect(state.revoked).toEqual([]);
    expect(loadCredentials()).toBeNull();
    expect(stripAnsi(output.out.stdout)).toBe('Logged out successfully.\n');
  });

  it('named profile: clears that profile and keeps the default login', async () => {
    saveCredentials({ token: 'my-own-login' });
    saveCredentials({ token: 'manual-token', org_id: '911210' }, 'work');
    await (await authSub('logout')).run({ args: { profile: 'work' } });
    expect(stripAnsi(output.out.stdout)).toBe('Logged out successfully.\n');
    expect(state.revoked).toEqual([]);
    expect(loadProfiles().profiles.work.token).toBeUndefined();
    expect(loadProfiles().profiles.work.org_id).toBeUndefined();
    expect(loadCredentials()?.token).toBe('my-own-login');
  });

  it('agent login: revokes the agent, forgets it and clears the profile', async () => {
    seedAgent();
    saveCredentials({ token: 'tok', org_id: '739224', access_profile: 'config:write' });
    await (await authSub('logout')).run({ args: {} });
    expect(state.revoked).toEqual(['agent_1']);
    expect(loadAgentRecord()).toBeNull();
    expect(loadCredentials()).toBeNull();
    expect(output.out.stdout).toContain('Agent agent_1 revoked');
    expect(output.out.stdout).toContain('Logged out successfully');
  });

  it('agent login on a named profile: clears the token the agent stored in that profile', async () => {
    process.env.EPILOT_PROFILE = 'work';
    try {
      seedAgent();
      saveCredentials({ token: 'tok', org_id: '739224', access_profile: 'config:write' }, 'work');
      await (await authSub('logout')).run({ args: {} });
      expect(state.revoked).toEqual(['agent_1']);
      expect(loadProfiles().profiles.work.token).toBeUndefined();
      expect(loadProfiles().profiles.work.access_profile).toBeUndefined();
    } finally {
      delete process.env.EPILOT_PROFILE;
    }
  });
});
