import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import initCommand from '../src/commands/app/init.js';

describe('app init', () => {
  const temporaryDirectories: string[] = [];

  afterEach(() => {
    for (const directory of temporaryDirectories.splice(0)) {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('scaffolds an App without copying reusable agent guidance into the project', async () => {
    const temporaryDirectory = mkdtempSync(join(tmpdir(), 'epilot-cli-app-init-'));
    temporaryDirectories.push(temporaryDirectory);
    const appDirectory = join(temporaryDirectory, 'example-app');

    expect(initCommand.run).toBeTypeOf('function');
    await initCommand.run?.({ args: { name: appDirectory } } as never);

    expect(existsSync(join(appDirectory, 'manifest.json'))).toBe(true);
    expect(existsSync(join(appDirectory, 'package.json'))).toBe(true);
    expect(existsSync(join(appDirectory, 'components', 'README.md'))).toBe(true);
    expect(existsSync(join(appDirectory, 'SKILL.md'))).toBe(false);
    expect(readFileSync(join(appDirectory, 'README.md'), 'utf8')).toContain('epilot app validate');
  });
});
