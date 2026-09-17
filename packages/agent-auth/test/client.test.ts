import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type AgentConfiguration,
  AgentAuthClient,
  AgentAuthError,
  EPILOT_CAPABILITIES,
  decodeJwt,
  epilotAgentAuthIssuer,
  generateKeyPair,
  issueEpilotAccessToken,
  listEpilotOrganizations,
  organizationAccessCapability,
  organizationGrants,
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
    status: `${ISSUER}/agent/status`,
    reactivate: '/agent/reactivate',
    revoke: '/agent/revoke',
    revoke_host: '/host/revoke',
    rotate_key: '/agent/rotate-key',
    rotate_host_key: '/host/rotate-key',
    introspect: '/agent/introspect',
  },
};

type Call = { method: string; url: string; headers: Record<string, string>; body?: unknown };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/** Minimal fake AAP server: records calls, routes by pathname. */
const fakeServer = (routes: Record<string, (call: Call) => Response | Promise<Response>>) => {
  const calls: Call[] = [];
  const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const headers = Object.fromEntries(
      Object.entries((init?.headers ?? {}) as Record<string, string>).map(([k, v]) => [k.toLowerCase(), v]),
    );
    const call: Call = {
      method: init?.method ?? 'GET',
      url,
      headers,
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    };
    calls.push(call);
    const { pathname } = new URL(url);
    const handler = routes[pathname];
    if (!handler) return json(404, { error: 'not_found', message: `No route for ${pathname}` });
    return handler(call);
  });
  return { calls, fetch: fetchImpl as unknown as typeof fetch };
};

const discoveryRoute = { '/v1/access-tokens/agent-auth/.well-known/agent-configuration': () => json(200, config) };

const bearerOf = (call: Call) => call.headers.authorization?.replace(/^Bearer /, '') ?? '';

