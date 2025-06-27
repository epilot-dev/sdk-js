/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequest = Schemas.ErrorResponseBase;
        export interface ERPUpdatesResponse {
            results?: {
                /**
                 * ID of the processed event
                 */
                event_id: string;
                /**
                 * Processing status for the event
                 */
                status: "success" | "error";
                /**
                 * Information about the processing status
                 */
                message?: string;
            }[];
        }
        export type InternalServerError = Schemas.ErrorResponseBase;
        export type NotFound = Schemas.ErrorResponseBase;
        export type Unauthorized = Schemas.ErrorResponseBase;
    }
    namespace Schemas {
        export interface ErrorResponseBase {
            /**
             * Computer-readable error code
             */
            code?: string;
            /**
             * Error message
             */
            message?: string;
        }
        export interface TriggerErpActionRequest {
            /**
             * Unique identifier of the ERP Toolkit manifest
             */
            manifest_id: string;
            /**
             * Unique identifier of the current automation execution
             */
            execution_id: string;
            /**
             * Identifier of the organization where the automation is executed
             */
            org_id: string;
            /**
             * Identifier of the self-service webhook configuration
             */
            webhook_id: string;
            /**
             * Identifier of the automation flow that triggered the action
             */
            flow_id: string;
            /**
             * ISO-8601 timestamp when the webhook event was created
             */
            created_at: string; // date-time
            /**
             * Identifier of the automation action being executed
             */
            action_id: string;
            /**
             * Identifier of the specific automation flow action instance
             */
            flow_action_id: string;
            /**
             * Human readable name of the automation flow
             */
            flow_name: string;
            /**
             * Identifier of the entity activity related to this trigger
             */
            activity_id: string;
            /**
             * Identifier of the entity referenced by the activity
             */
            entity_id: string;
        }
    }
}
declare namespace Paths {
    namespace AcknowledgeTracking {
        export interface RequestBody {
            /**
             * Unique identifier of the ERP tracking record to acknowledge
             */
            ack_id: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace ProcessErpUpdatesEvents {
        export interface RequestBody {
            /**
             * UUID that identifies the specific integration app instance
             */
            app_id: string; // uuid
            /**
             * UUID that identifies the specific integration app component instance
             */
            component_id: string; // uuid
            /**
             * Metadata to be passed along with the events
             */
            meta: {
                [name: string]: any;
                /**
                 * ID that identifies the specific request for debugging purposes
                 */
                correlation_id?: string;
            };
            /**
             * List of ERP events to process
             */
            events: {
                /**
                 * Type of event (create, update, delete)
                 */
                event_type: "CREATE" | "UPDATE" | "DELETE";
                /**
                 * Type of the object being updated (business_partner, contract_account, etc.)
                 */
                object_type: string;
                /**
                 * Timestamp when the event occurred
                 */
                timestamp: string; // date-time
                /**
                 * Format of the payload data
                 */
                format: "json" | "xml";
                /**
                 * The serialized object data payload (JSON, XML, etc.) as a string
                 */
                payload: string;
            }[];
        }
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Responses.ERPUpdatesResponse;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace TriggerErp {
        export type RequestBody = Components.Schemas.TriggerErpActionRequest;
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $500 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * acknowledgeTracking - Acknowledge receival of ERP tracking record
   * 
   * Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication
   */
  'acknowledgeTracking'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcknowledgeTracking.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcknowledgeTracking.Responses.$200>
  /**
   * triggerErp - Trigger ERP integration
   * 
   * Triggers the ERP integration process
   */
  'triggerErp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TriggerErp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerErp.Responses.$200>
  /**
   * processErpUpdatesEvents - Process ERP system updates
   * 
   * Handles updates from ERP systems and tracks them appropriately
   */
  'processErpUpdatesEvents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProcessErpUpdatesEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProcessErpUpdatesEvents.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/erp/tracking/acknowledgement']: {
    /**
     * acknowledgeTracking - Acknowledge receival of ERP tracking record
     * 
     * Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcknowledgeTracking.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcknowledgeTracking.Responses.$200>
  }
  ['/v1/erp/trigger']: {
    /**
     * triggerErp - Trigger ERP integration
     * 
     * Triggers the ERP integration process
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TriggerErp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerErp.Responses.$200>
  }
  ['/v1/erp/updates/events']: {
    /**
     * processErpUpdatesEvents - Process ERP system updates
     * 
     * Handles updates from ERP systems and tracks them appropriately
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProcessErpUpdatesEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProcessErpUpdatesEvents.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ErrorResponseBase = Components.Schemas.ErrorResponseBase;
export type TriggerErpActionRequest = Components.Schemas.TriggerErpActionRequest;
