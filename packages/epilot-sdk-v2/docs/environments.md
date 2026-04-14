# Environments API

- **Base URL:** `https://environments.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/environments](https://docs.epilot.io/api/environments)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.environments.listEnvironmentVariables(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/environments'

const environmentsClient = getClient()
authorize(environmentsClient, () => '<token>')
const { data } = await environmentsClient.listEnvironmentVariables(...)
```

## Operations

**environments**
- [`listEnvironmentVariables`](#listenvironmentvariables)
- [`createEnvironmentVariable`](#createenvironmentvariable)
- [`listEnvironmentGroups`](#listenvironmentgroups)
- [`upsertEnvironmentGroup`](#upsertenvironmentgroup)
- [`deleteEnvironmentGroup`](#deleteenvironmentgroup)
- [`getEnvironmentVariable`](#getenvironmentvariable)
- [`updateEnvironmentVariable`](#updateenvironmentvariable)
- [`deleteEnvironmentVariable`](#deleteenvironmentvariable)

**Schemas**
- [`EnvironmentValueType`](#environmentvaluetype)
- [`EnvironmentVariable`](#environmentvariable)
- [`EnvironmentVariableListItem`](#environmentvariablelistitem)
- [`EnvironmentVariableList`](#environmentvariablelist)
- [`EnvironmentVariableCreateRequest`](#environmentvariablecreaterequest)
- [`EnvironmentVariableUpdateRequest`](#environmentvariableupdaterequest)
- [`EnvironmentGroup`](#environmentgroup)
- [`EnvironmentGroupList`](#environmentgrouplist)
- [`EnvironmentGroupUpsertRequest`](#environmentgroupupsertrequest)

### `listEnvironmentVariables`

List environment variables

`GET /v1/environments`

```ts
const { data } = await client.listEnvironmentVariables()
```

<details>
<summary>Response</summary>

```json
{
  "items": [
    {
      "key": "string",
      "type": "String",
      "description": "string",
      "group": "string",
      "value": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createEnvironmentVariable`

Create environment variable

`POST /v1/environments`

```ts
const { data } = await client.createEnvironmentVariable(
  null,
  {
    key: 'string',
    type: 'String',
    description: 'string',
    group: 'string',
    value: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "group": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listEnvironmentGroups`

List environment groups

`GET /v1/environments/groups`

```ts
const { data } = await client.listEnvironmentGroups()
```

<details>
<summary>Response</summary>

```json
{
  "items": [
    {
      "name": "string",
      "description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `upsertEnvironmentGroup`

Create or update an environment group

`PUT /v1/environments/groups/{name}`

```ts
const { data } = await client.upsertEnvironmentGroup(
  {
    name: 'example',
  },
  {
    description: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteEnvironmentGroup`

Delete an environment group

`DELETE /v1/environments/groups/{name}`

```ts
const { data } = await client.deleteEnvironmentGroup({
  name: 'example',
})
```

---

### `getEnvironmentVariable`

Get environment variable

`GET /v1/environments/{key}`

```ts
const { data } = await client.getEnvironmentVariable({
  key: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "group": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateEnvironmentVariable`

Update environment variable

`PUT /v1/environments/{key}`

```ts
const { data } = await client.updateEnvironmentVariable(
  {
    key: 'example',
  },
  {
    type: 'String',
    value: 'string',
    description: 'string',
    group: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "group": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteEnvironmentVariable`

Delete environment variable

`DELETE /v1/environments/{key}`

```ts
const { data } = await client.deleteEnvironmentVariable({
  key: 'example',
})
```

---

## Schemas

### `EnvironmentValueType`

```ts
type EnvironmentValueType = "String" | "SecretString"
```

### `EnvironmentVariable`

```ts
type EnvironmentVariable = {
  key: string
  type: "String" | "SecretString"
  description?: string
  group?: string
  value?: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `EnvironmentVariableListItem`

```ts
type EnvironmentVariableListItem = {
  key: string
  type: "String" | "SecretString"
  description?: string
  group?: string
  value?: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `EnvironmentVariableList`

```ts
type EnvironmentVariableList = {
  items: Array<{
    key: string
    type: "String" | "SecretString"
    description?: string
    group?: string
    value?: string
    created_at: string // date-time
    updated_at: string // date-time
  }>
}
```

### `EnvironmentVariableCreateRequest`

```ts
type EnvironmentVariableCreateRequest = {
  key: string
  type: "String" | "SecretString"
  description?: string
  group?: string
  value?: string
}
```

### `EnvironmentVariableUpdateRequest`

```ts
type EnvironmentVariableUpdateRequest = {
  type?: "String" | "SecretString"
  value?: string
  description?: string
  group?: string
}
```

### `EnvironmentGroup`

```ts
type EnvironmentGroup = {
  name: string
  description?: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `EnvironmentGroupList`

```ts
type EnvironmentGroupList = {
  items: Array<{
    name: string
    description?: string
    created_at: string // date-time
    updated_at: string // date-time
  }>
}
```

### `EnvironmentGroupUpsertRequest`

```ts
type EnvironmentGroupUpsertRequest = {
  description?: string
}
```
