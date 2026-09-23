import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { callApi, type CallArgs } from '../../src/lib/call.js';
import { getResolvedProfile, getStage } from '../../src/lib/profiles.js';

vi.mock('../../src/lib/profiles.js', () => ({
  getResolvedProfile: vi.fn(),
  getStage: vi.fn(),
}));

const server = setupServer();
const clientsPath = '/v1/identity/operator/clients';
const call = (args: Partial<CallArgs>) =>
  callApi('identity', { token: 'test-token', interactive: false, json: true, operation: 'listClients', ...args });

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  vi.mocked(getResolvedProfile).mockReturnValue(null);
  vi.mocked(getStage).mockReturnValue(undefined);
  vi.spyOn(process.stdout, 'write').mockReturnValue(true);
  vi.spyOn(process.stderr, 'write').mockReturnValue(true);
  vi.spyOn(process, 'exit').mockImplementation((code) => {
    throw new Error(`Unexpected process.exit(${code})`);
  });
});
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});
afterAll(() => server.close());

describe('identity CLI stage selection', () => {
  it.each<{ stage: string; args: Partial<CallArgs>; origin: string }>([
    { stage: 'production', args: {}, origin: 'https://id.epilot.cloud' },
    { stage: 'dev', args: { 'use-dev': true }, origin: 'https://id.dev.epilot.cloud' },
    { stage: 'staging', args: { 'use-staging': true }, origin: 'https://id.staging.epilot.cloud' },
  ])('calls $stage when selected', async ({ args, origin }) => {
    let requestedUrl: string | undefined;
    server.use(
      http.get(`https://*${clientsPath}`, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json({ results: [] });
      }),
    );

    await call(args);

    expect(requestedUrl).toBe(`${origin}${clientsPath}`);
  });

  it('honors the saved stage and lets an explicit stage flag override it', async () => {
    vi.mocked(getStage).mockReturnValue('staging');
    const origins: string[] = [];
    server.use(
      http.get(`https://*${clientsPath}`, ({ request }) => {
        origins.push(new URL(request.url).origin);
        return HttpResponse.json({ results: [] });
      }),
    );

    await call({});
    await call({ 'use-dev': true });

    expect(origins).toEqual(['https://id.staging.epilot.cloud', 'https://id.dev.epilot.cloud']);
  });

  it('preserves profile and explicit server overrides', async () => {
    vi.mocked(getResolvedProfile).mockReturnValue({ name: 'test', server: 'https://profile.example.test' });
    const origins: string[] = [];
    server.use(
      http.get(`https://*${clientsPath}`, ({ request }) => {
        origins.push(new URL(request.url).origin);
        return HttpResponse.json({ results: [] });
      }),
    );

    await call({ 'use-dev': true });
    await call({ 'use-dev': true, server: 'https://explicit.example.test' });

    expect(origins).toEqual(['https://profile.example.test', 'https://explicit.example.test']);
  });

  it.each(['dev', 'staging'] as const)('preserves existing sls routing for %s', async (stage) => {
    let requestedUrl: string | undefined;
    server.use(
      http.get('https://*/v1/entity/schemas', ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json({ results: [] });
      }),
    );

    await callApi('entity', {
      token: 'test-token',
      interactive: false,
      json: true,
      operation: 'listSchemas',
      [`use-${stage}`]: true,
    });

    expect(requestedUrl).toBe(`https://entity.${stage}.sls.epilot.io/v1/entity/schemas`);
  });
});

it('calls the renamed OIDC operations on their unchanged HTTP routes', async () => {
  const requests: string[] = [];
  const input = {
    partner_key: 'test',
    display_name: 'Test',
    environment: 'dev',
    redirect_uris: ['https://example.test/cb'],
  };
  server.use(
    http.post(`https://id.dev.epilot.cloud${clientsPath}`, async ({ request }) => {
      expect(await request.json()).toEqual(input);
      requests.push(request.method);
      return HttpResponse.json({ client_id: 'test-dev-id' }, { status: 201 });
    }),
    http.get(`https://id.dev.epilot.cloud${clientsPath}/test-dev-id`, ({ request }) => {
      requests.push(request.method);
      return HttpResponse.json({ client_id: 'test-dev-id' });
    }),
  );

  await call({ 'use-dev': true, operation: 'createOidcClient', data: JSON.stringify(input) });
  await call({ 'use-dev': true, operation: 'getOidcClient', param: 'client_id=test-dev-id' });

  expect(requests).toEqual(['POST', 'GET']);
});
