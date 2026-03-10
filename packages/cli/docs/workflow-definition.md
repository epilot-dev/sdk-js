# Workflows Definitions

- **Base URL:** `https://workflows-definition.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/workflow-definition](https://docs.epilot.io/api/workflow-definition)

Service for Workflow Definitions for different processes inside of an Organization

## Quick Start

```bash
# List available operations
epilot workflow-definition

# Call an operation
epilot workflow-definition getMaxAllowedLimit
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

**Workflows**
- [`getMaxAllowedLimit`](#getmaxallowedlimit) — Get limits and number of created executions for an Organization.
- [`getDefinitions`](#getdefinitions) — Retrieve all Workflow Definitions from an Organization
- [`createDefinition`](#createdefinition) — Create a Workflow Definition.
- [`getDefinition`](#getdefinition) — Get specific Definition by id from the Organization.
- [`updateDefinition`](#updatedefinition) — Update Workflow Definition.
- [`deleteDefinition`](#deletedefinition) — Delete Workflow Definition.
- [`getWorkflowClosingReasons`](#getworkflowclosingreasons) — Returns all closing reasons defined for the workflow.
- [`setWorkflowClosingReasons`](#setworkflowclosingreasons) — Sets which closing reasons are defined for this workflow, based on the entire closing reasons catalog.

**Flows V2**
- [`listFlowTemplates`](#listflowtemplates) — List all Flow Templates for a customer. Optionally, you can filter flow templates by trigger values.
- [`createFlowTemplate`](#createflowtemplate) — Create a new Flow Template.
- [`searchFlowTemplates`](#searchflowtemplates) — Search for flow templates by name, trigger type, enabled status, and more.
- [`getFlowTemplate`](#getflowtemplate) — Get specific FLow template for a customer
- [`updateFlowTemplate`](#updateflowtemplate) — Update Flow Template.
- [`deleteFlowTemplate`](#deleteflowtemplate) — Delete Flow Template.
- [`duplicateFlowTemplate`](#duplicateflowtemplate) — Duplicate a Flow Template from an existing workflow.
- [`exportFlowTemplate`](#exportflowtemplate) — Export a Flow Template with all referenced automations resolved and bundled alongside.
- [`importFlowTemplate`](#importflowtemplate) — Import a Flow Template from an export payload. Creates all automations and the flow in the caller's organization.

**Closing Reason**
- [`getAllClosingReasons`](#getallclosingreasons) — Get all Closing Reasons defined in the organization by default all Active.
- [`createClosingReason`](#createclosingreason) — A created Closing Reason is stored for the organization and will be displayed in the library of reasons.
- [`getClosingReason`](#getclosingreason) — Get specific closing reason by id from the organisation.
- [`updateClosingReason`](#updateclosingreason) — Update an existing closing reason
- [`deleteClosingReason`](#deleteclosingreason) — Permanently delete a closing reason (Using INACTIVE status is recommended instead)
- [`changeReasonStatus`](#changereasonstatus) — Change the status of a Closing Reason (eg. ACTIVE to INACTIVE).

### `getMaxAllowedLimit`

Get limits and number of created executions for an Organization.

`GET /v1/workflows/limits/max-allowed`

**Sample Call**

```bash
epilot workflow-definition getMaxAllowedLimit
```

With JSONata filter:

```bash
epilot workflow-definition getMaxAllowedLimit --jsonata 'currentNoOfWorkflows'
```

<details>
<summary>Sample Response</summary>

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

**Sample Call**

```bash
epilot workflow-definition getDefinitions
```

With JSONata filter:

```bash
epilot workflow-definition getDefinitions --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
    "singleClosingReasonSelection": true
  }
]
```

</details>

---

### `createDefinition`

Create a Workflow Definition.

`POST /v1/workflows/definitions`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition createDefinition
```

With request body:

```bash
epilot workflow-definition createDefinition \
  -d '{
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
  "singleClosingReasonSelection": true
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition createDefinition
```

With JSONata filter:

```bash
epilot workflow-definition createDefinition --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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
  "singleClosingReasonSelection": true
}
```

</details>

---

### `listFlowTemplates`

List all Flow Templates for a customer. Optionally, you can filter flow templates by trigger values.

`GET /v2/flows/templates`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `trigger_type` | query | "automation" \| "manual" \| "journey_submission" | No | Type of trigger for whom to filter flow templates |
| `trigger_source_id` | query | string | No | Id of the trigger source to filter flow templates. Interpretation depends on **trigger_type**:
- **automation**: use an `{automation_flow_id}` value
- **journey_submission**: use a `{journey_id}` valu |
| `trigger_schema` | query | string | No | Schema of the trigger source to filter flow templates. This parameter only makes sense when **trigger_type** is `manual`
 |

**Sample Call**

```bash
epilot workflow-definition listFlowTemplates
```

With JSONata filter:

```bash
epilot workflow-definition listFlowTemplates --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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
      "assigned_to": ["string"],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": ["string"],
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

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition createFlowTemplate
```

With request body:

```bash
epilot workflow-definition createFlowTemplate \
  -d '{
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition createFlowTemplate
```

With JSONata filter:

```bash
epilot workflow-definition createFlowTemplate --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}
```

</details>

---

### `searchFlowTemplates`

Search for flow templates by name, trigger type, enabled status, and more.

`POST /v2/flows/templates:search`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition searchFlowTemplates
```

With request body:

```bash
epilot workflow-definition searchFlowTemplates \
  -d '{
  "name": "string",
  "definition_id": "string",
  "trigger_type": "journey_submission",
  "enabled": true,
  "from": 0,
  "size": 0,
  "sort_by": "updated_at",
  "sort_order": "desc"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition searchFlowTemplates
```

With JSONata filter:

```bash
epilot workflow-definition searchFlowTemplates --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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
      "assigned_to": ["string"],
      "available_in_ecp": true,
      "additional_triggers": [],
      "phases": [],
      "tasks": [],
      "edges": [],
      "closing_reasons": [],
      "entity_sync": [],
      "taxonomies": ["string"],
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flowId` | path | string | Yes |  |

**Sample Call**

```bash
epilot workflow-definition getFlowTemplate \
  -p flowId=7hj28akg
```

Using positional args for path parameters:

```bash
epilot workflow-definition getFlowTemplate 7hj28akg
```

With JSONata filter:

```bash
epilot workflow-definition getFlowTemplate -p flowId=7hj28akg --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}
```

</details>

---

### `updateFlowTemplate`

Update Flow Template.

`PUT /v2/flows/templates/{flowId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flowId` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition updateFlowTemplate \
  -p flowId=7hj28akg
```

With request body:

```bash
epilot workflow-definition updateFlowTemplate \
  -p flowId=7hj28akg \
  -d '{
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}'
```

Using positional args for path parameters:

```bash
epilot workflow-definition updateFlowTemplate 7hj28akg
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition updateFlowTemplate -p flowId=7hj28akg
```

With JSONata filter:

```bash
epilot workflow-definition updateFlowTemplate -p flowId=7hj28akg --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}
```

</details>

---

### `deleteFlowTemplate`

Delete Flow Template.

`DELETE /v2/flows/templates/{flowId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flowId` | path | string | Yes | Id of the flow template to de deleted. |

**Sample Call**

```bash
epilot workflow-definition deleteFlowTemplate \
  -p flowId=7hj28akg
```

Using positional args for path parameters:

```bash
epilot workflow-definition deleteFlowTemplate 7hj28akg
```

With JSONata filter:

```bash
epilot workflow-definition deleteFlowTemplate -p flowId=7hj28akg --jsonata '$'
```

---

### `duplicateFlowTemplate`

Duplicate a Flow Template from an existing workflow.

`POST /v2/flows/templates/{flowId}/duplicate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flowId` | path | string | Yes |  |

**Sample Call**

```bash
epilot workflow-definition duplicateFlowTemplate \
  -p flowId=7hj28akg
```

Using positional args for path parameters:

```bash
epilot workflow-definition duplicateFlowTemplate 7hj28akg
```

With JSONata filter:

```bash
epilot workflow-definition duplicateFlowTemplate -p flowId=7hj28akg --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true
}
```

</details>

---

### `exportFlowTemplate`

Export a Flow Template with all referenced automations resolved and bundled alongside.

`GET /v2/flows/templates/{flowId}/export`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `flowId` | path | string | Yes |  |

**Sample Call**

```bash
epilot workflow-definition exportFlowTemplate \
  -p flowId=7hj28akg
```

Using positional args for path parameters:

```bash
epilot workflow-definition exportFlowTemplate 7hj28akg
```

With JSONata filter:

```bash
epilot workflow-definition exportFlowTemplate -p flowId=7hj28akg --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_resolved_automations": {}
}
```

</details>

---

### `importFlowTemplate`

Import a Flow Template from an export payload. Creates all automations and the flow in the caller's organization.

`POST /v2/flows/templates/import`

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition importFlowTemplate
```

With request body:

```bash
epilot workflow-definition importFlowTemplate \
  -d '{
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
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": {},
      "journey": {},
      "due_date": "2021-04-27T12:00:00.000Z",
      "due_date_config": {},
      "requirements": [],
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
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
      "assigned_to": ["string"],
      "ecp": {},
      "installer": {},
      "taxonomies": ["string"],
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
  "taxonomies": ["string"],
  "singleClosingReasonSelection": true,
  "_resolved_automations": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition importFlowTemplate
```

With JSONata filter:

```bash
epilot workflow-definition importFlowTemplate --jsonata 'flow'
```

<details>
<summary>Sample Response</summary>

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
    "assigned_to": ["string"],
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
    "taxonomies": ["string"],
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `definitionId` | path | string | Yes | Short uuid (length 8) to identify the Workflow Definition. |

**Sample Call**

```bash
epilot workflow-definition getDefinition \
  -p definitionId=7hj28a
```

Using positional args for path parameters:

```bash
epilot workflow-definition getDefinition 7hj28a
```

With JSONata filter:

```bash
epilot workflow-definition getDefinition -p definitionId=7hj28a --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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
  "singleClosingReasonSelection": true
}
```

</details>

---

### `updateDefinition`

Update Workflow Definition.

`PUT /v1/workflows/definitions/{definitionId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `definitionId` | path | string | Yes | Short uuid (length 8) to identify the Workflow Definition. |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition updateDefinition \
  -p definitionId=7hj28a
```

With request body:

```bash
epilot workflow-definition updateDefinition \
  -p definitionId=7hj28a \
  -d '{
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
  "singleClosingReasonSelection": true
}'
```

Using positional args for path parameters:

```bash
epilot workflow-definition updateDefinition 7hj28a
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition updateDefinition -p definitionId=7hj28a
```

With JSONata filter:

```bash
epilot workflow-definition updateDefinition -p definitionId=7hj28a --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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
  "singleClosingReasonSelection": true
}
```

</details>

---

### `deleteDefinition`

Delete Workflow Definition.

`DELETE /v1/workflows/definitions/{definitionId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `definitionId` | path | string | Yes | Id of the definition to de deleted. |

**Sample Call**

```bash
epilot workflow-definition deleteDefinition \
  -p definitionId=CustomerRequest
```

Using positional args for path parameters:

```bash
epilot workflow-definition deleteDefinition CustomerRequest
```

With JSONata filter:

```bash
epilot workflow-definition deleteDefinition -p definitionId=CustomerRequest --jsonata '$'
```

---

### `getAllClosingReasons`

Get all Closing Reasons defined in the organization by default all Active.

`GET /v1/workflows/closing-reasons`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `includeInactive` | query | boolean | No | Filter Closing Reasons by status like active inactiv |

**Sample Call**

```bash
epilot workflow-definition getAllClosingReasons
```

With JSONata filter:

```bash
epilot workflow-definition getAllClosingReasons --jsonata 'reasons'
```

<details>
<summary>Sample Response</summary>

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

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition createClosingReason \
  -d '{"id":"string","title":"string","status":"ACTIVE","lastUpdateTime":"string","creationTime":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition createClosingReason
```

With JSONata filter:

```bash
epilot workflow-definition createClosingReason --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `reasonId` | path | string | Yes | unique id to identify the closing reason. |

**Sample Call**

```bash
epilot workflow-definition getClosingReason \
  -p reasonId=x739cew
```

Using positional args for path parameters:

```bash
epilot workflow-definition getClosingReason x739cew
```

With JSONata filter:

```bash
epilot workflow-definition getClosingReason -p reasonId=x739cew --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `reasonId` | path | string | Yes | unique id to identify the closing reason. |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition updateClosingReason \
  -p reasonId=x739cew \
  -d '{"id":"string","title":"string","status":"ACTIVE","lastUpdateTime":"string","creationTime":"string"}'
```

Using positional args for path parameters:

```bash
epilot workflow-definition updateClosingReason x739cew
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition updateClosingReason -p reasonId=x739cew
```

With JSONata filter:

```bash
epilot workflow-definition updateClosingReason -p reasonId=x739cew --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `reasonId` | path | string | Yes | unique id to identify the closing reason. |

**Sample Call**

```bash
epilot workflow-definition deleteClosingReason \
  -p reasonId=x739cew
```

Using positional args for path parameters:

```bash
epilot workflow-definition deleteClosingReason x739cew
```

With JSONata filter:

```bash
epilot workflow-definition deleteClosingReason -p reasonId=x739cew --jsonata '$'
```

---

### `changeReasonStatus`

Change the status of a Closing Reason (eg. ACTIVE to INACTIVE).

`PATCH /v1/workflows/closing-reasons/{reasonId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `reasonId` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot workflow-definition changeReasonStatus \
  -p reasonId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"status":"ACTIVE"}'
```

Using positional args for path parameters:

```bash
epilot workflow-definition changeReasonStatus 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition changeReasonStatus -p reasonId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot workflow-definition changeReasonStatus -p reasonId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getWorkflowClosingReasons`

Returns all closing reasons defined for the workflow.

`GET /v1/workflows/definitions/{definitionId}/closing-reasons`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `definitionId` | path | string | Yes | ID of a workflow definition |

**Sample Call**

```bash
epilot workflow-definition getWorkflowClosingReasons \
  -p definitionId=fxcwfw
```

Using positional args for path parameters:

```bash
epilot workflow-definition getWorkflowClosingReasons fxcwfw
```

With JSONata filter:

```bash
epilot workflow-definition getWorkflowClosingReasons -p definitionId=fxcwfw --jsonata 'reasons'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `definitionId` | path | string | Yes | ID of a workflow definition |

**Request Body** (required)

**Sample Call**

```bash
epilot workflow-definition setWorkflowClosingReasons \
  -p definitionId=7889 \
  -d '{"reasons":[{"id":"x739cew"}]}'
```

Using positional args for path parameters:

```bash
epilot workflow-definition setWorkflowClosingReasons 7889
```

Using stdin pipe:

```bash
cat body.json | epilot workflow-definition setWorkflowClosingReasons -p definitionId=7889
```

With JSONata filter:

```bash
epilot workflow-definition setWorkflowClosingReasons -p definitionId=7889 --jsonata '$'
```

---
