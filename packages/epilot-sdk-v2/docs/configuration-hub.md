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

**Health**
- [`startHealthScan`](#starthealthscan)
- [`getHealthReport`](#gethealthreport)
- [`requestHealthCoverage`](#requesthealthcoverage)
- [`startHealthCleanup`](#starthealthcleanup)
- [`setHealthFindingsIgnored`](#sethealthfindingsignored)

**Compare**
- [`compareConfigs`](#compareconfigs)
- [`suggestMatches`](#suggestmatches)
- [`confirmLineage`](#confirmlineage)
- [`breakLineage`](#breaklineage)

**Sync**
- [`createSyncJob`](#createsyncjob)
- [`listSyncJobs`](#listsyncjobs)
- [`getSyncJob`](#getsyncjob)
- [`getSyncJobHealth`](#getsyncjobhealth)
- [`runSyncJobHealth`](#runsyncjobhealth)
- [`retrySyncJob`](#retrysyncjob)
- [`planSyncJobRetry`](#plansyncjobretry)
- [`cancelSyncJob`](#cancelsyncjob)
- [`listSyncJobEvents`](#listsyncjobevents)
- [`listSyncJobResources`](#listsyncjobresources)
- [`getSyncPlan`](#getsyncplan)
- [`listSyncPlanDiffs`](#listsyncplandiffs)
- [`getSyncPlanDiff`](#getsyncplandiff)
- [`applySyncPlan`](#applysyncplan)
- [`replanSyncPlan`](#replansyncplan)

**Delete**
- [`createDeleteJob`](#createdeletejob)
- [`listDeleteJobs`](#listdeletejobs)
- [`getDeleteJob`](#getdeletejob)
- [`listDeleteJobResources`](#listdeletejobresources)

**Previews**
- [`createPreview`](#createpreview)
- [`listPreviews`](#listpreviews)
- [`getPreview`](#getpreview)

**Schemas**
- [`ResourceType`](#resourcetype)
- [`ConfigTypeInfo`](#configtypeinfo)
- [`ConfigNode`](#confignode)
- [`ConfigListResponse`](#configlistresponse)
- [`ConfigDependenciesResponse`](#configdependenciesresponse)
- [`IndexRebuildResponse`](#indexrebuildresponse)
- [`HealthScanStartResponse`](#healthscanstartresponse)
- [`HealthFinding`](#healthfinding)
- [`HealthReportResponse`](#healthreportresponse)
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
- [`SyncJobResourceRef`](#syncjobresourceref)
- [`SyncJobRetryPlanRequest`](#syncjobretryplanrequest)
- [`SyncJobRetryPlan`](#syncjobretryplan)
- [`SyncJobRetryErrorResponse`](#syncjobretryerrorresponse)
- [`SyncJobRetryRequest`](#syncjobretryrequest)
- [`SyncJobCounts`](#syncjobcounts)
- [`SyncJobEvent`](#syncjobevent)
- [`SyncJobEventDependency`](#syncjobeventdependency)
- [`SyncDependencyReason`](#syncdependencyreason)
- [`SyncRequiredBy`](#syncrequiredby)
- [`SyncJobEventListResponse`](#syncjobeventlistresponse)
- [`SyncJobBatch`](#syncjobbatch)
- [`SyncJobHealthStatus`](#syncjobhealthstatus)
- [`HealthSeverityCounts`](#healthseveritycounts)
- [`SyncJobHealthCheck`](#syncjobhealthcheck)
- [`SyncJobHealth`](#syncjobhealth)
- [`SyncJob`](#syncjob)
- [`SyncJobListResponse`](#syncjoblistresponse)
- [`SyncJobResource`](#syncjobresource)
- [`SyncJobResourceListResponse`](#syncjobresourcelistresponse)
- [`SyncPlanAction`](#syncplanaction)
- [`SyncPlanMatch`](#syncplanmatch)
- [`SyncPlanDiffStatus`](#syncplandiffstatus)
- [`SyncResourcePlan`](#syncresourceplan)
- [`SyncPlanCounts`](#syncplancounts)
- [`SyncPlan`](#syncplan)
- [`SyncPlanChange`](#syncplanchange)
- [`SyncPlanDiff`](#syncplandiff)
- [`SyncPlanDiffListResponse`](#syncplandifflistresponse)
- [`SyncPlanApplyRequest`](#syncplanapplyrequest)
- [`SyncPlanReplanRequest`](#syncplanreplanrequest)
- [`SyncPlanMissingDependency`](#syncplanmissingdependency)
- [`SyncPlanApplyErrorResponse`](#syncplanapplyerrorresponse)
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
- [`CreatePreviewRequest`](#createpreviewrequest)
- [`PreviewStatus`](#previewstatus)
- [`Preview`](#preview)

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

### `startHealthScan`

Start an asynchronous org health scan — fire-and-forget, mirrors
`rebuildIndex`. The scan walks the indexed configs, fetches each
payload, extracts field-path-known references (journey→mapping,
automa

`POST /v1/configs/health:scan`

```ts
const { data } = await client.startHealthScan()
```

---

### `getHealthReport`

Return the caller org's current health report: scan status, summary
counts by severity, new/resolved deltas vs the previous scan, and the
full finding list (errors first, then most recently appeared).

`GET /v1/configs/health`

```ts
const { data } = await client.getHealthReport()
```

<details>
<summary>Response</summary>

```json
{
  "status": "missing",
  "last_scanned_at": "1970-01-01T00:00:00.000Z",
  "scan_duration_ms": 0,
  "scanned_configs": 0,
  "scanned_by_type": {},
  "counts": {
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "new_since_previous": 0,
  "resolved_since_previous": 0,
  "last_cleanup_at": "1970-01-01T00:00:00.000Z",
  "cleaned_count": 0,
  "history": [
    {
      "scanned_at": "1970-01-01T00:00:00.000Z",
      "clean": 0,
      "total": 0
    }
  ],
  "error": "string",
  "findings": [
    {
      "id": "string",
      "code": "broken_reference",
      "severity": "error",
      "source_type": "string",
      "source_id": "string",
      "source_title": "string",
      "message": "string",
      "message_key": "string",
      "message_params": {},
      "ref_type": "string",
      "ref_id": "string",
      "ref_title": "string",
      "source_link": "string",
      "ref_link": "string",
      "owner_type": "string",
      "owner_id": "string",
      "owner_title": "string",
      "owner_link": "string",
      "path": "string",
      "cleanable": true,
      "ignored": true,
      "ignored_at": "1970-01-01T00:00:00.000Z",
      "ignored_by": "string",
      "ignored_reason": "string",
      "first_seen": "1970-01-01T00:00:00.000Z",
      "last_seen": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `requestHealthCoverage`

Send a request for configuration the health check does not cover yet.
Posted to the #epilot-org-health Slack channel together with the calling
org and user. Returns 503 when no webhook is configured f

`POST /v1/configs/health:coverage-request`

```ts
const { data } = await client.requestHealthCoverage(
  null,
  {
    message: 'string'
  },
)
```

---

### `startHealthCleanup`

Remove references that are already inert: dangling `$relation` entries
on products and prices (a price selling with a deleted tax, a product
linking a deleted price, …), automation triggers pointed at

`POST /v1/configs/health:cleanup`

```ts
const { data } = await client.startHealthCleanup(
  null,
  {
    finding_ids: ['string']
  },
)
```

---

### `setHealthFindingsIgnored`

Acknowledge findings as intentional (or undo that). An ignored
finding is excluded from the headline score and the default
breakdown, but stays visible under the Ignored filter and can be
un-ignored a

`POST /v1/configs/health:ignore`

```ts
const { data } = await client.setHealthFindingsIgnored(
  null,
  {
    finding_ids: ['string'],
    ignored: true,
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "ok",
  "count": 0
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
    sync_portal_widgets: true,
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
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
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
      "health_check": {
        "status": "pending",
        "counts": {
          "error": 0,
          "warning": 0,
          "info": 0
        }
      },
      "events": [
        {
          "id": "string",
          "kind": "resource",
          "seq": 0,
          "ts": "1970-01-01T00:00:00.000Z",
          "phase": "phase_0",
          "type": "string",
          "source_id": "string",
          "target_id": "string",
          "title": "string",
          "status": "pending",
          "attempt": 0,
          "message": "string",
          "error": "string",
          "dependency": {
            "outcome": "added",
            "reason": "typed_reference",
            "required_by": {
              "type": "string",
              "source_id": "string",
              "title": "string"
            },
            "depth": 0
          }
        }
      ],
      "created_by": "string",
      "retry_of": "string",
      "retried_by": ["string"],
      "plan_only": true,
      "plan_summary": {
        "total": 0,
        "create": 0,
        "update": 0,
        "no_change": 0,
        "skip": 0,
        "failed": 0,
        "not_compared": 0
      },
      "planned_at": "1970-01-01T00:00:00.000Z",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "applied_from_plan": "string",
      "applied_by": ["string"],
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z",
      "approvals": [
        {
          "job_id": "string",
          "approved_by": "string",
          "approved_at": "1970-01-01T00:00:00.000Z"
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
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
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

### `getSyncJobHealth`

Targeted health check of an applied (non-dry-run) sync job. When the job
reaches its terminal status, the target org is scanned asynchronously
for the configs the job wrote — rows with status `created

`GET /v1/configs/sync-jobs/{id}/health`

```ts
const { data } = await client.getSyncJobHealth({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "status": "pending",
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "scanned": 0,
  "counts": {
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "error": "string",
  "findings": [
    {
      "id": "string",
      "code": "broken_reference",
      "severity": "error",
      "source_type": "string",
      "source_id": "string",
      "source_title": "string",
      "message": "string",
      "message_key": "string",
      "message_params": {},
      "ref_type": "string",
      "ref_id": "string",
      "ref_title": "string",
      "source_link": "string",
      "ref_link": "string",
      "owner_type": "string",
      "owner_id": "string",
      "owner_title": "string",
      "owner_link": "string",
      "path": "string",
      "cleanable": true,
      "ignored": true,
      "ignored_at": "1970-01-01T00:00:00.000Z",
      "ignored_by": "string",
      "ignored_reason": "string",
      "first_seen": "1970-01-01T00:00:00.000Z",
      "last_seen": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `runSyncJobHealth`

Start the targeted health check of a finished, applied sync job again:
for jobs that finished before checks existed (`not_run`), checks that
failed or got stuck, or to re-check after fixing something.

`POST /v1/configs/sync-jobs/{id}/health:run`

```ts
const { data } = await client.runSyncJobHealth({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

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
    target_auth_token: 'string',
    resources: [
      {
        type: 'string',
        source_id: 'string'
      }
    ],
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
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
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

### `planSyncJobRetry`

Preview what `retrySyncJob` would re-run for the same `resources`,
without creating a job: the selected rows and the unresolved rows they
depend on. Read-only; needs no target token.

`POST /v1/configs/sync-jobs/{id}/retry-plan`

```ts
const { data } = await client.planSyncJobRetry(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    resources: [
      {
        type: 'string',
        source_id: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "selected": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ],
  "added_dependencies": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ],
  "dependency_resolution": "exact"
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
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
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

### `listSyncJobEvents`

Full activity log of a sync job, latest first: one event per resource
status change. Paginate older events with `next_cursor`, or poll for
new ones with `after` (the newest event id the client holds).

`GET /v1/configs/sync-jobs/{id}/events`

```ts
const { data } = await client.listSyncJobEvents({
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
  after: 'example',
  kind: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "next_cursor": "string",
  "total": 0,
  "truncated": true,
  "source": "events"
}
```

</details>

---

### `listSyncJobResources`

List the per-resource rows for a sync job. Supports filtering by status
(e.g. `failed`) and type, and cursor pagination. Used by the job detail
page, the failures table and the dry-run plan view in th

`GET /v1/configs/sync-jobs/{id}/resources`

```ts
const { data } = await client.listSyncJobResources({
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
  status: 'example',
  type: 'example',
  plan_action: 'example',
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
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ]
}
```

</details>

---

### `getSyncPlan`

Summary of a plan: a dry-run sync job (`createSyncJob` with
`dry_run: true`). Says how many resources a real run would create,
update or leave unchanged, overall and per type.

`GET /v1/configs/sync-jobs/{id}/plan`

```ts
const { data } = await client.getSyncPlan({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "string",
  "status": "pending",
  "ready": true,
  "applicable": true,
  "expires_at": "1970-01-01T00:00:00.000Z",
  "planned_at": "1970-01-01T00:00:00.000Z",
  "replanned_at": "1970-01-01T00:00:00.000Z",
  "source_org_id": "string",
  "target_org_id": "string",
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "by_type": [
    {
      "total": 0,
      "create": 0,
      "update": 0,
      "no_change": 0,
      "skip": 0,
      "failed": 0,
      "not_compared": 0,
      "type": "string"
    }
  ],
  "applied_by": ["string"]
}
```

</details>

---

### `listSyncPlanDiffs`

Field-level diffs of a plan, one per planned resource: what the target
org has now (`before`) and what a real run would write (`after`). Use
it to review a plan in bulk, e.g. from an AI agent.

`GET /v1/configs/sync-jobs/{id}/plan/diffs`

```ts
const { data } = await client.listSyncPlanDiffs({
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
  type: 'example',
  action: 'example',
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
      "action": "create",
      "match": "lineage",
      "diff_status": "computed",
      "change_count": 0,
      "changes": [
        {
          "path": "string",
          "kind": "added",
          "before": {},
          "after": {}
        }
      ],
      "truncated": true,
      "note": "string",
      "planned_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getSyncPlanDiff`

Field-level diff of one planned resource. See `listSyncPlanDiffs`.

`GET /v1/configs/sync-jobs/{id}/plan/diffs/{type}/{source_id}`

```ts
const { data } = await client.getSyncPlanDiff({
  id: '123e4567-e89b-12d3-a456-426614174000',
  type: 'example',
  source_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "type": "string",
  "source_id": "string",
  "target_id": "string",
  "title": "string",
  "action": "create",
  "match": "lineage",
  "diff_status": "computed",
  "change_count": 0,
  "changes": [
    {
      "path": "string",
      "kind": "added",
      "before": {},
      "after": {}
    }
  ],
  "truncated": true,
  "note": "string",
  "planned_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `applySyncPlan`

Run a finished plan for real. Creates a new sync job (it carries
`applied_from_plan`; the plan's `applied_by` gets the new job's id)
and enqueues it.

`POST /v1/configs/sync-jobs/{id}/plan/apply`

```ts
const { data } = await client.applySyncPlan(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    target_auth_token: 'string',
    name: 'string',
    resources: [
      {
        type: 'string',
        source_id: 'string'
      }
    ],
    exclude: [
      {
        type: 'string',
        source_id: 'string'
      }
    ],
    allow_missing_dependencies: false
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
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
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

### `replanSyncPlan`

Plan some rows of a plan again, in place, e.g. after fixing a
resource in the source org because its plan showed an unexpected
change. The listed resources are fetched from the source again,
their dep

`POST /v1/configs/sync-jobs/{id}/plan/replan`

```ts
const { data } = await client.replanSyncPlan(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    target_auth_token: 'string',
    resources: [
      {
        type: 'string',
        source_id: 'string'
      }
    ]
  },
)
```

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

### `createPreview`

Starts a preview of the caller's current org (internal callers: the org in `x-ivy-org-id`,
plus `requester`): a new, temporary org with
`organization_use: Preview` (parent = this org) that receives a 

`POST /v1/previews`

```ts
const { data } = await client.createPreview(
  null,
  {
    name: 'string',
    requester: {
      user_id: 'string',
      email: 'user@example.com',
      display_name: 'string',
      language: 'de'
    }
  },
)
```

---

### `listPreviews`

Lists the previews requested from the caller's current org, newest first (max 50).

`GET /v1/previews`

```ts
const { data } = await client.listPreviews()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "name": "string",
      "status": "creating_org",
      "source_org_id": "string",
      "preview_org_id": "string",
      "sync_job_id": "string",
      "sync_status": "string",
      "requested_by": {
        "user_id": "string",
        "email": "string"
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "error": "string"
    }
  ]
}
```

</details>

---

### `getPreview`

Returns a preview requested from the caller's current org, with its progress.

`GET /v1/previews/{id}`

```ts
const { data } = await client.getPreview({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "creating_org",
  "source_org_id": "string",
  "preview_org_id": "string",
  "sync_job_id": "string",
  "sync_status": "string",
  "requested_by": {
    "user_id": "string",
    "email": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "error": "string"
}
```

</details>

---

## Schemas

### `ResourceType`

Configuration resource type identifier.
Matches blueprint-manifest-api V3 naming conventions.


```ts
type ResourceType = "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
```

### `ConfigTypeInfo`

Static metadata for a config type folder in the tree.
No downstream API calls — just type + label + icon + source API info.


```ts
type ConfigTypeInfo = {
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
  label: string
  icon: string
  total?: number
  next_cursor?: string
  results: Array<{
    type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
    type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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

### `HealthScanStartResponse`

```ts
type HealthScanStartResponse = {
  status: "scanning" | "failed"
  error?: string
}
```

### `HealthFinding`

```ts
type HealthFinding = {
  id: string
  code: "broken_reference" | "inactive_reference" | "unreadable_config" | "orphaned_group_reference" | "uuid_group_label" | "duplicate_attribute_name" | "duplicate_headline" | "unreachable_attribute_purpose" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "incomplete_configuration" | "source_org_reference" | "secret_value_missing" | "env_value_missing"
  severity: "error" | "warning" | "info"
  source_type: string
  source_id: string
  source_title: string
  message: string
  message_key?: string
  message_params?: Record<string, unknown>
  ref_type?: string
  ref_id?: string
  ref_title?: string
  source_link?: string
  ref_link?: string
  owner_type?: string
  owner_id?: string
  owner_title?: string
  owner_link?: string
  path?: string
  cleanable?: boolean
  ignored?: boolean
  ignored_at?: string // date-time
  ignored_by?: string
  ignored_reason?: string
  first_seen: string // date-time
  last_seen: string // date-time
}
```

### `HealthReportResponse`

```ts
type HealthReportResponse = {
  status: "missing" | "idle" | "scanning" | "cleaning" | "ready" | "failed"
  last_scanned_at?: string // date-time
  scan_duration_ms?: number
  scanned_configs?: number
  scanned_by_type?: Record<string, number>
  counts?: {
    error?: number
    warning?: number
    info?: number
  }
  new_since_previous?: number
  resolved_since_previous?: number
  last_cleanup_at?: string // date-time
  cleaned_count?: number
  history?: Array<{
    scanned_at: string // date-time
    clean: number
    total: number
  }>
  error?: string
  findings: Array<{
    id: string
    code: "broken_reference" | "inactive_reference" | "unreadable_config" | "orphaned_group_reference" | "uuid_group_label" | "duplicate_attribute_name" | "duplicate_headline" | "unreachable_attribute_purpose" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "incomplete_configuration" | "source_org_reference" | "secret_value_missing" | "env_value_missing"
    severity: "error" | "warning" | "info"
    source_type: string
    source_id: string
    source_title: string
    message: string
    message_key?: string
    message_params?: Record<string, unknown>
    ref_type?: string
    ref_id?: string
    ref_title?: string
    source_link?: string
    ref_link?: string
    owner_type?: string
    owner_id?: string
    owner_title?: string
    owner_link?: string
    path?: string
    cleanable?: boolean
    ignored?: boolean
    ignored_at?: string // date-time
    ignored_by?: string
    ignored_reason?: string
    first_seen: string // date-time
    last_seen: string // date-time
  }>
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
    type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
    type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
  source_org_id: string
  source_id: string
  target_id: string
}
```

### `LineageEntryResponse`

A persisted lineage entry

```ts
type LineageEntryResponse = {
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
  code?: string
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
`dependencies` expands the selection with its dependencies (only when
`include_dependencies` is on), `phase_a` creates/matches with
topological batches, `phase_a5` resolves derived references, `phase_b`
patches with the full ID map, 

```ts
type SyncPhase = "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
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
  sync_portal_widgets?: boolean
  resources: Array<{
    type: string
    id: string
  }>
}
```

### `SyncJobResourceRef`

```ts
type SyncJobResourceRef = {
  type: string
  source_id: string
}
```

### `SyncJobRetryPlanRequest`

```ts
type SyncJobRetryPlanRequest = {
  resources?: Array<{
    type: string
    source_id: string
  }>
}
```

### `SyncJobRetryPlan`

```ts
type SyncJobRetryPlan = {
  selected: Array<{
    type: string
    source_id: string
    target_id?: string
    title?: string
    required_by?: {
      type: { ... }
      source_id: { ... }
      title?: { ... }
      reason: { ... }
    }
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    phase: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    attempt: number
    error?: string
    updated_at: string // date-time
    source_link?: string
    target_link?: string
    plan?: {
      action: { ... }
      match: { ... }
      diff_status?: { ... }
      change_count?: { ... }
      changed_paths?: { ... }
      note?: { ... }
      depends_on?: { ... }
    }
    excluded_from_apply?: "unchanged" | "excluded" | "not_syncable"
  }>
  added_dependencies: Array<{
    type: string
    source_id: string
    target_id?: string
    title?: string
    required_by?: {
      type: { ... }
      source_id: { ... }
      title?: { ... }
      reason: { ... }
    }
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    phase: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    attempt: number
    error?: string
    updated_at: string // date-time
    source_link?: string
    target_link?: string
    plan?: {
      action: { ... }
      match: { ... }
      diff_status?: { ... }
      change_count?: { ... }
      changed_paths?: { ... }
      note?: { ... }
      depends_on?: { ... }
    }
    excluded_from_apply?: "unchanged" | "excluded" | "not_syncable"
  }>
  dependency_resolution: "exact" | "best_effort"
}
```

### `SyncJobRetryErrorResponse`

```ts
type SyncJobRetryErrorResponse = {
  status?: number
  error?: string
  invalid_resources?: Array<{
    type: string
    source_id: string
  }>
}
```

### `SyncJobRetryRequest`

Optional body for `retrySyncJob`. Defaults to retrying every unresolved
resource of the original job (failed, pending or in_progress).


```ts
type SyncJobRetryRequest = {
  target_auth_token?: string
  resources?: Array<{
    type: string
    source_id: string
  }>
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

Activity-log entry surfaced to the frontend. Backed by the append-only
job event log, or by the op-log rows (`SYNC#`<jobId>`#OP#`<seq>``) for jobs
that predate it. Key events by `id` when present.


```ts
type SyncJobEvent = {
  id?: string
  kind?: "resource" | "dependency" | "step"
  seq: number
  ts: string // date-time
  phase?: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  type?: string
  source_id?: string
  target_id?: string
  title?: string
  status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
  attempt?: number
  message?: string
  error?: string
  dependency?: {
    outcome: "added" | "linked" | "skipped" | "not_found"
    reason: "typed_reference" | "id_reference" | "automation_trigger" | "journey_datasource" | "file_reference"
    required_by: {
      type: { ... }
      source_id: { ... }
      title?: { ... }
    }
    depth: number
  }
}
```

### `SyncJobEventDependency`

Only on `kind: dependency` events. The event's `type`, `source_id` and
`title` describe the dependency itself.


```ts
type SyncJobEventDependency = {
  outcome: "added" | "linked" | "skipped" | "not_found"
  reason: "typed_reference" | "id_reference" | "automation_trigger" | "journey_datasource" | "file_reference"
  required_by: {
    type: string
    source_id: string
    title?: string
  }
  depth: number
}
```

### `SyncDependencyReason`

How the dependency was found. `typed_reference`: a structural reference
in the payload (e.g. a workflow step's automation). `id_reference`: an
id in the payload resolved through the source index.
`automation_trigger`: an automation triggered by the resource (e.g. a
journey submission). `journey_data

```ts
type SyncDependencyReason = "typed_reference" | "id_reference" | "automation_trigger" | "journey_datasource" | "file_reference"
```

### `SyncRequiredBy`

The resource that referenced the dependency.

```ts
type SyncRequiredBy = {
  type: string
  source_id: string
  title?: string
}
```

### `SyncJobEventListResponse`

```ts
type SyncJobEventListResponse = {
  results: Array<{
    id?: string
    kind?: "resource" | "dependency" | "step"
    seq: number
    ts: string // date-time
    phase?: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    type?: string
    source_id?: string
    target_id?: string
    title?: string
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    attempt?: number
    message?: string
    error?: string
    dependency?: {
      outcome: { ... }
      reason: { ... }
      required_by: { ... }
      depth: { ... }
    }
  }>
  next_cursor?: string
  total?: number
  truncated?: boolean
  source: "events" | "op_log"
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

### `SyncJobHealthStatus`

State of a sync job's post-import health check. `pending`: queued,
`running`: scanning, `done`: findings available, `failed`: the check
itself failed or did not finish (the import is unaffected), `skipped`:
nothing to check (a plan, a job that wrote nothing, or a cancelled
job), `not_run`: a finishe

```ts
type SyncJobHealthStatus = "pending" | "running" | "done" | "failed" | "skipped" | "not_run"
```

### `HealthSeverityCounts`

```ts
type HealthSeverityCounts = {
  error: number
  warning: number
  info: number
}
```

### `SyncJobHealthCheck`

Compact state of the job's post-import health check. Full results:
`getSyncJobHealth`. Absent on plans and on jobs that finished before
the check existed.


```ts
type SyncJobHealthCheck = {
  status: "pending" | "running" | "done" | "failed" | "skipped" | "not_run"
  counts: {
    error: number
    warning: number
    info: number
  }
}
```

### `SyncJobHealth`

Targeted health check of the configs a sync job wrote into the target
org. Findings carry `first_seen` = `last_seen` = `finished_at`.


```ts
type SyncJobHealth = {
  status: "pending" | "running" | "done" | "failed" | "skipped" | "not_run"
  started_at?: string // date-time
  finished_at?: string // date-time
  scanned: number
  counts: {
    error: number
    warning: number
    info: number
  }
  error?: string
  findings: Array<{
    id: string
    code: "broken_reference" | "inactive_reference" | "unreadable_config" | "orphaned_group_reference" | "uuid_group_label" | "duplicate_attribute_name" | "duplicate_headline" | "unreachable_attribute_purpose" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "incomplete_configuration" | "source_org_reference" | "secret_value_missing" | "env_value_missing"
    severity: "error" | "warning" | "info"
    source_type: string
    source_id: string
    source_title: string
    message: string
    message_key?: string
    message_params?: Record<string, unknown>
    ref_type?: string
    ref_id?: string
    ref_title?: string
    source_link?: string
    ref_link?: string
    owner_type?: string
    owner_id?: string
    owner_title?: string
    owner_link?: string
    path?: string
    cleanable?: boolean
    ignored?: boolean
    ignored_at?: string // date-time
    ignored_by?: string
    ignored_reason?: string
    first_seen: string // date-time
    last_seen: string // date-time
  }>
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
  current_phase?: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  current_batch?: {
    index: number
    of: number
    level: number
  }
  started_at: string // date-time
  finished_at?: string // date-time
  health_check?: {
    status: "pending" | "running" | "done" | "failed" | "skipped" | "not_run"
    counts: {
      error: { ... }
      warning: { ... }
      info: { ... }
    }
  }
  events?: Array<{
    id?: string
    kind?: "resource" | "dependency" | "step"
    seq: number
    ts: string // date-time
    phase?: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    type?: string
    source_id?: string
    target_id?: string
    title?: string
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    attempt?: number
    message?: string
    error?: string
    dependency?: {
      outcome: { ... }
      reason: { ... }
      required_by: { ... }
      depth: { ... }
    }
  }>
  created_by?: string
  retry_of?: string
  retried_by?: string[]
  plan_only?: boolean
  plan_summary?: {
    total: number
    create: number
    update: number
    no_change: number
    skip: number
    failed: number
    not_compared: number
  }
  planned_at?: string // date-time
  expires_at?: string // date-time
  applied_from_plan?: string
  applied_by?: string[]
  approved_by?: string
  approved_at?: string // date-time
  approvals?: Array<{
    job_id: string
    approved_by?: string
    approved_at: string // date-time
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
    current_phase?: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    current_batch?: {
      index: { ... }
      of: { ... }
      level: { ... }
    }
    started_at: string // date-time
    finished_at?: string // date-time
    health_check?: {
      status: { ... }
      counts: { ... }
    }
    events?: Array<{
      id?: { ... }
      kind?: { ... }
      seq: { ... }
      ts: { ... }
      phase?: { ... }
      type?: { ... }
      source_id?: { ... }
      target_id?: { ... }
      title?: { ... }
      status: { ... }
      attempt?: { ... }
      message?: { ... }
      error?: { ... }
      dependency?: { ... }
    }>
    created_by?: string
    retry_of?: string
    retried_by?: string[]
    plan_only?: boolean
    plan_summary?: {
      total: { ... }
      create: { ... }
      update: { ... }
      no_change: { ... }
      skip: { ... }
      failed: { ... }
      not_compared: { ... }
    }
    planned_at?: string // date-time
    expires_at?: string // date-time
    applied_from_plan?: string
    applied_by?: string[]
    approved_by?: string
    approved_at?: string // date-time
    approvals?: Array<{
      job_id: { ... }
      approved_by?: { ... }
      approved_at: { ... }
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
  required_by?: {
    type: string
    source_id: string
    title?: string
    reason: "typed_reference" | "id_reference" | "automation_trigger" | "journey_datasource" | "file_reference"
  }
  status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
  phase: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
  attempt: number
  error?: string
  updated_at: string // date-time
  source_link?: string
  target_link?: string
  plan?: {
    action: "create" | "update" | "no_change" | "skip"
    match: "lineage" | "heuristic" | "none"
    diff_status?: "computed" | "not_compared"
    change_count?: number
    changed_paths?: string[]
    note?: string
    depends_on?: Array<{
      type: { ... }
      source_id: { ... }
    }>
  }
  excluded_from_apply?: "unchanged" | "excluded" | "not_syncable"
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
    required_by?: {
      type: { ... }
      source_id: { ... }
      title?: { ... }
      reason: { ... }
    }
    status: "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed"
    phase: "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize"
    attempt: number
    error?: string
    updated_at: string // date-time
    source_link?: string
    target_link?: string
    plan?: {
      action: { ... }
      match: { ... }
      diff_status?: { ... }
      change_count?: { ... }
      changed_paths?: { ... }
      note?: { ... }
      depends_on?: { ... }
    }
    excluded_from_apply?: "unchanged" | "excluded" | "not_syncable"
  }>
}
```

### `SyncPlanAction`

What a real run would do with a planned resource:
- `create`: no counterpart in the target; a new resource is created.
- `update`: the target's copy differs from the source and is
  overwritten. Also used when the copies could not be compared
  (`diff_status: not_compared`): such resources are re-ap

```ts
type SyncPlanAction = "create" | "update" | "no_change" | "skip"
```

### `SyncPlanMatch`

How the target counterpart was found: `lineage` (synced before),
`heuristic` (first sync, matched by name / slug / unique key) or
`none` (no counterpart: the resource is created).


```ts
type SyncPlanMatch = "lineage" | "heuristic" | "none"
```

### `SyncPlanDiffStatus`

`computed` when both copies were read and compared. `not_compared`
when the target could not be read or compared (see `note`).


```ts
type SyncPlanDiffStatus = "computed" | "not_compared"
```

### `SyncResourcePlan`

The plan for one resource. Set on rows of plan jobs (`dry_run`), and
copied onto the rows of the job that applies the plan. Absent on rows
planning failed for and on jobs created before plans existed.


```ts
type SyncResourcePlan = {
  action: "create" | "update" | "no_change" | "skip"
  match: "lineage" | "heuristic" | "none"
  diff_status?: "computed" | "not_compared"
  change_count?: number
  changed_paths?: string[]
  note?: string
  depends_on?: Array<{
    type: string
    source_id: string
  }>
}
```

### `SyncPlanCounts`

Planned resources by action. `not_compared` counts the `update`
resources whose copies could not be compared (it is part of
`update`, not in addition to it). `failed` counts resources planning
failed for.


```ts
type SyncPlanCounts = {
  total: number
  create: number
  update: number
  no_change: number
  skip: number
  failed: number
  not_compared: number
}
```

### `SyncPlan`

```ts
type SyncPlan = {
  job_id: string
  status: "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled"
  ready: boolean
  applicable: boolean
  expires_at?: string // date-time
  planned_at?: string // date-time
  replanned_at?: string // date-time
  source_org_id: string
  target_org_id: string
  started_at?: string // date-time
  finished_at?: string // date-time
  summary: {
    total: number
    create: number
    update: number
    no_change: number
    skip: number
    failed: number
    not_compared: number
  }
  by_type: Array<{
    total: number
    create: number
    update: number
    no_change: number
    skip: number
    failed: number
    not_compared: number
    type: string
  }>
  applied_by?: string[]
}
```

### `SyncPlanChange`

One changed field. `path` uses dots for object keys and
`[key=value]` for array items that have an identity (`name`, `slug`,
`key`, `id`, …), e.g. `steps[name=Contact].blocks[name=Email].label`.
`$` is the whole resource.

Values are compared after removing fields that differ between orgs
by design:

```ts
type SyncPlanChange = {
  path: string
  kind: "added" | "removed" | "changed" | "reordered"
  before?: unknown
  after?: unknown
}
```

### `SyncPlanDiff`

```ts
type SyncPlanDiff = {
  type: string
  source_id: string
  target_id?: string
  title?: string
  action: "create" | "update" | "no_change" | "skip"
  match: "lineage" | "heuristic" | "none"
  diff_status: "computed" | "not_compared"
  change_count: number
  changes: Array<{
    path: string
    kind: "added" | "removed" | "changed" | "reordered"
    before?: unknown
    after?: unknown
  }>
  truncated: boolean
  note?: string
  planned_at?: string // date-time
}
```

### `SyncPlanDiffListResponse`

```ts
type SyncPlanDiffListResponse = {
  next_cursor?: string
  results: Array<{
    type: string
    source_id: string
    target_id?: string
    title?: string
    action: "create" | "update" | "no_change" | "skip"
    match: "lineage" | "heuristic" | "none"
    diff_status: "computed" | "not_compared"
    change_count: number
    changes: Array<{
      path: { ... }
      kind: { ... }
      before?: { ... }
      after?: { ... }
    }>
    truncated: boolean
    note?: string
    planned_at?: string // date-time
  }>
}
```

### `SyncPlanApplyRequest`

```ts
type SyncPlanApplyRequest = {
  target_auth_token: string
  name?: string
  resources?: Array<{
    type: string
    source_id: string
  }>
  exclude?: Array<{
    type: string
    source_id: string
  }>
  allow_missing_dependencies?: boolean
}
```

### `SyncPlanReplanRequest`

```ts
type SyncPlanReplanRequest = {
  target_auth_token: string
  resources?: Array<{
    type: string
    source_id: string
  }>
}
```

### `SyncPlanMissingDependency`

```ts
type SyncPlanMissingDependency = {
  type: string
  source_id: string
  title?: string
  required_by: Array<{
    type: string
    source_id: string
    title?: string
  }>
}
```

### `SyncPlanApplyErrorResponse`

```ts
type SyncPlanApplyErrorResponse = {
  status?: number
  error?: string
  code?: "target_auth_token_missing" | "empty_selection" | "invalid_resources" | "plan_not_ready" | "plan_expired" | "nothing_to_apply" | "missing_dependencies"
  invalid_resources?: Array<{
    type: string
    source_id: string
  }>
  missing_dependencies?: Array<{
    type: string
    source_id: string
    title?: string
    required_by: Array<{
      type: { ... }
      source_id: { ... }
      title?: { ... }
    }>
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
  type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
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
    type: "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting"
    id: string
  }>
  skipped_types: Array<{
    type: string
    reason: string
  }>
}
```

### `CreatePreviewRequest`

```ts
type CreatePreviewRequest = {
  name?: string
  requester?: {
    user_id?: string
    email?: string // email
    display_name?: string
    language?: "de" | "en"
  }
}
```

### `PreviewStatus`

- creating_org: the preview org is being created
- copying_configuration: the sync job copying this org's configuration is running
- inviting: the requester is being invited to the preview org
- ready: the requester got the "your preview org is ready" email
- failed: see `error`


```ts
type PreviewStatus = "creating_org" | "copying_configuration" | "inviting" | "ready" | "failed"
```

### `Preview`

```ts
type Preview = {
  id: string
  name: string
  status: "creating_org" | "copying_configuration" | "inviting" | "ready" | "failed"
  source_org_id: string
  preview_org_id?: string
  sync_job_id?: string
  sync_status?: string
  requested_by: {
    user_id?: string
    email?: string
  }
  created_at: string // date-time
  updated_at: string // date-time
  error?: string
}
```
