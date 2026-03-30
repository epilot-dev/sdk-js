import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { Document } from 'openapi-client-axios';
import type { LargeResponseConfig } from './large-response';
import type { RetryConfig } from './retry';

export type ApiEntry = {
  loader: () => Document;
  instance: AxiosInstance | null;
};

export type RequestInterceptor = {
  type: 'request';
  fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  rejected?: (error: unknown) => unknown;
};

export type ResponseInterceptor = {
  type: 'response';
  fulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  rejected?: (error: unknown) => unknown;
};

export type Interceptor = RequestInterceptor | ResponseInterceptor;

export type SDKState = {
  token: string | null;
  tokenFn: (() => string | Promise<string>) | null;
  globalHeaders: Record<string, string>;
  interceptors: Interceptor[];
  retry: RetryConfig;
  largeResponse: LargeResponseConfig;
};

export type HeadersConfig = Record<string, string>;

export type OverridesConfig = Record<string, string>;

/**
 * A non-API extension mounted on the SDK.
 * Unlike ApiEntry (OpenAPI-based), extensions are plain objects
 * with arbitrary methods and properties (e.g. factory functions, utilities).
 */
export type ExtensionEntry = {
  value: unknown;
};

/**
 * An API handle that provides:
 * - `getClient()` — cached singleton
 * - `createClient()` — fresh instance
 * - Any operation method (e.g. `.getEntity(...)`) — auto-resolved via lazy singleton
 */
export type ApiHandle<T extends AxiosInstance = AxiosInstance> = {
  /** Get the cached singleton client instance (lazy-initialized on first call) */
  getClient: () => T;
  /** Create a fresh client instance (not cached) */
  createClient: () => T;
  /** Get the full OpenAPI specification document (lazy-loaded) */
  openapi: () => Promise<Document>;
} & {
  /** Operation methods forwarded to the lazy singleton */
  [K in keyof T]: T[K];
};
