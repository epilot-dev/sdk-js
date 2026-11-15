import { defineCommand } from 'citty';
import { ACCESS_PROFILE_INFO, AgentAuthError, isAccessProfile, organizationGrants } from '@epilot/agent-auth';
import { deleteAgentRecord, formatExpiresIn, loadAgentIdentity } from '../lib/agent-auth.js';
import {
  type Credentials,
  type ResolvedToken,
  decodeJwtPayload,
  isTokenExpired,
  removeCredentials,
  resolveTokenSource,
} from '../lib/auth-store.js';
import { getResolvedProfile, resolveProfileName, upsertProfile } from '../lib/profiles.js';
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
      args: {
        profile: { type: 'string', description: 'Profile to log out (or EPILOT_PROFILE env)' },
      },
      run: async ({ args }) => {
        const profileName = args.profile || process.env.EPILOT_PROFILE;

        // Agent mode only: revoke the Agent Auth agent (best effort), forget it locally and clear the token it
        // issued into the profile. The host key stays. Without an agent, logout behaves exactly as before.
        const loaded = loadAgentIdentity(profileName);
        if (loaded) {
          try {
            await loaded.client.revokeAgent(loaded.identity.hostKey, loaded.identity.agentId);
            process.stdout.write(`${DIM}Agent ${loaded.record.agent_id} revoked.${RESET}\n`);
          } catch (error) {
            const reason = error instanceof AgentAuthError ? error.code : 'error';
            process.stdout.write(
              `${DIM}Could not revoke agent ${loaded.record.agent_id} (${reason}); removing it locally.${RESET}\n`,
            );
          }
          deleteAgentRecord(profileName);
          const resolvedName = resolveProfileName(profileName);
          if (resolvedName && getResolvedProfile(profileName)?.token) {
            upsertProfile(resolvedName, {
              token: undefined,
              org_id: undefined,
              user_id: undefined,
              expires_at: undefined,
              access_profile: undefined,
            });
          }
        }

        // A named profile is self-contained: clear its token and keep the default login in credentials.json.
        const removed = profileName ? clearProfileToken(profileName) : removeCredentials();
        if (removed || loaded) {
          process.stdout.write(`${GREEN}Logged out successfully.${RESET}\n`);
        } else {
          process.stdout.write(`No stored credentials found.\n`);
        }
      },
    }),
    status: defineCommand({
      meta: { name: 'status', description: 'Show authentication status' },
      args: {
        profile: { type: 'string', description: 'Profile to inspect (or EPILOT_PROFILE env)' },
        token: { type: 'string', alias: 't', description: 'Inspect this token instead of the stored one' },
      },
      run: async ({ args }) => {
        const profileName = args.profile || process.env.EPILOT_PROFILE;
        const resolved = resolveTokenSource(args.token, profileName);

        // --token / EPILOT_TOKEN win over anything stored, agent or not.
        if (resolved && (resolved.source === 'flag' || resolved.source === 'env')) {
          printTokenStatus(resolved);
          return;
        }

        const loaded = loadAgentIdentity(profileName);

        // Without an agent: exactly the status output of a plain login.
        if (!loaded) {
          if (!resolved) {
            process.stdout.write(`${YELLOW}Not authenticated.${RESET}\n`);
            process.stdout.write(`Run ${BOLD}epilot auth login${RESET} to authenticate.\n`);
            return;
          }
          printTokenStatus(resolved);
          return;
        }

        const valid = resolved && !isTokenExpired(resolved.creds.expires_at) ? resolved : null;
        const creds = valid?.creds;
        if (valid) {
          printTokenStatus(valid);
        } else {
          process.stdout.write(`${YELLOW}No valid token stored${RESET} ${DIM}(issued on next API call)${RESET}\n`);
        }
        process.stdout.write(`\n${BOLD}Agent Auth${RESET}\n`);
        process.stdout.write(`  Agent:   ${loaded.record.agent_id} ${DIM}(${loaded.record.name})${RESET}\n`);
        process.stdout.write(`  Host:    ${loaded.record.host_id}\n`);
        process.stdout.write(`  Issuer:  ${loaded.record.issuer}\n`);
        try {
          const status = await loaded.client.getAgentStatus(loaded.identity.hostKey, loaded.identity.agentId);
          const color = status.status === 'active' ? GREEN : status.status === 'pending' ? YELLOW : RED;
          process.stdout.write(`  Status:  ${color}${status.status}${RESET}`);
          if (status.expires_at) process.stdout.write(` ${DIM}(expires ${status.expires_at})${RESET}`);
          process.stdout.write('\n');
          const grants = organizationGrants(status.agent_capability_grants);
          if (grants.length) {
            process.stdout.write(`  Grants:\n`);
            for (const g of grants) {
              const expiry = formatExpiresIn(g.expiresAt);
              const expired = expiry === 'expired';
              const level = [g.profile, g.anonymized ? 'anonymized' : '', expiry ?? ''].filter(Boolean);
              const statusColor =
                g.grant.status === 'active' && !expired ? GREEN : g.grant.status === 'pending' ? YELLOW : RED;
              const active =
                g.organizationId &&
                g.organizationId === creds?.org_id &&
                g.profile === (creds?.access_profile ?? 'read')
                  ? ` ${DIM}(active)${RESET}`
                  : '';
              const reason = g.reason ? ` ${DIM}— "${g.reason}"${RESET}` : '';
              process.stdout.write(
                `    ${(g.organizationId ?? 'login organization').padEnd(12)} ${statusColor}${expired ? 'expired' : g.grant.status}${RESET} ${DIM}${level.join(', ')}${RESET}${active}${reason}\n`,
              );
            }
          }
        } catch (error) {
          const reason = error instanceof AgentAuthError ? `${error.message} (${error.code})` : String(error);
          process.stdout.write(`  Status:  ${RED}unavailable${RESET} ${DIM}${reason}${RESET}\n`);
        }
      },
    }),
  },
});

