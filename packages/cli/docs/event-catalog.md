# Event Catalog API

- **Base URL:** `https://event-catalog.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/event-catalog](https://docs.epilot.io/api/event-catalog)

Manages the catalog of business events available in epilot

## Quick Start

```bash
# List available operations
epilot event-catalog

# Call an operation
epilot event-catalog listEvents
```

## Operations

**Event Catalog**
- [`listEvents`](#listevents) — Retrieve list of available business events
- [`getEvent`](#getevent) — Retrieve the configuration of a specific business event
- [`patchEvent`](#patchevent) — Update the configuration of a specific business event for the organization
- [`getEventJSONSchema`](#geteventjsonschema) — Retrieve the JSON Schema of a specific business event
- [`getEventExample`](#geteventexample) — Generate a sample event payload based on the event's JSON Schema
- [`searchEventHistory`](#searcheventhistory) — Paginated history of events
- [`triggerEvent`](#triggerevent) — Explicitly trigger an event by providing input field values and an optional entity seed

### `listEvents`

Retrieve list of available business events

`GET /v1/events`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog listEvents
```

With JSONata filter:

```bash
epilot event-catalog listEvents --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "event_name": "AddMeterReading",
      "event_title": "Add Meter Reading",
      "event_description": "Triggered when a new meter reading is added",
      "event_version": "1.0.0",
      "event_status": "active",
      "event_tags": ["builtin", "metering", "erp"],
      "schema_fields": {},
      "entity_graph": {
        "nodes": [
          {
            "id": "contact",
            "schema": "contact",
            "cardinality": "one",
            "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"]
          }
        ],
        "edges": [
          {
            "from": "contact",
            "to": "billing_account"
          }
        ]
      },
      "entity_operation": {
        "operation": ["createEntity", "updateEntity"],
        "schema": ["contact", "contract", "order"],
        "attribute": ["email", "phone", "status"],
        "purpose": ["Kündigung", "Umzug/Auszug"]
      },
      "enabled": true,
      "auto_trigger": true,
      "automation_trigger": true
    }
  ]
}
```

</details>

---

### `getEvent`

Retrieve the configuration of a specific business event

`GET /v1/events/{event_name}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog getEvent \
  -p event_name=example
```

Using positional args for path parameters:

```bash
epilot event-catalog getEvent example
```

With JSONata filter:

```bash
epilot event-catalog getEvent -p event_name=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "event_name": "AddMeterReading",
  "event_title": "Add Meter Reading",
  "event_description": "Triggered when a new meter reading is added",
  "event_version": "1.0.0",
  "event_status": "active",
  "event_tags": ["builtin", "metering", "erp"],
  "schema_fields": {},
  "entity_graph": {
    "nodes": [
      {
        "id": "contact",
        "schema": "contact",
        "cardinality": "one",
        "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"]
      }
    ],
    "edges": [
      {
        "from": "contact",
        "to": "billing_account"
      }
    ]
  },
  "entity_operation": {
    "operation": ["createEntity", "updateEntity"],
    "schema": ["contact", "contract", "order"],
    "attribute": ["email", "phone", "status"],
    "purpose": ["Kündigung", "Umzug/Auszug"]
  },
  "enabled": true,
  "auto_trigger": true,
  "automation_trigger": true
}
```

</details>

---

### `patchEvent`

Update the configuration of a specific business event for the organization

`PATCH /v1/events/{event_name}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog patchEvent \
  -p event_name=example
```

With request body:

```bash
epilot event-catalog patchEvent \
  -p event_name=example \
  -d '{
  "event_name": "AddMeterReading",
  "event_title": "Add Meter Reading",
  "event_description": "Triggered when a new meter reading is added",
  "event_version": "1.0.0",
  "event_status": "active",
  "event_tags": ["builtin", "metering", "erp"],
  "schema_fields": {},
  "entity_graph": {
    "nodes": [
      {
        "id": "contact",
        "schema": "contact",
        "cardinality": "one",
        "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"]
      }
    ],
    "edges": [
      {
        "from": "contact",
        "to": "billing_account"
      }
    ]
  },
  "entity_operation": {
    "operation": ["createEntity", "updateEntity"],
    "schema": ["contact", "contract", "order"],
    "attribute": ["email", "phone", "status"],
    "purpose": ["Kündigung", "Umzug/Auszug"]
  },
  "enabled": true,
  "auto_trigger": true,
  "automation_trigger": true
}'
```

