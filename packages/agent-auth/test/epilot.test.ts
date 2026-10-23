import { describe, expect, it, vi } from 'vitest';
import {
  ACCESS_PROFILES,
  ACCESS_PROFILE_INFO,
  type AgentConfiguration,
  AgentAuthClient,
  AgentAuthError,
  EPILOT_CAPABILITIES,
  generateKeyPair,
  isAccessProfile,
  isGrantUsable,
  isReadProfile,
  mostPermissiveProfile,
  organizationAccessCapability,
  organizationGrants,
  requestOrganizationAccess,
  validateReason,
} from '../src/index.js';

const ISSUER = 'https://aap.example/v1/access-tokens/agent-auth';

const config: AgentConfiguration = {
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
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const clientWithRecorder = () => {
  const bodies: unknown[] = [];
  const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const { pathname } = new URL(String(input));
    if (pathname.endsWith('/.well-known/agent-configuration')) return json(200, config);
    if (pathname.endsWith('/agent/request-capability')) {
      bodies.push(JSON.parse(String(init?.body)));
      return json(200, {
        agent_id: 'agent_1',
        agent_capability_grants: [
          { id: 'grant_2', capability: EPILOT_CAPABILITIES.accessTokenIssue, status: 'pending' },
        ],
        approval: {
          method: 'device_authorization',
          verification_uri: 'https://portal/login',
          verification_uri_complete: 'https://portal/login?code=X',
          user_code: 'X',
          expires_in: 60,
          interval: 1,
        },
      });
    }
    return json(404, { error: 'not_found' });
  });
  const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: fetchImpl as unknown as typeof fetch });
  return { client, bodies };
};

const identity = { hostKey: generateKeyPair(), agentKey: generateKeyPair(), agentId: 'agent_1' };

describe('access profiles', () => {
  it('lists the six profiles with their read-only, anonymize and TTL properties', () => {
    expect(ACCESS_PROFILES).toEqual(['read', 'config:read', 'config:write', 'data:read', 'data:write', 'full']);
    expect(ACCESS_PROFILE_INFO.read).toMatchObject({ readOnly: true, anonymizeAllowed: true });
    expect(ACCESS_PROFILE_INFO.read.escalationTtlSeconds).toBeUndefined();
    expect(ACCESS_PROFILE_INFO['config:read']).toMatchObject({
      title: 'Read configuration',
      readOnly: true,
      anonymizeAllowed: true,
      escalationTtlSeconds: 7 * 86_400,
    });
    expect(ACCESS_PROFILE_INFO['data:read'].escalationTtlSeconds).toBe(7 * 86_400);
    for (const profile of ['config:write', 'data:write', 'full'] as const) {
      expect(ACCESS_PROFILE_INFO[profile]).toMatchObject({
        readOnly: false,
        anonymizeAllowed: false,
        escalationTtlSeconds: 86_400,
      });
    }
    expect(ACCESS_PROFILE_INFO.full.title).toBe('Everything you can do');
    expect(isReadProfile('data:read')).toBe(true);
    expect(isReadProfile('data:write')).toBe(false);
    expect(isAccessProfile('config:write')).toBe(true);
    expect(isAccessProfile('admin')).toBe(false);
    expect(isAccessProfile(undefined)).toBe(false);
  });

  it('picks the most permissive profile', () => {
    expect(mostPermissiveProfile([])).toBeUndefined();
    expect(mostPermissiveProfile(['read'])).toBe('read');
    expect(mostPermissiveProfile(['config:read', 'read', 'data:read'])).toBe('data:read');
    expect(mostPermissiveProfile(['config:write', 'data:read'])).toBe('config:write');
    expect(mostPermissiveProfile(['data:write', 'full', 'read'])).toBe('full');
  });
});

