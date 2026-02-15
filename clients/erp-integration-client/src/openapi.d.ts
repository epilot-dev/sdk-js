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
                 * Processing status for the event (skipped indicates duplicate deduplication_id, ignored indicates unconfigured event)
                 */
                status: "success" | "error" | "skipped" | "ignored";
                message?: string;
            }[];
        }
        export type GetMonitoringStatsResponse = Schemas.MonitoringStats;
        export interface GetMonitoringTimeSeriesResponse {
            /**
             * The time bucket interval used for aggregation
             */
            interval: "5m" | "10m" | "30m" | "1h" | "3h" | "1d";
            /**
             * Start date of the time series
             */
            from_date: string; // date-time
            /**
             * End date of the time series
             */
            to_date: string; // date-time
            /**
             * List of time-series buckets with event counts
             */
            buckets: Schemas.TimeSeriesBucket[];
        }
        export type InternalServerError = Schemas.ErrorResponseBase;
        export type NotFound = Schemas.ErrorResponseBase;
        export interface QueryAccessLogsResponse {
            /**
             * List of access log entries
             */
            data?: Schemas.AccessLogEntry[];
            /**
             * Cursor to fetch the next page. Null if no more results.
             */
            next_cursor?: {
                timestamp?: string; // date-time
                request_id?: string;
            } | null;
            /**
             * Indicates if more results are available
             */
            has_more?: boolean;
        }
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
                event_time?: string; // date-time
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
        export interface QueryInboundMonitoringEventsResponse {
            /**
             * List of inbound monitoring events
             */
            data?: Schemas.InboundMonitoringEvent[];
            /**
             * Cursor to fetch the next page. Null if no more results.
             */
            next_cursor?: {
                completed_at?: string; // date-time
                event_id?: string;
            } | null;
            /**
             * Indicates if more results are available
             */
            has_more?: boolean;
        }
        export interface QueryOutboundMonitoringEventsResponse {
            /**
             * List of outbound monitoring events
             */
            data?: Schemas.OutboundMonitoringEvent[];
            /**
             * Cursor to fetch the next page. Null if no more results.
             */
            next_cursor?: {
                created_at?: string; // date-time
                event_id?: string;
            } | null;
            /**
             * Indicates if more results are available
             */
            has_more?: boolean;
        }
        export interface ReplayEventsResponse {
            /**
             * List of event IDs for which replay was requested
             */
            event_ids?: string[];
        }
        export type TriggerWebhookResponse = Schemas.TriggerWebhookResp;
        export type Unauthorized = Schemas.ErrorResponseBase;
    }
    namespace Schemas {
        export interface AccessLogEntry {
            /**
             * When the request was made
             */
            timestamp?: string; // date-time
            /**
             * Environment (e.g., 'dev', 'prod')
             */
            environment?: string;
            /**
             * Service name (e.g., 'entity', 'metering')
             */
            service?: string;
            /**
             * Unique request identifier
             */
            request_id?: string;
            /**
             * HTTP method
             */
            method?: string;
            /**
             * Request path
             */
            path?: string;
            /**
             * HTTP status code
             */
            status?: number;
            /**
             * Response latency in milliseconds
             */
            response_latency_ms?: number;
            /**
             * Response body length in bytes
             */
            response_length?: number;
            /**
             * Access token identifier
             */
            token_id?: string;
            /**
             * Organization ID
             */
            org_id?: string;
            /**
             * Request origin header
             */
            origin?: string;
            /**
             * Client IP address
             */
            source_ip?: string;
        }
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
            /**
             * List of access token IDs to associate with this integration
             */
            access_token_ids?: string[];
            /**
             * Configuration defining environment variables needed by this integration
             */
            environment_config?: EnvironmentFieldConfig[];
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
            configuration?: /* Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings. */ OutboundIntegrationEventConfiguration;
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
        /**
         * Configuration for how the transformed event should be delivered
         */
        export interface DeliveryConfig {
            /**
             * Delivery mechanism type (currently only webhook is supported)
             */
            type: "webhook";
            /**
             * Reference to the webhook configuration in svc-webhooks
             */
            webhook_id: string;
            /**
             * Cached webhook name for display purposes
             */
            webhook_name?: string;
            /**
             * Cached webhook URL for display purposes
             */
            webhook_url?: string;
        }
        export interface EmbeddedInboundUseCaseRequest {
            /**
             * Optional use case ID for update matching.
             * - If provided and matches an existing use case, that use case is updated
             * - If provided but no match, a new use case with this ID is created
             * - If omitted, a new use case with auto-generated ID is created
             *
             */
            id?: string; // uuid
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
            /**
             * Use case type
             */
            type: "inbound";
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
        }
        export interface EmbeddedOutboundUseCaseRequest {
            /**
             * Optional use case ID for update matching.
             * - If provided and matches an existing use case, that use case is updated
             * - If provided but no match, a new use case with this ID is created
             * - If omitted, a new use case with auto-generated ID is created
             *
             */
            id?: string; // uuid
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
            /**
             * Use case type
             */
            type: "outbound";
            configuration?: /* Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings. */ OutboundIntegrationEventConfiguration;
        }
        export type EmbeddedUseCaseRequest = EmbeddedInboundUseCaseRequest | EmbeddedOutboundUseCaseRequest;
        export interface EmbeddedUseCaseRequestBase {
            /**
             * Optional use case ID for update matching.
             * - If provided and matches an existing use case, that use case is updated
             * - If provided but no match, a new use case with this ID is created
             * - If omitted, a new use case with auto-generated ID is created
             *
             */
            id?: string; // uuid
            /**
             * Use case name
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            enabled: boolean;
            /**
             * Optional description of this change (like a commit message)
             */
            change_description?: string;
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
        export interface EnvironmentFieldConfig {
            /**
             * Environment variable key, used to look up the value in the Environments API.
             */
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            /**
             * Display label for the field in the UI
             */
            label: string;
            /**
             * Whether the value is a plain string or an encrypted secret
             */
            type: "String" | "SecretString";
            /**
             * Help text shown below the field
             */
            description?: string;
            /**
             * Whether this field must be filled before the integration can be used
             */
            required?: boolean;
            /**
             * Sort order for display and drag-to-reorder
             */
            order?: number;
        }
        export interface ErpEvent {
            /**
             * Type of event (create, update, delete)
             */
            event_type: "CREATE" | "UPDATE" | "DELETE";
            /**
             * Type of the object being updated (business_partner, contract_account, etc.). Corresponds to "Event Name" from the integration UI.
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
        export interface ErpEventV3 {
            /**
             * Name of the event (e.g., business_partner, contract_account). Corresponds to the "Event Name" from the integration UI. Replaces object_type from V2.
             */
            event_name: string;
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
             * evt-2025-05-01-12345-bp
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
        export interface ErpUpdatesEventsV3Request {
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
            events: ErpEventV3[];
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
        export interface GetMonitoringStatsRequest {
            /**
             * Start date for statistics period (inclusive)
             * example:
             * 2025-01-01T00:00:00Z
             */
            from_date?: string; // date-time
            /**
             * End date for statistics period (inclusive)
             * example:
             * 2025-01-31T23:59:59Z
             */
            to_date?: string; // date-time
            /**
             * Fields to group inbound statistics by
             * example:
             * [
             *   "use_case_id",
             *   "status"
             * ]
             */
            inbound_group_by?: ("use_case_id" | "sync_type" | "status" | "error_category" | "object_type" | "event_name" | "date")[];
            /**
             * Fields to group outbound statistics by
             * example:
             * [
             *   "event_name",
             *   "status"
             * ]
             */
            outbound_group_by?: ("event_name" | "status" | "webhook_config_id" | "date")[];
        }
        export interface GetMonitoringTimeSeriesRequest {
            /**
             * Start date for the time series (inclusive)
             * example:
             * 2025-01-01T00:00:00Z
             */
            from_date: string; // date-time
            /**
             * End date for the time series (inclusive). Defaults to current time if not specified.
             * example:
             * 2025-01-31T23:59:59Z
             */
            to_date?: string; // date-time
            /**
             * The time bucket interval for aggregation
             * example:
             * 1h
             */
            interval: "5m" | "10m" | "30m" | "1h" | "3h" | "1d";
            /**
             * Filter by event direction. Defaults to both.
             * example:
             * both
             */
            direction?: "inbound" | "outbound" | "both";
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
        export interface InboundMonitoringEvent {
            /**
             * Organization ID
             */
            org_id: string;
            /**
             * Unique event identifier
             */
            event_id: string;
            /**
             * Correlation ID for tracing related events
             */
            correlation_id?: string | null;
            /**
             * Integration ID
             */
            integration_id?: string | null;
            /**
             * Use case ID
             */
            use_case_id?: string | null;
            /**
             * Type of event (optional for V3 events)
             */
            event_type?: "CREATE" | "UPDATE" | "DELETE" | "TRIGGER";
            /**
             * Type of object being synced (e.g., 'contract', 'meter')
             */
            object_type: string;
            /**
             * Type of sync operation
             */
            sync_type: "entity" | "meter_reading" | "webhook" | "api_deprecation";
            /**
             * Processing status
             */
            status: "success" | "error" | "skipped" | "warning";
            /**
             * Error code (when status=error)
             */
            error_code?: string | null;
            /**
             * Error message (when status=error)
             */
            error_message?: string | null;
            /**
             * Error category (when status=error)
             */
            error_category?: "validation" | "configuration" | "downstream_api" | "timeout" | "system";
            /**
             * Processing duration in milliseconds
             */
            processing_duration_ms?: number | null;
            /**
             * When the event was received
             */
            received_at: string; // date-time
            /**
             * When processing completed
             */
            completed_at: string; // date-time
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
            type: "inbound" | "outbound" | "inbound";
            enabled: boolean;
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
            configuration?: /* Configuration for inbound use cases (ERP to epilot) */ InboundIntegrationEventConfiguration;
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
             * List of access token IDs associated with this integration
             */
            access_token_ids?: string[];
            /**
             * Configuration defining environment variables needed by this integration. Values are stored in the Environments API.
             */
            environment_config?: EnvironmentFieldConfig[];
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
             * Array of attribute names that uniquely identify this entity.
             * The _type hint for repeatable fields (e.g., email, phone) should be specified
             * on the corresponding field definition in the fields array.
             *
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
             * Operation mode for entity mapping:
             * - 'upsert': Create or update the entity (default)
             * - 'delete': Soft delete the entity (marks as deleted)
             * - 'purge': Hard delete the entity (permanent removal)
             * - 'upsert-prune-scope-purge': Upsert entities from array, then purge entities in scope that weren't upserted
             * - 'upsert-prune-scope-delete': Upsert entities from array, then soft delete entities in scope that weren't upserted
             *
             */
            mode?: "upsert" | "delete" | "purge" | "upsert-prune-scope-purge" | "upsert-prune-scope-delete";
            scope?: /**
             * Scope configuration for upsert-prune-scope modes.
             * Defines how to find entities that should be pruned if not in the upsert payload.
             * The scope is resolved against the original event payload (not individual array items).
             *
             */
            PruneScopeConfig;
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
            _type?: /**
             * Type hint for repeatable fields that require special search handling.
             * These fields are stored as arrays of objects (e.g., email: [{ email: "value" }]).
             *
             */
            RepeatableFieldType;
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
             * Optional JSONata expression to extract meter reading items from the event data.
             * If not provided, the entire payload is used as the reading data.
             * Useful when you need to extract an array of readings from a nested structure (e.g., "$.readings").
             *
             */
            jsonataExpression?: string;
            /**
             * Strategy for matching incoming readings against existing readings.
             * - 'external_id': Match readings by external_id attribute (default behavior)
             * - 'strict-date': Match by meter_id + counter_id + direction + date (German timezone).
             *   Useful when readings originate from ECP and are echoed back by the ERP with truncated timestamps.
             *
             */
            reading_matching?: "external_id" | "strict-date";
            /**
             * Operation mode for meter reading mapping:
             * - 'upsert': Create or update meter readings (default)
             * - 'delete': Delete the meter reading
             * - 'upsert-prune-scope': Upsert readings from array, then delete all other readings for the same meter+counter that weren't upserted
             *
             */
            mode?: "upsert" | "delete" | "upsert-prune-scope";
            scope?: /**
             * Scope configuration for meter reading upsert-prune-scope mode.
             * The scope is all readings for the same meter + counter.
             *
             */
            MeterReadingPruneScopeConfig;
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
        /**
         * Integration with embedded use cases for atomic CRUD operations
         */
        export interface IntegrationWithUseCases {
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
             * List of access token IDs associated with this integration
             */
            access_token_ids?: string[];
            /**
             * All use cases belonging to this integration
             */
            use_cases: UseCase[];
            /**
             * ISO-8601 timestamp when the integration was created
             */
            created_at: string; // date-time
            /**
             * ISO-8601 timestamp when the integration was last updated
             */
            updated_at: string; // date-time
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
        /**
         * Scope configuration for meter reading upsert-prune-scope mode.
         * The scope is all readings for the same meter + counter.
         *
         */
        export interface MeterReadingPruneScopeConfig {
            /**
             * Optional source filter. When set, only readings with this source
             * are eligible for pruning (e.g., 'ERP' to only prune ERP-synced readings).
             *
             */
            source?: string;
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
             * Meter reading attributes. Required: external_id, timestamp, source, value. `source` must be one of: ECP, ERP, 360, journey-submission. `reason` (optional) must be one of: regular, irregular, last, first, meter_change, contract_change, meter_adjustment (or empty/null).
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
        export interface MonitoringStats {
            /**
             * Statistics for inbound (ERP sync) events
             */
            inbound: {
                /**
                 * Total number of inbound events in the period
                 */
                total_events: number;
                /**
                 * Total number of unique correlation IDs
                 */
                total_correlations?: number;
                /**
                 * Number of successful events
                 */
                success_count: number;
                /**
                 * Number of failed events
                 */
                error_count: number;
                /**
                 * Number of skipped events
                 */
                skipped_count: number;
                /**
                 * Number of warning events
                 */
                warning_count?: number;
                /**
                 * Success rate as percentage (0-100)
                 */
                success_rate?: number; // float
                /**
                 * Timestamp of the most recent error
                 */
                last_error_at?: string | null; // date-time
                /**
                 * Statistics breakdown by requested inbound_group_by fields
                 */
                breakdown?: {
                    [name: string]: any;
                }[];
            };
            /**
             * Statistics for outbound (webhook delivery) events
             */
            outbound: {
                /**
                 * Total number of outbound events in the period
                 */
                total_events: number;
                /**
                 * Number of successful deliveries
                 */
                success_count: number;
                /**
                 * Number of failed deliveries
                 */
                error_count: number;
                /**
                 * Number of pending deliveries
                 */
                pending_count?: number;
                /**
                 * Success rate as percentage (0-100)
                 */
                success_rate?: number; // float
                /**
                 * Timestamp of the most recent error
                 */
                last_error_at?: string | null; // date-time
                /**
                 * Statistics breakdown by requested outbound_group_by fields
                 */
                breakdown?: {
                    [name: string]: any;
                }[];
            };
        }
        export interface OutboundConflict {
            /**
             * Type of conflict:
             * - 'event_disabled': Event catalog event is disabled while use case is enabled
             * - 'all_webhooks_disabled': All webhooks are disabled while use case is enabled
             * - 'event_enabled_while_disabled': Event is enabled while use case is disabled
             * - 'webhook_enabled_while_disabled': A webhook is enabled while use case is disabled
             *
             */
            type: "event_disabled" | "all_webhooks_disabled" | "event_enabled_while_disabled" | "webhook_enabled_while_disabled";
            /**
             * Webhook ID (only present for webhook_enabled_while_disabled conflicts)
             */
            webhookId?: string;
            /**
             * Human-readable description of the conflict
             */
            message: string;
        }
        /**
         * Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings.
         */
        export interface OutboundIntegrationEventConfiguration {
            /**
             * The Event Catalog event name that triggers this outbound flow
             * example:
             * contract.created
             */
            event_catalog_event: string;
            /**
             * List of mappings that transform and deliver the event
             */
            mappings: [
                /* A mapping that transforms an event and delivers it to a webhook */ OutboundMapping,
                .../* A mapping that transforms an event and delivers it to a webhook */ OutboundMapping[]
            ];
        }
        /**
         * A mapping that transforms an event and delivers it to a webhook
         */
        export interface OutboundMapping {
            /**
             * Unique identifier for this mapping
             */
            id: string; // uuid
            /**
             * Human-readable name for this mapping
             * example:
             * ERP Contract Sync
             */
            name: string;
            /**
             * JSONata expression to transform the event payload
             * example:
             * { "id": entity._id, "customer": entity.customer_name }
             */
            jsonata_expression: string;
            /**
             * Whether this mapping is active
             */
            enabled: boolean;
            delivery: /* Configuration for how the transformed event should be delivered */ DeliveryConfig;
            /**
             * Timestamp when the mapping was created
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the mapping was last updated
             */
            updated_at?: string; // date-time
        }
        export interface OutboundMonitoringEvent {
            /**
             * Organization ID
             */
            org_id: string;
            /**
             * Unique event identifier
             */
            event_id: string;
            /**
             * Event name (event_catalog_event)
             */
            event_name: string;
            /**
             * Delivery status
             */
            status: "succeeded" | "failed" | "pending";
            /**
             * Target URL
             */
            url?: string;
            /**
             * HTTP method used (e.g., POST)
             */
            http_method?: string;
            /**
             * HTTP response details (status_code, message, headers)
             */
            http_response?: {
                [name: string]: any;
            };
            /**
             * Webhook configuration ID
             */
            webhook_config_id?: string;
            /**
             * Additional metadata (webhook_id, organization details, correlation_id, etc.)
             */
            metadata?: {
                [name: string]: any;
            };
            /**
             * Execution context (execution_arn, state_machine_arn, etc.)
             */
            execution_context?: {
                [name: string]: any;
            };
            /**
             * Payload that was sent
             */
            payload?: {
                [name: string]: any;
            };
            /**
             * When the event was created
             */
            created_at: string; // date-time
            /**
             * When the event was last updated
             */
            updated_at?: string; // date-time
        }
        export interface OutboundStatusResponse {
            useCases: OutboundUseCaseStatus[];
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
            type: "inbound" | "outbound" | "outbound";
            enabled: boolean;
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
            configuration?: /* Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings. */ OutboundIntegrationEventConfiguration;
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
            configuration?: /* Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings. */ OutboundIntegrationEventConfiguration;
        }
        export interface OutboundUseCaseStatus {
            /**
             * Unique identifier for the use case
             */
            useCaseId: string; // uuid
            /**
             * Human-readable name of the use case
             */
            name: string;
            /**
             * Whether the use case is enabled
             */
            useCaseEnabled: boolean;
            /**
             * The Event Catalog event name that triggers this outbound flow
             * example:
             * contract.created
             */
            eventCatalogEvent?: string;
            /**
             * Whether the event is enabled in Event Catalog. Null if the API is unreachable.
             */
            eventEnabled?: boolean | null;
            webhooks?: WebhookStatus[];
            /**
             * Overall status of the use case:
             * - 'ok': Use case is enabled and all dependencies are properly configured
             * - 'conflict': Use case has configuration issues (disabled events/webhooks while enabled)
             * - 'disabled': Use case is disabled
             *
             */
            status: "ok" | "conflict" | "disabled";
            /**
             * List of detected conflicts, if any
             */
            conflicts?: OutboundConflict[];
        }
        /**
         * Scope configuration for upsert-prune-scope modes.
         * Defines how to find entities that should be pruned if not in the upsert payload.
         * The scope is resolved against the original event payload (not individual array items).
         *
         */
        export interface PruneScopeConfig {
            /**
             * Scope mode for finding entities to prune:
             * - 'relations': Find scope by looking at all entities related to a specific entity (both direct and reverse relations)
             * - 'query': Find scope entities directly via query parameters
             *
             */
            scope_mode: "relations" | "query";
            /**
             * For 'relations' mode: The schema of the entity to find (e.g., 'billing_account').
             * Not used for 'query' mode.
             *
             */
            schema?: string;
            /**
             * For 'relations' mode: How to identify the scope entity from the payload.
             * Not used for 'query' mode.
             *
             */
            unique_ids?: RelationUniqueIdField[];
            /**
             * For 'query' mode: Direct query parameters to find scope entities.
             * Not used for 'relations' or 'reverse-relations' modes.
             *
             */
            query?: RelationUniqueIdField[];
        }
        export interface QueryAccessLogsRequest {
            /**
             * Filter by a specific access token ID (e.g., 'api_5ZugdRXasLfWBypHi93Fk').
             * Must be one of the access_token_ids linked to the integration.
             * If omitted, returns logs for all access tokens linked to the integration.
             *
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            token_id?: string;
            /**
             * Filter by service name (e.g., 'entity', 'metering', 'submission-api')
             * example:
             * entity
             */
            service?: string;
            /**
             * Filter by HTTP method
             */
            method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
            /**
             * Filter by request path (partial match)
             * example:
             * /v1/entity
             */
            path?: string;
            /**
             * Filter by HTTP status code
             * example:
             * 200
             */
            status?: number;
            /**
             * Filter logs from this date (inclusive)
             * example:
             * 2025-01-01T00:00:00Z
             */
            from_date?: string; // date-time
            /**
             * Filter logs until this date (inclusive)
             * example:
             * 2025-01-31T23:59:59Z
             */
            to_date?: string; // date-time
            /**
             * Maximum number of results to return
             * example:
             * 50
             */
            limit?: number;
            /**
             * Cursor for pagination (infinite scroll)
             */
            cursor?: {
                /**
                 * Timestamp from the last log entry in the previous page
                 */
                timestamp?: string; // date-time
                /**
                 * Request ID from the last log entry in the previous page
                 */
                request_id?: string;
            };
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
             * Filter by event name (alias for object_type)
             */
            event_name?: string;
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
        export interface QueryInboundMonitoringEventsRequest {
            /**
             * Filter by use case ID
             */
            use_case_id?: string; // uuid
            /**
             * Filter by event type
             */
            event_type?: "CREATE" | "UPDATE" | "DELETE" | "TRIGGER";
            /**
             * Filter by sync type
             */
            sync_type?: "entity" | "meter_reading" | "webhook" | "api_deprecation";
            /**
             * Filter by processing status
             */
            status?: "success" | "error" | "skipped" | "warning";
            /**
             * Filter by error category (only applicable when status=error)
             */
            error_category?: "validation" | "configuration" | "downstream_api" | "timeout" | "system";
            /**
             * Filter by correlation ID
             */
            correlation_id?: string;
            /**
             * Filter by object type (e.g., 'contract', 'meter')
             */
            object_type?: string;
            /**
             * Filter by event name (alias for object_type)
             */
            event_name?: string;
            /**
             * Filter by event ID to find a specific event
             */
            event_id?: string;
            /**
             * Filter events from this date (inclusive)
             * example:
             * 2025-01-01T00:00:00Z
             */
            from_date?: string; // date-time
            /**
             * Filter events until this date (inclusive)
             * example:
             * 2025-01-31T23:59:59Z
             */
            to_date?: string; // date-time
            /**
             * Maximum number of results to return
             * example:
             * 50
             */
            limit?: number;
            /**
             * Cursor for pagination
             */
            cursor?: {
                /**
                 * Timestamp from the last event in the previous page
                 */
                completed_at?: string; // date-time
                /**
                 * Event ID from the last event in the previous page
                 */
                event_id?: string;
            };
        }
        export interface QueryOutboundMonitoringEventsRequest {
            /**
             * Filter by event name (event_catalog_event). If not specified, returns events for all linked event names in the integration's outbound use cases.
             * example:
             * automation_flow_target
             */
            event_name?: string;
            /**
             * Filter by delivery status
             */
            status?: "succeeded" | "failed" | "pending";
            /**
             * Filter by webhook configuration ID
             */
            webhook_config_id?: string;
            /**
             * Filter events from this date (inclusive)
             * example:
             * 2025-01-01T00:00:00Z
             */
            from_date?: string; // date-time
            /**
             * Filter events until this date (inclusive)
             * example:
             * 2025-01-31T23:59:59Z
             */
            to_date?: string; // date-time
            /**
             * Maximum number of results to return
             * example:
             * 50
             */
            limit?: number;
            /**
             * Cursor for pagination
             */
            cursor?: {
                /**
                 * Timestamp from the last event in the previous page
                 */
                created_at?: string; // date-time
                /**
                 * Event ID from the last event in the previous page
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
            _type?: /**
             * Type hint for repeatable fields that require special search handling.
             * These fields are stored as arrays of objects (e.g., email: [{ email: "value" }]).
             *
             */
            RepeatableFieldType;
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
         * Type hint for repeatable fields that require special search handling.
         * These fields are stored as arrays of objects (e.g., email: [{ email: "value" }]).
         *
         */
        export type RepeatableFieldType = "email" | "phone";
        export interface ReplayEventsRequest {
            /**
             * List of event IDs to replay. Maximum 100 events per request.
             */
            event_ids: [
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
        export interface TimeSeriesBucket {
            /**
             * The start timestamp of the bucket
             */
            timestamp: string; // date-time
            /**
             * Inbound event counts for this bucket. Null when direction is outbound.
             */
            inbound?: {
                success_count?: number;
                error_count?: number;
                warning_count?: number;
                skipped_count?: number;
                total_count?: number;
            } | null;
            /**
             * Outbound event counts for this bucket. Null when direction is inbound.
             */
            outbound?: {
                success_count?: number;
                error_count?: number;
                pending_count?: number;
                total_count?: number;
            } | null;
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
            /**
             * List of access token IDs to associate with this integration
             */
            access_token_ids?: string[];
            /**
             * Configuration defining environment variables needed by this integration
             */
            environment_config?: EnvironmentFieldConfig[];
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
            configuration?: /* Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings. */ OutboundIntegrationEventConfiguration;
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
        /**
         * Request to create or update an integration with embedded use cases (upsert).
         * This is a declarative operation - the request represents the desired state.
         *
         */
        export interface UpsertIntegrationWithUseCasesRequest {
            /**
             * Integration name
             */
            name: string;
            /**
             * Optional description of the integration
             */
            description?: string;
            /**
             * List of access token IDs to associate with this integration
             */
            access_token_ids?: string[];
            /**
             * Full list of use cases (declarative). This replaces ALL existing use cases.
             * - Use cases with an `id` field matching an existing use case will be updated
             * - Use cases without an `id` or with a non-matching `id` will be created
             * - Existing use cases not in this list will be deleted
             *
             */
            use_cases?: EmbeddedUseCaseRequest[];
        }
        export type UseCase = InboundUseCase | OutboundUseCase;
        export interface UseCaseBase {
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
            enabled: boolean;
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
        export interface WebhookStatus {
            /**
             * Unique identifier for the webhook
             */
            webhookId: string;
            /**
             * Human-readable name of the webhook
             */
            webhookName?: string;
            /**
             * Whether the webhook is enabled. Null if the API is unreachable.
             */
            enabled?: boolean | null;
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
    namespace CreateIntegrationV2 {
        export type RequestBody = /**
         * Request to create or update an integration with embedded use cases (upsert).
         * This is a declarative operation - the request represents the desired state.
         *
         */
        Components.Schemas.UpsertIntegrationWithUseCasesRequest;
        namespace Responses {
            export type $201 = /* Integration with embedded use cases for atomic CRUD operations */ Components.Schemas.IntegrationWithUseCases;
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
    namespace DeleteIntegrationV2 {
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
    namespace GetIntegrationV2 {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        namespace Responses {
            export type $200 = /* Integration with embedded use cases for atomic CRUD operations */ Components.Schemas.IntegrationWithUseCases;
            export type $401 = Components.Responses.Unauthorized;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMonitoringStats {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.GetMonitoringStatsRequest;
        namespace Responses {
            export type $200 = Components.Responses.GetMonitoringStatsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMonitoringTimeSeries {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.GetMonitoringTimeSeriesRequest;
        namespace Responses {
            export type $200 = Components.Responses.GetMonitoringTimeSeriesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetOutboundStatus {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OutboundStatusResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
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
    namespace ListIntegrationsV2 {
        namespace Responses {
            export interface $200 {
                integrations: /* Integration with embedded use cases for atomic CRUD operations */ Components.Schemas.IntegrationWithUseCases[];
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
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ProcessErpUpdatesEventsV2 {
        export type RequestBody = Components.Schemas.ErpUpdatesEventsV2Request;
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ProcessErpUpdatesEventsV3 {
        export type RequestBody = Components.Schemas.ErpUpdatesEventsV3Request;
        namespace Responses {
            export type $200 = Components.Responses.ERPUpdatesResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace QueryAccessLogs {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.QueryAccessLogsRequest;
        namespace Responses {
            export type $200 = Components.Responses.QueryAccessLogsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
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
    namespace QueryInboundMonitoringEvents {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.QueryInboundMonitoringEventsRequest;
        namespace Responses {
            export type $200 = Components.Responses.QueryInboundMonitoringEventsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace QueryOutboundMonitoringEvents {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.QueryOutboundMonitoringEventsRequest;
        namespace Responses {
            export type $200 = Components.Responses.QueryOutboundMonitoringEventsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ReplayEvents {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.ReplayEventsRequest;
        namespace Responses {
            export type $200 = Components.Responses.ReplayEventsResponse;
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
    namespace UpdateIntegrationV2 {
        namespace Parameters {
            export type IntegrationId = string; // uuid
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId /* uuid */;
        }
        export type RequestBody = /**
         * Request to create or update an integration with embedded use cases (upsert).
         * This is a declarative operation - the request represents the desired state.
         *
         */
        Components.Schemas.UpsertIntegrationWithUseCasesRequest;
        namespace Responses {
            export type $200 = /* Integration with embedded use cases for atomic CRUD operations */ Components.Schemas.IntegrationWithUseCases;
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
   * processErpUpdatesEventsV3 - processErpUpdatesEventsV3
   * 
   * Handles updates from ERP systems using integration_id directly.
   * This is the v3 version that removes the unused event_type field and renames object_type to event_name
   * to align with the integration UI naming.
   * 
   */
  'processErpUpdatesEventsV3'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProcessErpUpdatesEventsV3.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProcessErpUpdatesEventsV3.Responses.$200>
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
   * replayEvents - replayEvents
   * 
   * Replay one or more events for a specific integration. Events will be re-processed with their original payloads but with a new correlation ID for traceability.
   */
  'replayEvents'(
    parameters?: Parameters<Paths.ReplayEvents.PathParameters> | null,
    data?: Paths.ReplayEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplayEvents.Responses.$200>
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
   * listIntegrationsV2 - listIntegrationsV2
   * 
   * Retrieve all integrations with embedded use cases for the authenticated organization
   */
  'listIntegrationsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListIntegrationsV2.Responses.$200>
  /**
   * createIntegrationV2 - createIntegrationV2
   * 
   * Create a new integration with embedded use cases.
   * 
   */
  'createIntegrationV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateIntegrationV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateIntegrationV2.Responses.$201>
  /**
   * getIntegrationV2 - getIntegrationV2
   * 
   * Retrieve a specific integration with all its embedded use cases
   */
  'getIntegrationV2'(
    parameters?: Parameters<Paths.GetIntegrationV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetIntegrationV2.Responses.$200>
  /**
   * updateIntegrationV2 - updateIntegrationV2
   * 
   * Update an existing integration with embedded use cases.
   * The integration must already exist.
   * Use cases are updated declaratively:
   * - Use cases in the request with matching IDs are updated
   * - Use cases in the request without matching IDs are created
   * - Existing use cases not in the request are deleted
   * 
   */
  'updateIntegrationV2'(
    parameters?: Parameters<Paths.UpdateIntegrationV2.PathParameters> | null,
    data?: Paths.UpdateIntegrationV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIntegrationV2.Responses.$200>
  /**
   * deleteIntegrationV2 - deleteIntegrationV2
   * 
   * Delete an integration and all its use cases
   */
  'deleteIntegrationV2'(
    parameters?: Parameters<Paths.DeleteIntegrationV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIntegrationV2.Responses.$200>
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
  /**
   * queryInboundMonitoringEvents - queryInboundMonitoringEvents
   * 
   * Query inbound monitoring events for a specific integration.
   * Returns detailed information about inbound sync events from ERP systems,
   * including success rates, error breakdowns, and processing metrics.
   * 
   */
  'queryInboundMonitoringEvents'(
    parameters?: Parameters<Paths.QueryInboundMonitoringEvents.PathParameters> | null,
    data?: Paths.QueryInboundMonitoringEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryInboundMonitoringEvents.Responses.$200>
  /**
   * getMonitoringStats - getMonitoringStats
   * 
   * Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.
   * Returns summary metrics for inbound (ERP sync) and outbound (webhook delivery) events,
   * including success/error counts and optional breakdowns.
   * 
   */
  'getMonitoringStats'(
    parameters?: Parameters<Paths.GetMonitoringStats.PathParameters> | null,
    data?: Paths.GetMonitoringStats.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMonitoringStats.Responses.$200>
  /**
   * getMonitoringTimeSeries - getMonitoringTimeSeries
   * 
   * Get time-series aggregated event counts for monitoring charts.
   * Returns pre-bucketed counts at configurable intervals for both inbound and outbound events.
   * Maximum of 200 buckets per request. Returns 400 if the time range and interval would exceed this limit.
   * 
   */
  'getMonitoringTimeSeries'(
    parameters?: Parameters<Paths.GetMonitoringTimeSeries.PathParameters> | null,
    data?: Paths.GetMonitoringTimeSeries.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMonitoringTimeSeries.Responses.$200>
  /**
   * getOutboundStatus - getOutboundStatus
   * 
   * Get the status of all outbound use cases for a specific integration.
   * Returns conflict information when events or webhooks are disabled but the use case is enabled.
   * 
   */
  'getOutboundStatus'(
    parameters?: Parameters<Paths.GetOutboundStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOutboundStatus.Responses.$200>
  /**
   * queryAccessLogs - queryAccessLogs
   * 
   * Query API access logs for a specific integration's organization.
   * Returns access token usage analytics filtered by user_id (access token).
   * Supports infinite scroll pagination with cursor-based navigation.
   * 
   */
  'queryAccessLogs'(
    parameters?: Parameters<Paths.QueryAccessLogs.PathParameters> | null,
    data?: Paths.QueryAccessLogs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryAccessLogs.Responses.$200>
  /**
   * queryOutboundMonitoringEvents - queryOutboundMonitoringEvents
   * 
   * Query outbound monitoring events for a specific integration.
   * Returns detailed information about outbound event deliveries,
   * filtered by event_name (event_catalog_event) linked to the integration's outbound use cases.
   * 
   */
  'queryOutboundMonitoringEvents'(
    parameters?: Parameters<Paths.QueryOutboundMonitoringEvents.PathParameters> | null,
    data?: Paths.QueryOutboundMonitoringEvents.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryOutboundMonitoringEvents.Responses.$200>
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
  ['/v3/erp/updates/events']: {
    /**
     * processErpUpdatesEventsV3 - processErpUpdatesEventsV3
     * 
     * Handles updates from ERP systems using integration_id directly.
     * This is the v3 version that removes the unused event_type field and renames object_type to event_name
     * to align with the integration UI naming.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProcessErpUpdatesEventsV3.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProcessErpUpdatesEventsV3.Responses.$200>
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
  ['/v1/integrations/{integrationId}/events/replay']: {
    /**
     * replayEvents - replayEvents
     * 
     * Replay one or more events for a specific integration. Events will be re-processed with their original payloads but with a new correlation ID for traceability.
     */
    'post'(
      parameters?: Parameters<Paths.ReplayEvents.PathParameters> | null,
      data?: Paths.ReplayEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplayEvents.Responses.$200>
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
  ['/v2/integrations']: {
    /**
     * listIntegrationsV2 - listIntegrationsV2
     * 
     * Retrieve all integrations with embedded use cases for the authenticated organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListIntegrationsV2.Responses.$200>
    /**
     * createIntegrationV2 - createIntegrationV2
     * 
     * Create a new integration with embedded use cases.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateIntegrationV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateIntegrationV2.Responses.$201>
  }
  ['/v2/integrations/{integrationId}']: {
    /**
     * getIntegrationV2 - getIntegrationV2
     * 
     * Retrieve a specific integration with all its embedded use cases
     */
    'get'(
      parameters?: Parameters<Paths.GetIntegrationV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetIntegrationV2.Responses.$200>
    /**
     * updateIntegrationV2 - updateIntegrationV2
     * 
     * Update an existing integration with embedded use cases.
     * The integration must already exist.
     * Use cases are updated declaratively:
     * - Use cases in the request with matching IDs are updated
     * - Use cases in the request without matching IDs are created
     * - Existing use cases not in the request are deleted
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateIntegrationV2.PathParameters> | null,
      data?: Paths.UpdateIntegrationV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIntegrationV2.Responses.$200>
    /**
     * deleteIntegrationV2 - deleteIntegrationV2
     * 
     * Delete an integration and all its use cases
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteIntegrationV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIntegrationV2.Responses.$200>
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
  ['/v1/integrations/{integrationId}/monitoring/inbound-events']: {
    /**
     * queryInboundMonitoringEvents - queryInboundMonitoringEvents
     * 
     * Query inbound monitoring events for a specific integration.
     * Returns detailed information about inbound sync events from ERP systems,
     * including success rates, error breakdowns, and processing metrics.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.QueryInboundMonitoringEvents.PathParameters> | null,
      data?: Paths.QueryInboundMonitoringEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryInboundMonitoringEvents.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/monitoring/stats']: {
    /**
     * getMonitoringStats - getMonitoringStats
     * 
     * Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.
     * Returns summary metrics for inbound (ERP sync) and outbound (webhook delivery) events,
     * including success/error counts and optional breakdowns.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GetMonitoringStats.PathParameters> | null,
      data?: Paths.GetMonitoringStats.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMonitoringStats.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/monitoring/timeseries']: {
    /**
     * getMonitoringTimeSeries - getMonitoringTimeSeries
     * 
     * Get time-series aggregated event counts for monitoring charts.
     * Returns pre-bucketed counts at configurable intervals for both inbound and outbound events.
     * Maximum of 200 buckets per request. Returns 400 if the time range and interval would exceed this limit.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GetMonitoringTimeSeries.PathParameters> | null,
      data?: Paths.GetMonitoringTimeSeries.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMonitoringTimeSeries.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/outbound-status']: {
    /**
     * getOutboundStatus - getOutboundStatus
     * 
     * Get the status of all outbound use cases for a specific integration.
     * Returns conflict information when events or webhooks are disabled but the use case is enabled.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetOutboundStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOutboundStatus.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/monitoring/access-logs']: {
    /**
     * queryAccessLogs - queryAccessLogs
     * 
     * Query API access logs for a specific integration's organization.
     * Returns access token usage analytics filtered by user_id (access token).
     * Supports infinite scroll pagination with cursor-based navigation.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.QueryAccessLogs.PathParameters> | null,
      data?: Paths.QueryAccessLogs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryAccessLogs.Responses.$200>
  }
  ['/v1/integrations/{integrationId}/monitoring/outbound-events']: {
    /**
     * queryOutboundMonitoringEvents - queryOutboundMonitoringEvents
     * 
     * Query outbound monitoring events for a specific integration.
     * Returns detailed information about outbound event deliveries,
     * filtered by event_name (event_catalog_event) linked to the integration's outbound use cases.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.QueryOutboundMonitoringEvents.PathParameters> | null,
      data?: Paths.QueryOutboundMonitoringEvents.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryOutboundMonitoringEvents.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AccessLogEntry = Components.Schemas.AccessLogEntry;
export type CreateInboundUseCaseRequest = Components.Schemas.CreateInboundUseCaseRequest;
export type CreateIntegrationRequest = Components.Schemas.CreateIntegrationRequest;
export type CreateOutboundUseCaseRequest = Components.Schemas.CreateOutboundUseCaseRequest;
export type CreateUseCaseRequest = Components.Schemas.CreateUseCaseRequest;
export type CreateUseCaseRequestBase = Components.Schemas.CreateUseCaseRequestBase;
export type DeleteIntegrationAppMappingRequest = Components.Schemas.DeleteIntegrationAppMappingRequest;
export type DeliveryConfig = Components.Schemas.DeliveryConfig;
export type EmbeddedInboundUseCaseRequest = Components.Schemas.EmbeddedInboundUseCaseRequest;
export type EmbeddedOutboundUseCaseRequest = Components.Schemas.EmbeddedOutboundUseCaseRequest;
export type EmbeddedUseCaseRequest = Components.Schemas.EmbeddedUseCaseRequest;
export type EmbeddedUseCaseRequestBase = Components.Schemas.EmbeddedUseCaseRequestBase;
export type EntityUpdate = Components.Schemas.EntityUpdate;
export type EnvironmentFieldConfig = Components.Schemas.EnvironmentFieldConfig;
export type ErpEvent = Components.Schemas.ErpEvent;
export type ErpEventV3 = Components.Schemas.ErpEventV3;
export type ErpUpdatesEventsV2Request = Components.Schemas.ErpUpdatesEventsV2Request;
export type ErpUpdatesEventsV3Request = Components.Schemas.ErpUpdatesEventsV3Request;
export type ErrorResponseBase = Components.Schemas.ErrorResponseBase;
export type GetMonitoringStatsRequest = Components.Schemas.GetMonitoringStatsRequest;
export type GetMonitoringTimeSeriesRequest = Components.Schemas.GetMonitoringTimeSeriesRequest;
export type InboundIntegrationEventConfiguration = Components.Schemas.InboundIntegrationEventConfiguration;
export type InboundMonitoringEvent = Components.Schemas.InboundMonitoringEvent;
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
export type IntegrationWithUseCases = Components.Schemas.IntegrationWithUseCases;
export type MappingSimulationRequest = Components.Schemas.MappingSimulationRequest;
export type MappingSimulationResponse = Components.Schemas.MappingSimulationResponse;
export type MappingSimulationV2Request = Components.Schemas.MappingSimulationV2Request;
export type MeterReadingPruneScopeConfig = Components.Schemas.MeterReadingPruneScopeConfig;
export type MeterReadingUpdate = Components.Schemas.MeterReadingUpdate;
export type MeterUniqueIdsConfig = Components.Schemas.MeterUniqueIdsConfig;
export type MonitoringStats = Components.Schemas.MonitoringStats;
export type OutboundConflict = Components.Schemas.OutboundConflict;
export type OutboundIntegrationEventConfiguration = Components.Schemas.OutboundIntegrationEventConfiguration;
export type OutboundMapping = Components.Schemas.OutboundMapping;
export type OutboundMonitoringEvent = Components.Schemas.OutboundMonitoringEvent;
export type OutboundStatusResponse = Components.Schemas.OutboundStatusResponse;
export type OutboundUseCase = Components.Schemas.OutboundUseCase;
export type OutboundUseCaseHistoryEntry = Components.Schemas.OutboundUseCaseHistoryEntry;
export type OutboundUseCaseStatus = Components.Schemas.OutboundUseCaseStatus;
export type PruneScopeConfig = Components.Schemas.PruneScopeConfig;
export type QueryAccessLogsRequest = Components.Schemas.QueryAccessLogsRequest;
export type QueryEventsRequest = Components.Schemas.QueryEventsRequest;
export type QueryInboundMonitoringEventsRequest = Components.Schemas.QueryInboundMonitoringEventsRequest;
export type QueryOutboundMonitoringEventsRequest = Components.Schemas.QueryOutboundMonitoringEventsRequest;
export type RelationConfig = Components.Schemas.RelationConfig;
export type RelationItemConfig = Components.Schemas.RelationItemConfig;
export type RelationRefItemConfig = Components.Schemas.RelationRefItemConfig;
export type RelationRefValueConfig = Components.Schemas.RelationRefValueConfig;
export type RelationRefsConfig = Components.Schemas.RelationRefsConfig;
export type RelationUniqueIdField = Components.Schemas.RelationUniqueIdField;
export type RepeatableFieldType = Components.Schemas.RepeatableFieldType;
export type ReplayEventsRequest = Components.Schemas.ReplayEventsRequest;
export type SetIntegrationAppMappingRequest = Components.Schemas.SetIntegrationAppMappingRequest;
export type TimeSeriesBucket = Components.Schemas.TimeSeriesBucket;
export type TriggerErpActionRequest = Components.Schemas.TriggerErpActionRequest;
export type TriggerWebhookResp = Components.Schemas.TriggerWebhookResp;
export type UpdateInboundUseCaseRequest = Components.Schemas.UpdateInboundUseCaseRequest;
export type UpdateIntegrationRequest = Components.Schemas.UpdateIntegrationRequest;
export type UpdateOutboundUseCaseRequest = Components.Schemas.UpdateOutboundUseCaseRequest;
export type UpdateUseCaseRequest = Components.Schemas.UpdateUseCaseRequest;
export type UpdateUseCaseRequestBase = Components.Schemas.UpdateUseCaseRequestBase;
export type UpsertIntegrationWithUseCasesRequest = Components.Schemas.UpsertIntegrationWithUseCasesRequest;
export type UseCase = Components.Schemas.UseCase;
export type UseCaseBase = Components.Schemas.UseCaseBase;
export type UseCaseHistoryEntry = Components.Schemas.UseCaseHistoryEntry;
export type UseCaseHistoryEntryBase = Components.Schemas.UseCaseHistoryEntryBase;
export type WebhookStatus = Components.Schemas.WebhookStatus;
