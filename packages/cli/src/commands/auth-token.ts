import { defineCommand } from 'citty';
import { saveCredentials } from '../lib/auth-store.js';
import { BOLD, RESET, GREEN, RED } from '../lib/utils.js';

export default defineCommand({
  meta: { name: 'token', description: 'Store an API token directly' },
  args: {
    token: { type: 'positional', description: 'API token to store', required: false },
    profile: { type: 'string', description: 'Save credentials to this profile' },
  },
  run: async ({ args }) => {
    const profileName = args.profile || process.env.EPILOT_PROFILE;

    let token = args.token as string | undefined;

    if (!token) {
      // Prompt interactively with masked input
      const { password } = await import('@inquirer/prompts');
      token = await password({
        message: 'Paste your API token:',
      });
    }

    if (!token) {
      process.stderr.write(`${RED}No token provided.${RESET}\n`);
      process.exit(1);
    }

    saveCredentials({ token }, profileName);
    const suffix = profileName ? ` to profile "${profileName}"` : '';
    process.stdout.write(`${GREEN}${BOLD}Token saved${suffix}.${RESET}\n`);
  },
});
