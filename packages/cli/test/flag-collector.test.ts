import { describe, it, expect } from 'vitest';
import { collectRepeatedFlag } from '../src/lib/flag-collector.js';

describe('collectRepeatedFlag', () => {
  it('returns empty array when the flag is absent', () => {
    expect(collectRepeatedFlag(['entity', 'getEntity'], ['p', 'param'])).toEqual([]);
  });

  it('collects a single short-flag occurrence', () => {
    expect(collectRepeatedFlag(['-p', 'slug=contact'], ['p', 'param'])).toEqual(['slug=contact']);
  });

  it('collects multiple short-flag occurrences, in order', () => {
    expect(collectRepeatedFlag(['-p', 'id=1', '-p', 'hydrate=true'], ['p', 'param'])).toEqual([
      'id=1',
      'hydrate=true',
    ]);
  });

  it('collects multiple long-flag occurrences', () => {
    expect(collectRepeatedFlag(['--param', 'id=1', '--param', 'hydrate=true'], ['p', 'param'])).toEqual([
      'id=1',
      'hydrate=true',
    ]);
  });

  it('collects a mix of short and long flag forms', () => {
    expect(collectRepeatedFlag(['-p', 'id=1', '--param', 'hydrate=true'], ['p', 'param'])).toEqual([
      'id=1',
      'hydrate=true',
    ]);
  });

  it('supports --flag=value form without consuming the next token', () => {
    expect(collectRepeatedFlag(['--param=id=1', 'positional'], ['p', 'param'])).toEqual(['id=1']);
  });

  it('supports -p=value form', () => {
    expect(collectRepeatedFlag(['-p=id=1'], ['p', 'param'])).toEqual(['id=1']);
  });

  it('ignores unrelated flags and positionals interleaved between occurrences', () => {
    expect(
      collectRepeatedFlag(['getEntity', '-p', 'slug=contact', '--json', '-p', 'id=42', 'trailing'], ['p', 'param']),
    ).toEqual(['slug=contact', 'id=42']);
  });

  it('stops scanning at a bare "--" separator', () => {
    expect(collectRepeatedFlag(['-p', 'id=1', '--', '-p', 'id=2'], ['p', 'param'])).toEqual(['id=1']);
  });

  it('does not treat a trailing flag with no value as consuming anything', () => {
    expect(collectRepeatedFlag(['-p'], ['p', 'param'])).toEqual([]);
  });

  it('does not match flags that merely share a prefix (e.g. --param-extra)', () => {
    expect(collectRepeatedFlag(['--param-extra', 'x=1'], ['p', 'param'])).toEqual([]);
  });
});
