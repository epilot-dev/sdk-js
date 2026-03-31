# ERP Integration API

- **Base URL:** `https://erp-integration-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/erp-integration](https://docs.epilot.io/api/erp-integration)

API for integrating with ERP systems, handling tracking acknowledgments, triggering ERP processes, and processing ERP updates.

## Quick Start

```bash
# List available operations
epilot erp-integration

# Call an operation
epilot erp-integration acknowledgeTracking
```

## Common Flags

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

## Operations

**erp**
- [`acknowledgeTracking`](#acknowledgetracking) — Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication
- [`triggerErp`](#triggererp) — Triggers the ERP integration process
- [`processErpUpdatesEventsV3`](#processerpupdateseventsv3) — Handles updates from ERP systems using integration_id directly.
- [`simulateMappingV2`](#simulatemappingv2) — Test v2.0 mapping configuration by transforming a payload using the provided mapping rules without persisting data.
- [`simulateMapping`](#simulatemapping) — Test mapping configuration by transforming a payload using the provided mapping rules without persisting data.

**integrations**
- [`listIntegrations`](#listintegrations) — Retrieve all integrations for the authenticated organization
- [`createIntegration`](#createintegration) — Create a new integration configuration
- [`getIntegration`](#getintegration) — Retrieve a specific integration by its ID
- [`updateIntegration`](#updateintegration) — Update an existing integration configuration
- [`deleteIntegration`](#deleteintegration) — Delete an integration and all its use cases
- [`queryEvents`](#queryevents) — Query events for a specific integration
- [`replayEvents`](#replayevents) — Replay one or more events for a specific integration. Events will be re-processed with their original payloads but with 
- [`listUseCases`](#listusecases) — Retrieve all use cases for a specific integration
- [`createUseCase`](#createusecase) — Create a new use case for an integration
- [`getUseCase`](#getusecase) — Retrieve a specific use case by its ID
- [`updateUseCase`](#updateusecase) — Update an existing use case configuration
- [`deleteUseCase`](#deleteusecase) — Delete a use case from an integration
- [`listUseCaseHistory`](#listusecasehistory) — Retrieve historical versions of a use case's configuration.
- [`listIntegrationsV2`](#listintegrationsv2) — Retrieve all integrations with embedded use cases for the authenticated organization
- [`createIntegrationV2`](#createintegrationv2) — Create a new integration with embedded use cases.
- [`getIntegrationV2`](#getintegrationv2) — Retrieve a specific integration with all its embedded use cases
- [`updateIntegrationV2`](#updateintegrationv2) — Update an existing integration with embedded use cases.
- [`deleteIntegrationV2`](#deleteintegrationv2) — Delete an integration and all its use cases
- [`setIntegrationAppMapping`](#setintegrationappmapping) — Creates or updates a mapping from an app/component to an integration.
- [`deleteIntegrationAppMapping`](#deleteintegrationappmapping) — Removes a mapping from an app/component to an integration.
- [`getOutboundStatus`](#getoutboundstatus) — Get the status of all outbound use cases for a specific integration.
- [`listSecureProxies`](#listsecureproxies) — Lists all secure_proxy use cases across all integrations for the authenticated organization.

**monitoring**
- [`queryInboundMonitoringEvents`](#queryinboundmonitoringevents) — Query inbound monitoring events for a specific integration.
- [`getMonitoringStats`](#getmonitoringstats) — Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.
- [`getMonitoringTimeSeries`](#getmonitoringtimeseries) — Get time-series aggregated event counts for monitoring charts.
- [`queryAccessLogs`](#queryaccesslogs) — Query API access logs for a specific integration's organization.
- [`queryOutboundMonitoringEvents`](#queryoutboundmonitoringevents) — Query outbound monitoring events for a specific integration.

**proxy**
- [`secureProxy`](#secureproxy) — Routes an HTTP request through a VPC with either static IP egress or VPN secure link access.

**managed-call**
- [`managedCallExecute`](#managedcallexecute) — Execute a managed call operation synchronously. The slug in the path acts as the RPC method name.

### `acknowledgeTracking`

Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication

`POST /v1/erp/tracking/acknowledgement`

**Request Body**

**Sample Call**

```bash
epilot erp-integration acknowledgeTracking \
  -d '{"ack_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration acknowledgeTracking
```

With JSONata filter:

```bash
epilot erp-integration acknowledgeTracking --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `triggerErp`

