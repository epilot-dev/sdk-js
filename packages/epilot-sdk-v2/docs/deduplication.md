# Deduplication API

**Base URL:** `https://deduplication.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/deduplication](https://docs.epilot.io/api/deduplication)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.deduplication.deduplicate(...)

// Or get the client explicitly
const deduplicationClient = await epilot.deduplication.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/deduplication'

const deduplicationClient = await getClient()
authorize(deduplicationClient, () => '<token>')
const { data } = await deduplicationClient.deduplicate(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/deduplication'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

- [`deduplicate`](#deduplicate)

### `deduplicate`

Deduplicates Entities

`POST /v1/deduplicate`

```ts
const { data } = await client.deduplicate(
  null,
  [
    {
      toKeep: 'string',
      toDelete: [
        'string'
      ]
    }
  ],
)
```

**Response**

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
    "_tags": [
      "string"
    ],
    "_acl": {},
    "_owners": [
      {}
    ],
    "type": "string"
  }
]
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
