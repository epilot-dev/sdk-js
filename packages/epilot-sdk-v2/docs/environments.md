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
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

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
    description: 'string'
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
  value: string
}
```

### `EnvironmentVariableUpdateRequest`

```ts
type EnvironmentVariableUpdateRequest = {
  type?: "String" | "SecretString"
  value: string
  description?: string
}
```
