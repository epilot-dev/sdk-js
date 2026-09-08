import { existsSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  REFRESH_WINDOW_MS,
  agentPath,
  agentProfileKey,
  deleteAgentRecord,
  ensureHostKey,
  getAgentAuthClient,
  issueTokenForOrg,
  loadAgentIdentity,
  loadAgentRecord,
  loadHostKey,
  refreshTokenIfNeeded,
  resolveAgentAuthIssuer,
  saveAgentRecord,
} from '../src/lib/agent-auth.js';
import { resolveTokenAsync } from '../src/lib/auth-store.js';
import { loadProfiles, upsertProfile, setActiveProfile } from '../src/lib/profiles.js';
import {
  ISSUER,
  createState,
  startFakeAap,
  useTempConfigDir,
  captureOutput,
  type FakeState,
} from './helpers/fake-aap.js';
import { generateKeyPair } from '@epilot/agent-auth';

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;

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
  state.grants = [
    { id: 'grant_1', capability: 'epilot.organizations.list', status: 'active' },
    {
      id: 'grant_2',
      capability: 'epilot.access_token.issue',
      status: 'active',
      constraints: { organization_id: '739224', read_only: true, anonymize: true },
    },
  ];
});
afterEach(() => {
  output.restore();
  tmp.restore();
  delete process.env.EPILOT_AGENT_AUTH_ISSUER;
  delete process.env.EPILOT_TOKEN;
});

const sampleRecord = (overrides: Record<string, unknown> = {}) => ({
  agent_id: 'agent_1',
  host_id: 'host_1',
  privateKey: generateKeyPair().privateKey,
  issuer: ISSUER,
  name: 'epilot CLI @ test',
  created_at: '2026-01-01T00:00:00Z',
  ...overrides,
});

describe('host key storage', () => {
  it('creates host.json with mode 0600 on first use and reuses it afterwards', () => {
    expect(loadHostKey()).toBeNull();
    const key = ensureHostKey();
    const path = join(tmp.configDir, 'agent-auth', 'host.json');
    expect(existsSync(path)).toBe(true);
    expect(statSync(path).mode & 0o777).toBe(0o600);
    const stored = JSON.parse(readFileSync(path, 'utf-8'));
    expect(stored).toMatchObject({ thumbprint: key.thumbprint, privateKey: key.privateKey });
    expect(stored.created_at).toMatch(/^\d{4}-/);
    expect(ensureHostKey().thumbprint).toBe(key.thumbprint);
  });
});

describe('agent record storage', () => {
  it('stores one agent per profile under agent-auth/agents/<profile>.json', () => {
    expect(agentProfileKey()).toBe('default');
    expect(agentPath('staging')).toBe(join(tmp.configDir, 'agent-auth', 'agents', 'staging.json'));

    const record = sampleRecord();
    saveAgentRecord(record);
    saveAgentRecord(sampleRecord({ agent_id: 'agent_staging' }), 'staging');
    expect(statSync(agentPath()).mode & 0o777).toBe(0o600);
    expect(loadAgentRecord()?.agent_id).toBe('agent_1');
    expect(loadAgentRecord('staging')?.agent_id).toBe('agent_staging');

    expect(deleteAgentRecord('staging')).toBe(true);
    expect(deleteAgentRecord('staging')).toBe(false);
    expect(loadAgentRecord('staging')).toBeNull();
  });

  it('resolves the agent of the active profile and EPILOT_PROFILE', () => {
    upsertProfile('work', { token: 'x' });
    setActiveProfile('work');
    expect(agentProfileKey()).toBe('work');
    process.env.EPILOT_PROFILE = 'other';
    expect(agentProfileKey()).toBe('other');
    expect(agentProfileKey('explicit')).toBe('explicit');
  });

  it('loadAgentIdentity needs both a host key and an agent record', () => {
    saveAgentRecord(sampleRecord());
    expect(loadAgentIdentity()).toBeNull();
    ensureHostKey();
    const loaded = loadAgentIdentity();
    expect(loaded?.identity.agentId).toBe('agent_1');
    expect(loaded?.identity.hostKey.thumbprint).toBe(loadHostKey()?.thumbprint);
    expect(loaded?.client.baseUrl).toBe(ISSUER);
    expect(loaded?.profileKey).toBe('default');
  });

  it('ignores corrupt files', () => {
    mkdirSync(join(tmp.configDir, 'agent-auth', 'agents'), { recursive: true });
    writeFileSync(join(tmp.configDir, 'agent-auth', 'host.json'), '{not json');
    writeFileSync(agentPath(), JSON.stringify({ agent_id: 'x' }));
    expect(loadHostKey()).toBeNull();
    expect(loadAgentRecord()).toBeNull();
  });
});

