/**
 * epilot-specific helpers on top of the generic Agent Auth Protocol client:
 * the two epilot capabilities and the organization grant model.
 */
import type { AgentAuthClient } from './client.js';
import type { AgentIdentity, CapabilityGrant, CapabilityRequest } from './types.js';

export const EPILOT_CAPABILITIES = {
  /** The linked user's organizations annotated with this agent's grants. Host default capability. */
  organizationsList: 'epilot.organizations.list',
  /** Mint a short-lived epilot access token for an organization the agent has a grant for. */
  accessTokenIssue: 'epilot.access_token.issue',
} as const;

export interface EpilotOrganizationAccess {
  granted: boolean;
  pending: boolean;
  read_only: boolean;
  anonymized: boolean;
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
  expires_at: string;
  /** Email of the approving user, when the server returns it (used for token naming). */
  email?: string;
}

/**
 * Build the constraints for an `epilot.access_token.issue` grant request.
 * Omit `organizationId` to let the approval page grant the user's login organization.
 */
export const organizationAccessCapability = (
  options: { organizationId?: string; readOnly?: boolean; anonymize?: boolean } = {},
): CapabilityRequest => {
  const constraints = {
    ...(options.organizationId !== undefined ? { organization_id: options.organizationId } : {}),
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

export interface OrganizationGrant {
  grant: CapabilityGrant;
  organizationId?: string;
  readOnly: boolean;
  anonymized: boolean;
}

/** Grants of `epilot.access_token.issue` mapped to their organization and access level. */
export const organizationGrants = (grants: CapabilityGrant[]): OrganizationGrant[] =>
  grants
    .filter((grant) => grant.capability === EPILOT_CAPABILITIES.accessTokenIssue)
    .map((grant) => {
      const organizationId = grant.constraints?.organization_id;
      return {
        grant,
        organizationId: typeof organizationId === 'string' ? organizationId : undefined,
        readOnly: grant.constraints?.read_only !== false,
        anonymized: grant.constraints?.anonymize !== false,
      };
    });

export type EpilotStage = 'production' | 'staging' | 'dev';

/** Default epilot Agent Auth issuer per environment. */
export const epilotAgentAuthIssuer = (stage: EpilotStage = 'production') =>
  stage === 'production'
    ? 'https://access-token.sls.epilot.io/v1/agent-auth'
    : `https://access-token.${stage}.sls.epilot.io/v1/agent-auth`;
