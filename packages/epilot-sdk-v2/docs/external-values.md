# External Values API

- **Base URL:** `https://external-values.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/external-values](https://docs.epilot.io/api/external-values)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.externalValues.listExternalValues(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/external-values'

const externalValuesClient = getClient()
authorize(externalValuesClient, () => '<token>')
const { data } = await externalValuesClient.listExternalValues(...)
```

## Operations

**external-values**
- [`listExternalValues`](#listexternalvalues)
- [`resolveExternalValue`](#resolveexternalvalue)
- [`resolvePortalExternalValue`](#resolveportalexternalvalue)

**Schemas**
- [`TranslatedString`](#translatedstring)
- [`ExternalValueType`](#externalvaluetype)
- [`ResolveExternalValueRequest`](#resolveexternalvaluerequest)
- [`ExternalValueErrorCode`](#externalvalueerrorcode)
- [`ExternalValueError`](#externalvalueerror)
- [`ResolveExternalValueResponse`](#resolveexternalvalueresponse)
- [`ExternalValueResultSummary`](#externalvalueresultsummary)
- [`ExternalValueHookSummary`](#externalvaluehooksummary)
- [`ContextRequirement`](#contextrequirement)
- [`EntityContextRequirement`](#entitycontextrequirement)
- [`ValueContextRequirement`](#valuecontextrequirement)
- [`ExternalValueHookList`](#externalvaluehooklist)

### `listExternalValues`

List hooks and their results of all enabled installed apps that declare an
`EXTERNAL_VALUES` component. Intended for pickers (e.g. the validation-rules builder).

`GET /v1/external-values`

```ts
const { data } = await client.listExternalValues()
```

<details>
<summary>Response</summary>

```json
{
  "hooks": [
    {
      "app_id": "string",
      "app_name": "string",
      "hook_id": "string",
      "name": {
        "de": "string",
        "en": "string"
      },
      "description": {
        "de": "string",
        "en": "string"
      },
      "results": [
        {
          "id": "string",
          "type": "number",
          "name": {
            "de": "string",
            "en": "string"
          }
        }
      ],
      "contexts": [
        {
          "type": "entity",
          "schema": "contract"
        }
      ]
    }
  ]
}
```

</details>

---

### `resolveExternalValue`

Resolve an external value hook for an epilot 360 user (builder preview, entity-attribute
rules). The organization is taken from the caller's token.

`POST /v1/external-values/{app_id}/hooks/{hook_id}:resolve`

```ts
const { data } = await client.resolveExternalValue(
  {
    app_id: 'example',
    hook_id: 'example',
  },
  {
    context: {
      contract: [
        {
          _id: '8a7e3f5e-9c0c-4c74-8d4a-1a1a1a1a1a1a',
          external_id: 'C-1001',
          installment_amount: 110
        }
      ]
    },
    consumer: {
      type: 'validation_rule',
      rule_id: '6c0a9e1e-2f4b-4e6a-8f8e-2b2b2b2b2b2b'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "values": {
    "predicted": 132
  },
  "errors": [
    {
      "result_id": "limit",
      "code": "coercion_failed",
      "message": "Cannot coerce \"n/a\" to number"
    }
  ],
  "policy": {
    "on_unavailable": "skip"
  }
}
```

</details>

---

### `resolvePortalExternalValue`

Resolve an external value hook for a portal end customer (private journeys, portal).
The organization is taken from the portal token claims.

`POST /v1/portal/external-values/{app_id}/hooks/{hook_id}:resolve`

```ts
const { data } = await client.resolvePortalExternalValue(
  {
    app_id: 'example',
    hook_id: 'example',
  },
  {
    context: {
      contract: [
        {
          _id: '8a7e3f5e-9c0c-4c74-8d4a-1a1a1a1a1a1a',
          external_id: 'C-1001',
          installment_amount: 110
        }
      ]
    },
    consumer: {
      type: 'validation_rule',
      rule_id: '6c0a9e1e-2f4b-4e6a-8f8e-2b2b2b2b2b2b'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "values": {
    "predicted": 132
  },
  "errors": [
    {
      "result_id": "limit",
      "code": "coercion_failed",
      "message": "Cannot coerce \"n/a\" to number"
    }
  ],
  "policy": {
    "on_unavailable": "skip"
  }
}
```

</details>

---

## Schemas

### `TranslatedString`

```ts
type TranslatedString = {
  de: string
  en?: string
}
```

### `ExternalValueType`

```ts
type ExternalValueType = "number" | "text" | "date" | "boolean"
```

### `ResolveExternalValueRequest`

```ts
type ResolveExternalValueRequest = {
  context: Record<string, unknown>
  consumer?: {
    type?: string
    rule_id?: string
    journey_id?: string
  }
}
```

### `ExternalValueErrorCode`

- `timeout`: the third-party call exceeded `timeout_ms`
- `upstream_error`: the third-party call failed or returned a non-2xx status
- `auth_failed`: the `auth` pre-call failed
- `extraction_failed`: template/path/jsonata threw or yielded null / empty
- `coercion_failed`: the extracted value could n

```ts
type ExternalValueErrorCode = "timeout" | "upstream_error" | "auth_failed" | "extraction_failed" | "coercion_failed"
```

### `ExternalValueError`

```ts
type ExternalValueError = {
  result_id?: string
  code: "timeout" | "upstream_error" | "auth_failed" | "extraction_failed" | "coercion_failed"
  message: string
}
```

### `ResolveExternalValueResponse`

```ts
type ResolveExternalValueResponse = {
  values: Record<string, number | string | boolean>
  errors: Array<{
    result_id?: string
    code: "timeout" | "upstream_error" | "auth_failed" | "extraction_failed" | "coercion_failed"
    message: string
  }>
  policy: {
    on_unavailable: "skip" | "block"
  }
  cached?: boolean
}
```

### `ExternalValueResultSummary`

```ts
type ExternalValueResultSummary = {
  id: string
  type: "number" | "text" | "date" | "boolean"
  name: {
    de: string
    en?: string
  }
}
```

### `ExternalValueHookSummary`

```ts
type ExternalValueHookSummary = {
  app_id: string
  app_name: string
  hook_id: string
  name: {
    de: string
    en?: string
  }
  description?: {
    de: string
    en?: string
  }
  results: Array<{
    id: string
    type: "number" | "text" | "date" | "boolean"
    name: {
      de: { ... }
      en?: { ... }
    }
  }>
  contexts?: Array<{
    type: "entity"
    schema: string
  } | {
    type: "value"
    name: string
    value_type: "number" | "text" | "date" | "boolean"
  }>
}
```

### `ContextRequirement`

Something a hook needs the consumer to supply in `context`, discriminated by `type`:
bound entities (`entity`) or an optional scalar input (`value`). More types may follow;
consumers ignore types they do not know.


```ts
type ContextRequirement = {
  type: "entity"
  schema: string
} | {
  type: "value"
  name: string
  value_type: "number" | "text" | "date" | "boolean"
}
```

### `EntityContextRequirement`

The consumer supplies the bound entities of `schema` under `Context.`<schema>``, e.g. a hook
interpolating `{{ Context.contract[0].external_id }}` declares
`{ type: entity, schema: contract }`.


```ts
type EntityContextRequirement = {
  type: "entity"
  schema: string
}
```

### `ValueContextRequirement`

An optional scalar input. When the consumer has a value it supplies it under
`Context.`<name>`` (dates as ISO 8601 strings, `YYYY-MM-DD` or a date-time); otherwise the
key is absent, so the hook template must provide a fallback, e.g.
`{{ Context.reading_date | default: "now" | date: "%Y-%m-%d" }}` dec

```ts
type ValueContextRequirement = {
  type: "value"
  name: string
  value_type: "number" | "text" | "date" | "boolean"
}
```

### `ExternalValueHookList`

```ts
type ExternalValueHookList = {
  hooks: Array<{
    app_id: string
    app_name: string
    hook_id: string
    name: {
      de: { ... }
      en?: { ... }
    }
    description?: {
      de: { ... }
      en?: { ... }
    }
    results: Array<{
      id: { ... }
      type: { ... }
      name: { ... }
    }>
    contexts?: Array<{
      type: { ... }
      schema: { ... }
    } | {
      type: { ... }
      name: { ... }
      value_type: { ... }
    }>
  }>
}
```
