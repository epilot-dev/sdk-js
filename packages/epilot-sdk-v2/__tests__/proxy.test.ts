import { describe, it, expect, vi } from 'vitest'
import type { AxiosInstance } from 'axios'
import type { Document } from 'openapi-client-axios'

import { createApiHandle } from '../src/proxy'

vi.mock('../src/client-factory', () => ({
  createApiClient: vi.fn(() => ({
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: vi.fn() } },
    freshOperation: vi.fn().mockReturnValue({ data: 'fresh' }),
  })),
}))

describe('createApiHandle', () => {
  const createMockClient = () =>
    ({
      defaults: { headers: { common: {} } },
      interceptors: { request: { use: vi.fn() } },
      getEntity: vi.fn().mockResolvedValue({ data: { id: '123' } }),
      listItems: vi.fn().mockReturnValue({ data: [1, 2, 3] }),
    }) as unknown as AxiosInstance

  const mockDefinition = { openapi: '3.0.0', info: { title: 'Mock', version: '1.0.0' }, paths: {} } as unknown as Document

  it('should expose getClient() that returns the singleton', async () => {
    const mockClient = createMockClient()
    const handle = createApiHandle({
      resolveClient: async () => mockClient,
      loadDefinition: async () => mockDefinition,
    })

    const client = await handle.getClient()
    expect(client).toBe(mockClient)
  })

  it('should expose createClient() that returns a fresh instance', async () => {
    const mockClient = createMockClient()
    const handle = createApiHandle({
      resolveClient: async () => mockClient,
      loadDefinition: async () => mockDefinition,
    })

    const fresh = await handle.createClient()
    expect(fresh).toBeDefined()
    // Fresh client is a different instance from the mock (created by createApiClient mock)
    expect(fresh).not.toBe(mockClient)
  })

  it('should proxy operation calls to the lazy singleton', async () => {
    const mockClient = createMockClient()
    const handle = createApiHandle({
      resolveClient: async () => mockClient,
      loadDefinition: async () => mockDefinition,
    })

    const result = await handle.getEntity({ id: '123' })
    expect(result).toEqual({ data: { id: '123' } })
  })

  it('should call resolveClient for each operation (caching is done by registry)', async () => {
    let callCount = 0
    const mockClient = createMockClient()
    const handle = createApiHandle({
      resolveClient: async () => {
        callCount++
        return mockClient
      },
      loadDefinition: async () => mockDefinition,
    })

    await handle.getEntity({})
    await handle.listItems({})
    await handle.getClient()
    // Each call invokes resolveClient — the registry is responsible for caching
    expect(callCount).toBe(3)
  })

  it('should NOT be thenable (no accidental await)', () => {
    const handle = createApiHandle({
      resolveClient: async () => createMockClient(),
      loadDefinition: async () => mockDefinition,
    })

    expect((handle as any).then).toBeUndefined()
    expect((handle as any).catch).toBeUndefined()
    expect((handle as any).finally).toBeUndefined()
  })
})
