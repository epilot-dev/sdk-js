# Kanban API

- **Base URL:** `https://kanban.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/kanban](https://docs.epilot.io/api/kanban)

The Kanban API provides board management and data query capabilities for epilot's Kanban view feature.

## Quick Start

```bash
# List available operations
epilot kanban

# Call an operation
epilot kanban createKanbanBoard
```

## Operations

**Kanban**
- [`createKanbanBoard`](#createkanbanboard) — Creates a new Kanban board with the provided configuration.
- [`getKanbanBoards`](#getkanbanboards) — Returns a list of all Kanban boards accessible to the authenticated user.
- [`getKanbanBoard`](#getkanbanboard) — Retrieves a Kanban board by ID, including its full configuration (swimlanes, filters, sorting, card fields).
- [`updateKanbanBoard`](#updatekanbanboard) — Fully replaces the configuration of an existing Kanban board by ID.
- [`patchKanbanBoard`](#patchkanbanboard) — Partially updates fields of an existing Kanban board by ID.
- [`deleteKanbanBoard`](#deletekanbanboard) — Permanently deletes a Kanban board by ID. This action is irreversible.
- [`setDefaultKanbanBoard`](#setdefaultkanbanboard) — Sets a Kanban board as the default board for the organization.
- [`clearDefaultKanbanBoard`](#cleardefaultkanbanboard) — Removes the default board configuration for the organization.

**Query**
- [`flowsAutocomplete`](#flowsautocomplete) — Returns autocomplete suggestions for a given attribute in the Flows dataset.
- [`executeFlowsQuery`](#executeflowsquery) — Executes a query against the Flows dataset and returns paginated results for use in Kanban card rendering.

### `createKanbanBoard`

Creates a new Kanban board with the provided configuration.

`POST /v1/kanban/board`

**Request Body** (required)

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
epilot kanban createKanbanBoard
```

With request body:

```bash
epilot kanban createKanbanBoard \
  -d '{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot kanban createKanbanBoard
```

With JSONata filter:

```bash
epilot kanban createKanbanBoard --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}
```

</details>

---

### `getKanbanBoards`

Returns a list of all Kanban boards accessible to the authenticated user.

`GET /v1/kanban/boards`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `filter` | query | "owned" \| "shared" | No | Filter boards by ownership type. If not provided, returns all accessible boards. |

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
epilot kanban getKanbanBoards
```

With JSONata filter:

```bash
epilot kanban getKanbanBoards --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "title": "Board 1",
    "description": "Board description",
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z",
    "created_by": "string",
    "org_id": "string",
    "updated_by": "string",
    "shared_with": ["string"],
    "shared_with_org": true,
    "owners": ["string"]
  }
]
```

</details>

---

### `getKanbanBoard`

Retrieves a Kanban board by ID, including its full configuration (swimlanes, filters, sorting, card fields).

`GET /v1/kanban/board/{boardId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `boardId` | path | string | Yes | The board ID, or "default" to get the organization's default board.
 |

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
epilot kanban getKanbanBoard \
  -p boardId=board-123
```

Using positional args for path parameters:

```bash
epilot kanban getKanbanBoard board-123
```

With JSONata filter:

```bash
epilot kanban getKanbanBoard -p boardId=board-123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}
```

</details>

---

### `updateKanbanBoard`

Fully replaces the configuration of an existing Kanban board by ID.

`PUT /v1/kanban/board/{boardId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `boardId` | path | string | Yes | The ID of the board to update. |

**Request Body** (required)

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
epilot kanban updateKanbanBoard \
  -p boardId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot kanban updateKanbanBoard \
  -p boardId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}'
