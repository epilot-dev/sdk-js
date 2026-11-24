# Entity UI API

- **Base URL:** `https://entity-ui.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/entity-ui](https://docs.epilot.io/api/entity-ui)

Stores the definitions of AI widgets rendered on entity pages.

## Quick Start

```bash
# List available operations
epilot entity-ui

# Call an operation
epilot entity-ui putWidgetDefinition
```

## Common Flags

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Widget Definitions**
- [`putWidgetDefinition`](#putwidgetdefinition) — Stores a widget definition and returns its `ref`.
- [`getWidgetDefinition`](#getwidgetdefinition) — Returns a stored widget definition in its canonical form.
- [`batchGetWidgetDefinitions`](#batchgetwidgetdefinitions) — Returns up to 20 stored widget definitions by `ref`. Refs that are not stored in the organization are

### `putWidgetDefinition`

Stores a widget definition and returns its `ref`.

`PUT /v1/entity-ui/widget-definitions`

**Request Body** (required)

**Sample Call**

```bash
epilot entity-ui putWidgetDefinition
```

With request body:

```bash
epilot entity-ui putWidgetDefinition \
  -d '{
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-ui putWidgetDefinition
```

With JSONata filter:

```bash
epilot entity-ui putWidgetDefinition --jsonata 'ref'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ref` | path | string | Yes | Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON |

**Sample Call**

```bash
epilot entity-ui getWidgetDefinition \
  -p ref=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

Using positional args for path parameters:

```bash
epilot entity-ui getWidgetDefinition 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

With JSONata filter:

```bash
epilot entity-ui getWidgetDefinition -p ref=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 --jsonata 'version'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/entity-ui/widget-definitions/batch-get`

**Request Body** (required)

**Sample Call**

```bash
epilot entity-ui batchGetWidgetDefinitions \
  -d '{"refs":["9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-ui batchGetWidgetDefinitions
```

With JSONata filter:

```bash
epilot entity-ui batchGetWidgetDefinitions --jsonata 'definitions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "definitions": {},
  "missing": ["9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"]
}
```

</details>

---
