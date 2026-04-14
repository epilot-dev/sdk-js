import { describe, it, expect } from 'vitest';
import { isValidJson, parseKeyValue, parseHeader, parseParamValue } from '../src/lib/utils.js';

describe('isValidJson', () => {
  it('returns true for valid JSON', () => {
    expect(isValidJson('{"a":1}')).toBe(true);
    expect(isValidJson('[]')).toBe(true);
    expect(isValidJson('"string"')).toBe(true);
  });

  it('returns false for invalid JSON', () => {
    expect(isValidJson('{a:1}')).toBe(false);
    expect(isValidJson('not json')).toBe(false);
  });
});

describe('parseKeyValue', () => {
  it('splits on first =', () => {
    expect(parseKeyValue('key=value')).toEqual(['key', 'value']);
    expect(parseKeyValue('key=val=ue')).toEqual(['key', 'val=ue']);
  });

  it('handles missing =', () => {
    expect(parseKeyValue('key')).toEqual(['key', '']);
  });
});

describe('parseHeader', () => {
  it('splits on first :', () => {
    expect(parseHeader('Content-Type: application/json')).toEqual(['Content-Type', 'application/json']);
  });
});

describe('parseParamValue', () => {
  it('parses booleans', () => {
    expect(parseParamValue('true')).toBe(true);
    expect(parseParamValue('false')).toBe(false);
  });

  it('parses numbers', () => {
    expect(parseParamValue('42')).toBe(42);
    expect(parseParamValue('3.14')).toBe(3.14);
  });

  it('parses JSON objects/arrays', () => {
    expect(parseParamValue('{"a":1}')).toEqual({ a: 1 });
    expect(parseParamValue('[1,2]')).toEqual([1, 2]);
  });

  it('returns strings for non-special values', () => {
    expect(parseParamValue('hello')).toBe('hello');
  });

  it('parses null', () => {
    expect(parseParamValue('null')).toBe(null);
  });
});
