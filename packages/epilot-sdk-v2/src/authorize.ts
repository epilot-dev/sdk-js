import type { AxiosInstance } from 'axios';

export type TokenArg = string | (() => string | Promise<string>);

// Marker used to track the auth request-interceptor id we previously installed
// on a given axios client. Using `Symbol.for` keeps the marker stable across
// module instances (e.g. when the SDK is loaded via both ESM and CJS in the
// same process).
const AUTH_INTERCEPTOR_KEY = Symbol.for('@epilot/sdk:authInterceptorId');

type ClientWithAuthMarker = AxiosInstance & {
  [AUTH_INTERCEPTOR_KEY]?: number;
};

export const authorize = <T extends AxiosInstance>(client: T, token: TokenArg): T => {
  const marked = client as T & ClientWithAuthMarker;

  // Always remove any previously-installed auth interceptor first. Axios runs
  // request interceptors in REVERSE registration order, so re-calling
  // `authorize()` without ejecting the old one means the OLDEST token wins —
  // exactly the opposite of what callers expect when they re-authorize the
  // same client (e.g. switching between source/target org tokens).
  const prev = marked[AUTH_INTERCEPTOR_KEY];
  if (typeof prev === 'number') {
    client.interceptors.request.eject(prev);
    marked[AUTH_INTERCEPTOR_KEY] = undefined;
  }

  if (typeof token === 'string') {
    client.defaults.headers.common.authorization = `Bearer ${token}`;
    return client;
  }

  // Clear any stale static header from a previous string-form authorize() so
  // the function-form is the single source of truth for this client.
  delete client.defaults.headers.common.authorization;

  const id = client.interceptors.request.use(async (config) => {
    const resolved = await token();
    config.headers.authorization = `Bearer ${resolved}`;

    return config;
  });
  marked[AUTH_INTERCEPTOR_KEY] = id;

  return client;
};
