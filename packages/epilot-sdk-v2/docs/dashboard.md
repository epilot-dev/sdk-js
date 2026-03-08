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
- [`getDashboard`](#getdashboard)
- [`putDashboard`](#putdashboard)
- [`deleteDashboard`](#deletedashboard)

**Visualisations**
- [`listAvailableVisualisations`](#listavailablevisualisations)

**Examples**
- [`listAvailableExamples`](#listavailableexamples)

**Schemas**
- [`DashboardID`](#dashboardid)
- [`Dashboard`](#dashboard)
- [`DashboardTileID`](#dashboardtileid)
- [`DashboardTile`](#dashboardtile)
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
const { data } = await client.listDashboards()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "Employee Dashboard",
      "tiles": [
        {
          "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
          "coordinates": {},
          "visualisation": "timechart",
          "visualisation_config": {
            "query": {
              "dataset": "entity_operations",
              "measure": "count_operations",
              "filters": [
                {
                  "operation": ["createEntity"]
                },
                {
                  "entity_schema": ["opportunity"]
                }
              ],
              "dimensions": [
                {
                  "time_with_granularity": "month"
                },
                {
                  "entity_attribute": "source.title"
                }
              ]
            },
            "options": {
              "type": "line"
            }
          }
        }
      ]
    }
  ]
}
```

</details>

---

### `createDashboard`

Create new dashboard

`POST /v1/dashboard/dashboards`

```ts
const { data } = await client.createDashboard(
  null,
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'Employee Dashboard',
    tiles: [
      {
        id: 'e4af1297-1fd6-440f-9846-f475f580d40f',
        coordinates: {},
        visualisation: 'timechart',
        visualisation_config: {
          query: {
            dataset: 'entity_operations',
            measure: 'count_operations',
            filters: [
              {
                operation: ['createEntity']
              },
              {
                entity_schema: ['opportunity']
              }
            ],
            dimensions: [
              {
                time_with_granularity: 'month'
              },
              {
                entity_attribute: 'source.title'
              }
            ]
          },
          options: {
            type: 'line'
          }
        }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "visualisation": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "filters": [
            {
              "operation": ["createEntity"]
            },
            {
              "entity_schema": ["opportunity"]
            }
          ],
          "dimensions": [
            {
              "time_with_granularity": "month"
            },
            {
              "entity_attribute": "source.title"
            }
          ]
        },
        "options": {
          "type": "line"
        }
      }
    }
  ]
}
```

</details>

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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "visualisation": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "filters": [
            {
              "operation": ["createEntity"]
            },
            {
              "entity_schema": ["opportunity"]
            }
          ],
          "dimensions": [
            {
              "time_with_granularity": "month"
            },
            {
              "entity_attribute": "source.title"
            }
          ]
        },
        "options": {
          "type": "line"
        }
      }
    }
  ]
}
```

</details>

---

### `putDashboard`

Update a dashboard by ID

`PUT /v1/dashboard/dashboards/{id}`

```ts
const { data } = await client.putDashboard(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'Employee Dashboard',
    tiles: [
      {
        id: 'e4af1297-1fd6-440f-9846-f475f580d40f',
        coordinates: {},
        visualisation: 'timechart',
        visualisation_config: {
          query: {
            dataset: 'entity_operations',
            measure: 'count_operations',
            filters: [
              {
                operation: ['createEntity']
              },
              {
                entity_schema: ['opportunity']
              }
            ],
            dimensions: [
              {
                time_with_granularity: 'month'
              },
              {
                entity_attribute: 'source.title'
              }
            ]
          },
          options: {
            type: 'line'
          }
        }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "visualisation": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "filters": [
            {
              "operation": ["createEntity"]
            },
            {
              "entity_schema": ["opportunity"]
            }
          ],
          "dimensions": [
            {
              "time_with_granularity": "month"
            },
            {
              "entity_attribute": "source.title"
            }
          ]
        },
        "options": {
          "type": "line"
        }
      }
    }
  ]
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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Employee Dashboard",
  "tiles": [
    {
      "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
      "coordinates": {},
      "visualisation": "timechart",
      "visualisation_config": {
        "query": {
          "dataset": "entity_operations",
          "measure": "count_operations",
          "filters": [
            {
              "operation": ["createEntity"]
            },
            {
              "entity_schema": ["opportunity"]
            }
          ],
          "dimensions": [
            {
              "time_with_granularity": "month"
            },
            {
              "entity_attribute": "source.title"
            }
          ]
        },
        "options": {
          "type": "line"
        }
      }
    }
  ]
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

### `DashboardID`

Unique identifier for dashboard

```ts
type DashboardID = string // uuid
```

### `Dashboard`

Adashboard configuration with tiles

```ts
type Dashboard = {
  id?: string // uuid
  title: string
  tiles: Array<{
    id?: string // uuid
    coordinates?: object
    title?: string
    visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow"
    visualisation_config?: {
      query?: { ... }
      options?: { ... }
    }
  }>
}
```

### `DashboardTileID`

Unique identifier for a tile in a dashboard

```ts
type DashboardTileID = string // uuid
```

### `DashboardTile`

```ts
type DashboardTile = {
  id?: string // uuid
  coordinates?: object
  title?: string
  visualisation_id?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow"
  visualisation_config?: {
    query?: {
      dataset?: { ... }
      measure?: { ... }
      dimensions?: { ... }
      filters?: { ... }
    }
    options?: Record<string, unknown>
  }
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
  visualisation?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow"
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
type VisualisationId = "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow"
```

### `Visualisation`

A Visualisation that can be used to configure tiles in dashboards

```ts
type Visualisation = {
  visualisation?: "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow"
  title?: string
  description?: string
  package_name?: string
  import_url?: string // uri
}
```
