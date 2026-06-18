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
- [`restoreSnapshot`](#restoresnapshot)
- [`listSnapshotResources`](#listsnapshotresources)
- [`getSnapshotResource`](#getsnapshotresource)
- [`listDependencies`](#listdependencies)

**Schemas**
- [`Error`](#error)
- [`EmptyInventoryError`](#emptyinventoryerror)
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
- [`SkippedResource`](#skippedresource)
- [`CallerIdentity`](#calleridentity)

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
      "create": {
        "type": "create",
        "started_at": "1970-01-01T00:00:00.000Z",
        "completed_at": "1970-01-01T00:00:00.000Z",
        "status": "in_progress",
        "error": "string",
        "triggered_by": {
          "name": "string",
          "user_id": "string",
          "token_id": "string"
        },
        "skipped": [
          {
            "lineage_id": "string",
            "reason": "modified"
          }
        ]
      },
      "restores": [
        {
          "type": "create",
          "started_at": "1970-01-01T00:00:00.000Z",
          "completed_at": "1970-01-01T00:00:00.000Z",
          "status": "in_progress",
          "error": "string",
          "triggered_by": {
            "name": "string",
            "user_id": "string",
            "token_id": "string"
          },
          "skipped": [
            {
              "lineage_id": "string",
              "reason": "modified"
            }
          ]
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
      }
    }
  ]
}
```

</details>

---

### `captureOrgSnapshot`

Snapshot the caller's whole organization now. Fetches a fresh inventory
of the org's configuration resources from configuration-hub-api, persists
it as an inventory artifact, and starts a `scope: "org

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
    "triggered_by": {
      "name": "string",
      "user_id": "string",
      "token_id": "string"
    },
    "skipped": [
      {
        "lineage_id": "string",
        "reason": "modified"
      }
    ]
  },
  "restores": [
    {
      "type": "create",
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "status": "in_progress",
      "error": "string",
      "triggered_by": {
        "name": "string",
        "user_id": "string",
        "token_id": "string"
      },
      "skipped": [
        {
          "lineage_id": "string",
          "reason": "modified"
        }
      ]
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
  }
}
```

</details>

---

### `deleteSnapshot`

Delete a snapshot's metadata and S3 manifest.

`DELETE /v1/snapshots/{id}`

```ts
const { data } = await client.deleteSnapshot({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `restoreSnapshot`

Restore a snapshot to the org. Async — returns immediately; client polls
`getSnapshot` until the latest entry in `restores` moves from
`in_progress` to one of `completed | partial | failed`.

`POST /v1/snapshots/{id}:restore`

```ts
const { data } = await client.restoreSnapshot(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    preserve_modified: false,
    preserve_co_owned: false,
    exclude_target_ids: ['string']
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

### `EmptyInventoryError`

Returned (422) when the org inventory contains no capturable resources
after filtering out sensitive, unsupported, and excluded types. The
`skipped_types` array explains why every type was dropped.


```ts
type EmptyInventoryError = {
  message: string
  skipped_types: Array<{
    type: string
    reason: string
  }>
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

Skipped resources surface under `Operation.skipped`. All filters default
to the open setting (apply everything), which keeps Config Hub's manual-
restore semantics unchanged.


```ts
type RestoreSnapshotRequest = {
  preserve_modified?: boolean
  preserve_co_owned?: boolean
  exclude_target_ids?: string[]
}
```

### `RestoreSnapshotResponse`

```ts
type RestoreSnapshotResponse = {
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
  trigger: "manual" | "sync" | "blueprint_install" | "scheduled"
  blueprint_instance_id?: string
  resource_counts: Record<string, number>
  create: {
    type: "create" | "restore"
    started_at: string // date-time
    completed_at?: string // date-time
    status: "in_progress" | "completed" | "partial" | "failed"
    error?: string
    triggered_by: {
      name: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    skipped?: Array<{
      lineage_id: { ... }
      reason: { ... }
    }>
  }
  restores: Array<{
    type: "create" | "restore"
    started_at: string // date-time
    completed_at?: string // date-time
    status: "in_progress" | "completed" | "partial" | "failed"
    error?: string
    triggered_by: {
      name: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    skipped?: Array<{
      lineage_id: { ... }
      reason: { ... }
    }>
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
  triggered_by: {
    name: string
    user_id?: string
    token_id?: string
  }
  skipped?: Array<{
    lineage_id: string
    reason: "modified" | "co_owned"
  }>
}
```

### `SkippedResource`

```ts
type SkippedResource = {
  lineage_id: string
  reason: "modified" | "co_owned"
}
```

### `CallerIdentity`

```ts
type CallerIdentity = {
  name: string
  user_id?: string
  token_id?: string
}
```
