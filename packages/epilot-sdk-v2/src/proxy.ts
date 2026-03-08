import type { AxiosInstance } from 'axios';

import type { ApiHandle } from './types';

/**
 * Creates an ApiHandle — a proxy that exposes explicit getClient() / createClient()
 * and forwards any other property access as an operation call on the lazy singleton.
 */
export const createApiHandle = <T extends AxiosInstance>(params: {
  resolveClient: () => T;
  createClient: () => T;
}): ApiHandle<T> => {
  const { resolveClient, createClient } = params;

  return new Proxy({} as ApiHandle<T>, {
    get(_, prop) {
      // Explicit singleton access
      if (prop === 'getClient') {
        return () => resolveClient();
      }

      // Fresh (non-singleton) instance
      if (prop === 'createClient') {
        return () => createClient();
      }

      // Prevent accidental `await epilot.entity` — it's not thenable
      if (prop === 'then' || prop === 'catch' || prop === 'finally') {
        return undefined;
      }

      // Everything else: forward as operation call on the lazy singleton
      return (...args: unknown[]) => {
        const client = resolveClient();
        const method = (client as Record<string | symbol, unknown>)[prop];
        if (typeof method === 'function') {
          return (method as (...a: unknown[]) => unknown).apply(client, args);
        }

        return method;
      };
    },
  });
};
