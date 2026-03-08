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

const ENTITY_BASE = 'https://entity.sls.epilot.io';
const USER_BASE = 'https://user.sls.epilot.io';
const ORG_BASE = 'https://organization-v2.sls.epilot.io';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('entity operations', () => {
  it('getClient() returns a synchronous client with operation methods', () => {
    const client = getEntityClient();
    expect(client).toBeDefined();
    expect(client.getEntity).toBeTypeOf('function');
    expect(client.createEntity).toBeTypeOf('function');
    expect(client.searchEntities).toBeTypeOf('function');
    expect(client.listSchemas).toBeTypeOf('function');
    expect(client.updateEntity).toBeTypeOf('function');
    expect(client.deleteEntity).toBeTypeOf('function');
  });

  it('createClient() returns a fresh synchronous client', () => {
    const client1 = getEntityClient();
    const client2 = createEntityClient();
    expect(client2).toBeDefined();
    expect(client2.getEntity).toBeTypeOf('function');
    expect(client2).not.toBe(client1);
  });

  it('getClient() returns the same cached instance', () => {
    const client1 = getEntityClient();
    const client2 = getEntityClient();
    expect(client1).toBe(client2);
  });

  it('entity handle forwards getEntity call', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/:slug/:id`, () =>
        HttpResponse.json({ _id: '123', _schema: 'contact' }),
      ),
    );

    const { data } = await entity.getEntity({ slug: 'contact', id: '123' });
    expect(data).toEqual({ _id: '123', _schema: 'contact' });
  });

  it('entity handle forwards searchEntities call', async () => {
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity:search`, () => HttpResponse.json({ hits: 0, results: [] })),
    );

    const { data } = await entity.searchEntities(null, { q: 'test' });
    expect(data).toEqual({ hits: 0, results: [] });
  });

  it('entity handle forwards createEntity call', async () => {
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity/:slug`, () =>
        HttpResponse.json({ entity: { _id: 'new-123', _schema: 'contact', first_name: 'John' } }),
      ),
    );

    const { data } = await entity.createEntity({ slug: 'contact' }, { first_name: 'John' });
    expect(data.entity.first_name).toBe('John');
  });

  it('entity handle forwards listSchemas call', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, () =>
        HttpResponse.json({ results: [{ slug: 'contact' }] }),
      ),
    );

    const { data } = await entity.listSchemas();
    expect(data.results).toHaveLength(1);
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
    authorize(client, 'test-token-123');
    await client.listSchemas();

    expect(capturedAuth).toBe('Bearer test-token-123');
  });
});

describe('user operations', () => {
  it('getClient() returns a synchronous client with operation methods', () => {
    const client = getUserClient();
    expect(client).toBeDefined();
    expect(client.getMe).toBeTypeOf('function');
    expect(client.getMeV2).toBeTypeOf('function');
    expect(client.listUsersV2).toBeTypeOf('function');
    expect(client.getUserV2).toBeTypeOf('function');
    expect(client.inviteUser).toBeTypeOf('function');
  });

  it('user handle forwards getMe call', async () => {
    server.use(
      http.get(`${USER_BASE}/v1/users/me`, () =>
        HttpResponse.json({ _id: 'user-1', email: 'test@example.com' }),
      ),
    );

    const { data } = await user.getMe();
    expect(data).toEqual({ _id: 'user-1', email: 'test@example.com' });
  });

  it('user handle forwards getMeV2 call', async () => {
    server.use(
      http.get(`${USER_BASE}/v2/users/me`, () =>
        HttpResponse.json({ _id: 'user-1', email: 'v2@example.com' }),
      ),
    );

    const { data } = await user.getMeV2();
    expect(data.email).toBe('v2@example.com');
  });

  it('user handle forwards listUsersV2 call', async () => {
    server.use(
      http.get(`${USER_BASE}/v2/users`, () =>
        HttpResponse.json({ results: [{ _id: 'user-1' }, { _id: 'user-2' }] }),
      ),
    );

    const { data } = await user.listUsersV2();
    expect(data.results).toHaveLength(2);
  });
});

describe('organization operations', () => {
  it('getClient() returns a synchronous client with operation methods', () => {
    const client = getOrgClient();
    expect(client).toBeDefined();
    expect(client.getOrganization).toBeTypeOf('function');
    expect(client.getCurrentOrganization).toBeTypeOf('function');
    expect(client.updateOrganization).toBeTypeOf('function');
    expect(client.getSettings).toBeTypeOf('function');
  });

  it('organization handle forwards getOrganization call', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/:org_id`, ({ params }) =>
        HttpResponse.json({ _id: params.org_id, name: 'Test Org' }),
      ),
    );

    const { data } = await organization.getOrganization({ org_id: 'org-123' });
    expect(data).toEqual({ _id: 'org-123', name: 'Test Org' });
  });

  it('organization handle forwards getCurrentOrganization call', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/current`, () =>
        HttpResponse.json({ _id: 'org-current', name: 'My Org' }),
      ),
    );

    const { data } = await organization.getCurrentOrganization();
    expect(data.name).toBe('My Org');
  });

  it('organization handle forwards getSettings call', async () => {
    server.use(
      http.get(`${ORG_BASE}/v2/organization/:org_id/settings`, () =>
        HttpResponse.json({ feature_flags: { enabled: true } }),
      ),
    );

    const { data } = await organization.getSettings({ org_id: 'org-123' });
    expect(data).toEqual({ feature_flags: { enabled: true } });
  });
});
