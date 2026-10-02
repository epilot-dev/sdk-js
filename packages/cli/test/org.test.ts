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
  stripAnsi,
  type FakeState,
} from './helpers/fake-aap.js';

vi.mock('open', () => ({ default: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@inquirer/prompts', () => ({ input: vi.fn(), select: vi.fn() }));

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;
let exitSpy: ReturnType<typeof vi.spyOn>;

const originalStdoutTTY = process.stdout.isTTY;
const originalStdinTTY = process.stdin.isTTY;
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
  Object.defineProperty(process.stdin, 'isTTY', { value: true, writable: true, configurable: true });
  vi.clearAllMocks();
});
afterEach(() => {
  Object.defineProperty(process.stdout, 'isTTY', { value: originalStdoutTTY, writable: true, configurable: true });
  Object.defineProperty(process.stdin, 'isTTY', { value: originalStdinTTY, writable: true, configurable: true });
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
    access_profile: 'read',
    anonymize: true,
  });
  saveCredentials({
    token: 'tok_739224_0',
    org_id: '739224',
    access_profile: 'read',
    expires_at: new Date(Date.now() + HOUR).toISOString(),
  });
};

const org = async () => (await import('../src/commands/org.js')).default;
const sub = async (name: 'list' | 'use' | 'request' | 'current') => {
  const cmd = await org();
  return (cmd.subCommands as any)[name] as { run: (ctx: any) => Promise<void> };
};

