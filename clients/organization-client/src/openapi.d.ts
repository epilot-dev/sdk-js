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
        export interface Organization {
            id?: /**
             * example:
             * 739224
             */
            OrganizationId;
            type?: "Vendor" | "Partner";
            /**
             * example:
             * Epilot
             */
            name?: string | null;
            /**
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
            /**
             * example:
             * EPI
             */
            symbol?: string | null;
            /**
             * example:
             * professional
             */
            pricing_tier?: string | null;
            /**
             * example:
             * someone@epilot.cloud
             */
            email?: string | null;
            /**
             * example:
             * 50
             */
            free_user_limit?: number | null;
            /**
             * example:
             * 49123123123
             */
            phone?: string | null;
            /**
             * example:
             * https://epilot.cloud
             */
            website?: string | null;
            address?: {
                country?: string | null;
                city?: string | null;
                postal_code?: string | null;
                street?: string | null;
                street_number?: string | null;
            };
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_url?: string | null;
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_thumbnail_url?: string | null;
            /**
             * example:
             * false
             */
            is_unlicensed_org?: boolean | null;
            /**
             * Organization style setting (e.g. font setting)
             */
            style?: {
                [name: string]: any;
            } | null;
        }
        /**
         * example:
         * 739224
         */
        export type OrganizationId = string;
        /**
         * example:
         * {
         *   "double_opt_in": {
         *     "enabled": true
         *   }
         * }
         */
        export interface Settings {
            [name: string]: any;
        }
        /**
         * example:
         * {
         *   "enabled": true
         * }
         */
        export type SettingsValue = /**
         * example:
         * {
         *   "enabled": true
         * }
         */
        string | number | boolean | any[] | {
            [name: string]: any;
        };
    }
}
declare namespace Paths {
    namespace DeleteSettingsValue {
        namespace Parameters {
            export type Key = string;
            export type OrgId = /**
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
            key: Parameters.Key;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetOrganization {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
        }
    }
    namespace GetSettings {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "double_opt_in": {
             *     "enabled": true
             *   }
             * }
             */
            Components.Schemas.Settings;
        }
    }
    namespace PutSettingsValue {
        namespace Parameters {
            export type Key = string;
            export type OrgId = /**
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
            key: Parameters.Key;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "enabled": true
         * }
         */
        Components.Schemas.SettingsValue;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "enabled": true
             * }
             */
            Components.Schemas.SettingsValue;
        }
    }
    namespace UpdateOrganization {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
        }
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
        }
    }
}

export interface OperationMethods {
  /**
   * getOrganization - getOrganization
   */
  'getOrganization'(
    parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganization.Responses.$200>
  /**
   * updateOrganization - updateOrganization
   */
  'updateOrganization'(
    parameters?: Parameters<Paths.UpdateOrganization.PathParameters> | null,
    data?: Paths.UpdateOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOrganization.Responses.$200>
  /**
   * getSettings - getSettings
   * 
   * Get full organization settings object
   */
  'getSettings'(
    parameters?: Parameters<Paths.GetSettings.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettings.Responses.$200>
  /**
   * putSettingsValue - putSettingsValue
   * 
   * Updates an organization setting
   */
  'putSettingsValue'(
    parameters?: Parameters<Paths.PutSettingsValue.PathParameters> | null,
    data?: Paths.PutSettingsValue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSettingsValue.Responses.$200>
  /**
   * deleteSettingsValue - deleteSettingsValue
   * 
   * Updates an organizatio nsetting
   */
  'deleteSettingsValue'(
    parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/organization/{org_id}']: {
    /**
     * getOrganization - getOrganization
     */
    'get'(
      parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganization.Responses.$200>
    /**
     * updateOrganization - updateOrganization
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateOrganization.PathParameters> | null,
      data?: Paths.UpdateOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOrganization.Responses.$200>
  }
  ['/v2/organization/{org_id}/settings']: {
    /**
     * getSettings - getSettings
     * 
     * Get full organization settings object
     */
    'get'(
      parameters?: Parameters<Paths.GetSettings.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSettings.Responses.$200>
  }
  ['/v2/organization/{org_id}/settings/{key}']: {
    /**
     * putSettingsValue - putSettingsValue
     * 
     * Updates an organization setting
     */
    'put'(
      parameters?: Parameters<Paths.PutSettingsValue.PathParameters> | null,
      data?: Paths.PutSettingsValue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSettingsValue.Responses.$200>
    /**
     * deleteSettingsValue - deleteSettingsValue
     * 
     * Updates an organizatio nsetting
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
