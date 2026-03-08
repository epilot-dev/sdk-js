# Kanban API

**Base URL:** `https://kanban.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/kanban](https://docs.epilot.io/api/kanban)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.kanban.createKanbanBoard(...)

// Or get the client explicitly
const kanbanClient = await epilot.kanban.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/kanban'

const kanbanClient = await getClient()
authorize(kanbanClient, () => '<token>')
const { data } = await kanbanClient.createKanbanBoard(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/kanban'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Kanban**
- [`createKanbanBoard`](#createkanbanboard)
- [`getKanbanBoards`](#getkanbanboards)
- [`getKanbanBoard`](#getkanbanboard)
- [`updateKanbanBoard`](#updatekanbanboard)
- [`patchKanbanBoard`](#patchkanbanboard)
- [`deleteKanbanBoard`](#deletekanbanboard)
- [`setDefaultKanbanBoard`](#setdefaultkanbanboard)
- [`clearDefaultKanbanBoard`](#cleardefaultkanbanboard)

**Query**
- [`flowsAutocomplete`](#flowsautocomplete)
- [`executeFlowsQuery`](#executeflowsquery)

### `createKanbanBoard`

Create a Kanban board

`POST /v1/kanban/board`

```ts
const { data } = await client.createKanbanBoard(
  null,
  {
    id: 'string',
    title: 'Board 1',
    description: 'Board description',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: 'string',
    org_id: 'string',
    updated_by: 'string',
    shared_with: [
      'string'
    ],
    shared_with_org: true,
    owners: [
      'string'
    ],
    config: {
      dataset: 'workflow_tasks_overview',
      swimlanes: [
        { /* ... */ }
      ],
      card_config: {
        fields: [ /* ... */ ]
      },
      board_filter: {
        items: [ /* ... */ ],
        combination: 'OR'
      },
      sorting: {
        field: 'created_at',
        direction: 'asc'
      },
      search_query: 'task 1'
    }
  },
)
```

**Response**

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
  "shared_with": [
    "string"
  ],
  "shared_with_org": true,
  "owners": [
    "string"
  ],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {}
    ],
    "card_config": {
      "fields": []
    },
    "board_filter": {
      "items": [],
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

---

### `getKanbanBoards`

Get all Kanban boards

`GET /v1/kanban/boards`

```ts
const { data } = await client.getKanbanBoards({
  filter: 'example',
})
```

**Response**

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
    "shared_with": [
      "string"
    ],
    "shared_with_org": true,
    "owners": [
      "string"
    ]
  }
]
```

---

### `getKanbanBoard`

Get a Kanban board

`GET /v1/kanban/board/{boardId}`

```ts
const { data } = await client.getKanbanBoard({
  boardId: 'example',
})
```

