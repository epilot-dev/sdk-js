# Purpose API

- **Base URL:** `https://purpose.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/purpose](https://docs.epilot.io/api/purpose)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.purpose.createPurpose(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/purpose'

const purposeClient = getClient()
authorize(purposeClient, () => '<token>')
const { data } = await purposeClient.createPurpose(...)
```

## Operations

**Purpose**
- [`createPurpose`](#createpurpose)
- [`searchPurposes`](#searchpurposes)
- [`batchGetPurposes`](#batchgetpurposes)
- [`getPurpose`](#getpurpose)
- [`updatePurpose`](#updatepurpose)
- [`deletePurpose`](#deletepurpose)

**Schemas**
- [`Purpose`](#purpose)
- [`CreatePurposeInput`](#createpurposeinput)
- [`UpdatePurposeInput`](#updatepurposeinput)
- [`BatchGetPurposesInput`](#batchgetpurposesinput)
- [`Error`](#error)

### `createPurpose`

Create a new purpose.

`POST /v1/purpose`

```ts
const { data } = await client.createPurpose(
  null,
  {
    name: 'Electricity Contract'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-06-01T08:00:00.000Z"
}
```

</details>

---

### `searchPurposes`

Search purposes using fuzzy matching against the purpose name.

`GET /v1/purpose:search`

```ts
const { data } = await client.searchPurposes({
  query: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Electricity Contract",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-06-01T08:00:00.000Z"
    }
  ]
}
```

</details>

---

### `batchGetPurposes`

Fetch multiple purposes by their known IDs in a single request.

`POST /v1/purpose:batchGet`

```ts
const { data } = await client.batchGetPurposes(
  null,
  {
    purposeIds: ['123e4567-e89b-12d3-a456-426614174000', '987fcdeb-51a2-43f7-9012-345678901234']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Electricity Contract",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-06-01T08:00:00.000Z"
    }
  ],
  "hits": 2
}
```

</details>

---

### `getPurpose`

Get a single purpose by its UUID.

`GET /v1/purpose/{purposeId}`

```ts
const { data } = await client.getPurpose({
  purposeId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-06-01T08:00:00.000Z"
}
```

</details>

---

### `updatePurpose`

Update an existing purpose.

`PUT /v1/purpose/{purposeId}`

```ts
const { data } = await client.updatePurpose(
  {
    purposeId: 'example',
  },
  {
    name: 'Electricity & Gas Contract'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-06-01T08:00:00.000Z"
}
```

</details>

---

### `deletePurpose`

Permanently delete a purpose by its UUID.

`DELETE /v1/purpose/{purposeId}`

```ts
const { data } = await client.deletePurpose({
  purposeId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-06-01T08:00:00.000Z"
}
```

</details>

---

## Schemas

### `Purpose`

An epilot Purpose – a named taxonomy label used to tag and organize resources across the platform

```ts
type Purpose = {
  id: string // uuid
  name: string
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `CreatePurposeInput`

Input for creating a new purpose

```ts
type CreatePurposeInput = {
  name: string
}
```

### `UpdatePurposeInput`

Input for updating an existing purpose

```ts
type UpdatePurposeInput = {
  name?: string
}
```

### `BatchGetPurposesInput`

Input for batch-fetching purposes by their IDs

```ts
type BatchGetPurposesInput = {
  purposeIds: string // uuid[]
}
```

### `Error`

```ts
type Error = {
  status?: number
  error?: string
  message?: string
}
```
