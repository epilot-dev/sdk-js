/**
 * Fake Agent Auth Protocol server for CLI tests, implemented with msw.
 *
 * Point the CLI at it with `process.env.EPILOT_AGENT_AUTH_ISSUER = ISSUER`.
 * Implements the access-profile rules of the shared spec: `access_profile`
 * constraint (default read), reason required for non-read profiles, anonymize
 * only with read profiles, escalation grants expire per profile TTL.
 */
import { ACCESS_PROFILE_INFO, type AccessProfile, isAccessProfile, mostPermissiveProfile } from '@epilot/agent-auth';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const ISSUER = 'https://aap.test/v1/access-tokens/agent-auth';

export type FakeGrant = {
  id: string;
  capability: string;
  status: 'active' | 'pending' | 'denied';
  constraints?: Record<string, unknown>;
  reason?: string;
  expires_at?: string;
};

export type FakeOrg = { organization_id: string; organization_name: string; organization_type?: string };

export type FakeState = {
  agentStatus: 'pending' | 'active' | 'revoked' | 'rejected';
  /** Status polls that still return the current state before the agent becomes active. */
  pollsUntilActive: number;
  /** Status polls after which pending grants become active (per grant id). */
  approveGrantsAfterPolls: number;
  polls: number;
  grants: FakeGrant[];
  /** Extra grants the approval page adds when the agent becomes active (e.g. a second organization). */
  extraGrantsOnApproval: FakeGrant[];
  orgs: FakeOrg[];
  registrations: { body: any; authorization: string }[];
  capabilityRequests: { body: any; authorization: string }[];
  executions: { body: any; authorization: string }[];
  revoked: string[];
  tokenCounter: number;
};

export const createState = (overrides: Partial<FakeState> = {}): FakeState => ({
  agentStatus: 'pending',
  pollsUntilActive: 1,
  approveGrantsAfterPolls: 1,
  polls: 0,
  grants: [],
  extraGrantsOnApproval: [],
  orgs: [
    { organization_id: '739224', organization_name: 'ACME Energy', organization_type: 'Vendor' },
    { organization_id: '911210', organization_name: 'Beta Grid', organization_type: 'Partner' },
  ],
  registrations: [],
  capabilityRequests: [],
  executions: [],
  revoked: [],
  tokenCounter: 0,
  ...overrides,
});

const approval = (userCode = 'WDJB-MJHT') => ({
  method: 'device_authorization',
  verification_uri: 'https://portal.epilot.cloud/login?agent_approval',
  verification_uri_complete: `https://portal.epilot.cloud/login?agent_approval=${userCode}&agent_issuer=${encodeURIComponent(ISSUER)}`,
  user_code: userCode,
  expires_in: 60,
  interval: 1,
});

const grantProfile = (g: FakeGrant): AccessProfile =>
  isAccessProfile(g.constraints?.access_profile) ? g.constraints.access_profile : 'read';

const grantAnonymized = (g: FakeGrant): boolean =>
  ACCESS_PROFILE_INFO[grantProfile(g)].anonymizeAllowed && g.constraints?.anonymize !== false;

const usable = (g: FakeGrant) =>
  g.status === 'active' && (!g.expires_at || new Date(g.expires_at).getTime() > Date.now());

const orgGrants = (state: FakeState, orgId: string) =>
  state.grants.filter((g) => g.capability === 'epilot.access_token.issue' && g.constraints?.organization_id === orgId);

const orgAccess = (state: FakeState, orgId: string) => {
  const grants = orgGrants(state, orgId);
  const active = grants.filter(usable);
  const pending = grants.some((g) => g.status === 'pending');
  const profile = mostPermissiveProfile(active.map(grantProfile));
  const best = active.find((g) => grantProfile(g) === profile);
  return {
    granted: active.length > 0,
    pending,
    read_only: profile ? ACCESS_PROFILE_INFO[profile].readOnly : true,
    // anonymized only when every active grant for the org is anonymized (a write grant makes it false)
    anonymized: active.length > 0 && active.every(grantAnonymized),
    ...(profile ? { access_profile: profile } : {}),
    ...(best?.expires_at ? { expires_at: best.expires_at } : {}),
  };
};

/** Escalation grants expire per profile TTL when they become active. */
const activate = (g: FakeGrant): FakeGrant => {
  const ttl = ACCESS_PROFILE_INFO[grantProfile(g)].escalationTtlSeconds;
  return {
    ...g,
    status: 'active',
    ...(ttl ? { expires_at: new Date(Date.now() + ttl * 1000).toISOString() } : {}),
  };
};