describe('AgentAuthClient', () => {
  const hostKey = generateKeyPair();
  const agentKey = generateKeyPair();
  const identity = { hostKey, agentKey, agentId: 'agent_1' };

  it('caches discovery for the TTL and refetches when forced', async () => {
    const server = fakeServer(discoveryRoute);
    const client = new AgentAuthClient({ baseUrl: `${ISSUER}/`, fetch: server.fetch });
    expect(await client.discover()).toEqual(config);
    await client.discover();
    await client.endpoint('register');
    expect(server.calls).toHaveLength(1);
    expect(server.calls[0].url).toBe(`${ISSUER}/.well-known/agent-configuration`);
    await client.discover(true);
    expect(server.calls).toHaveLength(2);
  });

  it('resolves relative and absolute endpoints against the issuer', async () => {
    const server = fakeServer(discoveryRoute);
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    expect(await client.endpoint('register')).toBe(`${ISSUER}/agent/register`);
    expect(await client.endpoint('status')).toBe(`${ISSUER}/agent/status`);
  });

  it('registers an agent with a host JWT carrying the agent public key', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/agent/register': () =>
        json(201, {
          agent_id: 'agent_1',
          host_id: 'host_1',
          name: 'epilot CLI',
          mode: 'delegated',
          status: 'pending',
          agent_capability_grants: [],
          approval: {
            method: 'device_authorization',
            verification_uri: 'https://portal.epilot.cloud/login?agent_approval',
            verification_uri_complete: 'https://portal.epilot.cloud/login?agent_approval=WDJB-MJHT',
            user_code: 'WDJB-MJHT',
            expires_in: 600,
            interval: 5,
          },
        }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const body = {
      name: 'epilot CLI',
      host_name: 'laptop',
      capabilities: [EPILOT_CAPABILITIES.organizationsList, organizationAccessCapability({ readOnly: true })],
      mode: 'delegated' as const,
      reason: 'epilot CLI login',
    };
    const result = await client.registerAgent(hostKey, agentKey, body);
    expect(result.status).toBe('pending');
    expect(result.approval?.method).toBe('device_authorization');

    const call = server.calls[1];
    expect(call.method).toBe('POST');
    expect(call.url).toBe(`${ISSUER}/agent/register`);
    expect(call.headers['content-type']).toBe('application/json');
    expect(call.body).toEqual(body);
    const { header, payload } = decodeJwt(bearerOf(call));
    expect(header.typ).toBe('host+jwt');
    expect(payload.iss).toBe(hostKey.thumbprint);
    expect(payload.aud).toBe(ISSUER);
    expect(payload.host_public_key).toEqual(hostKey.publicKey);
    expect(payload.agent_public_key).toEqual(agentKey.publicKey);
  });

  it('requests a capability with an agent JWT (aud = issuer)', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/agent/request-capability': () =>
        json(200, {
          agent_id: 'agent_1',
          agent_capability_grants: [
            {
              id: 'grant_2',
              capability: EPILOT_CAPABILITIES.accessTokenIssue,
              status: 'pending',
              constraints: { organization_id: '911210' },
            },
          ],
          approval: { method: 'device_authorization', user_code: 'ABCD-EFGH', expires_in: 600, interval: 5 },
        }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const result = await client.requestCapability(identity, {
      capabilities: [organizationAccessCapability({ organizationId: '911210', readOnly: false })],
      reason: 'need write access',
    });
    expect(result.agent_capability_grants[0].id).toBe('grant_2');
    const call = server.calls[1];
    expect(call.body).toEqual({
      capabilities: [
        { name: EPILOT_CAPABILITIES.accessTokenIssue, constraints: { organization_id: '911210', read_only: false } },
      ],
      reason: 'need write access',
    });
    const { header, payload } = decodeJwt(bearerOf(call));
    expect(header.typ).toBe('agent+jwt');
    expect(payload.iss).toBe(hostKey.thumbprint);
    expect(payload.sub).toBe('agent_1');
    expect(payload.aud).toBe(ISSUER);
  });

  it('fetches agent status with agent_id as query parameter and a host JWT', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/agent/status': (call) =>
        json(200, {
          agent_id: new URL(call.url).searchParams.get('agent_id'),
          host_id: 'host_1',
          name: 'epilot CLI',
          status: 'active',
          mode: 'delegated',
          agent_capability_grants: [],
          created_at: '2026-01-01T00:00:00Z',
        }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const status = await client.getAgentStatus(hostKey, 'agent_1');
    expect(status.agent_id).toBe('agent_1');
    const call = server.calls[1];
    expect(call.method).toBe('GET');
    expect(call.body).toBeUndefined();
    expect(call.headers['content-type']).toBeUndefined();
    expect(decodeJwt(bearerOf(call)).header.typ).toBe('host+jwt');
  });

  it('executes a capability with aud = default_location and a capabilities claim, unwrapping {data}', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/capability/execute': (call) => {
        const body = call.body as { capability: string; arguments?: Record<string, unknown> };
        if (body.capability === EPILOT_CAPABILITIES.organizationsList) {
          return json(200, {
            data: {
              organizations: [{ organization_id: '739224', organization_name: 'ACME', access: { granted: true } }],
            },
          });
        }
        return json(200, {
          data: {
            token: 'eyJ.tok.en',
            token_id: 'tok_1',
            organization_id: body.arguments?.organization_id,
            user_id: 'user_1',
            read_only: true,
            anonymize: true,
            expires_at: '2026-01-01T01:00:00Z',
          },
        });
      },
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });

    const orgs = await listEpilotOrganizations(client, identity);
    expect(orgs.organizations[0].organization_name).toBe('ACME');
    const listCall = server.calls[1];
    expect(listCall.url).toBe(config.default_location);
    expect(listCall.body).toEqual({ capability: EPILOT_CAPABILITIES.organizationsList });
    const listJwt = decodeJwt(bearerOf(listCall)).payload;
    expect(listJwt.aud).toBe(config.default_location);
    expect(listJwt.capabilities).toEqual([EPILOT_CAPABILITIES.organizationsList]);

    const issued = await issueEpilotAccessToken(client, identity, { organization_id: '739224', read_only: true });
    expect(issued.token).toBe('eyJ.tok.en');
    expect(issued.organization_id).toBe('739224');
    expect(server.calls[2].body).toEqual({
      capability: EPILOT_CAPABILITIES.accessTokenIssue,
      arguments: { organization_id: '739224', read_only: true },
    });
  });

  it('executes against an explicit location and unwraps async-style completed results', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/other/execute': () => json(200, { status: 'completed', result: { ok: true } }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const result = await client.execute(identity, { capability: 'x' }, 'https://aap.example/other/execute');
    expect(result).toEqual({ ok: true });
    expect(server.calls).toHaveLength(1);
    expect(decodeJwt(bearerOf(server.calls[0])).payload.aud).toBe('https://aap.example/other/execute');
  });

  it('maps HTTP errors to AgentAuthError with code, message and details', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/capability/execute': () =>
        json(403, { error: 'constraint_violated', message: 'read_only must be true', field: 'read_only' }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const error = (await client.execute(identity, { capability: 'x' }).catch((e) => e)) as AgentAuthError;
    expect(error).toBeInstanceOf(AgentAuthError);
    expect(error.status).toBe(403);
    expect(error.code).toBe('constraint_violated');
    expect(error.message).toBe('read_only must be true');
    expect(error.details).toMatchObject({ field: 'read_only' });
  });

  it('maps non-JSON errors and network failures', async () => {
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/agent/revoke': () => new Response('gateway timeout', { status: 504 }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    const error = (await client.revokeAgent(hostKey, 'agent_1').catch((e) => e)) as AgentAuthError;
    expect(error.code).toBe('http_504');
    expect(error.status).toBe(504);

    const failing = new AgentAuthClient({
      baseUrl: ISSUER,
      fetch: (() => Promise.reject(new TypeError('fetch failed'))) as unknown as typeof fetch,
    });
    const networkError = (await failing.discover().catch((e) => e)) as AgentAuthError;
    expect(networkError.code).toBe('network_error');
    expect(networkError.status).toBe(0);
  });

  it('sends host-signed POSTs for revoke/reactivate/rotate and a bearer for introspect', async () => {
    const newAgentKey = generateKeyPair();
    const server = fakeServer({
      ...discoveryRoute,
      '/v1/access-tokens/agent-auth/agent/revoke': () => json(200, { agent_id: 'agent_1', status: 'revoked' }),
      '/v1/access-tokens/agent-auth/agent/reactivate': () => json(200, { agent_id: 'agent_1', status: 'active' }),
      '/v1/access-tokens/agent-auth/agent/rotate-key': () => json(200, { agent_id: 'agent_1', status: 'active' }),
      '/v1/access-tokens/agent-auth/agent/introspect': () => json(200, { active: true, agent_id: 'agent_1' }),
    });
    const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
    expect(await client.revokeAgent(hostKey, 'agent_1')).toEqual({ agent_id: 'agent_1', status: 'revoked' });
    expect(server.calls[1].body).toEqual({ agent_id: 'agent_1' });
    expect(decodeJwt(bearerOf(server.calls[1])).header.typ).toBe('host+jwt');

    await client.reactivateAgent(hostKey, 'agent_1');
    await client.rotateAgentKey(hostKey, 'agent_1', newAgentKey);
    expect(server.calls[3].body).toEqual({ agent_id: 'agent_1', public_key: newAgentKey.publicKey });

    await client.introspect('some.agent.jwt', 'epilot-bearer');
    expect(server.calls[4].body).toEqual({ token: 'some.agent.jwt' });
    expect(server.calls[4].headers.authorization).toBe('Bearer epilot-bearer');
  });

  describe('waitForApproval', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    const statusServer = (statuses: string[], grants: () => unknown[] = () => []) => {
      let polls = 0;
      return {
        polls: () => polls,
        server: fakeServer({
          ...discoveryRoute,
          '/v1/access-tokens/agent-auth/agent/status': () => {
            const status = statuses[Math.min(polls, statuses.length - 1)];
            polls++;
            return json(200, {
              agent_id: 'agent_1',
              host_id: 'host_1',
              name: 'epilot CLI',
              status,
              mode: 'delegated',
              agent_capability_grants: grants(),
              created_at: '2026-01-01T00:00:00Z',
            });
          },
        }),
      };
    };

    it('polls at the approval interval until the agent is active', async () => {
      const { server, polls } = statusServer(['pending', 'pending', 'active']);
      const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
      const onPoll = vi.fn();
      const promise = client.waitForApproval(hostKey, 'agent_1', { interval: 5, expires_in: 600 }, { onPoll });
      await vi.advanceTimersByTimeAsync(5_000);
      await vi.advanceTimersByTimeAsync(5_000);
      const status = await promise;
      expect(status.status).toBe('active');
      expect(polls()).toBe(3);
      expect(onPoll).toHaveBeenCalledTimes(3);
    });

    it('waits for specific grants when pendingGrantIds is given', async () => {
      let round = 0;
      const { server } = statusServer(['active'], () => [
        { id: 'grant_1', capability: EPILOT_CAPABILITIES.accessTokenIssue, status: 'active' },
        { id: 'grant_2', capability: EPILOT_CAPABILITIES.accessTokenIssue, status: round++ < 1 ? 'pending' : 'active' },
      ]);
      const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
      const promise = client.waitForApproval(
        hostKey,
        'agent_1',
        { interval: 1, expires_in: 600 },
        { pendingGrantIds: ['grant_2'] },
      );
      await vi.advanceTimersByTimeAsync(1_000);
      const status = await promise;
      expect(status.agent_capability_grants[1].status).toBe('active');
    });

    it('fails with approval_expired when the approval window closes', async () => {
      const { server } = statusServer(['pending']);
      const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
      const promise = client.waitForApproval(hostKey, 'agent_1', { interval: 5, expires_in: 7 });
      const rejection = expect(promise).rejects.toMatchObject({ code: 'approval_expired', status: 408 });
      await vi.advanceTimersByTimeAsync(5_000);
      await rejection;
    });

    it('fails with aborted when the signal is aborted', async () => {
      const { server } = statusServer(['pending']);
      const client = new AgentAuthClient({ baseUrl: ISSUER, fetch: server.fetch });
      const controller = new AbortController();
      const promise = client.waitForApproval(
        hostKey,
        'agent_1',
        { interval: 5, expires_in: 600 },
        { signal: controller.signal },
      );
      const rejection = expect(promise).rejects.toMatchObject({ code: 'aborted' });
      controller.abort();
      await vi.advanceTimersByTimeAsync(5_000);
      await rejection;
    });
  });
});

