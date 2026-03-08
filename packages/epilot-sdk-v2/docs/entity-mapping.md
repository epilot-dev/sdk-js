# Entity Mapping API

- **Base URL:** `https://entity-mapping.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/entity-mapping](https://docs.epilot.io/api/entity-mapping)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.entityMapping.storeConfig(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/entity-mapping'

const entityMappingClient = await getClient()
authorize(entityMappingClient, () => '<token>')
const { data } = await entityMappingClient.storeConfig(...)
```

## Operations

**mappings**
- [`storeConfig`](#storeconfig)
- [`getConfig`](#getconfig)
- [`deleteConfig`](#deleteconfig)
- [`getAllVersions`](#getallversions)
- [`storeNewVersion`](#storenewversion)
- [`getConfigVersion`](#getconfigversion)
- [`executeMapping`](#executemapping)
- [`searchConfigs`](#searchconfigs)
- [`queryMappingHistory`](#querymappinghistory)
- [`executeRelations`](#executerelations)
- [`getMappingConfig`](#getmappingconfig)
- [`putMappingConfig`](#putmappingconfig)

### `storeConfig`

Store new MappingConfig

`POST /v1/mappings`

```ts
const { data } = await client.storeConfig(
  {
    with_id: 'example',
  },
  {
    id: 'string',
    source: {
      type: 'journey',
      config: {
        journey_id: 'string'
      }
    },
    targets: [
      {
        id: 'string',
        name: 'string',
        allow_failure: true,
        target_schema: 'string',
        target_unique: [ /* ... */ ],
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    last_updated_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    org_id: '66',
    version: 2
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `getConfig`

Get latest version of a mapping config by id

`GET /v1/mappings/{id}`

```ts
const { data } = await client.getConfig({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `deleteConfig`

Delete entity mapping config

`DELETE /v1/mappings/{id}`

```ts
const { data } = await client.deleteConfig({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `getAllVersions`

Get all version of MappingConfig

`GET /v1/mappings/{id}/versions`

```ts
const { data } = await client.getAllVersions({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "configs": [
    {
      "id": "string",
      "source": {},
      "targets": [],
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {},
      "last_updated_by": {},
      "org_id": "66",
      "version": 2
    }
  ]
}
```

</details>

---

### `storeNewVersion`

Store new version of MappingConfig

`POST /v1/mappings/{id}/versions`

```ts
const { data } = await client.storeNewVersion(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'string',
    source: {
      type: 'journey',
      config: {
        journey_id: 'string'
      }
    },
    targets: [
      {
        id: 'string',
        name: 'string',
        allow_failure: true,
        target_schema: 'string',
        target_unique: [ /* ... */ ],
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    last_updated_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    org_id: '66',
    version: 2
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `getConfigVersion`

Get specific version of a mapping config by id & version

`GET /v1/mappings/{id}/versions/{version}`

```ts
const { data } = await client.getConfigVersion({
  id: '123e4567-e89b-12d3-a456-426614174000',
  version: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `executeMapping`

Execute entity mapping based on a config

`POST /v1/mappings:execute`

```ts
const { data } = await client.executeMapping(
  {
    preview_mode: true,
  },
  {
    source_ref: {
      entity_id: 'string',
      entity_schema: 'submission'
    },
    targets: [
      {
        id: 'string',
        name: 'string',
        allow_failure: true,
        target_schema: 'string',
        target_unique: [ /* ... */ ],
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: [ /* ... */ ]
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "mapped_entities": [
    {
      "_id": "string",
      "_schema": "string",
      "_title": "string",
      "_org": "string",
      "_tags": [],
      "_created_at": "string",
      "_updated_at": "string",
      "required": {}
    }
  ],
  "failures": [
    {
      "target": {},
      "error": {}
    }
  ],
  "warnings": [
    {
      "explanation": "string",
      "context": "string",
      "id": "string"
    }
  ]
}
```

</details>

---

### `searchConfigs`

Search mapping configs

`POST /v1/mappings:search`

```ts
const { data } = await client.searchConfigs(
  null,
  {
    source: {
      type: 'journey',
      config: {
        journey_id: 'string'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `queryMappingHistory`

Get the Mapping History

`GET /v1/mappings/history`

```ts
const { data } = await client.queryMappingHistory({
  from: 'example',
  to: 'example',
  targetEntityId: 'example',
  sourceEntityId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `executeRelations`

Execute relation mapping between source entity and target entities

`POST /v1/relations:execute`

```ts
const { data } = await client.executeRelations(
  null,
  {
    source_ref: {
      entity_id: 'string',
      entity_schema: 'submission'
    },
    target: {
      main_entity_ref: {
        entity_id: 'string',
        entity_schema: 'submission'
      },
      relation_attributes: [
        { /* ... */ }
      ],
      linkback: {
        attribute: 'mapped_entities',
        relation_tags: [ /* ... */ ]
      }
    },
    additional_relations: [
      {
        entity_id: 'string',
        attribute: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "relations": [
    {
      "source_entity_id": "string",
      "target_entity_id": "string",
      "relation_attr": "string",
      "tags": []
    }
  ]
}
```

</details>

---

### `getMappingConfig`

Get latest version of a mapping config by id V2

`GET /v2/mappings/{id}`

```ts
const { data } = await client.getMappingConfig({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `putMappingConfig`

Stores new version of entity mapping config

`PUT /v2/mappings/{id}`

```ts
const { data } = await client.putMappingConfig(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'string',
    source: {
      type: 'journey',
      config: {
        journey_id: 'string'
      }
    },
    targets: [
      {
        id: 'string',
        name: 'string',
        allow_failure: true,
        target_schema: 'string',
        target_unique: [ /* ... */ ],
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    last_updated_by: {
      type: 'user',
      org_id: 'string',
      user_id: 'string'
    },
    org_id: '66',
    version: 2
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "source": {
    "type": "journey",
    "config": {
      "journey_id": "string"
    }
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": [],
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": "string",
    "user_id": "string"
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

<details>
<summary>Schemas</summary>

### `SearchMappingReq`

```ts
type SearchMappingReq = {
  source?: {
    type?: "journey" | "entity"
    config?: {
      journey_id?: { ... }
    } | {
      entity_id: { ... }
      entity_schema?: { ... }
    }
  }
}
```

### `MappingConfigsResp`

```ts
type MappingConfigsResp = {
  configs: Array<{
    id: string
    source: {
      type?: { ... }
      config?: { ... }
    }
    targets: Array<{
      id?: { ... }
      name?: { ... }
      allow_failure?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
      loop_config?: { ... }
      conditionMode?: { ... }
      conditions?: { ... }
      mapping_attributes: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
    }>
    created_at?: string // date-time
    updated_at?: string // date-time
    created_by?: {
      type: { ... }
      org_id?: { ... }
      user_id?: { ... }
    }
    last_updated_by?: {
      type: { ... }
  // ...
}
```

### `MappingConfigs`

```ts
type MappingConfigs = Array<{
  id: string
  source: {
    type?: "journey" | "entity"
    config?: {
      journey_id?: { ... }
    } | {
      entity_id: { ... }
      entity_schema?: { ... }
    }
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
  // ...
}
```

### `MappingConfig`

```ts
type MappingConfig = {
  id: string
  source: {
    type?: "journey" | "entity"
    config?: {
      journey_id?: { ... }
    } | {
      entity_id: { ... }
      entity_schema?: { ... }
    }
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
  // ...
}
```

### `MappingConfigV2`

```ts
type MappingConfigV2 = {
  id: string
  source: {
    type?: "journey" | "entity"
    config?: {
      journey_id?: { ... }
    } | {
      entity_id: { ... }
      entity_schema?: { ... }
    }
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
  // ...
}
```

### `MappingConfigCommonFields`

```ts
type MappingConfigCommonFields = {
  id: string
  source: {
    type?: "journey" | "entity"
    config?: {
      journey_id?: { ... }
    } | {
      entity_id: { ... }
      entity_schema?: { ... }
    }
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
  // ...
}
```

### `Owner`

```ts
type Owner = {
  type: "user" | "internal_service"
  org_id?: string
  user_id?: string
}
```

### `ExecuteRelationsReq`

Build relations between a source entity and one or more target entities, dynamically identified

```ts
type ExecuteRelationsReq = {
  source_ref: {
    entity_id: string
    entity_schema?: string
  }
  target?: {
    main_entity_ref: {
      entity_id: { ... }
      entity_schema?: { ... }
    }
    relation_attributes: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback?: {
      attribute: { ... }
      relation_tags: { ... }
    }
  }
  additional_relations?: Array<{
    entity_id: string
    attribute: string
  }>
}
```

### `ExecuteRelationsResp`

```ts
type ExecuteRelationsResp = {
  relations?: Array<{
    source_entity_id: string
    target_entity_id: string
    relation_attr: string
    tags?: string[]
  }>
}
```

### `NewRelationItem`

```ts
type NewRelationItem = {
  source_entity_id: string
  target_entity_id: string
  relation_attr: string
  tags?: string[]
}
```

### `RelationItem`

```ts
type RelationItem = {
  entity_id: string
  attribute: string
}
```

### `ExecuteMappingReq`

Pass either source or source_entity

```ts
type ExecuteMappingReq = {
  source_ref: {
    entity_id: string
    entity_schema?: string
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
      operation: { ... }
      origin?: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
  // ...
}
```

### `ExecuteMappingResp`

```ts
type ExecuteMappingResp = {
  mapped_entities: Array<{
    _id?: string
    _schema?: string
    _title?: string
    _org?: string
    _tags?: string[]
    _created_at?: string
    _updated_at?: string
    required?: unknown
  }>
  failures?: Array<{
    target?: {
      id?: { ... }
      name?: { ... }
      allow_failure?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
      loop_config?: { ... }
      conditionMode?: { ... }
      conditions?: { ... }
      mapping_attributes: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
    }
    error?: {
      isSilent?: { ... }
      message?: { ... }
    }
  // ...
}
```

### `MappingFailure`

```ts
type MappingFailure = {
  target?: {
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
      source_path?: { ... }
      length?: { ... }
    }
    conditionMode?: "oneOf" | "anyOf" | "allOf"
    conditions?: Array<{
      _exists?: { ... }
      _equals?: { ... }
      _not_exists?: { ... }
      _any_of?: { ... }
    }>
    mapping_attributes: Array<{
      target: { ... }
      operation: { ... }
      origin?: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
  // ...
}
```

### `MappingWarning`

```ts
type MappingWarning = {
  explanation: string
  context?: string
  id?: string
}
```

### `Entity`

```ts
type Entity = {
  _id?: string
  _schema?: string
  _title?: string
  _org?: string
  _tags?: string[]
  _created_at?: string
  _updated_at?: string
  required?: unknown
}
```

### `EntityRef`

```ts
type EntityRef = {
  entity_id: string
  entity_schema?: string
}
```

### `SourceConfig`

```ts
type SourceConfig = {
  type?: "journey" | "entity"
  config?: {
    journey_id?: string
  } | {
    entity_id: string
    entity_schema?: string
  }
}
```

### `JourneyRef`

```ts
type JourneyRef = {
  journey_id?: string
}
```

### `Loop_Index_String`

This string value will be replaced with the value of the loop index, when mapping in loop mode

```ts
type Loop_Index_String = "##LOOP_INDEX##"
```

### `TargetConfig`

```ts
type TargetConfig = {
  id?: string
  name?: string
  allow_failure?: boolean
  target_schema: string
  target_unique?: string[]
  loop_config?: {
    source_path?: string
    length?: number
  }
  conditionMode?: "oneOf" | "anyOf" | "allOf"
  conditions?: Array<{
    _exists?: {
      source?: { ... }
      value?: { ... }
    }
    _equals?: {
      source?: { ... }
      value?: { ... }
    }
    _not_exists?: {
      source?: { ... }
      value?: { ... }
    }
    _any_of?: {
      source?: { ... }
      value?: { ... }
    }
  }>
  mapping_attributes: Array<{
  // ...
}
```

### `MapCondition`

```ts
type MapCondition = {
  _exists?: {
    source?: string
    value?: string | number | object | object[]
  }
  _equals?: {
    source?: string
    value?: string | number | object | object[]
  }
  _not_exists?: {
    source?: string
    value?: string | number | object | object[]
  }
  _any_of?: {
    source?: string
    value?: string | number | object | object[]
  }
}
```

### `ConditionNode`

```ts
type ConditionNode = {
  source?: string
  value?: string | number | object | object[]
}
```

### `RelationAttribute`

```ts
type RelationAttribute = {
  target: string
  target_tags?: string[]
  target_tags_include_source?: boolean
  override_with_source_filter?: boolean
  source_filter?: {
    limit?: number
    schema?: string
    attribute?: string
    relation_tag?: string
    tag?: string
    self?: boolean
  }
  related_to?: Record<string, unknown>
  mode: "append" | "prepend" | "set"
  origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
}
```

### `MappingAttributeV2`

```ts
type MappingAttributeV2 = {
  target: string
  operation: {
    _set?: string | boolean | number | Record<string, unknown> | unknown[]
    _append?: unknown
    _prepend?: unknown
    _uniq?: boolean | string[]
    _retain_old_values?: boolean
    _copy?: string
    _template?: string
    _random?: {
      type: { ... }
    } | {
      type: { ... }
      min?: { ... }
      max?: { ... }
    }
  } | string | boolean | number | Record<string, unknown> | unknown[]
  origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
}
```

### `AttributeOrigin`

Origin of an attribute.

```ts
type AttributeOrigin = "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
```

### `OperationNode`

Mapping operation nodes are either primitive values or operation node objects

```ts
type OperationNode = {
  _set?: string | boolean | number | Record<string, unknown> | unknown[]
  _append?: unknown
  _prepend?: unknown
  _uniq?: boolean | string[]
  _retain_old_values?: boolean
  _copy?: string
  _template?: string
  _random?: {
    type: "uuid" | "nanoid"
  } | {
    type: "number"
    min?: number
    max?: number
  }
} | string | boolean | number | Record<string, unknown> | unknown[]
```

### `OperationObjectNode`

```ts
type OperationObjectNode = {
  _set?: string | boolean | number | Record<string, unknown> | unknown[]
  _append?: unknown
  _prepend?: unknown
  _uniq?: boolean | string[]
  _retain_old_values?: boolean
  _copy?: string
  _template?: string
  _random?: {
    type: "uuid" | "nanoid"
  } | {
    type: "number"
    min?: number
    max?: number
  }
}
```

### `PrimitiveJSONValue`

Represents any primitive JSON value

```ts
type PrimitiveJSONValue = string | boolean | number | Record<string, unknown> | unknown[]
```

### `RandomOperation`

```ts
type RandomOperation = {
  type: "uuid" | "nanoid"
} | {
  type: "number"
  min?: number
  max?: number
}
```

### `MappingAttribute`

```ts
type MappingAttribute = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  value: unknown
} | {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source: string
} | {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source?: string
  value_json: string
  target_unique?: string[]
}
```

### `MappingAttributeMode`

- copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used togethe

```ts
type MappingAttributeMode = "copy_if_exists" | "append_if_exists" | "set_value"
```

### `SetValueMapper`

```ts
type SetValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  value: unknown
}
```

### `CopyValueMapper`

```ts
type CopyValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source: string
}
```

### `AppendValueMapper`

```ts
type AppendValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source?: string
  value_json: string
  target_unique?: string[]
}
```

### `MappingHistoryResp`

```ts
type MappingHistoryResp = {
  results: Array<{
    id: string
    timestamp: string // ISO datetime
    source_entity_snapshot: {
      _id?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _org?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      required?: { ... }
    }
    mapped_entities_snapshot: Array<{
      _id?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _org?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      required?: { ... }
    }>
    target_configs_snapshot: Array<{
      id?: { ... }
      name?: { ... }
      allow_failure?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
  // ...
}
```

### `MappingHistoryEntry`

```ts
type MappingHistoryEntry = {
  id: string
  timestamp: string // ISO datetime
  source_entity_snapshot: {
    _id?: string
    _schema?: string
    _title?: string
    _org?: string
    _tags?: string[]
    _created_at?: string
    _updated_at?: string
    required?: unknown
  }
  mapped_entities_snapshot: Array<{
    _id?: string
    _schema?: string
    _title?: string
    _org?: string
    _tags?: string[]
    _created_at?: string
    _updated_at?: string
    required?: unknown
  }>
  target_configs_snapshot: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    loop_config?: {
  // ...
}
```

### `MappingSource`

```ts
type MappingSource = {
  key: string
  sub_properties?: Array<{
    value: string
    label: string
    initial_target_value?: string
    possible_target_types?: "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency" | "sequence" | "relation" | "array"[]
    raw?: boolean
  }>
  source_type: string
  group?: string
  possible_target_types?: "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency" | "sequence" | "relation" | "array"[]
  initial_relation?: {
    target: string
    target_tags?: string[]
    target_tags_include_source?: boolean
    override_with_source_filter?: boolean
    source_filter?: {
      limit?: { ... }
      schema?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      tag?: { ... }
      self?: { ... }
    }
    related_to?: Record<string, unknown>
    mode: "append" | "prepend" | "set"
    origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
  }
  title: string
  // ...
}
```

### `MappingSourceProperty`

```ts
type MappingSourceProperty = {
  value: string
  label: string
  initial_target_value?: string
  possible_target_types?: "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency" | "sequence" | "relation" | "array"[]
  raw?: boolean
}
```

### `MappingSourceTargetType`

```ts
type MappingSourceTargetType = "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency" | "sequence" | "relation" | "array"
```

</details>