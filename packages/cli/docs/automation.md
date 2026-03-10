# Automation API

**API Name:** `automation`
**Base URL:** `https://automation.sls.epilot.io`

API Backend for epilot Automation Workflows feature

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `searchFlows` | GET | `/v1/automation/flows` | searchFlows |
| `createFlow` | POST | `/v1/automation/flows` | createFlow |
| `batchGetFlows` | POST | `/v1/automation/flows:batchGet` | batchGetFlows |
| `getFlow` | GET | `/v1/automation/flows/{flow_id}` | getFlow |
| `putFlow` | PUT | `/v1/automation/flows/{flow_id}` | putFlow |
| `deleteFlow` | DELETE | `/v1/automation/flows/{flow_id}` | deleteFlow |
| `getExecutions` | GET | `/v1/automation/executions` | getExecutions |
| `startExecution` | POST | `/v1/automation/executions` | startExecution |
| `bulkTriggerExecutions` | POST | `/v1/automation/executions/bulk-jobs` | bulkTriggerExecutions |
| `getBulkJob` | GET | `/v1/automation/executions/bulk-jobs/{job_id}` | getBulkJob |
| `patchBulkJob` | PATCH | `/v1/automation/executions/bulk-jobs/{job_id}` | patchBulkJob |
| `getExecution` | GET | `/v1/automation/executions/{execution_id}` | getExecution |
| `cancelExecution` | DELETE | `/v1/automation/executions/{execution_id}` | cancelExecution |
| `retriggerAction` | POST | `/v1/automation/executions/{execution_id}/{action_id}/retrigger` | retriggerAction |
| `resumeExecutionWithToken` | POST | `/v1/automation/public/executions:resume` | resumeExecutionWithToken |
| `cancelSchedule` | DELETE | `/v1/automation/executions/{execution_id}/schedules/{schedule_id}` | cancelSchedule |

## Usage

```bash
epilot automation searchFlows
```