describe('issuer resolution', () => {
  it('uses the env override, else the stage default', () => {
    expect(resolveAgentAuthIssuer('dev')).toBe(ISSUER);
    delete process.env.EPILOT_AGENT_AUTH_ISSUER;
    expect(resolveAgentAuthIssuer('dev')).toBe('https://access-token.dev.sls.epilot.io/v1/agent-auth');
    expect(resolveAgentAuthIssuer()).toBe('https://access-token.sls.epilot.io/v1/agent-auth');
    expect(getAgentAuthClient('https://custom.example/aap').baseUrl).toBe('https://custom.example/aap');
    expect(getAgentAuthClient('staging').baseUrl).toBe('https://access-token.staging.sls.epilot.io/v1/agent-auth');
  });
});

describe('token issuance and refresh', () => {
  it('issueTokenForOrg stores token, org, user and expiry in credentials.json and the profile', async () => {
    ensureHostKey();
    saveAgentRecord(sampleRecord(), 'work');
    const loaded = loadAgentIdentity('work')!;

    const issued = await issueTokenForOrg(loaded, '739224', { readOnly: true, anonymize: true, profileName: 'work' });
    expect(issued.token).toBe('tok_739224_1');
    expect(state.executions.at(-1)?.body).toEqual({
      capability: 'epilot.access_token.issue',
      arguments: { organization_id: '739224', read_only: true, anonymize: true },
    });

    const creds = JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8'));
    expect(creds).toMatchObject({
      token: 'tok_739224_1',
      org_id: '739224',
      user_id: 'user_1',
      name: 'dev@epilot.cloud',
    });
    expect(creds.expires_at).toBe(issued.expires_at);
    expect(loadProfiles().profiles.work).toMatchObject({ token: 'tok_739224_1', org_id: '739224', user_id: 'user_1' });
    expect(loadAgentRecord('work')).toMatchObject({ org_id: '739224', read_only: true, anonymize: true });
  });

  it('refreshTokenIfNeeded keeps a valid token and re-issues an expiring one', async () => {
    ensureHostKey();
    saveAgentRecord(sampleRecord({ org_id: '739224', read_only: true, anonymize: true }));
    const farFuture = new Date(Date.now() + 3600_000).toISOString();
    upsertProfile('default', { token: 'still-valid', org_id: '739224', expires_at: farFuture });

    expect(await refreshTokenIfNeeded()).toBe('still-valid');
    expect(state.executions).toHaveLength(0);

    const soon = new Date(Date.now() + REFRESH_WINDOW_MS / 2).toISOString();
    upsertProfile('default', { token: 'expiring', org_id: '739224', expires_at: soon });
    expect(await refreshTokenIfNeeded()).toBe('tok_739224_1');
    expect(state.executions.at(-1)?.body.arguments).toEqual({
      organization_id: '739224',
      read_only: true,
      anonymize: true,
    });
    expect(loadProfiles().profiles.default.token).toBe('tok_739224_1');
  });

  it('refreshTokenIfNeeded issues a token when none is stored, using the org from the agent record', async () => {
    ensureHostKey();
    saveAgentRecord(sampleRecord({ org_id: '739224' }));
    expect(await refreshTokenIfNeeded()).toBe('tok_739224_1');
  });

  it('refreshTokenIfNeeded is a no-op without an agent identity', async () => {
    expect(await refreshTokenIfNeeded()).toBeNull();
  });

  it('resolveTokenAsync prefers flag and env, refreshes otherwise, and hints on a revoked agent', async () => {
    ensureHostKey();
    saveAgentRecord(sampleRecord({ org_id: '739224' }));
    expect(await resolveTokenAsync('flag-token')).toBe('flag-token');
    process.env.EPILOT_TOKEN = 'env-token';
    expect(await resolveTokenAsync()).toBe('env-token');
    delete process.env.EPILOT_TOKEN;
    expect(state.executions).toHaveLength(0);

    expect(await resolveTokenAsync()).toBe('tok_739224_1');

    // Expired stored token + revoked agent → hint, then fall back to the stored resolution (null: expired).
    state.agentStatus = 'revoked';
    upsertProfile('default', { token: 'old', org_id: '739224', expires_at: new Date(Date.now() - 1000).toISOString() });
    expect(await resolveTokenAsync()).toBeNull();
    expect(output.out.stderr).toContain('agent_revoked');
    expect(output.out.stderr).toContain('epilot auth login');
  });
});
