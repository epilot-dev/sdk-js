import { defineCommand } from 'citty';
import { createServer } from 'node:http';
import { saveCredentials } from '../lib/auth-store.js';
import { BOLD, RESET, GREEN, RED, DIM } from '../lib/utils.js';

export default defineCommand({
  meta: { name: 'login', description: 'Authenticate with epilot' },
  args: {
    token: { type: 'string', description: 'Manually provide a token instead of browser login' },
    profile: { type: 'string', description: 'Save credentials to this profile' },
  },
  run: async ({ args }) => {
    const profileName = args.profile || process.env.EPILOT_PROFILE;

    // Manual token input
    if (args.token) {
      saveCredentials({ token: args.token }, profileName);
      const suffix = profileName ? ` to profile "${profileName}"` : '';
      process.stdout.write(`${GREEN}Token saved${suffix}.${RESET}\n`);
      return;
    }

    // Browser-based login flow
    if (profileName) {
      process.stdout.write(`${BOLD}Opening browser for epilot login (profile: ${profileName})...${RESET}\n`);
    } else {
      process.stdout.write(`${BOLD}Opening browser for epilot login...${RESET}\n`);
    }

    const token = await browserLogin(profileName);
    if (token) {
      process.stdout.write(`${GREEN}${BOLD}Login successful!${RESET}\n`);
    } else {
      process.stderr.write(`${RED}Login failed or was cancelled.${RESET}\n`);
      process.exit(1);
    }
  },
});

const browserLogin = async (profileName?: string): Promise<string | null> => {
  let settled = false;
  let timeoutId: ReturnType<typeof setTimeout>;

  return new Promise(async (resolve) => {
    const done = (token: string | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      server.close();
      resolve(token);
    };

    const server = createServer((req, res) => {
      const url = new URL(req.url!, `http://localhost`);

      if (url.pathname === '/callback') {
        const token = url.searchParams.get('token');
        const orgId = url.searchParams.get('org_id');
        const userId = url.searchParams.get('user_id');
        const name = url.searchParams.get('name');

        if (token) {
          saveCredentials({
            token,
            org_id: orgId ?? undefined,
            user_id: userId ?? undefined,
            name: name ?? undefined,
          }, profileName);

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body><h1>Login successful!</h1><p>You can close this tab.</p></body></html>');
          done(token);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end('<html><body><h1>Login failed</h1><p>No token received.</p></body></html>');
          done(null);
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    // Don't let the server keep the process alive after we're done
    server.unref();

    server.listen(0, async () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        done(null);
        return;
      }

      const port = address.port;
      const callbackUrl = `http://localhost:${port}/callback`;
      const loginUrl = `https://portal.epilot.cloud/login?cli_callback=${encodeURIComponent(callbackUrl)}`;

      process.stdout.write(`\n${DIM}Login URL: ${loginUrl}${RESET}\n\n`);

      try {
        const open = (await import('open')).default;
        await open(loginUrl);
        process.stdout.write(`Browser opened. Waiting for authentication...\n`);
      } catch {
        process.stdout.write(
          `Could not open browser. Please visit this URL manually:\n\n  ${loginUrl}\n\n`,
        );
      }

      // Fallback: allow manual token paste (masked) while waiting for browser
      if (process.stdin.isTTY) {
        process.stdout.write(`\n${DIM}Or paste a token manually:${RESET}\n`);
        try {
          const { password } = await import('@inquirer/prompts');
          const token = await password({ message: 'Token:' });
          if (token?.trim()) {
            saveCredentials({ token: token.trim() }, profileName);
            done(token.trim());
          }
        } catch {
          // User cancelled (Ctrl+C) or prompt was force-closed by browser callback
        }
      }

      // Timeout after 5 minutes
      timeoutId = setTimeout(() => done(null), 5 * 60 * 1000);
      timeoutId.unref();
    });
  });
};
