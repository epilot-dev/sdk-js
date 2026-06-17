# Snapshot API

- **Base URL:** `https://snapshot.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/snapshot](https://docs.epilot.io/api/snapshot)

Point-in-time backups of epilot configuration with restore.

## Quick Start

```bash
# List available operations
epilot snapshot

# Call an operation
epilot snapshot listSnapshots
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

**Snapshots**
- [`listSnapshots`](#listsnapshots) — List snapshots for the caller's organization, newest first.
- [`createSnapshot`](#createsnapshot) — Create a new snapshot of the given resources. Async — returns immediately
- [`captureOrgSnapshot`](#captureorgsnapshot) — Snapshot the caller's whole organization now. Fetches a fresh inventory
- [`getSnapshot`](#getsnapshot) — Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.
- [`deleteSnapshot`](#deletesnapshot) — Delete a snapshot's metadata and S3 manifest.
- [`restoreSnapshot`](#restoresnapshot) — Restore a snapshot to the org. Async — returns immediately; client polls
- [`listSnapshotResources`](#listsnapshotresources) — List the resources captured in this snapshot. Returns lightweight
- [`getSnapshotResource`](#getsnapshotresource) — Fetch one captured resource with its full payload. For UI views
- [`listDependencies`](#listdependencies) — Walk the dependency tree for a set of resources and return the full

### `listSnapshots`

List snapshots for the caller's organization, newest first.

`GET /v1/snapshots`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No |  |
| `size` | query | number | No |  |
| `resource` | query | string[] | No | Filter to snapshots containing one or more resources. Format
`<type>:<id>`. Split on the first colon — the `<id>` half may
contain colons (e.g., role acl ids like `role:acl:internal:foo`).
Repeat the  |

**Sample Call**

```bash
epilot snapshot listSnapshots
```

With JSONata filter:

```bash
epilot snapshot listSnapshots --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

### `createSnapshot`

Create a new snapshot of the given resources. Async — returns immediately

`POST /v1/snapshots`

**Request Body** (required)

**Sample Call**

```bash
epilot snapshot createSnapshot
```

With request body:

```bash
epilot snapshot createSnapshot \
  -d '{
  "name": "string",
  "description": "string",
  "trigger": "manual",
  "blueprint_instance_id": "string",
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
cat body.json | epilot snapshot createSnapshot
```

With JSONata filter:

```bash
epilot snapshot createSnapshot --jsonata '$'
```

---

### `captureOrgSnapshot`

Snapshot the caller's whole organization now. Fetches a fresh inventory

`POST /v1/snapshots:capture-org`

**Request Body**

**Sample Call**

```bash
epilot snapshot captureOrgSnapshot \
  -d '{"name":"string","retention":{"value":1,"unit":"days"},"excluded_types":["string"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot snapshot captureOrgSnapshot
```

With JSONata filter:

```bash
epilot snapshot captureOrgSnapshot --jsonata '$'
```

---

### `getSnapshot`

Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.

`GET /v1/snapshots/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |

**Sample Call**

```bash
epilot snapshot getSnapshot \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot snapshot getSnapshot 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot snapshot getSnapshot -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |

**Sample Call**

```bash
epilot snapshot deleteSnapshot \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot snapshot deleteSnapshot 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot snapshot deleteSnapshot -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `restoreSnapshot`

Restore a snapshot to the org. Async — returns immediately; client polls

`POST /v1/snapshots/{id}:restore`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot snapshot restoreSnapshot \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"preserve_modified":false,"preserve_co_owned":false}'
```

Using positional args for path parameters:

```bash
epilot snapshot restoreSnapshot 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot snapshot restoreSnapshot -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot snapshot restoreSnapshot -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listSnapshotResources`

List the resources captured in this snapshot. Returns lightweight

`GET /v1/snapshots/{id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |

**Sample Call**

```bash
epilot snapshot listSnapshotResources \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot snapshot listSnapshotResources 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot snapshot listSnapshotResources -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

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

`GET /v1/snapshots/{id}/resources/{lineage_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |
| `lineage_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot snapshot getSnapshotResource \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p lineage_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot snapshot getSnapshotResource 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot snapshot getSnapshotResource -p id=123e4567-e89b-12d3-a456-426614174000 -p lineage_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'lineage_id'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/snapshots:list-dependencies`

**Request Body** (required)

**Sample Call**

```bash
epilot snapshot listDependencies \
  -d '{"resources":[{"type":"string","id":"string"}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot snapshot listDependencies
```

With JSONata filter:

```bash
epilot snapshot listDependencies --jsonata 'dependencies'
```

<details>
<summary>Sample Response</summary>

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
