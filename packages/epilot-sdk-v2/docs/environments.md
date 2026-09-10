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
- [`StringTranslations`](#stringtranslations)
- [`MapEntry`](#mapentry)
- [`MapValue`](#mapvalue)
- [`JsonValue`](#jsonvalue)
- [`LinkValue`](#linkvalue)
- [`LinkFields`](#linkfields)
- [`ListItemType`](#listitemtype)
- [`ListOfText`](#listoftext)
- [`ListOfString`](#listofstring)
- [`ListOfSecretString`](#listofsecretstring)
- [`ListOfNumber`](#listofnumber)
- [`ListOfBoolean`](#listofboolean)
- [`ListOfJson`](#listofjson)
- [`ListOfLink`](#listoflink)
- [`ListValue`](#listvalue)
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
      "item_type": "String",
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
  "item_type": "String",
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
  "item_type": "String",
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
  "item_type": "String",
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
its value is never returned. `Text`, `Number`, `Boolean`, `Map`, `JSON` and `Link`
may be served to browser-facing consumers; `String` and `SecretString` may not. A
`List` inherits this from its element type: a `List` is

```ts
type EnvironmentValueType = "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
```

### `StringTranslations`

A string translated per language. Keys are language codes (e.g. `de`,
`en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
not otherwise lin

```ts
type StringTranslations = Record<string, string>
```

### `MapEntry`

One entry of a Map. `key` is the token a journey submits; `value` is
what the customer reads — either one string, or one string per
language. Every entry of a Map must agree on which of the two it uses.


```ts
type MapEntry = {
  key: string
  value: string | Record<string, string>
}
```

### `MapValue`

```ts
type MapValue = {
  fallbackLanguage?: string
  options: Array<{
    key: string
    value: string | Record<string, string>
  }>
}
```

### `JsonValue`

Arbitrary JSON object, e.g. a flat key/value map used by integrations for
enum translation: {"Mr.": 1, "Ms. / Mrs.": 2}. Max 32 KB serialised.


```ts
type JsonValue = Record<string, unknown>
```

### `LinkValue`

One URL with a label and description a customer reads. `label` and
`description` are each either a plain string or one string per language;
the two fields decide that independently — a plain string means "the
same in every language". A translated field must carry the fallback
language.

The URL must

```ts
type LinkValue = {
  url: string
  label: string | Record<string, string>
  description?: string | Record<string, string>
  fallbackLanguage?: string
}
```

### `LinkFields`

The fields of a link, without a fallback language — the shape a `List`
item carries. Inside a list the fallback belongs to the wrapper, which
owns the language tabs for every row.

Restated rather than composed with `LinkValue`: `allOf` plus
`additionalProperties: false` is rejected by most validato

```ts
type LinkFields = {
  url: string
  label: string | Record<string, string>
  description?: string | Record<string, string>
}
```

### `ListItemType`

The element type a `List` holds — every value type except the
containers. `Map` is already a keyed collection and a list of lists has
no consumer. A list is exactly as client-safe and exactly as secret as
its element type: a list of `SecretString` is encrypted per item and its
value is never returne

```ts
type ListItemType = "String" | "SecretString" | "Text" | "Number" | "Boolean" | "JSON" | "Link"
```

### `ListOfText`

```ts
type ListOfText = {
  itemType: "Text"
  items: string[]
}
```

### `ListOfString`

```ts
type ListOfString = {
  itemType: "String"
  items: string[]
}
```

### `ListOfSecretString`

Write-only in effect: the items are encrypted per item at rest and the
whole value is omitted from every read response, exactly as a
`SecretString` variable's value is. Read `item_type` to learn what a
list holds when its value is withheld.


```ts
type ListOfSecretString = {
  itemType: "SecretString"
  items: string[]
}
```

### `ListOfNumber`

```ts
type ListOfNumber = {
  itemType: "Number"
  items: number[]
}
```

### `ListOfBoolean`

```ts
type ListOfBoolean = {
  itemType: "Boolean"
  items: boolean[]
}
```

### `ListOfJson`

```ts
type ListOfJson = {
  itemType: "JSON"
  items: Record<string, unknown>[]
}
```

### `ListOfLink`

A list of links. `fallbackLanguage` applies to every item's translated
`label` and `description`; items may mix plain and translated fields
freely, since a plain string is a complete answer for any language.


```ts
type ListOfLink = {
  itemType: "Link"
  fallbackLanguage?: string
  items: Array<{
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
  }>
}
```

### `ListValue`

An ordered collection of one declared element type. Items round-trip in
the order written; nothing sorts them. Holds at most 100 items.

The whole value is limited to 32768 characters when serialised — the
server enforces this, and it is not expressible per-property here.


```ts
type ListValue = {
  itemType: "Text"
  items: string[]
} | {
  itemType: "Number"
  items: number[]
} | {
  itemType: "Boolean"
  items: boolean[]
} | {
  itemType: "JSON"
  items: Record<string, unknown>[]
} | {
  itemType: "Link"
  fallbackLanguage?: string
  items: Array<{
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
  }>
} | {
  itemType: "String"
  items: string[]
} | {
  itemType: "SecretString"
  items: string[]
}
```

### `EnvironmentValue`

A variable's value. The JSON type corresponds to the variable's `type`:
`String`, `SecretString` and `Text` are strings, `Number` is a number,
`Boolean` is a boolean, and `Map`, `JSON`, `Link` and `List` are objects.
Numbers are IEEE 754 doubles; integers above 2^53 may lose precision on
round-trip.

```ts
type EnvironmentValue = string | number | boolean | {
  fallbackLanguage?: string
  options: Array<{
    key: string
    value: string | Record<string, string>
  }>
} | Record<string, unknown> | {
  url: string
  label: string | Record<string, string>
  description?: string | Record<string, string>
  fallbackLanguage?: string
} | {
  itemType: "Text"
  items: string[]
} | {
  itemType: "Number"
  items: number[]
} | {
  itemType: "Boolean"
  items: boolean[]
} | {
  itemType: "JSON"
  items: Record<string, unknown>[]
} | {
  itemType: "Link"
  fallbackLanguage?: string
  items: Array<{
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
  }>
} | {
  itemType: "String"
  items: string[]
} | {
  itemType: "SecretString"
  items: string[]
}
```

### `EnvironmentVariable`

```ts
type EnvironmentVariable = {
  key: string
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
  item_type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "JSON" | "Link"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      key: { ... }
      value: { ... }
    }>
  } | Record<string, unknown> | {
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
    fallbackLanguage?: string
  } | {
    itemType: "Text"
    items: string[]
  } | {
    itemType: "Number"
    items: number[]
  } | {
    itemType: "Boolean"
    items: boolean[]
  } | {
    itemType: "JSON"
    items: Record<string, unknown>[]
  } | {
    itemType: "Link"
    fallbackLanguage?: string
    items: Array<{
      url: { ... }
      label: { ... }
      description?: { ... }
    }>
  } | {
    itemType: "String"
    items: string[]
  } | {
    itemType: "SecretString"
    items: string[]
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
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
  item_type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "JSON" | "Link"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      key: { ... }
      value: { ... }
    }>
  } | Record<string, unknown> | {
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
    fallbackLanguage?: string
  } | {
    itemType: "Text"
    items: string[]
  } | {
    itemType: "Number"
    items: number[]
  } | {
    itemType: "Boolean"
    items: boolean[]
  } | {
    itemType: "JSON"
    items: Record<string, unknown>[]
  } | {
    itemType: "Link"
    fallbackLanguage?: string
    items: Array<{
      url: { ... }
      label: { ... }
      description?: { ... }
    }>
  } | {
    itemType: "String"
    items: string[]
  } | {
    itemType: "SecretString"
    items: string[]
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
    type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
    item_type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "JSON" | "Link"
    description?: string
    group?: string
    value?: string | number | boolean | {
      fallbackLanguage?: { ... }
      options: { ... }
    } | Record<string, unknown> | {
      url: { ... }
      label: { ... }
      description?: { ... }
      fallbackLanguage?: { ... }
    } | {
      itemType: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      fallbackLanguage?: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      items: { ... }
    } | {
      itemType: { ... }
      items: { ... }
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
  type: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
  description?: string
  group?: string
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      key: { ... }
      value: { ... }
    }>
  } | Record<string, unknown> | {
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
    fallbackLanguage?: string
  } | {
    itemType: "Text"
    items: string[]
  } | {
    itemType: "Number"
    items: number[]
  } | {
    itemType: "Boolean"
    items: boolean[]
  } | {
    itemType: "JSON"
    items: Record<string, unknown>[]
  } | {
    itemType: "Link"
    fallbackLanguage?: string
    items: Array<{
      url: { ... }
      label: { ... }
      description?: { ... }
    }>
  } | {
    itemType: "String"
    items: string[]
  } | {
    itemType: "SecretString"
    items: string[]
  }
  protected?: boolean
}
```

### `EnvironmentVariableUpdateRequest`

```ts
type EnvironmentVariableUpdateRequest = {
  type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List"
  value?: string | number | boolean | {
    fallbackLanguage?: string
    options: Array<{
      key: { ... }
      value: { ... }
    }>
  } | Record<string, unknown> | {
    url: string
    label: string | Record<string, string>
    description?: string | Record<string, string>
    fallbackLanguage?: string
  } | {
    itemType: "Text"
    items: string[]
  } | {
    itemType: "Number"
    items: number[]
  } | {
    itemType: "Boolean"
    items: boolean[]
  } | {
    itemType: "JSON"
    items: Record<string, unknown>[]
  } | {
    itemType: "Link"
    fallbackLanguage?: string
    items: Array<{
      url: { ... }
      label: { ... }
      description?: { ... }
    }>
  } | {
    itemType: "String"
    items: string[]
  } | {
    itemType: "SecretString"
    items: string[]
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
