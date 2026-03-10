import { describe, it, expect } from 'vitest';
import { collectParams, getMissingRequired, getOperationParams } from '../src/lib/param-collector.js';
import type { OpenAPIV3 } from 'openapi-client-axios';

const makeParam = (name: string, location: string, required = false): OpenAPIV3.ParameterObject => ({
  name,
  in: location,
  required,
  schema: { type: 'string' },
});

describe('collectParams', () => {
  const params = [makeParam('slug', 'path', true), makeParam('id', 'path', true), makeParam('hydrate', 'query', false)];

  it('maps positional args to path params in declaration order (no template)', () => {
    const result = collectParams(params, undefined, ['contact', '123']);
    expect(result).toEqual({ slug: 'contact', id: 123 });
  });

  it('maps positional args to path params in URL template order', () => {
    // Params declared as [id, slug] but template is /{slug}/{id}
    const reorderedParams = [makeParam('id', 'path', true), makeParam('slug', 'path', true), makeParam('hydrate', 'query', false)];
    const result = collectParams(reorderedParams, undefined, ['contact', '123'], '/v1/{slug}/{id}');
    expect(result).toEqual({ slug: 'contact', id: 123 });
  });

  it('parses -p key=value flags', () => {
    const result = collectParams(params, ['slug=contact', 'id=abc'], []);
    expect(result).toEqual({ slug: 'contact', id: 'abc' });
  });

  it('-p flags override positional args', () => {
    const result = collectParams(params, ['slug=override'], ['original', '123']);
    expect(result).toEqual({ slug: 'override', id: 123 });
  });

  it('handles single -p string', () => {
    const result = collectParams(params, 'slug=test', []);
    expect(result).toEqual({ slug: 'test' });
  });

  it('parses boolean values', () => {
    const result = collectParams(params, 'hydrate=true', []);
    expect(result).toEqual({ hydrate: true });
  });

  it('parses numeric values', () => {
    const result = collectParams(params, 'id=42', []);
    expect(result).toEqual({ id: 42 });
  });

  it('returns empty for no inputs', () => {
    const result = collectParams(params, undefined, []);
    expect(result).toEqual({});
  });
});

describe('getMissingRequired', () => {
  const params = [makeParam('slug', 'path', true), makeParam('id', 'path', true), makeParam('hydrate', 'query', false)];

  it('returns missing required params', () => {
    const missing = getMissingRequired(params, { slug: 'contact' });
    expect(missing).toEqual(['id (path)']);
  });

  it('returns empty when all required provided', () => {
    const missing = getMissingRequired(params, { slug: 'contact', id: '123' });
    expect(missing).toEqual([]);
  });

  it('ignores optional params', () => {
    const missing = getMissingRequired(params, { slug: 'a', id: 'b' });
    expect(missing).toEqual([]);
  });
});

describe('getOperationParams', () => {
  const spec: OpenAPIV3.Document = {
    openapi: '3.0.2',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/v1/{slug}/{id}': {
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        get: {
          operationId: 'getEntity',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'hydrate', in: 'query', schema: { type: 'boolean' } },
          ],
          responses: {},
        },
      },
    },
  };

  it('merges path-level and operation-level params', () => {
    const { params, pathTemplate } = getOperationParams(spec, 'getEntity');
    expect(params).toHaveLength(3);
    expect(params.map((p) => p.name)).toEqual(['slug', 'id', 'hydrate']);
    expect(pathTemplate).toBe('/v1/{slug}/{id}');
  });

  it('returns empty for unknown operation', () => {
    const { params } = getOperationParams(spec, 'nonexistent');
    expect(params).toEqual([]);
  });
});
