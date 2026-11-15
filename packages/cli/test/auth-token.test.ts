import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { saveCredentials } from '../src/lib/auth-store.js';
import { pipeStdin } from './helpers/fake-aap.js';

// Mock auth-store
vi.mock('../src/lib/auth-store.js', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/lib/auth-store.js')>()),
  saveCredentials: vi.fn(),
}));

// Mock @inquirer/prompts
vi.mock('@inquirer/prompts', () => ({
  password: vi.fn(),
}));

describe('auth token command', () => {
  let mockStdout: string;
  let mockStderr: string;
  let mockExit: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockStdout = '';
    mockStderr = '';
    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      mockStdout += String(chunk);
      return true;
    });
    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      mockStderr += String(chunk);
      return true;
    });
    mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as never);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('saves token passed as positional argument', async () => {
    const mod = await import('../src/commands/auth-token.js');
    const command = mod.default;

    // Simulate citty calling run with args
    await command.run!({ args: { token: 'my-test-token-123', profile: undefined } } as any);

    expect(saveCredentials).toHaveBeenCalledWith({ token: 'my-test-token-123' }, undefined);
    expect(mockStdout).toContain('Token saved');
  });

  it('saves token to named profile', async () => {
    const mod = await import('../src/commands/auth-token.js');
    const command = mod.default;

    await command.run!({ args: { token: 'tok-456', profile: 'staging' } } as any);

    expect(saveCredentials).toHaveBeenCalledWith({ token: 'tok-456' }, 'staging');
    expect(mockStdout).toContain('profile "staging"');
    expect(mockStdout).toContain('epilot --profile staging <api> <operation>');
  });

  it('confirms the org and expiry decoded from a JWT, never the token', async () => {
    const exp = Math.floor(Date.UTC(2026, 10, 15, 12, 0, 0) / 1000);
    const payload = Buffer.from(JSON.stringify({ org_id: '911210', exp })).toString('base64url');
    const jwt = `eyJhbGciOiJIUzI1NiJ9.${payload}.c2ln`;
    const mod = await import('../src/commands/auth-token.js');

    await mod.default.run!({ args: { token: jwt, profile: 'loginas-911' } } as any);

    expect(mockStdout).toContain('org 911210, expires 2026-11-15T12:00:00.000Z');
    expect(mockStdout).not.toContain(payload);
  });

  it('prompts for token interactively when not provided', async () => {
    const { password } = await import('@inquirer/prompts');
    (password as ReturnType<typeof vi.fn>).mockResolvedValue('interactive-token');

    const mod = await import('../src/commands/auth-token.js');
    const command = mod.default;

    await command.run!({ args: { token: undefined, profile: undefined } } as any);

    expect(password).toHaveBeenCalledWith({ message: 'Paste your API token:' });
    expect(saveCredentials).toHaveBeenCalledWith({ token: 'interactive-token' }, undefined);
    expect(mockStdout).toContain('Token saved');
  });

  it('exits with error when no token provided interactively', async () => {
    const { password } = await import('@inquirer/prompts');
    (password as ReturnType<typeof vi.fn>).mockResolvedValue('');

    const mod = await import('../src/commands/auth-token.js');
    const command = mod.default;

    await command.run!({ args: { token: undefined, profile: undefined } } as any);

    expect(mockStderr).toContain('No token provided');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('uses EPILOT_PROFILE env var when no --profile flag', async () => {
    const origEnv = process.env.EPILOT_PROFILE;
    process.env.EPILOT_PROFILE = 'env-profile';

    try {
      const mod = await import('../src/commands/auth-token.js');
      const command = mod.default;

      await command.run!({ args: { token: 'tok-env', profile: undefined } } as any);

      expect(saveCredentials).toHaveBeenCalledWith({ token: 'tok-env' }, 'env-profile');
    } finally {
      if (origEnv === undefined) {
        delete process.env.EPILOT_PROFILE;
      } else {
        process.env.EPILOT_PROFILE = origEnv;
      }
    }
  });

  it('reads the token from stdin with "-" and never prints it', async () => {
    const stdin = pipeStdin('  piped-token-789\n');
    try {
      const mod = await import('../src/commands/auth-token.js');
      await mod.default.run!({ args: { token: '-', profile: 'loginas-911' } } as any);
    } finally {
      stdin.restore();
    }
    expect(saveCredentials).toHaveBeenCalledWith({ token: 'piped-token-789' }, 'loginas-911');
    expect(mockStdout).toContain('Token saved to profile "loginas-911"');
    expect(mockStdout).not.toContain('piped-token-789');
  });

  it('exits with error when stdin is empty', async () => {
    const stdin = pipeStdin('');
    try {
      const mod = await import('../src/commands/auth-token.js');
      await mod.default.run!({ args: { token: '-', profile: 'loginas-911' } } as any);
    } finally {
      stdin.restore();
    }
    expect(mockStderr).toContain('No token provided');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
