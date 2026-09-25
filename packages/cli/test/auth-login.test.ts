import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateKeyPair } from '@epilot/agent-auth';
import { ensureHostKey, loadAgentRecord, loadHostKey, saveAgentRecord } from '../src/lib/agent-auth.js';
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

vi.mock('open', () => ({ default: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@inquirer/prompts', () => ({ select: vi.fn(), password: vi.fn(), confirm: vi.fn(), input: vi.fn() }));

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;
let exitSpy: ReturnType<typeof vi.spyOn>;

const originalStdinTTY = process.stdin.isTTY;
const originalStdoutTTY = process.stdout.isTTY;
const setTTY = (value: boolean) => {
  Object.defineProperty(process.stdin, 'isTTY', { value, writable: true, configurable: true });
  Object.defineProperty(process.stdout, 'isTTY', { value, writable: true, configurable: true });
};

beforeAll(() => {
  state = createState();
  server = startFakeAap(state);
});
afterAll(() => server.close());

beforeEach(() => {
  tmp = useTempConfigDir();
  output = captureOutput();
  process.env.EPILOT_AGENT_AUTH_ISSUER = ISSUER;
  Object.assign(state, createState());
  exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
    throw new Error('process.exit called');
  }) as never);
  vi.clearAllMocks();
});
afterEach(() => {
  Object.defineProperty(process.stdin, 'isTTY', { value: originalStdinTTY, writable: true, configurable: true });
  Object.defineProperty(process.stdout, 'isTTY', { value: originalStdoutTTY, writable: true, configurable: true });
  exitSpy.mockRestore();
  output.restore();
  tmp.restore();
  delete process.env.EPILOT_AGENT_AUTH_ISSUER;
});

const loadLogin = async () => (await import('../src/commands/auth-login.js')).default;
const run = async (args: Record<string, unknown>) => (await loadLogin()).run!({ args } as any);

describe('epilot auth login (plain, default)', () => {
  it('--token saves directly without touching Agent Auth', async () => {
    await run({ token: 'manual-token', profile: 'p1' });
    expect(loadProfiles().profiles.p1.token).toBe('manual-token');
    expect(output.out.stdout).toContain('Token saved');
    expect(state.registrations).toHaveLength(0);
    expect(existsSync(join(tmp.configDir, 'agent-auth'))).toBe(false);
  });

  it('opens the browser callback flow and does not register an agent', async () => {
    setTTY(true);
    const { confirm } = await import('@inquirer/prompts');
    (confirm as ReturnType<typeof vi.fn>).mockResolvedValue(false); // user declines to open the browser
    await expect(run({})).rejects.toThrow('process.exit called');
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('epilot CLI Login');
    expect(plain).toContain('This will open your browser to authenticate with epilot.');
    expect(plain).toMatch(/Verification code: [A-F0-9]{6}/);
    expect(plain).not.toContain('agent mode');
    expect(output.out.stderr).toContain('Login failed or was cancelled');
    expect(state.registrations).toHaveLength(0);
    expect(loadHostKey()).toBeNull();
  });

  it('requires a TTY and points at --token / auth token (same message as before)', async () => {
    setTTY(false);
    await expect(run({})).rejects.toThrow('process.exit called');
    expect(stripAnsi(output.out.stderr)).toBe(
      'Browser login requires an interactive terminal.\n' +
        'Use epilot auth login --token <token> or epilot auth token instead.\n',
    );
    expect(state.registrations).toHaveLength(0);
  });

  it('rejects agent-only flags without --agent', async () => {
    setTTY(true);
    await expect(run({ org: '739224' })).rejects.toThrow('process.exit called');
    expect(stripAnsi(output.out.stderr)).toContain('--org requires --agent');
    await expect(run({ access: 'full', reason: 'x' })).rejects.toThrow('process.exit called');
    expect(stripAnsi(output.out.stderr)).toContain('--access, --reason require --agent');
    expect(state.registrations).toHaveLength(0);
  });

  it('a plain login supersedes an agent registered for the same profile', async () => {
    ensureHostKey();
    saveAgentRecord({
      agent_id: 'agent_1',
      host_id: 'host_1',
      privateKey: generateKeyPair().privateKey,
      issuer: ISSUER,
      name: 'epilot CLI @ test',
      created_at: '2026-01-01T00:00:00Z',
    });
    await run({ token: 'manual-token' });
    expect(state.revoked).toEqual(['agent_1']);
    expect(loadAgentRecord()).toBeNull();
    expect(output.out.stdout).toContain('revoked');
    expect(output.out.stdout).toContain('Token saved');
  });
});

