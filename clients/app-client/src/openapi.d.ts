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
             * ID of the journey block component
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
        export interface CreateReviewRequest {
            /**
             * Email of the technical contact
             */
            technical_contact: string;
            /**
             * Email of the marketing contact
             */
            marketing_contact: string;
            /**
             * URL to a demo of the app
             */
            demo_url?: string;
        }
        export interface InstallRequest {
            /**
             * Version of the app to update to
             */
            version?: string;
            /**
             * Configuration values for the app components
             */
            option_values?: Schemas.OptionsRef[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
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
            /**
             * Flag to indicate if the app is in dev mode. If true, the app takes the override properties of components into account.
             */
            dev_mode?: boolean;
        }
        export interface PatchVersionRequest {
            /**
             * ID of the manifest to use for this version
             */
            manifest_id?: string;
            /**
             * Name of the role
             */
            role_id?: string | null;
            grants?: /* Required grants for the app in order to call APIs for the installing tenant */ Schemas.Grants;
        }
        export type UpsertComponentRequest = Schemas.BaseComponent;
    }
    namespace Schemas {
        export interface Actor {
            /**
             * Organization ID of the actor
             */
            org_id?: string;
            /**
             * User ID of the actor
             */
            user_id?: string;
            /**
             * Type of the actor (e.g., user, system)
             */
            type: "user" | "system";
        }
        export interface AggregatedEvents {
            type?: "aggregated";
            groups?: {
                /**
                 * The grouped dimensions e.g., "source": "CUSTOM_JOURNEY_BLOCK", "event_type": "ERROR"
                 */
                dimensions?: {
                    [name: string]: any;
                };
                metrics?: {
                    count?: number;
                    error_rate?: number;
                };
            }[];
        }
        export interface AppBridgeSurfaceConfig {
            /**
             * URL of the uploaded App Bridge App. This is the entrypoint for the app
             */
            app_url?: string;
            /**
             * URL of the uploaded zip file containing the app
             */
            zip_url?: string;
            /**
             * URL of the app in dev mode
             */
            override_url?: string;
        }
        export interface AppEventData {
            /**
             * ID of the app configuration
             */
            app_id: string;
            /**
             * Version of the app configuration
             */
            version: string;
            event_id?: string;
            component_id: string;
            timestamp?: string;
            correlation_id?: string;
            event_type: "ERROR" | "WARNING" | "INFO";
            source: /* Type of app component */ ComponentType;
            actor: Actor;
            /**
             * Details about the event
             */
            details?: {
                [name: string]: any;
            };
        }
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
            /**
             * Name of the component
             */
            name?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Description of the component
             */
            description?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * List of options for the app component
             */
            options?: /* Options for the component configuration */ Options[];
            surfaces?: {
                [key: string]: any;
            };
        } & (JourneyBlockComponent | PortalExtensionComponent | CustomFlowActionComponent | ErpInformToolkitComponent | CustomCapabilityComponent);
        export interface BaseComponentCommon {
            /**
             * Unique identifier for the component
             */
            id: string;
            /**
             * Name of the component
             */
            name?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Description of the component
             */
            description?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * List of options for the app component
             */
            options?: /* Options for the component configuration */ Options[];
            surfaces?: {
                [key: string]: any;
            };
        }
        export interface BaseCustomActionConfig {
            /**
             * Name of the custom action
             */
            name?: string;
            /**
             * Description of the custom action
             */
            description?: string;
            /**
             * Wait for callback_url to be called before completing the action
             */
            wait_for_callback?: boolean;
        }
        export interface BatchEventRequest {
            events: [
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?,
                AppEventData?
            ];
        }
        /**
         * How often the subscription is billed
         */
        export type BillingFrequency = "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM";
        export interface BlueprintRef {
            /**
             * ID of the blueprint
             */
            manifest_id?: string;
            /**
             * ID of the job that created the blueprint
             */
            job_id?: string;
        }
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
        export type ComponentType = "CUSTOM_JOURNEY_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY";
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
             * Flag to indicate if the app is in dev mode. If true, the app takes the override_url property of components into account.
             */
            dev_mode?: boolean;
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
            description: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Configuration for developer notifications
             */
            notifications?: {
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
            };
            /**
             * Organization ID of the app owner
             */
            owner_org_id: string;
            /**
             * Flag to indicate if the app is built by epilot.
             */
            internal?: boolean;
            /**
             * Pricing information for the app
             */
            pricing?: {
                pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN";
                billing_frequency?: /* How often the subscription is billed */ BillingFrequency;
            };
            /**
             * Audit information for the app
             */
            configuration_audit?: {
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
            };
            components: BaseComponent[];
            /**
             * Visibility of the app version
             */
            visibility?: "public" | "private";
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
            role?: Role;
            blueprint_ref?: BlueprintRef;
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
             * Flag to indicate if the app is in dev mode. If true, the app takes the override_url property of components into account.
             */
            dev_mode?: boolean;
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
            description: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Configuration for developer notifications
             */
            notifications?: {
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
            };
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
            pricing?: {
                pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN";
                billing_frequency?: /* How often the subscription is billed */ BillingFrequency;
            };
            /**
             * Audit information for the app
             */
            configuration_audit?: {
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
            };
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
             * Visibility of the app version
             */
            visibility?: "public" | "private";
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
            role?: Role;
            blueprint_ref?: BlueprintRef;
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
        export interface CustomCapabilityComponent {
            component_type: "CUSTOM_CAPABILITY";
            configuration: {
                /**
                 * Define what type of capability this is
                 */
                type?: "tab" | "group";
                /**
                 * Which schemas are supported by the capability. If empty, all schemas are supported.
                 */
                allowed_schemas?: string[];
            };
            surfaces?: {
                capability_config?: AppBridgeSurfaceConfig;
            };
        }
        export interface CustomFlowActionComponent {
            component_type: "CUSTOM_FLOW_ACTION";
            configuration: CustomFlowConfig;
            surfaces?: {
                flow_action_config?: AppBridgeSurfaceConfig;
            };
        }
        export type CustomFlowConfig = ExternalIntegrationCustomActionConfig;
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
                    label: {
                        /**
                         * English translation
                         */
                        en?: string | null;
                        /**
                         * German translation
                         */
                        de: string;
                    };
                },
                ...{
                    /**
                     * Unique identifier for the option
                     */
                    id: string;
                    /**
                     * Display label for the option
                     */
                    label: {
                        /**
                         * English translation
                         */
                        en?: string | null;
                        /**
                         * German translation
                         */
                        de: string;
                    };
                }[]
            ];
        }
        export interface ErpInformToolkitComponent {
            component_type: "ERP_INFORM_TOOLKIT";
            configuration: {
                type: "inbound" | "outbound";
            };
        }
        export interface EventsQuery {
            /**
             * Either use preset OR start+end
             */
            time_range?: {
                /**
                 * Start time (ISO 8601)
                 */
                start?: string; // date-time
                /**
                 * End time (ISO 8601)
                 */
                end?: string; // date-time
                /**
                 * Predefined time range (alternative to start/end)
                 */
                preset?: "1h" | "6h" | "24h" | "7d" | "30d";
            };
            filters?: {
                /**
                 * Filter by component types
                 */
                source?: /* Type of app component */ ComponentType[];
                /**
                 * Filter by specific component IDs
                 */
                component_id?: string[];
                /**
                 * Filter by event types
                 */
                event_type?: ("ERROR" | "WARNING" | "INFO")[];
                /**
                 * Filter by correlation ID for tracing
                 */
                correlation_id?: string;
            };
            aggregation?: {
                /**
                 * Group results by specified fields
                 */
                group_by?: ("source" | "component_id" | "event_type" | "hour" | "day")[];
                /**
                 * Metrics to calculate
                 */
                metrics?: ("count" | "error_rate" | "unique_users")[];
            };
            pagination?: {
                page?: number;
                page_size?: number;
            };
            sort?: {
                field?: "timestamp" | "event_type" | "component_id";
                order?: "asc" | "desc";
            };
        }
        export interface EventsQueryResponse {
            query?: EventsQuery;
            results?: RawEvents | AggregatedEvents;
            pagination?: {
                page?: number;
                page_size?: number;
                total_items?: number;
                has_next?: boolean;
            };
        }
        export interface ExternalIntegrationCustomActionConfig {
            /**
             * Name of the custom action
             */
            name?: string;
            /**
             * Description of the custom action
             */
            description?: string;
            /**
             * Wait for callback_url to be called before completing the action
             */
            wait_for_callback?: boolean;
            type: "external_integration";
            external_integration_settings?: {
                /**
                 * URL to call
                 */
                url?: string;
                headers?: {
                    [name: string]: any;
                };
            };
        }
        /**
         * Required grants for the app in order to call APIs for the installing tenant
         */
        export type Grants = {
            /**
             * The action the app can perform
             */
            action: string;
            /**
             * The resource the app can access
             */
            resource?: string;
        }[];
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
             * Organization ID of the app creator
             */
            owner_org_id?: string;
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
            /**
             * The name of the role the app can use to access APIs
             */
            role?: string;
            blueprint_ref?: BlueprintRef;
            /**
             * Audit information for the app
             */
            installation_audit?: {
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
            };
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
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
            /**
             * Description of what this component arg does
             */
            description?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Human-readable label for the component arg
             */
            label: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
        } & (TextArg | BooleanArg | EnumArg);
        export interface JourneyBlockConfig {
            override_dev_mode?: /* Override URL when app is in dev mode */ OverrideDevMode;
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
                [name: string]: "string" | "boolean" | "date" | "datetime" | "link" | "number";
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
            value: string | boolean | number;
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
            value?: string | boolean | number;
            type: "text" | "number" | "boolean" | "secret";
        }
        export interface OptionsRef {
            /**
             * ID of the component these values are for
             */
            component_id: string;
            options: Option[];
        }
        /**
         * Override URL when app is in dev mode
         */
        export interface OverrideDevMode {
            /**
             * URL of the web component object in dev mode
             * example:
             * http://localhost:3000
             */
            override_url?: string;
        }
        export interface PortalExtensionAuthBlock {
            /**
             * HTTP method to use for authentication
             */
            method?: string;
            /**
             * URL to use for authentication. Supports variable interpolation.
             */
            url: string;
            /**
             * Parameters to append to the URL. Supports variable interpolation.
             */
            params?: {
                [name: string]: string;
            };
            /**
             * Headers to use for authentication. Supports variable interpolation.
             */
            headers?: {
                [name: string]: string;
            };
            /**
             * JSON body to use for authentication. Supports variable interpolation. Content format is determined by Content-Type header.
             */
            body?: {
                [name: string]: string;
            };
            cache?: {
                /**
                 * Key to use to identify the auth response. Supports interpolation.
                 * example:
                 * {{Options.api_key}}
                 */
                key: string;
                /**
                 * Time to live in seconds for the cache. Supports interpolation.
                 * example:
                 * {{AuthResponse.data.expires_in}}
                 */
                ttl: string;
            };
        }
        export interface PortalExtensionComponent {
            component_type: "PORTAL_EXTENSION";
            configuration: PortalExtensionConfig;
        }
        export interface PortalExtensionConfig {
            hooks?: ({
                /**
                 * Identifier of the hook. Should not change between updates.
                 */
                id?: string;
                name?: TranslatedString;
            } & (/**
             * Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
             *   - 200 with contact id if exactly one contact is found
             *   - 404 if no contact is found or more than contact is found
             *
             */
            PortalExtensionHookRegistrationIdentifiersCheck | /**
             * Hook that replaces the built-in contract identification for self-assignment. This hook makes a POST call whenever a user is trying to self-assign a contract to find the corresponding contract(s). The expected response to the call is:
             *   - 200 if found with either:
             *     - contract_id array
             *     - contact_id string
             *   - 404 if no contract is found
             * If `contact_id` is provided in the response, Contracts are retrieved from this Contact. In that case, optionally, if you also specify `contact_relation_attribute`, the specified Contact attribute of the user performing the action will be modified to add the matched Contact.
             *
             */
            PortalExtensionHookContractIdentification | /**
             * Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            PortalExtensionHookPriceDataRetrieval | /**
             * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            PortalExtensionHookConsumptionDataRetrieval | /**
             * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            PortalExtensionHookCostDataRetrieval | /**
             * Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
             *   - 200:
             *     If meter reading is plausible, the response should contain:
             *       - valid: true
             *     If meter reading is not plausible, the response should contain:
             *       - valid: false
             *
             */
            PortalExtensionHookMeterReadingPlausibilityCheck))[];
            links?: {
                /**
                 * Identifier of the link. Should not change between updates.
                 */
                id: string;
                name: TranslatedString;
                description?: TranslatedString;
                type: "seamless";
                /**
                 * Controls whether the link should be shown. Supports variable interpolation.
                 * example:
                 * {{Contact.customer_number | is_not_empty}}
                 */
                condition?: string;
                auth?: PortalExtensionAuthBlock;
                redirect: {
                    /**
                     * URL to redirect to. Supports variable interpolation.
                     */
                    url?: string;
                    /**
                     * Parameters to append to the URL. Supports variable interpolation.
                     */
                    params?: {
                        [name: string]: string;
                    };
                };
            }[];
        }
        export interface PortalExtensionHook {
            /**
             * Identifier of the hook. Should not change between updates.
             */
            id?: string;
            name?: TranslatedString;
        }
        /**
         * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface PortalExtensionHookConsumptionDataRetrieval {
            type: "consumptionDataRetrieval";
            /**
             * Intervals supported by the API. If omitted, it is assumed that all intervals are supported.
             */
            intervals?: ("PT15M" | "PT1H" | "P1D" | "P1M")[];
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
                /**
                 * Request body to send. Supports variable interpolation. Content format is determined by Content-Type header.
                 */
                body?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        /**
         * Hook that replaces the built-in contract identification for self-assignment. This hook makes a POST call whenever a user is trying to self-assign a contract to find the corresponding contract(s). The expected response to the call is:
         *   - 200 if found with either:
         *     - contract_id array
         *     - contact_id string
         *   - 404 if no contract is found
         * If `contact_id` is provided in the response, Contracts are retrieved from this Contact. In that case, optionally, if you also specify `contact_relation_attribute`, the specified Contact attribute of the user performing the action will be modified to add the matched Contact.
         *
         */
        export interface PortalExtensionHookContractIdentification {
            type: "contractIdentification";
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
            };
            /**
             * Name of the Contact attribute to update with the matched Contact ID. Must be a Contact relation attribute supporting multiple entities.
             * example:
             * represents_contact
             */
            contact_relation_attribute?: string;
            /**
             * Explanation of the hook.
             */
            explanation?: {
                [name: string]: string;
                /**
                 * Explanation of the functionality shown to the end user.
                 * example:
                 * This process will give you access to all Contracts kept
                 */
                en: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        /**
         * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface PortalExtensionHookCostDataRetrieval {
            type: "costDataRetrieval";
            /**
             * Intervals supported by the API. If omitted, it is assumed that all intervals are supported.
             */
            intervals?: ("PT15M" | "PT1H" | "P1D" | "P1M")[];
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
                /**
                 * Request body to send. Supports variable interpolation. Content format is determined by Content-Type header.
                 */
                body?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        /**
         * Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
         *   - 200:
         *     If meter reading is plausible, the response should contain:
         *       - valid: true
         *     If meter reading is not plausible, the response should contain:
         *       - valid: false
         *
         */
        export interface PortalExtensionHookMeterReadingPlausibilityCheck {
            type: "meterReadingPlausibilityCheck";
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * JSON body to use for the call. Supports variable interpolation.
                 */
                body: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
            };
            /**
             * Response to the call
             */
            resolved?: {
                /**
                 * Indicate whether the meter reading is plausible
                 * example:
                 * {{CallResponse.data.valid}}
                 */
                valid?: string;
                /**
                 * Upper allowed limit of the meter reading
                 * example:
                 * {{CallResponse.data.upper_limit}}
                 */
                upper_limit?: string;
                /**
                 * Lower allowed limit of the meter reading
                 * example:
                 * {{CallResponse.data.lower_limit}}
                 */
                lower_limit?: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        /**
         * Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface PortalExtensionHookPriceDataRetrieval {
            type: "priceDataRetrieval";
            /**
             * Intervals supported by the API. If omitted, it is assumed that all intervals are supported.
             */
            intervals?: ("PT15M" | "PT1H" | "P1D" | "P1M")[];
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
                /**
                 * Request body to send. Supports variable interpolation. Content format is determined by Content-Type header.
                 */
                body?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        /**
         * Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
         *   - 200 with contact id if exactly one contact is found
         *   - 404 if no contact is found or more than contact is found
         *
         */
        export interface PortalExtensionHookRegistrationIdentifiersCheck {
            type: "registrationIdentifiersCheck";
            auth?: PortalExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
                /**
                 * Contact ID usually retrieved from the response body, e.g. `{{CallResponse.data.contact_id}}`. Supports variable interpolation.
                 */
                result: string;
            };
            /**
             * If true, requests are made from a set of static IP addresses and only allow connections to a set of allowed IP addresses. Get in touch with us to add your IP addresses.
             */
            use_static_ips?: boolean;
        }
        export interface PortalExtensionSeamlessLink {
            /**
             * Identifier of the link. Should not change between updates.
             */
            id: string;
            name: TranslatedString;
            description?: TranslatedString;
            type: "seamless";
            /**
             * Controls whether the link should be shown. Supports variable interpolation.
             * example:
             * {{Contact.customer_number | is_not_empty}}
             */
            condition?: string;
            auth?: PortalExtensionAuthBlock;
            redirect: {
                /**
                 * URL to redirect to. Supports variable interpolation.
                 */
                url?: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
            };
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
            app_id: string;
            /**
             * Email address for support requests
             */
            support_email?: string;
            /**
             * Organization ID of the app owner
             */
            owner_org_id: string;
            /**
             * Name of the app
             */
            name: string;
            author?: Author;
            /**
             * Flag to indicate if the app is in dev mode.
             */
            dev_mode?: boolean;
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
            description?: {
                /**
                 * English translation
                 */
                en?: string | null;
                /**
                 * German translation
                 */
                de: string;
            };
            /**
             * Pricing information for the app
             */
            pricing?: {
                pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN";
                billing_frequency?: /* How often the subscription is billed */ BillingFrequency;
            };
            components: BaseComponent[];
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
            version: string;
            role?: Role;
            blueprint_ref?: BlueprintRef;
            /**
             * Latest version of the app
             */
            latest_version?: string;
            /**
             * Flag to indicate if the app is public.
             */
            public?: boolean;
            /**
             * List of available versions of the app
             */
            versions?: /* Configuration data about your app which is versionable */ ConfigurationVersion[];
        }
        export interface RawEvents {
            type?: "raw";
            events?: AppEventData[];
        }
        export interface Review {
            /**
             * Version of the app that is under review
             */
            version?: string;
            /**
             * Status of the review
             */
            review_status?: "approved" | "rejected" | "pending";
            /**
             * Timestamp of the review
             */
            requested_at?: string;
            /**
             * User ID of the reviewer
             */
            requested_by?: string;
            /**
             * Email of the technical contact
             */
            technical_contact?: string;
            /**
             * Email of the marketing contact
             */
            marketing_contact?: string;
            /**
             * URL of the demo
             */
            demo_url?: string;
        }
        export interface Role {
            /**
             * Name of the role
             */
            id?: string;
            grants?: /* Required grants for the app in order to call APIs for the installing tenant */ Grants;
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
            export interface $200 {
                component?: Components.Schemas.BaseComponent;
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
    namespace CreateReview {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        export type RequestBody = Components.RequestBodies.CreateReviewRequest;
        namespace Responses {
            export interface $200 {
                review?: Components.Schemas.Review;
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace CreateZipUploadUrl {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export interface RequestBody {
            /**
             * Version of the app configuration
             * example:
             * 1.0.0
             */
            version?: string;
            /**
             * ID of the journey block component
             */
            component_id?: string;
            /**
             * example:
             * dist.zip
             */
            filename?: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * ID of the journye block component
                 */
                component_id?: string;
                /**
                 * Presigned S3 URL for uploading the bundle
                 */
                upload_url: string;
                /**
                 * Public CDN URL for the unpacked artifacts
                 */
                artifact_url: string;
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
    namespace DeleteConfiguration {
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
        namespace Parameters {
            export type Version = string;
        }
        export interface QueryParameters {
            version?: Parameters.Version;
        }
        namespace Responses {
            export type $200 = /* Public configuration of the published app */ Components.Schemas.PublicConfiguration;
            export interface $404 {
            }
        }
    }
    namespace GetPublicFacingComponent {
        namespace Responses {
            export interface $200 {
                component?: Components.Schemas.BaseComponent;
            }
            export interface $404 {
            }
        }
    }
    namespace GetReview {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        namespace Responses {
            export interface $200 {
                review?: Components.Schemas.Review;
            }
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
    namespace IngestEvent {
        export type RequestBody = Components.Schemas.AppEventData | Components.Schemas.BatchEventRequest;
        namespace Responses {
            export interface $202 {
            }
            export interface $400 {
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
            export type $201 = /* Information about the installed app. Has configuration data of the installed version */ Components.Schemas.Installation;
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
            export interface $400 {
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
    namespace PatchVersion {
        namespace Parameters {
            export type AppId = string;
            export type Version = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            version: Parameters.Version;
        }
        export type RequestBody = Components.RequestBodies.PatchVersionRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
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
    namespace QueryEvents {
        namespace Parameters {
            export type AppId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
        }
        export type RequestBody = Components.Schemas.EventsQuery;
        namespace Responses {
            export type $200 = Components.Schemas.EventsQueryResponse;
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
    namespace V1PublicApp$AppIdComponents$ComponentId {
        namespace Parameters {
            export type AppId = string;
            export type ComponentId = string;
        }
        export interface PathParameters {
            appId: Parameters.AppId;
            componentId: Parameters.ComponentId;
        }
    }
}


export interface OperationMethods {
  /**
   * getPublicFacingComponent - getPublicFacingComponent
   * 
   * Retrieve public facing components for an installed app
   */
  'getPublicFacingComponent'(
    parameters?: Parameters<Paths.V1PublicApp$AppIdComponents$ComponentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicFacingComponent.Responses.$200>
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
    parameters?: Parameters<Paths.GetPublicConfiguration.QueryParameters & Paths.V1AppConfigurationsPublic$AppId.PathParameters> | null,
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
   * deleteConfiguration - Delete app configuration
   * 
   * Delete an app configuration and all its versions and components.
   */
  'deleteConfiguration'(
    parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConfiguration.Responses.$204>
  /**
   * queryEvents - queryEvents
   * 
   * Query analytics events for a specific app with flexible filtering
   */
  'queryEvents'(
    parameters?: Parameters<Paths.QueryEvents.PathParameters> | null,
    data?: Paths.QueryEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryEvents.Responses.$200>
  /**
   * createBundleUploadUrl - createBundleUploadUrl
   * 
   * Generate a presigned URL for uploading app bundle to /<app-id>/bundle.js path
   */
  'createBundleUploadUrl'(
    parameters?: Parameters<Paths.CreateBundleUploadUrl.PathParameters> | null,
    data?: Paths.CreateBundleUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBundleUploadUrl.Responses.$200>
  /**
   * createZipUploadUrl - createZipUploadUrl
   * 
   * Generate a presigned URL to upload a zip file with artifacts that will be unpacked in a new directory under the /<app-id>/ path
   * 
   */
  'createZipUploadUrl'(
    parameters?: Parameters<Paths.CreateZipUploadUrl.PathParameters> | null,
    data?: Paths.CreateZipUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateZipUploadUrl.Responses.$200>
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
   * patchVersion - patchVersion
   * 
   * Patch an existing app version
   */
  'patchVersion'(
    parameters?: Parameters<Paths.PatchVersion.PathParameters> | null,
    data?: Paths.PatchVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchVersion.Responses.$204>
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
   * getReview - getReview
   * 
   * Retrieve the review status of a specific app version
   */
  'getReview'(
    parameters?: Parameters<Paths.GetReview.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetReview.Responses.$200>
  /**
   * createReview - createReview
   * 
   * Submit an app version for review to make it public
   */
  'createReview'(
    parameters?: Parameters<Paths.CreateReview.PathParameters> | null,
    data?: Paths.CreateReview.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateReview.Responses.$200>
  /**
   * createComponent - createComponent
   * 
   * Patch an existing app version to create/add a component
   */
  'createComponent'(
    parameters?: Parameters<Paths.CreateComponent.PathParameters> | null,
    data?: Paths.CreateComponent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateComponent.Responses.$200>
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
  ): OperationResponse<Paths.Install.Responses.$201>
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
  /**
   * ingestEvent - ingestEvent
   * 
   * Internal endpoint for services to submit app events for analytic purposes
   */
  'ingestEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.IngestEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IngestEvent.Responses.$202>
}

export interface PathsDictionary {
  ['/v1/public/app/{appId}/components/{componentId}']: {
    /**
     * getPublicFacingComponent - getPublicFacingComponent
     * 
     * Retrieve public facing components for an installed app
     */
    'get'(
      parameters?: Parameters<Paths.V1PublicApp$AppIdComponents$ComponentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicFacingComponent.Responses.$200>
  }
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
      parameters?: Parameters<Paths.GetPublicConfiguration.QueryParameters & Paths.V1AppConfigurationsPublic$AppId.PathParameters> | null,
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
    /**
     * deleteConfiguration - Delete app configuration
     * 
     * Delete an app configuration and all its versions and components.
     */
    'delete'(
      parameters?: Parameters<Paths.V1AppConfigurations$AppId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConfiguration.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/events']: {
    /**
     * queryEvents - queryEvents
     * 
     * Query analytics events for a specific app with flexible filtering
     */
    'post'(
      parameters?: Parameters<Paths.QueryEvents.PathParameters> | null,
      data?: Paths.QueryEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryEvents.Responses.$200>
  }
  ['/v1/app-configurations/{appId}/bundle']: {
    /**
     * createBundleUploadUrl - createBundleUploadUrl
     * 
     * Generate a presigned URL for uploading app bundle to /<app-id>/bundle.js path
     */
    'post'(
      parameters?: Parameters<Paths.CreateBundleUploadUrl.PathParameters> | null,
      data?: Paths.CreateBundleUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBundleUploadUrl.Responses.$200>
  }
  ['/v1/app-configurations/{appId}/zip']: {
    /**
     * createZipUploadUrl - createZipUploadUrl
     * 
     * Generate a presigned URL to upload a zip file with artifacts that will be unpacked in a new directory under the /<app-id>/ path
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateZipUploadUrl.PathParameters> | null,
      data?: Paths.CreateZipUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateZipUploadUrl.Responses.$200>
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
    /**
     * patchVersion - patchVersion
     * 
     * Patch an existing app version
     */
    'patch'(
      parameters?: Parameters<Paths.PatchVersion.PathParameters> | null,
      data?: Paths.PatchVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchVersion.Responses.$204>
  }
  ['/v1/app-configurations/{appId}/versions/{version}/review']: {
    /**
     * getReview - getReview
     * 
     * Retrieve the review status of a specific app version
     */
    'get'(
      parameters?: Parameters<Paths.GetReview.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetReview.Responses.$200>
    /**
     * createReview - createReview
     * 
     * Submit an app version for review to make it public
     */
    'post'(
      parameters?: Parameters<Paths.CreateReview.PathParameters> | null,
      data?: Paths.CreateReview.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateReview.Responses.$200>
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
    ): OperationResponse<Paths.CreateComponent.Responses.$200>
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
    ): OperationResponse<Paths.Install.Responses.$201>
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
  ['/v1/app-events']: {
    /**
     * ingestEvent - ingestEvent
     * 
     * Internal endpoint for services to submit app events for analytic purposes
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.IngestEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IngestEvent.Responses.$202>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Actor = Components.Schemas.Actor;
export type AggregatedEvents = Components.Schemas.AggregatedEvents;
export type AppBridgeSurfaceConfig = Components.Schemas.AppBridgeSurfaceConfig;
export type AppEventData = Components.Schemas.AppEventData;
export type Audit = Components.Schemas.Audit;
export type Author = Components.Schemas.Author;
export type BaseComponent = Components.Schemas.BaseComponent;
export type BaseComponentCommon = Components.Schemas.BaseComponentCommon;
export type BaseCustomActionConfig = Components.Schemas.BaseCustomActionConfig;
export type BatchEventRequest = Components.Schemas.BatchEventRequest;
export type BillingFrequency = Components.Schemas.BillingFrequency;
export type BlueprintRef = Components.Schemas.BlueprintRef;
export type BooleanArg = Components.Schemas.BooleanArg;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type ComponentType = Components.Schemas.ComponentType;
export type Configuration = Components.Schemas.Configuration;
export type ConfigurationMetadata = Components.Schemas.ConfigurationMetadata;
export type ConfigurationVersion = Components.Schemas.ConfigurationVersion;
export type CustomCapabilityComponent = Components.Schemas.CustomCapabilityComponent;
export type CustomFlowActionComponent = Components.Schemas.CustomFlowActionComponent;
export type CustomFlowConfig = Components.Schemas.CustomFlowConfig;
export type EnumArg = Components.Schemas.EnumArg;
export type ErpInformToolkitComponent = Components.Schemas.ErpInformToolkitComponent;
export type EventsQuery = Components.Schemas.EventsQuery;
export type EventsQueryResponse = Components.Schemas.EventsQueryResponse;
export type ExternalIntegrationCustomActionConfig = Components.Schemas.ExternalIntegrationCustomActionConfig;
export type Grants = Components.Schemas.Grants;
export type Installation = Components.Schemas.Installation;
export type JourneyBlockComponent = Components.Schemas.JourneyBlockComponent;
export type JourneyBlockComponentArgs = Components.Schemas.JourneyBlockComponentArgs;
export type JourneyBlockConfig = Components.Schemas.JourneyBlockConfig;
export type NotificationConfig = Components.Schemas.NotificationConfig;
export type NotificationEvent = Components.Schemas.NotificationEvent;
export type Option = Components.Schemas.Option;
export type Options = Components.Schemas.Options;
export type OptionsRef = Components.Schemas.OptionsRef;
export type OverrideDevMode = Components.Schemas.OverrideDevMode;
export type PortalExtensionAuthBlock = Components.Schemas.PortalExtensionAuthBlock;
export type PortalExtensionComponent = Components.Schemas.PortalExtensionComponent;
export type PortalExtensionConfig = Components.Schemas.PortalExtensionConfig;
export type PortalExtensionHook = Components.Schemas.PortalExtensionHook;
export type PortalExtensionHookConsumptionDataRetrieval = Components.Schemas.PortalExtensionHookConsumptionDataRetrieval;
export type PortalExtensionHookContractIdentification = Components.Schemas.PortalExtensionHookContractIdentification;
export type PortalExtensionHookCostDataRetrieval = Components.Schemas.PortalExtensionHookCostDataRetrieval;
export type PortalExtensionHookMeterReadingPlausibilityCheck = Components.Schemas.PortalExtensionHookMeterReadingPlausibilityCheck;
export type PortalExtensionHookPriceDataRetrieval = Components.Schemas.PortalExtensionHookPriceDataRetrieval;
export type PortalExtensionHookRegistrationIdentifiersCheck = Components.Schemas.PortalExtensionHookRegistrationIdentifiersCheck;
export type PortalExtensionSeamlessLink = Components.Schemas.PortalExtensionSeamlessLink;
export type Pricing = Components.Schemas.Pricing;
export type PublicConfiguration = Components.Schemas.PublicConfiguration;
export type RawEvents = Components.Schemas.RawEvents;
export type Review = Components.Schemas.Review;
export type Role = Components.Schemas.Role;
export type S3Reference = Components.Schemas.S3Reference;
export type TextArg = Components.Schemas.TextArg;
export type TranslatedString = Components.Schemas.TranslatedString;
