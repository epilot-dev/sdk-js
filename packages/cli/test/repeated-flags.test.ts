import { describe, expect, it } from 'vitest';
import { collectRepeatedFlag, resolveRepeatedFlag } from '../src/lib/repeated-flags.js';

const PARAM = ['-p', '--param'];

describe('collectRepeatedFlag', () => {
  it('collects every -p occurrence', () => {
    const rawArgs = ['deleteEntity', '-p', 'slug=contact', '-p', 'id=123', '-p', 'purge=true'];
    expect(collectRepeatedFlag({ rawArgs, names: PARAM })).toEqual(['slug=contact', 'id=123', 'purge=true']);
  });

  it('supports long and inline forms', () => {
    const rawArgs = ['getEntity', '--param', 'slug=contact', '--param=id=123', '-p=hydrate=true'];
    expect(collectRepeatedFlag({ rawArgs, names: PARAM })).toEqual(['slug=contact', 'id=123', 'hydrate=true']);
  });

  it('ignores other flags and stops at --', () => {
    const rawArgs = ['getEntity', '-H', 'X-Foo: bar', '--json', '-p', 'a=1', '--', '-p', 'b=2'];
    expect(collectRepeatedFlag({ rawArgs, names: PARAM })).toEqual(['a=1']);
  });

  it('ignores a trailing flag without value', () => {
    expect(collectRepeatedFlag({ rawArgs: ['getEntity', '-p'], names: PARAM })).toEqual([]);
  });
});

describe('resolveRepeatedFlag', () => {
  it('falls back to the parsed value when rawArgs has none', () => {
    expect(resolveRepeatedFlag({ rawArgs: ['getEntity'], names: PARAM, parsed: 'a=1' })).toBe('a=1');
    expect(resolveRepeatedFlag({ rawArgs: undefined, names: PARAM, parsed: undefined })).toBeUndefined();
  });
});
