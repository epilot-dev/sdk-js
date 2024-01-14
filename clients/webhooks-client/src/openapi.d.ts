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
        }
        export interface Auth {
            authType: AuthType;
            basicAuthConfig?: /* To be sent only if authType is BASIC */ BasicAuthConfig;
            oauthConfig?: /* To be sent only if authType is OAUTH_CLIENT_CREDENTIALS */ OAuthConfig;
            apiKeyConfig?: /* To be sent only if authType is API_KEY */ ApiKeyConfig;
        }
        export type AuthType = "BASIC" | "OAUTH_CLIENT_CREDENTIALS" | "API_KEY";
        /**
         * To be sent only if authType is BASIC
         */
        export interface BasicAuthConfig {
            username: string;
            password?: string;
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
        /**
         * Payload for triggering a webhook
         */
        export interface ExecutionPayload {
            metadata: /* Contains the metadata about the configured event */ Metadata;
        }
        /**
         * Failures stored in the database.
         */
        export interface FailureEntry {
            /**
             * The ID of the given organization
             */
            orgId?: string;
            /**
             * ID of event. Unique
             */
            eventId?: string;
            /**
             * Name for identifying the event. Unique.
             */
            eventName?: string;
            /**
             * Time of event creation
             */
            creationTimestamp?: string;
            /**
             * Contains the metadata about the configured event
             */
            payload?: {
                [key: string]: any;
            };
            /**
             * The ID of the webhook configuration
             */
            webhookConfigId?: string;
            errorCode?: string;
            /**
             * The error message encountered during webhook delivery
             */
            errorPayload?: string;
            /**
             * destination url of configured webhook
             */
            url?: string;
        }
        /**
         * Key of last loaded item previously returned via paginated response
         */
        export interface FailureLastKey {
            orgId?: string;
            eventId?: string;
            creationTimestamp?: string;
            webhookConfigId?: string;
        }
        /**
         * Response for get errors request.
         * example:
         * {
         *   "failures": [
         *     {
         *       "eventName": "customer_request_created,",
         *       "eventId": "12e8726b-071b-4c42-9221-8caae0d14863",
         *       "errorCode": "502",
         *       "webhookConfigId": "kreauMGUr55nDoVviaaBLG",
         *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
         *       "orgId": "728",
         *       "errorPayload": "Failed to store data",
         *       "url": "https://63b2de56be27.ngrok.io",
         *       "payload": {
         *         "metadata": {
         *           "action": "created",
         *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
         *           "event_name": "customer_request_created",
         *           "object": "customer_request",
         *           "organization_id": "728",
         *           "version": "1.0.0"
         *         },
         *         "customer_request": {
         *           "id": "TEST",
         *           "payment_details": {
         *             "account_owner_name": "Test",
         *             "bank_name": "Test Bank",
         *             "bic": "BIC",
         *             "iban": "IBAN",
         *             "payment_method": "sepa"
         *           },
         *           "request_items": [
         *             {
         *               "id": "TEST",
         *               "otherProp1": "test1",
         *               "otherProp2": "test2"
         *             }
         *           ]
         *         }
         *       }
         *     },
         *     {
         *       "eventName": "customer_request_created",
         *       "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
         *       "errorCode": "404",
         *       "webhookConfigId": "xrExypA8HBWEtK9AXfU2de",
         *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
         *       "orgId": "728",
         *       "errorPayload": "Tunnel ef68038e3af9.ngrok.io not found",
         *       "url": "https://ef68038e3af9.ngrok.io",
         *       "payload": {
         *         "metadata": {
         *           "action": "created",
         *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
         *           "event_name": "customer_request_created",
         *           "object": "customer_request",
         *           "organization_id": "728",
         *           "version": "1.0.0"
         *         },
         *         "customer_request": {
         *           "id": "TEST",
         *           "payment_details": {
         *             "account_owner_name": "Test",
         *             "bank_name": "Test Bank",
         *             "bic": "BIC",
         *             "iban": "IBAN",
         *             "payment_method": "sepa"
         *           },
         *           "request_items": [
         *             {
         *               "id": "TEST",
         *               "otherProp1": "test1",
         *               "otherProp2": true
         *             }
         *           ]
         *         }
         *       }
         *     }
         *   ],
         *   "lastLoadedKey": {
         *     "orgId": 6122,
         *     "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
         *     "creationTimestamp": "2022:01:01T00:00:00.000Z"
         *   }
         * }
         */
        export interface FailuresResp {
            lastLoadedKey?: /* Key of last loaded item previously returned via paginated response */ FailureLastKey;
            failures: /* Failures stored in the database. */ FailureEntry[];
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
        }
        /**
         * To be sent only if authType is OAUTH_CLIENT_CREDENTIALS
         */
        export interface OAuthConfig {
            clientId: string;
            clientSecret?: string;
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
            name?: string;
            eventName: string;
            url: string;
            /**
             * creation timestamp
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            creationTime?: string;
            httpMethod: HttpMethod;
            enabled?: boolean;
            auth: Auth;
            filter?: Filter;
            payloadConfiguration?: /* Configuration for the webhook payload */ PayloadConfiguration;
            enableStaticIP?: boolean;
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
    namespace GetFailures {
        namespace Parameters {
            export type LastLoadedEventId = string;
            export type LastLoadedTimestamp = string;
        }
        export interface QueryParameters {
            lastLoadedEventId?: Parameters.LastLoadedEventId;
            lastLoadedTimestamp?: Parameters.LastLoadedTimestamp;
        }
        namespace Responses {
            export type $200 = /**
             * Response for get errors request.
             * example:
             * {
             *   "failures": [
             *     {
             *       "eventName": "customer_request_created,",
             *       "eventId": "12e8726b-071b-4c42-9221-8caae0d14863",
             *       "errorCode": "502",
             *       "webhookConfigId": "kreauMGUr55nDoVviaaBLG",
             *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
             *       "orgId": "728",
             *       "errorPayload": "Failed to store data",
             *       "url": "https://63b2de56be27.ngrok.io",
             *       "payload": {
             *         "metadata": {
             *           "action": "created",
             *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
             *           "event_name": "customer_request_created",
             *           "object": "customer_request",
             *           "organization_id": "728",
             *           "version": "1.0.0"
             *         },
             *         "customer_request": {
             *           "id": "TEST",
             *           "payment_details": {
             *             "account_owner_name": "Test",
             *             "bank_name": "Test Bank",
             *             "bic": "BIC",
             *             "iban": "IBAN",
             *             "payment_method": "sepa"
             *           },
             *           "request_items": [
             *             {
             *               "id": "TEST",
             *               "otherProp1": "test1",
             *               "otherProp2": "test2"
             *             }
             *           ]
             *         }
             *       }
             *     },
             *     {
             *       "eventName": "customer_request_created",
             *       "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
             *       "errorCode": "404",
             *       "webhookConfigId": "xrExypA8HBWEtK9AXfU2de",
             *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
             *       "orgId": "728",
             *       "errorPayload": "Tunnel ef68038e3af9.ngrok.io not found",
             *       "url": "https://ef68038e3af9.ngrok.io",
             *       "payload": {
             *         "metadata": {
             *           "action": "created",
             *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
             *           "event_name": "customer_request_created",
             *           "object": "customer_request",
             *           "organization_id": "728",
             *           "version": "1.0.0"
             *         },
             *         "customer_request": {
             *           "id": "TEST",
             *           "payment_details": {
             *             "account_owner_name": "Test",
             *             "bank_name": "Test Bank",
             *             "bic": "BIC",
             *             "iban": "IBAN",
             *             "payment_method": "sepa"
             *           },
             *           "request_items": [
             *             {
             *               "id": "TEST",
             *               "otherProp1": "test1",
             *               "otherProp2": true
             *             }
             *           ]
             *         }
             *       }
             *     }
             *   ],
             *   "lastLoadedKey": {
             *     "orgId": 6122,
             *     "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
             *     "creationTimestamp": "2022:01:01T00:00:00.000Z"
             *   }
             * }
             */
            Components.Schemas.FailuresResp;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetFailuresForConfig {
        namespace Parameters {
            export type ConfigId = string;
            export type LastLoadedEventId = string;
            export type LastLoadedTimestamp = string;
        }
        export interface PathParameters {
            configId: Parameters.ConfigId;
        }
        export interface QueryParameters {
            lastLoadedEventId?: Parameters.LastLoadedEventId;
            lastLoadedTimestamp?: Parameters.LastLoadedTimestamp;
        }
        namespace Responses {
            export type $200 = /**
             * Response for get errors request.
             * example:
             * {
             *   "failures": [
             *     {
             *       "eventName": "customer_request_created,",
             *       "eventId": "12e8726b-071b-4c42-9221-8caae0d14863",
             *       "errorCode": "502",
             *       "webhookConfigId": "kreauMGUr55nDoVviaaBLG",
             *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
             *       "orgId": "728",
             *       "errorPayload": "Failed to store data",
             *       "url": "https://63b2de56be27.ngrok.io",
             *       "payload": {
             *         "metadata": {
             *           "action": "created",
             *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
             *           "event_name": "customer_request_created",
             *           "object": "customer_request",
             *           "organization_id": "728",
             *           "version": "1.0.0"
             *         },
             *         "customer_request": {
             *           "id": "TEST",
             *           "payment_details": {
             *             "account_owner_name": "Test",
             *             "bank_name": "Test Bank",
             *             "bic": "BIC",
             *             "iban": "IBAN",
             *             "payment_method": "sepa"
             *           },
             *           "request_items": [
             *             {
             *               "id": "TEST",
             *               "otherProp1": "test1",
             *               "otherProp2": "test2"
             *             }
             *           ]
             *         }
             *       }
             *     },
             *     {
             *       "eventName": "customer_request_created",
             *       "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
             *       "errorCode": "404",
             *       "webhookConfigId": "xrExypA8HBWEtK9AXfU2de",
             *       "creationTimestamp": "2021-04-13T17:43:40.576Z",
             *       "orgId": "728",
             *       "errorPayload": "Tunnel ef68038e3af9.ngrok.io not found",
             *       "url": "https://ef68038e3af9.ngrok.io",
             *       "payload": {
             *         "metadata": {
             *           "action": "created",
             *           "creation_timestamp": "2021-04-13T17:43:40.576Z",
             *           "event_name": "customer_request_created",
             *           "object": "customer_request",
             *           "organization_id": "728",
             *           "version": "1.0.0"
             *         },
             *         "customer_request": {
             *           "id": "TEST",
             *           "payment_details": {
             *             "account_owner_name": "Test",
             *             "bank_name": "Test Bank",
             *             "bic": "BIC",
             *             "iban": "IBAN",
             *             "payment_method": "sepa"
             *           },
             *           "request_items": [
             *             {
             *               "id": "TEST",
             *               "otherProp1": "test1",
             *               "otherProp2": true
             *             }
             *           ]
             *         }
             *       }
             *     }
             *   ],
             *   "lastLoadedKey": {
             *     "orgId": 6122,
             *     "eventId": "fc51a730-9730-4b55-8aa1-dd6d66b7e3e2",
             *     "creationTimestamp": "2022:01:01T00:00:00.000Z"
             *   }
             * }
             */
            Components.Schemas.FailuresResp;
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
    namespace ResendFailure {
        export type RequestBody = /* Failures stored in the database. */ Components.Schemas.FailureEntry;
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Schemas.ErrorResp;
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
            export interface $204 {
            }
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
   * getFailuresForConfig - getFailuresForConfig
   * 
   * Get failed deliveries for a given config id
   */
  'getFailuresForConfig'(
    parameters?: Parameters<Paths.GetFailuresForConfig.PathParameters & Paths.GetFailuresForConfig.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFailuresForConfig.Responses.$200>
  /**
   * getFailures - getFailures
   * 
   * Get saved failures from the webhooks DB, in a paginated way
   */
  'getFailures'(
    parameters?: Parameters<Paths.GetFailures.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFailures.Responses.$200>
  /**
   * resendFailure - resendFailure
   * 
   * Resend payload for one failure
   */
  'resendFailure'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResendFailure.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResendFailure.Responses.$204>
  /**
   * triggerWebhook - triggers a webhook event either async or sync
   * 
   * Trigger a webhook
   */
  'triggerWebhook'(
    parameters?: Parameters<Paths.TriggerWebhook.PathParameters & Paths.TriggerWebhook.QueryParameters> | null,
    data?: Paths.TriggerWebhook.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerWebhook.Responses.$204>
  /**
   * getWehookEvents - getWehookEvents
   * 
   * Get sent events for a given webhook config
   */
  'getWehookEvents'(
    parameters?: Parameters<Paths.GetWehookEvents.PathParameters & Paths.GetWehookEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWehookEvents.Responses.$200>
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
}

export interface PathsDictionary {
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
  ['/v1/webhooks/configs/{configId}/failures']: {
    /**
     * getFailuresForConfig - getFailuresForConfig
     * 
     * Get failed deliveries for a given config id
     */
    'get'(
      parameters?: Parameters<Paths.GetFailuresForConfig.PathParameters & Paths.GetFailuresForConfig.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFailuresForConfig.Responses.$200>
  }
  ['/v1/webhooks/failures']: {
    /**
     * getFailures - getFailures
     * 
     * Get saved failures from the webhooks DB, in a paginated way
     */
    'get'(
      parameters?: Parameters<Paths.GetFailures.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFailures.Responses.$200>
  }
  ['/v1/webhooks/failures/resend']: {
    /**
     * resendFailure - resendFailure
     * 
     * Resend payload for one failure
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResendFailure.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResendFailure.Responses.$204>
  }
  ['/v1/webhooks/config/{configId}/trigger']: {
    /**
     * triggerWebhook - triggers a webhook event either async or sync
     * 
     * Trigger a webhook
     */
    'post'(
      parameters?: Parameters<Paths.TriggerWebhook.PathParameters & Paths.TriggerWebhook.QueryParameters> | null,
      data?: Paths.TriggerWebhook.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerWebhook.Responses.$204>
  }
  ['/v1/webhooks/configs/{configId}/events']: {
    /**
     * getWehookEvents - getWehookEvents
     * 
     * Get sent events for a given webhook config
     */
    'get'(
      parameters?: Parameters<Paths.GetWehookEvents.PathParameters & Paths.GetWehookEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWehookEvents.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
