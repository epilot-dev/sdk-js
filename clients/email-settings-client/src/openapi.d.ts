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
        export interface Domain {
            /**
             * example:
             * subdomain.epilot.cloud
             */
            domain?: string;
        }
        /**
         * Setting that allows to add an email address on the custom domain. For e.g; john@doe.com
         */
        export type EmailAddressSetting = "email_address";
        /**
         * Setting that allows to add a custom domain. For e.g; doe.com
         */
        export type EmailDomainSetting = "email_domain";
        /**
         * - Restrict duplicates within:
         *   * 10s
         *   * 5m
         *   * 1d
         *   * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
         * - Defaults to 3 minutes
         *
         */
        export type RestrictDuplicatesWithinSetting = "restrict_duplicates_within";
        export interface Setting {
            [name: string]: any;
            id?: string;
            name?: string;
            org_id?: string;
            type: SettingType;
            value?: string;
            html?: string;
            created_at?: string;
            updated_at?: string;
            created_by?: string;
            updated_by?: string;
        }
        export type SettingType = /* Setting that allows to add a signature. */ SignatureSetting | /* Setting that allows to add a custom domain. For e.g; doe.com */ EmailDomainSetting | /* Setting that allows to add an email address on the custom domain. For e.g; john@doe.com */ EmailAddressSetting | /**
         * - Setting that specifies a list of addresses exempt from being flagged as duplicate emails.
         * - An email will be flagged as a duplicate if it has the same content and is sent to the same recipient within the time frame specified in the RestrictDuplicatesWithinSetting.
         *
         */
        WhitelistEmailAddressSetting | /**
         * - Restrict duplicates within:
         *   * 10s
         *   * 5m
         *   * 1d
         *   * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
         * - Defaults to 3 minutes
         *
         */
        RestrictDuplicatesWithinSetting;
        export type SettingsResponse = Setting[];
        /**
         * Setting that allows to add a signature.
         */
        export type SignatureSetting = "signature";
        /**
         * - Setting that specifies a list of addresses exempt from being flagged as duplicate emails.
         * - An email will be flagged as a duplicate if it has the same content and is sent to the same recipient within the time frame specified in the RestrictDuplicatesWithinSetting.
         *
         */
        export type WhitelistEmailAddressSetting = "whitelist_email_address";
    }
}
declare namespace Paths {
    namespace AddDomain {
        export type RequestBody = Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace AddSetting {
        export type RequestBody = Components.Schemas.Setting;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteDomain {
        export type RequestBody = Components.Schemas.Domain;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteSetting {
        export interface RequestBody {
            type: Components.Schemas.SettingType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Setting;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetSettings {
        namespace Parameters {
            export type Id = string;
            export type Type = Components.Schemas.SettingType;
        }
        export interface QueryParameters {
            type: Parameters.Type;
            id?: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace UpdateSetting {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Setting;
        namespace Responses {
            export type $200 = Components.Schemas.Setting;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace VerifyDomain {
        export type RequestBody = Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace VerifyNameServers {
        export type RequestBody = Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getSettings - getSettings
   * 
   * Get all settings by type
   */
  'getSettings'(
    parameters?: Parameters<Paths.GetSettings.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettings.Responses.$200>
  /**
   * addSetting - addSetting
   * 
   * Add setting
   */
  'addSetting'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddSetting.Responses.$200>
  /**
   * deleteSetting - deleteSetting
   * 
   * delete setting by ID and type
   */
  'deleteSetting'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSetting.Responses.$200>
  /**
   * updateSetting - updateSetting
   * 
   * Update setting by ID
   */
  'updateSetting'(
    parameters?: Parameters<Paths.UpdateSetting.PathParameters> | null,
    data?: Paths.UpdateSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSetting.Responses.$200>
  /**
   * addDomain - addDomain
   * 
   * Add domain
   */
  'addDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddDomain.Responses.$200>
  /**
   * deleteDomain - deleteDomain
   * 
   * Delete domain
   */
  'deleteDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDomain.Responses.$204>
  /**
   * verifyNameServers - verifyNameServers
   * 
   * Verify name servers
   */
  'verifyNameServers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyNameServers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyNameServers.Responses.$200>
  /**
   * verifyDomain - verifyDomain
   * 
   * Verify domain
   */
  'verifyDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyDomain.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/email-settings']: {
    /**
     * getSettings - getSettings
     * 
     * Get all settings by type
     */
    'get'(
      parameters?: Parameters<Paths.GetSettings.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSettings.Responses.$200>
    /**
     * addSetting - addSetting
     * 
     * Add setting
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddSetting.Responses.$200>
    /**
     * deleteSetting - deleteSetting
     * 
     * delete setting by ID and type
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSetting.Responses.$200>
  }
  ['/v1/email-settings/{id}']: {
    /**
     * updateSetting - updateSetting
     * 
     * Update setting by ID
     */
    'post'(
      parameters?: Parameters<Paths.UpdateSetting.PathParameters> | null,
      data?: Paths.UpdateSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSetting.Responses.$200>
  }
  ['/v1/email-settings/domain']: {
    /**
     * addDomain - addDomain
     * 
     * Add domain
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddDomain.Responses.$200>
    /**
     * deleteDomain - deleteDomain
     * 
     * Delete domain
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDomain.Responses.$204>
  }
  ['/v1/email-settings/domain/name-servers:verify']: {
    /**
     * verifyNameServers - verifyNameServers
     * 
     * Verify name servers
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyNameServers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyNameServers.Responses.$200>
  }
  ['/v1/email-settings/domain:verify']: {
    /**
     * verifyDomain - verifyDomain
     * 
     * Verify domain
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyDomain.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
