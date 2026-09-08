import { defineCommand } from 'citty';
import {
  type Approval,
  type CapabilityGrant,
  type DeviceAuthorizationApproval,
  type EpilotOrganization,
  AgentAuthError,
  listEpilotOrganizations,
  organizationAccessCapability,
} from '@epilot/agent-auth';
import { type LoadedAgentIdentity, issueTokenForOrg, loadAgentIdentity } from '../lib/agent-auth.js';
import { loadCredentials } from '../lib/auth-store.js';
import { isInteractive } from '../lib/interactive.js';
import { getResolvedProfile } from '../lib/profiles.js';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW, CYAN } from '../lib/utils.js';
import { openBrowser, printApproval } from './auth-login.js';

const commonArgs = {
  profile: { type: 'string', description: 'Profile whose agent identity to use (or EPILOT_PROFILE env)' },
  json: { type: 'boolean', description: 'Output raw JSON' },
  interactive: { type: 'boolean', default: true, description: 'Interactive mode (--no-interactive to disable)' },
} as const;

type CommonArgs = { profile?: string; json?: boolean; interactive?: boolean };

const fail = (message: string, code?: string): never => {
  process.stderr.write(`${RED}${message}${RESET}${code ? ` ${DIM}(${code})${RESET}` : ''}\n`);
  process.exit(1);
};

const handleError = (error: unknown): never => {
  if (error instanceof AgentAuthError) return fail(error.message, error.code);
  return fail(error instanceof Error ? error.message : String(error));
};

/** Load the agent identity for the profile or exit with a login hint. */
export const requireAgent = (profileName?: string): LoadedAgentIdentity => {
  const loaded = loadAgentIdentity(profileName);
  if (!loaded) {
    process.stderr.write(`${YELLOW}No agent identity found for this profile.${RESET}\n`);
    process.stderr.write(`Run ${BOLD}epilot auth login${RESET} first.\n`);
    process.exit(1);
  }
  return loaded;
};

/** Organization the current credentials belong to (profile first, then credentials.json, then the agent record). */
export const currentOrgId = (loaded: LoadedAgentIdentity | null, profileName?: string): string | undefined =>
  getResolvedProfile(profileName)?.org_id ?? loadCredentials()?.org_id ?? loaded?.record.org_id;

const accessCell = (o: EpilotOrganization): string => {
  if (o.access?.granted) {
    const level = [o.access.read_only ? 'read-only' : 'read-write', o.access.anonymized ? 'anonymized' : ''].filter(
      Boolean,
    );
    return `${GREEN}granted${RESET} ${DIM}(${level.join(', ')})${RESET}`;
  }
  if (o.access?.pending) return `${YELLOW}pending${RESET}`;
  return `${DIM}no access${RESET}`;
};

export const formatOrgTable = (organizations: EpilotOrganization[], activeId?: string): string => {
  const idWidth = Math.max(2, ...organizations.map((o) => o.organization_id.length));
  const nameWidth = Math.max(4, ...organizations.map((o) => (o.organization_name ?? '').length));
  const typeWidth = Math.max(4, ...organizations.map((o) => (o.organization_type ?? '').length));
  const lines = [
    `  ${BOLD}${'ID'.padEnd(idWidth)}  ${'NAME'.padEnd(nameWidth)}  ${'TYPE'.padEnd(typeWidth)}  ACCESS${RESET}`,
  ];
  for (const o of organizations) {
    const marker = o.organization_id === activeId ? `${CYAN}*${RESET}` : ' ';
    lines.push(
      `${marker} ${o.organization_id.padEnd(idWidth)}  ${(o.organization_name ?? '').padEnd(nameWidth)}  ${(
        o.organization_type ?? ''
      ).padEnd(typeWidth)}  ${accessCell(o)}`,
    );
  }
  if (activeId) lines.push(`\n${DIM}* active organization${RESET}`);
  return `${lines.join('\n')}\n`;
};

const isDeviceAuthorization = (approval: Approval | undefined): approval is DeviceAuthorizationApproval =>
  !!approval && approval.method === 'device_authorization';

export type RequestAccessOptions = CommonArgs & {
  orgId: string;
  write?: boolean;
  fullPii?: boolean;
  reason?: string;
};

/**
 * Ask for access to an organization. Interactive: open the browser, wait for
 * the approval, then issue and store a token. Non-interactive / --json: print
 * the approval and exit 0 with status "pending".
 */
