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
        export interface InstallAppRequest {
            /**
             * Configuration values for the app components
             */
            option_values?: Schemas.OptionsRef[];
        }
        export interface PublishAppRequest {
            s3_reference: Schemas.S3Reference;
            metadata?: {
                access_level?: "public" | "private";
            };
        }
    }
    namespace Schemas {
        /**
         * Information about the installed app
         */
        export interface App {
            app_id?: string;
            name?: TranslatedString;
            /**
             * URL of the app icon.
             */
            icon_url?: string;
            /**
             * URL of the app documentation.
             */
            documentation_url?: string;
            description?: TranslatedString;
            notifications?: NotificationConfig;
            created_by?: string;
            created_at?: string;
            /**
             * Timestamp of the last update
             */
            updated_at?: string;
            /**
             * User ID of the user who last updated the app
             */
            updated_by?: string;
            version?: string;
            author?: Author;
            status?: "published" | "pending";
            components?: BaseComponent[];
            /**
             * Flag to indicate if the app is built by epilot.
             */
            internal?: boolean;
            /**
             * Organization ID of the app owner, required for private apps
             */
            owner_org_id?: string;
            /**
             * Access level of the app.
             */
            access_level?: "public" | "private";
            /**
             * Unique identifier for the app installation
             */
            installation_id?: string;
            /**
             * Unique identifier for the organization the app is installed in
             */
            organization_id?: string;
            /**
             * Timestamp of app creation
             */
            installed_at?: string;
            /**
             * User ID of the user who installed the app
             */
            installed_by?: string;
            /**
             * Flag to indicate if the app is enabled.
             */
            enabled?: boolean;
            /**
             * Configuration values for the app components options
             */
            option_values?: OptionsRef[];
        }
        /**
         * Configuration of the published app
         */
        export interface AppConfiguration {
            app_id?: string;
            name?: TranslatedString;
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
             * Configuration for developer notifications
             */
            notifications?: NotificationConfig;
            created_by?: string;
            created_at?: string;
            updated_at?: string;
            updated_by?: string;
            version?: string;
            author?: Author;
            status?: "published" | "pending";
            components?: BaseComponent[];
            /**
             * Flag to indicate if the app is built by epilot.
             */
            internal?: boolean;
            /**
             * Organization ID of the app owner, required for private apps
             */
            owner_org_id?: string;
            /**
             * Access level of the app.
             */
            access_level?: "public" | "private";
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
             * List of options for the app component
             */
            options?: /* Options for the component configuration */ Options[];
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
        export interface JourneyBlockComponent {
            component_type: "CUSTOM_JOURNEY_BLOCK";
            configuration: JourneyBlockConfig;
        }
        export interface JourneyBlockComponentArgs {
            /**
             * Key matching a config_option from the component
             */
            key: string;
            /**
             * Flag to indicate if this option is required
             */
            required?: boolean;
            /**
             * Description of what this component arg does
             */
            description?: TranslatedString;
            /**
             * Human-readable label for the component arg
             */
            label?: TranslatedString;
            type?: "text" | "number" | "boolean";
        }
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
        }
        export interface NotificationConfig {
            /**
             * Email address to receive notifications
             * example:
             * developer@example.com
             */
            email: string; // email
            /**
             * List of events to subscribe to
             */
            events: [
                NotificationEvent,
                ...NotificationEvent[]
            ];
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
        export interface TranslatedString {
            /**
             * English translation
             */
            en?: string;
            /**
             * German translation
             */
            de?: string;
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
    namespace GetAppConfiguration {
        namespace Responses {
            export type $200 = /* Configuration of the published app */ Components.Schemas.AppConfiguration;
            export interface $404 {
            }
        }
    }
    namespace GetInstalledApp {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        namespace Responses {
            export type $200 = /* Information about the installed app */ Components.Schemas.App;
            export interface $404 {
            }
        }
    }
    namespace GetUploadUrl {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $200 {
                /**
                 * ID of the app configuration
                 */
                app_id?: string;
                /**
                 * Presigned S3 URL for uploading the file
                 */
                upload_url: string;
                s3_reference: Components.Schemas.S3Reference;
                /**
                 * Timestamp when the upload URL expires
                 */
                expires_at?: string; // date-time
            }
        }
    }
    namespace InstallApp {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export type RequestBody = Components.RequestBodies.InstallAppRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace ListInstalledApps {
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
                apps?: /* Information about the installed app */ Components.Schemas.App[];
                pagination?: {
                    total?: number;
                    page?: number;
                    pageSize?: number;
                };
            }
        }
    }
    namespace PublishApp {
        export type RequestBody = Components.RequestBodies.PublishAppRequest;
        namespace Responses {
            export interface $202 {
                app_id: string;
                status: "pending" | "published";
                /**
                 * Step Function execution ARN for status tracking
                 */
                execution_arn?: string;
            }
        }
    }
    namespace UninstallApp {
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
}

export interface OperationMethods {
  /**
   * getUploadUrl - getUploadUrl
   * 
   * Generate a presigned URL for uploading app package zip file
   */
  'getUploadUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUploadUrl.Responses.$200>
  /**
   * publishApp - publishApp
   * 
   * Publish a new app configuration from uploaded zip file
   */
  'publishApp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PublishApp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishApp.Responses.$202>
  /**
   * getAppConfiguration - getAppConfiguration
   * 
   * Retrieve a specific app configuration
   */
  'getAppConfiguration'(
    parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAppConfiguration.Responses.$200>
  /**
   * listInstalledApps - listInstalledApps
   * 
   * Retrieve a list of installed apps for the organization.
   */
  'listInstalledApps'(
    parameters?: Parameters<Paths.ListInstalledApps.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledApps.Responses.$200>
  /**
   * getInstalledApp - getInstalledApp
   * 
   * Retrieve details of an installed app by its ID.
   */
  'getInstalledApp'(
    parameters?: Parameters<Paths.GetInstalledApp.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetInstalledApp.Responses.$200>
  /**
   * installApp - installApp
   * 
   * Upsert app installation by its ID.
   */
  'installApp'(
    parameters?: Parameters<Paths.InstallApp.PathParameters> | null,
    data?: Paths.InstallApp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InstallApp.Responses.$204>
  /**
   * uninstallApp - uninstallApp
   * 
   * Uninstall an app by its ID.
   */
  'uninstallApp'(
    parameters?: Parameters<Paths.UninstallApp.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UninstallApp.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/app-configurations/upload-url']: {
    /**
     * getUploadUrl - getUploadUrl
     * 
     * Generate a presigned URL for uploading app package zip file
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUploadUrl.Responses.$200>
  }
  ['/v1/app-configurations']: {
    /**
     * publishApp - publishApp
     * 
     * Publish a new app configuration from uploaded zip file
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PublishApp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishApp.Responses.$202>
  }
  ['/v1/app-configurations/{appId}']: {
    /**
     * getAppConfiguration - getAppConfiguration
     * 
     * Retrieve a specific app configuration
     */
    'get'(
      parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAppConfiguration.Responses.$200>
  }
  ['/v1/app']: {
    /**
     * listInstalledApps - listInstalledApps
     * 
     * Retrieve a list of installed apps for the organization.
     */
    'get'(
      parameters?: Parameters<Paths.ListInstalledApps.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledApps.Responses.$200>
  }
  ['/v1/app/{appId}']: {
    /**
     * getInstalledApp - getInstalledApp
     * 
     * Retrieve details of an installed app by its ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetInstalledApp.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetInstalledApp.Responses.$200>
    /**
     * installApp - installApp
     * 
     * Upsert app installation by its ID.
     */
    'put'(
      parameters?: Parameters<Paths.InstallApp.PathParameters> | null,
      data?: Paths.InstallApp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InstallApp.Responses.$204>
    /**
     * uninstallApp - uninstallApp
     * 
     * Uninstall an app by its ID.
     */
    'delete'(
      parameters?: Parameters<Paths.UninstallApp.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UninstallApp.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type App = Components.Schemas.App;
export type AppConfiguration = Components.Schemas.AppConfiguration;
export type Author = Components.Schemas.Author;
export type BaseComponent = Components.Schemas.BaseComponent;
export type BaseComponentCommon = Components.Schemas.BaseComponentCommon;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type ComponentType = Components.Schemas.ComponentType;
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
export type S3Reference = Components.Schemas.S3Reference;
export type TranslatedString = Components.Schemas.TranslatedString;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
