# Deduplication API

- **Base URL:** `https://deduplication.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/deduplication](https://docs.epilot.io/api/deduplication)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.deduplication.deduplicate(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/deduplication'

const deduplicationClient = getClient()
authorize(deduplicationClient, () => '<token>')
const { data } = await deduplicationClient.deduplicate(...)
```

## Operations

- [`deduplicate`](#deduplicate)
- [`deduplicateAsync`](#deduplicateasync)
- [`getDeduplicationJob`](#getdeduplicationjob)

**Schemas**
- [`DeduplicateRequestBody`](#deduplicaterequestbody)
- [`DeduplicateRequestResponse`](#deduplicaterequestresponse)
- [`Entity`](#entity)
- [`DeduplicateAsyncResponse`](#deduplicateasyncresponse)
- [`JobStatus`](#jobstatus)
- [`DeduplicationJob`](#deduplicationjob)

### `deduplicate`

Deduplicates Entities

`POST /v1/deduplicate`

```ts
const { data } = await client.deduplicate(
  null,
  [
    {
      toKeep: 'string',
      toDelete: ['string']
    }
  ],
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "_id": "string",
    "_org": "string",
    "_schema": "string",
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_updated_at": "1970-01-01T00:00:00.000Z",
    "_created_by": "string",
    "created_by": "string",
    "_tags": ["string"],
    "_acl": {},
    "_owners": [
      {
        "org_id": "string",
        "user_id": "string"
      }
    ],
    "type": "string"
  }
]
```

</details>

---

### `deduplicateAsync`

Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.

`POST /v1/deduplicate/job`

```ts
const { data } = await client.deduplicateAsync(
  null,
  [
    {
      toKeep: 'string',
      toDelete: ['string']
    }
  ],
)
```

---

### `getDeduplicationJob`

Returns the current status of an async deduplication job

`GET /v1/deduplicate/jobs/{jobId}`

```ts
const { data } = await client.getDeduplicationJob({
  jobId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "jobId": "string",
  "status": "pending",
  "message": "string",
  "result": [
    {
      "_id": "string",
      "_org": "string",
      "_schema": "string",
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_created_by": "string",
      "created_by": "string",
      "_tags": ["string"],
      "_acl": {},
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "type": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

## Schemas

### `DeduplicateRequestBody`

```ts
type DeduplicateRequestBody = Array<{
  toKeep: string
  toDelete: string[]
}>
```

### `DeduplicateRequestResponse`

```ts
type DeduplicateRequestResponse = Array<{
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}>
```

### `Entity`

Base Entity schema

```ts
type Entity = {
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}
```

### `DeduplicateAsyncResponse`

Response returned immediately when a deduplication job is submitted

```ts
type DeduplicateAsyncResponse = {
  jobId: string
  status: "pending" | "processing" | "completed" | "failed"
  message: string
}
```

### `JobStatus`

```ts
type JobStatus = "pending" | "processing" | "completed" | "failed"
```

### `DeduplicationJob`

Represents an async deduplication job

```ts
type DeduplicationJob = {
  jobId: string
  status: "pending" | "processing" | "completed" | "failed"
  message?: string
  result?: Array<{
    _id: string
    _org?: string
    _schema?: string
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _created_by?: string | number
    created_by?: string | number
    _tags?: string[]
    _acl?: Record<string, string[]>
    _owners?: Array<{
      org_id: { ... }
      user_id: { ... }
    }>
    type?: string
  }>
  createdAt: string // date-time
  updatedAt: string // date-time
}
```