describe('epilot auth login --agent', () => {
  it('registers, waits for approval, issues a token for the granted org and persists everything', async () => {
    const { agentLogin } = await import('../src/commands/auth-login.js');
    const open = (await import('open')).default as ReturnType<typeof vi.fn>;

    const result = await agentLogin({
      env: 'production',
      readonly: false,
      anonymize: false,
      interactive: true,
      json: false,
    });

    // Registration request
    expect(state.registrations).toHaveLength(1);
    const registration = state.registrations[0].body;
    expect(registration.name).toMatch(/^epilot CLI @ .+/);
    expect(registration.host_name).toBe(registration.name.replace('epilot CLI @ ', ''));
    expect(registration.mode).toBe('delegated');
    expect(registration.reason).toBe('epilot CLI login');
    expect(registration.capabilities).toEqual([
      'epilot.organizations.list',
      {
        name: 'epilot.access_token.issue',
        constraints: { access_profile: 'read', anonymize: false },
      },
    ]);
    expect(state.registrations[0].authorization).toMatch(/^Bearer /);

    // Approval UX: code + URL shown, browser opened, polled until active
    expect(output.out.stdout).toContain('agent mode');
    expect(output.out.stdout).toContain('Verification code: \x1b[1mWDJB-MJHT');
    expect(output.out.stdout).toContain('agent_approval=WDJB-MJHT');
    expect(open).toHaveBeenCalledWith(expect.stringContaining('agent_approval=WDJB-MJHT'));
    expect(state.polls).toBeGreaterThanOrEqual(2);

    // Capabilities executed: list then issue for the single granted org, under the granted profile
    expect(state.executions.map((e) => e.body.capability)).toEqual([
      'epilot.organizations.list',
      'epilot.access_token.issue',
    ]);
    expect(state.executions[1].body.arguments).toEqual({ organization_id: '739224', access_profile: 'read' });

    // Result + persisted state
    expect(result).toMatchObject({
      agent_id: 'agent_1',
      host_id: 'host_1',
      issuer: ISSUER,
      organization_id: '739224',
      organization_name: 'ACME Energy',
      user_id: 'user_1',
      access_profile: 'read',
      read_only: true,
      profile: 'default',
    });
    expect(loadHostKey()).not.toBeNull();
    expect(loadAgentRecord()).toMatchObject({
      agent_id: 'agent_1',
      host_id: 'host_1',
      issuer: ISSUER,
      org_id: '739224',
      access_profile: 'read',
    });
    const creds = JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8'));
    expect(creds).toMatchObject({
      token: 'tok_739224_1',
      org_id: '739224',
      user_id: 'user_1',
      name: 'dev@epilot.cloud',
      access_profile: 'read',
    });
    expect(output.out.stdout).toContain('Login successful');
    expect(stripAnsi(output.out.stdout)).toContain('Access:       read (Read everything you can see)');
  });

  it('requests a specific organization with --org/--readonly/--anonymize and stores into the profile', async () => {
    const { agentLogin } = await import('../src/commands/auth-login.js');
    await agentLogin({
      profileName: 'work',
      env: 'dev',
      org: '911210',
      readonly: true,
      anonymize: true,
      interactive: false,
      json: true,
    });
    expect(state.registrations[0].body.capabilities[1]).toEqual({
      name: 'epilot.access_token.issue',
      constraints: { organization_id: '911210', access_profile: 'read', anonymize: true },
    });
    expect(state.executions[1].body.arguments).toEqual({
      organization_id: '911210',
      access_profile: 'read',
      anonymize: true,
    });
    expect(loadProfiles().profiles.work).toMatchObject({ token: 'tok_911210_1', org_id: '911210' });
    expect(existsSync(join(tmp.configDir, 'agent-auth', 'agents', 'work.json'))).toBe(true);
    // JSON mode: progress on stderr only
    expect(output.out.stdout).toBe('');
    expect(output.out.stderr).toContain('Verification code');
  });

  it('registers a scoped profile with its reason and issues under that profile', async () => {
    const { agentLogin } = await import('../src/commands/auth-login.js');
    const result = await agentLogin({
      env: 'production',
      org: '739224',
      profile: 'config:write',
      reason: 'Fix the PV registration journey mapping',
      readonly: false,
      anonymize: false,
      interactive: false,
      json: false,
    });
    const registration = state.registrations[0].body;
    expect(registration.reason).toBe('Fix the PV registration journey mapping');
    expect(registration.capabilities[1]).toEqual({
      name: 'epilot.access_token.issue',
      constraints: { organization_id: '739224', access_profile: 'config:write', anonymize: false },
    });
    expect(state.executions[1].body.arguments).toEqual({ organization_id: '739224', access_profile: 'config:write' });
    expect(result).toMatchObject({
      access_profile: 'config:write',
      read_only: false,
      anonymize: false,
      reason: 'Fix the PV registration journey mapping',
    });
    expect(result.grant_expires_at).toMatch(/^\d{4}-/);
    expect(loadAgentRecord()).toMatchObject({ access_profile: 'config:write', read_only: false });
    const plain = stripAnsi(output.out.stdout);
    expect(plain).toContain('Reason: Fix the PV registration journey mapping');
    expect(plain).toMatch(/Access: {7}config:write \(Change configuration\), expires in 23h/);
  });

  it('prompts for the organization when several are granted', async () => {
    const { select } = await import('@inquirer/prompts');
    (select as ReturnType<typeof vi.fn>).mockResolvedValue('911210');
    const { agentLogin } = await import('../src/commands/auth-login.js');
    state.extraGrantsOnApproval = [
      {
        id: 'grant_x',
        capability: 'epilot.access_token.issue',
        status: 'active',
        constraints: { organization_id: '911210', read_only: true, anonymize: true },
      },
    ];
    const result = await agentLogin({
      env: 'production',
      readonly: true,
      anonymize: true,
      interactive: true,
      json: false,
    });
    expect(select).toHaveBeenCalledTimes(1);
    const choices = (select as ReturnType<typeof vi.fn>).mock.calls[0][0].choices as { value: string }[];
    expect(choices.map((c) => c.value)).toEqual(['739224', '911210']);
    expect(result.organization_id).toBe('911210');
    expect(state.executions[1].body.arguments.organization_id).toBe('911210');
  });

  it('fails without a prompt when several orgs are granted in non-interactive mode', async () => {
    const { chooseOrganization } = await import('../src/commands/auth-login.js');
    const orgs = [
      { organization_id: '1', access: { granted: true, pending: false, read_only: true, anonymized: true } },
      { organization_id: '2', access: { granted: true, pending: false, read_only: true, anonymized: true } },
    ];
    await expect(chooseOrganization(orgs, { interactive: false })).rejects.toMatchObject({
      code: 'organization_required',
    });
    await expect(chooseOrganization(orgs, { interactive: false, org: '2' })).resolves.toMatchObject({
      organization_id: '2',
    });
    await expect(chooseOrganization(orgs, { interactive: false, org: '3' })).rejects.toMatchObject({
      code: 'organization_not_found',
    });
    await expect(
      chooseOrganization(
        [{ organization_id: '1', access: { granted: false, pending: true, read_only: true, anonymized: true } }],
        { interactive: false, org: '1' },
      ),
    ).rejects.toMatchObject({ code: 'organization_not_granted' });
  });

  it('command: non-interactive without --org errors, --json prints the result', async () => {
    await expect(run({ agent: true, interactive: false })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('--org');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(state.registrations).toHaveLength(0);

    output.out.stdout = '';
    await run({ agent: true, interactive: false, org: '739224', json: true });
    const printed = JSON.parse(output.out.stdout);
    expect(printed).toMatchObject({ agent_id: 'agent_1', organization_id: '739224', access_profile: 'read' });
    expect(printed).not.toHaveProperty('token');
  });

  it('command: a non-read profile without --reason fails non-interactively and prompts in a TTY', async () => {
    await expect(run({ agent: true, interactive: false, org: '739224', access: 'data:write' })).rejects.toThrow(
      'process.exit called',
    );
    expect(output.out.stderr).toContain('reason_required');
    expect(output.out.stderr).toContain('--reason');
    expect(state.registrations).toHaveLength(0);

    setTTY(true);
    const { input } = await import('@inquirer/prompts');
    (input as ReturnType<typeof vi.fn>).mockResolvedValue('Import meter readings from the portal export');
    await run({ agent: true, org: '739224', access: 'data:write' });
    expect(input).toHaveBeenCalledTimes(1);
    expect(state.registrations[0].body.reason).toBe('Import meter readings from the portal export');
    expect(state.registrations[0].body.capabilities[1].constraints.access_profile).toBe('data:write');
  });

  it('command: --anonymize with a write profile is an error, unknown profiles too', async () => {
    await expect(
      run({ agent: true, interactive: false, org: '739224', access: 'full', anonymize: true, reason: 'Full sync run' }),
    ).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('anonymize is only available with read profiles');
    expect(state.registrations).toHaveLength(0);

    await expect(run({ agent: true, interactive: false, org: '739224', access: 'admin' })).rejects.toThrow(
      'process.exit called',
    );
    expect(output.out.stderr).toContain('Unknown access profile "admin"');
  });

  it('command: --readonly downgrades a write profile to its read sibling', async () => {
    await run({
      agent: true,
      interactive: false,
      org: '739224',
      access: 'config:write',
      readonly: true,
      anonymize: true,
      reason: 'Audit the journey configuration',
    });
    expect(output.out.stderr).toContain('--readonly downgrades config:write to config:read');
    expect(state.registrations[0].body.capabilities[1].constraints).toEqual({
      organization_id: '739224',
      access_profile: 'config:read',
      anonymize: true,
    });
  });

  it('command: reports a rejected agent as a failure', async () => {
    // Make the status endpoint report rejection on the first poll
    const { http, HttpResponse } = await import('msw');
    server.use(
      http.get(`${ISSUER}/agent/status`, () =>
        HttpResponse.json({
          agent_id: 'agent_1',
          host_id: 'host_1',
          name: 'x',
          status: 'rejected',
          mode: 'delegated',
          agent_capability_grants: [],
          created_at: '2026-01-01T00:00:00Z',
        }),
      ),
    );
    await expect(run({ agent: true, interactive: false, org: '739224' })).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('agent_rejected');
    server.resetHandlers();
  });
});
