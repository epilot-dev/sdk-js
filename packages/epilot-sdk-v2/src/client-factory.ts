import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';
import _OpenAPIClientAxios from 'openapi-client-axios';

import type { ApiDocs } from './api-docs';
import { authorize, type TokenArg } from './authorize';

// Handle CJS/ESM interop — when bundled as CJS, the default export may be nested under .default
const OpenAPIClientAxios = (
  typeof (_OpenAPIClientAxios as any).default === 'function'
    ? (_OpenAPIClientAxios as any).default
    : _OpenAPIClientAxios
) as typeof _OpenAPIClientAxios;

export const createApiClient = <T extends AxiosInstance = AxiosInstance>(params: {
  definition: Document;
  token?: TokenArg | null;
  headers?: Record<string, string>;
  docs?: ApiDocs;
}): T => {
  const { definition, token, headers, docs } = params;
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

  if (docs) {
    (client as Record<string, unknown>).help = docs.help;
    (client as Record<string, unknown>).openapi = docs.openapi;
  }

  return client;
};
