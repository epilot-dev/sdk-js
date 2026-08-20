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
- [`getConfigInventory`](#getconfiginventory) — Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,

**Compare**
- [`compareConfigs`](#compareconfigs) — Compare the caller org's configs of a single type against another
- [`suggestMatches`](#suggestmatches) — Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /
- [`confirmLineage`](#confirmlineage) — Persist a lineage entry pairing a source-org config with a config in
- [`breakLineage`](#breaklineage) — Delete a lineage entry from the caller org's partition (caller as sync

**Sync**
- [`listSyncJobs`](#listsyncjobs) — List sync jobs scoped to the caller's organization, paginated with an opaque
- [`createSyncJob`](#createsyncjob) — Create a new cross-org sync job. The job is enqueued for asynchronous execution
- [`getSyncJob`](#getsyncjob) — Fetch a single sync job by ID. Returns the job header, counts summary,
- [`retrySyncJob`](#retrysyncjob) — Retry the unresolved resources from a prior sync job: `failed` rows, plus
- [`cancelSyncJob`](#cancelsyncjob) — Cancel a running sync job. Marks the job `cancelled` with a `finished_at`
- [`listSyncJobResources`](#listsyncjobresources) — List the per-resource rows for a sync job. Supports filtering by status

**Delete**
- [`listDeleteJobs`](#listdeletejobs) — List bulk-delete jobs scoped to the caller's organization, paginated
- [`createDeleteJob`](#createdeletejob) — Create a bulk-delete job for the caller's organization. The selected
- [`getDeleteJob`](#getdeletejob) — Fetch a single bulk-delete job by ID. Returns the job header and counts
- [`listDeleteJobResources`](#listdeletejobresources) — List the per-resource rows for a delete job, cursor-paginated. Used by

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
      "sdk_client": "@epilot/sdk/journey",
      "deletable": true
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
| `sort` | query | "updated_at" \| "usage" \| "name" | No | Sort order. `updated_at` (default) sorts by most recently modified.
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
  "org_id": "string",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0
}
```

</details>

---

### `compareConfigs`

Compare the caller org's configs of a single type against another

`POST /v1/configs/compare`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub compareConfigs \
  -d '{"source_org_id":"string","source_auth_token":"string","type":"journey"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub compareConfigs
```

With JSONata filter:

```bash
epilot configuration-hub compareConfigs --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "label": "string",
  "icon": "string",
  "rows": [
    {
      "match_status": "matched",
      "current": {
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
      },
      "source": {
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
      },
      "lineage": {
        "direction": "pull",
        "last_synced_at": "1970-01-01T00:00:00.000Z",
        "last_sync_job_id": "string",
        "origin": "string"
      }
    }
  ],
  "counts": {
    "matched": 0,
    "only_current": 0,
    "only_source": 0
  }
}
```

</details>

---

### `suggestMatches`

Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /

`POST /v1/configs/compare/suggestions`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub suggestMatches \
  -d '{"source_org_id":"string","source_auth_token":"string","type":"journey","source_ids":["string"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub suggestMatches
```

With JSONata filter:

```bash
epilot configuration-hub suggestMatches --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "suggestions": [
    {
      "source_id": "string",
      "candidate": {
        "id": "string",
        "title": "string"
      }
    }
  ]
}
```

</details>

---

### `confirmLineage`

Persist a lineage entry pairing a source-org config with a config in

`POST /v1/configs/lineage`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub confirmLineage \
  -d '{"type":"journey","source_org_id":"string","source_id":"string","target_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub confirmLineage
```

With JSONata filter:

```bash
epilot configuration-hub confirmLineage --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "target_org_id": "string",
  "source_org_id": "string",
  "source_id": "string",
  "target_id": "string",
  "last_synced_at": "1970-01-01T00:00:00.000Z",
  "origin": "string"
}
```

</details>

---

### `breakLineage`

Delete a lineage entry from the caller org's partition (caller as sync

`DELETE /v1/configs/lineage`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | query | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" | Yes | Configuration resource type of the lineage entry |
| `source_id` | query | string | Yes | Source-org config id the lineage entry is keyed by |

**Sample Call**

```bash
epilot configuration-hub breakLineage \
  -p type=example \
  -p source_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub breakLineage -p type=example -p source_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'deleted'
```

<details>
<summary>Sample Response</summary>

```json
{
  "deleted": true
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

Retry the unresolved resources from a prior sync job: `failed` rows, plus

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

### `cancelSyncJob`

Cancel a running sync job. Marks the job `cancelled` with a `finished_at`

`POST /v1/configs/sync-jobs/{id}/cancel`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub cancelSyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub cancelSyncJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub cancelSyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
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
      "title": "string",
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

### `listDeleteJobs`

List bulk-delete jobs scoped to the caller's organization, paginated

`GET /v1/configs/delete-jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub listDeleteJobs
```

With JSONata filter:

```bash
epilot configuration-hub listDeleteJobs --jsonata 'results[0]'
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
      "org_id": "string",
      "counts": {
        "total": 0,
        "pending": 0,
        "in_progress": 0,
        "deleted": 0,
        "skipped": 0,
        "failed": 0
      },
      "started_at": "1970-01-01T00:00:00.000Z",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "rebuild_triggered": true
    }
  ]
}
```

</details>

---

### `createDeleteJob`

Create a bulk-delete job for the caller's organization. The selected

`POST /v1/configs/delete-jobs`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub createDeleteJob \
  -d '{"name":"string","resources":[{"type":"string","id":"string","title":"string"}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub createDeleteJob
```

With JSONata filter:

```bash
epilot configuration-hub createDeleteJob --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "org_id": "string",
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "deleted": 0,
    "skipped": 0,
    "failed": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "rebuild_triggered": true
}
```

</details>

---

### `getDeleteJob`

Fetch a single bulk-delete job by ID. Returns the job header and counts

`GET /v1/configs/delete-jobs/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Delete job ID |

**Sample Call**

```bash
epilot configuration-hub getDeleteJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getDeleteJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getDeleteJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "org_id": "string",
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "deleted": 0,
    "skipped": 0,
    "failed": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "rebuild_triggered": true
}
```

</details>

---

### `listDeleteJobResources`

List the per-resource rows for a delete job, cursor-paginated. Used by

`GET /v1/configs/delete-jobs/{id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Delete job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub listDeleteJobResources \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listDeleteJobResources 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listDeleteJobResources -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "type": "string",
      "id": "string",
      "title": "string",
      "status": "pending",
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

### `getConfigInventory`

Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,

`GET /v1/configs/inventory`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `include_dependency_only` | query | boolean | No | When true (default), include dependency-only types (e.g. `entity_mapping`)
in the inventory in addition to the top-level registered types.
 |

**Sample Call**

```bash
epilot configuration-hub getConfigInventory
```

With JSONata filter:

```bash
epilot configuration-hub getConfigInventory --jsonata 'inventory_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "inventory_id": "string",
  "org_id": "string",
  "indexed_at": "1970-01-01T00:00:00.000Z",
  "resources_count": 0,
  "resources": [
    {
      "type": "journey",
      "id": "string"
    }
  ],
  "skipped_types": [
    {
      "type": "string",
      "reason": "string"
    }
  ]
}
```

</details>

---
