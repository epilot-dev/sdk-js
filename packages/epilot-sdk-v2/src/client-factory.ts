import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';
import _OpenAPIClientAxios from 'openapi-client-axios';

import { authorize, type TokenArg } from './authorize';

// Handle CJS/ESM interop — when bundled as CJS, the default export may be nested under .default
const OpenAPIClientAxios = (
  typeof (_OpenAPIClientAxios as any).default === 'function'
    ? (_OpenAPIClientAxios as any).default
    : _OpenAPIClientAxios
) as typeof _OpenAPIClientAxios;

/** Resolves a lazily imported JSON module to its content. */
export const jsonContent = <T>(module: Promise<unknown>): Promise<T> =>
  module.then((mod) => ((mod as { default?: T })?.default ?? mod) as T);

export const createApiClient = <T extends AxiosInstance = AxiosInstance>(params: {
  definition: Document;
  token?: TokenArg | null;
  headers?: Record<string, string>;
  help?: () => Promise<string>;
  openapi?: () => Promise<Document>;
}): T => {
  const { definition, token, headers, help, openapi } = params;
  const api = new OpenAPIClientAxios({ definition, quick: true });
  const client = api.initSync<T>();

  if (headers && Object.keys(headers).length > 0) {
    client.defaults.headers.common = {
      ...(client.defaults.headers.common ?? {}),
      ...headers,
    };
  }

  if (token) {
    authorize(client, token);
  }

  if (help) {
    (client as Record<string, unknown>).help = help;
  }
  if (openapi) {
    (client as Record<string, unknown>).openapi = openapi;
  }

  return client;
};
