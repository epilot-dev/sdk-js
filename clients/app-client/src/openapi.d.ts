/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace RequestBodies {
        export interface CreateBundlePresignedRequest {
            /**
             * Version of the app
             */
            version: string;
            /**
             * ID of the journye block component
             */
            component_id?: string;
        }
        export interface CreateConfigRequest {
            /**
             * Name of the app
             */
            name: string;
            description: Schemas.TranslatedString;
            category?: string;
            /**
             * S3 key of the logo file
             */
            logo_url_key?: string;
        }
        export interface CreateLogoPresignedRequest {
            /**
             * Original filename of the logo
             * example:
             * company-logo.png
             */
            filename: string;
            /**
             * MIME type of the logo file
             * example:
             * image/png
             */
            mime_type: "image/png" | "image/jpeg" | "image/jpg";
        }
        export interface InstallRequest {
            /**
             * Configuration values for the app components
             */
            option_values?: Schemas.OptionsRef[];
        }
        export interface PatchConfigMetadataRequest {
            /**
             * Name of the app
             */
            name?: string;
            description?: Schemas.TranslatedString;
            category?: string;
            documentation_url?: string;
            notifications?: Schemas.NotificationConfig;
            pricing?: Schemas.Pricing;
            /**
             * S3 key of the logo file
             */
            logo_url_key?: string;
            /**
             * Email address for support requests
             */
            support_email?: string;
        }
        export type UpsertComponentRequest = Schemas.BaseComponent;
    }
    namespace Schemas {
        export interface Audit {
            /**
             * Timestamp of the creation
             */
            created_at?: string;
            /**
             * User ID of the creator
             */
            created_by?: string;
            /**
             * Timestamp of the last update
             */
            updated_at?: string;
            /**
             * User ID of the last updater
             */
            updated_by?: string;
        }
        export interface Author {
            /**
             * Name of the author
             */
            name?: string;
            /**
             * Company of the author
             */
            company: string;
            /**
             * Email of the author
             */
            email?: string;
        }
        export type BaseComponent = {
            /**
             * Unique identifier for the component
             */
            id: string;
            name?: TranslatedString;
            description?: TranslatedString;
            /**
             * List of options for the app component
             */
            options?: /* Options for the component configuration */ Options[];
        } & (JourneyBlockComponent | PortalExtensionComponent);
        export interface BaseComponentCommon {
            /**
             * Unique identifier for the component
             */
            id: string;
            /**
             * Name of the component
             */
            name?: TranslatedString;
            /**
             * Description of the component
             */
            description?: TranslatedString;
            /**
             * List of options for the app component
             */
            options?: /* Options for the component configuration */ Options[];
        }
        /**
         * How often the subscription is billed
         */
        export type BillingFrequency = "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM";
        export interface BooleanArg {
            type?: "boolean";
        }
        export interface CallerIdentity {
            /**
             * a human readable name of the caller (e.g. user name, token name or email address)
             * example:
             * manifest@epilot.cloud
             */
            name?: any;
            /**
             * epilot organization id
             * example:
             * 911690
             */
            org_id: string;
            /**
             * epilot user id, when called by a user
             * example:
             * 11001045
             */
            user_id?: string;
            /**
             * token id, when called by API token
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            token_id?: string;
        }
        /**
         * Type of app component
         */
        export type ComponentType = "CUSTOM_JOURNEY_BLOCK" | "PORTAL_EXTENSION";
        /**
         * Configuration of the published app
         */
        export interface Configuration {
            app_id: string;
            /**
             * Name of the app
             */
            name: string;
            author?: Author;
            /**
             * List of available versions of the app
             */
            versions: string[];
            /**
             * List of available public versions of the app
             */
            public_versions?: string[];
            /**
             * Email address for support requests
             */
            support_email?: string;
            /**
             * Latest version of the app
             */
            latest_version: string;
            /**
             * Category of the app.
             */
            category?: string;
            /**
             * URL of the app icon.
             */
            icon_url?: string;
            /**
             * URL of the app documentation.
             */
            documentation_url?: string;
            description: TranslatedString;
            notifications?: NotificationConfig;
            /**
             * Organization ID of the app owner
             */
            owner_org_id: string;
            /**
             * Flag to indicate if the app is built by epilot.
             */
            internal?: boolean;
            pricing?: Pricing;
            configuration_audit?: Audit;
            components: BaseComponent[];
            /**
             * Flag to indicate if the app is public.
             */
            public?: boolean;
            /**
             * Flag to indicate if the app is pending for verification
             */
            pending?: boolean;
            /**
             * Version of the app that is installed
             */
            version: string;
            /**
             * Flag to indicate if the app is in beta.
             */
            is_beta?: boolean;
            /**
             * Timestamp when the app version is deprecated
             */
            deprecated_at?: string;
            /**
             * Changelog for the app version
             */
            changelog?: string;
            /**
             * Status of the review process
             */
            review_status?: "approved" | "rejected" | "pending";
            version_audit: {
                /**
                 * Timestamp of the creation
                 */
                created_at?: string;
                /**
                 * User ID of the creator
                 */
                created_by?: string;
                /**
                 * Timestamp of the last update
                 */
                updated_at?: string;
                /**
                 * User ID of the last updater
                 */
                updated_by?: string;
                /**
                 * Timestamp of the last version update
                 */
                versioned_at?: string;
                /**
                 * User ID of the user who last updated the app
                 */
                versioned_by?: string;
            };
        }
        /**
         * Basic metadata about your app configuration which does not get versioned
         */
        export interface ConfigurationMetadata {
            app_id: string;
            /**
             * Name of the app
             */
            name: string;
            author?: Author;
            /**
             * List of available versions of the app
             */
            versions: string[];
            /**
             * List of available public versions of the app
             */
            public_versions?: string[];
            /**
             * Email address for support requests
             */
            support_email?: string;
            /**
             * Latest version of the app
             */
            latest_version: string;
            /**
             * Category of the app.
             */
            category?: string;
            /**
             * URL of the app icon.
             */
            icon_url?: string;
            /**
             * URL of the app documentation.
             */
            documentation_url?: string;
            /**
             * Markdown description of the app.
             */
            description: TranslatedString;
            /**
             * Configuration for developer notifications
             */
            notifications?: NotificationConfig;
            /**
             * Organization ID of the app owner, required for private apps or sandbox accounts
             */
            owner_org_id: string;
            /**
             * Flag to indicate if the app is built by epilot.
             */
            internal?: boolean;
            /**
             * Pricing information for the app
             */
            pricing?: Pricing;
            /**
             * Audit information for the app
             */
            configuration_audit?: Audit;
        }
        /**
         * Configuration data about your app which is versionable
         */
        export interface ConfigurationVersion {
            app_id: string;
            /**
             * Organization ID of the app owner
             */
            owner_org_id: string;
            components: BaseComponent[];
            /**
             * Flag to indicate if the app is public.
             */
            public?: boolean;
            /**
             * Flag to indicate if the app is pending for verification
             */
            pending?: boolean;
            /**
             * Version of the app that is installed
             */
            version: string;
            /**
             * Flag to indicate if the app is in beta.
             */
            is_beta?: boolean;
            /**
             * Timestamp when the app version is deprecated
             */
            deprecated_at?: string;
            /**
             * Changelog for the app version
             */
            changelog?: string;
            /**
             * Status of the review process
             */
            review_status?: "approved" | "rejected" | "pending";
            version_audit: {
                /**
                 * Timestamp of the creation
                 */
                created_at?: string;
                /**
                 * User ID of the creator
                 */
                created_by?: string;
                /**
                 * Timestamp of the last update
                 */
                updated_at?: string;
                /**
                 * User ID of the last updater
                 */
                updated_by?: string;
                /**
                 * Timestamp of the last version update
                 */
                versioned_at?: string;
                /**
                 * User ID of the user who last updated the app
                 */
                versioned_by?: string;
            };
        }
        export interface EnumArg {
            type?: "enum";
            /**
             * If true, allows selection of multiple values
             */
            isMulti?: boolean;
            /**
             * List of options for enum type
             */
            options: [
                {
                    /**
                     * Unique identifier for the option
                     */
                    id: string;
                    /**
                     * Display label for the option
                     */
                    label: TranslatedString;
                },
                ...{
                    /**
                     * Unique identifier for the option
                     */
                    id: string;
                    /**
                     * Display label for the option
                     */
                    label: TranslatedString;
                }[]
            ];
        }
        /**
         * Information about the installed app. Has configuration data of the installed version
         */
        export interface Installation {
            /**
             * ID of the app configuration
             */
            app_id: string;
            /**
             * Unique identifier for the organization the app is installed in
             */
            installer_org_id: string;
            /**
             * Flag to indicate if the app is enabled. Enabled is set to true when required option values are set.
             */
            enabled: boolean;
            /**
             * Name of the app
             */
            name: string;
            /**
             * Configuration values for the app components
             */
            option_values?: OptionsRef[];
            /**
             * List of component configurations for the installed version
             */
            components: BaseComponent[];
            /**
             * Version of the app that is installed
             */
            installed_version: string;
            installation_audit?: Audit;
        }
        export interface JourneyBlockComponent {
            component_type: "CUSTOM_JOURNEY_BLOCK";
            configuration: JourneyBlockConfig;
        }
        export type JourneyBlockComponentArgs = {
            /**
             * Unique identifier for this component arg
             */
            key: string;
            type: "text" | "boolean" | "enum";
            /**
             * Flag to indicate if this option is required
             */
            required?: boolean;
            description?: TranslatedString;
            label: TranslatedString;
        } & (TextArg | BooleanArg | EnumArg);
        export interface JourneyBlockConfig {
            /**
             * URL of the web component object
             * example:
             * https://cdn.apps.com/123/v1.0.0/bundle.js
             */
            component_url: string;
            /**
             * Custom element tag for the component
             */
            component_tag: string;
            /**
             * Arguments to pass to the component
             */
            component_args?: JourneyBlockComponentArgs[];
            /**
             * Size of the bundle in bytes
             */
            component_size?: number;
            /**
             * Define data which is mapped to entity mapping ui blocks
             */
            component_mapping?: {
                [name: string]: "string" | "boolean" | "date" | "datetime";
            };
        }
        export interface NotificationConfig {
            /**
             * Email address to receive notifications
             * example:
             * developer@example.com
             */
            email?: string; // email
            /**
             * List of events to subscribe to
             */
            events?: NotificationEvent[];
        }
        export type NotificationEvent = "app.installed" | "app.uninstalled";
        export interface Option {
            /**
             * Key matching a config_option from the component
             */
            key: string;
            /**
             * The configured value for this option
             */
            value: string;
        }
        /**
         * Options for the component configuration
         */
        export interface Options {
            /**
             * Unique identifier for this configuration option
             */
            key: string;
            /**
             * Human-readable label for the configuration option
             */
            label?: string;
            /**
             * Flag to indicate if this option is required
             */
            required?: boolean;
            /**
             * Detailed description of what this configuration option does
             */
            description?: string;
            /**
             * The configured value for this option. Is only present when the component is installed.
             */
            value?: string;
            type: "text" | "number" | "boolean" | "secret";
        }
        export interface OptionsRef {
            /**
             * ID of the component these values are for
             */
            component_id: string;
            options: Option[];
        }
        export interface PortalAuth {
            type?: string;
            url?: string;
            method?: string;
            headers?: {
                [name: string]: string;
            };
        }
        export interface PortalExtensionComponent {
            component_type: "PORTAL_EXTENSION";
            origin?: "END_CUSTOMER_PORTAL" | "INSTALLER_PORTAL";
            configuration: PortalExtensionConfig;
        }
        export interface PortalExtensionConfig {
            id?: string;
            hooks?: {
                id?: string;
                type?: string;
                name?: TranslatedString;
                interval?: string[];
                auth?: PortalAuth;
                call?: {
                    url?: string;
                    headers?: {
                        [name: string]: string;
                    };
                    params?: {
                        [name: string]: string;
                    };
                };
            }[];
            links?: {
                id?: string;
                type?: string;
                name?: TranslatedString;
                description?: TranslatedString;
                condition?: string;
                auth?: PortalAuth;
                redirect?: {
                    url?: string;
                    params?: {
                        [name: string]: string;
                    };
                };
            }[];
        }
        export interface Pricing {
            pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN";
            billing_frequency?: /* How often the subscription is billed */ BillingFrequency;
        }
        /**
         * Public configuration of the published app
         */
        export interface PublicConfiguration {
            /**
             * ID of the app configuration
             */
            app_id?: string;
            /**
             * Organization ID of the app owner
             */
            owner_org_id?: string;
            /**
             * Name of the app
             */
            name?: string;
            author?: Author;
            /**
             * Category of the app.
             */
            category?: string;
            /**
             * URL of the app icon.
             */
            icon_url?: string;
            /**
             * URL of the app documentation.
             */
            documentation_url?: string;
            /**
             * Markdown description of the app.
             */
            description?: TranslatedString;
            /**
             * Pricing information for the app
             */
            pricing?: Pricing;
            components?: BaseComponent[];
            /**
             * Flag to indicate if the app is in beta.
             */
            is_beta?: boolean;
            /**
             * Timestamp when the app version is deprecated
             */
            deprecated_at?: string;
            /**
             * Version of the app that is installed
             */
            version?: string;
        }
        export interface S3Reference {
            /**
             * The name of the S3 bucket where the JSON file for import is stored.
             * example:
             * my-bucket
             */
            bucket: string;
            /**
             * The key or path to the JSON file within the S3 bucket.
             * example:
             * manifest.json
             */
            key: string;
        }
        export interface TextArg {
            type?: "text";
        }
        export interface TranslatedString {
            /**
             * English translation
             */
            en?: string | null;
            /**
             * German translation
             */
            de: string;
        }
        export interface UploadFilePayload {
            /**
             * ID of the app configuration. Required for app updates.
             */
            app_id?: string;
        }
    }
}
declare namespace Paths {
    namespace CloneVersion {
        namespace Parameters {
            export type AppId = string;
            export type SourceVersion = string;
            export type TargetVersion = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            sourceVersion: Parameters.SourceVersion;
            targetVersion: Parameters.TargetVersion;
        }
        namespace Responses {
            export interface $201 {
                app_id?: string;
                version?: string;
                status?: "pending" | "published";
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace CreateBundleUploadUrl {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export type RequestBody = Components.RequestBodies.CreateBundlePresignedRequest;
        namespace Responses {
            export interface $200 {
                /**
                 * ID of the journye block component
                 */
                component_id?: string;
                /**
                 * URL of the web component object
                 */
                component_url?: string;
                /**
                 * Presigned S3 URL for uploading the bundle
                 */
                upload_url: string;
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * Timestamp when the upload URL expires
                 */
                expires_at?: string; // date-time
            }
            export interface $404 {
            }
        }
    }
    namespace CreateComponent {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        export type RequestBody = Components.RequestBodies.UpsertComponentRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace CreateConfiguration {
        export type RequestBody = Components.RequestBodies.CreateConfigRequest;
        namespace Responses {
            export interface $201 {
                app_id: string;
            }
        }
    }
    namespace CreateLogoUploadUrl {
        export type RequestBody = Components.RequestBodies.CreateLogoPresignedRequest;
        namespace Responses {
            export interface $200 {
                /**
                 * Presigned S3 URL for uploading the logo
                 */
                upload_url: string;
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * Timestamp when the upload URL expires
                 */
                expires_at?: string; // date-time
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteComponent {
        namespace Parameters {
            export type AppId = string;
            export type ComponentId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
            componentId: Parameters.ComponentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteLogo {
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteVersion {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace GetConfiguration {
        namespace Parameters {
            export type Version = string;
        }
        export interface QueryParameters {
            version?: Parameters.Version;
        }
        namespace Responses {
            export type $200 = /* Configuration of the published app */ Components.Schemas.Configuration;
            export interface $404 {
            }
        }
    }
    namespace GetInstallation {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        namespace Responses {
            export type $200 = /* Information about the installed app. Has configuration data of the installed version */ Components.Schemas.Installation;
            export interface $404 {
            }
        }
    }
    namespace GetPublicConfiguration {
        namespace Responses {
            export type $200 = /* Public configuration of the published app */ Components.Schemas.PublicConfiguration;
            export interface $404 {
            }
        }
    }
    namespace GetVersion {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        namespace Responses {
            export type $200 = /* Configuration of the published app */ Components.Schemas.Configuration;
            export interface $404 {
            }
        }
    }
    namespace Install {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export type RequestBody = Components.RequestBodies.InstallRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace ListConfigurations {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export interface $200 {
                configurations?: /* Basic metadata about your app configuration which does not get versioned */ Components.Schemas.ConfigurationMetadata[];
                pagination?: {
                    total?: number;
                    page?: number;
                    pageSize?: number;
                };
            }
        }
    }
    namespace ListInstallations {
        namespace Parameters {
            export type ComponentType = /* Type of app component */ Components.Schemas.ComponentType;
            export type Enabled = boolean;
            export type Page = number;
            export type PageSize = number;
        }
        export interface QueryParameters {
            componentType?: Parameters.ComponentType;
            enabled?: Parameters.Enabled;
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export interface $200 {
                apps?: /* Information about the installed app. Has configuration data of the installed version */ Components.Schemas.Installation[];
                pagination?: {
                    total?: number;
                    page?: number;
                    pageSize?: number;
                };
            }
        }
    }
    namespace ListVersions {
        namespace Parameters {
            export type AppId = string;
            export type Page = number;
            export type PageSize = number;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export interface $200 {
                versions?: /* Configuration data about your app which is versionable */ Components.Schemas.ConfigurationVersion[];
                pagination?: {
                    total?: number;
                    page?: number;
                    pageSize?: number;
                };
            }
        }
    }
    namespace PatchComponent {
        namespace Parameters {
            export type AppId = string;
            export type ComponentId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
            componentId: Parameters.ComponentId;
        }
        export type RequestBody = Components.RequestBodies.UpsertComponentRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace PatchInstallation {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export type RequestBody = Components.RequestBodies.InstallRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace PatchMetadata {
        export type RequestBody = Components.RequestBodies.PatchConfigMetadataRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace PromoteVersion {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        namespace Responses {
            export type $200 = /* Information about the installed app. Has configuration data of the installed version */ Components.Schemas.Installation;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace Uninstall {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace V1AppConfigurations$AppId {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
    }
    namespace V1AppConfigurations$AppIdLogo {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
    }
    namespace V1AppConfigurationsPublic$AppId {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
    }
}

export interface OperationMethods {
  /**
   * listConfigurations - listConfigurations
   * 
   * List all app configuration metadata owned by an organization. To get full app configuration details, use the /v1/app-configurations/{appId} endpoint.
   */
  'listConfigurations'(
    parameters?: Parameters<Paths.ListConfigurations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigurations.Responses.$200>
  /**
   * createConfiguration - createConfiguration
   * 
   * Create a new private app configuration. To make it public a verification process needs to be triggered
   */
  'createConfiguration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateConfiguration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateConfiguration.Responses.$201>
  /**
   * getPublicConfiguration - getPublicConfiguration
   * 
   * Retrieve the public configuration of an app to install in your tenant
   */
  'getPublicConfiguration'(
    parameters?: Parameters<Paths.V1AppConfigurationsPublic$AppId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicConfiguration.Responses.$200>
  /**
   * getConfiguration - getConfiguration
   * 
   * Retrieve a specific app configuration
   */
  'getConfiguration'(
    parameters?: Parameters<Paths.GetConfiguration.QueryParameters & Paths.V1AppConfigurations$AppId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfiguration.Responses.$200>
  /**
   * patchMetadata - patchMetadata
   * 
   * Patch non-versioned configuration metadata of a given app configuration.
   */
  'patchMetadata'(
    parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
    data?: Paths.PatchMetadata.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchMetadata.Responses.$204>
  /**
   * createBundleUploadUrl - createBundleUploadUrl
   * 
   * Generate a presigned URL for uploading app bundle to /<app-id>/bundle.zip path
   */
  'createBundleUploadUrl'(
    parameters?: Parameters<Paths.CreateBundleUploadUrl.PathParameters> | null,
    data?: Paths.CreateBundleUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBundleUploadUrl.Responses.$200>
  /**
   * createLogoUploadUrl - createLogoUploadUrl
   * 
   * Generate a presigned URL for uploading app logo to /<app-id>/logo.png path
   */
  'createLogoUploadUrl'(
    parameters?: Parameters<Paths.V1AppConfigurations$AppIdLogo.PathParameters> | null,
    data?: Paths.CreateLogoUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateLogoUploadUrl.Responses.$200>
  /**
   * deleteLogo - deleteLogo
   * 
   * Delete the app logo from /<app-id>/logo.png path
   */
  'deleteLogo'(
    parameters?: Parameters<Paths.V1AppConfigurations$AppIdLogo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteLogo.Responses.$204>
  /**
   * listVersions - listVersions
   * 
   * Retrieve a list of versions for an app configuration
   */
  'listVersions'(
    parameters?: Parameters<Paths.ListVersions.QueryParameters & Paths.ListVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListVersions.Responses.$200>
  /**
   * getVersion - getVersion
   * 
   * Retrieve a specific version of an app configuration
   */
  'getVersion'(
    parameters?: Parameters<Paths.GetVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVersion.Responses.$200>
  /**
   * deleteVersion - deleteVersion
   * 
   * Delete a specific version of an app configuration
   */
  'deleteVersion'(
    parameters?: Parameters<Paths.DeleteVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteVersion.Responses.$204>
  /**
   * createComponent - createComponent
   * 
   * Patch an existing app version to create/add a component
   */
  'createComponent'(
    parameters?: Parameters<Paths.CreateComponent.PathParameters> | null,
    data?: Paths.CreateComponent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateComponent.Responses.$204>
  /**
   * patchComponent - patchComponent
   * 
   * Patch an existing app version to update its components
   */
  'patchComponent'(
    parameters?: Parameters<Paths.PatchComponent.PathParameters> | null,
    data?: Paths.PatchComponent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchComponent.Responses.$204>
  /**
   * deleteComponent - deleteComponent
   * 
   * Delete a specific component from an app version
   */
  'deleteComponent'(
    parameters?: Parameters<Paths.DeleteComponent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteComponent.Responses.$204>
  /**
   * cloneVersion - cloneVersion
   * 
   * Clone an existing app version to create a new version
   */
  'cloneVersion'(
    parameters?: Parameters<Paths.CloneVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CloneVersion.Responses.$201>
  /**
   * listInstallations - listInstallations
   * 
   * Retrieve a list of installed apps for the organization.
   */
  'listInstallations'(
    parameters?: Parameters<Paths.ListInstallations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstallations.Responses.$200>
  /**
   * getInstallation - getInstallation
   * 
   * Retrieve details of an installed app by its ID.
   */
  'getInstallation'(
    parameters?: Parameters<Paths.GetInstallation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetInstallation.Responses.$200>
  /**
   * install - install
   * 
   * Upsert app installation by its ID.
   */
  'install'(
    parameters?: Parameters<Paths.Install.PathParameters> | null,
    data?: Paths.Install.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Install.Responses.$204>
  /**
   * patchInstallation - patchInstallation
   * 
   * Patch an installed app by its ID.
   */
  'patchInstallation'(
    parameters?: Parameters<Paths.PatchInstallation.PathParameters> | null,
    data?: Paths.PatchInstallation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchInstallation.Responses.$204>
  /**
   * uninstall - uninstall
   * 
   * Uninstall an app by its ID.
   */
  'uninstall'(
    parameters?: Parameters<Paths.Uninstall.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Uninstall.Responses.$204>
  /**
   * promoteVersion - promoteVersion
   * 
   * Update an installed app to a new version
   */
  'promoteVersion'(
    parameters?: Parameters<Paths.PromoteVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PromoteVersion.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/app-configurations']: {
    /**
     * listConfigurations - listConfigurations
     * 
     * List all app configuration metadata owned by an organization. To get full app configuration details, use the /v1/app-configurations/{appId} endpoint.
     */
    'get'(
      parameters?: Parameters<Paths.ListConfigurations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigurations.Responses.$200>
    /**
     * createConfiguration - createConfiguration
     * 
     * Create a new private app configuration. To make it public a verification process needs to be triggered
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateConfiguration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateConfiguration.Responses.$201>
  }
  ['/v1/app-configurations/public/{appId}']: {
    /**
     * getPublicConfiguration - getPublicConfiguration
     * 
     * Retrieve the public configuration of an app to install in your tenant
     */
    'get'(
      parameters?: Parameters<Paths.V1AppConfigurationsPublic$AppId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicConfiguration.Responses.$200>
  }
  ['/v1/app-configurations/{appId}']: {
    /**
     * getConfiguration - getConfiguration
     * 
     * Retrieve a specific app configuration
     */
    'get'(
      parameters?: Parameters<Paths.GetConfiguration.QueryParameters & Paths.V1AppConfigurations$AppId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfiguration.Responses.$200>
    /**
     * patchMetadata - patchMetadata
     * 
     * Patch non-versioned configuration metadata of a given app configuration.
     */
    'patch'(
      parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
      data?: Paths.PatchMetadata.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchMetadata.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/bundle']: {
    /**
     * createBundleUploadUrl - createBundleUploadUrl
     * 
     * Generate a presigned URL for uploading app bundle to /<app-id>/bundle.zip path
     */
    'post'(
      parameters?: Parameters<Paths.CreateBundleUploadUrl.PathParameters> | null,
      data?: Paths.CreateBundleUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBundleUploadUrl.Responses.$200>
  }
  ['/v1/app-configurations/{appId}/logo']: {
    /**
     * createLogoUploadUrl - createLogoUploadUrl
     * 
     * Generate a presigned URL for uploading app logo to /<app-id>/logo.png path
     */
    'post'(
      parameters?: Parameters<Paths.V1AppConfigurations$AppIdLogo.PathParameters> | null,
      data?: Paths.CreateLogoUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLogoUploadUrl.Responses.$200>
    /**
     * deleteLogo - deleteLogo
     * 
     * Delete the app logo from /<app-id>/logo.png path
     */
    'delete'(
      parameters?: Parameters<Paths.V1AppConfigurations$AppIdLogo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteLogo.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/versions']: {
    /**
     * listVersions - listVersions
     * 
     * Retrieve a list of versions for an app configuration
     */
    'get'(
      parameters?: Parameters<Paths.ListVersions.QueryParameters & Paths.ListVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListVersions.Responses.$200>
  }
  ['/v1/app-configurations/{appId}/versions/{version}']: {
    /**
     * getVersion - getVersion
     * 
     * Retrieve a specific version of an app configuration
     */
    'get'(
      parameters?: Parameters<Paths.GetVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVersion.Responses.$200>
    /**
     * deleteVersion - deleteVersion
     * 
     * Delete a specific version of an app configuration
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteVersion.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/versions/{version}/components']: {
    /**
     * createComponent - createComponent
     * 
     * Patch an existing app version to create/add a component
     */
    'post'(
      parameters?: Parameters<Paths.CreateComponent.PathParameters> | null,
      data?: Paths.CreateComponent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateComponent.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/versions/{version}/components/{componentId}']: {
    /**
     * patchComponent - patchComponent
     * 
     * Patch an existing app version to update its components
     */
    'patch'(
      parameters?: Parameters<Paths.PatchComponent.PathParameters> | null,
      data?: Paths.PatchComponent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchComponent.Responses.$204>
    /**
     * deleteComponent - deleteComponent
     * 
     * Delete a specific component from an app version
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteComponent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteComponent.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/versions/{sourceVersion}/clone-to/{targetVersion}']: {
    /**
     * cloneVersion - cloneVersion
     * 
     * Clone an existing app version to create a new version
     */
    'post'(
      parameters?: Parameters<Paths.CloneVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CloneVersion.Responses.$201>
  }
  ['/v1/app']: {
    /**
     * listInstallations - listInstallations
     * 
     * Retrieve a list of installed apps for the organization.
     */
    'get'(
      parameters?: Parameters<Paths.ListInstallations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstallations.Responses.$200>
  }
  ['/v1/app/{appId}']: {
    /**
     * getInstallation - getInstallation
     * 
     * Retrieve details of an installed app by its ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetInstallation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetInstallation.Responses.$200>
    /**
     * install - install
     * 
     * Upsert app installation by its ID.
     */
    'post'(
      parameters?: Parameters<Paths.Install.PathParameters> | null,
      data?: Paths.Install.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Install.Responses.$204>
    /**
     * patchInstallation - patchInstallation
     * 
     * Patch an installed app by its ID.
     */
    'patch'(
      parameters?: Parameters<Paths.PatchInstallation.PathParameters> | null,
      data?: Paths.PatchInstallation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchInstallation.Responses.$204>
    /**
     * uninstall - uninstall
     * 
     * Uninstall an app by its ID.
     */
    'delete'(
      parameters?: Parameters<Paths.Uninstall.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Uninstall.Responses.$204>
  }
  ['/v1/app/{appId}/promote-to/{version}']: {
    /**
     * promoteVersion - promoteVersion
     * 
     * Update an installed app to a new version
     */
    'post'(
      parameters?: Parameters<Paths.PromoteVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PromoteVersion.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Audit = Components.Schemas.Audit;
export type Author = Components.Schemas.Author;
export type BaseComponent = Components.Schemas.BaseComponent;
export type BaseComponentCommon = Components.Schemas.BaseComponentCommon;
export type BillingFrequency = Components.Schemas.BillingFrequency;
export type BooleanArg = Components.Schemas.BooleanArg;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type ComponentType = Components.Schemas.ComponentType;
export type Configuration = Components.Schemas.Configuration;
export type ConfigurationMetadata = Components.Schemas.ConfigurationMetadata;
export type ConfigurationVersion = Components.Schemas.ConfigurationVersion;
export type EnumArg = Components.Schemas.EnumArg;
export type Installation = Components.Schemas.Installation;
export type JourneyBlockComponent = Components.Schemas.JourneyBlockComponent;
export type JourneyBlockComponentArgs = Components.Schemas.JourneyBlockComponentArgs;
export type JourneyBlockConfig = Components.Schemas.JourneyBlockConfig;
export type NotificationConfig = Components.Schemas.NotificationConfig;
export type NotificationEvent = Components.Schemas.NotificationEvent;
export type Option = Components.Schemas.Option;
export type Options = Components.Schemas.Options;
export type OptionsRef = Components.Schemas.OptionsRef;
export type PortalAuth = Components.Schemas.PortalAuth;
export type PortalExtensionComponent = Components.Schemas.PortalExtensionComponent;
export type PortalExtensionConfig = Components.Schemas.PortalExtensionConfig;
export type Pricing = Components.Schemas.Pricing;
export type PublicConfiguration = Components.Schemas.PublicConfiguration;
export type S3Reference = Components.Schemas.S3Reference;
export type TextArg = Components.Schemas.TextArg;
export type TranslatedString = Components.Schemas.TranslatedString;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
