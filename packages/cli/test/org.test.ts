import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateKeyPair } from '@epilot/agent-auth';
import { ensureHostKey, loadAgentRecord, saveAgentRecord } from '../src/lib/agent-auth.js';
import { upsertProfile } from '../src/lib/profiles.js';
import { saveCredentials } from '../src/lib/auth-store.js';
import {
  ISSUER,
  createState,
  startFakeAap,
  useTempConfigDir,
  captureOutput,
  type FakeState,
} from './helpers/fake-aap.js';

vi.mock('open', () => ({ default: vi.fn().mockResolvedValue(undefined) }));

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;
let exitSpy: ReturnType<typeof vi.spyOn>;

const originalIsTTY = process.stdout.isTTY;

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
  exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
    throw new Error('process.exit called');
  }) as never);
  Object.defineProperty(process.stdout, 'isTTY', { value: true, writable: true, configurable: true });
  vi.clearAllMocks();
});
afterEach(() => {
  Object.defineProperty(process.stdout, 'isTTY', { value: originalIsTTY, writable: true, configurable: true });
  exitSpy.mockRestore();
  output.restore();
  tmp.restore();
  delete process.env.EPILOT_AGENT_AUTH_ISSUER;
});

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
  });
  saveCredentials({
    token: 'tok_739224_0',
    org_id: '739224',
    expires_at: new Date(Date.now() + 3600_000).toISOString(),
  });
};

