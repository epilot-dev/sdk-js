# Kanban API

- **Base URL:** `https://kanban.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/kanban](https://docs.epilot.io/api/kanban)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.kanban.createKanbanBoard(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/kanban'

const kanbanClient = getClient()
authorize(kanbanClient, () => '<token>')
const { data } = await kanbanClient.createKanbanBoard(...)
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

**Schemas**
- [`Error`](#error)
- [`BoardSummary`](#boardsummary)
- [`Board`](#board)
- [`Swimlane`](#swimlane)
- [`Sorting`](#sorting)
- [`GroupBy`](#groupby)
- [`BoardFilter`](#boardfilter)
- [`FilterGroup`](#filtergroup)
- [`FilterOperator`](#filteroperator)
- [`DynamicDateValue`](#dynamicdatevalue)
- [`ValueType`](#valuetype)
- [`FlowsQueryRequest`](#flowsqueryrequest)
- [`FlowsQueryResult`](#flowsqueryresult)
- [`FilterItem`](#filteritem)

### `createKanbanBoard`

Creates a new Kanban board with the provided configuration.

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
    shared_with: ['string'],
    shared_with_org: true,
    owners: ['string'],
    config: {
      dataset: 'workflow_tasks_overview',
      swimlanes: [
        {
          id: 'string',
          title: 'Swimlane 1',
          position: 1,
          filter: {
            items: [
              {
                key: 'assignee',
                operator: 'EQUALS',
                value: '100020',
                data_type: 'string'
              }
            ],
            combination: 'OR'
          },
          title_chip_variant: 'success'
        }
      ],
      card_config: {
        fields: ['assignee']
      },
      board_filter: {
        items: [
          {
            key: 'assignee',
            operator: 'EQUALS',
            value: '100020',
            data_type: 'string'
          }
        ],
        combination: 'OR'
      },
      sorting: {
        field: 'created_at',
        direction: 'asc'
      },
      group_by: {
        field: 'context_entity'
      },
      search_query: 'task 1'
    }
  },
)
```

<details>
<summary>Response</summary>

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
    "group_by": {
      "field": "context_entity"
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

```ts
const { data } = await client.getKanbanBoards({
  filter: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getKanbanBoard({
  boardId: 'example',
})
```

<details>
<summary>Response</summary>

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
    "group_by": {
      "field": "context_entity"
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
    shared_with: ['string'],
    shared_with_org: true,
    owners: ['string'],
    config: {
      dataset: 'workflow_tasks_overview',
      swimlanes: [
        {
          id: 'string',
          title: 'Swimlane 1',
          position: 1,
          filter: {
            items: [
              {
                key: 'assignee',
                operator: 'EQUALS',
                value: '100020',
                data_type: 'string'
              }
            ],
            combination: 'OR'
          },
          title_chip_variant: 'success'
        }
      ],
      card_config: {
        fields: ['assignee']
      },
      board_filter: {
        items: [
          {
            key: 'assignee',
            operator: 'EQUALS',
            value: '100020',
            data_type: 'string'
          }
        ],
        combination: 'OR'
      },
      sorting: {
        field: 'created_at',
        direction: 'asc'
      },
      group_by: {
        field: 'context_entity'
      },
      search_query: 'task 1'
    }
  },
)
```

<details>
<summary>Response</summary>

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
    "group_by": {
      "field": "context_entity"
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

```ts
const { data } = await client.patchKanbanBoard(
  {
    boardId: 'example',
  },
  {
    title: 'Board 1',
    description: 'Board description',
    shared_with: ['string'],
    shared_with_org: true,
    owners: ['string']
  },
)
```

<details>
<summary>Response</summary>

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
    "group_by": {
      "field": "context_entity"
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

```ts
const { data } = await client.deleteKanbanBoard({
  boardId: 'example',
})
```

---

### `setDefaultKanbanBoard`

Sets a Kanban board as the default board for the organization.

`PUT /v1/kanban/org/default-board`

```ts
const { data } = await client.setDefaultKanbanBoard({
  boardId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.clearDefaultKanbanBoard()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.flowsAutocomplete({
  input: 'example',
  attribute: 'example',
  size: 1,
  from: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeFlowsQuery(
  null,
  {
    filters: {
      items: [
        {
          key: 'assignee',
          operator: 'EQUALS',
          value: '100020',
          data_type: 'string'
        }
      ],
      combination: 'OR'
    },
    sorting: {
      field: 'created_at',
      direction: 'asc'
    },
    group_by: {
      field: 'context_entity'
    },
    from: 0,
    size: 10
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `Error`

Standard error response

```ts
type Error = {
  message?: string
  status?: number
}
```

### `BoardSummary`

Summary representation of a Kanban board, returned in list responses. Does not include swimlane and filter configuration details.

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

Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options.

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
      direction?: { ... }
    }
    group_by?: {
      field: { ... }
    }
    search_query?: string
  }
}
```

### `Swimlane`

A vertical column in a Kanban board that groups workflow tasks or entities matching its filter criteria. Each swimlane has an independent filter and a display position.

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

Defines how query results should be sorted. Specify a field name and sort direction.

```ts
type Sorting = {
  field: string
  direction?: "asc" | "desc"
}
```

### `GroupBy`

Defines how tasks should be grouped within each swimlane. Tasks with the same group value are returned adjacently in the result set.

```ts
type GroupBy = {
  field: "context_entity" | "phase"
}
```

### `BoardFilter`

A filter group containing one or more filter items or nested filter groups. Items are combined using the specified logical operator (AND/OR).

```ts
type BoardFilter = {
  items: Array<{
    key: string
    operator: "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL"
    value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean[]
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
    value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean[]
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
type DynamicDateValue = "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER"
```

### `ValueType`

The value to compare against - can be a single value (string, number, boolean, or dynamic date) or an array of values

```ts
type ValueType = string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean[]
```

### `FlowsQueryRequest`

Request payload for executing a query against the Flows dataset. Supports filter conditions, sorting, grouping, and offset-based pagination.

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
  group_by?: {
    field: "context_entity" | "phase"
  }
  from?: number
  size?: number
}
```

### `FlowsQueryResult`

Paginated result set returned from a Flows query. Each item in `results` is a workflow task record with dynamic fields depending on the dataset configuration.

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
  value?: string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean | string | "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER" | number | boolean[]
  data_type?: "string" | "number" | "boolean" | "date"
}
```
