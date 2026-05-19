import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';

import { authorize } from '../src/authorize';

type ClientWithHandlers = AxiosInstance & {
  interceptors: {
    request: AxiosInstance['interceptors']['request'] & {
      handlers: Array<{ fulfilled: unknown } | null>;
    };
    response: AxiosInstance['interceptors']['response'];
  };
};

const createClient = () => axios.create() as ClientWithHandlers;

const runRequestInterceptors = async (client: ClientWithHandlers) => {
  const config = { headers: {} } as InternalAxiosRequestConfig;
  let current: InternalAxiosRequestConfig = config;
  // Axios runs request interceptors in REVERSE registration order.
  for (let i = client.interceptors.request.handlers.length - 1; i >= 0; i--) {
    const handler = client.interceptors.request.handlers[i];
    if (!handler || typeof handler.fulfilled !== 'function') continue;
    const fn = handler.fulfilled as (
      c: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    current = await fn(current);
  }
  return current;
};

const countActiveHandlers = (client: ClientWithHandlers) =>
  client.interceptors.request.handlers.filter((h) => h !== null).length;

describe('authorize() — interceptor lifecycle', () => {
  let client: ClientWithHandlers;

  beforeEach(() => {
    client = createClient();
  });

  it('last call wins when re-authorizing with a function token (regression: cross-org write bug)', async () => {
    authorize(client, () => 'source-org-token');
    authorize(client, () => 'target-org-token');

    const result = await runRequestInterceptors(client);
    expect(result.headers.authorization).toBe('Bearer target-org-token');
  });

  it('ejects the prior auth interceptor instead of stacking them', async () => {
    authorize(client, () => 'token-A');
    authorize(client, () => 'token-B');
    authorize(client, () => 'token-C');

    expect(countActiveHandlers(client)).toBe(1);

    const result = await runRequestInterceptors(client);
    expect(result.headers.authorization).toBe('Bearer token-C');
  });

  it('does not grow the interceptor list unbounded across many authorize() calls', () => {
    for (let i = 0; i < 50; i++) {
      authorize(client, () => `token-${i}`);
    }
    expect(countActiveHandlers(client)).toBe(1);
  });

  it('switching from function-form to string-form clears the prior interceptor', async () => {
    authorize(client, () => 'function-token');
    expect(countActiveHandlers(client)).toBe(1);

    authorize(client, 'static-token');

    expect(countActiveHandlers(client)).toBe(0);
    expect(client.defaults.headers.common.authorization).toBe('Bearer static-token');
  });

  it('switching from string-form to function-form clears the stale default header', async () => {
    authorize(client, 'static-token');
    expect(client.defaults.headers.common.authorization).toBe('Bearer static-token');

    authorize(client, () => 'dynamic-token');

    expect(client.defaults.headers.common.authorization).toBeUndefined();
    const result = await runRequestInterceptors(client);
    expect(result.headers.authorization).toBe('Bearer dynamic-token');
  });

  it('string form remains a simple defaults overwrite (no interceptor)', () => {
    authorize(client, 'token-1');
    expect(client.defaults.headers.common.authorization).toBe('Bearer token-1');
    expect(countActiveHandlers(client)).toBe(0);

    authorize(client, 'token-2');
    expect(client.defaults.headers.common.authorization).toBe('Bearer token-2');
    expect(countActiveHandlers(client)).toBe(0);
  });

  it('preserves unrelated request interceptors registered by other code', async () => {
    client.interceptors.request.use((config) => {
      config.headers['x-trace-id'] = 'trace-xyz';
      return config;
    });

    authorize(client, () => 'token-A');
    authorize(client, () => 'token-B');

    // One unrelated tracer + one auth interceptor.
    expect(countActiveHandlers(client)).toBe(2);

    const result = await runRequestInterceptors(client);
    expect(result.headers.authorization).toBe('Bearer token-B');
    expect(result.headers['x-trace-id']).toBe('trace-xyz');
  });

  it('returns the client to support chaining', () => {
    const result = authorize(client, () => 'token');
    expect(result).toBe(client);
  });
});
