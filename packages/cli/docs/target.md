# Target API

- **Base URL:** `https://target.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/target](https://docs.epilot.io/api/target)

This API allows managing targets.

## Quick Start

```bash
# List available operations
epilot target

# Call an operation
epilot target createTarget
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

**Target**
- [`createTarget`](#createtarget) — Create a new target entity
- [`getTarget`](#gettarget) — Read a specific target entity by a given id
- [`updateTarget`](#updatetarget) — Completly replace a specific target entity's properties by a given id and a given payload
- [`patchTarget`](#patchtarget) — Partially update a specific target entity's properties by a given id and a given payload
- [`deleteTarget`](#deletetarget) — Delete a specific target entity by a given id

### `createTarget`

Create a new target entity

`POST /v1/target`

**Request Body** (required)

**Sample Call**

```bash
epilot target createTarget
```

With request body:

```bash
epilot target createTarget \
  -d '{
  "_schema": "target",
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_tags": ["string"],
  "_purpose": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot target createTarget
```

With JSONata filter:

```bash
epilot target createTarget --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `getTarget`

Read a specific target entity by a given id

`GET /v1/target/{targetId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `targetId` | path | string (uuid) | Yes | The target id |
| `hydrate` | query | boolean | No | Hydrates entities in relations when passed true |
| `strict` | query | boolean | No | When passed true, the response will contain only fields that match the schema, with non-matching fields included in `__additional` |

**Sample Call**

```bash
epilot target getTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot target getTarget 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot target getTarget -p targetId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `updateTarget`

Completly replace a specific target entity's properties by a given id and a given payload

`PUT /v1/target/{targetId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `targetId` | path | string (uuid) | Yes | The target id |

**Request Body** (required)

**Sample Call**

```bash
epilot target updateTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot target updateTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_schema": "target",
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_tags": ["string"],
  "_purpose": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}'
```

Using positional args for path parameters:

```bash
epilot target updateTarget 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot target updateTarget -p targetId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot target updateTarget -p targetId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `patchTarget`

Partially update a specific target entity's properties by a given id and a given payload

`PATCH /v1/target/{targetId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `targetId` | path | string (uuid) | Yes | The target id |

**Request Body** (required)

**Sample Call**

```bash
epilot target patchTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot target patchTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_schema": "target",
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_tags": ["string"],
  "_purpose": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}'
```

Using positional args for path parameters:

```bash
epilot target patchTarget 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot target patchTarget -p targetId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot target patchTarget -p targetId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `deleteTarget`

Delete a specific target entity by a given id

`DELETE /v1/target/{targetId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `targetId` | path | string (uuid) | Yes | The target id |

**Sample Call**

```bash
epilot target deleteTarget \
  -p targetId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot target deleteTarget 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot target deleteTarget -p targetId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---
