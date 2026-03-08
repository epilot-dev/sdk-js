import type { AxiosInstance } from 'axios';

import { createApiClient } from './client-factory';
import { applyLargeResponseInterceptor } from './large-response';
import { applyRetryInterceptor } from './retry';
import type { ApiEntry, SDKState } from './types';

export const createRegistry = () => new Map<string, ApiEntry>();

export const registerApi = (params: {
  registry: Map<string, ApiEntry>;
  name: string;
  loader: () => Promise<import('openapi-client-axios').Document>;
}) => {
  const { registry, name, loader } = params;
  registry.set(name, { loader, instance: null });
};

export const resolveClient = async (params: {
  registry: Map<string, ApiEntry>;
  name: string;
  state: SDKState;
}): Promise<AxiosInstance> => {
  const { registry, name, state } = params;
  const entry = registry.get(name);

  if (!entry) {
    const available = [...registry.keys()].join(', ');
    throw new Error(`Unknown API: "${name}". Available: ${available}`);
  }

  if (!entry.instance) {
    const definition = await entry.loader();

    entry.instance = createApiClient({
      definition,
      token: state.token,
      headers: state.globalHeaders,
    });

    // Apply large response interceptor for S3-backed payloads
    applyLargeResponseInterceptor({ client: entry.instance, config: state.largeResponse });

    // Apply retry interceptor for 429 Too Many Requests
    applyRetryInterceptor({ client: entry.instance, config: state.retry });

    // Apply dynamic token function as interceptor
    if (state.tokenFn) {
      const tokenFn = state.tokenFn;
      entry.instance.interceptors.request.use(async (config) => {
        const resolved = await tokenFn();
        config.headers.authorization = `Bearer ${resolved}`;

        return config;
      });
    }

    // Apply global interceptors
    for (const interceptor of state.interceptors) {
      if (interceptor.type === 'request') {
        entry.instance.interceptors.request.use(interceptor.fulfilled, interceptor.rejected);
      } else {
        entry.instance.interceptors.response.use(interceptor.fulfilled, interceptor.rejected);
      }
    }
  }

  return entry.instance;
};

export const resetClient = (params: { registry: Map<string, ApiEntry>; name: string }) => {
  const entry = params.registry.get(params.name);
  if (entry) {
    entry.instance = null;
  }
};

export const resetAllClients = (registry: Map<string, ApiEntry>) => {
  for (const entry of registry.values()) {
    entry.instance = null;
  }
};
