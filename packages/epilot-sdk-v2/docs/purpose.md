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

const purposeClient = await getClient()
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

Create Purpose

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
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `searchPurposes`

Search Purposes

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
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `batchGetPurposes`

Batch Get Purposes

`POST /v1/purpose:batchGet`

```ts
const { data } = await client.batchGetPurposes(
  null,
  {
    purposeIds: [
      '123e4567-e89b-12d3-a456-426614174000'
    ]
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
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "hits": 0
}
```

</details>

---

### `getPurpose`

Get Purpose

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
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updatePurpose`

Update Purpose

`PUT /v1/purpose/{purposeId}`

```ts
const { data } = await client.updatePurpose(
  {
    purposeId: 'example',
  },
  {
    name: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deletePurpose`

Delete Purpose

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
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

## Schemas

### `Purpose`

A purpose used to tag and organize entities

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

Input for batch getting purposes

```ts
type BatchGetPurposesInput = {
  purposeIds: string[]
}
```

### `Error`

```ts
type Error = {
  status?: number
  error?: string
}
```
