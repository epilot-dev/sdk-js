import { describe, it, expect } from 'vitest';
import { getRequestBodyInfo } from '../src/lib/body-handler.js';

describe('getRequestBodyInfo', () => {
  const spec = {
    paths: {
      '/v1/entity/{slug}': {
        post: {
          operationId: 'createEntity',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          responses: {},
        },
        get: {
          operationId: 'listEntities',
          responses: {},
        },
      },
    },
  };

  it('detects required request body', () => {
    const info = getRequestBodyInfo(spec, 'createEntity');
    expect(info).toEqual({ hasBody: true, isRequired: true });
  });

  it('returns false for operations without body', () => {
    const info = getRequestBodyInfo(spec, 'listEntities');
    expect(info).toEqual({ hasBody: false, isRequired: false });
  });

  it('returns false for unknown operation', () => {
    const info = getRequestBodyInfo(spec, 'nonexistent');
    expect(info).toEqual({ hasBody: false, isRequired: false });
  });
});
