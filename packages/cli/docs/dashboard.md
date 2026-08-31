# Dashboard API

- **Base URL:** `https://dashboard.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/dashboard](https://docs.epilot.io/api/dashboard)

API to store the dashboard configuration for the epilot 360 dashboard

## Quick Start

```bash
# List available operations
epilot dashboard

# Call an operation
epilot dashboard listDashboards
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

**Dashboards**
- [`listDashboards`](#listdashboards) — List dashboards available to the user
- [`createDashboard`](#createdashboard) — Create new dashboard
- [`listFavoriteDashboardIds`](#listfavoritedashboardids) — Returns the current user's favorited dashboard ids, with no dashboard metadata. Lets a
- [`favoriteDashboard`](#favoritedashboard) — Marks the dashboard as favorited by the current user. Idempotent — favoriting an
- [`unfavoriteDashboard`](#unfavoritedashboard) — Removes the current user's favorite for the dashboard. Idempotent — unfavoriting a
- [`getDashboard`](#getdashboard) — Get dashboard by ID
- [`putDashboard`](#putdashboard) — Update a dashboard by ID
- [`patchDashboard`](#patchdashboard) — Partially update a dashboard by ID. Update content (title/tiles) and/or manage sharing
- [`deleteDashboard`](#deletedashboard) — Delete a dashboard by ID

**Insights**
- [`listInsights`](#listinsights) — List insights (saved charts) available to the user
- [`createInsight`](#createinsight) — Create a new insight (saved chart). The caller becomes the owner.
- [`listInsightTags`](#listinsighttags) — List the distinct tags used by insights in the organization (for filter facets)
- [`getInsight`](#getinsight) — Get insight by ID
- [`putInsight`](#putinsight) — Replace an insight's content by ID. Sharing is managed via patchInsight.
- [`patchInsight`](#patchinsight) — Partially update an insight by ID. Update content (name/description/visualisation/tags) and/or
- [`deleteInsight`](#deleteinsight) — Delete an insight by ID. Only owners may delete.

**Visualisations**
- [`listAvailableVisualisations`](#listavailablevisualisations) — Returns list of available Visualisations to configure new dashboard tiles

**Examples**
- [`listAvailableExamples`](#listavailableexamples) — Returns list of available exampless for visualisations to configure new dashboard tiles

### `listDashboards`

List dashboards available to the user

`GET /v1/dashboard/dashboards`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `q` | query | string | No | Free-text search over name/title and description (case-insensitive substring). |
| `created_by` | query | string | No | Filter by the id of the creating user. |
| `created_after` | query | string (date-time) | No |  |
| `created_before` | query | string (date-time) | No |  |
| `updated_after` | query | string (date-time) | No |  |
| `updated_before` | query | string (date-time) | No |  |
| `shared_with` | query | string[] | No | Filter to resources shared with any of the given user ids. |
| `owner` | query | string[] | No | Filter to resources owned by any of the given user ids. |
| `accessible_to` | query | string | No | Filter to resources the given user id may view (owner, shared, org-wide or legacy). |
| `favorite` | query | boolean | No | Dashboards only. Filter to only (`true`) or exclude (`false`) the requesting user's
favorited dashboards. A user with zero favorites and `favorite=true` gets an empty page,
not the unfiltered list.
 |
| `favorites_first` | query | boolean | No | Dashboards only. No filtering — sorts the requesting user's favorited dashboards first,
preserving the existing secondary ordering (`sort`/`order`) otherwise.
 |
| `sort` | query | "created_at" \| "updated_at" \| "name" \| "title" | No | Field to sort by. `name` and `title` are aliases for the resource's display name and are normalised per resource: dashboards sort by `title` and insights by `name`, whichever of the two values is sent |
| `order` | query | "asc" \| "desc" | No | Sort direction. Defaults to ascending (preserving the pre-migration order). |
| `limit` | query | number | No | Maximum results to return (max 200). Omit to return all matching results (pagination is opt-in). |
| `offset` | query | number | No | Number of results to skip, for pagination. Use with limit (page N = offset N*limit). |

**Sample Call**

```bash
epilot dashboard listDashboards
```

With JSONata filter:

```bash
epilot dashboard listDashboards --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "created_by": "10598",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "10598",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "owner_org_id": "739224",
      "owners": ["10598"],
      "shared_with": [
        {
          "user_id": "10598",
          "permission": "view"
        }
      ],
      "org_access": "view",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "Employee Dashboard",
      "tiles": [
        {
          "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
          "coordinates": {},
          "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
        }
      ],
      "favorited": false
    }
  ],
  "pagination": {
    "total": 0,
    "limit": 0,
    "offset": 0,
    "has_more": true
  }
}
```

</details>

---

### `createDashboard`

Create new dashboard

`POST /v1/dashboard/dashboards`

**Request Body**

**Sample Call**

```bash
epilot dashboard createDashboard
```

With request body:

```bash
epilot dashboard createDashboard \
  -d '{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}'
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard createDashboard
```

With JSONata filter:

```bash
epilot dashboard createDashboard --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}
```

</details>

---

### `listFavoriteDashboardIds`

Returns the current user's favorited dashboard ids, with no dashboard metadata. Lets a

`GET /v1/dashboard/dashboards/favorites`

**Sample Call**

```bash
epilot dashboard listFavoriteDashboardIds
```

With JSONata filter:

```bash
epilot dashboard listFavoriteDashboardIds --jsonata 'dashboard_ids'
```

<details>
<summary>Sample Response</summary>

```json
{
  "dashboard_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  "total": 0
}
```

</details>

---

### `favoriteDashboard`

Marks the dashboard as favorited by the current user. Idempotent — favoriting an

`PUT /v1/dashboard/dashboards/{id}/favorite`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard favoriteDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard favoriteDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard favoriteDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

---

### `unfavoriteDashboard`

Removes the current user's favorite for the dashboard. Idempotent — unfavoriting a

`DELETE /v1/dashboard/dashboards/{id}/favorite`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard unfavoriteDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard unfavoriteDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard unfavoriteDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

---

### `getDashboard`

Get dashboard by ID

`GET /v1/dashboard/dashboards/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard getDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard getDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard getDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}
```

</details>

---

### `putDashboard`

Update a dashboard by ID

`PUT /v1/dashboard/dashboards/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot dashboard putDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With request body:

```bash
epilot dashboard putDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 \
  -d '{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}'
```

Using positional args for path parameters:

```bash
epilot dashboard putDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard putDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard putDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}
```

</details>

---

### `patchDashboard`

Partially update a dashboard by ID. Update content (title/tiles) and/or manage sharing

`PATCH /v1/dashboard/dashboards/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot dashboard patchDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With request body:

```bash
epilot dashboard patchDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 \
  -d '{
  "owners": ["string"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "title": "Number of opportunities created by journeys every month",
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
      "visualisation_id": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "dimensions": [
            {
              "time_with_granularity": "year-month"
            }
          ],
          "filters": [
            {
              "entity_schema": "opportunity"
            }
          ]
        },
        "options": {
          "type": "bar"
        }
      }
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot dashboard patchDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard patchDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard patchDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}
```

</details>

---

### `deleteDashboard`

Delete a dashboard by ID

`DELETE /v1/dashboard/dashboards/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard deleteDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard deleteDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard deleteDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
    }
  ],
  "favorited": false
}
```

</details>

---

### `listInsights`

List insights (saved charts) available to the user

`GET /v1/dashboard/insights`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `q` | query | string | No | Free-text search over name/title and description (case-insensitive substring). |
| `visualisation_id` | query | "kpi" \| "funnel" \| "toplist" \| "timechart" \| "pie" \| "bar" \| "entity_list" \| "markdown" \| "news_feed" \| "workflow"[] | No | Filter insights by one or more visualisation ids. |
| `tags` | query | string[] | No | Filter by one or more tags (see tags_match for any/all semantics). |
| `tags_match` | query | "any" \| "all" | No | Whether a result must match any (default) or all of the given tags. |
| `created_by` | query | string | No | Filter by the id of the creating user. |
| `created_after` | query | string (date-time) | No |  |
| `created_before` | query | string (date-time) | No |  |
| `updated_after` | query | string (date-time) | No |  |
| `updated_before` | query | string (date-time) | No |  |
| `shared_with` | query | string[] | No | Filter to resources shared with any of the given user ids. |
| `owner` | query | string[] | No | Filter to resources owned by any of the given user ids. |
| `accessible_to` | query | string | No | Filter to resources the given user id may view (owner, shared, org-wide or legacy). |
| `sort` | query | "created_at" \| "updated_at" \| "name" \| "title" | No | Field to sort by. `name` and `title` are aliases for the resource's display name and are normalised per resource: dashboards sort by `title` and insights by `name`, whichever of the two values is sent |
| `order` | query | "asc" \| "desc" | No | Sort direction. Defaults to ascending (preserving the pre-migration order). |
| `limit` | query | number | No | Maximum results to return (max 200). Omit to return all matching results (pagination is opt-in). |
| `offset` | query | number | No | Number of results to skip, for pagination. Use with limit (page N = offset N*limit). |

**Sample Call**

```bash
epilot dashboard listInsights
```

With JSONata filter:

```bash
epilot dashboard listInsights --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "created_by": "10598",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "10598",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "owner_org_id": "739224",
      "owners": ["10598"],
      "shared_with": [
        {
          "user_id": "10598",
          "permission": "view"
        }
      ],
      "org_access": "view",
      "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
      "name": "Opportunities created by journeys every month",
      "description": "Monthly count of opportunities grouped by source journey",
      "visualisation_id": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "dimensions": [
            {
              "time_with_granularity": "year-month"
            }
          ],
          "filters": [
            {
              "entity_schema": "opportunity"
            }
          ]
        },
        "options": {
          "type": "bar"
        }
      },
      "tags": ["revenue", "marketing"]
    }
  ],
  "pagination": {
    "total": 0,
    "limit": 0,
    "offset": 0,
    "has_more": true
  }
}
```

</details>

---

### `createInsight`

Create a new insight (saved chart). The caller becomes the owner.

`POST /v1/dashboard/insights`

**Request Body**

**Sample Call**

```bash
epilot dashboard createInsight
```

With request body:

```bash
epilot dashboard createInsight \
  -d '{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard createInsight
```

With JSONata filter:

```bash
epilot dashboard createInsight --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}
```

</details>

---

### `listInsightTags`

List the distinct tags used by insights in the organization (for filter facets)

`GET /v1/dashboard/insights/tags`

**Sample Call**

```bash
epilot dashboard listInsightTags
```

With JSONata filter:

```bash
epilot dashboard listInsightTags --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": ["string"]
}
```

</details>

---

### `getInsight`

Get insight by ID

`GET /v1/dashboard/insights/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard getInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

Using positional args for path parameters:

```bash
epilot dashboard getInsight 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With JSONata filter:

```bash
epilot dashboard getInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}
```

</details>

---

### `putInsight`

Replace an insight's content by ID. Sharing is managed via patchInsight.

`PUT /v1/dashboard/insights/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot dashboard putInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With request body:

```bash
epilot dashboard putInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e \
  -d '{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}'
```

Using positional args for path parameters:

```bash
epilot dashboard putInsight 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard putInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With JSONata filter:

```bash
epilot dashboard putInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}
```

</details>

---

### `patchInsight`

Partially update an insight by ID. Update content (name/description/visualisation/tags) and/or

`PATCH /v1/dashboard/insights/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot dashboard patchInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With request body:

```bash
epilot dashboard patchInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e \
  -d '{
  "owners": ["string"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "name": "string",
  "description": "string",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}'
```

Using positional args for path parameters:

```bash
epilot dashboard patchInsight 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard patchInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With JSONata filter:

```bash
epilot dashboard patchInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}
```

</details>

---

### `deleteInsight`

Delete an insight by ID. Only owners may delete.

`DELETE /v1/dashboard/insights/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot dashboard deleteInsight \
  -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

Using positional args for path parameters:

```bash
epilot dashboard deleteInsight 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
```

With JSONata filter:

```bash
epilot dashboard deleteInsight -p id=8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created_by": "10598",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "10598",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "owner_org_id": "739224",
  "owners": ["10598"],
  "shared_with": [
    {
      "user_id": "10598",
      "permission": "view"
    }
  ],
  "org_access": "view",
  "id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e",
  "name": "Opportunities created by journeys every month",
  "description": "Monthly count of opportunities grouped by source journey",
  "visualisation_id": "timechart",
  "visualisation_config": {
    "query": {
      "dataset": "entity_operations",
      "measure": "count_operations",
      "dimensions": [
        {
          "time_with_granularity": "year-month"
        }
      ],
      "filters": [
        {
          "entity_schema": "opportunity"
        }
      ]
    },
    "options": {
      "type": "bar"
    }
  },
  "tags": ["revenue", "marketing"]
}
```

</details>

---

### `listAvailableVisualisations`

Returns list of available Visualisations to configure new dashboard tiles

`GET /v1/dashboard/visualisations`

**Sample Call**

```bash
epilot dashboard listAvailableVisualisations
```

With JSONata filter:

```bash
epilot dashboard listAvailableVisualisations --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "visualisation": "timechart",
      "title": "Time Series Visualisation",
      "description": "Visualise your metrics with respect to time series",
      "package_name": "@epilot360/highcharts"
    },
    {
      "visualisation": "kpi",
      "title": "KPI Visualisation",
      "description": "Visualise your key performance indicators",
      "package_name": "@epilot360/kpi"
    }
  ]
}
```

</details>

---

### `listAvailableExamples`

Returns list of available exampless for visualisations to configure new dashboard tiles

`GET /v1/dashboard/examples`

**Sample Call**

```bash
epilot dashboard listAvailableExamples
```

With JSONata filter:

```bash
epilot dashboard listAvailableExamples --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "title": "Number of opportunities created by journeys every month",
      "visualisation": "timechart",
      "query": {
        "dataset": "entity_operations",
        "measure": "count_operations",
        "dimensions": [
          {
            "time_with_granularity": "year-month"
          }
        ],
        "filters": [
          {
            "entity_schema": "opportunity"
          }
        ]
      }
    }
  ]
}
```

</details>

---
