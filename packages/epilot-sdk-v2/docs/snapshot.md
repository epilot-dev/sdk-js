# Snapshot API

- **Base URL:** `https://snapshot.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/snapshot](https://docs.epilot.io/api/snapshot)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.snapshot.createSnapshot(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/snapshot'

const snapshotClient = getClient()
authorize(snapshotClient, () => '<token>')
const { data } = await snapshotClient.createSnapshot(...)
```

## Operations

**Snapshots**
- [`createSnapshot`](#createsnapshot)
- [`listSnapshots`](#listsnapshots)
- [`captureOrgSnapshot`](#captureorgsnapshot)
- [`getSnapshot`](#getsnapshot)
- [`deleteSnapshot`](#deletesnapshot)
- [`getRestore`](#getrestore)
- [`restoreSnapshot`](#restoresnapshot)
- [`listSnapshotResources`](#listsnapshotresources)
- [`getSnapshotResource`](#getsnapshotresource)
- [`listDependencies`](#listdependencies)

**ScheduledSnapshots**
- [`getOrgSnapshotSchedule`](#getorgsnapshotschedule)
- [`putOrgSnapshotSchedule`](#putorgsnapshotschedule)
- [`deleteOrgSnapshotSchedule`](#deleteorgsnapshotschedule)

**Schemas**
- [`Error`](#error)
- [`ResourceRef`](#resourceref)
- [`SnapshotResourceSummary`](#snapshotresourcesummary)
- [`SnapshotResourceList`](#snapshotresourcelist)
- [`SnapshotResourceDetail`](#snapshotresourcedetail)
- [`CreateSnapshotRequest`](#createsnapshotrequest)
- [`CreateOrgSnapshotRequest`](#createorgsnapshotrequest)
- [`CreateSnapshotResponse`](#createsnapshotresponse)
- [`RestoreSnapshotRequest`](#restoresnapshotrequest)
- [`RestoreSnapshotResponse`](#restoresnapshotresponse)
- [`Snapshot`](#snapshot)
- [`Operation`](#operation)
- [`RestoreSummary`](#restoresummary)
- [`RestoreOutcome`](#restoreoutcome)
- [`RestoreProgress`](#restoreprogress)
- [`RestoreResourceProgress`](#restoreresourceprogress)
- [`CallerIdentity`](#calleridentity)
- [`CallerActor`](#calleractor)
- [`RetentionConfig`](#retentionconfig)
- [`PutOrgSnapshotScheduleRequest`](#putorgsnapshotschedulerequest)
- [`OrgSnapshotSchedule`](#orgsnapshotschedule)
- [`ScheduleBlocked`](#scheduleblocked)

### `createSnapshot`

Create a new snapshot of the given resources. Async — returns immediately
with a snapshot ID; client polls `getSnapshot` until `create.status`
moves from `in_progress` to `completed` or `failed`.

`POST /v1/snapshots`

```ts
const { data } = await client.createSnapshot(
  null,
  {
    name: 'string',
    description: 'string',
    trigger: 'manual',
    blueprint_instance_id: 'string',
    resources: [
      {
        type: 'string',
        id: 'string'
      }
    ]
  },
)
```

---

### `listSnapshots`

List snapshots for the caller's organization, newest first.

`GET /v1/snapshots`

```ts
const { data } = await client.listSnapshots({
  cursor: 'example',
  size: 1,
  resource: ['...'],
  trigger: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "page_size": 0,
  "cursor": "string",
  "results": [
    {
      "id": "string",
      "org_id": "string",
      "name": "string",
      "description": "string",
      "trigger": "manual",
      "blueprint_instance_id": "string",
      "resource_counts": {},
      "create": {},
      "restores": [],
      "matched_count": 0,
      "scope": "selection",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "capture_summary": {},
      "skipped_resources": [],
      "skipped_resources_truncated": true,
      "failed_resources": [],
      "failed_resources_truncated": true
    }
  ]
}
```

</details>

---

### `captureOrgSnapshot`

Snapshot the caller's whole organization now. Creates a `scope: "org"`
snapshot row and starts a chunked capture Step Function, then returns
immediately. The capture asynchronously fetches a fresh inv

`POST /v1/snapshots:capture-org`

```ts
const { data } = await client.captureOrgSnapshot(
  null,
  {
    name: 'string',
    retention: {
      value: 1,
      unit: 'days'
    },
    excluded_types: ['string']
  },
)
```

---

### `getSnapshot`

Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.

`GET /v1/snapshots/{id}`

```ts
const { data } = await client.getSnapshot({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "trigger": "manual",
  "blueprint_instance_id": "string",
  "resource_counts": {},
  "create": {
    "type": "create",
    "started_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status": "in_progress",
    "error": "string",
    "summary": {
      "total": 0,
      "created": 0,
      "updated": 0,
      "unchanged": 0,
      "failed": 0,
      "skipped": 0
    },
    "outcomes_s3_key": "string",
    "triggered_by": {
      "name": "string",
      "user_id": "string",
      "token_id": "string",
      "actor": {
        "type": "agent",
        "agent_id": "string",
        "agent_name": "string",
        "on_behalf_of": {
          "user_id": "string"
        }
      }
    },
    "selected_target_count": 1
  },
  "restores": [
    {
      "type": "create",
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "status": "in_progress",
      "error": "string",
      "summary": {
        "total": 0,
        "created": 0,
        "updated": 0,
        "unchanged": 0,
        "failed": 0,
        "skipped": 0
      },
      "outcomes_s3_key": "string",
      "triggered_by": {
        "name": "string",
        "user_id": "string",
        "token_id": "string",
        "actor": {
          "type": "agent",
          "agent_id": "string",
          "agent_name": "string",
          "on_behalf_of": {
            "user_id": "string"
          }
        }
      },
      "selected_target_count": 1
    }
  ],
  "matched_count": 0,
  "scope": "selection",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "capture_summary": {
    "total": 0,
    "captured": 0,
    "skipped": 0,
    "failed": 0
  },
  "skipped_resources": [
    {
      "type": "string",
      "id": "string",
      "reason": "string"
    }
  ],
  "skipped_resources_truncated": true,
  "failed_resources": [
    {
      "type": "string",
      "id": "string",
      "reason": "string"
    }
  ],
  "failed_resources_truncated": true
}
```

</details>

---

### `deleteSnapshot`

Delete a snapshot's metadata and S3 manifest. Refused with 409 while the
snapshot is still being created, while one of its restores is in progress,
or while the organization holds a restore lease.

`DELETE /v1/snapshots/{id}`

```ts
const { data } = await client.deleteSnapshot({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getRestore`

Fetch a restore operation and a page of per-resource outcomes in manifest order.
Pagination bounds response size for org snapshots; the compressed artifact is
read in full for each page. Outcomes are 

`GET /v1/snapshots/{id}/restores/{index}`

```ts
const { data } = await client.getRestore({
  id: '123e4567-e89b-12d3-a456-426614174000',
  index: 1,
  offset: 1,
  limit: 1,
  action: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "operation": {
    "type": "create",
    "started_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status": "in_progress",
    "error": "string",
    "summary": {
      "total": 0,
      "created": 0,
      "updated": 0,
      "unchanged": 0,
      "failed": 0,
      "skipped": 0
    },
    "outcomes_s3_key": "string",
    "triggered_by": {
      "name": "string",
      "user_id": "string",
      "token_id": "string",
      "actor": {
        "type": "agent",
        "agent_id": "string",
        "agent_name": "string",
        "on_behalf_of": {
          "user_id": "string"
        }
      }
    },
    "selected_target_count": 1
  },
  "outcomes": [
    {
      "type": "string",
      "id": "string",
      "captured_id": "string",
      "lineage_id": "string",
      "action": "created",
      "reason": "string",
      "error": "string"
    }
  ],
  "outcomes_available": true,
  "total": 0,
  "progress": {
    "started": 0,
    "matched": 0,
    "applied": 0,
    "failed": 0,
    "phase": "preparing",
    "by_type": [
      {
        "type": "string",
        "started": 0,
        "applied": 0,
        "failed": 0
      }
    ],
    "recent": [
      {
        "type": "string",
        "id": "string",
        "target_id": "string",
        "state": "working",
        "error": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "resources": [
      {
        "type": "string",
        "id": "string",
        "target_id": "string",
        "state": "working",
        "error": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "updated_at": "1970-01-01T00:00:00.000Z"
  },
  "next_offset": 0
}
```

</details>

---

### `restoreSnapshot`

Restore a snapshot to the org. Async — returns immediately; client polls
`getSnapshot` until `restores[restore_index]` (using the index returned by this POST) moves from
`in_progress` to one of `compl

`POST /v1/snapshots/{id}:restore`

```ts
const { data } = await client.restoreSnapshot(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    exclude_target_ids: ['string'],
    include_target_ids: ['string'],
    blueprint_instance_id: 'string'
  },
)
```

---

### `listSnapshotResources`

List the resources captured in this snapshot. Returns lightweight
identity fields per resource — payloads are fetched via the
single-resource endpoint when needed.

`GET /v1/snapshots/{id}/resources`

```ts
const { data } = await client.listSnapshotResources({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "resources": [
    {
      "lineage_id": "string",
      "target_id": "string",
      "type": "string",
      "name": "string"
    }
  ]
}
```

</details>

---

### `getSnapshotResource`

Fetch one captured resource with its full payload. For UI views
that diff the captured state against the current destination.

`GET /v1/snapshots/{id}/resources/{lineage_id}`

```ts
const { data } = await client.getSnapshotResource({
  id: '123e4567-e89b-12d3-a456-426614174000',
  lineage_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "lineage_id": "string",
  "target_id": "string",
  "type": "string",
  "name": "string",
  "captured": {}
}
```

</details>

---

### `getOrgSnapshotSchedule`

Return the scheduled-snapshot enrollment config for the caller's org,
with `blocked` while no scheduled capture can start and `stale_since`
while scheduled captures have stopped succeeding.
Returns 40

`GET /v1/org-snapshot-schedule`

```ts
const { data } = await client.getOrgSnapshotSchedule()
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "enabled": true,
  "cron_expression": "cron(0 2 * * ? *)",
  "timezone": "string",
  "retention": {
    "value": 1,
    "unit": "days"
  },
  "excluded_types": ["string"],
  "schedule_name": "string",
  "last_started_at": "1970-01-01T00:00:00.000Z",
  "last_completed_at": "1970-01-01T00:00:00.000Z",
  "last_status": "completed",
  "last_succeeded_at": "1970-01-01T00:00:00.000Z",
  "last_status_reason": "restore_in_progress",
  "enrolled_by": "auto",
  "opted_out_at": "1970-01-01T00:00:00.000Z",
  "opted_out_by": "string",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "blocked": {
    "since": "1970-01-01T00:00:00.000Z",
    "reason": "execution_unverifiable",
    "execution_arn": "string"
  },
  "stale_since": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `putOrgSnapshotSchedule`

Create or update the scheduled-snapshot enrollment config for the
caller's org (upsert). The cron expression, timezone and retention
window are validated server-side; invalid values are rejected with 

`PUT /v1/org-snapshot-schedule`

```ts
const { data } = await client.putOrgSnapshotSchedule(
  null,
  {
    enabled: true,
    cron_expression: 'cron(0 2 * * ? *)',
    timezone: 'Europe/Berlin',
    retention: {
      value: 1,
      unit: 'days'
    },
    excluded_types: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "enabled": true,
  "cron_expression": "cron(0 2 * * ? *)",
  "timezone": "string",
  "retention": {
    "value": 1,
    "unit": "days"
  },
  "excluded_types": ["string"],
  "schedule_name": "string",
  "last_started_at": "1970-01-01T00:00:00.000Z",
  "last_completed_at": "1970-01-01T00:00:00.000Z",
  "last_status": "completed",
  "last_succeeded_at": "1970-01-01T00:00:00.000Z",
  "last_status_reason": "restore_in_progress",
  "enrolled_by": "auto",
  "opted_out_at": "1970-01-01T00:00:00.000Z",
  "opted_out_by": "string",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "blocked": {
    "since": "1970-01-01T00:00:00.000Z",
    "reason": "execution_unverifiable",
    "execution_arn": "string"
  },
  "stale_since": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteOrgSnapshotSchedule`

Opt the caller's org out of scheduled snapshots. The EventBridge
schedule is removed and the enrollment is kept, disabled, with
`opted_out_at` and `opted_out_by`, so no scheduled snapshot is taken
and

`DELETE /v1/org-snapshot-schedule`

```ts
const { data } = await client.deleteOrgSnapshotSchedule()
```

---

### `listDependencies`

Walk the dependency tree for a set of resources and return the full
transitive closure, topologically sorted.

`POST /v1/snapshots:list-dependencies`

```ts
const { data } = await client.listDependencies(
  null,
  {
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
  "dependencies": [
    {
      "type": "string",
      "id": "string"
    }
  ]
}
```

</details>

---

## Schemas

### `Error`

```ts
type Error = {
  status: number
  error: string
}
```

### `ResourceRef`

```ts
type ResourceRef = {
  type: string
  id: string
}
```

### `SnapshotResourceSummary`

Lightweight identity for a captured resource. Returned by
`listSnapshotResources`; the full payload is fetched separately via
`getSnapshotResource` when needed.


```ts
type SnapshotResourceSummary = {
  lineage_id: string
  target_id: string
  type: string
  name?: string
}
```

### `SnapshotResourceList`

```ts
type SnapshotResourceList = {
  resources: Array<{
    lineage_id: string
    target_id: string
    type: string
    name?: string
  }>
}
```

### `SnapshotResourceDetail`

A single captured resource with its full payload. The identity fields
match `SnapshotResourceSummary`; the `captured` payload is the
pre-install state at snapshot time.


```ts
type SnapshotResourceDetail = {
  lineage_id: string
  target_id: string
  type: string
  name?: string
  captured: Record<string, unknown>
}
```

### `CreateSnapshotRequest`

```ts
type CreateSnapshotRequest = {
  name: string
  description?: string
  trigger?: "manual" | "sync" | "blueprint_install" | "scheduled"
  blueprint_instance_id?: string
  resources: Array<{
    type: string
    id: string
  }>
}
```

### `CreateOrgSnapshotRequest`

Request body for `captureOrgSnapshot`. All fields optional — an empty body
snapshots the whole org with a default name and the 90-day default TTL.


```ts
type CreateOrgSnapshotRequest = {
  name?: string
  retention?: {
    value: number
    unit: "days" | "weeks" | "months"
  }
  excluded_types?: string[]
}
```

### `CreateSnapshotResponse`

```ts
type CreateSnapshotResponse = {
  id: string
  name: string
  status: "creating"
  created_at: string // date-time
}
```

### `RestoreSnapshotRequest`

Apply a captured snapshot to its source org. snapshot-api applies the
manifest verbatim minus any target ids the caller pre-decided to skip.
Drift detection (skip modified-since-install) is the caller's
responsibility — blueprint-manifest-api owns that logic for blueprint
restores; Config Hub's manu

```ts
type RestoreSnapshotRequest = {
  exclude_target_ids?: string[]
  include_target_ids?: string[]
  blueprint_instance_id?: string
}
```

### `RestoreSnapshotResponse`

```ts
type RestoreSnapshotResponse = {
  restore_index: number
  id: string
  status: "restoring"
}
```

### `Snapshot`

```ts
type Snapshot = {
  id: string
  org_id: string
  name: string
  description?: string
  trigger: "manual" | "sync" | "blueprint_install" | "scheduled" | "analytics"
  blueprint_instance_id?: string
  resource_counts: Record<string, number>
  create: {
    type: "create" | "restore"
    started_at: string // date-time
    completed_at?: string // date-time
    status: "in_progress" | "completed" | "partial" | "failed"
    error?: string
    summary?: {
      total: { ... }
      created: { ... }
      updated: { ... }
      unchanged: { ... }
      failed: { ... }
      skipped: { ... }
    }
    outcomes_s3_key?: string
    triggered_by: {
      name: { ... }
      user_id?: { ... }
      token_id?: { ... }
      actor?: { ... }
    }
    selected_target_count?: number
  }
  restores: Array<{
    type: "create" | "restore"
    started_at: string // date-time
    completed_at?: string // date-time
    status: "in_progress" | "completed" | "partial" | "failed"
    error?: string
    summary?: {
      total: { ... }
      created: { ... }
      updated: { ... }
      unchanged: { ... }
      failed: { ... }
      skipped: { ... }
    }
    outcomes_s3_key?: string
    triggered_by: {
      name: { ... }
      user_id?: { ... }
      token_id?: { ... }
      actor?: { ... }
    }
    selected_target_count?: number
  }>
  matched_count?: number
  scope?: "selection" | "org"
  expires_at?: string // date-time
  capture_summary?: {
    total: number
    captured: number
    skipped: number
    failed: number
  }
  skipped_resources?: Array<{
    type: string
    id: string
    reason: string
  }>
  skipped_resources_truncated?: boolean
  failed_resources?: Array<{
    type: string
    id: string
    reason: string
  }>
  failed_resources_truncated?: boolean
}
```

### `Operation`

```ts
type Operation = {
  type: "create" | "restore"
  started_at: string // date-time
  completed_at?: string // date-time
  status: "in_progress" | "completed" | "partial" | "failed"
  error?: string
  summary?: {
    total: number
    created: number
    updated: number
    unchanged: number
    failed: number
    skipped: number
  }
  outcomes_s3_key?: string
  triggered_by: {
    name: string
    user_id?: string
    token_id?: string
    actor?: {
      type: { ... }
      agent_id?: { ... }
      agent_name?: { ... }
      on_behalf_of?: { ... }
    }
  }
  selected_target_count?: number
}
```

### `RestoreSummary`

One outcome per captured manifest resource, including exclusions.

```ts
type RestoreSummary = {
  total: number
  created: number
  updated: number
  unchanged: number
  failed: number
  skipped: number
}
```

### `RestoreOutcome`

```ts
type RestoreOutcome = {
  type: string
  id: string
  captured_id?: string
  lineage_id?: string
  action: "created" | "updated" | "unchanged" | "failed" | "skipped"
  reason?: string
  error?: string
}
```

### `RestoreProgress`

Live progress of a running restore (present only while the operation is
in_progress), read from config-engine's operation log. A resource is
"matched" once found or created, "applied" once its full payload is written.


```ts
type RestoreProgress = {
  started: number
  matched: number
  applied: number
  failed: number
  phase: "preparing" | "matching" | "applying"
  by_type: Array<{
    type: string
    started: number
    applied: number
    failed: number
  }>
  recent: Array<{
    type: string
    id: string
    target_id?: string
    state: "working" | "matched" | "applied" | "failed"
    error?: string
    at?: string // date-time
  }>
  resources?: Array<{
    type: string
    id: string
    target_id?: string
    state: "working" | "matched" | "applied" | "failed"
    error?: string
    at?: string // date-time
  }>
  updated_at?: string // date-time
}
```

### `RestoreResourceProgress`

```ts
type RestoreResourceProgress = {
  type: string
  id: string
  target_id?: string
  state: "working" | "matched" | "applied" | "failed"
  error?: string
  at?: string // date-time
}
```

### `CallerIdentity`

```ts
type CallerIdentity = {
  name: string
  user_id?: string
  token_id?: string
  actor?: {
    type: "agent"
    agent_id?: string
    agent_name?: string
    on_behalf_of?: {
      user_id: { ... }
    }
  }
}
```

### `CallerActor`

Present when an agent made the call with a token carrying an `actor`
claim (e.g. the epilot Admin MCP via a login-as token). `user_id`/`name`
on the enclosing CallerIdentity are then the agent's token identity;
`on_behalf_of` is the user the agent acted for.


```ts
type CallerActor = {
  type: "agent"
  agent_id?: string
  agent_name?: string
  on_behalf_of?: {
    user_id: string
  }
}
```

### `RetentionConfig`

Flat retention window for a scheduled snapshot.
Converted to a `ttl` epoch at capture time. Capped at ~24 months.


```ts
type RetentionConfig = {
  value: number
  unit: "days" | "weeks" | "months"
}
```

### `PutOrgSnapshotScheduleRequest`

Body for `putOrgSnapshotSchedule`. All fields optional; unset fields
receive defaults on first create and are left unchanged on updates
(except `updated_at`).


```ts
type PutOrgSnapshotScheduleRequest = {
  enabled?: boolean
  cron_expression?: string
  timezone?: string
  retention?: {
    value: number
    unit: "days" | "weeks" | "months"
  }
  excluded_types?: string[]
}
```

### `OrgSnapshotSchedule`

Enrollment record for a scheduled org snapshot. One row per org.
This table — not EventBridge — is the source of truth; the EventBridge
schedule entry is the materialization of this row (reconciled on write
by Task 6).


```ts
type OrgSnapshotSchedule = {
  org_id: string
  enabled: boolean
  cron_expression: string
  timezone: string
  retention: {
    value: number
    unit: "days" | "weeks" | "months"
  }
  excluded_types?: string[]
  schedule_name: string
  last_started_at?: string // date-time
  last_completed_at?: string // date-time
  last_status?: "completed" | "partial" | "failed" | "skipped"
  last_succeeded_at?: string // date-time
  last_status_reason?: "restore_in_progress" | "attempts_exhausted" | "window_closed"
  enrolled_by?: "auto"
  opted_out_at?: string // date-time
  opted_out_by?: string
  created_by: string
  created_at: string // date-time
  updated_at: string // date-time
  blocked?: {
    since: string // date-time
    reason: "execution_unverifiable"
    execution_arn?: string
  }
  stale_since?: string // date-time
}
```

### `ScheduleBlocked`

No scheduled capture starts for the org until this is resolved. The admitted
execution cannot be verified; epilot resolves it.


```ts
type ScheduleBlocked = {
  since: string // date-time
  reason: "execution_unverifiable"
  execution_arn?: string
}
```
