# Workflows Executions

- **Base URL:** `https://workflows-execution.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/workflow](https://docs.epilot.io/api/workflow)

Service for Workflow Executions which covers executions of processes defined in an Organization

## Quick Start

```bash
# List available operations
epilot workflow

# Call an operation
epilot workflow getExecutions
```

## Operations

**Workflow Executions**
- [`getExecutions`](#getexecutions) — Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are
- [`createExecution`](#createexecution) — Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).
- [`getExecution`](#getexecution) — Get a full workflow execution, included steps information, by execution id.
- [`updateExecution`](#updateexecution) — Patches updates like assignees, status, closingReason for a single Workflow Execution.
- [`deleteExecution`](#deleteexecution) — Delete workflow execution by id. Workflow contexts will NOT be deleted.

**Workflow Steps**
- [`createStep`](#createstep) — Create a new step in current workflow execution.
- [`updateStep`](#updatestep) — Patches various changes to a workflow execution step.
- [`deleteStep`](#deletestep) — Deletes a step from a workflow execution.

**Closing Reasons**
- [`getClosingReasonExecution`](#getclosingreasonexecution) — Shows all Closing Reasons defined at the moment of starting the Workflow Execution.

**Flows V2**
- [`startFlowExecution`](#startflowexecution) — Starts a new Flow Execution based on a flow template.
- [`getFlowExecution`](#getflowexecution) — Get a full flow execution, included tasks, phases, edges & analytics.
- [`patchFlowExecution`](#patchflowexecution) — Patch flow execution with new assignees, status, analytics & other changes.
- [`deleteFlowExecution`](#deleteflowexecution) — Deletes a specific execution of a flow, identified by id. Flow contexts will NOT be deleted.
- [`searchFlowExecutions`](#searchflowexecutions) — Search Flow Executions for a specific Entity.
- [`patchTask`](#patchtask) — Changes various attributes of a flow task, like assignees, status, due date, etc.
- [`runTaskAutomation`](#runtaskautomation) — Runs configured automation for a flow task
- [`executeTask`](#executetask) — Executes any kind of flow task immediately.
- [`patchPhase`](#patchphase) — Apply updates to a phase within flow execution
- [`addTask`](#addtask) — Create a new task in current workflow execution.
- [`cancelTaskSchedule`](#canceltaskschedule) — Cancels a scheduled task, deleting the schedule and marking the task as skipped.

### `getExecutions`

Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are

`GET /v1/workflows/executions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `context` | query | string | No | Id of an Entity |
| `schema` | query | string | No | Schema of an Entity |

**Sample Call**

```bash
epilot workflow getExecutions
```

With JSONata filter:

```bash
epilot workflow getExecutions --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "8gja72h6kas6h",
    "name": "Lead Qualification",
    "trigger": "MANUAL",
    "status": "STARTED",
    "creationTime": "2021-04-27T12:01:13.000Z",
    "lastUpdateTime": "2021-04-27T12:01:13.000Z",
    "dueDate": "2021-04-27T12:01:13.000Z",
    "flow": [
      {
        "id": "sectionId1",
        "definitionId": "section_definition_id_1",
        "name": "Initial Information Gathering",
        "type": "SECTION",
        "steps": [
          {
            "id": "sada5641f3a21",
            "definitionId": "step_definition_id_1",
            "name": "Call client"
          },
          {
            "id": "sada5641f3a22",
            "definitionId": "step_definition_id_2",
            "name": "Check product availability"
          }
        ]
      },
      {
        "id": "firstLevelStepId1",
        "definitionId": "step_definition_id_4",
        "name": "Print and send catalog",
        "type": "STEP"
      }
    ]
  }
]
```

</details>

---

### `createExecution`

Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).

