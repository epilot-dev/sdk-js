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
        export interface EventConfig {
            /**
             * Human readable of the event
             * example:
             * MeterReading
             */
            name?: string;
        }
    }
}
declare namespace Paths {
    namespace ListEvents {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.EventConfig[];
            }
        }
    }
}


export interface OperationMethods {
  /**
   * listEvents - listEvents
   * 
   * Retrieve list of available business events
   */
  'listEvents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEvents.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/events']: {
    /**
     * listEvents - listEvents
     * 
     * Retrieve list of available business events
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEvents.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type EventConfig = Components.Schemas.EventConfig;
