/* Auto-copied from phone-integration-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Responses {
        export type BadGateway = Schemas.ErrorResponse;
        export type BadRequest = Schemas.ErrorResponse;
        export type Forbidden = Schemas.ErrorResponse;
        export type ServiceUnavailable = Schemas.ErrorResponse;
        export type Unauthorized = Schemas.ErrorResponse;
    }
    namespace Schemas {
        export interface AssignPhoneAgentRequest {
            /**
             * epilot user id of an active member of the caller's organization
             */
            user_id: string; // ^[A-Za-z0-9_-]+$
        }
        export interface CustomerBatchSearchResult {
            /**
             * One result per distinct identifier
             */
            results: CustomerSearchResult[];
        }
        export interface CustomerIdentifier {
            type: "id" | "customer_number" | "external_id" | "phone_number" | "email";
            /**
             * The identifier as sent
             * example:
             * +4917012345678
             */
            value: string;
        }
        export interface CustomerSearchResult {
            identifier: CustomerIdentifier;
            /**
             * - `found` — exactly one contact has the identifier; see `customer`
             * - `not_found` — no contact the caller may see has it
             * - `ambiguous` — several contacts share it; none is chosen
             * - `invalid` — not a usable identifier (a phone number that does
             *   not parse), so nothing was searched
             * - `error` — the search for this identifier failed; try again
             *
             */
            status: "found" | "not_found" | "ambiguous" | "invalid" | "error";
            customer?: /* Present when `status` is `found` */ CustomerSummary;
        }
        /**
         * Present when `status` is `found`
         */
        export interface CustomerSummary {
            /**
             * epilot entity id of the customer (Contact)
             * example:
             * dba8e5f9-8b3f-4608-b887-cd0798fce624
             */
            id: string;
            /**
             * The contact's title, else its first and last name; null when it has neither
             * example:
             * Max Mustermann
             */
            name: string | null;
            /**
             * Omitted when the contact has none
             * example:
             * 4711
             */
            customer_number?: string;
        }
        export interface ErrorResponse {
            /**
             * HTTP status code.
             */
            status: number;
            /**
             * Human-readable error message.
             */
            error: string;
            /**
             * Stable machine-readable error code, when the operation defines one.
             */
            code?: string;
        }
        export interface ManagerStatus {
            /**
             * Telephony provider behind this organization
             */
            provider: "babelforce";
            /**
             * Agents can be assigned
             */
            ready: boolean;
            /**
             * Why the organization is not ready (empty when ready)
             */
            reasons: ("provider_tenant_missing" | "sso_not_configured" | "scim_not_configured" | "identity_enablement_missing")[];
        }
        export interface PhoneAgent {
            /**
             * epilot user id
             */
            user_id: string;
            email: string;
            display_name?: string;
            /**
             * `active`: holds the phone and has an enabled provider user. `pending`: assigned in epilot but
             * the provider user is not activated yet. `disabled`: provider user disabled. `missing_provider`:
             * holds `phone:use` but no provider user is bound (assign again to repair). `missing_role`:
             * assigned here, but the `phone_agent` role (`phone:use`) was removed elsewhere, e.g. in the
             * users and permissions settings (assign again to restore it, or remove to deactivate the
             * provider user).
             *
             */
            status: "active" | "pending" | "disabled" | "missing_provider" | "missing_role";
            /**
             * The provider's id of the bound user
             */
            provider_user_id?: string;
            provider_roles?: string[];
            assigned_at?: string; // date-time
            /**
             * epilot user id of the manager who assigned the phone
             */
            assigned_by?: string;
        }
        export interface ProviderSetup {
            provider: "babelforce";
            org_id: string;
            /**
             * Everything below is in place
             */
            ready: boolean;
            /**
             * The provider tenant for this organization (null until created)
             */
            tenant: {
                id: string;
                name: string;
                org_key: string;
                created_at?: string; // date-time
            } | null;
            scim: {
                configured: boolean;
                roles_enabled: boolean;
            };
            sso: {
                configured: boolean;
                /**
                 * The identity-api client the tenant's SSO configuration points at
                 */
                identity_client_id?: string;
                configured_at?: string; // date-time
            };
            /**
             * Admin-portal operator (email) who last ran the setup
             */
            last_setup_by?: string;
        }
        export interface ProviderSetupRequest {
            /**
             * Provider tenant name, unique across the provider (3 to 100 characters). Required the first
             * time (`400` with code `account_name_required` without it); ignored once the tenant exists.
             *
             */
            account_name?: string;
            /**
             * identity-api client registered for the provider (its partner application for this stage)
             */
            identity_client_id: string; // ^[A-Za-z0-9._~-]+$
            /**
             * The client's current secret, forwarded to the provider's SSO configuration and never stored
             */
            identity_client_secret: string;
        }
        /**
         * One organization's provider setup, as listed in the overview (no live SCIM or SSO reads).
         */
        export interface ProviderSetupSummary {
            /**
             * epilot organization id (the provider tenant's org key)
             */
            org_id: string;
            provider: "babelforce";
            /**
             * Phone agents can be assigned (same rule as getManagerStatus)
             */
            ready: boolean;
            /**
             * `setupProvider` has run for this organization at least once. `false` for a tenant created by
             * hand at the provider: run the setup once to record it.
             *
             */
            setup_recorded: boolean;
            tenant: {
                /**
                 * The provider's tenant id (Babelforce sub-account id)
                 */
                id: string;
                name: string;
                org_key: string;
            };
            /**
             * The identity-api client the recorded SSO configuration points at
             */
            sso_identity_client_id?: string;
            /**
             * The operator who last ran the setup (email)
             */
            last_setup_by?: string;
            /**
             * When the setup record last changed
             */
            updated_at?: string; // date-time
        }
    }
}
export declare namespace Paths {
    namespace AssignPhoneAgent {
        export type RequestBody = Components.Schemas.AssignPhoneAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.PhoneAgent;
            export type $201 = Components.Schemas.PhoneAgent;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace BatchSearchCustomers {
        export interface HeaderParameters {
            "x-trace-id"?: Parameters.XTraceId;
        }
        namespace Parameters {
            export type CustomerNumber = string[];
            export type Email = string[];
            export type ExternalId = string[];
            export type Id = string[];
            export type PhoneNumber = string[];
            export type XTraceId = string;
        }
        export interface QueryParameters {
            id?: Parameters.Id;
            customer_number?: Parameters.CustomerNumber;
            external_id?: Parameters.ExternalId;
            phone_number?: Parameters.PhoneNumber;
            email?: Parameters.Email;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CustomerBatchSearchResult;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetManagerStatus {
        namespace Responses {
            export type $200 = Components.Schemas.ManagerStatus;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace GetProviderSetup {
        namespace Responses {
            export type $200 = Components.Schemas.ProviderSetup;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $502 = Components.Responses.BadGateway;
            export type $503 = Components.Responses.ServiceUnavailable;
        }
    }
    namespace ListPhoneAgents {
        namespace Responses {
            export interface $200 {
                results: Components.Schemas.PhoneAgent[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace ListProviderSetups {
        namespace Responses {
            export interface $200 {
                results: /* One organization's provider setup, as listed in the overview (no live SCIM or SSO reads). */ Components.Schemas.ProviderSetupSummary[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $502 = Components.Responses.BadGateway;
            export type $503 = Components.Responses.ServiceUnavailable;
        }
    }
    namespace RemovePhoneAgent {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Schemas.ErrorResponse;
        }
    }
    namespace SetupProvider {
        export type RequestBody = Components.Schemas.ProviderSetupRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ProviderSetup;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
            export type $503 = Components.Responses.ServiceUnavailable;
        }
    }
    namespace V1ManagerAgents$UserId {
        namespace Parameters {
            export type UserId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            user_id: Parameters.UserId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
    namespace V1OperatorOrganizations$OrgIdProvider {
        namespace Parameters {
            export type OrgId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            org_id: Parameters.OrgId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
    namespace V1OperatorOrganizations$OrgIdProviderSetup {
        namespace Parameters {
            export type OrgId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            org_id: Parameters.OrgId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
}


export interface OperationMethods {
  /**
   * batchSearchCustomers - batchSearchCustomers
   * 
   * Resolves up to 50 identifiers to epilot customers (Contacts) in one
   * request — for example every number in an agent's call history.
   * 
   * Each identifier is an exact key of a Contact: its entity `id`, its
   * `customer_number`, its `external_id`, one of its `email` addresses or
   * one of its `phone` numbers. Repeat a parameter to pass several values,
   * and combine parameters freely. Phone numbers are normalized on the
   * server, so E.164, national and formatted forms of one number match the
   * same contact; the other identifiers match exactly, ignoring case and
   * surrounding whitespace.
   * 
   * Every distinct identifier gets its own result, so one unknown or
   * ambiguous identifier never fails the others. Results are ordered by
   * parameter (`id`, `customer_number`, `external_id`, `phone_number`,
   * `email`), then as sent; match them by `identifier`.
   * 
   * The search runs with the caller's token: the organization and the
   * permissions applied are the caller's own, as for entity search.
   * 
   */
  'batchSearchCustomers'(
    parameters?: Parameters<Paths.BatchSearchCustomers.QueryParameters & Paths.BatchSearchCustomers.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchSearchCustomers.Responses.$200>
  /**
   * getManagerStatus - getManagerStatus
   * 
   * Whether the caller's organization is ready for phone agents: the telephony provider tenant
   * exists and is configured. The control center shows a "not set up" state when `ready` is false.
   * Requires `phone:manage`.
   * 
   */
  'getManagerStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManagerStatus.Responses.$200>
  /**
   * listPhoneAgents - listPhoneAgents
   * 
   * Organization members who hold the phone (`phone:use`), each joined with the provider user behind
   * them. Requires `phone:manage`.
   * 
   */
  'listPhoneAgents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPhoneAgents.Responses.$200>
  /**
   * assignPhoneAgent - assignPhoneAgent
   * 
   * Gives an organization member the phone. In order: the member is verified with user-api, their
   * pairwise subject for the provider is read from identity-api, the provider user is created (or
   * found) bound to that subject with the `agent` role, and only then the `phone_agent` role
   * (`phone:use`) is assigned in epilot. Idempotent: an already assigned member answers `200`.
   * Requires `phone:manage`.
   * 
   */
  'assignPhoneAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AssignPhoneAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignPhoneAgent.Responses.$200 | Paths.AssignPhoneAgent.Responses.$201>
  /**
   * removePhoneAgent - removePhoneAgent
   * 
   * Takes the phone away from a member: the `phone_agent` role is removed first, then the provider
   * user is deactivated (never deleted: call history keeps referring to it). Requires `phone:manage`.
   * 
   */
  'removePhoneAgent'(
    parameters?: Parameters<Paths.V1ManagerAgents$UserId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemovePhoneAgent.Responses.$204>
  /**
   * listProviderSetups - listProviderSetups
   * 
   * Every organization that has a telephony provider tenant, for the admin portal's overview: the
   * provider's sub-accounts (one per organization, keyed by the organization id) joined with this
   * service's setup record. `ready` follows getManagerStatus: an organization whose tenant was created
   * by hand, outside `setupProvider`, has no record and is not ready until the setup runs once.
   * Sorted by organization id; not paged (one tenant per organization, a few hundred at most).
   * 
   */
  'listProviderSetups'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProviderSetups.Responses.$200>
  /**
   * getProviderSetup - getProviderSetup
   * 
   * What has been set up at the telephony provider for this organization.
   */
  'getProviderSetup'(
    parameters?: Parameters<Paths.V1OperatorOrganizations$OrgIdProvider.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProviderSetup.Responses.$200>
  /**
   * setupProvider - setupProvider
   * 
   * Prepares the telephony provider for an organization, idempotently and in order: the provider
   * tenant (Babelforce sub-account keyed by the organization id), its SCIM configuration with role
   * management on, and its SSO configuration pointing at the identity-api client given here. The
   * client secret is forwarded to the provider and never stored by this service. Re-running updates
   * the SSO configuration (new client or rotated secret) and leaves the rest untouched.
   * 
   */
  'setupProvider'(
    parameters?: Parameters<Paths.V1OperatorOrganizations$OrgIdProviderSetup.PathParameters> | null,
    data?: Paths.SetupProvider.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetupProvider.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/customer:batchSearch']: {
    /**
     * batchSearchCustomers - batchSearchCustomers
     * 
     * Resolves up to 50 identifiers to epilot customers (Contacts) in one
     * request — for example every number in an agent's call history.
     * 
     * Each identifier is an exact key of a Contact: its entity `id`, its
     * `customer_number`, its `external_id`, one of its `email` addresses or
     * one of its `phone` numbers. Repeat a parameter to pass several values,
     * and combine parameters freely. Phone numbers are normalized on the
     * server, so E.164, national and formatted forms of one number match the
     * same contact; the other identifiers match exactly, ignoring case and
     * surrounding whitespace.
     * 
     * Every distinct identifier gets its own result, so one unknown or
     * ambiguous identifier never fails the others. Results are ordered by
     * parameter (`id`, `customer_number`, `external_id`, `phone_number`,
     * `email`), then as sent; match them by `identifier`.
     * 
     * The search runs with the caller's token: the organization and the
     * permissions applied are the caller's own, as for entity search.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.BatchSearchCustomers.QueryParameters & Paths.BatchSearchCustomers.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchSearchCustomers.Responses.$200>
  }
  ['/v1/manager/status']: {
    /**
     * getManagerStatus - getManagerStatus
     * 
     * Whether the caller's organization is ready for phone agents: the telephony provider tenant
     * exists and is configured. The control center shows a "not set up" state when `ready` is false.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManagerStatus.Responses.$200>
  }
  ['/v1/manager/agents']: {
    /**
     * listPhoneAgents - listPhoneAgents
     * 
     * Organization members who hold the phone (`phone:use`), each joined with the provider user behind
     * them. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPhoneAgents.Responses.$200>
    /**
     * assignPhoneAgent - assignPhoneAgent
     * 
     * Gives an organization member the phone. In order: the member is verified with user-api, their
     * pairwise subject for the provider is read from identity-api, the provider user is created (or
     * found) bound to that subject with the `agent` role, and only then the `phone_agent` role
     * (`phone:use`) is assigned in epilot. Idempotent: an already assigned member answers `200`.
     * Requires `phone:manage`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AssignPhoneAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignPhoneAgent.Responses.$200 | Paths.AssignPhoneAgent.Responses.$201>
  }
  ['/v1/manager/agents/{user_id}']: {
    /**
     * removePhoneAgent - removePhoneAgent
     * 
     * Takes the phone away from a member: the `phone_agent` role is removed first, then the provider
     * user is deactivated (never deleted: call history keeps referring to it). Requires `phone:manage`.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1ManagerAgents$UserId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemovePhoneAgent.Responses.$204>
  }
  ['/v1/operator/provider-setups']: {
    /**
     * listProviderSetups - listProviderSetups
     * 
     * Every organization that has a telephony provider tenant, for the admin portal's overview: the
     * provider's sub-accounts (one per organization, keyed by the organization id) joined with this
     * service's setup record. `ready` follows getManagerStatus: an organization whose tenant was created
     * by hand, outside `setupProvider`, has no record and is not ready until the setup runs once.
     * Sorted by organization id; not paged (one tenant per organization, a few hundred at most).
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProviderSetups.Responses.$200>
  }
  ['/v1/operator/organizations/{org_id}/provider']: {
    /**
     * getProviderSetup - getProviderSetup
     * 
     * What has been set up at the telephony provider for this organization.
     */
    'get'(
      parameters?: Parameters<Paths.V1OperatorOrganizations$OrgIdProvider.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProviderSetup.Responses.$200>
  }
  ['/v1/operator/organizations/{org_id}/provider:setup']: {
    /**
     * setupProvider - setupProvider
     * 
     * Prepares the telephony provider for an organization, idempotently and in order: the provider
     * tenant (Babelforce sub-account keyed by the organization id), its SCIM configuration with role
     * management on, and its SSO configuration pointing at the identity-api client given here. The
     * client secret is forwarded to the provider and never stored by this service. Re-running updates
     * the SSO configuration (new client or rotated secret) and leaves the rest untouched.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1OperatorOrganizations$OrgIdProviderSetup.PathParameters> | null,
      data?: Paths.SetupProvider.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetupProvider.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AssignPhoneAgentRequest = Components.Schemas.AssignPhoneAgentRequest;
export type CustomerBatchSearchResult = Components.Schemas.CustomerBatchSearchResult;
export type CustomerIdentifier = Components.Schemas.CustomerIdentifier;
export type CustomerSearchResult = Components.Schemas.CustomerSearchResult;
export type CustomerSummary = Components.Schemas.CustomerSummary;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type ManagerStatus = Components.Schemas.ManagerStatus;
export type PhoneAgent = Components.Schemas.PhoneAgent;
export type ProviderSetup = Components.Schemas.ProviderSetup;
export type ProviderSetupRequest = Components.Schemas.ProviderSetupRequest;
export type ProviderSetupSummary = Components.Schemas.ProviderSetupSummary;
