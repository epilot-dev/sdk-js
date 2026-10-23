import { defineCommand } from 'citty';
import {
  ACCESS_PROFILES,
  type AccessProfile,
  type Approval,
  type CapabilityGrant,
  type DeviceAuthorizationApproval,
  type EpilotOrganization,
  AgentAuthError,
  isGrantUsable,
  isReadProfile,
  listEpilotOrganizations,
  mostPermissiveProfile,
  organizationGrants,
  requestOrganizationAccess,
} from '@epilot/agent-auth';
import { type LoadedAgentIdentity, formatExpiresIn, issueTokenForOrg, loadAgentIdentity } from '../lib/agent-auth.js';
import { loadCredentials } from '../lib/auth-store.js';
import { isInteractive } from '../lib/interactive.js';
import { getResolvedProfile } from '../lib/profiles.js';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW, CYAN } from '../lib/utils.js';
import { describeAccess, openBrowser, parseAccessProfile, printApproval, resolveReason } from './auth-login.js';

const commonArgs = {
  profile: { type: 'string', description: 'Named profile whose agent identity to use (or EPILOT_PROFILE env)' },
  json: { type: 'boolean', description: 'Output raw JSON' },
  interactive: { type: 'boolean', default: true, description: 'Interactive mode (--no-interactive to disable)' },
} as const;

const accessArg = {
  access: {
    type: 'string',
    description: `Access profile (${ACCESS_PROFILES.join(', ')})`,
  },
} as const;

type CommonArgs = { profile?: string; json?: boolean; interactive?: boolean };

export const AGENT_REQUIRED_MESSAGE = 'This profile has no agent identity. Run `epilot auth login --agent` first.';

const fail = (message: string, code?: string, json?: boolean): never => {
  if (json) {
    process.stdout.write(`${JSON.stringify({ error: code ?? 'error', message })}\n`);
  } else {
    process.stderr.write(`${RED}${message}${RESET}${code ? ` ${DIM}(${code})${RESET}` : ''}\n`);
  }
  process.exit(1);
};

const handleError = (error: unknown, json?: boolean): never => {
  if (error instanceof AgentAuthError) return fail(error.message, error.code, json);
  return fail(error instanceof Error ? error.message : String(error), undefined, json);
};

/** Load the agent identity for the profile or exit with the `--agent` login hint. */
export const requireAgent = (profileName?: string, json?: boolean): LoadedAgentIdentity => {
  const loaded = loadAgentIdentity(profileName);
  if (!loaded) {
    if (json) {
      process.stdout.write(`${JSON.stringify({ error: 'agent_required', message: AGENT_REQUIRED_MESSAGE })}\n`);
    } else {
      process.stderr.write(
        `${YELLOW}This profile has no agent identity.${RESET} Run ${BOLD}epilot auth login --agent${RESET} first.\n`,
      );
    }
    process.exit(1);
  }
  return loaded;
};

/** Organization the current credentials belong to (profile first, then credentials.json, then the agent record). */
export const currentOrgId = (loaded: LoadedAgentIdentity | null, profileName?: string): string | undefined =>
  getResolvedProfile(profileName)?.org_id ?? loadCredentials()?.org_id ?? loaded?.record.org_id;

