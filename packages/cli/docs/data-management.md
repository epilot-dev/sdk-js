# Data Management API

**API Name:** `data-management`
**Base URL:** `https://data-management.sls.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `queryEntities` | POST | `/data-management/v1/{entity_schema}/query` | Query entities using a saved view with additional data filters |
| `createJob` | POST | `/data-management/v1/{entity_schema}/jobs` | Create a new job run |
| `updateJob` | PATCH | `/data-management/v1/{entity_schema}/jobs/{job_id}` | Update an existing job run |
| `getJob` | GET | `/data-management/v1/jobs/{job_id}` | Get a job by id |
| `getJobReportUrl` | GET | `/data-management/v1/jobs/{job_id}/report-url` | Get report download URL for a job |
| `getConfig` | GET | `/data-management/v1/configs/{config_id}` | Get a config by id |
| `createJobForConfig` | POST | `/data-management/v1/configs/{config_id}/jobs` | Trigger a manual job run for a config |
| `upsertConfig` | POST | `/data-management/v1/{entity_schema}/configs` | Upsert config |
| `listConfigs` | GET | `/data-management/v1/configs` | List configs |
| `listJobs` | GET | `/data-management/v1/jobs` | List jobs |

## Usage

```bash
epilot data-management queryEntities
```
