import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { InternalAxiosRequestConfig } from 'axios'

import { createSDK } from '../src/sdk'
import { authorize } from '../src/authorize'

// Capture interceptor callbacks for testing
const requestInterceptors: Array<(config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>> = []
const responseInterceptors: Array<{
  fulfilled: (response: unknown) => unknown
  rejected?: (error: unknown) => unknown
}> = []

vi.mock('openapi-client-axios', () => {
  return {
    default: class OpenAPIClientAxios {
      constructor() {}
      initSync() {
        const client = {
          defaults: { headers: { common: {} as Record<string, string> } },
          interceptors: {
            request: {
              use: vi.fn((fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig) => {
                requestInterceptors.push(fulfilled)
              }),
            },
            response: {
              use: vi.fn((fulfilled: (response: unknown) => unknown, rejected?: (error: unknown) => unknown) => {
                responseInterceptors.push({ fulfilled, rejected })
              }),
            },
          },
          getEntity: vi.fn().mockResolvedValue({ data: { id: '123' } }),
          getMe: vi.fn().mockResolvedValue({ data: { name: 'Test User' } }),
        }
        return client
      }
    },
  }
})

vi.mock('../src/apis/_registry', () => ({
  registerBuiltinApis: vi.fn((registry: Map<string, unknown>) => {
    const mockLoader = async () => ({
      openapi: '3.0.0',
      info: { title: 'Mock', version: '1.0.0' },
      paths: {},
    })
    registry.set('entity', { loader: mockLoader, instance: null })
    registry.set('user', { loader: mockLoader, instance: null })
    registry.set('file', { loader: mockLoader, instance: null })
  }),
}))

vi.mock('../src/overrides', () => ({
  loadOverrides: vi.fn(),
}))

describe('static API token authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    requestInterceptors.length = 0
    responseInterceptors.length = 0
  })

  it('should set token on subsequently-resolved clients', async () => {
    const sdk = createSDK()
    sdk.authorize('static-api-token-123')

    const client = await sdk.entity.getClient()
    expect(client).toBeDefined()

    // Token should be set via default headers, not interceptors
    expect(client.defaults.headers.common).toMatchObject({
      authorization: 'Bearer static-api-token-123',
    })
  })

  it('should apply token to multiple clients independently', async () => {
    const sdk = createSDK()
    sdk.authorize('my-static-token')

    const entityClient = await sdk.entity.getClient()
    expect(entityClient.defaults.headers.common).toMatchObject({
      authorization: 'Bearer my-static-token',
    })

    const userClient = await sdk.user.getClient()
    expect(userClient.defaults.headers.common).toMatchObject({
      authorization: 'Bearer my-static-token',
    })
  })

  it('should allow changing static tokens (re-authorize)', async () => {
    const sdk = createSDK()

    sdk.authorize('token-v1')
    const client1 = await sdk.entity.getClient()
    expect(client1.defaults.headers.common).toMatchObject({
      authorization: 'Bearer token-v1',
    })

    sdk.authorize('token-v2')
    const client2 = await sdk.entity.getClient()
    expect(client2.defaults.headers.common).toMatchObject({
      authorization: 'Bearer token-v2',
    })
  })
})

describe('functional authorize() on individual clients', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    requestInterceptors.length = 0
    responseInterceptors.length = 0
  })

  it('should set static token on a client via authorize(client, token)', async () => {
    const sdk = createSDK()
    const client = await sdk.entity.getClient()

    authorize(client, 'my-client-token')

    expect(client.defaults.headers.common).toMatchObject({
      authorization: 'Bearer my-client-token',
    })
  })

  it('should set dynamic token on a client via authorize(client, fn)', async () => {
    const sdk = createSDK()
    const client = await sdk.entity.getClient()

    let currentToken = 'token-1'
    authorize(client, async () => currentToken)

    // The interceptor should have been registered
    expect(requestInterceptors.length).toBeGreaterThan(0)

    // Simulate calling the interceptor
    const interceptor = requestInterceptors[requestInterceptors.length - 1]
    const mockConfig = { headers: {} } as InternalAxiosRequestConfig
    const result = await interceptor(mockConfig)
    expect(result.headers['authorization']).toBe('Bearer token-1')

    // Token refresh
    currentToken = 'token-2'
    const result2 = await interceptor(mockConfig)
    expect(result2.headers['authorization']).toBe('Bearer token-2')
  })

  it('should return the client for chaining', async () => {
    const sdk = createSDK()
    const client = await sdk.entity.getClient()

    const result = authorize(client, 'token')
    expect(result).toBe(client)
  })
})

describe('SDK-level dynamic authorize with function', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    requestInterceptors.length = 0
    responseInterceptors.length = 0
  })

  it('should register token function as interceptor on resolved clients', async () => {
    const sdk = createSDK()

    let currentToken = 'initial-token'
    sdk.authorize(async () => currentToken)

    await sdk.entity.getClient()

    // The token function should be registered as an interceptor
    expect(requestInterceptors.length).toBeGreaterThan(0)

    const interceptor = requestInterceptors[requestInterceptors.length - 1]
    const mockConfig = { headers: {} } as InternalAxiosRequestConfig
    const result = await interceptor(mockConfig)
    expect(result.headers['authorization']).toBe('Bearer initial-token')

    // Simulate token refresh
    currentToken = 'refreshed-token'
    const result2 = await interceptor(mockConfig)
    expect(result2.headers['authorization']).toBe('Bearer refreshed-token')
  })
})

