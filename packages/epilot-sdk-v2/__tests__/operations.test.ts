/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import {
  getClient as getEntityClient,
  createClient as createEntityClient,
  entity,
  authorize,
} from '../src/apis/entity';
import { getClient as getUserClient, user } from '../src/apis/user';
import { getClient as getOrgClient, organization } from '../src/apis/organization';
import { createSDK } from '../src/sdk';
import { _resetOverrides } from '../src/overrides';

const ENTITY_BASE = 'https://entity.sls.epilot.io';
const USER_BASE = 'https://user.sls.epilot.io';
const ORG_BASE = 'https://organization-v2.sls.epilot.io';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ─── 1. Tree-shakeable imports (individual API modules) ─────────────

describe('tree-shakeable imports', () => {
  describe('entity', () => {
    it('getClient() is synchronous and returns typed client', () => {
      const client = getEntityClient();
      expect(client).toBeDefined();
      expect(client.getEntity).toBeTypeOf('function');
      expect(client.createEntity).toBeTypeOf('function');
      expect(client.searchEntities).toBeTypeOf('function');
      expect(client.listSchemas).toBeTypeOf('function');
    });

    it('getClient() returns the same cached instance', () => {
      expect(getEntityClient()).toBe(getEntityClient());
    });

    it('createClient() returns a fresh instance', () => {
      const singleton = getEntityClient();
      const fresh = createEntityClient();
      expect(fresh.getEntity).toBeTypeOf('function');
      expect(fresh).not.toBe(singleton);
    });

    it('makes requests via getClient()', async () => {
      server.use(
        http.get(`${ENTITY_BASE}/v1/entity/schemas`, () => HttpResponse.json({ results: [{ slug: 'contact' }] })),
      );

      const client = getEntityClient();
      const { data } = await client.listSchemas();
      expect(data.results).toHaveLength(1);
    });

    it('makes requests via createClient()', async () => {
      server.use(
        http.get(`${ENTITY_BASE}/v1/entity/schemas`, () => HttpResponse.json({ results: [{ slug: 'order' }] })),
      );

      const fresh = createEntityClient();
      const { data } = await fresh.listSchemas();
      expect(data.results[0].slug).toBe('order');
    });

    it('authorize sets bearer token on requests', async () => {
      let capturedAuth: string | null = null;
      server.use(
        http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
          capturedAuth = request.headers.get('authorization');
          return HttpResponse.json({ results: [] });
        }),
      );

      const client = createEntityClient();
      authorize(client, 'tree-shake-token');
      await client.listSchemas();
      expect(capturedAuth).toBe('Bearer tree-shake-token');
    });
  });

  describe('user', () => {
    it('getClient() is synchronous and returns typed client', () => {
      const client = getUserClient();
      expect(client.getMe).toBeTypeOf('function');
      expect(client.getMeV2).toBeTypeOf('function');
      expect(client.listUsersV2).toBeTypeOf('function');
    });
  });

  describe('organization', () => {
    it('getClient() is synchronous and returns typed client', () => {
      const client = getOrgClient();
      expect(client.getOrganization).toBeTypeOf('function');
      expect(client.getCurrentOrganization).toBeTypeOf('function');
      expect(client.getSettings).toBeTypeOf('function');
    });
  });
});

// ─── 2. API handle operation forwarding ──────────────────────────────

