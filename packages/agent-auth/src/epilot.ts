/**
 * epilot-specific helpers on top of the generic Agent Auth Protocol client:
 * the two epilot capabilities, access profiles and the organization grant model.
 */
import type { AgentAuthClient } from './client.js';
import {
  type AgentIdentity,
  AgentAuthError,
  type CapabilityGrant,
  type CapabilityRequest,
  type RequestCapabilityResponse,
} from './types.js';

export const EPILOT_CAPABILITIES = {
  /** The linked user's organizations annotated with this agent's grants. Host default capability. */
  organizationsList: 'epilot.organizations.list',
  /** Mint a short-lived epilot access token for an organization the agent has a grant for. */
  accessTokenIssue: 'epilot.access_token.issue',
} as const;

// ─── Access profiles ─────────────────────────────────────────────────────────

/**
 * Access profiles of an `epilot.access_token.issue` grant (constraint `access_profile`).
 * `read` is the default when the constraint is absent.
 */
export const ACCESS_PROFILES = ['read', 'config:read', 'config:write', 'data:read', 'data:write', 'full'] as const;

export type AccessProfile = (typeof ACCESS_PROFILES)[number];

export interface AccessProfileInfo {
  /** User-facing title. */
  title: string;
  /** Fallback description (the server sends its own on the approval page). */
  description: string;
  /** Whether tokens issued under this profile are read-only. */
  readOnly: boolean;
  /** Anonymize is a read-only property: write profiles never issue anonymized tokens. */
  anonymizeAllowed: boolean;
  /** Lifetime of an escalation grant in seconds; `undefined` means the grant lives as long as the agent. */
  escalationTtlSeconds?: number;
}

const DAY = 86_400;

export const ACCESS_PROFILE_INFO: Readonly<Record<AccessProfile, AccessProfileInfo>> = {
  read: {
    title: 'Read everything you can see',
    description: 'Look at data and configuration you have access to. Nothing can be created or changed.',
    readOnly: true,
    anonymizeAllowed: true,
  },
  'config:read': {
    title: 'Read configuration',
    description:
      'Look at journeys, automations, workflows, schemas, portals, designs and other configuration. No business data, nothing changed.',
    readOnly: true,
    anonymizeAllowed: true,
    escalationTtlSeconds: 7 * DAY,
  },
  'config:write': {
    title: 'Change configuration',
    description:
      'Create and change journeys, automations, workflows, schemas, portals, designs and other configuration. No business data.',
    readOnly: false,
    anonymizeAllowed: false,
    escalationTtlSeconds: DAY,
  },
  'data:read': {
    title: 'Read business data',
    description:
      'Look at contacts, opportunities, orders, files, messages and other business data. No configuration changes.',
    readOnly: true,
    anonymizeAllowed: true,
    escalationTtlSeconds: 7 * DAY,
  },
  'data:write': {
    title: 'Change business data',
    description:
      'Create and change contacts, opportunities, orders, files, messages and other business data. No configuration changes.',
    readOnly: false,
    anonymizeAllowed: false,
    escalationTtlSeconds: DAY,
  },
  full: {
    title: 'Everything you can do',
    description: 'Everything your own account can do, including changing data and configuration.',
    readOnly: false,
    anonymizeAllowed: false,
    escalationTtlSeconds: DAY,
  },
};

/** Type guard for access profile strings. */
export const isAccessProfile = (value: unknown): value is AccessProfile =>
  typeof value === 'string' && (ACCESS_PROFILES as readonly string[]).includes(value);

/** `true` for `read`, `config:read` and `data:read`. */
export const isReadProfile = (profile: AccessProfile): boolean => ACCESS_PROFILE_INFO[profile].readOnly;

/** Least permissive first: read < config:read < data:read < config:write < data:write < full. */
const PROFILE_RANK: Readonly<Record<AccessProfile, number>> = {
  read: 0,
  'config:read': 1,
  'data:read': 2,
  'config:write': 3,
  'data:write': 4,
  full: 5,
};

/** The most permissive of the given profiles (ties resolved by the fixed rank above), or undefined for none. */
export const mostPermissiveProfile = (profiles: readonly AccessProfile[]): AccessProfile | undefined =>
  profiles.length ? [...profiles].sort((a, b) => PROFILE_RANK[b] - PROFILE_RANK[a])[0] : undefined;

