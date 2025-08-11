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
        export interface PricingTier {
            [name: string]: any;
            /**
             * example:
             * 22
             */
            id?: string;
            created_date?: string;
            updated_date?: string;
            organization_id?: string;
            name?: string;
            /**
             * Settings
             */
            settings?: {
                [name: string]: any;
            };
            /**
             * Settings
             */
            override_settings?: {
                [name: string]: any;
            };
            created_by?: string;
            updated_by?: string;
            is_pure_360?: boolean;
        }
    }
}
declare namespace Paths {
    namespace GetCurrentPricingTier {
        namespace Responses {
            export type $200 = Components.Schemas.PricingTier;
        }
    }
}


export interface OperationMethods {
  /**
   * getCurrentPricingTier - getCurrentPricingTier
   * 
   * Get current pricing tier of logged in user
   */
  'getCurrentPricingTier'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCurrentPricingTier.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/pricing-tiers/me']: {
    /**
     * getCurrentPricingTier - getCurrentPricingTier
     * 
     * Get current pricing tier of logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCurrentPricingTier.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type PricingTier = Components.Schemas.PricingTier;
