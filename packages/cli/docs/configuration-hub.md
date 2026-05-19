# Configuration Hub API

- **Base URL:** `https://configuration-hub.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/configuration-hub](https://docs.epilot.io/api/configuration-hub)

Lightweight index API for exploring epilot organization configurations.

## Quick Start

```bash
# List available operations
epilot configuration-hub

# Call an operation
epilot configuration-hub listConfigTypes
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

**Configs**
- [`listConfigTypes`](#listconfigtypes) — Returns the static list of available configuration types with display metadata.
- [`listConfigs`](#listconfigs) — List configs of a given type with pagination. Returns summary metadata only
- [`getConfigDependencies`](#getconfigdependencies) — Get configs that are referenced by the given config.
- [`getConfigUsedBy`](#getconfigusedby) — Get configs that reference the given config (reverse dependencies).
- [`getIndex`](#getindex) — Return the current index build state for the caller's organization.
- [`rebuildIndex`](#rebuildindex) — Rebuild the configuration index for the caller's organization.

**Sync**
- [`listSyncJobs`](#listsyncjobs) — List sync jobs scoped to the caller's organization, paginated with an opaque
- [`createSyncJob`](#createsyncjob) — Create a new cross-org sync job. The job is enqueued for asynchronous execution
- [`getSyncJob`](#getsyncjob) — Fetch a single sync job by ID. Returns the job header, counts summary,
- [`retrySyncJob`](#retrysyncjob) — Retry the failed resources from a prior sync job. Creates a new job whose
- [`listSyncJobResources`](#listsyncjobresources) — List the per-resource rows for a sync job. Supports filtering by status

### `listConfigTypes`

Returns the static list of available configuration types with display metadata.

`GET /v1/configs/types`

**Sample Call**

```bash
epilot configuration-hub listConfigTypes
```

With JSONata filter:

```bash
epilot configuration-hub listConfigTypes --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "type": "journey",
      "label": "Journeys",
      "icon": "Route",
      "source_api": "https://journey.sls.epilot.io",
      "sdk_client": "@epilot/sdk/journey"
    }
  ]
}
```

</details>

---

### `listConfigs`

List configs of a given type with pagination. Returns summary metadata only

`GET /v1/configs/{type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" | Yes | Configuration resource type |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `q` | query | string | No | Search query to filter configs by name/title |
| `updated_after` | query | string (date-time) | No | Filter configs updated after this date (ISO 8601) |
| `updated_before` | query | string (date-time) | No | Filter configs updated before this date (ISO 8601) |
| `purposes` | query | string | No | Filter by purpose classification IDs (comma-separated) |
| `blueprint_ids` | query | string | No | Filter by installed-blueprint IDs (comma-separated). Only configs installed by one of the listed blueprints are returned. |
| `sort` | query | "updated_at" \| "usage" | No | Sort order. `updated_at` (default) sorts by most recently modified.
`usage` sorts by the type-specific usage metric descending
(submissions for journeys, executions for automations, entities for schem |
| `active_only` | query | boolean | No | If true, filter out configs that are explicitly inactive (active=false).
Configs with no `active` field are always included.
 |

**Sample Call**

```bash
epilot configuration-hub listConfigs \
  -p type=example
```

Using positional args for path parameters:

```bash
epilot configuration-hub listConfigs example
```

With JSONata filter:

```bash
epilot configuration-hub listConfigs -p type=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "label": "string",
  "icon": "string",
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getConfigDependencies`

Get configs that are referenced by the given config.

`GET /v1/configs/{type}/{id}/dependencies`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" | Yes | Configuration resource type |
| `id` | path | string | Yes | Configuration resource ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub getConfigDependencies \
  -p type=example \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getConfigDependencies example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getConfigDependencies -p type=example -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getConfigUsedBy`

Get configs that reference the given config (reverse dependencies).

`GET /v1/configs/{type}/{id}/used_by`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" | Yes | Configuration resource type |
| `id` | path | string | Yes | Configuration resource ID |

**Sample Call**

```bash
epilot configuration-hub getConfigUsedBy \
  -p type=example \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getConfigUsedBy example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getConfigUsedBy -p type=example -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getIndex`

Return the current index build state for the caller's organization.

`GET /v1/configs/index`

**Sample Call**

```bash
epilot configuration-hub getIndex
```

With JSONata filter:

```bash
epilot configuration-hub getIndex --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "missing",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0
}
```

</details>

---

### `listSyncJobs`

List sync jobs scoped to the caller's organization, paginated with an opaque

`GET /v1/configs/sync-jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `status` | query | "pending" \| "in_progress" \| "succeeded" \| "partial" \| "failed" \| "cancelled" | No | Filter jobs by status |

**Sample Call**

```bash
epilot configuration-hub listSyncJobs
```

With JSONata filter:

```bash
epilot configuration-hub listSyncJobs --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "id": "string",
      "name": "string",
      "status": "pending",
      "direction": "push",
      "source_org_id": "string",
      "target_org_id": "string",
      "dry_run": true,
      "counts": {
        "total": 0,
        "pending": 0,
        "in_progress": 0,
        "succeeded": 0,
        "failed": 0,
        "skipped_unchanged": 0
      },
      "current_phase": "phase_0",
      "current_batch": {
        "index": 0,
        "of": 0,
        "level": 0
      },
      "started_at": "1970-01-01T00:00:00.000Z",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "events": [
        {
          "seq": 0,
          "ts": "1970-01-01T00:00:00.000Z",
          "phase": "phase_0",
          "type": "string",
          "source_id": "string",
          "target_id": "string",
          "status": "pending",
          "message": "string",
          "error": "string"
        }
      ],
      "errors_sample": [
        {
          "type": "string",
          "source_id": "string",
          "error": "string"
        }
      ]
    }
  ]
}
```

</details>

---

### `createSyncJob`

Create a new cross-org sync job. The job is enqueued for asynchronous execution

`POST /v1/configs/sync-jobs`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub createSyncJob
```

With request body:

```bash
epilot configuration-hub createSyncJob \
  -d '{
  "source_org_id": "string",
  "target_org_id": "string",
  "target_auth_token": "string",
  "name": "string",
  "dry_run": false,
  "include_dependencies": true,
  "resources": [
    {
      "type": "string",
      "id": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub createSyncJob
```

With JSONata filter:

```bash
epilot configuration-hub createSyncJob --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "events": [
    {
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "status": "pending",
      "message": "string",
      "error": "string"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `getSyncJob`

Fetch a single sync job by ID. Returns the job header, counts summary,

`GET /v1/configs/sync-jobs/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub getSyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getSyncJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getSyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "events": [
    {
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "status": "pending",
      "message": "string",
      "error": "string"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `retrySyncJob`

Retry the failed resources from a prior sync job. Creates a new job whose

`POST /v1/configs/sync-jobs/{id}/retry`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Request Body**

**Sample Call**

```bash
epilot configuration-hub retrySyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"payload_overrides":{}}'
```

Using positional args for path parameters:

```bash
epilot configuration-hub retrySyncJob 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub retrySyncJob -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub retrySyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "events": [
    {
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "status": "pending",
      "message": "string",
      "error": "string"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `listSyncJobResources`

List the per-resource rows for a sync job. Supports filtering by status

`GET /v1/configs/sync-jobs/{id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `status` | query | "pending" \| "in_progress" \| "created" \| "patched" \| "skipped" \| "would_create" \| "would_patch" \| "would_skip_unchanged" \| "would_match_heuristic" \| "failed" | No | Filter resources by status |

**Sample Call**

```bash
epilot configuration-hub listSyncJobResources \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listSyncJobResources 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listSyncJobResources -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `rebuildIndex`

Rebuild the configuration index for the caller's organization.

`POST /v1/configs/index:rebuild`

**Sample Call**

```bash
epilot configuration-hub rebuildIndex
```

With JSONata filter:

```bash
epilot configuration-hub rebuildIndex --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "ready",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0,
  "failed_types": ["string"]
}
```

</details>

---