/** Spec §1/§3 request validation; returns an error response or undefined. */
const validateCapabilities = (capabilities: any[], reason: unknown) => {
  for (const cap of capabilities) {
    if (typeof cap === 'string' || cap.name !== 'epilot.access_token.issue') continue;
    const profile = cap.constraints?.access_profile;
    if (profile !== undefined && !isAccessProfile(profile)) {
      return HttpResponse.json(
        { error: 'invalid_capabilities', message: `Unknown profile ${profile}` },
        { status: 400 },
      );
    }
    const effective: AccessProfile = isAccessProfile(profile) ? profile : 'read';
    if (cap.constraints?.anonymize === true && !ACCESS_PROFILE_INFO[effective].anonymizeAllowed) {
      return HttpResponse.json(
        { error: 'invalid_capabilities', message: 'anonymize is only available with read profiles' },
        { status: 400 },
      );
    }
    if (effective !== 'read' && (typeof reason !== 'string' || reason.trim().length < 10)) {
      return HttpResponse.json({ error: 'reason_required', message: 'A reason is required' }, { status: 400 });
    }
  }
  return undefined;
};

const agentStatusBody = (state: FakeState) => ({
  agent_id: 'agent_1',
  host_id: 'host_1',
  name: 'epilot CLI @ test',
  status: state.agentStatus,
  mode: 'delegated',
  agent_capability_grants: state.grants,
  user_id: 'user_1',
  created_at: '2026-01-01T00:00:00Z',
  expires_at: '2027-01-01T00:00:00Z',
});

