import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';

import { createApiHandle } from '../src/proxy';

vi.mock('../src/client-factory', () => ({
  createApiClient: vi.fn(() => ({
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: vi.fn() } },
    freshOperation: vi.fn().mockReturnValue({ data: 'fresh' }),
  })),
}));

describe('createApiHandle', () => {
  const createMockClient = (opts?: { withMeta?: boolean }) =>
    ({
      defaults: { headers: { common: {} } },
      interceptors: { request: { use: vi.fn() } },
      getEntity: vi.fn().mockResolvedValue({ data: { id: '123' } }),
      listItems: vi.fn().mockReturnValue({ data: [1, 2, 3] }),
      ...(opts?.withMeta && {
        help: vi.fn().mockResolvedValue('# Entity API'),
        openapi: vi.fn().mockResolvedValue({
          openapi: '3.0.3',
          info: { title: 'entity API', version: '1.0.0' },
          paths: { '/test': {} },
        }),
      }),
    }) as unknown as AxiosInstance;

  it('should expose getClient() that returns the singleton', () => {
    const mockClient = createMockClient();
    const handle = createApiHandle({
      resolveClient: () => mockClient,
      createClient: () => mockClient,
    });

    const client = handle.getClient();
    expect(client).toBe(mockClient);
  });

  it('should expose createClient() that returns a fresh instance', () => {
    const mockClient = createMockClient();
    const freshClient = createMockClient();
    const handle = createApiHandle({
      resolveClient: () => mockClient,
      createClient: () => freshClient,
    });

    const fresh = handle.createClient();
    expect(fresh).toBeDefined();
    // Fresh client is a different instance from the singleton
    expect(fresh).not.toBe(mockClient);
  });

  it('should proxy operation calls to the lazy singleton', async () => {
    const mockClient = createMockClient();
    const handle = createApiHandle({
      resolveClient: () => mockClient,
      createClient: () => mockClient,
    });

    const result = await handle.getEntity({ id: '123' });
    expect(result).toEqual({ data: { id: '123' } });
  });

  it('should call resolveClient for each operation (caching is done by registry)', () => {
    let callCount = 0;
    const mockClient = createMockClient();
    const handle = createApiHandle({
      resolveClient: () => {
        callCount++;
        return mockClient;
      },
      createClient: () => mockClient,
    });

    handle.getEntity({});
    handle.listItems({});
    handle.getClient();
    // Each call invokes resolveClient — the registry is responsible for caching
    expect(callCount).toBe(3);
  });

  it('should forward help() and openapi() from the client instance', async () => {
    const mockClient = createMockClient({ withMeta: true });
    const handle = createApiHandle({
      resolveClient: () => mockClient,
      createClient: () => mockClient,
      apiName: 'entity',
    });

    const spec = await handle.openapi();
    expect(spec).toBeDefined();
    expect(spec.openapi).toBe('3.0.3');
    expect(spec.info.title).toBe('entity API');

    const helpText = await handle.help();
    expect(helpText).toBe('# Entity API');
  });

  it('should NOT be thenable (no accidental await)', () => {
    const handle = createApiHandle({
      resolveClient: () => createMockClient(),
      createClient: () => createMockClient(),
    });

    expect((handle as any).then).toBeUndefined();
    expect((handle as any).catch).toBeUndefined();
    expect((handle as any).finally).toBeUndefined();
  });
});
