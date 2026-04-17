# Configuration Hub API

- **Base URL:** `https://configuration-hub.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/configuration-hub](https://docs.epilot.io/api/configuration-hub)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.configurationHub.listConfigTypes(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/configuration-hub'

const configurationHubClient = getClient()
authorize(configurationHubClient, () => '<token>')
const { data } = await configurationHubClient.listConfigTypes(...)
```

## Operations

**Configs**
- [`listConfigTypes`](#listconfigtypes)
- [`listConfigs`](#listconfigs)
- [`getConfigDependencies`](#getconfigdependencies)

**Index**
- [`rebuildIndex`](#rebuildindex)

**Schemas**
- [`ResourceType`](#resourcetype)
- [`ConfigTypeInfo`](#configtypeinfo)
- [`ConfigNode`](#confignode)
- [`ConfigListResponse`](#configlistresponse)
- [`ConfigDependenciesResponse`](#configdependenciesresponse)
- [`IndexRebuildResponse`](#indexrebuildresponse)
- [`ErrorResponse`](#errorresponse)

### `listConfigTypes`

Returns the static list of available configuration types with display metadata.
This is a cheap call — no fan-out to downstream APIs. Returns all known types
with labels and icons. The frontend should

`GET /v1/configs/types`

```ts
const { data } = await client.listConfigTypes()
```

<details>
<summary>Response</summary>

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
(not full payloads). The frontend calls this per type folder when expanding.

`GET /v1/configs/{type}`

```ts
const { data } = await client.listConfigs({
  type: 'example',
  cursor: 'example',
  size: 1,
  q: 'example',
  updated_after: 'example',
  updated_before: 'example',
  purposes: 'example',
})
```

<details>
<summary>Response</summary>

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
Used to render children when expanding a config node in the tree.

`GET /v1/configs/{type}/{id}/dependencies`

```ts
const { data } = await client.getConfigDependencies({
  type: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  cursor: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

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

### `rebuildIndex`

Rebuild the configuration index for the caller's organization.
Calls all adapter APIs in parallel and stores results in DynamoDB.
If a build is already in progress (within 60s), returns immediately.

`POST /v1/index/rebuild`

```ts
const { data } = await client.rebuildIndex()
```

<details>
<summary>Response</summary>

```json
{
  "status": "ready",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0,
  "failed_types": ["string"]
}
```

</details>

---

## Schemas

### `ResourceType`

Configuration resource type identifier.
Matches blueprint-manifest-api V3 naming conventions.


```ts
type ResourceType = "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
```

### `ConfigTypeInfo`

Static metadata for a config type folder in the tree.
No downstream API calls — just type + label + icon + source API info.


```ts
type ConfigTypeInfo = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
  label: string
  icon: string
  source_api: string
  sdk_client: string
}
```

### `ConfigNode`

Summary metadata for a single configuration item in the tree

```ts
type ConfigNode = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
  id: string
  title: string
  updated_at?: string // date-time
  updated_by?: string
  tags?: string[]
  purposes?: string[]
  link?: string // uri
}
```

### `ConfigListResponse`

Cursor-paginated list of configs for a specific type

```ts
type ConfigListResponse = {
  type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
  label: string
  icon: string
  total?: number
  next_cursor?: string
  items: Array<{
    type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
    id: string
    title: string
    updated_at?: string // date-time
    updated_by?: string
    tags?: string[]
    purposes?: string[]
    link?: string // uri
  }>
}
```

### `ConfigDependenciesResponse`

Cursor-paginated list of configs referenced by a given config

```ts
type ConfigDependenciesResponse = {
  total?: number
  next_cursor?: string
  results: Array<{
    type: "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation"
    id: string
    title: string
    updated_at?: string // date-time
    updated_by?: string
    tags?: string[]
    purposes?: string[]
    link?: string // uri
  }>
}
```

### `IndexRebuildResponse`

Result of an index rebuild operation

```ts
type IndexRebuildResponse = {
  status: "ready" | "building" | "failed" | "already_building"
  last_built_at?: string // date-time
  total_items?: number
  build_duration_ms?: number
  failed_types?: string[]
}
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  status: number
  error: string
}
```
