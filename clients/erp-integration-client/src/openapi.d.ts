/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequest = Schemas.ErrorResponseBase;
        export interface ERPUpdatesResponse {
            results?: {
                /**
                 * ID of the processed event
                 */
                event_id: string;
                /**
                 * Processing status for the event (skipped indicates duplicate deduplication_id)
                 */
                status: "success" | "error" | "skipped";
                message?: string;
            }[];
        }
        export type InternalServerError = Schemas.ErrorResponseBase;
        export type TriggerWebhookResponse = Schemas.TriggerWebhookResp;
        export type Unauthorized = Schemas.ErrorResponseBase;
    }
    namespace Schemas {
        export interface CreateIntegrationRequest {
            /**
             * Integration name
             */
            name: string;
            /**
             * Optional description of the integration
             */
            description?: string;
        }
        export interface CreateUseCaseRequest {
            /**
             * Use case name
             */
            name: string;
            /**
             * Use case type
             */
            type: "inbound" | "outbound";
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Use case specific configuration
             */
            configuration?: {
                [name: string]: any;
            };
        }
        export interface EntityUpdate {
            /**
             * The entity type slug
             */
            entity_slug: string;
            /**
             * Unique identifier mappings for this entity
             */
            unique_identifiers: {
                [name: string]: any;
            };
            /**
             * Mapped attribute values
             */
            attributes: {
                [name: string]: any;
            };
        }
        export interface ErrorResponseBase {
            /**
             * Computer-readable error code
             */
            code?: string;
            /**
             * Error message
             */
            message?: string;
        }
        export interface Integration {
            /**
             * Unique identifier for the integration
             */
            id: string; // uuid
            /**
             * Organization ID
             */
            orgId: string;
            /**
             * Integration name
             */
            name: string;
            /**
             * Optional description of the integration
             */
            description?: string;
            /**
             * ISO-8601 timestamp when the integration was created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp when the integration was last updated
             */
            updated_at: string; // date-time
        }
        export interface IntegrationConfigurationV1 {
            /**
             * Mapping specification version
             */
            version?: "1.0";
            mapping: {
                /**
                 * [v1.0] Object type mappings
                 */
                objects: {
                    [name: string]: IntegrationObjectV1;
                };
            };
        }
        export interface IntegrationConfigurationV2 {
            /**
             * Mapping specification version
             */
            version: "2.0";
            mapping: {
                /**
                 * [v2.0] Event type mappings
                 */
                events: {
                    [name: string]: IntegrationEvent;
                };
            };
        }
        export interface IntegrationEntity {
            /**
             * Target entity schema (e.g., 'contact', 'contract')
             */
            entity_schema: string;
            /**
             * Array of attribute names that uniquely identify this entity
             */
            unique_ids: string[];
            /**
             * Optional JSONata expression to pre-process the event data before field mapping
             */
            jsonataExpression?: string;
            /**
             * Controls whether this entity mapping should be processed. Can be a boolean or a JSONata expression (string) that evaluates to a boolean.
             */
            enabled?: /* Controls whether this entity mapping should be processed. Can be a boolean or a JSONata expression (string) that evaluates to a boolean. */ boolean | string;
            /**
             * Field mapping definitions
             */
            fields: IntegrationEntityField[];
        }
        export interface IntegrationEntityField {
            /**
             * Target attribute name
             */
            attribute: string;
            /**
             * Source field name or JSONPath expression (if starts with $)
             */
            field?: string;
            /**
             * JSONata expression for transformation
             */
            jsonataExpression?: string;
            /**
             * Constant value to assign (any type)
             */
            constant?: any;
            relations?: RelationConfig;
        }
        export interface IntegrationEvent {
            /**
             * Array of entity configurations for this event
             */
            entities?: IntegrationEntity[];
            /**
             * Array of meter reading configurations for this event
             */
            meter_readings?: IntegrationMeterReading[];
        }
        export interface IntegrationFieldV1 {
            /**
             * Target entity slug
             */
            entity: string;
            /**
             * Target attribute name
             */
            attribute: string;
            /**
             * Source field name (mutually exclusive with jsonataExpression)
             */
            field?: string;
            /**
             * JSONata expression for transformation (mutually exclusive with field)
             */
            jsonataExpression?: string;
        }
        export interface IntegrationMeterReading {
            /**
             * JSONata expression to extract meter reading items from the event data
             */
            jsonataExpression: string;
            meter: MeterUniqueIdsConfig;
            meter_counter?: MeterUniqueIdsConfig;
            /**
             * Field mapping definitions for meter reading attributes
             */
            fields: IntegrationEntityField[];
        }
        export interface IntegrationObjectV1 {
            /**
             * Mapping of entity types to their unique identifier field mappings
             */
            unique_ids: {
                [name: string]: string[] | {
                    [name: string]: string;
                };
            };
            /**
             * Field mapping definitions
             */
            fields: IntegrationFieldV1[];
        }
        export interface MappingSimulationRequest {
            mapping_configuration: IntegrationConfigurationV1 | IntegrationConfigurationV2;
            /**
             * Type of the object/event being mapped.
             * For v1.0: must match a key in mapping_configuration.mapping.objects
             * For v2.0: must match a key in mapping_configuration.mapping.events
             *
             */
            object_type: string;
            /**
             * Format of the payload data
             */
            format: "json" | "xml";
            /**
             * The object data payload - can be either a serialized string or a direct JSON object
             */
            payload: /* The object data payload - can be either a serialized string or a direct JSON object */ string | {
                [name: string]: any;
            };
        }
        export interface MappingSimulationResponse {
            entity_updates: EntityUpdate[];
            meter_readings_updates?: MeterReadingUpdate[];
        }
        export interface MeterReadingUpdate {
            meter: {
                /**
                 * Unique identifiers for the meter
                 */
                $entity_unique_ids: {
                    [name: string]: any;
                };
            };
            meter_counter?: {
                /**
                 * Unique identifiers for the meter counter
                 */
                $entity_unique_ids?: {
                    [name: string]: any;
                };
            };
            /**
             * Meter reading attributes (external_id, timestamp, source, value, etc.)
             */
            attributes: {
                [name: string]: any;
            };
        }
        export interface MeterUniqueIdsConfig {
            /**
             * Array of unique identifier field mappings
             */
            unique_ids: [
                RelationUniqueIdField,
                ...RelationUniqueIdField[]
            ];
        }
        export interface RelationConfig {
            /**
             * Relation operation:
             * - '_set': Replace all existing relations with the specified items
             * - '_append': Add new items to existing relations (fetches current entity first)
             *
             */
            operation: "_set" | "_append";
            /**
             * Array of relation item configurations
             */
            items?: RelationItemConfig[];
            /**
             * JSONata expression that returns relation items array (alternative to 'items')
             */
            jsonataExpression?: string;
        }
        export interface RelationItemConfig {
            /**
             * Related entity schema
             */
            entity_schema: string;
            /**
             * Optional tags for this relation
             */
            _tags?: string[];
            /**
             * Unique identifier mappings for the related entity
             */
            unique_ids: RelationUniqueIdField[];
        }
        export interface RelationUniqueIdField {
            /**
             * Target attribute name in the related entity
             */
            attribute: string;
            /**
             * Source field name from the event data
             */
            field?: string;
            /**
             * JSONata expression to compute the value
             */
            jsonataExpression?: string;
            /**
             * Constant value (any type)
             */
            constant?: any;
        }
        export interface TriggerErpActionRequest {
            /**
             * Unique identifier of the current automation execution
             */
            execution_id: string;
            /**
             * Identifier of the organization where the automation is executed
             */
            org_id: string;
            /**
             * Identifier of the self-service webhook configuration
             */
            webhook_id: string;
            /**
             * Identifier of the automation flow that triggered the action
             */
            flow_id: string;
            /**
             * ISO-8601 timestamp when the webhook event was created
             */
            created_at: string; // date-time
            /**
             * Identifier of the automation action being executed
             */
            action_id: string;
            /**
             * Identifier of the specific automation flow action instance
             */
            flow_action_id: string;
            /**
             * Human readable name of the automation flow
             */
            flow_name: string;
            /**
             * Identifier of the entity activity related to this trigger
             */
            activity_id: string;
            /**
             * Identifier of the entity referenced by the activity
             */
            entity_id: string;
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
            event_id?: string;
        }
        export interface UpdateIntegrationRequest {
            /**
             * Integration name
             */
            name?: string;
            /**
             * Optional description of the integration
             */
            description?: string;
        }
        export interface UpdateUseCaseRequest {
            /**
             * Use case name
             */
            name?: string;
            /**
             * Use case type
             */
            type?: "inbound" | "outbound";
            /**
             * Whether the use case is enabled
             */
            enabled?: boolean;
            /**
             * Use case specific configuration
             */
            configuration?: {
                [name: string]: any;
            };
        }
        export interface UseCase {
            /**
             * Unique identifier for the use case
             */
            id: string; // uuid
            /**
             * Parent integration ID
             */
            integrationId: string; // uuid
            /**
             * Use case name
             */
            name: string;
            /**
             * Use case type
             */
            type: "inbound" | "outbound";
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Use case specific configuration
             */
            configuration?: {
                [name: string]: any;
            };
            /**
             * ISO-8601 timestamp when the use case was created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp when the use case was last updated
             */
            updated_at: string; // date-time
        }
    }
}
declare namespace Paths {
    namespace AcknowledgeTracking {
        export interface RequestBody {
            /**
             * Unique identifier of the ERP tracking record to acknowledge
             */
            ack_id: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace CreateIntegration {
        export type RequestBody = Components.Schemas.CreateIntegrationRequest;
        namespace Responses {
            export type $201 = Components.Schemas.Integration;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateUseCase {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.CreateUseCaseRequest;
        namespace Responses {
            export type $201 = Components.Schemas.UseCase;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteIntegration {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteUseCase {
        namespace Parameters {
            export type IntegrationId = string; // uuid
            export type UseCaseId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
            useCaseId: Parameters.UseCaseId /* uuid */;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetIntegration {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Integration;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetUseCase {
        namespace Parameters {
            export type IntegrationId = string; // uuid
            export type UseCaseId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
            useCaseId: Parameters.UseCaseId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UseCase;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListIntegrations {
        namespace Responses {
            export interface $200 {
                integrations: Components.Schemas.Integration[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListUseCases {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        namespace Responses {
            export interface $200 {
                use_cases: Components.Schemas.UseCase[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ProcessErpUpdatesEvents {
        export interface RequestBody {
            /**
             * UUID that identifies the specific integration app instance
             */
            app_id: string; // uuid
            /**
             * UUID that identifies the specific integration app component instance
             */
            component_id: string; // uuid
            /**
             * Metadata to be passed along with the events
             */
            meta: {
                [name: string]: any;
                /**
                 * ID that identifies the specific request for debugging purposes
                 */
                correlation_id?: string;
            };
            /**
             * List of ERP events to process
             */
            events: {
                /**
                 * Type of event (create, update, delete)
                 */
                event_type: "CREATE" | "UPDATE" | "DELETE";
                /**
                 * Type of the object being updated (business_partner, contract_account, etc.)
                 */
                object_type: string;
                /**
                 * Timestamp when the event occurred
                 */
                timestamp: string; // date-time
                /**
                 * Format of the payload data
                 */
                format: "json" | "xml";
                /**
                 * The object data payload - can be either a serialized string or a direct JSON object
                 */
                payload: /* The object data payload - can be either a serialized string or a direct JSON object */ string | {
                    [name: string]: any;
                };
                /**
                 * Optional unique identifier for idempotency - prevents duplicate processing of the same event within 24 hours in context of the same app and component. Must contain only alphanumeric characters, hyphens, and underscores.
                 *
                 * example:
                 * evt-2025-05-01-12345-create-bp
                 */
                deduplication_id?: string; // ^[a-zA-Z0-9_-]+$
            }[];
        }
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Responses.ERPUpdatesResponse;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SimulateMapping {
        export type RequestBody = Components.Schemas.MappingSimulationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.MappingSimulationResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Schemas.ErrorResponseBase;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace TriggerErp {
        export type RequestBody = Components.Schemas.TriggerErpActionRequest;
        namespace Responses {
            export type $200 = Components.Responses.TriggerWebhookResponse;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $500 {
            }
        }
    }
    namespace UpdateIntegration {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.UpdateIntegrationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Integration;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateUseCase {
        namespace Parameters {
            export type IntegrationId = string; // uuid
            export type UseCaseId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
            useCaseId: Parameters.UseCaseId /* uuid */;
        }
        export type RequestBody = Components.Schemas.UpdateUseCaseRequest;
        namespace Responses {
            export type $200 = Components.Schemas.UseCase;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
}


export interface OperationMethods {
  /**
   * acknowledgeTracking - acknowledgeTracking
   * 
   * Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication
   */
  'acknowledgeTracking'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcknowledgeTracking.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcknowledgeTracking.Responses.$200>
  /**
   * triggerErp - triggerErp
   * 
   * Triggers the ERP integration process
   */
  'triggerErp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TriggerErp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerErp.Responses.$200>
  /**
   * processErpUpdatesEvents - processErpUpdatesEvents
   * 
   * Handles updates from ERP systems and tracks them appropriately
   */
  'processErpUpdatesEvents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProcessErpUpdatesEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProcessErpUpdatesEvents.Responses.$200>
  /**
   * simulateMapping - simulateMapping
   * 
   * Test mapping configuration by transforming a payload using the provided mapping rules without persisting data.
   * 
   * Supports both v1.0 (object-based) and v2.0 (event-based) mapping formats.
   * See documentation at /docs/MAPPING_V2.md for detailed v2.0 format specification.
   * 
   */
  'simulateMapping'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SimulateMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SimulateMapping.Responses.$200>
  /**
   * listIntegrations - List all integrations
   * 
   * Retrieve all integrations for the authenticated organization
   */
  'listIntegrations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListIntegrations.Responses.$200>
  /**
   * createIntegration - Create a new integration
   * 
   * Create a new integration configuration
   */
  'createIntegration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateIntegration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateIntegration.Responses.$201>
  /**
   * getIntegration - Get an integration by ID
   * 
   * Retrieve a specific integration by its ID
   */
  'getIntegration'(
    parameters?: Parameters<Paths.GetIntegration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetIntegration.Responses.$200>
  /**
   * updateIntegration - Update an integration
   * 
   * Update an existing integration configuration
   */
  'updateIntegration'(
    parameters?: Parameters<Paths.UpdateIntegration.PathParameters> | null,
    data?: Paths.UpdateIntegration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIntegration.Responses.$200>
  /**
   * deleteIntegration - Delete an integration
   * 
   * Delete an integration and all its use cases
   */
  'deleteIntegration'(
    parameters?: Parameters<Paths.DeleteIntegration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIntegration.Responses.$200>
  /**
   * listUseCases - List all use cases for an integration
   * 
   * Retrieve all use cases for a specific integration
   */
  'listUseCases'(
    parameters?: Parameters<Paths.ListUseCases.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUseCases.Responses.$200>
  /**
   * createUseCase - Create a new use case
   * 
   * Create a new use case for an integration
   */
  'createUseCase'(
    parameters?: Parameters<Paths.CreateUseCase.PathParameters> | null,
    data?: Paths.CreateUseCase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUseCase.Responses.$201>
  /**
   * getUseCase - Get a use case by ID
   * 
   * Retrieve a specific use case by its ID
   */
  'getUseCase'(
    parameters?: Parameters<Paths.GetUseCase.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUseCase.Responses.$200>
  /**
   * updateUseCase - Update a use case
   * 
   * Update an existing use case configuration
   */
  'updateUseCase'(
    parameters?: Parameters<Paths.UpdateUseCase.PathParameters> | null,
    data?: Paths.UpdateUseCase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUseCase.Responses.$200>
  /**
   * deleteUseCase - Delete a use case
   * 
   * Delete a use case from an integration
   */
  'deleteUseCase'(
    parameters?: Parameters<Paths.DeleteUseCase.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUseCase.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/erp/tracking/acknowledgement']: {
    /**
     * acknowledgeTracking - acknowledgeTracking
     * 
     * Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcknowledgeTracking.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcknowledgeTracking.Responses.$200>
  }
  ['/v1/erp/trigger']: {
    /**
     * triggerErp - triggerErp
     * 
     * Triggers the ERP integration process
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TriggerErp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerErp.Responses.$200>
  }
  ['/v1/erp/updates/events']: {
    /**
     * processErpUpdatesEvents - processErpUpdatesEvents
     * 
     * Handles updates from ERP systems and tracks them appropriately
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProcessErpUpdatesEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProcessErpUpdatesEvents.Responses.$200>
  }
  ['/v1/erp/updates/mapping_simulation']: {
    /**
     * simulateMapping - simulateMapping
     * 
     * Test mapping configuration by transforming a payload using the provided mapping rules without persisting data.
     * 
     * Supports both v1.0 (object-based) and v2.0 (event-based) mapping formats.
     * See documentation at /docs/MAPPING_V2.md for detailed v2.0 format specification.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SimulateMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SimulateMapping.Responses.$200>
  }
  ['/v1/integrations']: {
    /**
     * listIntegrations - List all integrations
     * 
     * Retrieve all integrations for the authenticated organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListIntegrations.Responses.$200>
    /**
     * createIntegration - Create a new integration
     * 
     * Create a new integration configuration
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateIntegration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateIntegration.Responses.$201>
  }
  ['/v1/integrations/{integrationId}']: {
    /**
     * getIntegration - Get an integration by ID
     * 
     * Retrieve a specific integration by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GetIntegration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetIntegration.Responses.$200>
    /**
     * updateIntegration - Update an integration
     * 
     * Update an existing integration configuration
     */
    'put'(
      parameters?: Parameters<Paths.UpdateIntegration.PathParameters> | null,
      data?: Paths.UpdateIntegration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIntegration.Responses.$200>
    /**
     * deleteIntegration - Delete an integration
     * 
     * Delete an integration and all its use cases
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteIntegration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIntegration.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/use-cases']: {
    /**
     * listUseCases - List all use cases for an integration
     * 
     * Retrieve all use cases for a specific integration
     */
    'get'(
      parameters?: Parameters<Paths.ListUseCases.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUseCases.Responses.$200>
    /**
     * createUseCase - Create a new use case
     * 
     * Create a new use case for an integration
     */
    'post'(
      parameters?: Parameters<Paths.CreateUseCase.PathParameters> | null,
      data?: Paths.CreateUseCase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUseCase.Responses.$201>
  }
  ['/v1/integrations/{integrationId}/use-cases/{useCaseId}']: {
    /**
     * getUseCase - Get a use case by ID
     * 
     * Retrieve a specific use case by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GetUseCase.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUseCase.Responses.$200>
    /**
     * updateUseCase - Update a use case
     * 
     * Update an existing use case configuration
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUseCase.PathParameters> | null,
      data?: Paths.UpdateUseCase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUseCase.Responses.$200>
    /**
     * deleteUseCase - Delete a use case
     * 
     * Delete a use case from an integration
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUseCase.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUseCase.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateIntegrationRequest = Components.Schemas.CreateIntegrationRequest;
export type CreateUseCaseRequest = Components.Schemas.CreateUseCaseRequest;
export type EntityUpdate = Components.Schemas.EntityUpdate;
export type ErrorResponseBase = Components.Schemas.ErrorResponseBase;
export type Integration = Components.Schemas.Integration;
export type IntegrationConfigurationV1 = Components.Schemas.IntegrationConfigurationV1;
export type IntegrationConfigurationV2 = Components.Schemas.IntegrationConfigurationV2;
export type IntegrationEntity = Components.Schemas.IntegrationEntity;
export type IntegrationEntityField = Components.Schemas.IntegrationEntityField;
export type IntegrationEvent = Components.Schemas.IntegrationEvent;
export type IntegrationFieldV1 = Components.Schemas.IntegrationFieldV1;
export type IntegrationMeterReading = Components.Schemas.IntegrationMeterReading;
export type IntegrationObjectV1 = Components.Schemas.IntegrationObjectV1;
export type MappingSimulationRequest = Components.Schemas.MappingSimulationRequest;
export type MappingSimulationResponse = Components.Schemas.MappingSimulationResponse;
export type MeterReadingUpdate = Components.Schemas.MeterReadingUpdate;
export type MeterUniqueIdsConfig = Components.Schemas.MeterUniqueIdsConfig;
export type RelationConfig = Components.Schemas.RelationConfig;
export type RelationItemConfig = Components.Schemas.RelationItemConfig;
export type RelationUniqueIdField = Components.Schemas.RelationUniqueIdField;
export type TriggerErpActionRequest = Components.Schemas.TriggerErpActionRequest;
export type TriggerWebhookResp = Components.Schemas.TriggerWebhookResp;
export type UpdateIntegrationRequest = Components.Schemas.UpdateIntegrationRequest;
export type UpdateUseCaseRequest = Components.Schemas.UpdateUseCaseRequest;
export type UseCase = Components.Schemas.UseCase;
