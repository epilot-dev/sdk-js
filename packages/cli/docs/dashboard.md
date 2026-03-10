# Dashboard API

**API Name:** `dashboard`
**Base URL:** `https://dashboard.sls.epilot.io`

API to store the dashboard configuration for the epilot 360 dashboard


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listDashboards` | GET | `/v1/dashboard/dashboards` | listDashboards |
| `createDashboard` | POST | `/v1/dashboard/dashboards` | createDashboard |
| `getDashboard` | GET | `/v1/dashboard/dashboards/{id}` | getDashboard |
| `putDashboard` | PUT | `/v1/dashboard/dashboards/{id}` | putDashboard |
| `deleteDashboard` | DELETE | `/v1/dashboard/dashboards/{id}` | deleteDashboard |
| `listAvailableVisualisations` | GET | `/v1/dashboard/visualisations` | listAvailableVisualisations |
| `listAvailableExamples` | GET | `/v1/dashboard/examples` | listAvailableExamples |

## Usage

```bash
epilot dashboard listDashboards
```
