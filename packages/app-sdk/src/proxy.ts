const DEFAULT_APP_API_BASE = 'https://app.sls.epilot.io';

export interface ProxyRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ProxyClientConfig {
  /** The installed app ID */
  appId: string;
  /** Bearer token (from app bridge or access token API) */
  token: string;
  /** Override the App API base URL (defaults to https://app.sls.epilot.io) */
  baseUrl?: string;
}

/**
 * Create a proxy client bound to an app.
 *
 * @example
 * ```ts
 * import { createProxyClient } from '@epilot/app-sdk';
 *
 * const client = createProxyClient({ appId: 'my-app', token: bridgeToken });
 *
 * // GET
 * const products = await client.proxy('products-api', '/v1/products', {
 *   params: { category: 'solar' },
 * });
 *
 * // POST
 * const order = await client.proxy('products-api', '/v1/orders', {
 *   method: 'POST',
 *   body: { sku: 'PV-100', qty: 2 },
 * });
 * ```
 */
export function createProxyClient(config: ProxyClientConfig) {
  const baseUrl = config.baseUrl ?? DEFAULT_APP_API_BASE;

  return {
    proxy: <T = unknown>(proxyName: string, path: string, options?: ProxyRequestOptions): Promise<T> =>
      proxyRequest<T>({
        appId: config.appId,
        token: config.token,
        baseUrl,
        proxyName,
        path,
        options,
      }),
  };
}

/**
 * Make a single proxy request.
 *
 * @example
 * ```ts
 * import { proxy } from '@epilot/app-sdk';
 *
 * const products = await proxy('products-api', '/v1/products', {
 *   appId: 'my-app',
 *   token: bridgeToken,
 * });
 * ```
 */
export async function proxy<T = unknown>(
  proxyName: string,
  path: string,
  options: ProxyRequestOptions & Pick<ProxyClientConfig, 'appId' | 'token' | 'baseUrl'>,
): Promise<T> {
  return proxyRequest<T>({
    appId: options.appId,
    token: options.token,
    baseUrl: options.baseUrl ?? DEFAULT_APP_API_BASE,
    proxyName,
    path,
    options,
  });
}

async function proxyRequest<T>(params: {
  appId: string;
  token: string;
  baseUrl: string;
  proxyName: string;
  path: string;
  options?: ProxyRequestOptions;
}): Promise<T> {
  const { appId, token, baseUrl, proxyName, path, options = {} } = params;
  const { method = 'GET', params: queryParams, body, headers = {} } = options;

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  let url = `${baseUrl}/v1/public/apps/${appId}/proxy/${proxyName}/${normalizedPath}`;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const searchParams = new URLSearchParams(queryParams);
    url += `?${searchParams.toString()}`;
  }

  const fetchHeaders: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  const fetchOptions: RequestInit = {
    method,
    headers: fetchHeaders,
  };

  if (body && !['GET', 'HEAD'].includes(method)) {
    fetchOptions.body = JSON.stringify(body);
    fetchHeaders['Content-Type'] ??= 'application/json';
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new ProxyRequestError(response.status, response.statusText, errorBody);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as unknown as T;
}

export class ProxyRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Proxy request failed: ${status} ${statusText}`);
    this.name = 'ProxyRequestError';
  }
}
