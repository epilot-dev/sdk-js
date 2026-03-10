import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { saveCredentials } from '../src/lib/auth-store.js';

// Mock auth-store
vi.mock('../src/lib/auth-store.js', () => ({
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
});
