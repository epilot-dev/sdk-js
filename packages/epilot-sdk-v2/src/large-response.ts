import type { AxiosInstance } from 'axios';

export type LargeResponseConfig = {
  /** Enable large response handling. Default: true */
  enabled?: boolean;
};

const CONTENT_TYPE = 'application/large-response.vnd+json';
const REF_PROPERTY = '$payload_ref';

export const applyLargeResponseInterceptor = (params: {
  client: AxiosInstance;
  config: LargeResponseConfig;
}) => {
  const { client, config } = params;

  if (config.enabled === false) return;

  // Request: opt in by setting Accept header
  client.interceptors.request.use((requestConfig) => {
    requestConfig.headers.Accept = CONTENT_TYPE;

    return requestConfig;
  });

  // Response: transparently fetch payload from S3 presigned URL
  client.interceptors.response.use(async (response) => {
    const contentType = response.headers['content-type'];

    if (contentType === CONTENT_TYPE && response.data?.[REF_PROPERTY]) {
      const ref = response.data[REF_PROPERTY] as string;
      const { data } = await client.get(ref, {
        transformResponse: (raw: string) => JSON.parse(raw),
      });
      response.data = data;
    }

    return response;
  });
};