export const requestOrgAccess = async (loaded: LoadedAgentIdentity, options: RequestAccessOptions): Promise<void> => {
  const readOnly = !options.write;
  const anonymize = !options.fullPii;
  const interactive = isInteractive({ interactive: options.interactive }) && !options.json;
  const out = (s: string) => (options.json ? process.stderr : process.stdout).write(s);

  const response = await loaded.client.requestCapability(loaded.identity, {
    capabilities: [organizationAccessCapability({ organizationId: options.orgId, readOnly, anonymize })],
    reason: options.reason ?? `epilot CLI: access to organization ${options.orgId}`,
  });

  const grants = response.agent_capability_grants ?? [];
  const pendingGrants = grants.filter((g: CapabilityGrant) => g.status === 'pending');
  const alreadyActive = grants.length > 0 && pendingGrants.length === 0 && grants.every((g) => g.status === 'active');

  if (!alreadyActive) {
    if (!isDeviceAuthorization(response.approval)) {
      return fail('The server did not return a device authorization approval.', 'unsupported_approval');
    }

    out(`\n${BOLD}Access request for organization ${options.orgId}${RESET}\n`);
    out(
      `  Access: ${readOnly ? 'read-only' : `${YELLOW}read-write${RESET}`}${anonymize ? ', anonymized' : `, ${YELLOW}full personal data${RESET}`}\n`,
    );
    printApproval(response.approval, out);

    if (!interactive) {
      const pending = {
        status: 'pending' as const,
        organization_id: options.orgId,
        approval: response.approval,
        grants,
        next: `epilot org use ${options.orgId}`,
      };
      if (options.json) {
        process.stdout.write(`${JSON.stringify(pending, null, 2)}\n`);
      } else {
        out(
          `${DIM}Approve the request in your browser, then run ${RESET}epilot org use ${options.orgId}${DIM}.${RESET}\n`,
        );
      }
      return;
    }

    await openBrowser(response.approval.verification_uri_complete, out);
    const status = await loaded.client.waitForApproval(
      loaded.identity.hostKey,
      loaded.identity.agentId,
      response.approval,
      {
        pendingGrantIds: pendingGrants.map((g) => g.id).filter((id): id is string => !!id),
        onPoll: () => out('.'),
      },
    );
    out('\n');

    const decided = status.agent_capability_grants.filter((g) => pendingGrants.some((p) => p.id && p.id === g.id));
    if (decided.length > 0 && decided.every((g) => g.status === 'denied')) {
      return fail(`Access to organization ${options.orgId} was denied.`, 'grant_denied');
    }
  }

  await switchToOrg(loaded, options.orgId, { profile: options.profile, json: options.json });
};

/** Issue a token for the organization and store it as the active credentials. */
export const switchToOrg = async (
  loaded: LoadedAgentIdentity,
  orgId: string,
  options: CommonArgs,
  org?: EpilotOrganization,
): Promise<void> => {
  const issued = await issueTokenForOrg(loaded, orgId, {
    ...(org?.access?.read_only !== undefined ? { readOnly: org.access.read_only } : {}),
    ...(org?.access?.anonymized !== undefined ? { anonymize: org.access.anonymized } : {}),
    profileName: options.profile,
  });
  if (options.json) {
    process.stdout.write(
      `${JSON.stringify(
        {
          status: 'active',
          organization_id: issued.organization_id ?? orgId,
          organization_name: org?.organization_name,
          user_id: issued.user_id,
          read_only: issued.read_only,
          anonymize: issued.anonymize,
          expires_at: issued.expires_at,
        },
        null,
        2,
      )}\n`,
    );
    return;
  }
  const label = org?.organization_name ? `${org.organization_name} ${DIM}(${orgId})${RESET}` : orgId;
  process.stdout.write(`${GREEN}${BOLD}Switched to organization ${RESET}${label}\n`);
  process.stdout.write(
    `  Access: ${issued.read_only ? `${YELLOW}read-only${RESET}` : `${GREEN}read-write${RESET}`}${issued.anonymize ? `, ${YELLOW}anonymized${RESET}` : ''}\n`,
  );
  process.stdout.write(`  Token expires: ${issued.expires_at} ${DIM}(refreshed automatically)${RESET}\n`);
};