Triggers the ERP integration process

`POST /v1/erp/trigger`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration triggerErp
```

With request body:

```bash
epilot erp-integration triggerErp \
  -d '{
  "execution_id": "string",
  "org_id": "string",
  "webhook_id": "string",
  "flow_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "action_id": "string",
  "flow_action_id": "string",
  "flow_name": "string",
  "activity_id": "string",
  "entity_id": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration triggerErp
```

With JSONata filter:

```bash
epilot erp-integration triggerErp --jsonata 'status_code'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status_code": "string",
  "message": "string",
  "body": {},
  "code": "string",
  "status": "succeeded",
  "start_date": "string",
  "end_date": "string",
  "event_id": "string"
}
```

</details>

---

### `processErpUpdatesEventsV3`

Handles updates from ERP systems using integration_id directly.

`POST /v3/erp/updates/events`

**Request Body**

**Sample Call**

```bash
epilot erp-integration processErpUpdatesEventsV3 \
  -d '{"integration_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","correlation_id":"string","events":[{},{}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration processErpUpdatesEventsV3
```

With JSONata filter:

```bash
epilot erp-integration processErpUpdatesEventsV3 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "event_id": "string",
      "status": "success",
      "message": "string"
    }
  ]
}
```

</details>

---

### `simulateMappingV2`

Test v2.0 mapping configuration by transforming a payload using the provided mapping rules without persisting data.

`POST /v2/erp/updates/mapping_simulation`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration simulateMappingV2
```

With request body:

```bash
epilot erp-integration simulateMappingV2 \
  -d '{
  "event_configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  },
  "format": "json",
  "payload": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration simulateMappingV2
```

With JSONata filter:

```bash
epilot erp-integration simulateMappingV2 --jsonata 'entity_updates'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {}
    }
  ],
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "attributes": {}
    }
  ],
  "warnings": [
    {
      "entity_schema": "string",
      "field": "string",
      "message": "string"
    }
  ]
}
```

</details>

---

### `simulateMapping`

Test mapping configuration by transforming a payload using the provided mapping rules without persisting data.

`POST /v1/erp/updates/mapping_simulation`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration simulateMapping
```

With request body:

```bash
epilot erp-integration simulateMapping \
  -d '{
  "mapping_configuration": {
    "version": "1.0",
    "mapping": {
      "objects": {}
    }
  },
  "object_type": "string",
  "format": "json",
  "payload": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration simulateMapping
```

With JSONata filter:

```bash
epilot erp-integration simulateMapping --jsonata 'entity_updates'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {}
    }
  ],
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "attributes": {}
    }
  ],
  "warnings": [
    {
      "entity_schema": "string",
      "field": "string",
      "message": "string"
    }
  ]
}
```

</details>

---

### `listIntegrations`

Retrieve all integrations for the authenticated organization

`GET /v1/integrations`

**Sample Call**

```bash
epilot erp-integration listIntegrations
```

With JSONata filter:

```bash
epilot erp-integration listIntegrations --jsonata 'integrations'
```

<details>
<summary>Sample Response</summary>

```json
{
  "integrations": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "name": "string",
      "description": "string",
      "access_token_ids": ["string"],
      "app_ids": ["string"],
      "environment_config": [
        {
          "key": "string",
          "label": "string",
          "type": "String",
          "description": "string",
          "required": false,
          "order": 0
        }
      ],
      "settings": {
        "autoRefresh": {
          "enabled": false,
          "freshnessThresholdMinutes": 1
        }
      },
      "integration_type": "erp",
      "connector_config": {
        "base_url": "string",
        "auth": {
          "type": "oauth2_client_credentials",
          "token_url": "string",
          "client_id": "string",
          "client_secret": "string",
          "scope": "string",
          "audience": "string",
          "resource": "string",
          "body_params": {},
          "headers": {},
          "query_params": {},
          "api_key_header": "string",
          "api_key": "string",
          "token": "string"
        }
      },
      "protected": true
    }
  ]
}
```

</details>

---

### `createIntegration`

Create a new integration configuration

`POST /v1/integrations`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration createIntegration
```

With request body:

```bash
epilot erp-integration createIntegration \
  -d '{
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration createIntegration
```

With JSONata filter:

```bash
epilot erp-integration createIntegration --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true
}
```

</details>

---

### `getIntegration`

Retrieve a specific integration by its ID

