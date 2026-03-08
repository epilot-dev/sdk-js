import type { AxiosError, AxiosInstance } from 'axios';

export type RetryConfig = {
  /** Maximum number of retries for 429 responses. Set to 0 to disable. Default: 3 */
  maxRetries?: number;
  /** Default delay in ms when Retry-After header is missing. Default: 1000 */
  defaultDelayMs?: number;
};

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_DELAY_MS = 1000;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const RETRY_COUNT_HEADER = 'x-epilot-sdk-retry-count';

export const applyRetryInterceptor = (params: { client: AxiosInstance; config: RetryConfig }) => {
  const { client, config } = params;
  const maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;

  if (maxRetries <= 0) return;

  client.interceptors.response.use(undefined, async (error: AxiosError) => {
    if (error.response?.status !== 429) throw error;

    const retryCountRaw = error.config?.headers?.[RETRY_COUNT_HEADER];
    const retryCount = Number(retryCountRaw ?? 0);

    if (retryCount >= maxRetries) throw error;

    const retryAfterHeader = error.response.headers['retry-after'];
    const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
    const delayMs = Number.isFinite(retryAfterSeconds)
      ? retryAfterSeconds * 1000
      : (config.defaultDelayMs ?? DEFAULT_DELAY_MS);

    await sleep(delayMs);

    const retryConfig = { ...error.config! };
    retryConfig.headers.set(RETRY_COUNT_HEADER, String(retryCount + 1));

    return client.request(retryConfig);
  });
};
