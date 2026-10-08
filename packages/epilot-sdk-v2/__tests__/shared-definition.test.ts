import { describe, it, expect, vi } from 'vitest';

import { createClient, getClient } from '../src/apis/entity';
import { memoizeLoader } from '../src/registry';
import { createSDK } from '../src/sdk';

describe('shared API definition', () => {
  it('builds every createClient() from the same definition', () => {
    const first = createClient();
    const second = createClient();

    expect(second).not.toBe(first);
    expect(second.api.document).toBe(first.api.document);
    expect(second.api.definition).toBe(first.api.definition);
    expect(getClient().api.document).toBe(first.api.document);
  });

  it('keeps default headers separate between createClient() instances', () => {
    const first = createClient();
    const second = createClient();

    first.defaults.headers.common['x-ivy-org-id'] = 'org-1';

    expect(second.defaults.headers.common['x-ivy-org-id']).toBeUndefined();
  });

  it('builds every createClient() of an SDK handle from the same definition', () => {
    const sdk = createSDK();
    const first = sdk.entity.createClient();
    const second = sdk.entity.createClient();

    expect(second).not.toBe(first);
    expect(second.api.document).toBe(first.api.document);
    expect(sdk.entity.getClient().api.document).toBe(first.api.document);
  });

  it('memoizeLoader loads once', () => {
    const definition = { openapi: '3.0.0', info: { title: 't', version: '1' }, paths: {} };
    const loader = vi.fn(() => definition);
    const memoized = memoizeLoader(loader);

    expect(memoized()).toBe(definition);
    expect(memoized()).toBe(definition);
    expect(loader).toHaveBeenCalledOnce();
  });
});