/** Purpose (`reason`) limits enforced by the server for non-read profiles. */
export const REASON_MIN_LENGTH = 10;
export const REASON_MAX_LENGTH = 200;

// ─── Wire types ──────────────────────────────────────────────────────────────

export interface EpilotOrganizationAccess {
  granted: boolean;
  pending: boolean;
  read_only: boolean;
  /** `true` only when every active grant for the organization is anonymized. */
  anonymized: boolean;
  /** Most permissive active profile for the organization (absent on older servers → `read`). */
  access_profile?: AccessProfile;
  /** Expiry of that grant, when it is an escalation grant. */
  expires_at?: string;
}

export interface EpilotOrganization {
  organization_id: string;
  organization_name?: string;
  organization_type?: string;
  organization_use?: string;
  access: EpilotOrganizationAccess;
}

export interface EpilotIssueAccessTokenArguments {
  organization_id: string;
  /** Profile to issue under; defaults to the matched grant's profile. Must be covered by a grant. */
  access_profile?: AccessProfile;
  read_only?: boolean;
  anonymize?: boolean;
  /** Seconds; server default 3600, server maximum 43200. */
  expires_in?: number;
}

export interface EpilotIssuedAccessToken {
  token: string;
  token_id: string;
  organization_id: string;
  user_id: string;
  read_only: boolean;
  anonymize: boolean;
  access_profile?: AccessProfile;
  expires_at: string;
  /** Email of the approving user, when the server returns it (used for token naming). */
  email?: string;
}

// ─── Capability requests ─────────────────────────────────────────────────────

export interface OrganizationAccessOptions {
  /** Omit to let the approval page grant the user's login organization. */
  organizationId?: string;
  /** Access profile; the server defaults to `read` when absent. */
  profile?: AccessProfile;
  readOnly?: boolean;
  /** Only valid with read profiles (`read`, `config:read`, `data:read`). */
  anonymize?: boolean;
}

/**
 * Build the constraints for an `epilot.access_token.issue` grant request.
 *
 * Throws `invalid_capabilities` when `anonymize: true` is combined with a write
 * profile: anonymized data must never be written back.
 */
export const organizationAccessCapability = (options: OrganizationAccessOptions = {}): CapabilityRequest => {
  if (options.anonymize === true && options.profile && !ACCESS_PROFILE_INFO[options.profile].anonymizeAllowed) {
    throw new AgentAuthError(400, 'invalid_capabilities', 'anonymize is only available with read profiles', {
      access_profile: options.profile,
    });
  }
  const constraints = {
    ...(options.organizationId !== undefined ? { organization_id: options.organizationId } : {}),
    ...(options.profile !== undefined ? { access_profile: options.profile } : {}),
    ...(options.readOnly !== undefined ? { read_only: options.readOnly } : {}),
    ...(options.anonymize !== undefined ? { anonymize: options.anonymize } : {}),
  };
  return Object.keys(constraints).length
    ? { name: EPILOT_CAPABILITIES.accessTokenIssue, constraints }
    : { name: EPILOT_CAPABILITIES.accessTokenIssue };
};

/** Execute `epilot.organizations.list`. */
export const listEpilotOrganizations = (client: AgentAuthClient, identity: AgentIdentity) =>
  client.execute<{ organizations: EpilotOrganization[] }>(identity, {
    capability: EPILOT_CAPABILITIES.organizationsList,
  });

/** Execute `epilot.access_token.issue`. */
export const issueEpilotAccessToken = (
  client: AgentAuthClient,
  identity: AgentIdentity,
  args: EpilotIssueAccessTokenArguments,
) =>
  client.execute<EpilotIssuedAccessToken>(identity, {
    capability: EPILOT_CAPABILITIES.accessTokenIssue,
    arguments: { ...args },
  });

export interface RequestOrganizationAccessOptions {
  organizationId: string;
  /** Default `read`. */
  profile?: AccessProfile;
  /** Default: `true` for read profiles, `false` for write profiles. */
  anonymize?: boolean;
  /** Purpose shown to the approving user. Required (10–200 chars) for every profile other than `read`. */
  reason?: string;
  /** Passed through to the request (epilot extension: browser redirect after the approval). */
  approvalReturnUri?: string;
}

