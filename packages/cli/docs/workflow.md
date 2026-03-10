# Workflows Executions

**API Name:** `workflow`
**Base URL:** `https://workflows-execution.sls.epilot.io`

Service for Workflow Executions which covers executions of processes defined in an Organization


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getExecutions` | GET | `/v1/workflows/executions` | getExecutions |
| `createExecution` | POST | `/v1/workflows/executions` | createExecution |
| `getExecution` | GET | `/v1/workflows/executions/{executionId}` | getExecution |
| `updateExecution` | PATCH | `/v1/workflows/executions/{executionId}` | updateExecution |
| `deleteExecution` | DELETE | `/v1/workflows/executions/{executionId}` | deleteExecution |
| `createStep` | POST | `/v1/workflows/executions/{executionId}/steps` | createStep |
| `updateStep` | PATCH | `/v1/workflows/executions/{executionId}/steps/{stepId}` | updateStep |
| `deleteStep` | DELETE | `/v1/workflows/executions/{executionId}/steps/{stepId}` | deleteStep |
| `searchExecutions` | POST | `/v1/workflows/executions/search` | searchExecutions |
| `searchSteps` | POST | `/v1/workflows/executions/steps/search` | searchSteps |
| `getClosingReasonExecution` | GET | `/v1/workflows/executions/{executionId}/closing-reasons` | getClosingReasonExecution |
| `startFlowExecution` | POST | `/v2/flows/executions` | startFlowExecution |
| `getFlowExecution` | GET | `/v2/flows/executions/{execution_id}` | getFlowExecution |
| `patchFlowExecution` | PATCH | `/v2/flows/executions/{execution_id}` | patchFlowExecution |
| `deleteFlowExecution` | DELETE | `/v2/flows/executions/{execution_id}` | deleteFlowExecution |
| `searchFlowExecutions` | POST | `/v2/flows/executions:search` | searchFlowExecutions |
| `patchTask` | PATCH | `/v2/flows/executions/{execution_id}/tasks/{task_id}` | patchTask |
| `runTaskAutomation` | POST | `/v2/flows/executions/{execution_id}/tasks/{task_id}/automation:run` | runTaskAutomation |
| `executeTask` | POST | `/v2/flows/executions/{execution_id}/tasks/{task_id}/execute` | executeTask |
| `patchPhase` | PATCH | `/v2/flows/executions/{execution_id}/phases/{phase_id}` | patchPhase |
| `addTask` | POST | `/v2/flows/executions/{execution_id}/tasks` | addTask |
| `cancelTaskSchedule` | DELETE | `/v2/flows/executions/{execution_id}/tasks/{task_id}/schedule` | cancelTaskSchedule |
| `cancelSchedule` | POST | `/v2/flows/executions/{execution_id}/schedules/{schedule_id}` | cancelSchedule |

## Usage

```bash
epilot workflow getExecutions
```
