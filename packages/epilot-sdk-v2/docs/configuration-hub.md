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
- [`getConfigInventory`](#getconfiginventory)

**Compare**
- [`compareConfigs`](#compareconfigs)
- [`suggestMatches`](#suggestmatches)
- [`confirmLineage`](#confirmlineage)
- [`breakLineage`](#breaklineage)

**Sync**
- [`createSyncJob`](#createsyncjob)
- [`listSyncJobs`](#listsyncjobs)
- [`getSyncJob`](#getsyncjob)
- [`retrySyncJob`](#retrysyncjob)
- [`cancelSyncJob`](#cancelsyncjob)
- [`listSyncJobResources`](#listsyncjobresources)

**Delete**
- [`createDeleteJob`](#createdeletejob)
- [`listDeleteJobs`](#listdeletejobs)
- [`getDeleteJob`](#getdeletejob)
- [`listDeleteJobResources`](#listdeletejobresources)

**Schemas**
- [`ResourceType`](#resourcetype)
- [`ConfigTypeInfo`](#configtypeinfo)
- [`ConfigNode`](#confignode)
- [`ConfigListResponse`](#configlistresponse)
- [`ConfigDependenciesResponse`](#configdependenciesresponse)
- [`IndexRebuildResponse`](#indexrebuildresponse)
- [`IndexStatusResponse`](#indexstatusresponse)
- [`CompareRequest`](#comparerequest)
- [`CompareLineage`](#comparelineage)
- [`CompareRow`](#comparerow)
- [`CompareCounts`](#comparecounts)
- [`CompareResponse`](#compareresponse)
- [`SuggestMatchesRequest`](#suggestmatchesrequest)
- [`MatchSuggestion`](#matchsuggestion)
- [`SuggestMatchesResponse`](#suggestmatchesresponse)
- [`ConfirmLineageRequest`](#confirmlineagerequest)
- [`LineageEntryResponse`](#lineageentryresponse)
- [`BreakLineageResponse`](#breaklineageresponse)
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
- [`DeleteJobStatus`](#deletejobstatus)
- [`DeleteJobResourceStatus`](#deletejobresourcestatus)
- [`DeleteJobCounts`](#deletejobcounts)
- [`DeleteJobRequest`](#deletejobrequest)
- [`DeleteJob`](#deletejob)
- [`DeleteJobListResponse`](#deletejoblistresponse)
- [`DeleteJobResource`](#deletejobresource)
- [`DeleteJobResourceListResponse`](#deletejobresourcelistresponse)
- [`SnapshotInventoryItem`](#snapshotinventoryitem)
- [`SnapshotInventorySkippedType`](#snapshotinventoryskippedtype)
- [`ConfigInventoryResponse`](#configinventoryresponse)

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
(source) org, side by side. Rows are paired via the lineage registry in
both sync directions (caller imported from source, or source i

`POST /v1/configs/compare`

```ts
const { data } = await client.compareConfigs(
  null,
  {
    source_org_id: 'string',
    source_auth_token: 'string',
    type: 'journey'
  },
)
```

<details>
<summary>Response</summary>

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
unique key) for a batch of source-org configs that have no lineage
entry, and return candidate counterparts in the caller's org.

`POST /v1/configs/compare/suggestions`

```ts
const { data } = await client.suggestMatches(
  null,
  {
    source_org_id: 'string',
    source_auth_token: 'string',
    type: 'journey',
    source_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

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
the caller's org — used to confirm a heuristic suggestion from the
Compare view. Writes to the caller org's lineage partition (call

`POST /v1/configs/lineage`

```ts
const { data } = await client.confirmLineage(
  null,
  {
    type: 'journey',
    source_org_id: 'string',
    source_id: 'string',
    target_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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
target), identified by `type` + `source_id`. Used to break a wrong or
stale match from the Compare view. Note: a future sync can 

`DELETE /v1/configs/lineage`

```ts
const { data } = await client.breakLineage({
  type: 'example',
  source_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "deleted": true
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

Retry the unresolved resources from a prior sync job: `failed` rows, plus
rows the original run left at `pending`/`in_progress` because it stopped
early. Creates a new job whose scope is that `(type, 

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

### `cancelSyncJob`

Cancel a running sync job. Marks the job `cancelled` with a `finished_at`
so it stops being reported as in-flight, and the worker stops at its next
batch boundary — phases re-read the job status and a

`POST /v1/configs/sync-jobs/{id}/cancel`

```ts
const { data } = await client.cancelSyncJob({
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

### `createDeleteJob`

Create a bulk-delete job for the caller's organization. The selected
resources are deleted asynchronously by a worker Lambda; the response
returns the persisted job header with status `pending`.

`POST /v1/configs/delete-jobs`

```ts
const { data } = await client.createDeleteJob(
  null,
  {
    name: 'string',
    resources: [
      {
        type: 'string',
        id: 'string',
        title: 'string'
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

### `listDeleteJobs`

List bulk-delete jobs scoped to the caller's organization, paginated
with an opaque cursor. Most-recent first.

`GET /v1/configs/delete-jobs`

```ts
const { data } = await client.listDeleteJobs({
  cursor: 'example',
  size: 1,
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

### `getDeleteJob`

Fetch a single bulk-delete job by ID. Returns the job header and counts
summary. Frontend polls this endpoint while the job runs.

`GET /v1/configs/delete-jobs/{id}`

```ts
const { data } = await client.getDeleteJob({
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
the failures view in the frontend.

`GET /v1/configs/delete-jobs/{id}/resources`

```ts
const { data } = await client.listDeleteJobResources({
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
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

### `getConfigInventory`

Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,
no full payloads. Calls every adapter's `list()` live (bypasses the 7-day DynamoDB index).
Intended for 

`GET /v1/configs/inventory`

```ts
const { data } = await client.getConfigInventory({
  include_dependency_only: true,
})
```

<details>
<summary>Response</summary>

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
  deletable: boolean
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
  org_id?: string
  last_built_at?: string // date-time
  total_items?: number
  build_duration_ms?: number
}
```

### `CompareRequest`

Request body for a per-type cross-org comparison

```ts
type CompareRequest = {
  source_org_id: string
  source_auth_token: string
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
}
```

### `CompareLineage`

Provenance of a lineage-backed match

```ts
type CompareLineage = {
  direction: "pull" | "push"
  last_synced_at?: string // date-time
  last_sync_job_id?: string
  origin?: string
}
```

### `CompareRow`

One row of the side-by-side comparison. `matched` rows carry both
configs plus lineage provenance; one-sided rows carry only the side
the config exists on.


```ts
type CompareRow = {
  match_status: "matched" | "only_current" | "only_source"
  current?: {
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
  }
  source?: {
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
  }
  lineage?: {
    direction: "pull" | "push"
    last_synced_at?: string // date-time
    last_sync_job_id?: string
    origin?: string
  }
}
```

### `CompareCounts`

Row counts per match status

```ts
type CompareCounts = {
  matched: number
  only_current: number
  only_source: number
}
```

### `CompareResponse`

Side-by-side comparison of one config type across two orgs

```ts
type CompareResponse = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  label: string
  icon: string
  rows: Array<{
    match_status: "matched" | "only_current" | "only_source"
    current?: {
      type: { ... }
      id: { ... }
      title: { ... }
      updated_at?: { ... }
      updated_by?: { ... }
      tags?: { ... }
      aliases?: { ... }
      purposes?: { ... }
      link?: { ... }
      active?: { ... }
      blueprints?: { ... }
      metadata?: { ... }
    }
    source?: {
      type: { ... }
      id: { ... }
      title: { ... }
      updated_at?: { ... }
      updated_by?: { ... }
      tags?: { ... }
      aliases?: { ... }
      purposes?: { ... }
      link?: { ... }
      active?: { ... }
      blueprints?: { ... }
      metadata?: { ... }
    }
    lineage?: {
      direction: { ... }
      last_synced_at?: { ... }
      last_sync_job_id?: { ... }
      origin?: { ... }
    }
  }>
  counts: {
    matched: number
    only_current: number
    only_source: number
  }
}
```

### `SuggestMatchesRequest`

Request body for batched heuristic match suggestions

```ts
type SuggestMatchesRequest = {
  source_org_id: string
  source_auth_token: string
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  source_ids: string[]
}
```

### `MatchSuggestion`

Heuristic candidate for one source config (null candidate = no match)

```ts
type MatchSuggestion = {
  source_id: string
  candidate?: {
    id: string
    title?: string
  }
}
```

### `SuggestMatchesResponse`

```ts
type SuggestMatchesResponse = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  suggestions: Array<{
    source_id: string
    candidate?: {
      id: { ... }
      title?: { ... }
    }
  }>
}
```

### `ConfirmLineageRequest`

Persist a source→target lineage pairing (caller org as target)

```ts
type ConfirmLineageRequest = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  source_org_id: string
  source_id: string
  target_id: string
}
```

### `LineageEntryResponse`

A persisted lineage entry

```ts
type LineageEntryResponse = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  target_org_id: string
  source_org_id: string
  source_id: string
  target_id: string
  last_synced_at?: string // date-time
  origin?: string
}
```

### `BreakLineageResponse`

```ts
type BreakLineageResponse = {
  deleted: boolean
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

Optional body for `retrySyncJob`. Defaults to retrying every unresolved
resource of the original job (failed, pending or in_progress).


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
  title?: string
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
    title?: string
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    phase: "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    attempt: number
    error?: string
    updated_at: string // date-time
  }>
}
```

### `DeleteJobStatus`

Lifecycle status of a bulk-delete job.

```ts
type DeleteJobStatus = "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
```

### `DeleteJobResourceStatus`

Per-resource delete status. `skipped` is used for protected resources
that are intentionally not deleted (e.g. built-in schemas).


```ts
type DeleteJobResourceStatus = "pending" | "in_progress" | "deleted" | "skipped" | "failed"
```

### `DeleteJobCounts`

Aggregate counters by resource delete status.

```ts
type DeleteJobCounts = {
  total: number
  pending: number
  in_progress: number
  deleted: number
  skipped: number
  failed: number
}
```

### `DeleteJobRequest`

Request body for `createDeleteJob`.

```ts
type DeleteJobRequest = {
  name?: string
  resources: Array<{
    type: string
    id: string
    title?: string
  }>
}
```

### `DeleteJob`

Bulk-delete job header surfaced by `createDeleteJob`/`getDeleteJob`.

```ts
type DeleteJob = {
  id: string
  name?: string
  status: "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
  org_id: string
  counts: {
    total: number
    pending: number
    in_progress: number
    deleted: number
    skipped: number
    failed: number
  }
  started_at: string // date-time
  finished_at?: string // date-time
  rebuild_triggered?: boolean
}
```

### `DeleteJobListResponse`

Cursor-paginated list of delete jobs.

```ts
type DeleteJobListResponse = {
  next_cursor?: string
  results: Array<{
    id: string
    name?: string
    status: "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
    org_id: string
    counts: {
      total: { ... }
      pending: { ... }
      in_progress: { ... }
      deleted: { ... }
      skipped: { ... }
      failed: { ... }
    }
    started_at: string // date-time
    finished_at?: string // date-time
    rebuild_triggered?: boolean
  }>
}
```

### `DeleteJobResource`

Per-resource row for a delete job.

```ts
type DeleteJobResource = {
  type: string
  id: string
  title?: string
  status: "pending" | "in_progress" | "deleted" | "skipped" | "failed"
  attempt: number
  error?: string
  updated_at: string // date-time
}
```

### `DeleteJobResourceListResponse`

Cursor-paginated list of delete job resources.

```ts
type DeleteJobResourceListResponse = {
  next_cursor?: string
  results: Array<{
    type: string
    id: string
    title?: string
    status: "pending" | "in_progress" | "deleted" | "skipped" | "failed"
    attempt: number
    error?: string
    updated_at: string // date-time
  }>
}
```

### `SnapshotInventoryItem`

Minimal identity of a single configuration resource.

```ts
type SnapshotInventoryItem = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
  id: string
}
```

### `SnapshotInventorySkippedType`

A type that could not be listed during inventory collection.

```ts
type SnapshotInventorySkippedType = {
  type: string
  reason: string
}
```

### `ConfigInventoryResponse`

Fresh inventory of all configuration resources for an org.

```ts
type ConfigInventoryResponse = {
  inventory_id: string
  org_id: string
  indexed_at: string // date-time
  resources_count: number
  resources: Array<{
    type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token"
    id: string
  }>
  skipped_types: Array<{
    type: string
    reason: string
  }>
}
```
