import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadAgentRecord, loadHostKey } from '../src/lib/agent-auth.js';
import { loadProfiles } from '../src/lib/profiles.js';
import {
  ISSUER,
  createState,
  startFakeAap,
  useTempConfigDir,
  captureOutput,
  type FakeState,
} from './helpers/fake-aap.js';

vi.mock('open', () => ({ default: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@inquirer/prompts', () => ({ select: vi.fn(), password: vi.fn(), confirm: vi.fn() }));

let state: FakeState;
let server: ReturnType<typeof startFakeAap>;
let tmp: ReturnType<typeof useTempConfigDir>;
let output: ReturnType<typeof captureOutput>;
let exitSpy: ReturnType<typeof vi.spyOn>;

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
  exitSpy.mockRestore();
  output.restore();
  tmp.restore();
  delete process.env.EPILOT_AGENT_AUTH_ISSUER;
});

const loadLogin = async () => (await import('../src/commands/auth-login.js')).default;

describe('epilot auth login (Agent Auth)', () => {
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
      { name: 'epilot.access_token.issue', constraints: { read_only: false, anonymize: false } },
    ]);
    expect(state.registrations[0].authorization).toMatch(/^Bearer /);

    // Approval UX: code + URL shown, browser opened, polled until active
    expect(output.out.stdout).toContain('Verification code: \x1b[1mWDJB-MJHT');
    expect(output.out.stdout).toContain('agent_approval=WDJB-MJHT');
    expect(open).toHaveBeenCalledWith(expect.stringContaining('agent_approval=WDJB-MJHT'));
    expect(state.polls).toBeGreaterThanOrEqual(2);

    // Capabilities executed: list then issue for the single granted org
    expect(state.executions.map((e) => e.body.capability)).toEqual([
      'epilot.organizations.list',
      'epilot.access_token.issue',
    ]);
    expect(state.executions[1].body.arguments).toEqual({
      organization_id: '739224',
      read_only: false,
      anonymize: false,
    });

    // Result + persisted state
    expect(result).toMatchObject({
      agent_id: 'agent_1',
      host_id: 'host_1',
      issuer: ISSUER,
      organization_id: '739224',
      organization_name: 'ACME Energy',
      user_id: 'user_1',
      profile: 'default',
    });
    expect(loadHostKey()).not.toBeNull();
    expect(loadAgentRecord()).toMatchObject({
      agent_id: 'agent_1',
      host_id: 'host_1',
      issuer: ISSUER,
      org_id: '739224',
    });
    const creds = JSON.parse(readFileSync(join(tmp.configDir, 'credentials.json'), 'utf-8'));
    expect(creds).toMatchObject({
      token: 'tok_739224_1',
      org_id: '739224',
      user_id: 'user_1',
      name: 'dev@epilot.cloud',
    });
    expect(output.out.stdout).toContain('Login successful');
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
      constraints: { organization_id: '911210', read_only: true, anonymize: true },
    });
    expect(state.executions[1].body.arguments).toEqual({ organization_id: '911210', read_only: true, anonymize: true });
    expect(loadProfiles().profiles.work).toMatchObject({ token: 'tok_911210_1', org_id: '911210' });
    expect(existsSync(join(tmp.configDir, 'agent-auth', 'agents', 'work.json'))).toBe(true);
    // JSON mode: progress on stderr only
    expect(output.out.stdout).toBe('');
    expect(output.out.stderr).toContain('Verification code');
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

  it('command: --token saves directly, non-interactive without --org errors, --json prints the result', async () => {
    const command = await loadLogin();
    await command.run!({ args: { token: 'manual-token', profile: 'p1' } } as any);
    expect(loadProfiles().profiles.p1.token).toBe('manual-token');
    expect(output.out.stdout).toContain('Token saved');

    await expect(command.run!({ args: { interactive: false } } as any)).rejects.toThrow('process.exit called');
    expect(output.out.stderr).toContain('--org');
    expect(exitSpy).toHaveBeenCalledWith(1);

    output.out.stdout = '';
    await command.run!({ args: { interactive: false, org: '739224', json: true } } as any);
    const printed = JSON.parse(output.out.stdout);
    expect(printed).toMatchObject({ agent_id: 'agent_1', organization_id: '739224' });
    expect(printed).not.toHaveProperty('token');
  });

  it('command: reports a rejected agent as a failure', async () => {
    const command = await loadLogin();
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
    await expect(command.run!({ args: { interactive: false, org: '739224' } } as any)).rejects.toThrow(
      'process.exit called',
    );
    expect(output.out.stderr).toContain('agent_rejected');
    server.resetHandlers();
  });
});
