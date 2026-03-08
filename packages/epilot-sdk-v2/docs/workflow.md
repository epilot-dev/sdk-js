# Workflows Executions

- **Base URL:** `https://workflows-execution.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/workflow](https://docs.epilot.io/api/workflow)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.workflow.getExecutions(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/workflow'

const workflowClient = await getClient()
authorize(workflowClient, () => '<token>')
const { data } = await workflowClient.getExecutions(...)
```

## Operations

**Workflow Executions**
- [`getExecutions`](#getexecutions)
- [`createExecution`](#createexecution)
- [`getExecution`](#getexecution)
- [`updateExecution`](#updateexecution)
- [`deleteExecution`](#deleteexecution)

**Workflow Steps**
- [`createStep`](#createstep)
- [`updateStep`](#updatestep)
- [`deleteStep`](#deletestep)

**Closing Reasons**
- [`getClosingReasonExecution`](#getclosingreasonexecution)

**Flows V2**
- [`startFlowExecution`](#startflowexecution)
- [`getFlowExecution`](#getflowexecution)
- [`patchFlowExecution`](#patchflowexecution)
- [`deleteFlowExecution`](#deleteflowexecution)
- [`searchFlowExecutions`](#searchflowexecutions)
- [`patchTask`](#patchtask)
- [`runTaskAutomation`](#runtaskautomation)
- [`executeTask`](#executetask)
- [`patchPhase`](#patchphase)
- [`addTask`](#addtask)
- [`cancelTaskSchedule`](#canceltaskschedule)

**Schemas**
- [`WorkflowExecutionCreateReq`](#workflowexecutioncreatereq)
- [`WorkflowExecutionUpdateReq`](#workflowexecutionupdatereq)
- [`ClosingReason`](#closingreason)
- [`WorkflowContext`](#workflowcontext)
- [`WorkflowExecutionBase`](#workflowexecutionbase)
- [`WorkflowExecutionSlim`](#workflowexecutionslim)
- [`FlowSlim`](#flowslim)
- [`Flow`](#flow)
- [`WorkflowExecution`](#workflowexecution)
- [`WorkflowStatus`](#workflowstatus)
- [`SectionSimplified`](#sectionsimplified)
- [`Section`](#section)
- [`StepId`](#stepid)
- [`StepSimplified`](#stepsimplified)
- [`Step`](#step)
- [`StepExtended`](#stepextended)
- [`StepStatus`](#stepstatus)
- [`SectionStatus`](#sectionstatus)
- [`StepType`](#steptype)
- [`StepJourney`](#stepjourney)
- [`AutomationConfig`](#automationconfig)
- [`ECPDetails`](#ecpdetails)
- [`StepDescription`](#stepdescription)
- [`ItemType`](#itemtype)
- [`TriggerType`](#triggertype)
- [`CreateStepReq`](#createstepreq)
- [`UpdateStepReq`](#updatestepreq)
- [`StepPositionAt`](#steppositionat)
- [`UpdateStepResp`](#updatestepresp)
- [`SearchStepsResp`](#searchstepsresp)
- [`SearchExecutionsReq`](#searchexecutionsreq)
- [`SearchExecutionsResp`](#searchexecutionsresp)
- [`LastEvaluatedKey`](#lastevaluatedkey)
- [`SearchStepsReq`](#searchstepsreq)
- [`SearchSorting`](#searchsorting)
- [`SearchPagination`](#searchpagination)
- [`ExecutionPaginationDynamo`](#executionpaginationdynamo)
- [`ErrorResp`](#errorresp)
- [`ClosingReasonResp`](#closingreasonresp)
- [`PhaseInEntity`](#phaseinentity)
- [`WorkflowInEntity`](#workflowinentity)
- [`UpdateEntityAttributes`](#updateentityattributes)
- [`EntitySync`](#entitysync)
- [`DynamicDueDate`](#dynamicduedate)
- [`StepRequirement`](#steprequirement)
- [`StartFlowReq`](#startflowreq)
- [`SearchFlowsReq`](#searchflowsreq)
- [`PatchFlowReq`](#patchflowreq)
- [`FlowExecution`](#flowexecution)
- [`FlowClosingReason`](#flowclosingreason)
- [`FlowTrigger`](#flowtrigger)
- [`FlowContext`](#flowcontext)
- [`EntityRef`](#entityref)
- [`PhaseId`](#phaseid)
- [`TaskId`](#taskid)
- [`Task`](#task)
- [`TaskType`](#tasktype)
- [`ManualTask`](#manualtask)
- [`AutomationTask`](#automationtask)
- [`LoopInfo`](#loopinfo)
- [`LoopConfig`](#loopconfig)
- [`TriggerMode`](#triggermode)
- [`ActionSchedule`](#actionschedule)
- [`ImmediateSchedule`](#immediateschedule)
- [`DelayedSchedule`](#delayedschedule)
- [`RelativeSchedule`](#relativeschedule)
- [`DecisionTask`](#decisiontask)
- [`AiAgentTask`](#aiagenttask)
- [`AgentConfig`](#agentconfig)
- [`AgentExecutionInfo`](#agentexecutioninfo)
- [`TaskBase`](#taskbase)
- [`Phase`](#phase)
- [`Edge`](#edge)
- [`AutomationInfo`](#automationinfo)
- [`AnalyticsInfo`](#analyticsinfo)
- [`ConditionId`](#conditionid)
- [`Condition`](#condition)
- [`Statement`](#statement)
- [`EvaluationSource`](#evaluationsource)
- [`Operator`](#operator)
- [`DueDateConfig`](#duedateconfig)
- [`TimeUnit`](#timeunit)
- [`EnableRequirement`](#enablerequirement)
- [`FlowTemplateId`](#flowtemplateid)
- [`FlowExecutionId`](#flowexecutionid)
- [`UserId`](#userid)
- [`VariableAssignment`](#variableassignment)
- [`Assignees`](#assignees)
- [`PatchTaskReq`](#patchtaskreq)
- [`PatchPhaseReq`](#patchphasereq)
- [`AddTaskReq`](#addtaskreq)

### `getExecutions`

Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are more light weight - steps are not loaded with all information.

`GET /v1/workflows/executions`

```ts
const { data } = await client.getExecutions({
  context: 'example',
  schema: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createExecution(
  null,
  {
    workflowId: 'j3f23fh23uif98',
    trigger: 'AUTOMATIC',
    contexts: [
      {
        id: '3fa3fa86-0907-4642-a57e-0fe30a19874d',
        schema: 'contact'
      },
      {
        id: '3a6d42fa-5070-4723-b90f-41ead4303e33',
        schema: 'opportunity'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getExecution({
  executionId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateExecution(
  {
    executionId: 'example',
  },
  {
    status: 'STARTED',
    assignedTo: ['string'],
    selectedClosingReasons: [
      {
        id: 'string',
        title: 'string'
      }
    ],
    closingReasonDescription: 'string',
    dueDate: 'string',
    dynamicDueDate: {
      numberOfUnits: 0,
      timePeriod: 'minutes',
      actionTypeCondition: 'WORKFLOW_STARTED',
      stepId: 'string',
      phaseId: 'string'
    },
    closedBy: 'string',
    contexts: [
      {
        id: 'string',
        title: 'string',
        schema: 'string'
      }
    ],
    completedTime: 'string'
  },
)
```

---

### `deleteExecution`

Delete workflow execution by id. Workflow contexts will NOT be deleted.

`DELETE /v1/workflows/executions/{executionId}`

```ts
const { data } = await client.deleteExecution({
  executionId: 'example',
})
```

---

### `createStep`

Create a new step in current workflow execution.

`POST /v1/workflows/executions/{executionId}/steps`

```ts
const { data } = await client.createStep(
  {
    executionId: 'example',
  },
  {
    insertionIndex: 0,
    name: 'string',
    description: {
      enabled: true,
      value: 'string'
    },
    status: 'UNASSIGNED',
    sectionId: 'string',
    executionType: 'MANUAL',
    automationConfig: {
      flowId: 'string',
      executionId: 'string',
      executionStatus: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateStep(
  {
    executionId: 'example',
    stepId: 'example',
  },
  {
    stepId: 'string',
    entityRefId: 'string',
    userIds: [0],
    assignedTo: ['string'],
    assignedToInProgress: 'string',
    status: 'UNASSIGNED',
    dueDate: 'string',
    dynamicDueDate: {
      numberOfUnits: 0,
      timePeriod: 'minutes',
      actionTypeCondition: 'WORKFLOW_STARTED',
      stepId: 'string',
      phaseId: 'string'
    },
    name: 'string',
    description: {
      enabled: true,
      value: 'string'
    },
    position: {
      index: 0,
      sectionId: 'string'
    },
    automationConfig: {
      flowId: 'string',
      executionId: 'string',
      executionStatus: 'string'
    },
    startedTime: 'string',
    completedTime: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteStep({
  executionId: 'example',
  stepId: 'example',
})
```

---

### `getClosingReasonExecution`

Shows all Closing Reasons defined at the moment of starting the Workflow Execution.
The Closing Reasons shown in the execution are just snapshots
from the state of the Definition when the instance was

`GET /v1/workflows/executions/{executionId}/closing-reasons`

```ts
const { data } = await client.getClosingReasonExecution({
  executionId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.startFlowExecution(
  null,
  {
    flow_template_id: 'string',
    trigger: {
      type: 'MANUAL',
      automation_config: {
        flow_id: 'string',
        execution_id: 'string',
        execution_status: 'string',
        error_reason: 'string'
      }
    },
    contexts: [
      {
        entity_id: 'string',
        entity_schema: 'string',
        is_primary: false
      }
    ],
    purposes: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getFlowExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchFlowExecution(
  {
    execution_id: 'example',
  },
  {
    status: 'STARTED',
    assigned_to: ['string'],
    closing_reason: {
      selected_reasons: [
        {
          id: 'string',
          title: 'string'
        }
      ],
      configured_reasons: [
        {
          id: 'string',
          title: 'string'
        }
      ],
      extra_description: 'string'
    },
    due_date: 'string',
    due_date_config: {
      duration: 0,
      unit: 'minutes',
      type: 'WORKFLOW_STARTED',
      task_id: 'string',
      phase_id: 'string'
    },
    contexts: [
      {
        entity_id: 'string',
        entity_schema: 'string',
        is_primary: false
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteFlowExecution({
  execution_id: 'example',
  soft: true,
})
```

---

### `searchFlowExecutions`

Search Flow Executions for a specific Entity.

`POST /v2/flows/executions:search`

```ts
const { data } = await client.searchFlowExecutions(
  null,
  {
    entity_id: 'string',
    entity_schema: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchTask(
  {
    execution_id: 'example',
    task_id: 'example',
  },
  {
    name: 'string',
    status: 'UNASSIGNED',
    due_date: '2021-04-27T12:00:00.000Z',
    due_date_config: {
      duration: 0,
      unit: 'minutes',
      type: 'WORKFLOW_STARTED',
      task_id: 'string',
      phase_id: 'string'
    },
    assigned_to: ['string'],
    enabled: true,
    automation_config: {
      flow_id: 'string',
      execution_id: 'string',
      execution_status: 'string',
      error_reason: 'string'
    },
    description: {
      enabled: true,
      value: 'string'
    },
    ecp: {
      enabled: true,
      label: 'string',
      description: 'string',
      journey: {
        id: 'string',
        journeyId: 'string',
        name: 'string',
        complete_task_automatically: true
      }
    },
    installer: {
      enabled: true,
      label: 'string',
      description: 'string',
      journey: {
        id: 'string',
        journeyId: 'string',
        name: 'string',
        complete_task_automatically: true
      }
    },
    next_condition_id: 'string',
    revert_execution: false
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.runTaskAutomation({
  execution_id: 'example',
  task_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeTask({
  execution_id: 'example',
  task_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchPhase(
  {
    execution_id: 'example',
    phase_id: 'example',
  },
  {
    name: 'string',
    due_date: '2021-04-27T12:00:00.000Z',
    due_date_config: {
      duration: 0,
      unit: 'minutes',
      type: 'WORKFLOW_STARTED',
      task_id: 'string',
      phase_id: 'string'
    },
    assigned_to: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.addTask(
  {
    execution_id: 'example',
  },
  {
    previous_task_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    next_task_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    task: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      status: 'UNASSIGNED',
      due_date: '2021-04-27T12:00:00.000Z',
      due_date_config: {
        duration: 0,
        unit: 'minutes',
        type: 'WORKFLOW_STARTED',
        task_id: 'string',
        phase_id: 'string'
      },
      assigned_to: ['string'],
      enabled: true,
      automation_config: {
        flow_id: 'string',
        execution_id: 'string',
        execution_status: 'string',
        error_reason: 'string'
      },
      phase_id: 'string',
      task_type: 'MANUAL'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.cancelTaskSchedule({
  execution_id: 'example',
  task_id: 'example',
})
```

---

## Schemas

### `WorkflowExecutionCreateReq`

```ts
type WorkflowExecutionCreateReq = {
  workflowId: string
  trigger?: "MANUAL" | "AUTOMATIC"
  assignedTo?: string[]
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
  purposes?: string[]
}
```

### `WorkflowExecutionUpdateReq`

```ts
type WorkflowExecutionUpdateReq = {
  status?: "STARTED" | "DONE" | "CLOSED"
  assignedTo?: string[]
  selectedClosingReasons?: Array<{
    id: string
    title: string
  }>
  closingReasonDescription?: string
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  closedBy?: string
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
  completedTime?: string
}
```

### `ClosingReason`

```ts
type ClosingReason = {
  id: string
  title: string
}
```

### `WorkflowContext`

```ts
type WorkflowContext = {
  id: string
  title: string
  schema: string
}
```

### `WorkflowExecutionBase`

```ts
type WorkflowExecutionBase = {
  id?: string
  definitionId?: string
  orgId?: string
  name?: string
  creationTime?: string
  lastUpdateTime?: string
  dueDate?: string
  completedTime?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  status?: "STARTED" | "DONE" | "CLOSED"
  trigger?: "MANUAL" | "AUTOMATIC"
  assignedTo?: string[]
  lastModifiedBy?: string
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
  nextOpenStep?: {
    id?: string
    entityRefId?: string
  }
  configuredClosingReasonSnapshot?: Array<{
    id: string
    title: string
  }>
  selectedClosingReasons?: Array<{
    id: string
    title: string
  }>
  closingReasonDescription?: string
  enableECPWorkflow?: boolean
  updateEntityAttributes?: Array<{
    source: "workflow_status" | "current_section" | "current_step"
    target: {
      entitySchema: { ... }
      entityAttribute: { ... }
    }
  }>
  version?: number
  taxonomies?: string[]
  singleClosingReasonSelection?: boolean
}
```

### `WorkflowExecutionSlim`

```ts
type WorkflowExecutionSlim = {
  id?: string
  definitionId?: string
  orgId?: string
  name?: string
  creationTime?: string
  lastUpdateTime?: string
  dueDate?: string
  completedTime?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  status?: "STARTED" | "DONE" | "CLOSED"
  trigger?: "MANUAL" | "AUTOMATIC"
  assignedTo?: string[]
  lastModifiedBy?: string
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
  nextOpenStep?: {
    id?: string
    entityRefId?: string
  }
  configuredClosingReasonSnapshot?: Array<{
    id: string
    title: string
  }>
  selectedClosingReasons?: Array<{
    id: string
    title: string
  }>
  closingReasonDescription?: string
  enableECPWorkflow?: boolean
  updateEntityAttributes?: Array<{
    source: "workflow_status" | "current_section" | "current_step"
    target: {
      entitySchema: { ... }
      entityAttribute: { ... }
    }
  }>
  version?: number
  taxonomies?: string[]
  singleClosingReasonSelection?: boolean
  flow: Array<{
    id: string
    definitionId?: string
    name: string
    userIds?: number[]
    assignedTo?: string[]
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    startedTime?: string
    completedTime?: string
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
    type: "STEP" | "SECTION"
    steps: Array<{
      id: { ... }
      definitionId?: { ... }
      entityRefId?: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      status?: { ... }
      created?: { ... }
      lastUpdated?: { ... }
      statusLastUpdated?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      manuallyCreated?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      taxonomies?: { ... }
    }>
    taxonomies?: string[]
  } | {
    id: string
  // ...
}
```

### `FlowSlim`

```ts
type FlowSlim = {
  flow: Array<{
    id: string
    definitionId?: string
    name: string
    userIds?: number[]
    assignedTo?: string[]
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    startedTime?: string
    completedTime?: string
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
    type: "STEP" | "SECTION"
    steps: Array<{
      id: { ... }
      definitionId?: { ... }
      entityRefId?: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      status?: { ... }
      created?: { ... }
      lastUpdated?: { ... }
      statusLastUpdated?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      manuallyCreated?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      taxonomies?: { ... }
    }>
    taxonomies?: string[]
  } | {
    id: string
    definitionId?: string
    entityRefId?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    type: "STEP" | "SECTION"
    ecp?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    installer?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    enabled?: boolean
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    executionType?: "MANUAL" | "AUTOMATION"
    sectionId?: string
    executionId?: string
    userIds?: number[]
    assignedTo?: string[]
    assignedToInProgress?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
    created?: string
    lastUpdated?: string
    statusLastUpdated?: string
    startedTime?: string
    completedTime?: string
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    manuallyCreated?: boolean
    automationConfig?: {
  // ...
}
```

### `Flow`

```ts
type Flow = {
  flow: Array<{
    id: string
    definitionId?: string
    name: string
    userIds?: number[]
    assignedTo?: string[]
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    startedTime?: string
    completedTime?: string
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
    type: "STEP" | "SECTION"
    steps: Array<{
      id: { ... }
      definitionId?: { ... }
      entityRefId?: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      status?: { ... }
      created?: { ... }
      lastUpdated?: { ... }
      statusLastUpdated?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      manuallyCreated?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      taxonomies?: { ... }
    }>
    taxonomies?: string[]
  } | {
    id: string
    definitionId?: string
    entityRefId?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    type: "STEP" | "SECTION"
    ecp?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    installer?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    enabled?: boolean
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    executionType?: "MANUAL" | "AUTOMATION"
    sectionId?: string
    executionId?: string
    userIds?: number[]
    assignedTo?: string[]
    assignedToInProgress?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
    created?: string
    lastUpdated?: string
    statusLastUpdated?: string
    startedTime?: string
    completedTime?: string
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    manuallyCreated?: boolean
    automationConfig?: {
  // ...
}
```

### `WorkflowExecution`

```ts
type WorkflowExecution = {
  id?: string
  definitionId?: string
  orgId?: string
  name?: string
  creationTime?: string
  lastUpdateTime?: string
  dueDate?: string
  completedTime?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  status?: "STARTED" | "DONE" | "CLOSED"
  trigger?: "MANUAL" | "AUTOMATIC"
  assignedTo?: string[]
  lastModifiedBy?: string
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
  nextOpenStep?: {
    id?: string
    entityRefId?: string
  }
  configuredClosingReasonSnapshot?: Array<{
    id: string
    title: string
  }>
  selectedClosingReasons?: Array<{
    id: string
    title: string
  }>
  closingReasonDescription?: string
  enableECPWorkflow?: boolean
  updateEntityAttributes?: Array<{
    source: "workflow_status" | "current_section" | "current_step"
    target: {
      entitySchema: { ... }
      entityAttribute: { ... }
    }
  }>
  version?: number
  taxonomies?: string[]
  singleClosingReasonSelection?: boolean
  flow: Array<{
    id: string
    definitionId?: string
    name: string
    userIds?: number[]
    assignedTo?: string[]
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    startedTime?: string
    completedTime?: string
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
    type: "STEP" | "SECTION"
    steps: Array<{
      id: { ... }
      definitionId?: { ... }
      entityRefId?: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      status?: { ... }
      created?: { ... }
      lastUpdated?: { ... }
      statusLastUpdated?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      manuallyCreated?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      taxonomies?: { ... }
    }>
    taxonomies?: string[]
  } | {
    id: string
  // ...
}
```

### `WorkflowStatus`

```ts
type WorkflowStatus = "STARTED" | "DONE" | "CLOSED"
```

### `SectionSimplified`

A group of Steps that define the progress of the Workflow

```ts
type SectionSimplified = {
  id: string
  definitionId?: string
  name: string
  type: "STEP" | "SECTION"
  steps: Array<{
    id: string
    definitionId?: string
    entityRefId?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    type: "STEP" | "SECTION"
    ecp?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    installer?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    enabled?: boolean
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    executionType?: "MANUAL" | "AUTOMATION"
  }>
  assignedTo?: string[]
}
```

### `Section`

A group of Steps that define the progress of the Workflow

```ts
type Section = {
  id: string
  definitionId?: string
  name: string
  userIds?: number[]
  assignedTo?: string[]
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  startedTime?: string
  completedTime?: string
  status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
  type: "STEP" | "SECTION"
  steps: Array<{
    id: string
    definitionId?: string
    entityRefId?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    type: "STEP" | "SECTION"
    ecp?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    installer?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
      journey?: { ... }
    }
    enabled?: boolean
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    executionType?: "MANUAL" | "AUTOMATION"
    sectionId?: string
    executionId?: string
    userIds?: number[]
    assignedTo?: string[]
    assignedToInProgress?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
    created?: string
    lastUpdated?: string
    statusLastUpdated?: string
    startedTime?: string
    completedTime?: string
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    manuallyCreated?: boolean
    automationConfig?: {
      flowId: { ... }
      executionId?: { ... }
      executionStatus?: { ... }
    }
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
    taxonomies?: string[]
  }>
  taxonomies?: string[]
}
```

### `StepId`

```ts
type StepId = {
  id?: string
  entityRefId?: string
}
```

### `StepSimplified`

```ts
type StepSimplified = {
  id: string
  definitionId?: string
  entityRefId?: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  type: "STEP" | "SECTION"
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  enabled?: boolean
  requirements?: Array<{
    definitionId: string
    type: "STEP" | "SECTION"
    condition: "CLOSED"
  }>
  executionType?: "MANUAL" | "AUTOMATION"
}
```

### `Step`

```ts
type Step = {
  id: string
  definitionId?: string
  entityRefId?: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  type: "STEP" | "SECTION"
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  enabled?: boolean
  requirements?: Array<{
    definitionId: string
    type: "STEP" | "SECTION"
    condition: "CLOSED"
  }>
  executionType?: "MANUAL" | "AUTOMATION"
  sectionId?: string
  executionId?: string
  userIds?: number[]
  assignedTo?: string[]
  assignedToInProgress?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  created?: string
  lastUpdated?: string
  statusLastUpdated?: string
  startedTime?: string
  completedTime?: string
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  manuallyCreated?: boolean
  automationConfig?: {
    flowId: string
    executionId?: string
    executionStatus?: string
  }
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  taxonomies?: string[]
}
```

### `StepExtended`

```ts
type StepExtended = {
  executionId: string
  executionName: string
  executionStatus: "STARTED" | "DONE" | "CLOSED"
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
}
```

### `StepStatus`

**Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
- **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
- **ASSIGNED**: Step has been assi

```ts
type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
```

### `SectionStatus`

```ts
type SectionStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED"
```

### `StepType`

```ts
type StepType = "MANUAL" | "AUTOMATION"
```

### `StepJourney`

```ts
type StepJourney = {
  id?: string
  journeyId?: string
  name?: string
  complete_task_automatically?: boolean
}
```

### `AutomationConfig`

Configuration for automation execution to run

```ts
type AutomationConfig = {
  flowId: string
  executionId?: string
  executionStatus?: string
}
```

### `ECPDetails`

Details regarding ECP for the workflow step

```ts
type ECPDetails = {
  enabled?: boolean
  label?: string
  description?: string
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
}
```

### `StepDescription`

Longer information regarding Task

```ts
type StepDescription = {
  enabled?: boolean
  value?: string
}
```

### `ItemType`

```ts
type ItemType = "STEP" | "SECTION"
```

### `TriggerType`

```ts
type TriggerType = "MANUAL" | "AUTOMATIC"
```

### `CreateStepReq`

```ts
type CreateStepReq = {
  insertionIndex: number
  name: string
  description?: {
    enabled: boolean
    value: string
  }
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  sectionId?: string
  executionType?: "MANUAL" | "AUTOMATION"
  automationConfig?: {
    flowId: string
    executionId?: string
    executionStatus?: string
  }
}
```

### `UpdateStepReq`

```ts
type UpdateStepReq = {
  stepId?: string
  entityRefId?: string
  userIds?: number[]
  assignedTo?: string[]
  assignedToInProgress?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  name?: string
  description?: {
    enabled: boolean
    value: string
  }
  position?: {
    index: number
    sectionId?: string
  }
  automationConfig?: {
    flowId: string
    executionId?: string
    executionStatus?: string
  }
  startedTime?: string
  completedTime?: string
}
```

### `StepPositionAt`

```ts
type StepPositionAt = {
  index: number
  sectionId?: string
}
```

### `UpdateStepResp`

```ts
type UpdateStepResp = {
  id: string
  definitionId?: string
  entityRefId?: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  type: "STEP" | "SECTION"
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  enabled?: boolean
  requirements?: Array<{
    definitionId: string
    type: "STEP" | "SECTION"
    condition: "CLOSED"
  }>
  executionType?: "MANUAL" | "AUTOMATION"
  sectionId?: string
  executionId?: string
  userIds?: number[]
  assignedTo?: string[]
  assignedToInProgress?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  created?: string
  lastUpdated?: string
  statusLastUpdated?: string
  startedTime?: string
  completedTime?: string
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  manuallyCreated?: boolean
  automationConfig?: {
    flowId: string
    executionId?: string
    executionStatus?: string
  }
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  taxonomies?: string[]
}
```

### `SearchStepsResp`

```ts
type SearchStepsResp = {
  hits?: number
  results?: Array<{
    executionId: string
    executionName: string
    executionStatus: "STARTED" | "DONE" | "CLOSED"
    contexts?: Array<{
      id: { ... }
      title: { ... }
      schema: { ... }
    }>
  }>
}
```

### `SearchExecutionsReq`

```ts
type SearchExecutionsReq = {
  name?: string
  status?: "STARTED" | "DONE" | "CLOSED"
  includeDoneWorkflows?: boolean
  assignedTo?: string
  sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC"
  pagination?: {
    orgId?: string
    creationTime?: string
  }
}
```

### `SearchExecutionsResp`

```ts
type SearchExecutionsResp = {
  executions: Array<{
    id?: string
    definitionId?: string
    orgId?: string
    name?: string
    creationTime?: string
    lastUpdateTime?: string
    dueDate?: string
    completedTime?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    status?: "STARTED" | "DONE" | "CLOSED"
    trigger?: "MANUAL" | "AUTOMATIC"
    assignedTo?: string[]
    lastModifiedBy?: string
    contexts?: Array<{
      id: { ... }
      title: { ... }
      schema: { ... }
    }>
    nextOpenStep?: {
      id?: { ... }
      entityRefId?: { ... }
    }
    configuredClosingReasonSnapshot?: Array<{
      id: { ... }
      title: { ... }
    }>
    selectedClosingReasons?: Array<{
      id: { ... }
      title: { ... }
    }>
    closingReasonDescription?: string
    enableECPWorkflow?: boolean
    updateEntityAttributes?: Array<{
      source: { ... }
      target: { ... }
    }>
    version?: number
    taxonomies?: string[]
    singleClosingReasonSelection?: boolean
    flow: Array<{
      id: { ... }
      definitionId?: { ... }
      name: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      status?: { ... }
      type: { ... }
      steps: { ... }
      taxonomies?: { ... }
    } | {
      id: { ... }
      definitionId?: { ... }
      entityRefId?: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      status?: { ... }
      created?: { ... }
      lastUpdated?: { ... }
      statusLastUpdated?: { ... }
      startedTime?: { ... }
      completedTime?: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      manuallyCreated?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      taxonomies?: { ... }
    }>
  }>
  lastEvaluatedKey?: {
    orgId?: string
    creationTime?: string
  }
}
```

### `LastEvaluatedKey`

```ts
type LastEvaluatedKey = {
  orgId?: string
  creationTime?: string
}
```

### `SearchStepsReq`

```ts
type SearchStepsReq = {
  executionName?: string
  stepName?: string
  assignedTo?: number
  includeDoneWorkflows?: boolean
  manuallyCreated?: boolean
  status?: "OPEN" | "COMPLETE" | "NEXT_OPEN_ITEM_IN_WORKFLOW"
  sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC"
  pagination?: {
    from?: number
    size?: number
  }
}
```

### `SearchSorting`

```ts
type SearchSorting = "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC"
```

### `SearchPagination`

```ts
type SearchPagination = {
  from?: number
  size?: number
}
```

### `ExecutionPaginationDynamo`

```ts
type ExecutionPaginationDynamo = {
  orgId?: string
  creationTime?: string
}
```

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
}
```

### `ClosingReasonResp`

```ts
type ClosingReasonResp = {
  reasons?: Array<{
    id: string
    title: string
  }>
}
```

### `PhaseInEntity`

```ts
type PhaseInEntity = {
  phase_id?: string
  phase_name?: string
  phase_progress?: number
  phase_assignees?: string[]
}
```

### `WorkflowInEntity`

```ts
type WorkflowInEntity = {
  id?: string
  definition_id?: string
  name?: string
  status?: "STARTED" | "DONE" | "CLOSED"
  assignees?: string[]
  duedate?: string // date-time
  last_update_time?: string // date-time
  progress?: number
  upcoming_tasks_assignees?: string[]
  task_id?: string
  task_name?: string
  task_assignees?: string[]
  task_duedate?: string // date-time
  task_execution_type?: "MANUAL" | "AUTOMATION"
  task_status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  phase_id?: string
  phase_name?: string
  phase_assignees?: string[]
  phase_progress?: number
  phases_in_progress?: Array<{
    phase_id?: string
    phase_name?: string
    phase_progress?: number
    phase_assignees?: string[]
  }>
  selected_closing_reasons?: Array<{
    id: string
    title: string
  }>
  closing_reason_description?: string
}
```

### `UpdateEntityAttributes`

```ts
type UpdateEntityAttributes = {
  source: "workflow_status" | "current_section" | "current_step"
  target: {
    entitySchema: string
    entityAttribute: string
  }
}
```

### `EntitySync`

```ts
type EntitySync = {
  trigger: {
    event: "FlowStarted" | "FlowCompleted" | "FlowCancelled" | "FlowReopened" | "FlowDeleted" | "FlowAssigned" | "FlowDueDateChanged" | "FlowContextsChanged" | "TaskUpdated" | "CurrTaskChanged" | "TaskCompleted" | "TaskSkipped" | "TaskMarkedInProgress" | "TaskMarkedOnHold" | "PhaseUpdated" | "PhaseCompleted" | "PhaseSkipped" | "PhaseMarkedInProgress"
    filter?: {
      task_template_id?: { ... }
      phase_template_id?: { ... }
    }
  }
  value: {
    source: "workflow_name" | "workflow_status" | "workflow_assigned_to" | "task_name" | "task_status" | "task_assigned_to" | "phase_name" | "phase_status" | "phase_assigned_to" | "custom_value"
    value?: string
  }
  target: {
    entitySchema: string
    entityAttribute: string
  }
}
```

### `DynamicDueDate`

set a Duedate for a step then a specific

```ts
type DynamicDueDate = {
  numberOfUnits: number
  timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
  actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
  stepId?: string
  phaseId?: string
}
```

### `StepRequirement`

describe the requirement for step enablement

```ts
type StepRequirement = {
  definitionId: string
  type: "STEP" | "SECTION"
  condition: "CLOSED"
}
```

### `StartFlowReq`

```ts
type StartFlowReq = {
  flow_template_id: string
  trigger?: {
    type?: "MANUAL" | "AUTOMATIC"
    automation_config?: {
      flow_id: { ... }
      execution_id?: { ... }
      execution_status?: { ... }
      error_reason?: { ... }
    }
  }
  contexts: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
  }>
  purposes?: string[]
}
```

### `SearchFlowsReq`

```ts
type SearchFlowsReq = {
  entity_id: string
  entity_schema: string
}
```

### `PatchFlowReq`

```ts
type PatchFlowReq = {
  status?: "STARTED" | "DONE" | "CLOSED"
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  closing_reason?: {
    selected_reasons?: Array<{
      id: { ... }
      title: { ... }
    }>
    configured_reasons?: Array<{
      id: { ... }
      title: { ... }
    }>
    extra_description?: string
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  contexts?: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
  }>
}
```

### `FlowExecution`

```ts
type FlowExecution = {
  id: string
  flow_template_id: string
  org_id: string
  name: string
  created_at: string
  updated_at: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  status: "STARTED" | "DONE" | "CLOSED"
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string
    completed_at?: string
    closed_at?: string
    started_by?: string
    closed_by?: string
  }
  contexts: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
  }>
  crt_tasks: Array<{
    id?: string
  }>
  phases?: Array<{
    id: string
    template_id: string
    name: string
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
    updated_at?: string
    due_date?: string
    due_date_config?: {
      duration: { ... }
      unit: { ... }
      type: { ... }
      task_id?: { ... }
      phase_id?: { ... }
    }
    assigned_to?: Array<string | {
      variable: { ... }
      value?: { ... }
    }>
    analytics?: {
      started_at?: { ... }
      in_progress_at?: { ... }
      completed_at?: { ... }
      status_updated_at?: { ... }
      in_progress_by?: { ... }
      completed_by?: { ... }
      skipped_by?: { ... }
    }
    taxonomies?: string[]
    loop_config?: {
      max_iterations: { ... }
      crt_iterations?: { ... }
    }
  }>
  tasks: Array<{
    id: string
    template_id: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
    due_date?: string
    due_date_config?: {
      duration: { ... }
      unit: { ... }
      type: { ... }
      task_id?: { ... }
      phase_id?: { ... }
    }
    requirements?: Array<{
      task_id?: { ... }
      phase_id?: { ... }
      when: { ... }
    }>
    assigned_to?: Array<string | {
      variable: { ... }
      value?: { ... }
    }>
  // ...
}
```

### `FlowClosingReason`

```ts
type FlowClosingReason = {
  selected_reasons?: Array<{
    id: string
    title: string
  }>
  configured_reasons?: Array<{
    id: string
    title: string
  }>
  extra_description?: string
}
```

### `FlowTrigger`

```ts
type FlowTrigger = {
  type?: "MANUAL" | "AUTOMATIC"
  automation_config?: {
    flow_id: string
    execution_id?: string
    execution_status?: string
    error_reason?: string
  }
}
```

### `FlowContext`

```ts
type FlowContext = {
  entity_id?: string
  entity_schema?: string
  is_primary?: boolean
}
```

### `EntityRef`

```ts
type EntityRef = {
  entity_id?: string
  entity_schema?: string
  is_primary?: boolean
}
```

### `PhaseId`

```ts
type PhaseId = string
```

### `TaskId`

```ts
type TaskId = string
```

### `Task`

```ts
type Task = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  loop_config?: {
    max_iterations: number
    crt_iterations?: number
  }
} | {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
  // ...
}
```

### `TaskType`

```ts
type TaskType = "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
```

### `ManualTask`

```ts
type ManualTask = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  loop_config?: {
    max_iterations: number
    crt_iterations?: number
  }
}
```

### `AutomationTask`

```ts
type AutomationTask = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  automation_config: {
    flow_id: string
    execution_id?: string
    execution_status?: string
    error_reason?: string
  }
  automation_execution_id?: string
  trigger_mode?: "manual" | "automatic"
  schedule?: {
    mode: "immediate"
  } | {
    mode: "delayed"
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    schedule_id?: string
  } | {
    mode: "relative"
    direction: "before" | "after"
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    reference: {
      id: { ... }
      origin: { ... }
      schema?: { ... }
      attribute?: { ... }
    }
    schedule_id?: string
  }
  loop_config?: {
    max_iterations: number
  // ...
}
```

### `LoopInfo`

Information about loop iterations, when task is part of a loop branch

```ts
type LoopInfo = {
  max_iterations: number
  crt_iterations?: number
}
```

### `LoopConfig`

```ts
type LoopConfig = {
  loop_branch_id: string
  exit_branch_id: string
  max_iterations: number
  crt_iterations?: number
}
```

### `TriggerMode`

```ts
type TriggerMode = "manual" | "automatic"
```

### `ActionSchedule`

```ts
type ActionSchedule = {
  mode: "immediate"
} | {
  mode: "delayed"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  schedule_id?: string
} | {
  mode: "relative"
  direction: "before" | "after"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  reference: {
    id: string
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute" | "all_preceding_tasks_completed"
    schema?: string
    attribute?: string
  }
  schedule_id?: string
}
```

### `ImmediateSchedule`

```ts
type ImmediateSchedule = {
  mode: "immediate"
}
```

### `DelayedSchedule`

```ts
type DelayedSchedule = {
  mode: "delayed"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  schedule_id?: string
}
```

### `RelativeSchedule`

```ts
type RelativeSchedule = {
  mode: "relative"
  direction: "before" | "after"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  reference: {
    id: string
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute" | "all_preceding_tasks_completed"
    schema?: string
    attribute?: string
  }
  schedule_id?: string
}
```

### `DecisionTask`

```ts
type DecisionTask = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  trigger_mode: "manual" | "automatic"
  conditions: Array<{
    id: string
    branch_name: string
    logical_operator: "AND" | "OR"
    statements: Array<{
      id: { ... }
      source: { ... }
      operator: { ... }
      values: { ... }
    }>
    evaluated_at?: string // date-time
    is_met?: boolean
  }>
  schedule?: {
    mode: "delayed"
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    schedule_id?: string
  } | {
    mode: "relative"
    direction: "before" | "after"
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    reference: {
      id: { ... }
      origin: { ... }
      schema?: { ... }
      attribute?: { ... }
    }
  // ...
}
```

### `AiAgentTask`

```ts
type AiAgentTask = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  agent_config?: {
    agent_id: string
    parameters?: object
  }
  loop_config?: {
    max_iterations: number
    crt_iterations?: number
  }
  agent_execution?: {
    execution_id?: string
    execution_status?: string
    error_reason?: string
  }
  agent_execution_id?: string
}
```

### `AgentConfig`

Configuration for AI Agent to run

```ts
type AgentConfig = {
  agent_id: string
  parameters?: object
}
```

### `AgentExecutionInfo`

```ts
type AgentExecutionInfo = {
  execution_id?: string
  execution_status?: string
  error_reason?: string
}
```

### `TaskBase`

```ts
type TaskBase = {
  id: string
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
  manually_created?: boolean
  enabled: boolean
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
}
```

### `Phase`

```ts
type Phase = {
  id: string
  template_id: string
  name: string
  status?: "OPEN" | "IN_PROGRESS" | "COMPLETED"
  updated_at?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  analytics?: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_by?: string
  }
  taxonomies?: string[]
  loop_config?: {
    max_iterations: number
    crt_iterations?: number
  }
}
```

### `Edge`

```ts
type Edge = {
  id: string
  from_id: string
  to_id: string
  condition_id?: string
  none_met?: boolean
}
```

### `AutomationInfo`

```ts
type AutomationInfo = {
  flow_id: string
  execution_id?: string
  execution_status?: string
  error_reason?: string
}
```

### `AnalyticsInfo`

```ts
type AnalyticsInfo = {
  started_at?: string // date-time
  in_progress_at?: string // date-time
  completed_at?: string // date-time
  status_updated_at?: string // date-time
  in_progress_by?: string
  completed_by?: string
  skipped_by?: string
}
```

### `ConditionId`

A locally unique identifier for the condition

```ts
type ConditionId = string
```

### `Condition`

```ts
type Condition = {
  id: string
  branch_name: string
  logical_operator: "AND" | "OR"
  statements: Array<{
    id: string
    source: {
      id?: { ... }
      origin?: { ... }
      origin_type?: { ... }
      schema?: { ... }
      attribute?: { ... }
      attribute_type?: { ... }
      attribute_repeatable?: { ... }
      attribute_operation?: { ... }
      attribute_sub_field?: { ... }
    }
    operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
    values: string[]
  }>
  evaluated_at?: string // date-time
  is_met?: boolean
}
```

### `Statement`

```ts
type Statement = {
  id: string
  source: {
    id?: string
    origin?: "trigger" | "action"
    origin_type?: "entity" | "workflow" | "journey_block"
    schema?: string
    attribute?: string
    attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "message_email_address"
    attribute_repeatable?: boolean
    attribute_operation?: "all" | "updated" | "added" | "deleted"
    attribute_sub_field?: string
  }
  operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
  values: string[]
}
```

### `EvaluationSource`

```ts
type EvaluationSource = {
  id?: string
  origin?: "trigger" | "action"
  origin_type?: "entity" | "workflow" | "journey_block"
  schema?: string
  attribute?: string
  attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "message_email_address"
  attribute_repeatable?: boolean
  attribute_operation?: "all" | "updated" | "added" | "deleted"
  attribute_sub_field?: string
}
```

### `Operator`

```ts
type Operator = "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
```

### `DueDateConfig`

Set due date for the task based on a dynamic condition

```ts
type DueDateConfig = {
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
  task_id?: string
  phase_id?: string
}
```

### `TimeUnit`

```ts
type TimeUnit = "minutes" | "hours" | "days" | "weeks" | "months"
```

### `EnableRequirement`

describe the requirement for a task to be enabled

```ts
type EnableRequirement = {
  task_id?: string
  phase_id?: string
  when: "TASK_FINISHED" | "PHASE_FINISHED"
}
```

### `FlowTemplateId`

```ts
type FlowTemplateId = string
```

### `FlowExecutionId`

```ts
type FlowExecutionId = string
```

### `UserId`

The user id

```ts
type UserId = string
```

### `VariableAssignment`

Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution.

```ts
type VariableAssignment = {
  variable: string
  value?: string[]
}
```

### `Assignees`

The user ids or variable assignments

```ts
type Assignees = Array<string | {
  variable: string
  value?: string[]
}>
```

### `PatchTaskReq`

```ts
type PatchTaskReq = {
  name?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  enabled?: boolean
  automation_config?: {
    flow_id: string
    execution_id?: string
    execution_status?: string
    error_reason?: string
  }
  description?: {
    enabled?: boolean
    value?: string
  }
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  installer?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      complete_task_automatically?: { ... }
    }
  }
  next_condition_id?: string
  revert_execution?: boolean
}
```

### `PatchPhaseReq`

```ts
type PatchPhaseReq = {
  name?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
}
```

### `AddTaskReq`

```ts
type AddTaskReq = {
  previous_task_id: string // uuid
  next_task_id: string // uuid
  task: {
    id?: string // uuid
    name: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED"
    due_date?: string
    due_date_config?: {
      duration: { ... }
      unit: { ... }
      type: { ... }
      task_id?: { ... }
      phase_id?: { ... }
    }
    assigned_to?: Array<string | {
      variable: { ... }
      value?: { ... }
    }>
    enabled?: boolean
    automation_config?: {
      flow_id: { ... }
      execution_id?: { ... }
      execution_status?: { ... }
      error_reason?: { ... }
    }
    phase_id?: string
    task_type?: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  }
}
```
