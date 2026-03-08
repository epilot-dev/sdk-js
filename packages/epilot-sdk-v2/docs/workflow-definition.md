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

const workflowDefinitionClient = await getClient()
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
- [`exportFlowTemplate`](#exportflowtemplate)
- [`importFlowTemplate`](#importflowtemplate)

**Closing Reason**
- [`getAllClosingReasons`](#getallclosingreasons)
- [`createClosingReason`](#createclosingreason)
- [`getClosingReason`](#getclosingreason)
- [`updateClosingReason`](#updateclosingreason)
- [`deleteClosingReason`](#deleteclosingreason)
- [`changeReasonStatus`](#changereasonstatus)

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

Retrieve all Workflow Definitions from an Organization

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
    "userIds": [
      0
    ],
    "assignedTo": [
      "string"
    ],
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
    "taxonomies": [
      "string"
    ],
    "singleClosingReasonSelection": true
  }
]
```

</details>

---

### `createDefinition`

Create a Workflow Definition.

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
    userIds: [
      0
    ],
    assignedTo: [
      'string'
    ],
    enableECPWorkflow: true,
    flow: [
      {
        id: 'string',
        name: 'string',
        order: 0,
        type: 'STEP',
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        assignedTo: [ /* ... */ ],
        steps: [ /* ... */ ],
        taxonomies: [ /* ... */ ]
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
        userIds: [ /* ... */ ],
        requirements: [ /* ... */ ],
        assignedTo: [ /* ... */ ],
        type: 'STEP',
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ]
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
    taxonomies: [
      'string'
    ],
    singleClosingReasonSelection: true
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
  "userIds": [
    0
  ],
  "assignedTo": [
    "string"
  ],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": [],
      "steps": [],
      "taxonomies": []
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
      "userIds": [],
      "requirements": [],
      "assignedTo": [],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "taxonomies": []
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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
      "trigger": {},
      "enabled": true,
      "version": 2,
      "created_at": "2021-04-27T12:01:13.000Z",
      "updated_at": "2021-04-27T12:01:13.000Z",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": [],
      "singleClosingReasonSelection": true
    }
  ]
}
```

</details>

---

### `createFlowTemplate`

Create a new Flow Template.

`POST /v2/flows/templates`

```ts
const { data } = await client.createFlowTemplate(
  null,
  {
    id: 'string',
    org_id: 'string',
    name: 'string',
    description: 'string',
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
    assigned_to: [
      'string'
    ],
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
        assigned_to: [ /* ... */ ],
        taxonomies: [ /* ... */ ]
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
        phase_id: 'string',
        task_type: 'MANUAL',
        automation_config: { /* ... */ },
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
    taxonomies: [
      'string'
    ],
    singleClosingReasonSelection: true
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
  "assigned_to": [
    "string"
  ],
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
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "taxonomies": []
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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
      "trigger": {},
      "enabled": true,
      "version": 2,
      "created_at": "2021-04-27T12:01:13.000Z",
      "updated_at": "2021-04-27T12:01:13.000Z",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": [],
      "singleClosingReasonSelection": true
    }
  ]
}
```

</details>

---

### `getFlowTemplate`

Get specific FLow template for a customer

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
  "assigned_to": [
    "string"
  ],
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
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "taxonomies": []
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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
  },
  {
    id: 'string',
    org_id: 'string',
    name: 'string',
    description: 'string',
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
    assigned_to: [
      'string'
    ],
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
        assigned_to: [ /* ... */ ],
        taxonomies: [ /* ... */ ]
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
        phase_id: 'string',
        task_type: 'MANUAL',
        automation_config: { /* ... */ },
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
    taxonomies: [
      'string'
    ],
    singleClosingReasonSelection: true
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
  "assigned_to": [
    "string"
  ],
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
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "taxonomies": []
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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

Duplicate a Flow Template from an existing workflow.

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
  "assigned_to": [
    "string"
  ],
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
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "taxonomies": []
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
}
```

</details>

---

### `exportFlowTemplate`

Export a Flow Template with all referenced automations resolved and bundled alongside.

`GET /v2/flows/templates/{flowId}/export`

```ts
const { data } = await client.exportFlowTemplate({
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
  "assigned_to": [
    "string"
  ],
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
      "trigger_config": []
    }
  ],
  "phases": [
    {
      "id": "string",
      "name": "string",
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "assigned_to": [],
      "taxonomies": []
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
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
      "assigned_to": [],
      "ecp": {},
      "installer": {},
      "taxonomies": [],
      "phase_id": "string",
      "task_type": "MANUAL",
      "automation_config": {},
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true,
  "_resolved_automations": {}
}
```

</details>

---

### `importFlowTemplate`

Import a Flow Template from an export payload. Creates all automations and the flow in the caller's organization.

`POST /v2/flows/templates/import`

```ts
const { data } = await client.importFlowTemplate(
  null,
  {
    id: 'string',
    org_id: 'string',
    name: 'string',
    description: 'string',
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
    assigned_to: [
      'string'
    ],
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
        assigned_to: [ /* ... */ ],
        taxonomies: [ /* ... */ ]
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
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
        assigned_to: [ /* ... */ ],
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ],
        phase_id: 'string',
        task_type: 'MANUAL',
        automation_config: { /* ... */ },
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
    taxonomies: [
      'string'
    ],
    singleClosingReasonSelection: true,
    _resolved_automations: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "flow": {
    "id": "string",
    "org_id": "string",
    "name": "string",
    "description": "string",
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
    "assigned_to": [
      "string"
    ],
    "available_in_ecp": true,
    "additional_triggers": [
      {},
      {}
    ],
    "phases": [
      {}
    ],
    "tasks": [
      {},
      {}
    ],
    "edges": [
      {}
    ],
    "closing_reasons": [
      {}
    ],
    "entity_sync": [
      {}
    ],
    "taxonomies": [
      "string"
    ],
    "singleClosingReasonSelection": true
  },
  "_id_mappings": {
    "flow_id": {
      "old": "string",
      "new": "string"
    },
    "task_ids": {},
    "automation_ids": {}
  }
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
  "userIds": [
    0
  ],
  "assignedTo": [
    "string"
  ],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": [],
      "steps": [],
      "taxonomies": []
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
      "userIds": [],
      "requirements": [],
      "assignedTo": [],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "taxonomies": []
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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
    userIds: [
      0
    ],
    assignedTo: [
      'string'
    ],
    enableECPWorkflow: true,
    flow: [
      {
        id: 'string',
        name: 'string',
        order: 0,
        type: 'STEP',
        dueDate: '2021-04-27T12:00:00.000Z',
        dynamicDueDate: { /* ... */ },
        assignedTo: [ /* ... */ ],
        steps: [ /* ... */ ],
        taxonomies: [ /* ... */ ]
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
        userIds: [ /* ... */ ],
        requirements: [ /* ... */ ],
        assignedTo: [ /* ... */ ],
        type: 'STEP',
        ecp: { /* ... */ },
        installer: { /* ... */ },
        taxonomies: [ /* ... */ ]
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
    taxonomies: [
      'string'
    ],
    singleClosingReasonSelection: true
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
  "userIds": [
    0
  ],
  "assignedTo": [
    "string"
  ],
  "enableECPWorkflow": true,
  "flow": [
    {
      "id": "string",
      "name": "string",
      "order": 0,
      "type": "STEP",
      "dueDate": "2021-04-27T12:00:00.000Z",
      "dynamicDueDate": {},
      "assignedTo": [],
      "steps": [],
      "taxonomies": []
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
      "userIds": [],
      "requirements": [],
      "assignedTo": [],
      "type": "STEP",
      "ecp": {},
      "installer": {},
      "taxonomies": []
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
  "taxonomies": [
    "string"
  ],
  "singleClosingReasonSelection": true
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

<details>
<summary>Schemas</summary>

### `FlowTemplateBase`

```ts
type FlowTemplateBase = {
  id?: string
  org_id?: string
  name: string
  description?: string
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
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
  // ...
}
```

### `FlowTemplate`

```ts
type FlowTemplate = {
  id?: string
  org_id?: string
  name: string
  description?: string
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
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
  // ...
}
```

### `Version`

Version of the workflow schema.

- `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.  
- `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.  
- `v3` – Advanced workflows. Adds support for branching logic

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
  trigger?: {
    id?: string
    type: "manual"
    entity_schema?: string
  } | {
    id?: string
    type: "automation"
    automation_id?: string
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
  sort_by?: "created_at" | "updated_at"
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
    trigger?: {
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      automation_id?: { ... }
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
  // ...
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
  // ...
}
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
  // ...
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
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
} | {
  mode: "relative"
  direction: "before" | "after"
  duration: number
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
  reference: {
    id: string
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute"
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
  unit: "minutes" | "hours" | "days" | "weeks" | "months"
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
    origin: "flow_started" | "task_completed" | "trigger_entity_attribute"
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
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
    complete_task_automatically?: boolean
  }
  due_date?: string
  due_date_config?: {
    duration: number
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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
    value?: string
  }>
  // ...
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
    unit: "minutes" | "hours" | "days" | "weeks" | "months"
    type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
    task_id?: string
    phase_id?: string
  }
  assigned_to?: Array<string | {
    variable: string
    value?: string
  }>
  taxonomies?: string[]
}
```

### `VariableAssignment`

Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution.

```ts
type VariableAssignment = {
  variable: string
  value?: string
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
  to_id: string
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
      attribute_sub_field?: { ... }
    }
    operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
    values: string[]
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
  type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED"
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

### `WorkflowDefinition`

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
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
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
    complete_task_automatically?: boolean
  }
  order: number
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
    actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED"
    stepId?: string
    phaseId?: string
  }
  userIds?: number[]
  requirements?: Array<{
    definitionId: string
    type: "STEP" | "SECTION"
  // ...
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
    timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
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
      complete_task_automatically?: { ... }
  // ...
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
  complete_task_automatically?: boolean
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

### `MaxAllowedLimit`

```ts
type MaxAllowedLimit = {
  currentNoOfWorkflows?: number
  maxAllowed?: number
}
```

### `DefinitionNotFoundResp`

Definition could be not found

```ts
type DefinitionNotFoundResp = {
  message?: string
}
```

### `ClosingReasonNotFoundResp`

Closing reason could be not found

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
    title: string
    status: "ACTIVE" | "INACTIVE"
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
  title: string
  status: "ACTIVE" | "INACTIVE"
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

set a Duedate for a step then a specific

```ts
type DynamicDueDate = {
  numberOfUnits: number
  timePeriod: "minutes" | "hours" | "days" | "weeks" | "months"
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

### `FlowTemplateExport`

```ts
type FlowTemplateExport = {
  _resolved_automations?: Record<string, object>
}
```

### `FlowTemplateImportResult`

```ts
type FlowTemplateImportResult = {
  flow?: {
    id?: string
    org_id?: string
    name: string
    description?: string
    trigger?: {
      id?: { ... }
      type: { ... }
      entity_schema?: { ... }
    } | {
      id?: { ... }
      type: { ... }
      automation_id?: { ... }
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
  // ...
}
```

</details>