Using positional args for path parameters:

```bash
epilot event-catalog patchEvent example
```

Using stdin pipe:

```bash
cat body.json | epilot event-catalog patchEvent -p event_name=example
```

With JSONata filter:

```bash
epilot event-catalog patchEvent -p event_name=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "event_name": "AddMeterReading",
  "event_title": "Add Meter Reading",
  "event_description": "Triggered when a new meter reading is added",
  "event_version": "1.0.0",
  "event_status": "active",
  "event_tags": ["builtin", "metering", "erp"],
  "schema_fields": {},
  "entity_graph": {
    "nodes": [
      {
        "id": "contact",
        "schema": "contact",
        "cardinality": "one",
        "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"]
      }
    ],
    "edges": [
      {
        "from": "contact",
        "to": "billing_account"
      }
    ]
  },
  "entity_operation": {
    "operation": ["createEntity", "updateEntity"],
    "schema": ["contact", "contract", "order"],
    "attribute": ["email", "phone", "status"],
    "purpose": ["Kündigung", "Umzug/Auszug"]
  },
  "enabled": true,
  "auto_trigger": true,
  "automation_trigger": true
}
```

</details>

---

### `getEventJSONSchema`

Retrieve the JSON Schema of a specific business event

`GET /v1/events/{event_name}/json_schema`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog getEventJSONSchema \
  -p event_name=example
```

Using positional args for path parameters:

```bash
epilot event-catalog getEventJSONSchema example
```

With JSONata filter:

```bash
epilot event-catalog getEventJSONSchema -p event_name=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "enum": ["regular", "move-in", "move-out", "supplier-change", "correction", "final"],
      "description": "Reason for the meter reading"
    },
    "direction": {
      "type": "string",
      "enum": ["feed-in", "feed-out"],
      "description": "Direction of energy flow"
    },
    "source": {
      "type": "string",
      "enum": ["portal", "360", "api", "automation"],
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
  "required": ["_org_id", "_event_time", "_event_id", "_event_name", "_event_version", "_event_source", "reading_value", "reading_date", "read_by", "reason", "direction", "source", "meter_id", "counter_id", "meter_number", "obis_number", "unit", "customer_id", "contract_id"]
}
```

</details>

---

### `getEventExample`

Generate a sample event payload based on the event's JSON Schema

`GET /v1/events/{event_name}/example`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog getEventExample \
  -p event_name=example
```

Using positional args for path parameters:

```bash
epilot event-catalog getEventExample example
```

With JSONata filter:

```bash
epilot event-catalog getEventExample -p event_name=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `searchEventHistory`

Paginated history of events

`POST /v1/events/{event_name}:history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog searchEventHistory \
  -p event_name=example
```

With request body:

```bash
epilot event-catalog searchEventHistory \
  -p event_name=example \
  -d '{
  "limit": 10,
  "cursor": {
    "event_time": "2025-10-31 12:34:56",
    "event_id": "evt_1234567890abcdef"
  },
  "timestamp": {
    "from": "2025-10-01T00:00:00Z",
    "to": "2025-10-31T23:59:59Z"
  },
  "event_id": "evt_1234567890abcdef"
}'
```

Using positional args for path parameters:

```bash
epilot event-catalog searchEventHistory example
```

Using stdin pipe:

```bash
cat body.json | epilot event-catalog searchEventHistory -p event_name=example
```

With JSONata filter:

```bash
epilot event-catalog searchEventHistory -p event_name=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `triggerEvent`

Explicitly trigger an event by providing input field values and an optional entity seed

`POST /v1/events/{event_name}:trigger`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_name` | path | string | Yes | Unique human readable name of the event |

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot event-catalog triggerEvent \
  -p event_name=example
```

With request body:

```bash
epilot event-catalog triggerEvent \
  -p event_name=example \
  -d '{
  "seed": {
    "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "node_id": "string"
  },
  "fields": {},
  "skip_hydration": ["string"],
  "_trigger_source_type": "string",
  "_trigger_source": "string"
}'
```

Using positional args for path parameters:

```bash
epilot event-catalog triggerEvent example
```

Using stdin pipe:

```bash
cat body.json | epilot event-catalog triggerEvent -p event_name=example
```

With JSONata filter:

```bash
epilot event-catalog triggerEvent -p event_name=example --jsonata 'success'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true,
  "event_id": "string",
  "event_bridge_event_id": "string"
}
```

</details>

---
