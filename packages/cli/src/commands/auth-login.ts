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

      // Force-close all connections so the process can exit
      server.closeAllConnections();
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

      // Timeout after 5 minutes
      timeoutId = setTimeout(
        () => {
          process.stderr.write(`\n${RED}Login timed out after 5 minutes.${RESET}\n`);
          done(null);
        },
        5 * 60 * 1000,
      );
      timeoutId.unref();

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
      <svg fill="none" viewBox="0 0 162 41" xmlns="http://www.w3.org/2000/svg" style="height:32px;width:auto;">
        <path d="M107.154 8.17228H112.299V32.6345H107.154V8.17228ZM116.179 32.7188H121.325V0.496218H116.179V32.7188ZM153.547 0.496218V8.17228H151.017V13.3178H153.547V32.6345H158.693V13.3178H161.308V8.17228H158.693V0.411865H153.547V0.496218ZM74.6779 23.0183C74.8497 22.1573 74.9345 21.2813 74.931 20.4034C74.905 17.4165 73.7775 14.5444 71.7648 12.3375C69.752 10.1306 66.9954 8.74416 64.0236 8.44407C61.0518 8.14397 58.0738 8.95128 55.6604 10.7112C53.247 12.4712 51.5681 15.06 50.9455 17.9813C50.323 20.9027 50.8005 23.951 52.2866 26.542C53.7727 29.133 56.1629 31.0844 58.9988 32.022C61.8348 32.9596 64.917 32.8176 67.6547 31.623C70.3924 30.4285 72.5929 28.2656 73.8344 25.5489H67.5923C66.7579 26.3446 65.7403 26.9226 64.6296 27.2318C63.5188 27.5411 62.3489 27.572 61.2234 27.3218C60.0978 27.0717 59.0511 26.5483 58.1759 25.7977C57.3006 25.0471 56.6236 24.0926 56.2047 23.0183H74.6779ZM62.6999 13.4021C64.1178 13.4043 65.5026 13.8313 66.6754 14.6283C67.8482 15.4252 68.7552 16.5553 69.2794 17.8728H56.1204C56.6346 16.5485 57.5392 15.4118 58.7143 14.6134C59.8893 13.8149 61.2793 13.3925 62.6999 13.4021ZM137.436 27.489C136.035 27.489 134.665 27.0734 133.5 26.2948C132.334 25.5163 131.426 24.4096 130.89 23.1149C130.354 21.8202 130.213 20.3955 130.487 19.021C130.76 17.6466 131.435 16.384 132.426 15.3931C133.417 14.4022 134.679 13.7273 136.054 13.4539C137.428 13.1805 138.853 13.3208 140.148 13.8571C141.442 14.3934 142.549 15.3016 143.328 16.4668C144.106 17.6321 144.522 19.002 144.522 20.4034C144.51 22.2791 143.76 24.0749 142.434 25.4013C141.108 26.7276 139.312 27.4778 137.436 27.489ZM137.436 8.17228C135.017 8.17228 132.652 8.88963 130.641 10.2336C128.629 11.5776 127.062 13.4878 126.136 15.7227C125.21 17.9577 124.968 20.4169 125.44 22.7895C125.912 25.1621 127.077 27.3415 128.787 29.0521C130.498 30.7626 132.677 31.9275 135.05 32.3995C137.422 32.8714 139.882 32.6292 142.117 31.7034C144.352 30.7777 146.262 29.21 147.606 27.1986C148.95 25.1872 149.667 22.8225 149.667 20.4034C149.665 17.1602 148.375 14.0505 146.082 11.7573C143.789 9.46399 140.679 8.17461 137.436 8.17228ZM91.0423 8.17228C87.7991 8.17461 84.6894 9.46399 82.3961 11.7573C80.1029 14.0505 78.8135 17.1602 78.8112 20.4034V40.3105H83.9567V30.4413C85.5303 31.5511 87.3433 32.2744 89.2487 32.5525C91.1541 32.8307 93.0983 32.656 94.9235 32.0425C96.7487 31.4289 98.4037 30.3939 99.7542 29.0213C101.105 27.6487 102.113 25.9772 102.697 24.1423C103.28 22.3073 103.424 20.3606 103.115 18.46C102.806 16.5593 102.053 14.7583 100.918 13.2028C99.7828 11.6474 98.2971 10.3813 96.5813 9.50731C94.8655 8.6333 92.9678 8.17593 91.0423 8.17228ZM91.0423 27.489C89.6409 27.489 88.2709 27.0734 87.1057 26.2948C85.9405 25.5163 85.0323 24.4096 84.496 23.1149C83.9597 21.8202 83.8194 20.3955 84.0928 19.021C84.3662 17.6466 85.0411 16.384 86.032 15.3931C87.0229 14.4022 88.2855 13.7273 89.6599 13.4539C91.0344 13.1805 92.4591 13.3208 93.7538 13.8571C95.0485 14.3934 96.1551 15.3016 96.9337 16.4668C97.7123 17.6321 98.1279 19.002 98.1279 20.4034C98.1166 22.2791 97.3665 24.0749 96.0401 25.4013C94.7138 26.7276 92.918 27.4778 91.0423 27.489ZM22.4638 0.496218C19.8335 0.335595 17.2143 0.95413 14.9338 2.27444C12.6532 3.59476 10.8126 5.55823 9.64225 7.91923C9.54689 8.09327 9.51221 8.29411 9.54369 8.49005C9.57517 8.68598 9.67101 8.86586 9.81609 9.00126C9.96117 9.13667 10.1472 9.2199 10.3449 9.23781C10.5425 9.25572 10.7405 9.20728 10.9075 9.10016C13.0147 7.8133 15.4398 7.1413 17.9088 7.16006C21.485 7.17051 24.9118 8.59581 27.4406 11.1246C29.9694 13.6534 31.3947 17.0802 31.4052 20.6564C31.4036 20.8549 31.4665 21.0485 31.5844 21.2082C31.7023 21.3679 31.8688 21.4851 32.0589 21.5421C32.249 21.5992 32.4525 21.593 32.6388 21.5246C32.8251 21.4561 32.9842 21.3291 33.0922 21.1625C34.5616 18.8164 35.296 16.0845 35.201 13.3178C35.022 9.98973 33.625 6.84383 31.2761 4.47939C28.9272 2.11494 25.7906 0.697184 22.4638 0.496218ZM40.4309 34.2372C41.8561 32.0237 42.6141 29.4468 42.6141 26.8142C42.6141 24.1815 41.8561 21.6046 40.4309 19.3911C40.3229 19.2246 40.1638 19.0976 39.9775 19.0291C39.7911 18.9607 39.5877 18.9545 39.3975 19.0116C39.2074 19.0686 39.0409 19.1858 38.923 19.3455C38.8052 19.5052 38.7423 19.6988 38.7438 19.8973C38.814 22.2991 38.2413 24.676 37.0848 26.7822C35.9284 28.8884 34.2303 30.6475 32.1661 31.8774C30.1019 33.1073 27.7466 33.7634 25.3439 33.7779C22.9411 33.7923 20.5781 33.1646 18.4992 31.9597C18.3316 31.86 18.1361 31.8175 17.9422 31.8384C17.7482 31.8593 17.5663 31.9426 17.4237 32.0756C17.2812 32.2087 17.1856 32.3845 17.1514 32.5765C17.1171 32.7685 17.1461 32.9664 17.234 33.1406C18.534 35.5797 20.5308 37.5765 22.9699 38.8765C25.9403 40.3923 29.3659 40.7571 32.5889 39.9008C35.8118 39.0444 38.6046 37.0274 40.4309 34.2372ZM2.13489 32.9719C3.32839 35.314 5.17384 37.2609 7.44878 38.578C9.72371 39.8951 12.331 40.5261 14.9564 40.3949C15.1512 40.3853 15.3376 40.3133 15.4882 40.1895C15.6389 40.0658 15.7457 39.8969 15.793 39.7078C15.8403 39.5187 15.8255 39.3194 15.7508 39.1393C15.6761 38.9592 15.5455 38.808 15.3782 38.7078C13.21 37.5239 11.4027 35.775 10.1484 33.6467C8.36077 30.5366 7.88085 26.844 8.81401 23.3802C9.74717 19.9165 12.0171 16.9648 15.1252 15.1735C15.2944 15.0747 15.4269 14.9236 15.503 14.743C15.579 14.5624 15.5944 14.362 15.5469 14.1718C15.4994 13.9817 15.3915 13.8122 15.2394 13.6886C15.0873 13.565 14.8992 13.4941 14.7034 13.4865C11.937 13.3946 9.20601 14.1287 6.85862 15.5953C4.06441 17.3971 2.03582 20.1692 1.16365 23.3775C0.291483 26.5858 0.637444 30.0034 2.13489 32.9719Z" fill="#111"/>
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
