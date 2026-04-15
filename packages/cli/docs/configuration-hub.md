# Configuration Hub API

- **Base URL:** `https://configuration-hub.dev.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/configuration-hub](https://docs.epilot.io/api/configuration-hub)

Lightweight index API for exploring epilot organization configurations.

## Quick Start

```bash
# List available operations
epilot configuration-hub

# Call an operation
epilot configuration-hub listConfigTypes
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

**Configs**
- [`listConfigTypes`](#listconfigtypes) — Returns the static list of available configuration types with display metadata.
- [`listConfigs`](#listconfigs) — List configs of a given type with pagination. Returns summary metadata only
- [`getConfigDependencies`](#getconfigdependencies) — Get configs that are referenced by the given config.

### `listConfigTypes`

Returns the static list of available configuration types with display metadata.

`GET /v1/configs/types`

**Sample Call**

```bash
epilot configuration-hub listConfigTypes
```

With JSONata filter:

```bash
epilot configuration-hub listConfigTypes --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "type": "journey",
      "label": "Journeys",
      "icon": "Route",
      "source_api": "https://journey.sls.epilot.io",
      "sdk_client": "@epilot/sdk/journey"
    }
  ]
}
```

</details>

---

### `listConfigs`

List configs of a given type with pagination. Returns summary metadata only

`GET /v1/configs/{type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" | Yes | Configuration resource type |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub listConfigs \
  -p type=example
```

Using positional args for path parameters:

```bash
epilot configuration-hub listConfigs example
```

With JSONata filter:

```bash
epilot configuration-hub listConfigs -p type=example --jsonata 'items[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "label": "string",
  "icon": "string",
  "total": 0,
  "next_cursor": "string",
  "items": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path"
    }
  ]
}
```

</details>

---

### `getConfigDependencies`

Get configs that are referenced by the given config.

`GET /v1/configs/{type}/{id}/dependencies`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" | Yes | Configuration resource type |
| `id` | path | string | Yes | Configuration resource ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub getConfigDependencies \
  -p type=example \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getConfigDependencies example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getConfigDependencies -p type=example -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path"
    }
  ]
}
```

</details>

---
