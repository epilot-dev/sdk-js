import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { identity } from '../src/apis/identity';
import { createSDK } from '../src/sdk';

const server = setupServer();
const clientsUrl = 'https://id.epilot.cloud/v1/identity/operator/clients';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.each([
  { name: 'root SDK', getHandle: () => createSDK().identity },
  { name: 'identity subpath', getHandle: () => identity },
])('$name OIDC client operations', ({ getHandle }) => {
  it('forwards registration and lookup to HTTP while preserving SDK factories', async () => {
    const handle = getHandle();
    const singleton = handle.getClient();
    expect(handle.getClient()).toBe(singleton);
    expect(handle.createClient()).not.toBe(singleton);

    const input = {
      partner_key: 'test',
      display_name: 'Test application',
      environment: 'dev' as const,
      redirect_uris: ['https://example.test/cb'],
    };
    const record = { client_id: 'test-dev-id', status: 'draft', ...input };
    const requests: string[] = [];
    server.use(
      http.post(clientsUrl, async ({ request }) => {
        expect(await request.json()).toEqual(input);
        requests.push(request.method);
        return HttpResponse.json({ ...record, client_secret: 'one-time-test-secret' }, { status: 201 });
      }),
      http.get(`${clientsUrl}/test-dev-id`, ({ request }) => {
        requests.push(request.method);
        return HttpResponse.json(record);
      }),
    );

    const created = await handle.createOidcClient(null, input);
    const fetched = await handle.getOidcClient({ client_id: created.data.client_id });

    expect(created.status).toBe(201);
    expect(created.data.client_secret).toBe('one-time-test-secret');
    expect(fetched.data).toEqual(record);
    expect(requests).toEqual(['POST', 'GET']);
  });
});