describe('handle operation forwarding', () => {
  it('entity.getEntity()', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/:slug/:id`, () => HttpResponse.json({ _id: '123', _schema: 'contact' })),
    );
    const { data } = await entity.getEntity({ slug: 'contact', id: '123' });
    expect(data).toEqual({ _id: '123', _schema: 'contact' });
  });

  it('entity.searchEntities()', async () => {
    server.use(http.post(`${ENTITY_BASE}/v1/entity:search`, () => HttpResponse.json({ hits: 0, results: [] })));
    const { data } = await entity.searchEntities(null, { q: 'test' });
    expect(data).toEqual({ hits: 0, results: [] });
  });

  it('entity.createEntity()', async () => {
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity/:slug`, () =>
        HttpResponse.json({ entity: { _id: 'new', first_name: 'John' } }),
      ),
    );
    const { data } = await entity.createEntity({ slug: 'contact' }, { first_name: 'John' });
    expect(data.entity.first_name).toBe('John');
  });

  it('user.getMe()', async () => {
    server.use(
      http.get(`${USER_BASE}/v1/users/me`, () => HttpResponse.json({ _id: 'user-1', email: 'test@example.com' })),
    );
    const { data } = await user.getMe();
    expect(data).toEqual({ _id: 'user-1', email: 'test@example.com' });
  });

  it('user.getMeV2()', async () => {
    server.use(
      http.get(`${USER_BASE}/v2/users/me`, () => HttpResponse.json({ _id: 'user-1', email: 'v2@example.com' })),
    );
    const { data } = await user.getMeV2();
    expect(data.email).toBe('v2@example.com');
  });

  it('user.listUsersV2()', async () => {
    server.use(http.get(`${USER_BASE}/v2/users`, () => HttpResponse.json({ results: [{ _id: 'u1' }, { _id: 'u2' }] })));
    const { data } = await user.listUsersV2();
    expect(data.results).toHaveLength(2);
  });

  it('organization.getOrganization()', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/:org_id`, ({ params }) =>
        HttpResponse.json({ _id: params.org_id, name: 'Test Org' }),
      ),
    );
    const { data } = await organization.getOrganization({ org_id: 'org-123' });
    expect(data).toEqual({ _id: 'org-123', name: 'Test Org' });
  });

  it('organization.getCurrentOrganization()', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/current`, () => HttpResponse.json({ _id: 'org-current', name: 'My Org' })),
    );
    const { data } = await organization.getCurrentOrganization();
    expect(data.name).toBe('My Org');
  });

  it('organization.getSettings()', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/:org_id/settings`, () =>
        HttpResponse.json({ feature_flags: { enabled: true } }),
      ),
    );
    const { data } = await organization.getSettings({ org_id: 'org-123' });
    expect(data).toEqual({ feature_flags: { enabled: true } });
  });
});

// ─── 3. createSDK() — full SDK instance ─────────────────────────────

describe('createSDK()', () => {
  it('sdk.entity.getClient() is synchronous', () => {
    const sdk = createSDK();
    const client = sdk.entity.getClient();
    expect(client).toBeDefined();
    expect(client.getEntity).toBeTypeOf('function');
  });

  it('sdk.entity.createClient() returns a fresh instance', () => {
    const sdk = createSDK();
    const singleton = sdk.entity.getClient();
    const fresh = sdk.entity.createClient();
    expect(fresh).not.toBe(singleton);
    expect(fresh.getEntity).toBeTypeOf('function');
  });

  it('sdk.authorize() applies token to resolved clients', async () => {
    let capturedAuth: string | null = null;
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        capturedAuth = request.headers.get('authorization');
        return HttpResponse.json({ results: [] });
      }),
    );

    const sdk = createSDK();
    sdk.authorize('sdk-token');
    await sdk.entity.listSchemas();
    expect(capturedAuth).toBe('Bearer sdk-token');
  });

  it('sdk.headers() applies global headers', async () => {
    let capturedOrgId: string | null = null;
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        capturedOrgId = request.headers.get('x-epilot-org-id');
        return HttpResponse.json({ results: [] });
      }),
    );

    const sdk = createSDK();
    sdk.headers({ 'x-epilot-org-id': 'org-456' });
    await sdk.entity.listSchemas();
    expect(capturedOrgId).toBe('org-456');
  });

  it('operation forwarding works through SDK proxy', async () => {
    server.use(
      http.get(`${USER_BASE}/v1/users/me`, () => HttpResponse.json({ _id: 'sdk-user', email: 'sdk@test.com' })),
    );

    const sdk = createSDK();
    const { data } = await sdk.user.getMe();
    expect(data.email).toBe('sdk@test.com');
  });

  it('multiple SDK instances are isolated', async () => {
    const sdk1 = createSDK();
    const sdk2 = createSDK();

    sdk1.authorize('token-1');
    sdk2.authorize('token-2');

    const client1 = sdk1.entity.getClient();
    const client2 = sdk2.entity.getClient();

    expect(client1.defaults.headers.common).toMatchObject({ authorization: 'Bearer token-1' });
    expect(client2.defaults.headers.common).toMatchObject({ authorization: 'Bearer token-2' });
  });
});

// ─── 4. Overridden client via sdk-overrides.json ─────────────────────

describe('overridden client', () => {
  const fs = require('node:fs') as typeof import('node:fs');
  const path = require('node:path') as typeof import('node:path');
  const overridesDir = path.resolve(process.cwd(), '.epilot');
  const overridesFile = path.resolve(overridesDir, 'sdk-overrides.json');
  const customSpecFile = path.resolve(overridesDir, 'custom-api.json');

  const CUSTOM_BASE = 'https://custom-api.example.com';
  const customSpec = {
    openapi: '3.0.0',
    info: { title: 'Custom API', version: '1.0.0' },
    paths: {
      '/v1/custom/health': {
        get: { operationId: 'healthCheck', responses: { '200': { description: 'OK' } } },
      },
    },
    servers: [{ url: CUSTOM_BASE }],
  };

  beforeAll(() => {
    fs.mkdirSync(overridesDir, { recursive: true });
    fs.writeFileSync(customSpecFile, JSON.stringify(customSpec));
    fs.writeFileSync(overridesFile, JSON.stringify({ 'custom-api': './custom-api.json' }));
  });

  afterAll(() => {
    fs.rmSync(overridesFile, { force: true });
    fs.rmSync(customSpecFile, { force: true });
    fs.rmSync(overridesDir, { recursive: true, force: true });
  });

  it('createSDK() loads overrides and registers custom API', async () => {
    _resetOverrides();
    const sdk = createSDK();

    server.use(http.get(`${CUSTOM_BASE}/v1/custom/health`, () => HttpResponse.json({ status: 'ok' })));

    const handle = (sdk as Record<string, unknown>)['custom-api'] as {
      getClient: () => unknown;
      healthCheck: (...args: unknown[]) => Promise<{ data: unknown }>;
    };
    expect(handle).toBeDefined();

    const client = handle.getClient();
    expect(client).toBeDefined();

    const { data } = await handle.healthCheck();
    expect(data).toEqual({ status: 'ok' });
  });

  it('overrides can replace a built-in API definition', async () => {
    const entityOverrideSpec = {
      openapi: '3.0.0',
      info: { title: 'Custom Entity', version: '9.0.0' },
      paths: {
        '/v1/entity/schemas': {
          get: { operationId: 'listSchemas', responses: { '200': { description: 'OK' } } },
        },
        '/v1/custom-entity/ping': {
          get: { operationId: 'ping', responses: { '200': { description: 'OK' } } },
        },
      },
      servers: [{ url: ENTITY_BASE }],
    };

    const entitySpecFile = path.resolve(overridesDir, 'entity-override.json');
    fs.writeFileSync(entitySpecFile, JSON.stringify(entityOverrideSpec));
    fs.writeFileSync(overridesFile, JSON.stringify({ entity: './entity-override.json' }));

    _resetOverrides();
    const sdk = createSDK();

    server.use(http.get(`${ENTITY_BASE}/v1/custom-entity/ping`, () => HttpResponse.json({ pong: true })));

    // The overridden entity client should have the custom 'ping' operation
    const handle = sdk.entity as unknown as { ping: () => Promise<{ data: unknown }> };
    const { data } = await handle.ping();
    expect(data).toEqual({ pong: true });

    fs.rmSync(entitySpecFile, { force: true });
  });
});