**Response**

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
  "shared_with": [
    "string"
  ],
  "shared_with_org": true,
  "owners": [
    "string"
  ],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {}
    ],
    "card_config": {
      "fields": []
    },
    "board_filter": {
      "items": [],
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

---

### `updateKanbanBoard`

Update a Kanban board

`PUT /v1/kanban/board/{boardId}`

```ts
const { data } = await client.updateKanbanBoard(
  {
    boardId: 'example',
  },
  {
    id: 'string',
    title: 'Board 1',
    description: 'Board description',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: 'string',
    org_id: 'string',
    updated_by: 'string',
    shared_with: [
      'string'
    ],
    shared_with_org: true,
    owners: [
      'string'
    ],
    config: {
      dataset: 'workflow_tasks_overview',
      swimlanes: [
        { /* ... */ }
      ],
      card_config: {
        fields: [ /* ... */ ]
      },
      board_filter: {
        items: [ /* ... */ ],
        combination: 'OR'
      },
      sorting: {
        field: 'created_at',
        direction: 'asc'
      },
      search_query: 'task 1'
    }
  },
)
```

**Response**

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
  "shared_with": [
    "string"
  ],
  "shared_with_org": true,
  "owners": [
    "string"
  ],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {}
    ],
    "card_config": {
      "fields": []
    },
    "board_filter": {
      "items": [],
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

---

### `patchKanbanBoard`

Patch a Kanban board

`PATCH /v1/kanban/board/{boardId}`

```ts
const { data } = await client.patchKanbanBoard(
  {
    boardId: 'example',
  },
  {
    title: 'Board 1',
    description: 'Board description',
    shared_with: [
      'string'
    ],
    shared_with_org: true,
    owners: [
      'string'
    ]
  },
)
```

**Response**

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
  "shared_with": [
    "string"
  ],
  "shared_with_org": true,
  "owners": [
    "string"
  ],
  "config": {
    "dataset": "workflow_tasks_overview",
    "swimlanes": [
      {}
    ],
    "card_config": {
      "fields": []
    },
    "board_filter": {
      "items": [],
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

---

### `deleteKanbanBoard`

Delete a Kanban board

`DELETE /v1/kanban/board/{boardId}`

```ts
const { data } = await client.deleteKanbanBoard({
  boardId: 'example',
})
```

---

### `setDefaultKanbanBoard`

Set default board for organization

`PUT /v1/kanban/org/default-board`

```ts
const { data } = await client.setDefaultKanbanBoard({
  boardId: 'example',
})
```

**Response**

```json
{
  "message": "string",
  "default_board_id": "string"
}
```

---

### `clearDefaultKanbanBoard`

Clear default board for organization

`DELETE /v1/kanban/org/default-board`

```ts
const { data } = await client.clearDefaultKanbanBoard()
```

**Response**

```json
{
  "message": "string",
  "default_board_id": "string"
}
```

---

### `flowsAutocomplete`

Autocomplete flows data

`GET /v1/kanban/query/flows:autocomplete`

```ts
const { data } = await client.flowsAutocomplete({
  input: 'example',
  attribute: 'example',
  size: 1,
  from: 1,
})
```

**Response**

```json
{
  "results": [
    "value"
  ],
  "hits": 42
}
```

---

### `executeFlowsQuery`

Query Flows Data for Kanban View.

`POST /v1/kanban/query/flows:execute`

```ts
const { data } = await client.executeFlowsQuery(
  null,
  {
    filters: {
      items: [
        { /* ... */ }
      ],
      combination: 'OR'
    },
    sorting: {
      field: 'created_at',
      direction: 'asc'
    },
    from: 0,
    size: 10
  },
)
```

**Response**

```json
{
  "results": [
    {}
  ],
  "hits": 0,
  "page_number": 0,
  "page_size": 0,
  "total_pages": 0
}
```

---

## Schemas

### `BoardSummary`

```ts
type BoardSummary = {
  id?: string
  title?: string
  description?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: string
  org_id?: string
  updated_by?: string
  shared_with?: string[]
  shared_with_org?: boolean
  owners?: string[]
}
```

### `Board`

```ts
type Board = {
  id?: string
  title: string
  description?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: string
  org_id?: string
  updated_by?: string
  shared_with?: string[]
  shared_with_org?: boolean
  owners?: string[]
  config: {
    dataset?: string
    swimlanes?: Array<{
      id?: { ... }
      title?: { ... }
      position?: { ... }
      filter?: { ... }
      title_chip_variant?: { ... }
    }>
    card_config?: {
      fields?: { ... }
    }
    board_filter?: {
      items: { ... }
      combination: { ... }
    }
    sorting?: {
      field: { ... }
  // ...
}
```

### `Swimlane`

```ts
type Swimlane = {
  id?: string
  title?: string
  position?: number
  filter?: {
    items: Array<{
      key: { ... }
      operator: { ... }
      value?: { ... }
      data_type?: { ... }
    } | {
      items: { ... }
      combination: { ... }
    }>
    combination: "AND" | "OR"
  }
  title_chip_variant?: string
}
```

### `Sorting`

```ts
type Sorting = {
  field: string
  direction?: "asc" | "desc"
}
```

### `BoardFilter`

```ts
type BoardFilter = {
  items: Array<{
    key: string
    operator: "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL"
    value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean[]
    data_type?: "string" | "number" | "boolean" | "date"
  } | {
    items: Array<{
      key: { ... }
      operator: { ... }
      value?: { ... }
      data_type?: { ... }
    }>
    combination: "AND" | "OR"
  }>
  combination: "AND" | "OR"
}
```

### `FilterGroup`

```ts
type FilterGroup = {
  items: Array<{
    key: string
    operator: "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL"
    value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean[]
    data_type?: "string" | "number" | "boolean" | "date"
  }>
  combination: "AND" | "OR"
}
```

### `FilterOperator`

The comparison operator for filtering

```ts
type FilterOperator = "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL"
```

### `DynamicDateValue`

Dynamic date keywords that resolve to actual dates at runtime

```ts
type DynamicDateValue = "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH"
```

### `ValueType`

The value to compare against - can be a single value (string, number, boolean, or dynamic date) or an array of values

```ts
type ValueType = string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean[]
```

### `FlowsQueryRequest`

```ts
type FlowsQueryRequest = {
  filters?: {
    items: Array<{
      key: { ... }
      operator: { ... }
      value?: { ... }
      data_type?: { ... }
    } | {
      items: { ... }
      combination: { ... }
    }>
    combination: "AND" | "OR"
  }
  sorting?: {
    field: string
    direction?: "asc" | "desc"
  }
  from?: number
  size?: number
}
```

### `FlowsQueryResult`

```ts
type FlowsQueryResult = {
  results?: Record<string, unknown>[]
  hits?: number
  page_number?: number
  page_size?: number
  total_pages?: number
}
```

### `FilterItem`

```ts
type FilterItem = {
  key: string
  operator: "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL"
  value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | number | boolean[]
  data_type?: "string" | "number" | "boolean" | "date"
}
```
