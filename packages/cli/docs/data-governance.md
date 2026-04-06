# Data Governance API

- **Base URL:** `https://data-governance-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/data-governance](https://docs.epilot.io/api/data-governance)

The **Data Governance API** provides a set of endpoints for managing the lifecycle of
entity data within the epilot platform. It enables organizations to define governance
policies — such as automated data deletion rules — and execute them against any entity
schema (currently limited to Contacts).

## Quick Start

```bash
# List available operations
epilot data-governance

# Call an operation
epilot data-governance queryEntities -p entity_schema=contact
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

**Query**
- [`queryEntities`](#queryentities) — Executes a query against the specified entity schema using a saved view

**Jobs**
- [`createJob`](#createjob) — Creates a new job run for the given entity schema. The job is associated
- [`updateJob`](#updatejob) — Partially updates an existing job run. Typically used to record
- [`getJob`](#getjob) — Returns full details of a single job run, including its current status,
- [`getJobReportUrl`](#getjobreporturl) — Returns a short-lived, pre-signed S3 URL to download the CSV report
- [`createJobForConfig`](#createjobforconfig) — Manually triggers a new job run for the specified config. The job is
- [`listJobs`](#listjobs) — Returns a cursor-paginated list of job runs. Results can be filtered

**Configs**
- [`getConfig`](#getconfig) — Returns a single data governance config by its unique identifier,
- [`upsertConfig`](#upsertconfig) — Creates a new governance config or updates an existing one for the
- [`listConfigs`](#listconfigs) — Returns a cursor-paginated list of governance configs. Results can be

### `queryEntities`

Executes a query against the specified entity schema using a saved view

`POST /data-governance/v1/{entity_schema}/query`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | The target entity schema slug to query
(e.g. `contact`, `opportunity`, `order`).
 |

**Request Body** (required)

**Sample Call**

```bash
epilot data-governance queryEntities \
  -p entity_schema=contact
```

With request body:

```bash
epilot data-governance queryEntities \
  -p entity_schema=contact \
  -d '{
  "saved_view_id": "string",
  "include_deleted": "true",
  "filters": [
    {
      "type": "entity_workflows_only_in_closed_or_cancelled_status",
      "related_entity_schemas": ["string"],
      "lookback_period_days": 0,
      "message_type": ["SENT"],
      "workflow_status": ["CLOSED"]
    }
  ],
  "from": 0,
  "size": 0,
  "hydrate": true,
  "fields": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot data-governance queryEntities contact
```

Using stdin pipe:

```bash
cat body.json | epilot data-governance queryEntities -p entity_schema=contact
```

With JSONata filter:

```bash
epilot data-governance queryEntities -p entity_schema=contact --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {}
  ]
}
```

</details>

---

### `createJob`

Creates a new job run for the given entity schema. The job is associated

`POST /data-governance/v1/{entity_schema}/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | The entity schema slug this job operates on (e.g. `contact`). |

**Request Body** (required)

**Sample Call**

```bash
epilot data-governance createJob \
  -p entity_schema=contact
```

With request body:

```bash
epilot data-governance createJob \
  -p entity_schema=contact \
  -d '{
  "type": "deletion",
  "config_id": "string",
  "scheduled_for": "1970-01-01",
  "status": "in_progress",
  "started_at": "1970-01-01T00:00:00.000Z"
}'
```

Using positional args for path parameters:

```bash
epilot data-governance createJob contact
```

Using stdin pipe:

```bash
cat body.json | epilot data-governance createJob -p entity_schema=contact
```

With JSONata filter:

```bash
epilot data-governance createJob -p entity_schema=contact --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "config_id": "string",
  "entity_schema": "string",
  "scheduled_for": "1970-01-01",
  "status": "in_progress",
  "details": {},
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "error": "string",
  "report": {
    "bucket": "string",
    "key": "string",
    "format": "csv"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "trigger": "schedule",
  "triggered_by": "string"
}
```

</details>

---

### `updateJob`

Partially updates an existing job run. Typically used to record

`PATCH /data-governance/v1/{entity_schema}/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | The entity schema slug this job belongs to. |
| `job_id` | path | string | Yes | Unique identifier of the job to update. |

**Request Body** (required)

**Sample Call**

```bash
epilot data-governance updateJob \
  -p entity_schema=contact \
  -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

With request body:

```bash
epilot data-governance updateJob \
  -p entity_schema=contact \
  -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456 \
  -d '{
  "status": "in_progress",
  "details": {},
  "completed_at": "1970-01-01T00:00:00.000Z",
  "error": "string",
  "report": {
    "bucket": "string",
    "key": "string",
    "format": "csv"
  }
}'
```

Using positional args for path parameters:

```bash
epilot data-governance updateJob contact 2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

Using stdin pipe:

```bash
cat body.json | epilot data-governance updateJob -p entity_schema=contact -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

With JSONata filter:

```bash
epilot data-governance updateJob -p entity_schema=contact -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "config_id": "string",
  "entity_schema": "string",
  "scheduled_for": "1970-01-01",
  "status": "in_progress",
  "details": {},
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "error": "string",
  "report": {
    "bucket": "string",
    "key": "string",
    "format": "csv"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "trigger": "schedule",
  "triggered_by": "string"
}
```

</details>

---

### `getJob`

Returns full details of a single job run, including its current status,

`GET /data-governance/v1/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes | Unique identifier of the job. |

**Sample Call**

```bash
epilot data-governance getJob \
  -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

Using positional args for path parameters:

```bash
epilot data-governance getJob 2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

With JSONata filter:

```bash
epilot data-governance getJob -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "config_id": "string",
  "entity_schema": "string",
  "scheduled_for": "1970-01-01",
  "status": "in_progress",
  "details": {},
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "error": "string",
  "report": {
    "bucket": "string",
    "key": "string",
    "format": "csv"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "trigger": "schedule",
  "triggered_by": "string"
}
```

</details>

---

### `getJobReportUrl`

Returns a short-lived, pre-signed S3 URL to download the CSV report

`GET /data-governance/v1/jobs/{job_id}/report-url`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes | Unique identifier of the job whose report to download. |

**Sample Call**

```bash
epilot data-governance getJobReportUrl \
  -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

Using positional args for path parameters:

```bash
epilot data-governance getJobReportUrl 2d3b5e90-e4c0-4f1a-9c7b-abc123def456
```

With JSONata filter:

```bash
epilot data-governance getJobReportUrl -p job_id=2d3b5e90-e4c0-4f1a-9c7b-abc123def456 --jsonata 'url'
```

<details>
<summary>Sample Response</summary>

```json
{
  "url": "string",
  "expires_in": 0
}
```

</details>

---

### `getConfig`

Returns a single data governance config by its unique identifier,

`GET /data-governance/v1/configs/{config_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `config_id` | path | string | Yes | Unique identifier of the config. |

**Sample Call**

```bash
epilot data-governance getConfig \
  -p config_id=cfg-8a12f3b4-5678-9abc-def0-123456789abc
```

Using positional args for path parameters:

```bash
epilot data-governance getConfig cfg-8a12f3b4-5678-9abc-def0-123456789abc
```

With JSONata filter:

```bash
epilot data-governance getConfig -p config_id=cfg-8a12f3b4-5678-9abc-def0-123456789abc --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "entity_schema": "string",
  "query": {
    "saved_view_id": "string",
    "include_deleted": "true",
    "filters": [
      {
        "type": "entity_workflows_only_in_closed_or_cancelled_status",
        "related_entity_schemas": ["string"],
        "lookback_period_days": 0,
        "message_type": ["SENT"],
        "workflow_status": ["CLOSED"]
      }
    ]
  },
  "schedule": {
    "frequency": "interval",
    "interval_days": 1,
    "start_date": "1970-01-01",
    "end_date": "1970-01-01"
  },
  "enabled": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "next_run_at": "1970-01-01",
  "relations_for_deletion": ["contact"],
  "last_run_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createJobForConfig`

Manually triggers a new job run for the specified config. The job is

`POST /data-governance/v1/configs/{config_id}/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `config_id` | path | string | Yes | Unique identifier of the config to execute. |

**Sample Call**

```bash
epilot data-governance createJobForConfig \
  -p config_id=cfg-8a12f3b4-5678-9abc-def0-123456789abc
```

Using positional args for path parameters:

```bash
epilot data-governance createJobForConfig cfg-8a12f3b4-5678-9abc-def0-123456789abc
```

With JSONata filter:

```bash
epilot data-governance createJobForConfig -p config_id=cfg-8a12f3b4-5678-9abc-def0-123456789abc --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "config_id": "string",
  "entity_schema": "string",
  "scheduled_for": "1970-01-01",
  "status": "in_progress",
  "details": {},
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "error": "string",
  "report": {
    "bucket": "string",
    "key": "string",
    "format": "csv"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "trigger": "schedule",
  "triggered_by": "string"
}
```

</details>

---

### `upsertConfig`

Creates a new governance config or updates an existing one for the

`POST /data-governance/v1/{entity_schema}/configs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | The entity schema slug this config targets (e.g. `contact`). |

**Request Body** (required)

**Sample Call**

```bash
epilot data-governance upsertConfig \
  -p entity_schema=contact
```

With request body:

```bash
epilot data-governance upsertConfig \
  -p entity_schema=contact \
  -d '{
  "type": "deletion",
  "query": {
    "saved_view_id": "string",
    "include_deleted": "true",
    "filters": [
      {
        "type": "entity_workflows_only_in_closed_or_cancelled_status",
        "related_entity_schemas": ["string"],
        "lookback_period_days": 0,
        "message_type": ["SENT"],
        "workflow_status": ["CLOSED"]
      }
    ]
  },
  "schedule": {
    "frequency": "interval",
    "interval_days": 1,
    "start_date": "1970-01-01",
    "end_date": "1970-01-01"
  },
  "relations_for_deletion": ["contact"],
  "enabled": true
}'
```

Using positional args for path parameters:

```bash
epilot data-governance upsertConfig contact
```

Using stdin pipe:

```bash
cat body.json | epilot data-governance upsertConfig -p entity_schema=contact
```

With JSONata filter:

```bash
epilot data-governance upsertConfig -p entity_schema=contact --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "type": "deletion",
  "entity_schema": "string",
  "query": {
    "saved_view_id": "string",
    "include_deleted": "true",
    "filters": [
      {
        "type": "entity_workflows_only_in_closed_or_cancelled_status",
        "related_entity_schemas": ["string"],
        "lookback_period_days": 0,
        "message_type": ["SENT"],
        "workflow_status": ["CLOSED"]
      }
    ]
  },
  "schedule": {
    "frequency": "interval",
    "interval_days": 1,
    "start_date": "1970-01-01",
    "end_date": "1970-01-01"
  },
  "enabled": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "next_run_at": "1970-01-01",
  "relations_for_deletion": ["contact"],
  "last_run_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listConfigs`

Returns a cursor-paginated list of governance configs. Results can be

`GET /data-governance/v1/configs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `limit` | query | number | No | Maximum number of configs to return per page. |
| `cursor` | query | string | No | Opaque cursor returned from a previous response for fetching the
next page of results.
 |
| `entity_schema` | query | string | No | Filter configs by entity schema slug (e.g. `contact`). |
| `type` | query | "deletion" | No | Filter configs by governance action type. |
| `next_run_at` | query | string (date) | No | Filter configs whose next scheduled run date matches this value
(format: `YYYY-MM-DD`).
 |
| `enabled` | query | boolean | No | Filter by enabled (`true`) or disabled (`false`) status. |

**Sample Call**

```bash
epilot data-governance listConfigs
```

With JSONata filter:

```bash
epilot data-governance listConfigs --jsonata 'configs'
```

<details>
<summary>Sample Response</summary>

```json
{
  "configs": [
    {
      "id": "string",
      "type": "deletion",
      "entity_schema": "string",
      "query": {
        "saved_view_id": "string",
        "include_deleted": "true",
        "filters": [
          {
            "type": "entity_workflows_only_in_closed_or_cancelled_status",
            "related_entity_schemas": ["string"],
            "lookback_period_days": 0,
            "message_type": ["SENT"],
            "workflow_status": ["CLOSED"]
          }
        ]
      },
      "schedule": {
        "frequency": "interval",
        "interval_days": 1,
        "start_date": "1970-01-01",
        "end_date": "1970-01-01"
      },
      "enabled": true,
      "created_at": "1970-01-01T00:00:00.000Z",
      "last_updated_at": "1970-01-01T00:00:00.000Z",
      "next_run_at": "1970-01-01",
      "relations_for_deletion": ["contact"],
      "last_run_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "cursor": "string"
}
```

</details>

---

### `listJobs`

Returns a cursor-paginated list of job runs. Results can be filtered

`GET /data-governance/v1/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `limit` | query | number | No | Maximum number of jobs to return per page. |
| `cursor` | query | string | No | Opaque cursor returned from a previous response for fetching the
next page of results.
 |
| `entity_schema` | query | string | No | Filter jobs by entity schema slug (e.g. `contact`). |
| `type` | query | "deletion" | No | Filter jobs by governance action type. |
| `status` | query | "in_progress" \| "success" \| "failed" | No | Filter jobs by execution status. |
| `config_id` | query | string | No | Filter jobs belonging to a specific config. |

**Sample Call**

```bash
epilot data-governance listJobs
```

With JSONata filter:

```bash
epilot data-governance listJobs --jsonata 'jobs'
```

<details>
<summary>Sample Response</summary>

```json
{
  "jobs": [
    {
      "id": "string",
      "type": "deletion",
      "config_id": "string",
      "entity_schema": "string",
      "scheduled_for": "1970-01-01",
      "status": "in_progress",
      "details": {},
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "error": "string",
      "report": {
        "bucket": "string",
        "key": "string",
        "format": "csv"
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "last_updated_at": "1970-01-01T00:00:00.000Z",
      "trigger": "schedule",
      "triggered_by": "string"
    }
  ],
  "cursor": "string"
}
```

</details>

---