`GET /v1/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration getIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration getIntegration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true
}
```

</details>

---

### `updateIntegration`

Update an existing integration configuration

`PUT /v1/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration updateIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot erp-integration updateIntegration 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration updateIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration updateIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true
}
```

</details>

---

### `deleteIntegration`

Delete an integration and all its use cases

`DELETE /v1/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration deleteIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration deleteIntegration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration deleteIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `queryEvents`

Query events for a specific integration

`POST /v1/integrations/{integrationId}/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration queryEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration queryEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "event_id": "string",
  "event_type": "CREATE",
  "correlation_id": "string",
  "object_type": "string",
  "event_name": "string",
  "limit": 25,
  "cursor": {
    "event_time": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration queryEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration queryEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration queryEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "event_type": "CREATE",
      "object_type": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "format": "json",
      "payload": "string",
      "deduplication_id": "evt-2025-05-01-12345-create-bp"
    }
  ],
  "next_cursor": {
    "event_time": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  },
  "has_more": true
}
```

</details>

---

### `replayEvents`

Replay one or more events for a specific integration. Events will be re-processed with their original payloads but with 

`POST /v1/integrations/{integrationId}/events/replay`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration replayEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"event_ids":["string"]}'
```

Using positional args for path parameters:

```bash
epilot erp-integration replayEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration replayEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration replayEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'event_ids'
```

<details>
<summary>Sample Response</summary>

```json
{
  "event_ids": ["string"]
}
```

</details>

---

### `listUseCases`

Retrieve all use cases for a specific integration

`GET /v1/integrations/{integrationId}/use-cases`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration listUseCases \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration listUseCases 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration listUseCases -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'use_cases'
```

<details>
<summary>Sample Response</summary>

```json
{
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `createUseCase`

Create a new use case for an integration

`POST /v1/integrations/{integrationId}/use-cases`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration createUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration createUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "slug": "string",
  "enabled": true,
  "type": "inbound",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration createUseCase 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration createUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration createUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `getUseCase`

Retrieve a specific use case by its ID

`GET /v1/integrations/{integrationId}/use-cases/{useCaseId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |

**Sample Call**

```bash
epilot erp-integration getUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration getUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `updateUseCase`

Update an existing use case configuration

`PUT /v1/integrations/{integrationId}/use-cases/{useCaseId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration updateUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration updateUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "slug": "string",
  "enabled": true,
  "change_description": "string",
  "type": "inbound",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration updateUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration updateUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration updateUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `deleteUseCase`

Delete a use case from an integration

`DELETE /v1/integrations/{integrationId}/use-cases/{useCaseId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |

**Sample Call**

```bash
epilot erp-integration deleteUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration deleteUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration deleteUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `listUseCaseHistory`

Retrieve historical versions of a use case's configuration.

`GET /v1/integrations/{integrationId}/use-cases/{useCaseId}/history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |
| `cursor` | query | string | No | Opaque pagination cursor. Pass the 'next_cursor' value from a previous
response to fetch the next page of results.
 |

**Sample Call**

```bash
epilot erp-integration listUseCaseHistory \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration listUseCaseHistory 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration listUseCaseHistory -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
```

<details>
<summary>Sample Response</summary>

```json
{
  "history": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "useCaseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "history_created_at": "1970-01-01T00:00:00.000Z",
      "type": "inbound",
      "configuration": {}
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `listIntegrationsV2`

Retrieve all integrations with embedded use cases for the authenticated organization

`GET /v2/integrations`

**Sample Call**

```bash
epilot erp-integration listIntegrationsV2
```

With JSONata filter:

```bash
epilot erp-integration listIntegrationsV2 --jsonata 'integrations'
```

<details>
<summary>Sample Response</summary>

```json
{
  "integrations": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "name": "string",
      "description": "string",
      "access_token_ids": ["string"],
      "app_ids": ["string"],
      "environment_config": [],
      "settings": {},
      "integration_type": "erp",
      "connector_config": {},
      "protected": true,
      "use_cases": []
    }
  ]
}
```

</details>

---

### `createIntegrationV2`

Create a new integration with embedded use cases.

`POST /v2/integrations`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration createIntegrationV2
```

With request body:

```bash
epilot erp-integration createIntegrationV2 \
  -d '{
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "change_description": "string",
      "type": "inbound",
      "configuration": {}
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration createIntegrationV2
```

