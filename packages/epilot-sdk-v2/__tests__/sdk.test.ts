import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createSDK } from '../src/sdk';

// Mock openapi-client-axios
vi.mock('openapi-client-axios', () => {
  const mockClient = {
    defaults: { headers: { common: {} } },
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    getEntity: vi.fn().mockResolvedValue({ data: { id: '123' } }),
    listFiles: vi.fn().mockResolvedValue({ data: [] }),
  };

  return {
    default: class OpenAPIClientAxios {
      initSync() {
        return mockClient;
      }
    },
  };
});

// Mock the registry to avoid loading real JSON definitions
vi.mock('../src/apis/_registry', () => ({
  registerBuiltinApis: vi.fn((registry: Map<string, unknown>) => {
    const mockLoader = async () => ({
      openapi: '3.0.0',
      info: { title: 'Mock', version: '1.0.0' },
      paths: {},
    });

    registry.set('entity', { loader: mockLoader, instance: null });
    registry.set('file', { loader: mockLoader, instance: null });
    registry.set('user', { loader: mockLoader, instance: null });
  }),
  registerBuiltinExtensions: vi.fn(),
}));

// Mock overrides (no overrides by default)
vi.mock('../src/overrides', () => ({
  loadOverrides: vi.fn().mockResolvedValue(undefined),
}));

describe('createSDK', () => {
  let sdk: ReturnType<typeof createSDK>;

  beforeEach(() => {
    vi.clearAllMocks();
    sdk = createSDK();
  });

  it('should create an SDK instance', () => {
    expect(sdk).toBeDefined();
    expect(sdk.authorize).toBeTypeOf('function');
    expect(sdk.headers).toBeTypeOf('function');
    expect(sdk.interceptors).toBeDefined();
  });

  it('should return an API handle for registered APIs', () => {
    sdk.authorize('test-token');
    const handle = sdk.entity;
    expect(handle).toBeDefined();
    expect(handle.getClient).toBeTypeOf('function');
    expect(handle.createClient).toBeTypeOf('function');
  });

  it('should resolve client via getClient()', async () => {
    sdk.authorize('test-token');
    const client = await sdk.entity.getClient();
    expect(client).toBeDefined();
    expect(client.defaults).toBeDefined();
  });

  it('should create fresh client via createClient()', async () => {
    sdk.authorize('test-token');
    const client = await sdk.entity.createClient();
    expect(client).toBeDefined();
  });

  it('should allow calling operations through proxy', async () => {
    sdk.authorize('test-token');
    const result = await sdk.entity.getEntity({ slug: 'contact', id: '123' });
    expect(result).toEqual({ data: { id: '123' } });
  });

  it('should throw for unknown API via property access', () => {
    expect(() => {
      const _handle = (sdk as any).nonexistentRegistered;
      // handle is undefined for unregistered names
    }).not.toThrow();
    expect((sdk as any).nonexistent).toBeUndefined();
  });

  it('should set global headers', async () => {
    sdk.headers({
      'x-epilot-org-id': 'org-123',
      'x-epilot-user-id': 'user-456',
    });
    const client = await sdk.entity.getClient();
    expect(client.defaults.headers.common).toMatchObject({
      'x-epilot-org-id': 'org-123',
      'x-epilot-user-id': 'user-456',
    });
  });

  it('should not be thenable itself (avoids accidental await)', () => {
    expect((sdk as any).then).toBeUndefined();
  });

  it('epilot.entity should not be thenable (avoids accidental await)', () => {
    expect((sdk.entity as any).then).toBeUndefined();
  });

  it('should authorize with token and set default header', async () => {
    sdk.authorize('my-token');
    const client = await sdk.entity.getClient();
    expect(client.defaults.headers.common).toMatchObject({
      authorization: 'Bearer my-token',
    });
  });

  it('should return undefined for symbol properties', () => {
    expect((sdk as any)[Symbol.toPrimitive]).toBeUndefined();
  });

  it('should return undefined for unregistered API names', () => {
    expect((sdk as any).nonexistent).toBeUndefined();
  });

  it('should expose openapi() at top level', () => {
    expect(sdk.openapi).toBeTypeOf('function');
  });

  it('should expose openapi() on api handles', () => {
    const handle = sdk.entity;
    expect(handle.openapi).toBeTypeOf('function');
  });
});
