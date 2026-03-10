import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatResponse } from '../src/lib/response-formatter.js';
import type { AxiosResponse } from 'axios';

const makeResponse = (status: number, data: unknown, statusText = 'OK'): AxiosResponse =>
  ({
    status,
    statusText,
    data,
    headers: { 'content-type': 'application/json' },
    config: {
      method: 'get',
      url: 'https://example.com/api',
      headers: {} as any,
    } as any,
  }) as AxiosResponse;

/** Collect all writes to stdout+stderr into one combined string. */
const allOutput = (stdoutWrite: ReturnType<typeof vi.spyOn>, stderrWrite: ReturnType<typeof vi.spyOn>) => {
  const stdout = stdoutWrite.mock.calls.map(([s]) => s).join('');
  const stderr = stderrWrite.mock.calls.map(([s]) => s).join('');
  return stdout + stderr;
};

describe('formatResponse', () => {
  let stdoutWrite: ReturnType<typeof vi.spyOn>;
  let stderrWrite: ReturnType<typeof vi.spyOn>;
  const originalStderrIsTTY = process.stderr.isTTY;
  const originalStdoutIsTTY = process.stdout.isTTY;
  const originalStdoutRows = process.stdout.rows;

  beforeEach(() => {
    stdoutWrite = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    stderrWrite = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    // Simulate TTY so status badge is shown
    Object.defineProperty(process.stdout, 'isTTY', { value: true, writable: true });
    Object.defineProperty(process.stderr, 'isTTY', { value: true, writable: true });
    // Ensure pager always falls through to direct write in tests
    Object.defineProperty(process.stdout, 'rows', { value: 9999, writable: true, configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(process.stdout, 'isTTY', { value: originalStdoutIsTTY, writable: true });
    Object.defineProperty(process.stderr, 'isTTY', { value: originalStderrIsTTY, writable: true });
    Object.defineProperty(process.stdout, 'rows', { value: originalStdoutRows, writable: true, configurable: true });
  });

  it('outputs JSON data to stdout', async () => {
    await formatResponse(makeResponse(200, { foo: 'bar' }), { json: true });
    const output = stdoutWrite.mock.calls.map(([s]) => s).join('');
    expect(output).toContain('"foo"');
    expect(output).toContain('"bar"');
  });

  it('outputs status badge in non-json mode', async () => {
    await formatResponse(makeResponse(200, { ok: true }), {});
    const output = allOutput(stdoutWrite, stderrWrite);
    expect(output).toContain('200');
  });

  it('does not output status badge in json mode', async () => {
    await formatResponse(makeResponse(200, { ok: true }), { json: true });
    const output = allOutput(stdoutWrite, stderrWrite);
    // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping ANSI escape codes
    const stripped = output.replace(/\x1b\[[0-9;]*m/g, '');
    // In json mode, '200' should only appear if it's part of the JSON data itself
    expect(stripped).not.toMatch(/\b200\b.*OK/);
  });

  it('handles null data with empty response message', async () => {
    await formatResponse(makeResponse(204, null, 'No Content'), {});
    const output = allOutput(stdoutWrite, stderrWrite);
    // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping ANSI escape codes
    const stripped = output.replace(/\x1b\[[0-9;]*m/g, '');
    expect(stripped).toContain('(empty response)');
  });

  it('handles string data', async () => {
    await formatResponse(makeResponse(200, 'hello'), {});
    const output = allOutput(stdoutWrite, stderrWrite);
    expect(output).toContain('hello');
  });

  it('shows response meta with --include', async () => {
    await formatResponse(makeResponse(200, {}), { include: true });
    const output = allOutput(stdoutWrite, stderrWrite);
    expect(output).toContain('RESPONSE META:');
    expect(output).toContain('content-type');
    expect(output).toContain('RESPONSE BODY:');
  });

  it('suppresses status badge when --include is used', async () => {
    await formatResponse(makeResponse(200, { ok: true }), { include: true });
    const output = allOutput(stdoutWrite, stderrWrite);
    // Should show RESPONSE META with code, not the bold status badge
    expect(output).toContain('RESPONSE META:');
    expect(output).toContain('"code": 200');
    // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping ANSI escape codes
    const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');
    const lines = stripAnsi(output).split('\n');
    // The bold "200 OK" badge line should not appear separately
    const badgeLine = lines.find((l) => /^\s*200\s+OK\s*$/.test(l));
    expect(badgeLine).toBeUndefined();
  });

  it('suppresses status badge when stdout is piped', async () => {
    Object.defineProperty(process.stdout, 'isTTY', { value: false, writable: true });
    await formatResponse(makeResponse(200, { ok: true }), {});
    const stderrOutput = stderrWrite.mock.calls.map(([s]) => s).join('');
    expect(stderrOutput).not.toContain('200');
  });

  it('shows request meta and response meta with --verbose', async () => {
    await formatResponse(makeResponse(200, { ok: true }), { verbose: true, operationId: 'testOp' });
    const output = allOutput(stdoutWrite, stderrWrite);
    expect(output).toContain('REQUEST META:');
    expect(output).toContain('testOp');
    expect(output).toContain('RESPONSE META:');
    expect(output).toContain('RESPONSE BODY:');
  });
});
