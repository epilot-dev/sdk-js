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
         * Request payload for creating a new organization
         */
        export interface CreateOrganizationRequest {
            /**
             * Core organization information for the new tenant
             */
            organization_detail?: {
                /**
                 * Display name for the organization
                 * example:
                 * epilot
                 */
                name: string;
                /**
                 * Primary contact email for the organization
                 * example:
                 * epilot@epilot.cloud
                 */
                email_address?: string;
                /**
                 * Organization type classification.
                 * - Vendor: Primary organization type for epilot customers
                 * - Partner: Partner organization type
                 *
                 * example:
                 * Vendor
                 */
                type: string;
                /**
                 * Whether this is a production or sandbox environment.
                 * Sandbox organizations are for testing and linked to a production org.
                 *
                 */
                organization_use?: "Production" | "Sandbox";
                /**
                 * The ULID of the pricing tier to assign to this organization.
                 * Determines feature access and billing.
                 *
                 * example:
                 * 01GEKHZHSN19KK10ZS92Y3WY9B
                 */
                pricing_tier_id: string;
            };
            /**
             * Initial owner user details.
             * This user will receive an invitation email to complete registration
             * and become the organization administrator.
             *
             */
            owner_user?: {
                /**
                 * Full name of the owner user
                 * example:
                 * Ny Huynh
                 */
                full_name?: string;
                /**
                 * Email address for the invitation (must be unique in the platform)
                 * example:
                 * ny.huynhthi@axonactive.com
                 */
                email_address: string;
            };
        }
        /**
         * Data point metrics for a single organization, used for usage tracking and billing
         */
        export interface DataPoint {
            /**
             * The organization ID (numeric format)
             * example:
             * 206801
             */
            id?: number;
            /**
             * Maximum number of customer entities recorded in the previous month.
             * Used as a high-water mark for billing calculations.
             *
             * example:
             * 10
             */
            max_customer?: number;
            /**
             * Current count of customer entities in the organization.
             * Represents the actual usage at the time of the query.
             *
             * example:
             * 10
             */
            actual_customer?: number;
        }
        /**
         * List of data point metrics for all organizations
         */
        export type DataPointsResponse = /* Data point metrics for a single organization, used for usage tracking and billing */ DataPoint[];
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
         * Response containing a list of HubSpot companies matching the search criteria
         */
        export interface HubspotCompaniesResponse {
            /**
             * List of HubSpot companies matching the query
             */
            results?: /**
             * Represents a company record from HubSpot CRM synchronized to the epilot data warehouse.
             * Used for CRM integration and organization mapping.
             *
             */
            HubspotCompany[];
            /**
             * Total number of companies in the response
             * example:
             * 10
             */
            total?: number;
        }
        /**
         * Represents a company record from HubSpot CRM synchronized to the epilot data warehouse.
         * Used for CRM integration and organization mapping.
         *
         */
        export interface HubspotCompany {
            /**
             * The unique HubSpot company identifier
             * example:
             * 12345678901
             */
            company_id?: string;
            /**
             * The display name of the company in HubSpot
             * example:
             * Acme Corp
             */
            company_name?: string | null;
            /**
             * The primary web domain associated with the company
             * example:
             * acme.com
             */
            domain?: string | null;
        }
        /**
         * HubSpot company data associated with an epilot organization.
         * Contains business metrics and CRM properties synced from HubSpot.
         *
         */
        export interface HubspotOrganizationData {
            /**
             * The unique HubSpot company identifier
             * example:
             * 5278308807
             */
            company_id?: string;
            /**
             * The display name of the company in HubSpot
             * example:
             * Stadtwerke Meerbusch Willich Netz
             */
            company_name?: string | null;
            /**
             * The primary web domain associated with the company
             * example:
             * stadtwerke-service.de
             */
            domain?: string | null;
            /**
             * Current Monthly Recurring Revenue
             * example:
             * 11033.33
             */
            current_mrr?: string | null;
            /**
             * Potential Monthly Recurring Revenue
             * example:
             * 20000
             */
            potential_mrr?: string | null;
            /**
             * Company size classification
             * example:
             * Large
             */
            company_size?: string | null;
            /**
             * Current pricing tier
             * example:
             * Professional
             */
            pricing_tier?: string | null;
            /**
             * HubSpot lifecycle stage
             * example:
             * customer
             */
            lifecyclestage?: string | null;
            /**
             * Industry classification
             * example:
             * Energiedienstleister
             */
            industry?: string | null;
            /**
             * Number of employees
             * example:
             * 200
             */
            numberofemployees?: string | null;
            /**
             * epilot customer number
             * example:
             * 10031
             */
            customer_number?: string | null;
            /**
             * Number of active users
             * example:
             * 34
             */
            no_of_users?: string | null;
            /**
             * User activation rate
             * example:
             * 0.647059
             */
            activation_rate?: string | null;
            /**
             * List of active features
             * example:
             * Installer Portal
             */
            active_features?: string | null;
            /**
             * Implemented use cases
             * example:
             * GRID: Installations (MGA);GRID: House Connections
             */
            usecases_implemented?: string | null;
            /**
             * Current buyer's journey stage
             * example:
             * Expansion-Ready
             */
            buyer_journey?: string | null;
            /**
             * Company country
             * example:
             * Germany
             */
            country?: string | null;
            /**
             * Company city
             * example:
             * Willich
             */
            city?: string | null;
            /**
             * Full HubSpot properties object with all available fields
             */
            properties?: {
                [name: string]: any;
            };
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
         * Extended organization object with internal-only fields.
         *
         * Includes all fields from the base Organization schema plus additional
         * internal metadata used for platform administration and support.
         *
         */
        export interface InternalOrganization {
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
             * Indicates whether this is a production or sandbox organization.
             * Sandbox organizations are linked to a parent production organization for testing purposes.
             *
             */
            organization_use?: "Production" | "Sandbox";
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
             * Indicates whether this is a production or sandbox organization.
             * Sandbox organizations are linked to a parent production organization for testing purposes.
             *
             */
            organization_use?: "Production" | "Sandbox";
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
         * Records the cleanup status reported by a specific service for an organization.
         * Each service that stores organization data reports its cleanup operations here.
         *
         */
        export interface OrganizationCleanupStatus {
            org_id: /**
             * Unique identifier for an organization (tenant) in the epilot platform
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * Name of the service reporting its cleanup status
             * example:
             * organization-api
             */
            service_name: string;
            /**
             * List of cleanup operations performed by the service.
             * Each operation describes what action was taken on which resource.
             *
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
                 * The type of cleanup action performed.
                 * Common values: Delete, Archive, Purge
                 *
                 * example:
                 * Delete
                 */
                action?: string;
                /**
                 * The resource that was cleaned up.
                 * Can be a table name, S3 bucket, or other resource identifier.
                 *
                 * example:
                 * OrgTable
                 */
                resource?: string;
                /**
                 * Additional context about the cleanup operation
                 */
                extra_info?: /* Additional context about the cleanup operation */ string | number | boolean | {
                    [name: string]: any;
                }[] | {
                    [name: string]: any;
                };
            }[];
        }
        /**
         * Unique identifier for an organization (tenant) in the epilot platform
         * example:
         * 739224
         */
        export type OrganizationId = string;
        /**
         * Represents an organization that has been marked for deletion and requires cleanup.
         * Contains metadata about the deletion request.
         *
         */
        export interface OrganizationToCleanup {
            org_id: /**
             * Unique identifier for an organization (tenant) in the epilot platform
             * example:
             * 739224
             */
            OrganizationId;
            /**
             * Timestamp when the organization was marked for deletion
             * example:
             * 2021-06-01T00:00:00Z
             */
            deleted_at: string; // date-time
            /**
             * User ID of the person who initiated the deletion
             * example:
             * 123456
             */
            deleted_by: string;
        }
        /**
         * A unique key identifying an organization setting.
         * Common setting keys include: double_opt_in, email_tracking, default_language, workflow_notifications
         *
         * example:
         * double_opt_in
         */
        export type SettingKey = string;
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
            type: "always" | "never" | "advanced_mode" | "pricing_tier" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or";
            /**
             * Setting key for pricing_tier and setting_enabled rules
             */
            setting_key?: string;
            /**
             * Flag name for feature_flag and flag_enabled rules
             */
            flag_name?: string;
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
declare namespace Paths {
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
   * getFeatureSettings - Get platform configuration metadata
   * 
   * Returns platform-level configuration metadata including feature flag definitions,
   * resource type mappings, and error code severities.
   * 
   * This data is static (identical for all organizations) and changes infrequently.
   * Clients should cache responses using the Cache-Control header.
   * 
   */
  'getFeatureSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFeatureSettings.Responses.$200>
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
  ['/v2/feature-settings']: {
    /**
     * getFeatureSettings - Get platform configuration metadata
     * 
     * Returns platform-level configuration metadata including feature flag definitions,
     * resource type mappings, and error code severities.
     * 
     * This data is static (identical for all organizations) and changes infrequently.
     * Clients should cache responses using the Cache-Control header.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFeatureSettings.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateOrganizationRequest = Components.Schemas.CreateOrganizationRequest;
export type DataPoint = Components.Schemas.DataPoint;
export type DataPointsResponse = Components.Schemas.DataPointsResponse;
export type FeatureFlagMetadata = Components.Schemas.FeatureFlagMetadata;
export type FeatureSettings = Components.Schemas.FeatureSettings;
export type HubspotCompaniesResponse = Components.Schemas.HubspotCompaniesResponse;
export type HubspotCompany = Components.Schemas.HubspotCompany;
export type HubspotOrganizationData = Components.Schemas.HubspotOrganizationData;
export type I18nString = Components.Schemas.I18nString;
export type InternalOrganization = Components.Schemas.InternalOrganization;
export type Organization = Components.Schemas.Organization;
export type OrganizationCleanupStatus = Components.Schemas.OrganizationCleanupStatus;
export type OrganizationId = Components.Schemas.OrganizationId;
export type OrganizationToCleanup = Components.Schemas.OrganizationToCleanup;
export type SettingKey = Components.Schemas.SettingKey;
export type Settings = Components.Schemas.Settings;
export type SettingsValue = Components.Schemas.SettingsValue;
export type VisibilityRule = Components.Schemas.VisibilityRule;
