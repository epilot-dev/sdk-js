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
         * An event instance in the event history
         * example:
         * {
         *   "_org_id": "org_123456",
         *   "_event_time": "2024-01-01T12:00:00Z",
         *   "_event_id": "01FZ4Z5FZ5FZ5FZ5FZ5FZ5FZ5F",
         *   "_event_name": "MeterReading",
         *   "_event_version": 1,
         *   "_event_source": "api",
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
             * Schema version number
             */
            _event_version: number;
            /**
             * Source that triggered the event
             */
            _event_source: string;
        }
        export interface EventConfig {
            /**
             * Unique human readable name of the event
             * example:
             * MeterReading
             */
            event_name: string;
            /**
             * Version of the event schema
             * example:
             * 1
             */
            event_version?: number;
            /**
             * Fields that define the event schema
             * example:
             * {
             *   "reading_value": {
             *     "json_schema": {
             *       "type": "number",
             *       "description": "The meter reading value"
             *     },
             *     "required": true
             *   },
             *   "reading_date": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "date-time",
             *       "description": "ISO 8601 timestamp when reading was taken"
             *     },
             *     "required": true
             *   },
             *   "read_by": {
             *     "json_schema": {
             *       "type": "string",
             *       "description": "Name or identifier of who submitted the reading"
             *     },
             *     "required": false
             *   },
             *   "reason": {
             *     "json_schema": {
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
             *     "required": true
             *   },
             *   "direction": {
             *     "json_schema": {
             *       "type": "string",
             *       "enum": [
             *         "feed-in",
             *         "feed-out"
             *       ],
             *       "description": "Direction of energy flow"
             *     },
             *     "required": true
             *   },
             *   "source": {
             *     "json_schema": {
             *       "type": "string",
             *       "enum": [
             *         "portal",
             *         "360",
             *         "api",
             *         "automation"
             *       ],
             *       "description": "Source system where reading was submitted"
             *     },
             *     "required": true
             *   },
             *   "meter_id": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the meter"
             *     },
             *     "required": true
             *   },
             *   "counter_id": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the meter counter"
             *     },
             *     "required": true
             *   },
             *   "meter_number": {
             *     "json_schema": {
             *       "type": "string",
             *       "description": "Human-readable meter number"
             *     },
             *     "required": false
             *   },
             *   "obis_number": {
             *     "json_schema": {
             *       "type": "string",
             *       "description": "OBIS code of the counter"
             *     },
             *     "required": false
             *   },
             *   "unit": {
             *     "json_schema": {
             *       "type": "string",
             *       "description": "Unit of measurement (e.g., kWh, m3)"
             *     },
             *     "required": false
             *   },
             *   "customer_id": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the customer"
             *     },
             *     "required": false
             *   },
             *   "contract_id": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "uuid",
             *       "description": "Entity ID of the contract"
             *     },
             *     "required": false
             *   },
             *   "user_id": {
             *     "json_schema": {
             *       "type": "string",
             *       "description": "ID of the user who submitted the reading"
             *     },
             *     "required": false
             *   },
             *   "user_email": {
             *     "json_schema": {
             *       "type": "string",
             *       "format": "email",
             *       "description": "Email of the user who submitted the reading"
             *     },
             *     "required": false
             *   }
             * }
             */
            schema_fields: {
                [name: string]: SchemaField;
            };
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
         *       "type": "integer",
         *       "description": "Schema version number"
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
        }
        export type SchemaField = /* A primitive JSON Schema field definition */ PrimitiveField | ContextEntity;
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
            export type $200 = Components.Schemas.EventConfig;
        }
    }
    namespace GetEventExample {
        namespace Parameters {
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
        }
    }
    namespace GetEventJSONSchema {
        namespace Parameters {
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
             *       "type": "integer",
             *       "description": "Schema version number"
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
        }
    }
    namespace ListEvents {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.EventConfig[];
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
                 *   "_event_version": 1,
                 *   "_event_source": "api",
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
   * getEventJSONSchema - getEventJSONSchema
   * 
   * Retrieve the JSON Schema of a specific business event
   */
  'getEventJSONSchema'(
    parameters?: Parameters<Paths.GetEventJSONSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventJSONSchema.Responses.$200>
  /**
   * getEventExample - getEventExample
   * 
   * Generate a sample event payload based on the event's JSON Schema
   */
  'getEventExample'(
    parameters?: Parameters<Paths.GetEventExample.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventExample.Responses.$200>
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
  }
  ['/v1/events/{event_name}/json_schema']: {
    /**
     * getEventJSONSchema - getEventJSONSchema
     * 
     * Retrieve the JSON Schema of a specific business event
     */
    'get'(
      parameters?: Parameters<Paths.GetEventJSONSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventJSONSchema.Responses.$200>
  }
  ['/v1/events/{event_name}/example']: {
    /**
     * getEventExample - getEventExample
     * 
     * Generate a sample event payload based on the event's JSON Schema
     */
    'get'(
      parameters?: Parameters<Paths.GetEventExample.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventExample.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CommonEventMetadata = Components.Schemas.CommonEventMetadata;
export type ContextEntity = Components.Schemas.ContextEntity;
export type Event = Components.Schemas.Event;
export type EventConfig = Components.Schemas.EventConfig;
export type EventJsonSchema = Components.Schemas.EventJsonSchema;
export type PrimitiveField = Components.Schemas.PrimitiveField;
export type SchemaField = Components.Schemas.SchemaField;
export type SearchOptions = Components.Schemas.SearchOptions;