const clearProfileToken = (profileName: string): boolean => {
  if (!getResolvedProfile(profileName)?.token) return false;
  upsertProfile(profileName, {
    token: undefined,
    org_id: undefined,
    user_id: undefined,
    expires_at: undefined,
    access_profile: undefined,
  });
  return true;
};

const describeTokenSource = ({ source, profileName }: ResolvedToken): string =>
  source === 'flag'
    ? '--token flag'
    : source === 'env'
      ? 'EPILOT_TOKEN env var'
      : source === 'profile'
        ? `profile "${profileName}"`
        : 'credentials.json (default login)';

/** "2h 5m" below a day, "3 days" above, "expired" in the past. */
const formatRemaining = (diffMs: number): string =>
  diffMs < 0
    ? `${RED}expired${RESET}`
    : diffMs < 86400000
      ? `${Math.floor(diffMs / 3600000)}h ${Math.floor((diffMs % 3600000) / 60000)}m`
      : `${Math.floor(diffMs / 86400000)} days`;

/** Prints the decoded, non-secret claims of the effective token and where it comes from — never the token. */
const printTokenStatus = (resolved: ResolvedToken): void => {
  const creds: Credentials = resolved.creds;
  const claims = decodeJwtPayload(creds.token);
  const isApiToken = claims?.token_type === 'api';
  const isCognitoToken = typeof claims?.iss === 'string' && claims.iss.includes('cognito-idp');
  const tokenType = isApiToken ? 'API Token' : isCognitoToken ? 'User Token' : 'Token';

  // Stored expiry, else the token's exp claim
  const expiresAt =
    creds.expires_at ?? (typeof claims?.exp === 'number' ? new Date(claims.exp * 1000).toISOString() : undefined);
  const expired = isTokenExpired(expiresAt);

  process.stdout.write(
    expired
      ? `${RED}${BOLD}Token expired${RESET} ${DIM}(${tokenType})${RESET} — request a new one\n`
      : `${GREEN}${BOLD}Authenticated${RESET} ${DIM}(${tokenType})${RESET}\n`,
  );

  // Resolve fields from JWT claims (API token vs Cognito token vs stored creds)
  const name = (claims?.token_name || claims?.email || claims?.['cognito:username'] || creds.name) as
    | string
    | undefined;
  const orgId = (claims?.org_id || claims?.['custom:ivy_org_id'] || creds.org_id) as string | undefined;
  const userId = (claims?.user_id || claims?.['custom:ivy_user_id'] || creds.user_id) as string | undefined;
  const tokenId = claims?.token_id as string | undefined;
  const adminEmail = claims?.admin_email as string | undefined;
  const tokenUse = claims?.token_use as string | undefined;
  const roles = claims?.assume_roles as string[] | undefined;
  const readOnly = claims?.read_only === true;
  const anonymize = claims?.anonymize === true;
  const allowedActions = Array.isArray(claims?.allowed_actions) ? (claims.allowed_actions as string[]) : undefined;
  const actor = claims?.actor as { type?: string; client?: string; approval_id?: string } | undefined;

  if (name) process.stdout.write(`  Name:    ${name}\n`);
  if (adminEmail && adminEmail !== name) process.stdout.write(`  Email:   ${adminEmail}\n`);
  if (orgId) process.stdout.write(`  Org:     ${orgId}\n`);
  if (userId) process.stdout.write(`  User:    ${userId}\n`);
  if (tokenId && tokenId !== userId) process.stdout.write(`  Token ID: ${tokenId}\n`);
  if (tokenUse) process.stdout.write(`  Use:     ${tokenUse}\n`);
  if (roles?.length) process.stdout.write(`  Roles:   ${roles.join(', ')}\n`);
  process.stdout.write(`  Access:  ${readOnly ? `${YELLOW}read-only${RESET}` : `${GREEN}read-write${RESET}`}\n`);
  if (isAccessProfile(creds.access_profile)) {
    process.stdout.write(
      `  Profile: ${creds.access_profile} ${DIM}(${ACCESS_PROFILE_INFO[creds.access_profile].title})${RESET}\n`,
    );
  }
  if (anonymize) process.stdout.write(`  Data:    ${YELLOW}anonymized${RESET}\n`);
  if (allowedActions?.length) {
    const more = allowedActions.length > 5 ? ` ${DIM}(+${allowedActions.length - 5} more)${RESET}` : '';
    process.stdout.write(`  Actions: ${allowedActions.slice(0, 5).join(', ')}${more}\n`);
  }
  if (actor && typeof actor === 'object') {
    const via = [actor.type, actor.client ? `via ${actor.client}` : ''].filter(Boolean).join(' ');
    const approval = actor.approval_id ? ` ${DIM}(approval ${actor.approval_id})${RESET}` : '';
    process.stdout.write(`  Actor:   ${via || 'unknown'}${approval}\n`);
  }

  if (expiresAt) {
    const diffMs = new Date(expiresAt).getTime() - Date.now();
    process.stdout.write(`  Expires: ${expiresAt} ${DIM}(${formatRemaining(diffMs)}${DIM})${RESET}\n`);
  } else if (claims?.iat) {
    const issued = new Date((claims.iat as number) * 1000);
    process.stdout.write(`  Issued:  ${issued.toISOString()} ${DIM}(no expiry)${RESET}\n`);
  }

  // Never print the token itself, only where it comes from.
  process.stdout.write(`  Source:  ${describeTokenSource(resolved)}\n`);
};
