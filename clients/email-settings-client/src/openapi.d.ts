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
        export interface Setting {
            [name: string]: any;
            id?: string;
            name?: string;
            org_id?: string;
            /**
             * example:
             * signature
             */
            type: "signature" | "email_domain" | "email_address" | "whitelist_email_address";
            html?: string;
            created_at?: string;
            updated_at?: string;
            created_by?: string;
            updated_by?: string;
        }
        export type SettingsResponse = Setting[];
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
            /**
             * example:
             * signature
             */
            type: "signature" | "email_domain" | "email_address" | "whitelist_email_address";
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
            export type Type = "signature" | "email_domain" | "email_address" | "whitelist_email_address";
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
