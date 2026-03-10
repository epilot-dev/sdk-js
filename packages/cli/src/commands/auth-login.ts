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
  const verificationCode = randomBytes(3).toString('hex').toUpperCase();

  // Show what we're about to do and wait for user confirmation
  const suffix = profileName ? ` ${DIM}(profile: ${profileName})${RESET}` : '';
  process.stdout.write(`\n${BOLD}epilot CLI Login${RESET}${suffix}\n\n`);
  process.stdout.write('This will open your browser to authenticate with epilot.\n');
  process.stdout.write('\n');
  process.stdout.write(`  ${YELLOW}Verification code: ${BOLD}${verificationCode}${RESET}\n`);
  process.stdout.write('\n');
  process.stdout.write(`${DIM}Verify this code matches what is shown in your browser after login.${RESET}\n`);
  process.stdout.write(`${DIM}This ensures you are logging into the correct CLI session.${RESET}\n`);
  process.stdout.write('\n');

  const { confirm } = await import('@inquirer/prompts');
  const proceed = await confirm({ message: 'Open browser to log in?', default: true });
  if (!proceed) {
    return null;
  }

  return new Promise((resolve) => {
    let settled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let tokenPromptController: AbortController | undefined;

    const done = (token: string | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);

      // Cancel the token prompt if it's still waiting
      tokenPromptController?.abort();

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
        tokenPromptController = new AbortController();
        const token = await password(
          { message: 'Token:', theme: { prefix: '' } },
          { signal: tokenPromptController.signal },
        );
        if (token?.trim()) {
          saveCredentials({ token: token.trim() }, profileName);
          done(token.trim());
        }
      } catch {
        // User cancelled (Ctrl+C) or prompt was aborted by browser callback
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
        if (returnedState && returnedState !== state) {
          res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderPage('Login Failed', 'Invalid session. This request may not have originated from your CLI.', 'error'),
          );
          return;
        }

        if (!returnedState) {
          process.stderr.write(
            `${YELLOW}Warning: Login portal did not return state parameter. CSRF protection is not active.${RESET}\n`,
          );
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

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderPage(
              'Login Successful',
              'You can close this tab and return to your terminal.',
              'success',
              verificationCode,
            ),
          );
          done(token);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(renderPage('Login Failed', 'No token was received. Please try again.', 'error'));
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

// ── Branded HTML pages ────────────────────────────────────────────────────────

const renderPage = (title: string, message: string, status: 'success' | 'error', code?: string): string => {
  const icon = status === 'success' ? '✓' : '✕';
  const iconBg = status === 'success' ? '#e8f5e9' : '#ffeef0';
  const iconColor = status === 'success' ? '#2e7d32' : '#c62828';
  const titleColor = status === 'success' ? '#1b5e20' : '#b71c1c';

  const codeBlock = code
    ? `
      <div class="code-section">
        <p class="code-label">Verification code</p>
        <div class="code">${escapeHtml(code)}</div>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} — epilot CLI</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Nunito Sans', 'Helvetica Neue', Arial, sans-serif;
      background: #f0f4f8;
      color: #172b4d;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .card {
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      padding: 3rem 2.5rem;
      max-width: 420px;
      width: 100%;
      text-align: center;
    }
    .logo {
      margin-bottom: 2rem;
    }
    .logo svg {
      height: 32px;
      width: auto;
    }
    .icon-circle {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: ${iconBg};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }
    .icon {
      font-size: 48px;
      color: ${iconColor};
      line-height: 1;
    }
    h1 {
      font-size: 28px;
      font-weight: 900;
      color: ${titleColor};
      margin-bottom: 0.5rem;
    }
    .message {
      font-size: 16px;
      color: #5e6c84;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    .code-section {
      margin: 1.5rem 0;
    }
    .code-label {
      font-size: 13px;
      color: #8993a4;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .code {
      font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.25em;
      color: #172b4d;
      background: #f4f5f7;
      border: 2px solid #dfe1e6;
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      display: inline-block;
    }
    .footer {
      font-size: 13px;
      color: #8993a4;
      margin-top: 1.5rem;
    }
    .footer a {
      color: #005eb4;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <svg viewBox="0 0 552 138" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.19 95.55c-12.85 0-24.72-5.46-33.46-14.97l-.41-.45-19.59 16.08.45.52C30.37 110.64 49.8 120 71.19 120c34.26 0 59.25-24.7 59.25-58.76h-25.53c0 20.42-14.32 34.31-33.72 34.31Z" fill="#005EB4"/>
        <path d="M71.19 36.42c13.56 0 24.8 5.32 33.36 15.04l.41.46 19.52-16.15-.44-.52C111.8 21.27 92.34 12 71.19 12 36.41 12 12 36.7 12 70.63h25.53c0-20.3 14.32-34.21 33.66-34.21Z" fill="#005EB4"/>
        <path d="M190.05 96.74V76.2h38.82V58.01h-38.82V42.44h43.48V24.04h-64.12v91.32h66.46V96.74h-45.82Z" fill="#005EB4"/>
        <path d="M287.9 45.04c-6.53 0-12.37 1.73-17.36 5.15V24.04h-20v91.32h20v-4.3c4.99 3.63 10.96 5.49 17.75 5.49 18.74 0 33.01-15.58 33.01-36.09 0-20.25-14.54-35.42-33.4-35.42Zm-2.53 53.5c-9.62 0-16.63-7.52-16.63-17.86 0-10.07 7-17.53 16.29-17.53 9.62 0 16.63 7.46 16.63 17.53 0 10.34-7.01 17.86-16.29 17.86Z" fill="#005EB4"/>
        <path d="M335.35 24.04h20.64v91.32h-20.64V24.04Z" fill="#005EB4"/>
        <path d="M397.25 45.04c-20.78 0-36.74 15.37-36.74 35.42 0 20.32 15.96 36.09 36.39 36.09 20.78 0 36.74-15.5 36.74-35.82 0-20.45-15.97-35.69-36.39-35.69Zm-.18 53.5c-9.48 0-16.11-7.52-16.11-18.28 0-10.14 6.86-17.25 16.65-17.25 9.41 0 16.04 7.11 16.04 17.25 0 10.76-6.86 18.28-16.58 18.28Z" fill="#005EB4"/>
        <path d="M460.2 62.87v-16.4h-13.06v68.89h20.64V79.07c0-9.35 5.73-14.7 14.18-14.7h6.53V45.04h-4.62c-10.3 0-18.68 5.73-23.67 17.83Z" fill="#005EB4"/>
        <circle cx="526" cy="90" r="14" fill="#FF7043"/>
      </svg>
    </div>
    <div class="icon-circle">
      <span class="icon">${icon}</span>
    </div>
    <h1>${escapeHtml(title)}</h1>
    <p class="message">${escapeHtml(message)}</p>
    ${codeBlock}
    <p class="footer">Powered by <a href="https://epilot.cloud" target="_blank" rel="noopener">epilot</a></p>
  </div>
</body>
</html>`;
};

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
