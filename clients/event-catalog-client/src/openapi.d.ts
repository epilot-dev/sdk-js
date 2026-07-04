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
         * A schema field representing file attachments associated with the event.
         * Present in schema_fields for events tagged with "attachment".
         *
         */
        export interface AttachmentField {
            items: /* A file attachment associated with an event */ EventAttachment;
            /**
             * Whether this field is required in the event payload
             */
            required?: boolean;
        }
        /**
         * Common metadata fields present in all event payloads
         * example:
         * {
         *   "_org_id": {
         *     "type": "string",
         *     "description": "epilot tenant/organization ID"
         *   },
         *   "_event_time": {
         *     "type": "string",
         *     "format": "date-time",
         *     "description": "ISO 8601 timestamp when event occurred"
         *   },
         *   "_event_id": {
         *     "type": "string",
         *     "description": "Unique event identifier (ULID)"
         *   },
         *   "_event_name": {
         *     "type": "string",
         *     "description": "Event name from catalog"
         *   },
         *   "_event_version": {
         *     "type": "string",
         *     "description": "Schema version number"
         *   },
         *   "_event_source": {
         *     "type": "string",
         *     "description": "Source that triggered the event"
         *   },
         *   "_ack_id": {
         *     "type": "string",
         *     "description": "Unique acknowledgment tracking ID for the event"
         *   }
         * }
         */
        export interface CommonEventMetadata {
        }
        export interface ContextEntity {
            /**
             * Schema slug of the context entity
             * example:
             * meter
             */
            entity_schema: string;
            /**
             * Whether this field is required in the event payload
             */
            required?: boolean;
        }
        /**
         * Configuration for triggering an event based on entity operations.
         *
         * When an entity operation matches the configured criteria, the event will be triggered.
         * - On createEntity: the attribute must be present in the entity payload
         * - On updateEntity: the attribute must be in diff.added, diff.updated, or diff.deleted
         * - On deleteEntity: the event triggers when the entity is deleted (attributes not checked)
         *
         */
        export interface EntityOperationTrigger {
            /**
             * List of entity operations that can trigger this event
             * example:
             * [
             *   "createEntity",
             *   "updateEntity"
             * ]
             */
            operation: ("createEntity" | "updateEntity" | "deleteEntity")[];
            /**
             * List of entity schema slugs that can trigger this event
             * example:
             * [
             *   "contact",
             *   "contract",
             *   "order"
             * ]
             */
            schema: string[];
            /**
             * Optional list of entity attributes to track for changes.
             * If specified, the event only triggers when these attributes are affected.
             * - On createEntity: attribute must be defined in the entity payload
             * - On updateEntity: attribute must be in diff.added, diff.updated, or diff.deleted
             * If not specified, all changes to matching entities will trigger the event.
             *
             * example:
             * [
             *   "email",
             *   "phone",
             *   "status"
             * ]
             */
            attribute?: string[];
            /**
             * Optional list of purpose names to filter by.
             * The entity must have at least one matching purpose in its _purpose array.
             * Purpose names are matched against the taxonomy classification names (e.g., "Kündigung", "Umzug/Auszug").
             * If not specified, the event triggers regardless of entity purpose.
             *
             * example:
             * [
             *   "Kündigung",
             *   "Umzug/Auszug"
             * ]
             */
            purpose?: string[];
        }
        /**
         * An event instance in the event history
         * example:
         * {
         *   "_org_id": "org_123456",
         *   "_event_time": "2024-01-01T12:00:00Z",
         *   "_event_id": "01FZ4Z5FZ5FZ5FZ5FZ5FZ5FZ5F",
         *   "_event_name": "MeterReading",
         *   "_event_version": "1.0",
         *   "_event_source": "api",
         *   "_trigger_source_type": "api",
         *   "_trigger_source": "user_123456",
         *   "reading_value": 123.45,
         *   "reading_date": "2024-01-01T11:59:00Z",
         *   "read_by": "John Doe",
         *   "reason": "regular",
         *   "direction": "feed-out",
         *   "source": "portal",
         *   "meter_id": "550e8400-e29b-41d4-a716-446655440000",
         *   "counter_id": "660e8400-e29b-41d4-a716-446655440000",
         *   "meter_number": "MT123456789",
         *   "obis_number": "1-0:1.8.0",
         *   "unit": "kWh",
         *   "customer_id": "770e8400-e29b-41d4-a716-446655440000",
         *   "contract_id": "880e8400-e29b-41d4-a716-446655440000"
         * }
         */
        export interface Event {
            [name: string]: any;
            /**
             * epilot tenant/organization ID
             */
            _org_id: string;
            /**
             * ISO 8601 timestamp when event occurred
             */
            _event_time: string; // date-time
            /**
             * Unique event identifier (ULID)
             */
            _event_id: string;
            /**
             * Event name from catalog
             */
            _event_name: string;
            /**
             * Event payload version (MAJOR.MINOR)
             * example:
             * 1.0
             */
            _event_version: string;
            /**
             * Source that triggered the event
             */
            _event_source: string;
            /**
             * The type of system that triggered the event.
             * Common values: api, automation, operation, portal_user
             *
             * example:
             * api
             */
            _trigger_source_type?: string;
            /**
             * Identifier of the specific trigger source.
             * - For api: User ID or API key identifier
             * - For automation: Automation execution ID
             * - For operation: Activity ID from the entity operation
             * - For portal_user: Portal user email
             *
             */
            _trigger_source?: string;
            /**
             * Unique acknowledgment tracking ID for the event.
             * Used to track event delivery and processing status.
             *
             */
            _ack_id?: string;
            /**
             * Inline downgrade chain stamped by Event Catalog at publish time, ordered newest-to-oldest. Present ONLY on multi-version events. Internal versioning transport: consumers (e.g. svc-webhooks) walk the payload back to a pinned version using these JSONata steps, then strip the field before delivery -- end customers never receive it.
             */
            _downgrades?: /* One step of an event's inline `_downgrades` chain. Maps the current-version payload to the previous version via a JSONata expression. Stamped by Event Catalog at publish time; executed by consumers during walk-back, never by EC itself. */ InlineDowngradeStep[];
        }
        /**
         * A file attachment associated with an event
         */
        export interface EventAttachment {
            /**
             * Entity ID of the file
             */
            entity_id: string; // uuid
            /**
             * Name of the file
             */
            filename?: string;
            /**
             * MIME type of the file (e.g., application/pdf)
             */
            mime_type?: string;
            /**
             * File size in bytes
             */
            size_bytes?: number;
            /**
             * S3 reference for the file content
             */
            s3ref?: {
                /**
                 * S3 bucket name
                 */
                bucket: string;
                /**
                 * S3 object key
                 */
                key: string;
            };
            /**
             * File version index (always 0 for newly created files)
             */
            version_index: number;
            /**
             * Human-readable file size (e.g., "200 KB")
             */
            readable_size?: string;
        }
        /**
         * Event configuration with required fields
         */
        export interface EventConfig {
            /**
             * Unique human readable name of the event
             * example:
             * AddMeterReading
             */
            event_name: string;
            /**
             * Human-friendly title for the event
             * example:
             * Add Meter Reading
             */
            event_title?: string;
            /**
             * Description of when the event is triggered
             * example:
             * Triggered when a new meter reading is added
             */
            event_description?: string;
            /**
             * Event payload version (MAJOR.MINOR)
             * example:
             * 1.0
             */
            event_version: string;
            /**
             * Status of the event
             * example:
             * active
             */
            event_status?: "active" | "deprecated" | "draft" | "disabled";
            /**
             * Tags associated with the event for categorization and filtering
             *
             * The "builtin" tag indicates events that are built into the epilot system.
             *
             * example:
             * [
             *   "builtin",
             *   "metering",
             *   "erp"
             * ]
             */
            event_tags?: string[];
            /**
             * Fields that define the event schema
             */
            schema_fields: {
                [name: string]: SchemaField;
            };
            /**
             * Optional entity graph definition for resolving related entities
             */
            entity_graph?: {
                /**
                 * List of node definitions in the graph
                 */
                nodes: /* A node in the entity graph */ GraphNode[];
                /**
                 * List of edge definitions connecting nodes
                 */
                edges: /* An edge connecting two nodes in the graph */ GraphEdge[];
            };
            /**
             * Optional configuration for triggering this event based on entity operations
             */
            entity_operation?: {
                /**
                 * List of entity operations that can trigger this event
                 * example:
                 * [
                 *   "createEntity",
                 *   "updateEntity"
                 * ]
                 */
                operation: ("createEntity" | "updateEntity" | "deleteEntity")[];
                /**
                 * List of entity schema slugs that can trigger this event
                 * example:
                 * [
                 *   "contact",
                 *   "contract",
                 *   "order"
                 * ]
                 */
                schema: string[];
                /**
                 * Optional list of entity attributes to track for changes.
                 * If specified, the event only triggers when these attributes are affected.
                 * - On createEntity: attribute must be defined in the entity payload
                 * - On updateEntity: attribute must be in diff.added, diff.updated, or diff.deleted
                 * If not specified, all changes to matching entities will trigger the event.
                 *
                 * example:
                 * [
                 *   "email",
                 *   "phone",
                 *   "status"
                 * ]
                 */
                attribute?: string[];
                /**
                 * Optional list of purpose names to filter by.
                 * The entity must have at least one matching purpose in its _purpose array.
                 * Purpose names are matched against the taxonomy classification names (e.g., "Kündigung", "Umzug/Auszug").
                 * If not specified, the event triggers regardless of entity purpose.
                 *
                 * example:
                 * [
                 *   "Kündigung",
                 *   "Umzug/Auszug"
                 * ]
                 */
                purpose?: string[];
            };
            /**
             * Whether this event is enabled for the organization.
             * When disabled, the event will not be triggered by any means
             * (automatic, API, or automation).
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            enabled?: boolean;
            /**
             * Whether the event should be triggered automatically by built-in logic
             * (e.g., portal submissions, entity mutations, EventBridge rules).
             * When false, the event can still be triggered manually via API or automations.
             * Only meaningful for builtin events that have automatic trigger sources.
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            auto_trigger?: boolean;
            /**
             * Whether this event can be explicitly triggered by automations.
             * When true, the event will appear in the automation builder as a
             * "Trigger Event" action option.
             * Defaults to false if not specified.
             *
             * example:
             * true
             */
            automation_trigger?: boolean;
            /**
             * Org-defined success criteria for this event: the entity attributes that an
             * organization considers must be captured for an event change request to be
             * treated as complete (e.g. for telephony / self-service flows).
             *
             * Advisory metadata — event-catalog does NOT require an org to define any and
             * does NOT enforce them when an event is triggered or published. The org may
             * define none (empty array or omitted). When provided, each entry is validated
             * for well-formedness on write (see SuccessCriterion).
             *
             * example:
             * [
             *   {
             *     "entity_schema": "contract",
             *     "attribute": "installment_amount"
             *   },
             *   {
             *     "entity_schema": "billing_account",
             *     "attribute": "due_date"
             *   }
             * ]
             */
            success_criteria?: /**
             * A single org-defined success criterion: an entity attribute that must be captured
             * for this event's change request to be considered complete.
             *
             * Identity is the entity schema plus the attribute name — mirroring the
             * EntityOperationTrigger `schema`/`attribute` vocabulary. On write (PATCH), both
             * `attribute` and `entity_schema` are required and `entity_schema` must match the
             * `schema` of a node in the event's `entity_graph` (else the request is rejected) —
             * this prevents unsatisfiable criteria. The criteria themselves are advisory and are
             * never enforced when an event is triggered or published.
             *
             */
            SuccessCriterion[];
        }
        /**
         * Base properties shared between EventConfig and UpdateEventPayload
         */
        export interface EventConfigBase {
            /**
             * Unique human readable name of the event
             * example:
             * AddMeterReading
             */
            event_name?: string;
            /**
             * Human-friendly title for the event
             * example:
             * Add Meter Reading
             */
            event_title?: string;
            /**
             * Description of when the event is triggered
             * example:
             * Triggered when a new meter reading is added
             */
            event_description?: string;
            /**
             * Event payload version (MAJOR.MINOR)
             * example:
             * 1.0
             */
            event_version?: string;
            /**
             * Status of the event
             * example:
             * active
             */
            event_status?: "active" | "deprecated" | "draft" | "disabled";
            /**
             * Tags associated with the event for categorization and filtering
             *
             * The "builtin" tag indicates events that are built into the epilot system.
             *
             * example:
             * [
             *   "builtin",
             *   "metering",
             *   "erp"
             * ]
             */
            event_tags?: string[];
            /**
             * Fields that define the event schema
             */
            schema_fields?: {
                [name: string]: SchemaField;
            };
            /**
             * Optional entity graph definition for resolving related entities
             */
            entity_graph?: {
                /**
                 * List of node definitions in the graph
                 */
                nodes: /* A node in the entity graph */ GraphNode[];
                /**
                 * List of edge definitions connecting nodes
                 */
                edges: /* An edge connecting two nodes in the graph */ GraphEdge[];
            };
            /**
             * Optional configuration for triggering this event based on entity operations
             */
            entity_operation?: {
                /**
                 * List of entity operations that can trigger this event
                 * example:
                 * [
                 *   "createEntity",
                 *   "updateEntity"
                 * ]
                 */
                operation: ("createEntity" | "updateEntity" | "deleteEntity")[];
                /**
                 * List of entity schema slugs that can trigger this event
                 * example:
                 * [
                 *   "contact",
                 *   "contract",
                 *   "order"
                 * ]
                 */
                schema: string[];
                /**
                 * Optional list of entity attributes to track for changes.
                 * If specified, the event only triggers when these attributes are affected.
                 * - On createEntity: attribute must be defined in the entity payload
                 * - On updateEntity: attribute must be in diff.added, diff.updated, or diff.deleted
                 * If not specified, all changes to matching entities will trigger the event.
                 *
                 * example:
                 * [
                 *   "email",
                 *   "phone",
                 *   "status"
                 * ]
                 */
                attribute?: string[];
                /**
                 * Optional list of purpose names to filter by.
                 * The entity must have at least one matching purpose in its _purpose array.
                 * Purpose names are matched against the taxonomy classification names (e.g., "Kündigung", "Umzug/Auszug").
                 * If not specified, the event triggers regardless of entity purpose.
                 *
                 * example:
                 * [
                 *   "Kündigung",
                 *   "Umzug/Auszug"
                 * ]
                 */
                purpose?: string[];
            };
            /**
             * Whether this event is enabled for the organization.
             * When disabled, the event will not be triggered by any means
             * (automatic, API, or automation).
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            enabled?: boolean;
            /**
             * Whether the event should be triggered automatically by built-in logic
             * (e.g., portal submissions, entity mutations, EventBridge rules).
             * When false, the event can still be triggered manually via API or automations.
             * Only meaningful for builtin events that have automatic trigger sources.
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            auto_trigger?: boolean;
            /**
             * Whether this event can be explicitly triggered by automations.
             * When true, the event will appear in the automation builder as a
             * "Trigger Event" action option.
             * Defaults to false if not specified.
             *
             * example:
             * true
             */
            automation_trigger?: boolean;
            /**
             * Org-defined success criteria for this event: the entity attributes that an
             * organization considers must be captured for an event change request to be
             * treated as complete (e.g. for telephony / self-service flows).
             *
             * Advisory metadata — event-catalog does NOT require an org to define any and
             * does NOT enforce them when an event is triggered or published. The org may
             * define none (empty array or omitted). When provided, each entry is validated
             * for well-formedness on write (see SuccessCriterion).
             *
             * example:
             * [
             *   {
             *     "entity_schema": "contract",
             *     "attribute": "installment_amount"
             *   },
             *   {
             *     "entity_schema": "billing_account",
             *     "attribute": "due_date"
             *   }
             * ]
             */
            success_criteria?: /**
             * A single org-defined success criterion: an entity attribute that must be captured
             * for this event's change request to be considered complete.
             *
             * Identity is the entity schema plus the attribute name — mirroring the
             * EntityOperationTrigger `schema`/`attribute` vocabulary. On write (PATCH), both
             * `attribute` and `entity_schema` are required and `entity_schema` must match the
             * `schema` of a node in the event's `entity_graph` (else the request is rejected) —
             * this prevents unsatisfiable criteria. The criteria themselves are advisory and are
             * never enforced when an event is triggered or published.
             *
             */
            SuccessCriterion[];
        }
        /**
         * JSON Schema declaring the event payload structure
         * example:
         * {
         *   "type": "object",
         *   "properties": {
         *     "_org_id": {
         *       "type": "string",
         *       "description": "epilot tenant/organization ID"
         *     },
         *     "_event_time": {
         *       "type": "string",
         *       "format": "date-time",
         *       "description": "ISO 8601 timestamp when event occurred"
         *     },
         *     "_event_id": {
         *       "type": "string",
         *       "description": "Unique event identifier (ULID)"
         *     },
         *     "_event_name": {
         *       "type": "string",
         *       "description": "Event name from catalog"
         *     },
         *     "_event_version": {
         *       "type": "string",
         *       "description": "Event payload version (MAJOR.MINOR)"
         *     },
         *     "_event_source": {
         *       "type": "string",
         *       "description": "Source that triggered the event"
         *     },
         *     "reading_value": {
         *       "type": "number",
         *       "description": "The meter reading value"
         *     },
         *     "reading_date": {
         *       "type": "string",
         *       "format": "date-time",
         *       "description": "ISO 8601 timestamp when reading was taken"
         *     },
         *     "read_by": {
         *       "type": "string",
         *       "description": "Name or identifier of who submitted the reading"
         *     },
         *     "reason": {
         *       "type": "string",
         *       "enum": [
         *         "regular",
         *         "move-in",
         *         "move-out",
         *         "supplier-change",
         *         "correction",
         *         "final"
         *       ],
         *       "description": "Reason for the meter reading"
         *     },
         *     "direction": {
         *       "type": "string",
         *       "enum": [
         *         "feed-in",
         *         "feed-out"
         *       ],
         *       "description": "Direction of energy flow"
         *     },
         *     "source": {
         *       "type": "string",
         *       "enum": [
         *         "portal",
         *         "360",
         *         "api",
         *         "automation"
         *       ],
         *       "description": "Source system where reading was submitted"
         *     },
         *     "meter_id": {
         *       "type": "string",
         *       "format": "uuid",
         *       "description": "Entity ID of the meter"
         *     },
         *     "counter_id": {
         *       "type": "string",
         *       "format": "uuid",
         *       "description": "Entity ID of the meter counter"
         *     },
         *     "meter_number": {
         *       "type": "string",
         *       "description": "Human-readable meter number"
         *     },
         *     "obis_number": {
         *       "type": "string",
         *       "description": "OBIS code of the counter"
         *     },
         *     "unit": {
         *       "type": "string",
         *       "description": "Unit of measurement (e.g., kWh, m3)"
         *     },
         *     "customer_id": {
         *       "type": "string",
         *       "format": "uuid",
         *       "description": "Entity ID of the customer"
         *     },
         *     "contract_id": {
         *       "type": "string",
         *       "format": "uuid",
         *       "description": "Entity ID of the contract"
         *     },
         *     "user_id": {
         *       "type": "string",
         *       "description": "ID of the user who submitted the reading"
         *     },
         *     "user_email": {
         *       "type": "string",
         *       "format": "email",
         *       "description": "Email of the user who submitted the reading"
         *     }
         *   },
         *   "required": [
         *     "_org_id",
         *     "_event_time",
         *     "_event_id",
         *     "_event_name",
         *     "_event_version",
         *     "_event_source",
         *     "reading_value",
         *     "reading_date",
         *     "read_by",
         *     "reason",
         *     "direction",
         *     "source",
         *     "meter_id",
         *     "counter_id",
         *     "meter_number",
         *     "obis_number",
         *     "unit",
         *     "customer_id",
         *     "contract_id"
         *   ]
         * }
         */
        export interface EventJsonSchema {
        }
        /**
         * A lightweight event summary returned by the v2 history endpoint.
         *
         * Includes the standard `_*` metadata fields plus a projected subset of the
         * event payload. Hydrated entity objects (values carrying `_schema` or `_id`)
         * — and arrays of such objects — are reduced to reference stubs
         * `{_schema, _id, _title}` so consumers can identify and follow up on each
         * entity without paying the cost of the full hydrated graph. Fetch
         * `GET /v2/events/{event_name}/history/{event_id}` for the full hydration.
         *
         * Projected scalar payload fields appear as additional top-level properties.
         *
         */
        export interface EventSummary {
            [name: string]: any;
            /**
             * epilot tenant/organization ID
             */
            _org_id: string;
            /**
             * ISO 8601 timestamp when event occurred
             */
            _event_time: string; // date-time
            /**
             * Unique event identifier (ULID)
             */
            _event_id: string;
            /**
             * Event name from catalog
             */
            _event_name: string;
            /**
             * Event payload version (MAJOR.MINOR)
             * example:
             * 1.0
             */
            _event_version: string;
            /**
             * Source that triggered the event
             */
            _event_source: string;
            /**
             * The type of system that triggered the event.
             * Common values: api, automation, operation, portal_user
             *
             * example:
             * api
             */
            _trigger_source_type?: string;
            /**
             * Identifier of the specific trigger source.
             *
             */
            _trigger_source?: string;
            /**
             * Unique acknowledgment tracking ID for the event.
             *
             */
            _ack_id?: string;
        }
        /**
         * Summary of an event's version timeline returned by
         * `GET /v1/events/{event_name}/versions`.
         *
         */
        export interface EventVersionRegistrySummary {
            /**
             * example:
             * MeterReadingAdded
             */
            event_name: string;
            /**
             * The newest registered version.
             * example:
             * 1.0
             */
            latest: string;
            /**
             * Full version timeline, ordered oldest → newest.
             */
            versions: /* One entry of an event's version timeline. */ VersionMeta[];
        }
        /**
         * A field-level change descriptor. Powers the declarative half of the
         * version DSL.
         *
         */
        export interface FieldChange {
            /**
             * Name of the field affected by this change.
             * example:
             * reading
             */
            field: string;
            /**
             * Kind of change. Renames are NOT a first-class op — represent them
             * as a `removed` + `added` pair (semantic intent goes into
             * `change_summary` / `change_notes`).
             *
             */
            op: "added" | "removed" | "type-changed";
            /**
             * Type label for the previous shape (for `removed` and `type-changed`).
             */
            type_old?: string;
            /**
             * Type label for the new shape (for `added` and `type-changed`).
             */
            type_new?: string;
        }
        /**
         * List of entity fields to include or exclude in the response
         *
         * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
         *
         * Globbing and globstart (**) is supported for nested fields.
         *
         * example:
         * [
         *   "_id",
         *   "_title",
         *   "first_name",
         *   "account",
         *   "!account.*._files",
         *   "**._product"
         * ]
         */
        export type FieldsParam = string[];
        /**
         * Entity graph definition for resolving related entities
         */
        export interface GraphDefinition {
            /**
             * List of node definitions in the graph
             */
            nodes: /* A node in the entity graph */ GraphNode[];
            /**
             * List of edge definitions connecting nodes
             */
            edges: /* An edge connecting two nodes in the graph */ GraphEdge[];
        }
        /**
         * An edge connecting two nodes in the graph
         */
        export interface GraphEdge {
            /**
             * Source node ID
             * example:
             * contact
             */
            from: string;
            /**
             * Target node ID
             * example:
             * billing_account
             */
            to: string;
        }
        /**
         * A node in the entity graph
         */
        export interface GraphNode {
            /**
             * Unique identifier for this node in the graph definition
             * example:
             * contact
             */
            id: string;
            /**
             * Entity schema slug for this node
             * example:
             * contact
             */
            schema: string;
            /**
             * Cardinality for this node when hydrated:
             * - "one": Node can only contain one entity, returns single Entity object
             * - "many": Node can contain multiple entities, returns array of Entity objects
             * If not specified, defaults to "many" (returns array)
             *
             * example:
             * one
             */
            cardinality?: "one" | "many";
            /**
             * Optional array of field names to include in the hydrated entity response for this node.
             * When specified, only the requested fields plus required internal fields (_id, _schema, _org) will be returned.
             * Only applies when hydrate=true.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            fields?: string[];
        }
        /**
         * One step of an event's inline `_downgrades` chain. Maps the current-version payload to the previous version via a JSONata expression. Stamped by Event Catalog at publish time; executed by consumers during walk-back, never by EC itself.
         */
        export interface InlineDowngradeStep {
            /**
             * Version label this step downgrades to (the previous version).
             */
            to: string;
            /**
             * JSONata expression mapping the current-shape payload to the previous-shape payload.
             */
            jsonata: string;
        }
        /**
         * A primitive JSON Schema field definition
         */
        export interface PrimitiveField {
            /**
             * JSON Schema definition of the field
             * example:
             * {
             *   "type": "string",
             *   "format": "date-time",
             *   "description": "ISO 8601 timestamp when reading was taken"
             * }
             */
            json_schema: {
                [key: string]: any;
            };
            /**
             * Whether this field is required in the event payload
             */
            required?: boolean;
            /**
             * Optional JSONata expression to extract the field value from the hydrated entity graph.
             *
             * The expression has access to all hydrated graph nodes by their node ID.
             * If not specified, the field value must be provided as input when triggering the event.
             *
             * Examples:
             *   - "ticket.meter_reading_value" (simple path)
             *   - "contact.email[0].email" (nested/array access)
             *   - "ticket.reading_timestamp ?? $now()" (with fallback)
             *   - "$number(meter_counter.reading_value)" (type coercion)
             *
             * example:
             * ticket.meter_reading_value
             */
            graph_source?: string;
        }
        export type SchemaField = /* A primitive JSON Schema field definition */ PrimitiveField | ContextEntity | /**
         * A schema field representing file attachments associated with the event.
         * Present in schema_fields for events tagged with "attachment".
         *
         */
        AttachmentField;
        export interface SearchOptions {
            /**
             * Maximum number of results to return
             */
            limit?: number;
            /**
             * Cursor for pagination. Use the next_cursor from the previous response to get the next page.
             */
            cursor?: {
                /**
                 * Timestamp from the last event in the previous page
                 * example:
                 * 2025-10-31 12:34:56
                 */
                event_time?: string;
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
        }
        /**
         * Search options for the v2 history endpoint.
         *
         * Extends `SearchOptions` with an optional `fields` projection. When `fields`
         * is omitted, the response includes all `_*` metadata plus all scalar payload
         * fields (and primitive arrays / empty objects/arrays) after entity stripping.
         * When `fields` is provided, glob/exclusion semantics from `FieldsParam` apply
         * against `payload.*` paths; `_*` metadata is always included. Entity stripping
         * runs AFTER selection.
         *
         */
        export interface SearchOptionsV2 {
            /**
             * Maximum number of results to return
             */
            limit?: number;
            /**
             * Cursor for pagination. Use the next_cursor from the previous response to get the next page.
             */
            cursor?: {
                /**
                 * Timestamp from the last event in the previous page
                 * example:
                 * 2025-10-31 12:34:56
                 */
                event_time?: string;
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
            fields?: /**
             * List of entity fields to include or exclude in the response
             *
             * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
             *
             * Globbing and globstart (**) is supported for nested fields.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            FieldsParam;
        }
        /**
         * A single org-defined success criterion: an entity attribute that must be captured
         * for this event's change request to be considered complete.
         *
         * Identity is the entity schema plus the attribute name — mirroring the
         * EntityOperationTrigger `schema`/`attribute` vocabulary. On write (PATCH), both
         * `attribute` and `entity_schema` are required and `entity_schema` must match the
         * `schema` of a node in the event's `entity_graph` (else the request is rejected) —
         * this prevents unsatisfiable criteria. The criteria themselves are advisory and are
         * never enforced when an event is triggered or published.
         *
         */
        export interface SuccessCriterion {
            /**
             * Entity schema slug the attribute belongs to (matches a node schema in the event's entity_graph).
             * example:
             * contract
             */
            entity_schema: string;
            /**
             * Attribute name on the entity schema.
             * example:
             * installment_amount
             */
            attribute: string;
        }
        /**
         * Payload for explicitly triggering an event via API
         */
        export interface TriggerEventPayload {
            /**
             * Entity seed for graph hydration. Required for events that have an entity_graph defined.
             * Specifies which entity to start graph traversal from.
             *
             */
            seed?: {
                /**
                 * Entity ID to seed the graph hydration
                 */
                entity_id: string; // uuid
                /**
                 * Node ID from the event's entity_graph definition that matches
                 * the seed entity. Must be a valid node in the event's graph.
                 *
                 */
                node_id: string;
            };
            /**
             * Input field values for the event. Keys must match the event's
             * schema_fields definitions. Values are validated against each
             * field's JSON Schema.
             *
             */
            fields?: {
                [name: string]: any;
            };
            /**
             * Optional list of node IDs to skip during entity graph hydration.
             * These nodes will be null/undefined in the event payload.
             *
             */
            skip_hydration?: string[];
            /**
             * The type of system that triggered the event.
             * Examples: api, automation, operation, portal_user
             * Defaults to "api" if not specified.
             *
             */
            _trigger_source_type?: string;
            /**
             * Identifier of the specific trigger source.
             * Examples: user ID, automation execution ID, activity ID, portal user email
             * Defaults to the calling user ID if not specified.
             *
             */
            _trigger_source?: string;
        }
        /**
         * Response from triggering an event
         */
        export interface TriggerEventResponse {
            /**
             * Whether the event was triggered successfully
             */
            success: boolean;
            /**
             * The unique event ID (ULID) assigned to this event
             */
            event_id: string;
            /**
             * EventBridge event ID from publishing
             */
            event_bridge_event_id?: string;
        }
        /**
         * Payload for updating an event configuration.
         * Accepts the same fields as EventConfig (all optional for PATCH).
         * Currently `enabled`, `auto_trigger` and `success_criteria` fields are processed.
         *
         */
        export interface UpdateEventPayload {
            /**
             * Unique human readable name of the event
             * example:
             * AddMeterReading
             */
            event_name?: string;
            /**
             * Human-friendly title for the event
             * example:
             * Add Meter Reading
             */
            event_title?: string;
            /**
             * Description of when the event is triggered
             * example:
             * Triggered when a new meter reading is added
             */
            event_description?: string;
            /**
             * Event payload version (MAJOR.MINOR)
             * example:
             * 1.0
             */
            event_version?: string;
            /**
             * Status of the event
             * example:
             * active
             */
            event_status?: "active" | "deprecated" | "draft" | "disabled";
            /**
             * Tags associated with the event for categorization and filtering
             *
             * The "builtin" tag indicates events that are built into the epilot system.
             *
             * example:
             * [
             *   "builtin",
             *   "metering",
             *   "erp"
             * ]
             */
            event_tags?: string[];
            /**
             * Fields that define the event schema
             */
            schema_fields?: {
                [name: string]: SchemaField;
            };
            /**
             * Optional entity graph definition for resolving related entities
             */
            entity_graph?: {
                /**
                 * List of node definitions in the graph
                 */
                nodes: /* A node in the entity graph */ GraphNode[];
                /**
                 * List of edge definitions connecting nodes
                 */
                edges: /* An edge connecting two nodes in the graph */ GraphEdge[];
            };
            /**
             * Optional configuration for triggering this event based on entity operations
             */
            entity_operation?: {
                /**
                 * List of entity operations that can trigger this event
                 * example:
                 * [
                 *   "createEntity",
                 *   "updateEntity"
                 * ]
                 */
                operation: ("createEntity" | "updateEntity" | "deleteEntity")[];
                /**
                 * List of entity schema slugs that can trigger this event
                 * example:
                 * [
                 *   "contact",
                 *   "contract",
                 *   "order"
                 * ]
                 */
                schema: string[];
                /**
                 * Optional list of entity attributes to track for changes.
                 * If specified, the event only triggers when these attributes are affected.
                 * - On createEntity: attribute must be defined in the entity payload
                 * - On updateEntity: attribute must be in diff.added, diff.updated, or diff.deleted
                 * If not specified, all changes to matching entities will trigger the event.
                 *
                 * example:
                 * [
                 *   "email",
                 *   "phone",
                 *   "status"
                 * ]
                 */
                attribute?: string[];
                /**
                 * Optional list of purpose names to filter by.
                 * The entity must have at least one matching purpose in its _purpose array.
                 * Purpose names are matched against the taxonomy classification names (e.g., "Kündigung", "Umzug/Auszug").
                 * If not specified, the event triggers regardless of entity purpose.
                 *
                 * example:
                 * [
                 *   "Kündigung",
                 *   "Umzug/Auszug"
                 * ]
                 */
                purpose?: string[];
            };
            /**
             * Whether this event is enabled for the organization.
             * When disabled, the event will not be triggered by any means
             * (automatic, API, or automation).
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            enabled?: boolean;
            /**
             * Whether the event should be triggered automatically by built-in logic
             * (e.g., portal submissions, entity mutations, EventBridge rules).
             * When false, the event can still be triggered manually via API or automations.
             * Only meaningful for builtin events that have automatic trigger sources.
             * Defaults to true if not specified.
             *
             * example:
             * true
             */
            auto_trigger?: boolean;
            /**
             * Whether this event can be explicitly triggered by automations.
             * When true, the event will appear in the automation builder as a
             * "Trigger Event" action option.
             * Defaults to false if not specified.
             *
             * example:
             * true
             */
            automation_trigger?: boolean;
            /**
             * Org-defined success criteria for this event: the entity attributes that an
             * organization considers must be captured for an event change request to be
             * treated as complete (e.g. for telephony / self-service flows).
             *
             * Advisory metadata — event-catalog does NOT require an org to define any and
             * does NOT enforce them when an event is triggered or published. The org may
             * define none (empty array or omitted). When provided, each entry is validated
             * for well-formedness on write (see SuccessCriterion).
             *
             * example:
             * [
             *   {
             *     "entity_schema": "contract",
             *     "attribute": "installment_amount"
             *   },
             *   {
             *     "entity_schema": "billing_account",
             *     "attribute": "due_date"
             *   }
             * ]
             */
            success_criteria?: /**
             * A single org-defined success criterion: an entity attribute that must be captured
             * for this event's change request to be considered complete.
             *
             * Identity is the entity schema plus the attribute name — mirroring the
             * EntityOperationTrigger `schema`/`attribute` vocabulary. On write (PATCH), both
             * `attribute` and `entity_schema` are required and `entity_schema` must match the
             * `schema` of a node in the event's `entity_graph` (else the request is rejected) —
             * this prevents unsatisfiable criteria. The criteria themselves are advisory and are
             * never enforced when an event is triggered or published.
             *
             */
            SuccessCriterion[];
        }
        /**
         * One entry of an event's version timeline.
         */
        export interface VersionMeta {
            /**
             * MAJOR.MINOR version label.
             * example:
             * 1.0
             */
            version: string;
            /**
             * ISO 8601 release timestamp.
             * example:
             * 2025-11-15
             */
            released_at: string;
            /**
             * Required one-liner describing what changed in this version (≤280 chars).
             */
            change_summary: string;
            /**
             * Optional longer-form prose (markdown).
             */
            change_notes?: string;
            /**
             * Hand-authored list of field-level changes from the previous version. Empty for v1.
             */
            changes: /**
             * A field-level change descriptor. Powers the declarative half of the
             * version DSL.
             *
             */
            FieldChange[];
        }
    }
}
declare namespace Paths {
    namespace GetEvent {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        namespace Responses {
            export type $200 = /* Event configuration with required fields */ Components.Schemas.EventConfig;
        }
    }
    namespace GetEventExample {
        export interface HeaderParameters {
            "Epilot-Event-Version"?: Parameters.EpilotEventVersion;
        }
        namespace Parameters {
            export type EpilotEventVersion = string;
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        namespace Responses {
            /**
             * A sample event payload generated from the JSON Schema
             */
            export interface $200 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetEventJSONSchema {
        export interface HeaderParameters {
            "Epilot-Event-Version"?: Parameters.EpilotEventVersion;
        }
        namespace Parameters {
            export type EpilotEventVersion = string;
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        namespace Responses {
            export type $200 = /**
             * JSON Schema declaring the event payload structure
             * example:
             * {
             *   "type": "object",
             *   "properties": {
             *     "_org_id": {
             *       "type": "string",
             *       "description": "epilot tenant/organization ID"
             *     },
             *     "_event_time": {
             *       "type": "string",
             *       "format": "date-time",
             *       "description": "ISO 8601 timestamp when event occurred"
             *     },
             *     "_event_id": {
             *       "type": "string",
             *       "description": "Unique event identifier (ULID)"
             *     },
             *     "_event_name": {
             *       "type": "string",
             *       "description": "Event name from catalog"
             *     },
             *     "_event_version": {
             *       "type": "string",
             *       "description": "Event payload version (MAJOR.MINOR)"
             *     },
             *     "_event_source": {
             *       "type": "string",
             *       "description": "Source that triggered the event"
             *     },
             *     "reading_value": {
             *       "type": "number",
             *       "description": "The meter reading value"
             *     },
             *     "reading_date": {
             *       "type": "string",
             *       "format": "date-time",
             *       "description": "ISO 8601 timestamp when reading was taken"
             *     },
             *     "read_by": {
             *       "type": "string",
             *       "description": "Name or identifier of who submitted the reading"
             *     },
             *     "reason": {
             *       "type": "string",
             *       "enum": [
             *         "regular",
             *         "move-in",
             *         "move-out",
             *         "supplier-change",
             *         "correction",
             *         "final"
             *       ],
             *       "description": "Reason for the meter reading"
             *     },
             *     "direction": {
             *       "type": "string",
             *       "enum": [
             *         "feed-in",
             *         "feed-out"
             *       ],
             *       "description": "Direction of energy flow"
             *     },
             *     "source": {
             *       "type": "string",
             *       "enum": [
             *         "portal",
             *         "360",
             *         "api",
             *         "automation"
             *       ],
             *       "description": "Source system where reading was submitted"
             *     },
             *     "meter_id": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the meter"
             *     },
             *     "counter_id": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the meter counter"
             *     },
             *     "meter_number": {
             *       "type": "string",
             *       "description": "Human-readable meter number"
             *     },
             *     "obis_number": {
             *       "type": "string",
             *       "description": "OBIS code of the counter"
             *     },
             *     "unit": {
             *       "type": "string",
             *       "description": "Unit of measurement (e.g., kWh, m3)"
             *     },
             *     "customer_id": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the customer"
             *     },
             *     "contract_id": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the contract"
             *     },
             *     "user_id": {
             *       "type": "string",
             *       "description": "ID of the user who submitted the reading"
             *     },
             *     "user_email": {
             *       "type": "string",
             *       "format": "email",
             *       "description": "Email of the user who submitted the reading"
             *     }
             *   },
             *   "required": [
             *     "_org_id",
             *     "_event_time",
             *     "_event_id",
             *     "_event_name",
             *     "_event_version",
             *     "_event_source",
             *     "reading_value",
             *     "reading_date",
             *     "read_by",
             *     "reason",
             *     "direction",
             *     "source",
             *     "meter_id",
             *     "counter_id",
             *     "meter_number",
             *     "obis_number",
             *     "unit",
             *     "customer_id",
             *     "contract_id"
             *   ]
             * }
             */
            Components.Schemas.EventJsonSchema;
            export interface $404 {
            }
        }
    }
    namespace GetHistoricalEvent {
        namespace Parameters {
            export type EventId = string;
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
            event_id: Parameters.EventId;
        }
        namespace Responses {
            export type $200 = /**
             * An event instance in the event history
             * example:
             * {
             *   "_org_id": "org_123456",
             *   "_event_time": "2024-01-01T12:00:00Z",
             *   "_event_id": "01FZ4Z5FZ5FZ5FZ5FZ5FZ5FZ5F",
             *   "_event_name": "MeterReading",
             *   "_event_version": "1.0",
             *   "_event_source": "api",
             *   "_trigger_source_type": "api",
             *   "_trigger_source": "user_123456",
             *   "reading_value": 123.45,
             *   "reading_date": "2024-01-01T11:59:00Z",
             *   "read_by": "John Doe",
             *   "reason": "regular",
             *   "direction": "feed-out",
             *   "source": "portal",
             *   "meter_id": "550e8400-e29b-41d4-a716-446655440000",
             *   "counter_id": "660e8400-e29b-41d4-a716-446655440000",
             *   "meter_number": "MT123456789",
             *   "obis_number": "1-0:1.8.0",
             *   "unit": "kWh",
             *   "customer_id": "770e8400-e29b-41d4-a716-446655440000",
             *   "contract_id": "880e8400-e29b-41d4-a716-446655440000"
             * }
             */
            Components.Schemas.Event;
            export interface $404 {
            }
        }
    }
    namespace ListEventVersions {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        namespace Responses {
            export type $200 = /**
             * Summary of an event's version timeline returned by
             * `GET /v1/events/{event_name}/versions`.
             *
             */
            Components.Schemas.EventVersionRegistrySummary;
            export interface $404 {
            }
        }
    }
    namespace ListEvents {
        namespace Responses {
            export interface $200 {
                results?: /* Event configuration with required fields */ Components.Schemas.EventConfig[];
            }
        }
    }
    namespace PatchEvent {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        export type RequestBody = /**
         * Payload for updating an event configuration.
         * Accepts the same fields as EventConfig (all optional for PATCH).
         * Currently `enabled`, `auto_trigger` and `success_criteria` fields are processed.
         *
         */
        Components.Schemas.UpdateEventPayload;
        namespace Responses {
            export type $200 = /* Event configuration with required fields */ Components.Schemas.EventConfig;
            export interface $404 {
            }
        }
    }
    namespace SearchEventHistory {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        export type RequestBody = Components.Schemas.SearchOptions;
        namespace Responses {
            export interface $200 {
                results?: /**
                 * An event instance in the event history
                 * example:
                 * {
                 *   "_org_id": "org_123456",
                 *   "_event_time": "2024-01-01T12:00:00Z",
                 *   "_event_id": "01FZ4Z5FZ5FZ5FZ5FZ5FZ5FZ5F",
                 *   "_event_name": "MeterReading",
                 *   "_event_version": "1.0",
                 *   "_event_source": "api",
                 *   "_trigger_source_type": "api",
                 *   "_trigger_source": "user_123456",
                 *   "reading_value": 123.45,
                 *   "reading_date": "2024-01-01T11:59:00Z",
                 *   "read_by": "John Doe",
                 *   "reason": "regular",
                 *   "direction": "feed-out",
                 *   "source": "portal",
                 *   "meter_id": "550e8400-e29b-41d4-a716-446655440000",
                 *   "counter_id": "660e8400-e29b-41d4-a716-446655440000",
                 *   "meter_number": "MT123456789",
                 *   "obis_number": "1-0:1.8.0",
                 *   "unit": "kWh",
                 *   "customer_id": "770e8400-e29b-41d4-a716-446655440000",
                 *   "contract_id": "880e8400-e29b-41d4-a716-446655440000"
                 * }
                 */
                Components.Schemas.Event[];
                /**
                 * Cursor for pagination. Use this to get the next page of results.
                 */
                next_cursor?: {
                    /**
                     * Timestamp from the last event in the current page
                     * example:
                     * 2025-10-31T12:34:56Z
                     */
                    event_time?: string;
                    /**
                     * Event ID from the last event in the current page
                     * example:
                     * evt_1234567890abcdef
                     */
                    event_id?: string;
                } | null;
            }
        }
    }
    namespace SearchEventHistoryV2 {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        export type RequestBody = /**
         * Search options for the v2 history endpoint.
         *
         * Extends `SearchOptions` with an optional `fields` projection. When `fields`
         * is omitted, the response includes all `_*` metadata plus all scalar payload
         * fields (and primitive arrays / empty objects/arrays) after entity stripping.
         * When `fields` is provided, glob/exclusion semantics from `FieldsParam` apply
         * against `payload.*` paths; `_*` metadata is always included. Entity stripping
         * runs AFTER selection.
         *
         */
        Components.Schemas.SearchOptionsV2;
        namespace Responses {
            export interface $200 {
                results?: /**
                 * A lightweight event summary returned by the v2 history endpoint.
                 *
                 * Includes the standard `_*` metadata fields plus a projected subset of the
                 * event payload. Hydrated entity objects (values carrying `_schema` or `_id`)
                 * — and arrays of such objects — are reduced to reference stubs
                 * `{_schema, _id, _title}` so consumers can identify and follow up on each
                 * entity without paying the cost of the full hydrated graph. Fetch
                 * `GET /v2/events/{event_name}/history/{event_id}` for the full hydration.
                 *
                 * Projected scalar payload fields appear as additional top-level properties.
                 *
                 */
                Components.Schemas.EventSummary[];
                /**
                 * Cursor for pagination. Use this to get the next page of results.
                 */
                next_cursor?: {
                    /**
                     * Timestamp from the last event in the current page
                     * example:
                     * 2025-10-31T12:34:56Z
                     */
                    event_time?: string;
                    /**
                     * Event ID from the last event in the current page
                     * example:
                     * evt_1234567890abcdef
                     */
                    event_id?: string;
                } | null;
            }
        }
    }
    namespace TriggerEvent {
        namespace Parameters {
            export type EventName = string;
        }
        export interface PathParameters {
            event_name: Parameters.EventName;
        }
        export type RequestBody = /* Payload for explicitly triggering an event via API */ Components.Schemas.TriggerEventPayload;
        namespace Responses {
            export type $200 = /* Response from triggering an event */ Components.Schemas.TriggerEventResponse;
            export interface $400 {
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
   * listEvents - listEvents
   * 
   * Retrieve list of available business events
   */
  'listEvents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEvents.Responses.$200>
  /**
   * getEvent - getEvent
   * 
   * Retrieve the configuration of a specific business event
   */
  'getEvent'(
    parameters?: Parameters<Paths.GetEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEvent.Responses.$200>
  /**
   * patchEvent - patchEvent
   * 
   * Update the configuration of a specific business event for the organization
   */
  'patchEvent'(
    parameters?: Parameters<Paths.PatchEvent.PathParameters> | null,
    data?: Paths.PatchEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchEvent.Responses.$200>
  /**
   * getEventJSONSchema - getEventJSONSchema
   * 
   * Retrieve the JSON Schema of a specific business event. Pass an optional
   * `Epilot-Event-Version` header to retrieve a specific version's schema;
   * when omitted, the event's latest version is returned.
   * 
   */
  'getEventJSONSchema'(
    parameters?: Parameters<Paths.GetEventJSONSchema.HeaderParameters & Paths.GetEventJSONSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventJSONSchema.Responses.$200>
  /**
   * getEventExample - getEventExample
   * 
   * Generate a sample event payload based on the event's JSON Schema. Pass an
   * optional `Epilot-Event-Version` header to generate the example for a
   * specific version; when omitted, the event's latest version is used.
   * 
   */
  'getEventExample'(
    parameters?: Parameters<Paths.GetEventExample.HeaderParameters & Paths.GetEventExample.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventExample.Responses.$200>
  /**
   * listEventVersions - listEventVersions
   * 
   * List every known version of an event, along with the `latest`
   * and the set of currently `active` versions. See §3.2 of the
   * Event Payload Versioning RFC.
   * 
   */
  'listEventVersions'(
    parameters?: Parameters<Paths.ListEventVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEventVersions.Responses.$200>
  /**
   * searchEventHistory - searchEventHistory
   * 
   * Paginated history of events
   */
  'searchEventHistory'(
    parameters?: Parameters<Paths.SearchEventHistory.PathParameters> | null,
    data?: Paths.SearchEventHistory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchEventHistory.Responses.$200>
  /**
   * searchEventHistoryV2 - searchEventHistoryV2
   * 
   * Paginated history of events with projected/lightweight payload (v2).
   * 
   * Returns `EventSummary` objects instead of fully hydrated `Event` objects:
   * hydrated entity objects (values carrying `_schema`/`_id`) are reduced to
   * reference stubs `{_schema, _id, _title}` — the full entity is recoverable
   * via GET /v2/events/{event_name}/history/{event_id} or by hitting
   * entity-api directly with the `_id`.
   * 
   */
  'searchEventHistoryV2'(
    parameters?: Parameters<Paths.SearchEventHistoryV2.PathParameters> | null,
    data?: Paths.SearchEventHistoryV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchEventHistoryV2.Responses.$200>
  /**
   * getHistoricalEvent - getHistoricalEvent
   * 
   * Fetch a single historical event by id with full hydration
   */
  'getHistoricalEvent'(
    parameters?: Parameters<Paths.GetHistoricalEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHistoricalEvent.Responses.$200>
  /**
   * triggerEvent - triggerEvent
   * 
   * Explicitly trigger an event by providing input field values and an optional entity seed
   * for graph hydration. The event must be enabled for the organization.
   * 
   * - For events with an entity_graph, a seed (entity_id + node_id) is required
   * - For events without an entity_graph, only fields are needed
   * - Entity operation context fields (operation, trigger_entity, activity_id, activity_type)
   *   are not included when triggering via API
   * 
   */
  'triggerEvent'(
    parameters?: Parameters<Paths.TriggerEvent.PathParameters> | null,
    data?: Paths.TriggerEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerEvent.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/events']: {
    /**
     * listEvents - listEvents
     * 
     * Retrieve list of available business events
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEvents.Responses.$200>
  }
  ['/v1/events/{event_name}']: {
    /**
     * getEvent - getEvent
     * 
     * Retrieve the configuration of a specific business event
     */
    'get'(
      parameters?: Parameters<Paths.GetEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEvent.Responses.$200>
    /**
     * patchEvent - patchEvent
     * 
     * Update the configuration of a specific business event for the organization
     */
    'patch'(
      parameters?: Parameters<Paths.PatchEvent.PathParameters> | null,
      data?: Paths.PatchEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchEvent.Responses.$200>
  }
  ['/v1/events/{event_name}/json_schema']: {
    /**
     * getEventJSONSchema - getEventJSONSchema
     * 
     * Retrieve the JSON Schema of a specific business event. Pass an optional
     * `Epilot-Event-Version` header to retrieve a specific version's schema;
     * when omitted, the event's latest version is returned.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEventJSONSchema.HeaderParameters & Paths.GetEventJSONSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventJSONSchema.Responses.$200>
  }
  ['/v1/events/{event_name}/example']: {
    /**
     * getEventExample - getEventExample
     * 
     * Generate a sample event payload based on the event's JSON Schema. Pass an
     * optional `Epilot-Event-Version` header to generate the example for a
     * specific version; when omitted, the event's latest version is used.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEventExample.HeaderParameters & Paths.GetEventExample.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventExample.Responses.$200>
  }
  ['/v1/events/{event_name}/versions']: {
    /**
     * listEventVersions - listEventVersions
     * 
     * List every known version of an event, along with the `latest`
     * and the set of currently `active` versions. See §3.2 of the
     * Event Payload Versioning RFC.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListEventVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEventVersions.Responses.$200>
  }
  ['/v1/events/{event_name}:history']: {
    /**
     * searchEventHistory - searchEventHistory
     * 
     * Paginated history of events
     */
    'post'(
      parameters?: Parameters<Paths.SearchEventHistory.PathParameters> | null,
      data?: Paths.SearchEventHistory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchEventHistory.Responses.$200>
  }
  ['/v2/events/{event_name}:history']: {
    /**
     * searchEventHistoryV2 - searchEventHistoryV2
     * 
     * Paginated history of events with projected/lightweight payload (v2).
     * 
     * Returns `EventSummary` objects instead of fully hydrated `Event` objects:
     * hydrated entity objects (values carrying `_schema`/`_id`) are reduced to
     * reference stubs `{_schema, _id, _title}` — the full entity is recoverable
     * via GET /v2/events/{event_name}/history/{event_id} or by hitting
     * entity-api directly with the `_id`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SearchEventHistoryV2.PathParameters> | null,
      data?: Paths.SearchEventHistoryV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchEventHistoryV2.Responses.$200>
  }
  ['/v2/events/{event_name}/history/{event_id}']: {
    /**
     * getHistoricalEvent - getHistoricalEvent
     * 
     * Fetch a single historical event by id with full hydration
     */
    'get'(
      parameters?: Parameters<Paths.GetHistoricalEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHistoricalEvent.Responses.$200>
  }
  ['/v1/events/{event_name}:trigger']: {
    /**
     * triggerEvent - triggerEvent
     * 
     * Explicitly trigger an event by providing input field values and an optional entity seed
     * for graph hydration. The event must be enabled for the organization.
     * 
     * - For events with an entity_graph, a seed (entity_id + node_id) is required
     * - For events without an entity_graph, only fields are needed
     * - Entity operation context fields (operation, trigger_entity, activity_id, activity_type)
     *   are not included when triggering via API
     * 
     */
    'post'(
      parameters?: Parameters<Paths.TriggerEvent.PathParameters> | null,
      data?: Paths.TriggerEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerEvent.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AttachmentField = Components.Schemas.AttachmentField;
export type CommonEventMetadata = Components.Schemas.CommonEventMetadata;
export type ContextEntity = Components.Schemas.ContextEntity;
export type EntityOperationTrigger = Components.Schemas.EntityOperationTrigger;
export type Event = Components.Schemas.Event;
export type EventAttachment = Components.Schemas.EventAttachment;
export type EventConfig = Components.Schemas.EventConfig;
export type EventConfigBase = Components.Schemas.EventConfigBase;
export type EventJsonSchema = Components.Schemas.EventJsonSchema;
export type EventSummary = Components.Schemas.EventSummary;
export type EventVersionRegistrySummary = Components.Schemas.EventVersionRegistrySummary;
export type FieldChange = Components.Schemas.FieldChange;
export type FieldsParam = Components.Schemas.FieldsParam;
export type GraphDefinition = Components.Schemas.GraphDefinition;
export type GraphEdge = Components.Schemas.GraphEdge;
export type GraphNode = Components.Schemas.GraphNode;
export type InlineDowngradeStep = Components.Schemas.InlineDowngradeStep;
export type PrimitiveField = Components.Schemas.PrimitiveField;
export type SchemaField = Components.Schemas.SchemaField;
export type SearchOptions = Components.Schemas.SearchOptions;
export type SearchOptionsV2 = Components.Schemas.SearchOptionsV2;
export type SuccessCriterion = Components.Schemas.SuccessCriterion;
export type TriggerEventPayload = Components.Schemas.TriggerEventPayload;
export type TriggerEventResponse = Components.Schemas.TriggerEventResponse;
export type UpdateEventPayload = Components.Schemas.UpdateEventPayload;
export type VersionMeta = Components.Schemas.VersionMeta;