/**
 * Validate a purpose the way the server does: required (10–200 characters,
 * trimmed) for profiles other than `read`, optional otherwise.
 * Returns the trimmed reason or undefined.
 */
export const validateReason = (profile: AccessProfile, reason: string | undefined): string | undefined => {
  const trimmed = reason?.trim() || undefined;
  if (profile !== 'read' && (!trimmed || trimmed.length < REASON_MIN_LENGTH)) {
    throw new AgentAuthError(
      400,
      'reason_required',
      `A reason of at least ${REASON_MIN_LENGTH} characters is required when requesting the ${profile} profile.`,
      { access_profile: profile },
    );
  }
  if (trimmed && trimmed.length > REASON_MAX_LENGTH) {
    throw new AgentAuthError(400, 'invalid_request', `The reason must not exceed ${REASON_MAX_LENGTH} characters.`);
  }
  return trimmed;
};

/**
 * Request access to an organization with a profile and purpose. Enforces the
 * anonymize rule and the reason requirement client-side, so a bad request never
 * leaves the process.
 */
export const requestOrganizationAccess = async (
  client: AgentAuthClient,
  identity: AgentIdentity,
  options: RequestOrganizationAccessOptions,
): Promise<RequestCapabilityResponse> => {
  const profile = options.profile ?? 'read';
  const anonymize = options.anonymize ?? ACCESS_PROFILE_INFO[profile].anonymizeAllowed;
  const reason = validateReason(profile, options.reason);
  const capability = organizationAccessCapability({ organizationId: options.organizationId, profile, anonymize });
  return client.requestCapability(identity, {
    capabilities: [capability],
    ...(reason ? { reason } : {}),
    ...(options.approvalReturnUri ? { approval_return_uri: options.approvalReturnUri } : {}),
  });
};

// ─── Grants ──────────────────────────────────────────────────────────────────

export interface OrganizationGrant {
  grant: CapabilityGrant;
  organizationId?: string;
  /** `read` when the grant carries no `access_profile` constraint. */
  profile: AccessProfile;
  readOnly: boolean;
  anonymized: boolean;
  /** Escalation grant expiry; undefined for lifetime grants. */
  expiresAt?: string;
  /** Purpose stated when the grant was requested. */
  reason?: string;
}

/** Grants of `epilot.access_token.issue` mapped to their organization, profile and access level. */
export const organizationGrants = (grants: CapabilityGrant[]): OrganizationGrant[] =>
  grants
    .filter((grant) => grant.capability === EPILOT_CAPABILITIES.accessTokenIssue)
    .map((grant) => {
      const organizationId = grant.constraints?.organization_id;
      const rawProfile = grant.constraints?.access_profile;
      const profile: AccessProfile = isAccessProfile(rawProfile) ? rawProfile : 'read';
      const info = ACCESS_PROFILE_INFO[profile];
      const readOnly = typeof grant.constraints?.read_only === 'boolean' ? grant.constraints.read_only : info.readOnly;
      return {
        grant,
        organizationId: typeof organizationId === 'string' ? organizationId : undefined,
        profile,
        readOnly,
        anonymized: info.anonymizeAllowed && grant.constraints?.anonymize !== false,
        expiresAt: grant.expires_at,
        reason: grant.reason,
      };
    });

/** `true` when the grant is active and not past its expiry. */
export const isGrantUsable = (grant: OrganizationGrant, now = Date.now()): boolean =>
  grant.grant.status === 'active' && (!grant.expiresAt || new Date(grant.expiresAt).getTime() > now);

export type EpilotStage = 'production' | 'staging' | 'dev';

/** Default epilot Agent Auth issuer per environment. */
export const epilotAgentAuthIssuer = (stage: EpilotStage = 'production') =>
  stage === 'production'
    ? 'https://access-token.sls.epilot.io/v1/access-tokens/agent-auth'
    : `https://access-token.${stage}.sls.epilot.io/v1/access-tokens/agent-auth`;
