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
        /**
         * The provider presence the agent has selected (e.g. Available, Break, Meeting)
         */
        export interface AgentPresence {
            name: string;
            label: string;
            /**
             * Whether this presence lets the agent take calls
             */
            available: boolean;
        }
        /**
         * A queue an agent can take calls from, and why
         */
        export interface AgentQueueEligibility {
            id: string;
            name: string;
            via: [
                /**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: the agent is in the queue's epilot-managed step (added from the control center);
                 * - `routing`: the phone system's own routing names the agent (a team or a person set up there);
                 *   epilot does not change it.
                 *
                 */
                EligibilityPath,
                .../**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: the agent is in the queue's epilot-managed step (added from the control center);
                 * - `routing`: the phone system's own routing names the agent (a team or a person set up there);
                 *   epilot does not change it.
                 *
                 */
                EligibilityPath[]
            ];
            /**
             * The agent's skills that make the queue route to them (empty unless `via` has `skill`)
             */
            skills: string[];
            /**
             * The phone system's own routing names the agent (`via` has `routing`), so changing skills or
             * direct membership cannot remove the queue; the control center shows it checked and disabled.
             *
             */
            locked: boolean;
        }
        export interface AgentRouting {
            provider_agent_id: string;
            skills: /**
             * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
             * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
             * "Category · Label"; a skill without a colon has no category.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            queues: /* A queue an agent can take calls from, and why */ AgentQueueEligibility[];
        }
        export interface AgentRoutingPreview {
            provider_agent_id: string;
            /**
             * Queues the agent can take calls from now, as the phone system routes today
             */
            before: QueueRef[];
            after: QueueRef[];
            added: QueueRef[];
            removed: QueueRef[];
            /**
             * Removed queues where this agent is currently the only available eligible agent
             */
            coverage_lost: QueueRef[];
            /**
             * Queues the agent stays in through the phone system's own routing, which this call cannot remove
             */
            locked: QueueRef[];
        }
        export interface AgentRoutingRequest {
            /**
             * The agent's skills in the phone system (full set, not a delta); at most 200
             */
            skills: /**
             * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
             * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
             * "Category · Label"; a skill without a colon has no category.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            /**
             * The queues the agent is directly in, through the epilot-managed step (full set); at most 200
             */
            queue_ids: string /* ^[A-Za-z0-9_-]+$ */[];
        }
        /**
         * The agent's live line state as the provider reports it, plus `offline` for an agent whose
         * presence is not available (not signed in or on a busy presence) and `unknown` when the
         * provider gives no state. `in_call` covers ringing-to-bridged; `wrap_up` is the post-call time.
         *
         */
        export type AgentState = "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown";
        export interface AssignPhoneAgentRequest {
            /**
             * epilot user id of an active member of the caller's organization
             */
            user_id: string; // ^[A-Za-z0-9_-]+$
        }
        export interface CallReport {
            from: string; // date-time
            to: string; // date-time
            inbound_total: number;
            /**
             * Inbound calls bridged to an agent
             */
            handled_by_agent: number;
            /**
             * Inbound calls that ended without reaching an agent
             */
            abandoned_or_failed: number;
            /**
             * The same window shifted back by whole days (its length rounded up to days), for the trend: a
             * running "today" compares with yesterday up to the same time, "last 7 days" with the 7 days before
             *
             */
            previous_period: {
                from: string; // date-time
                to: string; // date-time
                inbound_total: number;
            };
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
        /**
         * How an agent can take a queue's calls:
         * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
         * - `direct`: the agent is in the queue's epilot-managed step (added from the control center);
         * - `routing`: the phone system's own routing names the agent (a team or a person set up there);
         *   epilot does not change it.
         *
         */
        export type EligibilityPath = "skill" | "direct" | "routing";
        /**
         * An agent who can take the queue's calls, with live status
         */
        export interface EligibleAgent {
            provider_agent_id: string;
            user_id?: string;
            name: string;
            email?: string;
            state: /**
             * The agent's live line state as the provider reports it, plus `offline` for an agent whose
             * presence is not available (not signed in or on a busy presence) and `unknown` when the
             * provider gives no state. `in_call` covers ringing-to-bridged; `wrap_up` is the post-call time.
             *
             */
            AgentState;
            presence?: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
            via: [
                /**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: the agent is in the queue's epilot-managed step (added from the control center);
                 * - `routing`: the phone system's own routing names the agent (a team or a person set up there);
                 *   epilot does not change it.
                 *
                 */
                EligibilityPath,
                .../**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: the agent is in the queue's epilot-managed step (added from the control center);
                 * - `routing`: the phone system's own routing names the agent (a team or a person set up there);
                 *   epilot does not change it.
                 *
                 */
                EligibilityPath[]
            ];
            /**
             * The agent's skills that make the queue route to them (empty unless `via` has `skill`)
             */
            skills: /**
             * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
             * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
             * "Category · Label"; a skill without a colon has no category.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
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
        export interface LiveAgent {
            /**
             * The phone system's agent id
             */
            provider_agent_id: string;
            /**
             * The epilot user id, when the agent is an epilot phone agent (matched by email)
             */
            user_id?: string;
            name: string;
            email?: string;
            /**
             * Whether the phone system routes queue calls to this agent at all
             */
            enabled: boolean;
            state: /**
             * The agent's live line state as the provider reports it, plus `offline` for an agent whose
             * presence is not available (not signed in or on a busy presence) and `unknown` when the
             * provider gives no state. `in_call` covers ringing-to-bridged; `wrap_up` is the post-call time.
             *
             */
            AgentState;
            presence?: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
            /**
             * The phone system's human-readable status label
             */
            display_status?: string;
            /**
             * The agent's skills as the phone system holds them (the source of truth for phone routing)
             */
            skills: /**
             * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
             * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
             * "Category · Label"; a skill without a colon has no category.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            /**
             * Queues the agent can take calls from, derived from every queue's routing steps
             */
            queues: /* A queue an agent can take calls from, and why */ AgentQueueEligibility[];
            /**
             * The call the agent is on, when the phone system reports one
             */
            current_call?: {
                started_at: string; // date-time
                queue_name?: string;
            };
        }
        /**
         * Presence counters over the organization's agents
         */
        export interface LiveAgentCounters {
            total: number;
            /**
             * Agents on an available presence, i.e. everyone not offline (available + on call + wrap-up + other busy line states)
             */
            online: number;
            available: number;
            /**
             * Ringing or bridged
             */
            on_call: number;
            wrap_up: number;
            offline: number;
        }
        export interface LiveSnapshot {
            captured_at: string; // date-time
            agents: /* Presence counters over the organization's agents */ LiveAgentCounters;
            queues: /* Live demand and staffing of one queue */ QueueLive[];
            /**
             * Waiting calls across all queues
             */
            calls_waiting: number;
            /**
             * The longest wait across all queues; absent when nothing waits
             */
            longest_wait_seconds?: number;
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
        /**
         * An agent as a routing step names them
         */
        export interface PersonRef {
            provider_agent_id: string;
            /**
             * The epilot user id, when the agent is an epilot phone agent
             */
            user_id?: string;
            name: string;
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
        /**
         * Live demand and staffing of one queue
         */
        export interface QueueDetail {
            id: string;
            name: string;
            /**
             * Calls waiting in the queue right now
             */
            waiting: number;
            /**
             * How long the longest-waiting call has waited; absent when nothing waits
             */
            longest_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: calls are waiting and no eligible agent is available. `healthy`: at least one
             * eligible agent is available. `quiet`: nothing waiting and nobody available.
             *
             */
            QueueHealth;
            /**
             * Service numbers routed into this queue, when the phone system makes that derivable
             */
            numbers?: string[];
            /**
             * Who can take the queue's calls, in the order the phone system tries them
             */
            routing: /**
             * One step of who can take a queue's calls, in the order the phone system tries them. A step
             * offers calls to the people it names and to everyone with any of its skills. Teams set up in the
             * phone system appear as the people they contain. The epilot-managed step holds the people added
             * from the control center; every other step is the organization's own routing, read-only here.
             *
             */
            QueueRoutingStep[];
            captured_at: string; // date-time
            eligible_agents: /* An agent who can take the queue's calls, with live status */ EligibleAgent[];
            waiting_calls: WaitingCall[];
        }
        /**
         * `at_risk`: calls are waiting and no eligible agent is available. `healthy`: at least one
         * eligible agent is available. `quiet`: nothing waiting and nobody available.
         *
         */
        export type QueueHealth = "healthy" | "at_risk" | "quiet";
        /**
         * Live demand and staffing of one queue
         */
        export interface QueueLive {
            id: string;
            name: string;
            /**
             * Calls waiting in the queue right now
             */
            waiting: number;
            /**
             * How long the longest-waiting call has waited; absent when nothing waits
             */
            longest_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: calls are waiting and no eligible agent is available. `healthy`: at least one
             * eligible agent is available. `quiet`: nothing waiting and nobody available.
             *
             */
            QueueHealth;
        }
        /**
         * Live demand and staffing of one queue
         */
        export interface QueueOverview {
            id: string;
            name: string;
            /**
             * Calls waiting in the queue right now
             */
            waiting: number;
            /**
             * How long the longest-waiting call has waited; absent when nothing waits
             */
            longest_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: calls are waiting and no eligible agent is available. `healthy`: at least one
             * eligible agent is available. `quiet`: nothing waiting and nobody available.
             *
             */
            QueueHealth;
            /**
             * Service numbers routed into this queue, when the phone system makes that derivable
             */
            numbers?: string[];
            /**
             * Who can take the queue's calls, in the order the phone system tries them
             */
            routing: /**
             * One step of who can take a queue's calls, in the order the phone system tries them. A step
             * offers calls to the people it names and to everyone with any of its skills. Teams set up in the
             * phone system appear as the people they contain. The epilot-managed step holds the people added
             * from the control center; every other step is the organization's own routing, read-only here.
             *
             */
            QueueRoutingStep[];
        }
        export interface QueueRef {
            id: string;
            name: string;
        }
        /**
         * One step of who can take a queue's calls, in the order the phone system tries them. A step
         * offers calls to the people it names and to everyone with any of its skills. Teams set up in the
         * phone system appear as the people they contain. The epilot-managed step holds the people added
         * from the control center; every other step is the organization's own routing, read-only here.
         *
         */
        export interface QueueRoutingStep {
            id: string;
            /**
             * Lower is tried first
             */
            order: number;
            label: string;
            enabled: boolean;
            /**
             * Skills the step routes on (anyone with any of them)
             */
            skills: /**
             * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
             * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
             * "Category · Label"; a skill without a colon has no category.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            /**
             * People the step names, directly or through a team set up in the phone system
             */
            people: /* An agent as a routing step names them */ PersonRef[];
            /**
             * The step `setAgentRouting` maintains; the only one the control center writes
             */
            managed_by_epilot: boolean;
        }
        /**
         * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
         * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
         * "Category · Label"; a skill without a colon has no category.
         *
         */
        export type Skill = string; // ^\S(.*\S)?$
        export interface WaitingCall {
            id: string;
            /**
             * The caller's number with all but the last four digits hidden
             */
            from_masked?: string;
            waited_seconds: number;
            /**
             * The provider's call state (e.g. `queued`, `ringing`)
             */
            state: string;
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
    namespace GetCallReport {
        namespace Parameters {
            export type From = string;
            export type To = string;
        }
        export interface QueryParameters {
            from: Parameters.From;
            to: Parameters.To;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CallReport;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetLiveSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.LiveSnapshot;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
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
    namespace GetQueue {
        namespace Responses {
            export type $200 = /* Live demand and staffing of one queue */ Components.Schemas.QueueDetail;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace ListLiveAgents {
        namespace Responses {
            export interface $200 {
                captured_at: string; // date-time
                results: Components.Schemas.LiveAgent[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
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
    namespace ListQueues {
        namespace Responses {
            export interface $200 {
                captured_at: string; // date-time
                results: /* Live demand and staffing of one queue */ Components.Schemas.QueueOverview[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace PreviewAgentRouting {
        export type RequestBody = Components.Schemas.AgentRoutingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AgentRoutingPreview;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
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
    namespace SetAgentRouting {
        export type RequestBody = Components.Schemas.AgentRoutingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AgentRouting;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
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
    namespace V1ManagerAgents$ProviderAgentIdRouting {
        namespace Parameters {
            export type ProviderAgentId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            provider_agent_id: Parameters.ProviderAgentId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
    namespace V1ManagerAgents$ProviderAgentIdRoutingPreview {
        namespace Parameters {
            export type ProviderAgentId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            provider_agent_id: Parameters.ProviderAgentId /* ^[A-Za-z0-9_-]+$ */;
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
    namespace V1ManagerQueues$QueueId {
        namespace Parameters {
            export type QueueId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            queue_id: Parameters.QueueId /* ^[A-Za-z0-9_-]+$ */;
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
   * getLiveSnapshot - getLiveSnapshot
   * 
   * One snapshot of the organization's live phone state for the control center's Overview: agent
   * presence counters and per-queue health (waiting calls, longest wait, eligible vs available
   * agents). Read from the provider on every call (no caching); the control center polls it about
   * every 20 seconds. Requires `phone:manage`.
   * 
   */
  'getLiveSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLiveSnapshot.Responses.$200>
  /**
   * listLiveAgents - listLiveAgents
   * 
   * The organization's phone agents with their live phone status, their skills (as the phone system
   * holds them) and the queues they can take calls from. Agents that are epilot phone agents carry
   * the epilot `user_id`. Queue eligibility is derived from every queue's routing steps (skills and
   * people). The control center filters and searches this list client-side and polls it about every
   * 20 seconds. Requires `phone:manage`.
   * 
   */
  'listLiveAgents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListLiveAgents.Responses.$200>
  /**
   * setAgentRouting - setAgentRouting
   * 
   * Sets an agent's skills and direct queue membership (full sets, not deltas), in this order:
   * 1. Skills: the agent's skills in the phone system are replaced by `skills`, so the phone system
   *    routes on them right away. The phone system is the source of truth for phone skills; they are
   *    independent of the skills in epilot's Access Management.
   * 2. Direct queue membership: each listed queue gets the agent in its epilot-managed routing step
   *    (created on first use, lowest precedence, never touching the organization's own routing in
   *    the phone system); every other queue's epilot-managed step drops the agent. Eligibility
   *    through the phone system's own routing is not changed (`locked`).
   * Idempotent; a failure part-way answers `502` and repeating the call completes it. Requires
   * `phone:manage`.
   * 
   */
  'setAgentRouting'(
    parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRouting.PathParameters> | null,
    data?: Paths.SetAgentRouting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetAgentRouting.Responses.$200>
  /**
   * previewAgentRouting - previewAgentRouting
   * 
   * The routing impact of `setAgentRouting` with the same body, without changing anything: the
   * queues the agent can take calls from now (as the phone system routes today) and after the
   * change, what is added and removed, the queues that would lose their last available agent, and
   * the queues the agent stays in through the phone system's own routing. Requires `phone:manage`.
   * 
   */
  'previewAgentRouting'(
    parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRoutingPreview.PathParameters> | null,
    data?: Paths.PreviewAgentRouting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewAgentRouting.Responses.$200>
  /**
   * listQueues - listQueues
   * 
   * The organization's queues with live demand (waiting calls, longest wait), staffing (eligible
   * vs available agents), derived health and who can take their calls: the routing steps in the
   * order the phone system tries them, each naming skills and people. Routing is read-only in the
   * control center except the epilot-managed step that `setAgentRouting` maintains. Polled about
   * every 20 seconds. Requires `phone:manage`.
   * 
   */
  'listQueues'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListQueues.Responses.$200>
  /**
   * getQueue - getQueue
   * 
   * One queue for the control center's queue drawer: the overview fields plus the agents currently
   * eligible for it (with live status and how they are eligible) and the calls waiting in it.
   * Requires `phone:manage`.
   * 
   */
  'getQueue'(
    parameters?: Parameters<Paths.V1ManagerQueues$QueueId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetQueue.Responses.$200>
  /**
   * getCallReport - getCallReport
   * 
   * Inbound call outcomes for a period, from the provider's call reporting: how many inbound calls
   * there were, how many an agent handled (bridged) and how many ended without an agent (abandoned
   * or failed), plus the inbound total of the period of the same length just before, for the
   * trend. The window is at most 31 days. Requires `phone:manage`.
   * 
   */
  'getCallReport'(
    parameters?: Parameters<Paths.GetCallReport.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCallReport.Responses.$200>
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
  ['/v1/manager/live']: {
    /**
     * getLiveSnapshot - getLiveSnapshot
     * 
     * One snapshot of the organization's live phone state for the control center's Overview: agent
     * presence counters and per-queue health (waiting calls, longest wait, eligible vs available
     * agents). Read from the provider on every call (no caching); the control center polls it about
     * every 20 seconds. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLiveSnapshot.Responses.$200>
  }
  ['/v1/manager/agents/live']: {
    /**
     * listLiveAgents - listLiveAgents
     * 
     * The organization's phone agents with their live phone status, their skills (as the phone system
     * holds them) and the queues they can take calls from. Agents that are epilot phone agents carry
     * the epilot `user_id`. Queue eligibility is derived from every queue's routing steps (skills and
     * people). The control center filters and searches this list client-side and polls it about every
     * 20 seconds. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListLiveAgents.Responses.$200>
  }
  ['/v1/manager/agents/{provider_agent_id}/routing']: {
    /**
     * setAgentRouting - setAgentRouting
     * 
     * Sets an agent's skills and direct queue membership (full sets, not deltas), in this order:
     * 1. Skills: the agent's skills in the phone system are replaced by `skills`, so the phone system
     *    routes on them right away. The phone system is the source of truth for phone skills; they are
     *    independent of the skills in epilot's Access Management.
     * 2. Direct queue membership: each listed queue gets the agent in its epilot-managed routing step
     *    (created on first use, lowest precedence, never touching the organization's own routing in
     *    the phone system); every other queue's epilot-managed step drops the agent. Eligibility
     *    through the phone system's own routing is not changed (`locked`).
     * Idempotent; a failure part-way answers `502` and repeating the call completes it. Requires
     * `phone:manage`.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRouting.PathParameters> | null,
      data?: Paths.SetAgentRouting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetAgentRouting.Responses.$200>
  }
  ['/v1/manager/agents/{provider_agent_id}/routing:preview']: {
    /**
     * previewAgentRouting - previewAgentRouting
     * 
     * The routing impact of `setAgentRouting` with the same body, without changing anything: the
     * queues the agent can take calls from now (as the phone system routes today) and after the
     * change, what is added and removed, the queues that would lose their last available agent, and
     * the queues the agent stays in through the phone system's own routing. Requires `phone:manage`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRoutingPreview.PathParameters> | null,
      data?: Paths.PreviewAgentRouting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewAgentRouting.Responses.$200>
  }
  ['/v1/manager/queues']: {
    /**
     * listQueues - listQueues
     * 
     * The organization's queues with live demand (waiting calls, longest wait), staffing (eligible
     * vs available agents), derived health and who can take their calls: the routing steps in the
     * order the phone system tries them, each naming skills and people. Routing is read-only in the
     * control center except the epilot-managed step that `setAgentRouting` maintains. Polled about
     * every 20 seconds. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListQueues.Responses.$200>
  }
  ['/v1/manager/queues/{queue_id}']: {
    /**
     * getQueue - getQueue
     * 
     * One queue for the control center's queue drawer: the overview fields plus the agents currently
     * eligible for it (with live status and how they are eligible) and the calls waiting in it.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1ManagerQueues$QueueId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetQueue.Responses.$200>
  }
  ['/v1/manager/reporting/calls']: {
    /**
     * getCallReport - getCallReport
     * 
     * Inbound call outcomes for a period, from the provider's call reporting: how many inbound calls
     * there were, how many an agent handled (bridged) and how many ended without an agent (abandoned
     * or failed), plus the inbound total of the period of the same length just before, for the
     * trend. The window is at most 31 days. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetCallReport.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCallReport.Responses.$200>
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


export type AgentPresence = Components.Schemas.AgentPresence;
export type AgentQueueEligibility = Components.Schemas.AgentQueueEligibility;
export type AgentRouting = Components.Schemas.AgentRouting;
export type AgentRoutingPreview = Components.Schemas.AgentRoutingPreview;
export type AgentRoutingRequest = Components.Schemas.AgentRoutingRequest;
export type AgentState = Components.Schemas.AgentState;
export type AssignPhoneAgentRequest = Components.Schemas.AssignPhoneAgentRequest;
export type CallReport = Components.Schemas.CallReport;
export type CustomerBatchSearchResult = Components.Schemas.CustomerBatchSearchResult;
export type CustomerIdentifier = Components.Schemas.CustomerIdentifier;
export type CustomerSearchResult = Components.Schemas.CustomerSearchResult;
export type CustomerSummary = Components.Schemas.CustomerSummary;
export type EligibilityPath = Components.Schemas.EligibilityPath;
export type EligibleAgent = Components.Schemas.EligibleAgent;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type LiveAgent = Components.Schemas.LiveAgent;
export type LiveAgentCounters = Components.Schemas.LiveAgentCounters;
export type LiveSnapshot = Components.Schemas.LiveSnapshot;
export type ManagerStatus = Components.Schemas.ManagerStatus;
export type PersonRef = Components.Schemas.PersonRef;
export type PhoneAgent = Components.Schemas.PhoneAgent;
export type ProviderSetup = Components.Schemas.ProviderSetup;
export type ProviderSetupRequest = Components.Schemas.ProviderSetupRequest;
export type ProviderSetupSummary = Components.Schemas.ProviderSetupSummary;
export type QueueDetail = Components.Schemas.QueueDetail;
export type QueueHealth = Components.Schemas.QueueHealth;
export type QueueLive = Components.Schemas.QueueLive;
export type QueueOverview = Components.Schemas.QueueOverview;
export type QueueRef = Components.Schemas.QueueRef;
export type QueueRoutingStep = Components.Schemas.QueueRoutingStep;
export type Skill = Components.Schemas.Skill;
export type WaitingCall = Components.Schemas.WaitingCall;
