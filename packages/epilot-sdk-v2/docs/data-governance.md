# Data Governance API

- **Base URL:** `https://data-governance.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/data-governance](https://docs.epilot.io/api/data-governance)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.dataGovernance.queryEntities(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/data-governance'

const dataGovernanceClient = getClient()
authorize(dataGovernanceClient, () => '<token>')
const { data } = await dataGovernanceClient.queryEntities(...)
```

## Operations

**Query**
- [`queryEntities`](#queryentities)

**Auditable Jobs**
- [`createJob`](#createjob)
- [`updateJob`](#updatejob)
- [`getJob`](#getjob)
- [`getJobReportUrl`](#getjobreporturl)
- [`createJobForConfig`](#createjobforconfig)
- [`listJobs`](#listjobs)

**Data Lifecycle Configs**
- [`getConfig`](#getconfig)
- [`upsertConfig`](#upsertconfig)
- [`listConfigs`](#listconfigs)

**Schemas**
- [`ConfigType`](#configtype)
- [`JobStatus`](#jobstatus)
- [`JobTrigger`](#jobtrigger)
- [`JobReportFormat`](#jobreportformat)
- [`JobReport`](#jobreport)
- [`CreateJobRequest`](#createjobrequest)
- [`JobDetails`](#jobdetails)
- [`UpdateJobRequest`](#updatejobrequest)
- [`Job`](#job)
- [`ListJobsResponse`](#listjobsresponse)
- [`JobReportUrlResponse`](#jobreporturlresponse)
- [`QueryFilterType`](#queryfiltertype)
- [`QueryFilter`](#queryfilter)
- [`QueryConfig`](#queryconfig)
- [`QueryEntitiesRequest`](#queryentitiesrequest)
- [`QueryEntitiesResult`](#queryentitiesresult)
- [`ConfigSchedule`](#configschedule)
- [`IntervalConfigSchedule`](#intervalconfigschedule)
- [`UpsertConfigRequest`](#upsertconfigrequest)
- [`Config`](#config)
- [`DeletionRelationEntitySchema`](#deletionrelationentityschema)
- [`ListConfigsResponse`](#listconfigsresponse)

### `queryEntities`

Query entities matching a data lifecycle config

`POST /data-governance/v1/{entity_schema}/query`

```ts
const { data } = await client.queryEntities(
  {
    entity_schema: 'example',
  },
  {
    saved_view_id: 'string',
    include_deleted: 'true',
    filters: [
      {
        type: 'entity_workflows_only_in_closed_or_cancelled_status',
        related_entity_schemas: ['string'],
        lookback_period_days: 0,
        message_type: ['SENT'],
        workflow_status: ['CLOSED']
      }
    ],
    from: 0,
    size: 0,
    hydrate: true,
    fields: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

Create a new job run

`POST /data-governance/v1/{entity_schema}/jobs`

```ts
const { data } = await client.createJob(
  {
    entity_schema: 'example',
  },
  {
    type: 'deletion',
    config_id: 'string',
    scheduled_for: '1970-01-01',
    status: 'in_progress',
    started_at: '1970-01-01T00:00:00.000Z'
  },
)
```

<details>
<summary>Response</summary>

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

Update an existing job run

`PATCH /data-governance/v1/{entity_schema}/jobs/{job_id}`

```ts
const { data } = await client.updateJob(
  {
    entity_schema: 'example',
    job_id: 'example',
  },
  {
    status: 'in_progress',
    details: {},
    completed_at: '1970-01-01T00:00:00.000Z',
    error: 'string',
    report: {
      bucket: 'string',
      key: 'string',
      format: 'csv'
    }
  },
)
```

<details>
<summary>Response</summary>

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

Get a job by ID

`GET /data-governance/v1/jobs/{job_id}`

```ts
const { data } = await client.getJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Get report download URL for a job

`GET /data-governance/v1/jobs/{job_id}/report-url`

```ts
const { data } = await client.getJobReportUrl({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "url": "string",
  "expires_in": 0
}
```

</details>

---

### `getConfig`

Get a config by ID

`GET /data-governance/v1/configs/{config_id}`

```ts
const { data } = await client.getConfig({
  config_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Trigger a manual job run for a config

`POST /data-governance/v1/configs/{config_id}/jobs`

```ts
const { data } = await client.createJobForConfig({
  config_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Create or update a data lifecycle config

`POST /data-governance/v1/{entity_schema}/configs`

```ts
const { data } = await client.upsertConfig(
  {
    entity_schema: 'example',
  },
  {
    type: 'deletion',
    query: {
      saved_view_id: 'string',
      include_deleted: 'true',
      filters: [
        {
          type: 'entity_workflows_only_in_closed_or_cancelled_status',
          related_entity_schemas: ['string'],
          lookback_period_days: 0,
          message_type: ['SENT'],
          workflow_status: ['CLOSED']
        }
      ]
    },
    schedule: {
      frequency: 'interval',
      interval_days: 1,
      start_date: '1970-01-01',
      end_date: '1970-01-01'
    },
    relations_for_deletion: ['contact'],
    enabled: true
  },
)
```

<details>
<summary>Response</summary>

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

List data lifecycle configs

`GET /data-governance/v1/configs`

```ts
const { data } = await client.listConfigs({
  limit: 1,
  cursor: 'example',
  entity_schema: 'example',
  type: 'example',
  next_run_at: 'example',
  enabled: true,
})
```

<details>
<summary>Response</summary>

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

List job runs

`GET /data-governance/v1/jobs`

```ts
const { data } = await client.listJobs({
  limit: 1,
  cursor: 'example',
  entity_schema: 'example',
  type: 'example',
  status: 'example',
  config_id: 'example',
})
```

<details>
<summary>Response</summary>

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

## Schemas

### `ConfigType`

The governance action type. Determines what operation is performed on
matched entities when a job runs. Currently only `deletion` is supported.


```ts
type ConfigType = "deletion"
```

### `JobStatus`

Current execution status of a job run.
- `in_progress` — the job is actively processing entities.
- `success` — the job completed without critical errors.
- `failed` — the job terminated due to an error.


```ts
type JobStatus = "in_progress" | "success" | "failed"
```

### `JobTrigger`

Indicates how the job was initiated.
- `schedule` — automatically created by the background scheduler.
- `manual` — explicitly triggered by a user via the API.


```ts
type JobTrigger = "schedule" | "manual"
```

### `JobReportFormat`

File format of the job report. Currently only CSV is supported.

```ts
type JobReportFormat = "csv"
```

### `JobReport`

Reference to a report file stored in S3 that details the outcome of a
job run (e.g., which entities were deleted or failed).


```ts
type JobReport = {
  bucket?: string
  key?: string
  format?: "csv"
}
```

### `CreateJobRequest`

Request payload for creating a new job run.

```ts
type CreateJobRequest = {
  type: "deletion"
  config_id: string
  scheduled_for: string // date
  status?: "in_progress" | "success" | "failed"
  started_at?: string // date-time
}
```

### `JobDetails`

Type-specific job outcome payload. The shape depends on the config type.
For `deletion` jobs, typical fields include:
- `matched_count` — total entities matched by the query
- `deleted_count` — entities successfully deleted
- `failed_count` — entities that could not be deleted


```ts
type JobDetails = Record<string, unknown>
```

### `UpdateJobRequest`

Partial update payload for an existing job. Only the fields provided
will be merged into the job record.


```ts
type UpdateJobRequest = {
  status?: "in_progress" | "success" | "failed"
  details?: Record<string, unknown>
  completed_at?: string // date-time
  error?: string
  report?: {
    bucket?: string
    key?: string
    format?: "csv"
  }
}
```

### `Job`

Represents a single execution run of a data lifecycle config. Tracks the
full lifecycle from creation through completion, including outcome
details and an optional downloadable report.


```ts
type Job = {
  id: string
  type: "deletion"
  config_id: string
  entity_schema: string
  scheduled_for: string // date
  status: "in_progress" | "success" | "failed"
  details?: Record<string, unknown>
  started_at?: string // date-time
  completed_at?: string // date-time
  error?: string
  report?: {
    bucket?: string
    key?: string
    format?: "csv"
  }
  created_at: string // date-time
  last_updated_at: string // date-time
  trigger?: "schedule" | "manual"
  triggered_by?: string
}
```

### `ListJobsResponse`

Paginated response containing a list of job runs.

```ts
type ListJobsResponse = {
  jobs?: Array<{
    id: string
    type: "deletion"
    config_id: string
    entity_schema: string
    scheduled_for: string // date
    status: "in_progress" | "success" | "failed"
    details?: Record<string, unknown>
    started_at?: string // date-time
    completed_at?: string // date-time
    error?: string
    report?: {
      bucket?: { ... }
      key?: { ... }
      format?: { ... }
    }
    created_at: string // date-time
    last_updated_at: string // date-time
    trigger?: "schedule" | "manual"
    triggered_by?: string
  }>
  cursor?: string
}
```

### `JobReportUrlResponse`

Contains a time-limited pre-signed URL to download a job report.

```ts
type JobReportUrlResponse = {
  url?: string
  expires_in?: number
}
```

### `QueryFilterType`

Predefined data governance filter types that can be layered on top of
a saved view to narrow down target entities:
- `entity_workflows_only_in_closed_or_cancelled_status` — include only
  entities whose own workflows are all in a closed/cancelled state.
- `no_related_entities` — include only entitie

```ts
type QueryFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
```

### `QueryFilter`

A single governance filter condition applied during entity querying.
The required and optional fields depend on the `type`.


```ts
type QueryFilter = {
  type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
  related_entity_schemas?: string[]
  lookback_period_days?: number
  message_type?: "SENT" | "RECEIVED"[]
  workflow_status?: "CLOSED" | "DONE"[]
}
```

### `QueryConfig`

Defines the query used by a data lifecycle config to identify target
entities. Combines a saved view with optional governance filters.


```ts
type QueryConfig = {
  saved_view_id: string
  include_deleted?: "true" | "false" | "only"
  filters?: Array<{
    type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
    related_entity_schemas?: string[]
    lookback_period_days?: number
    message_type?: "SENT" | "RECEIVED"[]
    workflow_status?: "CLOSED" | "DONE"[]
  }>
}
```

### `QueryEntitiesRequest`

Request body for the query endpoint. Extends `QueryConfig` with
pagination and projection options.


```ts
type QueryEntitiesRequest = {
  saved_view_id: string
  include_deleted?: "true" | "false" | "only"
  filters?: Array<{
    type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
    related_entity_schemas?: string[]
    lookback_period_days?: number
    message_type?: "SENT" | "RECEIVED"[]
    workflow_status?: "CLOSED" | "DONE"[]
  }>
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
}
```

### `QueryEntitiesResult`

Response from the entity query endpoint.

```ts
type QueryEntitiesResult = {
  hits?: number
  results?: Record<string, unknown>[]
}
```

### `ConfigSchedule`

Interval-based schedule. The governance engine will create a job every
`interval_days` days, optionally bounded by start and end dates.


```ts
type ConfigSchedule = {
  frequency: "interval"
  interval_days: number
  start_date?: string // date
  end_date?: string // date
}
```

### `IntervalConfigSchedule`

Interval-based schedule. The governance engine will create a job every
`interval_days` days, optionally bounded by start and end dates.


```ts
type IntervalConfigSchedule = {
  frequency: "interval"
  interval_days: number
  start_date?: string // date
  end_date?: string // date
}
```

### `UpsertConfigRequest`

Request payload for creating or updating a data lifecycle config.

```ts
type UpsertConfigRequest = {
  type: "deletion"
  query: {
    saved_view_id: string
    include_deleted?: "true" | "false" | "only"
    filters?: Array<{
      type: { ... }
      related_entity_schemas?: { ... }
      lookback_period_days?: { ... }
      message_type?: { ... }
      workflow_status?: { ... }
    }>
  }
  schedule: {
    frequency: "interval"
    interval_days: number
    start_date?: string // date
    end_date?: string // date
  }
  relations_for_deletion?: "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract"[]
  enabled?: boolean
}
```

### `Config`

A data lifecycle config defining an automated policy (e.g., scheduled
entity deletion) for a specific entity schema.


```ts
type Config = {
  id: string
  type: "deletion"
  entity_schema: string
  query: {
    saved_view_id: string
    include_deleted?: "true" | "false" | "only"
    filters?: Array<{
      type: { ... }
      related_entity_schemas?: { ... }
      lookback_period_days?: { ... }
      message_type?: { ... }
      workflow_status?: { ... }
    }>
  }
  schedule?: {
    frequency: "interval"
    interval_days: number
    start_date?: string // date
    end_date?: string // date
  }
  enabled?: boolean
  created_at?: string // date-time
  last_updated_at?: string // date-time
  next_run_at?: string // date
  relations_for_deletion?: "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract"[]
  last_run_at?: string // date-time
}
```

### `DeletionRelationEntitySchema`

Entity schema slug that can be specified as a cascading deletion
target. When a primary entity is deleted, related entities of these
schemas are also removed.


```ts
type DeletionRelationEntitySchema = "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract"
```

### `ListConfigsResponse`

Paginated response containing a list of data lifecycle configs.

```ts
type ListConfigsResponse = {
  configs?: Array<{
    id: string
    type: "deletion"
    entity_schema: string
    query: {
      saved_view_id: { ... }
      include_deleted?: { ... }
      filters?: { ... }
    }
    schedule?: {
      frequency: { ... }
      interval_days: { ... }
      start_date?: { ... }
      end_date?: { ... }
    }
    enabled?: boolean
    created_at?: string // date-time
    last_updated_at?: string // date-time
    next_run_at?: string // date
    relations_for_deletion?: "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract"[]
    last_run_at?: string // date-time
  }>
  cursor?: string
}
```
