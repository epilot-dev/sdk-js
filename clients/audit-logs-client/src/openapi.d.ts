/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * AI agent that made the call. Only present when trigger_type is `agent`.
         */
        export interface AgentCaller {
            /**
             * ID of the agent
             */
            agent_id?: string;
            /**
             * ID of the host the agent runs on
             */
            host_id?: string;
            /**
             * Display name of the agent
             * example:
             * Claude
             */
            agent_name?: string;
            /**
             * Display name of the host the agent runs on
             */
            host_name?: string;
            /**
             * Client the agent connected with
             */
            client?: string;
            /**
             * Purpose the agent token was approved for
             * example:
             * Contract review
             */
            purpose?: string;
            /**
             * ID of the epilot user who approved the agent; the agent acts on their behalf
             */
            user_id?: string;
            /**
             * Run of the agent the call belongs to, for correlating all calls of one run
             */
            run_id?: string;
            /**
             * Where the agent ran, e.g. chat, background, flows
             * example:
             * chat
             */
            channel?: string;
        }
        export interface Caller {
            /**
             * Email of the user
             * example:
             * max.mustermann@mail.com
             */
            user_email?: string;
            /**
             * ID of the user
             * example:
             * 123456
             */
            user_id?: string;
            /**
             * Who triggered the event. `agent` is an AI agent using an epilot Agent Auth token on behalf of a user.
             */
            trigger_type?: "user" | "api" | "automation" | "agent";
            /**
             * ID of the token used for the call (API tokens and Agent Auth tokens)
             * example:
             * agent_V1StGXR8Z5jdHi6B
             */
            token_id?: string;
            /**
             * Type of the token used for the call
             * example:
             * api
             */
            token_type?: string;
            /**
             * Name of the token used for the call
             * example:
             * Agent: Claude · Contract review
             */
            token_name?: string;
            agent?: /* AI agent that made the call. Only present when trigger_type is `agent`. */ AgentCaller;
        }
        export type CallerType = "user" | "api" | "automation" | "agent";
        export interface Event {
            /**
             * ID of the log event
             * example:
             * 2843c005-c5b0-4df2-94ee-1ca2ddd998ac
             */
            id?: string; // uuid
            /**
             * ID of the organization
             * example:
             * 123456
             */
            org_id?: string;
            /**
             * Name of the service
             * example:
             * workflows
             */
            service_name?: string;
            /**
             * Action that was performed
             * example:
             * deleteWorkflow
             */
            event_name?: string;
            /**
             * HTTP status code
             * example:
             * 200
             */
            status_code?: number;
            /**
             * Timestamp of the event
             * example:
             * 2021-06-01T12:00:00Z
             */
            timestamp?: string;
            caller?: Caller;
            http?: HttpContext;
            /**
             * Contains the stringified request body
             * example:
             * {"workflow_id": "123456"}
             */
            detail?: string;
            /**
             * Description of the event
             * example:
             * Workflow with ID 123456 was deleted
             */
            activity?: string;
            /**
             * URL of the ressource that was modified
             */
            source_url?: string;
            /**
             * ID of the resource this event targets (e.g. blueprint id, workflow id)
             * example:
             * 550e8400-e29b-41d4-a716-446655440000
             */
            resource_id?: string;
            /**
             * Type of resource this event targets
             * example:
             * blueprint
             */
            resource_type?: string;
            /**
             * Semantic action name for this event
             * example:
             * blueprint.resource_added
             */
            action?: string;
            /**
             * `customer` for the organization's own activity, `internal` for actions
             * performed by epilot staff through the admin portal (hidden from the
             * customer-facing audit log).
             *
             * example:
             * customer
             */
            visibility?: "customer" | "internal";
        }
        export interface HttpContext {
            /**
             * HTTP method
             * example:
             * GET
             */
            method?: string;
            /**
             * IP address of the caller
             * example:
             */
            ip?: string;
            /**
             * HTTP headers
             * example:
             * {
             *   "Authorization": "Bearer token"
             * }
             */
            headers?: {
                [key: string]: any;
            };
            /**
             * Query parameters
             * example:
             * {
             *   "limit": 50,
             *   "page": 0
             * }
             */
            query?: {
                [key: string]: any;
            };
            /**
             * Path parameters
             * example:
             * {
             *   "eventId": "2843c005-c5b0-4df2-94ee-1ca2ddd998ac"
             * }
             */
            pathParams?: {
                [key: string]: any;
            };
            /**
             * Path of the request
             * example:
             * /v1/logs
             */
            path?: string;
            /**
             * Domain name of the request
             * example:
             * audit-logs.sls.epilot.io
             */
            domainName?: string;
        }
        export interface SearchOptions {
            /**
             * Maximum number of results to return
             * example:
             * 50
             */
            limit?: number;
            /**
             * Page number to return
             * example:
             * 0
             */
            page?: number;
            /**
             * Inclusive time range to filter events by. Each bound accepts either an
             * ISO 8601 date-time (e.g. `2021-06-01T12:00:00Z`) or a Unix epoch
             * timestamp in seconds (e.g. `1622548800`). Either bound may be omitted.
             *
             */
            timestamp?: {
                /**
                 * Inclusive lower bound (ISO 8601 or epoch seconds)
                 * example:
                 * 2021-06-01T12:00:00Z
                 */
                from?: string;
                /**
                 * Inclusive upper bound (ISO 8601 or epoch seconds)
                 * example:
                 * 2021-06-30T23:59:59Z
                 */
                to?: string;
            };
            /**
             * Name of the service that triggered the event
             * example:
             * workflows
             */
            service_name?: string;
            /**
             * Action that was performed (event name)
             * example:
             * deleteWorkflow
             */
            event_name?: string;
            /**
             * Outcome of the event i.e. success or failed events
             */
            outcome?: "success" | "failure";
            /**
             * HTTP method
             * example:
             * POST
             */
            method?: string;
            /**
             * Filter by who triggered the event: one type, or a list matching any of them (e.g. `[user, agent]` for
             * everything people and their AI agents did). `agent` is an AI agent using an epilot Agent Auth token.
             *
             */
            caller_type?: /**
             * Filter by who triggered the event: one type, or a list matching any of them (e.g. `[user, agent]` for
             * everything people and their AI agents did). `agent` is an AI agent using an epilot Agent Auth token.
             *
             */
            CallerType | [
                CallerType,
                ...CallerType[]
            ];
            /**
             * Which events to return. `customer` (default) returns the organization's own
             * activity. `internal` returns actions performed by epilot staff through the
             * admin portal, `all` returns both. `internal` and `all` are only available to
             * internal callers (internal-auth tokens); other callers receive 403.
             *
             */
            visibility?: "customer" | "internal" | "all";
            /**
             * Filter events that target a specific resource (e.g. a blueprint id)
             * example:
             * 550e8400-e29b-41d4-a716-446655440000
             */
            resource_id?: string;
            /**
             * Filter events by the type of resource they target (e.g. "blueprint", "blueprint_resource")
             * example:
             * blueprint
             */
            resource_type?: string;
            /**
             * Filter events by a semantic action name (e.g. "blueprint.created", "blueprint.resource_added")
             * example:
             * blueprint.resource_added
             */
            action?: string;
            user?: {
                /**
                 * Email of the user who initiated the event
                 * example:
                 * max.mustermann@mail.com
                 */
                email?: string;
                /**
                 * ID of the user who initiated the event
                 * example:
                 * 123456
                 */
                user_id?: string;
            };
        }
    }
}
declare namespace Paths {
    namespace GetLogById {
        namespace Parameters {
            export type LogId = string;
            export type Visibility = "customer" | "internal" | "all";
        }
        export interface PathParameters {
            logId: Parameters.LogId;
        }
        export interface QueryParameters {
            visibility?: Parameters.Visibility;
        }
        namespace Responses {
            export interface $200 {
                log?: Components.Schemas.Event;
            }
        }
    }
    namespace GetLogs {
        export type RequestBody = Components.Schemas.SearchOptions;
        namespace Responses {
            export interface $200 {
                logs?: Components.Schemas.Event[];
                /**
                 * Total number of logs
                 * example:
                 * 1
                 */
                total?: number;
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getLogs - getLogs
   * 
   * Retrieve Audit Log events. Optionally, you can filter them by organization.
   */
  'getLogs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetLogs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLogs.Responses.$200>
  /**
   * getLogById - getLogById
   * 
   * Retrieve Audit Log events
   */
  'getLogById'(
    parameters?: Parameters<Paths.GetLogById.QueryParameters & Paths.GetLogById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLogById.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/logs']: {
    /**
     * getLogs - getLogs
     * 
     * Retrieve Audit Log events. Optionally, you can filter them by organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetLogs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLogs.Responses.$200>
  }
  ['/v1/logs/{logId}']: {
    /**
     * getLogById - getLogById
     * 
     * Retrieve Audit Log events
     */
    'get'(
      parameters?: Parameters<Paths.GetLogById.QueryParameters & Paths.GetLogById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLogById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AgentCaller = Components.Schemas.AgentCaller;
export type Caller = Components.Schemas.Caller;
export type CallerType = Components.Schemas.CallerType;
export type Event = Components.Schemas.Event;
export type HttpContext = Components.Schemas.HttpContext;
export type SearchOptions = Components.Schemas.SearchOptions;
