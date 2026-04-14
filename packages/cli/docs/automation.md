# Automation API

- **Base URL:** `https://automation.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/automation](https://docs.epilot.io/api/automation)

API Backend for epilot Automation Workflows feature

## Quick Start

```bash
# List available operations
epilot automation

# Call an operation
epilot automation searchFlows
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

**flows**
- [`searchFlows`](#searchflows) — Search available automation flows
- [`createFlow`](#createflow) — Create new automation flow
- [`batchGetFlows`](#batchgetflows) — Get multiple automation flows by their IDs
- [`getFlow`](#getflow) — List available automation flows
- [`putFlow`](#putflow) — Update automation flow by id
- [`deleteFlow`](#deleteflow) — Update automation flow by id

**executions**
- [`getExecutions`](#getexecutions) — List automation executions
- [`startExecution`](#startexecution) — Start new automation execution
- [`getExecution`](#getexecution) — Get automation execution
- [`cancelExecution`](#cancelexecution) — Cancel automation execution
- [`retriggerAction`](#retriggeraction) — Retry a specific automation execution action which failed / is stuck.
- [`resumeExecutionWithToken`](#resumeexecutionwithtoken) — Resume a paused automation execution using a unique resume token.
- [`cancelSchedule`](#cancelschedule) — Cancel a scheduled automation

**bulk**
- [`bulkTriggerExecutions`](#bulktriggerexecutions) — Create a bulk job that triggers multiple automation executions
- [`getBulkJob`](#getbulkjob) — Get the status of a bulk job that triggers multiple automation executions
- [`patchBulkJob`](#patchbulkjob) — Approve / Cancel bulk job that triggers multiple automation executions

### `searchFlows`

Search available automation flows

`GET /v1/automation/flows`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | query | string | No | Entity Schema |
| `size` | query | number | No | Pagination: max number of results to return |
| `from` | query | number | No | Pagination: starting for results |
| `trigger_source_id` | query | string | No | Trigger source identifier |
| `include_flows` | query | boolean | No | Include flow automations in the response |

**Sample Call**

```bash
epilot automation searchFlows
```

With JSONata filter:

```bash
epilot automation searchFlows --jsonata 'results[0]'
```

---

### `createFlow`

Create new automation flow

`POST /v1/automation/flows`

**Request Body**

**Sample Call**

```bash
epilot automation createFlow
```

Using stdin pipe:

```bash
cat body.json | epilot automation createFlow
```

With JSONata filter:

```bash
epilot automation createFlow --jsonata 'id'
```

---

### `batchGetFlows`

Get multiple automation flows by their IDs

`POST /v1/automation/flows:batchGet`

**Request Body**

**Sample Call**

```bash
epilot automation batchGetFlows \
  -d '{"ids":["7791b04a-16d2-44a2-9af9-2d59c25c512f"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot automation batchGetFlows
```

With JSONata filter:

```bash
epilot automation batchGetFlows --jsonata 'results[0]'
```

---

### `getFlow`

List available automation flows

`GET /v1/automation/flows/{flow_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flow_id` | path | string | Yes | Automation Workflow ID |

**Sample Call**

```bash
epilot automation getFlow \
  -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f
```

Using positional args for path parameters:

```bash
epilot automation getFlow 7791b04a-16d2-44a2-9af9-2d59c25c512f
```

With JSONata filter:

```bash
epilot automation getFlow -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f --jsonata 'id'
```

---

### `putFlow`

Update automation flow by id

`PUT /v1/automation/flows/{flow_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flow_id` | path | string | Yes | Automation Workflow ID |

**Request Body**

**Sample Call**

```bash
epilot automation putFlow \
  -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f
```

Using positional args for path parameters:

```bash
epilot automation putFlow 7791b04a-16d2-44a2-9af9-2d59c25c512f
```

Using stdin pipe:

```bash
cat body.json | epilot automation putFlow -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f
```

With JSONata filter:

```bash
epilot automation putFlow -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f --jsonata 'id'
```

---

### `deleteFlow`

Update automation flow by id

`DELETE /v1/automation/flows/{flow_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flow_id` | path | string | Yes | Automation Workflow ID |

**Sample Call**

```bash
epilot automation deleteFlow \
  -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f
```

Using positional args for path parameters:

```bash
epilot automation deleteFlow 7791b04a-16d2-44a2-9af9-2d59c25c512f
```

With JSONata filter:

```bash
epilot automation deleteFlow -p flow_id=7791b04a-16d2-44a2-9af9-2d59c25c512f --jsonata '$'
```

---

### `getExecutions`

List automation executions

`GET /v1/automation/executions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_id` | query | string | No |  |
| `size` | query | number | No | Pagination: max number of results to return |
| `from` | query | number | No | Pagination: starting for results |
| `include_flows` | query | boolean | No | Include flow automations in the response |

**Sample Call**

```bash
epilot automation getExecutions
```

With JSONata filter:

```bash
epilot automation getExecutions --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "results": [
    {
      "id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
      "execution_status": "pending",
      "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "activity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "entity_snapshot": {},
      "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
      "flow_name": "Handle contact form",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "current_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "conditions": [],
      "schedules": [],
      "actions": [],
      "resume_token": "eyJraWQiOiJrZXkifQ==",
      "trigger_context": {},
      "version": 2,
      "trigger_event": {},
      "workflow_context": {}
    }
  ]
}
```

</details>

---

### `startExecution`

Start new automation execution

`POST /v1/automation/executions`

**Request Body**

**Sample Call**

```bash
epilot automation startExecution
```

With request body:

```bash
epilot automation startExecution \
  -d '{
  "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "workflow_context": {
    "workflow_exec_id": "string",
    "workflow_exec_task_id": "string",
    "workflow_role": "trigger_workflow",
    "_execution_chain": {
      "parent_execution_id": "string",
      "parent_task_id": "string",
      "depth": 0
    }
  },
  "flow_execution_id": "string",
  "flow_automation_task_id": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot automation startExecution
```

With JSONata filter:

```bash
epilot automation startExecution --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
  "execution_status": "pending",
  "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "activity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "entity_snapshot": {
    "_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "_title": "string",
    "_org": "string",
    "_schema": "string",
    "_tags": ["string"],
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_updated_at": "1970-01-01T00:00:00.000Z"
  },
  "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "flow_name": "Handle contact form",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "current_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
  "conditions": [
    {
      "id": "string",
      "schedule_id": "string",
      "evaluationResult": true,
      "statements": []
    }
  ],
  "schedules": [
    {
      "id": "string",
      "scheduleApiId": "string",
      "numberOfUnits": 0,
      "timePeriod": "minutes",
      "timeRelation": "after",
      "source": {}
    }
  ],
  "actions": [
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "map-entity",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    },
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "trigger-workflow",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    }
  ],
  "resume_token": "eyJraWQiOiJrZXkifQ==",
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "version": 2,
  "trigger_event": {
    "type": "manual",
    "org_id": "123",
    "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "caller": {
      "EpilotAuth": {}
    }
  },
  "workflow_context": {
    "workflow_exec_id": "string",
    "workflow_exec_task_id": "string",
    "workflow_role": "trigger_workflow",
    "_execution_chain": {
      "parent_execution_id": "string",
      "parent_task_id": "string",
      "depth": 0
    }
  }
}
```

</details>

---

### `bulkTriggerExecutions`

Create a bulk job that triggers multiple automation executions

`POST /v1/automation/executions/bulk-jobs`

**Request Body**

**Sample Call**

```bash
epilot automation bulkTriggerExecutions
```

With request body:

```bash
epilot automation bulkTriggerExecutions \
  -d '{
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "entities_refs": [
    {
      "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "entity_schema": "string"
    }
  ],
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot automation bulkTriggerExecutions
```

With JSONata filter:

```bash
epilot automation bulkTriggerExecutions --jsonata '$'
```

---

### `getBulkJob`

Get the status of a bulk job that triggers multiple automation executions

`GET /v1/automation/executions/bulk-jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot automation getBulkJob \
  -p job_id=8c086140-f33e-4bb7-a993-50c0f2402c7b
```

Using positional args for path parameters:

```bash
epilot automation getBulkJob 8c086140-f33e-4bb7-a993-50c0f2402c7b
```

With JSONata filter:

```bash
epilot automation getBulkJob -p job_id=8c086140-f33e-4bb7-a993-50c0f2402c7b --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "status": "approval",
  "created_by": "1234",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "task_token": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "report_file_entity_id": "string",
  "entity_query": {
    "type": "refs",
    "data": [
      {
        "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
        "entity_schema": "string"
      }
    ]
  },
  "pagination_state": {
    "page_size": 0,
    "pages_processed": 0,
    "total_processed": 0,
    "stable_query_id": "string",
    "search_after": ["string"],
    "has_more": true
  },
  "execution_summary": [
    {
      "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "entity_schema": "string",
      "execution_id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
      "execution_status": "pending",
      "timestamp": "2025-10-30T15:56:47.842Z",
      "error": "string"
    }
  ]
}
```

</details>

---

### `patchBulkJob`

Approve / Cancel bulk job that triggers multiple automation executions

`PATCH /v1/automation/executions/bulk-jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot automation patchBulkJob \
  -p job_id=8c086140-f33e-4bb7-a993-50c0f2402c7b \
  -d '{"action":"APPROVE","task_token":"string"}'
```

Using positional args for path parameters:

```bash
epilot automation patchBulkJob 8c086140-f33e-4bb7-a993-50c0f2402c7b
```

Using stdin pipe:

```bash
cat body.json | epilot automation patchBulkJob -p job_id=8c086140-f33e-4bb7-a993-50c0f2402c7b
```

With JSONata filter:

```bash
epilot automation patchBulkJob -p job_id=8c086140-f33e-4bb7-a993-50c0f2402c7b --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "status": "approval",
  "created_by": "1234",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "task_token": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "report_file_entity_id": "string",
  "entity_query": {
    "type": "refs",
    "data": [
      {
        "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
        "entity_schema": "string"
      }
    ]
  },
  "pagination_state": {
    "page_size": 0,
    "pages_processed": 0,
    "total_processed": 0,
    "stable_query_id": "string",
    "search_after": ["string"],
    "has_more": true
  },
  "execution_summary": [
    {
      "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "entity_schema": "string",
      "execution_id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
      "execution_status": "pending",
      "timestamp": "2025-10-30T15:56:47.842Z",
      "error": "string"
    }
  ]
}
```

</details>

---

### `getExecution`

Get automation execution

`GET /v1/automation/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot automation getExecution \
  -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4
```

Using positional args for path parameters:

```bash
epilot automation getExecution 9baf184f-bc81-4128-bca3-d974c90a12c4
```

With JSONata filter:

```bash
epilot automation getExecution -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
  "execution_status": "pending",
  "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "activity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "entity_snapshot": {
    "_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "_title": "string",
    "_org": "string",
    "_schema": "string",
    "_tags": ["string"],
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_updated_at": "1970-01-01T00:00:00.000Z"
  },
  "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "flow_name": "Handle contact form",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "current_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
  "conditions": [
    {
      "id": "string",
      "schedule_id": "string",
      "evaluationResult": true,
      "statements": []
    }
  ],
  "schedules": [
    {
      "id": "string",
      "scheduleApiId": "string",
      "numberOfUnits": 0,
      "timePeriod": "minutes",
      "timeRelation": "after",
      "source": {}
    }
  ],
  "actions": [
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "map-entity",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    },
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "trigger-workflow",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    }
  ],
  "resume_token": "eyJraWQiOiJrZXkifQ==",
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "version": 2,
  "trigger_event": {
    "type": "manual",
    "org_id": "123",
    "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "caller": {
      "EpilotAuth": {}
    }
  },
  "workflow_context": {
    "workflow_exec_id": "string",
    "workflow_exec_task_id": "string",
    "workflow_role": "trigger_workflow",
    "_execution_chain": {
      "parent_execution_id": "string",
      "parent_task_id": "string",
      "depth": 0
    }
  }
}
```

</details>

---

### `cancelExecution`

Cancel automation execution

`DELETE /v1/automation/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot automation cancelExecution \
  -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4
```

Using positional args for path parameters:

```bash
epilot automation cancelExecution 9baf184f-bc81-4128-bca3-d974c90a12c4
```

With JSONata filter:

```bash
epilot automation cancelExecution -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
  "execution_status": "pending",
  "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "activity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "entity_snapshot": {
    "_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "_title": "string",
    "_org": "string",
    "_schema": "string",
    "_tags": ["string"],
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_updated_at": "1970-01-01T00:00:00.000Z"
  },
  "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
  "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
  "flow_name": "Handle contact form",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "current_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
  "conditions": [
    {
      "id": "string",
      "schedule_id": "string",
      "evaluationResult": true,
      "statements": []
    }
  ],
  "schedules": [
    {
      "id": "string",
      "scheduleApiId": "string",
      "numberOfUnits": 0,
      "timePeriod": "minutes",
      "timeRelation": "after",
      "source": {}
    }
  ],
  "actions": [
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "map-entity",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    },
    {
      "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
      "name": "string",
      "type": "trigger-workflow",
      "config": {},
      "allow_failure": true,
      "created_automatically": true,
      "is_bulk_action": true,
      "reason": {},
      "condition_id": "string",
      "schedule_id": "string",
      "execution_status": "pending",
      "started_at": "string",
      "updated_at": "string",
      "outputs": {},
      "error_output": {},
      "retry_strategy": "RETRY_AND_RESUME"
    }
  ],
  "resume_token": "eyJraWQiOiJrZXkifQ==",
  "trigger_context": {
    "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "version": 2,
  "trigger_event": {
    "type": "manual",
    "org_id": "123",
    "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "caller": {
      "EpilotAuth": {}
    }
  },
  "workflow_context": {
    "workflow_exec_id": "string",
    "workflow_exec_task_id": "string",
    "workflow_role": "trigger_workflow",
    "_execution_chain": {
      "parent_execution_id": "string",
      "parent_task_id": "string",
      "depth": 0
    }
  }
}
```

</details>

---

### `retriggerAction`

Retry a specific automation execution action which failed / is stuck.

`POST /v1/automation/executions/{execution_id}/{action_id}/retrigger`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Execution Id |
| `action_id` | path | string | Yes | Id of Action to retry. |

**Request Body**

**Sample Call**

```bash
epilot automation retriggerAction \
  -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 \
  -p action_id=9ec3711b-db63-449c-b894-54d5bb622a8f \
  -d '{"condition_id":"string","retry_strategy":"RETRY_AND_RESUME"}'
```

Using positional args for path parameters:

```bash
epilot automation retriggerAction 9baf184f-bc81-4128-bca3-d974c90a12c4 9ec3711b-db63-449c-b894-54d5bb622a8f
```

Using stdin pipe:

```bash
cat body.json | epilot automation retriggerAction -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 -p action_id=9ec3711b-db63-449c-b894-54d5bb622a8f
```

With JSONata filter:

```bash
epilot automation retriggerAction -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 -p action_id=9ec3711b-db63-449c-b894-54d5bb622a8f --jsonata '$'
```

---

### `resumeExecutionWithToken`

Resume a paused automation execution using a unique resume token.

`POST /v1/automation/public/executions:resume`

**Request Body**

**Sample Call**

```bash
epilot automation resumeExecutionWithToken \
  -d '{"resume_token":"eyJraWQiOiJrZXkifQ=="}'
```

Using stdin pipe:

```bash
cat body.json | epilot automation resumeExecutionWithToken
```

With JSONata filter:

```bash
epilot automation resumeExecutionWithToken --jsonata 'execution'
```

<details>
<summary>Sample Response</summary>

```json
{
  "execution": {
    "id": "9baf184f-bc81-4128-bca3-d974c90a12c4",
    "execution_status": "pending",
    "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "activity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "entity_snapshot": {
      "_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "_title": "string",
      "_org": "string",
      "_schema": "string",
      "_tags": ["string"],
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z"
    },
    "org_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
    "flow_id": "7791b04a-16d2-44a2-9af9-2d59c25c512f",
    "flow_name": "Handle contact form",
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z",
    "current_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
    "conditions": [
      {}
    ],
    "schedules": [
      {}
    ],
    "actions": [
      {},
      {}
    ],
    "resume_token": "eyJraWQiOiJrZXkifQ==",
    "trigger_context": {
      "entity_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
    },
    "version": 2,
    "trigger_event": {
      "type": "manual",
      "org_id": "123",
      "entity_id": "e3d3ebac-baab-4395-abf4-50b5bf1f8b74",
      "caller": {}
    },
    "workflow_context": {
      "workflow_exec_id": "string",
      "workflow_exec_task_id": "string",
      "workflow_role": "trigger_workflow",
      "_execution_chain": {}
    }
  },
  "resumedAction": {
    "id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
    "flow_action_id": "9ec3711b-db63-449c-b894-54d5bb622a8f",
    "name": "string",
    "type": "map-entity",
    "config": {
      "mapping_config": {},
      "target_schema": "string",
      "target_unique": ["string"],
      "mapping_attributes": [],
      "relation_attributes": [],
      "linkback_relation_attribute": "mapped_entities",
      "linkback_relation_tags": ["string"]
    },
    "allow_failure": true,
    "created_automatically": true,
    "is_bulk_action": true,
    "reason": {
      "message": "There are no registered portal users for the given emails, hence skipping the action",
      "payload": {}
    },
    "condition_id": "string",
    "schedule_id": "string",
    "execution_status": "pending",
    "started_at": "string",
    "updated_at": "string",
    "outputs": {},
    "error_output": {
      "error_code": "MAPPING_ERROR",
      "error_reason": "string",
      "error_info": {}
    },
    "retry_strategy": "RETRY_AND_RESUME"
  }
}
```

</details>

---

### `cancelSchedule`

Cancel a scheduled automation

`DELETE /v1/automation/executions/{execution_id}/schedules/{schedule_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes |  |
| `schedule_id` | path | string | Yes | ID of the schedule to cancel |

**Sample Call**

```bash
epilot automation cancelSchedule \
  -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 \
  -p schedule_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot automation cancelSchedule 9baf184f-bc81-4128-bca3-d974c90a12c4 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot automation cancelSchedule -p execution_id=9baf184f-bc81-4128-bca3-d974c90a12c4 -p schedule_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "scheduleApiId": "string",
  "numberOfUnits": 0,
  "timePeriod": "minutes",
  "timeRelation": "after",
  "source": {
    "id": "string",
    "origin": "trigger",
    "schema": "string",
    "attribute": "string"
  }
}
```

</details>

---
