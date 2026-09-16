import { describe, it, expect, vi, beforeEach } from 'vitest';

const callApiMock = vi.fn();
vi.mock('../src/lib/call.js', () => ({ callApi: (...callArgs: unknown[]) => callApiMock(...callArgs) }));

describe('entity command — repeated -p flags', () => {
  beforeEach(() => {
    callApiMock.mockReset();
  });

  it('forwards every -p flag to callApi, not just the last one (regression)', async () => {
    const entityCommand = (await import('../src/commands/apis/entity.js')).default;

    // Simulates what citty's parser actually produces: with two `-p` flags,
    // node:util.parseArgs keeps only the last value in args.param, but
    // rawArgs still contains both occurrences verbatim.
    const rawArgs = ['getEntity', '-p', 'slug=contact', '-p', 'id=abc-123'];
    const args = { operation: 'getEntity', param: 'id=abc-123' };

    // @ts-expect-error — test-only partial CommandContext
    await entityCommand.run({ args, rawArgs });

    expect(callApiMock).toHaveBeenCalledTimes(1);
    const [apiName, callArgs] = callApiMock.mock.calls[0];
    expect(apiName).toBe('entity');
    expect(callArgs.param).toEqual(['slug=contact', 'id=abc-123']);
  });

  it('still forwards a single -p flag correctly', async () => {
    const entityCommand = (await import('../src/commands/apis/entity.js')).default;

    const rawArgs = ['getEntity', '-p', 'slug=contact'];
    const args = { operation: 'getEntity', param: 'slug=contact' };

    // @ts-expect-error — test-only partial CommandContext
    await entityCommand.run({ args, rawArgs });

    const [, callArgs] = callApiMock.mock.calls[0];
    expect(callArgs.param).toEqual(['slug=contact']);
  });

  it('falls back to args.param when no -p flags are present in rawArgs', async () => {
    const entityCommand = (await import('../src/commands/apis/entity.js')).default;

    const rawArgs = ['listSchemas'];
    const args = { operation: 'listSchemas', param: undefined };

    // @ts-expect-error — test-only partial CommandContext
    await entityCommand.run({ args, rawArgs });

    const [, callArgs] = callApiMock.mock.calls[0];
    expect(callArgs.param).toBeUndefined();
  });
});
