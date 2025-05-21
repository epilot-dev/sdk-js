/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

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
    namespace TriggerErp {
        export interface RequestBody {
            /**
             * The Webhook that relates to this service action.
             */
            webhookId: string;
        }
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>



