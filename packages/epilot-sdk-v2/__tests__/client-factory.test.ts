import { describe, it, expect } from 'vitest';

import { createApiClient, docsContent } from '../src/client-factory';
import { help } from '../src/help';

const definition = { openapi: '3.0.0', info: { title: '', version: '' }, paths: {} };

describe('docsContent', () => {
  it('resolves to the same text as help() when the docs cannot be loaded', async () => {
    const unloadable = () => Promise.reject(new Error('chunk failed to load'));

    expect(await docsContent('no-such-api.json', unloadable)).toBe(await help('noSuchApi'));
  });
});

describe('createApiClient', () => {
  it('gives each client its own help and openapi function', () => {
    const loaders = { help: async () => 'docs', openapi: async () => definition };
    const first = createApiClient({ definition, apiName: 'entity', ...loaders }) as unknown as typeof loaders;
    const second = createApiClient({ definition, apiName: 'entity', ...loaders }) as unknown as typeof loaders;

    expect(first.help).not.toBe(second.help);
    expect(first.openapi).not.toBe(second.openapi);
  });
});
