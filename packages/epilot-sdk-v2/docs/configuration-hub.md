# Configuration Hub API

- **Base URL:** `https://configuration-hub.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/configuration-hub](https://docs.epilot.io/api/configuration-hub)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.configurationHub.listConfigTypes(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/configuration-hub'

const configurationHubClient = getClient()
authorize(configurationHubClient, () => '<token>')
const { data } = await configurationHubClient.listConfigTypes(...)
```

## Operations

**Configs**
- [`listConfigTypes`](#listconfigtypes)
- [`listConfigs`](#listconfigs)
- [`getConfigDependencies`](#getconfigdependencies)
- [`getConfigUsedBy`](#getconfigusedby)
- [`getIndex`](#getindex)
- [`rebuildIndex`](#rebuildindex)

**Sync**
- [`createSyncJob`](#createsyncjob)
- [`listSyncJobs`](#listsyncjobs)
- [`getSyncJob`](#getsyncjob)
- [`retrySyncJob`](#retrysyncjob)
- [`listSyncJobResources`](#listsyncjobresources)

**Schemas**
- [`ResourceType`](#resourcetype)
- [`ConfigTypeInfo`](#configtypeinfo)
- [`ConfigNode`](#confignode)
- [`ConfigListResponse`](#configlistresponse)
- [`ConfigDependenciesResponse`](#configdependenciesresponse)
- [`IndexRebuildResponse`](#indexrebuildresponse)
- [`IndexStatusResponse`](#indexstatusresponse)
- [`ErrorResponse`](#errorresponse)
- [`SyncJobStatus`](#syncjobstatus)
- [`SyncDirection`](#syncdirection)
- [`SyncPhase`](#syncphase)
- [`SyncJobResourceStatus`](#syncjobresourcestatus)
- [`SyncJobRequest`](#syncjobrequest)
- [`SyncJobRetryRequest`](#syncjobretryrequest)
- [`SyncJobCounts`](#syncjobcounts)
- [`SyncJobEvent`](#syncjobevent)
- [`SyncJobBatch`](#syncjobbatch)
- [`SyncJob`](#syncjob)
- [`SyncJobListResponse`](#syncjoblistresponse)
- [`SyncJobResource`](#syncjobresource)
- [`SyncJobResourceListResponse`](#syncjobresourcelistresponse)

### `listConfigTypes`

Returns the static list of available configuration types with display metadata.
This is a cheap call — no fan-out to downstream APIs. Returns all known types
with labels and icons. The frontend should

`GET /v1/configs/types`

```ts
const { data } = await client.listConfigTypes()
```

<details>
<summary>Response</summary>

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
(not full payloads). The frontend calls this per type folder when expanding.

`GET /v1/configs/{type}`

```ts
const { data } = await client.listConfigs({
  type: 'example',
  cursor: 'example',
  size: 1,
  q: 'example',
  updated_after: 'example',
  updated_before: 'example',
  purposes: 'example',
  blueprint_ids: 'example',
  sort: 'example',
  active_only: true,
})
```

<details>
<summary>Response</summary>

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
Used to render children when expanding a config node in the tree.

`GET /v1/configs/{type}/{id}/dependencies`

```ts
const { data } = await client.getConfigDependencies({
  type: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

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
Scans the indexed config items for references to this config's ID or aliases.

`GET /v1/configs/{type}/{id}/used_by`

```ts
const { data } = await client.getConfigUsedBy({
  type: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
Clients poll this to decide whether to show a "building" indicator
and when to refetch data.

`GET /v1/configs/index`

```ts
const { data } = await client.getIndex()
```

<details>
<summary>Response</summary>

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

### `createSyncJob`

Create a new cross-org sync job. The job is enqueued for asynchronous execution
by the worker Lambda; the response returns the persisted job header with status
`pending`.

`POST /v1/configs/sync-jobs`

```ts
const { data } = await client.createSyncJob(
  null,
  {
    source_org_id: 'string',
    target_org_id: 'string',
    target_auth_token: 'string',
    name: 'string',
    dry_run: false,
    include_dependencies: true,
    resources: [
      {
        type: 'string',
        id: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

### `listSyncJobs`

List sync jobs scoped to the caller's organization, paginated with an opaque
cursor. Defaults to most-recent first.

`GET /v1/configs/sync-jobs`

```ts
const { data } = await client.listSyncJobs({
  cursor: 'example',
  size: 1,
  status: 'example',
})
```

<details>
<summary>Response</summary>

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

### `getSyncJob`

Fetch a single sync job by ID. Returns the job header, counts summary,
current phase pointer, and the latest activity events. Frontend polls this
endpoint with a ramping interval.

`GET /v1/configs/sync-jobs/{id}`

```ts
const { data } = await client.getSyncJob({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
scope is the failed `(type, source_id)` set of the original job and enqueues
it for execution. Optionally accepts inline paylo

`POST /v1/configs/sync-jobs/{id}/retry`

```ts
const { data } = await client.retrySyncJob(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    payload_overrides: {}
  },
)
```

<details>
<summary>Response</summary>

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
(e.g. `failed`) and cursor pagination. Used by the failures table and the
dry-run plan view in the frontend.

`GET /v1/configs/sync-jobs/{id}/resources`

```ts
const { data } = await client.listSyncJobResources({
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
  status: 'example',
})
```

<details>
<summary>Response</summary>

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
Fire-and-forget: invokes the async worker and returns immediately.
A new rebuild will cancel any in-flight build (see `build_token`).

`POST /v1/configs/index:rebuild`

```ts
const { data } = await client.rebuildIndex()
```

<details>
<summary>Response</summary>

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

## Schemas

### `ResourceType`

Configuration resource type identifier.
Matches blueprint-manifest-api V3 naming conventions.


```ts
type ResourceType = "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
```

### `ConfigTypeInfo`

Static metadata for a config type folder in the tree.
No downstream API calls — just type + label + icon + source API info.


```ts
type ConfigTypeInfo = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  label: string
  icon: string
  source_api: string
  sdk_client: string
}
```

### `ConfigNode`

Summary metadata for a single configuration item in the tree

```ts
type ConfigNode = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  id: string
  title: string
  updated_at?: string // date-time
  updated_by?: string
  tags?: string[]
  aliases?: string[]
  purposes?: string[]
  link?: string // uri
  active?: boolean
  blueprints?: Array<{
    id: string
    title: string
  }>
  metadata?: Record<string, unknown>
}
```

### `ConfigListResponse`

Cursor-paginated list of configs for a specific type

```ts
type ConfigListResponse = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  label: string
  icon: string
  total?: number
  next_cursor?: string
  results: Array<{
    type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
    id: string
    title: string
    updated_at?: string // date-time
    updated_by?: string
    tags?: string[]
    aliases?: string[]
    purposes?: string[]
    link?: string // uri
    active?: boolean
    blueprints?: Array<{
      id: { ... }
      title: { ... }
    }>
    metadata?: Record<string, unknown>
  }>
}
```

### `ConfigDependenciesResponse`

Cursor-paginated list of configs referenced by a given config

```ts
type ConfigDependenciesResponse = {
  total?: number
  next_cursor?: string
  results: Array<{
    type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
    id: string
    title: string
    updated_at?: string // date-time
    updated_by?: string
    tags?: string[]
    aliases?: string[]
    purposes?: string[]
    link?: string // uri
    active?: boolean
    blueprints?: Array<{
      id: { ... }
      title: { ... }
    }>
    metadata?: Record<string, unknown>
  }>
}
```

### `IndexRebuildResponse`

Result of an index rebuild operation

```ts
type IndexRebuildResponse = {
  status: "ready" | "building" | "failed" | "already_building"
  last_built_at?: string // date-time
  total_items?: number
  build_duration_ms?: number
  failed_types?: string[]
}
```

### `IndexStatusResponse`

Current index build state

```ts
type IndexStatusResponse = {
  status: "missing" | "building" | "ready" | "failed"
  last_built_at?: string // date-time
  total_items?: number
  build_duration_ms?: number
}
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  status: number
  error: string
}
```

### `SyncJobStatus`

Lifecycle status of a sync job. See `docs/sync/INTERFACES.md` for state
transitions.


```ts
type SyncJobStatus = "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
```

### `SyncDirection`

Direction of the sync, derived from the source/target pane selection in the
configuration hub UI.


```ts
type SyncDirection = "push" | "pull"
```

### `SyncPhase`

Three-phase orchestrator phase. `phase_0` fetches source payloads,
`phase_a` creates/matches with topological batches, `phase_a5` resolves
derived references, `phase_b` patches with the full ID map, `finalize`
runs cycle-breaking finalizers.


```ts
type SyncPhase = "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
```

### `SyncJobResourceStatus`

Per-resource status. `would_*` values are produced by dry-run jobs.


```ts
type SyncJobResourceStatus = "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
```

### `SyncJobRequest`

Request body for `createSyncJob`. `target_auth_token` is the destination
org's auth token and MUST NOT be persisted or logged — it is `writeOnly`.


```ts
type SyncJobRequest = {
  source_org_id: string
  target_org_id: string
  target_auth_token: string
  name?: string
  dry_run?: boolean
  include_dependencies?: boolean
  resources: Array<{
    type: string
    id: string
  }>
}
```

### `SyncJobRetryRequest`

Optional body for `retrySyncJob`. Defaults to retrying every failed
resource of the original job.


```ts
type SyncJobRetryRequest = {
  payload_overrides?: Record<string, unknown>
}
```

### `SyncJobCounts`

Aggregate counters by resource status.

```ts
type SyncJobCounts = {
  total: number
  pending: number
  in_progress: number
  succeeded: number
  failed: number
  skipped_unchanged: number
}
```

### `SyncJobEvent`

Activity-log entry surfaced to the frontend. Backed by the op-log rows in
the index table (`SYNC#`<jobId>`#OP#`<seq>``).


```ts
type SyncJobEvent = {
  seq: number
  ts: string // date-time
  phase?: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  type?: string
  source_id?: string
  target_id?: string
  status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
  message?: string
  error?: string
}
```

### `SyncJobBatch`

Position within the current topological batch for the active phase.

```ts
type SyncJobBatch = {
  index: number
  of: number
  level: number
}
```

### `SyncJob`

Sync job header as surfaced by `getSyncJob` and the create response. The
canonical persistence shape is described in `docs/sync/INTERFACES.md`.


```ts
type SyncJob = {
  id: string
  name?: string
  status: "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
  direction: "push" | "pull"
  source_org_id: string
  target_org_id: string
  dry_run: boolean
  counts: {
    total: number
    pending: number
    in_progress: number
    succeeded: number
    failed: number
    skipped_unchanged: number
  }
  current_phase?: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  current_batch?: {
    index: number
    of: number
    level: number
  }
  started_at: string // date-time
  finished_at?: string // date-time
  events?: Array<{
    seq: number
    ts: string // date-time
    phase?: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    type?: string
    source_id?: string
    target_id?: string
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    message?: string
    error?: string
  }>
  errors_sample?: Array<{
    type: string
    source_id: string
    error: string
  }>
}
```

### `SyncJobListResponse`

Cursor-paginated list of sync jobs.

```ts
type SyncJobListResponse = {
  next_cursor?: string
  results: Array<{
    id: string
    name?: string
    status: "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
    direction: "push" | "pull"
    source_org_id: string
    target_org_id: string
    dry_run: boolean
    counts: {
      total: { ... }
      pending: { ... }
      in_progress: { ... }
      succeeded: { ... }
      failed: { ... }
      skipped_unchanged: { ... }
    }
    current_phase?: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    current_batch?: {
      index: { ... }
      of: { ... }
      level: { ... }
    }
    started_at: string // date-time
    finished_at?: string // date-time
    events?: Array<{
      seq: { ... }
      ts: { ... }
      phase?: { ... }
      type?: { ... }
      source_id?: { ... }
      target_id?: { ... }
      status: { ... }
      message?: { ... }
      error?: { ... }
    }>
    errors_sample?: Array<{
      type: { ... }
      source_id: { ... }
      error: { ... }
    }>
  }>
}
```

### `SyncJobResource`

Per-resource row backed by `SyncResourcesTable`. See
`docs/sync/INTERFACES.md` for the DDB shape.


```ts
type SyncJobResource = {
  type: string
  source_id: string
  target_id?: string
  status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
  phase: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  attempt: number
  error?: string
  updated_at: string // date-time
}
```

### `SyncJobResourceListResponse`

Cursor-paginated list of sync job resources.

```ts
type SyncJobResourceListResponse = {
  next_cursor?: string
  results: Array<{
    type: string
    source_id: string
    target_id?: string
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    phase: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    attempt: number
    error?: string
    updated_at: string // date-time
  }>
}
```
