# Data Management API

- **Base URL:** `https://data-management.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/data-management](https://docs.epilot.io/api/data-management)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.dataManagement.queryEntities(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/data-management'

const dataManagementClient = await getClient()
authorize(dataManagementClient, () => '<token>')
const { data } = await dataManagementClient.queryEntities(...)
```

## Operations

**Data Management**
- [`queryEntities`](#queryentities)
- [`createJob`](#createjob)
- [`updateJob`](#updatejob)
- [`getJob`](#getjob)
- [`getJobReportUrl`](#getjobreporturl)
- [`getConfig`](#getconfig)
- [`createJobForConfig`](#createjobforconfig)
- [`upsertConfig`](#upsertconfig)
- [`listConfigs`](#listconfigs)
- [`listJobs`](#listjobs)

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

Query entities using a saved view with additional data filters

`POST /data-management/v1/{entity_schema}/query`

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
        related_entity_schemas: [ /* ... */ ],
        lookback_period_days: 0
      }
    ],
    from: 0,
    size: 0,
    hydrate: true,
    fields: [
      'string'
    ]
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

`POST /data-management/v1/{entity_schema}/jobs`

```ts
const { data } = await client.createJob(
  {
    entity_schema: 'example',
  },
  {
    type: 'deletion',
    config_id: 'string',
    scheduled_for: 'string',
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
  "scheduled_for": "string",
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

`PATCH /data-management/v1/{entity_schema}/jobs/{job_id}`

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
  "scheduled_for": "string",
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

Get a job by id

`GET /data-management/v1/jobs/{job_id}`

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
  "scheduled_for": "string",
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

`GET /data-management/v1/jobs/{job_id}/report-url`

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

Get a config by id

`GET /data-management/v1/configs/{config_id}`

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
      {}
    ]
  },
  "schedule": {
    "frequency": "interval",
    "interval_days": 1,
    "start_date": "string",
    "end_date": "string"
  },
  "enabled": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "next_run_at": "string",
  "relations_for_deletion": [
    "contact"
  ],
  "last_run_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createJobForConfig`

Trigger a manual job run for a config

`POST /data-management/v1/configs/{config_id}/jobs`

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
  "scheduled_for": "string",
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

Upsert config

`POST /data-management/v1/{entity_schema}/configs`

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
        { /* ... */ }
      ]
    },
    schedule: {
      frequency: 'interval',
      interval_days: 1,
      start_date: 'string',
      end_date: 'string'
    },
    relations_for_deletion: [
      'contact'
    ],
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
      {}
    ]
  },
  "schedule": {
    "frequency": "interval",
    "interval_days": 1,
    "start_date": "string",
    "end_date": "string"
  },
  "enabled": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "last_updated_at": "1970-01-01T00:00:00.000Z",
  "next_run_at": "string",
  "relations_for_deletion": [
    "contact"
  ],
  "last_run_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listConfigs`

List configs

`GET /data-management/v1/configs`

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
      "query": {},
      "schedule": {},
      "enabled": true,
      "created_at": "1970-01-01T00:00:00.000Z",
      "last_updated_at": "1970-01-01T00:00:00.000Z",
      "next_run_at": "string",
      "relations_for_deletion": [],
      "last_run_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "cursor": "string"
}
```

</details>

---

### `listJobs`

List jobs

`GET /data-management/v1/jobs`

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
      "scheduled_for": "string",
      "status": "in_progress",
      "details": {},
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "error": "string",
      "report": {},
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

Type of configuration (e.g. deletion)

```ts
type ConfigType = "deletion"
```

### `JobStatus`

```ts
type JobStatus = "in_progress" | "success" | "failed"
```

### `JobTrigger`

```ts
type JobTrigger = "schedule" | "manual"
```

### `JobReportFormat`

```ts
type JobReportFormat = "csv"
```

### `JobReport`

```ts
type JobReport = {
  bucket?: string
  key?: string
  format?: "csv"
}
```

### `CreateJobRequest`

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

Generic, type-specific job details payload (e.g. matched count, deleted count, failed count, etc.).

```ts
type JobDetails = Record<string, unknown>
```

### `UpdateJobRequest`

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

```ts
type JobReportUrlResponse = {
  url?: string
  expires_in?: number
}
```

### `QueryFilterType`

```ts
type QueryFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
```

### `QueryFilter`

```ts
type QueryFilter = {
  type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
  related_entity_schemas?: string[]
  lookback_period_days?: number
}
```

### `QueryConfig`

```ts
type QueryConfig = {
  saved_view_id: string
  include_deleted?: "true" | "false" | "only"
  filters?: Array<{
    type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
    related_entity_schemas?: string[]
    lookback_period_days?: number
  }>
}
```

### `QueryEntitiesRequest`

```ts
type QueryEntitiesRequest = {
  saved_view_id: string
  include_deleted?: "true" | "false" | "only"
  filters?: Array<{
    type: "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since"
    related_entity_schemas?: string[]
    lookback_period_days?: number
  }>
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
}
```

### `QueryEntitiesResult`

```ts
type QueryEntitiesResult = {
  hits?: number
  results?: Record<string, unknown>[]
}
```

### `ConfigSchedule`

```ts
type ConfigSchedule = {
  frequency: "interval"
  interval_days: number
  start_date?: string // date
  end_date?: string // date
}
```

### `IntervalConfigSchedule`

```ts
type IntervalConfigSchedule = {
  frequency: "interval"
  interval_days: number
  start_date?: string // date
  end_date?: string // date
}
```

### `UpsertConfigRequest`

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

```ts
type DeletionRelationEntitySchema = "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract"
```

### `ListConfigsResponse`

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
