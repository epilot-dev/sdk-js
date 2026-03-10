# Workflows Definitions

**API Name:** `workflow-definition`
**Base URL:** `https://workflows-definition.sls.epilot.io`

Service for Workflow Definitions for different processes inside of an Organization


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getMaxAllowedLimit` | GET | `/v1/workflows/limits/max-allowed` | getMaxAllowedLimit |
| `getDefinitions` | GET | `/v1/workflows/definitions` | getDefinitions |
| `createDefinition` | POST | `/v1/workflows/definitions` | createDefinition |
| `listFlowTemplates` | GET | `/v2/flows/templates` | listFlowTemplates |
| `createFlowTemplate` | POST | `/v2/flows/templates` | createFlowTemplate |
| `searchFlowTemplates` | POST | `/v2/flows/templates:search` | searchFlowTemplates |
| `getFlowTemplate` | GET | `/v2/flows/templates/{flowId}` | getFlowTemplate |
| `updateFlowTemplate` | PUT | `/v2/flows/templates/{flowId}` | updateFlowTemplate |
| `deleteFlowTemplate` | DELETE | `/v2/flows/templates/{flowId}` | deleteFlowTemplate |
| `duplicateFlowTemplate` | POST | `/v2/flows/templates/{flowId}/duplicate` | duplicateFlowTemplate |
| `exportFlowTemplate` | GET | `/v2/flows/templates/{flowId}/export` | exportFlowTemplate |
| `importFlowTemplate` | POST | `/v2/flows/templates/import` | importFlowTemplate |
| `getDefinition` | GET | `/v1/workflows/definitions/{definitionId}` | getDefinition |
| `updateDefinition` | PUT | `/v1/workflows/definitions/{definitionId}` | updateDefinition |
| `deleteDefinition` | DELETE | `/v1/workflows/definitions/{definitionId}` | deleteDefinition |
| `getAllClosingReasons` | GET | `/v1/workflows/closing-reasons` | getAllClosingReasons |
| `createClosingReason` | POST | `/v1/workflows/closing-reasons` | createClosingReason |
| `getClosingReason` | GET | `/v2/workflows/closing-reasons/{reasonId}` | getClosingReason |
| `updateClosingReason` | PATCH | `/v2/workflows/closing-reasons/{reasonId}` | updateClosingReason |
| `deleteClosingReason` | DELETE | `/v2/workflows/closing-reasons/{reasonId}` | deleteClosingReason |
| `getClosingReasonV1` | GET | `/v1/workflows/closing-reasons/{reasonId}` | getClosingReasonV1 |
| `changeReasonStatus` | PATCH | `/v1/workflows/closing-reasons/{reasonId}` | changeReasonStatus |
| `getWorkflowClosingReasons` | GET | `/v1/workflows/definitions/{definitionId}/closing-reasons` | getWorkflowClosingReasons |
| `setWorkflowClosingReasons` | PATCH | `/v1/workflows/definitions/{definitionId}/closing-reasons` | setWorkflowClosingReasons |

## Usage

```bash
epilot workflow-definition getMaxAllowedLimit
```
