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

## Operations

**Dashboards**
- [`listDashboards`](#listdashboards) — List dashboards available to the user
- [`createDashboard`](#createdashboard) — Create new dashboard
- [`getDashboard`](#getdashboard) — Get dashboard by ID
- [`putDashboard`](#putdashboard) — Update a dashboard by ID
- [`deleteDashboard`](#deletedashboard) — Delete a dashboard by ID

**Visualisations**
- [`listAvailableVisualisations`](#listavailablevisualisations) — Returns list of available Visualisations to configure new dashboard tiles

**Examples**
- [`listAvailableExamples`](#listavailableexamples) — Returns list of available exampless for visualisations to configure new dashboard tiles

### `listDashboards`

List dashboards available to the user

`GET /v1/dashboard/dashboards`

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
epilot dashboard createDashboard
```

With request body:

```bash
epilot dashboard createDashboard \
  -d '{
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot dashboard createDashboard
```

With JSONata filter:

```bash
epilot dashboard createDashboard --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

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
epilot dashboard getDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard getDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard getDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

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
epilot dashboard putDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With request body:

```bash
epilot dashboard putDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 \
  -d '{
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
epilot dashboard putDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

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
epilot dashboard deleteDashboard \
  -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6
```

Using positional args for path parameters:

```bash
epilot dashboard deleteDashboard 3fa85f64-5717-4562-b3fc-2c963f66afa6
```

With JSONata filter:

```bash
epilot dashboard deleteDashboard -p id=3fa85f64-5717-4562-b3fc-2c963f66afa6 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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
