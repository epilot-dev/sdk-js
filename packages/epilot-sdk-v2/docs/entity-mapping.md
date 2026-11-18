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

const entityMappingClient = getClient()
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
- [`validateMapping`](#validatemapping)
- [`validateMappingFlow`](#validatemappingflow)
- [`searchConfigs`](#searchconfigs)
- [`executeRelations`](#executerelations)
- [`getMappingConfig`](#getmappingconfig)
- [`putMappingConfig`](#putmappingconfig)

**Schemas**
- [`MappingCheckContext`](#mappingcheckcontext)
- [`MappingIssue`](#mappingissue)
- [`MappingAnalysis`](#mappinganalysis)
- [`ValidateMappingReq`](#validatemappingreq)
- [`MappingSourceRef`](#mappingsourceref)
- [`MappingFlowAction`](#mappingflowaction)
- [`ValidateMappingFlowReq`](#validatemappingflowreq)
- [`FlowMappingIssue`](#flowmappingissue)
- [`ValidateMappingFlowResp`](#validatemappingflowresp)
- [`MappingRoots`](#mappingroots)
- [`MappingRootDescription`](#mappingrootdescription)
- [`MappingRootField`](#mappingrootfield)
- [`SearchMappingReq`](#searchmappingreq)
- [`MappingConfigsResp`](#mappingconfigsresp)
- [`MappingConfigs`](#mappingconfigs)
- [`MappingConfig`](#mappingconfig)
- [`MappingConfigV2`](#mappingconfigv2)
- [`MappingConfigCommonFields`](#mappingconfigcommonfields)
- [`Owner`](#owner)
- [`ExecuteRelationsReq`](#executerelationsreq)
- [`ExecuteRelationsResp`](#executerelationsresp)
- [`NewRelationItem`](#newrelationitem)
- [`RelationItem`](#relationitem)
- [`ExecuteMappingReq`](#executemappingreq)
- [`PreviewTarget`](#previewtarget)
- [`OutputEntityRef`](#outputentityref)
- [`ExecuteMappingResp`](#executemappingresp)
- [`MappingFailure`](#mappingfailure)
- [`MappingWarning`](#mappingwarning)
- [`Entity`](#entity)
- [`EntityRef`](#entityref)
- [`SourceConfig`](#sourceconfig)
- [`JourneyRef`](#journeyref)
- [`Loop_Index_String`](#loop_index_string)
- [`TargetConfig`](#targetconfig)
- [`MapCondition`](#mapcondition)
- [`ConditionNode`](#conditionnode)
- [`RelationAttribute`](#relationattribute)
- [`GraphContextEntry`](#graphcontextentry)
- [`GraphSeed`](#graphseed)
- [`GraphDefinition`](#graphdefinition)
- [`GraphNode`](#graphnode)
- [`GraphNodeFilter`](#graphnodefilter)
- [`GraphEdge`](#graphedge)
- [`MappingAttributeV2`](#mappingattributev2)
- [`AttributeOrigin`](#attributeorigin)
- [`OperationNode`](#operationnode)
- [`OperationObjectNode`](#operationobjectnode)
- [`PrimitiveJSONValue`](#primitivejsonvalue)
- [`RandomOperation`](#randomoperation)
- [`MappingAttribute`](#mappingattribute)
- [`MappingAttributeMode`](#mappingattributemode)
- [`SetValueMapper`](#setvaluemapper)
- [`CopyValueMapper`](#copyvaluemapper)
- [`AppendValueMapper`](#appendvaluemapper)
- [`MappingSource`](#mappingsource)
- [`MappingSourceProperty`](#mappingsourceproperty)
- [`MappingSourceTargetType`](#mappingsourcetargettype)
- [`JourneyContextUsagesReq`](#journeycontextusagesreq)
- [`JourneyContextUsage`](#journeycontextusage)
- [`JourneyContextUsagesResp`](#journeycontextusagesresp)

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
        target_unique: ['string'],
        use_uniqueness_criteria: false,
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: ['string'],
        graph_context: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'internal_service'
    },
    last_updated_by: {
      type: 'user',
      org_id: 255151,
      user_id: 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
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
  ],
  "truncated": true
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
        target_unique: ['string'],
        use_uniqueness_criteria: false,
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: ['string'],
        graph_context: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'internal_service'
    },
    last_updated_by: {
      type: 'user',
      org_id: 255151,
      user_id: 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
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
    loop_ref: {
      entity_id: 'string',
      entity_schema: 'submission'
    },
    targets: [
      {
        id: 'string',
        name: 'string',
        allow_failure: true,
        target_schema: 'string',
        target_unique: ['string'],
        use_uniqueness_criteria: false,
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: ['string'],
        graph_context: [ /* ... */ ]
      }
    ],
    outputs: {
      '9ec3711b-db63-449c-b894-54d5bb622a8f': [
        { /* ... */ }
      ]
    },
    output_ids: ['string']
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
      "_tags": ["string"],
      "_created_at": "string",
      "_updated_at": "string"
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
  ],
  "preview_targets": [
    {
      "index": 0,
      "output_id": "string",
      "mapped_entities": [],
      "failure": {}
    }
  ]
}
```

</details>

---

### `validateMapping`

Analyse a stored map-entity action config (engine JSON) line by line: a verdict per line (form, json, broken), issues on the engine line they belong to, suggested rewrites and a sentence each. `valid`

`POST /v1/mappings:validate`

```ts
const { data } = await client.validateMapping()
```

<details>
<summary>Response</summary>

```json
{
  "valid": true,
  "skipped_checks": ["attributes"],
  "counts": {
    "form": 0,
    "json": 0,
    "broken": 0
  },
  "issues": [
    {
      "code": "ambiguous-producer",
      "severity": "error",
      "path": "string",
      "key": "string",
      "message": "string",
      "params": {}
    }
  ],
  "lines": [
    {
      "kind": "identity",
      "index": 0,
      "target": "string",
      "verdict": "form",
      "reason": "string",
      "issues": [
        {
          "code": "ambiguous-producer",
          "severity": "error",
          "path": "string",
          "key": "string",
          "message": "string",
          "params": {}
        }
      ],
      "suggestions": [
        {
          "why": "pick-producer",
          "task": "string",
          "line": {}
        }
      ],
      "description": "string"
    }
  ]
}
```

</details>

---

### `validateMappingFlow`

Analyse every mapping action (`map-entity`, `cart-checkout`) of an automation, each in its place: against the trigger's source, the entities the earlier actions create and its target schema. The sourc

`POST /v1/mappings:validate-flow`

```ts
const { data } = await client.validateMappingFlow(
  null,
  {
    actions: [
      {
        id: 'string',
        type: 'map-entity',
        config: {}
      }
    ],
    source: {
      journey_id: 'string'
    },
    previous_actions: [
      {
        id: 'string',
        type: 'map-entity',
        config: {}
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "valid": true,
  "blocking": [
    {
      "code": "ambiguous-producer",
      "severity": "error",
      "path": "string",
      "key": "string",
      "message": "string",
      "params": {},
      "action_id": "string"
    }
  ],
  "introduced": [
    {
      "code": "ambiguous-producer",
      "severity": "error",
      "path": "string",
      "key": "string",
      "message": "string",
      "params": {},
      "action_id": "string"
    }
  ],
  "analyses": {}
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
  ],
  "truncated": true
}
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
        {
          target: 'string',
          target_tags: ['string'],
          target_tags_include_source: false,
          target_entity_tags: ['string'],
          override_with_source_filter: false,
          source_filter: {
            limit: 0,
            schema: 'string',
            attribute: 'string',
            relation_tag: 'string',
            output_of: 'string',
            tag: 'string',
            self: false
          },
          related_to: {},
          mode: 'append',
          origin: 'system_recommendation'
        }
      ],
      linkback: {
        attribute: 'mapped_entities',
        relation_tags: ['string']
      }
    },
    additional_relations: [
      {
        entity_id: 'string',
        attribute: 'string'
      }
    ],
    outputs: {}
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
      "tags": ["string"]
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

### `putMappingConfig`

Stores new version of entity mapping config. The targets are not checked on store: check them first with `POST /v1/mappings:validate-flow` (`{ source: { journey_id }, actions: [{ id, type: map-entity,

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
        target_unique: ['string'],
        use_uniqueness_criteria: false,
        loop_config: { /* ... */ },
        conditionMode: 'oneOf',
        conditions: [ /* ... */ ],
        mapping_attributes: [ /* ... */ ],
        relation_attributes: [ /* ... */ ],
        linkback_relation_attribute: 'mapped_entities',
        linkback_relation_tags: ['string'],
        graph_context: [ /* ... */ ]
      }
    ],
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'internal_service'
    },
    last_updated_by: {
      type: 'user',
      org_id: 255151,
      user_id: 99252
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
      "target_unique": ["string"],
      "use_uniqueness_criteria": false,
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"],
      "graph_context": []
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "internal_service"
  },
  "last_updated_by": {
    "type": "user",
    "org_id": 255151,
    "user_id": 99252
  },
  "org_id": "66",
  "version": 2
}
```

</details>

---

## Schemas

### `MappingCheckContext`

Where the action sits in its automation or flow

```ts
type MappingCheckContext = {
  sourceSchema: string
  taskOrder: string[]
  current?: string
  taskSchemas: Record<string, string>
  producersBySchema: Record<string, string[]>
  linkbackTags?: string[]
  linkbackTagsByTask?: Record<string, string[]>
  configIdsByTask?: Record<string, string>
}
```

### `MappingIssue`

```ts
type MappingIssue = {
  code: string
  severity: "error" | "warning"
  path: string
  key: string
  message: string
  params?: Record<string, string>
}
```

### `MappingAnalysis`

```ts
type MappingAnalysis = {
  valid: boolean
  skipped_checks: "attributes" | "blocks" | "types" | "source-types"[]
  counts: {
    form?: number
    json?: number
    broken?: number
  }
  issues: Array<{
    code: string
    severity: "error" | "warning"
    path: string
    key: string
    message: string
    params?: Record<string, string>
  }>
  lines: Array<{
    kind?: "identity" | "field" | "relation"
    index?: number
    target?: string
    verdict?: "form" | "json" | "broken"
    reason?: string
    issues?: Array<{
      code: { ... }
      severity: { ... }
      path: { ... }
      key: { ... }
      message: { ... }
      params?: { ... }
    }>
    suggestions?: Array<{
      why?: { ... }
      task?: { ... }
      line?: { ... }
    }>
    description?: string
  }>
}
```

### `ValidateMappingReq`

```ts
type ValidateMappingReq = {
  config: Record<string, unknown>
  context?: {
    sourceSchema: string
    taskOrder: string[]
    current?: string
    taskSchemas: Record<string, string>
    producersBySchema: Record<string, string[]>
    linkbackTags?: string[]
    linkbackTagsByTask?: Record<string, string[]>
    configIdsByTask?: Record<string, string>
  }
  roots?: {
    source?: {
      kind: { ... }
      fields: { ... }
    }
    tasks: Array<{
      id: { ... }
      schema?: { ... }
      label?: { ... }
      description?: { ... }
    }>
  }
  target_root?: {
    kind: "declared" | "inferred"
    fields: Array<{
      path: { ... }
      label?: { ... }
      type?: { ... }
      children?: { ... }
      open?: { ... }
      targetTypes?: { ... }
    }>
  }
  source?: {
    journey_id: string
  } | {
    entity_schema: string
  }
}
```

### `MappingSourceRef`

What the automation's trigger provides, by id. Used when `roots.source` is not sent: the server loads the journey's mapping sources (`rootFromMappingSources`) or the entity schema (`rootFromEntitySchema`) with the caller's authorization. A journey or schema that does not exist is an error issue (`so

```ts
type MappingSourceRef = {
  journey_id: string
} | {
  entity_schema: string
}
```

### `MappingFlowAction`

An action of an automation (as stored in it), in execution order; only mapping actions are analysed

```ts
type MappingFlowAction = {
  id: string
  type?: string
  config?: Record<string, unknown>
}
```

### `ValidateMappingFlowReq`

```ts
type ValidateMappingFlowReq = {
  actions: Array<{
    id: string
    type?: string
    config?: Record<string, unknown>
  }>
  source?: {
    journey_id: string
  } | {
    entity_schema: string
  }
  previous_actions?: Array<{
    id: string
    type?: string
    config?: Record<string, unknown>
  }>
}
```

### `FlowMappingIssue`

```ts
type FlowMappingIssue = {
  code: string
  severity: "error" | "warning"
  path: string
  key: string
  message: string
  params?: Record<string, string>
  action_id: string
}
```

### `ValidateMappingFlowResp`

```ts
type ValidateMappingFlowResp = {
  valid: boolean
  blocking: Array<{
    code: string
    severity: "error" | "warning"
    path: string
    key: string
    message: string
    params?: Record<string, string>
    action_id: string
  }>
  introduced?: Array<{
    code: string
    severity: "error" | "warning"
    path: string
    key: string
    message: string
    params?: Record<string, string>
    action_id: string
  }>
  analyses: Record<string, {
    valid: boolean
    skipped_checks: "attributes" | "blocks" | "types" | "source-types"[]
    counts: {
      form?: { ... }
      json?: { ... }
      broken?: { ... }
    }
    issues: Array<{
      code: { ... }
      severity: { ... }
      path: { ... }
      key: { ... }
      message: { ... }
      params?: { ... }
    }>
    lines: Array<{
      kind?: { ... }
      index?: { ... }
      target?: { ... }
      verdict?: { ... }
      reason?: { ... }
      issues?: { ... }
      suggestions?: { ... }
      description?: { ... }
    }>
  }>
}
```

### `MappingRoots`

Optional descriptions of the source and of each action's output (`Roots` of `@epilot/entity-mapping-validator`). A body whose `roots` does not have this shape is rejected with 400.

```ts
type MappingRoots = {
  source?: {
    kind: "declared" | "inferred"
    fields: Array<{
      path: { ... }
      label?: { ... }
      type?: { ... }
      children?: { ... }
      open?: { ... }
      targetTypes?: { ... }
    }>
  }
  tasks: Array<{
    id: string
    schema?: string
    label?: string
    description?: {
      kind: { ... }
      fields: { ... }
    }
  }>
}
```

### `MappingRootDescription`

What the caller knows about a root (`RootDescription` of `@epilot/entity-mapping-validator`)

```ts
type MappingRootDescription = {
  kind: "declared" | "inferred"
  fields: Array<{
    path: string | number[]
    label?: string
    type?: "string" | "number" | "boolean" | "date" | "object" | "array" | "entity"
    children?: { ... }[]
    open?: boolean
    targetTypes?: string[]
  }>
}
```

### `MappingRootField`

```ts
type MappingRootField = {
  path: string | number[]
  label?: string
  type?: "string" | "number" | "boolean" | "date" | "object" | "array" | "entity"
  children?: { ... }[]
  open?: boolean
  targetTypes?: string[]
}
```

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
      use_uniqueness_criteria?: { ... }
      loop_config?: { ... }
      conditionMode?: { ... }
      conditions?: { ... }
      mapping_attributes: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
      graph_context?: { ... }
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
      org_id?: { ... }
      user_id?: { ... }
    }
    org_id?: string
    version?: number
  }>
  truncated?: boolean
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
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }>
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  last_updated_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  org_id?: string
  version?: number
}>
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
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }>
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  last_updated_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  org_id?: string
  version?: number
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
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }>
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  last_updated_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  org_id?: string
  version?: number
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
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }>
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
  last_updated_by?: {
    type: "user" | "internal_service"
    org_id?: string
    user_id?: string
  }
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
      target_entity_tags?: { ... }
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
  outputs?: Record<string, Array<{
    entity_id: string
    entity_schema?: string
  }>>
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
  loop_ref?: {
    entity_id: string
    entity_schema?: string
  }
  targets: Array<{
    id?: string
    name?: string
    allow_failure?: boolean
    target_schema: string
    target_unique?: string[]
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }>
  outputs?: Record<string, Array<{
    entity_id: string
    entity_schema?: string
  }>>
  output_ids?: string[]
}
```

### `PreviewTarget`

What one target would write, in preview mode with `output_ids`

```ts
type PreviewTarget = {
  index: number
  output_id?: string
  mapped_entities: Array<{
    _id: string
    _schema: string
    _title?: string
    _org: string
    _tags?: string[]
    _created_at: string
    _updated_at: string
  }>
  failure?: {
    target?: {
      id?: { ... }
      name?: { ... }
      allow_failure?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
      use_uniqueness_criteria?: { ... }
      loop_config?: { ... }
      conditionMode?: { ... }
      conditions?: { ... }
      mapping_attributes: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
      graph_context?: { ... }
    }
    error?: {
      isSilent?: { ... }
      message?: { ... }
    }
  }
}
```

### `OutputEntityRef`

One entity an earlier action or task produced

```ts
type OutputEntityRef = {
  entity_id: string
  entity_schema?: string
}
```

### `ExecuteMappingResp`

```ts
type ExecuteMappingResp = {
  mapped_entities: Array<{
    _id: string
    _schema: string
    _title?: string
    _org: string
    _tags?: string[]
    _created_at: string
    _updated_at: string
  }>
  failures?: Array<{
    target?: {
      id?: { ... }
      name?: { ... }
      allow_failure?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
      use_uniqueness_criteria?: { ... }
      loop_config?: { ... }
      conditionMode?: { ... }
      conditions?: { ... }
      mapping_attributes: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
      graph_context?: { ... }
    }
    error?: {
      isSilent?: { ... }
      message?: { ... }
    }
  }>
  warnings?: Array<{
    explanation: string
    context?: string
    id?: string
  }>
  preview_targets?: Array<{
    index: number
    output_id?: string
    mapped_entities: Array<{
      _id: { ... }
      _schema: { ... }
      _title?: { ... }
      _org: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
    }>
    failure?: {
      target?: { ... }
      error?: { ... }
    }
  }>
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
    use_uniqueness_criteria?: boolean
    loop_config?: {
      source_path?: { ... }
      source_type?: { ... }
      filter_tags?: { ... }
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
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      target_entity_tags?: { ... }
      override_with_source_filter?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
      origin?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    graph_context?: Array<{
      seed: { ... }
      graph: { ... }
    }>
  }
  error?: {
    isSilent?: boolean
    message?: string
  }
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
  _id: string
  _schema: string
  _title?: string
  _org: string
  _tags?: string[]
  _created_at: string
  _updated_at: string
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
  use_uniqueness_criteria?: boolean
  loop_config?: {
    source_path?: string
    source_type?: "journey-multi-select" | "journey-file-upload"
    filter_tags?: string[]
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
    target: string
    operation: {
      _set?: { ... }
      _append?: { ... }
      _prepend?: { ... }
      _uniq?: { ... }
      _retain_old_values?: { ... }
      _copy?: { ... }
      _template?: { ... }
      _random?: { ... }
      _each?: { ... }
      _as?: { ... }
      _map?: { ... }
    } | string | boolean | number | Record<string, unknown> | unknown[]
    origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
  } | {
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
  }>
  relation_attributes?: Array<{
    target: string
    target_tags?: string[]
    target_tags_include_source?: boolean
    target_entity_tags?: string[]
    override_with_source_filter?: boolean
    source_filter?: {
      limit?: { ... }
      schema?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      output_of?: { ... }
      tag?: { ... }
      self?: { ... }
    }
    related_to?: Record<string, unknown>
    mode: "append" | "prepend" | "set"
    origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
  }>
  linkback_relation_attribute?: string
  linkback_relation_tags?: string[]
  graph_context?: Array<{
    seed: {
      entity_id: { ... }
      node_id: { ... }
    }
    graph: {
      nodes: { ... }
      edges: { ... }
    }
  }>
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
  target_entity_tags?: string[]
  override_with_source_filter?: boolean
  source_filter?: {
    limit?: number
    schema?: string
    attribute?: string
    relation_tag?: string
    output_of?: string
    tag?: string
    self?: boolean
  }
  related_to?: Record<string, unknown>
  mode: "append" | "prepend" | "set"
  origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
}
```

### `GraphContextEntry`

One multi-hop graph lookup against entity-api's `POST /v1/entity:graph`, resolved during
graph_context enrichment (before mapping_attributes are evaluated). Every node in `graph.nodes`
is merged into sourceContext under its own `id`, so listing several nodes here costs one
entity-api call, not one p

```ts
type GraphContextEntry = {
  seed: {
    entity_id: string
    node_id: string
  }
  graph: {
    nodes: Array<{
      id: { ... }
      schema: { ... }
      cardinality?: { ... }
      fields?: { ... }
      filter?: { ... }
      optional?: { ... }
    }>
    edges: Array<{
      from: { ... }
      to: { ... }
    }>
  }
}
```

### `GraphSeed`

Mirrors entity-api's GraphSeed (see entity-api openapi.yml) - the entity the graph traversal starts from.

```ts
type GraphSeed = {
  entity_id: string
  node_id: string
}
```

### `GraphDefinition`

Mirrors entity-api's GraphDefinition (see entity-api openapi.yml) - the shape of the graph to traverse.

```ts
type GraphDefinition = {
  nodes: Array<{
    id: string
    schema: string
    cardinality?: "one" | "many"
    fields?: string[]
    filter?: Array<{
      attribute: { ... }
      value: { ... }
    }>
    optional?: boolean
  }>
  edges: Array<{
    from: string
    to: string
  }>
}
```

### `GraphNode`

Mirrors entity-api's GraphNode (see entity-api openapi.yml).

```ts
type GraphNode = {
  id: string
  schema: string
  cardinality?: "one" | "many"
  fields?: string[]
  filter?: Array<{
    attribute: string
    value: string | number | boolean
  }>
  optional?: boolean
}
```

### `GraphNodeFilter`

Mirrors entity-api's GraphNodeFilter (see entity-api openapi.yml).

```ts
type GraphNodeFilter = {
  attribute: string
  value: string | number | boolean
}
```

### `GraphEdge`

Mirrors entity-api's GraphEdge (see entity-api openapi.yml).

```ts
type GraphEdge = {
  from: string
  to: string
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
    _each?: string
    _as?: string
    _map?: { ... }
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
  _each?: string
  _as?: string
  _map?: { ... }
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
  _each?: string
  _as?: string
  _map?: { ... } | string | boolean | number | Record<string, unknown> | unknown[]
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

### `MappingSource`

```ts
type MappingSource = {
  key: string
  block_id?: string
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
    target_entity_tags?: string[]
    override_with_source_filter?: boolean
    source_filter?: {
      limit?: { ... }
      schema?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      output_of?: { ... }
      tag?: { ... }
      self?: { ... }
    }
    related_to?: Record<string, unknown>
    mode: "append" | "prepend" | "set"
    origin?: "system_recommendation" | "user_manually" | "entity_updating_system_recommendation"
  }
  title: string
  sub_title?: string
  repeatable?: boolean
  target_settings?: {
    allowed_ui_actions?: "schema-select" | "attribute-select" | "target-delete" | "target-add" | "target"[]
    locked?: "each" | "first" | "system_recommendation"
    isSingleTarget?: boolean
    visibility?: {
      mode: { ... }
      if: { ... }
      message?: { ... }
    }
  }
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

### `JourneyContextUsagesReq`

```ts
type JourneyContextUsagesReq = {
  journey_id: string // uuid
  param_keys: string[]
  param_ids?: string[]
}
```

### `JourneyContextUsage`

```ts
type JourneyContextUsage = {
  kind: "entity-mapping"
  resource: {
    type: "mapping"
    id: string
  }
  location?: {
    target_schema?: string
    attribute?: string
  }
  matched_as: {
    dialect: "name"
    token: string
    at: string
  }
}
```

### `JourneyContextUsagesResp`

```ts
type JourneyContextUsagesResp = {
  usages: Array<{
    kind: "entity-mapping"
    resource: {
      type: { ... }
      id: { ... }
    }
    location?: {
      target_schema?: { ... }
      attribute?: { ... }
    }
    matched_as: {
      dialect: { ... }
      token: { ... }
      at: { ... }
    }
  }>
  status: "ok" | "partial"
  scanned: number
}
```
