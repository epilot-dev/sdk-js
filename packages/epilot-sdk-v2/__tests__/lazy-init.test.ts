import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createSDK } from '../src/sdk';

// Track which definitions get loaded
const loadedDefinitions: string[] = [];

vi.mock('openapi-client-axios', () => {
  return {
    default: class OpenAPIClientAxios {
      initSync() {
        return {
          defaults: { headers: { common: {} } },
          interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
          getEntity: vi.fn().mockResolvedValue({ data: { id: '123' } }),
        };
      }
    },
  };
});

vi.mock('../src/apis/_registry', () => ({
  registerBuiltinApis: vi.fn((registry: Map<string, unknown>) => {
    const createLoader = (name: string) => async () => {
      loadedDefinitions.push(name);
      return { openapi: '3.0.0', info: { title: name, version: '1.0.0' }, paths: {} };
    };

    registry.set('entity', { loader: createLoader('entity'), instance: null });
    registry.set('file', { loader: createLoader('file'), instance: null });
    registry.set('workflow', { loader: createLoader('workflow'), instance: null });
    registry.set('pricing', { loader: createLoader('pricing'), instance: null });
  }),
  registerBuiltinExtensions: vi.fn(),
}));

vi.mock('../src/overrides', () => ({
  loadOverrides: vi.fn().mockResolvedValue(undefined),
}));

describe('lazy initialization', () => {
  beforeEach(() => {
    loadedDefinitions.length = 0;
    vi.clearAllMocks();
  });

  it('createSDK() should be instant - no definitions loaded at creation', () => {
    const start = performance.now();
    const sdk = createSDK();
    const elapsed = performance.now() - start;

    expect(loadedDefinitions).toEqual([]);
    expect(elapsed).toBeLessThan(10); // should be sub-millisecond
    expect(sdk).toBeDefined();
  });

  it('accessing epilot.entity should NOT load the definition (its a handle)', () => {
    const sdk = createSDK();
    sdk.authorize('token');

    const handle = sdk.entity; // just returns a proxy handle
    expect(handle).toBeDefined();
    expect(loadedDefinitions).toEqual([]);
  });

  it('should only load definition when getClient() is called', async () => {
    const sdk = createSDK();
    sdk.authorize('token');

    await sdk.entity.getClient();
    expect(loadedDefinitions).toEqual(['entity']);

    // Other APIs should NOT be loaded
    expect(loadedDefinitions).not.toContain('file');
    expect(loadedDefinitions).not.toContain('workflow');
  });

  it('should only load definition when an operation is called', async () => {
    const sdk = createSDK();
    sdk.authorize('token');

    await sdk.entity.getEntity({ slug: 'contact', id: '123' });
    expect(loadedDefinitions).toEqual(['entity']);
  });

  it('should load multiple only when accessed', async () => {
    const sdk = createSDK();
    sdk.authorize('token');

    await sdk.entity.getClient();
    await sdk.file.getClient();
    expect(loadedDefinitions).toEqual(['entity', 'file']);

    // Still not loaded
    expect(loadedDefinitions).not.toContain('workflow');
    expect(loadedDefinitions).not.toContain('pricing');
  });

  it('should not reload already-cached clients', async () => {
    const sdk = createSDK();
    sdk.authorize('token');

    await sdk.entity.getClient();
    await sdk.entity.getClient();
    await sdk.entity.getClient();

    // Loader called only once
    expect(loadedDefinitions).toEqual(['entity']);
  });

  it('authorize() should not trigger any client loading', () => {
    const sdk = createSDK();
    sdk.authorize('token');
    expect(loadedDefinitions).toEqual([]);
  });

  it('headers() should not trigger any client loading', () => {
    const sdk = createSDK();
    sdk.headers({ 'x-epilot-org-id': '123' });
    expect(loadedDefinitions).toEqual([]);
  });
});
