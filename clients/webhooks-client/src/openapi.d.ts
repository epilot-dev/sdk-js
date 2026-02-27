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
        /**
         * To be sent only if authType is API_KEY
         */
        export interface ApiKeyConfig {
            keyName: string;
            keyValue?: string;
            /**
             * When true, indicates the keyValue is an environment variable reference (e.g. {{ env.my_secret }})
             */
            keyValueIsEnvVar?: boolean;
        }
        export interface Auth {
            authType: AuthType;
            basicAuthConfig?: /* To be sent only if authType is BASIC */ BasicAuthConfig;
            oauthConfig?: /* To be sent only if authType is OAUTH_CLIENT_CREDENTIALS */ OAuthConfig;
            apiKeyConfig?: /* To be sent only if authType is API_KEY */ ApiKeyConfig;
        }
        export type AuthType = "BASIC" | "OAUTH_CLIENT_CREDENTIALS" | "API_KEY" | "NONE";
        /**
         * To be sent only if authType is BASIC
         */
        export interface BasicAuthConfig {
            username: string;
            password?: string;
            /**
             * When true, indicates the password value is an environment variable reference (e.g. {{ env.my_secret }})
             */
            passwordIsEnvVar?: boolean;
        }
        export interface BatchReplayRequest {
            /**
             * List of event IDs to replay
             * example:
             * [
             *   "2f1b7cf8-ff55-4359-966f-e56f39a52c94",
             *   "48c984bf-466b-470b-b743-d07cea168243"
             * ]
             */
            eventIds: [
                string,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
        }
        /**
         * Object representing custom headers as key-value pairs.
         */
        export interface CustomHeader {
            [name: string]: string;
        }
        /**
         * Custom key/value pair of either type body, query or header
         */
        export interface CustomOAuthParameter {
            type: "body" | "query" | "header";
            key: string;
            value: string;
        }
        export interface ErrorResp {
            message?: string;
        }
        export interface EventConfigEntry {
            /**
             * Name for identifying the event. Unique.
             */
            eventName?: string;
            /**
             * Either a user friendly label, or the eventName itself.
             */
            eventLabel?: string;
        }
        /**
         * example:
         * [
         *   {
         *     "eventName": "customer_request_created",
         *     "eventLabel": "Customer Request Created"
         *   }
         * ]
         */
        export type EventConfigResp = EventConfigEntry[];
        export interface EventListResponse {
            /**
             * List of webhook events
             */
            data?: WebhookEvent[];
            /**
             * Cursor to fetch the next page. Null if no more results.
             */
            next_cursor?: {
                /**
                 * example:
                 * 2025-10-31T12:34:56Z
                 */
                created_at?: string; // date-time
                /**
                 * example:
                 * evt_1234567890abcdef
                 */
                event_id?: string;
            } | null;
            /**
             * Indicates if more results are available
             * example:
             * true
             */
            has_more?: boolean;
        }
        export interface ExampleRequest {
            /**
             * ID of the automation, if applicable
             * example:
             * automation_123
             */
            automation_id?: string;
        }
        export interface ExampleResponse {
            [name: string]: any;
            metadata?: /* Contains the metadata about the configured event */ Metadata;
            /**
             * Example payload for the webhook event
             */
            entity?: {
                [name: string]: any;
            };
            /**
             * Example relations for the webhook event
             */
            relations?: {
                [name: string]: any;
            }[];
        }
        /**
         * Payload for triggering a webhook
         */
        export interface ExecutionPayload {
            [name: string]: any;
            metadata: /* Contains the metadata about the configured event */ Metadata;
        }
        export interface Filter {
            keyToFilter: string;
            supportedValues: string[];
        }
        export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
        /**
         * Contains the metadata about the configured event
         */
        export interface Metadata {
            /**
             * Action that triggered the event
             * example:
             * Manual triggered by user with id 123456
             */
            action?: string;
            /**
             * Origin of the event
             */
            origin?: string;
            /**
             * Time of event creation
             */
            creation_timestamp?: string;
            /**
             * The ID of the webhook configuration
             */
            webhook_id?: string;
            /**
             * The name of the webhook configuration
             */
            webhook_name?: string;
            /**
             * The name of the automation that triggered the event
             */
            automation_name?: string;
            /**
             * The ID of the given organization
             */
            organization_id: string;
            /**
             * The ID of the user for manual triggered events
             */
            user_id?: string;
            /**
             * ID used to track the event
             */
            correlation_id?: string;
            /**
             * When triggered by an automation this is its execution id
             */
            execution_id?: string;
            /**
             * When triggered by an automation this is the id of the action
             */
            action_id?: string;
        }
        /**
         * To be sent only if authType is OAUTH_CLIENT_CREDENTIALS
         */
        export interface OAuthConfig {
            clientId: string;
            clientSecret?: string;
            /**
             * When true, indicates the clientSecret value is an environment variable reference (e.g. {{ env.my_secret }})
             */
            clientSecretIsEnvVar?: boolean;
            /**
             * Https Endpoint for authentication
             */
            endpoint: string;
            httpMethod: HttpMethod;
            customParameterList?: /* Custom key/value pair of either type body, query or header */ CustomOAuthParameter[];
        }
        /**
         * Configuration for the webhook payload
         */
        export interface PayloadConfiguration {
            hydrate_entity?: boolean;
            include_relations?: boolean;
            include_activity?: boolean;
            include_changed_attributes?: boolean;
            custom_headers?: /* Object representing custom headers as key-value pairs. */ CustomHeader;
        }
        export interface PublicKeyResponse {
            /**
             * PEM-encoded Ed25519 public key for verifying webhook signatures
             * example:
             * -----BEGIN PUBLIC KEY-----
             * MCowBQYDK2VwAyEA...
             * -----END PUBLIC KEY-----
             *
             */
            public_key: string;
            /**
             * The signing algorithm used
             * example:
             * ed25519
             */
            algorithm: string;
            /**
             * The issuer of the signing key
             * example:
             * epilot
             */
            issuer?: string;
        }
        export interface SearchOptions {
            /**
             * Maximum number of results to return
             * example:
             * 25
             */
            limit?: number;
            /**
             * Cursor for pagination. Use the next_cursor from the previous response to get the next page.
             */
            cursor?: {
                /**
                 * Timestamp from the last event in the previous page
                 * example:
                 * 2025-10-31T12:34:56Z
                 */
                created_at?: string; // date-time
                /**
                 * Event ID from the last event in the previous page
                 * example:
                 * evt_1234567890abcdef
                 */
                event_id?: string;
            };
            /**
             * Filter events by timestamp range
             */
            timestamp?: {
                /**
                 * Start timestamp in ISO 8601 format
                 * example:
                 * 2025-10-01T00:00:00Z
                 */
                from?: string; // date-time
                /**
                 * End timestamp in ISO 8601 format
                 * example:
                 * 2025-10-31T23:59:59Z
                 */
                to?: string; // date-time
            };
            /**
             * Filter by specific event ID
             * example:
             * evt_1234567890abcdef
             */
            event_id?: string;
            /**
             * Filter by event outcome
             * example:
             * succeeded
             */
            status?: "succeeded" | "failed";
        }
        export interface TriggerWebhookResp {
            status_code?: string;
            message?: string;
            body?: {
                [key: string]: any;
            };
            code?: string;
            status?: "succeeded" | "failed";
            start_date?: string;
            end_date?: string;
            event_id: string;
        }
        /**
         * example:
         * {
         *   "eventName": "CustomerRequest_Created",
         *   "url": "https://my-partner-service.api.com",
         *   "httpMethod": "POST",
         *   "enabled": true,
         *   "auth": {
         *     "authType": "BASIC",
         *     "basicAuthConfig": {
         *       "username": "secretUsername",
         *       "password": "secret7825@!"
         *     }
         *   },
         *   "filter": {
         *     "keyToFilter": "customer_request.productId",
         *     "supportedValues": [
         *       "2324245",
         *       "5253642"
         *     ]
         *   }
         * }
         */
        export interface WebhookConfig {
            id?: string;
            name: string;
            eventName: string;
            url?: string;
            /**
             * creation timestamp
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            creationTime?: string;
            httpMethod?: HttpMethod;
            enabled?: boolean;
            auth?: Auth;
            filter?: Filter;
            payloadConfiguration?: /* Configuration for the webhook payload */ PayloadConfiguration;
            enableStaticIP?: boolean;
            status?: "active" | "inactive" | "incomplete";
            /**
             * JSONata expression to transform the payload
             */
            jsonataExpression?: string;
            /**
             * Manifest ID used to create/update the webhook resource
             */
            _manifest?: string /* uuid */[];
            /**
             * Per-webhook signing secret following the Standard Webhooks specification.
             * Only returned once during webhook creation. Use this secret to verify
             * webhook signatures using the `webhook-id`, `webhook-timestamp`, and
             * `webhook-signature` headers.
             *
             * example:
             * whsec_C2FVsBQIhrscChlQIMV+b5sSYspob7oD
             */
            signingSecret?: string;
        }
        export interface WebhookEvent {
            event_id: string;
            org_id: string;
            webhook_config_id: string;
            url?: string;
            /**
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            created_at?: string;
            event_name?: string;
            http_response?: {
                status_code?: number;
                message?: string;
                body?: {
                    [key: string]: any;
                };
                code?: string;
            };
            metadata?: /* Contains the metadata about the configured event */ Metadata;
            status?: "succeeded" | "failed" | "in_progress";
            http_method?: "GET" | "POST" | "PUT";
            /**
             * stringified payload of the webhook request
             */
            payload?: string;
        }
    }
}
declare namespace Paths {
    namespace BatchReplayEvents {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export type RequestBody = Components.Schemas.BatchReplayRequest;
        namespace Responses {
            export interface $202 {
                /**
                 * List of event ids that were enqueued for replay
                 */
                replayed_event_ids?: string[];
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace CreateConfig {
        export type RequestBody = /**
         * example:
         * {
         *   "eventName": "CustomerRequest_Created",
         *   "url": "https://my-partner-service.api.com",
         *   "httpMethod": "POST",
         *   "enabled": true,
         *   "auth": {
         *     "authType": "BASIC",
         *     "basicAuthConfig": {
         *       "username": "secretUsername",
         *       "password": "secret7825@!"
         *     }
         *   },
         *   "filter": {
         *     "keyToFilter": "customer_request.productId",
         *     "supportedValues": [
         *       "2324245",
         *       "5253642"
         *     ]
         *   }
         * }
         */
        Components.Schemas.WebhookConfig;
        namespace Responses {
            export type $201 = /**
             * example:
             * {
             *   "eventName": "CustomerRequest_Created",
             *   "url": "https://my-partner-service.api.com",
             *   "httpMethod": "POST",
             *   "enabled": true,
             *   "auth": {
             *     "authType": "BASIC",
             *     "basicAuthConfig": {
             *       "username": "secretUsername",
             *       "password": "secret7825@!"
             *     }
             *   },
             *   "filter": {
             *     "keyToFilter": "customer_request.productId",
             *     "supportedValues": [
             *       "2324245",
             *       "5253642"
             *     ]
             *   }
             * }
             */
            Components.Schemas.WebhookConfig;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteConfig {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
        }
    }
    namespace GetConfig {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "eventName": "CustomerRequest_Created",
             *   "url": "https://my-partner-service.api.com",
             *   "httpMethod": "POST",
             *   "enabled": true,
             *   "auth": {
             *     "authType": "BASIC",
             *     "basicAuthConfig": {
             *       "username": "secretUsername",
             *       "password": "secret7825@!"
             *     }
             *   },
             *   "filter": {
             *     "keyToFilter": "customer_request.productId",
             *     "supportedValues": [
             *       "2324245",
             *       "5253642"
             *     ]
             *   }
             * }
             */
            Components.Schemas.WebhookConfig;
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetConfigs {
        namespace Parameters {
            export type EventName = string;
        }
        export interface QueryParameters {
            eventName?: Parameters.EventName;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "eventName": "CustomerRequest_Created",
             *   "url": "https://my-partner-service.api.com",
             *   "httpMethod": "POST",
             *   "enabled": true,
             *   "auth": {
             *     "authType": "BASIC",
             *     "basicAuthConfig": {
             *       "username": "secretUsername",
             *       "password": "secret7825@!"
             *     }
             *   },
             *   "filter": {
             *     "keyToFilter": "customer_request.productId",
             *     "supportedValues": [
             *       "2324245",
             *       "5253642"
             *     ]
             *   }
             * }
             */
            Components.Schemas.WebhookConfig[];
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetConfiguredEvents {
        namespace Responses {
            export type $200 = /**
             * example:
             * [
             *   {
             *     "eventName": "customer_request_created",
             *     "eventLabel": "Customer Request Created"
             *   }
             * ]
             */
            Components.Schemas.EventConfigResp;
        }
    }
    namespace GetEventById {
        namespace Parameters {
            export type ConfigId = string;
            export type EventId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
            eventId: Parameters.EventId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WebhookEvent;
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetPublicKey {
        namespace Parameters {
            export type OrgId = string;
        }
        export interface QueryParameters {
            orgId: Parameters.OrgId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PublicKeyResponse;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetWebhookEventsV2 {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export type RequestBody = Components.Schemas.SearchOptions;
        namespace Responses {
            export type $200 = Components.Schemas.EventListResponse;
        }
    }
    namespace GetWebhookExample {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export type RequestBody = Components.Schemas.ExampleRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExampleResponse;
            export type $400 = Components.Schemas.ErrorResp;
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetWehookEvents {
        namespace Parameters {
            export type ConfigId = string;
            export type Cursor = string;
            export type Status = "succeeded" | "failed" | "in_progress";
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.WebhookEvent[];
                /**
                 * Cursor to be used for pagination
                 */
                cursor?: string;
            }
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace ReplayEvent {
        namespace Parameters {
            export type ConfigId = string;
            export type EventId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
            eventId: Parameters.EventId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace TriggerWebhook {
        namespace Parameters {
            export type ConfigId = string;
            export type Sync = boolean;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export interface QueryParameters {
            sync?: Parameters.Sync;
        }
        export type RequestBody = /* Payload for triggering a webhook */ Components.Schemas.ExecutionPayload;
        namespace Responses {
            export type $200 = Components.Schemas.TriggerWebhookResp;
            export type $400 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateConfig {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "eventName": "CustomerRequest_Created",
         *   "url": "https://my-partner-service.api.com",
         *   "httpMethod": "POST",
         *   "enabled": true,
         *   "auth": {
         *     "authType": "BASIC",
         *     "basicAuthConfig": {
         *       "username": "secretUsername",
         *       "password": "secret7825@!"
         *     }
         *   },
         *   "filter": {
         *     "keyToFilter": "customer_request.productId",
         *     "supportedValues": [
         *       "2324245",
         *       "5253642"
         *     ]
         *   }
         * }
         */
        Components.Schemas.WebhookConfig;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "eventName": "CustomerRequest_Created",
             *   "url": "https://my-partner-service.api.com",
             *   "httpMethod": "POST",
             *   "enabled": true,
             *   "auth": {
             *     "authType": "BASIC",
             *     "basicAuthConfig": {
             *       "username": "secretUsername",
             *       "password": "secret7825@!"
             *     }
             *   },
             *   "filter": {
             *     "keyToFilter": "customer_request.productId",
             *     "supportedValues": [
             *       "2324245",
             *       "5253642"
             *     ]
             *   }
             * }
             */
            Components.Schemas.WebhookConfig;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
}


export interface OperationMethods {
  /**
   * getPublicKey - getPublicKey
   * 
   * Returns the platform-level Ed25519 public key used to verify
   * asymmetric (v1a) webhook signatures. This endpoint is unauthenticated since the public key is not a secret, but the orgId parameter is required to ensure clients retrieve the correct key for their organization in case of key rotation.
   * 
   */
  'getPublicKey'(
    parameters?: Parameters<Paths.GetPublicKey.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicKey.Responses.$200>
  /**
   * getConfiguredEvents - getConfiguredEvents
   * 
   * Retrieve events that can trigger webhooks
   */
  'getConfiguredEvents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfiguredEvents.Responses.$200>
  /**
   * getConfigs - getConfigs
   * 
   * Search Webhook Client Configs
   */
  'getConfigs'(
    parameters?: Parameters<Paths.GetConfigs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigs.Responses.$200>
  /**
   * createConfig - createConfig
   * 
   * Create Webhook Client Config
   */
  'createConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateConfig.Responses.$201>
  /**
   * getConfig - getConfig
   * 
   * Get webhook config by id
   */
  'getConfig'(
    parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfig.Responses.$200>
  /**
   * updateConfig - updateConfig
   * 
   * Update Webhook Client Config
   */
  'updateConfig'(
    parameters?: Parameters<Paths.UpdateConfig.PathParameters> | null,
    data?: Paths.UpdateConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateConfig.Responses.$200>
  /**
   * deleteConfig - deleteConfig
   * 
   * Delete Webhook Client Config
   */
  'deleteConfig'(
    parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConfig.Responses.$204>
  /**
   * triggerWebhook - triggers a webhook event either async or sync
   * 
   * Trigger a webhook
   */
  'triggerWebhook'(
    parameters?: Parameters<Paths.TriggerWebhook.QueryParameters & Paths.TriggerWebhook.PathParameters> | null,
    data?: Paths.TriggerWebhook.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerWebhook.Responses.$200>
  /**
   * getWehookEvents - getWehookEvents
   * 
   * This endpoint is deprecated and will be removed on 2025-12-31. Use /v2/webhooks/configs/{configId}/events instead.
   */
  'getWehookEvents'(
    parameters?: Parameters<Paths.GetWehookEvents.QueryParameters & Paths.GetWehookEvents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWehookEvents.Responses.$200>
  /**
   * batchReplayEvents - batchReplayEvents
   * 
   * Replay a batch of webhook events
   */
  'batchReplayEvents'(
    parameters?: Parameters<Paths.BatchReplayEvents.PathParameters> | null,
    data?: Paths.BatchReplayEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchReplayEvents.Responses.$202>
  /**
   * getEventById - getEventById
   * 
   * Get a webhook event by its id
   */
  'getEventById'(
    parameters?: Parameters<Paths.GetEventById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventById.Responses.$200>
  /**
   * replayEvent - replayEvent
   * 
   * Replay a webhook event
   */
  'replayEvent'(
    parameters?: Parameters<Paths.ReplayEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplayEvent.Responses.$204>
  /**
   * getWebhookExample - getWebhookExample
   * 
   * Generate an example payload for a webhook configuration based on trigger type
   */
  'getWebhookExample'(
    parameters?: Parameters<Paths.GetWebhookExample.PathParameters> | null,
    data?: Paths.GetWebhookExample.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWebhookExample.Responses.$200>
  /**
   * getWebhookEventsV2 - getWebhookEventsV2
   * 
   * List webhook events and filter them by status, timestamp, etc.
   */
  'getWebhookEventsV2'(
    parameters?: Parameters<Paths.GetWebhookEventsV2.PathParameters> | null,
    data?: Paths.GetWebhookEventsV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWebhookEventsV2.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/webhooks/.well-known/public-key']: {
    /**
     * getPublicKey - getPublicKey
     * 
     * Returns the platform-level Ed25519 public key used to verify
     * asymmetric (v1a) webhook signatures. This endpoint is unauthenticated since the public key is not a secret, but the orgId parameter is required to ensure clients retrieve the correct key for their organization in case of key rotation.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicKey.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicKey.Responses.$200>
  }
  ['/v1/webhooks/configured-events']: {
    /**
     * getConfiguredEvents - getConfiguredEvents
     * 
     * Retrieve events that can trigger webhooks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfiguredEvents.Responses.$200>
  }
  ['/v1/webhooks/configs']: {
    /**
     * getConfigs - getConfigs
     * 
     * Search Webhook Client Configs
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigs.Responses.$200>
    /**
     * createConfig - createConfig
     * 
     * Create Webhook Client Config
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateConfig.Responses.$201>
  }
  ['/v1/webhooks/configs/{configId}']: {
    /**
     * getConfig - getConfig
     * 
     * Get webhook config by id
     */
    'get'(
      parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfig.Responses.$200>
    /**
     * updateConfig - updateConfig
     * 
     * Update Webhook Client Config
     */
    'put'(
      parameters?: Parameters<Paths.UpdateConfig.PathParameters> | null,
      data?: Paths.UpdateConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateConfig.Responses.$200>
    /**
     * deleteConfig - deleteConfig
     * 
     * Delete Webhook Client Config
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConfig.Responses.$204>
  }
  ['/v1/webhooks/configs/{configId}/trigger']: {
    /**
     * triggerWebhook - triggers a webhook event either async or sync
     * 
     * Trigger a webhook
     */
    'post'(
      parameters?: Parameters<Paths.TriggerWebhook.QueryParameters & Paths.TriggerWebhook.PathParameters> | null,
      data?: Paths.TriggerWebhook.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerWebhook.Responses.$200>
  }
  ['/v1/webhooks/configs/{configId}/events']: {
    /**
     * getWehookEvents - getWehookEvents
     * 
     * This endpoint is deprecated and will be removed on 2025-12-31. Use /v2/webhooks/configs/{configId}/events instead.
     */
    'get'(
      parameters?: Parameters<Paths.GetWehookEvents.QueryParameters & Paths.GetWehookEvents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWehookEvents.Responses.$200>
  }
  ['/v1/webhooks/configs/{configId}/events/replay-batch']: {
    /**
     * batchReplayEvents - batchReplayEvents
     * 
     * Replay a batch of webhook events
     */
    'post'(
      parameters?: Parameters<Paths.BatchReplayEvents.PathParameters> | null,
      data?: Paths.BatchReplayEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchReplayEvents.Responses.$202>
  }
  ['/v1/webhooks/configs/{configId}/events/{eventId}']: {
    /**
     * getEventById - getEventById
     * 
     * Get a webhook event by its id
     */
    'get'(
      parameters?: Parameters<Paths.GetEventById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventById.Responses.$200>
  }
  ['/v1/webhooks/configs/{configId}/events/{eventId}/replay']: {
    /**
     * replayEvent - replayEvent
     * 
     * Replay a webhook event
     */
    'post'(
      parameters?: Parameters<Paths.ReplayEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplayEvent.Responses.$204>
  }
  ['/v1/webhooks/configs/{configId}/example']: {
    /**
     * getWebhookExample - getWebhookExample
     * 
     * Generate an example payload for a webhook configuration based on trigger type
     */
    'post'(
      parameters?: Parameters<Paths.GetWebhookExample.PathParameters> | null,
      data?: Paths.GetWebhookExample.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWebhookExample.Responses.$200>
  }
  ['/v2/webhooks/configs/{configId}/events']: {
    /**
     * getWebhookEventsV2 - getWebhookEventsV2
     * 
     * List webhook events and filter them by status, timestamp, etc.
     */
    'post'(
      parameters?: Parameters<Paths.GetWebhookEventsV2.PathParameters> | null,
      data?: Paths.GetWebhookEventsV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWebhookEventsV2.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ApiKeyConfig = Components.Schemas.ApiKeyConfig;
export type Auth = Components.Schemas.Auth;
export type AuthType = Components.Schemas.AuthType;
export type BasicAuthConfig = Components.Schemas.BasicAuthConfig;
export type BatchReplayRequest = Components.Schemas.BatchReplayRequest;
export type CustomHeader = Components.Schemas.CustomHeader;
export type CustomOAuthParameter = Components.Schemas.CustomOAuthParameter;
export type ErrorResp = Components.Schemas.ErrorResp;
export type EventConfigEntry = Components.Schemas.EventConfigEntry;
export type EventConfigResp = Components.Schemas.EventConfigResp;
export type EventListResponse = Components.Schemas.EventListResponse;
export type ExampleRequest = Components.Schemas.ExampleRequest;
export type ExampleResponse = Components.Schemas.ExampleResponse;
export type ExecutionPayload = Components.Schemas.ExecutionPayload;
export type Filter = Components.Schemas.Filter;
export type HttpMethod = Components.Schemas.HttpMethod;
export type Metadata = Components.Schemas.Metadata;
export type OAuthConfig = Components.Schemas.OAuthConfig;
export type PayloadConfiguration = Components.Schemas.PayloadConfiguration;
export type PublicKeyResponse = Components.Schemas.PublicKeyResponse;
export type SearchOptions = Components.Schemas.SearchOptions;
export type TriggerWebhookResp = Components.Schemas.TriggerWebhookResp;
export type WebhookConfig = Components.Schemas.WebhookConfig;
export type WebhookEvent = Components.Schemas.WebhookEvent;