describe('interceptor-based OAuth session (dynamic tokens)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    requestInterceptors.length = 0
    responseInterceptors.length = 0
  })

  it('should register global request interceptor for dynamic token injection', async () => {
    const sdk = createSDK()

    let currentToken = 'initial-token'

    sdk.interceptors.request((config) => {
      const c = config as InternalAxiosRequestConfig
      c.headers['authorization'] = `Bearer ${currentToken}`
      return c
    })

    await sdk.entity.getClient()

    expect(requestInterceptors.length).toBeGreaterThan(0)

    const interceptor = requestInterceptors.find((fn) => {
      const mockConfig = { headers: {} } as InternalAxiosRequestConfig
      const result = fn(mockConfig)
      // Handle both sync and async returns
      if (result instanceof Promise) return false
      return result.headers['authorization'] === `Bearer ${currentToken}`
    })
    expect(interceptor).toBeDefined()

    // Simulate token refresh
    currentToken = 'refreshed-token'
    const mockConfig = { headers: {} } as InternalAxiosRequestConfig
    const result = interceptor!(mockConfig)
    expect((result as InternalAxiosRequestConfig).headers['authorization']).toBe('Bearer refreshed-token')
  })

  it('should register global response interceptor for token refresh on 401', async () => {
    const sdk = createSDK()

    let refreshCalled = false
    sdk.interceptors.response(
      (response) => response,
      (error) => {
        refreshCalled = true
        return Promise.reject(error)
      },
    )

    await sdk.entity.getClient()

    expect(responseInterceptors.length).toBeGreaterThan(1)
    const handler = responseInterceptors[responseInterceptors.length - 1]
    expect(handler.rejected).toBeDefined()

    try {
      await handler.rejected!({ response: { status: 401 } })
    } catch {
      // expected
    }
    expect(refreshCalled).toBe(true)
  })

  it('should apply interceptors to all clients including newly resolved ones', async () => {
    const sdk = createSDK()

    sdk.interceptors.request((config) => {
      const c = config as InternalAxiosRequestConfig
      c.headers['x-trace-id'] = 'trace-123'
      return c
    })

    await sdk.entity.getClient()
    const entityInterceptorCount = requestInterceptors.length

    await sdk.user.getClient()
    expect(requestInterceptors.length).toBeGreaterThan(entityInterceptorCount)
  })

  it('should combine static authorize with interceptors', async () => {
    const sdk = createSDK()

    sdk.authorize('static-token')

    sdk.interceptors.request((config) => {
      const c = config as InternalAxiosRequestConfig
      c.headers['x-epilot-org-id'] = 'org-456'
      return c
    })

    const client = await sdk.entity.getClient()

    // Static token set via default headers
    expect(client.defaults.headers.common).toMatchObject({
      authorization: 'Bearer static-token',
    })

    // Dynamic interceptor registered separately
    expect(requestInterceptors.length).toBeGreaterThanOrEqual(1)
    const orgInterceptor = requestInterceptors.find((fn) => {
      const mockConfig = { headers: {} } as InternalAxiosRequestConfig
      const result = fn(mockConfig)
      if (result instanceof Promise) return false
      return result.headers['x-epilot-org-id'] === 'org-456'
    })
    expect(orgInterceptor).toBeDefined()
  })
})

describe('common header patterns', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    requestInterceptors.length = 0
  })

  it('should set x-epilot-org-id via global headers', async () => {
    const sdk = createSDK()
    sdk.authorize('token')
    sdk.headers({ 'x-epilot-org-id': 'org-789' })

    const client = await sdk.entity.getClient()
    expect(client.defaults.headers.common).toMatchObject({
      'x-epilot-org-id': 'org-789',
    })
  })

  it('should set x-epilot-user-id via global headers', async () => {
    const sdk = createSDK()
    sdk.authorize('token')
    sdk.headers({
      'x-epilot-org-id': 'org-123',
      'x-epilot-user-id': 'user-456',
    })

    const client = await sdk.entity.getClient()
    expect(client.defaults.headers.common).toMatchObject({
      'x-epilot-org-id': 'org-123',
      'x-epilot-user-id': 'user-456',
    })
  })

  it('should set headers via standard axios defaults on individual clients', async () => {
    const sdk = createSDK()
    sdk.authorize('token')
    sdk.headers({ 'x-epilot-org-id': 'org-global' })

    const client = await sdk.entity.getClient()
    client.defaults.headers.common['x-custom-header'] = 'custom-value'

    expect(client.defaults.headers.common).toMatchObject({
      'x-epilot-org-id': 'org-global',
      'x-custom-header': 'custom-value',
    })
  })

  it('should support backend internal call pattern with passed headers', async () => {
    const sdk = createSDK()

    const passedHeaders = {
      'authorization': 'Bearer caller-token',
      'x-ivy-org-id': 'org-100',
      'x-epilot-org-id': 'org-100',
      'x-epilot-user-id': 'user-200',
    }

    sdk.interceptors.request((config) => {
      const c = config as InternalAxiosRequestConfig
      c.headers['authorization'] = passedHeaders.authorization
      return c
    })

    sdk.headers({
      'x-ivy-org-id': passedHeaders['x-ivy-org-id'],
      'x-epilot-org-id': passedHeaders['x-epilot-org-id'],
      'x-epilot-user-id': passedHeaders['x-epilot-user-id'],
    })

    const client = await sdk.entity.getClient()
    expect(client.defaults.headers.common).toMatchObject({
      'x-ivy-org-id': 'org-100',
      'x-epilot-org-id': 'org-100',
      'x-epilot-user-id': 'user-200',
    })
  })
})
