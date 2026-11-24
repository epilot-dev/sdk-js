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
         * The phone call a user is on right now.
         */
        export interface ActiveCall {
            /**
             * Whether the user is on an answered call. The other fields are present only when true.
             */
            on_call: boolean;
            /**
             * The phone system's conversation id: the same on every leg of a transferred or conferenced
             * call, and the `external_id` of the `call` entity created after the call.
             *
             * example:
             * 01KW704DAM1PM5SDGKFDY9BNK0
             */
            conversation_id?: string;
            /**
             * When the user's part of the call started
             */
            started_at?: string; // date-time
            /**
             * `softphone`: reported by the epilot 360 phone. `provider`: read from the phone system's
             * live state because no current report exists.
             *
             */
            source?: "softphone" | "provider";
            /**
             * Until when the report is valid unless renewed (`softphone` only)
             */
            expires_at?: string; // date-time
        }
        export interface ActiveCallReport {
            /**
             * The phone system's conversation id of the call (not the id of the user's own leg)
             * example:
             * 01KW704DAM1PM5SDGKFDY9BNK0
             */
            conversation_id: string;
            /**
             * When the user's part of the call started, as an ISO 8601 time. Without one (or with a
             * time that is not one, or lies in the future) it is the first report of the conversation.
             *
             * example:
             * 2026-11-10T10:00:00.000Z
             */
            started_at?: string;
        }
        export interface AgentActivity {
            provider_agent_id: string;
            from: string; // date-time
            to: string; // date-time
            events: AgentActivityEvent[];
            presence_totals: AgentPresenceTotal[];
            calls_handled: number;
        }
        export interface AgentActivityEvent {
            at: string; // date-time
            kind: "presence" | "call" | "state" | "other";
            presence?: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
            call?: {
                call_id?: string;
                direction?: "inbound" | "outbound";
                queue_name?: string;
                duration_seconds?: number;
            };
            /**
             * The phone system's own wording for an event of kind `state` or `other`
             */
            description?: string;
        }
        export interface AgentPerformance {
            provider_agent_id?: string;
            /**
             * The epilot user id, when the agent is an epilot phone agent
             */
            user_id?: string;
            name: string;
            calls_handled: number;
            outbound_calls?: number;
            talk_seconds_total: number;
            talk_seconds_average: number;
            hold_seconds_total?: number;
            wrap_up_seconds_average?: number;
            handle_seconds_average: number;
        }
        export interface AgentPerformanceReport {
            from: string; // date-time
            to: string; // date-time
            results: AgentPerformance[];
        }
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
        export interface AgentPresenceChange {
            provider_agent_id: string;
            presence: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
        }
        export interface AgentPresenceRequest {
            /**
             * The `name` of one of the phone system's presences (`listAgentPresences`)
             */
            presence: string;
        }
        export interface AgentPresenceTotal {
            presence: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
            seconds: number;
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
                 * - `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
                 *   system; the control center can take them off the queue;
                 * - `routing`: a step reaches the agent through a team set up in the phone system; epilot does not
                 *   change teams.
                 *
                 */
                EligibilityPath,
                .../**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
                 *   system; the control center can take them off the queue;
                 * - `routing`: a step reaches the agent through a team set up in the phone system; epilot does not
                 *   change teams.
                 *
                 */
                EligibilityPath[]
            ];
            /**
             * The agent's skills that make the queue route to them (empty unless `via` has `skill`)
             */
            skills: string[];
            /**
             * The agent reaches the queue through a team set up in the phone system (`via` has `routing`),
             * so changing skills or direct membership cannot remove the queue.
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
             * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
             * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
             * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
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
             * Queues the agent stays in through a team set up in the phone system (or, without
             * `include_own_steps`, through the organization's own steps), which this call cannot remove
             *
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
             * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
             * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
             * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            /**
             * The queues the agent is named in directly (full set); at most 200. Without
             * `include_own_steps` only the epilot-managed step counts.
             *
             */
            queue_ids: string /* ^[A-Za-z0-9_-]+$ */[];
            /**
             * `queue_ids` covers the organization's own enabled routing steps too: a queue left out loses
             * the agent's direct entries there as well. Without it, a queue whose own steps name the agent
             * is not written (`locked` in the preview).
             *
             */
            include_own_steps?: boolean;
        }
        /**
         * The agent's live line state as the provider reports it, plus `busy` for anyone who cannot take a
         * queue call for a reason other than a call: on a presence that takes no calls (e.g. Busy, Break),
         * without a presence, or disabled at the provider; `busy` also covers the provider's busy line
         * state. `unknown` when the provider gives no state. `offline` is not reported for now: Babelforce
         * parks a signed-out agent on its Busy presence and reports both alike, so signed-out agents show
         * as `busy` until the phone system offers a sign-in signal. `in_call` covers ringing-to-bridged;
         * `wrap_up` is the post-call time.
         *
         */
        export type AgentState = "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown";
        export interface AssignPhoneAgentRequest {
            /**
             * epilot user id of an active member of the caller's organization
             */
            user_id: string; // ^[A-Za-z0-9_-]+$
        }
        export interface CallHandlingSettings {
            wrap_up: {
                inbound_cancel_allowed: boolean;
                inbound_extend_allowed: boolean;
                inbound_max_extension_seconds: number;
                /**
                 * Wrap-up after outbound calls
                 */
                outbound_enabled: boolean;
                outbound_cancel_allowed: boolean;
                outbound_extend_allowed: boolean;
                outbound_max_extension_seconds: number;
                /**
                 * Agents may place outbound calls during wrap-up
                 */
                outbound_calls_allowed: boolean;
            };
            after_unsuccessful_inbound: WrapUpTimes;
            after_unsuccessful_outbound: WrapUpTimes;
            recording: {
                always_record_outbound: boolean;
                agents_may_delete: boolean;
                hide_recording_controls: boolean;
            };
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
        export interface CreateSkillRequest {
            /**
             * The skill; trimmed, then 1 to 100 characters, stored lowercased (see `Skill`)
             */
            tag: string;
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
         * - `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
         *   system; the control center can take them off the queue;
         * - `routing`: a step reaches the agent through a team set up in the phone system; epilot does not
         *   change teams.
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
             * The agent's live line state as the provider reports it, plus `busy` for anyone who cannot take a
             * queue call for a reason other than a call: on a presence that takes no calls (e.g. Busy, Break),
             * without a presence, or disabled at the provider; `busy` also covers the provider's busy line
             * state. `unknown` when the provider gives no state. `offline` is not reported for now: Babelforce
             * parks a signed-out agent on its Busy presence and reports both alike, so signed-out agents show
             * as `busy` until the phone system offers a sign-in signal. `in_call` covers ringing-to-bridged;
             * `wrap_up` is the post-call time.
             *
             */
            AgentState;
            presence?: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ AgentPresence;
            via: [
                /**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
                 *   system; the control center can take them off the queue;
                 * - `routing`: a step reaches the agent through a team set up in the phone system; epilot does not
                 *   change teams.
                 *
                 */
                EligibilityPath,
                .../**
                 * How an agent can take a queue's calls:
                 * - `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
                 * - `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
                 *   system; the control center can take them off the queue;
                 * - `routing`: a step reaches the agent through a team set up in the phone system; epilot does not
                 *   change teams.
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
             * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
             * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
             * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
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
        /**
         * The KPI window, in the organization's phone system time zone: today, yesterday, this week
         * (since Monday), last week (Monday to Monday), last 7 / 30 days (seven / thirty calendar days
         * including today), this month, last month; `custom` is the window `from`/`to` of the request.
         *
         */
        export type KpiPeriod = "today" | "yesterday" | "this_week" | "last_week" | "last_7_days" | "last_30_days" | "this_month" | "last_month" | "custom";
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
             * The agent's live line state as the provider reports it, plus `busy` for anyone who cannot take a
             * queue call for a reason other than a call: on a presence that takes no calls (e.g. Busy, Break),
             * without a presence, or disabled at the provider; `busy` also covers the provider's busy line
             * state. `unknown` when the provider gives no state. `offline` is not reported for now: Babelforce
             * parks a signed-out agent on its Busy presence and reports both alike, so signed-out agents show
             * as `busy` until the phone system offers a sign-in signal. `in_call` covers ringing-to-bridged;
             * `wrap_up` is the post-call time.
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
             * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
             * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
             * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
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
             * Everyone not offline (today everyone; see `offline`)
             */
            online: number;
            available: number;
            /**
             * Ringing or bridged
             */
            on_call: number;
            wrap_up: number;
            /**
             * Agents the phone system reports as signed out. Always 0 for now: Babelforce gives no sign-in
             * signal, so signed-out agents are counted as busy (in `online`)
             *
             */
            offline: number;
        }
        /**
         * Every KPI is absent when the phone system cannot tell it.
         */
        export interface LiveKpis {
            captured_at: string; // date-time
            period: /**
             * The KPI window, in the organization's phone system time zone: today, yesterday, this week
             * (since Monday), last week (Monday to Monday), last 7 / 30 days (seven / thirty calendar days
             * including today), this month, last month; `custom` is the window `from`/`to` of the request.
             *
             */
            KpiPeriod;
            /**
             * Inbound calls in the period
             */
            calls_total?: number;
            /**
             * Inbound calls an agent took
             */
            answered_total?: number;
            /**
             * Inbound calls that ended before an agent took them
             */
            abandoned_total?: number;
            abandon_rate_percent?: number;
            average_wait_seconds?: number;
            longest_wait_seconds?: number;
            average_talk_seconds?: number;
            /**
             * Talk plus hold plus wrap-up, per handled call
             */
            average_handle_seconds?: number;
            /**
             * Time callers spent on hold, per handled call
             */
            average_hold_seconds?: number;
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
            /**
             * The phone system's forecast of the wait for a caller joining now, across queues; absent when it has none
             */
            expected_wait_seconds?: number;
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
             * Why the organization is not ready (empty when ready). `identity_enablement_missing` is
             * reserved and not produced: the organization's enablement on the identity client is not
             * recorded here.
             *
             */
            reasons: ("provider_tenant_missing" | "sso_not_configured" | "scim_not_configured" | "identity_enablement_missing")[];
        }
        export interface MissedCall {
            /**
             * The caller's latest missed call; the id to request a callback with
             */
            call_id: string;
            last_missed_at: string; // date-time
            first_missed_at?: string; // date-time
            /**
             * The caller's missed calls in the period
             */
            attempts: number;
            queue?: QueueRef;
            longest_wait_seconds?: number;
            caller: MissedCallCaller;
            /**
             * The caller was reached later in the period
             */
            resolved: boolean;
            /**
             * Not anonymous, not resolved and no callback pending
             */
            can_call_back: boolean;
            callback?: MissedCallCallback;
        }
        export interface MissedCallCallback {
            /**
             * The callback call's state in the phone system
             */
            state: "queued" | "ringing" | "in_progress" | "completed" | "failed" | "canceled" | "unknown";
            requested_at: string; // date-time
            /**
             * The epilot user id of the manager who asked for it
             */
            requested_by?: string;
            queue?: QueueRef;
            callback_call_id?: string;
        }
        export interface MissedCallCallbackRequest {
            /**
             * The queue whose agents take the callback; the missed call's queue when absent
             */
            queue_id?: string; // ^[A-Za-z0-9_-]+$
        }
        export interface MissedCallCaller {
            /**
             * The caller withheld the number; such a caller cannot be called back
             */
            anonymous: boolean;
            /**
             * The caller's number with all but the last four digits masked
             */
            number_masked?: string;
            /**
             * The epilot contact whose phone number matches, when exactly one does
             */
            contact?: {
                id: string;
                name: string;
            };
        }
        export interface MissedCallList {
            from: string; // date-time
            to: string; // date-time
            results: MissedCall[];
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
             * The admin-portal operator who last ran the setup (email, else the operator id)
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
             * The admin-portal operator who last ran the setup (email, else the operator id)
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
             * The phone system's forecast of the wait for a caller joining this queue now; absent when it has none
             */
            expected_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: a waiting caller has no agent to take them: every caller not yet with an agent needs
             * their own eligible agent who is available or being rung, one agent counting once across the
             * queues of the same answer (so three callers and one free agent, or two queues sharing one free
             * agent, are at risk). `quiet`: nothing waiting and nobody available. `healthy`: otherwise.
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
             * phone system appear as the people they contain (`team_members`). The epilot-managed step holds
             * the people added from the control center; every other step is the organization's own routing:
             * its teams are never changed, its named people are removed only by `setAgentRouting` with
             * `include_own_steps`, and its skills are changed only by `setQueueSkill`, `removeQueueSkill`
             * and `deleteSkill`.
             *
             */
            QueueRoutingStep[];
            captured_at: string; // date-time
            eligible_agents: /* An agent who can take the queue's calls, with live status */ EligibleAgent[];
            waiting_calls: WaitingCall[];
        }
        /**
         * `at_risk`: a waiting caller has no agent to take them: every caller not yet with an agent needs
         * their own eligible agent who is available or being rung, one agent counting once across the
         * queues of the same answer (so three callers and one free agent, or two queues sharing one free
         * agent, are at risk). `quiet`: nothing waiting and nobody available. `healthy`: otherwise.
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
             * The phone system's forecast of the wait for a caller joining this queue now; absent when it has none
             */
            expected_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: a waiting caller has no agent to take them: every caller not yet with an agent needs
             * their own eligible agent who is available or being rung, one agent counting once across the
             * queues of the same answer (so three callers and one free agent, or two queues sharing one free
             * agent, are at risk). `quiet`: nothing waiting and nobody available. `healthy`: otherwise.
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
             * The phone system's forecast of the wait for a caller joining this queue now; absent when it has none
             */
            expected_wait_seconds?: number;
            /**
             * Agents the queue's routing steps resolve to
             */
            eligible: number;
            /**
             * Eligible agents whose state is `available` right now
             */
            available: number;
            health: /**
             * `at_risk`: a waiting caller has no agent to take them: every caller not yet with an agent needs
             * their own eligible agent who is available or being rung, one agent counting once across the
             * queues of the same answer (so three callers and one free agent, or two queues sharing one free
             * agent, are at risk). `quiet`: nothing waiting and nobody available. `healthy`: otherwise.
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
             * phone system appear as the people they contain (`team_members`). The epilot-managed step holds
             * the people added from the control center; every other step is the organization's own routing:
             * its teams are never changed, its named people are removed only by `setAgentRouting` with
             * `include_own_steps`, and its skills are changed only by `setQueueSkill`, `removeQueueSkill`
             * and `deleteSkill`.
             *
             */
            QueueRoutingStep[];
        }
        export interface QueuePerformance {
            queue: QueueRef;
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
             * abandoned_or_failed / inbound_total, one decimal; 0 without calls
             */
            abandon_rate_percent: number;
            /**
             * Average time callers waited in the queue (whole seconds); absent when no record says
             */
            average_wait_seconds?: number;
        }
        export interface QueuePerformanceReport {
            from: string; // date-time
            to: string; // date-time
            /**
             * One entry per current queue, sorted by queue name
             */
            results: QueuePerformance[];
        }
        export interface QueueRef {
            id: string;
            name: string;
        }
        /**
         * One step of who can take a queue's calls, in the order the phone system tries them. A step
         * offers calls to the people it names and to everyone with any of its skills. Teams set up in the
         * phone system appear as the people they contain (`team_members`). The epilot-managed step holds
         * the people added from the control center; every other step is the organization's own routing:
         * its teams are never changed, its named people are removed only by `setAgentRouting` with
         * `include_own_steps`, and its skills are changed only by `setQueueSkill`, `removeQueueSkill`
         * and `deleteSkill`.
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
             * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
             * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
             * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
             *
             */
            Skill /* ^\S(.*\S)?$ */[];
            /**
             * People the step names, directly or through a team set up in the phone system
             */
            people: /* An agent as a routing step names them */ PersonRef[];
            /**
             * The `provider_agent_id`s of the people in `people` the step reaches only through a team
             * (not named in the step itself). The control center cannot take them off the queue.
             *
             */
            team_members: string[];
            /**
             * The step `setAgentRouting` adds people to; with `include_own_steps` it removes people from
             * the organization's own enabled steps too
             *
             */
            managed_by_epilot: boolean;
        }
        export interface QueueSettings {
            queue_id: string;
            name: string;
            /**
             * How many callers may wait in the queue (0 = no limit)
             */
            max_size: number;
            /**
             * How long an agent's phone rings before the next agent is tried
             */
            ring_timeout_seconds: number;
            /**
             * Wrap-up time after a call from this queue
             */
            wrap_up_seconds: number;
            /**
             * How many agents are tried per call
             */
            max_dial_count: number;
        }
        export interface QueueSettingsUpdate {
            /**
             * How many callers may wait in the queue (0 = no limit)
             */
            max_size: number;
            /**
             * How long an agent's phone rings before the next agent is tried
             */
            ring_timeout_seconds: number;
            /**
             * Wrap-up time after a call from this queue
             */
            wrap_up_seconds: number;
            /**
             * How many agents are tried per call
             */
            max_dial_count: number;
        }
        export interface QueueSkillChange {
            queue: QueueRef;
            tag: string;
            /**
             * Whether the queue accepts the skill after the change
             */
            accepted: boolean;
            /**
             * `accepted: true` only: the routing step that lists the skill
             */
            step?: {
                id: string;
                label: string;
            };
        }
        /**
         * A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
         * `<skill category>:<label>` (e.g. `language:german`), which the control center shows as
         * "Category · Label"; a skill without a colon has no category.
         * Skills are case-insensitive and stored lowercased, in epilot's catalogue as in the phone system
         * (Babelforce lowercases the tags it stores): a skill sent in any letter case (`Language:German`,
         * in a body or a path) is the skill `language:german`, and every answer lists skills lowercased.
         *
         */
        export type Skill = string; // ^\S(.*\S)?$
        export interface SkillCatalogue {
            results: SkillCatalogueEntry[];
        }
        export interface SkillCatalogueEntry {
            /**
             * The skill as the phone system stores it, lowercased (see `Skill`)
             */
            tag: string;
            /**
             * `epilot`: in epilot's catalogue (created in the control center); `provider`: only seen in the phone
             * system (on an agent or in a queue's routing step)
             *
             */
            source: "epilot" | "provider";
            /**
             * `source: epilot` only
             */
            created_at?: string; // date-time
            /**
             * `source: epilot` only: the epilot user id of the manager who created it
             */
            created_by?: string;
        }
        export interface SkillDeletion {
            tag: string;
            /**
             * Agents the skill was taken from
             */
            agents_updated: number;
            /**
             * Queues whose routing steps listed the skill
             */
            queues_updated: number;
        }
        export interface WaitingCall {
            id: string;
            /**
             * The caller's number with all but the last four digits hidden
             */
            from_masked?: string;
            /**
             * The epilot contact whose phone number matches, when exactly one does (the same customer
             * search as Missed calls and the phone app, under the calling manager's permissions;
             * answers are remembered for up to 60 s per manager)
             *
             */
            contact?: {
                id: string;
                name: string;
            };
            waited_seconds: number;
            /**
             * The provider's call state (e.g. `queued`, `ringing`)
             */
            state: string;
        }
        export interface WrapUpTimes {
            busy_seconds: number;
            unreachable_seconds: number;
            declined_seconds: number;
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
    namespace ClearActiveCall {
        namespace Parameters {
            export type ConversationId = string;
        }
        export interface QueryParameters {
            conversation_id?: Parameters.ConversationId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace CreateSkill {
        export type RequestBody = Components.Schemas.CreateSkillRequest;
        namespace Responses {
            export type $201 = Components.Schemas.SkillCatalogueEntry;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace DeleteSkill {
        namespace Responses {
            export type $200 = Components.Schemas.SkillDeletion;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetActiveCall {
        namespace Responses {
            export type $200 = /* The phone call a user is on right now. */ Components.Schemas.ActiveCall;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetAgentActivity {
        namespace Parameters {
            export type From = string; // date-time
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentActivity;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetAgentPerformance {
        namespace Parameters {
            export type From = string; // date-time
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentPerformanceReport;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetCallHandlingSettings {
        namespace Responses {
            export type $200 = Components.Schemas.CallHandlingSettings;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetCallReport {
        namespace Parameters {
            export type From = string; // date-time
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
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
    namespace GetLiveKpis {
        namespace Parameters {
            export type From = string; // date-time
            export type Period = /**
             * The KPI window, in the organization's phone system time zone: today, yesterday, this week
             * (since Monday), last week (Monday to Monday), last 7 / 30 days (seven / thirty calendar days
             * including today), this month, last month; `custom` is the window `from`/`to` of the request.
             *
             */
            Components.Schemas.KpiPeriod;
            export type To = string; // date-time
        }
        export interface QueryParameters {
            period?: Parameters.Period;
            from?: Parameters.From /* date-time */;
            to?: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = /* Every KPI is absent when the phone system cannot tell it. */ Components.Schemas.LiveKpis;
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
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetQueuePerformance {
        namespace Parameters {
            export type From = string; // date-time
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.QueuePerformanceReport;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace GetQueueSettings {
        namespace Responses {
            export type $200 = Components.Schemas.QueueSettings;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace ListAgentPresences {
        namespace Responses {
            export interface $200 {
                results: /* The provider presence the agent has selected (e.g. Available, Break, Meeting) */ Components.Schemas.AgentPresence[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
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
    namespace ListMissedCalls {
        namespace Parameters {
            export type From = string; // date-time
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MissedCallList;
            export type $400 = Components.Responses.BadRequest;
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
    namespace ListSkills {
        namespace Responses {
            export type $200 = Components.Schemas.SkillCatalogue;
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
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Schemas.ErrorResponse;
        }
    }
    namespace RemoveQueueSkill {
        namespace Responses {
            export type $200 = Components.Schemas.QueueSkillChange;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace ReportActiveCall {
        export type RequestBody = Components.Schemas.ActiveCallReport;
        namespace Responses {
            export type $200 = /* The phone call a user is on right now. */ Components.Schemas.ActiveCall;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace RequestMissedCallCallback {
        export type RequestBody = Components.Schemas.MissedCallCallbackRequest;
        namespace Responses {
            export type $202 = Components.Schemas.MissedCallCallback;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace SetAgentPresence {
        export type RequestBody = Components.Schemas.AgentPresenceRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AgentPresenceChange;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
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
    namespace SetCallHandlingSettings {
        export type RequestBody = Components.Schemas.CallHandlingSettings;
        namespace Responses {
            export type $200 = Components.Schemas.CallHandlingSettings;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace SetQueueSettings {
        export type RequestBody = Components.Schemas.QueueSettingsUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.QueueSettings;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $502 = Components.Responses.BadGateway;
        }
    }
    namespace SetQueueSkill {
        namespace Responses {
            export type $200 = Components.Schemas.QueueSkillChange;
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
    namespace V1ManagerAgents$ProviderAgentIdActivity {
        namespace Parameters {
            export type ProviderAgentId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            provider_agent_id: Parameters.ProviderAgentId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
    namespace V1ManagerAgents$ProviderAgentIdPresence {
        namespace Parameters {
            export type ProviderAgentId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            provider_agent_id: Parameters.ProviderAgentId /* ^[A-Za-z0-9_-]+$ */;
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
    namespace V1ManagerMissedCalls$CallIdCallback {
        namespace Parameters {
            export type CallId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            call_id: Parameters.CallId /* ^[A-Za-z0-9_-]+$ */;
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
    namespace V1ManagerQueues$QueueIdSettings {
        namespace Parameters {
            export type QueueId = string; // ^[A-Za-z0-9_-]+$
        }
        export interface PathParameters {
            queue_id: Parameters.QueueId /* ^[A-Za-z0-9_-]+$ */;
        }
    }
    namespace V1ManagerQueues$QueueIdSkills$Tag {
        namespace Parameters {
            export type QueueId = string; // ^[A-Za-z0-9_-]+$
            export type Tag = string;
        }
        export interface PathParameters {
            queue_id: Parameters.QueueId /* ^[A-Za-z0-9_-]+$ */;
            tag: Parameters.Tag;
        }
    }
    namespace V1ManagerSkills$Tag {
        namespace Parameters {
            export type Tag = string;
        }
        export interface PathParameters {
            tag: Parameters.Tag;
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
   * getActiveCall - getActiveCall
   * 
   * Whether the signed-in user is on a phone call right now, and which conversation it is. The
   * answer is about the caller only (the user of the bearer token).
   * 
   * The epilot 360 phone reports the call while it lasts (reportActiveCall); without a current
   * report the phone system's live state is asked instead, so a call taken outside the epilot 360
   * phone is still found. `conversation_id` is the phone system's conversation id: every leg of a
   * transferred or conferenced call has the same one, and it is the `external_id` of the `call`
   * entity created after the call (ingestCallArtifacts).
   * 
   * To relate what an agent does during a call to that call, put the id into the record as
   * `phone_conversation_id`: the epilot 360 sidebar passes it in the context of a journey opened
   * during a call, so the submission holds `journey_context.phone_conversation_id`.
   * 
   */
  'getActiveCall'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActiveCall.Responses.$200>
  /**
   * reportActiveCall - reportActiveCall
   * 
   * Reports the call the signed-in user is on. Sent by the epilot 360 phone when a call is
   * answered and again every 30 seconds while it lasts: a report is valid for 2 minutes
   * (`expires_at`), so a phone that disappears mid-call does not leave the user on a call.
   * One call per user: a report for another conversation replaces the previous one.
   * Requires `phone:use`.
   * 
   */
  'reportActiveCall'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ReportActiveCall.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReportActiveCall.Responses.$200>
  /**
   * clearActiveCall - clearActiveCall
   * 
   * Clears the signed-in user's reported call, when their part of it ended (hung up, or handed
   * over to another agent). With `conversation_id`, only a report of that conversation is
   * cleared, so a late "call ended" never clears the next call. Idempotent.
   * 
   */
  'clearActiveCall'(
    parameters?: Parameters<Paths.ClearActiveCall.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ClearActiveCall.Responses.$204>
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
   * agents). The provider's live reads are shared per organization for 2 seconds, so
   * `captured_at` is the time of the oldest read behind the answer. Requires `phone:manage`.
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
   * people). Live reads are shared per organization for 2 seconds (see getLiveSnapshot). Requires
   * `phone:manage`.
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
   * 1. Skills: the agent's skills in the phone system are replaced by `skills` (lowercased, see
   *    `Skill`), so the phone system routes on them right away. The phone system is the source of
   *    truth for phone skills; they are independent of the skills in epilot's Access Management.
   * 2. Direct queue membership: each listed queue the agent is not yet named in gets the agent in its
   *    epilot-managed routing step (created on first use, lowest precedence). Every other queue drops
   *    the agent's direct entries from its epilot-managed step and, with `include_own_steps`, from
   *    the organization's own enabled steps as well. Teams set up in the phone system are never
   *    changed: a queue that reaches the agent through one keeps them (`locked`). Without
   *    `include_own_steps` a queue whose own steps name the agent is not written either.
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
   * the queues the agent stays in through a team set up in the phone system (or, without
   * `include_own_steps`, through the organization's own steps). Requires `phone:manage`.
   * 
   */
  'previewAgentRouting'(
    parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRoutingPreview.PathParameters> | null,
    data?: Paths.PreviewAgentRouting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewAgentRouting.Responses.$200>
  /**
   * setAgentPresence - setAgentPresence
   * 
   * Puts the agent on one of the phone system's presences (`listAgentPresences`), as the agent could
   * in the phone app. A presence that is not `available` stops queue calls to the agent until it
   * changes again. Idempotent. Requires `phone:manage`.
   * 
   */
  'setAgentPresence'(
    parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdPresence.PathParameters> | null,
    data?: Paths.SetAgentPresence.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetAgentPresence.Responses.$200>
  /**
   * listAgentPresences - listAgentPresences
   * 
   * The presences the organization's agents can be on (e.g. Available, Break, Meeting), as the phone
   * system defines them. `available` presences let agents take queue calls. Requires `phone:manage`.
   * 
   */
  'listAgentPresences'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAgentPresences.Responses.$200>
  /**
   * listQueues - listQueues
   * 
   * The organization's queues with live demand (waiting calls, longest wait), staffing (eligible
   * vs available agents), derived health and who can take their calls: the routing steps in the
   * order the phone system tries them, each naming skills and people. Live reads are shared per
   * organization for 2 seconds (see getLiveSnapshot). Requires `phone:manage`.
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
   * getLiveKpis - getLiveKpis
   * 
   * Service KPIs of the organization's phone team for a period: call counts, abandon rate, waits
   * and handling times, from the provider's metrics or, where it has none, its call reporting. A KPI
   * the provider cannot tell is absent rather than zero. The period is either a named one
   * (`period`, a window in the phone system's time zone) or a custom window: `from` and `to`
   * (at most 31 days, `period` absent or `custom`), whose KPIs come from the call reporting alone
   * (the provider's metrics know named ranges only). The provider's reads are shared per
   * organization for 2 seconds. Requires `phone:manage`.
   * 
   */
  'getLiveKpis'(
    parameters?: Parameters<Paths.GetLiveKpis.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLiveKpis.Responses.$200>
  /**
   * getAgentPerformance - getAgentPerformance
   * 
   * Per-agent performance for a period from the provider's call reporting: calls handled and talk,
   * hold, wrap-up and handle times, one row per agent who handled at least one call. Agents that are
   * epilot phone agents carry the epilot `user_id`. The window is at most 31 days.
   * Requires `phone:manage`.
   * 
   */
  'getAgentPerformance'(
    parameters?: Parameters<Paths.GetAgentPerformance.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentPerformance.Responses.$200>
  /**
   * listMissedCalls - listMissedCalls
   * 
   * Callers who did not reach an agent in a period, newest first, one row per caller: an inbound
   * call (grouped by the provider's session, so transfer legs count once) that ended without being
   * bridged to an agent. `attempts` counts the caller's missed calls in the period; `resolved` is
   * true when the caller was reached later in the period (a later inbound call bridged to an agent,
   * or an answered outbound call to the number). Numbers are masked; the epilot contact is joined
   * by phone number when one matches. A callback requested through `requestMissedCallCallback` is
   * shown with its live state. The window is at most 31 days.
   * Requires `phone:manage`.
   * 
   */
  'listMissedCalls'(
    parameters?: Parameters<Paths.ListMissedCalls.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMissedCalls.Responses.$200>
  /**
   * requestMissedCallCallback - requestMissedCallCallback
   * 
   * Asks the phone system to call the caller of a missed call back: the provider queues an outbound
   * callback on a queue (the missed call's queue unless `queue_id` names another), so the next
   * eligible agent of that queue gets the call. The caller's number never leaves the API. Refused
   * for an anonymous caller and while an earlier callback for the same caller is still pending.
   * Recorded with who requested it, so every manager sees it.
   * Requires `phone:manage`.
   * 
   */
  'requestMissedCallCallback'(
    parameters?: Parameters<Paths.V1ManagerMissedCalls$CallIdCallback.PathParameters> | null,
    data?: Paths.RequestMissedCallCallback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestMissedCallCallback.Responses.$202>
  /**
   * getAgentActivity - getAgentActivity
   * 
   * An agent's activity in a period from the provider's agent logs: presence changes and calls in
   * time order, the time spent on each presence and the number of calls handled. The window is at
   * most 31 days.
   * Requires `phone:manage`.
   * 
   */
  'getAgentActivity'(
    parameters?: Parameters<Paths.GetAgentActivity.QueryParameters & Paths.V1ManagerAgents$ProviderAgentIdActivity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentActivity.Responses.$200>
  /**
   * getQueueSettings - getQueueSettings
   * 
   * A queue's call handling settings as the phone system holds them: how many callers may wait,
   * how long an agent's phone rings, the wrap-up time after a call and how many agents are tried
   * per call.
   * Requires `phone:manage`.
   * 
   */
  'getQueueSettings'(
    parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSettings.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetQueueSettings.Responses.$200>
  /**
   * setQueueSettings - setQueueSettings
   * 
   * Replaces a queue's call handling settings (all fields, not a delta); the phone system applies
   * them to the next call. The queue's name and routing are not changed.
   * Requires `phone:manage`.
   * 
   */
  'setQueueSettings'(
    parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSettings.PathParameters> | null,
    data?: Paths.SetQueueSettings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetQueueSettings.Responses.$200>
  /**
   * getCallHandlingSettings - getCallHandlingSettings
   * 
   * The organization's call handling settings for all agents: wrap-up rules (including whether
   * agents may call out during wrap-up), wrap-up times after unsuccessful calls, and recording
   * defaults.
   * Requires `phone:manage`.
   * 
   */
  'getCallHandlingSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCallHandlingSettings.Responses.$200>
  /**
   * setCallHandlingSettings - setCallHandlingSettings
   * 
   * Replaces the organization's call handling settings (the full object, not a delta).
   * Requires `phone:manage`.
   * 
   */
  'setCallHandlingSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SetCallHandlingSettings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetCallHandlingSettings.Responses.$200>
  /**
   * getQueuePerformance - getQueuePerformance
   * 
   * Inbound call outcomes per queue for a period, derived from the provider's call reporting (the
   * phone system has no per-queue report): every inbound call that started in [from, to) is counted
   * for the queue its record names. Calls whose record names no queue, or a queue name the phone
   * system no longer has, are not counted for any queue. Every current queue is listed, sorted by
   * name, also with zero calls. Same window rules as `getCallReport` (at most 31 days). Requires
   * `phone:manage`.
   * 
   */
  'getQueuePerformance'(
    parameters?: Parameters<Paths.GetQueuePerformance.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetQueuePerformance.Responses.$200>
  /**
   * listSkills - listSkills
   * 
   * The organization's skill catalogue: the skills epilot keeps for it (created in the control
   * center, `source: epilot`) together with every skill the phone system already uses on an agent or
   * in a queue's routing step (`source: provider`), each once, lowercased (see `Skill`), sorted by
   * skill. The phone system has no skill list of its own, so a skill nobody has yet exists only here.
   * Requires `phone:manage`.
   * 
   */
  'listSkills'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSkills.Responses.$200>
  /**
   * createSkill - createSkill
   * 
   * Adds a skill to the organization's catalogue (epilot only: nothing is written to the phone
   * system until an agent gets the skill or a queue accepts it). The skill is trimmed, must then be
   * 1 to 100 characters, and is stored lowercased (see `Skill`): `Mixed Case` creates and answers
   * `mixed case`, and is `skill_exists` when `mixed case` exists in any letter case. Requires
   * `phone:manage`.
   * 
   */
  'createSkill'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSkill.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSkill.Responses.$201>
  /**
   * deleteSkill - deleteSkill
   * 
   * Deletes a skill everywhere (in any letter case, see `Skill`): it is taken from every agent that has it and from every routing step
   * of every queue that accepts it in the phone system, then removed from the catalogue.
   * Idempotent: a skill nobody has answers zero counts. On a phone-system failure the answer is 502
   * and its message says how many agents and queues were already updated; deleting again completes
   * it. Requires `phone:manage`.
   * 
   */
  'deleteSkill'(
    parameters?: Parameters<Paths.V1ManagerSkills$Tag.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSkill.Responses.$200>
  /**
   * setQueueSkill - setQueueSkill
   * 
   * The queue accepts the skill: every agent with it can take the queue's calls. epilot adds the
   * skill to the queue's FIRST enabled routing step of the organization's own in the phone system
   * (lowest order, never the epilot-managed step); nothing is written when an enabled step of its own
   * already lists it. Requires `phone:manage`.
   * 
   */
  'setQueueSkill'(
    parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSkills$Tag.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetQueueSkill.Responses.$200>
  /**
   * removeQueueSkill - removeQueueSkill
   * 
   * The queue no longer accepts the skill: it is removed from every routing step of the queue that
   * lists it (enabled or not). Idempotent. Requires `phone:manage`.
   * 
   */
  'removeQueueSkill'(
    parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSkills$Tag.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveQueueSkill.Responses.$200>
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
   * the SSO configuration (new client or rotated secret) and leaves the rest untouched: of the SSO
   * configuration's named redirect entries only epilot's own is written, every other entry is kept,
   * and no entry is ever duplicated.
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
  ['/v1/calls/active']: {
    /**
     * getActiveCall - getActiveCall
     * 
     * Whether the signed-in user is on a phone call right now, and which conversation it is. The
     * answer is about the caller only (the user of the bearer token).
     * 
     * The epilot 360 phone reports the call while it lasts (reportActiveCall); without a current
     * report the phone system's live state is asked instead, so a call taken outside the epilot 360
     * phone is still found. `conversation_id` is the phone system's conversation id: every leg of a
     * transferred or conferenced call has the same one, and it is the `external_id` of the `call`
     * entity created after the call (ingestCallArtifacts).
     * 
     * To relate what an agent does during a call to that call, put the id into the record as
     * `phone_conversation_id`: the epilot 360 sidebar passes it in the context of a journey opened
     * during a call, so the submission holds `journey_context.phone_conversation_id`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetActiveCall.Responses.$200>
    /**
     * reportActiveCall - reportActiveCall
     * 
     * Reports the call the signed-in user is on. Sent by the epilot 360 phone when a call is
     * answered and again every 30 seconds while it lasts: a report is valid for 2 minutes
     * (`expires_at`), so a phone that disappears mid-call does not leave the user on a call.
     * One call per user: a report for another conversation replaces the previous one.
     * Requires `phone:use`.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ReportActiveCall.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReportActiveCall.Responses.$200>
    /**
     * clearActiveCall - clearActiveCall
     * 
     * Clears the signed-in user's reported call, when their part of it ended (hung up, or handed
     * over to another agent). With `conversation_id`, only a report of that conversation is
     * cleared, so a late "call ended" never clears the next call. Idempotent.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.ClearActiveCall.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ClearActiveCall.Responses.$204>
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
     * agents). The provider's live reads are shared per organization for 2 seconds, so
     * `captured_at` is the time of the oldest read behind the answer. Requires `phone:manage`.
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
     * people). Live reads are shared per organization for 2 seconds (see getLiveSnapshot). Requires
     * `phone:manage`.
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
     * 1. Skills: the agent's skills in the phone system are replaced by `skills` (lowercased, see
     *    `Skill`), so the phone system routes on them right away. The phone system is the source of
     *    truth for phone skills; they are independent of the skills in epilot's Access Management.
     * 2. Direct queue membership: each listed queue the agent is not yet named in gets the agent in its
     *    epilot-managed routing step (created on first use, lowest precedence). Every other queue drops
     *    the agent's direct entries from its epilot-managed step and, with `include_own_steps`, from
     *    the organization's own enabled steps as well. Teams set up in the phone system are never
     *    changed: a queue that reaches the agent through one keeps them (`locked`). Without
     *    `include_own_steps` a queue whose own steps name the agent is not written either.
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
     * the queues the agent stays in through a team set up in the phone system (or, without
     * `include_own_steps`, through the organization's own steps). Requires `phone:manage`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdRoutingPreview.PathParameters> | null,
      data?: Paths.PreviewAgentRouting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewAgentRouting.Responses.$200>
  }
  ['/v1/manager/agents/{provider_agent_id}/presence']: {
    /**
     * setAgentPresence - setAgentPresence
     * 
     * Puts the agent on one of the phone system's presences (`listAgentPresences`), as the agent could
     * in the phone app. A presence that is not `available` stops queue calls to the agent until it
     * changes again. Idempotent. Requires `phone:manage`.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1ManagerAgents$ProviderAgentIdPresence.PathParameters> | null,
      data?: Paths.SetAgentPresence.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetAgentPresence.Responses.$200>
  }
  ['/v1/manager/presences']: {
    /**
     * listAgentPresences - listAgentPresences
     * 
     * The presences the organization's agents can be on (e.g. Available, Break, Meeting), as the phone
     * system defines them. `available` presences let agents take queue calls. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAgentPresences.Responses.$200>
  }
  ['/v1/manager/queues']: {
    /**
     * listQueues - listQueues
     * 
     * The organization's queues with live demand (waiting calls, longest wait), staffing (eligible
     * vs available agents), derived health and who can take their calls: the routing steps in the
     * order the phone system tries them, each naming skills and people. Live reads are shared per
     * organization for 2 seconds (see getLiveSnapshot). Requires `phone:manage`.
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
  ['/v1/manager/live/kpis']: {
    /**
     * getLiveKpis - getLiveKpis
     * 
     * Service KPIs of the organization's phone team for a period: call counts, abandon rate, waits
     * and handling times, from the provider's metrics or, where it has none, its call reporting. A KPI
     * the provider cannot tell is absent rather than zero. The period is either a named one
     * (`period`, a window in the phone system's time zone) or a custom window: `from` and `to`
     * (at most 31 days, `period` absent or `custom`), whose KPIs come from the call reporting alone
     * (the provider's metrics know named ranges only). The provider's reads are shared per
     * organization for 2 seconds. Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetLiveKpis.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLiveKpis.Responses.$200>
  }
  ['/v1/manager/reporting/agents']: {
    /**
     * getAgentPerformance - getAgentPerformance
     * 
     * Per-agent performance for a period from the provider's call reporting: calls handled and talk,
     * hold, wrap-up and handle times, one row per agent who handled at least one call. Agents that are
     * epilot phone agents carry the epilot `user_id`. The window is at most 31 days.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetAgentPerformance.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentPerformance.Responses.$200>
  }
  ['/v1/manager/missed-calls']: {
    /**
     * listMissedCalls - listMissedCalls
     * 
     * Callers who did not reach an agent in a period, newest first, one row per caller: an inbound
     * call (grouped by the provider's session, so transfer legs count once) that ended without being
     * bridged to an agent. `attempts` counts the caller's missed calls in the period; `resolved` is
     * true when the caller was reached later in the period (a later inbound call bridged to an agent,
     * or an answered outbound call to the number). Numbers are masked; the epilot contact is joined
     * by phone number when one matches. A callback requested through `requestMissedCallCallback` is
     * shown with its live state. The window is at most 31 days.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListMissedCalls.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMissedCalls.Responses.$200>
  }
  ['/v1/manager/missed-calls/{call_id}/callback']: {
    /**
     * requestMissedCallCallback - requestMissedCallCallback
     * 
     * Asks the phone system to call the caller of a missed call back: the provider queues an outbound
     * callback on a queue (the missed call's queue unless `queue_id` names another), so the next
     * eligible agent of that queue gets the call. The caller's number never leaves the API. Refused
     * for an anonymous caller and while an earlier callback for the same caller is still pending.
     * Recorded with who requested it, so every manager sees it.
     * Requires `phone:manage`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ManagerMissedCalls$CallIdCallback.PathParameters> | null,
      data?: Paths.RequestMissedCallCallback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestMissedCallCallback.Responses.$202>
  }
  ['/v1/manager/agents/{provider_agent_id}/activity']: {
    /**
     * getAgentActivity - getAgentActivity
     * 
     * An agent's activity in a period from the provider's agent logs: presence changes and calls in
     * time order, the time spent on each presence and the number of calls handled. The window is at
     * most 31 days.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetAgentActivity.QueryParameters & Paths.V1ManagerAgents$ProviderAgentIdActivity.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentActivity.Responses.$200>
  }
  ['/v1/manager/queues/{queue_id}/settings']: {
    /**
     * getQueueSettings - getQueueSettings
     * 
     * A queue's call handling settings as the phone system holds them: how many callers may wait,
     * how long an agent's phone rings, the wrap-up time after a call and how many agents are tried
     * per call.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSettings.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetQueueSettings.Responses.$200>
    /**
     * setQueueSettings - setQueueSettings
     * 
     * Replaces a queue's call handling settings (all fields, not a delta); the phone system applies
     * them to the next call. The queue's name and routing are not changed.
     * Requires `phone:manage`.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSettings.PathParameters> | null,
      data?: Paths.SetQueueSettings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetQueueSettings.Responses.$200>
  }
  ['/v1/manager/settings/call-handling']: {
    /**
     * getCallHandlingSettings - getCallHandlingSettings
     * 
     * The organization's call handling settings for all agents: wrap-up rules (including whether
     * agents may call out during wrap-up), wrap-up times after unsuccessful calls, and recording
     * defaults.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCallHandlingSettings.Responses.$200>
    /**
     * setCallHandlingSettings - setCallHandlingSettings
     * 
     * Replaces the organization's call handling settings (the full object, not a delta).
     * Requires `phone:manage`.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SetCallHandlingSettings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetCallHandlingSettings.Responses.$200>
  }
  ['/v1/manager/reporting/queues']: {
    /**
     * getQueuePerformance - getQueuePerformance
     * 
     * Inbound call outcomes per queue for a period, derived from the provider's call reporting (the
     * phone system has no per-queue report): every inbound call that started in [from, to) is counted
     * for the queue its record names. Calls whose record names no queue, or a queue name the phone
     * system no longer has, are not counted for any queue. Every current queue is listed, sorted by
     * name, also with zero calls. Same window rules as `getCallReport` (at most 31 days). Requires
     * `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetQueuePerformance.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetQueuePerformance.Responses.$200>
  }
  ['/v1/manager/skills']: {
    /**
     * listSkills - listSkills
     * 
     * The organization's skill catalogue: the skills epilot keeps for it (created in the control
     * center, `source: epilot`) together with every skill the phone system already uses on an agent or
     * in a queue's routing step (`source: provider`), each once, lowercased (see `Skill`), sorted by
     * skill. The phone system has no skill list of its own, so a skill nobody has yet exists only here.
     * Requires `phone:manage`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSkills.Responses.$200>
    /**
     * createSkill - createSkill
     * 
     * Adds a skill to the organization's catalogue (epilot only: nothing is written to the phone
     * system until an agent gets the skill or a queue accepts it). The skill is trimmed, must then be
     * 1 to 100 characters, and is stored lowercased (see `Skill`): `Mixed Case` creates and answers
     * `mixed case`, and is `skill_exists` when `mixed case` exists in any letter case. Requires
     * `phone:manage`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSkill.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSkill.Responses.$201>
  }
  ['/v1/manager/skills/{tag}']: {
    /**
     * deleteSkill - deleteSkill
     * 
     * Deletes a skill everywhere (in any letter case, see `Skill`): it is taken from every agent that has it and from every routing step
     * of every queue that accepts it in the phone system, then removed from the catalogue.
     * Idempotent: a skill nobody has answers zero counts. On a phone-system failure the answer is 502
     * and its message says how many agents and queues were already updated; deleting again completes
     * it. Requires `phone:manage`.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1ManagerSkills$Tag.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSkill.Responses.$200>
  }
  ['/v1/manager/queues/{queue_id}/skills/{tag}']: {
    /**
     * setQueueSkill - setQueueSkill
     * 
     * The queue accepts the skill: every agent with it can take the queue's calls. epilot adds the
     * skill to the queue's FIRST enabled routing step of the organization's own in the phone system
     * (lowest order, never the epilot-managed step); nothing is written when an enabled step of its own
     * already lists it. Requires `phone:manage`.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSkills$Tag.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetQueueSkill.Responses.$200>
    /**
     * removeQueueSkill - removeQueueSkill
     * 
     * The queue no longer accepts the skill: it is removed from every routing step of the queue that
     * lists it (enabled or not). Idempotent. Requires `phone:manage`.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1ManagerQueues$QueueIdSkills$Tag.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveQueueSkill.Responses.$200>
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
     * the SSO configuration (new client or rotated secret) and leaves the rest untouched: of the SSO
     * configuration's named redirect entries only epilot's own is written, every other entry is kept,
     * and no entry is ever duplicated.
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


export type ActiveCall = Components.Schemas.ActiveCall;
export type ActiveCallReport = Components.Schemas.ActiveCallReport;
export type AgentActivity = Components.Schemas.AgentActivity;
export type AgentActivityEvent = Components.Schemas.AgentActivityEvent;
export type AgentPerformance = Components.Schemas.AgentPerformance;
export type AgentPerformanceReport = Components.Schemas.AgentPerformanceReport;
export type AgentPresence = Components.Schemas.AgentPresence;
export type AgentPresenceChange = Components.Schemas.AgentPresenceChange;
export type AgentPresenceRequest = Components.Schemas.AgentPresenceRequest;
export type AgentPresenceTotal = Components.Schemas.AgentPresenceTotal;
export type AgentQueueEligibility = Components.Schemas.AgentQueueEligibility;
export type AgentRouting = Components.Schemas.AgentRouting;
export type AgentRoutingPreview = Components.Schemas.AgentRoutingPreview;
export type AgentRoutingRequest = Components.Schemas.AgentRoutingRequest;
export type AgentState = Components.Schemas.AgentState;
export type AssignPhoneAgentRequest = Components.Schemas.AssignPhoneAgentRequest;
export type CallHandlingSettings = Components.Schemas.CallHandlingSettings;
export type CallReport = Components.Schemas.CallReport;
export type CreateSkillRequest = Components.Schemas.CreateSkillRequest;
export type CustomerBatchSearchResult = Components.Schemas.CustomerBatchSearchResult;
export type CustomerIdentifier = Components.Schemas.CustomerIdentifier;
export type CustomerSearchResult = Components.Schemas.CustomerSearchResult;
export type CustomerSummary = Components.Schemas.CustomerSummary;
export type EligibilityPath = Components.Schemas.EligibilityPath;
export type EligibleAgent = Components.Schemas.EligibleAgent;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type KpiPeriod = Components.Schemas.KpiPeriod;
export type LiveAgent = Components.Schemas.LiveAgent;
export type LiveAgentCounters = Components.Schemas.LiveAgentCounters;
export type LiveKpis = Components.Schemas.LiveKpis;
export type LiveSnapshot = Components.Schemas.LiveSnapshot;
export type ManagerStatus = Components.Schemas.ManagerStatus;
export type MissedCall = Components.Schemas.MissedCall;
export type MissedCallCallback = Components.Schemas.MissedCallCallback;
export type MissedCallCallbackRequest = Components.Schemas.MissedCallCallbackRequest;
export type MissedCallCaller = Components.Schemas.MissedCallCaller;
export type MissedCallList = Components.Schemas.MissedCallList;
export type PersonRef = Components.Schemas.PersonRef;
export type PhoneAgent = Components.Schemas.PhoneAgent;
export type ProviderSetup = Components.Schemas.ProviderSetup;
export type ProviderSetupRequest = Components.Schemas.ProviderSetupRequest;
export type ProviderSetupSummary = Components.Schemas.ProviderSetupSummary;
export type QueueDetail = Components.Schemas.QueueDetail;
export type QueueHealth = Components.Schemas.QueueHealth;
export type QueueLive = Components.Schemas.QueueLive;
export type QueueOverview = Components.Schemas.QueueOverview;
export type QueuePerformance = Components.Schemas.QueuePerformance;
export type QueuePerformanceReport = Components.Schemas.QueuePerformanceReport;
export type QueueRef = Components.Schemas.QueueRef;
export type QueueRoutingStep = Components.Schemas.QueueRoutingStep;
export type QueueSettings = Components.Schemas.QueueSettings;
export type QueueSettingsUpdate = Components.Schemas.QueueSettingsUpdate;
export type QueueSkillChange = Components.Schemas.QueueSkillChange;
export type Skill = Components.Schemas.Skill;
export type SkillCatalogue = Components.Schemas.SkillCatalogue;
export type SkillCatalogueEntry = Components.Schemas.SkillCatalogueEntry;
export type SkillDeletion = Components.Schemas.SkillDeletion;
export type WaitingCall = Components.Schemas.WaitingCall;
export type WrapUpTimes = Components.Schemas.WrapUpTimes;
