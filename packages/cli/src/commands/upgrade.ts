import { defineCommand } from 'citty';
import { execSync } from 'node:child_process';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW, CYAN } from '../lib/utils.js';

declare const __CLI_VERSION__: string;

export default defineCommand({
  meta: { name: 'upgrade', description: 'Upgrade @epilot/cli to the latest version' },
  args: {
    check: { type: 'boolean', description: 'Only check for updates, do not install' },
  },
  run: async ({ args }) => {
    const current = getCurrentVersion();
    const latest = await getLatestVersion();

    if (!latest) {
      process.stderr.write(`${RED}Could not fetch latest version from npm registry.${RESET}\n`);
      process.exit(1);
    }

    if (current === latest) {
      process.stdout.write(`${GREEN}Already on the latest version ${BOLD}${current}${RESET}\n`);
      return;
    }

    process.stdout.write(`${CYAN}Current:${RESET} ${current}\n`);
    process.stdout.write(`${CYAN}Latest:${RESET}  ${BOLD}${latest}${RESET}\n`);

    if (args.check) {
      process.stdout.write(`\n${YELLOW}Update available.${RESET} Run ${BOLD}epilot upgrade${RESET} to install.\n`);
      return;
    }

    process.stdout.write(`\n`);

    const installer = detectInstaller();

    if (!installer) {
      process.stdout.write(`${YELLOW}Could not detect how @epilot/cli was installed.${RESET}\n`);
      process.stdout.write(`Upgrade manually with one of:\n`);
      process.stdout.write(`  ${DIM}npm install -g @epilot/cli@latest${RESET}\n`);
      process.stdout.write(`  ${DIM}yarn global add @epilot/cli@latest${RESET}\n`);
      process.stdout.write(`  ${DIM}pnpm add -g @epilot/cli@latest${RESET}\n`);
      return;
    }

    process.stdout.write(`${DIM}Upgrading via ${installer.name}...${RESET}\n`);

    try {
      execSync(installer.command, { stdio: 'inherit' });
      process.stdout.write(`\n${GREEN}${BOLD}Upgraded to @epilot/cli@${latest}${RESET}\n`);
    } catch {
      process.stderr.write(`${RED}Upgrade failed.${RESET} Try manually:\n  ${installer.command}\n`);
      process.exit(1);
    }
  },
});

const getCurrentVersion = (): string => {
  // Use build-time injected version, fall back to npm ls
  if (typeof __CLI_VERSION__ !== 'undefined') return __CLI_VERSION__;

  try {
    const output = execSync('npm ls -g @epilot/cli --depth=0 --json 2>/dev/null', {
      encoding: 'utf-8',
      timeout: 10000,
    });
    const parsed = JSON.parse(output);
    return parsed?.dependencies?.['@epilot/cli']?.version ?? 'unknown';
  } catch {
    return 'unknown';
  }
};

const getLatestVersion = async (): Promise<string | null> => {
  try {
    const output = execSync('npm view @epilot/cli version', {
      encoding: 'utf-8',
      timeout: 10000,
    });
    return output.trim() || null;
  } catch {
    return null;
  }
};

interface Installer {
  name: string;
  command: string;
}

const detectInstaller = (): Installer | null => {
  // Check if installed via volta
  if (process.env.VOLTA_HOME && whichResolves('volta')) {
    return { name: 'volta', command: 'volta install @epilot/cli@latest' };
  }

  // Check the path of the running binary to guess the package manager
  const binPath = process.argv[1] || '';

  if (binPath.includes('/.pnpm/') || binPath.includes('/pnpm/')) {
    return { name: 'pnpm', command: 'pnpm add -g @epilot/cli@latest' };
  }

  if (binPath.includes('/yarn/') || binPath.includes('/.yarn/')) {
    return { name: 'yarn', command: 'yarn global add @epilot/cli@latest' };
  }

  // Default: try npm
  if (whichResolves('npm')) {
    return { name: 'npm', command: 'npm install -g @epilot/cli@latest' };
  }

  return null;
};

const whichResolves = (cmd: string): boolean => {
  try {
    execSync(`which ${cmd}`, { encoding: 'utf-8', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};