describe('organizationAccessCapability', () => {
  it('writes access_profile next to the other constraints', () => {
    expect(organizationAccessCapability({ organizationId: '1', profile: 'config:write' })).toEqual({
      name: EPILOT_CAPABILITIES.accessTokenIssue,
      constraints: { organization_id: '1', access_profile: 'config:write' },
    });
    expect(organizationAccessCapability({ profile: 'data:read', anonymize: true, readOnly: true })).toEqual({
      name: EPILOT_CAPABILITIES.accessTokenIssue,
      constraints: { access_profile: 'data:read', read_only: true, anonymize: true },
    });
    expect(organizationAccessCapability({ organizationId: '1', readOnly: true, anonymize: false })).toEqual({
      name: EPILOT_CAPABILITIES.accessTokenIssue,
      constraints: { organization_id: '1', read_only: true, anonymize: false },
    });
    expect(organizationAccessCapability()).toEqual({ name: EPILOT_CAPABILITIES.accessTokenIssue });
  });

  it('rejects anonymize with a write profile (anonymize is a read-only property)', () => {
    for (const profile of ['config:write', 'data:write', 'full'] as const) {
      let error: unknown;
      try {
        organizationAccessCapability({ organizationId: '1', profile, anonymize: true });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(AgentAuthError);
      expect(error).toMatchObject({
        status: 400,
        code: 'invalid_capabilities',
        message: 'anonymize is only available with read profiles',
      });
    }
    // anonymize: false with a write profile and anonymize: true with read profiles are fine
    expect(organizationAccessCapability({ profile: 'full', anonymize: false }).constraints).toEqual({
      access_profile: 'full',
      anonymize: false,
    });
    expect(organizationAccessCapability({ profile: 'config:read', anonymize: true }).constraints).toEqual({
      access_profile: 'config:read',
      anonymize: true,
    });
  });
});

describe('organizationGrants', () => {
  it('returns profile (default read), expiry and reason per grant', () => {
    const mapped = organizationGrants([
      { capability: EPILOT_CAPABILITIES.organizationsList, status: 'active' },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '739224', read_only: true, anonymize: true },
      },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '739224', access_profile: 'config:write' },
        expires_at: '2026-09-24T10:00:00Z',
        reason: 'Fix the PV registration journey mapping',
      },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'pending',
        constraints: { organization_id: '911210', access_profile: 'data:read', read_only: true },
      },
    ]);
    expect(mapped).toHaveLength(3);
    expect(mapped[0]).toMatchObject({ organizationId: '739224', profile: 'read', readOnly: true, anonymized: true });
    expect(mapped[0].expiresAt).toBeUndefined();
    expect(mapped[0].reason).toBeUndefined();
    expect(mapped[1]).toMatchObject({
      organizationId: '739224',
      profile: 'config:write',
      readOnly: false,
      anonymized: false,
      expiresAt: '2026-09-24T10:00:00Z',
      reason: 'Fix the PV registration journey mapping',
    });
    expect(mapped[2]).toMatchObject({
      organizationId: '911210',
      profile: 'data:read',
      readOnly: true,
      anonymized: true,
    });
    expect(mapped[2].grant.status).toBe('pending');
  });

  it('never reports a write grant as anonymized and treats unknown profiles as read', () => {
    const [full, unknown] = organizationGrants([
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '1', access_profile: 'full', anonymize: true },
      },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '1', access_profile: 'superuser' },
      },
    ]);
    expect(full.anonymized).toBe(false);
    expect(full.readOnly).toBe(false);
    expect(unknown.profile).toBe('read');
    expect(unknown.readOnly).toBe(true);
  });

  it('isGrantUsable requires active status and an unexpired grant', () => {
    const now = Date.parse('2026-09-23T12:00:00Z');
    const [lifetime, live, expired, pending] = organizationGrants([
      { capability: EPILOT_CAPABILITIES.accessTokenIssue, status: 'active', constraints: { organization_id: '1' } },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '1', access_profile: 'full' },
        expires_at: '2026-09-24T12:00:00Z',
      },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '1', access_profile: 'data:write' },
        expires_at: '2026-09-23T11:00:00Z',
      },
      { capability: EPILOT_CAPABILITIES.accessTokenIssue, status: 'pending', constraints: { organization_id: '1' } },
    ]);
    expect(isGrantUsable(lifetime, now)).toBe(true);
    expect(isGrantUsable(live, now)).toBe(true);
    expect(isGrantUsable(expired, now)).toBe(false);
    expect(isGrantUsable(pending, now)).toBe(false);
  });
});

