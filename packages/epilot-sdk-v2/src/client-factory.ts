import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';
import OpenAPIClientAxios from 'openapi-client-axios';

import { authorize, type TokenArg } from './authorize';

export const createApiClient = <T extends AxiosInstance = AxiosInstance>(params: {
  definition: Document;
  token?: TokenArg | null;
  headers?: Record<string, string>;
}): T => {
  const { definition, token, headers } = params;
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

  return client;
};
