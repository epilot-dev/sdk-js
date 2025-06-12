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
                email_address?: string;
                /**
                 * type
                 * example:
                 * Vendor
                 */
                type: string;
                organization_use?: "Production" | "Sandbox";
                /**
                 * Pricing tier ID
                 * example:
                 * 01GEKHZHSN19KK10ZS92Y3WY9B
                 */
                pricing_tier_id: string;
            };
            /**
             * Owner user will receive invitation
             */
            owner_user?: {
                /**
                 * example:
                 * Ny Huynh
                 */
                full_name?: string;
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
        export interface InternalOrganization {
            id?: /**
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * Organization name
             * example:
             * Epilot
             */
            name?: string | null;
            /**
             * Organization contact email
             * example:
             * someone@epilot.cloud
             */
            email?: string | null;
            /**
             * Organization contact phone
             * example:
             * +49123123123
             */
            phone?: string | null;
            /**
             * Organization website
             * example:
             * https://epilot.cloud
             */
            website?: string | null;
            /**
             * Organization postal address
             */
            address?: {
                [name: string]: any;
                country?: string | null;
                city?: string | null;
                postal_code?: string | null;
                street?: string | null;
                street_number?: string | null;
            };
            organization_use?: "Production" | "Sandbox";
            parent_production_org_id?: string | null;
            /**
             * Organization created date
             */
            created_date?: string; // date-time
            /**
             * Organization logo URL
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_url?: string | null;
            /**
             * Organization logo thumbnail URL
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_thumbnail_url?: string | null;
            /**
             * Default email signature of organization
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
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
            type?: "Vendor" | "Partner";
            /**
             * example:
             * EPI
             */
            symbol?: string | null;
            /**
             * Deprecated - Please use pricing tier api
             * example:
             * professional
             */
            pricing_tier?: string | null;
            /**
             * example:
             * 50
             */
            free_user_limit?: number | null;
        }
        export interface Organization {
            id?: /**
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * Organization name
             * example:
             * Epilot
             */
            name?: string | null;
            /**
             * Organization contact email
             * example:
             * someone@epilot.cloud
             */
            email?: string | null;
            /**
             * Organization contact phone
             * example:
             * +49123123123
             */
            phone?: string | null;
            /**
             * Organization website
             * example:
             * https://epilot.cloud
             */
            website?: string | null;
            /**
             * Organization postal address
             */
            address?: {
                [name: string]: any;
                country?: string | null;
                city?: string | null;
                postal_code?: string | null;
                street?: string | null;
                street_number?: string | null;
            };
            organization_use?: "Production" | "Sandbox";
            parent_production_org_id?: string | null;
            /**
             * Organization created date
             */
            created_date?: string; // date-time
            /**
             * Organization logo URL
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_url?: string | null;
            /**
             * Organization logo thumbnail URL
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_thumbnail_url?: string | null;
            /**
             * Default email signature of organization
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
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
            type?: "Vendor" | "Partner";
            /**
             * example:
             * EPI
             */
            symbol?: string | null;
            /**
             * Deprecated - Please use pricing tier api
             * example:
             * professional
             */
            pricing_tier?: string | null;
            /**
             * example:
             * 50
             */
            free_user_limit?: number | null;
        }
        export interface OrganizationCleanupStatus {
            org_id: /**
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * example:
             * organization-api
             */
            service_name: string;
            /**
             * example:
             * [
             *   {
             *     "action": "Delete",
             *     "resource": "OrgTable",
             *     "extra_info": "pk: ORG#739224"
             *   },
             *   {
             *     "action": "Archive",
             *     "resource": "s3://my-bucket",
             *     "extra_info": "my-bucket/my-key.txt"
             *   }
             * ]
             */
            operations?: {
                [name: string]: any;
                /**
                 * example:
                 * Delete
                 */
                action?: string;
                /**
                 * example:
                 * OrgTable
                 */
                resource?: string;
                extra_info?: string | number | boolean | {
                    [name: string]: any;
                }[] | {
                    [name: string]: any;
                };
            }[];
        }
        /**
         * example:
         * 739224
         */
        export type OrganizationId = string;
        export interface OrganizationToCleanup {
            org_id: /**
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * example:
             * 2021-06-01T00:00:00Z
             */
            deleted_at: string; // date-time
            /**
             * example:
             * 123456
             */
            deleted_by: string;
        }
        /**
         * example:
         * double_opt_in
         */
        export type SettingKey = string;
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
        string | number | boolean | {
            [name: string]: any;
        }[] | {
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
    namespace GetCurrentOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
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
   * getCurrentOrganization - getCurrentOrganization
   * 
   * Get caller's current organization
   */
  'getCurrentOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCurrentOrganization.Responses.$200>
  /**
   * getOrganization - getOrganization
   * 
   * Get an organization
   */
  'getOrganization'(
    parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganization.Responses.$200>
  /**
   * updateOrganization - updateOrganization
   * 
   * Updates an organization
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
   * Updates an organization nsetting
   */
  'deleteSettingsValue'(
    parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/organization/current']: {
    /**
     * getCurrentOrganization - getCurrentOrganization
     * 
     * Get caller's current organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCurrentOrganization.Responses.$200>
  }
  ['/v2/organization/{org_id}']: {
    /**
     * getOrganization - getOrganization
     * 
     * Get an organization
     */
    'get'(
      parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganization.Responses.$200>
    /**
     * updateOrganization - updateOrganization
     * 
     * Updates an organization
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
     * Updates an organization nsetting
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateOrganizationRequest = Components.Schemas.CreateOrganizationRequest;
export type DataPoint = Components.Schemas.DataPoint;
export type DataPointsResponse = Components.Schemas.DataPointsResponse;
export type InternalOrganization = Components.Schemas.InternalOrganization;
export type Organization = Components.Schemas.Organization;
export type OrganizationCleanupStatus = Components.Schemas.OrganizationCleanupStatus;
export type OrganizationId = Components.Schemas.OrganizationId;
export type OrganizationToCleanup = Components.Schemas.OrganizationToCleanup;
export type SettingKey = Components.Schemas.SettingKey;
export type Settings = Components.Schemas.Settings;
export type SettingsValue = Components.Schemas.SettingsValue;
