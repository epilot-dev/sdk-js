/* Auto-copied from organization-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type AnnouncementIdPathParam = string;
    }
    export interface PathParameters {
        AnnouncementIdPathParam?: Parameters.AnnouncementIdPathParam;
    }
    namespace Schemas {
        export interface ActiveAnnouncementResponse {
            announcement: {
                id: string; // uuid
                type: AnnouncementType;
                message: AnnouncementMessage;
                link_url: string;
                list_version: string;
                effective_date: string; // date
                window_days: number;
                status: "draft" | "published" | "archived";
                created_at: string; // date-time
                /**
                 * Internal caller that created the announcement (not returned to customers)
                 */
                created_by?: string;
                updated_at: string; // date-time
                published_at?: string; // date-time
                /**
                 * Internal caller that published the announcement (not returned to customers)
                 */
                published_by?: string;
                /**
                 * published_at + window_days
                 */
                expires_at?: string; // date-time
                archived_at?: string; // date-time
                archived_by?: string;
                /**
                 * When the daily job wrote expired/superseded records after the window closed
                 */
                materialized_at?: string; // date-time
            } | null;
            /**
             * Whether the caller may acknowledge (organization:edit)
             */
            can_acknowledge: boolean;
        }
        export interface Announcement {
            id: string; // uuid
            type: AnnouncementType;
            message: AnnouncementMessage;
            link_url: string;
            list_version: string;
            effective_date: string; // date
            window_days: number;
            status: "draft" | "published" | "archived";
            created_at: string; // date-time
            /**
             * Internal caller that created the announcement (not returned to customers)
             */
            created_by?: string;
            updated_at: string; // date-time
            published_at?: string; // date-time
            /**
             * Internal caller that published the announcement (not returned to customers)
             */
            published_by?: string;
            /**
             * published_at + window_days
             */
            expires_at?: string; // date-time
            archived_at?: string; // date-time
            archived_by?: string;
            /**
             * When the daily job wrote expired/superseded records after the window closed
             */
            materialized_at?: string; // date-time
        }
        export interface AnnouncementMessage {
            /**
             * example:
             * Wir haben unsere Liste der Subdienstleister aktualisiert (gültig ab 01.11.2026). Bitte prüfe die Änderungen.
             */
            de: string;
            /**
             * example:
             * We have updated our list of subprocessors (effective 01.11.2026). Please review the changes.
             */
            en?: string;
        }
        export interface AnnouncementOrganizationStatus {
            announcement_id: string;
            org_id: string;
            org_name?: string;
            status: AnnouncementOrganizationStatusValue;
            acknowledged_by?: {
                user_id: string;
                name?: string;
                email?: string;
            };
            acknowledged_at?: string; // date-time
            /**
             * example:
             * 360
             */
            portal?: string;
            list_version: string;
            /**
             * When the record was written (acknowledgement or materialization by the daily job)
             */
            recorded_at?: string; // date-time
        }
        export type AnnouncementOrganizationStatusValue = "acknowledged" | "pending" | "expired" | "superseded";
        export type AnnouncementType = "subprocessor_change";
        /**
         * Metadata for a single feature flag toggle
         */
        export interface FeatureFlagMetadata {
            /**
             * Unique identifier matching the organization setting key
             * example:
             * canary
             */
            feature_name: string;
            title?: /* Internationalized string with a translation key and optional default value */ I18nString;
            description?: /* Internationalized string with a translation key and optional default value */ I18nString;
            /**
             * Badge label shown next to the feature toggle
             */
            badge?: "alpha" | "beta" | "new" | "advanced" | "experiment" | "deprecated";
            /**
             * Whether to show confetti animation when enabled
             */
            confetti?: boolean;
            /**
             * Whether the toggle can only be turned on (not off)
             */
            one_way?: boolean;
            /**
             * Whether the toggle value is inverted (checked = disabled)
             */
            reverse_checked?: boolean;
            /**
             * Whether this feature is visible for partner organizations
             */
            is_visible_for_partner?: boolean;
            /**
             * Rules that must ALL pass for this feature to be visible (implicit AND)
             */
            visibility_rules: /**
             * A rule that determines feature visibility. Rules are combined with AND logic
             * at the top level. Supports boolean combinators (and, or, not) for complex logic.
             *
             */
            VisibilityRule[];
        }
        /**
         * Feature settings metadata served to frontend applications.
         */
        export interface FeatureSettings {
            /**
             * Schema version for backwards compatibility
             * example:
             * 1.0.0
             */
            version: string;
            /**
             * Feature flag metadata for the settings page
             */
            feature_flags: /* Metadata for a single feature flag toggle */ FeatureFlagMetadata[];
        }
        /**
         * Internationalized string with a translation key and optional default value
         */
        export interface I18nString {
            /**
             * Translation key for i18n lookup
             * example:
             * canary_setting.title
             */
            key: string;
            /**
             * Fallback value when translation is not available
             * example:
             * Canary Updates
             */
            default_value?: string;
        }
        /**
         * Represents an epilot organization (tenant).
         *
         * An organization contains all the configuration, branding, and contact information
         * for a tenant account on the epilot platform.
         *
         */
        export interface Organization {
            id?: /**
             * Unique identifier for an organization (tenant) in the epilot platform
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
            /**
             * Indicates whether this is a production, sandbox or preview organization.
             * Sandbox organizations are linked to a parent production organization for testing purposes.
             * Preview organizations are temporary copies of a production organization.
             *
             */
            organization_use?: "Production" | "Sandbox" | "Preview";
            /**
             * The ID of the parent production organization.
             * Only set for sandbox organizations to link them to their production counterpart.
             *
             */
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
            /**
             * Labels/tags associated with the organization for categorization and filtering.
             * Used internally to classify organizations (e.g., "enterprise", "beta-tester", "test org").
             *
             */
            tags?: string[] | null;
        }
        /**
         * Unique identifier for an organization (tenant) in the epilot platform
         * example:
         * 739224
         */
        export type OrganizationId = string;
        /**
         * A key-value map of all organization settings.
         * Keys are setting identifiers and values can be any valid JSON type.
         *
         * example:
         * {
         *   "double_opt_in": {
         *     "enabled": true
         *   },
         *   "email_tracking": {
         *     "enabled": true,
         *     "track_opens": true
         *   },
         *   "default_language": "de"
         * }
         */
        export interface Settings {
            [name: string]: any;
        }
        /**
         * The value of an organization setting.
         * Can be any valid JSON type: string, number, boolean, array, or object.
         *
         * example:
         * {
         *   "enabled": true
         * }
         */
        export type SettingsValue = /**
         * The value of an organization setting.
         * Can be any valid JSON type: string, number, boolean, array, or object.
         *
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
        /**
         * A rule that determines feature visibility. Rules are combined with AND logic
         * at the top level. Supports boolean combinators (and, or, not) for complex logic.
         *
         */
        export interface VisibilityRule {
            /**
             * The rule type discriminator
             */
            type: "always" | "never" | "advanced_mode" | "pricing_tier" | "pricing_tier_class" | "production_org" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or";
            /**
             * Setting key for pricing_tier and setting_enabled rules
             */
            setting_key?: string;
            /**
             * Flag name for feature_flag and flag_enabled rules
             */
            flag_name?: string;
            /**
             * Pricing tier class names matched (word-boundary, case-insensitive) for pricing_tier_class rules
             * example:
             * [
             *   "enterprise",
             *   "professional"
             * ]
             */
            pricing_tier_classes?: string[];
            /**
             * Permission action for permission rules
             */
            action?: string;
            /**
             * Optional resource for permission rules
             */
            resource?: string;
            rule?: /**
             * A rule that determines feature visibility. Rules are combined with AND logic
             * at the top level. Supports boolean combinators (and, or, not) for complex logic.
             *
             */
            VisibilityRule;
            /**
             * Child rules for and/or combinators
             */
            rules?: /**
             * A rule that determines feature visibility. Rules are combined with AND logic
             * at the top level. Supports boolean combinators (and, or, not) for complex logic.
             *
             */
            VisibilityRule[];
        }
    }
}
export declare namespace Paths {
    namespace AcknowledgeAnnouncement {
        namespace Parameters {
            export type AnnouncementId = string;
        }
        export interface PathParameters {
            announcement_id: Parameters.AnnouncementId;
        }
        export interface RequestBody {
            /**
             * Portal the acknowledgement was given in
             * example:
             * 360
             */
            portal?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AnnouncementOrganizationStatus;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace DeleteSettingsValue {
        namespace Parameters {
            export type Key = string;
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
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
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetActiveAnnouncement {
        namespace Responses {
            export type $200 = Components.Schemas.ActiveAnnouncementResponse;
            export interface $401 {
            }
        }
    }
    namespace GetCurrentOrganization {
        namespace Responses {
            export type $200 = /**
             * Represents an epilot organization (tenant).
             *
             * An organization contains all the configuration, branding, and contact information
             * for a tenant account on the epilot platform.
             *
             */
            Components.Schemas.Organization;
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetFeatureSettings {
        namespace Responses {
            export type $200 = /* Feature settings metadata served to frontend applications. */ Components.Schemas.FeatureSettings;
            export interface $401 {
            }
        }
    }
    namespace GetOrganization {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
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
             * Represents an epilot organization (tenant).
             *
             * An organization contains all the configuration, branding, and contact information
             * for a tenant account on the epilot platform.
             *
             */
            Components.Schemas.Organization;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetOrganizationFeatureSettings {
        namespace Responses {
            export type $200 = /* Feature settings metadata served to frontend applications. */ Components.Schemas.FeatureSettings;
            export interface $401 {
            }
        }
    }
    namespace GetSettings {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
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
             * A key-value map of all organization settings.
             * Keys are setting identifiers and values can be any valid JSON type.
             *
             * example:
             * {
             *   "double_opt_in": {
             *     "enabled": true
             *   },
             *   "email_tracking": {
             *     "enabled": true,
             *     "track_opens": true
             *   },
             *   "default_language": "de"
             * }
             */
            Components.Schemas.Settings;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace NotifySettingsValueUpdated {
        namespace Parameters {
            export type Key = string;
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
            key: Parameters.Key;
        }
        export interface RequestBody {
            /**
             * Email of the staff user who changed the setting
             */
            user_email?: string;
            /**
             * Organization display name
             */
            org_name?: string;
            value?: /**
             * The value of an organization setting.
             * Can be any valid JSON type: string, number, boolean, array, or object.
             *
             * example:
             * {
             *   "enabled": true
             * }
             */
            Components.Schemas.SettingsValue;
        }
        namespace Responses {
            export interface $200 {
                delivered?: boolean;
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace PutSettingsValue {
        namespace Parameters {
            export type Key = string;
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
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
         * The value of an organization setting.
         * Can be any valid JSON type: string, number, boolean, array, or object.
         *
         * example:
         * {
         *   "enabled": true
         * }
         */
        Components.Schemas.SettingsValue;
        namespace Responses {
            export type $200 = /**
             * The value of an organization setting.
             * Can be any valid JSON type: string, number, boolean, array, or object.
             *
             * example:
             * {
             *   "enabled": true
             * }
             */
            Components.Schemas.SettingsValue;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace UpdateOrganization {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization (tenant) in the epilot platform
             * example:
             * 739224
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
        }
        export type RequestBody = /**
         * Represents an epilot organization (tenant).
         *
         * An organization contains all the configuration, branding, and contact information
         * for a tenant account on the epilot platform.
         *
         */
        Components.Schemas.Organization;
        namespace Responses {
            export type $200 = /**
             * Represents an epilot organization (tenant).
             *
             * An organization contains all the configuration, branding, and contact information
             * for a tenant account on the epilot platform.
             *
             */
            Components.Schemas.Organization;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getCurrentOrganization - getCurrentOrganization
   * 
   * Retrieves the organization associated with the authenticated user's current session.
   * 
   * This endpoint is useful for fetching organization details without knowing the organization ID,
   * as it automatically resolves the organization from the authentication token.
   * 
   */
  'getCurrentOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCurrentOrganization.Responses.$200>
  /**
   * getOrganization - getOrganization
   * 
   * Retrieves detailed information about a specific organization by its unique identifier.
   * 
   * Returns the organization's profile information including name, contact details,
   * address, branding assets, and configuration.
   * 
   */
  'getOrganization'(
    parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganization.Responses.$200>
  /**
   * updateOrganization - updateOrganization
   * 
   * Updates an organization's profile information.
   * 
   * This endpoint supports partial updates - only the fields provided in the request body
   * will be modified. Fields not included in the request will retain their current values.
   * 
   * Common use cases:
   * - Updating contact information (email, phone, website)
   * - Changing the organization name
   * - Updating the postal address
   * - Setting or updating branding assets (logo_url, logo_thumbnail_url)
   * - Configuring the default email signature
   * 
   */
  'updateOrganization'(
    parameters?: Parameters<Paths.UpdateOrganization.PathParameters> | null,
    data?: Paths.UpdateOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOrganization.Responses.$200>
  /**
   * getSettings - getSettings
   * 
   * Retrieves all configuration settings for an organization.
   * 
   * Returns a key-value map of all settings configured for the organization.
   * Settings control various platform features and behaviors including:
   * - Feature flags (e.g., double_opt_in, email_tracking)
   * - Integration configurations
   * - UI preferences
   * - Workflow settings
   * 
   */
  'getSettings'(
    parameters?: Parameters<Paths.GetSettings.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettings.Responses.$200>
  /**
   * putSettingsValue - putSettingsValue
   * 
   * Creates or updates a specific organization setting identified by its key.
   * 
   * The setting value can be any valid JSON type:
   * - String (e.g., "en", "production")
   * - Number (e.g., 100, 3.14)
   * - Boolean (e.g., true, false)
   * - Object (e.g., {"enabled": true, "threshold": 50})
   * - Array (e.g., ["email", "sms", "push"])
   * 
   * If the setting key does not exist, it will be created. If it exists, its value
   * will be replaced with the new value.
   * 
   */
  'putSettingsValue'(
    parameters?: Parameters<Paths.PutSettingsValue.PathParameters> | null,
    data?: Paths.PutSettingsValue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSettingsValue.Responses.$200>
  /**
   * deleteSettingsValue - deleteSettingsValue
   * 
   * Removes a specific organization setting identified by its key.
   * 
   * After deletion, the setting will no longer appear in the organization's settings
   * and any features relying on this setting will use their default behavior.
   * 
   */
  'deleteSettingsValue'(
    parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
  /**
   * notifySettingsValueUpdated - notifySettingsValueUpdated
   * 
   * Sends an internal notification that an organization setting was updated.
   */
  'notifySettingsValueUpdated'(
    parameters?: Parameters<Paths.NotifySettingsValueUpdated.PathParameters> | null,
    data?: Paths.NotifySettingsValueUpdated.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotifySettingsValueUpdated.Responses.$200>
  /**
   * getOrganizationFeatureSettings - getOrganizationFeatureSettings
   * 
   * Get organization feature settings.
   * 
   * Returns feature flag metadata for the organization UI.
   * 
   * This data is static (identical for all organizations) and changes infrequently.
   * Clients should cache responses using the Cache-Control header.
   * 
   */
  'getOrganizationFeatureSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganizationFeatureSettings.Responses.$200>
  /**
   * getFeatureSettings - getFeatureSettings
   * 
   * Get platform configuration metadata.
   * 
   * Deprecated: use /v2/organization/feature-settings instead.
   * 
   */
  'getFeatureSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFeatureSettings.Responses.$200>
  /**
   * getActiveAnnouncement - getActiveAnnouncement
   * 
   * Returns the announcement (e.g. a subprocessor change notice) to show as a portal banner for the
   * caller's organization.
   * 
   * Only the newest published announcement whose acknowledgement window is still open is returned, and
   * only if the organization is eligible (created before the announcement was published) and has not
   * acknowledged it yet. Otherwise `announcement` is `null`.
   * 
   * `can_acknowledge` tells whether the caller may acknowledge (requires `organization:edit`).
   * 
   */
  'getActiveAnnouncement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActiveAnnouncement.Responses.$200>
  /**
   * acknowledgeAnnouncement - acknowledgeAnnouncement
   * 
   * Acknowledges an announcement on behalf of the caller's organization. Only org admins
   * (`organization:edit`) may acknowledge.
   * 
   * One acknowledgement per organization: the first acknowledgement wins. Acknowledging an already
   * acknowledged announcement returns the existing record.
   * 
   */
  'acknowledgeAnnouncement'(
    parameters?: Parameters<Paths.AcknowledgeAnnouncement.PathParameters> | null,
    data?: Paths.AcknowledgeAnnouncement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcknowledgeAnnouncement.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/organization/current']: {
    /**
     * getCurrentOrganization - getCurrentOrganization
     * 
     * Retrieves the organization associated with the authenticated user's current session.
     * 
     * This endpoint is useful for fetching organization details without knowing the organization ID,
     * as it automatically resolves the organization from the authentication token.
     * 
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
     * Retrieves detailed information about a specific organization by its unique identifier.
     * 
     * Returns the organization's profile information including name, contact details,
     * address, branding assets, and configuration.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganization.Responses.$200>
    /**
     * updateOrganization - updateOrganization
     * 
     * Updates an organization's profile information.
     * 
     * This endpoint supports partial updates - only the fields provided in the request body
     * will be modified. Fields not included in the request will retain their current values.
     * 
     * Common use cases:
     * - Updating contact information (email, phone, website)
     * - Changing the organization name
     * - Updating the postal address
     * - Setting or updating branding assets (logo_url, logo_thumbnail_url)
     * - Configuring the default email signature
     * 
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
     * Retrieves all configuration settings for an organization.
     * 
     * Returns a key-value map of all settings configured for the organization.
     * Settings control various platform features and behaviors including:
     * - Feature flags (e.g., double_opt_in, email_tracking)
     * - Integration configurations
     * - UI preferences
     * - Workflow settings
     * 
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
     * Creates or updates a specific organization setting identified by its key.
     * 
     * The setting value can be any valid JSON type:
     * - String (e.g., "en", "production")
     * - Number (e.g., 100, 3.14)
     * - Boolean (e.g., true, false)
     * - Object (e.g., {"enabled": true, "threshold": 50})
     * - Array (e.g., ["email", "sms", "push"])
     * 
     * If the setting key does not exist, it will be created. If it exists, its value
     * will be replaced with the new value.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.PutSettingsValue.PathParameters> | null,
      data?: Paths.PutSettingsValue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSettingsValue.Responses.$200>
    /**
     * deleteSettingsValue - deleteSettingsValue
     * 
     * Removes a specific organization setting identified by its key.
     * 
     * After deletion, the setting will no longer appear in the organization's settings
     * and any features relying on this setting will use their default behavior.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSettingsValue.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSettingsValue.Responses.$200>
  }
  ['/v2/organization/{org_id}/settings/{key}/notifications']: {
    /**
     * notifySettingsValueUpdated - notifySettingsValueUpdated
     * 
     * Sends an internal notification that an organization setting was updated.
     */
    'post'(
      parameters?: Parameters<Paths.NotifySettingsValueUpdated.PathParameters> | null,
      data?: Paths.NotifySettingsValueUpdated.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotifySettingsValueUpdated.Responses.$200>
  }
  ['/v2/organization/feature-settings']: {
    /**
     * getOrganizationFeatureSettings - getOrganizationFeatureSettings
     * 
     * Get organization feature settings.
     * 
     * Returns feature flag metadata for the organization UI.
     * 
     * This data is static (identical for all organizations) and changes infrequently.
     * Clients should cache responses using the Cache-Control header.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganizationFeatureSettings.Responses.$200>
  }
  ['/v2/feature-settings']: {
    /**
     * getFeatureSettings - getFeatureSettings
     * 
     * Get platform configuration metadata.
     * 
     * Deprecated: use /v2/organization/feature-settings instead.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFeatureSettings.Responses.$200>
  }
  ['/v2/organization/announcements/active']: {
    /**
     * getActiveAnnouncement - getActiveAnnouncement
     * 
     * Returns the announcement (e.g. a subprocessor change notice) to show as a portal banner for the
     * caller's organization.
     * 
     * Only the newest published announcement whose acknowledgement window is still open is returned, and
     * only if the organization is eligible (created before the announcement was published) and has not
     * acknowledged it yet. Otherwise `announcement` is `null`.
     * 
     * `can_acknowledge` tells whether the caller may acknowledge (requires `organization:edit`).
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetActiveAnnouncement.Responses.$200>
  }
  ['/v2/organization/announcements/{announcement_id}/acknowledge']: {
    /**
     * acknowledgeAnnouncement - acknowledgeAnnouncement
     * 
     * Acknowledges an announcement on behalf of the caller's organization. Only org admins
     * (`organization:edit`) may acknowledge.
     * 
     * One acknowledgement per organization: the first acknowledgement wins. Acknowledging an already
     * acknowledged announcement returns the existing record.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AcknowledgeAnnouncement.PathParameters> | null,
      data?: Paths.AcknowledgeAnnouncement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcknowledgeAnnouncement.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActiveAnnouncementResponse = Components.Schemas.ActiveAnnouncementResponse;
export type Announcement = Components.Schemas.Announcement;
export type AnnouncementMessage = Components.Schemas.AnnouncementMessage;
export type AnnouncementOrganizationStatus = Components.Schemas.AnnouncementOrganizationStatus;
export type AnnouncementOrganizationStatusValue = Components.Schemas.AnnouncementOrganizationStatusValue;
export type AnnouncementType = Components.Schemas.AnnouncementType;
export type FeatureFlagMetadata = Components.Schemas.FeatureFlagMetadata;
export type FeatureSettings = Components.Schemas.FeatureSettings;
export type I18nString = Components.Schemas.I18nString;
export type Organization = Components.Schemas.Organization;
export type OrganizationId = Components.Schemas.OrganizationId;
export type Settings = Components.Schemas.Settings;
export type SettingsValue = Components.Schemas.SettingsValue;
export type VisibilityRule = Components.Schemas.VisibilityRule;
