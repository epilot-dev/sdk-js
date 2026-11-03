import { afterEach, describe, expect, it, vi } from 'vitest';
import { proxy } from './proxy';

const opts = { appId: 'app-1', token: 'tok' };

function mockFetch(body: BodyInit, contentType: string) {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(new Response(body, { status: 200, headers: { 'content-type': contentType } }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('proxy', () => {
  it('builds the proxy URL with query params and bearer token', async () => {
    const fetchMock = mockFetch('{}', 'application/json');

    await proxy('wms', '/wms', {
      ...opts,
      params: { SERVICE: 'WMS', REQUEST: 'GetCapabilities', LAYERS: 'a,b' },
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'https://app.sls.epilot.io/v1/public/app/app-1/proxy/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&LAYERS=a%2Cb',
    );
    expect(init.headers.Authorization).toBe('Bearer tok');
  });

  it('parses JSON by content type by default', async () => {
    mockFetch('{"type":"FeatureCollection"}', 'application/json');
    await expect(proxy('wfs', '/wfs', opts)).resolves.toEqual({ type: 'FeatureCollection' });
  });

  it('returns text for non-JSON content by default', async () => {
    mockFetch('<WMS_Capabilities/>', 'text/xml');
    await expect(proxy('wms', '/wms', opts)).resolves.toBe('<WMS_Capabilities/>');
  });

  it('parses JSON regardless of content type with responseType json', async () => {
    mockFetch('{"a":1}', 'text/plain');
    await expect(proxy('x', '/x', { ...opts, responseType: 'json' })).resolves.toEqual({ a: 1 });
  });

  it('returns raw bytes with responseType arrayBuffer', async () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0xff, 0x00]);
    mockFetch(bytes, 'image/png');

    const result = await proxy<ArrayBuffer>('wms', '/wms', { ...opts, responseType: 'arrayBuffer' });

    expect(new Uint8Array(result)).toEqual(bytes);
  });

  it('returns a Blob with responseType blob', async () => {
    mockFetch(new Uint8Array([1, 2, 3]), 'image/png');

    const result = await proxy<Blob>('wms', '/wms', { ...opts, responseType: 'blob' });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe('image/png');
    expect(result.size).toBe(3);
  });

  it('throws ProxyRequestError with the upstream body on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('nope', { status: 401, statusText: 'Unauthorized' })),
    );
    await expect(proxy('x', '/x', opts)).rejects.toMatchObject({ status: 401, body: 'nope' });
  });
});
