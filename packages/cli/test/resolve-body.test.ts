import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { resolveBody, loadPayloadCache, savePayloadCache, clearPayloadCache } from '../src/lib/body-handler.js';

// Mock @inquirer/prompts
vi.mock('@inquirer/prompts', () => ({
  editor: vi.fn(),
}));

describe('resolveBody', () => {
  const originalIsTTY = process.stdin.isTTY;

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, writable: true });
  });

  describe('with -d flag', () => {
    it('parses valid JSON from -d flag', async () => {
      const result = await resolveBody({
        dataFlag: '{"name":"test"}',
        hasRequestBody: true,
        isRequired: true,
      });
      expect(result).toEqual({ name: 'test' });
    });

    it('throws on invalid JSON in -d flag', async () => {
      await expect(
        resolveBody({
          dataFlag: 'not-json',
          hasRequestBody: true,
          isRequired: true,
        }),
      ).rejects.toThrow('Invalid JSON in -d flag');
    });

    it('-d flag takes priority over interactive mode', async () => {
      Object.defineProperty(process.stdin, 'isTTY', { value: true, writable: true });

      const result = await resolveBody({
        dataFlag: '{"priority":"flag"}',
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
      });
      expect(result).toEqual({ priority: 'flag' });

      // editor should not be called
      const { editor } = await import('@inquirer/prompts');
      expect(editor).not.toHaveBeenCalled();
    });
  });

  describe('interactive editor', () => {
    beforeEach(() => {
      Object.defineProperty(process.stdin, 'isTTY', { value: true, writable: true });
    });

    it('opens editor with default template when interactive', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('{"from":"editor"}');

      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
      });

      expect(editor).toHaveBeenCalledWith({
        message: 'Edit request body (JSON):',
        default: '{\n  \n}',
        waitForUserInput: false,
      });
      expect(result).toEqual({ from: 'editor' });
    });

    it('uses defaultTemplate when provided', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('{"edited":true}');

      const template = { name: '', age: 0 };
      await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
        defaultTemplate: template,
      });

      expect(editor).toHaveBeenCalledWith({
        message: 'Edit request body (JSON):',
        default: JSON.stringify(template, null, 2),
        waitForUserInput: false,
      });
    });

    it('retries editor on invalid JSON then accepts valid JSON', async () => {
      const { editor } = await import('@inquirer/prompts');
      const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
      (editor as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce('not valid json')
        .mockResolvedValueOnce('{"fixed": true}');

      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
      });

      expect(result).toEqual({ fixed: true });
      expect(editor).toHaveBeenCalledTimes(2);
      // Second call should have the invalid content as default so user can fix it
      expect((editor as ReturnType<typeof vi.fn>).mock.calls[1][0].default).toBe('not valid json');
      // Error message shown to stderr
      expect(stderrSpy).toHaveBeenCalled();
      const errOutput = stderrSpy.mock.calls.map((c) => String(c[0])).join('');
      expect(errOutput).toContain('Invalid JSON');
      stderrSpy.mockRestore();
    });

    it('throws after max retries with invalid JSON', async () => {
      const { editor } = await import('@inquirer/prompts');
      vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('still not json');

      await expect(
        resolveBody({
          dataFlag: undefined,
          hasRequestBody: true,
          isRequired: true,
          interactive: true,
        }),
      ).rejects.toThrow('Invalid JSON from editor after multiple attempts');
    });

    it('throws when editor returns empty and body is required', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('   ');

      await expect(
        resolveBody({
          dataFlag: undefined,
          hasRequestBody: true,
          isRequired: true,
          interactive: true,
        }),
      ).rejects.toThrow('Request body is required but editor returned empty content');
    });

    it('returns null when editor returns empty and body is optional', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('');

      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: false,
        interactive: true,
      });
      expect(result).toBeNull();
    });

    it('does not open editor when interactive is false', async () => {
      const { editor } = await import('@inquirer/prompts');

      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: false,
        interactive: false,
      });

      expect(editor).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('no body provided', () => {
    beforeEach(() => {
      Object.defineProperty(process.stdin, 'isTTY', { value: true, writable: true });
    });

    it('throws when required body is missing in non-interactive mode', async () => {
      await expect(
        resolveBody({
          dataFlag: undefined,
          hasRequestBody: true,
          isRequired: true,
          interactive: false,
        }),
      ).rejects.toThrow('This operation requires a request body');
    });

    it('returns null when optional body is missing', async () => {
      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: false,
        isRequired: false,
      });
      expect(result).toBeNull();
    });

    it('returns null when operation has no request body', async () => {
      const result = await resolveBody({
        dataFlag: undefined,
        hasRequestBody: false,
        isRequired: false,
        interactive: true,
      });
      expect(result).toBeNull();
    });
  });

  describe('payload cache', () => {
    const cacheKey = 'test-api/testOperation';

    beforeEach(() => {
      Object.defineProperty(process.stdin, 'isTTY', { value: true, writable: true });
      clearPayloadCache(cacheKey);
    });

    afterEach(() => {
      clearPayloadCache(cacheKey);
    });

    it('persists editor payload for next run', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('{"saved":"payload"}');

      await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
        cacheKey,
      });

      const cached = loadPayloadCache(cacheKey);
      expect(cached).toBe('{"saved":"payload"}');
    });

    it('uses cached payload as editor default over mock template', async () => {
      // Pre-populate the cache
      savePayloadCache(cacheKey, '{"cached":"data"}');

      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('{"final":"result"}');

      await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
        defaultTemplate: { mock: 'template' },
        cacheKey,
      });

      // Should use cached value, not the mock template
      expect(editor).toHaveBeenCalledWith(
        expect.objectContaining({
          default: '{"cached":"data"}',
        }),
      );
    });

    it('clears cache when editor returns empty', async () => {
      savePayloadCache(cacheKey, '{"old":"data"}');

      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('');

      await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: false,
        interactive: true,
        cacheKey,
      });

      const cached = loadPayloadCache(cacheKey);
      expect(cached).toBeUndefined();
    });

    it('falls back to mock template when no cache exists', async () => {
      const { editor } = await import('@inquirer/prompts');
      (editor as ReturnType<typeof vi.fn>).mockResolvedValue('{"ok":true}');

      const template = { q: '*', size: 10 };
      await resolveBody({
        dataFlag: undefined,
        hasRequestBody: true,
        isRequired: true,
        interactive: true,
        defaultTemplate: template,
        cacheKey,
      });

      expect(editor).toHaveBeenCalledWith(
        expect.objectContaining({
          default: JSON.stringify(template, null, 2),
        }),
      );
    });
  });
});
