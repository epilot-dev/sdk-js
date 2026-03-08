import type { AxiosInstance } from 'axios';
import type { Document } from 'openapi-client-axios';
import type { RetryConfig } from './retry';

export type ApiEntry = {
  loader: () => Promise<Document>;
  instance: AxiosInstance | null;
};

export type Interceptor = {
  type: 'request' | 'response';
  fulfilled: (value: unknown) => unknown;
  rejected?: (error: unknown) => unknown;
};

export type SDKState = {
  token: string | null;
  tokenFn: (() => string | Promise<string>) | null;
  globalHeaders: Record<string, string>;
  interceptors: Interceptor[];
  retry: RetryConfig;
};

export type HeadersConfig = Record<string, string>;

export type OverridesConfig = Record<string, string>;

/**
 * An API handle that provides:
 * - `getClient()` — cached singleton
 * - `createClient()` — fresh instance
 * - Any operation method (e.g. `.getEntity(...)`) — auto-resolved via lazy singleton
 */
export type ApiHandle<T extends AxiosInstance = AxiosInstance> = {
  /** Get the cached singleton client instance (lazy-initialized on first call) */
  getClient: () => Promise<T>;
  /** Create a fresh client instance (not cached) */
  createClient: () => Promise<T>;
} & {
  /** Operation methods forwarded to the lazy singleton */
  [K in keyof T]: T[K];
};
