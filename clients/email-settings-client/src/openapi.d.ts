/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type EmailAddressId = string;
        export type SharedInboxId = string;
    }
    export interface PathParameters {
        EmailAddressId?: Parameters.EmailAddressId;
        SharedInboxId?: Parameters.SharedInboxId;
    }
    namespace Responses {
        export type BadRequest = Schemas.ErrorResponse;
        export type Conflict = Schemas.ErrorResponse;
        export type CreateEmailAddressSuccessResponse = Schemas.EmailAddressResponse;
        export type CreateSharedInboxSuccessResponse = Schemas.SharedInboxResponse;
        export type Forbidden = Schemas.ErrorResponse;
        export type GetEmailAddressSuccessResponse = Schemas.EmailAddressResponse;
        export type GetSharedInboxSuccessResponse = Schemas.SharedInboxResponse;
        export type InternalServerError = Schemas.ErrorResponse;
        export type ListEmailAddressesSuccessResponse = Schemas.EmailAddressResponse[];
        export type ListInboxBucketsSuccessResponse = Schemas.InboxBucketResponse[];
        export type ListSharedInboxesSuccessResponse = Schemas.SharedInboxResponse[];
        export interface NoContent {
        }
        export type NotFound = Schemas.ErrorResponse;
        export type ProvisionEpilotEmailAddressSuccessResponse = Schemas.EmailAddressResponse;
        export type SetEmailAddressPrimarySuccessResponse = Schemas.EmailAddressResponse;
        export type UpdateEmailAddressSuccessResponse = Schemas.EmailAddressResponse;
        export type UpdateSharedInboxSuccessResponse = Schemas.SharedInboxResponse;
    }
    namespace Schemas {
        export interface CreateEmailAddressPayload {
            address: string;
            name?: string;
            user_ids?: string[];
            group_ids?: string[];
            default_signature_id?: string;
            shared_inbox_id?: string;
        }
        export interface CreateSharedInboxPayload {
            id?: string;
            color: string;
            name: string;
            assignees?: string[];
            description?: string;
        }
        export interface Domain {
            /**
             * example:
             * subdomain.epilot.cloud
             */
            domain?: string;
        }
        export interface EmailAddressResponse {
            id: string;
            created_at: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
            updated_by?: string;
            address: string;
            name?: string;
            user_ids?: string[];
            group_ids?: string[];
            default_signature_id?: string;
            shared_inbox_id?: string;
            is_active?: boolean;
            is_primary?: boolean;
            is_epilot_email_address?: boolean;
        }
        /**
         * Setting that allows to add an email address on the custom domain. For e.g; john@doe.com
         */
        export type EmailAddressSetting = "email_address";
        /**
         * Setting that allows to add a custom domain. For e.g; doe.com
         */
        export type EmailDomainSetting = "email_domain";
        export interface ErrorResponse {
            error: string;
            status: number;
        }
        export interface InboxBucketResponse {
            id: string;
            inbox_id: string;
        }
        export interface ProvisionEpilotEmailAddressPayload {
            address: string;
        }
        /**
         * - Restrict duplicates within:
         *   * 10s
         *   * 5m
         *   * 1d
         *   * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
         * - Defaults to 3 minutes
         * - Negative values will be treated same as positive values
         * - If not set, defaults to 3 min
         * - If set as 0, then the no email will be treated as a duplicate
         * - Cannot have multiple values
         *
         */
        export type RestrictDuplicatesWithinSetting = "restrict_duplicates_within";
        export interface SetEmailAddressPrimaryPayload {
            address: string;
        }
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
        export interface SettingMeta {
            id: string;
            created_at: string; // date-time
            updated_at?: string; // date-time
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
         * - Negative values will be treated same as positive values
         * - If not set, defaults to 3 min
         * - If set as 0, then the no email will be treated as a duplicate
         * - Cannot have multiple values
         *
         */
        RestrictDuplicatesWithinSetting;
        export type SettingsResponse = Setting[] | Setting;
        export interface SharedInboxResponse {
            id: string;
            created_at: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
            updated_by?: string;
            name: string;
            color: string;
            assignees: string[];
            description?: string;
            bucket_id: string;
        }
        /**
         * Setting that allows to add a signature.
         */
        export type SignatureSetting = "signature";
        export interface UpdateEmailAddressPayload {
            name?: string;
            user_ids?: string[];
            group_ids?: string[];
            default_signature_id?: string;
            shared_inbox_id?: string;
            is_active?: boolean;
        }
        export interface UpdateSharedInboxPayload {
            color?: string;
            name?: string;
            assignees?: string[];
            description?: string;
        }
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
    namespace AddEmailAddress {
        export type RequestBody = Components.Schemas.CreateEmailAddressPayload;
        namespace Responses {
            export type $201 = Components.Responses.CreateEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
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
    namespace AddSharedInbox {
        export type RequestBody = Components.Schemas.CreateSharedInboxPayload;
        namespace Responses {
            export type $201 = Components.Responses.CreateSharedInboxSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
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
    namespace DeleteEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $204 = Components.Responses.NoContent;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteSetting {
        export interface RequestBody {
            type: Components.Schemas.SettingType;
            /**
             * ID of setting
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Setting;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteSharedInbox {
        namespace Parameters {
            export type Id = string;
            export type SuccessorInboxId = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            successorInboxId?: Parameters.SuccessorInboxId;
        }
        namespace Responses {
            export type $204 = Components.Responses.NoContent;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetEmailAddressSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
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
    namespace GetSharedInbox {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetSharedInboxSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListEmailAddresses {
        namespace Responses {
            export type $200 = Components.Responses.ListEmailAddressesSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListInboxBuckets {
        namespace Responses {
            export type $200 = Components.Responses.ListInboxBucketsSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListSharedInboxes {
        namespace Responses {
            export type $200 = Components.Responses.ListSharedInboxesSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ProvisionEpilotEmailAddress {
        export type RequestBody = Components.Schemas.ProvisionEpilotEmailAddressPayload;
        namespace Responses {
            export type $200 = Components.Responses.ProvisionEpilotEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SetEmailAddressPrimary {
        export type RequestBody = Components.Schemas.SetEmailAddressPrimaryPayload;
        namespace Responses {
            export type $200 = Components.Responses.SetEmailAddressPrimarySuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateEmailAddressPayload;
        namespace Responses {
            export type $200 = Components.Responses.UpdateEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
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
    namespace UpdateSharedInbox {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateSharedInboxPayload;
        namespace Responses {
            export type $200 = Components.Responses.UpdateSharedInboxSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
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
   * provisionEpilotEmailAddress - provisionEpilotEmailAddress
   * 
   * Provision or reactivate epilot email address, deactivating other active epilot email addresses.
   */
  'provisionEpilotEmailAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProvisionEpilotEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProvisionEpilotEmailAddress.Responses.$200>
  /**
   * setEmailAddressPrimary - setEmailAddressPrimary
   * 
   * Set email address as primary
   */
  'setEmailAddressPrimary'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SetEmailAddressPrimary.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetEmailAddressPrimary.Responses.$200>
  /**
   * getEmailAddress - getEmailAddress
   * 
   * Get email address
   */
  'getEmailAddress'(
    parameters?: Parameters<Paths.GetEmailAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmailAddress.Responses.$200>
  /**
   * updateEmailAddress - updateEmailAddress
   * 
   * Update email address
   */
  'updateEmailAddress'(
    parameters?: Parameters<Paths.UpdateEmailAddress.PathParameters> | null,
    data?: Paths.UpdateEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEmailAddress.Responses.$200>
  /**
   * deleteEmailAddress - deleteEmailAddress
   * 
   * Delete email address
   */
  'deleteEmailAddress'(
    parameters?: Parameters<Paths.DeleteEmailAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEmailAddress.Responses.$204>
  /**
   * listEmailAddresses - listEmailAddresses
   * 
   * List email addresses
   */
  'listEmailAddresses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEmailAddresses.Responses.$200>
  /**
   * addEmailAddress - addEmailAddress
   * 
   * Add email address
   */
  'addEmailAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddEmailAddress.Responses.$201>
  /**
   * getSharedInbox - getSharedInbox
   * 
   * Get shared inbox
   */
  'getSharedInbox'(
    parameters?: Parameters<Paths.GetSharedInbox.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharedInbox.Responses.$200>
  /**
   * updateSharedInbox - updateSharedInbox
   * 
   * Update shared inbox
   */
  'updateSharedInbox'(
    parameters?: Parameters<Paths.UpdateSharedInbox.PathParameters> | null,
    data?: Paths.UpdateSharedInbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSharedInbox.Responses.$200>
  /**
   * deleteSharedInbox - deleteSharedInbox
   * 
   * Delete shared inbox, rerouting emails to a successor inbox (or default inbox if no successor is provided).
   */
  'deleteSharedInbox'(
    parameters?: Parameters<Paths.DeleteSharedInbox.QueryParameters & Paths.DeleteSharedInbox.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSharedInbox.Responses.$204>
  /**
   * listSharedInboxes - listSharedInboxes
   * 
   * List shared inboxes. Default inbox (with inbox_id `default`) is not included, but is always available.
   */
  'listSharedInboxes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSharedInboxes.Responses.$200>
  /**
   * addSharedInbox - addSharedInbox
   * 
   * Add shared inbox
   */
  'addSharedInbox'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddSharedInbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddSharedInbox.Responses.$201>
  /**
   * listInboxBuckets - listInboxBuckets
   * 
   * List inbox buckets for an organization. Default bucket (with bucket_id `default`) is not included, but is always available.
   */
  'listInboxBuckets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInboxBuckets.Responses.$200>
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
  ['/v2/email-settings/email-addresses/epilot:provision']: {
    /**
     * provisionEpilotEmailAddress - provisionEpilotEmailAddress
     * 
     * Provision or reactivate epilot email address, deactivating other active epilot email addresses.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProvisionEpilotEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProvisionEpilotEmailAddress.Responses.$200>
  }
  ['/v2/email-settings/email-addresses/primary']: {
    /**
     * setEmailAddressPrimary - setEmailAddressPrimary
     * 
     * Set email address as primary
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SetEmailAddressPrimary.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetEmailAddressPrimary.Responses.$200>
  }
  ['/v2/email-settings/email-addresses/{id}']: {
    /**
     * getEmailAddress - getEmailAddress
     * 
     * Get email address
     */
    'get'(
      parameters?: Parameters<Paths.GetEmailAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmailAddress.Responses.$200>
    /**
     * deleteEmailAddress - deleteEmailAddress
     * 
     * Delete email address
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEmailAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEmailAddress.Responses.$204>
    /**
     * updateEmailAddress - updateEmailAddress
     * 
     * Update email address
     */
    'put'(
      parameters?: Parameters<Paths.UpdateEmailAddress.PathParameters> | null,
      data?: Paths.UpdateEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEmailAddress.Responses.$200>
  }
  ['/v2/email-settings/email-addresses']: {
    /**
     * listEmailAddresses - listEmailAddresses
     * 
     * List email addresses
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEmailAddresses.Responses.$200>
    /**
     * addEmailAddress - addEmailAddress
     * 
     * Add email address
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddEmailAddress.Responses.$201>
  }
  ['/v2/email-settings/shared-inboxes/{id}']: {
    /**
     * getSharedInbox - getSharedInbox
     * 
     * Get shared inbox
     */
    'get'(
      parameters?: Parameters<Paths.GetSharedInbox.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharedInbox.Responses.$200>
    /**
     * deleteSharedInbox - deleteSharedInbox
     * 
     * Delete shared inbox, rerouting emails to a successor inbox (or default inbox if no successor is provided).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSharedInbox.QueryParameters & Paths.DeleteSharedInbox.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSharedInbox.Responses.$204>
    /**
     * updateSharedInbox - updateSharedInbox
     * 
     * Update shared inbox
     */
    'put'(
      parameters?: Parameters<Paths.UpdateSharedInbox.PathParameters> | null,
      data?: Paths.UpdateSharedInbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSharedInbox.Responses.$200>
  }
  ['/v2/email-settings/shared-inboxes']: {
    /**
     * listSharedInboxes - listSharedInboxes
     * 
     * List shared inboxes. Default inbox (with inbox_id `default`) is not included, but is always available.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSharedInboxes.Responses.$200>
    /**
     * addSharedInbox - addSharedInbox
     * 
     * Add shared inbox
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddSharedInbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddSharedInbox.Responses.$201>
  }
  ['/v2/email-settings/inbox-buckets']: {
    /**
     * listInboxBuckets - listInboxBuckets
     * 
     * List inbox buckets for an organization. Default bucket (with bucket_id `default`) is not included, but is always available.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInboxBuckets.Responses.$200>
  }
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


export type CreateEmailAddressPayload = Components.Schemas.CreateEmailAddressPayload;
export type CreateSharedInboxPayload = Components.Schemas.CreateSharedInboxPayload;
export type Domain = Components.Schemas.Domain;
export type EmailAddressResponse = Components.Schemas.EmailAddressResponse;
export type EmailAddressSetting = Components.Schemas.EmailAddressSetting;
export type EmailDomainSetting = Components.Schemas.EmailDomainSetting;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type InboxBucketResponse = Components.Schemas.InboxBucketResponse;
export type ProvisionEpilotEmailAddressPayload = Components.Schemas.ProvisionEpilotEmailAddressPayload;
export type RestrictDuplicatesWithinSetting = Components.Schemas.RestrictDuplicatesWithinSetting;
export type SetEmailAddressPrimaryPayload = Components.Schemas.SetEmailAddressPrimaryPayload;
export type Setting = Components.Schemas.Setting;
export type SettingMeta = Components.Schemas.SettingMeta;
export type SettingType = Components.Schemas.SettingType;
export type SettingsResponse = Components.Schemas.SettingsResponse;
export type SharedInboxResponse = Components.Schemas.SharedInboxResponse;
export type SignatureSetting = Components.Schemas.SignatureSetting;
export type UpdateEmailAddressPayload = Components.Schemas.UpdateEmailAddressPayload;
export type UpdateSharedInboxPayload = Components.Schemas.UpdateSharedInboxPayload;
export type WhitelistEmailAddressSetting = Components.Schemas.WhitelistEmailAddressSetting;
