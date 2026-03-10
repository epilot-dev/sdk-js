# Entity Mapping API

- **Base URL:** `https://entity-mapping.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/entity-mapping](https://docs.epilot.io/api/entity-mapping)

API Backend for mapping source entity into target entities

## Quick Start

```bash
# List available operations
epilot entity-mapping

# Call an operation
epilot entity-mapping storeConfig
```

## Operations

**mappings**
- [`storeConfig`](#storeconfig) — Store new MappingConfig
- [`getConfig`](#getconfig) — Get latest version of a mapping config by id
- [`deleteConfig`](#deleteconfig) — Delete entity mapping config
- [`getAllVersions`](#getallversions) — Get all version of MappingConfig
- [`storeNewVersion`](#storenewversion) — Store new version of MappingConfig
- [`getConfigVersion`](#getconfigversion) — Get specific version of a mapping config by id & version
- [`executeMapping`](#executemapping) — Execute entity mapping based on a config
- [`searchConfigs`](#searchconfigs) — Search mapping configs
- [`queryMappingHistory`](#querymappinghistory) — Get the Mapping History
- [`executeRelations`](#executerelations) — Execute relation mapping between source entity and target entities
- [`getMappingConfig`](#getmappingconfig) — Get latest version of a mapping config by id V2
- [`putMappingConfig`](#putmappingconfig) — Stores new version of entity mapping config

### `storeConfig`

Store new MappingConfig

`POST /v1/mappings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `with_id` | query | string | No | Whether ids are part of the body or not |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping storeConfig
```

With request body:

```bash
epilot entity-mapping storeConfig \
  -d '{
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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping storeConfig
```

With JSONata filter:

```bash
epilot entity-mapping storeConfig --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping getConfig \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using positional args for path parameters:

```bash
epilot entity-mapping getConfig 70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping getConfig -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping deleteConfig \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using positional args for path parameters:

```bash
epilot entity-mapping deleteConfig 70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping deleteConfig -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping getAllVersions \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using positional args for path parameters:

```bash
epilot entity-mapping getAllVersions 70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping getAllVersions -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata 'configs'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping storeNewVersion \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

With request body:

```bash
epilot entity-mapping storeNewVersion \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 \
  -d '{
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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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
}'
```

Using positional args for path parameters:

```bash
epilot entity-mapping storeNewVersion 70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping storeNewVersion -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping storeNewVersion -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |
| `version` | path | number | Yes | Version to be loaded |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping getConfigVersion \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 \
  -p version=3
```

Using positional args for path parameters:

```bash
epilot entity-mapping getConfigVersion 70542580-2b38-4bfc-af8d-bb90102f9f47 3
```

With JSONata filter:

```bash
epilot entity-mapping getConfigVersion -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 -p version=3 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `preview_mode` | query | boolean | No | True, if you want to preview the entities which will result |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping executeMapping
```

With request body:

```bash
epilot entity-mapping executeMapping \
  -d '{
  "source_ref": {
    "entity_id": "string",
    "entity_schema": "submission"
  },
  "targets": [
    {
      "id": "string",
      "name": "string",
      "allow_failure": true,
      "target_schema": "string",
      "target_unique": ["string"],
      "loop_config": {
        "source_path": "string",
        "length": "the length of the array"
      },
      "conditionMode": "oneOf",
      "conditions": [
        {
          "_exists": {
            "source": "string",
            "value": "string"
          },
          "_equals": {
            "source": "string",
            "value": "string"
          },
          "_not_exists": {
            "source": "string",
            "value": "string"
          },
          "_any_of": {
            "source": "string",
            "value": "string"
          }
        }
      ],
      "mapping_attributes": [
        {
          "target": "_tags",
          "operation": {
            "_append": ["new", "tags"],
            "_uniq": true
          }
        },
        {
          "mode": "copy_if_exists",
          "target": "string",
          "value": {}
        }
      ],
      "relation_attributes": [
        {
          "target": "string",
          "target_tags": ["string"],
          "target_tags_include_source": false,
          "override_with_source_filter": false,
          "source_filter": {
            "limit": 0,
            "schema": "string",
            "attribute": "string",
            "relation_tag": "string",
            "tag": "string",
            "self": false
          },
          "related_to": {},
          "mode": "append",
          "origin": "system_recommendation"
        }
      ],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping executeMapping
```

With JSONata filter:

```bash
epilot entity-mapping executeMapping --jsonata 'mapped_entities'
```

<details>
<summary>Sample Response</summary>

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

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping searchConfigs \
  -d '{"source":{"type":"journey","config":{"journey_id":"string"}}}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping searchConfigs
```

With JSONata filter:

```bash
epilot entity-mapping searchConfigs --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | string (datetime) | No | filter the history from this date on |
| `to` | query | string (datetime) | No | filter the history to this date on |
| `targetEntityId` | query | string (uuid) | No |  |
| `sourceEntityId` | query | string (uuid) | No |  |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping queryMappingHistory
```

With JSONata filter:

```bash
epilot entity-mapping queryMappingHistory --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `executeRelations`

Execute relation mapping between source entity and target entities

`POST /v1/relations:execute`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping executeRelations
```

With request body:

```bash
epilot entity-mapping executeRelations \
  -d '{
  "source_ref": {
    "entity_id": "string",
    "entity_schema": "submission"
  },
  "target": {
    "main_entity_ref": {
      "entity_id": "string",
      "entity_schema": "submission"
    },
    "relation_attributes": [
      {
        "target": "string",
        "target_tags": ["string"],
        "target_tags_include_source": false,
        "override_with_source_filter": false,
        "source_filter": {
          "limit": 0,
          "schema": "string",
          "attribute": "string",
          "relation_tag": "string",
          "tag": "string",
          "self": false
        },
        "related_to": {},
        "mode": "append",
        "origin": "system_recommendation"
      }
    ],
    "linkback": {
      "attribute": "mapped_entities",
      "relation_tags": ["string"]
    }
  },
  "additional_relations": [
    {
      "entity_id": "string",
      "attribute": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping executeRelations
```

With JSONata filter:

```bash
epilot entity-mapping executeRelations --jsonata 'relations'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping getMappingConfig \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using positional args for path parameters:

```bash
epilot entity-mapping getMappingConfig 70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping getMappingConfig -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Mapping Config Id |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot entity-mapping putMappingConfig \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

With request body:

```bash
epilot entity-mapping putMappingConfig \
  -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 \
  -d '{
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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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
}'
```

Using positional args for path parameters:

```bash
epilot entity-mapping putMappingConfig 70542580-2b38-4bfc-af8d-bb90102f9f47
```

Using stdin pipe:

```bash
cat body.json | epilot entity-mapping putMappingConfig -p id=70542580-2b38-4bfc-af8d-bb90102f9f47
```

With JSONata filter:

```bash
epilot entity-mapping putMappingConfig -p id=70542580-2b38-4bfc-af8d-bb90102f9f47 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
      "loop_config": {},
      "conditionMode": "oneOf",
      "conditions": [],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
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
