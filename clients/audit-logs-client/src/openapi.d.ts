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
            /**
             * Indicates if the call was made by a system
             * example:
             * false
             */
            is_system_call?: boolean;
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
             * User agent of the caller
             * example:
             * Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3
             */
            user_agent?: string;
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
    }
}
declare namespace Paths {
    namespace DeleteLogById {
        namespace Parameters {
            export type LogId = string;
        }
        export interface PathParameters {
            logId: Parameters.LogId;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
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
        namespace Parameters {
            export type CallerUserEmail = string;
            export type CallerUserId = string;
            export type EventName = string;
            /**
             * Maximum number of results to return.
             */
            export type Limit = number;
            export type Method = string;
            /**
             * Page number to return.
             */
            export type Page = number;
            export type ServiceName = string;
            export type Timestamp = string;
        }
        export interface QueryParameters {
            limit?: /* Maximum number of results to return. */ Parameters.Limit;
            page?: /* Page number to return. */ Parameters.Page;
            timestamp?: Parameters.Timestamp;
            service_name?: Parameters.ServiceName;
            event_name?: Parameters.EventName;
            caller_user_email?: Parameters.CallerUserEmail;
            caller_user_id?: Parameters.CallerUserId;
            method?: Parameters.Method;
        }
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
    parameters?: Parameters<Paths.GetLogs.QueryParameters> | null,
    data?: any,
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
  /**
   * deleteLogById - deleteLogById
   * 
   * Delete Audit Log event
   */
  'deleteLogById'(
    parameters?: Parameters<Paths.DeleteLogById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteLogById.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/logs']: {
    /**
     * getLogs - getLogs
     * 
     * Retrieve Audit Log events. Optionally, you can filter them by organization.
     */
    'get'(
      parameters?: Parameters<Paths.GetLogs.QueryParameters> | null,
      data?: any,
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
    /**
     * deleteLogById - deleteLogById
     * 
     * Delete Audit Log event
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteLogById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteLogById.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Caller = Components.Schemas.Caller;
export type Event = Components.Schemas.Event;
export type HttpContext = Components.Schemas.HttpContext;
