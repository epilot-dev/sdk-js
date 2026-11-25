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
- [`WidgetDefinitionV1`](#widgetdefinitionv1)
- [`WidgetDefinitionV2`](#widgetdefinitionv2)
- [`WidgetPrompt`](#widgetprompt)
- [`WidgetHtml`](#widgethtml)
- [`WidgetManifest`](#widgetmanifest)
- [`WidgetManifestV2`](#widgetmanifestv2)
- [`WidgetLibs`](#widgetlibs)
- [`WidgetIcons`](#widgeticons)
- [`WidgetRelations`](#widgetrelations)
- [`WidgetRelationsV2`](#widgetrelationsv2)
- [`WidgetFields`](#widgetfields)
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
  schema: 'example',
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
  {
    schema: 'example',
  },
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

An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
key would produce a different `ref` for an otherwise identical definition.


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
} | {
  version: 2
  prompt: string
  manifest: {
    relations: {
      mode: { ... }
      schemas: { ... }
      size: { ... }
    }
    libs: "echarts"[]
    icons?: string[]
    fields: Record<string, string[]>
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

### `WidgetDefinitionV1`

Version 1 of an AI widget definition. The widget receives every attribute of every record.

```ts
type WidgetDefinitionV1 = {
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

### `WidgetDefinitionV2`

Version 2 of an AI widget definition. The widget receives only the attributes its `manifest.fields` declares,
plus `_id`, `_schema` and `_title`.

Across both string tables, the UTF-8 bytes of every key plus every value may total at most 65536 bytes. The
server enforces this and answers `400`; JSON 

```ts
type WidgetDefinitionV2 = {
  version: 2
  prompt: string
  manifest: {
    relations: {
      mode: { ... }
      schemas: { ... }
      size: { ... }
    }
    libs: "echarts"[]
    icons?: string[]
    fields: Record<string, string[]>
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

### `WidgetPrompt`

The admin's own words, at most 4000 UTF-16 code units. The server counts code units and answers `400`, because
`maxLength` counts code points, so a prompt of astral characters passes it at up to 8000 code units.


```ts
type WidgetPrompt = string
```

### `WidgetHtml`

Body fragment rendered inside the sandboxed frame, at most 65536 UTF-8 bytes. The server counts bytes and
answers `400`, because `maxLength` counts characters.


```ts
type WidgetHtml = string
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

### `WidgetManifestV2`

```ts
type WidgetManifestV2 = {
  relations: {
    mode: "none" | "direct" | "reverse" | "both"
    schemas: string[]
    size: number
  }
  libs: "echarts"[]
  icons?: string[]
  fields: Record<string, string[]>
}
```

### `WidgetLibs`

Host-injected libraries, `[]` for none

```ts
type WidgetLibs = "echarts"[]
```

### `WidgetIcons`

Icon names the widget renders

```ts
type WidgetIcons = string[]
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

### `WidgetRelationsV2`

Relations of a version 2 definition: `schemas` names every related schema to load, so it must be non-empty
unless mode is none, and empty when mode is none.


```ts
type WidgetRelationsV2 = {
  mode: "none" | "direct" | "reverse" | "both"
  schemas: string[]
  size: number
}
```

### `WidgetFields`

Maps an entity schema slug to the top-level attributes the widget reads from records of that schema. A record
whose schema has no key receives `_id`, `_schema` and `_title` only.

Every key must be 1 to 128 UTF-16 code units and may not be `__proto__`, and every attribute name at most 128
UTF-16 cod

```ts
type WidgetFields = Record<string, string[]>
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
  } | {
    version: 2
    prompt: string
    manifest: {
      relations: { ... }
      libs: { ... }
      icons?: { ... }
      fields: { ... }
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
