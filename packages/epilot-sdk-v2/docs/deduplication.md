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
- [`resolveDuplicates`](#resolveduplicates)
- [`dismissDuplicates`](#dismissduplicates)
- [`listUniquenessCriteria`](#listuniquenesscriteria)
- [`createUniquenessCriteria`](#createuniquenesscriteria)
- [`getUniquenessCriteria`](#getuniquenesscriteria)
- [`updateUniquenessCriteria`](#updateuniquenesscriteria)
- [`deleteUniquenessCriteria`](#deleteuniquenesscriteria)
- [`getUniquenessCriteriaById`](#getuniquenesscriteriabyid)
- [`updateUniquenessCriteriaById`](#updateuniquenesscriteriabyid)
- [`deleteUniquenessCriteriaById`](#deleteuniquenesscriteriabyid)
- [`setGlobalUniquenessCriteria`](#setglobaluniquenesscriteria)
- [`registerUniquenessCriteriaUsage`](#registeruniquenesscriteriausage)
- [`unregisterUniquenessCriteriaUsage`](#unregisteruniquenesscriteriausage)

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
- [`ResolveDuplicatesRequestBody`](#resolveduplicatesrequestbody)
- [`ResolutionMode`](#resolutionmode)
- [`ResolveDuplicatesResponse`](#resolveduplicatesresponse)
- [`ResolutionCandidate`](#resolutioncandidate)
- [`RuleStrength`](#rulestrength)
- [`DismissDuplicatesRequestBody`](#dismissduplicatesrequestbody)
- [`DismissDuplicatesResponse`](#dismissduplicatesresponse)
- [`UniquenessCriteriaListResponse`](#uniquenesscriterialistresponse)
- [`UniquenessCriteria`](#uniquenesscriteria)
- [`MatchRule`](#matchrule)
- [`MatchAttribute`](#matchattribute)
- [`MatchMode`](#matchmode)
- [`RuleSetUsage`](#rulesetusage)
- [`UniquenessCriteriaCreateBody`](#uniquenesscriteriacreatebody)
- [`RuleSetConflict`](#rulesetconflict)
- [`UniquenessCriteriaUpdateBody`](#uniquenesscriteriaupdatebody)
- [`RuleSetUsageBody`](#rulesetusagebody)

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

Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score. Used by entity-mapping-api while the self-contained 

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
      "matched_attributes": ["string"],
      "fuzzy_attributes": ["string"]
    }
  ]
}
```

</details>

---

### `resolveDuplicates`

Answers 'is this payload an existing record, and which one?' as an action the caller executes: update that entity, create, or ask the user. The action follows from the matching rule's strength and the

`POST /v1/duplicates/resolve`

```ts
const { data } = await client.resolveDuplicates(
  null,
  {
    schema: 'string',
    entity: {},
    mode: 'automated',
    criteria_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "action": "update",
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
  "rule_name": "string",
  "matched_attributes": ["string"]
}
```

</details>

---

### `dismissDuplicates`

Confirms entities as NOT duplicates. Every pair among them is remembered as dismissed, so no later flagging pass raises it again, and the entries they hold about each other are removed from their dupl

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

Lists the rule sets of the requesting organization, optionally one schema's, each with its usages.

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
      "name": "string",
      "global": true,
      "matchRules": [
        {
          "name": "string",
          "attributes": [
            {
              "attribute": "string",
              "match": "exact"
            }
          ],
          "strength": "certain",
          "confidence": 0
        }
      ],
      "usages": [
        {
          "consumer": "string",
          "ref": "string",
          "label": "string",
          "registeredAt": "1970-01-01T00:00:00.000Z"
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

Creates a rule set. The first set of a schema becomes its global set unless 'global' is false.

`POST /v1/uniqueness-criteria`

```ts
const { data } = await client.createUniquenessCriteria(
  null,
  {
    schema: 'string',
    name: 'string',
    global: true,
    matchRules: [
      {
        name: 'string',
        attributes: [
          {
            attribute: 'string',
            match: 'exact'
          }
        ],
        strength: 'certain',
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
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getUniquenessCriteria`

The schema's global rule set.

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
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateUniquenessCriteria`

Replaces the rules, and the name when given, of the schema's global rule set.

`PUT /v1/uniqueness-criteria/{schema}`

```ts
const { data } = await client.updateUniquenessCriteria(
  {
    schema: 'example',
  },
  {
    name: 'string',
    matchRules: [
      {
        name: 'string',
        attributes: [
          {
            attribute: 'string',
            match: 'exact'
          }
        ],
        strength: 'certain',
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
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteUniquenessCriteria`

Deletes the schema's global rule set. Refused while it is referenced or while the schema has other rule sets.

`DELETE /v1/uniqueness-criteria/{schema}`

```ts
const { data } = await client.deleteUniquenessCriteria({
  schema: 'example',
})
```

---

### `getUniquenessCriteriaById`

One rule set by id.

`GET /v1/uniqueness-criteria/{schema}/{id}`

```ts
const { data } = await client.getUniquenessCriteriaById({
  schema: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateUniquenessCriteriaById`

Replaces the rules, and the name when given, of a rule set.

`PUT /v1/uniqueness-criteria/{schema}/{id}`

```ts
const { data } = await client.updateUniquenessCriteriaById(
  {
    schema: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'string',
    matchRules: [
      {
        name: 'string',
        attributes: [
          {
            attribute: 'string',
            match: 'exact'
          }
        ],
        strength: 'certain',
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
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteUniquenessCriteriaById`

Deletes a rule set. Refused with the usages while a consumer references it, and while it is the global set of a schema that has other rule sets.

`DELETE /v1/uniqueness-criteria/{schema}/{id}`

```ts
const { data } = await client.deleteUniquenessCriteriaById({
  schema: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `setGlobalUniquenessCriteria`

Makes the rule set the schema's global one. The previous global set becomes a custom set.

`POST /v1/uniqueness-criteria/{schema}/{id}/global`

```ts
const { data } = await client.setGlobalUniquenessCriteria({
  schema: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "name": "string",
  "global": true,
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string",
          "match": "exact"
        }
      ],
      "strength": "certain",
      "confidence": 0
    }
  ],
  "usages": [
    {
      "consumer": "string",
      "ref": "string",
      "label": "string",
      "registeredAt": "1970-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `registerUniquenessCriteriaUsage`

Records that a consumer configuration references the rule set. Idempotent. A referenced rule set cannot be deleted.

`PUT /v1/uniqueness-criteria/{schema}/{id}/usages/{consumer}/{ref}`

```ts
const { data } = await client.registerUniquenessCriteriaUsage(
  {
    schema: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    consumer: 'example',
    ref: 'example',
  },
  {
    label: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "consumer": "string",
  "ref": "string",
  "label": "string",
  "registeredAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `unregisterUniquenessCriteriaUsage`

Removes a consumer configuration's reference to the rule set.

`DELETE /v1/uniqueness-criteria/{schema}/{id}/usages/{consumer}/{ref}`

```ts
const { data } = await client.unregisterUniquenessCriteriaUsage({
  schema: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  consumer: 'example',
  ref: 'example',
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
    fuzzy_attributes?: string[]
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
  fuzzy_attributes?: string[]
}
```

### `ResolveDuplicatesRequestBody`

```ts
type ResolveDuplicatesRequestBody = {
  schema: string
  entity: Record<string, unknown>
  mode: "automated" | "interactive"
  criteria_id?: string // uuid
}
```

### `ResolutionMode`

'automated' when no human is present (automations, integrations): certain matches are acted on, probable ones only flagged. 'interactive' when a person is filling in a form: every match is put in front of them.

```ts
type ResolutionMode = "automated" | "interactive"
```

### `ResolveDuplicatesResponse`

```ts
type ResolveDuplicatesResponse = {
  action: "update"
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
  rule_name?: string
  matched_attributes: string[]
} | {
  action: "create"
  reason: "no_match" | "ambiguous" | "probable_only"
} | {
  action: "ask"
  candidates: Array<{
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
    strength: "certain" | "probable"
    rule_name?: string
    matched_attributes: string[]
    fuzzy_attributes?: string[]
  }>
}
```

### `ResolutionCandidate`

```ts
type ResolutionCandidate = {
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
  strength: "certain" | "probable"
  rule_name?: string
  matched_attributes: string[]
  fuzzy_attributes?: string[]
}
```

### `RuleStrength`

How sure a match on the rule is. 'certain': the attributes identify one record. 'probable': the records are likely the same and a person should decide.

```ts
type RuleStrength = "certain" | "probable"
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
    name: string
    global: boolean
    matchRules: Array<{
      name?: { ... }
      attributes: { ... }
      strength?: { ... }
      confidence?: { ... }
    }>
    usages: Array<{
      consumer: { ... }
      ref: { ... }
      label?: { ... }
      registeredAt: { ... }
    }>
    createdAt: string // date-time
    updatedAt: string // date-time
  }>
}
```

### `UniquenessCriteria`

A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global.

```ts
type UniquenessCriteria = {
  id: string // uuid
  orgId: string
  schema: string
  name: string
  global: boolean
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
      match?: { ... }
    }>
    strength?: "certain" | "probable"
    confidence?: number
  }>
  usages: Array<{
    consumer: string
    ref: string
    label?: string
    registeredAt: string // date-time
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
    match?: object
  }>
  strength?: "certain" | "probable"
  confidence?: number
}
```

### `MatchAttribute`

One attribute participating in a match rule.

```ts
type MatchAttribute = {
  attribute: string
  match?: object
}
```

### `MatchMode`

How an attribute's values are compared. 'exact': the same value, ignoring case and surrounding whitespace. 'fuzzy': also ignoring doubled spaces and umlaut transcription (Müller / Mueller), and allowing a typo or two, scaled by the value's length. Fuzzy applies to text-like attributes (string, text,

```ts
type MatchMode = "exact" | "fuzzy"
```

### `RuleSetUsage`

A consumer configuration that references a rule set. A referenced rule set cannot be deleted.

```ts
type RuleSetUsage = {
  consumer: string
  ref: string
  label?: string
  registeredAt: string // date-time
}
```

### `UniquenessCriteriaCreateBody`

```ts
type UniquenessCriteriaCreateBody = {
  schema: string
  name?: string
  global?: boolean
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
      match?: { ... }
    }>
    strength?: "certain" | "probable"
    confidence?: number
  }>
}
```

### `RuleSetConflict`

```ts
type RuleSetConflict = {
  message: string
  usages: Array<{
    consumer: string
    ref: string
    label?: string
    registeredAt: string // date-time
  }>
}
```

### `UniquenessCriteriaUpdateBody`

```ts
type UniquenessCriteriaUpdateBody = {
  name?: string
  matchRules: Array<{
    name?: string
    attributes: Array<{
      attribute: { ... }
      match?: { ... }
    }>
    strength?: "certain" | "probable"
    confidence?: number
  }>
}
```

### `RuleSetUsageBody`

```ts
type RuleSetUsageBody = {
  label?: string
}
```
