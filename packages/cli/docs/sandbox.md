# Sandbox API

**API Name:** `sandbox`
**Base URL:** `https://sandbox.sls.epilot.io`

API to set up pipeline connections between epilot orgs to sync and promote configurations (from sandbox to production an

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listPipelines` | GET | `/v1/sandbox/pipelines` | listPipelines |
| `createPipeline` | POST | `/v1/sandbox/pipelines` | createPipeline |
| `getPipeline` | GET | `/v1/sandbox/pipelines/{pipeline_id}` | getPipeline |
| `deletePipeline` | DELETE | `/v1/sandbox/pipelines/{pipeline_id}` | deletePipeline |
| `generatePipelineToken` | GET | `/v1/sandbox/pipelines/{pipeline_id}/token` | generatePipelineToken |
| `requestSandbox` | POST | `/v1/sandbox:request` | requestSandbox |
| `listSandboxRequests` | GET | `/v1/sandbox/requests` | listSandboxRequests |

## Usage

```bash
epilot sandbox listPipelines
```
