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
- [`putEnvironmentGroup`](#putenvironmentgroup)
- [`deleteEnvironmentGroup`](#deleteenvironmentgroup)
- [`getEnvironmentVariable`](#getenvironmentvariable)
- [`updateEnvironmentVariable`](#updateenvironmentvariable)
- [`deleteEnvironmentVariable`](#deleteenvironmentvariable)

**Schemas**
- [`EnvironmentValueType`](#environmentvaluetype)
- [`MapEntry`](#mapentry)
- [`MapValue`](#mapvalue)
- [`EnvironmentValue`](#environmentvalue)
- [`EnvironmentVariable`](#environmentvariable)
- [`EnvironmentVariableListItem`](#environmentvariablelistitem)
- [`EnvironmentVariableList`](#environmentvariablelist)
- [`EnvironmentVariableCreateRequest`](#environmentvariablecreaterequest)
- [`EnvironmentVariableUpdateRequest`](#environmentvariableupdaterequest)
- [`EnvironmentGroup`](#environmentgroup)
- [`EnvironmentGroupList`](#environmentgrouplist)
- [`EnvironmentGroupUpsertRequest`](#environmentgroupupsertrequest)

### `listEnvironmentVariables`

List all environment variables for the organization. Returns metadata only, no secret values.

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
      "protected": true,
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createEnvironmentVariable`

Create a new environment variable or secret for the organization. If `group` is provided and the group does not yet exist, it is created automatically.

`POST /v1/environments`

```ts
const { data } = await client.createEnvironmentVariable(
  null,
  {
    key: 'string',
    type: 'String',
    description: 'string',
    group: 'string',
    value: 'string',
    protected: true
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
  "protected": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listEnvironmentGroups`

List all environment groups for the organization.

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

### `putEnvironmentGroup`

Create or update an environment group by name. Acts as an upsert — creates the group if it does not exist.

`PUT /v1/environments/groups/{name}`

```ts
const { data } = await client.putEnvironmentGroup(
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

Deletes a group. Variables assigned to this group become ungrouped.

`DELETE /v1/environments/groups/{name}`

```ts
const { data } = await client.deleteEnvironmentGroup({
  name: 'example',
})
```

---

### `getEnvironmentVariable`

Get an environment variable by key. Returns value for non-secret types, omitted for SecretString.

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
  "protected": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateEnvironmentVariable`

Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist. If `group` is provided and the group does not yet exist, it is created automatically.

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
    group: 'string',
    protected: true
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
  "protected": true,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteEnvironmentVariable`

Delete an environment variable by key.

`DELETE /v1/environments/{key}`

```ts
const { data } = await client.deleteEnvironmentVariable({
  key: 'example',
})
```

---

## Schemas

### `EnvironmentValueType`

The structure a variable's value holds. `SecretString` is encrypted at rest and
its value is never returned. `Text`, `Number`, `Boolean` and `Map` may be
served to browser-facing consumers; `String` and `SecretString` may not.


```ts
type EnvironmentValueType = "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
```

### `MapEntry`

```ts
type MapEntry = {
  value: string
  label: string
} | {
  value: string
  labels: Record<string, string>
}
```

### `MapValue`

```ts
type MapValue = {
  fallbackLanguage?: string
  options: Array<{
    value: string
    label: string
  } | {
    value: string
    labels: Record<string, string>
  }>
}
```

### `EnvironmentValue`

A variable's value. The JSON type corresponds to the variable's `type`:
`String`, `SecretString` and `Text` are strings, `Number` is a number,
`Boolean` is a boolean, and `Map` is an object. Numbers are IEEE 754
doubles; integers above 2^53 may lose precision on round-trip.


```ts
type EnvironmentValue = string | number | boolean | {
  fallbackLanguage?: string
  options: Array<{
    value: string
    label: string
  } | {
    value: string
    labels: Record<string, string>
  }>
}
```

### `EnvironmentVariable`

```ts
type EnvironmentVariable = {
  key: string
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      value: { ... }
      label: { ... }
    } | {
      value: { ... }
      labels: { ... }
    }>
  }
  protected?: boolean
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `EnvironmentVariableListItem`

```ts
type EnvironmentVariableListItem = {
  key: string
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      value: { ... }
      label: { ... }
    } | {
      value: { ... }
      labels: { ... }
    }>
  }
  protected?: boolean
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `EnvironmentVariableList`

```ts
type EnvironmentVariableList = {
  items: Array<{
    key: string
    type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
    description?: string
    group?: string
    value?: string | number | boolean | {
      fallbackLanguage?: { ... }
      options: { ... }
    }
    protected?: boolean
    created_at: string // date-time
    updated_at: string // date-time
  }>
}
```

### `EnvironmentVariableCreateRequest`

```ts
type EnvironmentVariableCreateRequest = {
  key: string
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      value: { ... }
      label: { ... }
    } | {
      value: { ... }
      labels: { ... }
    }>
  }
  protected?: boolean
}
```

### `EnvironmentVariableUpdateRequest`

```ts
type EnvironmentVariableUpdateRequest = {
  type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map"
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      value: { ... }
      label: { ... }
    } | {
      value: { ... }
      labels: { ... }
    }>
  }
  description?: string
  group?: string
  protected?: boolean
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
