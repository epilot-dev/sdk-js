import type { AxiosInstance } from 'axios';

import { help as helpFn } from './help';
import type { ApiHandle } from './types';

/**
 * Creates an ApiHandle — a proxy that exposes explicit getClient() / createClient()
 * and forwards any other property access as an operation call on the lazy singleton.
 */
export const createApiHandle = <T extends AxiosInstance>(params: {
  resolveClient: () => T;
  createClient: () => T;
  apiName?: string;
}): ApiHandle<T> => {
  const { resolveClient, createClient, apiName } = params;

  return new Proxy({} as ApiHandle<T>, {
    get(_, prop) {
      // Explicit singleton access
      if (prop === 'getClient') {
        return () => {
          const client = resolveClient();
          if (apiName && !('help' in client)) {
            (client as Record<string, unknown>).help = () => helpFn(apiName);
          }
          return client;
        };
      }

      // Fresh (non-singleton) instance
      if (prop === 'createClient') {
        return () => {
          const client = createClient();
          if (apiName) {
            (client as Record<string, unknown>).help = () => helpFn(apiName);
          }
          return client;
        };
      }

      // API-specific help
      if (prop === 'help') {
        return () => (apiName ? helpFn(apiName) : 'No API name available. Use epilot.help(apiName) instead.');
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
