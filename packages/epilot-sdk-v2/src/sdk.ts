import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { registerBuiltinApis, registerBuiltinExtensions } from './apis/_registry';
import type { TokenArg } from './authorize';
import type { SDKClientMap } from './client-map';
import { createApiClient } from './client-factory';
import { help } from './help';
import { openapi } from './openapi';
import { loadOverrides } from './overrides';
import { createApiHandle } from './proxy';
import { createRegistry, resetAllClients, resolveClient } from './registry';
import type { LargeResponseConfig } from './large-response';
import type { RetryConfig } from './retry';
import type { ApiHandle, ExtensionEntry, HeadersConfig, SDKState } from './types';

export type InterceptorUse = {
  request: (
    fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    rejected?: (error: unknown) => unknown,
  ) => void;
  response: (
    fulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    rejected?: (error: unknown) => unknown,
  ) => void;
};

export type EpilotSDK = {
  /** Set a Bearer token (static string or async function) for all clients */
  authorize: (token: TokenArg) => void;
  /** Set global default headers applied to all clients (e.g. x-epilot-org-id) */
  headers: (headers: HeadersConfig) => void;
  /** Register global axios interceptors applied to all clients */
  interceptors: InterceptorUse;
  /** Configure retry behavior for 429 Too Many Requests responses */
  retry: (config: RetryConfig) => void;
  /** Configure large response handling for S3-backed payloads */
  largeResponse: (config: LargeResponseConfig) => void;
  /** Get markdown docs. No args = general SDK help, with API name = API-specific docs */
  help: (apiName?: string) => Promise<string>;
  /** Get the full OpenAPI specification for an API (lazy-loaded) */
  openapi: (apiName: string) => Promise<import('openapi-client-axios').Document>;
} & {
  [K in keyof SDKClientMap]: ApiHandle<SDKClientMap[K]>;
} & Record<string, ApiHandle<AxiosInstance>>;

export const createSDK = (): EpilotSDK => {
  const registry = createRegistry();
  const extensions = new Map<string, ExtensionEntry>();
  const state: SDKState = {
    token: null,
    tokenFn: null,
    globalHeaders: {},
    interceptors: [],
    retry: { maxRetries: 3 },
    largeResponse: { enabled: true },
  };

  registerBuiltinApis(registry);
  registerBuiltinExtensions(extensions);
  loadOverrides(registry);

  const getHandle = (name: string): ApiHandle<AxiosInstance> => {
    const entry = registry.get(name);
    if (!entry) {
      const available = [...registry.keys()].join(', ');
      throw new Error(`Unknown API: "${name}". Available: ${available}`);
    }

    return createApiHandle({
      resolveClient: () => resolveClient({ registry, name, state }),
      createClient: () => createApiClient({ definition: entry.loader(), apiName: name }),
      apiName: name,
    });
  };

  const sdk = new Proxy({} as EpilotSDK, {
    get(_, prop: string | symbol) {
      if (typeof prop === 'symbol') return undefined;

      switch (prop) {
        case 'authorize':
          return (token: TokenArg) => {
            if (typeof token === 'string') {
              state.token = token;
              state.tokenFn = null;
            } else {
              state.token = null;
              state.tokenFn = token;
            }
            resetAllClients(registry);
          };

        case 'headers':
          return (headers: HeadersConfig) => {
            Object.assign(state.globalHeaders, headers);
            resetAllClients(registry);
          };

        case 'retry':
          return (config: RetryConfig) => {
            Object.assign(state.retry, config);
            resetAllClients(registry);
          };

        case 'largeResponse':
          return (config: LargeResponseConfig) => {
            Object.assign(state.largeResponse, config);
            resetAllClients(registry);
          };

        case 'interceptors': {
          const interceptorUse: InterceptorUse = {
            request: (fulfilled, rejected) => {
              state.interceptors.push({ type: 'request', fulfilled, rejected });
              resetAllClients(registry);
            },
            response: (fulfilled, rejected) => {
              state.interceptors.push({ type: 'response', fulfilled, rejected });
              resetAllClients(registry);
            },
          };
          return interceptorUse;
        }

        case 'help':
          return (apiName?: string) => help(apiName);

        case 'openapi':
          return (apiName: string) => openapi(apiName);

        case 'then':
        case 'catch':
        case 'finally':
        case 'toJSON':
          return undefined;

        default:
          if (registry.has(prop)) {
            return getHandle(prop);
          }

          // Check non-API extensions (e.g. journeyToolkit)
          if (extensions.has(prop)) {
            return extensions.get(prop)!.value;
          }

          return undefined;
      }
    },
  });

  return sdk;
};