describe('epilot org', () => {
  it('list: prints profile, expiry and pending state per organization and marks the active one', async () => {
    seedAgent();
    state.grants.push({
      id: 'grant_3',
      capability: 'epilot.access_token.issue',
      status: 'pending',
      constraints: { organization_id: '911210', access_profile: 'data:write' },
    });
    await (await sub('list')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toMatch(/ID\s+NAME\s+TYPE\s+ACCESS/);
    expect(plain).toMatch(/\* 739224\s+ACME Energy\s+Vendor\s+granted \(read, anonymized\)/);
    expect(plain).toMatch(/ {2}911210\s+Beta Grid\s+Partner\s+pending/);
    expect(plain).toContain('* active organization');

    // An escalation grant shows its profile and expiry; "anonymized" only when every grant is anonymized.
    state.grants.push({
      id: 'grant_4',
      capability: 'epilot.access_token.issue',
      status: 'active',
      constraints: { organization_id: '739224', access_profile: 'config:write' },
      expires_at: new Date(Date.now() + 23.5 * HOUR).toISOString(),
      reason: 'Fix the PV registration journey mapping',
    });
    output.out.stdout = '';
    await (await sub('list')).run({ args: {} });
    expect(stripAnsi(output.out.stdout)).toMatch(
      /739224\s+ACME Energy\s+Vendor\s+granted \(config:write, expires in 23h\)/,
    );
  });

  it('list --json: emits organizations with an active flag and access profile', async () => {
    seedAgent();
    await (await sub('list')).run({ args: { json: true } });
    const parsed = JSON.parse(output.out.stdout);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toMatchObject({
      organization_id: '739224',
      active: true,
      access: { granted: true, access_profile: 'read', anonymized: true },
    });
    expect(parsed[1]).toMatchObject({ organization_id: '911210', active: false, access: { granted: false } });
  });

  it('requires an agent identity: hint on stderr, {error: "agent_required"} with --json', async () => {
    for (const name of ['list', 'use', 'request', 'current'] as const) {
      output.out.stdout = '';
      output.out.stderr = '';
      await expect((await sub(name)).run({ args: { id: '911210' } })).rejects.toThrow('process.exit called');
      expect(stripAnsi(output.out.stderr)).toContain(
        'This profile has no agent identity. Run epilot auth login --agent first.',
      );
      expect(output.out.stdout).toBe('');
      expect(exitSpy).toHaveBeenLastCalledWith(1);
    }
    // A plain-login profile (token only) is not enough either.
    upsertProfile('default', { token: 'manual', org_id: '555' });
    output.out.stdout = '';
    await expect((await sub('current')).run({ args: { json: true } })).rejects.toThrow('process.exit called');
    expect(JSON.parse(output.out.stdout)).toMatchObject({ error: 'agent_required' });
    expect(state.executions).toHaveLength(0);
  });

  it('use <id>: issues a token under the most permissive grant and stores profile + token', async () => {
    seedAgent();
    state.grants.push(
      {
        id: 'grant_3',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '911210', access_profile: 'data:read', anonymize: true },
        expires_at: new Date(Date.now() + 6 * 24 * HOUR).toISOString(),
      },
      {
        id: 'grant_4',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '911210', access_profile: 'config:write' },
        expires_at: new Date(Date.now() + 20 * HOUR).toISOString(),
      },
    );
    await (await sub('use')).run({ args: { id: '911210' } });
    expect(state.executions.map((e) => e.body.capability)).toEqual([
      'epilot.organizations.list',
      'epilot.access_token.issue',
    ]);
    expect(state.executions[1].body.arguments).toEqual({ organization_id: '911210', access_profile: 'config:write' });
    const creds = JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8'));
    expect(creds).toMatchObject({ token: 'tok_911210_1', org_id: '911210', access_profile: 'config:write' });
    expect(loadAgentRecord()).toMatchObject({ org_id: '911210', access_profile: 'config:write', read_only: false });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Switched to organization');
    expect(plain).toContain('Beta Grid');
    expect(plain).toMatch(/Access: config:write \(Change configuration\), expires in (19|20)h/);

    // --access picks a specific granted profile; an uncovered one is refused by the server.
    output.out.stdout = '';
    await (await sub('use')).run({ args: { id: '911210', access: 'data:read', json: true } });
    expect(state.executions.at(-1)?.body.arguments).toEqual({ organization_id: '911210', access_profile: 'data:read' });
    expect(JSON.parse(output.out.stdout)).toMatchObject({
      status: 'active',
      access_profile: 'data:read',
      read_only: true,
      anonymize: true,
    });
    await expect((await sub('use')).run({ args: { id: '911210', access: 'full' } })).rejects.toThrow(
      'process.exit called',
    );
    expect(output.out.stderr).toContain('constraint_violated');
  });

  it('use <id>: runs the request flow for an organization without a grant (interactive)', async () => {
    seedAgent();
    const open = (await import('open')).default as ReturnType<typeof vi.fn>;
    await (await sub('use')).run({ args: { id: '911210' } });
    expect(state.capabilityRequests).toHaveLength(1);
    expect(state.capabilityRequests[0].body).toEqual({
      capabilities: [
        {
          name: 'epilot.access_token.issue',
          constraints: { organization_id: '911210', access_profile: 'read', anonymize: true },
        },
      ],
      reason: 'epilot CLI: access to organization 911210',
    });
    expect(open).toHaveBeenCalledWith(expect.stringContaining('agent_approval=REQQ-1234'));
    expect(output.out.stdout).toContain('Verification code: \x1b[1mREQQ-1234');
    // waited for the grant, then issued under the granted profile
    expect(state.executions.at(-1)?.body).toEqual({
      capability: 'epilot.access_token.issue',
      arguments: { organization_id: '911210', access_profile: 'read', anonymize: true },
    });
    expect(JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8')).org_id).toBe('911210');
  });

  it('use <id>: fails for an unknown organization', async () => {
    seedAgent();
    await expect((await sub('use')).run({ args: { id: '000' } })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('organization_not_found');
  });

  it('request <id> --access config:write --reason: posts profile + reason, waits and switches', async () => {
    seedAgent();
    await (await sub('request')).run({
      args: { id: '911210', access: 'config:write', reason: 'Fix the PV registration journey mapping' },
    });
    expect(state.capabilityRequests[0].body).toEqual({
      capabilities: [
        {
          name: 'epilot.access_token.issue',
          constraints: { organization_id: '911210', access_profile: 'config:write', anonymize: false },
        },
      ],
      reason: 'Fix the PV registration journey mapping',
    });
    expect(state.polls).toBeGreaterThanOrEqual(2);
    expect(state.executions.at(-1)?.body.arguments).toEqual({
      organization_id: '911210',
      access_profile: 'config:write',
    });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Access: config:write (Change configuration)');
    expect(plain).toContain('Reason: Fix the PV registration journey mapping');
    expect(plain).toContain('Switched to organization');
    expect(loadAgentRecord()).toMatchObject({ org_id: '911210', access_profile: 'config:write' });
  });

  it('request <id> --write --full-pii: deprecated alias for --access full, PII implied', async () => {
    seedAgent();
    await (await sub('request')).run({
      args: { id: '911210', write: true, 'full-pii': true, reason: 'Import meter readings' },
    });
    expect(stripAnsi(output.out.stderr)).toContain('--write is deprecated; use --access full');
    expect(stripAnsi(output.out.stdout)).toContain('--full-pii is implied by full');
    expect(state.capabilityRequests[0].body.capabilities[0].constraints).toEqual({
      organization_id: '911210',
      access_profile: 'full',
      anonymize: false,
    });
    expect(state.executions.at(-1)?.body.arguments).toEqual({ organization_id: '911210', access_profile: 'full' });
  });

  it('request <id> --full-pii: read profile without anonymization', async () => {
    seedAgent();
    await (await sub('request')).run({ args: { id: '911210', 'full-pii': true } });
    expect(state.capabilityRequests[0].body.capabilities[0].constraints).toEqual({
      organization_id: '911210',
      access_profile: 'read',
      anonymize: false,
    });
    expect(stripAnsi(output.out.stdout)).toContain('full personal data');
  });

  it('request <id> --access data:write without --reason: errors non-interactively, prompts in a TTY', async () => {
    seedAgent();
    await expect(
      (await sub('request')).run({ args: { id: '911210', access: 'data:write', interactive: false } }),
    ).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('reason_required');
    expect(output.out.stderr).toContain('--reason');
    expect(state.capabilityRequests).toHaveLength(0);

    output.out.stderr = '';
    await expect(
      (await sub('request')).run({ args: { id: '911210', access: 'data:write', reason: 'short', json: true } }),
    ).rejects.toThrow('process.exit called');
    expect(JSON.parse(output.out.stdout)).toMatchObject({ error: 'reason_required' });
    expect(state.capabilityRequests).toHaveLength(0);

    const { input } = await import('@inquirer/prompts');
    (input as ReturnType<typeof vi.fn>).mockResolvedValue('Import meter readings from the portal export');
    await (await sub('request')).run({ args: { id: '911210', access: 'data:write' } });
    expect(input).toHaveBeenCalledTimes(1);
    expect(state.capabilityRequests[0].body.reason).toBe('Import meter readings from the portal export');
  });

  it('request <id>: rejects unknown profiles before contacting the server', async () => {
    seedAgent();
    await expect((await sub('request')).run({ args: { id: '911210', access: 'root' } })).rejects.toThrow(
      'process.exit called',
    );
    expect(output.out.stderr).toContain('Unknown access profile "root"');
    expect(state.capabilityRequests).toHaveLength(0);
  });

  it('request <id> --no-interactive --json: prints the pending approval with the requested constraint and exits 0', async () => {
    seedAgent();
    const open = (await import('open')).default as ReturnType<typeof vi.fn>;
    await (await sub('request')).run({
      args: {
        id: '911210',
        access: 'config:read',
        reason: 'Audit the journey configuration',
        interactive: false,
        json: true,
      },
    });
    expect(open).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
    const printed = JSON.parse(output.out.stdout);
    expect(printed.status).toBe('pending');
    expect(printed.organization_id).toBe('911210');
    expect(printed.requested).toEqual({
      organization_id: '911210',
      access_profile: 'config:read',
      anonymize: true,
      reason: 'Audit the journey configuration',
    });
    expect(printed.approval).toMatchObject({ method: 'device_authorization', user_code: 'REQQ-1234' });
    expect(printed.grants[0]).toMatchObject({ status: 'pending', reason: 'Audit the journey configuration' });
    expect(printed.next).toBe('epilot org use 911210');
    expect(state.executions).toHaveLength(0);

    // After the user approved in the browser, `org use` completes the switch with the granted profile.
    state.grants = state.grants.map((g) => ({ ...g, status: 'active' as const }));
    output.out.stdout = '';
    await (await sub('use')).run({ args: { id: '911210', json: true } });
    expect(JSON.parse(output.out.stdout)).toMatchObject({
      status: 'active',
      organization_id: '911210',
      access_profile: 'config:read',
      anonymize: true,
    });
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

  it('request <id>: issues under the downgraded profile when the approver narrowed the request', async () => {
    seedAgent();
    const { http, HttpResponse } = await import('msw');
    // The approval page narrowed config:write to config:read.
    const narrow = () => {
      state.grants = state.grants.map((g) =>
        g.status === 'pending'
          ? { ...g, status: 'active' as const, constraints: { ...g.constraints, access_profile: 'config:read' } }
          : g,
      );
      return state.grants;
    };
    server.use(
      http.get(`${ISSUER}/agent/status`, () =>
        HttpResponse.json({
          agent_id: 'agent_1',
          host_id: 'host_1',
          name: 'x',
          status: 'active',
          mode: 'delegated',
          agent_capability_grants: narrow(),
          created_at: '2026-01-01T00:00:00Z',
        }),
      ),
    );
    await (await sub('request')).run({
      args: { id: '911210', access: 'config:write', reason: 'Fix the PV registration journey mapping' },
    });
    expect(stripAnsi(output.out.stdout)).toContain('granted as config:read instead of the requested config:write');
    expect(state.executions.at(-1)?.body.arguments).toEqual({
      organization_id: '911210',
      access_profile: 'config:read',
    });
    server.resetHandlers();
  });

  it('current: shows the active organization with its profile', async () => {
    seedAgent();
    await (await sub('current')).run({ args: {} });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Active organization: ACME Energy (739224)');
    expect(plain).toContain('Access: read (Read everything you can see), anonymized');

    output.out.stdout = '';
    await (await sub('current')).run({ args: { json: true } });
    expect(JSON.parse(output.out.stdout)).toMatchObject({
      organization_id: '739224',
      organization_name: 'ACME Energy',
      access_profile: 'read',
      anonymize: true,
      agent_id: 'agent_1',
    });
  });
});
