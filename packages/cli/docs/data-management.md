# Data Management API

- **API Docs:** [https://docs.epilot.io/api/data-management](https://docs.epilot.io/api/data-management)

## Quick Start

```bash
# List available operations
epilot data-management

# Call an operation
epilot data-management queryEntities -p entity_schema=example
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

**Data Management**
- [`queryEntities`](#queryentities) — Executes a query against the specified entity schema using the saved view definition, optionally combined with additiona
- [`createJob`](#createjob) — POST /data-management/v1/{entity_schema}/jobs
- [`updateJob`](#updatejob) — PATCH /data-management/v1/{entity_schema}/jobs/{job_id}
- [`getJob`](#getjob) — Returns details of a single job run.
- [`getJobReportUrl`](#getjobreporturl) — Returns a short-lived, pre-signed URL to download the report file for the given job.
- [`getConfig`](#getconfig) — Returns a data management config by its id.
- [`createJobForConfig`](#createjobforconfig) — Creates a job run for the given config and triggers asynchronous execution. Returns a job id which can be used to poll j
- [`upsertConfig`](#upsertconfig) — Creates or updates a config for the given entity schema. The config is later used by a scheduled background process to p
- [`listConfigs`](#listconfigs) — Returns a paginated list of configs
- [`listJobs`](#listjobs) — Returns a paginated list of jobs

### `queryEntities`

Executes a query against the specified entity schema using the saved view definition, optionally combined with additiona

`POST /data-management/v1/{entity_schema}/query`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | Target entity schema to query (for example: "contact", "opportunity", "order").
 |

**Request Body** (required)

**Sample Call**

```bash
epilot data-management queryEntities \
  -p entity_schema=example
```

With request body:

```bash
epilot data-management queryEntities \
  -p entity_schema=example \
  -d '{
  "saved_view_id": "string",
  "include_deleted": "true",
  "filters": [
    {
      "type": "entity_workflows_only_in_closed_or_cancelled_status",
      "related_entity_schemas": ["string"],
      "lookback_period_days": 0,
      "message_type": ["SENT"]
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
epilot data-management queryEntities example
```

Using stdin pipe:

```bash
cat body.json | epilot data-management queryEntities -p entity_schema=example
```

With JSONata filter:

```bash
epilot data-management queryEntities -p entity_schema=example --jsonata 'results[0]'
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

`POST /data-management/v1/{entity_schema}/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot data-management createJob \
  -p entity_schema=example
```

With request body:

```bash
epilot data-management createJob \
  -p entity_schema=example \
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
epilot data-management createJob example
```

Using stdin pipe:

```bash
cat body.json | epilot data-management createJob -p entity_schema=example
```

With JSONata filter:

```bash
epilot data-management createJob -p entity_schema=example --jsonata 'id'
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

`PATCH /data-management/v1/{entity_schema}/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes |  |
| `job_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot data-management updateJob \
  -p entity_schema=example \
  -p job_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot data-management updateJob \
  -p entity_schema=example \
  -p job_id=123e4567-e89b-12d3-a456-426614174000 \
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
epilot data-management updateJob example 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot data-management updateJob -p entity_schema=example -p job_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot data-management updateJob -p entity_schema=example -p job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
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

Returns details of a single job run.

`GET /data-management/v1/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot data-management getJob \
  -p job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot data-management getJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot data-management getJob -p job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
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

Returns a short-lived, pre-signed URL to download the report file for the given job.

`GET /data-management/v1/jobs/{job_id}/report-url`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot data-management getJobReportUrl \
  -p job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot data-management getJobReportUrl 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot data-management getJobReportUrl -p job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'url'
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

Returns a data management config by its id.

`GET /data-management/v1/configs/{config_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `config_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot data-management getConfig \
  -p config_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot data-management getConfig 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot data-management getConfig -p config_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
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
        "message_type": ["SENT"]
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

Creates a job run for the given config and triggers asynchronous execution. Returns a job id which can be used to poll j

`POST /data-management/v1/configs/{config_id}/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `config_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot data-management createJobForConfig \
  -p config_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot data-management createJobForConfig 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot data-management createJobForConfig -p config_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
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

Creates or updates a config for the given entity schema. The config is later used by a scheduled background process to p

`POST /data-management/v1/{entity_schema}/configs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_schema` | path | string | Yes | Target entity schema for the config
 |

**Request Body** (required)

**Sample Call**

```bash
epilot data-management upsertConfig \
  -p entity_schema=example
```

With request body:

```bash
epilot data-management upsertConfig \
  -p entity_schema=example \
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
        "message_type": ["SENT"]
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
epilot data-management upsertConfig example
```

Using stdin pipe:

```bash
cat body.json | epilot data-management upsertConfig -p entity_schema=example
```

With JSONata filter:

```bash
epilot data-management upsertConfig -p entity_schema=example --jsonata 'id'
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
        "message_type": ["SENT"]
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

Returns a paginated list of configs

`GET /data-management/v1/configs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `limit` | query | number | No |  |
| `cursor` | query | string | No |  |
| `entity_schema` | query | string | No | Optional entity schema to filter configs. |
| `type` | query | "deletion" | No | Optional config type to filter configs. |
| `next_run_at` | query | string (date) | No | Optional next run date (YYYY-MM-DD) to filter configs. |
| `enabled` | query | boolean | No | Optional enabled status to filter configs. |

**Sample Call**

```bash
epilot data-management listConfigs
```

With JSONata filter:

```bash
epilot data-management listConfigs --jsonata 'configs'
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
            "message_type": ["SENT"]
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

Returns a paginated list of jobs

`GET /data-management/v1/jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `limit` | query | number | No |  |
| `cursor` | query | string | No |  |
| `entity_schema` | query | string | No | Optional entity schema to filter jobs. |
| `type` | query | "deletion" | No | Optional job type to filter jobs. |
| `status` | query | "in_progress" \| "success" \| "failed" | No | Optional job status to filter jobs. |
| `config_id` | query | string | No | Optional config id to filter jobs. |

**Sample Call**

```bash
epilot data-management listJobs
```

With JSONata filter:

```bash
epilot data-management listJobs --jsonata 'jobs'
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
