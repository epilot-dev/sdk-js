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
            trigger_type?: "user" | "api" | "automation";
        }
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
             * Timestamp of the event in ISO 8601 format
             * example:
             * 2021-06-01T12:00:00Z
             */
            timestamp?: {
                from?: string;
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
        }
        export interface PathParameters {
            logId: Parameters.LogId;
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
    parameters?: Parameters<Paths.GetLogById.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetLogById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLogById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Caller = Components.Schemas.Caller;
export type Event = Components.Schemas.Event;
export type HttpContext = Components.Schemas.HttpContext;
export type SearchOptions = Components.Schemas.SearchOptions;