`POST /v1/workflows/executions`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow createExecution
```

With request body:

```bash
epilot workflow createExecution \
  -d '{
  "workflowId": "j3f23fh23uif98",
  "trigger": "AUTOMATIC",
  "contexts": [
    {
      "id": "3fa3fa86-0907-4642-a57e-0fe30a19874d",
      "schema": "contact"
    },
    {
      "id": "3a6d42fa-5070-4723-b90f-41ead4303e33",
      "schema": "opportunity"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow createExecution
```

With JSONata filter:

```bash
epilot workflow createExecution --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "8gja72h6kas6h",
  "name": "Lead Qualification",
  "trigger": "MANUAL",
  "status": "STARTED",
  "creationTime": "2021-04-27T12:01:13.000Z",
  "lastUpdateTime": "2021-04-27T12:01:13.000Z",
  "dueDate": "2021-04-27T12:01:13.000Z",
  "assignedTo": ["252", "29052"],
  "flow": [
    {
      "id": "sectionId1",
      "name": "Initial Information Gathering",
      "steps": [
        {
          "id": "sada5641f3a21",
          "name": "Call client and confirm address and product",
          "definitionId": "step_definition_id_1",
          "status": "ASSIGNED",
          "assignedTo": ["11"]
        },
        {
          "id": "sada5641f3a22",
          "name": "Check product availability",
          "status": "UNASSIGNED",
          "definitionId": "step_definition_id_2"
        }
      ]
    },
    {
      "id": "firstLevelStepId1",
      "definitionId": "step_definition_id_4",
      "name": "Print and send catalog",
      "status": "SKIPPED",
      "dueDate": "2023-01-15T20:00:00"
    }
  ]
}
```

</details>

---

### `getExecution`

Get a full workflow execution, included steps information, by execution id.

`GET /v1/workflows/executions/{executionId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |

**Sample Call**

```bash
epilot workflow getExecution \
  -p executionId=wd561
```

Using positional args for path parameters:

```bash
epilot workflow getExecution wd561
```

With JSONata filter:

```bash
epilot workflow getExecution -p executionId=wd561 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "8gja72h6kas6h",
  "name": "Lead Qualification",
  "trigger": "MANUAL",
  "status": "STARTED",
  "creationTime": "2021-04-27T12:01:13.000Z",
  "lastUpdateTime": "2021-04-27T12:01:13.000Z",
  "dueDate": "2021-04-27T12:01:13.000Z",
  "assignedTo": ["252", "29052"],
  "flow": [
    {
      "id": "sectionId1",
      "name": "Initial Information Gathering",
      "steps": [
        {
          "id": "sada5641f3a21",
          "name": "Call client and confirm address and product",
          "definitionId": "step_definition_id_1",
          "status": "ASSIGNED",
          "assignedTo": ["11"]
        },
        {
          "id": "sada5641f3a22",
          "name": "Check product availability",
          "status": "UNASSIGNED",
          "definitionId": "step_definition_id_2"
        }
      ]
    },
    {
      "id": "firstLevelStepId1",
      "definitionId": "step_definition_id_4",
      "name": "Print and send catalog",
      "status": "SKIPPED",
      "dueDate": "2023-01-15T20:00:00"
    }
  ]
}
```

</details>

---

### `updateExecution`

Patches updates like assignees, status, closingReason for a single Workflow Execution.

`PATCH /v1/workflows/executions/{executionId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow updateExecution \
  -p executionId=wd561
```

With request body:

```bash
epilot workflow updateExecution \
  -p executionId=wd561 \
  -d '{
  "status": "STARTED",
  "assignedTo": ["string"],
  "selectedClosingReasons": [
    {
      "id": "string",
      "title": "string"
    }
  ],
  "closingReasonDescription": "string",
  "dueDate": "string",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "closedBy": "string",
  "contexts": [
    {
      "id": "string",
      "title": "string",
      "schema": "string"
    }
  ],
  "completedTime": "string"
}'
```

Using positional args for path parameters:

```bash
epilot workflow updateExecution wd561
```

Using stdin pipe:

```bash
cat body.json | epilot workflow updateExecution -p executionId=wd561
```

With JSONata filter:

```bash
epilot workflow updateExecution -p executionId=wd561 --jsonata '$'
```

---

### `deleteExecution`

Delete workflow execution by id. Workflow contexts will NOT be deleted.

`DELETE /v1/workflows/executions/{executionId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution to de deleted. |

**Sample Call**

```bash
epilot workflow deleteExecution \
  -p executionId=CustomerRequest
```

Using positional args for path parameters:

```bash
epilot workflow deleteExecution CustomerRequest
```

With JSONata filter:

```bash
epilot workflow deleteExecution -p executionId=CustomerRequest --jsonata '$'
```

---

### `createStep`

Create a new step in current workflow execution.

`POST /v1/workflows/executions/{executionId}/steps`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow createStep \
  -p executionId=wd56125gah
```

With request body:

```bash
epilot workflow createStep \
  -p executionId=wd56125gah \
  -d '{
  "insertionIndex": 0,
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "status": "UNASSIGNED",
  "sectionId": "string",
  "executionType": "MANUAL",
  "automationConfig": {
    "flowId": "string",
    "executionId": "string",
    "executionStatus": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot workflow createStep wd56125gah
```

Using stdin pipe:

```bash
cat body.json | epilot workflow createStep -p executionId=wd56125gah
```

With JSONata filter:

```bash
epilot workflow createStep -p executionId=wd56125gah --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "definitionId": "string",
  "entityRefId": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "type": "STEP",
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "enabled": true,
  "requirements": [
    {
      "definitionId": "string",
      "type": "STEP",
      "condition": "CLOSED"
    }
  ],
  "executionType": "MANUAL",
  "sectionId": "string",
  "executionId": "string",
  "userIds": [0],
  "assignedTo": ["string"],
  "assignedToInProgress": "string",
  "status": "UNASSIGNED",
  "created": "string",
  "lastUpdated": "string",
  "statusLastUpdated": "string",
  "startedTime": "string",
  "completedTime": "string",
  "dueDate": "string",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "manuallyCreated": true,
  "automationConfig": {
    "flowId": "string",
    "executionId": "string",
    "executionStatus": "string"
  },
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "taxonomies": ["string"]
}
```

</details>

---

### `updateStep`

Patches various changes to a workflow execution step.

`PATCH /v1/workflows/executions/{executionId}/steps/{stepId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |
| `stepId` | path | string | Yes | Short uuid (length 6) to identify the Workflow Execution Step. |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow updateStep \
  -p executionId=wd56125gah \
  -p stepId=7hj28a
```

With request body:

```bash
epilot workflow updateStep \
  -p executionId=wd56125gah \
  -p stepId=7hj28a \
  -d '{
  "stepId": "string",
  "entityRefId": "string",
  "userIds": [0],
  "assignedTo": ["string"],
  "assignedToInProgress": "string",
  "status": "UNASSIGNED",
  "dueDate": "string",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "position": {
    "index": 0,
    "sectionId": "string"
  },
  "automationConfig": {
    "flowId": "string",
    "executionId": "string",
    "executionStatus": "string"
  },
  "startedTime": "string",
  "completedTime": "string"
}'
```

Using positional args for path parameters:

```bash
epilot workflow updateStep wd56125gah 7hj28a
```

Using stdin pipe:

```bash
cat body.json | epilot workflow updateStep -p executionId=wd56125gah -p stepId=7hj28a
```

With JSONata filter:

```bash
epilot workflow updateStep -p executionId=wd56125gah -p stepId=7hj28a --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "definitionId": "string",
  "entityRefId": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "type": "STEP",
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "enabled": true,
  "requirements": [
    {
      "definitionId": "string",
      "type": "STEP",
      "condition": "CLOSED"
    }
  ],
  "executionType": "MANUAL",
  "sectionId": "string",
  "executionId": "string",
  "userIds": [0],
  "assignedTo": ["string"],
  "assignedToInProgress": "string",
  "status": "UNASSIGNED",
  "created": "string",
  "lastUpdated": "string",
  "statusLastUpdated": "string",
  "startedTime": "string",
  "completedTime": "string",
  "dueDate": "string",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "manuallyCreated": true,
  "automationConfig": {
    "flowId": "string",
    "executionId": "string",
    "executionStatus": "string"
  },
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "taxonomies": ["string"]
}
```

</details>

---

### `deleteStep`

Deletes a step from a workflow execution.

`DELETE /v1/workflows/executions/{executionId}/steps/{stepId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |
| `stepId` | path | string | Yes | Short uuid (length 6) to identify the Workflow Execution Step. |

**Sample Call**

```bash
epilot workflow deleteStep \
  -p executionId=wd56125gah \
  -p stepId=7hj28a
```

Using positional args for path parameters:

```bash
epilot workflow deleteStep wd56125gah 7hj28a
```

With JSONata filter:

```bash
epilot workflow deleteStep -p executionId=wd56125gah -p stepId=7hj28a --jsonata '$'
```

---

### `getClosingReasonExecution`

Shows all Closing Reasons defined at the moment of starting the Workflow Execution.

`GET /v1/workflows/executions/{executionId}/closing-reasons`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `executionId` | path | string | Yes | Id of the execution |

**Sample Call**

```bash
epilot workflow getClosingReasonExecution \
  -p executionId=wd561
```

Using positional args for path parameters:

```bash
epilot workflow getClosingReasonExecution wd561
```

With JSONata filter:

```bash
epilot workflow getClosingReasonExecution -p executionId=wd561 --jsonata 'reasons'
```

<details>
<summary>Sample Response</summary>

```json
{
  "reasons": [
    {
      "id": "string",
      "title": "string"
    }
  ]
}
```

</details>

---

### `startFlowExecution`

Starts a new Flow Execution based on a flow template.

`POST /v2/flows/executions`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow startFlowExecution
```

With request body:

```bash
epilot workflow startFlowExecution \
  -d '{
  "flow_template_id": "string",
  "trigger": {
    "type": "MANUAL",
    "automation_config": {
      "flow_id": "string",
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string"
    }
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false
    }
  ],
  "purposes": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow startFlowExecution
```

With JSONata filter:

```bash
epilot workflow startFlowExecution --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "flow_template_id": "string",
  "org_id": "string",
  "name": "string",
  "created_at": "string",
  "updated_at": "string",
  "due_date": "string",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "status": "STARTED",
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "string",
    "completed_at": "string",
    "closed_at": "string",
    "started_by": "string",
    "closed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false
    }
  ],
  "crt_tasks": [
    {
      "id": "string"
    }
  ],
  "phases": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "status": "OPEN",
      "updated_at": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "analytics": {},
      "taxonomies": ["string"],
      "loop_config": {}
    }
  ],
  "tasks": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "analytics": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "loop_config": {}
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "abc123",
      "none_met": true
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "closing_reason": {
    "selected_reasons": [
      {}
    ],
    "configured_reasons": [
      {}
    ],
    "extra_description": "string"
  },
  "available_in_ecp": true,
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "trigger": {
    "type": "MANUAL",
    "automation_config": {
      "flow_id": "string",
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string"
    }
  },
  "singleClosingReasonSelection": true
}
```

</details>

---

### `getFlowExecution`

Get a full flow execution, included tasks, phases, edges & analytics.

`GET /v2/flows/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |

**Sample Call**

```bash
epilot workflow getFlowExecution \
  -p execution_id=wd561
```

Using positional args for path parameters:

```bash
epilot workflow getFlowExecution wd561
```

With JSONata filter:

```bash
epilot workflow getFlowExecution -p execution_id=wd561 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "flow_template_id": "string",
  "org_id": "string",
  "name": "string",
  "created_at": "string",
  "updated_at": "string",
  "due_date": "string",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "status": "STARTED",
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "string",
    "completed_at": "string",
    "closed_at": "string",
    "started_by": "string",
    "closed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false
    }
  ],
  "crt_tasks": [
    {
      "id": "string"
    }
  ],
  "phases": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "status": "OPEN",
      "updated_at": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "analytics": {},
      "taxonomies": ["string"],
      "loop_config": {}
    }
  ],
  "tasks": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "analytics": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "loop_config": {}
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "abc123",
      "none_met": true
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "closing_reason": {
    "selected_reasons": [
      {}
    ],
    "configured_reasons": [
      {}
    ],
    "extra_description": "string"
  },
  "available_in_ecp": true,
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "trigger": {
    "type": "MANUAL",
    "automation_config": {
      "flow_id": "string",
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string"
    }
  },
  "singleClosingReasonSelection": true
}
```

</details>

---

### `patchFlowExecution`

Patch flow execution with new assignees, status, analytics & other changes.

`PATCH /v2/flows/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow patchFlowExecution \
  -p execution_id=wd561