const accessCell = (o: EpilotOrganization): string => {
  if (o.access?.granted) {
    const details = [
      o.access.access_profile ?? 'read',
      o.access.anonymized ? 'anonymized' : '',
      formatExpiresIn(o.access.expires_at) ?? '',
    ].filter(Boolean);
    const pending = o.access.pending ? ` ${YELLOW}+ pending request${RESET}` : '';
    return `${GREEN}granted${RESET} ${DIM}(${details.join(', ')})${RESET}${pending}`;
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

/** Most permissive usable grant profile for an organization according to /agent/status. */
const grantedProfile = async (loaded: LoadedAgentIdentity, orgId: string): Promise<AccessProfile | undefined> => {
  const status = await loaded.client.getAgentStatus(loaded.identity.hostKey, loaded.identity.agentId);
  const usable = organizationGrants(status.agent_capability_grants).filter(
    (g) => g.organizationId === orgId && isGrantUsable(g),
  );
  return mostPermissiveProfile(usable.map((g) => g.profile));
};

/** `--write` is sugar for `--access full` (deprecated); `--access` wins when both are given. */
export const resolveRequestProfile = (args: { access?: unknown; write?: boolean }): AccessProfile => {
  const explicit = parseAccessProfile(args.access);
  if (args.write) {
    process.stderr.write(
      `${DIM}--write is deprecated; use --access full (or a narrower profile such as config:write / data:write).${RESET}\n`,
    );
    return explicit ?? 'full';
  }
  return explicit ?? 'read';
};

export type RequestAccessOptions = CommonArgs & {
  orgId: string;
  /** Default `read`. */
  accessProfile?: AccessProfile;
  /** Read profiles only: request unmasked personal data (write profiles always get full PII). */
  fullPii?: boolean;
  reason?: string;
};

/**
 * Ask for access to an organization. Interactive: open the browser, wait for
 * the approval, then issue and store a token for the granted profile.
 * Non-interactive / --json: print the approval and exit 0 with status "pending".
 */
export const requestOrgAccess = async (loaded: LoadedAgentIdentity, options: RequestAccessOptions): Promise<void> => {
  const profile = options.accessProfile ?? 'read';
  const readProfile = isReadProfile(profile);
  const anonymize = readProfile ? !options.fullPii : false;
  const interactive = isInteractive({ interactive: options.interactive }) && !options.json;
  const out = (s: string) => (options.json ? process.stderr : process.stdout).write(s);

  if (options.fullPii && !readProfile) {
    out(`${DIM}--full-pii is implied by ${profile}: write access is never anonymized.${RESET}\n`);
  }
  const reason =
    (await resolveReason(profile, options.reason, interactive && !!process.stdin.isTTY)) ??
    `epilot CLI: access to organization ${options.orgId}`;

  const response = await requestOrganizationAccess(loaded.client, loaded.identity, {
    organizationId: options.orgId,
    profile,
    anonymize,
    reason,
  });

  const grants = response.agent_capability_grants ?? [];
  const pendingGrants = grants.filter((g: CapabilityGrant) => g.status === 'pending');
  const alreadyActive = grants.length > 0 && pendingGrants.length === 0 && grants.every((g) => g.status === 'active');
  let effectiveProfile: AccessProfile | undefined = profile;

  if (!alreadyActive) {
    if (!isDeviceAuthorization(response.approval)) {
      return fail('The server did not return a device authorization approval.', 'unsupported_approval', options.json);
    }

    out(`\n${BOLD}Access request for organization ${options.orgId}${RESET}\n`);
    out(`  Access: ${describeAccess({ profile, anonymized: anonymize })}`);
    out(readProfile && !anonymize ? `, ${YELLOW}full personal data${RESET}\n` : '\n');
    out(`  Reason: ${reason}\n`);
    printApproval(response.approval, out);

    if (!interactive) {
      const pending = {
        status: 'pending' as const,
        organization_id: options.orgId,
        requested: { organization_id: options.orgId, access_profile: profile, anonymize, reason },
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
      return fail(`Access to organization ${options.orgId} was denied.`, 'grant_denied', options.json);
    }
    // The approving user may have downgraded the profile: issue what was actually granted.
    const granted = organizationGrants(decided).filter((g) => isGrantUsable(g));
    effectiveProfile = mostPermissiveProfile(granted.map((g) => g.profile)) ?? profile;
    if (effectiveProfile !== profile) {
      out(`${YELLOW}Access was granted as ${effectiveProfile} instead of the requested ${profile}.${RESET}\n`);
    }
  }

  await switchToOrg(loaded, options.orgId, { profile: options.profile, json: options.json }, undefined, {
    profile: effectiveProfile,
    anonymize: isReadProfile(effectiveProfile) && anonymize ? true : undefined,
  });
};

/** Issue a token for the organization and store it as the active credentials. */
export const switchToOrg = async (
  loaded: LoadedAgentIdentity,
  orgId: string,
  options: CommonArgs,
  org?: EpilotOrganization,
  access: { profile?: AccessProfile; anonymize?: boolean } = {},
): Promise<void> => {
  const profile = access.profile ?? org?.access?.access_profile ?? (await grantedProfile(loaded, orgId));
  // Only force anonymization when every grant for the organization is anonymized (or the caller asked for it);
  // otherwise the server applies the matched grant's setting.
  const anonymize = access.anonymize ?? (org?.access?.anonymized === true ? true : undefined);
  const issued = await issueTokenForOrg(loaded, orgId, {
    ...(profile ? { profile } : {}),
    ...(anonymize !== undefined ? { anonymize } : {}),
    profileName: options.profile,
  });
  const issuedProfile = issued.access_profile ?? profile ?? 'read';
  if (options.json) {
    process.stdout.write(
      `${JSON.stringify(
        {
          status: 'active',
          organization_id: issued.organization_id ?? orgId,
          organization_name: org?.organization_name,
          user_id: issued.user_id,
          access_profile: issuedProfile,
          read_only: issued.read_only,
          anonymize: issued.anonymize,
          expires_at: issued.expires_at,
          ...(org?.access?.expires_at ? { grant_expires_at: org.access.expires_at } : {}),
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
    `  Access: ${describeAccess({ profile: issuedProfile, anonymized: issued.anonymize, expiresAt: org?.access?.expires_at })}\n`,
  );
  process.stdout.write(`  Token expires: ${issued.expires_at} ${DIM}(refreshed automatically)${RESET}\n`);
};

export default defineCommand({
  meta: {
    name: 'org',
    description: 'List, switch and request access to organizations (agent mode: `epilot auth login --agent`)',
  },
  subCommands: {
    list: defineCommand({
      meta: { name: 'list', description: 'List your organizations and the access this CLI has to them' },
      args: commonArgs,
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile, args.json);
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
          handleError(error, args.json);
        }
      },
    }),
    use: defineCommand({
      meta: {
        name: 'use',
        description: 'Switch the active organization (issues a token for its most permissive grant)',
      },
      args: {
        id: { type: 'positional', description: 'Organization ID', required: true },
        ...accessArg,
        ...commonArgs,
      },
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile, args.json);
        const orgId = String(args.id);
        try {
          const explicit = parseAccessProfile(args.access);
          const { organizations } = await listEpilotOrganizations(loaded.client, loaded.identity);
          const org = organizations.find((o) => o.organization_id === orgId);
          if (!org) {
            return fail(`Organization ${orgId} is not available to your user.`, 'organization_not_found', args.json);
          }
          if (org.access?.granted) {
            await switchToOrg(loaded, orgId, args, org, { profile: explicit });
            return;
          }
          process.stdout.write(
            `${YELLOW}This CLI has no access to organization ${orgId} yet${org.access?.pending ? ' (request pending)' : ''}.${RESET} Requesting access...\n`,
          );
          await requestOrgAccess(loaded, { ...args, orgId, accessProfile: explicit });
        } catch (error) {
          handleError(error, args.json);
        }
      },
    }),
    request: defineCommand({
      meta: { name: 'request', description: 'Request access to an organization (approved in your browser)' },
      args: {
        id: { type: 'positional', description: 'Organization ID', required: true },
        ...accessArg,
        write: { type: 'boolean', description: 'Deprecated: same as --access full' },
        reason: {
          type: 'string',
          description: 'Purpose shown to the approving user (required for profiles other than read)',
        },
        'full-pii': {
          type: 'boolean',
          description: 'Read profiles: request unmasked personal data (default: anonymized; implied by write profiles)',
        },
        ...commonArgs,
      },
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile, args.json);
        try {
          await requestOrgAccess(loaded, {
            orgId: String(args.id),
            accessProfile: resolveRequestProfile(args),
            fullPii: args['full-pii'],
            reason: args.reason,
            profile: args.profile,
            json: args.json,
            interactive: args.interactive,
          });
        } catch (error) {
          handleError(error, args.json);
        }
      },
    }),
    current: defineCommand({
      meta: { name: 'current', description: 'Show the active organization' },
      args: commonArgs,
      run: async ({ args }) => {
        const loaded = requireAgent(args.profile, args.json);
        const orgId = currentOrgId(loaded, args.profile);
        if (!orgId) {
          if (args.json) {
            process.stdout.write(`${JSON.stringify({ organization_id: null, agent_id: loaded.record.agent_id })}\n`);
            return;
          }
          process.stdout.write(`${YELLOW}No active organization.${RESET} Run ${BOLD}epilot org use <id>${RESET}.\n`);
          return;
        }
        let org: EpilotOrganization | undefined;
        try {
          const { organizations } = await listEpilotOrganizations(loaded.client, loaded.identity);
          org = organizations.find((o) => o.organization_id === orgId);
        } catch {
          // Offline or agent gone: still print what we know locally.
        }
        const accessProfile = loaded.record.access_profile ?? org?.access?.access_profile ?? 'read';
        if (args.json) {
          process.stdout.write(
            `${JSON.stringify(
              {
                organization_id: orgId,
                organization_name: org?.organization_name,
                access_profile: accessProfile,
                read_only: loaded.record.read_only ?? org?.access?.read_only,
                anonymize: loaded.record.anonymize ?? org?.access?.anonymized,
                grant_expires_at: org?.access?.expires_at,
                agent_id: loaded.record.agent_id,
              },
              null,
              2,
            )}\n`,
          );
          return;
        }
        const label = org?.organization_name ? `${org.organization_name} ${DIM}(${orgId})${RESET}` : orgId;
        process.stdout.write(`${BOLD}Active organization:${RESET} ${label}\n`);
        process.stdout.write(
          `  Access: ${describeAccess({
            profile: accessProfile,
            anonymized: loaded.record.anonymize ?? org?.access?.anonymized,
            expiresAt: org?.access?.expires_at,
          })}\n`,
        );
        if (org) process.stdout.write(`  Grants: ${accessCell(org)}\n`);
      },
    }),
  },
});