const stripAnsi = (s: string) => s.replace(new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g'), '');

const org = async () => (await import('../src/commands/org.js')).default;
const sub = async (name: 'list' | 'use' | 'request' | 'current') => {
  const cmd = await org();
  return (cmd.subCommands as any)[name] as { run: (ctx: any) => Promise<void> };
};

describe('epilot org', () => {
  it('list: prints a table with access status and marks the active organization', async () => {
    seedAgent();
    state.grants.push({
      id: 'grant_3',
      capability: 'epilot.access_token.issue',
      status: 'pending',
      constraints: { organization_id: '911210', read_only: false },
    });
    await (await sub('list')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toMatch(/ID\s+NAME\s+TYPE\s+ACCESS/);
    expect(plain).toMatch(/\* 739224\s+ACME Energy\s+Vendor\s+granted \(read-only, anonymized\)/);
    expect(plain).toMatch(/ {2}911210\s+Beta Grid\s+Partner\s+pending/);
    expect(plain).toContain('* active organization');
  });

  it('list --json: emits organizations with an active flag', async () => {
    seedAgent();
    await (await sub('list')).run({ args: { json: true } });
    const parsed = JSON.parse(output.out.stdout);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toMatchObject({ organization_id: '739224', active: true, access: { granted: true } });
    expect(parsed[1]).toMatchObject({ organization_id: '911210', active: false, access: { granted: false } });
  });

  it('list: exits with a login hint when no agent identity exists', async () => {
    await expect((await sub('list')).run({ args: {} })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('epilot auth login');
  });

  it('use <id>: issues a token for a granted organization and stores it as active', async () => {
    seedAgent();
    state.grants.push({
      id: 'grant_3',
      capability: 'epilot.access_token.issue',
      status: 'active',
      constraints: { organization_id: '911210', read_only: false, anonymize: false },
    });
    await (await sub('use')).run({ args: { id: '911210' } });
    expect(state.executions.map((e) => e.body.capability)).toEqual([
      'epilot.organizations.list',
      'epilot.access_token.issue',
    ]);
    expect(state.executions[1].body.arguments).toEqual({
      organization_id: '911210',
      read_only: false,
      anonymize: false,
    });
    const creds = JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8'));
    expect(creds).toMatchObject({ token: 'tok_911210_1', org_id: '911210' });
    expect(loadAgentRecord()).toMatchObject({ org_id: '911210', read_only: false, anonymize: false });
    expect(output.out.stdout).toContain('Switched to organization');
    expect(output.out.stdout).toContain('Beta Grid');
  });

  it('use <id>: runs the request flow for an organization without a grant (interactive)', async () => {
    seedAgent();
    const open = (await import('open')).default as ReturnType<typeof vi.fn>;
    await (await sub('use')).run({ args: { id: '911210' } });
    expect(state.capabilityRequests).toHaveLength(1);
    expect(state.capabilityRequests[0].body.capabilities).toEqual([
      {
        name: 'epilot.access_token.issue',
        constraints: { organization_id: '911210', read_only: true, anonymize: true },
      },
    ]);
    expect(open).toHaveBeenCalledWith(expect.stringContaining('agent_approval=REQQ-1234'));
    expect(output.out.stdout).toContain('Verification code: \x1b[1mREQQ-1234');
    // waited for the grant, then issued
    expect(state.executions.at(-1)?.body).toEqual({
      capability: 'epilot.access_token.issue',
      arguments: { organization_id: '911210' },
    });
    expect(JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8')).org_id).toBe('911210');
  });

  it('use <id>: fails for an unknown organization', async () => {
    seedAgent();
    await expect((await sub('use')).run({ args: { id: '000' } })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('organization_not_found');
  });

  it('request <id> --write --full-pii --reason: interactive flow waits and switches', async () => {
    seedAgent();
    await (await sub('request')).run({
      args: { id: '911210', write: true, 'full-pii': true, reason: 'Import meter readings' },
    });
    expect(state.capabilityRequests[0].body).toEqual({
      capabilities: [
        {
          name: 'epilot.access_token.issue',
          constraints: { organization_id: '911210', read_only: false, anonymize: false },
        },
      ],
      reason: 'Import meter readings',
    });
    expect(state.polls).toBeGreaterThanOrEqual(2);
    expect(state.executions.at(-1)?.body.arguments.organization_id).toBe('911210');
    expect(output.out.stdout).toContain('Switched to organization');
  });

  it('request <id> --no-interactive --json: prints the pending approval and exits 0', async () => {
    seedAgent();
    const open = (await import('open')).default as ReturnType<typeof vi.fn>;
    await (await sub('request')).run({ args: { id: '911210', interactive: false, json: true } });
    expect(open).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
    const printed = JSON.parse(output.out.stdout);
    expect(printed.status).toBe('pending');
    expect(printed.organization_id).toBe('911210');
    expect(printed.approval).toMatchObject({ method: 'device_authorization', user_code: 'REQQ-1234' });
    expect(printed.grants[0]).toMatchObject({ status: 'pending' });
    expect(printed.next).toBe('epilot org use 911210');
    expect(state.executions).toHaveLength(0);

    // After the user approved in the browser, `org use` completes the switch.
    state.grants = state.grants.map((g) => ({ ...g, status: 'active' as const }));
    output.out.stdout = '';
    await (await sub('use')).run({ args: { id: '911210', json: true } });
    expect(JSON.parse(output.out.stdout)).toMatchObject({ status: 'active', organization_id: '911210' });
  });

  it('request <id>: reports a denied grant', async () => {
    seedAgent();
    const { http, HttpResponse } = await import('msw');
    server.use(
      http.get(`${ISSUER}/agent/status`, () =>
        HttpResponse.json({
          agent_id: 'agent_1',
          host_id: 'host_1',
          name: 'x',
          status: 'active',
          mode: 'delegated',
          agent_capability_grants: state.grants.map((g) => (g.status === 'pending' ? { ...g, status: 'denied' } : g)),
          created_at: '2026-01-01T00:00:00Z',
        }),
      ),
    );
    await expect((await sub('request')).run({ args: { id: '911210' } })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('denied');
    server.resetHandlers();
  });

  it('current: shows the active organization with its name and access', async () => {
    seedAgent();
    await (await sub('current')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Active organization: ACME Energy (739224)');
    expect(plain).toContain('granted (read-only, anonymized)');

    output.out.stdout = '';
    await (await sub('current')).run({ args: { json: true } });
    expect(JSON.parse(output.out.stdout)).toMatchObject({
      organization_id: '739224',
      organization_name: 'ACME Energy',
      read_only: true,
      anonymize: true,
      agent_id: 'agent_1',
    });
  });

  it('current: works without an agent (plain token profiles) and reports when nothing is active', async () => {
    await (await sub('current')).run({ args: {} });
    expect(output.out.stdout).toContain('No active organization');
    upsertProfile('default', { token: 'manual', org_id: '555' });
    output.out.stdout = '';
    await (await sub('current')).run({ args: {} });
    expect(output.out.stdout).toContain('555');
  });
});