```

With request body:

```bash
epilot workflow patchFlowExecution \
  -p execution_id=wd561 \
  -d '{
  "status": "STARTED",
  "assigned_to": ["string"],
  "closing_reason": {
    "selected_reasons": [
      {
        "id": "string",
        "title": "string"
      }
    ],
    "configured_reasons": [
      {
        "id": "string",
        "title": "string"
      }
    ],
    "extra_description": "string"
  },
  "due_date": "string",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot workflow patchFlowExecution wd561
```

Using stdin pipe:

```bash
cat body.json | epilot workflow patchFlowExecution -p execution_id=wd561
```

With JSONata filter:

```bash
epilot workflow patchFlowExecution -p execution_id=wd561 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "flow_template_id": "string",
  "org_id": "string",
  "name": "string",
  "created_at": "string",
  "updated_at": "string",
  "due_date": "string",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "status": "STARTED",
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "string",
    "completed_at": "string",
    "closed_at": "string",
    "started_by": "string",
    "closed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false
    }
  ],
  "crt_tasks": [
    {
      "id": "string"
    }
  ],
  "phases": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "status": "OPEN",
      "updated_at": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "analytics": {},
      "taxonomies": ["string"],
      "loop_config": {}
    }
  ],
  "tasks": [
    {
      "id": "string",
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "analytics": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "loop_config": {}
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "abc123",
      "none_met": true
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "closing_reason": {
    "selected_reasons": [
      {}
    ],
    "configured_reasons": [
      {}
    ],
    "extra_description": "string"
  },
  "available_in_ecp": true,
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "trigger": {
    "type": "MANUAL",
    "automation_config": {
      "flow_id": "string",
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string"
    }
  },
  "singleClosingReasonSelection": true
}
```

</details>

---

### `deleteFlowExecution`

Deletes a specific execution of a flow, identified by id. Flow contexts will NOT be deleted.

`DELETE /v2/flows/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `soft` | query | boolean | No | If true, the execution will NOT be deleted permanently, but rather kept for archive purpose. |

**Sample Call**

```bash
epilot workflow deleteFlowExecution \
  -p execution_id=wd561
```

Using positional args for path parameters:

```bash
epilot workflow deleteFlowExecution wd561
```

With JSONata filter:

```bash
epilot workflow deleteFlowExecution -p execution_id=wd561 --jsonata '$'
```

---

### `searchFlowExecutions`

Search Flow Executions for a specific Entity.

`POST /v2/flows/executions:search`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow searchFlowExecutions \
  -d '{"entity_id":"string","entity_schema":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow searchFlowExecutions
```

With JSONata filter:

```bash
epilot workflow searchFlowExecutions --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "flow_template_id": "string",
      "org_id": "string",
      "name": "string",
      "created_at": "string",
      "updated_at": "string",
      "due_date": "string",
      "due_date_config": {},
      "status": "STARTED",
      "assigned_to": ["string"],
      "analytics": {},
      "contexts": [],
      "crt_tasks": [],
      "phases": [],
      "tasks": [],
      "edges": [],
      "_execution_chain": {},
      "closing_reason": {},
      "available_in_ecp": true,
      "entity_sync": [],
      "taxonomies": ["string"],
      "trigger": {},
      "singleClosingReasonSelection": true
    }
  ]
}
```

</details>

---

### `patchTask`

Changes various attributes of a flow task, like assignees, status, due date, etc.

`PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `task_id` | path | string | Yes | Id of the task |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow patchTask \
  -p execution_id=wd561 \
  -p task_id=7hj28a
