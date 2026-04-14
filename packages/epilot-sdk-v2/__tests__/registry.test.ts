import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createRegistry, registerApi, resolveClient, resetAllClients, resetClient } from '../src/registry';
import type { ApiEntry, SDKState } from '../src/types';

vi.mock('openapi-client-axios', () => {
  return {
    default: class OpenAPIClientAxios {
      initSync() {
        return {
          defaults: { headers: { common: {} } },
          interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
        };
      }
    },
  };
});

describe('registry', () => {
  let registry: Map<string, ApiEntry>;
  let state: SDKState;

  const mockLoader = () => ({
    openapi: '3.0.0' as const,
    info: { title: 'Mock', version: '1.0.0' },
    paths: {},
  });

  beforeEach(() => {
    registry = createRegistry();
    state = {
      token: null,
      tokenFn: null,
      globalHeaders: {},
      interceptors: [],
      retry: { maxRetries: 3 },
      largeResponse: { enabled: true },
    };
  });

  it('should register and resolve an API', () => {
    registerApi({ registry, name: 'test', loader: mockLoader });
    const client = resolveClient({ registry, name: 'test', state });
    expect(client).toBeDefined();
    expect(client.defaults).toBeDefined();
  });

  it('should cache client instance', () => {
    registerApi({ registry, name: 'test', loader: mockLoader });
    const client1 = resolveClient({ registry, name: 'test', state });
    const client2 = resolveClient({ registry, name: 'test', state });
    expect(client1).toBe(client2);
  });

  it('should throw for unknown API', () => {
    expect(() => resolveClient({ registry, name: 'unknown', state })).toThrow('Unknown API: "unknown"');
  });

  it('should apply global headers', () => {
    state.globalHeaders = { 'x-epilot-org-id': 'org-123' };
    registerApi({ registry, name: 'test', loader: mockLoader });
    const client = resolveClient({ registry, name: 'test', state });
    expect(client.defaults.headers.common).toMatchObject({
      'x-epilot-org-id': 'org-123',
    });
  });

  it('should reset a specific client', () => {
    registerApi({ registry, name: 'test', loader: mockLoader });
    resolveClient({ registry, name: 'test', state });
    expect(registry.get('test')!.instance).not.toBeNull();

    resetClient({ registry, name: 'test' });
    expect(registry.get('test')!.instance).toBeNull();
  });

  it('should reset all clients', () => {
    registerApi({ registry, name: 'a', loader: mockLoader });
    registerApi({ registry, name: 'b', loader: mockLoader });
    resolveClient({ registry, name: 'a', state });
    resolveClient({ registry, name: 'b', state });

    resetAllClients(registry);
    expect(registry.get('a')!.instance).toBeNull();
    expect(registry.get('b')!.instance).toBeNull();
  });
});
