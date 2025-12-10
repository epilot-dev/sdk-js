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
        export type NotFound = Schemas.ErrorResponseBase;
        export interface QueryEventsResponse {
            /**
             * List of erp events
             */
            data?: Schemas.ErpEvent[];
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
        export type TriggerWebhookResponse = Schemas.TriggerWebhookResp;
        export type Unauthorized = Schemas.ErrorResponseBase;
    }
    namespace Schemas {
        export interface CreateInboundUseCaseRequest {
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Use case type
             */
            type: "inbound";
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
        }
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
        export interface CreateOutboundUseCaseRequest {
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Use case type
             */
            type: "outbound";
            configuration?: /* Configuration for outbound use cases (epilot to ERP). Structure TBD. */ OutboundIntegrationEventConfiguration;
        }
        export type CreateUseCaseRequest = CreateInboundUseCaseRequest | CreateOutboundUseCaseRequest;
        export interface CreateUseCaseRequestBase {
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
        }
        export interface DeleteIntegrationAppMappingRequest {
            /**
             * UUID of the integration app instance
             */
            app_id: string; // uuid
            /**
             * UUID of the integration app component instance
             */
            component_id: string; // uuid
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
        export interface ErpEvent {
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
             * Optional unique identifier for idempotency - prevents duplicate processing of the same event within 24 hours in context of the same integration. Must contain only alphanumeric characters, hyphens, and underscores.
             *
             * example:
             * evt-2025-05-01-12345-create-bp
             */
            deduplication_id?: string; // ^[a-zA-Z0-9_-]+$
        }
        export interface ErpUpdatesEventsV2Request {
            /**
             * UUID that identifies the integration configuration to use
             */
            integration_id: string; // uuid
            /**
             * Optional ID that identifies the specific request for debugging purposes
             */
            correlation_id?: string;
            /**
             * List of ERP events to process
             */
            events: ErpEvent[];
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
        /**
         * Configuration for inbound use cases (ERP to epilot)
         */
        export interface InboundIntegrationEventConfiguration {
            /**
             * Array of entity configurations for this event
             */
            entities?: IntegrationEntity[];
            /**
             * Array of meter reading configurations for this event
             */
            meter_readings?: IntegrationMeterReading[];
        }
        export interface InboundUseCase {
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
            type: "inbound";
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
            /**
             * Description of the last change made to this use case
             */
            change_description?: string;
            /**
             * ISO-8601 timestamp when the use case was created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp when the use case was last updated
             */
            updated_at: string; // date-time
        }
        export interface InboundUseCaseHistoryEntry {
            /**
             * Unique identifier for this history entry
             */
            id: string; // uuid
            /**
             * Reference to the parent use case
             */
            useCaseId: string; // uuid
            /**
             * Parent integration ID
             */
            integrationId: string; // uuid
            /**
             * Use case name at this point in history
             */
            name: string;
            /**
             * Whether the use case was enabled at this point in history
             */
            enabled: boolean;
            /**
             * Description of the change that was made at this point in history
             */
            change_description?: string;
            /**
             * ISO-8601 timestamp when the use case was originally created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp of this historical snapshot (before the update)
             */
            updated_at: string; // date-time
            /**
             * ISO-8601 timestamp when this history entry was created
             */
            history_created_at: string; // date-time
            /**
             * Use case type
             */
            type: "inbound";
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
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
        export interface IntegrationAppMapping {
            /**
             * The integration ID this app/component is mapped to
             */
            integration_id: string; // uuid
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
                    [name: string]: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
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
            /**
             * Controls whether this field mapping should be processed. Can be a boolean or a JSONata expression (string) that evaluates to a boolean. Defaults to true if omitted.
             */
            enabled?: /* Controls whether this field mapping should be processed. Can be a boolean or a JSONata expression (string) that evaluates to a boolean. Defaults to true if omitted. */ boolean | string;
            relations?: RelationConfig;
            relation_refs?: /**
             * Configuration for relation references ($relation_ref).
             * Relation references link to a specific item within a repeatable attribute on a related entity.
             * Common use case: referencing a specific address within a contact's address list.
             *
             */
            RelationRefsConfig;
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
        /**
         * Request for v2 mapping simulation. Uses the same configuration format stored in integration use case resources,
         * making it easier to test configurations before saving them.
         *
         */
        export interface MappingSimulationV2Request {
            event_configuration: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
            /**
             * Format of the payload data
             */
            format: "json" | "xml";
            /**
             * The event data payload - can be either a serialized string or a direct JSON object
             */
            payload: /* The event data payload - can be either a serialized string or a direct JSON object */ string | {
                [name: string]: any;
            };
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
        /**
         * Configuration for outbound use cases (epilot to ERP). Structure TBD.
         */
        export interface OutboundIntegrationEventConfiguration {
            [name: string]: any;
        }
        export interface OutboundUseCase {
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
            type: "outbound";
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            configuration?: /* Configuration for outbound use cases (epilot to ERP). Structure TBD. */ OutboundIntegrationEventConfiguration;
            /**
             * Description of the last change made to this use case
             */
            change_description?: string;
            /**
             * ISO-8601 timestamp when the use case was created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp when the use case was last updated
             */
            updated_at: string; // date-time
        }
        export interface OutboundUseCaseHistoryEntry {
            /**
             * Unique identifier for this history entry
             */
            id: string; // uuid
            /**
             * Reference to the parent use case
             */
            useCaseId: string; // uuid
            /**
             * Parent integration ID
             */
            integrationId: string; // uuid
            /**
             * Use case name at this point in history
             */
            name: string;
            /**
             * Whether the use case was enabled at this point in history
             */
            enabled: boolean;
            /**
             * Description of the change that was made at this point in history
             */
            change_description?: string;
            /**
             * ISO-8601 timestamp when the use case was originally created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp of this historical snapshot (before the update)
             */
            updated_at: string; // date-time
            /**
             * ISO-8601 timestamp when this history entry was created
             */
            history_created_at: string; // date-time
            /**
             * Use case type
             */
            type: "outbound";
            configuration?: /* Configuration for outbound use cases (epilot to ERP). Structure TBD. */ OutboundIntegrationEventConfiguration;
        }
        export interface QueryEventsRequest {
            /**
             * Filter by event ID
             */
            event_id?: string;
            /**
             * Filter by event type
             */
            event_type?: "CREATE" | "UPDATE" | "DELETE";
            /**
             * Filter by correlation ID
             */
            correlation_id?: string;
            /**
             * Filter by object type
             */
            object_type?: string;
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
                event_time?: string; // date-time
                /**
                 * Event ID from the last event in the previous page
                 * example:
                 * evt_1234567890abcdef
                 */
                event_id?: string;
            };
        }
        export interface RelationConfig {
            /**
             * Relation operation:
             * - '_set': Replace all existing relations with the specified items
             * - '_append': Add new unique items to existing relations (deduplicates by entity_id)
             * - '_append_all': Add all items to existing relations (no deduplication, allows duplicates)
             *
             */
            operation: "_set" | "_append" | "_append_all";
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
        /**
         * Configuration for a single relation reference item
         */
        export interface RelationRefItemConfig {
            /**
             * Schema of the related entity (e.g., "contact")
             */
            entity_schema: string;
            /**
             * Unique identifier mappings for the related entity
             */
            unique_ids: RelationUniqueIdField[];
            /**
             * Attribute path on the related entity (e.g., "address")
             */
            path: string;
            value: /* Configuration for the value to set on the related entity's attribute */ RelationRefValueConfig;
        }
        /**
         * Configuration for the value to set on the related entity's attribute
         */
        export interface RelationRefValueConfig {
            /**
             * Target attribute name on the related entity
             */
            attribute: string;
            /**
             * Operation for the attribute value:
             * - '_set': Replace the attribute value
             * - '_append': Add new unique items (deduplicates)
             * - '_append_all': Add all items (no deduplication)
             *
             */
            operation?: "_set" | "_append" | "_append_all";
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
        /**
         * Configuration for relation references ($relation_ref).
         * Relation references link to a specific item within a repeatable attribute on a related entity.
         * Common use case: referencing a specific address within a contact's address list.
         *
         */
        export interface RelationRefsConfig {
            /**
             * Relation reference operation:
             * - '_set': Replace all existing relation_refs with the specified items
             * - '_append': Add new unique items to existing relation_refs (deduplicates by entity_id + _id)
             * - '_append_all': Add all items to existing relation_refs (no deduplication, allows duplicates)
             *
             */
            operation: "_set" | "_append" | "_append_all";
            /**
             * Array of relation reference item configurations
             */
            items?: /* Configuration for a single relation reference item */ RelationRefItemConfig[];
            /**
             * JSONata expression that returns relation_ref items array (alternative to 'items')
             */
            jsonataExpression?: string;
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
        export interface SetIntegrationAppMappingRequest {
            /**
             * UUID of the integration app instance
             */
            app_id: string; // uuid
            /**
             * UUID of the integration app component instance
             */
            component_id: string; // uuid
            /**
             * If true, overwrites existing mapping. If false and mapping exists, returns 409 Conflict.
             */
            overwrite?: boolean;
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
        export interface UpdateInboundUseCaseRequest {
            /**
             * Use case name
             */
            name?: string;
            /**
             * Whether the use case is enabled
             */
            enabled?: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
            /**
             * Use case type
             */
            type?: "inbound";
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
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
        export interface UpdateOutboundUseCaseRequest {
            /**
             * Use case name
             */
            name?: string;
            /**
             * Whether the use case is enabled
             */
            enabled?: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
            /**
             * Use case type
             */
            type?: "outbound";
            configuration?: /* Configuration for outbound use cases (epilot to ERP). Structure TBD. */ OutboundIntegrationEventConfiguration;
        }
        export type UpdateUseCaseRequest = UpdateInboundUseCaseRequest | UpdateOutboundUseCaseRequest;
        export interface UpdateUseCaseRequestBase {
            /**
             * Use case name
             */
            name?: string;
            /**
             * Whether the use case is enabled
             */
            enabled?: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
        }
        export type UseCase = InboundUseCase | OutboundUseCase;
        export type UseCaseHistoryEntry = InboundUseCaseHistoryEntry | OutboundUseCaseHistoryEntry;
        export interface UseCaseHistoryEntryBase {
            /**
             * Unique identifier for this history entry
             */
            id: string; // uuid
            /**
             * Reference to the parent use case
             */
            useCaseId: string; // uuid
            /**
             * Parent integration ID
             */
            integrationId: string; // uuid
            /**
             * Use case name at this point in history
             */
            name: string;
            /**
             * Whether the use case was enabled at this point in history
             */
            enabled: boolean;
            /**
             * Description of the change that was made at this point in history
             */
            change_description?: string;
            /**
             * ISO-8601 timestamp when the use case was originally created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp of this historical snapshot (before the update)
             */
            updated_at: string; // date-time
            /**
             * ISO-8601 timestamp when this history entry was created
             */
            history_created_at: string; // date-time
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
    namespace DeleteIntegrationAppMapping {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.DeleteIntegrationAppMappingRequest;
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export type $400 = Components.Responses.BadRequest;
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
    namespace ListUseCaseHistory {
        namespace Parameters {
            export type Cursor = string;
            export type IntegrationId = string; // uuid
            export type UseCaseId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
            useCaseId: Parameters.UseCaseId /* uuid */;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * History entries in reverse chronological order (newest first)
                 */
                history: Components.Schemas.UseCaseHistoryEntry[];
                /**
                 * Opaque cursor for fetching the next page. Absent if no more pages.
                 */
                next_cursor?: string;
            }
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
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
            events: Components.Schemas.ErpEvent[];
        }
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Responses.ERPUpdatesResponse;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ProcessErpUpdatesEventsV2 {
        export type RequestBody = Components.Schemas.ErpUpdatesEventsV2Request;
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Responses.ERPUpdatesResponse;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace QueryEvents {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.QueryEventsRequest;
        namespace Responses {
            export type $200 = Components.Responses.QueryEventsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SetIntegrationAppMapping {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.SetIntegrationAppMappingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.IntegrationAppMapping;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $409 = Components.Schemas.ErrorResponseBase;
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
    namespace SimulateMappingV2 {
        export type RequestBody = /**
         * Request for v2 mapping simulation. Uses the same configuration format stored in integration use case resources,
         * making it easier to test configurations before saving them.
         *
         */
        Components.Schemas.MappingSimulationV2Request;
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
   * processErpUpdatesEventsV2 - processErpUpdatesEventsV2
   * 
   * Handles updates from ERP systems using integration_id directly.
   * This is the v2 version that simplifies the API by accepting integration_id
   * instead of app_id and component_id.
   * 
   */
  'processErpUpdatesEventsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProcessErpUpdatesEventsV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProcessErpUpdatesEventsV2.Responses.$200>
  /**
   * simulateMappingV2 - simulateMappingV2
   * 
   * Test v2.0 mapping configuration by transforming a payload using the provided mapping rules without persisting data.
   * 
   * This endpoint accepts the same configuration format that is stored in the integration use case resource,
   * making it easier to test configurations before saving them to a use case.
   * 
   * See documentation at /docs/MAPPING_V2.md for detailed v2.0 format specification.
   * 
   */
  'simulateMappingV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SimulateMappingV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SimulateMappingV2.Responses.$200>
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
   * listIntegrations - listIntegrations
   * 
   * Retrieve all integrations for the authenticated organization
   */
  'listIntegrations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListIntegrations.Responses.$200>
  /**
   * createIntegration - createIntegration
   * 
   * Create a new integration configuration
   */
  'createIntegration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateIntegration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateIntegration.Responses.$201>
  /**
   * getIntegration - getIntegration
   * 
   * Retrieve a specific integration by its ID
   */
  'getIntegration'(
    parameters?: Parameters<Paths.GetIntegration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetIntegration.Responses.$200>
  /**
   * updateIntegration - updateIntegration
   * 
   * Update an existing integration configuration
   */
  'updateIntegration'(
    parameters?: Parameters<Paths.UpdateIntegration.PathParameters> | null,
    data?: Paths.UpdateIntegration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIntegration.Responses.$200>
  /**
   * deleteIntegration - deleteIntegration
   * 
   * Delete an integration and all its use cases
   */
  'deleteIntegration'(
    parameters?: Parameters<Paths.DeleteIntegration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIntegration.Responses.$200>
  /**
   * queryEvents - queryEvents
   * 
   * Query events for a specific integration
   */
  'queryEvents'(
    parameters?: Parameters<Paths.QueryEvents.PathParameters> | null,
    data?: Paths.QueryEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryEvents.Responses.$200>
  /**
   * listUseCases - listUseCases
   * 
   * Retrieve all use cases for a specific integration
   */
  'listUseCases'(
    parameters?: Parameters<Paths.ListUseCases.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUseCases.Responses.$200>
  /**
   * createUseCase - createUseCase
   * 
   * Create a new use case for an integration
   */
  'createUseCase'(
    parameters?: Parameters<Paths.CreateUseCase.PathParameters> | null,
    data?: Paths.CreateUseCase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUseCase.Responses.$201>
  /**
   * getUseCase - getUseCase
   * 
   * Retrieve a specific use case by its ID
   */
  'getUseCase'(
    parameters?: Parameters<Paths.GetUseCase.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUseCase.Responses.$200>
  /**
   * updateUseCase - updateUseCase
   * 
   * Update an existing use case configuration
   */
  'updateUseCase'(
    parameters?: Parameters<Paths.UpdateUseCase.PathParameters> | null,
    data?: Paths.UpdateUseCase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUseCase.Responses.$200>
  /**
   * deleteUseCase - deleteUseCase
   * 
   * Delete a use case from an integration
   */
  'deleteUseCase'(
    parameters?: Parameters<Paths.DeleteUseCase.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUseCase.Responses.$200>
  /**
   * listUseCaseHistory - listUseCaseHistory
   * 
   * Retrieve historical versions of a use case's configuration.
   * History entries are returned in reverse chronological order (newest first).
   * Use the 'cursor' parameter for pagination to fetch additional entries.
   * 
   */
  'listUseCaseHistory'(
    parameters?: Parameters<Paths.ListUseCaseHistory.QueryParameters & Paths.ListUseCaseHistory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUseCaseHistory.Responses.$200>
  /**
   * setIntegrationAppMapping - setIntegrationAppMapping
   * 
   * Creates or updates a mapping from an app/component to an integration.
   * This allows ERP updates sent via app_id and component_id to be associated
   * with a specific integration configuration.
   * 
   */
  'setIntegrationAppMapping'(
    parameters?: Parameters<Paths.SetIntegrationAppMapping.PathParameters> | null,
    data?: Paths.SetIntegrationAppMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetIntegrationAppMapping.Responses.$200>
  /**
   * deleteIntegrationAppMapping - deleteIntegrationAppMapping
   * 
   * Removes a mapping from an app/component to an integration.
   * 
   */
  'deleteIntegrationAppMapping'(
    parameters?: Parameters<Paths.DeleteIntegrationAppMapping.PathParameters> | null,
    data?: Paths.DeleteIntegrationAppMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIntegrationAppMapping.Responses.$200>
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
  ['/v2/erp/updates/events']: {
    /**
     * processErpUpdatesEventsV2 - processErpUpdatesEventsV2
     * 
     * Handles updates from ERP systems using integration_id directly.
     * This is the v2 version that simplifies the API by accepting integration_id
     * instead of app_id and component_id.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProcessErpUpdatesEventsV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProcessErpUpdatesEventsV2.Responses.$200>
  }
  ['/v2/erp/updates/mapping_simulation']: {
    /**
     * simulateMappingV2 - simulateMappingV2
     * 
     * Test v2.0 mapping configuration by transforming a payload using the provided mapping rules without persisting data.
     * 
     * This endpoint accepts the same configuration format that is stored in the integration use case resource,
     * making it easier to test configurations before saving them to a use case.
     * 
     * See documentation at /docs/MAPPING_V2.md for detailed v2.0 format specification.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SimulateMappingV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SimulateMappingV2.Responses.$200>
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
     * listIntegrations - listIntegrations
     * 
     * Retrieve all integrations for the authenticated organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListIntegrations.Responses.$200>
    /**
     * createIntegration - createIntegration
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
     * getIntegration - getIntegration
     * 
     * Retrieve a specific integration by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GetIntegration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetIntegration.Responses.$200>
    /**
     * updateIntegration - updateIntegration
     * 
     * Update an existing integration configuration
     */
    'put'(
      parameters?: Parameters<Paths.UpdateIntegration.PathParameters> | null,
      data?: Paths.UpdateIntegration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIntegration.Responses.$200>
    /**
     * deleteIntegration - deleteIntegration
     * 
     * Delete an integration and all its use cases
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteIntegration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIntegration.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/events']: {
    /**
     * queryEvents - queryEvents
     * 
     * Query events for a specific integration
     */
    'post'(
      parameters?: Parameters<Paths.QueryEvents.PathParameters> | null,
      data?: Paths.QueryEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryEvents.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/use-cases']: {
    /**
     * listUseCases - listUseCases
     * 
     * Retrieve all use cases for a specific integration
     */
    'get'(
      parameters?: Parameters<Paths.ListUseCases.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUseCases.Responses.$200>
    /**
     * createUseCase - createUseCase
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
     * getUseCase - getUseCase
     * 
     * Retrieve a specific use case by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GetUseCase.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUseCase.Responses.$200>
    /**
     * updateUseCase - updateUseCase
     * 
     * Update an existing use case configuration
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUseCase.PathParameters> | null,
      data?: Paths.UpdateUseCase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUseCase.Responses.$200>
    /**
     * deleteUseCase - deleteUseCase
     * 
     * Delete a use case from an integration
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUseCase.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUseCase.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/use-cases/{useCaseId}/history']: {
    /**
     * listUseCaseHistory - listUseCaseHistory
     * 
     * Retrieve historical versions of a use case's configuration.
     * History entries are returned in reverse chronological order (newest first).
     * Use the 'cursor' parameter for pagination to fetch additional entries.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListUseCaseHistory.QueryParameters & Paths.ListUseCaseHistory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUseCaseHistory.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/app-mapping']: {
    /**
     * setIntegrationAppMapping - setIntegrationAppMapping
     * 
     * Creates or updates a mapping from an app/component to an integration.
     * This allows ERP updates sent via app_id and component_id to be associated
     * with a specific integration configuration.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.SetIntegrationAppMapping.PathParameters> | null,
      data?: Paths.SetIntegrationAppMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetIntegrationAppMapping.Responses.$200>
    /**
     * deleteIntegrationAppMapping - deleteIntegrationAppMapping
     * 
     * Removes a mapping from an app/component to an integration.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteIntegrationAppMapping.PathParameters> | null,
      data?: Paths.DeleteIntegrationAppMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIntegrationAppMapping.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateInboundUseCaseRequest = Components.Schemas.CreateInboundUseCaseRequest;
export type CreateIntegrationRequest = Components.Schemas.CreateIntegrationRequest;
export type CreateOutboundUseCaseRequest = Components.Schemas.CreateOutboundUseCaseRequest;
export type CreateUseCaseRequest = Components.Schemas.CreateUseCaseRequest;
export type CreateUseCaseRequestBase = Components.Schemas.CreateUseCaseRequestBase;
export type DeleteIntegrationAppMappingRequest = Components.Schemas.DeleteIntegrationAppMappingRequest;
export type EntityUpdate = Components.Schemas.EntityUpdate;
export type ErpEvent = Components.Schemas.ErpEvent;
export type ErpUpdatesEventsV2Request = Components.Schemas.ErpUpdatesEventsV2Request;
export type ErrorResponseBase = Components.Schemas.ErrorResponseBase;
export type InboundIntegrationEventConfiguration = Components.Schemas.InboundIntegrationEventConfiguration;
export type InboundUseCase = Components.Schemas.InboundUseCase;
export type InboundUseCaseHistoryEntry = Components.Schemas.InboundUseCaseHistoryEntry;
export type Integration = Components.Schemas.Integration;
export type IntegrationAppMapping = Components.Schemas.IntegrationAppMapping;
export type IntegrationConfigurationV1 = Components.Schemas.IntegrationConfigurationV1;
export type IntegrationConfigurationV2 = Components.Schemas.IntegrationConfigurationV2;
export type IntegrationEntity = Components.Schemas.IntegrationEntity;
export type IntegrationEntityField = Components.Schemas.IntegrationEntityField;
export type IntegrationFieldV1 = Components.Schemas.IntegrationFieldV1;
export type IntegrationMeterReading = Components.Schemas.IntegrationMeterReading;
export type IntegrationObjectV1 = Components.Schemas.IntegrationObjectV1;
export type MappingSimulationRequest = Components.Schemas.MappingSimulationRequest;
export type MappingSimulationResponse = Components.Schemas.MappingSimulationResponse;
export type MappingSimulationV2Request = Components.Schemas.MappingSimulationV2Request;
export type MeterReadingUpdate = Components.Schemas.MeterReadingUpdate;
export type MeterUniqueIdsConfig = Components.Schemas.MeterUniqueIdsConfig;
export type OutboundIntegrationEventConfiguration = Components.Schemas.OutboundIntegrationEventConfiguration;
export type OutboundUseCase = Components.Schemas.OutboundUseCase;
export type OutboundUseCaseHistoryEntry = Components.Schemas.OutboundUseCaseHistoryEntry;
export type QueryEventsRequest = Components.Schemas.QueryEventsRequest;
export type RelationConfig = Components.Schemas.RelationConfig;
export type RelationItemConfig = Components.Schemas.RelationItemConfig;
export type RelationRefItemConfig = Components.Schemas.RelationRefItemConfig;
export type RelationRefValueConfig = Components.Schemas.RelationRefValueConfig;
export type RelationRefsConfig = Components.Schemas.RelationRefsConfig;
export type RelationUniqueIdField = Components.Schemas.RelationUniqueIdField;
export type SetIntegrationAppMappingRequest = Components.Schemas.SetIntegrationAppMappingRequest;
export type TriggerErpActionRequest = Components.Schemas.TriggerErpActionRequest;
export type TriggerWebhookResp = Components.Schemas.TriggerWebhookResp;
export type UpdateInboundUseCaseRequest = Components.Schemas.UpdateInboundUseCaseRequest;
export type UpdateIntegrationRequest = Components.Schemas.UpdateIntegrationRequest;
export type UpdateOutboundUseCaseRequest = Components.Schemas.UpdateOutboundUseCaseRequest;
export type UpdateUseCaseRequest = Components.Schemas.UpdateUseCaseRequest;
export type UpdateUseCaseRequestBase = Components.Schemas.UpdateUseCaseRequestBase;
export type UseCase = Components.Schemas.UseCase;
export type UseCaseHistoryEntry = Components.Schemas.UseCaseHistoryEntry;
export type UseCaseHistoryEntryBase = Components.Schemas.UseCaseHistoryEntryBase;
