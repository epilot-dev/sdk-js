import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export interface AnyOtherQueryParameters {
            [name: string]: any;
        }
        export type ClientIdPath = /**
         * Opaque client identifier, unique within the issuer, never reused
         * example:
         * bf-prod-x7k2
         */
        Schemas.PartnerClientId /* ^[A-Za-z0-9._~-]+$ */;
        export type ClientStatusQuery = Schemas.PartnerClientStatus;
        export type CursorQuery = string;
        export type OrgEnablementStatusQuery = Schemas.OrgEnablementStatus;
        export type OrgIdPath = /**
         * epilot organization id, an opaque case-sensitive string
         * example:
         * 739224
         */
        Schemas.OrgId /* ^[A-Za-z0-9_-]+$ */;
        export type PartnerKeyQuery = string;
        export type SizeQuery = number;
    }
    export interface PathParameters {
        ClientIdPath?: Parameters.ClientIdPath;
        OrgIdPath?: Parameters.OrgIdPath;
    }
    export interface QueryParameters {
        AnyOtherQueryParameters?: Parameters.AnyOtherQueryParameters;
        PartnerKeyQuery?: Parameters.PartnerKeyQuery;
        ClientStatusQuery?: Parameters.ClientStatusQuery;
        OrgEnablementStatusQuery?: Parameters.OrgEnablementStatusQuery;
        SizeQuery?: Parameters.SizeQuery;
        CursorQuery?: Parameters.CursorQuery;
    }
    namespace Responses {
        export type BadRequest = Schemas.Error;
        export type Conflict = Schemas.Error;
        export type Forbidden = Schemas.Error;
        export type NotFound = Schemas.Error;
        export type Unauthorized = Schemas.Error;
    }
    namespace Schemas {
        export interface AuthorizationPolicy {
            mode?: "preauthorized";
            population?: "all_current_org_members";
            /**
             * Must contain `openid` and be a subset of the client's `scopes_allowed`
             */
            allowed_scopes: [
                Scope,
                ...Scope[]
            ];
            /**
             * Reference to the customer's approval evidence (ticket, signed order, contract clause)
             */
            customer_approval_ref: string;
            approved_at: string; // date-time
            version: number;
            mandatory_claims: ("org_id")[];
            recorded_by: string;
            recorded_at: string; // date-time
        }
        export interface AuthorizationPolicyInput {
            mode?: "preauthorized";
            population?: "all_current_org_members";
            /**
             * Must contain `openid` and be a subset of the client's `scopes_allowed`
             */
            allowed_scopes: [
                Scope,
                ...Scope[]
            ];
            /**
             * Reference to the customer's approval evidence (ticket, signed order, contract clause)
             */
            customer_approval_ref: string;
            approved_at: string; // date-time
        }
        /**
         * Partner-side environment this client belongs to
         */
        export type Environment = "dev" | "staging" | "production";
        export interface Error {
            /**
             * example:
             * 404
             */
            status: number;
            /**
             * example:
             * Client not found
             */
            error: string;
            /**
             * Request validation problems (only on `400` from schema validation)
             */
            details?: {
                [name: string]: any;
            }[];
        }
        /**
         * Absolute HTTPS URL without fragment
         * example:
         * https://partner.example.com/auth/callback
         */
        export type HttpsUri = string; // uri
        export interface IdentitySession {
            org_id: /**
             * epilot organization id, an opaque case-sensitive string
             * example:
             * 739224
             */
            OrgId /* ^[A-Za-z0-9_-]+$ */;
            /**
             * epilot user id of the session owner
             */
            user_id: string;
            /**
             * When the mirrored credential, and therefore the cookie, expires
             */
            expires_at: string; // date-time
        }
        export interface OrgEnablement {
            client_id: /**
             * Opaque client identifier, unique within the issuer, never reused
             * example:
             * bf-prod-x7k2
             */
            PartnerClientId /* ^[A-Za-z0-9._~-]+$ */;
            org_id: /**
             * epilot organization id, an opaque case-sensitive string
             * example:
             * 739224
             */
            OrgId /* ^[A-Za-z0-9_-]+$ */;
            status: OrgEnablementStatus;
            status_reason?: string;
            authorization_policy: AuthorizationPolicy;
            partner_account?: /* Optional audit reference to the partner tenant this organization maps to. The partner enforces the mapping. */ PartnerAccount;
            created_at: string; // date-time
            updated_at: string; // date-time
            created_by?: string;
            updated_by?: string;
        }
        export interface OrgEnablementCreate {
            org_id: /**
             * epilot organization id, an opaque case-sensitive string
             * example:
             * 739224
             */
            OrgId /* ^[A-Za-z0-9_-]+$ */;
            authorization_policy: AuthorizationPolicyInput;
            partner_account?: /* Optional audit reference to the partner tenant this organization maps to. The partner enforces the mapping. */ PartnerAccount;
        }
        export interface OrgEnablementList {
            results: OrgEnablement[];
        }
        export type OrgEnablementStatus = "active" | "suspended" | "revoked";
        export interface OrgEnablementUpdate {
            /**
             * Current policy version, for compare-and-swap
             */
            expected_policy_version: number;
            authorization_policy: AuthorizationPolicyInput;
            partner_account?: /* Optional audit reference to the partner tenant this organization maps to. The partner enforces the mapping. */ PartnerAccount;
        }
        /**
         * epilot organization id, an opaque case-sensitive string
         * example:
         * 739224
         */
        export type OrgId = string; // ^[A-Za-z0-9_-]+$
        /**
         * Optional audit reference to the partner tenant this organization maps to. The partner enforces the mapping.
         */
        export interface PartnerAccount {
            id: string;
            label?: string;
        }
        export interface PartnerClient {
            client_id: /**
             * Opaque client identifier, unique within the issuer, never reused
             * example:
             * bf-prod-x7k2
             */
            PartnerClientId /* ^[A-Za-z0-9._~-]+$ */;
            partner_key: string;
            display_name: string;
            description?: string;
            environment: /* Partner-side environment this client belongs to */ Environment;
            redirect_uris: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */[];
            sector_identifier_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            initiate_login_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            launch_target_prefixes?: string[];
            token_endpoint_auth_method: "client_secret_basic";
            grant_types: ("authorization_code")[];
            scopes_allowed: Scope[];
            status: PartnerClientStatus;
            /**
             * Operator-supplied reason for the last suspension or retirement
             */
            status_reason?: string;
            config_version: number;
            secret_rotated_at?: string; // date-time
            /**
             * Until when the previous secret still authenticates after a rotation
             */
            previous_secret_expires_at?: string; // date-time
            created_at: string; // date-time
            updated_at: string; // date-time
            /**
             * Admin-portal identity of the operator who created the client
             */
            created_by?: string;
            updated_by?: string;
        }
        export interface PartnerClientCreate {
            /**
             * Stable key of the partner application, shared by its environments
             * example:
             * babelforce
             */
            partner_key: string; // ^[a-z0-9][a-z0-9-]*$
            /**
             * example:
             * Babelforce
             */
            display_name: string;
            description?: string;
            environment: /* Partner-side environment this client belongs to */ Environment;
            redirect_uris: [
                /**
                 * Absolute HTTPS URL without fragment
                 * example:
                 * https://partner.example.com/auth/callback
                 */
                HttpsUri /* uri */,
                .../**
                 * Absolute HTTPS URL without fragment
                 * example:
                 * https://partner.example.com/auth/callback
                 */
                HttpsUri /* uri */[]
            ];
            /**
             * Optional. Pairwise sector for `sub` derivation. Required when the redirect URIs span
             * more than one host, so one person keeps one `sub` at this partner.
             *
             * example:
             * https://partner.example.com/auth/callback
             */
            sector_identifier_uri?: string; // uri
            /**
             * Where a login started from epilot should begin at the partner
             * example:
             * https://partner.example.com/auth/callback
             */
            initiate_login_uri?: string; // uri
            /**
             * Allowed prefixes for deep-link targets when a login is started from epilot
             */
            launch_target_prefixes?: string[];
            /**
             * Upper bound for every organization enablement's `allowed_scopes`. Defaults to all scopes.
             */
            scopes_allowed?: [
                Scope,
                ...Scope[]
            ];
        }
        /**
         * Opaque client identifier, unique within the issuer, never reused
         * example:
         * bf-prod-x7k2
         */
        export type PartnerClientId = string; // ^[A-Za-z0-9._~-]+$
        export interface PartnerClientList {
            results: PartnerClient[];
            next_cursor?: string | null;
        }
        export type PartnerClientStatus = "draft" | "active" | "suspended" | "retired";
        export interface PartnerClientUpdate {
            /**
             * Current configuration version, for compare-and-swap
             */
            config_version: number;
            /**
             * Required (true) when the update changes the pairwise sector of an **active** client, i.e. the
             * `sector_identifier_uri` host or, without one, the redirect host. Changing the sector changes the
             * `sub` of every person at this partner; without this flag such an update is rejected with `409`.
             *
             */
            allow_sector_change?: boolean;
            display_name: string;
            description?: string;
            redirect_uris: [
                /**
                 * Absolute HTTPS URL without fragment
                 * example:
                 * https://partner.example.com/auth/callback
                 */
                HttpsUri /* uri */,
                .../**
                 * Absolute HTTPS URL without fragment
                 * example:
                 * https://partner.example.com/auth/callback
                 */
                HttpsUri /* uri */[]
            ];
            sector_identifier_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            initiate_login_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            launch_target_prefixes?: string[];
            scopes_allowed: [
                Scope,
                ...Scope[]
            ];
        }
        export interface PartnerClientWithSecret {
            client_id: /**
             * Opaque client identifier, unique within the issuer, never reused
             * example:
             * bf-prod-x7k2
             */
            PartnerClientId /* ^[A-Za-z0-9._~-]+$ */;
            partner_key: string;
            display_name: string;
            description?: string;
            environment: /* Partner-side environment this client belongs to */ Environment;
            redirect_uris: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */[];
            sector_identifier_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            initiate_login_uri?: /**
             * Absolute HTTPS URL without fragment
             * example:
             * https://partner.example.com/auth/callback
             */
            HttpsUri /* uri */;
            launch_target_prefixes?: string[];
            token_endpoint_auth_method: "client_secret_basic";
            grant_types: ("authorization_code")[];
            scopes_allowed: Scope[];
            status: PartnerClientStatus;
            /**
             * Operator-supplied reason for the last suspension or retirement
             */
            status_reason?: string;
            config_version: number;
            secret_rotated_at?: string; // date-time
            /**
             * Until when the previous secret still authenticates after a rotation
             */
            previous_secret_expires_at?: string; // date-time
            created_at: string; // date-time
            updated_at: string; // date-time
            /**
             * Admin-portal identity of the operator who created the client
             */
            created_by?: string;
            updated_by?: string;
            /**
             * Returned exactly once. Store it securely; it cannot be retrieved again.
             */
            client_secret: string;
        }
        export interface RotateSecretRequest {
            /**
             * When true the previous secret stops working immediately
             */
            compromise_mode?: boolean;
            /**
             * How long the previous secret keeps working (ignored in compromise mode)
             */
            migration_window_seconds?: number;
        }
        export type Scope = "openid" | "email" | "profile";
        export interface StatusChangeRequest {
            reason?: string;
        }
    }
}
declare namespace Paths {
    namespace ActivateClient {
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClient;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace ActivateClientOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablement;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace CreateClient {
        export type RequestBody = Components.Schemas.PartnerClientCreate;
        namespace Responses {
            export type $201 = Components.Schemas.PartnerClientWithSecret;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace CreateIdentitySession {
        namespace Responses {
            export type $200 = Components.Schemas.IdentitySession;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace DeleteIdentitySession {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace EnableClientOrganization {
        export type RequestBody = Components.Schemas.OrgEnablementCreate;
        namespace Responses {
            export type $201 = Components.Schemas.OrgEnablement;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace GetClient {
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClient;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetClientOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablement;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace LaunchClient {
        namespace Parameters {
            export interface Extra {
                [name: string]: any;
            }
            export type Target = string; // uri
        }
        export interface QueryParameters {
            target?: Parameters.Target /* uri */;
            extra?: Parameters.Extra;
        }
        namespace Responses {
            export interface $302 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListClientOrganizations {
        namespace Parameters {
            export type Status = Components.Schemas.OrgEnablementStatus;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablementList;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListClients {
        namespace Parameters {
            export type Cursor = string;
            export type PartnerKey = string;
            export type Size = number;
            export type Status = Components.Schemas.PartnerClientStatus;
        }
        export interface QueryParameters {
            partner_key?: Parameters.PartnerKey;
            status?: Parameters.Status;
            size?: Parameters.Size;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClientList;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace RetireClient {
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClient;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace RevokeClientOrganization {
        export type RequestBody = Components.Schemas.StatusChangeRequest;
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablement;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace RotateClientSecret {
        export type RequestBody = Components.Schemas.RotateSecretRequest;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClientWithSecret;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace SuspendClient {
        export type RequestBody = Components.Schemas.StatusChangeRequest;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClient;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace SuspendClientOrganization {
        export type RequestBody = Components.Schemas.StatusChangeRequest;
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablement;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace UpdateClient {
        export type RequestBody = Components.Schemas.PartnerClientUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerClient;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace UpdateClientOrganization {
        export type RequestBody = Components.Schemas.OrgEnablementUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.OrgEnablement;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
        }
    }
    namespace V1IdentityInteraction$InteractionId {
        namespace Parameters {
            export type InteractionId = string;
        }
        export interface PathParameters {
            interaction_id: Parameters.InteractionId;
        }
    }
    namespace V1IdentityLaunch$ClientId {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientId {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdActivate {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdOrganizations {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdOrganizations$OrgId {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
            export type $1 = Components.Parameters.OrgIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdOrganizations$OrgIdActivate {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
            export type $1 = Components.Parameters.OrgIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdOrganizations$OrgIdSuspend {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
            export type $1 = Components.Parameters.OrgIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdRotateSecret {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
    namespace V1IdentityOperatorClients$ClientIdSuspend {
        namespace Parameters {
            export type $0 = Components.Parameters.ClientIdPath;
        }
    }
}


export interface OperationMethods {
  /**
   * listClients - listClients
   * 
   * List registered partner clients. The client secret is never returned.
   */
  'listClients'(
    parameters?: Parameters<Paths.ListClients.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListClients.Responses.$200>
  /**
   * createClient - createClient
   * 
   * Create a partner client in `draft` status. The client secret is returned exactly once in this
   * response and can never be read again; use `rotateClientSecret` to obtain a new one.
   * 
   */
  'createClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClient.Responses.$201>
  /**
   * getClient - getClient
   * 
   * Read a partner client. The client secret is never returned.
   */
  'getClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClient.Responses.$200>
  /**
   * updateClient - updateClient
   * 
   * Replace the mutable configuration of a client. `config_version` must equal the current
   * version (compare-and-swap); a mismatch is rejected with `409`.
   * 
   */
  'updateClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateClient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClient.Responses.$200>
  /**
   * retireClient - retireClient
   * 
   * Retire a client. The record is kept as a tombstone, the `client_id` is never reused, every
   * organization enablement is revoked and all provider-side artefacts are revoked.
   * 
   */
  'retireClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetireClient.Responses.$200>
  /**
   * activateClient - activateClient
   * 
   * Activate a `draft` or `suspended` client. Validates that every redirect URI is an absolute
   * HTTPS URL without fragment, that `scopes_allowed` contains `openid`, and that the
   * authentication method is `client_secret_basic`.
   * 
   */
  'activateClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateClient.Responses.$200>
  /**
   * suspendClient - suspendClient
   * 
   * Immediately block the client for every organization. Provider-side artefacts (codes, tokens,
   * grants) are revoked; the audit trail is kept. Reversible with `activateClient`.
   * 
   */
  'suspendClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SuspendClient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SuspendClient.Responses.$200>
  /**
   * rotateClientSecret - rotateClientSecret
   * 
   * Issue a new client secret. The new secret is returned exactly once. The previous secret
   * keeps working until `previous_secret_expires_at` unless `compromise_mode` is set, in which
   * case it stops working immediately.
   * 
   */
  'rotateClientSecret'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RotateClientSecret.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RotateClientSecret.Responses.$200>
  /**
   * listClientOrganizations - listClientOrganizations
   * 
   * List the organizations enabled on a client, including suspended and revoked ones.
   */
  'listClientOrganizations'(
    parameters?: Parameters<Paths.ListClientOrganizations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListClientOrganizations.Responses.$200>
  /**
   * enableClientOrganization - enableClientOrganization
   * 
   * Enable an epilot organization on a client, recording the customer's authorization policy
   * (version 1). `allowed_scopes` must contain `openid` and be a subset of the client's
   * `scopes_allowed`.
   * 
   */
  'enableClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.EnableClientOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EnableClientOrganization.Responses.$201>
  /**
   * getClientOrganization - getClientOrganization
   * 
   * Read one organization enablement.
   */
  'getClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClientOrganization.Responses.$200>
  /**
   * updateClientOrganization - updateClientOrganization
   * 
   * Record a new version of the customer's authorization policy. `expected_policy_version` must
   * equal the current version (compare-and-swap); a mismatch is rejected with `409`.
   * 
   */
  'updateClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateClientOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClientOrganization.Responses.$200>
  /**
   * revokeClientOrganization - revokeClientOrganization
   * 
   * Revoke an organization's enablement. The record is kept as an audited tombstone; future
   * authorizations for this organization fail with `access_denied` and provider-side artefacts
   * bound to it are revoked.
   * 
   */
  'revokeClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RevokeClientOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeClientOrganization.Responses.$200>
  /**
   * suspendClientOrganization - suspendClientOrganization
   * 
   * Temporarily block one organization on this client. Reversible with `activateClientOrganization`.
   */
  'suspendClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SuspendClientOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SuspendClientOrganization.Responses.$200>
  /**
   * activateClientOrganization - activateClientOrganization
   * 
   * Resume a suspended organization on this client. Revoked enablements cannot be re-activated; enabling the organization again (`POST …/organizations`) replaces the revoked entry and continues its policy version.
   */
  'activateClientOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateClientOrganization.Responses.$200>
  /**
   * createIdentitySession - createIdentitySession
   * 
   * Called by the epilot portal through the portal-host proxy after every persisted 360 session.
   * Validates the 360 bearer token itself and mirrors it into the `identity_session` cookie
   * (`HttpOnly; Secure; Path=/v1/identity`) whose lifetime equals the remaining token lifetime.
   * The cookie is what proves the live 360 session during `completeInteraction`.
   * 
   */
  'createIdentitySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateIdentitySession.Responses.$200>
  /**
   * deleteIdentitySession - deleteIdentitySession
   * 
   * Clears the `identity_session` cookie. Called by the portal on logout.
   */
  'deleteIdentitySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIdentitySession.Responses.$204>
  /**
   * launchClient - launchClient
   * 
   * One validated place for partner start links (manager UI, hosted apps). Redirects the browser to the
   * client's registered `initiate_login_uri` with `iss` set to this issuer and, when given, the deep link as
   * `target_link_uri` (OpenID Connect Core §4, third-party initiated login). Authenticates nobody: the partner
   * then starts a normal "Sign in with epilot" authorization.
   * 
   * `target` must be an absolute HTTPS URL starting with one of the client's registered
   * `launch_target_prefixes`; anything else is rejected. Retired, suspended or draft clients, and clients
   * without an `initiate_login_uri`, answer `404`.
   * 
   */
  'launchClient'(
    parameters?: Parameters<Paths.LaunchClient.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
}

export interface PathsDictionary {
  ['/v1/identity/operator/clients']: {
    /**
     * listClients - listClients
     * 
     * List registered partner clients. The client secret is never returned.
     */
    'get'(
      parameters?: Parameters<Paths.ListClients.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListClients.Responses.$200>
    /**
     * createClient - createClient
     * 
     * Create a partner client in `draft` status. The client secret is returned exactly once in this
     * response and can never be read again; use `rotateClientSecret` to obtain a new one.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClient.Responses.$201>
  }
  ['/v1/identity/operator/clients/{client_id}']: {
    /**
     * getClient - getClient
     * 
     * Read a partner client. The client secret is never returned.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClient.Responses.$200>
    /**
     * updateClient - updateClient
     * 
     * Replace the mutable configuration of a client. `config_version` must equal the current
     * version (compare-and-swap); a mismatch is rejected with `409`.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateClient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClient.Responses.$200>
    /**
     * retireClient - retireClient
     * 
     * Retire a client. The record is kept as a tombstone, the `client_id` is never reused, every
     * organization enablement is revoked and all provider-side artefacts are revoked.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetireClient.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}:activate']: {
    /**
     * activateClient - activateClient
     * 
     * Activate a `draft` or `suspended` client. Validates that every redirect URI is an absolute
     * HTTPS URL without fragment, that `scopes_allowed` contains `openid`, and that the
     * authentication method is `client_secret_basic`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateClient.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}:suspend']: {
    /**
     * suspendClient - suspendClient
     * 
     * Immediately block the client for every organization. Provider-side artefacts (codes, tokens,
     * grants) are revoked; the audit trail is kept. Reversible with `activateClient`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SuspendClient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SuspendClient.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}:rotateSecret']: {
    /**
     * rotateClientSecret - rotateClientSecret
     * 
     * Issue a new client secret. The new secret is returned exactly once. The previous secret
     * keeps working until `previous_secret_expires_at` unless `compromise_mode` is set, in which
     * case it stops working immediately.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RotateClientSecret.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RotateClientSecret.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}/organizations']: {
    /**
     * listClientOrganizations - listClientOrganizations
     * 
     * List the organizations enabled on a client, including suspended and revoked ones.
     */
    'get'(
      parameters?: Parameters<Paths.ListClientOrganizations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListClientOrganizations.Responses.$200>
    /**
     * enableClientOrganization - enableClientOrganization
     * 
     * Enable an epilot organization on a client, recording the customer's authorization policy
     * (version 1). `allowed_scopes` must contain `openid` and be a subset of the client's
     * `scopes_allowed`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.EnableClientOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EnableClientOrganization.Responses.$201>
  }
  ['/v1/identity/operator/clients/{client_id}/organizations/{org_id}']: {
    /**
     * getClientOrganization - getClientOrganization
     * 
     * Read one organization enablement.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClientOrganization.Responses.$200>
    /**
     * updateClientOrganization - updateClientOrganization
     * 
     * Record a new version of the customer's authorization policy. `expected_policy_version` must
     * equal the current version (compare-and-swap); a mismatch is rejected with `409`.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateClientOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClientOrganization.Responses.$200>
    /**
     * revokeClientOrganization - revokeClientOrganization
     * 
     * Revoke an organization's enablement. The record is kept as an audited tombstone; future
     * authorizations for this organization fail with `access_denied` and provider-side artefacts
     * bound to it are revoked.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RevokeClientOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeClientOrganization.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}/organizations/{org_id}:suspend']: {
    /**
     * suspendClientOrganization - suspendClientOrganization
     * 
     * Temporarily block one organization on this client. Reversible with `activateClientOrganization`.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SuspendClientOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SuspendClientOrganization.Responses.$200>
  }
  ['/v1/identity/operator/clients/{client_id}/organizations/{org_id}:activate']: {
    /**
     * activateClientOrganization - activateClientOrganization
     * 
     * Resume a suspended organization on this client. Revoked enablements cannot be re-activated; enabling the organization again (`POST …/organizations`) replaces the revoked entry and continues its policy version.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateClientOrganization.Responses.$200>
  }
  ['/v1/identity/session']: {
    /**
     * createIdentitySession - createIdentitySession
     * 
     * Called by the epilot portal through the portal-host proxy after every persisted 360 session.
     * Validates the 360 bearer token itself and mirrors it into the `identity_session` cookie
     * (`HttpOnly; Secure; Path=/v1/identity`) whose lifetime equals the remaining token lifetime.
     * The cookie is what proves the live 360 session during `completeInteraction`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateIdentitySession.Responses.$200>
    /**
     * deleteIdentitySession - deleteIdentitySession
     * 
     * Clears the `identity_session` cookie. Called by the portal on logout.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIdentitySession.Responses.$204>
  }
  ['/v1/identity/interaction/{interaction_id}']: {
  }
  ['/v1/identity/launch/{client_id}']: {
    /**
     * launchClient - launchClient
     * 
     * One validated place for partner start links (manager UI, hosted apps). Redirects the browser to the
     * client's registered `initiate_login_uri` with `iss` set to this issuer and, when given, the deep link as
     * `target_link_uri` (OpenID Connect Core §4, third-party initiated login). Authenticates nobody: the partner
     * then starts a normal "Sign in with epilot" authorization.
     * 
     * `target` must be an absolute HTTPS URL starting with one of the client's registered
     * `launch_target_prefixes`; anything else is rejected. Retired, suspended or draft clients, and clients
     * without an `initiate_login_uri`, answer `404`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.LaunchClient.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AuthorizationPolicy = Components.Schemas.AuthorizationPolicy;
export type AuthorizationPolicyInput = Components.Schemas.AuthorizationPolicyInput;
export type Environment = Components.Schemas.Environment;
export type Error = Components.Schemas.Error;
export type HttpsUri = Components.Schemas.HttpsUri;
export type IdentitySession = Components.Schemas.IdentitySession;
export type OrgEnablement = Components.Schemas.OrgEnablement;
export type OrgEnablementCreate = Components.Schemas.OrgEnablementCreate;
export type OrgEnablementList = Components.Schemas.OrgEnablementList;
export type OrgEnablementStatus = Components.Schemas.OrgEnablementStatus;
export type OrgEnablementUpdate = Components.Schemas.OrgEnablementUpdate;
export type OrgId = Components.Schemas.OrgId;
export type PartnerAccount = Components.Schemas.PartnerAccount;
export type PartnerClient = Components.Schemas.PartnerClient;
export type PartnerClientCreate = Components.Schemas.PartnerClientCreate;
export type PartnerClientId = Components.Schemas.PartnerClientId;
export type PartnerClientList = Components.Schemas.PartnerClientList;
export type PartnerClientStatus = Components.Schemas.PartnerClientStatus;
export type PartnerClientUpdate = Components.Schemas.PartnerClientUpdate;
export type PartnerClientWithSecret = Components.Schemas.PartnerClientWithSecret;
export type RotateSecretRequest = Components.Schemas.RotateSecretRequest;
export type Scope = Components.Schemas.Scope;
export type StatusChangeRequest = Components.Schemas.StatusChangeRequest;
