import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';
import _OpenAPIClientAxios from 'openapi-client-axios';

import { authorize, type TokenArg } from './authorize';
import { help as helpFn } from './help';
import { openapi as openapiFn } from './openapi';

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
  apiName?: string;
}): T => {
  const { definition, token, headers, apiName } = params;
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

  if (apiName) {
    (client as Record<string, unknown>).help = () => helpFn(apiName);
    (client as Record<string, unknown>).openapi = () => openapiFn(apiName);
  }

  return client;
};
