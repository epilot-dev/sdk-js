# Event Catalog API

**Base URL:** `https://event-catalog.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/event-catalog](https://docs.epilot.io/api/event-catalog)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.eventCatalog.listEvents(...)

// Or get the client explicitly
const eventCatalogClient = await epilot.eventCatalog.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/event-catalog'

const eventCatalogClient = await getClient()
authorize(eventCatalogClient, () => '<token>')
const { data } = await eventCatalogClient.listEvents(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/event-catalog'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Event Catalog**
- [`listEvents`](#listevents)
- [`getEvent`](#getevent)
- [`patchEvent`](#patchevent)
- [`getEventJSONSchema`](#geteventjsonschema)
- [`getEventExample`](#geteventexample)
- [`searchEventHistory`](#searcheventhistory)
- [`triggerEvent`](#triggerevent)

### `listEvents`

Retrieve list of available business events

`GET /v1/events`

```ts
const { data } = await client.listEvents()
```

**Response**

```json
{
  "results": [
    {
      "event_name": "AddMeterReading",
      "event_title": "Add Meter Reading",
      "event_description": "Triggered when a new meter reading is added",
      "event_version": "1.0.0",
      "event_status": "active",
      "event_tags": [],
      "schema_fields": {},
      "entity_graph": {},
      "entity_operation": {},
      "enabled": true,
      "auto_trigger": true,
      "automation_trigger": true
    }
  ]
}
```

---

### `getEvent`

Retrieve the configuration of a specific business event

`GET /v1/events/{event_name}`

```ts
const { data } = await client.getEvent({
  event_name: 'example',
})
```

**Response**

```json
{
  "event_name": "AddMeterReading",
  "event_title": "Add Meter Reading",
  "event_description": "Triggered when a new meter reading is added",
  "event_version": "1.0.0",
  "event_status": "active",
  "event_tags": [
    "builtin",
    "metering",
    "erp"
  ],
  "schema_fields": {},
  "entity_graph": {
    "nodes": [
      {}
    ],
    "edges": [
      {}
    ]
  },
  "entity_operation": {
    "operation": [
      "createEntity",
      "updateEntity"
    ],
    "schema": [
      "contact",
      "contract",
      "order"
    ],
    "attribute": [
      "email",
      "phone",
      "status"
    ],
    "purpose": [
      "Kündigung",
      "Umzug/Auszug"
    ]
  },
  "enabled": true,
  "auto_trigger": true,
  "automation_trigger": true
}
```

---

### `patchEvent`

Update the configuration of a specific business event for the organization

`PATCH /v1/events/{event_name}`

```ts
const { data } = await client.patchEvent(
  {
    event_name: 'example',
  },
  {
    event_name: 'AddMeterReading',
    event_title: 'Add Meter Reading',
    event_description: 'Triggered when a new meter reading is added',
    event_version: '1.0.0',
    event_status: 'active',
    event_tags: [
      'builtin',
      'metering',
      'erp'
    ],
    schema_fields: {},
    entity_graph: {
      nodes: [
        { /* ... */ }
      ],
      edges: [
        { /* ... */ }
      ]
    },
    entity_operation: {
      operation: [
        'createEntity',
        'updateEntity'
      ],
      schema: [
        'contact',
        'contract',
        'order'
      ],
      attribute: [
        'email',
        'phone',
        'status'
      ],
      purpose: [
        'Kündigung',
        'Umzug/Auszug'
      ]
    },
    enabled: true,
    auto_trigger: true,
    automation_trigger: true
  },
)
```

**Response**

```json
{
  "event_name": "AddMeterReading",
  "event_title": "Add Meter Reading",
  "event_description": "Triggered when a new meter reading is added",
  "event_version": "1.0.0",
  "event_status": "active",
  "event_tags": [
    "builtin",
    "metering",
    "erp"
  ],
  "schema_fields": {},
  "entity_graph": {
    "nodes": [
      {}
    ],
    "edges": [
      {}
    ]
  },
  "entity_operation": {
    "operation": [
      "createEntity",
      "updateEntity"
    ],
    "schema": [
      "contact",
      "contract",
      "order"
    ],
    "attribute": [
      "email",
      "phone",
      "status"
    ],
    "purpose": [
      "Kündigung",
      "Umzug/Auszug"
    ]
  },
  "enabled": true,
  "auto_trigger": true,
  "automation_trigger": true
}
```

---

### `getEventJSONSchema`

Retrieve the JSON Schema of a specific business event

`GET /v1/events/{event_name}/json_schema`

```ts
const { data } = await client.getEventJSONSchema({
  event_name: 'example',
})
```

**Response**

```json
{
  "type": "object",
  "properties": {
    "_org_id": {
      "type": "string",
      "description": "epilot tenant/organization ID"
    },
    "_event_time": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp when event occurred"
    },
    "_event_id": {
      "type": "string",
      "description": "Unique event identifier (ULID)"
    },
    "_event_name": {
      "type": "string",
      "description": "Event name from catalog"
    },
    "_event_version": {
      "type": "string",
      "description": "Event version (semver)"
    },
    "_event_source": {
      "type": "string",
      "description": "Source that triggered the event"
    },
    "reading_value": {
      "type": "number",
      "description": "The meter reading value"
    },
    "reading_date": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp when reading was taken"
    },
    "read_by": {
      "type": "string",
      "description": "Name or identifier of who submitted the reading"
    },
    "reason": {
      "type": "string",
      "enum": [],
      "description": "Reason for the meter reading"
    },
    "direction": {
      "type": "string",
      "enum": [],
      "description": "Direction of energy flow"
    },
    "source": {
      "type": "string",
      "enum": [],
      "description": "Source system where reading was submitted"
    },
    "meter_id": {
      "type": "string",
      "format": "uuid",
      "description": "Entity ID of the meter"
    },
    "counter_id": {
      "type": "string",
      "format": "uuid",
      "description": "Entity ID of the meter counter"
    },
    "meter_number": {
      "type": "string",
      "description": "Human-readable meter number"
    },
    "obis_number": {
      "type": "string",
      "description": "OBIS code of the counter"
    },
    "unit": {
      "type": "string",
      "description": "Unit of measurement (e.g., kWh, m3)"
    },
    "customer_id": {
      "type": "string",
      "format": "uuid",
      "description": "Entity ID of the customer"
    },
    "contract_id": {
      "type": "string",
      "format": "uuid",
      "description": "Entity ID of the contract"
    },
    "user_id": {
      "type": "string",
      "description": "ID of the user who submitted the reading"
    },
    "user_email": {
      "type": "string",
      "format": "email",
      "description": "Email of the user who submitted the reading"
    }
  },
  "required": [
    "_org_id",
    "_event_time",
    "_event_id",
    "_event_name",
    "_event_version",
    "_event_source",
    "reading_value",
    "reading_date",
    "read_by",
    "reason",
    "direction",
    "source",
    "meter_id",
    "counter_id",
    "meter_number",
    "obis_number",
    "unit",
    "customer_id",
    "contract_id"
  ]
}
```

---

### `getEventExample`

Generate a sample event payload based on the event's JSON Schema

`GET /v1/events/{event_name}/example`

```ts
const { data } = await client.getEventExample({
  event_name: 'example',
})
```

**Response**

```json
{}
```

---

### `searchEventHistory`

Paginated history of events

`POST /v1/events/{event_name}:history`

```ts
const { data } = await client.searchEventHistory(
  {
    event_name: 'example',
  },
  {
    limit: 10,
    cursor: {
      event_time: '2025-10-31 12:34:56',
      event_id: 'evt_1234567890abcdef'
    },
    timestamp: {
      from: '2025-10-01T00:00:00Z',
      to: '2025-10-31T23:59:59Z'
    },
    event_id: 'evt_1234567890abcdef'
  },
)
```

**Response**

```json
{
  "results": [
    {
      "_org_id": "org_123456",
      "_event_time": "2024-01-01T12:00:00Z",
      "_event_id": "01FZ4Z5FZ5FZ5FZ5FZ5FZ5FZ5F",
      "_event_name": "MeterReading",
      "_event_version": "1.0.0",
      "_event_source": "api",
      "_trigger_source_type": "api",
      "_trigger_source": "user_123456",
      "reading_value": 123.45,
      "reading_date": "2024-01-01T11:59:00Z",
      "read_by": "John Doe",
      "reason": "regular",
      "direction": "feed-out",
      "source": "portal",
      "meter_id": "550e8400-e29b-41d4-a716-446655440000",
      "counter_id": "660e8400-e29b-41d4-a716-446655440000",
      "meter_number": "MT123456789",
      "obis_number": "1-0:1.8.0",
      "unit": "kWh",
      "customer_id": "770e8400-e29b-41d4-a716-446655440000",
      "contract_id": "880e8400-e29b-41d4-a716-446655440000"
    }
  ],
  "next_cursor": {
    "event_time": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  }
}
```

---

### `triggerEvent`

Explicitly trigger an event by providing input field values and an optional entity seed
for graph hydration. The event must be enabled for the organization.

`POST /v1/events/{event_name}:trigger`

```ts
const { data } = await client.triggerEvent(
  {
    event_name: 'example',
  },
  {
    seed: {
      entity_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      node_id: 'string'
    },
    fields: {},
    skip_hydration: [
      'string'
    ],
    _trigger_source_type: 'string',
    _trigger_source: 'string'
  },
)
```

**Response**

```json
{
  "success": true,
  "event_id": "string",
  "event_bridge_event_id": "string"
}
```

---

## Schemas

### `EventConfigBase`

Base properties shared between EventConfig and UpdateEventPayload

```ts
type EventConfigBase = {
  event_name?: string
  event_title?: string
  event_description?: string
  event_version?: string
  event_status?: "active" | "deprecated" | "draft" | "disabled"
  event_tags?: string[]
  schema_fields?: Record<string, {
    json_schema: object
    required?: boolean
    graph_source?: string
  } | {
    entity_schema: string
    required?: boolean
  }>
  entity_graph?: {
    nodes: Array<{
      id: { ... }
      schema: { ... }
      cardinality?: { ... }
      fields?: { ... }
    }>
    edges: Array<{
      from: { ... }
      to: { ... }
    }>
  }
  entity_operation?: {
    operation: "createEntity" | "updateEntity" | "deleteEntity"[]
    schema: string[]
  // ...
}
```

### `EventConfig`

Event configuration with required fields

```ts
type EventConfig = {
  event_name: string
  event_title?: string
  event_description?: string
  event_version: string
  event_status?: "active" | "deprecated" | "draft" | "disabled"
  event_tags?: string[]
  schema_fields: Record<string, {
    json_schema: object
    required?: boolean
    graph_source?: string
  } | {
    entity_schema: string
    required?: boolean
  }>
  entity_graph?: {
    nodes: Array<{
      id: { ... }
      schema: { ... }
      cardinality?: { ... }
      fields?: { ... }
    }>
    edges: Array<{
      from: { ... }
      to: { ... }
    }>
  }
  entity_operation?: {
    operation: "createEntity" | "updateEntity" | "deleteEntity"[]
    schema: string[]
  // ...
}
```

### `UpdateEventPayload`

Payload for updating an event configuration.
Accepts the same fields as EventConfig (all optional for PATCH).
Currently only `enabled` and `auto_trigger` fields are processed, other fields are ignored.


```ts
type UpdateEventPayload = {
  event_name?: string
  event_title?: string
  event_description?: string
  event_version?: string
  event_status?: "active" | "deprecated" | "draft" | "disabled"
  event_tags?: string[]
  schema_fields?: Record<string, {
    json_schema: object
    required?: boolean
    graph_source?: string
  } | {
    entity_schema: string
    required?: boolean
  }>
  entity_graph?: {
    nodes: Array<{
      id: { ... }
      schema: { ... }
      cardinality?: { ... }
      fields?: { ... }
    }>
    edges: Array<{
      from: { ... }
      to: { ... }
    }>
  }
  entity_operation?: {
    operation: "createEntity" | "updateEntity" | "deleteEntity"[]
    schema: string[]
  // ...
}
```

### `PrimitiveField`

A primitive JSON Schema field definition

```ts
type PrimitiveField = {
  json_schema: object
  required?: boolean
  graph_source?: string
}
```

### `ContextEntity`

```ts
type ContextEntity = {
  entity_schema: string
  required?: boolean
}
```

### `SchemaField`

```ts
type SchemaField = {
  json_schema: object
  required?: boolean
  graph_source?: string
} | {
  entity_schema: string
  required?: boolean
}
```

### `CommonEventMetadata`

Common metadata fields present in all event payloads

```ts
type CommonEventMetadata = object
```

### `EventJsonSchema`

JSON Schema declaring the event payload structure

```ts
type EventJsonSchema = object
```

### `Event`

An event instance in the event history

```ts
type Event = {
  _org_id: string
  _event_time: string // date-time
  _event_id: string
  _event_name: string
  _event_version: string
  _event_source: string
  _trigger_source_type?: string
  _trigger_source?: string
  _ack_id?: string
}
```

### `GraphDefinition`

Entity graph definition for resolving related entities

```ts
type GraphDefinition = {
  nodes: Array<{
    id: string
    schema: string
    cardinality?: "one" | "many"
    fields?: object
  }>
  edges: Array<{
    from: string
    to: string
  }>
}
```

### `GraphNode`

A node in the entity graph

```ts
type GraphNode = {
  id: string
  schema: string
  cardinality?: "one" | "many"
  fields?: object
}
```

### `GraphEdge`

An edge connecting two nodes in the graph

```ts
type GraphEdge = {
  from: string
  to: string
}
```

### `EntityOperationTrigger`

Configuration for triggering an event based on entity operations.

When an entity operation matches the configured criteria, the event will be triggered.
- On createEntity: the attribute must be present in the entity payload
- On updateEntity: the attribute must be in diff.added, diff.updated, or di

```ts
type EntityOperationTrigger = {
  operation: "createEntity" | "updateEntity" | "deleteEntity"[]
  schema: string[]
  attribute?: string[]
  purpose?: string[]
}
```

### `SearchOptions`

```ts
type SearchOptions = {
  limit?: number
  cursor?: {
    event_time?: string
    event_id?: string
  }
  timestamp?: {
    from?: string // date-time
    to?: string // date-time
  }
  event_id?: string
}
```

### `FieldsParam`

List of entity fields to include or exclude in the response

Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.

Globbing and globstart (**) is supported for nested fields.


```ts
type FieldsParam = string[]
```

### `TriggerEventPayload`

Payload for explicitly triggering an event via API

```ts
type TriggerEventPayload = {
  seed?: {
    entity_id: string // uuid
    node_id: string
  }
  fields?: Record<string, unknown>
  skip_hydration?: string[]
  _trigger_source_type?: string
  _trigger_source?: string
}
```

### `TriggerEventResponse`

Response from triggering an event

```ts
type TriggerEventResponse = {
  success: boolean
  event_id: string
  event_bridge_event_id?: string
}
```
