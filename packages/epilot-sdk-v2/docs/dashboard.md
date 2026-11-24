# Dashboard API

- **Base URL:** `https://dashboard.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/dashboard](https://docs.epilot.io/api/dashboard)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.dashboard.listDashboards(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/dashboard'

const dashboardClient = getClient()
authorize(dashboardClient, () => '<token>')
const { data } = await dashboardClient.listDashboards(...)
```

## Operations

**Dashboards**
- [`listDashboards`](#listdashboards)
- [`createDashboard`](#createdashboard)
- [`getDashboardQuota`](#getdashboardquota)
- [`listFavoriteDashboardIds`](#listfavoritedashboardids)
- [`favoriteDashboard`](#favoritedashboard)
- [`unfavoriteDashboard`](#unfavoritedashboard)
- [`getDashboard`](#getdashboard)
- [`putDashboard`](#putdashboard)
- [`patchDashboard`](#patchdashboard)
- [`deleteDashboard`](#deletedashboard)

**Insights**
- [`listInsights`](#listinsights)
- [`createInsight`](#createinsight)
- [`listInsightTags`](#listinsighttags)
- [`getInsight`](#getinsight)
- [`putInsight`](#putinsight)
- [`patchInsight`](#patchinsight)
- [`deleteInsight`](#deleteinsight)

**Visualisations**
- [`listAvailableVisualisations`](#listavailablevisualisations)

**Examples**
- [`listAvailableExamples`](#listavailableexamples)

**Schemas**
- [`DashboardQuota`](#dashboardquota)
- [`Error`](#error)
- [`QuotaError`](#quotaerror)
- [`DashboardID`](#dashboardid)
- [`Dashboard`](#dashboard)
- [`DashboardTileID`](#dashboardtileid)
- [`SharePermission`](#sharepermission)
- [`ShareGrant`](#sharegrant)
- [`OrgAccess`](#orgaccess)
- [`AccessControl`](#accesscontrol)
- [`AccessControlUpdate`](#accesscontrolupdate)
- [`DashboardPatch`](#dashboardpatch)
- [`InsightID`](#insightid)
- [`Insight`](#insight)
- [`InsightPatch`](#insightpatch)
- [`Tags`](#tags)
- [`Pagination`](#pagination)
- [`DashboardTile`](#dashboardtile)
- [`DashboardFilter`](#dashboardfilter)
- [`DashboardTileFilterSettings`](#dashboardtilefiltersettings)
- [`VisualisationConfig`](#visualisationconfig)
- [`timechartVisualisationConfig`](#timechartvisualisationconfig)
- [`ExampleID`](#exampleid)
- [`Example`](#example)
- [`DatalakeQuery`](#datalakequery)
- [`VisualisationId`](#visualisationid)
- [`Visualisation`](#visualisation)

### `listDashboards`

List dashboards available to the user

`GET /v1/dashboard/dashboards`

```ts
const { data } = await client.listDashboards({
  q: 'example',
  created_by: 'example',
  created_after: 'example',
  created_before: 'example',
  updated_after: 'example',
  updated_before: 'example',
  shared_with: ['...'],
  owner: ['...'],
  accessible_to: 'example',
  favorite: true,
  favorites_first: true,
  sort: 'example',
  order: 'example',
  limit: 1,
  offset: 1,
})
```

<details>
<summary>Response</summary>

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
      "filters": [
        {
          "id": "time_range",
          "kind": "time_range",
          "label": "Zeitraum",
          "default_value": {
            "preset": "last_30_days"
          }
        },
        {
          "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
          "kind": "dimension",
          "label": "Status",
          "field": "current_opportunities.status",
          "field_type": "string",
          "operator": "in",
          "default_value": ["won"]
        }
      ],
      "favorited": false,
      "version": 2
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

Create new dashboard.
Tiles that only reference an insight (`insight_id`) need no further permission. A tile with an
inline `visualisation_id`/`visualisation_config` (with or without `insight_id`) aut

`POST /v1/dashboard/dashboards`

```ts
const { data } = await client.createDashboard(
  null,
  {
    created_by: '10598',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_by: '10598',
    updated_at: '1970-01-01T00:00:00.000Z',
    owner_org_id: '739224',
    owners: ['10598'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'Employee Dashboard',
    tiles: [
      {
        id: 'e4af1297-1fd6-440f-9846-f475f580d40f',
        coordinates: {},
        insight_id: '8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e'
      }
    ],
    filters: [
      {
        id: 'time_range',
        kind: 'time_range',
        label: 'Zeitraum',
        default_value: {
          preset: 'last_30_days'
        }
      },
      {
        id: '6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f',
        kind: 'dimension',
        label: 'Status',
        field: 'current_opportunities.status',
        field_type: 'string',
        operator: 'in',
        default_value: ['won']
      }
    ],
    favorited: false,
    version: 2
  },
)
```

<details>
<summary>Response</summary>

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
  "filters": [
    {
      "id": "time_range",
      "kind": "time_range",
      "label": "Zeitraum",
      "default_value": {
        "preset": "last_30_days"
      }
    },
    {
      "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
      "kind": "dimension",
      "label": "Status",
      "field": "current_opportunities.status",
      "field_type": "string",
      "operator": "in",
      "default_value": ["won"]
    }
  ],
  "favorited": false,
  "version": 2
}
```

</details>

---

### `getDashboardQuota`

Current dashboard quota and usage for the caller's organization, so a client can show the
limit before a write is attempted rather than discovering it on a 403.

`GET /v1/dashboard/dashboards/quota`

```ts
const { data } = await client.getDashboardQuota()
```

<details>
<summary>Response</summary>

```json
{
  "dashboards": {
    "limit": 10,
    "current": 3
  },
  "tiles_per_dashboard": {
    "limit": 20
  },
  "tier": "Professional"
}
```

</details>

---

### `listFavoriteDashboardIds`

Returns the current user's favorited dashboard ids, with no dashboard metadata. Lets a
client decide whether to default to a favorites-only view without first fetching the full
dashboards list.

`GET /v1/dashboard/dashboards/favorites`

```ts
const { data } = await client.listFavoriteDashboardIds()
```

<details>
<summary>Response</summary>

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
already-favorited dashboard is not an error. Requires only view-level access to the
dashboard (unlike the edit-level ch

`PUT /v1/dashboard/dashboards/{id}/favorite`

```ts
const { data } = await client.favoriteDashboard({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `unfavoriteDashboard`

Removes the current user's favorite for the dashboard. Idempotent — unfavoriting a
dashboard that was not favorited is not an error, and neither is unfavoriting one that no
longer exists or is no long

`DELETE /v1/dashboard/dashboards/{id}/favorite`

```ts
const { data } = await client.unfavoriteDashboard({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getDashboard`

Get dashboard by ID

`GET /v1/dashboard/dashboards/{id}`

```ts
const { data } = await client.getDashboard({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
  "filters": [
    {
      "id": "time_range",
      "kind": "time_range",
      "label": "Zeitraum",
      "default_value": {
        "preset": "last_30_days"
      }
    },
    {
      "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
      "kind": "dimension",
      "label": "Status",
      "field": "current_opportunities.status",
      "field_type": "string",
      "operator": "in",
      "default_value": ["won"]
    }
  ],
  "favorited": false,
  "version": 2
}
```

</details>

---

### `putDashboard`

Update a dashboard by ID.
Tiles that only reference an insight (`insight_id`) need no further permission, and unchanged
tiles with an inline `visualisation_id`/`visualisation_config` are kept as they 

`PUT /v1/dashboard/dashboards/{id}`

```ts
const { data } = await client.putDashboard(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    created_by: '10598',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_by: '10598',
    updated_at: '1970-01-01T00:00:00.000Z',
    owner_org_id: '739224',
    owners: ['10598'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'Employee Dashboard',
    tiles: [
      {
        id: 'e4af1297-1fd6-440f-9846-f475f580d40f',
        coordinates: {},
        insight_id: '8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e'
      }
    ],
    filters: [
      {
        id: 'time_range',
        kind: 'time_range',
        label: 'Zeitraum',
        default_value: {
          preset: 'last_30_days'
        }
      },
      {
        id: '6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f',
        kind: 'dimension',
        label: 'Status',
        field: 'current_opportunities.status',
        field_type: 'string',
        operator: 'in',
        default_value: ['won']
      }
    ],
    favorited: false,
    version: 2
  },
)
```

<details>
<summary>Response</summary>

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
  "filters": [
    {
      "id": "time_range",
      "kind": "time_range",
      "label": "Zeitraum",
      "default_value": {
        "preset": "last_30_days"
      }
    },
    {
      "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
      "kind": "dimension",
      "label": "Status",
      "field": "current_opportunities.status",
      "field_type": "string",
      "operator": "in",
      "default_value": ["won"]
    }
  ],
  "favorited": false,
  "version": 2
}
```

</details>

---

### `patchDashboard`

Partially update a dashboard by ID. Update content (title/tiles/filters) and/or manage sharing
(owners, shared_with, org_access) — only owners may change sharing.
`owners` and `shared_with` replace th

`PATCH /v1/dashboard/dashboards/{id}`

```ts
const { data } = await client.patchDashboard(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    owners: ['string'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    title: 'Employee Dashboard',
    tiles: [
      {
        id: 'e4af1297-1fd6-440f-9846-f475f580d40f',
        coordinates: {},
        title: 'Number of opportunities created by journeys every month',
        insight_id: '8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e',
        visualisation_id: 'timechart',
        visualisation_config: {
          query: {
            dataset: 'entity_operations',
            measure: 'count_operations',
            dimensions: [
              {
                time_with_granularity: 'year-month'
              }
            ],
            filters: [
              {
                entity_schema: 'opportunity'
              }
            ]
          },
          options: {
            type: 'bar'
          }
        },
        filter_settings: {
          bindings: {
            time_range: {
              field: 'current_opportunities._created_at'
            },
            '6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f': {
              ignore: true
            }
          }
        }
      }
    ],
    filters: [
      {
        id: 'time_range',
        kind: 'dimension',
        label: 'Status',
        field: 'current_opportunities.status',
        field_type: 'string',
        operator: 'in',
        default_value: ['won']
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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
  "filters": [
    {
      "id": "time_range",
      "kind": "time_range",
      "label": "Zeitraum",
      "default_value": {
        "preset": "last_30_days"
      }
    },
    {
      "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
      "kind": "dimension",
      "label": "Status",
      "field": "current_opportunities.status",
      "field_type": "string",
      "operator": "in",
      "default_value": ["won"]
    }
  ],
  "favorited": false,
  "version": 2
}
```

</details>

---

### `deleteDashboard`

Delete a dashboard by ID

`DELETE /v1/dashboard/dashboards/{id}`

```ts
const { data } = await client.deleteDashboard({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
  "filters": [
    {
      "id": "time_range",
      "kind": "time_range",
      "label": "Zeitraum",
      "default_value": {
        "preset": "last_30_days"
      }
    },
    {
      "id": "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
      "kind": "dimension",
      "label": "Status",
      "field": "current_opportunities.status",
      "field_type": "string",
      "operator": "in",
      "default_value": ["won"]
    }
  ],
  "favorited": false,
  "version": 2
}
```

</details>

---

### `listInsights`

List insights (saved charts) available to the user

`GET /v1/dashboard/insights`

```ts
const { data } = await client.listInsights({
  q: 'example',
  visualisation_id: ['...'],
  tags: ['...'],
  tags_match: 'example',
  created_by: 'example',
  created_after: 'example',
  created_before: 'example',
  updated_after: 'example',
  updated_before: 'example',
  shared_with: ['...'],
  owner: ['...'],
  accessible_to: 'example',
  sort: 'example',
  order: 'example',
  limit: 1,
  offset: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createInsight(
  null,
  {
    created_by: '10598',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_by: '10598',
    updated_at: '1970-01-01T00:00:00.000Z',
    owner_org_id: '739224',
    owners: ['10598'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    id: '8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e',
    name: 'Opportunities created by journeys every month',
    description: 'Monthly count of opportunities grouped by source journey',
    visualisation_id: 'timechart',
    visualisation_config: {
      query: {
        dataset: 'entity_operations',
        measure: 'count_operations',
        dimensions: [
          {
            time_with_granularity: 'year-month'
          }
        ],
        filters: [
          {
            entity_schema: 'opportunity'
          }
        ]
      },
      options: {
        type: 'bar'
      }
    },
    tags: ['revenue', 'marketing']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listInsightTags()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getInsight({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putInsight(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    created_by: '10598',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_by: '10598',
    updated_at: '1970-01-01T00:00:00.000Z',
    owner_org_id: '739224',
    owners: ['10598'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    id: '8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e',
    name: 'Opportunities created by journeys every month',
    description: 'Monthly count of opportunities grouped by source journey',
    visualisation_id: 'timechart',
    visualisation_config: {
      query: {
        dataset: 'entity_operations',
        measure: 'count_operations',
        dimensions: [
          {
            time_with_granularity: 'year-month'
          }
        ],
        filters: [
          {
            entity_schema: 'opportunity'
          }
        ]
      },
      options: {
        type: 'bar'
      }
    },
    tags: ['revenue', 'marketing']
  },
)
```

<details>
<summary>Response</summary>

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
manage sharing (owners, shared_with, org_access) — only owners may change sharing.
`owners` and `shared_w

`PATCH /v1/dashboard/insights/{id}`

```ts
const { data } = await client.patchInsight(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    owners: ['string'],
    shared_with: [
      {
        user_id: '10598',
        permission: 'view'
      }
    ],
    org_access: 'view',
    name: 'string',
    description: 'string',
    visualisation_id: 'timechart',
    visualisation_config: {
      query: {
        dataset: 'entity_operations',
        measure: 'count_operations',
        dimensions: [
          {
            time_with_granularity: 'year-month'
          }
        ],
        filters: [
          {
            entity_schema: 'opportunity'
          }
        ]
      },
      options: {
        type: 'bar'
      }
    },
    tags: ['revenue', 'marketing']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteInsight({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listAvailableVisualisations()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listAvailableExamples()
```

<details>
<summary>Response</summary>

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

## Schemas

### `DashboardQuota`

```ts
type DashboardQuota = {
  dashboards: {
    limit: number
    current: number
  }
  tiles_per_dashboard: {
    limit: number
  }
  tier?: string
}
```

### `Error`

```ts
type Error = {
  status: number
  error: string
}
```

### `QuotaError`

```ts
type QuotaError = {
  status: number
  error: string
  code: "DASHBOARD_LIMIT_EXCEEDED" | "TILE_LIMIT_EXCEEDED"
  limit?: number
  current?: number
  tier?: string
}
```

### `DashboardID`

Unique identifier for dashboard

```ts
type DashboardID = string // uuid
```

### `Dashboard`

A dashboard configuration. A dashboard is a canvas whose tiles arrange and
position insights (saved charts). Tiles may reference an insight by `insight_id`
or, for backwards compatibility, embed a visualisation inline.


```ts
type Dashboard = {
  created_by?: string
  created_at?: string // date-time
  updated_by?: string
  updated_at?: string // date-time
  owner_org_id?: string
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
  id?: string // uuid
  title: string
  tiles: Array<{
    id?: string // uuid
    coordinates?: object
    title?: string
    insight_id?: string // uuid
    visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
    visualisation_config?: {
      query?: { ... }
      options?: { ... }
    }
    filter_settings?: {
      bindings?: { ... }
    }
  }>
  filters?: Array<{
    id: string
    kind: "time_range" | "dimension"
    label?: string
    field?: string
    field_type?: string
    operator?: string
    default_value?: string | number | boolean | unknown[] | Record<string, unknown> | null
  }>
  favorited?: boolean
  version?: number
}
```

### `DashboardTileID`

Unique identifier for a tile in a dashboard

```ts
type DashboardTileID = string // uuid
```

### `SharePermission`

Permission level granted to a user (or the whole organization) on a shared resource.
`view` allows read-only access; `edit` additionally allows updating the content.
Full control (delete and managing sharing) is reserved for owners.


```ts
type SharePermission = "view" | "edit"
```

### `ShareGrant`

Grants a single user a permission level on a resource

```ts
type ShareGrant = {
  user_id: string
  permission: "view" | "edit"
}
```

### `OrgAccess`

Optional organization-wide grant. When set, every user in the resource's organization
is granted this permission level. `null` (or omitted) means the resource is not shared
org-wide.


```ts
type OrgAccess = "view" | "edit" | null
```

### `AccessControl`

Ownership and sharing metadata common to dashboards and insights. `created_*`/`updated_*`
fields are managed by the server. `owners`, `shared_with` and `org_access` describe who
may access the resource. New resources are private to their creator until shared.


```ts
type AccessControl = {
  created_by?: string
  created_at?: string // date-time
  updated_by?: string
  updated_at?: string // date-time
  owner_org_id?: string
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
}
```

### `AccessControlUpdate`

Sharing fields that can be mutated via PATCH (owners only). `owners` and `shared_with` are
full replacements of their arrays, not merges — omit a field to leave it unchanged.


```ts
type AccessControlUpdate = {
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
}
```

### `DashboardPatch`

Fields that can be partially updated on a dashboard

```ts
type DashboardPatch = {
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
  title?: string
  tiles?: Array<{
    id?: string // uuid
    coordinates?: object
    title?: string
    insight_id?: string // uuid
    visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
    visualisation_config?: {
      query?: { ... }
      options?: { ... }
    }
    filter_settings?: {
      bindings?: { ... }
    }
  }>
  filters?: Array<{
    id: string
    kind: "time_range" | "dimension"
    label?: string
    field?: string
    field_type?: string
    operator?: string
    default_value?: string | number | boolean | unknown[] | Record<string, unknown> | null
  }>
}
```

### `InsightID`

Unique identifier for an insight (a saved chart / visualisation)

```ts
type InsightID = string // uuid
```

### `Insight`

An insight is a saved, reusable chart definition (a visualisation plus its query/options).
Insights exist independently of dashboards: they can be created, shared and edited on their
own, and referenced by one or more dashboard tiles via `insight_id`.


```ts
type Insight = {
  created_by?: string
  created_at?: string // date-time
  updated_by?: string
  updated_at?: string // date-time
  owner_org_id?: string
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
  id?: string // uuid
  name: string
  description?: string
  visualisation_id: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
  visualisation_config?: {
    query?: {
      dataset?: { ... }
      measure?: { ... }
      dimensions?: { ... }
      filters?: { ... }
    }
    options?: Record<string, unknown>
  }
  tags?: string[]
}
```

### `InsightPatch`

Fields that can be partially updated on an insight

```ts
type InsightPatch = {
  owners?: string[]
  shared_with?: Array<{
    user_id: string
    permission: "view" | "edit"
  }>
  org_access?: "view" | "edit" | null
  name?: string
  description?: string
  visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
  visualisation_config?: {
    query?: {
      dataset?: { ... }
      measure?: { ... }
      dimensions?: { ... }
      filters?: { ... }
    }
    options?: Record<string, unknown>
  }
  tags?: string[]
}
```

### `Tags`

Free-form labels for grouping and filtering insights

```ts
type Tags = string[]
```

### `Pagination`

Offset-based pagination metadata for list responses

```ts
type Pagination = {
  total: number
  limit: number
  offset: number
  has_more: boolean
}
```

### `DashboardTile`

A positioned tile on a dashboard canvas. A tile references a saved insight via
`insight_id`. Inline `visualisation_id`/`visualisation_config` remain supported for
backwards compatibility (ad-hoc tiles that are not backed by a shared insight).


```ts
type DashboardTile = {
  id?: string // uuid
  coordinates?: object
  title?: string
  insight_id?: string // uuid
  visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
  visualisation_config?: {
    query?: {
      dataset?: { ... }
      measure?: { ... }
      dimensions?: { ... }
      filters?: { ... }
    }
    options?: Record<string, unknown>
  }
  filter_settings?: {
    bindings?: Record<string, {
      field?: { ... }
      ignore?: { ... }
    }>
  }
}
```

### `DashboardFilter`

Definition of a global dashboard filter: a control shown above the tiles that narrows the
tiles it applies to. Only the definition and its default are stored — the values a viewer
picks while looking at the dashboard are client-local and never stored here. Stored and
returned exactly as sent, includ

```ts
type DashboardFilter = {
  id: string
  kind: "time_range" | "dimension"
  label?: string
  field?: string
  field_type?: string
  operator?: string
  default_value?: string | number | boolean | unknown[] | Record<string, unknown> | null
}
```

### `DashboardTileFilterSettings`

How a tile takes part in its dashboard's global filters (`Dashboard.filters`). Stored and
returned exactly as sent.


```ts
type DashboardTileFilterSettings = {
  bindings?: Record<string, {
    field?: string
    ignore?: boolean
  }>
}
```

### `VisualisationConfig`

```ts
type VisualisationConfig = {
  query?: {
    dataset?: string
    measure?: string
    dimensions?: Record<string, unknown>[]
    filters?: Record<string, unknown>[]
  }
  options?: Record<string, unknown>
}
```

### `timechartVisualisationConfig`

```ts
type timechartVisualisationConfig = {
  query?: {
    dataset?: string
    measure?: string
    dimensions?: Record<string, unknown>[]
    filters?: Record<string, unknown>[]
  }
  options?: Record<string, unknown>
}
```

### `ExampleID`

Unique identifier for a visualisation examples for tiles in a dashboard

```ts
type ExampleID = string // uuid
```

### `Example`

```ts
type Example = {
  id?: string // uuid
  title?: string
  visualisation?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
  query?: {
    dataset?: string
    measure?: string
    dimensions?: Record<string, unknown>[]
    filters?: Record<string, unknown>[]
  }
}
```

### `DatalakeQuery`

```ts
type DatalakeQuery = {
  dataset?: string
  measure?: string
  dimensions?: Record<string, unknown>[]
  filters?: Record<string, unknown>[]
}
```

### `VisualisationId`

Unique identifier for a Visualisation

```ts
type VisualisationId = "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
```

### `Visualisation`

A Visualisation that can be used to configure tiles in dashboards

```ts
type Visualisation = {
  visualisation?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow" | "notes"
  title?: string
  description?: string
  package_name?: string
  import_url?: string // uri
}
```
