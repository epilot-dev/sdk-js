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

const workflowClient = getClient()
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
- [`bulkStartFlows`](#bulkstartflows)
- [`listBulkStartFlowsJobs`](#listbulkstartflowsjobs)
- [`getActiveBulkStartFlowsJob`](#getactivebulkstartflowsjob)
- [`getBulkStartFlowsJob`](#getbulkstartflowsjob)
- [`patchBulkStartFlowsJob`](#patchbulkstartflowsjob)
- [`restartBulkStartFlowsJob`](#restartbulkstartflowsjob)
- [`patchTask`](#patchtask)
- [`runTaskAutomation`](#runtaskautomation)
- [`previewTaskEmail`](#previewtaskemail)
- [`executeTask`](#executetask)
- [`patchPhase`](#patchphase)
- [`addTask`](#addtask)
- [`cancelTaskSchedule`](#canceltaskschedule)
- [`reconcileAutomationTask`](#reconcileautomationtask)
- [`runTaskScheduleNow`](#runtaskschedulenow)

**Portal Workflows**
- [`searchPortalWorkflows`](#searchportalworkflows)
- [`searchPortalWorkflowsBatch`](#searchportalworkflowsbatch)

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
- [`JourneyContextParameter`](#journeycontextparameter)
- [`AiPrefillConfig`](#aiprefillconfig)
- [`AiPrefillExtractionField`](#aiprefillextractionfield)
- [`AiPrefillMapping`](#aiprefillmapping)
- [`JourneyPrefill`](#journeyprefill)
- [`AutomationConfig`](#automationconfig)
- [`ECPDetails`](#ecpdetails)
- [`PartnerDetails`](#partnerdetails)
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
- [`TaskInEntity`](#taskinentity)
- [`WorkflowInEntity`](#workflowinentity)
- [`UpdateEntityAttributes`](#updateentityattributes)
- [`EntitySync`](#entitysync)
- [`DynamicDueDate`](#dynamicduedate)
- [`StepRequirement`](#steprequirement)
- [`StartFlowReq`](#startflowreq)
- [`SearchFlowsReq`](#searchflowsreq)
- [`PortalWorkflowsSearchReq`](#portalworkflowssearchreq)
- [`PortalAudience`](#portalaudience)
- [`PortalWorkflowsSearchResp`](#portalworkflowssearchresp)
- [`BulkStartFlowsReq`](#bulkstartflowsreq)
- [`BulkStartEntityRef`](#bulkstartentityref)
- [`BulkStartFlowsJobStatus`](#bulkstartflowsjobstatus)
- [`BulkStartFlowsItemStatus`](#bulkstartflowsitemstatus)
- [`BulkStartFlowsItem`](#bulkstartflowsitem)
- [`BulkStartFlowsFlowSummary`](#bulkstartflowsflowsummary)
- [`BulkStartFlowsJobCounts`](#bulkstartflowsjobcounts)
- [`BulkStartFlowsJob`](#bulkstartflowsjob)
- [`BulkStartFlowsJobSummary`](#bulkstartflowsjobsummary)
- [`ListBulkStartFlowsJobsResp`](#listbulkstartflowsjobsresp)
- [`ActiveBulkStartFlowsJobResp`](#activebulkstartflowsjobresp)
- [`PatchBulkStartFlowsJobReq`](#patchbulkstartflowsjobreq)
- [`PortalWorkflowsBatchSearchReq`](#portalworkflowsbatchsearchreq)
- [`PortalEntityRef`](#portalentityref)
- [`PortalWorkflowsBatchSearchResp`](#portalworkflowsbatchsearchresp)
- [`EntityPortalWorkflows`](#entityportalworkflows)
- [`PortalWorkflow`](#portalworkflow)
- [`PortalWorkflowTask`](#portalworkflowtask)
- [`PortalWorkflowStage`](#portalworkflowstage)
- [`PatchFlowReq`](#patchflowreq)
- [`FlowExecution`](#flowexecution)
- [`FlowClosingReason`](#flowclosingreason)
- [`FlowTrigger`](#flowtrigger)
- [`ConfiguredTrigger`](#configuredtrigger)
- [`VisibleEntity`](#visibleentity)
- [`FlowContext`](#flowcontext)
- [`EntityRef`](#entityref)
- [`PhaseId`](#phaseid)
- [`TaskId`](#taskid)
- [`Task`](#task)
- [`TaskType`](#tasktype)
- [`ManualTask`](#manualtask)
- [`AutomationTask`](#automationtask)
- [`AutomationFailurePolicy`](#automationfailurepolicy)
- [`LoopInfo`](#loopinfo)
- [`LoopExecutionState`](#loopexecutionstate)
- [`LoopMembership`](#loopmembership)
- [`LoopOutcome`](#loopoutcome)
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
- [`TaskAudience`](#taskaudience)
- [`TaskBase`](#taskbase)
- [`Stage`](#stage)
- [`Phase`](#phase)
- [`Edge`](#edge)
- [`AutomationInfo`](#automationinfo)
- [`JourneyExecutionInfo`](#journeyexecutioninfo)
- [`AutomationInputContext`](#automationinputcontext)
- [`AutomationInputExtraContextRef`](#automationinputextracontextref)
- [`AutomationInputExtraTaskRef`](#automationinputextrataskref)
- [`AutomationOutputContext`](#automationoutputcontext)
- [`AnalyticsInfo`](#analyticsinfo)
- [`ConditionResult`](#conditionresult)
- [`TaskIteration`](#taskiteration)
- [`ConditionId`](#conditionid)
- [`Condition`](#condition)
- [`Statement`](#statement)
- [`EvaluationSource`](#evaluationsource)
- [`Operator`](#operator)
- [`DueDateConfig`](#duedateconfig)
- [`StartDateConfig`](#startdateconfig)
- [`TimeUnit`](#timeunit)
- [`EnableRequirement`](#enablerequirement)
- [`Subtask`](#subtask)
- [`SubtaskState`](#subtaskstate)
- [`FlowTemplateId`](#flowtemplateid)
- [`FlowExecutionId`](#flowexecutionid)
- [`UserId`](#userid)
- [`EcpPlaceholderAssignees`](#ecpplaceholderassignees)
- [`VariableAssignment`](#variableassignment)
- [`Assignees`](#assignees)
- [`RunTaskAutomationReq`](#runtaskautomationreq)
- [`TaskAutomationActionInputs`](#taskautomationactioninputs)
- [`CancelFlowExecutionInputs`](#cancelflowexecutioninputs)
- [`TaskEmailPreview`](#taskemailpreview)
- [`EmailReviewConfig`](#emailreviewconfig)
- [`SendEmailInputs`](#sendemailinputs)
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

Creates a new V1 Workflow Execution from a workflow definition (template).

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

Retrieves a complete V1 workflow execution by ID, including all steps information.

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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
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
  "assignedToOnHold": "string",
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "taxonomies": ["string"]
}
```

</details>

---

### `updateStep`

Updates a workflow execution step with new values for status, assignees, due date, position, and more.

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
    assignedToOnHold: 'string',
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
    journey: {
      id: 'string',
      journeyId: 'string',
      name: 'string',
      portal_button_label: 'string',
      complete_task_automatically: true,
      journey_submission_required: true,
      context_parameters: [
        {
          key: 'string',
          value: 'string'
        }
      ],
      ai_prefill: {
        enabled: false,
        source: {
          type: 'flow_context',
          input_entity: 'last_email'
        },
        extraction_fields: [
          {
            key: 'string',
            type: 'string',
            description: 'string',
            description_overridden: true,
            enum: ['string']
          }
        ],
        mappings: [
          {
            source: 'string',
            block_id: 'string',
            block_type: 'text-input',
            block_field: 'string'
          }
        ],
        min_confidence: 0.8,
        instructions: 'string'
      }
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
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
  "assignedToOnHold": "string",
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
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

Starts a new Flow Execution based on a flow template (definition).

`POST /v2/flows/executions`

```ts
const { data } = await client.startFlowExecution(
  null,
  {
    flow_template_id: 'tpl_abc123def456',
    trigger: {
      type: 'MANUAL',
      automation_config: {
        flow_id: 'string',
        execution_id: 'string',
        execution_status: 'string',
        error_reason: 'string',
        input_context: {
          source: 'main_context',
          task_id: 'string',
          trigger_id: 'string',
          with_relations: true,
          also_pass: [
            {
              source: 'main_context'
            }
          ]
        },
        output_context: {
          set_as_primary: true,
          attach_to_contexts: true
        },
        heal_attempts: 0,
        run_for_user_id: 'string',
        last_heal_attempted_at: '1970-01-01T00:00:00.000Z',
        wait_for_journey_submission: true,
        journey_id: 'string',
        journey_execution: {
          execution_id: 'string',
          execution_status: 'string',
          error_reason: 'string',
          submission_entity_id: 'string',
          submission_created_at: '1970-01-01T00:00:00.000Z',
          wait_overridden_at: '1970-01-01T00:00:00.000Z',
          wait_overridden_by: 'string'
        },
        eligible_closing_reason_ids: ['string'],
        allow_execution_note: true,
        email_review: {
          enabled: true,
          allow_document_selection: true,
          allow_subject_and_body_edit: true
        }
      },
      trigger_id: 'string'
    },
    contexts: [
      {
        entity_id: 'string',
        entity_schema: 'string',
        is_primary: false,
        promoted_by_task_id: 'string',
        promoted_at: '1970-01-01T00:00:00.000Z',
        demoted_by_task_id: 'string',
        added_by_task_id: 'string'
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
  "loop_source": "loops",
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
    "started_by_org_id": "string",
    "closed_by": "string",
    "completed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false,
      "promoted_by_task_id": "string",
      "promoted_at": "1970-01-01T00:00:00.000Z",
      "demoted_by_task_id": "string",
      "added_by_task_id": "string"
    }
  ],
  "visibility": "entity_views",
  "visible_on": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "kind": "context",
      "anchor_entity_id": "string",
      "rule_id": "string"
    }
  ],
  "crt_tasks": [
    {
      "id": "string",
      "crt_since": "1970-01-01T00:00:00.000Z"
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
      "loop_config": {},
      "loop_membership": []
    }
  ],
  "stages": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "entry_node_id": "string",
      "cut_edge_ids": ["string"],
      "color": "string",
      "portal_names": {},
      "portal_descriptions": {}
    }
  ],
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "tasks": [
    {
      "id": "string",
      "loop_membership": [],
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "journey_prefill": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "start_date": "2021-04-27T12:00:00.000Z",
      "start_date_config": {},
      "requirements": [],
      "required": true,
      "subtasks": [],
      "subtask_states": {},
      "journey_submission": {},
      "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
      "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
      "assigned_to": ["string"],
      "ecp_placeholder_assignees": {},
      "analytics": {},
      "loop_iterations": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "partner": {},
      "audience_order": ["description"],
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
      "none_met": true,
      "loop_id": "string"
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "_automation_chain": ["string"],
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
      "error_reason": "string",
      "input_context": {},
      "output_context": {},
      "heal_attempts": 0,
      "run_for_user_id": "string",
      "last_heal_attempted_at": "1970-01-01T00:00:00.000Z",
      "wait_for_journey_submission": true,
      "journey_id": "string",
      "journey_execution": {},
      "eligible_closing_reason_ids": ["string"],
      "allow_execution_note": true,
      "email_review": {}
    },
    "trigger_id": "string"
  },
  "configured_triggers": [
    {
      "id": "string",
      "type": "string",
      "primary": true,
      "entity_schema": "string",
      "automation_id": "string",
      "journey_id": "string"
    }
  ],
  "singleClosingReasonSelection": true,
  "linear": true
}
```

</details>

---

### `getFlowExecution`

Retrieves a complete flow execution by ID, including all phases, tasks, edges, contexts, and analytics.

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
  "loop_source": "loops",
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
    "started_by_org_id": "string",
    "closed_by": "string",
    "completed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false,
      "promoted_by_task_id": "string",
      "promoted_at": "1970-01-01T00:00:00.000Z",
      "demoted_by_task_id": "string",
      "added_by_task_id": "string"
    }
  ],
  "visibility": "entity_views",
  "visible_on": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "kind": "context",
      "anchor_entity_id": "string",
      "rule_id": "string"
    }
  ],
  "crt_tasks": [
    {
      "id": "string",
      "crt_since": "1970-01-01T00:00:00.000Z"
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
      "loop_config": {},
      "loop_membership": []
    }
  ],
  "stages": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "entry_node_id": "string",
      "cut_edge_ids": ["string"],
      "color": "string",
      "portal_names": {},
      "portal_descriptions": {}
    }
  ],
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "tasks": [
    {
      "id": "string",
      "loop_membership": [],
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "journey_prefill": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "start_date": "2021-04-27T12:00:00.000Z",
      "start_date_config": {},
      "requirements": [],
      "required": true,
      "subtasks": [],
      "subtask_states": {},
      "journey_submission": {},
      "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
      "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
      "assigned_to": ["string"],
      "ecp_placeholder_assignees": {},
      "analytics": {},
      "loop_iterations": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "partner": {},
      "audience_order": ["description"],
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
      "none_met": true,
      "loop_id": "string"
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "_automation_chain": ["string"],
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
      "error_reason": "string",
      "input_context": {},
      "output_context": {},
      "heal_attempts": 0,
      "run_for_user_id": "string",
      "last_heal_attempted_at": "1970-01-01T00:00:00.000Z",
      "wait_for_journey_submission": true,
      "journey_id": "string",
      "journey_execution": {},
      "eligible_closing_reason_ids": ["string"],
      "allow_execution_note": true,
      "email_review": {}
    },
    "trigger_id": "string"
  },
  "configured_triggers": [
    {
      "id": "string",
      "type": "string",
      "primary": true,
      "entity_schema": "string",
      "automation_id": "string",
      "journey_id": "string"
    }
  ],
  "singleClosingReasonSelection": true,
  "linear": true
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
        is_primary: false,
        promoted_by_task_id: 'string',
        promoted_at: '1970-01-01T00:00:00.000Z',
        demoted_by_task_id: 'string',
        added_by_task_id: 'string'
      }
    ],
    visibility: 'entity_views',
    visible_on: [
      {
        entity_id: 'string',
        entity_schema: 'string',
        kind: 'context',
        anchor_entity_id: 'string',
        rule_id: 'string'
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
  "loop_source": "loops",
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
    "started_by_org_id": "string",
    "closed_by": "string",
    "completed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false,
      "promoted_by_task_id": "string",
      "promoted_at": "1970-01-01T00:00:00.000Z",
      "demoted_by_task_id": "string",
      "added_by_task_id": "string"
    }
  ],
  "visibility": "entity_views",
  "visible_on": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "kind": "context",
      "anchor_entity_id": "string",
      "rule_id": "string"
    }
  ],
  "crt_tasks": [
    {
      "id": "string",
      "crt_since": "1970-01-01T00:00:00.000Z"
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
      "loop_config": {},
      "loop_membership": []
    }
  ],
  "stages": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "entry_node_id": "string",
      "cut_edge_ids": ["string"],
      "color": "string",
      "portal_names": {},
      "portal_descriptions": {}
    }
  ],
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "tasks": [
    {
      "id": "string",
      "loop_membership": [],
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "journey_prefill": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "start_date": "2021-04-27T12:00:00.000Z",
      "start_date_config": {},
      "requirements": [],
      "required": true,
      "subtasks": [],
      "subtask_states": {},
      "journey_submission": {},
      "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
      "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
      "assigned_to": ["string"],
      "ecp_placeholder_assignees": {},
      "analytics": {},
      "loop_iterations": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "partner": {},
      "audience_order": ["description"],
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
      "none_met": true,
      "loop_id": "string"
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "_automation_chain": ["string"],
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
      "error_reason": "string",
      "input_context": {},
      "output_context": {},
      "heal_attempts": 0,
      "run_for_user_id": "string",
      "last_heal_attempted_at": "1970-01-01T00:00:00.000Z",
      "wait_for_journey_submission": true,
      "journey_id": "string",
      "journey_execution": {},
      "eligible_closing_reason_ids": ["string"],
      "allow_execution_note": true,
      "email_review": {}
    },
    "trigger_id": "string"
  },
  "configured_triggers": [
    {
      "id": "string",
      "type": "string",
      "primary": true,
      "entity_schema": "string",
      "automation_id": "string",
      "journey_id": "string"
    }
  ],
  "singleClosingReasonSelection": true,
  "linear": true
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
    entity_schema: 'string',
    include_background: false
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
      "loop_source": "loops",
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
      "visibility": "entity_views",
      "visible_on": [],
      "crt_tasks": [],
      "phases": [],
      "stages": [],
      "portal_titles": {},
      "tasks": [],
      "edges": [],
      "_execution_chain": {},
      "_automation_chain": ["string"],
      "closing_reason": {},
      "available_in_ecp": true,
      "entity_sync": [],
      "taxonomies": ["string"],
      "trigger": {},
      "configured_triggers": [],
      "singleClosingReasonSelection": true,
      "linear": true
    }
  ]
}
```

</details>

---

### `searchPortalWorkflows`

Returns all portal-relevant workflow executions for a given entity, linearized into a
flat, ordered list of portal-visible steps. Intended to be called by the Customer Portal
API (ECP / Installer Port

`POST /v2/flows/executions:portal-search`

```ts
const { data } = await client.searchPortalWorkflows(
  null,
  {
    entity_id: 'string',
    entity_schema: 'order',
    audience: 'ecp'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "workflows": [
    {
      "id": "string",
      "definition_id": "string",
      "name": "string",
      "status": "STARTED",
      "version": 2,
      "created_at": "string",
      "updated_at": "string",
      "completed_at": "string",
      "due_date": "string",
      "assigned_to": ["string"],
      "contexts": [],
      "is_path_complete": true,
      "tasks": [],
      "stages": [],
      "portal_titles": {}
    }
  ]
}
```

</details>

---

### `searchPortalWorkflowsBatch`

Batch variant of `searchPortalWorkflows`: returns portal-relevant workflow
executions for MANY entities in a single call — schemas may differ — each
linearized into a flat, ordered list of portal-visi

`POST /v2/flows/executions:portal-search-batch`

```ts
const { data } = await client.searchPortalWorkflowsBatch(
  null,
  {
    entities: [
      {
        entity_id: 'string',
        entity_schema: 'order'
      }
    ],
    audience: 'ecp'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "entity_id": "string",
      "workflows": []
    }
  ]
}
```

</details>

---

### `bulkStartFlows`

Creates a job that starts one or more flows on many entities: every flow in
`flow_template_ids` is started on every entity in `entities` (up to 5 flows,
200 entities, 1000 starts). Every start is manu

`POST /v2/flows/executions:bulk-start`

```ts
const { data } = await client.bulkStartFlows(
  null,
  {
    flow_template_ids: ['string'],
    entities: [
      {
        entity_id: 'string',
        entity_schema: 'opportunity'
      }
    ],
    purposes: ['string']
  },
)
```

---

### `listBulkStartFlowsJobs`

Lists the organization's approved bulk-start jobs, newest approval first,
with their counts but without items. Jobs never approved (still awaiting
approval, or expired) are not listed. Jobs are kept f

`GET /v2/flows/bulk-jobs`

```ts
const { data } = await client.listBulkStartFlowsJobs({
  size: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "job_id": "string",
      "org_id": "string",
      "status": "awaiting_approval",
      "created_by": "string",
      "created_by_org_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "approved_at": "1970-01-01T00:00:00.000Z",
      "approved_by": "string",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "cancel_requested": true,
      "restart_of": "string",
      "restarted_by": "string",
      "flows": [
        {
          "flow_template_id": "string",
          "flow_name": "string",
          "will_start": 0,
          "skipped": 0
        }
      ],
      "entity_schema": "string",
      "entity_ids": ["string"],
      "entity_count": 0,
      "counts": {
        "total": 0,
        "pending": 0,
        "started": 0,
        "failed": 0,
        "skipped": 0,
        "cancelled": 0
      }
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getActiveBulkStartFlowsJob`

Returns the caller's bulk-start job in flight (`queued` or `running`), or
`job: null` when there is none.

`GET /v2/flows/bulk-jobs:active`

```ts
const { data } = await client.getActiveBulkStartFlowsJob()
```

<details>
<summary>Response</summary>

```json
{
  "job": {
    "job_id": "string",
    "org_id": "string",
    "status": "awaiting_approval",
    "created_by": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "approved_by": "string",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "cancel_requested": true,
    "restart_of": "string",
    "restarted_by": "string",
    "flows": [
      {
        "flow_template_id": "string",
        "flow_name": "string",
        "will_start": 0,
        "skipped": 0
      }
    ],
    "counts": {
      "total": 0,
      "pending": 0,
      "started": 0,
      "failed": 0,
      "skipped": 0,
      "cancelled": 0
    },
    "items": [
      {
        "flow_template_id": "string",
        "entity_id": "string",
        "entity_schema": "string",
        "status": "pending",
        "execution_id": "string",
        "error_code": "string",
        "error_message": "string",
        "updated_at": "1970-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

</details>

---

### `getBulkStartFlowsJob`

Returns a bulk-start job with its counts and one item per (flow, entity)
pair, including the started execution id or the error.

`GET /v2/flows/bulk-jobs/{job_id}`

```ts
const { data } = await client.getBulkStartFlowsJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "string",
  "org_id": "string",
  "status": "awaiting_approval",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approved_by": "string",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "cancel_requested": true,
  "restart_of": "string",
  "restarted_by": "string",
  "flows": [
    {
      "flow_template_id": "string",
      "flow_name": "string",
      "will_start": 0,
      "skipped": 0
    }
  ],
  "counts": {
    "total": 0,
    "pending": 0,
    "started": 0,
    "failed": 0,
    "skipped": 0,
    "cancelled": 0
  },
  "items": [
    {
      "flow_template_id": "string",
      "entity_id": "string",
      "entity_schema": "string",
      "status": "pending",
      "execution_id": "string",
      "error_code": "string",
      "error_message": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `patchBulkStartFlowsJob`

Approves or cancels a bulk-start job.

`PATCH /v2/flows/bulk-jobs/{job_id}`

```ts
const { data } = await client.patchBulkStartFlowsJob(
  {
    job_id: 'example',
  },
  {
    action: 'APPROVE'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "string",
  "org_id": "string",
  "status": "awaiting_approval",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approved_by": "string",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "cancel_requested": true,
  "restart_of": "string",
  "restarted_by": "string",
  "flows": [
    {
      "flow_template_id": "string",
      "flow_name": "string",
      "will_start": 0,
      "skipped": 0
    }
  ],
  "counts": {
    "total": 0,
    "pending": 0,
    "started": 0,
    "failed": 0,
    "skipped": 0,
    "cancelled": 0
  },
  "items": [
    {
      "flow_template_id": "string",
      "entity_id": "string",
      "entity_schema": "string",
      "status": "pending",
      "execution_id": "string",
      "error_code": "string",
      "error_message": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `restartBulkStartFlowsJob`

Restarts what is left of an ended bulk-start job: creates a new job, in
`awaiting_approval`, from the job's `failed` items and the items it never
started (`cancelled`). Started and skipped items are n

`POST /v2/flows/bulk-jobs/{job_id}/restart`

```ts
const { data } = await client.restartBulkStartFlowsJob({
  job_id: 'example',
})
```

---

### `patchTask`

Updates attributes of a flow task including status, assignees, due date, and more.

`PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}`

```ts
const { data } = await client.patchTask(
  {
    execution_id: 'example',
    task_id: 'example',
  },
  {
    name: 'Review customer application',
    status: 'UNASSIGNED',
    due_date: '2026-05-28T00:00:00.000',
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
      error_reason: 'string',
      input_context: {
        source: 'main_context',
        task_id: 'string',
        trigger_id: 'string',
        with_relations: true,
        also_pass: [ /* ... */ ]
      },
      output_context: {
        set_as_primary: true,
        attach_to_contexts: true
      },
      heal_attempts: 0,
      run_for_user_id: 'string',
      last_heal_attempted_at: '1970-01-01T00:00:00.000Z',
      wait_for_journey_submission: true,
      journey_id: 'string',
      journey_execution: {
        execution_id: 'string',
        execution_status: 'string',
        error_reason: 'string',
        submission_entity_id: 'string',
        submission_created_at: '1970-01-01T00:00:00.000Z',
        wait_overridden_at: '1970-01-01T00:00:00.000Z',
        wait_overridden_by: 'string'
      },
      eligible_closing_reason_ids: ['string'],
      allow_execution_note: true,
      email_review: {
        enabled: true,
        allow_document_selection: true,
        allow_subject_and_body_edit: true
      }
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
        portal_button_label: 'string',
        complete_task_automatically: true,
        journey_submission_required: true,
        context_parameters: [ /* ... */ ],
        ai_prefill: { /* ... */ }
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
        portal_button_label: 'string',
        complete_task_automatically: true,
        journey_submission_required: true,
        context_parameters: [ /* ... */ ],
        ai_prefill: { /* ... */ }
      }
    },
    partner: {
      enabled: true,
      label: 'string',
      description: 'string'
    },
    subtask_states: {},
    next_condition_id: 'cond_branch_approved',
    next_condition_ids: ['cond_branch_a', 'cond_branch_b'],
    revert_execution: false,
    completed_via_journey: false,
    excluded_partner_org_ids: ['partner-org-1']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ],
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "journey_prefill": {
    "status": "PENDING",
    "agent_execution_id": "string",
    "dispatched_at": "1970-01-01T00:00:00.000Z",
    "extracted_at": "1970-01-01T00:00:00.000Z",
    "initial_state": {},
    "field_confidence": {},
    "dropped": [
      {}
    ]
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "start_date": "2021-04-27T12:00:00.000Z",
  "start_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "required": true,
  "subtasks": [
    {
      "id": "string",
      "name": "string",
      "party": "description",
      "required": true
    }
  ],
  "subtask_states": {},
  "journey_submission": {
    "submission_entity_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  },
  "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
  "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
  "assigned_to": ["string"],
  "ecp_placeholder_assignees": {
    "placeholder_ecp_customers": ["string"],
    "placeholder_ecp_installers": ["string"]
  },
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "loop_iterations": {},
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
  },
  "audience_order": ["description"],
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

Runs configured automation for a flow task. Running a `trigger_mode: manual` automation (an absent trigger mode counts as manual) is its person action, so it is permission-checked like completing a ta

`POST /v2/flows/executions/{execution_id}/tasks/{task_id}/automation:run`

```ts
const { data } = await client.runTaskAutomation(
  {
    execution_id: 'example',
    task_id: 'example',
  },
  {
    action_inputs: {
      cancel_flow_execution: {
        selected_closing_reason_ids: ['string'],
        extra_description: 'string'
      },
      send_email: {
        subject: 'string',
        body: 'string',
        attachment_entity_ids: ['string']
      }
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ],
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "journey_prefill": {
    "status": "PENDING",
    "agent_execution_id": "string",
    "dispatched_at": "1970-01-01T00:00:00.000Z",
    "extracted_at": "1970-01-01T00:00:00.000Z",
    "initial_state": {},
    "field_confidence": {},
    "dropped": [
      {}
    ]
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "start_date": "2021-04-27T12:00:00.000Z",
  "start_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "required": true,
  "subtasks": [
    {
      "id": "string",
      "name": "string",
      "party": "description",
      "required": true
    }
  ],
  "subtask_states": {},
  "journey_submission": {
    "submission_entity_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  },
  "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
  "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
  "assigned_to": ["string"],
  "ecp_placeholder_assignees": {
    "placeholder_ecp_customers": ["string"],
    "placeholder_ecp_installers": ["string"]
  },
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "loop_iterations": {},
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
  },
  "audience_order": ["description"],
  "taxonomies": ["string"],
  "phase_id": "string",
  "task_type": "MANUAL",
  "automation_config": {
    "flow_id": "string",
    "execution_id": "string",
    "execution_status": "string",
    "error_reason": "string",
    "input_context": {
      "source": "main_context",
      "task_id": "string",
      "trigger_id": "string",
      "with_relations": true,
      "also_pass": []
    },
    "output_context": {
      "set_as_primary": true,
      "attach_to_contexts": true
    },
    "heal_attempts": 0,
    "run_for_user_id": "string",
    "last_heal_attempted_at": "1970-01-01T00:00:00.000Z",
    "wait_for_journey_submission": true,
    "journey_id": "string",
    "journey_execution": {
      "execution_id": "string",
      "execution_status": "string",
      "error_reason": "string",
      "submission_entity_id": "string",
      "submission_created_at": "1970-01-01T00:00:00.000Z",
      "wait_overridden_at": "1970-01-01T00:00:00.000Z",
      "wait_overridden_by": "string"
    },
    "eligible_closing_reason_ids": ["string"],
    "allow_execution_note": true,
    "email_review": {
      "enabled": true,
      "allow_document_selection": true,
      "allow_subject_and_body_edit": true
    }
  },
  "automation_execution_id": "string",
  "on_failure": "stop",
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

### `previewTaskEmail`

Renders the email a semi-automated send-email task would send, so the person running it can review and adjust it first.

`GET /v2/flows/executions/{execution_id}/tasks/{task_id}/email-preview`

```ts
const { data } = await client.previewTaskEmail({
  execution_id: 'example',
  task_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "subject": "string",
  "body": "string",
  "to": ["string"],
  "has_unresolved_send_time_variables": true,
  "body_edit_locked": true,
  "attachable_documents": [
    {
      "id": "string",
      "filename": "string"
    }
  ],
  "inline_images": [
    {
      "cid": "string",
      "url": "string"
    }
  ]
}
```

</details>

---

### `executeTask`

Executes any kind of flow task immediately. This is the scheduler's dispatch endpoint: when its timer fires on the SCHEDULED task it booked, in the scheduler's own name, the call is the engine dispatc

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
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ],
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "journey_prefill": {
    "status": "PENDING",
    "agent_execution_id": "string",
    "dispatched_at": "1970-01-01T00:00:00.000Z",
    "extracted_at": "1970-01-01T00:00:00.000Z",
    "initial_state": {},
    "field_confidence": {},
    "dropped": [
      {}
    ]
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "start_date": "2021-04-27T12:00:00.000Z",
  "start_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "required": true,
  "subtasks": [
    {
      "id": "string",
      "name": "string",
      "party": "description",
      "required": true
    }
  ],
  "subtask_states": {},
  "journey_submission": {
    "submission_entity_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  },
  "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
  "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
  "assigned_to": ["string"],
  "ecp_placeholder_assignees": {
    "placeholder_ecp_customers": ["string"],
    "placeholder_ecp_installers": ["string"]
  },
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "loop_iterations": {},
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
  },
  "audience_order": ["description"],
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
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "taxonomies": ["string"],
  "loop_config": {
    "max_iterations": 3,
    "crt_iterations": 0
  },
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ]
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
        error_reason: 'string',
        input_context: {
          source: 'main_context',
          task_id: 'string',
          trigger_id: 'string',
          with_relations: true,
          also_pass: [
            {
              source: 'main_context'
            }
          ]
        },
        output_context: {
          set_as_primary: true,
          attach_to_contexts: true
        },
        heal_attempts: 0,
        run_for_user_id: 'string',
        last_heal_attempted_at: '1970-01-01T00:00:00.000Z',
        wait_for_journey_submission: true,
        journey_id: 'string',
        journey_execution: {
          execution_id: 'string',
          execution_status: 'string',
          error_reason: 'string',
          submission_entity_id: 'string',
          submission_created_at: '1970-01-01T00:00:00.000Z',
          wait_overridden_at: '1970-01-01T00:00:00.000Z',
          wait_overridden_by: 'string'
        },
        eligible_closing_reason_ids: ['string'],
        allow_execution_note: true,
        email_review: {
          enabled: true,
          allow_document_selection: true,
          allow_subject_and_body_edit: true
        }
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
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ],
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "journey_prefill": {
    "status": "PENDING",
    "agent_execution_id": "string",
    "dispatched_at": "1970-01-01T00:00:00.000Z",
    "extracted_at": "1970-01-01T00:00:00.000Z",
    "initial_state": {},
    "field_confidence": {},
    "dropped": [
      {}
    ]
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "start_date": "2021-04-27T12:00:00.000Z",
  "start_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "required": true,
  "subtasks": [
    {
      "id": "string",
      "name": "string",
      "party": "description",
      "required": true
    }
  ],
  "subtask_states": {},
  "journey_submission": {
    "submission_entity_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  },
  "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
  "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
  "assigned_to": ["string"],
  "ecp_placeholder_assignees": {
    "placeholder_ecp_customers": ["string"],
    "placeholder_ecp_installers": ["string"]
  },
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "loop_iterations": {},
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
  },
  "audience_order": ["description"],
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

### `reconcileAutomationTask`

Reconciles an automation task's status against its linked automation execution.

`POST /v2/flows/executions/{execution_id}/tasks/{task_id}/reconcile-automation`

```ts
const { data } = await client.reconcileAutomationTask({
  execution_id: 'example',
  task_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "loop_source": "loops",
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
    "started_by_org_id": "string",
    "closed_by": "string",
    "completed_by": "string"
  },
  "contexts": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "is_primary": false,
      "promoted_by_task_id": "string",
      "promoted_at": "1970-01-01T00:00:00.000Z",
      "demoted_by_task_id": "string",
      "added_by_task_id": "string"
    }
  ],
  "visibility": "entity_views",
  "visible_on": [
    {
      "entity_id": "string",
      "entity_schema": "string",
      "kind": "context",
      "anchor_entity_id": "string",
      "rule_id": "string"
    }
  ],
  "crt_tasks": [
    {
      "id": "string",
      "crt_since": "1970-01-01T00:00:00.000Z"
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
      "loop_config": {},
      "loop_membership": []
    }
  ],
  "stages": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "entry_node_id": "string",
      "cut_edge_ids": ["string"],
      "color": "string",
      "portal_names": {},
      "portal_descriptions": {}
    }
  ],
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "tasks": [
    {
      "id": "string",
      "loop_membership": [],
      "template_id": "string",
      "name": "string",
      "description": {},
      "status": "UNASSIGNED",
      "journey": {},
      "journey_prefill": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "start_date": "2021-04-27T12:00:00.000Z",
      "start_date_config": {},
      "requirements": [],
      "required": true,
      "subtasks": [],
      "subtask_states": {},
      "journey_submission": {},
      "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
      "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
      "assigned_to": ["string"],
      "ecp_placeholder_assignees": {},
      "analytics": {},
      "loop_iterations": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "manually_created": true,
      "enabled": true,
      "ecp": {},
      "installer": {},
      "partner": {},
      "audience_order": ["description"],
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
      "none_met": true,
      "loop_id": "string"
    }
  ],
  "_execution_chain": {
    "parent_execution_id": "string",
    "parent_task_id": "string",
    "depth": 0
  },
  "_automation_chain": ["string"],
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
      "error_reason": "string",
      "input_context": {},
      "output_context": {},
      "heal_attempts": 0,
      "run_for_user_id": "string",
      "last_heal_attempted_at": "1970-01-01T00:00:00.000Z",
      "wait_for_journey_submission": true,
      "journey_id": "string",
      "journey_execution": {},
      "eligible_closing_reason_ids": ["string"],
      "allow_execution_note": true,
      "email_review": {}
    },
    "trigger_id": "string"
  },
  "configured_triggers": [
    {
      "id": "string",
      "type": "string",
      "primary": true,
      "entity_schema": "string",
      "automation_id": "string",
      "journey_id": "string"
    }
  ],
  "singleClosingReasonSelection": true,
  "linear": true
}
```

</details>

---

### `runTaskScheduleNow`

Cancels the pending schedule for a task and immediately triggers its automation execution. Always a person's request, so a `trigger_mode: manual` automation (an absent trigger mode counts as manual) i

`POST /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule/run-now`

```ts
const { data } = await client.runTaskScheduleNow({
  execution_id: 'example',
  task_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "loop_membership": [
    {
      "loop_id": "string",
      "runs_in_loop": true
    }
  ],
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
    "portal_button_label": "string",
    "complete_task_automatically": true,
    "journey_submission_required": true,
    "context_parameters": [
      {}
    ],
    "ai_prefill": {
      "enabled": false,
      "source": {},
      "extraction_fields": [],
      "mappings": [],
      "min_confidence": 0.8,
      "instructions": "string"
    }
  },
  "journey_prefill": {
    "status": "PENDING",
    "agent_execution_id": "string",
    "dispatched_at": "1970-01-01T00:00:00.000Z",
    "extracted_at": "1970-01-01T00:00:00.000Z",
    "initial_state": {},
    "field_confidence": {},
    "dropped": [
      {}
    ]
  },
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "start_date": "2021-04-27T12:00:00.000Z",
  "start_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string"
  },
  "requirements": [
    {
      "task_id": "string",
      "phase_id": "string",
      "when": "TASK_FINISHED"
    }
  ],
  "required": true,
  "subtasks": [
    {
      "id": "string",
      "name": "string",
      "party": "description",
      "required": true
    }
  ],
  "subtask_states": {},
  "journey_submission": {
    "submission_entity_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  },
  "completion_gates_reset_at": "1970-01-01T00:00:00.000Z",
  "journey_gate_waived_at": "1970-01-01T00:00:00.000Z",
  "assigned_to": ["string"],
  "ecp_placeholder_assignees": {
    "placeholder_ecp_customers": ["string"],
    "placeholder_ecp_installers": ["string"]
  },
  "analytics": {
    "started_at": "1970-01-01T00:00:00.000Z",
    "in_progress_at": "1970-01-01T00:00:00.000Z",
    "completed_at": "1970-01-01T00:00:00.000Z",
    "status_updated_at": "1970-01-01T00:00:00.000Z",
    "in_progress_by": "string",
    "completed_by": "string",
    "skipped_at": "1970-01-01T00:00:00.000Z",
    "skipped_by": "string",
    "on_hold_by": "string"
  },
  "loop_iterations": {},
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
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
      "portal_button_label": "string",
      "complete_task_automatically": true,
      "journey_submission_required": true,
      "context_parameters": [],
      "ai_prefill": {}
    }
  },
  "partner": {
    "enabled": true,
    "label": "string",
    "description": "string"
  },
  "audience_order": ["description"],
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
      partner?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      assignedToOnHold?: { ... }
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
      partner?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      assignedToOnHold?: { ... }
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
    partner?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
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
    assignedToOnHold?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
    created?: string
    lastUpdated?: string
    statusLastUpdated?: string
    startedTime?: string
    completedTime?: string
    dueDate?: string
    dynamicDueDate?: {
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
      partner?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      assignedToOnHold?: { ... }
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
    partner?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
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
    assignedToOnHold?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
    created?: string
    lastUpdated?: string
    statusLastUpdated?: string
    startedTime?: string
    completedTime?: string
    dueDate?: string
    dynamicDueDate?: {
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
      partner?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      assignedToOnHold?: { ... }
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
    partner?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
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
    partner?: {
      enabled?: { ... }
      label?: { ... }
      description?: { ... }
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
    assignedToOnHold?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
  }
  partner?: {
    enabled?: boolean
    label?: string
    description?: string
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
  }
  partner?: {
    enabled?: boolean
    label?: string
    description?: string
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
  assignedToOnHold?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
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
type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
  portal_button_label?: string
  complete_task_automatically?: boolean
  journey_submission_required?: boolean
  context_parameters?: Array<{
    key: string
    value: string
  }>
  ai_prefill?: {
    enabled?: boolean
    source?: {
      type?: { ... }
      input_entity?: { ... }
    }
    extraction_fields?: Array<{
      key: { ... }
      type: { ... }
      description?: { ... }
      description_overridden?: { ... }
      enum?: { ... }
    }>
    mappings?: Array<{
      source: { ... }
      block_id: { ... }
      block_type: { ... }
      block_field?: { ... }
    }>
    min_confidence?: number
    instructions?: string
  }
}
```

### `JourneyContextParameter`

```ts
type JourneyContextParameter = {
  key: string
  value: string
}
```

### `AiPrefillConfig`

AI extraction + prefill configuration for the attached journey (Flows v2 only)

```ts
type AiPrefillConfig = {
  enabled?: boolean
  source?: {
    type?: "flow_context"
    input_entity?: "thread" | "first_email" | "last_email"
  }
  extraction_fields?: Array<{
    key: string
    type: "string" | "number" | "boolean" | "date" | "enum"
    description?: string
    description_overridden?: boolean
    enum?: string[]
  }>
  mappings?: Array<{
    source: string
    block_id: string
    block_type: "text-input" | "number-input" | "personal-information" | "meter-reading"
    block_field?: string
  }>
  min_confidence?: number
  instructions?: string
}
```

### `AiPrefillExtractionField`

```ts
type AiPrefillExtractionField = {
  key: string
  type: "string" | "number" | "boolean" | "date" | "enum"
  description?: string
  description_overridden?: boolean
  enum?: string[]
}
```

### `AiPrefillMapping`

```ts
type AiPrefillMapping = {
  source: string
  block_id: string
  block_type: "text-input" | "number-input" | "personal-information" | "meter-reading"
  block_field?: string
}
```

### `JourneyPrefill`

Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current.

```ts
type JourneyPrefill = {
  status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
  agent_execution_id?: string
  dispatched_at?: string // date-time
  extracted_at?: string // date-time
  initial_state?: Record<string, unknown>
  field_confidence?: Record<string, number>
  dropped?: Array<{
    source?: string
    block_id?: string
    reason: string
  }>
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
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
}
```

### `PartnerDetails`

Details regarding partner for the workflow step

```ts
type PartnerDetails = {
  enabled?: boolean
  label?: string
  description?: string
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
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
  assignedToOnHold?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
  }
  partner?: {
    enabled?: boolean
    label?: string
    description?: string
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
  assignedToOnHold?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
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
      partner?: { ... }
      enabled?: { ... }
      requirements?: { ... }
      executionType?: { ... }
      sectionId?: { ... }
      executionId?: { ... }
      userIds?: { ... }
      assignedTo?: { ... }
      assignedToInProgress?: { ... }
      assignedToOnHold?: { ... }
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

Standard error response returned when an API request fails.
Contains a human-readable message describing the error.


```ts
type ErrorResp = {
  message: string
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

### `TaskInEntity`

```ts
type TaskInEntity = {
  task_id?: string
  task_name?: string
  task_assignees?: string[]
  task_duedate?: string // date-time
  task_start_date?: string
  task_execution_type?: "MANUAL" | "AUTOMATION"
  task_status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
  task_start_date?: string
  task_execution_type?: "MANUAL" | "AUTOMATION"
  task_status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  current_tasks?: Array<{
    task_id?: string
    task_name?: string
    task_assignees?: string[]
    task_duedate?: string // date-time
    task_start_date?: string
    task_execution_type?: "MANUAL" | "AUTOMATION"
    task_status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  }>
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

Request payload for starting a new flow execution from a template.


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
      input_context?: { ... }
      output_context?: { ... }
      heal_attempts?: { ... }
      run_for_user_id?: { ... }
      last_heal_attempted_at?: { ... }
      wait_for_journey_submission?: { ... }
      journey_id?: { ... }
      journey_execution?: { ... }
      eligible_closing_reason_ids?: { ... }
      allow_execution_note?: { ... }
      email_review?: { ... }
    }
    trigger_id?: string
  }
  contexts: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
    promoted_by_task_id?: string
    promoted_at?: string // date-time
    demoted_by_task_id?: string
    added_by_task_id?: string
  }>
  purposes?: string[]
}
```

### `SearchFlowsReq`

```ts
type SearchFlowsReq = {
  entity_id: string
  entity_schema: string
  include_background?: boolean
}
```

### `PortalWorkflowsSearchReq`

```ts
type PortalWorkflowsSearchReq = {
  entity_id: string
  entity_schema: string
  audience: "ecp" | "installer" | "all"
}
```

### `PortalAudience`

Which portal audience the workflows are loaded for. Controls which task-level
portal config (`ecp` or `installer`) determines task visibility. `all` returns
tasks enabled for any audience — callers must state the widest scope explicitly
rather than falling into it by omission.


```ts
type PortalAudience = "ecp" | "installer" | "all"
```

### `PortalWorkflowsSearchResp`

```ts
type PortalWorkflowsSearchResp = {
  workflows: Array<{
    id: string
    definition_id?: string
    name: string
    status: "STARTED" | "DONE" | "CLOSED"
    version: 2 | 3
    created_at?: string
    updated_at?: string
    completed_at?: string
    due_date?: string
    assigned_to?: string[]
    contexts?: Array<{
      entity_id?: { ... }
      entity_schema?: { ... }
      is_primary?: { ... }
      promoted_by_task_id?: { ... }
      promoted_at?: { ... }
      demoted_by_task_id?: { ... }
      added_by_task_id?: { ... }
    }>
    is_path_complete: boolean
    tasks?: Array<{
      id: { ... }
      name: { ... }
      status: { ... }
      is_active: { ... }
      start_date?: { ... }
      ecp?: { ... }
      installer?: { ... }
      journey?: { ... }
      assigned_to?: { ... }
      phase_id?: { ... }
      phase_name?: { ... }
      stage_id?: { ... }
      completed_at?: { ... }
      updated_at?: { ... }
    }>
    stages?: Array<{
      id: { ... }
      name: { ... }
      description?: { ... }
      status: { ... }
      completed_at?: { ... }
      portal_names?: { ... }
      portal_descriptions?: { ... }
    }>
    portal_titles?: {
      ecp?: { ... }
      installer?: { ... }
    }
  }>
}
```

### `BulkStartFlowsReq`

Start every flow in `flow_template_ids` on every entity in `entities`.

```ts
type BulkStartFlowsReq = {
  flow_template_ids: string[]
  entities: Array<{
    entity_id: string
    entity_schema: string
  }>
  purposes?: string[]
}
```

### `BulkStartEntityRef`

```ts
type BulkStartEntityRef = {
  entity_id: string
  entity_schema: string
}
```

### `BulkStartFlowsJobStatus`

* `awaiting_approval`: preflight done, nothing started; waits for `APPROVE`
* `queued`: approved, waiting for a worker
* `running`: starts in progress
* `completed`: every start that was not skipped succeeded
* `completed_with_errors`: finished, at least one start failed
* `failed`: the job itself f

```ts
type BulkStartFlowsJobStatus = "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired"
```

### `BulkStartFlowsItemStatus`

```ts
type BulkStartFlowsItemStatus = "pending" | "started" | "failed" | "skipped" | "cancelled"
```

### `BulkStartFlowsItem`

One (flow, entity) start of a bulk-start job.

```ts
type BulkStartFlowsItem = {
  flow_template_id: string
  entity_id: string
  entity_schema: string
  status: "pending" | "started" | "failed" | "skipped" | "cancelled"
  execution_id?: string
  error_code?: string
  error_message?: string
  updated_at?: string // date-time
}
```

### `BulkStartFlowsFlowSummary`

```ts
type BulkStartFlowsFlowSummary = {
  flow_template_id: string
  flow_name: string
  will_start: number
  skipped: number
}
```

### `BulkStartFlowsJobCounts`

```ts
type BulkStartFlowsJobCounts = {
  total: number
  pending: number
  started: number
  failed: number
  skipped: number
  cancelled: number
}
```

### `BulkStartFlowsJob`

```ts
type BulkStartFlowsJob = {
  job_id: string
  org_id: string
  status: "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired"
  created_by: string
  created_at: string // date-time
  updated_at: string // date-time
  expires_at: string // date-time
  approved_at?: string // date-time
  approved_by?: string
  finished_at?: string // date-time
  cancel_requested?: boolean
  restart_of?: string
  restarted_by?: string
  flows: Array<{
    flow_template_id: string
    flow_name: string
    will_start: number
    skipped: number
  }>
  counts: {
    total: number
    pending: number
    started: number
    failed: number
    skipped: number
    cancelled: number
  }
  items: Array<{
    flow_template_id: string
    entity_id: string
    entity_schema: string
    status: "pending" | "started" | "failed" | "skipped" | "cancelled"
    execution_id?: string
    error_code?: string
    error_message?: string
    updated_at?: string // date-time
  }>
}
```

### `BulkStartFlowsJobSummary`

A bulk-start job as listed in the history, without its items.

```ts
type BulkStartFlowsJobSummary = {
  job_id: string
  org_id: string
  status: "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired"
  created_by: string
  created_by_org_id?: string
  created_at: string // date-time
  updated_at: string // date-time
  expires_at: string // date-time
  approved_at?: string // date-time
  approved_by?: string
  finished_at?: string // date-time
  cancel_requested?: boolean
  restart_of?: string
  restarted_by?: string
  flows: Array<{
    flow_template_id: string
    flow_name: string
    will_start: number
    skipped: number
  }>
  entity_schema?: string
  entity_ids: string[]
  entity_count: number
  counts: {
    total: number
    pending: number
    started: number
    failed: number
    skipped: number
    cancelled: number
  }
}
```

### `ListBulkStartFlowsJobsResp`

```ts
type ListBulkStartFlowsJobsResp = {
  results: Array<{
    job_id: string
    org_id: string
    status: "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired"
    created_by: string
    created_by_org_id?: string
    created_at: string // date-time
    updated_at: string // date-time
    expires_at: string // date-time
    approved_at?: string // date-time
    approved_by?: string
    finished_at?: string // date-time
    cancel_requested?: boolean
    restart_of?: string
    restarted_by?: string
    flows: Array<{
      flow_template_id: { ... }
      flow_name: { ... }
      will_start: { ... }
      skipped: { ... }
    }>
    entity_schema?: string
    entity_ids: string[]
    entity_count: number
    counts: {
      total: { ... }
      pending: { ... }
      started: { ... }
      failed: { ... }
      skipped: { ... }
      cancelled: { ... }
    }
  }>
  next_cursor?: string
}
```

### `ActiveBulkStartFlowsJobResp`

```ts
type ActiveBulkStartFlowsJobResp = {
  job: {
    job_id: string
    org_id: string
    status: "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired"
    created_by: string
    created_at: string // date-time
    updated_at: string // date-time
    expires_at: string // date-time
    approved_at?: string // date-time
    approved_by?: string
    finished_at?: string // date-time
    cancel_requested?: boolean
    restart_of?: string
    restarted_by?: string
    flows: Array<{
      flow_template_id: { ... }
      flow_name: { ... }
      will_start: { ... }
      skipped: { ... }
    }>
    counts: {
      total: { ... }
      pending: { ... }
      started: { ... }
      failed: { ... }
      skipped: { ... }
      cancelled: { ... }
    }
    items: Array<{
      flow_template_id: { ... }
      entity_id: { ... }
      entity_schema: { ... }
      status: { ... }
      execution_id?: { ... }
      error_code?: { ... }
      error_message?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `PatchBulkStartFlowsJobReq`

```ts
type PatchBulkStartFlowsJobReq = {
  action: "APPROVE" | "CANCEL"
}
```

### `PortalWorkflowsBatchSearchReq`

```ts
type PortalWorkflowsBatchSearchReq = {
  entities: Array<{
    entity_id: string
    entity_schema: string
  }>
  audience: "ecp" | "installer" | "all"
}
```

### `PortalEntityRef`

```ts
type PortalEntityRef = {
  entity_id: string
  entity_schema: string
}
```

### `PortalWorkflowsBatchSearchResp`

```ts
type PortalWorkflowsBatchSearchResp = {
  results: Array<{
    entity_id: string
    workflows: Array<{
      id: { ... }
      definition_id?: { ... }
      name: { ... }
      status: { ... }
      version: { ... }
      created_at?: { ... }
      updated_at?: { ... }
      completed_at?: { ... }
      due_date?: { ... }
      assigned_to?: { ... }
      contexts?: { ... }
      is_path_complete: { ... }
      tasks?: { ... }
      stages?: { ... }
      portal_titles?: { ... }
    }>
  }>
}
```

### `EntityPortalWorkflows`

Linearized portal workflows of a single entity

```ts
type EntityPortalWorkflows = {
  entity_id: string
  workflows: Array<{
    id: string
    definition_id?: string
    name: string
    status: "STARTED" | "DONE" | "CLOSED"
    version: 2 | 3
    created_at?: string
    updated_at?: string
    completed_at?: string
    due_date?: string
    assigned_to?: string[]
    contexts?: Array<{
      entity_id?: { ... }
      entity_schema?: { ... }
      is_primary?: { ... }
      promoted_by_task_id?: { ... }
      promoted_at?: { ... }
      demoted_by_task_id?: { ... }
      added_by_task_id?: { ... }
    }>
    is_path_complete: boolean
    tasks?: Array<{
      id: { ... }
      name: { ... }
      status: { ... }
      is_active: { ... }
      start_date?: { ... }
      ecp?: { ... }
      installer?: { ... }
      journey?: { ... }
      assigned_to?: { ... }
      phase_id?: { ... }
      phase_name?: { ... }
      stage_id?: { ... }
      completed_at?: { ... }
      updated_at?: { ... }
    }>
    stages?: Array<{
      id: { ... }
      name: { ... }
      description?: { ... }
      status: { ... }
      completed_at?: { ... }
      portal_names?: { ... }
      portal_descriptions?: { ... }
    }>
    portal_titles?: {
      ecp?: { ... }
      installer?: { ... }
    }
  }>
}
```

### `PortalWorkflow`

A portal-facing projection of a workflow execution (V1 or V2), with the execution
graph already linearized into a flat, ordered list of portal-visible steps.


```ts
type PortalWorkflow = {
  id: string
  definition_id?: string
  name: string
  status: "STARTED" | "DONE" | "CLOSED"
  version: 2 | 3
  created_at?: string
  updated_at?: string
  completed_at?: string
  due_date?: string
  assigned_to?: string[]
  contexts?: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
    promoted_by_task_id?: string
    promoted_at?: string // date-time
    demoted_by_task_id?: string
    added_by_task_id?: string
  }>
  is_path_complete: boolean
  tasks?: Array<{
    id: string
    name: string
    status: "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "PENDING"
    is_active: boolean
    start_date?: string
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
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
    assigned_to?: string[]
    phase_id?: string
    phase_name?: string
    stage_id?: string
    completed_at?: string
    updated_at?: string
  }>
  stages?: Array<{
    id: string
    name: string
    description?: string
    status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING" | "NOT_REACHED"
    completed_at?: string
    portal_names?: {
      ecp?: { ... }
      installer?: { ... }
    }
    portal_descriptions?: {
      ecp?: { ... }
      installer?: { ... }
    }
  }>
  portal_titles?: {
    ecp?: string
    installer?: string
  }
}
```

### `PortalWorkflowTask`

A single portal-visible step of a linearized workflow execution

```ts
type PortalWorkflowTask = {
  id: string
  name: string
  status: "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "PENDING"
  is_active: boolean
  start_date?: string
  ecp?: {
    enabled?: boolean
    label?: string
    description?: string
    journey?: {
      id?: { ... }
      journeyId?: { ... }
      name?: { ... }
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
  }
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  assigned_to?: string[]
  phase_id?: string
  phase_name?: string
  stage_id?: string
  completed_at?: string
  updated_at?: string
}
```

### `PortalWorkflowStage`

A customer-facing stage of a flow execution as shown in portals, with a progress status derived from the execution's tasks. Stages form a strict total order; the array order is the stage order.

```ts
type PortalWorkflowStage = {
  id: string
  name: string
  description?: string
  status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING" | "NOT_REACHED"
  completed_at?: string
  portal_names?: {
    ecp?: string
    installer?: string
  }
  portal_descriptions?: {
    ecp?: string
    installer?: string
  }
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
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  contexts?: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
    promoted_by_task_id?: string
    promoted_at?: string // date-time
    demoted_by_task_id?: string
    added_by_task_id?: string
  }>
  visibility?: "entity_views" | "background"
  visible_on?: Array<{
    entity_id: string
    entity_schema?: string
    kind: "context" | "display"
    anchor_entity_id?: string
    rule_id?: string
  }>
}
```

### `FlowExecution`

```ts
type FlowExecution = {
  id: string
  loop_source?: "loops" | "loop_config"
  flow_template_id: string
  org_id: string
  name: string
  created_at: string
  updated_at: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
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
    started_by_org_id?: string
    closed_by?: string
    completed_by?: string
  }
  contexts: Array<{
    entity_id?: string
    entity_schema?: string
    is_primary?: boolean
    promoted_by_task_id?: string
    promoted_at?: string // date-time
    demoted_by_task_id?: string
    added_by_task_id?: string
  }>
  visibility?: "entity_views" | "background"
  visible_on?: Array<{
    entity_id: string
    entity_schema?: string
    kind: "context" | "display"
    anchor_entity_id?: string
    rule_id?: string
  }>
  crt_tasks: Array<{
    id?: string
    crt_since?: string // date-time
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
      skipped_at?: { ... }
      skipped_by?: { ... }
      on_hold_by?: { ... }
    }
    taxonomies?: string[]
    loop_config?: {
      max_iterations: { ... }
      crt_iterations?: { ... }
    }
    loop_membership?: Array<{
      loop_id: { ... }
      runs_in_loop: { ... }
    }>
  }>
  stages?: Array<{
    id: string
    name: string
    description?: string
    entry_node_id?: string
    cut_edge_ids?: string[]
    color?: string
    portal_names?: {
      ecp?: { ... }
      installer?: { ... }
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
    input_context?: {
      source: { ... }
      task_id?: { ... }
      trigger_id?: { ... }
      with_relations?: { ... }
      also_pass?: { ... }
    }
    output_context?: {
      set_as_primary?: { ... }
      attach_to_contexts?: { ... }
    }
    heal_attempts?: number
    run_for_user_id?: string
    last_heal_attempted_at?: string // date-time
    wait_for_journey_submission?: boolean
    journey_id?: string
    journey_execution?: {
      execution_id?: { ... }
      execution_status?: { ... }
      error_reason?: { ... }
      submission_entity_id?: { ... }
      submission_created_at?: { ... }
      wait_overridden_at?: { ... }
      wait_overridden_by?: { ... }
    }
    eligible_closing_reason_ids?: string[]
    allow_execution_note?: boolean
    email_review?: {
      enabled?: { ... }
      allow_document_selection?: { ... }
      allow_subject_and_body_edit?: { ... }
    }
  }
  trigger_id?: string
}
```

### `ConfiguredTrigger`

One configured trigger of the flow template, snapshotted VERBATIM onto the execution at start — conceptually the workflow-definition API's `Trigger` schema plus the `primary` flag. The trigger schema is owned by the definition service and copied through opaquely, so only the fields consumers key on 

```ts
type ConfiguredTrigger = {
  id?: string
  type?: string
  primary?: boolean
  entity_schema?: string
  automation_id?: string
  journey_id?: string
}
```

### `VisibleEntity`

One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here.

```ts
type VisibleEntity = {
  entity_id: string
  entity_schema?: string
  kind: "context" | "display"
  anchor_entity_id?: string
  rule_id?: string
}
```

### `FlowContext`

```ts
type FlowContext = {
  entity_id?: string
  entity_schema?: string
  is_primary?: boolean
  promoted_by_task_id?: string
  promoted_at?: string // date-time
  demoted_by_task_id?: string
  added_by_task_id?: string
}
```

### `EntityRef`

One entity a run is bound to. `entity_id` is the identity of a context: a run never holds two contexts with the same `entity_id`.

```ts
type EntityRef = {
  entity_id?: string
  entity_schema?: string
  is_primary?: boolean
  promoted_by_task_id?: string
  promoted_at?: string // date-time
  demoted_by_task_id?: string
  added_by_task_id?: string
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
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
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
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
  // ...
}
```

### `AutomationTask`

```ts
type AutomationTask = {
  id: string
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
  // ...
}
```

### `AutomationFailurePolicy`

What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`.

```ts
type AutomationFailurePolicy = "stop" | "continue"
```

### `LoopInfo`

Information about loop iterations, when task is part of a loop branch

```ts
type LoopInfo = {
  max_iterations: number
  crt_iterations?: number
}
```

### `LoopExecutionState`

```ts
type LoopExecutionState = {
  entry_branch_ids: string[]
  exit_branch_id: string
  max_iterations: number
  crt_iteration?: number
  target_id?: string
  outer_loop_ids?: string[]
  depth?: number
}
```

### `LoopMembership`

```ts
type LoopMembership = {
  loop_id: string
  runs_in_loop: boolean
}
```

### `LoopOutcome`

What taking the branch does to its decision's loop at the current count. `closes_lap` starts another iteration, `enters_body` continues inside the loop, `exits_loop` leaves it, `budget_spent` would continue it but no iterations are left, so the exit branch is taken instead.

```ts
type LoopOutcome = "closes_lap" | "enters_body" | "exits_loop" | "budget_spent"
```

### `LoopConfig`

Read `loops` instead. Kept for executions started before `loops`.

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
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  schedule_id?: string
  scheduled_at?: string
  error_reason?: string
} | {
  mode: "relative"
  direction: "before" | "after"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  reference: {
    id: string
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute" | "all_preceding_tasks_completed"
    schema?: string
    attribute?: string
  }
  schedule_id?: string
  scheduled_at?: string
  error_reason?: string
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
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  schedule_id?: string
  scheduled_at?: string
  error_reason?: string
}
```

### `RelativeSchedule`

```ts
type RelativeSchedule = {
  mode: "relative"
  direction: "before" | "after"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  reference: {
    id: string
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute" | "all_preceding_tasks_completed"
    schema?: string
    attribute?: string
  }
  schedule_id?: string
  scheduled_at?: string
  error_reason?: string
}
```

### `DecisionTask`

```ts
type DecisionTask = {
  id: string
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
  // ...
}
```

### `AiAgentTask`

```ts
type AiAgentTask = {
  id: string
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
  // ...
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
  execution_status?: "queued" | "pending" | "started" | "running" | "waiting_approval" | "approval_required" | "completed" | "failed" | "cancelled"
  queued_at?: string // date-time
  queued_attempts?: number
  error_reason?: string
  outcome?: string
  completion_hold?: "required_subtasks"
}
```

### `TaskAudience`

A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners.

```ts
type TaskAudience = "description" | "ecp" | "installer" | "partner"
```

### `TaskBase`

```ts
type TaskBase = {
  id: string
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
  template_id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  journey?: {
    id?: string
    journeyId?: string
    name?: string
    portal_button_label?: string
    complete_task_automatically?: boolean
    journey_submission_required?: boolean
    context_parameters?: Array<{
      key: { ... }
      value: { ... }
    }>
    ai_prefill?: {
      enabled?: { ... }
      source?: { ... }
      extraction_fields?: { ... }
      mappings?: { ... }
      min_confidence?: { ... }
      instructions?: { ... }
    }
  }
  journey_prefill?: {
    status: "PENDING" | "READY" | "FAILED" | "SKIPPED"
    agent_execution_id?: string
    dispatched_at?: string // date-time
    extracted_at?: string // date-time
    initial_state?: Record<string, unknown>
    field_confidence?: Record<string, number>
    dropped?: Array<{
      source?: { ... }
      block_id?: { ... }
      reason: { ... }
    }>
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
    task_id?: string
    phase_id?: string
  }
  start_date?: string
  start_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
    task_id?: string
  }
  requirements?: Array<{
    task_id?: string
    phase_id?: string
    when: "TASK_FINISHED" | "PHASE_FINISHED"
  }>
  required?: boolean
  subtasks?: Array<{
    id: string
    name?: string
    party: "description" | "ecp" | "installer" | "partner"
    required?: boolean
  }>
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  journey_submission?: {
    submission_entity_id?: string
    submitted_at?: string // date-time
  }
  completion_gates_reset_at?: string // date-time
  journey_gate_waived_at?: string // date-time
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  ecp_placeholder_assignees?: {
    placeholder_ecp_customers?: string[]
    placeholder_ecp_installers?: string[]
  }
  analytics: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
  // ...
}
```

### `Stage`

A customer-facing progress segment layered on top of the flow graph, copied from the flow template when the execution starts. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total or

```ts
type Stage = {
  id: string
  name: string
  description?: string
  entry_node_id?: string
  cut_edge_ids?: string[]
  color?: string
  portal_names?: {
    ecp?: string
    installer?: string
  }
  portal_descriptions?: {
    ecp?: string
    installer?: string
  }
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
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
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
    skipped_at?: string // date-time
    skipped_by?: string
    on_hold_by?: string
  }
  taxonomies?: string[]
  loop_config?: {
    max_iterations: number
    crt_iterations?: number
  }
  loop_membership?: Array<{
    loop_id: string
    runs_in_loop: boolean
  }>
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
  loop_id?: string
}
```

### `AutomationInfo`

```ts
type AutomationInfo = {
  flow_id: string
  execution_id?: string
  execution_status?: string
  error_reason?: string
  input_context?: {
    source: "main_context" | "task" | "trigger"
    task_id?: string
    trigger_id?: string
    with_relations?: boolean
    also_pass?: Array<{
      source: { ... }
    } | {
      source: { ... }
      task_id: { ... }
    }>
  }
  output_context?: {
    set_as_primary?: boolean
    attach_to_contexts?: boolean
  }
  heal_attempts?: number
  run_for_user_id?: string
  last_heal_attempted_at?: string // date-time
  wait_for_journey_submission?: boolean
  journey_id?: string
  journey_execution?: {
    execution_id?: string
    execution_status?: string
    error_reason?: string
    submission_entity_id?: string
    submission_created_at?: string // date-time
    wait_overridden_at?: string // date-time
    wait_overridden_by?: string
  }
  eligible_closing_reason_ids?: string[]
  allow_execution_note?: boolean
  email_review?: {
    enabled?: boolean
    allow_document_selection?: boolean
    allow_subject_and_body_edit?: boolean
  }
}
```

### `JourneyExecutionInfo`

Server-managed. Tracks the journey automation execution a task in WAITING_FOR_JOURNEY_SUBMISSION is (or was) waiting on. Cleared whenever the task's automation state is reset (revert, loop-back, clear status).

```ts
type JourneyExecutionInfo = {
  execution_id?: string
  execution_status?: string
  error_reason?: string
  submission_entity_id?: string
  submission_created_at?: string // date-time
  wait_overridden_at?: string // date-time
  wait_overridden_by?: string
}
```

### `AutomationInputContext`

Optional. Source of the entity fed into this automation task. If omitted, the run's current main context is used.


```ts
type AutomationInputContext = {
  source: "main_context" | "task" | "trigger"
  task_id?: string
  trigger_id?: string
  with_relations?: boolean
  also_pass?: Array<{
    source: "main_context"
  } | {
    source: "task"
    task_id: string
  }>
}
```

### `AutomationInputExtraContextRef`

One of the run's own entities. `main_context` = the run's current main context.


```ts
type AutomationInputExtraContextRef = {
  source: "main_context"
}
```

### `AutomationInputExtraTaskRef`

Every entity produced by an upstream task.

```ts
type AutomationInputExtraTaskRef = {
  source: "task"
  task_id: string
}
```

### `AutomationOutputContext`

Optional. What happens to the entity produced by this automation task (the last successful entity-producing action of its automation).


```ts
type AutomationOutputContext = {
  set_as_primary?: boolean
  attach_to_contexts?: boolean
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
  skipped_at?: string // date-time
  skipped_by?: string
  on_hold_by?: string
}
```

### `ConditionResult`

How one of a decision task's conditions stood when a loop pass closed.
`is_met: false` means the branch was evaluated and rejected; an absent
entry means it was never reached.


```ts
type ConditionResult = {
  id: string
  is_met?: boolean
  evaluated_at?: string // date-time
  match_normalizations?: "unicode" | "invisible" | "whitespace" | "case"[]
}
```

### `TaskIteration`

A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here.

```ts
type TaskIteration = {
  iteration: number
  recorded_at: string // date-time
  status: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  analytics?: {
    started_at?: string // date-time
    in_progress_at?: string // date-time
    completed_at?: string // date-time
    status_updated_at?: string // date-time
    in_progress_by?: string
    completed_by?: string
    skipped_at?: string // date-time
    skipped_by?: string
    on_hold_by?: string
  }
  automation_execution_id?: string
  agent_execution_id?: string
  error_reason?: string
  execution_status?: string
  outcome?: string
  condition_results?: Array<{
    id: string
    is_met?: boolean
    evaluated_at?: string // date-time
    match_normalizations?: "unicode" | "invisible" | "whitespace" | "case"[]
  }>
  schedule_id?: string
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
      attributes?: { ... }
      attributes_match?: { ... }
      attribute_sub_field?: { ... }
      date_offset?: { ... }
    }
    operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
    values: string[]
    value_type?: "static" | "relative_date"
  }>
  evaluated_at?: string // date-time
  is_met?: boolean
  loop_outcome?: "closes_lap" | "enters_body" | "exits_loop" | "budget_spent"
  match_normalizations?: "unicode" | "invisible" | "whitespace" | "case"[]
}
```

### `Statement`

```ts
type Statement = {
  id: string
  source: {
    id?: string
    origin?: "trigger" | "action" | "flow_runtime"
    origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context" | "flow_trait"
    schema?: string
    attribute?: string
    attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "message_email_address"
    attribute_repeatable?: boolean
    attribute_operation?: "all" | "updated" | "added" | "deleted"
    attributes?: string[]
    attributes_match?: "any" | "all"
    attribute_sub_field?: string
    date_offset?: {
      amount?: { ... }
      unit?: { ... }
    }
  }
  operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
  values: string[]
  value_type?: "static" | "relative_date"
}
```

### `EvaluationSource`

```ts
type EvaluationSource = {
  id?: string
  origin?: "trigger" | "action" | "flow_runtime"
  origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context" | "flow_trait"
  schema?: string
  attribute?: string
  attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "message_email_address"
  attribute_repeatable?: boolean
  attribute_operation?: "all" | "updated" | "added" | "deleted"
  attributes?: string[]
  attributes_match?: "any" | "all"
  attribute_sub_field?: string
  date_offset?: {
    amount?: number
    unit?: "days" | "months" | "years"
  }
}
```

### `Operator`

```ts
type Operator = "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
```

### `DueDateConfig`

Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays.

```ts
type DueDateConfig = {
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
  task_id?: string
  phase_id?: string
}
```

### `StartDateConfig`

Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numb

```ts
type StartDateConfig = {
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED"
  task_id?: string
}
```

### `TimeUnit`

```ts
type TimeUnit = "minutes" | "hours" | "days" | "weeks" | "months" | "years"
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

### `Subtask`

One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup.

```ts
type Subtask = {
  id: string
  name?: string
  party: "description" | "ecp" | "installer" | "partner"
  required?: boolean
}
```

### `SubtaskState`

Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false.

```ts
type SubtaskState = {
  completed: boolean
  completed_by?: string
  completed_at?: string // date-time
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

### `EcpPlaceholderAssignees`

Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow 

```ts
type EcpPlaceholderAssignees = {
  placeholder_ecp_customers?: string[]
  placeholder_ecp_installers?: string[]
}
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

### `RunTaskAutomationReq`

The bounded choice a person makes when running a semi-automated task. Optional in full: a task that configures no choice runs from its automation's stored configuration.

Nothing here is trusted as sent. Each input is checked against the stored task — never against the request — and is rejected unle

```ts
type RunTaskAutomationReq = {
  action_inputs?: {
    cancel_flow_execution?: {
      selected_closing_reason_ids: { ... }
      extra_description?: { ... }
    }
    send_email?: {
      subject?: { ... }
      body?: { ... }
      attachment_entity_ids?: { ... }
    }
  }
}
```

### `TaskAutomationActionInputs`

Run-time inputs keyed by the automation action they belong to. An action whose key is absent runs entirely from its configuration.

```ts
type TaskAutomationActionInputs = {
  cancel_flow_execution?: {
    selected_closing_reason_ids: string[]
    extra_description?: string
  }
  send_email?: {
    subject?: string
    body?: string
    attachment_entity_ids?: string[]
  }
}
```

### `CancelFlowExecutionInputs`

The reason the person chose for cancelling the flow. Ids only — the titles stored on the closed execution are resolved server-side from the execution's `closing_reason.configured_reasons`, so a caller cannot record a reason under a title of its own choosing.

```ts
type CancelFlowExecutionInputs = {
  selected_closing_reason_ids: string[]
  extra_description?: string
}
```

### `TaskEmailPreview`

The rendered email a send-email task is about to send. `subject` is what the person edits, and `body` too while `body_edit_locked` is false; the rest is shown for context and is not editable.

```ts
type TaskEmailPreview = {
  subject?: string
  body?: string
  to?: string[]
  has_unresolved_send_time_variables?: boolean
  body_edit_locked?: boolean
  attachable_documents?: Array<{
    id: string
    filename: string
  }>
  inline_images?: Array<{
    cid: string
    url: string
  }>
}
```

### `EmailReviewConfig`

Copied from the template task at flow start. Says whether the person running this step reviews the email first, and what they may change. Anything they send that this does not permit is refused.

```ts
type EmailReviewConfig = {
  enabled?: boolean
  allow_document_selection?: boolean
  allow_subject_and_body_edit?: boolean
}
```

### `SendEmailInputs`

The adjustments a person made to a reviewed email. Each field is accepted only when the task's `email_review` permits it; sent otherwise it is a 400, so a caller cannot rewrite an email the configurator locked.

These are the RENDERED values, not template edits — the template is untouched and other 

```ts
type SendEmailInputs = {
  subject?: string
  body?: string
  attachment_entity_ids?: string[]
}
```

### `PatchTaskReq`

Request payload for updating a task within a flow execution.
All fields are optional; only provided fields will be updated.


```ts
type PatchTaskReq = {
  name?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
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
    input_context?: {
      source: { ... }
      task_id?: { ... }
      trigger_id?: { ... }
      with_relations?: { ... }
      also_pass?: { ... }
    }
    output_context?: {
      set_as_primary?: { ... }
      attach_to_contexts?: { ... }
    }
    heal_attempts?: number
    run_for_user_id?: string
    last_heal_attempted_at?: string // date-time
    wait_for_journey_submission?: boolean
    journey_id?: string
    journey_execution?: {
      execution_id?: { ... }
      execution_status?: { ... }
      error_reason?: { ... }
      submission_entity_id?: { ... }
      submission_created_at?: { ... }
      wait_overridden_at?: { ... }
      wait_overridden_by?: { ... }
    }
    eligible_closing_reason_ids?: string[]
    allow_execution_note?: boolean
    email_review?: {
      enabled?: { ... }
      allow_document_selection?: { ... }
      allow_subject_and_body_edit?: { ... }
    }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
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
      portal_button_label?: { ... }
      complete_task_automatically?: { ... }
      journey_submission_required?: { ... }
      context_parameters?: { ... }
      ai_prefill?: { ... }
    }
  }
  partner?: {
    enabled?: boolean
    label?: string
    description?: string
  }
  subtask_states?: Record<string, {
    completed: boolean
    completed_by?: string
    completed_at?: string // date-time
  }>
  next_condition_id?: string
  next_condition_ids?: string[]
  // ...
}
```

### `PatchPhaseReq`

```ts
type PatchPhaseReq = {
  name?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE"
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
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED"
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
      input_context?: { ... }
      output_context?: { ... }
      heal_attempts?: { ... }
      run_for_user_id?: { ... }
      last_heal_attempted_at?: { ... }
      wait_for_journey_submission?: { ... }
      journey_id?: { ... }
      journey_execution?: { ... }
      eligible_closing_reason_ids?: { ... }
      allow_execution_note?: { ... }
      email_review?: { ... }
    }
    phase_id?: string
    task_type?: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  }
}
```
