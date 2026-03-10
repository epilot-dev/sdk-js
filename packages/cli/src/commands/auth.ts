import { defineCommand } from 'citty';
import { loadCredentials, saveCredentials, removeCredentials } from '../lib/auth-store.js';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW } from '../lib/utils.js';

export default defineCommand({
  meta: {
    name: 'auth',
    description: 'Manage authentication',
  },
  subCommands: {
    login: () => import('./auth-login.js').then((m) => m.default),
    logout: defineCommand({
      meta: { name: 'logout', description: 'Remove stored credentials' },
      run: () => {
        const removed = removeCredentials();
        if (removed) {
          process.stdout.write(`${GREEN}Logged out successfully.${RESET}\n`);
        } else {
          process.stdout.write(`No stored credentials found.\n`);
        }
      },
    }),
    status: defineCommand({
      meta: { name: 'status', description: 'Show authentication status' },
      run: () => {
        const creds = loadCredentials();
        if (!creds) {
          process.stdout.write(`${YELLOW}Not authenticated.${RESET}\n`);
          process.stdout.write(`Run ${BOLD}epilot auth login${RESET} to authenticate.\n`);
          return;
        }

        process.stdout.write(`${GREEN}${BOLD}Authenticated${RESET}\n`);
        if (creds.name) process.stdout.write(`  Name:    ${creds.name}\n`);
        if (creds.org_id) process.stdout.write(`  Org:     ${creds.org_id}\n`);
        if (creds.user_id) process.stdout.write(`  User:    ${creds.user_id}\n`);
        if (creds.expires_at) {
          const expiry = new Date(creds.expires_at);
          const now = new Date();
          const days = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          process.stdout.write(`  Expires: ${creds.expires_at} ${DIM}(${days} days)${RESET}\n`);
        }
        process.stdout.write(`  Token:   ${creds.token.substring(0, 20)}...${RESET}\n`);
      },
    }),
  },
});