describe('epilot helpers', () => {
  it('builds organization access capability requests', () => {
    expect(organizationAccessCapability({ organizationId: '1', readOnly: true, anonymize: false })).toEqual({
      name: EPILOT_CAPABILITIES.accessTokenIssue,
      constraints: { organization_id: '1', read_only: true, anonymize: false },
    });
    expect(organizationAccessCapability()).toEqual({ name: EPILOT_CAPABILITIES.accessTokenIssue });
  });

  it('maps access token grants to organizations, defaulting to read-only/anonymized', () => {
    const mapped = organizationGrants([
      { capability: EPILOT_CAPABILITIES.organizationsList, status: 'active' },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'active',
        constraints: { organization_id: '739224', read_only: true, anonymize: true },
      },
      {
        capability: EPILOT_CAPABILITIES.accessTokenIssue,
        status: 'pending',
        constraints: { organization_id: '911210', read_only: false, anonymize: false },
      },
    ]);
    expect(mapped).toHaveLength(2);
    expect(mapped[0]).toMatchObject({ organizationId: '739224', readOnly: true, anonymized: true });
    expect(mapped[1]).toMatchObject({ organizationId: '911210', readOnly: false, anonymized: false });
    expect(mapped[1].grant.status).toBe('pending');
  });

  it('derives the issuer per stage', () => {
    expect(epilotAgentAuthIssuer()).toBe('https://access-token.sls.epilot.io/v1/access-tokens/agent-auth');
    expect(epilotAgentAuthIssuer('dev')).toBe('https://access-token.dev.sls.epilot.io/v1/access-tokens/agent-auth');
    expect(epilotAgentAuthIssuer('staging')).toBe(
      'https://access-token.staging.sls.epilot.io/v1/access-tokens/agent-auth',
    );
  });
});
