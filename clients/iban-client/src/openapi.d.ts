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
         * Error
         */
        export interface Error {
            status?: string;
            error?: string;
        }
    }
}
declare namespace Paths {
    namespace ValidateIban {
        export interface RequestBody {
            /**
             * IBAN to be validated
             */
            iban: string;
        }
        namespace Responses {
            export interface $201 {
            }
            export type $400 = /* Error */ Components.Schemas.Error;
            export type $500 = /* Error */ Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * validateIban - validateIban
   * 
   * Validate an Iban
   */
  'validateIban'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ValidateIban.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateIban.Responses.$201>
}

export interface PathsDictionary {
  ['/v1/public/iban:validate']: {
    /**
     * validateIban - validateIban
     * 
     * Validate an Iban
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ValidateIban.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateIban.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Error = Components.Schemas.Error;
