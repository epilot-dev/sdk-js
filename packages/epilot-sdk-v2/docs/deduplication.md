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
- [`detectDuplicates`](#detectduplicates)
- [`dismissDuplicates`](#dismissduplicates)
- [`listUniquenessCriteria`](#listuniquenesscriteria)
- [`createUniquenessCriteria`](#createuniquenesscriteria)
- [`getUniquenessCriteria`](#getuniquenesscriteria)
- [`updateUniquenessCriteria`](#updateuniquenesscriteria)
- [`deleteUniquenessCriteria`](#deleteuniquenesscriteria)

**Schemas**
- [`DeduplicateRequestBody`](#deduplicaterequestbody)
- [`DeduplicateRequestResponse`](#deduplicaterequestresponse)
- [`Entity`](#entity)
- [`DeduplicateAsyncResponse`](#deduplicateasyncresponse)
- [`JobStatus`](#jobstatus)
- [`DeduplicationJob`](#deduplicationjob)
- [`DetectDuplicatesRequestBody`](#detectduplicatesrequestbody)
- [`DetectDuplicatesResponse`](#detectduplicatesresponse)
- [`DetectedDuplicateMatch`](#detectedduplicatematch)
- [`DismissDuplicatesRequestBody`](#dismissduplicatesrequestbody)
- [`DismissDuplicatesResponse`](#dismissduplicatesresponse)
- [`UniquenessCriteriaListResponse`](#uniquenesscriterialistresponse)
- [`UniquenessCriteria`](#uniquenesscriteria)
- [`MatchRule`](#matchrule)
- [`MatchAttribute`](#matchattribute)
- [`UniquenessCriteriaCreateBody`](#uniquenesscriteriacreatebody)
- [`UniquenessCriteriaUpdateBody`](#uniquenesscriteriaupdatebody)

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
{
  "deduplicatedEntities": [
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
}
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

### `detectDuplicates`

Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score.

`POST /v1/detect-duplicates`

```ts
const { data } = await client.detectDuplicates(
  null,
  {
    schema: 'string',
    entity: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "matches": [
    {
      "entity": {
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
      },
      "confidence": 0,
      "matched_attributes": ["string"]
    }
  ]
}
```

</details>

---

### `dismissDuplicates`

Confirms entities as NOT duplicates: clears the internal duplicate-detection flags (_matching_entities) on each given entity, so they stop appearing as open duplicate sets. The records themselves are 

`POST /v1/duplicates/dismiss`

```ts
const { data } = await client.dismissDuplicates(
  null,
  {
    schema: 'string',
    entityIds: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "dismissed": ["string"]
}
```

</details>

---

### `listUniquenessCriteria`

Lists UniquenessCriteria for the requesting organization. Optionally filtered by schema.

`GET /v1/uniqueness-criteria`

```ts
const { data } = await client.listUniquenessCriteria({
  schema: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "schema": "string",
      "matchRules": [
        {
          "name": "string",
          "attributes": [
            {
              "attribute": "string"
            }
          ],
          "confidence": 0
        }
      ],
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createUniquenessCriteria`

Creates a new UniquenessCriteria record.

`POST /v1/uniqueness-criteria`

```ts
const { data } = await client.createUniquenessCriteria(
  null,
  {
    schema: 'string',
    matchRules: [
      {
        name: 'string',
        attributes: [
          {
            attribute: 'string'
          }
        ],
        confidence: 0
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getUniquenessCriteria`

Fetch a single UniquenessCriteria record.

`GET /v1/uniqueness-criteria/{schema}`

```ts
const { data } = await client.getUniquenessCriteria({
  schema: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateUniquenessCriteria`

Replace the matchRules on an existing UniquenessCriteria record.

`PUT /v1/uniqueness-criteria/{schema}`

```ts
const { data } = await client.updateUniquenessCriteria(
  {
    schema: 'example',
  },
  {
    matchRules: [
      {
        name: 'string',
        attributes: [
          {
            attribute: 'string'
          }
        ],
        confidence: 0
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteUniquenessCriteria`

Delete a UniquenessCriteria record.

`DELETE /v1/uniqueness-criteria/{schema}`

```ts
const { data } = await client.deleteUniquenessCriteria({
  schema: 'example',
})
```

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
type DeduplicateRequestResponse = {
  deduplicatedEntities: Array<{
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
}
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

### `DetectDuplicatesRequestBody`

```ts
type DetectDuplicatesRequestBody = {
  schema: string
  entity: Record<string, unknown>
}
```

### `DetectDuplicatesResponse`

```ts
type DetectDuplicatesResponse = {
  matches: Array<{
    entity: {
      _id: { ... }
      _org?: { ... }
      _schema?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      _created_by?: { ... }
      created_by?: { ... }
      _tags?: { ... }
      _acl?: { ... }
      _owners?: { ... }
      type?: { ... }
    }
    confidence: number
    matched_attributes: string[]
  }>
}
```

### `DetectedDuplicateMatch`

```ts
type DetectedDuplicateMatch = {
  entity: {
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
  }
  confidence: number
  matched_attributes: string[]
}
```

### `DismissDuplicatesRequestBody`

```ts
type DismissDuplicatesRequestBody = {
  schema: string
  entityIds: string[]
}
```

### `DismissDuplicatesResponse`

```ts
type DismissDuplicatesResponse = {
  dismissed: string[]
}
```

### `UniquenessCriteriaListResponse`

```ts
type UniquenessCriteriaListResponse = {
  items: Array<{
    id: string // uuid
    orgId: string
    schema: string
    matchRules: Array<{
      name?: { ... }
      attributes: { ... }
      confidence: { ... }
    }>
    createdAt: string // date-time
    updatedAt: string // date-time
  }>
}
```

### `UniquenessCriteria`

Defines what makes an entity of a given schema unique within an organization.

```ts
type UniquenessCriteria = {
  id: string // uuid
  orgId: string
  schema: string
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
    }>
    confidence: number
  }>
  createdAt: string // date-time
  updatedAt: string // date-time
}
```

### `MatchRule`

One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins.

```ts
type MatchRule = {
  name?: string
  attributes: Array<{
    attribute: string
  }>
  confidence: number
}
```

### `MatchAttribute`

One attribute participating in a match rule. Wrapped as an object so per-attribute options can be added later.

```ts
type MatchAttribute = {
  attribute: string
}
```

### `UniquenessCriteriaCreateBody`

```ts
type UniquenessCriteriaCreateBody = {
  schema: string
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
    }>
    confidence: number
  }>
}
```

### `UniquenessCriteriaUpdateBody`

```ts
type UniquenessCriteriaUpdateBody = {
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
    }>
    confidence: number
  }>
}
```
