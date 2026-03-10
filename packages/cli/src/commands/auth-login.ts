import { defineCommand } from 'citty';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { saveCredentials } from '../lib/auth-store.js';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW, CYAN } from '../lib/utils.js';

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

    if (!process.stdin.isTTY) {
      process.stderr.write(`${RED}Browser login requires an interactive terminal.${RESET}\n`);
      process.stderr.write(
        `Use ${BOLD}epilot auth login --token <token>${RESET} or ${BOLD}epilot auth token${RESET} instead.\n`,
      );
      process.exit(1);
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
  // Generate a cryptographic state parameter to prevent CSRF
  const state = randomBytes(32).toString('hex');

  // Generate a short verification code the user must confirm after login
  const verificationCode = randomBytes(3).toString('hex').toUpperCase(); // e.g. "A1B2C3"

  // Show what we're about to do and wait for user confirmation
  const suffix = profileName ? ` ${DIM}(profile: ${profileName})${RESET}` : '';
  process.stdout.write(`\n${BOLD}epilot CLI Login${RESET}${suffix}\n\n`);
  process.stdout.write(`This will open your browser to authenticate with epilot.\n`);
  process.stdout.write(`\n`);
  process.stdout.write(`  ${YELLOW}Verification code: ${BOLD}${verificationCode}${RESET}\n`);
  process.stdout.write(`\n`);
  process.stdout.write(`${DIM}Verify this code matches what is shown in your browser after login.${RESET}\n`);
  process.stdout.write(`${DIM}This ensures you are logging into the correct CLI session.${RESET}\n`);
  process.stdout.write(`\n`);

  const { confirm } = await import('@inquirer/prompts');
  const proceed = await confirm({ message: 'Open browser to log in?', default: true });
  if (!proceed) {
    return null;
  }

  return new Promise((resolve) => {
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const done = (token: string | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      server.close();
      resolve(token);
    };

    const onServerListening = async () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        done(null);
        return;
      }

      const port = address.port;
      const callbackUrl = `http://localhost:${port}/callback`;
      const loginUrl =
        `https://portal.epilot.cloud/login?cli_callback=${encodeURIComponent(callbackUrl)}` +
        `&state=${state}` +
        `&code=${verificationCode}`;

      process.stdout.write(`\n${DIM}Login URL: ${loginUrl}${RESET}\n\n`);

      try {
        const open = (await import('open')).default;
        await open(loginUrl);
        process.stdout.write(`${CYAN}Browser opened.${RESET} Waiting for authentication...\n`);
      } catch {
        process.stdout.write(`Could not open browser. Please visit this URL manually:\n\n  ${loginUrl}\n\n`);
      }

      // Fallback: allow manual token paste (masked) while waiting for browser
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

      // Timeout after 5 minutes
      timeoutId = setTimeout(
        () => {
          process.stderr.write(`\n${RED}Login timed out after 5 minutes.${RESET}\n`);
          done(null);
        },
        5 * 60 * 1000,
      );
      timeoutId.unref();
    };

    const server = createServer((req, res) => {
      const url = new URL(req.url!, 'http://localhost');

      if (url.pathname === '/callback') {
        const token = url.searchParams.get('token');
        const returnedState = url.searchParams.get('state');
        const orgId = url.searchParams.get('org_id');
        const userId = url.searchParams.get('user_id');
        const name = url.searchParams.get('name');

        // Verify state parameter to prevent CSRF
        if (returnedState !== state) {
          res.writeHead(403, { 'Content-Type': 'text/html' });
          res.end(
            '<html><body><h1>Login failed</h1><p>Invalid state parameter. This request may not have originated from your CLI session.</p></body></html>',
          );
          return;
        }

        if (token) {
          saveCredentials(
            {
              token,
              org_id: orgId ?? undefined,
              user_id: userId ?? undefined,
              name: name ?? undefined,
            },
            profileName,
          );

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(
            `<html><body><h1>Login successful!</h1><p>Verification code: <strong>${verificationCode}</strong></p><p>You can close this tab.</p></body></html>`,
          );
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

    server.unref();

    server.listen(0, () => {
      onServerListening().catch(() => done(null));
    });
  });
};
