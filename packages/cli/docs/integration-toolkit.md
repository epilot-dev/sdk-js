# Integration Toolkit API

- **Base URL:** `https://integration-toolkit.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/integration-toolkit](https://docs.epilot.io/api/integration-toolkit)

API for integrating with external systems in a standardised way.

## Quick Start

```bash
# List available operations
epilot integration-toolkit

# Call an operation
epilot integration-toolkit acknowledgeTracking
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
- [`simulateDirect`](#simulatedirect) — Dry run for direct-mode payloads: validates a `DirectPayload` against a `direct: true`
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
- [`listDocumentationPages`](#listdocumentationpages) — Retrieve all documentation pages of an integration, without their markdown content.
- [`getDocumentationPage`](#getdocumentationpage) — Retrieve a single documentation page including its markdown content
- [`upsertDocumentationPage`](#upsertdocumentationpage) — Create or update the documentation page identified by docId.
- [`deleteDocumentationPage`](#deletedocumentationpage) — Delete a documentation page
- [`listIntegrationsV2`](#listintegrationsv2) — Retrieve all integrations with embedded use cases for the authenticated organization
- [`createIntegrationV2`](#createintegrationv2) — Create a new integration with embedded use cases.
- [`getIntegrationV2`](#getintegrationv2) — Retrieve a specific integration with all its embedded use cases
- [`updateIntegrationV2`](#updateintegrationv2) — Update an existing integration with embedded use cases.
- [`deleteIntegrationV2`](#deleteintegrationv2) — Delete an integration and all its use cases
- [`listNotificationHistory`](#listnotificationhistory) — Returns the cursor-paginated, newest-first notification history for an
- [`testSendNotification`](#testsendnotification) — Renders and sends ONE representative notification of the requested kind/type to
- [`getNotificationStatus`](#getnotificationstatus) — Returns the live per-rule alert state and (for 'auto' rules) the current
- [`getSecureProxyWhitelist`](#getsecureproxywhitelist) — Returns the current allowed_domains, allowed_ips, and vpc_mode for a secure_proxy use case.
- [`updateSecureProxyWhitelist`](#updatesecureproxywhitelist) — Replaces allowed_domains and/or allowed_ips on a secure_proxy use case.
- [`listSecureProxyWhitelistHistory`](#listsecureproxywhitelisthistory) — Returns the most recent USECASE_HISTORY entries for a secure_proxy use case,
- [`setIntegrationAppMapping`](#setintegrationappmapping) — Creates or updates a mapping from an app/component to an integration.
- [`deleteIntegrationAppMapping`](#deleteintegrationappmapping) — Removes a mapping from an app/component to an integration.
- [`getOutboundStatus`](#getoutboundstatus) — Get the status of all outbound use cases for a specific integration.
- [`getEntitySyncStatus`](#getentitysyncstatus) — Get the inbound ERP sync status of an entity: when each integration last
- [`pollOutboundMessages`](#polloutboundmessages) — Poll outbound messages for an integration's poll-mode use cases.
- [`ackOutboundMessages`](#ackoutboundmessages) — Acknowledge polled outbound messages. Acks are validated against the
- [`listOutboundDlqMessages`](#listoutbounddlqmessages) — List an integration's dead-lettered outbound queue messages
- [`redriveOutboundDlqMessages`](#redriveoutbounddlqmessages) — Redrive selected dead-lettered messages back into the live stream.
- [`unblockOutboundStream`](#unblockoutboundstream) — Unblock an integration's outbound stream halted by the `block`
- [`listSecureProxies`](#listsecureproxies) — Lists all secure_proxy use cases across all integrations for the authenticated organization.
- [`generateTypesPreview`](#generatetypespreview) — Analyses the JSONata mappings of all managed-call use cases in the integration and returns scaffolded type descriptors. 
- [`generateTypes`](#generatetypes) — Generates a complete TypeScript npm package with typed interfaces for all managed-call use cases. This is a stateless op
- [`commitTypes`](#committypes) — Commits the generated types by locking use case configurations and updating version tracking. Should be called after the

**monitoring**
- [`queryInboundMonitoringEvents`](#queryinboundmonitoringevents) — Query inbound monitoring events for a specific integration.
- [`getMonitoringStats`](#getmonitoringstats) — Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.
- [`getMonitoringTimeSeries`](#getmonitoringtimeseries) — Get time-series aggregated event counts for monitoring charts.
- [`queryAccessLogs`](#queryaccesslogs) — Query API access logs for a specific integration's organization.
- [`queryOutboundMonitoringEvents`](#queryoutboundmonitoringevents) — Query outbound monitoring events for a specific integration.
- [`queryMonitoringEventsV2`](#querymonitoringeventsv2) — Query monitoring events from the unified erp_monitoring_v2 table.
- [`getMonitoringStatsV2`](#getmonitoringstatsv2) — Get aggregated statistics from the unified erp_monitoring_v2 table.
- [`getMonitoringTimeSeriesV2`](#getmonitoringtimeseriesv2) — Get time-series aggregated event counts from the unified erp_monitoring_v2 table.
- [`getAssociatedMonitoringEvents`](#getassociatedmonitoringevents) — Returns all monitoring events sharing the same event_id, ordered chronologically.
- [`ingestExternalMonitoringEvents`](#ingestexternalmonitoringevents) — Ingest monitoring spans produced by an EXTERNAL system (e.g. an integration
- [`getMonitoringTraceByCorrelation`](#getmonitoringtracebycorrelation) — Returns the cross-system event trace for a `correlation_id`: every monitoring

**proxy**
- [`secureProxy`](#secureproxy) — Routes an HTTP request through a VPC with either static IP egress or VPN secure link access.

**managed-call**
- [`managedCallExecute`](#managedcallexecute) — Execute a managed call operation synchronously. The slug in the path acts as the RPC method name.

**erp-imports**
- [`listErpImports`](#listerpimports) — List recent pricing-file import jobs for the org, newest first.
- [`createErpImport`](#createerpimport) — Register an already-uploaded file (S3 ref) as a pricing-file import job. Returns the job and a file preview. Nothing run
- [`getErpImport`](#geterpimport) — Get a pricing-file import job (status, counts, result links).
- [`deleteErpImport`](#deleteerpimport) — Remove an import and the file it owns. Allowed from any status: an import whose run is still in flight is stopped by the
- [`validateErpImport`](#validateerpimport) — Choose the use case to read this file with, and start the validate phase.
- [`suggestErpImportUseCases`](#suggesterpimportusecases) — Rank the org's inbound use cases against this file's columns — the input to the ranked picker ("matches 6 of your 7 colu
- [`executeErpImport`](#executeerpimport) — Confirm and run the write phase of a validated import. Only a READY job may be executed; any other status returns 409.
- [`abortErpImport`](#aborterpimport) — Ask a running import to stop. Valid while the job is VALIDATING or PROCESSING; any other status returns 409.

### `acknowledgeTracking`

Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication

`POST /v1/erp/tracking/acknowledgement`

**Request Body**

**Sample Call**

```bash
epilot integration-toolkit acknowledgeTracking \
  -d '{"ack_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit acknowledgeTracking
```

With JSONata filter:

```bash
epilot integration-toolkit acknowledgeTracking --jsonata 'message'
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
epilot integration-toolkit triggerErp
```

With request body:

```bash
epilot integration-toolkit triggerErp \
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
cat body.json | epilot integration-toolkit triggerErp
```

With JSONata filter:

```bash
epilot integration-toolkit triggerErp --jsonata 'status_code'
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
epilot integration-toolkit processErpUpdatesEventsV3
```

With request body:

```bash
epilot integration-toolkit processErpUpdatesEventsV3 \
  -d '{
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "correlation_id": "string",
  "group_id": "customer-42",
  "events": [
    {},
    {}
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit processErpUpdatesEventsV3
```

With JSONata filter:

```bash
epilot integration-toolkit processErpUpdatesEventsV3 --jsonata 'results[0]'
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
epilot integration-toolkit simulateMappingV2
```

With request body:

```bash
epilot integration-toolkit simulateMappingV2 \
  -d '{
  "event_configuration": {
    "direct": true,
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
cat body.json | epilot integration-toolkit simulateMappingV2
```

With JSONata filter:

```bash
epilot integration-toolkit simulateMappingV2 --jsonata 'entity_updates'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {},
      "pricing": {
        "config": {},
        "data": [
          {}
        ]
      },
      "mode": "upsert"
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
      "attributes": {},
      "mode": "upsert"
    }
  ],
  "prune_scope_updates": [
    {
      "entity_slug": "string",
      "scope": {
        "scope_mode": "relations",
        "schema": "string",
        "unique_ids": {},
        "query": {}
      },
      "keep_unique_ids": [
        {}
      ],
      "deletion_mode": "delete"
    }
  ],
  "meter_readings_prune_scope_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "keep_external_ids": ["string"],
      "source": "string"
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

### `simulateDirect`

Dry run for direct-mode payloads: validates a `DirectPayload` against a `direct: true`

`POST /v1/erp/updates/direct_simulation`

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit simulateDirect
```

With request body:

```bash
epilot integration-toolkit simulateDirect \
  -d '{
  "event_configuration": {
    "direct": true,
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  },
  "payload": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit simulateDirect
```

With JSONata filter:

```bash
epilot integration-toolkit simulateDirect --jsonata 'valid'
```

<details>
<summary>Sample Response</summary>

```json
{
  "valid": true,
  "errors": [
    {
      "code": "DIRECT_PAYLOAD_INVALID",
      "message": "string",
      "operation_index": 0
    }
  ],
  "warnings": [
    {
      "entity_schema": "string",
      "field": "string",
      "message": "string"
    }
  ],
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {},
      "pricing": {
        "config": {},
        "data": [
          {}
        ]
      },
      "mode": "upsert",
      "unique_identifiers_metadata": {}
    }
  ],
  "meter_reading_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "attributes": {},
      "mode": "upsert",
      "_config": {
        "reading_matching": "external_id"
      }
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
epilot integration-toolkit simulateMapping
```

With request body:

```bash
epilot integration-toolkit simulateMapping \
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
cat body.json | epilot integration-toolkit simulateMapping
```

With JSONata filter:

```bash
epilot integration-toolkit simulateMapping --jsonata 'entity_updates'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {},
      "pricing": {
        "config": {},
        "data": [
          {}
        ]
      },
      "mode": "upsert"
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
      "attributes": {},
      "mode": "upsert"
    }
  ],
  "prune_scope_updates": [
    {
      "entity_slug": "string",
      "scope": {
        "scope_mode": "relations",
        "schema": "string",
        "unique_ids": {},
        "query": {}
      },
      "keep_unique_ids": [
        {}
      ],
      "deletion_mode": "delete"
    }
  ],
  "meter_readings_prune_scope_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "keep_external_ids": ["string"],
      "source": "string"
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
epilot integration-toolkit listIntegrations
```

With JSONata filter:

```bash
epilot integration-toolkit listIntegrations --jsonata 'integrations'
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
      "_manifest": ["string"]
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
epilot integration-toolkit createIntegration
```

With request body:

```bash
epilot integration-toolkit createIntegration \
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit createIntegration
```

With JSONata filter:

```bash
epilot integration-toolkit createIntegration --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"]
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
epilot integration-toolkit getIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getIntegration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"]
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
epilot integration-toolkit updateIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit updateIntegration 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit updateIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit updateIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"]
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
epilot integration-toolkit deleteIntegration \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteIntegration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteIntegration -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
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
epilot integration-toolkit queryEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit queryEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "event_id": "string",
  "event_type": "CREATE",
  "correlation_id": "string",
  "object_type": "string",
  "event_name": "string",
  "use_case_id": "string",
  "limit": 25,
  "cursor": {
    "event_time": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  }
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit queryEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit queryEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit queryEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
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
      "deduplication_id": "evt-2025-05-01-12345-create-bp",
      "correlation_id": "bp-8f3a2c-7d4e-4b1a-9c2f-1e6d5a4b3c21",
      "use_case_id": "string"
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
epilot integration-toolkit replayEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"event_ids":["string"]}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit replayEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit replayEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit replayEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "replayed": 2,
  "results": [
    {
      "event_id": "string",
      "status": "success",
      "replay_event_id": "string",
      "message": "string"
    }
  ],
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
epilot integration-toolkit listUseCases \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listUseCases 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listUseCases -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'use_cases'
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
      "changed_by": "string",
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
epilot integration-toolkit createUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit createUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "slug": "string",
  "enabled": true,
  "type": "inbound",
  "configuration": {
    "direct": true,
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
epilot integration-toolkit createUseCase 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit createUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit createUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
  "changed_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "direct": true,
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
epilot integration-toolkit getUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
  "changed_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "direct": true,
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
epilot integration-toolkit updateUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit updateUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "slug": "string",
  "enabled": true,
  "change_description": "string",
  "type": "inbound",
  "configuration": {
    "direct": true,
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
epilot integration-toolkit updateUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit updateUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit updateUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
  "changed_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "direct": true,
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
epilot integration-toolkit deleteUseCase \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteUseCase 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteUseCase -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
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
epilot integration-toolkit listUseCaseHistory \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listUseCaseHistory 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listUseCaseHistory -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
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
      "changed_by": "string",
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

### `listDocumentationPages`

Retrieve all documentation pages of an integration, without their markdown content.

`GET /v1/integrations/{integrationId}/documentation`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Sample Call**

```bash
epilot integration-toolkit listDocumentationPages \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listDocumentationPages 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listDocumentationPages -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'pages'
```

<details>
<summary>Sample Response</summary>

```json
{
  "pages": [
    {
      "id": "general",
      "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "scope": "integration",
      "use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string"
    }
  ]
}
```

</details>

---

### `getDocumentationPage`

Retrieve a single documentation page including its markdown content

`GET /v1/integrations/{integrationId}/documentation/{docId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `docId` | path | string | Yes | 'general' for the integration-wide page, otherwise a use case ID |

**Sample Call**

```bash
epilot integration-toolkit getDocumentationPage \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p docId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getDocumentationPage 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getDocumentationPage -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p docId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "general",
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scope": "integration",
  "use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string",
  "content": "string"
}
```

</details>

---

### `upsertDocumentationPage`

Create or update the documentation page identified by docId.

`PUT /v1/integrations/{integrationId}/documentation/{docId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `docId` | path | string | Yes | 'general' for the integration-wide page, otherwise a use case ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit upsertDocumentationPage \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p docId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"title":"string","content":"string"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit upsertDocumentationPage 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit upsertDocumentationPage -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p docId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit upsertDocumentationPage -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p docId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "general",
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scope": "integration",
  "use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string",
  "content": "string"
}
```

</details>

---

### `deleteDocumentationPage`

Delete a documentation page

`DELETE /v1/integrations/{integrationId}/documentation/{docId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `docId` | path | string | Yes | 'general' for the integration-wide page, otherwise a use case ID |

**Sample Call**

```bash
epilot integration-toolkit deleteDocumentationPage \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p docId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteDocumentationPage 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteDocumentationPage -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p docId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
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

### `listIntegrationsV2`

Retrieve all integrations with embedded use cases for the authenticated organization

`GET /v2/integrations`

**Sample Call**

```bash
epilot integration-toolkit listIntegrationsV2
```

With JSONata filter:

```bash
epilot integration-toolkit listIntegrationsV2 --jsonata 'integrations'
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
      "_manifest": ["string"],
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
epilot integration-toolkit createIntegrationV2
```

With request body:

```bash
epilot integration-toolkit createIntegrationV2 \
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"],
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
cat body.json | epilot integration-toolkit createIntegrationV2
```

With JSONata filter:

```bash
epilot integration-toolkit createIntegrationV2 --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"],
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "changed_by": "string",
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
epilot integration-toolkit getIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"],
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "changed_by": "string",
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
epilot integration-toolkit updateIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit updateIntegrationV2 \
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"],
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
epilot integration-toolkit updateIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit updateIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit updateIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
    },
    "notifications": {
      "enabled": true,
      "recipients": [],
      "defaultChannels": {},
      "monitoredUseCases": ["string"],
      "monitoredCodes": ["string"],
      "rules": [],
      "digest": {},
      "muteUntil": "1970-01-01T00:00:00.000Z"
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
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "_manifest": ["string"],
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "changed_by": "string",
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
epilot integration-toolkit deleteIntegrationV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteIntegrationV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteIntegrationV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
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

### `listNotificationHistory`

Returns the cursor-paginated, newest-first notification history for an

`GET /v2/integrations/{integrationId}/notifications/history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `cursor` | query | string | No | Opaque base64 pagination cursor returned as `next_cursor` by a prior page. |
| `limit` | query | number | No | Requested number of items to return. Values above 100 are accepted and clamped server-side to 100 (the enforcement point is the handler, not this schema), so a large value never 400s at the contract l |
| `type` | query | string | No | Optional notification type filter (e.g. `critical_error`, `error_threshold`). |

**Sample Call**

```bash
epilot integration-toolkit listNotificationHistory \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listNotificationHistory 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listNotificationHistory -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
```

<details>
<summary>Sample Response</summary>

```json
{
  "history": [
    {
      "id": "string",
      "type": "string",
      "state_transition": "string",
      "severity": "error",
      "title": "string",
      "occurred_at": "1970-01-01T00:00:00.000Z",
      "notified": true,
      "suppressed_reason": "muted",
      "recipients": ["string"],
      "context": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `testSendNotification`

Renders and sends ONE representative notification of the requested kind/type to

`POST /v2/integrations/{integrationId}/notifications/test`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit testSendNotification \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"kind":"alert","type":"string","channels":["email"]}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit testSendNotification 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit testSendNotification -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit testSendNotification -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getNotificationStatus`

Returns the live per-rule alert state and (for 'auto' rules) the current

`GET /v2/integrations/{integrationId}/notifications/status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `include` | query | "baseline_series" | No | Add `baseline_series` to also return all 168 hour-of-week buckets per
'auto' rule (heavier; omit for just the current-bucket markers).
 |

**Sample Call**

```bash
epilot integration-toolkit getNotificationStatus \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getNotificationStatus 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getNotificationStatus -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'health'
```

<details>
<summary>Sample Response</summary>

```json
{
  "health": "healthy",
  "evaluated_at": "1970-01-01T00:00:00.000Z",
  "rules": [
    {
      "rule_id": "string",
      "state": "ok",
      "last_fired_at": "1970-01-01T00:00:00.000Z",
      "last_cleared_at": "1970-01-01T00:00:00.000Z",
      "baseline": {
        "is_mature": true,
        "computed_at": "1970-01-01T00:00:00.000Z",
        "median": 0,
        "mad": 0,
        "upper": 0,
        "buckets": [
          {
            "dow": 1,
            "hour": 0,
            "median": 0,
            "mad": 0
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `getSecureProxyWhitelist`

Returns the current allowed_domains, allowed_ips, and vpc_mode for a secure_proxy use case.

`GET /v2/integrations/{integrationId}/use-cases/{useCaseId}/secure-proxy-whitelist`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |

**Sample Call**

```bash
epilot integration-toolkit getSecureProxyWhitelist \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getSecureProxyWhitelist 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getSecureProxyWhitelist -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'vpc_mode'
```

<details>
<summary>Sample Response</summary>

```json
{
  "vpc_mode": "static_ip",
  "allowed_domains": ["string"],
  "allowed_ips": ["string"]
}
```

</details>

---

### `updateSecureProxyWhitelist`

Replaces allowed_domains and/or allowed_ips on a secure_proxy use case.

`PUT /v2/integrations/{integrationId}/use-cases/{useCaseId}/secure-proxy-whitelist`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit updateSecureProxyWhitelist \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"allowed_domains":["string"],"allowed_ips":["string"]}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit updateSecureProxyWhitelist 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit updateSecureProxyWhitelist -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit updateSecureProxyWhitelist -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'vpc_mode'
```

<details>
<summary>Sample Response</summary>

```json
{
  "vpc_mode": "static_ip",
  "allowed_domains": ["string"],
  "allowed_ips": ["string"]
}
```

</details>

---

### `listSecureProxyWhitelistHistory`

Returns the most recent USECASE_HISTORY entries for a secure_proxy use case,

`GET /v2/integrations/{integrationId}/use-cases/{useCaseId}/secure-proxy-whitelist/history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `useCaseId` | path | string (uuid) | Yes | The use case ID (must be of type secure_proxy) |
| `limit` | query | number | No | Maximum number of history entries to return. Default 10, max 50.
Capped at the service-layer page size (20) so `limit > 20` is silently
clamped to 20. UI-08 requests 5-10 for the panel view.
 |

**Sample Call**

```bash
epilot integration-toolkit listSecureProxyWhitelistHistory \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p useCaseId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listSecureProxyWhitelistHistory 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listSecureProxyWhitelistHistory -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p useCaseId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
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
      "changed_by": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "history_created_at": "1970-01-01T00:00:00.000Z",
      "type": "secure_proxy",
      "configuration": {
        "vpc_mode": "static_ip",
        "allowed_domains": ["string"],
        "allowed_ips": ["string"]
      }
    }
  ]
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
epilot integration-toolkit setIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit setIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "app_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "component_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "overwrite": false
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit setIntegrationAppMapping 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit setIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit setIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'integration_id'
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
epilot integration-toolkit deleteIntegrationAppMapping \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"app_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","component_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteIntegrationAppMapping 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit deleteIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteIntegrationAppMapping -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
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
epilot integration-toolkit queryInboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit queryInboundMonitoringEvents \
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
epilot integration-toolkit queryInboundMonitoringEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit queryInboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit queryInboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
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
epilot integration-toolkit getMonitoringStats \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit getMonitoringStats \
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
epilot integration-toolkit getMonitoringStats 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit getMonitoringStats -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getMonitoringStats -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'inbound'
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
epilot integration-toolkit getMonitoringTimeSeries \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"from_date":"2025-01-01T00:00:00Z","to_date":"2025-01-31T23:59:59Z","interval":"1h","direction":"both"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getMonitoringTimeSeries 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit getMonitoringTimeSeries -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getMonitoringTimeSeries -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'interval'
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
epilot integration-toolkit getOutboundStatus \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getOutboundStatus 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getOutboundStatus -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'useCases'
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
      ],
      "poll": {
        "queue_depth": 0,
        "oldest_unconsumed_age_seconds": 0,
        "last_poll_at": "1970-01-01T00:00:00.000Z",
        "last_ack_at": "1970-01-01T00:00:00.000Z",
        "blocked": true,
        "dlq_count": 0
      },
      "file_proxy": [
        {
          "mapping_id": "string",
          "use_case_slug": "string",
          "resolved": true,
          "target_use_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "target_enabled": true,
          "target_updated_at": "1970-01-01T00:00:00.000Z",
          "unresolved_reason": "not_found"
        }
      ]
    }
  ]
}
```

</details>

---

### `getEntitySyncStatus`

Get the inbound ERP sync status of an entity: when each integration last

`GET /v1/entities/{entityId}/sync-status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entityId` | path | string (uuid) | Yes | The entity ID |
| `integration_id` | query | string (uuid) | No | Narrow the result to a single integration |

**Sample Call**

```bash
epilot integration-toolkit getEntitySyncStatus \
  -p entityId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getEntitySyncStatus 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getEntitySyncStatus -p entityId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "sync_states": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "entity_slug": "contract",
      "use_case_id": "string",
      "last_synced_at": "1970-01-01T00:00:00.000Z",
      "last_changed_at": "1970-01-01T00:00:00.000Z",
      "last_operation": "create",
      "last_event_id": "string",
      "readings_last_synced_at": "1970-01-01T00:00:00.000Z",
      "readings_last_operation": "upsert",
      "readings_last_event_id": "string"
    }
  ]
}
```

</details>

---

### `pollOutboundMessages`

Poll outbound messages for an integration's poll-mode use cases.

`POST /v1/integrations/{integrationId}/outbound/messages/poll`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body**

**Sample Call**

```bash
epilot integration-toolkit pollOutboundMessages \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"limit":10}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit pollOutboundMessages 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit pollOutboundMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit pollOutboundMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'messages'
```

<details>
<summary>Sample Response</summary>

```json
{
  "messages": [
    {
      "id": "string",
      "lease_token": "string",
      "use_case_id": "string",
      "event_name": "string",
      "event_id": "string",
      "group": "string",
      "payload": {},
      "enqueued_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "visibility_timeout_seconds": 0,
  "has_more": true
}
```

</details>

---

### `ackOutboundMessages`

Acknowledge polled outbound messages. Acks are validated against the

`POST /v1/integrations/{integrationId}/outbound/messages/ack`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit ackOutboundMessages \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"acks":[{"id":"string","lease_token":"string"}]}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit ackOutboundMessages 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit ackOutboundMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit ackOutboundMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "status": "accepted",
      "reason": "stale_lease"
    }
  ]
}
```

</details>

---

### `listOutboundDlqMessages`

List an integration's dead-lettered outbound queue messages

`GET /v1/integrations/{integrationId}/outbound/messages/dlq`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `limit` | query | number | No | Maximum number of DLQ entries to return |
| `next_token` | query | string | No | Opaque pagination token from a previous response |

**Sample Call**

```bash
epilot integration-toolkit listOutboundDlqMessages \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit listOutboundDlqMessages 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit listOutboundDlqMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'items[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "items": [
    {
      "id": "string",
      "use_case_id": "string",
      "event_name": "string",
      "event_id": "string",
      "enqueued_at": "1970-01-01T00:00:00.000Z",
      "dead_lettered_at": "1970-01-01T00:00:00.000Z",
      "delivery_attempts": 0,
      "reason": "string",
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_token": "string"
}
```

</details>

---

### `redriveOutboundDlqMessages`

Redrive selected dead-lettered messages back into the live stream.

`POST /v1/integrations/{integrationId}/outbound/messages/dlq/redrive`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit redriveOutboundDlqMessages \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"ids":["string"]}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit redriveOutboundDlqMessages 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit redriveOutboundDlqMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit redriveOutboundDlqMessages -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "status": "redriven"
    }
  ]
}
```

</details>

---

### `unblockOutboundStream`

Unblock an integration's outbound stream halted by the `block`

`POST /v1/integrations/{integrationId}/outbound/messages/unblock`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body**

**Sample Call**

```bash
epilot integration-toolkit unblockOutboundStream \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit unblockOutboundStream 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit unblockOutboundStream -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit unblockOutboundStream -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'unblocked'
```

<details>
<summary>Sample Response</summary>

```json
{
  "unblocked": true,
  "dead_lettered_id": "string"
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
epilot integration-toolkit queryAccessLogs \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit queryAccessLogs \
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
epilot integration-toolkit queryAccessLogs 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit queryAccessLogs -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit queryAccessLogs -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
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
epilot integration-toolkit queryOutboundMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit queryOutboundMonitoringEvents \
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
epilot integration-toolkit queryOutboundMonitoringEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit queryOutboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit queryOutboundMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
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

### `queryMonitoringEventsV2`

Query monitoring events from the unified erp_monitoring_v2 table.

`POST /v2/integrations/{integrationId}/monitoring/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit queryMonitoringEventsV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit queryMonitoringEventsV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "use_case_id": "string",
  "use_case_type": "inbound",
  "level": "success",
  "code": "string",
  "event_id": "string",
  "correlation_id": "string",
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "limit": 50,
  "cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit queryMonitoringEventsV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit queryMonitoringEventsV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit queryMonitoringEventsV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "integration_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "use_case_id": "string",
      "use_case_type": "inbound",
      "level": "success",
      "code": "string",
      "message": "string",
      "detail": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "has_more": true
}
```

</details>

---

### `getMonitoringStatsV2`

Get aggregated statistics from the unified erp_monitoring_v2 table.

`POST /v2/integrations/{integrationId}/monitoring/stats`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit getMonitoringStatsV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit getMonitoringStatsV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "use_case_type": "inbound",
  "use_case_types": ["inbound"],
  "group_by": "use_case_id",
  "source": "monitoring"
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getMonitoringStatsV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit getMonitoringStatsV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getMonitoringStatsV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'total_events'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total_events": 0,
  "success_count": 0,
  "error_count": 0,
  "warning_count": 0,
  "skipped_count": 0,
  "ack_timeout_count": 0,
  "success_rate": 0,
  "last_error_at": "1970-01-01T00:00:00.000Z",
  "breakdown": [
    {}
  ]
}
```

</details>

---

### `getMonitoringTimeSeriesV2`

Get time-series aggregated event counts from the unified erp_monitoring_v2 table.

`POST /v2/integrations/{integrationId}/monitoring/time-series`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit getMonitoringTimeSeriesV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit getMonitoringTimeSeriesV2 \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "from_date": "2025-01-01T00:00:00Z",
  "to_date": "2025-01-31T23:59:59Z",
  "interval": "5m",
  "use_case_type": "inbound",
  "group_by": "use_case_type"
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getMonitoringTimeSeriesV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit getMonitoringTimeSeriesV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getMonitoringTimeSeriesV2 -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'interval'
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
      "success_count": 0,
      "error_count": 0,
      "warning_count": 0,
      "skipped_count": 0,
      "total_count": 0,
      "breakdown": [
        {
          "use_case_type": "inbound",
          "use_case_id": "string",
          "success_count": 0,
          "error_count": 0,
          "warning_count": 0,
          "skipped_count": 0,
          "total_count": 0
        }
      ]
    }
  ]
}
```

</details>

---

### `getAssociatedMonitoringEvents`

Returns all monitoring events sharing the same event_id, ordered chronologically.

`GET /v2/integrations/{integrationId}/monitoring/events/{eventId}/associated`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `eventId` | path | string | Yes | The event ID to get associated events for |

**Sample Call**

```bash
epilot integration-toolkit getAssociatedMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p eventId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getAssociatedMonitoringEvents 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getAssociatedMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p eventId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'monitoring_events'
```

<details>
<summary>Sample Response</summary>

```json
{
  "monitoring_events": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "integration_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "use_case_id": "string",
      "use_case_type": "inbound",
      "level": "success",
      "code": "string",
      "message": "string",
      "detail": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "inbound_event": {}
}
```

</details>

---

### `ingestExternalMonitoringEvents`

Ingest monitoring spans produced by an EXTERNAL system (e.g. an integration

`POST /v2/integrations/{integrationId}/monitoring/external-events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit ingestExternalMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit ingestExternalMonitoringEvents \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "events": [
    {
      "correlation_id": "string",
      "level": "string",
      "use_case_slug": "string",
      "occurred_at": "1970-01-01T00:00:00.000Z",
      "message": "string",
      "detail": {}
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit ingestExternalMonitoringEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit ingestExternalMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit ingestExternalMonitoringEvents -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getMonitoringTraceByCorrelation`

Returns the cross-system event trace for a `correlation_id`: every monitoring

`GET /v2/integrations/{integrationId}/monitoring/traces/{correlationId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes | The integration ID |
| `correlationId` | path | string | Yes | The trace id (correlation_id) shared across systems |

**Sample Call**

```bash
epilot integration-toolkit getMonitoringTraceByCorrelation \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -p correlationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getMonitoringTraceByCorrelation 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getMonitoringTraceByCorrelation -p integrationId=123e4567-e89b-12d3-a456-426614174000 -p correlationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'correlation_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "correlation_id": "string",
  "status": "success",
  "started_at": "1970-01-01T00:00:00.000Z",
  "ended_at": "1970-01-01T00:00:00.000Z",
  "span_count": 0,
  "truncated": true,
  "spans": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "integration_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "use_case_id": "string",
      "use_case_type": "inbound",
      "level": "success",
      "code": "string",
      "message": "string",
      "detail": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "inbound_event": {}
}
```

</details>

---

### `listSecureProxies`

Lists all secure_proxy use cases across all integrations for the authenticated organization.

`GET /v1/integrations/secure-proxies`

**Sample Call**

```bash
epilot integration-toolkit listSecureProxies
```

With JSONata filter:

```bash
epilot integration-toolkit listSecureProxies --jsonata 'secure_proxies'
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
      "allowed_ips": ["string"],
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
epilot integration-toolkit secureProxy
```

With request body:

```bash
epilot integration-toolkit secureProxy \
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
cat body.json | epilot integration-toolkit secureProxy
```

With JSONata filter:

```bash
epilot integration-toolkit secureProxy --jsonata 'status_code'
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
epilot integration-toolkit managedCallExecute \
  -p slug=contact \
  -d '{"integration_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","payload":{},"correlation_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit managedCallExecute contact
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit managedCallExecute -p slug=contact
```

With JSONata filter:

```bash
epilot integration-toolkit managedCallExecute -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `generateTypesPreview`

Analyses the JSONata mappings of all managed-call use cases in the integration and returns scaffolded type descriptors. 

`POST /v1/integrations/{integrationId}/generate-types-preview`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot integration-toolkit generateTypesPreview \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit generateTypesPreview 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit generateTypesPreview -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'integration_name'
```

---

### `generateTypes`

Generates a complete TypeScript npm package with typed interfaces for all managed-call use cases. This is a stateless op

`POST /v1/integrations/{integrationId}/generate-types`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit generateTypes \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot integration-toolkit generateTypes \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "package_name": "@epilot/hems-cleverpv",
  "version": "1.0.0",
  "description": "string",
  "domain_package": "@epilot/hems",
  "domain_map_name": "HemsUseCaseMap",
  "annotations": {}
}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit generateTypes 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit generateTypes -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit generateTypes -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'package_name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "package_name": "string",
  "version": "string",
  "files": {},
  "warnings": ["string"]
}
```

</details>

---

### `commitTypes`

Commits the generated types by locking use case configurations and updating version tracking. Should be called after the

`POST /v1/integrations/{integrationId}/commit-types`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit commitTypes \
  -p integrationId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"package_name":"@epilot/hems-cleverpv","version":"1.0.0","annotations":{}}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit commitTypes 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit commitTypes -p integrationId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit commitTypes -p integrationId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'committed'
```

<details>
<summary>Sample Response</summary>

```json
{
  "committed": true,
  "warnings": ["string"]
}
```

</details>

---

### `listErpImports`

List recent pricing-file import jobs for the org, newest first.

`GET /v2/erp/imports`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `limit` | query | number | No | Page size. Values above 100 are clamped to 100. |
| `cursor` | query | string | No | Opaque cursor from a prior page's `next_cursor`. |

**Sample Call**

```bash
epilot integration-toolkit listErpImports
```

With JSONata filter:

```bash
epilot integration-toolkit listErpImports --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "import_id": "string",
      "org_id": "string",
      "created_by": "string",
      "integration_id": "string",
      "use_case_slug": "string",
      "format": "csv",
      "status": "PENDING",
      "s3_input_ref": {
        "bucket": "string",
        "key": "string"
      },
      "size_bytes": 0,
      "column_count": 0,
      "validation": {
        "total_rows": 0,
        "blocking": 0,
        "warnings": 0,
        "entities": {},
        "issues": [
          {
            "code": "UNIQUE_ID_COLUMN_MISSING",
            "severity": "warning",
            "columns": [
              {
                "name": "string",
                "entity": "string"
              }
            ],
            "row": 0
          }
        ]
      },
      "progress": {
        "processed_rows": 0,
        "total_rows": 0
      },
      "error": {
        "code": "VALIDATION_BLOCKED",
        "message": "string"
      },
      "correlation_id": "string",
      "activity_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createErpImport`

Register an already-uploaded file (S3 ref) as a pricing-file import job. Returns the job and a file preview. Nothing run

`POST /v2/erp/imports`

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit createErpImport \
  -d '{"s3_reference":{"bucket":"string","key":"string"},"include_preview":false,"import_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit createErpImport
```

With JSONata filter:

```bash
epilot integration-toolkit createErpImport --jsonata 'job'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job": {
    "import_id": "string",
    "org_id": "string",
    "created_by": "string",
    "integration_id": "string",
    "use_case_slug": "string",
    "format": "csv",
    "status": "PENDING",
    "s3_input_ref": {
      "bucket": "string",
      "key": "string"
    },
    "size_bytes": 0,
    "column_count": 0,
    "validation": {
      "total_rows": 0,
      "blocking": 0,
      "warnings": 0,
      "entities": {},
      "issues": [
        {
          "code": "UNIQUE_ID_COLUMN_MISSING",
          "severity": "warning",
          "columns": [
            {
              "name": "string",
              "entity": "string"
            }
          ],
          "row": 0
        }
      ]
    },
    "progress": {
      "processed_rows": 0,
      "total_rows": 0
    },
    "error": {
      "code": "VALIDATION_BLOCKED",
      "message": "string"
    },
    "correlation_id": "string",
    "activity_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z"
  },
  "preview": {
    "columns": ["string"],
    "rows": [
      ["string"]
    ]
  }
}
```

</details>

---

### `getErpImport`

Get a pricing-file import job (status, counts, result links).

`GET /v2/erp/imports/{importId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Sample Call**

```bash
epilot integration-toolkit getErpImport \
  -p importId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit getErpImport 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit getErpImport -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'import_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "import_id": "string",
  "org_id": "string",
  "created_by": "string",
  "integration_id": "string",
  "use_case_slug": "string",
  "format": "csv",
  "status": "PENDING",
  "s3_input_ref": {
    "bucket": "string",
    "key": "string"
  },
  "size_bytes": 0,
  "column_count": 0,
  "validation": {
    "total_rows": 0,
    "blocking": 0,
    "warnings": 0,
    "entities": {},
    "issues": [
      {
        "code": "UNIQUE_ID_COLUMN_MISSING",
        "severity": "warning",
        "columns": [
          {
            "name": "string",
            "entity": "string"
          }
        ],
        "row": 0
      }
    ]
  },
  "progress": {
    "processed_rows": 0,
    "total_rows": 0
  },
  "error": {
    "code": "VALIDATION_BLOCKED",
    "message": "string"
  },
  "correlation_id": "string",
  "activity_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteErpImport`

Remove an import and the file it owns. Allowed from any status: an import whose run is still in flight is stopped by the

`DELETE /v2/erp/imports/{importId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Sample Call**

```bash
epilot integration-toolkit deleteErpImport \
  -p importId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit deleteErpImport 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit deleteErpImport -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `validateErpImport`

Choose the use case to read this file with, and start the validate phase.

`POST /v2/erp/imports/{importId}:validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot integration-toolkit validateErpImport \
  -p importId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"integration_id":"string","use_case_slug":"string"}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit validateErpImport 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit validateErpImport -p importId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit validateErpImport -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `suggestErpImportUseCases`

Rank the org's inbound use cases against this file's columns — the input to the ranked picker ("matches 6 of your 7 colu

`POST /v2/erp/imports/{importId}:suggest-use-cases`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Sample Call**

```bash
epilot integration-toolkit suggestErpImportUseCases \
  -p importId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit suggestErpImportUseCases 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit suggestErpImportUseCases -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'file_columns'
```

<details>
<summary>Sample Response</summary>

```json
{
  "file_columns": 0,
  "suggestions": [
    {
      "integration_id": "string",
      "integration_name": "string",
      "use_case_slug": "string",
      "use_case_name": "string",
      "entity_types": 0,
      "matched_columns": 0
    }
  ]
}
```

</details>

---

### `executeErpImport`

Confirm and run the write phase of a validated import. Only a READY job may be executed; any other status returns 409.

`POST /v2/erp/imports/{importId}:execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot integration-toolkit executeErpImport \
  -p importId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"ack_warnings":true}'
```

Using positional args for path parameters:

```bash
epilot integration-toolkit executeErpImport 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot integration-toolkit executeErpImport -p importId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit executeErpImport -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `abortErpImport`

Ask a running import to stop. Valid while the job is VALIDATING or PROCESSING; any other status returns 409.

`POST /v2/erp/imports/{importId}:abort`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `importId` | path | string | Yes |  |

**Sample Call**

```bash
epilot integration-toolkit abortErpImport \
  -p importId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot integration-toolkit abortErpImport 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot integration-toolkit abortErpImport -p importId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---
