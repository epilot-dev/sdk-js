# Workflows Definitions

- **Base URL:** `https://workflows-definition.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/workflow-definition](https://docs.epilot.io/api/workflow-definition)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.workflowDefinition.getMaxAllowedLimit(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/workflow-definition'

const workflowDefinitionClient = getClient()
authorize(workflowDefinitionClient, () => '<token>')
const { data } = await workflowDefinitionClient.getMaxAllowedLimit(...)
```

## Operations

**Workflows**
- [`getMaxAllowedLimit`](#getmaxallowedlimit)
- [`getDefinitions`](#getdefinitions)
- [`createDefinition`](#createdefinition)
- [`getDefinition`](#getdefinition)
- [`updateDefinition`](#updatedefinition)
- [`deleteDefinition`](#deletedefinition)
- [`getWorkflowClosingReasons`](#getworkflowclosingreasons)
- [`setWorkflowClosingReasons`](#setworkflowclosingreasons)

**Flows V2**
- [`listFlowTemplates`](#listflowtemplates)
- [`createFlowTemplate`](#createflowtemplate)
- [`searchFlowTemplates`](#searchflowtemplates)
- [`getFlowTemplate`](#getflowtemplate)
- [`updateFlowTemplate`](#updateflowtemplate)
- [`deleteFlowTemplate`](#deleteflowtemplate)
- [`duplicateFlowTemplate`](#duplicateflowtemplate)

**Closing Reason**
- [`getAllClosingReasons`](#getallclosingreasons)
- [`createClosingReason`](#createclosingreason)
- [`getClosingReason`](#getclosingreason)
- [`updateClosingReason`](#updateclosingreason)
- [`deleteClosingReason`](#deleteclosingreason)
- [`changeReasonStatus`](#changereasonstatus)

**Schemas**
- [`FlowTemplateBase`](#flowtemplatebase)
- [`FlowLimitWarning`](#flowlimitwarning)
- [`FlowTemplate`](#flowtemplate)
- [`Version`](#version)
- [`Trigger`](#trigger)
- [`ManualTrigger`](#manualtrigger)
- [`AutomationTrigger`](#automationtrigger)
- [`JourneyAutomationTrigger`](#journeyautomationtrigger)
- [`JourneySubmissionTrigger`](#journeysubmissiontrigger)
- [`CreateFlowTemplate`](#createflowtemplate)
- [`SearchFlowTemplates`](#searchflowtemplates)
- [`FlowTemplatesList`](#flowtemplateslist)
- [`FlowTemplateId`](#flowtemplateid)
- [`Task`](#task)
- [`ManualTask`](#manualtask)
- [`AutomationTask`](#automationtask)
- [`AutomationFailurePolicy`](#automationfailurepolicy)
- [`AutomationConfig`](#automationconfig)
- [`EmailReviewConfig`](#emailreviewconfig)
- [`AutomationInputContext`](#automationinputcontext)
- [`FlowContextSettings`](#flowcontextsettings)
- [`MainContextSetting`](#maincontextsetting)
- [`FlowDisplayRule`](#flowdisplayrule)
- [`FlowRuleAnchor`](#flowruleanchor)
- [`MainContextAnchor`](#maincontextanchor)
- [`RuleAnchor`](#ruleanchor)
- [`AutomationOutputContext`](#automationoutputcontext)
- [`AiAgentTask`](#aiagenttask)
- [`AgentConfig`](#agentconfig)
- [`TriggerMode`](#triggermode)
- [`ActionSchedule`](#actionschedule)
- [`ImmediateSchedule`](#immediateschedule)
- [`DelayedSchedule`](#delayedschedule)
- [`RelativeSchedule`](#relativeschedule)
- [`DecisionTask`](#decisiontask)
- [`TaskBase`](#taskbase)
- [`Phase`](#phase)
- [`Stage`](#stage)
- [`VariableAssignment`](#variableassignment)
- [`TaskType`](#tasktype)
- [`Edge`](#edge)
- [`Condition`](#condition)
- [`Statement`](#statement)
- [`EvaluationSource`](#evaluationsource)
- [`Operator`](#operator)
- [`DueDateConfig`](#duedateconfig)
- [`TimeUnit`](#timeunit)
- [`EnableRequirement`](#enablerequirement)
- [`Subtask`](#subtask)
- [`WorkflowDefinition`](#workflowdefinition)
- [`Step`](#step)
- [`Section`](#section)
- [`TriggerType`](#triggertype)
- [`ItemType`](#itemtype)
- [`StepType`](#steptype)
- [`StepJourney`](#stepjourney)
- [`AiPrefillConfig`](#aiprefillconfig)
- [`AiPrefillExtractionField`](#aiprefillextractionfield)
- [`AiPrefillMapping`](#aiprefillmapping)
- [`JourneyContextParameter`](#journeycontextparameter)
- [`ECPDetails`](#ecpdetails)
- [`PartnerDetails`](#partnerdetails)
- [`StepDescription`](#stepdescription)
- [`MaxAllowedLimit`](#maxallowedlimit)
- [`DefinitionNotFoundResp`](#definitionnotfoundresp)
- [`ClosingReasonNotFoundResp`](#closingreasonnotfoundresp)
- [`ChangeReasonStatusReq`](#changereasonstatusreq)
- [`ClosingReasons`](#closingreasons)
- [`ClosingReason`](#closingreason)
- [`ClosingReasonsStatus`](#closingreasonsstatus)
- [`ClosingReasonsIds`](#closingreasonsids)
- [`ClosingReasonId`](#closingreasonid)
- [`ErrorResp`](#errorresp)
- [`UpdateEntityAttributes`](#updateentityattributes)
- [`EntitySync`](#entitysync)
- [`DynamicDueDate`](#dynamicduedate)
- [`StepRequirement`](#steprequirement)
- [`JourneyContextUsagesReq`](#journeycontextusagesreq)
- [`JourneyContextUsage`](#journeycontextusage)
- [`JourneyContextUsagesResp`](#journeycontextusagesresp)

### `getMaxAllowedLimit`

Get limits and number of created executions for an Organization.

`GET /v1/workflows/limits/max-allowed`

```ts
const { data } = await client.getMaxAllowedLimit()
```

<details>
<summary>Response</summary>

```json
{
  "currentNoOfWorkflows": 0,
  "maxAllowed": 0
}
```

</details>

---

### `getDefinitions`

Retrieve all V1 workflow definitions belonging to the authenticated organization.

`GET /v1/workflows/definitions`

```ts
const { data } = await client.getDefinitions()
```

<details>
<summary>Response</summary>

```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "creationTime": "2021-04-27T12:01:13.000Z",
    "enabled": true,
    "lastUpdateTime": "2021-04-27T12:01:13.000Z",
    "dueDate": "2021-04-27T12:00:00.000Z",
    "dynamicDueDate": {
      "numberOfUnits": 0,
      "timePeriod": "minutes",
      "actionTypeCondition": "WORKFLOW_STARTED",
      "stepId": "string",
      "phaseId": "string"
    },
    "userIds": [0],
    "assignedTo": ["string"],
    "enableECPWorkflow": true,
    "flow": [
      {},
      {}
    ],
    "closingReasons": [
      {}
    ],
    "updateEntityAttributes": [
      {}
    ],
    "taxonomies": ["string"],
    "singleClosingReasonSelection": true,
    "_manifest": ["string"]
  }
]
```

</details>

---

### `createDefinition`

Create a new V1 workflow definition. The definition consists of sections and steps
that define the structure of the workflow. Once created, the definition can be used
to start workflow executions.

`POST /v1/workflows/definitions`

```ts
const { data } = await client.createDefinition(
  null,
  {
    id: 'string',
    name: 'string',
    description: 'string',
    creationTime: '2021-04-27T12:01:13.000Z',
    enabled: true,
    lastUpdateTime: '2021-04-27T12:01:13.000Z',
    dueDate: '2021-04-27T12:00:00.000Z',
    dynamicDueDate: {
      numberOfUnits: 0,
      timePeriod: 'minutes',
      actionTypeCondition: 'WORKFLOW_STARTED',
      stepId: 'string',
      phaseId: 'string'
    },
    userIds: [0],
    assignedTo: ['string'],
    enableECPWorkflow: true,
    flow: [
      {
        id: 'string',
        name: 'string',
        order: 0,
        type: 'STEP',
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        assignedTo: ['string'],
        steps: [ /* ... */ ],
        taxonomies: ['string']
      },
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        executionType: 'MANUAL',
        automationConfig: { /* ... */ },
        journey: { /* ... */ },
        order: 0,
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        userIds: [0],
        requirements: [ /* ... */ ],
        assignedTo: ['string'],
        type: 'STEP',
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string']
      }
    ],
    closingReasons: [
      {
        id: 'x739cew'
      }
    ],
    updateEntityAttributes: [
      {
        source: 'workflow_status',
        target: { /* ... */ }
      }
    ],
    taxonomies: ['string'],
    singleClosingReasonSelection: true,
    _manifest: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "creationTime": "2021-04-27T12:01:13.000Z",
  "enabled": true,
  "lastUpdateTime": "2021-04-27T12:01:13.000Z",
  "dueDate": "2021-04-27T12:00:00.000Z",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "userIds": [0],
  "assignedTo": ["string"],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": ["string"],
      "steps": [],
      "taxonomies": ["string"]
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "executionType": "MANUAL",
      "automationConfig": {},
      "journey": {},
      "order": 0,
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "userIds": [0],
      "requirements": [],
      "assignedTo": ["string"],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"]
    }
  ],
  "closingReasons": [
    {
      "id": "x739cew"
    }
  ],
  "updateEntityAttributes": [
    {
      "source": "workflow_status",
      "target": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"]
}
```

</details>

---

### `listFlowTemplates`

List all Flow Templates for a customer. Optionally, you can filter flow templates by trigger values.

`GET /v2/flows/templates`

```ts
const { data } = await client.listFlowTemplates({
  trigger_type: 'example',
  trigger_source_id: 'example',
  trigger_schema: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "org_id": "string",
      "name": "string",
      "description": "string",
      "portal_titles": {},
      "trigger": {},
      "enabled": true,
      "version": 2,
      "created_at": "2021-04-27T12:01:13.000Z",
      "updated_at": "2021-04-27T12:01:13.000Z",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "stages": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": ["string"],
      "singleClosingReasonSelection": true,
      "_manifest": ["string"],
      "linear": true,
      "context_settings": {},
      "limit_warnings": [],
      "keep_task_automations_in_sync": true
    }
  ]
}
```

</details>

---

### `createFlowTemplate`

Create a new Flow Template (V2 workflow definition).

`POST /v2/flows/templates`

```ts
const { data } = await client.createFlowTemplate(
  {
    enforce_limits: true,
  },
  {
    id: 'string',
    org_id: 'string',
    name: 'string',
    description: 'string',
    portal_titles: {
      ecp: 'string',
      installer: 'string'
    },
    trigger: {
      type: 'automation',
      automation_id: 'g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg'
    },
    enabled: true,
    version: 2,
    created_at: '2021-04-27T12:01:13.000Z',
    updated_at: '2021-04-27T12:01:13.000Z',
    due_date: '2021-04-27T12:00:00.000Z',
    due_date_config: {
      duration: 0,
      unit: 'minutes',
      type: 'WORKFLOW_STARTED',
      task_id: 'string',
      phase_id: 'string'
    },
    assigned_to: ['string'],
    available_in_ecp: true,
    additional_triggers: [
      {
        id: 'string',
        type: 'manual',
        entity_schema: 'string'
      },
      {
        id: 'string',
        type: 'automation',
        automation_id: 'string',
        input_entity: 'thread',
        trigger_config: [ /* ... */ ]
      },
      /* ... 2 more */
    ],
    phases: [
      {
        id: 'string',
        name: 'string',
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        assigned_to: ['string'],
        taxonomies: ['string']
      }
    ],
    stages: [
      {
        id: 'string',
        name: 'string',
        description: 'string',
        entry_node_id: 'string',
        cut_edge_ids: ['string'],
        color: 'string',
        portal_names: { /* ... */ },
        portal_descriptions: { /* ... */ }
      }
    ],
    tasks: [
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        journey: { /* ... */ },
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        requirements: [ /* ... */ ],
        required: false,
        subtasks: [ /* ... */ ],
        assigned_to: ['string'],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string'],
        phase_id: 'string',
        task_type: 'MANUAL'
      },
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        journey: { /* ... */ },
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        requirements: [ /* ... */ ],
        required: false,
        subtasks: [ /* ... */ ],
        assigned_to: ['string'],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string'],
        phase_id: 'string',
        task_type: 'MANUAL',
        automation_config: { /* ... */ },
        on_failure: 'stop',
        trigger_mode: 'manual',
        schedule: { /* ... */ },
        created_automatically: false
      },
      /* ... 2 more */
    ],
    edges: [
      {
        id: 'string',
        from_id: 'string',
        to_id: 'string',
        condition_id: 'string',
        none_met: true
      }
    ],
    closing_reasons: [
      {
        id: 'string',
        title: 'string',
        status: 'ACTIVE',
        lastUpdateTime: 'string',
        creationTime: 'string'
      }
    ],
    entity_sync: [
      {
        trigger: { /* ... */ },
        target: { /* ... */ },
        value: { /* ... */ }
      }
    ],
    taxonomies: ['string'],
    singleClosingReasonSelection: true,
    _manifest: ['string'],
    linear: true,
    context_settings: {
      visibility: 'entity_views',
      main_context: {
        schema: 'string',
        relation_labels: ['string']
      },
      displays: [
        { /* ... */ }
      ]
    },
    limit_warnings: [
      {
        i18nKey: 'string',
        message: 'string',
        max: 0,
        current: 0,
        node_id: 'string',
        task_name: 'string',
        branch_name: 'string',
        param_name: 'string',
        path: [ /* ... */ ]
      }
    ],
    keep_task_automations_in_sync: true
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "trigger": {
    "type": "automation",
    "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
  },
  "enabled": true,
  "version": 2,
  "created_at": "2021-04-27T12:01:13.000Z",
  "updated_at": "2021-04-27T12:01:13.000Z",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "available_in_ecp": true,
  "additional_triggers": [
    {
      "id": "string",
      "type": "manual",
      "entity_schema": "string"
    },
    {
      "id": "string",
      "type": "automation",
      "automation_id": "string",
      "input_entity": "thread",
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "taxonomies": ["string"]
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL"
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
      "on_failure": "stop",
      "trigger_mode": "manual",
      "schedule": {},
      "created_automatically": false
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "string",
      "none_met": true
    }
  ],
  "closing_reasons": [
    {
      "id": "string",
      "title": "string",
      "status": "ACTIVE",
      "lastUpdateTime": "string",
      "creationTime": "string"
    }
  ],
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"],
  "linear": true,
  "context_settings": {
    "visibility": "entity_views",
    "main_context": {
      "schema": "string",
      "relation_labels": ["string"]
    },
    "displays": [
      {}
    ]
  },
  "limit_warnings": [
    {
      "i18nKey": "string",
      "message": "string",
      "max": 0,
      "current": 0,
      "node_id": "string",
      "task_name": "string",
      "branch_name": "string",
      "param_name": "string",
      "path": []
    }
  ],
  "keep_task_automations_in_sync": true
}
```

</details>

---

### `searchFlowTemplates`

Search for flow templates by name, trigger type, enabled status, and more.

`POST /v2/flows/templates:search`

```ts
const { data } = await client.searchFlowTemplates(
  null,
  {
    name: 'string',
    definition_id: 'string',
    trigger_type: 'journey_submission',
    enabled: true,
    from: 0,
    size: 0,
    sort_by: 'updated_at',
    sort_order: 'desc'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "id": "string",
      "org_id": "string",
      "name": "string",
      "description": "string",
      "portal_titles": {},
      "trigger": {},
      "enabled": true,
      "version": 2,
      "created_at": "2021-04-27T12:01:13.000Z",
      "updated_at": "2021-04-27T12:01:13.000Z",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "stages": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": ["string"],
      "singleClosingReasonSelection": true,
      "_manifest": ["string"],
      "linear": true,
      "context_settings": {},
      "limit_warnings": [],
      "keep_task_automations_in_sync": true
    }
  ]
}
```

</details>

---

### `getFlowTemplate`

Retrieve a specific flow template by its unique identifier.

`GET /v2/flows/templates/{flowId}`

```ts
const { data } = await client.getFlowTemplate({
  flowId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "trigger": {
    "type": "automation",
    "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
  },
  "enabled": true,
  "version": 2,
  "created_at": "2021-04-27T12:01:13.000Z",
  "updated_at": "2021-04-27T12:01:13.000Z",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "available_in_ecp": true,
  "additional_triggers": [
    {
      "id": "string",
      "type": "manual",
      "entity_schema": "string"
    },
    {
      "id": "string",
      "type": "automation",
      "automation_id": "string",
      "input_entity": "thread",
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "taxonomies": ["string"]
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL"
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
      "on_failure": "stop",
      "trigger_mode": "manual",
      "schedule": {},
      "created_automatically": false
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "string",
      "none_met": true
    }
  ],
  "closing_reasons": [
    {
      "id": "string",
      "title": "string",
      "status": "ACTIVE",
      "lastUpdateTime": "string",
      "creationTime": "string"
    }
  ],
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"],
  "linear": true,
  "context_settings": {
    "visibility": "entity_views",
    "main_context": {
      "schema": "string",
      "relation_labels": ["string"]
    },
    "displays": [
      {}
    ]
  },
  "limit_warnings": [
    {
      "i18nKey": "string",
      "message": "string",
      "max": 0,
      "current": 0,
      "node_id": "string",
      "task_name": "string",
      "branch_name": "string",
      "param_name": "string",
      "path": []
    }
  ],
  "keep_task_automations_in_sync": true
}
```

</details>

---

### `updateFlowTemplate`

Update Flow Template.

`PUT /v2/flows/templates/{flowId}`

```ts
const { data } = await client.updateFlowTemplate(
  {
    flowId: 'example',
    enforce_limits: true,
  },
  {
    id: 'string',
    org_id: 'string',
    name: 'string',
    description: 'string',
    portal_titles: {
      ecp: 'string',
      installer: 'string'
    },
    trigger: {
      type: 'automation',
      automation_id: 'g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg'
    },
    enabled: true,
    version: 2,
    created_at: '2021-04-27T12:01:13.000Z',
    updated_at: '2021-04-27T12:01:13.000Z',
    due_date: '2021-04-27T12:00:00.000Z',
    due_date_config: {
      duration: 0,
      unit: 'minutes',
      type: 'WORKFLOW_STARTED',
      task_id: 'string',
      phase_id: 'string'
    },
    assigned_to: ['string'],
    available_in_ecp: true,
    additional_triggers: [
      {
        id: 'string',
        type: 'manual',
        entity_schema: 'string'
      },
      {
        id: 'string',
        type: 'automation',
        automation_id: 'string',
        input_entity: 'thread',
        trigger_config: [ /* ... */ ]
      },
      /* ... 2 more */
    ],
    phases: [
      {
        id: 'string',
        name: 'string',
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        assigned_to: ['string'],
        taxonomies: ['string']
      }
    ],
    stages: [
      {
        id: 'string',
        name: 'string',
        description: 'string',
        entry_node_id: 'string',
        cut_edge_ids: ['string'],
        color: 'string',
        portal_names: { /* ... */ },
        portal_descriptions: { /* ... */ }
      }
    ],
    tasks: [
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        journey: { /* ... */ },
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        requirements: [ /* ... */ ],
        required: false,
        subtasks: [ /* ... */ ],
        assigned_to: ['string'],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string'],
        phase_id: 'string',
        task_type: 'MANUAL'
      },
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        journey: { /* ... */ },
        due_date: '2021-04-27T12:00:00.000Z',
        due_date_config: { /* ... */ },
        requirements: [ /* ... */ ],
        required: false,
        subtasks: [ /* ... */ ],
        assigned_to: ['string'],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string'],
        phase_id: 'string',
        task_type: 'MANUAL',
        automation_config: { /* ... */ },
        on_failure: 'stop',
        trigger_mode: 'manual',
        schedule: { /* ... */ },
        created_automatically: false
      },
      /* ... 2 more */
    ],
    edges: [
      {
        id: 'string',
        from_id: 'string',
        to_id: 'string',
        condition_id: 'string',
        none_met: true
      }
    ],
    closing_reasons: [
      {
        id: 'string',
        title: 'string',
        status: 'ACTIVE',
        lastUpdateTime: 'string',
        creationTime: 'string'
      }
    ],
    entity_sync: [
      {
        trigger: { /* ... */ },
        target: { /* ... */ },
        value: { /* ... */ }
      }
    ],
    taxonomies: ['string'],
    singleClosingReasonSelection: true,
    _manifest: ['string'],
    linear: true,
    context_settings: {
      visibility: 'entity_views',
      main_context: {
        schema: 'string',
        relation_labels: ['string']
      },
      displays: [
        { /* ... */ }
      ]
    },
    limit_warnings: [
      {
        i18nKey: 'string',
        message: 'string',
        max: 0,
        current: 0,
        node_id: 'string',
        task_name: 'string',
        branch_name: 'string',
        param_name: 'string',
        path: [ /* ... */ ]
      }
    ],
    keep_task_automations_in_sync: true
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "trigger": {
    "type": "automation",
    "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
  },
  "enabled": true,
  "version": 2,
  "created_at": "2021-04-27T12:01:13.000Z",
  "updated_at": "2021-04-27T12:01:13.000Z",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "available_in_ecp": true,
  "additional_triggers": [
    {
      "id": "string",
      "type": "manual",
      "entity_schema": "string"
    },
    {
      "id": "string",
      "type": "automation",
      "automation_id": "string",
      "input_entity": "thread",
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "taxonomies": ["string"]
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL"
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
      "on_failure": "stop",
      "trigger_mode": "manual",
      "schedule": {},
      "created_automatically": false
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "string",
      "none_met": true
    }
  ],
  "closing_reasons": [
    {
      "id": "string",
      "title": "string",
      "status": "ACTIVE",
      "lastUpdateTime": "string",
      "creationTime": "string"
    }
  ],
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"],
  "linear": true,
  "context_settings": {
    "visibility": "entity_views",
    "main_context": {
      "schema": "string",
      "relation_labels": ["string"]
    },
    "displays": [
      {}
    ]
  },
  "limit_warnings": [
    {
      "i18nKey": "string",
      "message": "string",
      "max": 0,
      "current": 0,
      "node_id": "string",
      "task_name": "string",
      "branch_name": "string",
      "param_name": "string",
      "path": []
    }
  ],
  "keep_task_automations_in_sync": true
}
```

</details>

---

### `deleteFlowTemplate`

Delete Flow Template.

`DELETE /v2/flows/templates/{flowId}`

```ts
const { data } = await client.deleteFlowTemplate({
  flowId: 'example',
})
```

---

### `duplicateFlowTemplate`

Create a copy of an existing flow template. The duplicated template will have a new
unique identifier and can be modified independently of the original. This is useful
for creating variations of exist

`POST /v2/flows/templates/{flowId}/duplicate`

```ts
const { data } = await client.duplicateFlowTemplate({
  flowId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "portal_titles": {
    "ecp": "string",
    "installer": "string"
  },
  "trigger": {
    "type": "automation",
    "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
  },
  "enabled": true,
  "version": 2,
  "created_at": "2021-04-27T12:01:13.000Z",
  "updated_at": "2021-04-27T12:01:13.000Z",
  "due_date": "2021-04-27T12:00:00.000Z",
  "due_date_config": {
    "duration": 0,
    "unit": "minutes",
    "type": "WORKFLOW_STARTED",
    "task_id": "string",
    "phase_id": "string"
  },
  "assigned_to": ["string"],
  "available_in_ecp": true,
  "additional_triggers": [
    {
      "id": "string",
      "type": "manual",
      "entity_schema": "string"
    },
    {
      "id": "string",
      "type": "automation",
      "automation_id": "string",
      "input_entity": "thread",
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": ["string"],
      "taxonomies": ["string"]
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL"
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "required": false,
      "subtasks": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
      "on_failure": "stop",
      "trigger_mode": "manual",
      "schedule": {},
      "created_automatically": false
    }
  ],
  "edges": [
    {
      "id": "string",
      "from_id": "string",
      "to_id": "string",
      "condition_id": "string",
      "none_met": true
    }
  ],
  "closing_reasons": [
    {
      "id": "string",
      "title": "string",
      "status": "ACTIVE",
      "lastUpdateTime": "string",
      "creationTime": "string"
    }
  ],
  "entity_sync": [
    {
      "trigger": {},
      "target": {},
      "value": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"],
  "linear": true,
  "context_settings": {
    "visibility": "entity_views",
    "main_context": {
      "schema": "string",
      "relation_labels": ["string"]
    },
    "displays": [
      {}
    ]
  },
  "limit_warnings": [
    {
      "i18nKey": "string",
      "message": "string",
      "max": 0,
      "current": 0,
      "node_id": "string",
      "task_name": "string",
      "branch_name": "string",
      "param_name": "string",
      "path": []
    }
  ],
  "keep_task_automations_in_sync": true
}
```

</details>

---

### `getDefinition`

Get specific Definition by id from the Organization.

`GET /v1/workflows/definitions/{definitionId}`

```ts
const { data } = await client.getDefinition({
  definitionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "creationTime": "2021-04-27T12:01:13.000Z",
  "enabled": true,
  "lastUpdateTime": "2021-04-27T12:01:13.000Z",
  "dueDate": "2021-04-27T12:00:00.000Z",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "userIds": [0],
  "assignedTo": ["string"],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": ["string"],
      "steps": [],
      "taxonomies": ["string"]
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "executionType": "MANUAL",
      "automationConfig": {},
      "journey": {},
      "order": 0,
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "userIds": [0],
      "requirements": [],
      "assignedTo": ["string"],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"]
    }
  ],
  "closingReasons": [
    {
      "id": "x739cew"
    }
  ],
  "updateEntityAttributes": [
    {
      "source": "workflow_status",
      "target": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"]
}
```

</details>

---

### `updateDefinition`

Update Workflow Definition.

`PUT /v1/workflows/definitions/{definitionId}`

```ts
const { data } = await client.updateDefinition(
  {
    definitionId: 'example',
  },
  {
    id: 'string',
    name: 'string',
    description: 'string',
    creationTime: '2021-04-27T12:01:13.000Z',
    enabled: true,
    lastUpdateTime: '2021-04-27T12:01:13.000Z',
    dueDate: '2021-04-27T12:00:00.000Z',
    dynamicDueDate: {
      numberOfUnits: 0,
      timePeriod: 'minutes',
      actionTypeCondition: 'WORKFLOW_STARTED',
      stepId: 'string',
      phaseId: 'string'
    },
    userIds: [0],
    assignedTo: ['string'],
    enableECPWorkflow: true,
    flow: [
      {
        id: 'string',
        name: 'string',
        order: 0,
        type: 'STEP',
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        assignedTo: ['string'],
        steps: [ /* ... */ ],
        taxonomies: ['string']
      },
      {
        id: 'string',
        name: 'string',
        description: { /* ... */ },
        executionType: 'MANUAL',
        automationConfig: { /* ... */ },
        journey: { /* ... */ },
        order: 0,
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        userIds: [0],
        requirements: [ /* ... */ ],
        assignedTo: ['string'],
        type: 'STEP',
        ecp: { /* ... */ },
        installer: { /* ... */ },
        partner: { /* ... */ },
        taxonomies: ['string']
      }
    ],
    closingReasons: [
      {
        id: 'x739cew'
      }
    ],
    updateEntityAttributes: [
      {
        source: 'workflow_status',
        target: { /* ... */ }
      }
    ],
    taxonomies: ['string'],
    singleClosingReasonSelection: true,
    _manifest: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "creationTime": "2021-04-27T12:01:13.000Z",
  "enabled": true,
  "lastUpdateTime": "2021-04-27T12:01:13.000Z",
  "dueDate": "2021-04-27T12:00:00.000Z",
  "dynamicDueDate": {
    "numberOfUnits": 0,
    "timePeriod": "minutes",
    "actionTypeCondition": "WORKFLOW_STARTED",
    "stepId": "string",
    "phaseId": "string"
  },
  "userIds": [0],
  "assignedTo": ["string"],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": ["string"],
      "steps": [],
      "taxonomies": ["string"]
    },
    {
      "id": "string",
      "name": "string",
      "description": {},
      "executionType": "MANUAL",
      "automationConfig": {},
      "journey": {},
      "order": 0,
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "userIds": [0],
      "requirements": [],
      "assignedTo": ["string"],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "partner": {},
      "taxonomies": ["string"]
    }
  ],
  "closingReasons": [
    {
      "id": "x739cew"
    }
  ],
  "updateEntityAttributes": [
    {
      "source": "workflow_status",
      "target": {}
    }
  ],
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_manifest": ["string"]
}
```

</details>

---

### `deleteDefinition`

Delete Workflow Definition.

`DELETE /v1/workflows/definitions/{definitionId}`

```ts
const { data } = await client.deleteDefinition({
  definitionId: 'example',
})
```

---

### `getAllClosingReasons`

Get all Closing Reasons defined in the organization by default all Active.

`GET /v1/workflows/closing-reasons`

```ts
const { data } = await client.getAllClosingReasons({
  includeInactive: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "reasons": [
    {
      "id": "string",
      "title": "string",
      "status": "ACTIVE",
      "lastUpdateTime": "string",
      "creationTime": "string"
    }
  ]
}
```

</details>

---

### `createClosingReason`

A created Closing Reason is stored for the organization and will be displayed in the library of reasons.

`POST /v1/workflows/closing-reasons`

```ts
const { data } = await client.createClosingReason(
  null,
  {
    id: 'string',
    title: 'string',
    status: 'ACTIVE',
    lastUpdateTime: 'string',
    creationTime: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "title": "string",
  "status": "ACTIVE",
  "lastUpdateTime": "string",
  "creationTime": "string"
}
```

</details>

---

### `getClosingReason`

Get specific closing reason by id from the organisation.

`GET /v2/workflows/closing-reasons/{reasonId}`

```ts
const { data } = await client.getClosingReason({
  reasonId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "title": "string",
  "status": "ACTIVE",
  "lastUpdateTime": "string",
  "creationTime": "string"
}
```

</details>

---

### `updateClosingReason`

Update an existing closing reason

`PATCH /v2/workflows/closing-reasons/{reasonId}`

```ts
const { data } = await client.updateClosingReason(
  {
    reasonId: 'example',
  },
  {
    id: 'string',
    title: 'string',
    status: 'ACTIVE',
    lastUpdateTime: 'string',
    creationTime: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "title": "string",
  "status": "ACTIVE",
  "lastUpdateTime": "string",
  "creationTime": "string"
}
```

</details>

---

### `deleteClosingReason`

Permanently delete a closing reason (Using INACTIVE status is recommended instead)

`DELETE /v2/workflows/closing-reasons/{reasonId}`

```ts
const { data } = await client.deleteClosingReason({
  reasonId: 'example',
})
```

---

### `changeReasonStatus`

Change the status of a Closing Reason (eg. ACTIVE to INACTIVE).

`PATCH /v1/workflows/closing-reasons/{reasonId}`

```ts
const { data } = await client.changeReasonStatus(
  {
    reasonId: 'example',
  },
  {
    status: 'ACTIVE'
  },
)
```

---

### `getWorkflowClosingReasons`

Returns all closing reasons defined for the workflow.

`GET /v1/workflows/definitions/{definitionId}/closing-reasons`

```ts
const { data } = await client.getWorkflowClosingReasons({
  definitionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "reasons": [
    {
      "id": "x739cew"
    }
  ]
}
```

</details>

---

### `setWorkflowClosingReasons`

Sets which closing reasons are defined for this workflow, based on the entire closing reasons catalog.

`PATCH /v1/workflows/definitions/{definitionId}/closing-reasons`

```ts
const { data } = await client.setWorkflowClosingReasons(
  {
    definitionId: 'example',
  },
  {
    reasons: [
      {
        id: 'x739cew'
      }
    ]
  },
)
```

---

## Schemas

### `FlowTemplateBase`

Base schema for V2 flow templates. A flow template defines the structure of a workflow
including phases, tasks, edges, triggers, and other configuration. Flow templates serve
as blueprints that can be instantiated as flow executions.


```ts
type FlowTemplateBase = {
  id?: string
  org_id?: string
  name: string
  description?: string
  portal_titles?: {
    ecp?: string
    installer?: string
  }
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }
  enabled?: boolean
  version?: "v1" | "v2" | "v3"
  created_at?: string
  updated_at?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  available_in_ecp?: boolean
  additional_triggers?: Array<{
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }>
  phases?: Array<{
    id: string
    name: string
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
    taxonomies?: string[]
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
  // ...
}
```

### `FlowLimitWarning`

A configuration limit that the flow currently exceeds. Returned by the get-flow endpoint and by create/update responses so the UI can show a non-blocking banner. Size/count limit violations never cause a 400 — only structural errors do. The flow remains fully usable; users are encouraged to bring va

```ts
type FlowLimitWarning = {
  i18nKey: string
  message: string
  max: number
  current?: number
  node_id?: string
  task_name?: string
  branch_name?: string
  param_name?: string
  path: unknown[]
}
```

### `FlowTemplate`

```ts
type FlowTemplate = {
  id?: string
  org_id?: string
  name: string
  description?: string
  portal_titles?: {
    ecp?: string
    installer?: string
  }
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }
  enabled?: boolean
  version?: "v1" | "v2" | "v3"
  created_at?: string
  updated_at?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  available_in_ecp?: boolean
  additional_triggers?: Array<{
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }>
  phases?: Array<{
    id: string
    name: string
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
    taxonomies?: string[]
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
  // ...
}
```

### `Version`

Version of the workflow schema.

- `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.
- `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.
- `v3` – Advanced workflows. Adds support for branching logic (co

```ts
type Version = "v1" | "v2" | "v3"
```

### `Trigger`

```ts
type Trigger = {
  id?: string
  type: "manual"
  entity_schema?: string
} | {
  id?: string
  type: "automation"
  automation_id?: string
  input_entity?: "thread" | "first_email" | "last_email"
  trigger_config?: Array<{
    type: string
    configuration?: Record<string, unknown>
  }>
} | {
  id?: string
  type: "journey_submission"
  journey_id: string
  journey_name?: string
  automation_id?: string
} | {
  id?: string
  type: "journey_automation"
  entity_schema?: string
}
```

### `ManualTrigger`

```ts
type ManualTrigger = {
  id?: string
  type: "manual"
  entity_schema?: string
}
```

### `AutomationTrigger`

```ts
type AutomationTrigger = {
  id?: string
  type: "automation"
  automation_id?: string
  input_entity?: "thread" | "first_email" | "last_email"
  trigger_config?: Array<{
    type: string
    configuration?: Record<string, unknown>
  }>
}
```

### `JourneyAutomationTrigger`

```ts
type JourneyAutomationTrigger = {
  id?: string
  type: "journey_automation"
  entity_schema?: string
}
```

### `JourneySubmissionTrigger`

```ts
type JourneySubmissionTrigger = {
  id?: string
  type: "journey_submission"
  journey_id: string
  journey_name?: string
  automation_id?: string
}
```

### `CreateFlowTemplate`

```ts
type CreateFlowTemplate = {
  id?: string
  org_id?: string
  name: string
  description?: string
  portal_titles?: {
    ecp?: string
    installer?: string
  }
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }
  enabled?: boolean
  version?: "v1" | "v2" | "v3"
  created_at?: string
  updated_at?: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  available_in_ecp?: boolean
  additional_triggers?: Array<{
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
    input_entity?: "thread" | "first_email" | "last_email"
    trigger_config?: Array<{
      type: { ... }
      configuration?: { ... }
    }>
  } | {
    id?: string
    type: "journey_submission"
    journey_id: string
    journey_name?: string
    automation_id?: string
  } | {
    id?: string
    type: "journey_automation"
    entity_schema?: string
  }>
  phases?: Array<{
    id: string
    name: string
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
    taxonomies?: string[]
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
  // ...
}
```

### `SearchFlowTemplates`

```ts
type SearchFlowTemplates = {
  name?: string
  definition_id?: string
  trigger_type?: "journey_submission" | "manual" | "automation"
  enabled?: boolean
  from?: number
  size?: number
  sort_by?: "created_at" | "updated_at" | "name" | "enabled" | "id"
  sort_order?: "asc" | "desc"
}
```

### `FlowTemplatesList`

```ts
type FlowTemplatesList = {
  results: Array<{
    id?: string
    org_id?: string
    name: string
    description?: string
    portal_titles?: {
      ecp?: { ... }
      installer?: { ... }
    }
    trigger?: {
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      automation_id?: { ... }
      input_entity?: { ... }
      trigger_config?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      journey_id: { ... }
      journey_name?: { ... }
      automation_id?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    }
    enabled?: boolean
    version?: "v1" | "v2" | "v3"
    created_at?: string
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
    available_in_ecp?: boolean
    additional_triggers?: Array<{
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      automation_id?: { ... }
      input_entity?: { ... }
      trigger_config?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      journey_id: { ... }
      journey_name?: { ... }
      automation_id?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    }>
    phases?: Array<{
      id: { ... }
      name: { ... }
      due_date?: { ... }
      due_date_config?: { ... }
      assigned_to?: { ... }
      taxonomies?: { ... }
    }>
    stages?: Array<{
      id: { ... }
      name: { ... }
      description?: { ... }
      entry_node_id?: { ... }
      cut_edge_ids?: { ... }
      color?: { ... }
      portal_names?: { ... }
      portal_descriptions?: { ... }
    }>
    tasks: Array<{
      id: { ... }
      name: { ... }
      description?: { ... }
      journey?: { ... }
      due_date?: { ... }
      due_date_config?: { ... }
      requirements?: { ... }
      required?: { ... }
      subtasks?: { ... }
      assigned_to?: { ... }
      ecp?: { ... }
      installer?: { ... }
  // ...
}
```

### `FlowTemplateId`

Short unique id (length 8) to identify the Flow Template.

```ts
type FlowTemplateId = string
```

### `Task`

```ts
type Task = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
} | {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  journey?: {
    id?: string
    journeyId?: string
    name?: string
  // ...
}
```

### `ManualTask`

```ts
type ManualTask = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
}
```

### `AutomationTask`

```ts
type AutomationTask = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  automation_config: {
    flow_id?: string
    action_config?: {
      type: { ... }
      config?: { ... }
    }
    duplicated_flow_id?: string
    input_context?: {
      source: { ... }
      task_id?: { ... }
      trigger_id?: { ... }
  // ...
}
```

### `AutomationFailurePolicy`

What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`.

```ts
type AutomationFailurePolicy = "stop" | "continue"
```

### `AutomationConfig`

Configuration for automation execution to run

```ts
type AutomationConfig = {
  flow_id?: string
  action_config?: {
    type: string
    config?: Record<string, unknown>
  }
  duplicated_flow_id?: string
  input_context?: {
    source: "trigger" | "task"
    task_id?: string
    trigger_id?: string
  }
  output_context?: {
    set_as_primary?: boolean
    attach_to_contexts?: boolean
  }
  eligible_closing_reason_ids?: string[]
  email_review?: {
    enabled?: boolean
    allow_document_selection?: boolean
    allow_subject_and_body_edit?: boolean
  }
  allow_execution_note?: boolean
}
```

### `EmailReviewConfig`

Whether the person running a semi-automated send-email step may adjust the email before it goes out, and what they may adjust. Meaningful only on a task a person triggers — the engine's own dispatch has nobody to review — so the template healer clears it from an `automatic` task. With `enabled` fals

```ts
type EmailReviewConfig = {
  enabled?: boolean
  allow_document_selection?: boolean
  allow_subject_and_body_edit?: boolean
}
```

### `AutomationInputContext`

Optional. Source of the entity fed into this automation task. If omitted, the entity of the trigger that started the run is used.


```ts
type AutomationInputContext = {
  source: "trigger" | "task"
  task_id?: string
  trigger_id?: string
}
```

### `FlowContextSettings`

Where a flow runs, and where people see it.
A run is ALWAYS visible on the entities it runs on — the entity its trigger supplied and every context it picks up. That is not configurable: it is what running there means, and hiding a run from its own entity is what `visibility: background` is for.
`dis

```ts
type FlowContextSettings = {
  visibility?: "entity_views" | "background"
  main_context?: {
    schema: string
    relation_labels?: string[]
  }
  displays?: Array<{
    id: string
    entity_schema: string
    from?: {
      role: { ... }
    } | {
      role: { ... }
      rule_id: { ... }
    }
    relation_labels?: string[]
    attach_to_contexts?: boolean
  }>
}
```

### `MainContextSetting`

Which of a flow's contexts owns the run: the entity conditions, automations and entity sync resolve against by default.
ABSENT means the historical behaviour — the primary trigger's entity. That default exists because it describes every flow built so far, not because the primary trigger is special: 

```ts
type MainContextSetting = {
  schema: string
  relation_labels?: string[]
}
```

### `FlowDisplayRule`

One additional entity kind the flow should be visible on, found by relation from the main context or from an earlier entry.
An entity reached this way has no context of its own: it shows the main context's run, and acting on it acts on the main context. Nothing is copied and no second run starts.
Th

```ts
type FlowDisplayRule = {
  id: string
  entity_schema: string
  from?: {
    role: "main_context"
  } | {
    role: "rule"
    rule_id: string
  }
  relation_labels?: string[]
  attach_to_contexts?: boolean
}
```

### `FlowRuleAnchor`

Where an entry starts looking. Absent means `main_context`.
A ROLE, not a schema: an entry anchored on `main_context` follows the primary when a task promotes another entity, where naming a schema would freeze it on the old one.


```ts
type FlowRuleAnchor = {
  role: "main_context"
} | {
  role: "rule"
  rule_id: string
}
```

### `MainContextAnchor`

The run's primary context, whatever it currently is.

```ts
type MainContextAnchor = {
  role: "main_context"
}
```

### `RuleAnchor`

An earlier entry in `displays`, by its id: this entry searches from whatever that one matched. Chaining ticket -> contact -> account this way keeps both hops DISPLAY-only; making the contact a real context first is a separate decision (`attach_to_contexts`), not a prerequisite for reaching the accou

```ts
type RuleAnchor = {
  role: "rule"
  rule_id: string
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

### `AiAgentTask`

```ts
type AiAgentTask = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  agent_config?: {
    agent_id: string
  }
  trigger_mode?: "manual" | "automatic"
}
```

### `AgentConfig`

Configuration for AI Agent to run

```ts
type AgentConfig = {
  agent_id: string
}
```

### `TriggerMode`

```ts
type TriggerMode = "manual" | "automatic"
```

### `ActionSchedule`

```ts
type ActionSchedule = {
  mode?: "immediate"
} | {
  mode: "delayed"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
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
}
```

### `ImmediateSchedule`

```ts
type ImmediateSchedule = {
  mode?: "immediate"
}
```

### `DelayedSchedule`

```ts
type DelayedSchedule = {
  mode: "delayed"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
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
}
```

### `DecisionTask`

```ts
type DecisionTask = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
      value_type?: { ... }
  // ...
}
```

### `TaskBase`

```ts
type TaskBase = {
  id: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
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
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
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
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
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
  taxonomies?: string[]
  phase_id?: string
  task_type: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
}
```

### `Phase`

```ts
type Phase = {
  id: string
  name: string
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string[]
  }>
  taxonomies?: string[]
}
```

### `Stage`

A customer-facing progress segment layered on top of the flow graph. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order; the array order is the boundary order and must match

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

### `VariableAssignment`

Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution.

```ts
type VariableAssignment = {
  variable: string
  value?: string[]
}
```

### `TaskType`

```ts
type TaskType = "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
```

### `Edge`

```ts
type Edge = {
  id: string
  from_id: string
  to_id?: string
  condition_id?: string
  none_met?: boolean
}
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
}
```

### `Statement`

```ts
type Statement = {
  id: string
  source: {
    id?: string
    origin?: "trigger" | "action"
    origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context"
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
  origin?: "trigger" | "action"
  origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context"
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

Set due date for the task based on a dynamic condition

```ts
type DueDateConfig = {
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED"
  task_id?: string
  phase_id?: string
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

### `WorkflowDefinition`

V1 workflow definition schema. Defines a linear workflow structure with sections
and steps. Sections group related steps together, and steps represent individual
tasks that need to be completed. This is the legacy workflow model; for new
implementations, consider using V2 flow templates instead.


```ts
type WorkflowDefinition = {
  id?: string
  name: string
  description?: string
  creationTime?: string
  enabled?: boolean
  lastUpdateTime?: string
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  userIds?: number[]
  assignedTo?: string[]
  enableECPWorkflow?: boolean
  flow: Array<{
    id?: string
    name: string
    order: number
    type: "STEP" | "SECTION"
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    assignedTo?: string[]
    steps: Array<{
      id?: { ... }
      name: { ... }
      description?: { ... }
      executionType?: { ... }
      automationConfig?: { ... }
      journey?: { ... }
      order: { ... }
      dueDate?: { ... }
      dynamicDueDate?: { ... }
      userIds?: { ... }
      requirements?: { ... }
      assignedTo?: { ... }
      type: { ... }
      ecp?: { ... }
      installer?: { ... }
      partner?: { ... }
      taxonomies?: { ... }
    }>
    taxonomies?: string[]
  } | {
    id?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    executionType?: "MANUAL" | "AUTOMATION"
    automationConfig?: {
      flowId: { ... }
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
    order: number
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    userIds?: number[]
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    assignedTo?: string[]
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
  // ...
}
```

### `Step`

Action that needs to be done in a Workflow

```ts
type Step = {
  id?: string
  name: string
  description?: {
    enabled?: boolean
    value?: string
  }
  executionType?: "MANUAL" | "AUTOMATION"
  automationConfig?: {
    flowId: string
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
  order: number
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  userIds?: number[]
  requirements?: Array<{
    definitionId: string
    type: "STEP" | "SECTION"
    condition: "CLOSED"
  }>
  assignedTo?: string[]
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
  taxonomies?: string[]
}
```

### `Section`

A group of Steps that define the progress of the Workflow

```ts
type Section = {
  id?: string
  name: string
  order: number
  type: "STEP" | "SECTION"
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
    actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  assignedTo?: string[]
  steps: Array<{
    id?: string
    name: string
    description?: {
      enabled?: { ... }
      value?: { ... }
    }
    executionType?: "MANUAL" | "AUTOMATION"
    automationConfig?: {
      flowId: { ... }
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
    order: number
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition: { ... }
      stepId?: { ... }
      phaseId?: { ... }
    }
    userIds?: number[]
    requirements?: Array<{
      definitionId: { ... }
      type: { ... }
      condition: { ... }
    }>
    assignedTo?: string[]
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
    taxonomies?: string[]
  }>
  taxonomies?: string[]
}
```

### `TriggerType`

```ts
type TriggerType = "MANUAL" | "AUTOMATIC"
```

### `ItemType`

```ts
type ItemType = "STEP" | "SECTION"
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

### `JourneyContextParameter`

```ts
type JourneyContextParameter = {
  key: string
  value: string
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

### `MaxAllowedLimit`

```ts
type MaxAllowedLimit = {
  currentNoOfWorkflows?: number
  maxAllowed?: number
}
```

### `DefinitionNotFoundResp`

Error response returned when a workflow definition or flow template is not found.

```ts
type DefinitionNotFoundResp = {
  message?: string
}
```

### `ClosingReasonNotFoundResp`

Error response returned when a closing reason is not found.

```ts
type ClosingReasonNotFoundResp = {
  message?: string
}
```

### `ChangeReasonStatusReq`

```ts
type ChangeReasonStatusReq = {
  status: "ACTIVE" | "INACTIVE"
}
```

### `ClosingReasons`

```ts
type ClosingReasons = {
  reasons: Array<{
    id?: string
    title?: string
    status?: "ACTIVE" | "INACTIVE"
    lastUpdateTime?: string
    creationTime?: string
  }>
}
```

### `ClosingReason`

One Closing reason for a workflow

```ts
type ClosingReason = {
  id?: string
  title?: string
  status?: "ACTIVE" | "INACTIVE"
  lastUpdateTime?: string
  creationTime?: string
}
```

### `ClosingReasonsStatus`

```ts
type ClosingReasonsStatus = "ACTIVE" | "INACTIVE"
```

### `ClosingReasonsIds`

```ts
type ClosingReasonsIds = {
  reasons: Array<{
    id: string
  }>
}
```

### `ClosingReasonId`

```ts
type ClosingReasonId = {
  id: string
}
```

### `ErrorResp`

Standard error response returned when an API request fails.

```ts
type ErrorResp = {
  message?: string
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

Configuration for calculating a due date dynamically based on workflow events.
The due date is computed by adding a duration (numberOfUnits + timePeriod) to
a reference point defined by actionTypeCondition (e.g., when workflow started,
when a step closed, or when a phase finished).


```ts
type DynamicDueDate = {
  numberOfUnits: number
  timePeriod: "minutes" | "hours" | "days" | "weeks" | "months" | "years"
  actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
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

### `JourneyContextUsagesReq`

Request payload for getJourneyContextUsages.

```ts
type JourneyContextUsagesReq = {
  journey_id: string
  param_keys: string[]
  param_ids?: string[]
}
```

### `JourneyContextUsage`

One place a flow template task presets one of the requested context parameters.

```ts
type JourneyContextUsage = {
  kind: "workflow-task"
  resource: {
    type: "workflow_template"
    id: string
    name?: string
  }
  location?: {
    task_id?: string
    task_name?: string
  }
  matched_as: {
    dialect: "name"
    token: string
    at: string
  }
  link_hint?: {
    route: "workflows-hub-flow"
    params: {
      template_id: { ... }
    }
  }
}
```

### `JourneyContextUsagesResp`

Response payload for getJourneyContextUsages.

```ts
type JourneyContextUsagesResp = {
  usages: Array<{
    kind: "workflow-task"
    resource: {
      type: { ... }
      id: { ... }
      name?: { ... }
    }
    location?: {
      task_id?: { ... }
      task_name?: { ... }
    }
    matched_as: {
      dialect: { ... }
      token: { ... }
      at: { ... }
    }
    link_hint?: {
      route: { ... }
      params: { ... }
    }
  }>
  status: "ok" | "partial"
  scanned: number
}
```