describe('requestOrganizationAccess', () => {
  it('defaults to read + anonymized and sends no reason when none is given', async () => {
    const { client, bodies } = clientWithRecorder();
    const response = await requestOrganizationAccess(client, identity, { organizationId: '911210' });
    expect(response.agent_capability_grants[0].id).toBe('grant_2');
    expect(bodies[0]).toEqual({
      capabilities: [
        {
          name: EPILOT_CAPABILITIES.accessTokenIssue,
          constraints: { organization_id: '911210', access_profile: 'read', anonymize: true },
        },
      ],
    });
  });

  it('defaults anonymize to false for write profiles and posts the trimmed reason', async () => {
    const { client, bodies } = clientWithRecorder();
    await requestOrganizationAccess(client, identity, {
      organizationId: '911210',
      profile: 'config:write',
      reason: '  Fix the entity mapping of the PV journey  ',
    });
    expect(bodies[0]).toEqual({
      capabilities: [
        {
          name: EPILOT_CAPABILITIES.accessTokenIssue,
          constraints: { organization_id: '911210', access_profile: 'config:write', anonymize: false },
        },
      ],
      reason: 'Fix the entity mapping of the PV journey',
    });
  });

  it('lets read profiles opt out of anonymization', async () => {
    const { client, bodies } = clientWithRecorder();
    await requestOrganizationAccess(client, identity, {
      organizationId: '911210',
      profile: 'data:read',
      anonymize: false,
      reason: 'Reconcile contact duplicates',
    });
    expect((bodies[0] as { capabilities: { constraints: unknown }[] }).capabilities[0].constraints).toEqual({
      organization_id: '911210',
      access_profile: 'data:read',
      anonymize: false,
    });
  });

  it('throws reason_required for non-read profiles without a (long enough) reason', async () => {
    const { client, bodies } = clientWithRecorder();
    await expect(
      requestOrganizationAccess(client, identity, { organizationId: '1', profile: 'full' }),
    ).rejects.toMatchObject({ status: 400, code: 'reason_required' });
    await expect(
      requestOrganizationAccess(client, identity, { organizationId: '1', profile: 'data:read', reason: 'short' }),
    ).rejects.toMatchObject({ code: 'reason_required' });
    await expect(
      requestOrganizationAccess(client, identity, { organizationId: '1', profile: 'full', reason: 'x'.repeat(201) }),
    ).rejects.toMatchObject({ code: 'invalid_request' });
    expect(bodies).toHaveLength(0);
  });

  it('throws invalid_capabilities for anonymize with a write profile before sending anything', async () => {
    const { client, bodies } = clientWithRecorder();
    await expect(
      requestOrganizationAccess(client, identity, {
        organizationId: '1',
        profile: 'data:write',
        anonymize: true,
        reason: 'Import meter readings from the portal',
      }),
    ).rejects.toMatchObject({
      code: 'invalid_capabilities',
      message: 'anonymize is only available with read profiles',
    });
    expect(bodies).toHaveLength(0);
  });

  it('validateReason trims and accepts optional reasons for read', () => {
    expect(validateReason('read', undefined)).toBeUndefined();
    expect(validateReason('read', '   ')).toBeUndefined();
    expect(validateReason('read', ' short ')).toBe('short');
    expect(validateReason('config:read', 'Audit the journey configuration')).toBe('Audit the journey configuration');
    expect(() => validateReason('config:read', undefined)).toThrow(AgentAuthError);
  });
});
