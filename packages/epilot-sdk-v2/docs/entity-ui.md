# Entity UI API

- **Base URL:** `https://entity-ui.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/entity-ui](https://docs.epilot.io/api/entity-ui)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.entityUi.putWidgetDefinition(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/entity-ui'

const entityUiClient = getClient()
authorize(entityUiClient, () => '<token>')
const { data } = await entityUiClient.putWidgetDefinition(...)
```

## Operations

**Widget Definitions**
- [`putWidgetDefinition`](#putwidgetdefinition)
- [`getWidgetDefinition`](#getwidgetdefinition)
- [`batchGetWidgetDefinitions`](#batchgetwidgetdefinitions)

**Schemas**
- [`WidgetDefinitionRef`](#widgetdefinitionref)
- [`WidgetDefinitionRefResponse`](#widgetdefinitionrefresponse)
- [`WidgetDefinition`](#widgetdefinition)
- [`WidgetManifest`](#widgetmanifest)
- [`WidgetRelations`](#widgetrelations)
- [`WidgetStrings`](#widgetstrings)
- [`WidgetStringTable`](#widgetstringtable)
- [`WidgetSuggestions`](#widgetsuggestions)
- [`BatchGetWidgetDefinitionsRequest`](#batchgetwidgetdefinitionsrequest)
- [`BatchGetWidgetDefinitionsResponse`](#batchgetwidgetdefinitionsresponse)
- [`ErrorResponse`](#errorresponse)

### `putWidgetDefinition`

Stores a widget definition and returns its `ref`.

`PUT /v1/entity-ui/widget-definitions`

```ts
const { data } = await client.putWidgetDefinition(
  null,
  {
    version: 1,
    prompt: 'string',
    manifest: {
      relations: {},
      libs: ['echarts'],
      icons: ['string']
    },
    html: 'string',
    strings: {
      de: {},
      en: {}
    },
    suggestions: {
      de: ['string'],
      en: ['string']
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "ref": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
}
```

</details>

---

### `getWidgetDefinition`

Returns a stored widget definition in its canonical form.

`GET /v1/entity-ui/widget-definitions/{ref}`

```ts
const { data } = await client.getWidgetDefinition({
  ref: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "version": 1,
  "prompt": "string",
  "manifest": {
    "relations": {},
    "libs": ["echarts"],
    "icons": ["string"]
  },
  "html": "string",
  "strings": {
    "de": {},
    "en": {}
  },
  "suggestions": {
    "de": ["string"],
    "en": ["string"]
  }
}
```

</details>

---

### `batchGetWidgetDefinitions`

Returns up to 20 stored widget definitions by `ref`. Refs that are not stored in the organization are
listed in `missing`.

`POST /v1/entity-ui/widget-definitions/batch-get`

```ts
const { data } = await client.batchGetWidgetDefinitions(
  null,
  {
    refs: ['9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "definitions": {},
  "missing": ["9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"]
}
```

</details>

---

## Schemas

### `WidgetDefinitionRef`

Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON

```ts
type WidgetDefinitionRef = string
```

### `WidgetDefinitionRefResponse`

```ts
type WidgetDefinitionRefResponse = {
  ref: string
}
```

### `WidgetDefinition`

Version 1 of an AI widget definition. Unknown keys are rejected at every level, because any extra key would
produce a different `ref` for an otherwise identical definition.


```ts
type WidgetDefinition = {
  version: 1
  prompt: string
  manifest: {
    relations: {
      mode?: { ... }
    } | {
      mode?: { ... }
      schemas?: { ... }
    }
    libs: "echarts"[]
    icons?: string[]
  }
  html: string
  strings: {
    de: Record<string, string>
    en: Record<string, string>
  }
  suggestions?: {
    de: string[]
    en: string[]
  }
}
```

### `WidgetManifest`

```ts
type WidgetManifest = {
  relations: {
    mode?: "direct" | "reverse" | "both"
  } | {
    mode?: "none"
    schemas?: unknown
  }
  libs: "echarts"[]
  icons?: string[]
}
```

### `WidgetRelations`

```ts
type WidgetRelations = {
  mode?: "direct" | "reverse" | "both"
} | {
  mode?: "none"
  schemas?: unknown
}
```

### `WidgetStrings`

Localized string tables; both include `title`

```ts
type WidgetStrings = {
  de: Record<string, string>
  en: Record<string, string>
}
```

### `WidgetStringTable`

String table of one locale. Keys are what the widget passes to `t()`; both tables include `title`.

Every key must match `^[a-z0-9_]{1,64}$` (snake_case, at most 64 characters) and may not be `__proto__`. The
server enforces this and answers `400` naming the offending key; OpenAPI 3.0 has no keyword

```ts
type WidgetStringTable = Record<string, string>
```

### `WidgetSuggestions`

```ts
type WidgetSuggestions = {
  de: string[]
  en: string[]
}
```

### `BatchGetWidgetDefinitionsRequest`

```ts
type BatchGetWidgetDefinitionsRequest = {
  refs: string[]
}
```

### `BatchGetWidgetDefinitionsResponse`

```ts
type BatchGetWidgetDefinitionsResponse = {
  definitions: Record<string, {
    version: 1
    prompt: string
    manifest: {
      relations: { ... }
      libs: { ... }
      icons?: { ... }
    }
    html: string
    strings: {
      de: { ... }
      en: { ... }
    }
    suggestions?: {
      de: { ... }
      en: { ... }
    }
  }>
  missing: string[]
}
```

### `ErrorResponse`

Standard error response format for all API errors

```ts
type ErrorResponse = {
  error: string | object[]
  status: number
}
```
