import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance, AxiosResponse } from 'axios';

import { applyLargeResponseInterceptor } from '../src/large-response';

const createMockClient = () => {
  const requestHandlers: Array<(config: unknown) => unknown> = [];
  const responseHandlers: Array<(response: AxiosResponse) => unknown> = [];

  const client = {
    interceptors: {
      request: {
        use: vi.fn((fulfilled: (config: unknown) => unknown) => {
          requestHandlers.push(fulfilled);
        }),
      },
      response: {
        use: vi.fn((fulfilled: (response: AxiosResponse) => unknown) => {
          responseHandlers.push(fulfilled);
        }),
      },
    },
    get: vi.fn(),
  } as unknown as AxiosInstance & { get: ReturnType<typeof vi.fn> };

  return { client, requestHandlers, responseHandlers };
};

describe('large response interceptor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not apply interceptors when disabled', () => {
    const { client } = createMockClient();
    applyLargeResponseInterceptor({ client, config: { enabled: false } });

    expect(client.interceptors.request.use).not.toHaveBeenCalled();
    expect(client.interceptors.response.use).not.toHaveBeenCalled();
  });

  it('should set Accept header on requests', () => {
    const { client, requestHandlers } = createMockClient();
    applyLargeResponseInterceptor({ client, config: { enabled: true } });

    const mockConfig = { headers: { set: vi.fn(), Accept: undefined as string | undefined } };
    requestHandlers[0](mockConfig);

    expect(mockConfig.headers.Accept).toBe('application/large-response.vnd+json');
  });

  it('should pass through normal responses unchanged', async () => {
    const { client, responseHandlers } = createMockClient();
    applyLargeResponseInterceptor({ client, config: { enabled: true } });

    const normalResponse = {
      headers: { 'content-type': 'application/json' },
      data: { id: '123' },
    } as unknown as AxiosResponse;

    const result = await responseHandlers[0](normalResponse);
    expect(result).toBe(normalResponse);
    expect(client.get).not.toHaveBeenCalled();
  });

  it('should fetch payload from S3 when large response is detected', async () => {
    const { client, responseHandlers } = createMockClient();
    applyLargeResponseInterceptor({ client, config: { enabled: true } });

    const largePayload = { entities: [{ id: '1' }, { id: '2' }] };
    (client.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: largePayload });

    const largeResponse = {
      headers: { 'content-type': 'application/large-response.vnd+json' },
      data: { $payload_ref: 'https://s3.amazonaws.com/bucket/key' },
    } as unknown as AxiosResponse;

    const result = (await responseHandlers[0](largeResponse)) as AxiosResponse;
    expect(client.get).toHaveBeenCalledWith(
      'https://s3.amazonaws.com/bucket/key',
      expect.objectContaining({ transformResponse: expect.any(Function) }),
    );
    expect(result.data).toEqual(largePayload);
  });

  it('should not fetch when content-type does not match', async () => {
    const { client, responseHandlers } = createMockClient();
    applyLargeResponseInterceptor({ client, config: { enabled: true } });

    const response = {
      headers: { 'content-type': 'application/json' },
      data: { $payload_ref: 'https://s3.amazonaws.com/bucket/key' },
    } as unknown as AxiosResponse;

    const result = await responseHandlers[0](response);
    expect(result).toBe(response);
    expect(client.get).not.toHaveBeenCalled();
  });

  it('should default to enabled when config is empty', () => {
    const { client } = createMockClient();
    applyLargeResponseInterceptor({ client, config: {} });

    expect(client.interceptors.request.use).toHaveBeenCalled();
    expect(client.interceptors.response.use).toHaveBeenCalled();
  });
});
