import type { AxiosInstance } from 'axios'

import { registerBuiltinApis } from './apis/_registry'
import type { TokenArg } from './authorize'
import type { SDKClientMap } from './client-map'
import { loadOverrides } from './overrides'
import { createApiHandle } from './proxy'
import { createRegistry, resolveClient, resetAllClients } from './registry'
import type { ApiHandle, HeadersConfig, SDKState } from './types'

export type InterceptorUse = {
  request: (fulfilled: (config: unknown) => unknown, rejected?: (error: unknown) => unknown) => void
  response: (fulfilled: (response: unknown) => unknown, rejected?: (error: unknown) => unknown) => void
}

export type EpilotSDK = {
  /** Set a Bearer token (static string or async function) for all clients */
  authorize: (token: TokenArg) => void
  /** Set global default headers applied to all clients (e.g. x-epilot-org-id) */
  headers: (headers: HeadersConfig) => void
  /** Register global axios interceptors applied to all clients */
  interceptors: InterceptorUse
} & {
  [K in keyof SDKClientMap]: ApiHandle<SDKClientMap[K]>
} & Record<string, ApiHandle<AxiosInstance>>

export const createSDK = (): EpilotSDK => {
  const registry = createRegistry()
  const state: SDKState = {
    token: null,
    tokenFn: null,
    globalHeaders: {},
    interceptors: [],
  }

  registerBuiltinApis(registry)
  loadOverrides(registry)

  const getHandle = (name: string): ApiHandle<AxiosInstance> => {
    const entry = registry.get(name)
    if (!entry) {
      const available = [...registry.keys()].join(', ')
      throw new Error(`Unknown API: "${name}". Available: ${available}`)
    }

    return createApiHandle({
      resolveClient: () => resolveClient({ registry, name, state }),
      loadDefinition: entry.loader,
    })
  }

  const sdk = new Proxy({} as EpilotSDK, {
    get(_, prop: string | symbol) {
      if (typeof prop === 'symbol') return undefined

      switch (prop) {
        case 'authorize':
          return (token: TokenArg) => {
            if (typeof token === 'string') {
              state.token = token
              state.tokenFn = null
            } else {
              state.token = null
              state.tokenFn = token
            }
            resetAllClients(registry)
          }

        case 'headers':
          return (headers: HeadersConfig) => {
            Object.assign(state.globalHeaders, headers)
            resetAllClients(registry)
          }

        case 'interceptors': {
          const interceptorUse: InterceptorUse = {
            request: (fulfilled: (config: unknown) => unknown, rejected?: (error: unknown) => unknown) => {
              state.interceptors.push({ type: 'request', fulfilled, rejected })
              resetAllClients(registry)
            },
            response: (fulfilled: (response: unknown) => unknown, rejected?: (error: unknown) => unknown) => {
              state.interceptors.push({ type: 'response', fulfilled, rejected })
              resetAllClients(registry)
            },
          }
          return interceptorUse
        }

        case 'then':
        case 'catch':
        case 'finally':
        case 'toJSON':
          return undefined

        default:
          if (registry.has(prop)) {
            return getHandle(prop)
          }

          return undefined
      }
    },
  })

  return sdk
}
