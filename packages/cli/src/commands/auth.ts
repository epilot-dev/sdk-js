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
    token: () => import('./auth-token.js').then((m) => m.default),
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

        const claims = parseJwtPayload(creds.token);
        const isApiToken = claims?.token_type === 'api';
        const isCognitoToken = typeof claims?.iss === 'string' && claims.iss.includes('cognito-idp');
        const tokenType = isApiToken ? 'API Token' : isCognitoToken ? 'User Token' : 'Token';

        process.stdout.write(`${GREEN}${BOLD}Authenticated${RESET} ${DIM}(${tokenType})${RESET}\n`);

        // Resolve fields from JWT claims (API token vs Cognito token vs stored creds)
        const name = (claims?.token_name || claims?.email || claims?.['cognito:username'] || creds.name) as string | undefined;
        const orgId = (claims?.org_id || claims?.['custom:ivy_org_id'] || creds.org_id) as string | undefined;
        const userId = (claims?.user_id || claims?.['custom:ivy_user_id'] || creds.user_id) as string | undefined;
        const tokenId = claims?.token_id as string | undefined;
        const adminEmail = claims?.admin_email as string | undefined;
        const tokenUse = claims?.token_use as string | undefined;
        const roles = claims?.assume_roles as string[] | undefined;

        if (name) process.stdout.write(`  Name:    ${name}\n`);
        if (adminEmail && adminEmail !== name) process.stdout.write(`  Email:   ${adminEmail}\n`);
        if (orgId) process.stdout.write(`  Org:     ${orgId}\n`);
        if (userId) process.stdout.write(`  User:    ${userId}\n`);
        if (tokenId && tokenId !== userId) process.stdout.write(`  Token ID: ${tokenId}\n`);
        if (tokenUse) process.stdout.write(`  Use:     ${tokenUse}\n`);
        if (roles?.length) process.stdout.write(`  Roles:   ${roles.join(', ')}\n`);

        // Expiry
        if (creds.expires_at) {
          const expiry = new Date(creds.expires_at);
          const now = new Date();
          const days = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          process.stdout.write(`  Expires: ${creds.expires_at} ${DIM}(${days} days)${RESET}\n`);
        } else if (claims?.exp) {
          const expiry = new Date((claims.exp as number) * 1000);
          const now = new Date();
          const diffMs = expiry.getTime() - now.getTime();
          const label = diffMs < 0
            ? `${RED}expired${RESET}`
            : diffMs < 86400000
              ? `${Math.floor(diffMs / 3600000)}h ${Math.floor((diffMs % 3600000) / 60000)}m`
              : `${Math.floor(diffMs / 86400000)} days`;
          process.stdout.write(`  Expires: ${expiry.toISOString()} ${DIM}(${label})${RESET}\n`);
        } else if (claims?.iat && !claims?.exp) {
          const issued = new Date((claims.iat as number) * 1000);
          process.stdout.write(`  Issued:  ${issued.toISOString()} ${DIM}(no expiry)${RESET}\n`);
        }

        process.stdout.write(`  Token:   ${creds.token.substring(0, 20)}...${RESET}\n`);
      },
    }),
  },
});

/**
 * Decode a JWT payload without verifying the signature.
 * Returns null if the token is not a valid JWT.
 */
const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
};
