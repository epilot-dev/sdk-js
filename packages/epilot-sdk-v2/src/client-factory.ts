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

/** Content of a lazily imported JSON module. */
export const jsonContent = <T>(mod: unknown): T => ((mod as { default?: T })?.default ?? mod) as T;

/** Docs of one API, or the text `help()` resolves to when they cannot be loaded. */
export const docsContent = async (filename: string, load: () => Promise<unknown>): Promise<string> => {
  try {
    return jsonContent<string>(await load());
  } catch {
    return `No documentation found for "${filename}". Run help() to see available APIs.`;
  }
};

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

  // A closure per client, so clients do not share one function object.
  if (help) {
    (client as Record<string, unknown>).help = () => help();
  }
  if (openapi) {
    (client as Record<string, unknown>).openapi = () => openapi();
  }

  return client;
};
