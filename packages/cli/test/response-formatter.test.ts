import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatResponse } from '../src/lib/response-formatter.js';
import type { AxiosResponse } from 'axios';

const makeResponse = (status: number, data: unknown, statusText = 'OK'): AxiosResponse => ({
  status,
  statusText,
  data,
  headers: { 'content-type': 'application/json' },
  config: {
    method: 'get',
    url: 'https://example.com/api',
    headers: {} as any,
  } as any,
} as AxiosResponse);

describe('formatResponse', () => {
  let stdoutWrite: ReturnType<typeof vi.spyOn>;
  let stderrWrite: ReturnType<typeof vi.spyOn>;
  const originalStderrIsTTY = process.stderr.isTTY;
  const originalStdoutIsTTY = process.stdout.isTTY;

  beforeEach(() => {
    stdoutWrite = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    stderrWrite = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    // Simulate TTY so status badge is shown
    Object.defineProperty(process.stdout, 'isTTY', { value: true, writable: true });
    Object.defineProperty(process.stderr, 'isTTY', { value: true, writable: true });
  });

  afterEach(() => {
    Object.defineProperty(process.stdout, 'isTTY', { value: originalStdoutIsTTY, writable: true });
    Object.defineProperty(process.stderr, 'isTTY', { value: originalStderrIsTTY, writable: true });
  });

  it('outputs JSON data to stdout', async () => {
    await formatResponse(makeResponse(200, { foo: 'bar' }), { json: true });
    const output = stdoutWrite.mock.calls.map(([s]) => s).join('');
    expect(output).toContain('"foo"');
    expect(output).toContain('"bar"');
  });

  it('outputs status badge to stderr for non-json mode', async () => {
    await formatResponse(makeResponse(200, { ok: true }), {});
    const stderrOutput = stderrWrite.mock.calls.map(([s]) => s).join('');
    expect(stderrOutput).toContain('200');
  });

  it('does not output status badge in json mode', async () => {
    await formatResponse(makeResponse(200, { ok: true }), { json: true });
    const stderrOutput = stderrWrite.mock.calls.map(([s]) => s).join('');
    expect(stderrOutput).not.toContain('200');
  });

  it('handles null data', async () => {
    await formatResponse(makeResponse(204, null, 'No Content'), {});
    const output = stdoutWrite.mock.calls.map(([s]) => s).join('');
    expect(output).toBe('');
  });

  it('handles string data', async () => {
    await formatResponse(makeResponse(200, 'hello'), {});
    const output = stdoutWrite.mock.calls.map(([s]) => s).join('');
    expect(output).toContain('hello');
  });

  it('shows response headers with --include', async () => {
    await formatResponse(makeResponse(200, {}), { include: true });
    const stderrOutput = stderrWrite.mock.calls.map(([s]) => s).join('');
    expect(stderrOutput).toContain('content-type');
  });

  it('suppresses status badge when stdout is piped', async () => {
    Object.defineProperty(process.stdout, 'isTTY', { value: false, writable: true });
    await formatResponse(makeResponse(200, { ok: true }), {});
    const stderrOutput = stderrWrite.mock.calls.map(([s]) => s).join('');
    expect(stderrOutput).not.toContain('200');
  });
});
