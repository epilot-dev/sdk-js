import { describe, it, expect, vi, beforeEach } from 'vitest';

import { _resetOverrides } from '../src/overrides';
import { createRegistry, registerApi, resolveClient } from '../src/registry';
import type { ApiEntry, SDKState } from '../src/types';

vi.mock('openapi-client-axios', () => {
  return {
    default: class OpenAPIClientAxios {
      initSync() {
        return {
          defaults: { headers: { common: {} } },
          interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
          customOp: vi.fn().mockResolvedValue({ data: 'custom' }),
        };
      }
    },
  };
});

describe('loadOverrides', () => {
  let registry: Map<string, ApiEntry>;
  let state: SDKState;

  const mockLoader = async () => ({
    openapi: '3.0.0' as const,
    info: { title: 'Mock', version: '1.0.0' },
    paths: {},
  });

  beforeEach(() => {
    _resetOverrides();
    registry = createRegistry();
    state = {
      token: null,
      tokenFn: null,
      globalHeaders: {},
      interceptors: [],
      retry: { maxRetries: 3 },
      largeResponse: { enabled: true },
      overridesReady: Promise.resolve(),
    };
  });

  it('should register a new client from overrides file', async () => {
    const overridesJson = JSON.stringify({ 'custom-api': './custom-spec.json' });
    const specJson = JSON.stringify({
      openapi: '3.0.0',
      info: { title: 'Custom API', version: '1.0.0' },
      paths: {},
    });

    vi.doMock('node:fs', () => ({
      default: {
        existsSync: (path: string) => path.includes('sdk-overrides.json'),
        readFileSync: (path: string) => {
          if (path.includes('sdk-overrides.json')) return overridesJson;
          if (path.includes('custom-spec.json')) return specJson;
          throw new Error(`Unexpected read: ${path}`);
        },
      },
      existsSync: (path: string) => path.includes('sdk-overrides.json'),
      readFileSync: (path: string) => {
        if (path.includes('sdk-overrides.json')) return overridesJson;
        if (path.includes('custom-spec.json')) return specJson;
        throw new Error(`Unexpected read: ${path}`);
      },
    }));

    vi.doMock('node:path', async () => {
      const actual = await vi.importActual<typeof import('node:path')>('node:path');
      return { ...actual, default: actual };
    });

    // Re-import to pick up mocked modules
    const { loadOverrides: loadOverridesFresh } = await import('../src/overrides');
    _resetOverrides();

    await loadOverridesFresh(registry);

    expect(registry.has('custom-api')).toBe(true);

    // The registered loader should load the spec
    const entry = registry.get('custom-api')!;
    const spec = await entry.loader();
    expect(spec.info.title).toBe('Custom API');
  });

  it('should override an existing loader', async () => {
    registerApi({ registry, name: 'entity', loader: mockLoader });

    const overridesJson = JSON.stringify({ entity: './custom-entity-spec.json' });
    const specJson = JSON.stringify({
      openapi: '3.0.0',
      info: { title: 'Custom Entity', version: '2.0.0' },
      paths: {},
    });

    vi.doMock('node:fs', () => ({
      default: {
        existsSync: (path: string) => path.includes('sdk-overrides.json'),
        readFileSync: (path: string) => {
          if (path.includes('sdk-overrides.json')) return overridesJson;
          if (path.includes('custom-entity-spec.json')) return specJson;
          throw new Error(`Unexpected read: ${path}`);
        },
      },
      existsSync: (path: string) => path.includes('sdk-overrides.json'),
      readFileSync: (path: string) => {
        if (path.includes('sdk-overrides.json')) return overridesJson;
        if (path.includes('custom-entity-spec.json')) return specJson;
        throw new Error(`Unexpected read: ${path}`);
      },
    }));

    vi.doMock('node:path', async () => {
      const actual = await vi.importActual<typeof import('node:path')>('node:path');
      return { ...actual, default: actual };
    });

    const { loadOverrides: loadOverridesFresh } = await import('../src/overrides');
    _resetOverrides();

    await loadOverridesFresh(registry);

    const entry = registry.get('entity')!;
    expect(entry.instance).toBeNull();

    const spec = await entry.loader();
    expect(spec.info.title).toBe('Custom Entity');
  });

  it('should silently skip when no overrides file exists', async () => {
    vi.doMock('node:fs', () => ({
      default: {
        existsSync: () => false,
        readFileSync: () => {
          throw new Error('should not be called');
        },
      },
      existsSync: () => false,
      readFileSync: () => {
        throw new Error('should not be called');
      },
    }));

    vi.doMock('node:path', async () => {
      const actual = await vi.importActual<typeof import('node:path')>('node:path');
      return { ...actual, default: actual };
    });

    const { loadOverrides: loadOverridesFresh } = await import('../src/overrides');
    _resetOverrides();

    await loadOverridesFresh(registry);

    expect(registry.size).toBe(0);
  });

  it('should only load once (idempotent)', async () => {
    vi.doMock('node:fs', () => ({
      default: { existsSync: () => false, readFileSync: () => '{}' },
      existsSync: () => false,
      readFileSync: () => '{}',
    }));

    vi.doMock('node:path', async () => {
      const actual = await vi.importActual<typeof import('node:path')>('node:path');
      return { ...actual, default: actual };
    });

    const { loadOverrides: loadOverridesFresh } = await import('../src/overrides');
    _resetOverrides();

    await loadOverridesFresh(registry);
    await loadOverridesFresh(registry);
    // No error — second call is a no-op
  });

  it('should await overridesReady before resolving client', async () => {
    let resolveOverrides!: () => void;
    const overridesPromise = new Promise<void>((resolve) => {
      resolveOverrides = resolve;
    });

    registerApi({ registry, name: 'entity', loader: mockLoader });
    state.overridesReady = overridesPromise;

    // Start resolving — it should block on overridesReady
    let resolved = false;
    const clientPromise = resolveClient({ registry, name: 'entity', state }).then((client) => {
      resolved = true;
      return client;
    });

    // Give microtask a chance to run
    await Promise.resolve();
    expect(resolved).toBe(false);

    // Unblock overrides
    resolveOverrides();
    const client = await clientPromise;

    expect(resolved).toBe(true);
    expect(client).toBeDefined();
  });
});