```

With request body:

```bash
epilot workflow patchTask \
  -p execution_id=wd561 \
  -p task_id=7hj28a \
  -d '{
  "name": "string",
  "status": "UNASSIGNED",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "enabled": true,
  "automation_config": {
    "flow_id": "string",
    "execution_id": "string",
    "execution_status": "string",
    "error_reason": "string"
  },
  "description": {
    "enabled": true,
    "value": "string"
  },
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "next_condition_id": "string",
  "revert_execution": false
}'
```

Using positional args for path parameters:

```bash
epilot workflow patchTask wd561 7hj28a
```

Using stdin pipe:

```bash
cat body.json | epilot workflow patchTask -p execution_id=wd561 -p task_id=7hj28a
```

With JSONata filter:

```bash
epilot workflow patchTask -p execution_id=wd561 -p task_id=7hj28a --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "template_id": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "status": "UNASSIGNED",
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_by": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "manually_created": true,
  "enabled": true,
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "taxonomies": ["string"],
  "phase_id": "string",
  "task_type": "MANUAL",
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  }
}
```

</details>

---

### `runTaskAutomation`

Runs configured automation for a flow task

`POST /v2/flows/executions/{execution_id}/tasks/{task_id}/automation:run`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `task_id` | path | string | Yes | Id of the task |

**Sample Call**

```bash
epilot workflow runTaskAutomation \
  -p execution_id=wd561 \
  -p task_id=7hj28a