export const handlers = (state: FakeState) => [
  http.get(`${ISSUER}/.well-known/agent-configuration`, () =>
    HttpResponse.json({
      version: '1.0-draft',
      provider_name: 'epilot',
      issuer: ISSUER,
      default_location: `${ISSUER}/capability/execute`,
      algorithms: ['EdDSA'],
      modes: ['delegated'],
      approval_methods: ['device_authorization'],
      endpoints: {
        register: '/agent/register',
        capabilities: '/capability/list',
        describe_capability: '/capability/describe',
        execute: '/capability/execute',
        request_capability: '/agent/request-capability',
        status: '/agent/status',
        reactivate: '/agent/reactivate',
        revoke: '/agent/revoke',
        revoke_host: '/host/revoke',
        rotate_key: '/agent/rotate-key',
        rotate_host_key: '/host/rotate-key',
        introspect: '/agent/introspect',
      },
    }),
  ),

  http.post(`${ISSUER}/agent/register`, async ({ request }) => {
    const body = (await request.json()) as any;
    state.registrations.push({ body, authorization: request.headers.get('authorization') ?? '' });
    const invalid = validateCapabilities(body.capabilities, body.reason);
    if (invalid) return invalid;
    // Requested capabilities become pending grants (organizations.list is a host default → active).
    state.grants = body.capabilities.map((cap: any, index: number) => {
      const name = typeof cap === 'string' ? cap : cap.name;
      return {
        id: `grant_${index + 1}`,
        capability: name,
        status: name === 'epilot.organizations.list' ? 'active' : 'pending',
        constraints: typeof cap === 'string' ? undefined : cap.constraints,
        ...(typeof cap !== 'string' && body.reason ? { reason: body.reason } : {}),
      };
    });
    return HttpResponse.json(
      {
        agent_id: 'agent_1',
        host_id: 'host_1',
        name: body.name,
        mode: 'delegated',
        status: state.agentStatus,
        agent_capability_grants: state.grants,
        ...(state.agentStatus === 'pending' ? { approval: approval() } : {}),
      },
      { status: 201 },
    );
  }),

  http.get(`${ISSUER}/agent/status`, ({ request }) => {
    if (!request.headers.get('authorization')?.startsWith('Bearer ')) {
      return HttpResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    state.polls++;
    if (state.agentStatus === 'pending' && state.polls > state.pollsUntilActive) {
      state.agentStatus = 'active';
      // The approval page grants the login organization when none was requested.
      state.grants = state.grants.map((g) =>
        g.status === 'pending'
          ? activate({
              ...g,
              constraints: { organization_id: state.orgs[0].organization_id, ...(g.constraints ?? {}) },
            })
          : g,
      );
      state.grants.push(...state.extraGrantsOnApproval);
    } else if (state.agentStatus === 'active' && state.polls > state.approveGrantsAfterPolls) {
      state.grants = state.grants.map((g) => (g.status === 'pending' ? activate(g) : g));
    }
    return HttpResponse.json(agentStatusBody(state));
  }),

  http.post(`${ISSUER}/agent/request-capability`, async ({ request }) => {
    const body = (await request.json()) as any;
    state.capabilityRequests.push({ body, authorization: request.headers.get('authorization') ?? '' });
    const invalid = validateCapabilities(body.capabilities, body.reason);
    if (invalid) return invalid;
    state.polls = 0;
    const newGrants: FakeGrant[] = body.capabilities.map((cap: any, index: number) => ({
      id: `grant_${state.grants.length + index + 1}`,
      capability: cap.name,
      status: 'pending' as const,
      constraints: cap.constraints,
      ...(body.reason ? { reason: body.reason } : {}),
    }));
    state.grants.push(...newGrants);
    return HttpResponse.json({
      agent_id: 'agent_1',
      agent_capability_grants: newGrants,
      approval: approval('REQQ-1234'),
    });
  }),

  http.post(`${ISSUER}/capability/execute`, async ({ request }) => {
    const body = (await request.json()) as any;
    state.executions.push({ body, authorization: request.headers.get('authorization') ?? '' });
    if (state.agentStatus !== 'active') {
      return HttpResponse.json(
        { error: `agent_${state.agentStatus}`, message: 'Agent is not active' },
        { status: 403 },
      );
    }
    if (body.capability === 'epilot.organizations.list') {
      return HttpResponse.json({
        data: { organizations: state.orgs.map((o) => ({ ...o, access: orgAccess(state, o.organization_id) })) },
      });
    }
    if (body.capability === 'epilot.access_token.issue') {
      const orgId = body.arguments?.organization_id;
      const access = orgAccess(state, orgId);
      if (!access.granted) {
        return HttpResponse.json({ error: 'grant_missing', message: `No grant for ${orgId}` }, { status: 403 });
      }
      const requested = body.arguments?.access_profile;
      const active = orgGrants(state, orgId).filter(usable);
      const grant = requested
        ? active.find((g) => grantProfile(g) === requested)
        : active.find((g) => grantProfile(g) === access.access_profile);
      if (!grant) {
        return HttpResponse.json(
          { error: 'constraint_violated', message: `No grant covers profile ${requested}` },
          { status: 403 },
        );
      }
      const profile = grantProfile(grant);
      const info = ACCESS_PROFILE_INFO[profile];
      if (body.arguments?.read_only === false && info.readOnly) {
        return HttpResponse.json({ error: 'constraint_violated', message: 'read_only must be true' }, { status: 403 });
      }
      if (body.arguments?.anonymize === false && grantAnonymized(grant)) {
        return HttpResponse.json({ error: 'constraint_violated', message: 'anonymize must be true' }, { status: 403 });
      }
      state.tokenCounter++;
      return HttpResponse.json({
        data: {
          token: `tok_${orgId}_${state.tokenCounter}`,
          token_id: `tokid_${state.tokenCounter}`,
          organization_id: orgId,
          user_id: 'user_1',
          email: 'dev@epilot.cloud',
          access_profile: profile,
          read_only: info.readOnly,
          anonymize: info.anonymizeAllowed ? (body.arguments?.anonymize ?? grantAnonymized(grant)) : false,
          expires_at: new Date(Date.now() + 3600_000).toISOString(),
        },
      });
    }
    return HttpResponse.json({ error: 'unknown_capability' }, { status: 404 });
  }),

  http.post(`${ISSUER}/agent/revoke`, async ({ request }) => {
    const body = (await request.json()) as any;
    state.revoked.push(body.agent_id);
    state.agentStatus = 'revoked';
    return HttpResponse.json({ agent_id: body.agent_id, status: 'revoked' });
  }),
];

export const startFakeAap = (state: FakeState) => {
  const server = setupServer(...handlers(state));
  server.listen({ onUnhandledRequest: 'error' });
  return server;
};

/** Isolated XDG config dir so tests never touch ~/.config/epilot. */
export const useTempConfigDir = () => {
  const dir = mkdtempSync(join(tmpdir(), 'epilot-cli-test-'));
  const previous = { XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME, EPILOT_PROFILE: process.env.EPILOT_PROFILE };
  process.env.XDG_CONFIG_HOME = dir;
  delete process.env.EPILOT_PROFILE;
  return {
    dir,
    configDir: join(dir, 'epilot'),
    restore: () => {
      rmSync(dir, { recursive: true, force: true });
      if (previous.XDG_CONFIG_HOME === undefined) delete process.env.XDG_CONFIG_HOME;
      else process.env.XDG_CONFIG_HOME = previous.XDG_CONFIG_HOME;
      if (previous.EPILOT_PROFILE !== undefined) process.env.EPILOT_PROFILE = previous.EPILOT_PROFILE;
    },
  };
};

/** Capture stdout/stderr writes. */
export const captureOutput = () => {
  const out = { stdout: '', stderr: '' };
  const stdoutWrite = process.stdout.write.bind(process.stdout);
  const stderrWrite = process.stderr.write.bind(process.stderr);
  process.stdout.write = ((chunk: any) => {
    out.stdout += String(chunk);
    return true;
  }) as any;
  process.stderr.write = ((chunk: any) => {
    out.stderr += String(chunk);
    return true;
  }) as any;
  return {
    out,
    restore: () => {
      process.stdout.write = stdoutWrite;
      process.stderr.write = stderrWrite;
    },
  };
};

export const stripAnsi = (s: string) => s.replace(new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g'), '');
