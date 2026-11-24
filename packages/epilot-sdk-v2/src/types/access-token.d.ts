/* Auto-copied from access-token-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Responses {
        export type AgentAuthError = Schemas.AgentAuthError;
    }
    namespace Schemas {
        /**
         * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
         * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
         * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
         * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
         * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
         * (write: 24 h, scoped read: 7 d by default).
         *
         * example:
         * config:write
         */
        export type AccessProfile = "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full";
        /**
         * A JWT Access Token
         * example:
         * eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
         */
        export type AccessToken = string;
        /**
         * example:
         * api_5ZugdRXasLfWBypHi93Fk
         */
        export type AccessTokenId = string;
        export interface AccessTokenItem {
            id: /**
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            AccessTokenId;
            created_at: string; // date-time
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: /**
             * Access token type
             * example:
             * api
             */
            AccessTokenType;
            journey_id?: /* Journey ID for access token type "journey" */ AccessTokenJourneyId;
            portal_id?: /* Portal ID for access token type "portal" */ PortalId;
            portal_user_id?: /* Portal User ID for access token type "portal_preview" */ PortalUserId;
            contact_id?: /**
             * Contact entity ID for access token type "contact_identification"
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            ContactId;
            allowed_operations?: /**
             * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
             * example:
             * [
             *   "getContact",
             *   "getContracts"
             * ]
             */
            AllowedOperations;
            assignments?: /* List of role ids attached to an user */ Assignments;
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
            /**
             * Last date the token was used (YYYY-MM-DD format, 1 day accuracy)
             * example:
             * 2026-02-24
             */
            last_used?: string; // date
            /**
             * Timestamp when the token expires and stops being accepted (only set for tokens created with expires_in)
             * example:
             * 2026-03-01T12:00:00.000Z
             */
            expires_at?: string; // date-time
        }
        /**
         * Journey ID for access token type "journey"
         */
        export type AccessTokenJourneyId = string;
        /**
         * Human readable name for access token
         * example:
         * Postman Access Token
         */
        export type AccessTokenName = string;
        export interface AccessTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "api";
            assignments?: /* List of role ids attached to an user */ Assignments;
            expires_in?: ExpiresIn;
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
        }
        /**
         * Access token type
         * example:
         * api
         */
        export type AccessTokenType = "api" | "journey" | "portal" | "assume" | "app" | "portal_preview" | "contact_identification";
        export interface AgentApproval {
            agent_id: string;
            agent_name: string;
            host_name?: string;
            /**
             * The `client` the agent declared at registration, e.g. `epilot-mcp`
             */
            client?: string;
            /**
             * Whether the host is already linked to a user
             */
            host_linked?: boolean;
            agent_has_active_grants?: boolean;
            mode: AgentMode;
            reason?: string;
            requested_grants: {
                grant_id: string;
                capability: string;
                status: /* `expired`: an active escalation grant whose `expires_at` has passed (reported, never stored) */ GrantStatus;
                constraints?: /**
                 * Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
                 * `{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
                 * `anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalised to its read
                 * sibling; a read profile with `read_only: false`, or `anonymize: true` with a write profile, is rejected
                 * (`400 invalid_capabilities`).
                 *
                 * example:
                 * {
                 *   "organization_id": "739224",
                 *   "access_profile": "config:read",
                 *   "read_only": true,
                 *   "anonymize": true
                 * }
                 */
                Constraints;
                /**
                 * Purpose the agent gave for this grant (shown prominently, in the agent's words)
                 */
                reason?: string;
                /**
                 * `epilot.access_token.issue` grants only: the requested `access_profile` followed by its downgrades,
                 * in that order — the choices offered to the approver.
                 *
                 */
                profile_options?: /* One selectable profile on the approval page (the requested profile or a downgrade of it) */ ProfileOption[];
            }[];
            expires_at: string; // date-time
            approval_return_uri?: string; // uri
            status: "pending" | "approved" | "denied" | "expired";
        }
        export interface AgentApprovalDecision {
            decision: "approve" | "deny";
            /**
             * Shown to the agent on denied grants
             */
            reason?: string;
            /**
             * Grants to approve with the user's (narrowed) constraints. Omitted → all requested grants are approved
             * as requested (organization_id forced to the login organization). Grants left out of an explicit list are denied.
             *
             */
            grants?: {
                grant_id: string;
                /**
                 * `{ organization_id?, access_profile?, read_only?, anonymize? }` for `epilot.access_token.issue`:
                 * `access_profile` must be one of the grant's `profile_options`; `read_only: true` on a write profile
                 * selects its read sibling; `anonymize` may only be turned on, and only with read profiles.
                 *
                 * example:
                 * {
                 *   "organization_id": "739224",
                 *   "access_profile": "config:read",
                 *   "read_only": true,
                 *   "anonymize": true
                 * }
                 */
                constraints?: {
                    [name: string]: any;
                };
                /**
                 * Lifetime of the approved grant in seconds, chosen by the user. Only applies to profiles that
                 * expire (every profile but an anonymized `read`); omitted → the profile's default lifetime,
                 * `null` → no expiry (the grant lives as long as the agent, until revoked). Only anonymized read
                 * access may live until revoked: write profiles (`config:write`, `data:write`, `full`) and
                 * non-anonymized read access reject `null` and are capped at 90 days (7776000). A non-anonymized
                 * `read` grant defaults to the read profiles' lifetime.
                 *
                 * example:
                 * 604800
                 */
                expires_in?: number | null;
            }[];
        }
        export interface AgentAuthError {
            [name: string]: any;
            /**
             * snake_case error code (spec §7), e.g. invalid_jwt, capability_not_granted, constraint_violated.
             * epilot extensions: approval_not_found, approval_expired, organization_mismatch, constraint_widened,
             * anonymize_requires_read_only, reason_required, agent_auth_disabled
             *
             * example:
             * constraint_violated
             */
            error: string;
            message: string;
            violations?: {
                field?: string;
                constraint?: any;
                actual?: any;
            }[];
            unknown_operators?: string[];
            invalid_capabilities?: string[];
        }
        export interface AgentConfiguration {
            /**
             * example:
             * 1.0-draft
             */
            version?: string;
            /**
             * example:
             * epilot
             */
            provider_name?: string;
            description?: string;
            /**
             * example:
             * https://access-token.sls.epilot.io/v1/access-tokens/agent-auth
             */
            issuer?: string; // uri
            default_location?: string; // uri
            /**
             * example:
             * [
             *   "Ed25519"
             * ]
             */
            algorithms?: string[];
            modes?: AgentMode[];
            approval_methods?: string[];
            endpoints?: {
                [name: string]: string;
            };
            jwks_uri?: string; // uri
        }
        export interface AgentIdRequest {
            agent_id: string;
        }
        export type AgentMode = "delegated" | "autonomous";
        export type AgentStatus = "pending" | "active" | "expired" | "revoked" | "rejected" | "claimed";
        export interface AgentStatusResponse {
            agent_id: string;
            host_id: string;
            name: string;
            status: AgentStatus;
            mode: AgentMode;
            user_id?: string;
            /**
             * `autonomous` first-party agents: the admin who registered it
             */
            owner_user_id?: string;
            agent_capability_grants: CapabilityGrant[];
            created_at: string; // date-time
            activated_at?: string; // date-time
            last_used_at?: string; // date-time
            expires_at?: string; // date-time
            approval?: DeviceAuthorizationApproval;
        }
        /**
         * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
         * example:
         * [
         *   "getContact",
         *   "getContracts"
         * ]
         */
        export type AllowedOperations = string[];
        /**
         * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
         * example:
         * true
         */
        export type Anonymize = boolean;
        /**
         * A token an app acts through, e.g. a Custom Page. Besides the usual claims it carries an `actor` claim `{ type: 'app', app_id, user_id }`, following the convention of agent tokens: `app_id` is the app whose role `<org_id>:<app_id>` is the token's single assignment, `user_id` the user whose session minted the token. Attribution only: permissions come from the role assignments.
         */
        export interface AppTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "app";
            assignments?: /* List of role ids attached to an user */ Assignments;
            expires_in?: ExpiresIn;
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
        }
        /**
         * List of role ids attached to an user
         */
        export type Assignments = /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        RoleId[];
        export interface AssumeTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "assume";
            assignments?: /* List of role ids attached to an user */ Assignments;
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
        }
        export interface Capability {
            /**
             * example:
             * epilot.access_token.issue
             */
            name: string;
            description: string;
            location?: string; // uri
            /**
             * JSON Schema of the arguments
             */
            input?: {
                [name: string]: any;
            };
            /**
             * JSON Schema of the result
             */
            output?: {
                [name: string]: any;
            };
            grant_status?: "granted" | "not_granted";
        }
        export interface CapabilityGrant {
            /**
             * example:
             * grant_5ZugdRXasLfWBypHi93Fk
             */
            id: string;
            capability: string;
            status: /* `expired`: an active escalation grant whose `expires_at` has passed (reported, never stored) */ GrantStatus;
            description?: string;
            input?: {
                [name: string]: any;
            };
            output?: {
                [name: string]: any;
            };
            constraints?: /**
             * Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
             * `{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
             * `anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalised to its read
             * sibling; a read profile with `read_only: false`, or `anonymize: true` with a write profile, is rejected
             * (`400 invalid_capabilities`).
             *
             * example:
             * {
             *   "organization_id": "739224",
             *   "access_profile": "config:read",
             *   "read_only": true,
             *   "anonymize": true
             * }
             */
            Constraints;
            granted_by?: string;
            denied_by?: string;
            reason?: string;
            expires_at?: string; // date-time
            created_at?: string; // date-time
        }
        export type CapabilityRequest = string | {
            name: string;
            constraints?: /**
             * Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
             * `{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
             * `anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalised to its read
             * sibling; a read profile with `read_only: false`, or `anonymize: true` with a write profile, is rejected
             * (`400 invalid_capabilities`).
             *
             * example:
             * {
             *   "organization_id": "739224",
             *   "access_profile": "config:read",
             *   "read_only": true,
             *   "anonymize": true
             * }
             */
            Constraints;
        };
        /**
         * Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
         * `{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
         * `anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalised to its read
         * sibling; a read profile with `read_only: false`, or `anonymize: true` with a write profile, is rejected
         * (`400 invalid_capabilities`).
         *
         * example:
         * {
         *   "organization_id": "739224",
         *   "access_profile": "config:read",
         *   "read_only": true,
         *   "anonymize": true
         * }
         */
        export interface Constraints {
            [name: string]: any;
        }
        /**
         * Contact entity ID for access token type "contact_identification"
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type ContactId = string;
        /**
         * A token that acts as one contact, issued after that contact was identified by a portal's registration identifiers rather than by logging in. Distinct from portal_preview, which impersonates an existing portal user for a 360 operator: this kind belongs to no user, is minted for an unauthenticated caller, and is therefore always short-lived and restricted to an explicit operation allowlist. Never stored, so it cannot be listed or revoked - keep expires_in short.
         */
        export interface ContactIdentificationTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "contact_identification";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            contact_id: /**
             * Contact entity ID for access token type "contact_identification"
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            ContactId;
            /**
             * Portal surface the token is issued for (see `surfaces` on the portal config in customer-portal-api). Carried as the `custom:surface_id` claim; the consuming API resolves the surface's data access from the portal config on every request.
             * example:
             * website-journeys
             */
            surface_id: string;
            allowed_operations: /**
             * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
             * example:
             * [
             *   "getContact",
             *   "getContracts"
             * ]
             */
            AllowedOperations;
            /**
             * Lifetime in seconds. Integer only for this token type (no "5m" strings), and capped server-side by CONTACT_IDENTIFICATION_TOKEN_MAX_EXPIRATION_SECONDS - the value originates from portal configuration, so it is not trusted as-is.
             * example:
             * 300
             */
            expires_in: number; // int32
            /**
             * Optional. Carried as the `email` claim when the consumer needs it (e.g. to attribute an activity). Omit to keep the contact's email out of the token.
             */
            email?: string;
        }
        export interface DeviceAuthorizationApproval {
            method: "device_authorization";
            /**
             * example:
             * https://portal.epilot.cloud/login?agent_approval
             */
            verification_uri: string; // uri
            /**
             * example:
             * https://portal.epilot.cloud/login?agent_approval=WDJB-MJHT&agent_issuer=https%3A%2F%2Faccess-token.sls.epilot.io%2Fv1%2Fagent-auth
             */
            verification_uri_complete?: string; // uri
            /**
             * example:
             * WDJB-MJHT
             */
            user_code: string;
            /**
             * example:
             * 600
             */
            expires_in: number;
            /**
             * example:
             * 5
             */
            interval: number;
        }
        export interface Ed25519PublicKey {
            kty: "OKP";
            crv: "Ed25519";
            /**
             * base64url public key
             */
            x: string;
            kid?: string;
        }
        export type ExpiresIn = number /* int32 */ | string /* ^[0-9]+ ?(ms|milliseconds?|s|seconds?|m|minutes?|h|hours?|d|days?|w|weeks?|y|years?)?$ */;
        /**
         * `expired`: an active escalation grant whose `expires_at` has passed (reported, never stored)
         */
        export type GrantStatus = "active" | "pending" | "denied" | "expired";
        /**
         * An agent token (persisted `api` token with an `actor` claim), as `epilot.access_token.issue` returns it
         */
        export interface IssuedAgentToken {
            token: string;
            /**
             * example:
             * agent_V1StGXR8_Z5jdHi6B-myT
             */
            token_id: string;
            organization_id: string;
            /**
             * The user the agent acts for
             */
            user_id: string;
            access_profile: /**
             * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
             * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
             * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
             * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
             * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
             * (write: 24 h, scoped read: 7 d by default).
             *
             * example:
             * config:write
             */
            AccessProfile;
            read_only: boolean;
            anonymize: boolean;
            allowed_actions?: string[];
            expires_at: string; // date-time
        }
        export interface JourneyTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "journey";
            journey_id: /* Journey ID for access token type "journey" */ AccessTokenJourneyId;
            expires_in?: ExpiresIn;
        }
        export interface OrganizationAgent {
            agent_id: string;
            /**
             * Self-declared by the agent; show it as an AI agent, never as a person
             */
            name: string;
            /**
             * example:
             * epilot-mcp
             */
            client?: string;
            status: AgentStatus;
            mode: AgentMode;
            /**
             * An agent of a first-party host (an epilot service). For a first-party agent id such as `luna` the entry
             * stands for the tokens the token exchange minted in the organization: no agent record, no grant, empty
             * `approved_by`; each token acts for the user it was exchanged for. Revoking it revokes those tokens.
             *
             */
            first_party?: boolean;
            /**
             * `autonomous` agents: the admin who registered it; the agent acts with their current roles
             */
            owner?: {
                user_id: string;
                email?: string;
            };
            /**
             * `epilot_service`: no person registered this agent, an epilot service did, for `owner` (a preview
             * organization agent, see `registerPreviewOrgAgent`). Show it as "registered by an epilot service for <owner>".
             *
             */
            registered_by?: "epilot_service";
            /**
             * The named purpose an epilot service registered this agent for (`registerPreviewOrgAgent` `purpose`), possibly
             * outside a preview organization. Absent for preview organization agents and every other agent.
             *
             * example:
             * blueprint-tests.suggest
             */
            service_purpose?: string;
            host: {
                id: string;
                name?: string;
            };
            /**
             * Users who approved its access in this organization; the agent acts on their behalf
             */
            approved_by: {
                user_id: string;
                email?: string;
            }[];
            purpose?: string;
            created_at: string; // date-time
            last_used_at?: string; // date-time
            tokens: {
                id: string;
                name?: string;
                access_profile?: /**
                 * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
                 * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
                 * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
                 * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
                 * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
                 * (write: 24 h, scoped read: 7 d by default).
                 *
                 * example:
                 * config:write
                 */
                AccessProfile;
                read_only?: boolean;
                anonymize?: boolean;
                created_at?: string; // date-time
                expires_at?: string; // date-time
                last_used?: string;
            }[];
        }
        /**
         * Portal ID for access token type "portal"
         */
        export type PortalId = string;
        export interface PortalPreviewTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "portal_preview";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            portal_user_id: /* Portal User ID for access token type "portal_preview" */ PortalUserId;
        }
        export interface PortalTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "portal";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            expires_in?: ExpiresIn;
        }
        /**
         * Portal User ID for access token type "portal_preview"
         */
        export type PortalUserId = string;
        /**
         * One selectable profile on the approval page (the requested profile or a downgrade of it)
         */
        export interface ProfileOption {
            access_profile: /**
             * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
             * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
             * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
             * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
             * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
             * (write: 24 h, scoped read: 7 d by default).
             *
             * example:
             * config:write
             */
            AccessProfile;
            /**
             * example:
             * Change configuration
             */
            title: string;
            description: string;
            /**
             * read_only claim implied by the profile
             */
            read_only: boolean;
            /**
             * Whether anonymize may be combined with this profile (read profiles only)
             */
            anonymize_allowed: boolean;
            /**
             * Action allowlist the token will carry (absent = roles alone decide)
             * example:
             * [
             *   "journey:*",
             *   "automation:*",
             *   "entity:view"
             * ]
             */
            allowed_actions?: string[];
            /**
             * Grant lifetime in seconds when approved with this profile; absent = agent lifetime
             * example:
             * 86400
             */
            expires_in?: number;
        }
        /**
         * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
         * example:
         * true
         */
        export type ReadOnly = boolean;
        export interface RegisterAgentRequest {
            /**
             * Human readable agent name (shown on the approval page and in token names)
             * example:
             * epilot CLI @ laptop
             */
            name: string;
            /**
             * example:
             * Claude Code on laptop
             */
            host_name?: string;
            capabilities: [
                CapabilityRequest,
                ...CapabilityRequest[]
            ];
            mode?: AgentMode;
            /**
             * Purpose of the request, in the agent's words. Required (10–200 characters, trimmed) when an
             * `epilot.access_token.issue` grant asks for an `access_profile` other than `read` (`400 reason_required`),
             * optional otherwise. Stored on every grant of the request and copied into `actor.purpose` of issued tokens.
             *
             * example:
             * Fix the entity mapping of the PV registration journey so submissions create an opportunity again
             */
            reason?: string;
            /**
             * example:
             * device_authorization
             */
            preferred_method?: string;
            login_hint?: string;
            binding_message?: string;
            /**
             * epilot extension — the approval page redirects the browser here after the decision (https, or http loopback)
             */
            approval_return_uri?: string; // uri
            /**
             * epilot extension — the kind of client registering, e.g. `epilot-mcp`. Self-declared: a hint for the
             * approval page (the MCP gateway gets the option to enable the MCP Server), never an authorization input.
             *
             * example:
             * epilot-mcp
             */
            client?: string; // ^[a-z0-9][a-z0-9-]{0,63}$
        }
        export interface RegisterAgentResponse {
            /**
             * example:
             * agent_5ZugdRXasLfWBypHi93Fk
             */
            agent_id: string;
            /**
             * RFC 7638 thumbprint of the host key
             */
            host_id: string;
            name: string;
            mode: AgentMode;
            status: "active" | "pending";
            agent_capability_grants: CapabilityGrant[];
            approval?: DeviceAuthorizationApproval;
        }
        export interface RequestCapabilityRequest {
            capabilities: [
                CapabilityRequest,
                ...CapabilityRequest[]
            ];
            /**
             * Purpose of the escalation; required when an `access_profile` other than `read` is requested (see RegisterAgentRequest)
             */
            reason?: string;
            preferred_method?: string;
            login_hint?: string;
            binding_message?: string;
            approval_return_uri?: string; // uri
        }
        export interface RequestCapabilityResponse {
            agent_id: string;
            agent_capability_grants: CapabilityGrant[];
            approval?: DeviceAuthorizationApproval;
        }
        /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        export type RoleId = string;
        export type TokenParameters = AccessTokenParameters | JourneyTokenParameters | PortalTokenParameters | AssumeTokenParameters | /* A token an app acts through, e.g. a Custom Page. Besides the usual claims it carries an `actor` claim `{ type: 'app', app_id, user_id }`, following the convention of agent tokens: `app_id` is the app whose role `<org_id>:<app_id>` is the token's single assignment, `user_id` the user whose session minted the token. Attribution only: permissions come from the role assignments. */ AppTokenParameters | PortalPreviewTokenParameters | /* A token that acts as one contact, issued after that contact was identified by a portal's registration identifiers rather than by logging in. Distinct from portal_preview, which impersonates an existing portal user for a 360 operator: this kind belongs to no user, is minted for an unauthenticated caller, and is therefore always short-lived and restricted to an explicit operation allowlist. Never stored, so it cannot be listed or revoked - keep expires_in short. */ ContactIdentificationTokenParameters;
    }
}
export declare namespace Paths {
    namespace CreateAccessToken {
        export type RequestBody = Components.Schemas.TokenParameters;
        namespace Responses {
            export interface $201 {
                token?: /**
                 * A JWT Access Token
                 * example:
                 * eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
                 */
                Components.Schemas.AccessToken;
                id: /**
                 * example:
                 * api_5ZugdRXasLfWBypHi93Fk
                 */
                Components.Schemas.AccessTokenId;
                created_at: string; // date-time
                name: /**
                 * Human readable name for access token
                 * example:
                 * Postman Access Token
                 */
                Components.Schemas.AccessTokenName;
                token_type?: /**
                 * Access token type
                 * example:
                 * api
                 */
                Components.Schemas.AccessTokenType;
                journey_id?: /* Journey ID for access token type "journey" */ Components.Schemas.AccessTokenJourneyId;
                portal_id?: /* Portal ID for access token type "portal" */ Components.Schemas.PortalId;
                portal_user_id?: /* Portal User ID for access token type "portal_preview" */ Components.Schemas.PortalUserId;
                contact_id?: /**
                 * Contact entity ID for access token type "contact_identification"
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.ContactId;
                allowed_operations?: /**
                 * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
                 * example:
                 * [
                 *   "getContact",
                 *   "getContracts"
                 * ]
                 */
                Components.Schemas.AllowedOperations;
                assignments?: /* List of role ids attached to an user */ Components.Schemas.Assignments;
                read_only?: /**
                 * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
                 * example:
                 * true
                 */
                Components.Schemas.ReadOnly;
                anonymize?: /**
                 * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
                 * example:
                 * true
                 */
                Components.Schemas.Anonymize;
                /**
                 * Last date the token was used (YYYY-MM-DD format, 1 day accuracy)
                 * example:
                 * 2026-02-24
                 */
                last_used?: string; // date
                /**
                 * Timestamp when the token expires and stops being accepted (only set for tokens created with expires_in)
                 * example:
                 * 2026-03-01T12:00:00.000Z
                 */
                expires_at?: string; // date-time
            }
            export interface $400 {
                status?: number;
                error?: string;
            }
            export interface $500 {
                status?: number;
                error?: string;
            }
        }
    }
    namespace DecideAgentApproval {
        export type RequestBody = Components.Schemas.AgentApprovalDecision;
        namespace Responses {
            export interface $200 {
                status?: "approved" | "denied";
                agent_id?: string;
                agent_status?: Components.Schemas.AgentStatus;
                grants?: {
                    grant_id?: string;
                    capability?: string;
                    status?: /* `expired`: an active escalation grant whose `expires_at` has passed (reported, never stored) */ Components.Schemas.GrantStatus;
                    constraints?: /**
                     * Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
                     * `{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
                     * `anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalised to its read
                     * sibling; a read profile with `read_only: false`, or `anonymize: true` with a write profile, is rejected
                     * (`400 invalid_capabilities`).
                     *
                     * example:
                     * {
                     *   "organization_id": "739224",
                     *   "access_profile": "config:read",
                     *   "read_only": true,
                     *   "anonymize": true
                     * }
                     */
                    Components.Schemas.Constraints;
                    /**
                     * Expiry of an approved escalation grant (profile TTL); absent for `read`
                     */
                    expires_at?: string; // date-time
                }[];
                approval_return_uri?: string; // uri
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
            export type $404 = Components.Responses.AgentAuthError;
        }
    }
    namespace DescribeCapability {
        namespace Parameters {
            /**
             * example:
             * epilot.access_token.issue
             */
            export type Name = string;
        }
        export interface QueryParameters {
            name: /**
             * example:
             * epilot.access_token.issue
             */
            Parameters.Name;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Capability;
            export type $404 = Components.Responses.AgentAuthError;
        }
    }
    namespace ExchangeAgentToken {
        export interface RequestBody {
            /**
             * Host JWT signed with a first-party host key
             */
            actor_token: string;
            /**
             * A first-party agent id (`FIRST_PARTY_AGENTS`, today `luna`); others are `403 agent_not_found`
             * example:
             * luna
             */
            agent_id: string;
            access_profile?: /**
             * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
             * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
             * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
             * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
             * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
             * (write: 24 h, scoped read: 7 d by default).
             *
             * example:
             * config:write
             */
            Components.Schemas.AccessProfile;
            /**
             * `true` narrows a write profile to its read sibling
             */
            read_only?: boolean;
            /**
             * Only with read profiles
             */
            anonymize?: boolean;
            /**
             * Seconds; default 900, at most 300 for write profiles
             */
            expires_in?: number;
            /**
             * Run the token is used for; copied into `actor.run_id`
             */
            run_id?: string; // ^[A-Za-z0-9._:-]{1,128}$
            /**
             * Where the agent runs, e.g. `chat`, `background` or `flows`; copied into `actor.channel`
             * example:
             * chat
             */
            channel?: string; // ^[a-z][a-z0-9_]{0,31}$
        }
        namespace Responses {
            export type $200 = /* An agent token (persisted `api` token with an `actor` claim), as `epilot.access_token.issue` returns it */ Components.Schemas.IssuedAgentToken;
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
            export type $503 = Components.Responses.AgentAuthError;
        }
    }
    namespace ExecuteCapability {
        export interface RequestBody {
            /**
             * example:
             * epilot.access_token.issue
             */
            capability: string;
            /**
             * example:
             * {
             *   "organization_id": "739224",
             *   "access_profile": "config:read",
             *   "anonymize": true
             * }
             */
            arguments?: {
                [name: string]: any;
            };
        }
        namespace Responses {
            export interface $200 {
                data: {
                    [name: string]: any;
                };
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
            export type $404 = Components.Responses.AgentAuthError;
        }
    }
    namespace GetAccessTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetAccessTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace GetAgentApproval {
        namespace Responses {
            export type $200 = Components.Schemas.AgentApproval;
            export type $404 = Components.Responses.AgentAuthError;
            export type $429 = Components.Responses.AgentAuthError;
        }
    }
    namespace GetAgentAuthJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    [name: string]: any;
                }[];
            }
        }
    }
    namespace GetAgentConfiguration {
        namespace Responses {
            export type $200 = Components.Schemas.AgentConfiguration;
        }
    }
    namespace GetAgentStatus {
        namespace Parameters {
            export type AgentId = string;
        }
        export interface QueryParameters {
            agent_id: Parameters.AgentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentStatusResponse;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace GetContactIdentificationTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetContactIdentificationTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/contact-identification
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/contact-identification/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace GetPortalPreviewTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetPortalPreviewTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/portal-preview
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/portal-preview/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace GetPublicTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetPublicTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace IntrospectAgent {
        export interface RequestBody {
            token: string;
        }
        namespace Responses {
            export interface $200 {
                active: boolean;
                agent_id?: string;
                host_id?: string;
                user_id?: string;
                mode?: Components.Schemas.AgentMode;
                agent_capability_grants?: {
                    capability?: string;
                    status?: "active" | "pending";
                }[];
                expires_at?: string; // date-time
            }
        }
    }
    namespace ListAccessTokens {
        namespace Parameters {
            export type TokenType = /**
             * Access token type
             * example:
             * api
             */
            Components.Schemas.AccessTokenType[];
        }
        export interface QueryParameters {
            token_type?: Parameters.TokenType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenItem[];
        }
    }
    namespace ListCapabilities {
        namespace Parameters {
            export type Cursor = string;
            export type Limit = number;
            export type Query = string;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            cursor?: Parameters.Cursor;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export interface $200 {
                capabilities: Components.Schemas.Capability[];
                next_cursor?: string;
                has_more: boolean;
            }
            export type $401 = Components.Responses.AgentAuthError;
        }
    }
    namespace ListOrganizationAgents {
        namespace Responses {
            export type $200 = Components.Schemas.OrganizationAgent[];
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace ReactivateAgent {
        export type RequestBody = Components.Schemas.AgentIdRequest;
        namespace Responses {
            export interface $200 {
                agent_id?: string;
                status?: Components.Schemas.AgentStatus;
                agent_capability_grants?: Components.Schemas.CapabilityGrant[];
                activated_at?: string; // date-time
                expires_at?: string; // date-time
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace RegisterAgent {
        export type RequestBody = Components.Schemas.RegisterAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RegisterAgentResponse;
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $409 = Components.Responses.AgentAuthError;
        }
    }
    namespace RegisterFirstPartyAgent {
        export interface RequestBody {
            /**
             * Host JWT signed with a first-party host key
             */
            actor_token: string;
            /**
             * A first-party agent id (`FIRST_PARTY_AGENTS`, today `luna`); decides the agent's default name and
             * `client`. Others are `403 agent_not_found`
             *
             * example:
             * luna
             */
            agent_id: string;
            agent_public_key: Components.Schemas.Ed25519PublicKey;
            mode: Components.Schemas.AgentMode;
            access_profile?: /**
             * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
             * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
             * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
             * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
             * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
             * (write: 24 h, scoped read: 7 d by default).
             *
             * example:
             * config:write
             */
            Components.Schemas.AccessProfile;
            /**
             * Only with read profiles; an anonymized login token always yields an anonymized grant
             */
            anonymize?: boolean;
            /**
             * Agent and grant lifetime in seconds. `delegated`: 60 to 86400. `autonomous`: 3600 to 7776000
             * (90 days); anonymized read profiles up to the absolute agent lifetime (31536000).
             *
             */
            expires_in: number;
            /**
             * Purpose, required (10–200 characters, trimmed) for any `access_profile` other than `read`
             * (`400 reason_required`). Copied into `actor.purpose` and the token names.
             *
             */
            reason?: string;
            /**
             * Run the agent is registered for; copied into `actor.run_id` (an issue argument wins)
             */
            run_id?: string; // ^[A-Za-z0-9._:-]{1,128}$
            /**
             * Where the agent runs, e.g. `background` or `flows`; copied into `actor.channel`
             * example:
             * background
             */
            channel?: string; // ^[a-z][a-z0-9_]{0,31}$
            /**
             * Display name (e.g. of a Flows agent); defaults to the first-party agent's name
             * example:
             * Email labelling
             */
            name?: string;
        }
        namespace Responses {
            export interface $200 {
                agent_id: string;
                mode: Components.Schemas.AgentMode;
                status: Components.Schemas.AgentStatus;
                organization_id: string;
                access_profile: /**
                 * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
                 * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
                 * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
                 * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
                 * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
                 * (write: 24 h, scoped read: 7 d by default).
                 *
                 * example:
                 * config:write
                 */
                Components.Schemas.AccessProfile;
                /**
                 * The actions the agent's tokens allow at most: the `allowed_actions` of a token issued with the
                 * registered profile and no narrowing (a `read_only` token may allow fewer). `null` when the
                 * profile sets no action limit. The roles of the agent's user or owner decide within it.
                 *
                 */
                allowed_actions: string[] | null;
                expires_at: string; // date-time
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
            export type $409 = Components.Responses.AgentAuthError;
            export type $503 = Components.Responses.AgentAuthError;
        }
    }
    namespace RegisterPreviewOrgAgent {
        export interface HeaderParameters {
            "x-ivy-org-id"?: Parameters.XIvyOrgId;
        }
        namespace Parameters {
            export type XIvyOrgId = string;
        }
        export interface RequestBody {
            /**
             * Host JWT signed with a first-party host key
             */
            actor_token: string;
            /**
             * A first-party agent id (`FIRST_PARTY_AGENTS`, today `luna`). Others are `403 agent_not_found`
             * example:
             * luna
             */
            agent_id: string;
            agent_public_key: Components.Schemas.Ed25519PublicKey;
            /**
             * The active user of the organization the agent belongs to and acts with (in a preview organization,
             * the user who requested it)
             *
             * example:
             * 10010729
             */
            owner_user_id: string;
            /**
             * Optional named purpose that allows organizations other than preview ones (rule 3). Only
             * `blueprint-tests.suggest` (requires `access_profile: config:write`, no Configuration Hub actions);
             * any other value is `403 constraint_violated`; a caller not listed for the purpose is `403 forbidden`.
             * Left out: preview organizations only
             *
             * example:
             * blueprint-tests.suggest
             */
            purpose?: string;
            /**
             * Optional; preview organization agents are always `autonomous`
             */
            mode?: "autonomous";
            /**
             * Grant ceiling, default `config:read`. Only `config:read` and `config:write`; any other profile is
             * `403 constraint_violated`
             *
             * example:
             * config:write
             */
            access_profile?: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full";
            /**
             * Not supported; only `false` is accepted
             */
            anonymize?: boolean;
            /**
             * Agent and grant lifetime in seconds, 60 to 43200 (12 hours)
             */
            expires_in: number;
            /**
             * Purpose, required; copied into `actor.purpose` and the token names
             */
            reason: string;
            /**
             * Run the agent is registered for; copied into `actor.run_id` (an issue argument wins)
             */
            run_id?: string; // ^[A-Za-z0-9._:-]{1,128}$
            /**
             * Where the agent runs; copied into `actor.channel`
             * example:
             * background
             */
            channel?: string; // ^[a-z][a-z0-9_]{0,31}$
            /**
             * Display name; defaults to the first-party agent's name
             * example:
             * Configuration Agent
             */
            name?: string;
        }
        namespace Responses {
            export interface $200 {
                agent_id: string;
                mode: Components.Schemas.AgentMode;
                status: Components.Schemas.AgentStatus;
                organization_id: string;
                access_profile: /**
                 * Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
                 * Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
                 * `config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
                 * Read profiles imply `read_only: true`; `config:*` / `data:*` add an `allowed_actions` claim.
                 * Anonymize is only available with read profiles. Any profile but `read` needs a `reason` and expires
                 * (write: 24 h, scoped read: 7 d by default).
                 *
                 * example:
                 * config:write
                 */
                Components.Schemas.AccessProfile;
                /**
                 * The actions the agent's tokens allow at most: the `allowed_actions` of a token issued with the
                 * registered profile and no narrowing (a `read_only` token may allow fewer). `null` when the
                 * profile sets no action limit. The roles of the agent's user or owner decide within it.
                 *
                 */
                allowed_actions: string[] | null;
                expires_at: string; // date-time
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
            export type $409 = Components.Responses.AgentAuthError;
            export type $503 = Components.Responses.AgentAuthError;
        }
    }
    namespace RequestCapability {
        export type RequestBody = Components.Schemas.RequestCapabilityRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RequestCapabilityResponse;
            export type $400 = Components.Responses.AgentAuthError;
            export type $401 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace RevokeAccessToken {
        namespace Parameters {
            export type Id = /**
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            Components.Schemas.AccessTokenId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenItem;
        }
    }
    namespace RevokeAgent {
        export type RequestBody = Components.Schemas.AgentIdRequest;
        namespace Responses {
            export interface $200 {
                agent_id?: string;
                status?: "revoked";
            }
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace RevokeHost {
        namespace Responses {
            export interface $200 {
                host_id?: string;
                status?: "revoked";
                agents_revoked?: number;
            }
        }
    }
    namespace RevokeOrganizationAgent {
        namespace Responses {
            export interface $200 {
                agent_id: string;
                organization_id: string;
                revoked_grants: number;
                revoked_tokens: number;
            }
            export type $403 = Components.Responses.AgentAuthError;
            export type $404 = Components.Responses.AgentAuthError;
        }
    }
    namespace RotateAgentKey {
        export interface RequestBody {
            agent_id: string;
            public_key: Components.Schemas.Ed25519PublicKey;
        }
        namespace Responses {
            export interface $200 {
                agent_id?: string;
                status?: Components.Schemas.AgentStatus;
            }
            export type $400 = Components.Responses.AgentAuthError;
            export type $403 = Components.Responses.AgentAuthError;
        }
    }
    namespace RotateHostKey {
        export interface RequestBody {
            public_key: Components.Schemas.Ed25519PublicKey;
        }
        namespace Responses {
            export interface $200 {
                host_id?: string;
                status?: string;
            }
            export type $400 = Components.Responses.AgentAuthError;
        }
    }
    namespace V1AccessTokensAgentAuthAgents$AgentId {
        namespace Parameters {
            export type AgentId = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
    }
    namespace V1AccessTokensAgentAuthApprovals$UserCode {
        namespace Parameters {
            /**
             * example:
             * WDJB-MJHT
             */
            export type UserCode = string;
        }
        export interface PathParameters {
            user_code: /**
             * example:
             * WDJB-MJHT
             */
            Parameters.UserCode;
        }
    }
}


export interface OperationMethods {
  /**
   * listAccessTokens - listAccessTokens
   * 
   * Lists all Access Tokens for current user (by default excludes system generated tokens)
   */
  'listAccessTokens'(
    parameters?: Parameters<Paths.ListAccessTokens.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAccessTokens.Responses.$200>
  /**
   * createAccessToken - createAccessToken
   * 
   * **Access Token type: `API`** (default if not specified):
   * 
   * Generates a new Access Token to use for calling epilot APIs.
   * 
   * Takes optionally a list of Roles assigned to the Access Token. Defaults to current user's assignments
   * 
   * See [Permissions API docs](https://docs.epilot.io/api/permissions)
   * 
   * **Access Token type: `JOURNEY`**:
   * 
   * Generates a Public Access Token related to a journey.
   * The journey id should be specfied.
   * 
   */
  'createAccessToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAccessToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAccessToken.Responses.$201>
  /**
   * revokeAccessToken - revokeAccessToken
   * 
   * Revokes an Access Token so it can't be used anymore.
   */
  'revokeAccessToken'(
    parameters?: Parameters<Paths.RevokeAccessToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeAccessToken.Responses.$200>
  /**
   * getAccessTokenJwks - getAccessTokenJwks
   * 
   * Get jwks public key set to verify access tokens generated by this API
   */
  'getAccessTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccessTokenJwks.Responses.$200>
  /**
   * getAccessTokenOIDC - getAccessTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API as identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getAccessTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccessTokenOIDC.Responses.$200>
  /**
   * getPublicTokenJwks - getPublicTokenJwks
   * 
   * Get jwks public key set to verify public tokens generated by this API
   */
  'getPublicTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicTokenJwks.Responses.$200>
  /**
   * getPortalPreviewTokenJwks - getPortalPreviewTokenJwks
   * 
   * Get jwks public key set to verify portal preview tokens generated by this API
   */
  'getPortalPreviewTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalPreviewTokenJwks.Responses.$200>
  /**
   * getPublicTokenOIDC - getPublicTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API a a public identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getPublicTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicTokenOIDC.Responses.$200>
  /**
   * getPortalPreviewTokenOIDC - getPortalPreviewTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API a a portal preview identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getPortalPreviewTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalPreviewTokenOIDC.Responses.$200>
  /**
   * getContactIdentificationTokenJwks - getContactIdentificationTokenJwks
   * 
   * Get jwks public key set to verify contact identification tokens generated by this API
   */
  'getContactIdentificationTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContactIdentificationTokenJwks.Responses.$200>
  /**
   * getContactIdentificationTokenOIDC - getContactIdentificationTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API as a contact identification identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getContactIdentificationTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContactIdentificationTokenOIDC.Responses.$200>
  /**
   * getAgentConfiguration - getAgentConfiguration
   * 
   * Agent Auth Protocol discovery document (spec §5.1). Cached for one hour.
   */
  'getAgentConfiguration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentConfiguration.Responses.$200>
  /**
   * getAgentAuthJwks - getAgentAuthJwks
   * 
   * JWKS to verify the epilot access tokens issued through `epilot.access_token.issue` (alias of the Access Token JWKS)
   */
  'getAgentAuthJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentAuthJwks.Responses.$200>
  /**
   * listCapabilities - listCapabilities
   * 
   * Lists the capability catalogue (spec §5.2). Optional host or agent JWT; with an agent JWT each
   * capability carries `grant_status`.
   * 
   */
  'listCapabilities'(
    parameters?: Parameters<Paths.ListCapabilities.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCapabilities.Responses.$200>
  /**
   * describeCapability - describeCapability
   * 
   * Describes one capability incl. input / output JSON Schema (spec §5.2)
   */
  'describeCapability'(
    parameters?: Parameters<Paths.DescribeCapability.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DescribeCapability.Responses.$200>
  /**
   * registerAgent - registerAgent
   * 
   * Registers an agent under a host (spec §5.3). Authenticated with a host JWT (`typ: host+jwt`) carrying
   * `host_public_key` and `agent_public_key`. Unknown hosts are created `pending` and linked to the approving
   * user on the first approval. Idempotent on host + agent key while the agent is `pending`.
   * 
   */
  'registerAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterAgent.Responses.$200>
  /**
   * getAgentStatus - getAgentStatus
   * 
   * Full agent state incl. grants; host JWT of the owning host (spec §5.5)
   */
  'getAgentStatus'(
    parameters?: Parameters<Paths.GetAgentStatus.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentStatus.Responses.$200>
  /**
   * requestCapability - requestCapability
   * 
   * Asks the user for additional grants (spec §5.4), e.g. access to another organization or write access.
   * Agent JWT (`aud` = issuer). Returns only the newly created pending grants plus an approval object.
   * 
   */
  'requestCapability'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequestCapability.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestCapability.Responses.$200>
  /**
   * reactivateAgent - reactivateAgent
   * 
   * Reactivates an `expired` agent within its absolute lifetime; old grants are revoked and host default capabilities re-granted (spec §5.6)
   */
  'reactivateAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ReactivateAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReactivateAgent.Responses.$200>
  /**
   * revokeAgent - revokeAgent
   * 
   * Revokes an agent permanently and deletes the epilot access tokens it obtained (spec §5.7)
   */
  'revokeAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RevokeAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeAgent.Responses.$200>
  /**
   * rotateAgentKey - rotateAgentKey
   * 
   * Replaces the agent's Ed25519 public key (spec §5.8)
   */
  'rotateAgentKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RotateAgentKey.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RotateAgentKey.Responses.$200>
  /**
   * rotateHostKey - rotateHostKey
   * 
   * Replaces the host's Ed25519 key (spec §5.9). The host id is the key thumbprint, so the response carries the
   * new `host_id`; agents move to the new host id and keep working with `iss` = new thumbprint.
   * 
   */
  'rotateHostKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RotateHostKey.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RotateHostKey.Responses.$200>
  /**
   * revokeHost - revokeHost
   * 
   * Revokes the host and cascades to all its agents and their epilot access tokens (spec §5.10)
   */
  'revokeHost'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeHost.Responses.$200>
  /**
   * executeCapability - executeCapability
   * 
   * Executes a capability (spec §5.11). Agent JWT with `aud` = this URL. Synchronous: `{ data }`.
   * 
   * - `epilot.organizations.list` → `{ organizations: [{ organization_id, organization_name, ..., access }] }`
   * - `epilot.access_token.issue` `{ organization_id, access_profile?, read_only?, anonymize?, expires_in? }` →
   *   `{ token, token_id, access_profile, read_only, anonymize, allowed_actions?, ... }`. `access_profile` defaults from
   *   the matched grant; only the grant profile or one of its downgrades may be requested (`403 constraint_violated`).
   *   The token never outlives the grant or the agent: `expires_in` is capped at what is left of both, and less
   *   than 30 seconds left is `403 capability_not_granted` (grant) or `403 agent_expired` (agent). This applies
   *   to first-party agents always and to the others when the `agent-auth-hardening` flag is on for the
   *   organization (doc/agent-auth.md "Flags").
   * 
   */
  'executeCapability'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExecuteCapability.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteCapability.Responses.$200>
  /**
   * introspectAgent - introspectAgent
   * 
   * Validates an agent JWT and returns its compact state (spec §5.12). Requires an epilot bearer token; rate limited.
   */
  'introspectAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.IntrospectAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IntrospectAgent.Responses.$200>
  /**
   * getAgentApproval - getAgentApproval
   * 
   * epilot extension for the epilot 360 login approval page: what the agent is asking for.
   * Public, rate limited per source IP.
   * 
   */
  'getAgentApproval'(
    parameters?: Parameters<Paths.V1AccessTokensAgentAuthApprovals$UserCode.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentApproval.Responses.$200>
  /**
   * decideAgentApproval - decideAgentApproval
   * 
   * epilot extension: approve or deny the pending grants of a device authorization with an epilot login token.
   * Approved grants are scoped to the login organization; `read_only` / `anonymize` may only be tightened and
   * `access_profile` only downgraded (`400 constraint_widened`). `read_only: true` on a write profile rewrites it to
   * its read sibling (`full` → `read`); `anonymize: true` is only accepted with read profiles
   * (`400 anonymize_requires_read_only`). Escalation grants (any profile but `read`) receive an `expires_at`.
   * 
   */
  'decideAgentApproval'(
    parameters?: Parameters<Paths.V1AccessTokensAgentAuthApprovals$UserCode.PathParameters> | null,
    data?: Paths.DecideAgentApproval.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DecideAgentApproval.Responses.$200>
  /**
   * listOrganizationAgents - listOrganizationAgents
   * 
   * epilot extension for the Access Tokens settings: the AI agents with access to the caller's organization,
   * with the users who approved them, their purpose and the tokens they hold there. First-party agents whose
   * tokens come from the token exchange (Luna) are listed once per agent id while they hold unexpired tokens.
   * 
   */
  'listOrganizationAgents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOrganizationAgents.Responses.$200>
  /**
   * revokeOrganizationAgent - revokeOrganizationAgent
   * 
   * epilot extension: ends an agent's access to the caller's organization. Deletes its grants approved for
   * the organization and revokes every token issued there; access in other organizations stays. For a
   * first-party agent id such as `luna` it revokes the exchanged tokens in the organization (new exchanges
   * still work for users with roles there).
   * 
   */
  'revokeOrganizationAgent'(
    parameters?: Parameters<Paths.V1AccessTokensAgentAuthAgents$AgentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeOrganizationAgent.Responses.$200>
  /**
   * exchangeAgentToken - exchangeAgentToken
   * 
   * epilot extension for first-party hosts: an epilot service acting for a logged-in user (the Agents API for
   * Luna) exchanges the user's login token (Authorization header) for a short-lived agent token, without a
   * device approval. `actor_token` is a host JWT (`typ: host+jwt`, `aud` = issuer) signed with a first-party
   * host key, published by the host as an SSM parameter under `/agent-auth/first-party-hosts/`.
   * 
   * The login token must be a person's Cognito ID token verified by the custom authorizer; a request that
   * reaches the handler without the authorizer's context is rejected. The token carries the user's current
   * roles and an `actor` claim naming the agent, the user and the run. It is never wider than the login token:
   * a read-only login token yields read-only tokens, an anonymized one only anonymized read tokens; a user
   * without roles in the organization is `403 capability_not_granted`. Read profiles live up to 1 hour
   * (default 15 minutes), write profiles up to 5 minutes. `actor_token` may live at most 120 seconds.
   * 
   */
  'exchangeAgentToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExchangeAgentToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExchangeAgentToken.Responses.$200>
  /**
   * registerFirstPartyAgent - registerFirstPartyAgent
   * 
   * epilot extension for first-party hosts: while a user is logged in, an epilot service (the Agents API)
   * registers an Agent Auth agent for them, without a device approval, and later mints tokens with the standard
   * `POST /capability/execute` (`epilot.access_token.issue`) using agent JWTs. No user token has to be kept for
   * background work. `actor_token` is a host JWT (`typ: host+jwt`, `aud` = issuer, unique `jti`) signed with a
   * first-party host key published in SSM under `/agent-auth/first-party-hosts/`; the Authorization header must be a person's login
   * token verified by the custom authorizer (as for the token exchange).
   * 
   * - `delegated`: a user's background run. The agent acts as the user; lifetime 60 s to 24 h.
   * - `autonomous`: an organization agent (e.g. a Flows agent). The caller must be allowed `token:create` in the
   *   organization and becomes the agent's owner; the agent acts with the owner's current roles. Lifetime 1 h to
   *   90 days; anonymized read access up to the absolute agent lifetime (365 days).
   * 
   * A `delegated` agent can be registered in another organization of the same person: `x-epilot-org-id` names
   * it. It must be an organization the user can log in to (`403 organization_mismatch` otherwise), and the agent
   * gets the roles the user holds there, never the login organization's (`403 capability_not_granted` when they
   * hold none). An `autonomous` agent is always registered in the login organization.
   * 
   * The agent is active at once, holds one `epilot.access_token.issue` grant for its organization with
   * `access_profile` as its ceiling, expires at `expires_at` (no idle clock, never reactivated) and is revoked
   * with `POST /agent/revoke` (host JWT), which also revokes its tokens. Tokens it issues live at most 1 hour
   * (read profiles, default 15 minutes) or 5 minutes (write profiles), and never past the agent's
   * `expires_at`. `actor_token` may live at most 120 seconds.
   * 
   */
  'registerFirstPartyAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterFirstPartyAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterFirstPartyAgent.Responses.$200>
  /**
   * registerPreviewOrgAgent - registerPreviewOrgAgent
   * 
   * epilot extension for first-party hosts: an epilot service (the Agents API, started by a backend workflow)
   * registers an **autonomous** agent in a **preview organization** while no person is logged in, e.g. for an
   * unattended Configuration Agent session. Same registration as `registerFirstPartyAgent` (`autonomous`), with
   * its own, narrower authorization. Every condition is checked server-side; a lookup that fails refuses the
   * registration (`403 forbidden`).
   * 
   * 1. **Caller.** The Authorization header is an internal-auth API token (issuer
   *    `https://internal-auth.<stage>.epilot.io/v1/internal-auth`) that the custom authorizer verified. A
   *    person's login token, an api / assume / portal / agent token or a locally signed
   *    `internal-auth-lambda-invoke` token is `403 invalid_subject_token`; a token the authorizer did not verify
   *    `401 invalid_jwt`.
   * 2. **Organization.** The token's `org_id` or the `x-ivy-org-id` header, never the body. Both present must agree
   *    (`403 organization_mismatch`; the security handler already refuses that combination on deployed stages with
   *    `401`); `x-epilot-org-id` must not name another organization (`403 organization_mismatch`); none is
   *    `400 invalid_request`.
   * 3. **Preview only.** The organization's `organization_use` (organization-api `GET /v2/organization/{org_id}`,
   *    called with the caller's token) is exactly `Preview`, else `403 forbidden`. **Exception: a named purpose.**
   *    With `purpose` set to an allowlisted value the organization may be any organization (still looked up, fail
   *    closed); today the only one is `blueprint-tests.suggest` (blueprint tests: an unattended Luna session reads
   *    the blueprint and submits its suggestions once), which requires `access_profile: config:write`. Such an
   *    agent keeps the purpose on its record (`registered_by.purpose`, listed as `service_purpose`) and its tokens
   *    never get the Configuration Hub actions of rule 7. Any other `purpose` is `403 constraint_violated`, never
   *    treated as no purpose. A purpose is usable only by the callers listed for it in the deployment setting
   *    `SERVICE_AGENT_PURPOSE_CALLERS` (IAM role ARNs, matched by account and role name against the caller's
   *    assumed-role identity); anyone else, or an unset or invalid setting, is `403 forbidden`, checked first. All
   *    other rules apply unchanged.
   * 4. **Owner.** `owner_user_id` is a user of the organization with `status: Active` (user-api
   *    `GET /v2/users/{id}`, the caller's token; pending, deactivated, deleted or unknown users are
   *    `403 forbidden`) holding at least one role there (permissions table, `403 capability_not_granted`
   *    otherwise). The agent is `autonomous` with that user as owner: its grant identity is the owner (id,
   *    organization, current role assignments, email), tokens re-read the owner's roles when issued, and the
   *    owner's deactivation or deletion revokes the agent.
   * 5. **Host.** `actor_token` is verified as for `registerFirstPartyAgent` (published first-party host key, `aud`,
   *    `jti` replay, at most 120 s); `agent_id` is a first-party agent id (`403 agent_not_found`).
   * 6. **Lifetime.** `expires_in` is 60 seconds to 12 hours (`400 invalid_request`).
   * 7. **Access profile ceiling.** Only `config:read` (default) and `config:write`: reading and changing the
   *    configuration of this organization. Any other profile is `403 constraint_violated`, and the agent's tokens
   *    can never be issued with another profile either (not even `read`). `anonymize: true` is `400 invalid_request`
   *    (anonymized grants are read-only); `mode`, if sent, must be `autonomous`.
   *    Configuration Hub: the agent's tokens (and only those of preview organization agents) also allow
   *    `configuration_hub:view` with `config:read`, and `configuration_hub:view` plus `configuration_hub:sync` with
   *    `config:write` (a `read_only: true` token: `view` only), on top of the profile's `allowed_actions`; never
   *    `configuration_hub:delete`. These actions are derived from the agent registration, not from the request, and
   *    still need the owner's roles to grant them. The `config:read` / `config:write` profiles of every other agent
   *    and token are unchanged.
   * 8. **Purpose and attribution.** `reason` is required (10–200 characters, trimmed; `400 invalid_request` or
   *    `400 reason_required`) and becomes the
   *    grant's purpose; the grant's `granted_by` is `epilot_service`, the agent keeps the token's caller identity,
   *    and the organization's agent list shows it with `registered_by: epilot_service` and its `owner`.
   * 9. **As every first-party registration.** The key must not be a host key, must be new (`409 agent_exists`);
   *    everything is written in one transaction with the retention TTL; `POST /agent/revoke` (host JWT) ends it
   *    with its tokens. Tokens it issues live at most 1 hour (read) or 5 minutes (write) and never past
   *    `expires_at`.
   * 
   */
  'registerPreviewOrgAgent'(
    parameters?: Parameters<Paths.RegisterPreviewOrgAgent.HeaderParameters> | null,
    data?: Paths.RegisterPreviewOrgAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterPreviewOrgAgent.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/access-tokens']: {
    /**
     * createAccessToken - createAccessToken
     * 
     * **Access Token type: `API`** (default if not specified):
     * 
     * Generates a new Access Token to use for calling epilot APIs.
     * 
     * Takes optionally a list of Roles assigned to the Access Token. Defaults to current user's assignments
     * 
     * See [Permissions API docs](https://docs.epilot.io/api/permissions)
     * 
     * **Access Token type: `JOURNEY`**:
     * 
     * Generates a Public Access Token related to a journey.
     * The journey id should be specfied.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAccessToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAccessToken.Responses.$201>
    /**
     * listAccessTokens - listAccessTokens
     * 
     * Lists all Access Tokens for current user (by default excludes system generated tokens)
     */
    'get'(
      parameters?: Parameters<Paths.ListAccessTokens.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAccessTokens.Responses.$200>
  }
  ['/v1/access-tokens/{id}']: {
    /**
     * revokeAccessToken - revokeAccessToken
     * 
     * Revokes an Access Token so it can't be used anymore.
     */
    'delete'(
      parameters?: Parameters<Paths.RevokeAccessToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeAccessToken.Responses.$200>
  }
  ['/v1/access-tokens/.well-known/jwks.json']: {
    /**
     * getAccessTokenJwks - getAccessTokenJwks
     * 
     * Get jwks public key set to verify access tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccessTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/.well-known/openid-configuration']: {
    /**
     * getAccessTokenOIDC - getAccessTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API as identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccessTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/public/.well-known/jwks.json']: {
    /**
     * getPublicTokenJwks - getPublicTokenJwks
     * 
     * Get jwks public key set to verify public tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/portal-preview/.well-known/jwks.json']: {
    /**
     * getPortalPreviewTokenJwks - getPortalPreviewTokenJwks
     * 
     * Get jwks public key set to verify portal preview tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalPreviewTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/public/.well-known/openid-configuration']: {
    /**
     * getPublicTokenOIDC - getPublicTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API a a public identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/portal-preview/.well-known/openid-configuration']: {
    /**
     * getPortalPreviewTokenOIDC - getPortalPreviewTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API a a portal preview identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalPreviewTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/contact-identification/.well-known/jwks.json']: {
    /**
     * getContactIdentificationTokenJwks - getContactIdentificationTokenJwks
     * 
     * Get jwks public key set to verify contact identification tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContactIdentificationTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/contact-identification/.well-known/openid-configuration']: {
    /**
     * getContactIdentificationTokenOIDC - getContactIdentificationTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API as a contact identification identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContactIdentificationTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/.well-known/agent-configuration']: {
    /**
     * getAgentConfiguration - getAgentConfiguration
     * 
     * Agent Auth Protocol discovery document (spec §5.1). Cached for one hour.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentConfiguration.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/.well-known/jwks.json']: {
    /**
     * getAgentAuthJwks - getAgentAuthJwks
     * 
     * JWKS to verify the epilot access tokens issued through `epilot.access_token.issue` (alias of the Access Token JWKS)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentAuthJwks.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/capability/list']: {
    /**
     * listCapabilities - listCapabilities
     * 
     * Lists the capability catalogue (spec §5.2). Optional host or agent JWT; with an agent JWT each
     * capability carries `grant_status`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListCapabilities.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCapabilities.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/capability/describe']: {
    /**
     * describeCapability - describeCapability
     * 
     * Describes one capability incl. input / output JSON Schema (spec §5.2)
     */
    'get'(
      parameters?: Parameters<Paths.DescribeCapability.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DescribeCapability.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/register']: {
    /**
     * registerAgent - registerAgent
     * 
     * Registers an agent under a host (spec §5.3). Authenticated with a host JWT (`typ: host+jwt`) carrying
     * `host_public_key` and `agent_public_key`. Unknown hosts are created `pending` and linked to the approving
     * user on the first approval. Idempotent on host + agent key while the agent is `pending`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/status']: {
    /**
     * getAgentStatus - getAgentStatus
     * 
     * Full agent state incl. grants; host JWT of the owning host (spec §5.5)
     */
    'get'(
      parameters?: Parameters<Paths.GetAgentStatus.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentStatus.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/request-capability']: {
    /**
     * requestCapability - requestCapability
     * 
     * Asks the user for additional grants (spec §5.4), e.g. access to another organization or write access.
     * Agent JWT (`aud` = issuer). Returns only the newly created pending grants plus an approval object.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequestCapability.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestCapability.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/reactivate']: {
    /**
     * reactivateAgent - reactivateAgent
     * 
     * Reactivates an `expired` agent within its absolute lifetime; old grants are revoked and host default capabilities re-granted (spec §5.6)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ReactivateAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReactivateAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/revoke']: {
    /**
     * revokeAgent - revokeAgent
     * 
     * Revokes an agent permanently and deletes the epilot access tokens it obtained (spec §5.7)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RevokeAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/rotate-key']: {
    /**
     * rotateAgentKey - rotateAgentKey
     * 
     * Replaces the agent's Ed25519 public key (spec §5.8)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RotateAgentKey.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RotateAgentKey.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/host/rotate-key']: {
    /**
     * rotateHostKey - rotateHostKey
     * 
     * Replaces the host's Ed25519 key (spec §5.9). The host id is the key thumbprint, so the response carries the
     * new `host_id`; agents move to the new host id and keep working with `iss` = new thumbprint.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RotateHostKey.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RotateHostKey.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/host/revoke']: {
    /**
     * revokeHost - revokeHost
     * 
     * Revokes the host and cascades to all its agents and their epilot access tokens (spec §5.10)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeHost.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/capability/execute']: {
    /**
     * executeCapability - executeCapability
     * 
     * Executes a capability (spec §5.11). Agent JWT with `aud` = this URL. Synchronous: `{ data }`.
     * 
     * - `epilot.organizations.list` → `{ organizations: [{ organization_id, organization_name, ..., access }] }`
     * - `epilot.access_token.issue` `{ organization_id, access_profile?, read_only?, anonymize?, expires_in? }` →
     *   `{ token, token_id, access_profile, read_only, anonymize, allowed_actions?, ... }`. `access_profile` defaults from
     *   the matched grant; only the grant profile or one of its downgrades may be requested (`403 constraint_violated`).
     *   The token never outlives the grant or the agent: `expires_in` is capped at what is left of both, and less
     *   than 30 seconds left is `403 capability_not_granted` (grant) or `403 agent_expired` (agent). This applies
     *   to first-party agents always and to the others when the `agent-auth-hardening` flag is on for the
     *   organization (doc/agent-auth.md "Flags").
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExecuteCapability.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteCapability.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agent/introspect']: {
    /**
     * introspectAgent - introspectAgent
     * 
     * Validates an agent JWT and returns its compact state (spec §5.12). Requires an epilot bearer token; rate limited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.IntrospectAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IntrospectAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/approvals/{user_code}']: {
    /**
     * getAgentApproval - getAgentApproval
     * 
     * epilot extension for the epilot 360 login approval page: what the agent is asking for.
     * Public, rate limited per source IP.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1AccessTokensAgentAuthApprovals$UserCode.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentApproval.Responses.$200>
    /**
     * decideAgentApproval - decideAgentApproval
     * 
     * epilot extension: approve or deny the pending grants of a device authorization with an epilot login token.
     * Approved grants are scoped to the login organization; `read_only` / `anonymize` may only be tightened and
     * `access_profile` only downgraded (`400 constraint_widened`). `read_only: true` on a write profile rewrites it to
     * its read sibling (`full` → `read`); `anonymize: true` is only accepted with read profiles
     * (`400 anonymize_requires_read_only`). Escalation grants (any profile but `read`) receive an `expires_at`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1AccessTokensAgentAuthApprovals$UserCode.PathParameters> | null,
      data?: Paths.DecideAgentApproval.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DecideAgentApproval.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agents']: {
    /**
     * listOrganizationAgents - listOrganizationAgents
     * 
     * epilot extension for the Access Tokens settings: the AI agents with access to the caller's organization,
     * with the users who approved them, their purpose and the tokens they hold there. First-party agents whose
     * tokens come from the token exchange (Luna) are listed once per agent id while they hold unexpired tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOrganizationAgents.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/agents/{agent_id}']: {
    /**
     * revokeOrganizationAgent - revokeOrganizationAgent
     * 
     * epilot extension: ends an agent's access to the caller's organization. Deletes its grants approved for
     * the organization and revokes every token issued there; access in other organizations stays. For a
     * first-party agent id such as `luna` it revokes the exchanged tokens in the organization (new exchanges
     * still work for users with roles there).
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1AccessTokensAgentAuthAgents$AgentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeOrganizationAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/token-exchange']: {
    /**
     * exchangeAgentToken - exchangeAgentToken
     * 
     * epilot extension for first-party hosts: an epilot service acting for a logged-in user (the Agents API for
     * Luna) exchanges the user's login token (Authorization header) for a short-lived agent token, without a
     * device approval. `actor_token` is a host JWT (`typ: host+jwt`, `aud` = issuer) signed with a first-party
     * host key, published by the host as an SSM parameter under `/agent-auth/first-party-hosts/`.
     * 
     * The login token must be a person's Cognito ID token verified by the custom authorizer; a request that
     * reaches the handler without the authorizer's context is rejected. The token carries the user's current
     * roles and an `actor` claim naming the agent, the user and the run. It is never wider than the login token:
     * a read-only login token yields read-only tokens, an anonymized one only anonymized read tokens; a user
     * without roles in the organization is `403 capability_not_granted`. Read profiles live up to 1 hour
     * (default 15 minutes), write profiles up to 5 minutes. `actor_token` may live at most 120 seconds.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExchangeAgentToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExchangeAgentToken.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/first-party/agents']: {
    /**
     * registerFirstPartyAgent - registerFirstPartyAgent
     * 
     * epilot extension for first-party hosts: while a user is logged in, an epilot service (the Agents API)
     * registers an Agent Auth agent for them, without a device approval, and later mints tokens with the standard
     * `POST /capability/execute` (`epilot.access_token.issue`) using agent JWTs. No user token has to be kept for
     * background work. `actor_token` is a host JWT (`typ: host+jwt`, `aud` = issuer, unique `jti`) signed with a
     * first-party host key published in SSM under `/agent-auth/first-party-hosts/`; the Authorization header must be a person's login
     * token verified by the custom authorizer (as for the token exchange).
     * 
     * - `delegated`: a user's background run. The agent acts as the user; lifetime 60 s to 24 h.
     * - `autonomous`: an organization agent (e.g. a Flows agent). The caller must be allowed `token:create` in the
     *   organization and becomes the agent's owner; the agent acts with the owner's current roles. Lifetime 1 h to
     *   90 days; anonymized read access up to the absolute agent lifetime (365 days).
     * 
     * A `delegated` agent can be registered in another organization of the same person: `x-epilot-org-id` names
     * it. It must be an organization the user can log in to (`403 organization_mismatch` otherwise), and the agent
     * gets the roles the user holds there, never the login organization's (`403 capability_not_granted` when they
     * hold none). An `autonomous` agent is always registered in the login organization.
     * 
     * The agent is active at once, holds one `epilot.access_token.issue` grant for its organization with
     * `access_profile` as its ceiling, expires at `expires_at` (no idle clock, never reactivated) and is revoked
     * with `POST /agent/revoke` (host JWT), which also revokes its tokens. Tokens it issues live at most 1 hour
     * (read profiles, default 15 minutes) or 5 minutes (write profiles), and never past the agent's
     * `expires_at`. `actor_token` may live at most 120 seconds.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterFirstPartyAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterFirstPartyAgent.Responses.$200>
  }
  ['/v1/access-tokens/agent-auth/first-party/preview-agents']: {
    /**
     * registerPreviewOrgAgent - registerPreviewOrgAgent
     * 
     * epilot extension for first-party hosts: an epilot service (the Agents API, started by a backend workflow)
     * registers an **autonomous** agent in a **preview organization** while no person is logged in, e.g. for an
     * unattended Configuration Agent session. Same registration as `registerFirstPartyAgent` (`autonomous`), with
     * its own, narrower authorization. Every condition is checked server-side; a lookup that fails refuses the
     * registration (`403 forbidden`).
     * 
     * 1. **Caller.** The Authorization header is an internal-auth API token (issuer
     *    `https://internal-auth.<stage>.epilot.io/v1/internal-auth`) that the custom authorizer verified. A
     *    person's login token, an api / assume / portal / agent token or a locally signed
     *    `internal-auth-lambda-invoke` token is `403 invalid_subject_token`; a token the authorizer did not verify
     *    `401 invalid_jwt`.
     * 2. **Organization.** The token's `org_id` or the `x-ivy-org-id` header, never the body. Both present must agree
     *    (`403 organization_mismatch`; the security handler already refuses that combination on deployed stages with
     *    `401`); `x-epilot-org-id` must not name another organization (`403 organization_mismatch`); none is
     *    `400 invalid_request`.
     * 3. **Preview only.** The organization's `organization_use` (organization-api `GET /v2/organization/{org_id}`,
     *    called with the caller's token) is exactly `Preview`, else `403 forbidden`. **Exception: a named purpose.**
     *    With `purpose` set to an allowlisted value the organization may be any organization (still looked up, fail
     *    closed); today the only one is `blueprint-tests.suggest` (blueprint tests: an unattended Luna session reads
     *    the blueprint and submits its suggestions once), which requires `access_profile: config:write`. Such an
     *    agent keeps the purpose on its record (`registered_by.purpose`, listed as `service_purpose`) and its tokens
     *    never get the Configuration Hub actions of rule 7. Any other `purpose` is `403 constraint_violated`, never
     *    treated as no purpose. A purpose is usable only by the callers listed for it in the deployment setting
     *    `SERVICE_AGENT_PURPOSE_CALLERS` (IAM role ARNs, matched by account and role name against the caller's
     *    assumed-role identity); anyone else, or an unset or invalid setting, is `403 forbidden`, checked first. All
     *    other rules apply unchanged.
     * 4. **Owner.** `owner_user_id` is a user of the organization with `status: Active` (user-api
     *    `GET /v2/users/{id}`, the caller's token; pending, deactivated, deleted or unknown users are
     *    `403 forbidden`) holding at least one role there (permissions table, `403 capability_not_granted`
     *    otherwise). The agent is `autonomous` with that user as owner: its grant identity is the owner (id,
     *    organization, current role assignments, email), tokens re-read the owner's roles when issued, and the
     *    owner's deactivation or deletion revokes the agent.
     * 5. **Host.** `actor_token` is verified as for `registerFirstPartyAgent` (published first-party host key, `aud`,
     *    `jti` replay, at most 120 s); `agent_id` is a first-party agent id (`403 agent_not_found`).
     * 6. **Lifetime.** `expires_in` is 60 seconds to 12 hours (`400 invalid_request`).
     * 7. **Access profile ceiling.** Only `config:read` (default) and `config:write`: reading and changing the
     *    configuration of this organization. Any other profile is `403 constraint_violated`, and the agent's tokens
     *    can never be issued with another profile either (not even `read`). `anonymize: true` is `400 invalid_request`
     *    (anonymized grants are read-only); `mode`, if sent, must be `autonomous`.
     *    Configuration Hub: the agent's tokens (and only those of preview organization agents) also allow
     *    `configuration_hub:view` with `config:read`, and `configuration_hub:view` plus `configuration_hub:sync` with
     *    `config:write` (a `read_only: true` token: `view` only), on top of the profile's `allowed_actions`; never
     *    `configuration_hub:delete`. These actions are derived from the agent registration, not from the request, and
     *    still need the owner's roles to grant them. The `config:read` / `config:write` profiles of every other agent
     *    and token are unchanged.
     * 8. **Purpose and attribution.** `reason` is required (10–200 characters, trimmed; `400 invalid_request` or
     *    `400 reason_required`) and becomes the
     *    grant's purpose; the grant's `granted_by` is `epilot_service`, the agent keeps the token's caller identity,
     *    and the organization's agent list shows it with `registered_by: epilot_service` and its `owner`.
     * 9. **As every first-party registration.** The key must not be a host key, must be new (`409 agent_exists`);
     *    everything is written in one transaction with the retention TTL; `POST /agent/revoke` (host JWT) ends it
     *    with its tokens. Tokens it issues live at most 1 hour (read) or 5 minutes (write) and never past
     *    `expires_at`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RegisterPreviewOrgAgent.HeaderParameters> | null,
      data?: Paths.RegisterPreviewOrgAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterPreviewOrgAgent.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AccessProfile = Components.Schemas.AccessProfile;
export type AccessToken = Components.Schemas.AccessToken;
export type AccessTokenId = Components.Schemas.AccessTokenId;
export type AccessTokenItem = Components.Schemas.AccessTokenItem;
export type AccessTokenJourneyId = Components.Schemas.AccessTokenJourneyId;
export type AccessTokenName = Components.Schemas.AccessTokenName;
export type AccessTokenParameters = Components.Schemas.AccessTokenParameters;
export type AccessTokenType = Components.Schemas.AccessTokenType;
export type AgentApproval = Components.Schemas.AgentApproval;
export type AgentApprovalDecision = Components.Schemas.AgentApprovalDecision;
export type AgentAuthError = Components.Schemas.AgentAuthError;
export type AgentConfiguration = Components.Schemas.AgentConfiguration;
export type AgentIdRequest = Components.Schemas.AgentIdRequest;
export type AgentMode = Components.Schemas.AgentMode;
export type AgentStatus = Components.Schemas.AgentStatus;
export type AgentStatusResponse = Components.Schemas.AgentStatusResponse;
export type AllowedOperations = Components.Schemas.AllowedOperations;
export type Anonymize = Components.Schemas.Anonymize;
export type AppTokenParameters = Components.Schemas.AppTokenParameters;
export type Assignments = Components.Schemas.Assignments;
export type AssumeTokenParameters = Components.Schemas.AssumeTokenParameters;
export type Capability = Components.Schemas.Capability;
export type CapabilityGrant = Components.Schemas.CapabilityGrant;
export type CapabilityRequest = Components.Schemas.CapabilityRequest;
export type Constraints = Components.Schemas.Constraints;
export type ContactId = Components.Schemas.ContactId;
export type ContactIdentificationTokenParameters = Components.Schemas.ContactIdentificationTokenParameters;
export type DeviceAuthorizationApproval = Components.Schemas.DeviceAuthorizationApproval;
export type Ed25519PublicKey = Components.Schemas.Ed25519PublicKey;
export type ExpiresIn = Components.Schemas.ExpiresIn;
export type GrantStatus = Components.Schemas.GrantStatus;
export type IssuedAgentToken = Components.Schemas.IssuedAgentToken;
export type JourneyTokenParameters = Components.Schemas.JourneyTokenParameters;
export type OrganizationAgent = Components.Schemas.OrganizationAgent;
export type PortalId = Components.Schemas.PortalId;
export type PortalPreviewTokenParameters = Components.Schemas.PortalPreviewTokenParameters;
export type PortalTokenParameters = Components.Schemas.PortalTokenParameters;
export type PortalUserId = Components.Schemas.PortalUserId;
export type ProfileOption = Components.Schemas.ProfileOption;
export type ReadOnly = Components.Schemas.ReadOnly;
export type RegisterAgentRequest = Components.Schemas.RegisterAgentRequest;
export type RegisterAgentResponse = Components.Schemas.RegisterAgentResponse;
export type RequestCapabilityRequest = Components.Schemas.RequestCapabilityRequest;
export type RequestCapabilityResponse = Components.Schemas.RequestCapabilityResponse;
export type RoleId = Components.Schemas.RoleId;
export type TokenParameters = Components.Schemas.TokenParameters;