```

Using positional args for path parameters:

```bash
epilot workflow runTaskAutomation wd561 7hj28a
```

With JSONata filter:

```bash
epilot workflow runTaskAutomation -p execution_id=wd561 -p task_id=7hj28a --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "template_id": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "status": "UNASSIGNED",
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_by": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "manually_created": true,
  "enabled": true,
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "taxonomies": ["string"],
  "phase_id": "string",
  "task_type": "MANUAL",
  "automation_config": {
    "flow_id": "string",
    "execution_id": "string",
    "execution_status": "string",
    "error_reason": "string"
  },
  "automation_execution_id": "string",
  "trigger_mode": "manual",
  "schedule": {
    "mode": "immediate"
  },
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  }
}
```

</details>

---

### `executeTask`

Executes any kind of flow task immediately.

`POST /v2/flows/executions/{execution_id}/tasks/{task_id}/execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `task_id` | path | string | Yes | Id of the task |

**Sample Call**

```bash
epilot workflow executeTask \
  -p execution_id=wd561 \
  -p task_id=7hj28a
```

Using positional args for path parameters:

```bash
epilot workflow executeTask wd561 7hj28a
```

With JSONata filter:

```bash
epilot workflow executeTask -p execution_id=wd561 -p task_id=7hj28a --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "template_id": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "status": "UNASSIGNED",
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_by": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "manually_created": true,
  "enabled": true,
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "taxonomies": ["string"],
  "phase_id": "string",
  "task_type": "MANUAL",
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  }
}
```

