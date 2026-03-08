import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosError, AxiosInstance } from 'axios';

import { applyRetryInterceptor } from '../src/retry';

const createMockClient = () => {
  const errorHandlers: Array<(error: AxiosError) => Promise<unknown>> = [];

  const client = {
    interceptors: {
      response: {
        use: vi.fn((_fulfilled: unknown, rejected: (error: AxiosError) => Promise<unknown>) => {
          if (rejected) errorHandlers.push(rejected);
        }),
      },
    },
    request: vi.fn(),
  } as unknown as AxiosInstance & { request: ReturnType<typeof vi.fn> };

  return { client, errorHandlers };
};

const createMockHeaders = (values: Record<string, unknown> = {}) => {
  const store = { ...values };
  return {
    ...store,
    set: (key: string, value: string) => { store[key] = value; },
    get: (key: string) => store[key],
  };
};

const createAxiosError = (params: {
  status: number;
  retryAfter?: string;
  retryCount?: number;
}): AxiosError => {
  const headers: Record<string, string> = {};
  if (params.retryAfter !== undefined) {
    headers['retry-after'] = params.retryAfter;
  }

  const requestHeaders = createMockHeaders(
    params.retryCount !== undefined
      ? { 'x-epilot-sdk-retry-count': params.retryCount }
      : {},
  );

  return {
    response: { status: params.status, headers },
    config: {
      url: '/test',
      method: 'get',
      headers: requestHeaders,
    },
  } as unknown as AxiosError;
};

describe('retry interceptor', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should not intercept non-429 errors', async () => {
    const { client, errorHandlers } = createMockClient();
    applyRetryInterceptor({ client, config: {} });

    const error = createAxiosError({ status: 500 });
    await expect(errorHandlers[0](error)).rejects.toBe(error);
    expect(client.request).not.toHaveBeenCalled();
  });

  it('should retry 429 with Retry-After header', async () => {
    const { client, errorHandlers } = createMockClient();
    applyRetryInterceptor({ client, config: {} });

    const error = createAxiosError({ status: 429, retryAfter: '2' });
    (client.request as ReturnType<typeof vi.fn>).mockResolvedValue({ status: 200 });

    const retryPromise = errorHandlers[0](error);
    await vi.advanceTimersByTimeAsync(2000);

    const result = await retryPromise;
    expect(result).toEqual({ status: 200 });
    expect(client.request).toHaveBeenCalledTimes(1);
  });

  it('should use default delay when Retry-After is missing', async () => {
    const { client, errorHandlers } = createMockClient();
    applyRetryInterceptor({ client, config: { defaultDelayMs: 500 } });

    const error = createAxiosError({ status: 429 });
    (client.request as ReturnType<typeof vi.fn>).mockResolvedValue({ status: 200 });

    const retryPromise = errorHandlers[0](error);
    await vi.advanceTimersByTimeAsync(500);

    await retryPromise;
    expect(client.request).toHaveBeenCalled();
  });

  it('should stop retrying after maxRetries', async () => {
    const { client, errorHandlers } = createMockClient();
    applyRetryInterceptor({ client, config: { maxRetries: 2 } });

    const error = createAxiosError({ status: 429, retryAfter: '1', retryCount: 2 });

    await expect(errorHandlers[0](error)).rejects.toBe(error);
    expect(client.request).not.toHaveBeenCalled();
  });

  it('should not apply interceptor when maxRetries is 0', () => {
    const { client } = createMockClient();
    applyRetryInterceptor({ client, config: { maxRetries: 0 } });

    expect(client.interceptors.response.use).not.toHaveBeenCalled();
  });
});