With JSONata filter:

```bash
epilot erp-integration createIntegrationV2 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `getIntegrationV2`

Retrieve a specific integration with all its embedded use cases

`GET /v2/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration getIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration getIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `updateIntegrationV2`

Update an existing integration with embedded use cases.

`PUT /v2/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID (client-provided) |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration updateIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration updateIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "change_description": "string",
      "type": "inbound",
      "configuration": {}
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration updateIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration updateIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration updateIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    }
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `deleteIntegrationV2`

Delete an integration and all its use cases

`DELETE /v2/integrations/{integrationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration deleteIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration deleteIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration deleteIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `setIntegrationAppMapping`

Creates or updates a mapping from an app/component to an integration.

`PUT /v1/integrations/{integrationId}/app-mapping`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID to map to |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration setIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration setIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "app_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "component_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "overwrite": false
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration setIntegrationAppMapping 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration setIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration setIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'integration_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `deleteIntegrationAppMapping`

Removes a mapping from an app/component to an integration.

`DELETE /v1/integrations/{integrationId}/app-mapping`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID (used for authorization, must match the mapping) |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration deleteIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"app_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","component_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}'
```

Using positional args for path parameters:

```bash
epilot erp-integration deleteIntegrationAppMapping 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration deleteIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration deleteIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `queryInboundMonitoringEvents`

Query inbound monitoring events for a specific integration.

`POST /v1/integrations/{integrationId}/monitoring/inbound-events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration queryInboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration queryInboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "event_type": "CREATE",
  "sync_type": "entity",
  "status": "success",
  "error_category": "validation",
  "correlation_id": "string",
  "object_type": "string",
  "event_name": "string",
  "event_id": "string",
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "limit": 50,
  "cursor": {
    "completed_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration queryInboundMonitoringEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration queryInboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration queryInboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "org_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "integration_id": "string",
      "use_case_id": "string",
      "event_type": "CREATE",
      "object_type": "string",
      "sync_type": "entity",
      "status": "success",
      "error_code": "string",
      "error_message": "string",
      "error_category": "validation",
      "processing_duration_ms": 0,
      "received_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "completed_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `getMonitoringStats`

Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.

`POST /v1/integrations/{integrationId}/monitoring/stats`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration getMonitoringStats \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration getMonitoringStats \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "inbound_group_by": ["use_case_id", "status"],
  "outbound_group_by": ["event_name", "status"]
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration getMonitoringStats 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration getMonitoringStats -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getMonitoringStats -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'inbound'
```

<details>
<summary>Sample Response</summary>

```json
{
  "inbound": {
    "total_events": 0,
    "total_correlations": 0,
    "success_count": 0,
    "error_count": 0,
    "skipped_count": 0,
    "warning_count": 0,
    "success_rate": 0,
    "last_error_at": "1970-01-01T00:00:00.000Z",
    "breakdown": [
      {}
    ]
  },
  "outbound": {
    "total_events": 0,
    "success_count": 0,
    "error_count": 0,
    "pending_count": 0,
    "success_rate": 0,
    "last_error_at": "1970-01-01T00:00:00.000Z",
    "breakdown": [
      {}
    ]
  }
}
```

</details>

---

### `getMonitoringTimeSeries`

Get time-series aggregated event counts for monitoring charts.

`POST /v1/integrations/{integrationId}/monitoring/timeseries`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration getMonitoringTimeSeries \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"from_date":"2025-01-01T00:00:00Z","to_date":"2025-01-31T23:59:59Z","interval":"1h","direction":"both"}'
```

Using positional args for path parameters:

```bash
epilot erp-integration getMonitoringTimeSeries 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration getMonitoringTimeSeries -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getMonitoringTimeSeries -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'interval'
```

<details>
<summary>Sample Response</summary>

```json
{
  "interval": "5m",
  "from_date": "1970-01-01T00:00:00.000Z",
  "to_date": "1970-01-01T00:00:00.000Z",
  "buckets": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "inbound": {
        "success_count": 0,
        "error_count": 0,
        "warning_count": 0,
        "skipped_count": 0,
        "total_count": 0
      },
      "outbound": {
        "success_count": 0,
        "error_count": 0,
        "pending_count": 0,
        "total_count": 0
      }
    }
  ]
}
```

</details>

---

### `getOutboundStatus`

Get the status of all outbound use cases for a specific integration.

`GET /v1/integrations/{integrationId}/outbound-status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot erp-integration getOutboundStatus \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot erp-integration getOutboundStatus 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration getOutboundStatus -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'useCases'
```

<details>
<summary>Sample Response</summary>

```json
{
  "useCases": [
    {
      "useCaseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "useCaseEnabled": true,
      "eventCatalogEvent": "contract.created",
      "eventEnabled": true,
      "webhooks": [
        {
          "webhookId": "string",
          "webhookName": "string",
          "enabled": true
        }
      ],
      "status": "ok",
      "conflicts": [
        {
          "type": "event_disabled",
          "webhookId": "string",
          "message": "string"
        }
      ]
    }
  ]
}
```

</details>

---

### `queryAccessLogs`

Query API access logs for a specific integration's organization.

`POST /v1/integrations/{integrationId}/monitoring/access-logs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID (used for tenant authorization) |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration queryAccessLogs \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration queryAccessLogs \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "token_id": "api_5ZugdRXasLfWBypHi93Fk",
  "service": "entity",
  "method": "GET",
  "path": "/v1/entity",
  "status": 200,
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "limit": 50,
  "cursor": {
    "timestamp": "1970-01-01T00:00:00.000Z",
    "request_id": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration queryAccessLogs 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration queryAccessLogs -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration queryAccessLogs -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "environment": "string",
      "service": "string",
      "request_id": "string",
      "method": "string",
      "path": "string",
      "status": 0,
      "response_latency_ms": 0,
      "response_length": 0,
      "token_id": "string",
      "org_id": "string",
      "origin": "string",
      "source_ip": "string"
    }
  ],
  "next_cursor": {
    "timestamp": "1970-01-01T00:00:00.000Z",
    "request_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `queryOutboundMonitoringEvents`

Query outbound monitoring events for a specific integration.

`POST /v1/integrations/{integrationId}/monitoring/outbound-events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration queryOutboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot erp-integration queryOutboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "event_name": "automation_flow_target",
  "status": "succeeded",
  "webhook_config_id": "string",
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "limit": 50,
  "cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot erp-integration queryOutboundMonitoringEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration queryOutboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot erp-integration queryOutboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "org_id": "string",
      "event_id": "string",
      "event_name": "string",
      "status": "succeeded",
      "url": "string",
      "http_method": "string",
      "http_response": {},
      "webhook_config_id": "string",
      "metadata": {},
      "execution_context": {},
      "payload": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `listSecureProxies`

Lists all secure_proxy use cases across all integrations for the authenticated organization.

`GET /v1/integrations/secure-proxies`

**Sample Call**

```bash
epilot erp-integration listSecureProxies
```

With JSONata filter:

```bash
epilot erp-integration listSecureProxies --jsonata 'secure_proxies'
```

<details>
<summary>Sample Response</summary>

```json
{
  "secure_proxies": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "vpc_mode": "static_ip",
      "allowed_domains": ["string"],
      "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integration_name": "string"
    }
  ]
}
```

</details>

---

### `secureProxy`

Routes an HTTP request through a VPC with either static IP egress or VPN secure link access.

`POST /v1/secure-proxy`

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration secureProxy
```

With request body:

```bash
epilot erp-integration secureProxy \
  -d '{
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "use_case_slug": "string",
  "url": "https://example.com/path",
  "method": "GET",
  "headers": {},
  "body": {},
  "response_type": "json"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration secureProxy
```

With JSONata filter:

```bash
epilot erp-integration secureProxy --jsonata 'status_code'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status_code": 0,
  "headers": {},
  "body": {}
}
```

</details>

---

### `managedCallExecute`

Execute a managed call operation synchronously. The slug in the path acts as the RPC method name.

`POST /v1/managed-call/{slug}/execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Use case slug (acts as the RPC method name) |

**Request Body** (required)

**Sample Call**

```bash
epilot erp-integration managedCallExecute \
  -p slug=contact \
  -d '{"integration_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","payload":{},"correlation_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot erp-integration managedCallExecute contact
```

Using stdin pipe:

```bash
cat body.json | epilot erp-integration managedCallExecute -p slug=contact
```

With JSONata filter:

```bash
epilot erp-integration managedCallExecute -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---