</details>

---

### `patchPhase`

Apply updates to a phase within flow execution

`PATCH /v2/flows/executions/{execution_id}/phases/{phase_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `phase_id` | path | string | Yes | Id of the phase |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow patchPhase \
  -p execution_id=wd561 \
  -p phase_id=9gjs2952j
```

With request body:

```bash
epilot workflow patchPhase \
  -p execution_id=wd561 \
  -p phase_id=9gjs2952j \
  -d '{
  "name": "string",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot workflow patchPhase wd561 9gjs2952j
```

Using stdin pipe:

```bash
cat body.json | epilot workflow patchPhase -p execution_id=wd561 -p phase_id=9gjs2952j
```

With JSONata filter:

```bash
epilot workflow patchPhase -p execution_id=wd561 -p phase_id=9gjs2952j --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "template_id": "string",
  "name": "string",
  "status": "OPEN",
  "updated_at": "string",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_by": "string"
  },
  "taxonomies": ["string"],
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  }
}
```

</details>

---

### `addTask`

Create a new task in current workflow execution.

`POST /v2/flows/executions/{execution_id}/tasks`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow addTask \
  -p execution_id=wd561
```

With request body:

```bash
epilot workflow addTask \
  -p execution_id=wd561 \
  -d '{
  "previous_task_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "next_task_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "task": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "status": "UNASSIGNED",
    "due_date": "2021-04-27T12:00:00.000Z",
    "due_date_config": {
      "duration": 0,
      "unit": "minutes",
      "type": "WORKFLOW_STARTED",
      "task_id": "string",
      "phase_id": "string"
    },
    "assigned_to": ["string"],
    "enabled": true,
    "automation_config": {
      "flow_id": "string",
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string"
    },
    "phase_id": "string",
    "task_type": "MANUAL"
  }
}'
```

Using positional args for path parameters:

```bash
epilot workflow addTask wd561
```

Using stdin pipe:

```bash
cat body.json | epilot workflow addTask -p execution_id=wd561
```

With JSONata filter:

```bash
epilot workflow addTask -p execution_id=wd561 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "template_id": "string",
  "name": "string",
  "description": {
    "enabled": true,
    "value": "string"
  },
  "status": "UNASSIGNED",
  "journey": {
    "id": "string",
    "journeyId": "string",
    "name": "string",
    "complete_task_automatically": true
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "assigned_to": ["string"],
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_by": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "manually_created": true,
  "enabled": true,
  "ecp": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "installer": {
    "enabled": true,
    "label": "string",
    "description": "string",
    "journey": {
      "id": "string",
      "journeyId": "string",
      "name": "string",
      "complete_task_automatically": true
    }
  },
  "taxonomies": ["string"],
  "phase_id": "string",
  "task_type": "MANUAL",
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  }
}
```

</details>

---

### `cancelTaskSchedule`

Cancels a scheduled task, deleting the schedule and marking the task as skipped.

`DELETE /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string | Yes | Id of the execution |
| `task_id` | path | string | Yes | Id of the task |

**Sample Call**

```bash
epilot workflow cancelTaskSchedule \
  -p execution_id=wd561 \
  -p task_id=7hj28a
```

Using positional args for path parameters:

```bash
epilot workflow cancelTaskSchedule wd561 7hj28a
```

With JSONata filter:

```bash
epilot workflow cancelTaskSchedule -p execution_id=wd561 -p task_id=7hj28a --jsonata '$'
```

---

## Deprecated Operations

- ~~`searchExecutions`~~ POST `/v1/workflows/executions/search`
- ~~`searchSteps`~~ POST `/v1/workflows/executions/steps/search`
- ~~`cancelSchedule`~~ POST `/v2/flows/executions/{execution_id}/schedules/{schedule_id}`
