import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';

import { createApiClient } from './client-factory';
import type { ApiHandle } from './types';

/**
 * Creates an ApiHandle — a proxy that exposes explicit getClient() / createClient()
 * and forwards any other property access as an operation call on the lazy singleton.
 */
export const createApiHandle = <T extends AxiosInstance>(params: {
  resolveClient: () => Promise<T>;
  loadDefinition: () => Promise<Document>;
}): ApiHandle<T> => {
  const { resolveClient, loadDefinition } = params;

  return new Proxy({} as ApiHandle<T>, {
    get(_, prop) {
      // Explicit singleton access
      if (prop === 'getClient') {
        return () => resolveClient();
      }

      // Fresh (non-singleton) instance
      if (prop === 'createClient') {
        return async () => {
          const definition = await loadDefinition();

          return createApiClient<T>({ definition })
        };
      }

      // Prevent accidental `await epilot.entity` — it's not thenable
      if (prop === 'then' || prop === 'catch' || prop === 'finally') {
        return undefined;
      }

      // Everything else: forward as operation call on the lazy singleton
      return (...args: unknown[]) =>
        resolveClient().then((client) => {
          const method = (client as Record<string | symbol, unknown>)[prop];
          if (typeof method === 'function') {
            return (method as (...a: unknown[]) => unknown).apply(client, args);
          }

          return method;
        });
    },
  });
};
