/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { verifyEpilotSignature } from './signature';

export const mockVerify = vi.fn();
vi.mock('node:crypto', async () => {
  const actual = await vi.importActual<typeof import('node:crypto')>('node:crypto');

  return {
    ...actual,
    verify: (...args: any[]) => mockVerify(...args),
  };
});

const server = setupServer(
  http.get('https://app.sls.epilot.io/v1/public/.well-known/public-key', () => {
    return HttpResponse.json({
      algorithm: 'ed25519',
      issuer: 'epilot',
      public_key: 'mocked-public-key-peem',
    });
  }),
);

describe('verifyEpilotSignature', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    mockVerify.mockReset();
  });
  afterAll(() => server.close());

  it('returns true for a valid signature and fresh timestamp', async () => {
    // given
    mockVerify.mockReturnValue(true);

    const req: any = {
      headers: {
        'webhook-id': 'test-id',
        'webhook-timestamp': Math.floor(Date.now() / 1000).toString(),
        'webhook-signature': 'v1a,base64-signature',
      },
      body: 'test-payload',
    };

    // when
    const isValid = await verifyEpilotSignature(req);

    // then
    expect(isValid).toBe(true);
  });

  it('returns false if the signature is invalid', async () => {
    // given
    mockVerify.mockReturnValue(false);

    const req: any = {
      headers: {
        'webhook-id': 'test-id',
        'webhook-timestamp': Math.floor(Date.now() / 1000).toString(),
        'webhook-signature': 'v1a,invalid-signature',
      },
      body: 'test-payload',
    };

    // when
    const isValid = await verifyEpilotSignature(req);

    // then
    expect(isValid).toBe(false);
  });

  it('returns false if the timestamp is expired', async () => {
    // given
    mockVerify.mockReturnValue(true); // valid signature but invalid timestamp

    const req: any = {
      headers: {
        'webhook-id': 'test-id',
        'webhook-timestamp': '0',
        'webhook-signature': 'v1a,base64-signature',
      },
      body: 'test-payload',
    };

    // when
    const isValid = await verifyEpilotSignature(req);

    // then
    expect(isValid).toBe(false);
  });
});