export default defineCommand({
  meta: { name: 'org', description: 'List, switch and request access to organizations (Agent Auth)' },
  subCommands: {
    list: defineCommand({
      meta: { name: 'list', description: 'List your organizations and the access this CLI has to them' },
      args: commonArgs,
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile);
        try {
          const { organizations } = await listEpilotOrganizations(loaded.client, loaded.identity);
          const active = currentOrgId(loaded, args.profile);
          if (args.json) {
            process.stdout.write(
              `${JSON.stringify(
                organizations.map((o) => ({ ...o, active: o.organization_id === active })),
                null,
                2,
              )}\n`,
            );
            return;
          }
          if (organizations.length === 0) {
            process.stdout.write('No organizations found for your user.\n');
            return;
          }
          process.stdout.write(formatOrgTable(organizations, active));
        } catch (error) {
          handleError(error);
        }
      },
    }),
    use: defineCommand({
      meta: { name: 'use', description: 'Switch the active organization (issues a token for it)' },
      args: {
        id: { type: 'positional', description: 'Organization ID', required: true },
        ...commonArgs,
      },
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile);
        const orgId = String(args.id);
        try {
          const { organizations } = await listEpilotOrganizations(loaded.client, loaded.identity);
          const org = organizations.find((o) => o.organization_id === orgId);
          if (!org) return fail(`Organization ${orgId} is not available to your user.`, 'organization_not_found');
          if (org.access?.granted) {
            await switchToOrg(loaded, orgId, args, org);
            return;
          }
          process.stdout.write(
            `${YELLOW}This CLI has no access to organization ${orgId} yet${org.access?.pending ? ' (request pending)' : ''}.${RESET} Requesting access...\n`,
          );
          await requestOrgAccess(loaded, { ...args, orgId });
        } catch (error) {
          handleError(error);
        }
      },
    }),
    request: defineCommand({
      meta: { name: 'request', description: 'Request access to an organization (approved in your browser)' },
      args: {
        id: { type: 'positional', description: 'Organization ID', required: true },
        write: { type: 'boolean', description: 'Request read-write access (default: read-only)' },
        'full-pii': { type: 'boolean', description: 'Request access to personal data (default: anonymized)' },
        reason: { type: 'string', description: 'Reason shown to the approving user' },
        ...commonArgs,
      },
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile);
        try {
          await requestOrgAccess(loaded, {
            orgId: String(args.id),
            write: args.write,
            fullPii: args['full-pii'],
            reason: args.reason,
            profile: args.profile,
            json: args.json,
            interactive: args.interactive,
          });
        } catch (error) {
          handleError(error);
        }
      },
    }),
    current: defineCommand({
      meta: { name: 'current', description: 'Show the active organization' },
      args: commonArgs,
      run: async ({ args }) => {
        const loaded = loadAgentIdentity(args.profile);
        const orgId = currentOrgId(loaded, args.profile);
        if (!orgId) {
          process.stdout.write(`${YELLOW}No active organization.${RESET} Run ${BOLD}epilot auth login${RESET}.\n`);
          return;
        }
        let org: EpilotOrganization | undefined;
        if (loaded) {
          try {
            const { organizations } = await listEpilotOrganizations(loaded.client, loaded.identity);
            org = organizations.find((o) => o.organization_id === orgId);
          } catch {
            // Offline or agent gone: still print what we know locally.
          }
        }
        if (args.json) {
          process.stdout.write(
            `${JSON.stringify(
              {
                organization_id: orgId,
                organization_name: org?.organization_name,
                read_only: org?.access?.read_only ?? loaded?.record.read_only,
                anonymize: org?.access?.anonymized ?? loaded?.record.anonymize,
                agent_id: loaded?.record.agent_id,
              },
              null,
              2,
            )}\n`,
          );
          return;
        }
        const label = org?.organization_name ? `${org.organization_name} ${DIM}(${orgId})${RESET}` : orgId;
        process.stdout.write(`${BOLD}Active organization:${RESET} ${label}\n`);
        if (org) process.stdout.write(`  Access: ${accessCell(org)}\n`);
        else if (loaded?.record.read_only !== undefined) {
          process.stdout.write(
            `  Access: ${loaded.record.read_only ? 'read-only' : 'read-write'}${loaded.record.anonymize ? ', anonymized' : ''}\n`,
          );
        }
      },
    }),
  },
});
