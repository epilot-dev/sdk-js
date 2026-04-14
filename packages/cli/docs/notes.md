# Notes API

- **Base URL:** `https://notes.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/notes](https://docs.epilot.io/api/notes)

Facade API Backend for Epilot Notes feature

## Quick Start

```bash
# List available operations
epilot notes

# Call an operation
epilot notes createNote
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

**Notes**
- [`createNote`](#createnote) — Creates a new Note entry
- [`getNote`](#getnote) — Retrieves a single Note entry based on it's Entity ID
- [`updateNote`](#updatenote) — Updates an existing Note entry
- [`patchNote`](#patchnote) — Updates an existing Note entry
- [`deleteNote`](#deletenote) — Deletes a single Note entry based on it's Entity ID
- [`searchNotesByContext`](#searchnotesbycontext) — Search for a paginated list of Notes based on one or more contexts
- [`getNoteContexts`](#getnotecontexts) — Gets all the Entity and non-Entity records the Note is contextually attached to

**Pinning**
- [`pinNote`](#pinnote) — Pins a single Note entry based on it's Entity ID

**Reactions**
- [`addNoteReaction`](#addnotereaction) — Adds an emoji reaction to a note
- [`removeNoteReaction`](#removenotereaction) — Removes an emoji reaction from a note
- [`toggleNoteReactions`](#togglenotereactions) — Toggles multiple emoji reactions on a note. If a user has already reacted with an emoji, it removes the reaction. If a u

### `createNote`

Creates a new Note entry

`POST /v1/note`

**Request Body**

**Sample Call**

```bash
epilot notes createNote
```

With request body:

```bash
epilot notes createNote \
  -d '{
  "_tags": ["string"],
  "type": "string",
  "entity_id": "string",
  "parent_id": "string",
  "contexts": [
    {
      "type": "workflow_execution",
      "id": "string"
    }
  ],
  "additional_contexts": [
    {
      "type": "workflow_execution",
      "id": "string"
    }
  ],
  "content": "string",
  "attachments": ["string"],
  "read_by": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot notes createNote
```

With JSONata filter:

```bash
epilot notes createNote --jsonata 'context_entities'
```

---

### `getNote`

Retrieves a single Note entry based on it's Entity ID

`GET /v1/note/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to retrieve |
| `hydrate` | query | boolean | No | Whether to hydrate the Note's relation attributes |

**Sample Call**

```bash
epilot notes getNote \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notes getNote 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes getNote -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'context_entities'
```

---

### `updateNote`

Updates an existing Note entry

`PUT /v1/note/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to update |

**Request Body**

**Sample Call**

```bash
epilot notes updateNote \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot notes updateNote \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_id": "string",
  "_org": "string",
  "_schema": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_created_by": "string",
  "_tags": ["string"],
  "_acl": {},
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "type": "string",
  "context_entities": {
    "$relation": [
      {
        "entity_id": "string"
      }
    ]
  },
  "parent": {
    "$relation": [
      {
        "entity_id": "string"
      }
    ]
  },
  "attachments": {
    "$relation": [
      {
        "entity_id": "string"
      }
    ]
  },
  "content": "string",
  "contexts": [
    {
      "type": "workflow_execution",
      "id": "string"
    }
  ],
  "pinned_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "user_id": "string",
    "display_name": "string",
    "org_id": "string",
    "email": "string",
    "phone": "string"
  },
  "read_by": ["string"],
  "reactions": {}
}'
```

Using positional args for path parameters:

```bash
epilot notes updateNote 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notes updateNote -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes updateNote -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'context_entities'
```

---

### `patchNote`

Updates an existing Note entry

`PATCH /v1/note/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to update |

**Request Body**

**Sample Call**

```bash
epilot notes patchNote \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notes patchNote 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notes patchNote -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes patchNote -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'context_entities'
```

---

### `deleteNote`

Deletes a single Note entry based on it's Entity ID

`DELETE /v1/note/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to delete |

**Sample Call**

```bash
epilot notes deleteNote \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notes deleteNote 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes deleteNote -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `searchNotesByContext`

Search for a paginated list of Notes based on one or more contexts

`POST /v1/notes:search`

**Request Body**

**Sample Call**

```bash
epilot notes searchNotesByContext \
  -d '{"contexts":[{"type":"workflow_execution","id":"string"}],"from":0,"size":10}'
```

Using stdin pipe:

```bash
cat body.json | epilot notes searchNotesByContext
```

With JSONata filter:

```bash
epilot notes searchNotesByContext --jsonata 'results[0]'
```

---

### `pinNote`

Pins a single Note entry based on it's Entity ID

`POST /v1/note/{id}/pin`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to pin |

**Sample Call**

```bash
epilot notes pinNote \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notes pinNote 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes pinNote -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getNoteContexts`

Gets all the Entity and non-Entity records the Note is contextually attached to

`GET /v1/note/{id}/context`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to get contexts for |

**Sample Call**

```bash
epilot notes getNoteContexts \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notes getNoteContexts 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes getNoteContexts -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "type": "workflow_execution",
    "context": {
      "_id": "string",
      "_org": "string",
      "_schema": "string",
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_created_by": "string",
      "_tags": ["string"],
      "_acl": {},
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "type": "string"
    }
  }
]
```

</details>

---

### `addNoteReaction`

Adds an emoji reaction to a note

`POST /v1/note/{id}/reaction`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to add reaction to |

**Request Body**

**Sample Call**

```bash
epilot notes addNoteReaction \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"emoji":"thumbs-up"}'
```

Using positional args for path parameters:

```bash
epilot notes addNoteReaction 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notes addNoteReaction -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes addNoteReaction -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'context_entities'
```

---

### `removeNoteReaction`

Removes an emoji reaction from a note

`DELETE /v1/note/{id}/reaction/{emoji_shortcode}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to remove reaction from |
| `emoji_shortcode` | path | string | Yes | The emoji to remove from the note |

**Sample Call**

```bash
epilot notes removeNoteReaction \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p emoji_shortcode=example
```

Using positional args for path parameters:

```bash
epilot notes removeNoteReaction 123e4567-e89b-12d3-a456-426614174000 example
```

With JSONata filter:

```bash
epilot notes removeNoteReaction -p id=123e4567-e89b-12d3-a456-426614174000 -p emoji_shortcode=example --jsonata 'context_entities'
```

---

### `toggleNoteReactions`

Toggles multiple emoji reactions on a note. If a user has already reacted with an emoji, it removes the reaction. If a u

`POST /v1/note/{id}/reactions/toggle`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Entity ID of the Note entry to toggle reactions on |

**Request Body**

**Sample Call**

```bash
epilot notes toggleNoteReactions \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"emojis":["thumbs-up","heart"]}'
```

Using positional args for path parameters:

```bash
epilot notes toggleNoteReactions 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notes toggleNoteReactions -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notes toggleNoteReactions -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'context_entities'
```

---