```

Using positional args for path parameters:

```bash
epilot kanban updateKanbanBoard 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot kanban updateKanbanBoard -p boardId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot kanban updateKanbanBoard -p boardId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}
```

</details>

---

### `patchKanbanBoard`

Partially updates fields of an existing Kanban board by ID.

`PATCH /v1/kanban/board/{boardId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `boardId` | path | string | Yes | The ID of the board to patch. |

**Request Body** (required)

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
epilot kanban patchKanbanBoard \
  -p boardId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot kanban patchKanbanBoard \
  -p boardId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "title": "Board 1",
  "description": "Board description",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot kanban patchKanbanBoard 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot kanban patchKanbanBoard -p boardId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot kanban patchKanbanBoard -p boardId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "title": "Board 1",
  "description": "Board description",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "org_id": "string",
  "updated_by": "string",
  "shared_with": ["string"],
  "shared_with_org": true,
  "owners": ["string"],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {
        "id": "string",
        "title": "Swimlane 1",
        "position": 1,
        "filter": {
          "items": [
            {
              "key": "assignee",
              "operator": "EQUALS",
              "value": "100020",
              "data_type": "string"
            }
          ],
          "combination": "OR"
        },
        "title_chip_variant": "success"
      }
    ],
    "card_config": {
      "fields": ["assignee"]
    },
    "board_filter": {
      "items": [
        {
          "key": "assignee",
          "operator": "EQUALS",
          "value": "100020",
          "data_type": "string"
        }
      ],
      "combination": "OR"
    },
    "sorting": {
      "field": "created_at",
      "direction": "asc"
    },
    "search_query": "task 1"
  }
}
```

</details>

---

### `deleteKanbanBoard`

Permanently deletes a Kanban board by ID. This action is irreversible.

`DELETE /v1/kanban/board/{boardId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `boardId` | path | string | Yes | The ID of the board to delete. |

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
epilot kanban deleteKanbanBoard \
  -p boardId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot kanban deleteKanbanBoard 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot kanban deleteKanbanBoard -p boardId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `setDefaultKanbanBoard`

Sets a Kanban board as the default board for the organization.

`PUT /v1/kanban/org/default-board`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `boardId` | query | string | Yes | The ID of the board to set as default |

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
epilot kanban setDefaultKanbanBoard \
  -p boardId=board-abc123
```

With JSONata filter:

```bash
epilot kanban setDefaultKanbanBoard -p boardId=board-abc123 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string",
  "default_board_id": "string"
}
```

</details>

---

### `clearDefaultKanbanBoard`

Removes the default board configuration for the organization.

`DELETE /v1/kanban/org/default-board`

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
epilot kanban clearDefaultKanbanBoard
```

With JSONata filter:

```bash
epilot kanban clearDefaultKanbanBoard --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string",
  "default_board_id": "string"
}
```

</details>

---

### `flowsAutocomplete`

Returns autocomplete suggestions for a given attribute in the Flows dataset.

`GET /v1/kanban/query/flows:autocomplete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `input` | query | string | No | Typed input string to filter autocomplete suggestions |
| `attribute` | query | string | Yes | The field name to autocomplete values for |
| `size` | query | number | No | Maximum number of results to return |
| `from` | query | number | No | Starting offset for pagination |

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
epilot kanban flowsAutocomplete \
  -p attribute=name
```

With JSONata filter:

```bash
epilot kanban flowsAutocomplete -p attribute=name --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": ["value"],
  "hits": 42
}
```

</details>

---

### `executeFlowsQuery`

Executes a query against the Flows dataset and returns paginated results for use in Kanban card rendering.

`POST /v1/kanban/query/flows:execute`

**Request Body** (required)

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
epilot kanban executeFlowsQuery
```

With request body:

```bash
epilot kanban executeFlowsQuery \
  -d '{
  "filters": {
    "items": [
      {
        "key": "assignee",
        "operator": "EQUALS",
        "value": "100020",
        "data_type": "string"
      }
    ],
    "combination": "OR"
  },
  "sorting": {
    "field": "created_at",
    "direction": "asc"
  },
  "from": 0,
  "size": 10
}'
```

Using stdin pipe:

```bash
cat body.json | epilot kanban executeFlowsQuery
```

With JSONata filter:

```bash
epilot kanban executeFlowsQuery --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {}
  ],
  "hits": 42,
  "page_number": 1,
  "page_size": 10,
  "total_pages": 5
}
```

</details>

---
