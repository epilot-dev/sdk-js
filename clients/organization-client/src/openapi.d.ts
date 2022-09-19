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
        export interface CreateOrganizationRequest {
            /**
             * Organization detail
             */
            organization_detail?: {
                /**
                 * Organization name
                 * example:
                 * epilot
                 */
                name: string;
                /**
                 * Organization email address
                 * example:
                 * epilot@epilot.cloud
                 */
                email_address: string;
                /**
                 * type
                 * example:
                 * Vendor
                 */
                type: string;
                /**
                 * Pricing tier
                 * example:
                 * professional
                 */
                pricing_tier?: string;
            };
            /**
             * Owner user will receive invitation
             */
            owner_user?: {
                /**
                 * example:
                 * Ny Huynh
                 */
                full_name: string;
                /**
                 * example:
                 * ny.huynhthi@axonactive.com
                 */
                email_address: string;
            };
        }
        export interface DataPoint {
            /**
             * Organization id
             * example:
             * 206801
             */
            id?: number;
            /**
             * Max customer data points last month
             * example:
             * 10
             */
            max_customer?: number;
            /**
             * Actual customer data points
             * example:
             * 10
             */
            actual_customer?: number;
        }
        export type DataPointsResponse = DataPoint[];
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
    namespace CreateOrganization {
        export type RequestBody = Components.Schemas.CreateOrganizationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export interface $403 {
            }
        }
    }
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
    namespace GetDataPoints {
        namespace Responses {
            export type $200 = Components.Schemas.DataPointsResponse;
            export interface $403 {
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
    namespace GetOrganizationTags {
        namespace Responses {
            export type $200 = string[];
            export interface $403 {
            }
        }
    }
    namespace GetOrganizations {
        namespace Parameters {
            export type Limit = string;
            export type StartKey = string;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            start_key?: Parameters.StartKey;
        }
        namespace Responses {
            /**
             * List organizations
             */
            export interface $200 {
                organizations?: Components.Schemas.Organization[];
                last_evaluated_key?: string;
            }
            export interface $403 {
            }
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
   * getDataPoints - getDataPoints
   * 
   * Get data points of all organizations:
   * - customer data points
   * 
   */
  'getDataPoints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDataPoints.Responses.$200>
  /**
   * getOrganizationTags - getOrganizationTags
   * 
   * Get tags of organization
   */
  'getOrganizationTags'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganizationTags.Responses.$200>
  /**
   * getOrganizations - getOrganizations
   * 
   * Get all organizations
   */
  'getOrganizations'(
    parameters?: Parameters<Paths.GetOrganizations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganizations.Responses.$200>
  /**
   * createOrganization - createOrganization
   */
  'createOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateOrganization.Responses.$200>
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
  ['/v2/internal/organizations/data-points']: {
    /**
     * getDataPoints - getDataPoints
     * 
     * Get data points of all organizations:
     * - customer data points
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDataPoints.Responses.$200>
  }
  ['/v2/internal/organizations/tags']: {
    /**
     * getOrganizationTags - getOrganizationTags
     * 
     * Get tags of organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganizationTags.Responses.$200>
  }
  ['/v2/internal/organizations']: {
    /**
     * getOrganizations - getOrganizations
     * 
     * Get all organizations
     */
    'get'(
      parameters?: Parameters<Paths.GetOrganizations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganizations.Responses.$200>
    /**
     * createOrganization - createOrganization
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateOrganization.Responses.$200>
  }
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
