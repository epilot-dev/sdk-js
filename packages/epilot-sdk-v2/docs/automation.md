# Automation API

- **Base URL:** `https://automation.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/automation](https://docs.epilot.io/api/automation)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.automation.searchFlows(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/automation'

const automationClient = getClient()
authorize(automationClient, () => '<token>')
const { data } = await automationClient.searchFlows(...)
```

## Operations

**flows**
- [`searchFlows`](#searchflows)
- [`createFlow`](#createflow)
- [`batchGetFlows`](#batchgetflows)
- [`getFlow`](#getflow)
- [`putFlow`](#putflow)
- [`deleteFlow`](#deleteflow)

**executions**
- [`getExecutions`](#getexecutions)
- [`startExecution`](#startexecution)
- [`getExecution`](#getexecution)
- [`cancelExecution`](#cancelexecution)
- [`retriggerAction`](#retriggeraction)
- [`resumeExecutionWithToken`](#resumeexecutionwithtoken)
- [`cancelSchedule`](#cancelschedule)

**bulk**
- [`bulkTriggerExecutions`](#bulktriggerexecutions)
- [`getBulkJob`](#getbulkjob)
- [`patchBulkJob`](#patchbulkjob)

**Schemas**
- [`AutomationFlowId`](#automationflowid)
- [`AutomationActionId`](#automationactionid)
- [`AutomationFlow`](#automationflow)
- [`WorkflowContextRole`](#workflowcontextrole)
- [`SearchAutomationsResp`](#searchautomationsresp)
- [`AnyTrigger`](#anytrigger)
- [`AnyAction`](#anyaction)
- [`AnyActionConfig`](#anyactionconfig)
- [`AutomationActionConfig`](#automationactionconfig)
- [`AutomationActionExecutionState`](#automationactionexecutionstate)
- [`RetryStrategy`](#retrystrategy)
- [`AutomationAction`](#automationaction)
- [`ErrorOutput`](#erroroutput)
- [`ErrorCode`](#errorcode)
- [`ErrorDetail`](#errordetail)
- [`CartCheckoutActionConfig`](#cartcheckoutactionconfig)
- [`CartCheckoutAction`](#cartcheckoutaction)
- [`CartCheckoutConfig`](#cartcheckoutconfig)
- [`MapEntityActionConfig`](#mapentityactionconfig)
- [`MapEntityAction`](#mapentityaction)
- [`MapEntityConfig`](#mapentityconfig)
- [`MappingConfigRef`](#mappingconfigref)
- [`RelationAttribute`](#relationattribute)
- [`MappingAttributeV2`](#mappingattributev2)
- [`OperationNode`](#operationnode)
- [`OperationObjectNode`](#operationobjectnode)
- [`PrimitiveJSONValue`](#primitivejsonvalue)
- [`MappingAttribute`](#mappingattribute)
- [`MappingAttributeMode`](#mappingattributemode)
- [`SetValueMapper`](#setvaluemapper)
- [`CopyValueMapper`](#copyvaluemapper)
- [`AppendValueMapper`](#appendvaluemapper)
- [`MoveThreadAction`](#movethreadaction)
- [`AssignThreadAction`](#assignthreadaction)
- [`MoveThreadConfig`](#movethreadconfig)
- [`AssignThreadConfig`](#assignthreadconfig)
- [`SendEmailActionConfig`](#sendemailactionconfig)
- [`SendEmailAction`](#sendemailaction)
- [`ForwardEmailActionConfig`](#forwardemailactionconfig)
- [`ForwardEmailAction`](#forwardemailaction)
- [`ForwardEmailConfig`](#forwardemailconfig)
- [`ReplyEmailActionConfig`](#replyemailactionconfig)
- [`ReplyEmailAction`](#replyemailaction)
- [`ReplyEmailConfig`](#replyemailconfig)
- [`SendEmailConfig`](#sendemailconfig)
- [`SendEmailCondition`](#sendemailcondition)
- [`CreateDocumentActionConfig`](#createdocumentactionconfig)
- [`CreateDocumentAction`](#createdocumentaction)
- [`CreateDocumentConfig`](#createdocumentconfig)
- [`TriggerWorkflowActionConfig`](#triggerworkflowactionconfig)
- [`TriggerWorkflowAction`](#triggerworkflowaction)
- [`TriggerWorkflowConfig`](#triggerworkflowconfig)
- [`TriggerWorkflowCondition`](#triggerworkflowcondition)
- [`TriggerShareEntityActionConfig`](#triggershareentityactionconfig)
- [`TriggerShareEntityAction`](#triggershareentityaction)
- [`TriggerShareEntityConfig`](#triggershareentityconfig)
- [`AssignUsersToStep`](#assignuserstostep)
- [`CustomAction`](#customaction)
- [`TriggerWebhookActionConfig`](#triggerwebhookactionconfig)
- [`TriggerWebhookAction`](#triggerwebhookaction)
- [`TriggerWebhookConfig`](#triggerwebhookconfig)
- [`InformERPActionConfig`](#informerpactionconfig)
- [`InformERPAction`](#informerpaction)
- [`InformERPConfig`](#informerpconfig)
- [`TriggerEventActionConfig`](#triggereventactionconfig)
- [`TriggerEventAction`](#triggereventaction)
- [`TriggerEventConfig`](#triggereventconfig)
- [`FlowExecutionCancelActionConfig`](#flowexecutioncancelactionconfig)
- [`FlowExecutionCancelAction`](#flowexecutioncancelaction)
- [`FlowExecutionCancelConfig`](#flowexecutioncancelconfig)
- [`CancellationReason`](#cancellationreason)
- [`ConditionStatement`](#conditionstatement)
- [`ActionCondition`](#actioncondition)
- [`ActionScheduleSource`](#actionschedulesource)
- [`ActionSchedule`](#actionschedule)
- [`AutomationExecutionId`](#automationexecutionid)
- [`AutomationExecution`](#automationexecution)
- [`WorkflowExecutionContext`](#workflowexecutioncontext)
- [`ExecutionChain`](#executionchain)
- [`TriggerEventManual`](#triggereventmanual)
- [`TriggerEventFlowAutomationTask`](#triggereventflowautomationtask)
- [`TriggerEventEntityActivity`](#triggerevententityactivity)
- [`TriggerEventMessaging`](#triggereventmessaging)
- [`TriggerEventEntityOperation`](#triggerevententityoperation)
- [`ApiCallerContext`](#apicallercontext)
- [`ExecutionStatus`](#executionstatus)
- [`GetExecutionsResp`](#getexecutionsresp)
- [`StartExecutionRequest`](#startexecutionrequest)
- [`PatchBulkJobRequest`](#patchbulkjobrequest)
- [`BulkTriggerRequest`](#bulktriggerrequest)
- [`EntityRef`](#entityref)
- [`BulkTriggerJob`](#bulktriggerjob)
- [`ExecItem`](#execitem)
- [`JobId`](#jobid)
- [`EntityId`](#entityid)
- [`ActivityId`](#activityid)
- [`OrganizationId`](#organizationid)
- [`TriggerContext`](#triggercontext)
- [`AutomationTrigger`](#automationtrigger)
- [`FlowsTrigger`](#flowstrigger)
- [`JourneySubmitTrigger`](#journeysubmittrigger)
- [`FrontendSubmitTrigger`](#frontendsubmittrigger)
- [`ApiSubmissionTrigger`](#apisubmissiontrigger)
- [`NewEmailThreadTrigger`](#newemailthreadtrigger)
- [`ReceivedEmailTrigger`](#receivedemailtrigger)
- [`EntityOperationTrigger`](#entityoperationtrigger)
- [`ActivityTrigger`](#activitytrigger)
- [`EntityOperation`](#entityoperation)
- [`EntitySearchFilter`](#entitysearchfilter)
- [`EntitySearchFilterValue`](#entitysearchfiltervalue)
- [`EntityManualTrigger`](#entitymanualtrigger)
- [`TriggerCondition`](#triggercondition)
- [`Comparison`](#comparison)
- [`FilterConditionOnEvent`](#filterconditiononevent)
- [`EqualsIgnoreCaseCondition`](#equalsignorecasecondition)
- [`AnythingButCondition`](#anythingbutcondition)
- [`NumericCondition`](#numericcondition)
- [`ExistsCondition`](#existscondition)
- [`PrefixCondition`](#prefixcondition)
- [`SuffixCondition`](#suffixcondition)
- [`WildcardCondition`](#wildcardcondition)
- [`OrCondition`](#orcondition)
- [`DiffAdded`](#diffadded)
- [`DiffUpdated`](#diffupdated)
- [`DiffDeleted`](#diffdeleted)
- [`OrConditionForDiff`](#orconditionfordiff)
- [`EntityItemSnapshot`](#entityitemsnapshot)
- [`RetryReq`](#retryreq)
- [`ResumeToken`](#resumetoken)
- [`ResumeReq`](#resumereq)
- [`ResumeResp`](#resumeresp)
- [`ErrorObject`](#errorobject)

### `searchFlows`

Search available automation flows

`GET /v1/automation/flows`

```ts
const { data } = await client.searchFlows({
  schema: 'example',
  size: 1,
  from: 1,
  trigger_source_id: 'example',
  include_flows: true,
})
```

---

### `createFlow`

Create new automation flow

`POST /v1/automation/flows`

```ts
const { data } = await client.createFlow()
```

---

### `batchGetFlows`

Get multiple automation flows by their IDs

`POST /v1/automation/flows:batchGet`

```ts
const { data } = await client.batchGetFlows(
  null,
  {
    ids: ['7791b04a-16d2-44a2-9af9-2d59c25c512f']
  },
)
```

---

### `getFlow`

List available automation flows

`GET /v1/automation/flows/{flow_id}`

```ts
const { data } = await client.getFlow({
  flow_id: 'example',
})
```

---

### `putFlow`

Update automation flow by id

`PUT /v1/automation/flows/{flow_id}`

```ts
const { data } = await client.putFlow({
  flow_id: 'example',
})
```

---

### `deleteFlow`

Update automation flow by id

`DELETE /v1/automation/flows/{flow_id}`

```ts
const { data } = await client.deleteFlow({
  flow_id: 'example',
})
```

---

### `getExecutions`

List automation executions

`GET /v1/automation/executions`

```ts
const { data } = await client.getExecutions({
  entity_id: 'example',
  size: 1,
  from: 1,
  include_flows: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.startExecution(
  null,
  {
    entity_id: 'e3d3ebac-baab-4395-abf4-50b5bf1f8b74',
    flow_id: '7791b04a-16d2-44a2-9af9-2d59c25c512f',
    workflow_context: {
      workflow_exec_id: 'string',
      workflow_exec_task_id: 'string',
      workflow_role: 'trigger_workflow',
      _execution_chain: {
        parent_execution_id: 'string',
        parent_task_id: 'string',
        depth: 0
      }
    },
    flow_execution_id: 'string',
    flow_automation_task_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.bulkTriggerExecutions(
  null,
  {
    flow_id: '7791b04a-16d2-44a2-9af9-2d59c25c512f',
    entities_refs: [
      {
        entity_id: 'e3d3ebac-baab-4395-abf4-50b5bf1f8b74',
        entity_schema: 'string'
      }
    ],
    trigger_context: {
      entity_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
    }
  },
)
```

---

### `getBulkJob`

Get the status of a bulk job that triggers multiple automation executions

`GET /v1/automation/executions/bulk-jobs/{job_id}`

```ts
const { data } = await client.getBulkJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchBulkJob(
  {
    job_id: 'example',
  },
  {
    action: 'APPROVE',
    task_token: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.cancelExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.retriggerAction(
  {
    execution_id: 'example',
    action_id: 'example',
  },
  {
    condition_id: 'string',
    retry_strategy: 'RETRY_AND_RESUME'
  },
)
```

---

### `resumeExecutionWithToken`

Resume a paused automation execution using a unique resume token.

`POST /v1/automation/public/executions:resume`

```ts
const { data } = await client.resumeExecutionWithToken(
  null,
  {
    resume_token: 'eyJraWQiOiJrZXkifQ=='
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.cancelSchedule({
  execution_id: 'example',
  schedule_id: 'example',
})
```

<details>
<summary>Response</summary>

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

## Schemas

### `AutomationFlowId`

ID of the Automation Flow

```ts
type AutomationFlowId = string
```

### `AutomationActionId`

```ts
type AutomationActionId = string
```

### `AutomationFlow`

```ts
type AutomationFlow = {
  id?: string
  flow_name: string
  enabled?: boolean
  disable_details?: {
    disabled_at: string // date-time
    disabled_by: "system" | "user"
    blame?: string
  }
  triggers: Array<{
    id?: string // uuid
    type: "frontend_submission"
    configuration: {
      source_id?: { ... }
    }
  } | {
    id?: string // uuid
    type: "journey_submission"
    configuration: {
      source_id: { ... }
    }
  } | {
    id?: string // uuid
    type: "api_submission"
    configuration: {
      source_id?: { ... }
    }
  } | {
    id?: string // uuid
    type: "entity_operation"
    configuration: {
      schema?: { ... }
      operations?: { ... }
      include_activities?: { ... }
      exclude_activities?: { ... }
      filter_config?: { ... }
      ecp_config?: { ... }
    }
  } | {
    id?: string // uuid
    type: "activity"
    configuration: {
      schema?: { ... }
      types?: { ... }
    }
  } | {
    id?: string // uuid
    type: "entity_manual"
    configuration: {
      schema?: { ... }
    }
  } | {
    id?: string // uuid
    type: "received_email"
    configuration: {
      message_type?: { ... }
    }
  } | {
    id?: string // uuid
    type: "new_email_thread"
    configuration: {
      shared_inbox_ids?: { ... }
      direction: { ... }
    }
  } | {
    id?: string // uuid
    type: "flows_trigger"
    configuration?: {
      journey_id?: { ... }
    }
  }>
  trigger_conditions?: Array<{
    source: string
    comparison: "equals" | "any_of" | "not_empty" | "is_empty"
    value?: string | number | string[] | number[]
  }>
  entity_schema?: string
  conditions?: Array<{
    id?: string
    schedule_id?: string
    evaluationResult?: boolean
    statements?: Array<{
      id?: { ... }
      source?: { ... }
      operation?: { ... }
      values?: { ... }
    }>
  }>
  schedules?: Array<{
    id: string
    scheduleApiId?: string
    numberOfUnits?: number
    timePeriod?: "minutes" | "hours" | "days" | "weeks" | "months"
    timeRelation?: "after" | "before"
    source: {
      id: { ... }
      origin: { ... }
      schema?: { ... }
      attribute?: { ... }
    }
  // ...
}
```

### `WorkflowContextRole`

The role this automation plays in the workflow.

```ts
type WorkflowContextRole = "trigger_workflow" | "run_task_automation"
```

### `SearchAutomationsResp`

```ts
type SearchAutomationsResp = {
  total: number
  results: Array<{
    id?: string
    flow_name: string
    enabled?: boolean
    disable_details?: {
      disabled_at: { ... }
      disabled_by: { ... }
      blame?: { ... }
    }
    triggers: Array<{
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration: { ... }
    } | {
      id?: { ... }
      type: { ... }
      configuration?: { ... }
    }>
    trigger_conditions?: Array<{
      source: { ... }
      comparison: { ... }
      value?: { ... }
    }>
    entity_schema?: string
    conditions?: Array<{
      id?: { ... }
      schedule_id?: { ... }
      evaluationResult?: { ... }
      statements?: { ... }
    }>
    schedules?: Array<{
      id: { ... }
      scheduleApiId?: { ... }
      numberOfUnits?: { ... }
      timePeriod?: { ... }
      timeRelation?: { ... }
      source: { ... }
    }>
    actions: Array<{
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      id?: { ... }
  // ...
}
```

### `AnyTrigger`

```ts
type AnyTrigger = {
  id?: string // uuid
  type: "frontend_submission"
  configuration: {
    source_id?: string
  }
} | {
  id?: string // uuid
  type: "journey_submission"
  configuration: {
    source_id: string // uuid
  }
} | {
  id?: string // uuid
  type: "api_submission"
  configuration: {
    source_id?: string
  }
} | {
  id?: string // uuid
  type: "entity_operation"
  configuration: {
    schema?: string
    operations?: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity"[]
    include_activities?: string[]
    exclude_activities?: string[]
    filter_config?: {
      operation?: { ... }
      activity?: { ... }
    }
    ecp_config?: {
      origin?: { ... }
      portal_id?: { ... }
      file_config?: { ... }
    }
  }
} | {
  id?: string // uuid
  type: "activity"
  configuration: {
    schema?: string
    types?: "CreateMeterReading" | "UpdateMeterReading" | "DocDownloadedFromPortal" | "PortalUserResetPassword" | "PortalUserResetForgotPassword" | "SelfAssignmentFromPortal" | string[]
  }
} | {
  id?: string // uuid
  type: "entity_manual"
  configuration: {
    schema?: string
  }
} | {
  id?: string // uuid
  type: "received_email"
  configuration: {
    message_type?: "RECEIVED"
  }
} | {
  id?: string // uuid
  type: "new_email_thread"
  configuration: {
    shared_inbox_ids?: string[]
    direction: "INBOUND" | "OUTBOUND" | "BOTH"
  }
} | {
  id?: string // uuid
  type: "flows_trigger"
  configuration?: {
    journey_id?: string // uuid
  }
}
```

### `AnyAction`

```ts
type AnyAction = {
  type?: "map-entity"
  config?: {
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    target_schema: string
    target_unique?: string[]
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
  }
} | {
  type?: "trigger-workflow"
  config?: {
    target_workflow?: string
    conditions?: Array<{
      source: { ... }
      comparison: { ... }
      value?: { ... }
      schema?: { ... }
    }>
    assignees?: string[]
    assign_steps?: Array<{
      step_id?: { ... }
      step_name?: { ... }
      user_ids?: { ... }
    }>
    filter_with_purposes?: boolean
  }
} | {
  type?: "trigger-share-entity"
  config?: {
    partner_org_ids?: string[]
  }
} | {
  type?: "trigger-webhook"
  config?: {
    event_id?: string
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
} | {
  type?: "inform-erp"
  config?: {
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
} | {
  type?: "trigger-event"
  config?: {
    event_name: string
    event_inputs?: Record<string, unknown>
  }
} | {
  type?: "create-document"
  config?: {
    template_id?: string
    filename?: string
  }
} | {
  type?: "send-email"
  config?: {
    email_template_id?: string
    language_code?: "de" | "en"
    notify_portal_user_only?: boolean
    skip_creating_entities?: boolean
    wait_for_confirmation?: boolean
    reply_to_sender?: boolean
    reply_mode?: "reply_in_thread" | "new_email"
    mark_as_done?: boolean
  // ...
}
```

### `AnyActionConfig`

```ts
type AnyActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "map-entity"
  config?: {
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    target_schema: string
    target_unique?: string[]
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
} | {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-workflow"
  config?: {
    target_workflow?: string
    conditions?: Array<{
      source: { ... }
      comparison: { ... }
      value?: { ... }
      schema?: { ... }
    }>
    assignees?: string[]
    assign_steps?: Array<{
      step_id?: { ... }
      step_name?: { ... }
      user_ids?: { ... }
    }>
    filter_with_purposes?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
} | {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-workflow"
  config?: {
    partner_org_ids?: string[]
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
} | {
  id?: string
  // ...
}
```

### `AutomationActionConfig`

```ts
type AutomationActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: string
  config?: Record<string, unknown>
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `AutomationActionExecutionState`

```ts
type AutomationActionExecutionState = {
  execution_status?: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
  started_at?: string
  updated_at?: string
  outputs?: Record<string, unknown>
  error_output?: {
    error_code: "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR" | "TRIGGER_WEBHOOK_ERROR" | "TEMPLATE_ERROR" | "INVALID_PAYLOAD" | "INVALID_SCHEDULE_CONFIG" | "CUSTOM_ACTION_ERROR" | "ORDER_CREATION_ERROR" | "DOCUMENT_GENERATION_ERROR" | "BULK_EMAIL_ERROR" | "SHARING_ERROR" | "CANCEL_FLOW_EXECUTION_ERROR" | "METER_READING_NOT_FOUND" | "ENTITY_NOT_FOUND"
    error_reason: string
    error_info?: {
      details?: { ... }
    }
  }
  retry_strategy?: "RETRY_AND_RESUME" | "RETRY_AND_STOP" | "RETRY_ALL_PARENT_CONDITION_ACTIONS"
}
```

### `RetryStrategy`

different behaviors for retrying failed execution actions.

```ts
type RetryStrategy = "RETRY_AND_RESUME" | "RETRY_AND_STOP" | "RETRY_ALL_PARENT_CONDITION_ACTIONS"
```

### `AutomationAction`

```ts
type AutomationAction = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: string
  config?: Record<string, unknown>
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
  execution_status?: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
  started_at?: string
  updated_at?: string
  outputs?: Record<string, unknown>
  error_output?: {
    error_code: "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR" | "TRIGGER_WEBHOOK_ERROR" | "TEMPLATE_ERROR" | "INVALID_PAYLOAD" | "INVALID_SCHEDULE_CONFIG" | "CUSTOM_ACTION_ERROR" | "ORDER_CREATION_ERROR" | "DOCUMENT_GENERATION_ERROR" | "BULK_EMAIL_ERROR" | "SHARING_ERROR" | "CANCEL_FLOW_EXECUTION_ERROR" | "METER_READING_NOT_FOUND" | "ENTITY_NOT_FOUND"
    error_reason: string
    error_info?: {
      details?: { ... }
    }
  }
  retry_strategy?: "RETRY_AND_RESUME" | "RETRY_AND_STOP" | "RETRY_ALL_PARENT_CONDITION_ACTIONS"
}
```

### `ErrorOutput`

```ts
type ErrorOutput = {
  error_code: "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR" | "TRIGGER_WEBHOOK_ERROR" | "TEMPLATE_ERROR" | "INVALID_PAYLOAD" | "INVALID_SCHEDULE_CONFIG" | "CUSTOM_ACTION_ERROR" | "ORDER_CREATION_ERROR" | "DOCUMENT_GENERATION_ERROR" | "BULK_EMAIL_ERROR" | "SHARING_ERROR" | "CANCEL_FLOW_EXECUTION_ERROR" | "METER_READING_NOT_FOUND" | "ENTITY_NOT_FOUND"
  error_reason: string
  error_info?: {
    details?: Array<{
      explanation: { ... }
      context?: { ... }
      id?: { ... }
    }>
  }
}
```

### `ErrorCode`

```ts
type ErrorCode = "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR" | "TRIGGER_WEBHOOK_ERROR" | "TEMPLATE_ERROR" | "INVALID_PAYLOAD" | "INVALID_SCHEDULE_CONFIG" | "CUSTOM_ACTION_ERROR" | "ORDER_CREATION_ERROR" | "DOCUMENT_GENERATION_ERROR" | "BULK_EMAIL_ERROR" | "SHARING_ERROR" | "CANCEL_FLOW_EXECUTION_ERROR" | "METER_READING_NOT_FOUND" | "ENTITY_NOT_FOUND"
```

### `ErrorDetail`

```ts
type ErrorDetail = {
  explanation: string
  context?: string
  id?: string
}
```

### `CartCheckoutActionConfig`

```ts
type CartCheckoutActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "cart-checkout"
  config?: {
    version?: string
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    target_unique?: string[]
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `CartCheckoutAction`

```ts
type CartCheckoutAction = {
  type?: "cart-checkout"
  config?: {
    version?: string
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
    target_unique?: string[]
  }
}
```

### `CartCheckoutConfig`

```ts
type CartCheckoutConfig = {
  version?: string
  mapping_config?: {
    config_id: string
    target_id: string
    version?: number
  }
  relation_attributes?: Array<{
    target: string
    target_tags?: string[]
    target_tags_include_source?: boolean
    source_filter?: {
      limit?: { ... }
      schema?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      tag?: { ... }
      self?: { ... }
    }
    related_to?: Record<string, unknown>
    mode: "append" | "prepend" | "set"
  }>
  mapping_attributes?: Array<{
    target?: string
    operation: {
      _set?: { ... }
      _append?: { ... }
      _uniq?: { ... }
      _copy?: { ... }
    } | unknown
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    value: unknown
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    source: string
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    source?: string
    value_json: string
    target_unique?: string[]
  }>
  linkback_relation_attribute?: string
  linkback_relation_tags?: string[]
  target_unique?: string[]
}
```

### `MapEntityActionConfig`

```ts
type MapEntityActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "map-entity"
  config?: {
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    target_schema: string
    target_unique?: string[]
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `MapEntityAction`

```ts
type MapEntityAction = {
  type?: "map-entity"
  config?: {
    mapping_config?: {
      config_id: { ... }
      target_id: { ... }
      version?: { ... }
    }
    target_schema: string
    target_unique?: string[]
    mapping_attributes?: Array<{
      target?: { ... }
      operation: { ... }
    } | {
      mode: { ... }
      target: { ... }
      value: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source: { ... }
    } | {
      mode: { ... }
      target: { ... }
      source?: { ... }
      value_json: { ... }
      target_unique?: { ... }
    }>
    relation_attributes?: Array<{
      target: { ... }
      target_tags?: { ... }
      target_tags_include_source?: { ... }
      source_filter?: { ... }
      related_to?: { ... }
      mode: { ... }
    }>
    linkback_relation_attribute?: string
    linkback_relation_tags?: string[]
  }
}
```

### `MapEntityConfig`

```ts
type MapEntityConfig = {
  mapping_config?: {
    config_id: string
    target_id: string
    version?: number
  }
  target_schema: string
  target_unique?: string[]
  mapping_attributes?: Array<{
    target?: string
    operation: {
      _set?: { ... }
      _append?: { ... }
      _uniq?: { ... }
      _copy?: { ... }
    } | unknown
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    value: unknown
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    source: string
  } | {
    mode: "copy_if_exists" | "append_if_exists" | "set_value"
    target: string
    source?: string
    value_json: string
    target_unique?: string[]
  }>
  relation_attributes?: Array<{
    target: string
    target_tags?: string[]
    target_tags_include_source?: boolean
    source_filter?: {
      limit?: { ... }
      schema?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      tag?: { ... }
      self?: { ... }
    }
    related_to?: Record<string, unknown>
    mode: "append" | "prepend" | "set"
  }>
  linkback_relation_attribute?: string
  linkback_relation_tags?: string[]
}
```

### `MappingConfigRef`

```ts
type MappingConfigRef = {
  config_id: string
  target_id: string
  version?: number
}
```

### `RelationAttribute`

```ts
type RelationAttribute = {
  target: string
  target_tags?: string[]
  target_tags_include_source?: boolean
  source_filter?: {
    limit?: number
    schema?: string
    attribute?: string
    relation_tag?: string
    tag?: string
    self?: boolean
  }
  related_to?: Record<string, unknown>
  mode: "append" | "prepend" | "set"
}
```

### `MappingAttributeV2`

```ts
type MappingAttributeV2 = {
  target?: string
  operation: {
    _set?: unknown
    _append?: unknown
    _uniq?: boolean | string[]
    _copy?: string
  } | unknown
}
```

### `OperationNode`

Mapping operation nodes are either primitive values or operation node objects

```ts
type OperationNode = {
  _set?: unknown
  _append?: unknown
  _uniq?: boolean | string[]
  _copy?: string
} | unknown
```

### `OperationObjectNode`

```ts
type OperationObjectNode = {
  _set?: unknown
  _append?: unknown
  _uniq?: boolean | string[]
  _copy?: string
}
```

### `PrimitiveJSONValue`

```ts
type PrimitiveJSONValue = unknown
```

### `MappingAttribute`

```ts
type MappingAttribute = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  value: unknown
} | {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source: string
} | {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source?: string
  value_json: string
  target_unique?: string[]
}
```

### `MappingAttributeMode`

- copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used togethe

```ts
type MappingAttributeMode = "copy_if_exists" | "append_if_exists" | "set_value"
```

### `SetValueMapper`

```ts
type SetValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  value: unknown
}
```

### `CopyValueMapper`

```ts
type CopyValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source: string
}
```

### `AppendValueMapper`

```ts
type AppendValueMapper = {
  mode: "copy_if_exists" | "append_if_exists" | "set_value"
  target: string
  source?: string
  value_json: string
  target_unique?: string[]
}
```

### `MoveThreadAction`

```ts
type MoveThreadAction = {
  type?: "move-thread"
  config?: {
    target_inbox_id?: string
  }
}
```

### `AssignThreadAction`

```ts
type AssignThreadAction = {
  type?: "assign-thread"
  config?: {
    remove?: string[]
    add?: string[]
  }
}
```

### `MoveThreadConfig`

```ts
type MoveThreadConfig = {
  target_inbox_id?: string
}
```

### `AssignThreadConfig`

```ts
type AssignThreadConfig = {
  remove?: string[]
  add?: string[]
}
```

### `SendEmailActionConfig`

```ts
type SendEmailActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "send-email"
  config?: {
    email_template_id?: string
    language_code?: "de" | "en"
    notify_portal_user_only?: boolean
    skip_creating_entities?: boolean
    wait_for_confirmation?: boolean
    reply_to_sender?: boolean
    reply_mode?: "reply_in_thread" | "new_email"
    mark_as_done?: boolean
    attachments?: Array<{
      source_filter?: { ... }
    }>
    conditions?: Array<{
      _equals?: { ... }
    }>
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `SendEmailAction`

```ts
type SendEmailAction = {
  type?: "send-email"
  config?: {
    email_template_id?: string
    language_code?: "de" | "en"
    notify_portal_user_only?: boolean
    skip_creating_entities?: boolean
    wait_for_confirmation?: boolean
    reply_to_sender?: boolean
    reply_mode?: "reply_in_thread" | "new_email"
    mark_as_done?: boolean
    attachments?: Array<{
      source_filter?: { ... }
    }>
    conditions?: Array<{
      _equals?: { ... }
    }>
  }
}
```

### `ForwardEmailActionConfig`

```ts
type ForwardEmailActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "forward-email"
  config?: {
    forward_to: Array<{
      email: { ... }
      name?: { ... }
    }>
    include_attachments?: boolean
    subject_prefix?: string
    mark_as_done?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `ForwardEmailAction`

```ts
type ForwardEmailAction = {
  type?: "forward-email"
  config?: {
    forward_to: Array<{
      email: { ... }
      name?: { ... }
    }>
    include_attachments?: boolean
    subject_prefix?: string
    mark_as_done?: boolean
  }
}
```

### `ForwardEmailConfig`

```ts
type ForwardEmailConfig = {
  forward_to: Array<{
    email: string // email
    name?: string
  }>
  include_attachments?: boolean
  subject_prefix?: string
  mark_as_done?: boolean
}
```

### `ReplyEmailActionConfig`

```ts
type ReplyEmailActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "reply-email"
  config?: {
    email_template_id?: string
    language_code?: "de" | "en"
    reply_mode?: "reply_in_thread" | "new_email"
    mark_as_done?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `ReplyEmailAction`

```ts
type ReplyEmailAction = {
  type?: "reply-email"
  config?: {
    email_template_id?: string
    language_code?: "de" | "en"
    reply_mode?: "reply_in_thread" | "new_email"
    mark_as_done?: boolean
  }
}
```

### `ReplyEmailConfig`

```ts
type ReplyEmailConfig = {
  email_template_id?: string
  language_code?: "de" | "en"
  reply_mode?: "reply_in_thread" | "new_email"
  mark_as_done?: boolean
}
```

### `SendEmailConfig`

```ts
type SendEmailConfig = {
  email_template_id?: string
  language_code?: "de" | "en"
  notify_portal_user_only?: boolean
  skip_creating_entities?: boolean
  wait_for_confirmation?: boolean
  reply_to_sender?: boolean
  reply_mode?: "reply_in_thread" | "new_email"
  mark_as_done?: boolean
  attachments?: Array<{
    source_filter?: {
      limit?: { ... }
      filename_regex?: { ... }
      attribute?: { ... }
      relation_tag?: { ... }
      tag?: { ... }
      document_type?: { ... }
      self?: { ... }
    }
  }>
  conditions?: Array<{
    _equals?: {
      source?: { ... }
      value?: { ... }
    }
  }>
}
```

### `SendEmailCondition`

```ts
type SendEmailCondition = {
  _equals?: {
    source?: string
    value?: string
  }
}
```

### `CreateDocumentActionConfig`

```ts
type CreateDocumentActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "create-document"
  config?: {
    template_id?: string
    filename?: string
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `CreateDocumentAction`

```ts
type CreateDocumentAction = {
  type?: "create-document"
  config?: {
    template_id?: string
    filename?: string
  }
}
```

### `CreateDocumentConfig`

```ts
type CreateDocumentConfig = {
  template_id?: string
  filename?: string
}
```

### `TriggerWorkflowActionConfig`

```ts
type TriggerWorkflowActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-workflow"
  config?: {
    target_workflow?: string
    conditions?: Array<{
      source: { ... }
      comparison: { ... }
      value?: { ... }
      schema?: { ... }
    }>
    assignees?: string[]
    assign_steps?: Array<{
      step_id?: { ... }
      step_name?: { ... }
      user_ids?: { ... }
    }>
    filter_with_purposes?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `TriggerWorkflowAction`

```ts
type TriggerWorkflowAction = {
  type?: "trigger-workflow"
  config?: {
    target_workflow?: string
    conditions?: Array<{
      source: { ... }
      comparison: { ... }
      value?: { ... }
      schema?: { ... }
    }>
    assignees?: string[]
    assign_steps?: Array<{
      step_id?: { ... }
      step_name?: { ... }
      user_ids?: { ... }
    }>
    filter_with_purposes?: boolean
  }
}
```

### `TriggerWorkflowConfig`

```ts
type TriggerWorkflowConfig = {
  target_workflow?: string
  conditions?: Array<{
    source: string
    comparison: "equals" | "any_of" | "not_empty" | "is_empty"
    value?: string | number | string[] | number[]
    schema?: string
  }>
  assignees?: string[]
  assign_steps?: Array<{
    step_id?: string
    step_name?: string
    user_ids?: number[]
  }>
  filter_with_purposes?: boolean
}
```

### `TriggerWorkflowCondition`

```ts
type TriggerWorkflowCondition = {
  source: string
  comparison: "equals" | "any_of" | "not_empty" | "is_empty"
  value?: string | number | string[] | number[]
  schema?: string
}
```

### `TriggerShareEntityActionConfig`

```ts
type TriggerShareEntityActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-workflow"
  config?: {
    partner_org_ids?: string[]
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `TriggerShareEntityAction`

```ts
type TriggerShareEntityAction = {
  type?: "trigger-share-entity"
  config?: {
    partner_org_ids?: string[]
  }
}
```

### `TriggerShareEntityConfig`

```ts
type TriggerShareEntityConfig = {
  partner_org_ids?: string[]
}
```

### `AssignUsersToStep`

```ts
type AssignUsersToStep = {
  step_id?: string
  step_name?: string
  user_ids?: number[]
}
```

### `CustomAction`

```ts
type CustomAction = {
  type?: "custom-action"
  config?: {
    name?: string
    description?: string
    app_id?: string
    component_id?: string
    wait_for_callback?: boolean
  }
}
```

### `TriggerWebhookActionConfig`

```ts
type TriggerWebhookActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-webhook"
  config?: {
    event_id?: string
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `TriggerWebhookAction`

```ts
type TriggerWebhookAction = {
  type?: "trigger-webhook"
  config?: {
    event_id?: string
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
}
```

### `TriggerWebhookConfig`

```ts
type TriggerWebhookConfig = {
  event_id?: string
  entity_sources?: string[]
  target_webhook_id?: string
  sync?: boolean
}
```

### `InformERPActionConfig`

```ts
type InformERPActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "inform-erp"
  config?: {
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `InformERPAction`

```ts
type InformERPAction = {
  type?: "inform-erp"
  config?: {
    entity_sources?: string[]
    target_webhook_id?: string
    sync?: boolean
  }
}
```

### `InformERPConfig`

```ts
type InformERPConfig = {
  entity_sources?: string[]
  target_webhook_id?: string
  sync?: boolean
}
```

### `TriggerEventActionConfig`

```ts
type TriggerEventActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "trigger-event"
  config?: {
    event_name: string
    event_inputs?: Record<string, unknown>
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `TriggerEventAction`

```ts
type TriggerEventAction = {
  type?: "trigger-event"
  config?: {
    event_name: string
    event_inputs?: Record<string, unknown>
  }
}
```

### `TriggerEventConfig`

Configuration for triggering an event catalog event

```ts
type TriggerEventConfig = {
  event_name: string
  event_inputs?: Record<string, unknown>
}
```

### `FlowExecutionCancelActionConfig`

```ts
type FlowExecutionCancelActionConfig = {
  id?: string
  flow_action_id?: string
  name?: string
  type?: "cancel-flow-execution"
  config?: {
    selected_reasons?: Array<{
      id: { ... }
      title: { ... }
    }>
    extra_description?: string
  }
  allow_failure?: boolean
  created_automatically?: boolean
  is_bulk_action?: boolean
  reason?: {
    message?: string
    payload?: Record<string, unknown>
  }
  condition_id?: string
  schedule_id?: string
}
```

### `FlowExecutionCancelAction`

```ts
type FlowExecutionCancelAction = {
  type?: "cancel-flow-execution"
  config?: {
    selected_reasons?: Array<{
      id: { ... }
      title: { ... }
    }>
    extra_description?: string
  }
}
```

### `FlowExecutionCancelConfig`

Configuration for cancelling a flow execution with selected reasons

```ts
type FlowExecutionCancelConfig = {
  selected_reasons?: Array<{
    id: string
    title: string
  }>
  extra_description?: string
}
```

### `CancellationReason`

A reason for cancelling a flow execution

```ts
type CancellationReason = {
  id: string
  title: string
}
```

### `ConditionStatement`

```ts
type ConditionStatement = {
  id?: string // uuid
  source?: {
    id?: string
    origin?: "trigger" | "action"
    originType?: "entity" | "workflow" | "journey_block"
    schema?: string
    attribute?: string
    attributeType?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "payment" | "relation_payment_method"
    attributeRepeatable?: boolean
    repeatableItemOp?: boolean
    attributeOperation?: "all" | "updated" | "added" | "deleted"
  }
  operation?: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty" | "entity_exists" | "entity_does_not_exist"
  values?: string[]
}
```

### `ActionCondition`

```ts
type ActionCondition = {
  id?: string
  schedule_id?: string
  evaluationResult?: boolean
  statements?: Array<{
    id?: string // uuid
    source?: {
      id?: { ... }
      origin?: { ... }
      originType?: { ... }
      schema?: { ... }
      attribute?: { ... }
      attributeType?: { ... }
      attributeRepeatable?: { ... }
      repeatableItemOp?: { ... }
      attributeOperation?: { ... }
    }
    operation?: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty" | "entity_exists" | "entity_does_not_exist"
    values?: string[]
  }>
}
```

### `ActionScheduleSource`

The source of the schedule_at timestamp that will be used to schedule the action

```ts
type ActionScheduleSource = {
  id: string
  origin: "trigger" | "action" | "action_task" | "automation"
  schema?: string
  attribute?: string
}
```

### `ActionSchedule`

```ts
type ActionSchedule = {
  id: string
  scheduleApiId?: string
  numberOfUnits?: number
  timePeriod?: "minutes" | "hours" | "days" | "weeks" | "months"
  timeRelation?: "after" | "before"
  source: {
    id: string
    origin: "trigger" | "action" | "action_task" | "automation"
    schema?: string
    attribute?: string
  }
}
```

### `AutomationExecutionId`

```ts
type AutomationExecutionId = string
```

### `AutomationExecution`

```ts
type AutomationExecution = {
  id: string
  execution_status?: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
  entity_id: string
  activity_id?: string
  entity_snapshot?: {
    _id: string
    _title: string
    _org: string
    _schema: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
  }
  org_id: string
  flow_id: string
  flow_name?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  current_action_id?: string
  conditions?: Array<{
    id?: string
    schedule_id?: string
    evaluationResult?: boolean
    statements?: Array<{
      id?: { ... }
      source?: { ... }
      operation?: { ... }
      values?: { ... }
    }>
  }>
  schedules?: Array<{
    id: string
    scheduleApiId?: string
    numberOfUnits?: number
    timePeriod?: "minutes" | "hours" | "days" | "weeks" | "months"
    timeRelation?: "after" | "before"
    source: {
      id: { ... }
      origin: { ... }
      schema?: { ... }
      attribute?: { ... }
    }
  }>
  actions: Array<{
    type?: "map-entity"
    config?: {
      mapping_config?: { ... }
      target_schema: { ... }
      target_unique?: { ... }
      mapping_attributes?: { ... }
      relation_attributes?: { ... }
      linkback_relation_attribute?: { ... }
      linkback_relation_tags?: { ... }
    }
  } | {
    type?: "trigger-workflow"
    config?: {
      target_workflow?: { ... }
      conditions?: { ... }
      assignees?: { ... }
      assign_steps?: { ... }
      filter_with_purposes?: { ... }
    }
  } | {
    type?: "trigger-share-entity"
    config?: {
      partner_org_ids?: { ... }
    }
  } | {
    type?: "trigger-webhook"
    config?: {
      event_id?: { ... }
      entity_sources?: { ... }
      target_webhook_id?: { ... }
      sync?: { ... }
    }
  } | {
    type?: "inform-erp"
    config?: {
      entity_sources?: { ... }
      target_webhook_id?: { ... }
      sync?: { ... }
    }
  } | {
    type?: "trigger-event"
    config?: {
      event_name: { ... }
      event_inputs?: { ... }
    }
  } | {
    type?: "create-document"
    config?: {
      template_id?: { ... }
      filename?: { ... }
    }
  } | {
    type?: "send-email"
    config?: {
      email_template_id?: { ... }
  // ...
}
```

### `WorkflowExecutionContext`

```ts
type WorkflowExecutionContext = {
  workflow_exec_id: string
  workflow_exec_task_id?: string
  workflow_role: "trigger_workflow" | "run_task_automation"
  _execution_chain?: {
    parent_execution_id?: string
    parent_task_id?: string
    depth?: number
  }
}
```

### `ExecutionChain`

[Internal] Tracks execution chain for infinite loop prevention. This is an internal property and should not be used by external consumers.

```ts
type ExecutionChain = {
  parent_execution_id?: string
  parent_task_id?: string
  depth?: number
}
```

### `TriggerEventManual`

```ts
type TriggerEventManual = {
  type?: "manual"
  org_id: string
  entity_id: string
  caller?: {
    EpilotAuth?: {
      claims?: { ... }
      userId?: { ... }
      organizationId?: { ... }
      token?: { ... }
    }
  }
}
```

### `TriggerEventFlowAutomationTask`

```ts
type TriggerEventFlowAutomationTask = {
  type?: "flow_automation_task"
  org_id: string
  entity_id: string
  flow_execution_id: string
  flow_automation_task_id: string // UUID
  caller?: {
    EpilotAuth?: {
      claims?: { ... }
      userId?: { ... }
      organizationId?: { ... }
      token?: { ... }
    }
  }
}
```

### `TriggerEventEntityActivity`

```ts
type TriggerEventEntityActivity = {
  type?: "entity_activity"
  org_id: string
  activity_id: string
  activity_type: string
  entity_id?: string
}
```

### `TriggerEventMessaging`

```ts
type TriggerEventMessaging = {
  type?: "new_email_thread"
  org_id: string
  thread_id: string
  message_id: string
  entity_id: string
}
```

### `TriggerEventEntityOperation`

```ts
type TriggerEventEntityOperation = {
  type?: "entity_operation"
  entity_id: string
  org_id: string
  activity_id: string
  operation_type: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity"
}
```

### `ApiCallerContext`

```ts
type ApiCallerContext = {
  EpilotAuth?: {
    claims?: {
      userId?: { ... }
      sub?: { ... }
      email?: { ... }
      cognito:username?: { ... }
      custom:ivy_user_id?: { ... }
    }
    userId?: string
    organizationId?: string
    token?: string
  }
}
```

### `ExecutionStatus`

```ts
type ExecutionStatus = "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
```

### `GetExecutionsResp`

```ts
type GetExecutionsResp = {
  total: number
  results: Array<{
    id: string
    execution_status?: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
    entity_id: string
    activity_id?: string
    entity_snapshot?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
    }
    org_id: string
    flow_id: string
    flow_name?: string
    created_at?: string // date-time
    updated_at?: string // date-time
    current_action_id?: string
    conditions?: Array<{
      id?: { ... }
      schedule_id?: { ... }
      evaluationResult?: { ... }
      statements?: { ... }
    }>
    schedules?: Array<{
      id: { ... }
      scheduleApiId?: { ... }
      numberOfUnits?: { ... }
      timePeriod?: { ... }
      timeRelation?: { ... }
      source: { ... }
    }>
    actions: Array<{
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      id?: { ... }
      flow_action_id?: { ... }
      name?: { ... }
      type?: { ... }
      config?: { ... }
      allow_failure?: { ... }
      created_automatically?: { ... }
      is_bulk_action?: { ... }
      reason?: { ... }
      condition_id?: { ... }
      schedule_id?: { ... }
      execution_status?: { ... }
      started_at?: { ... }
      updated_at?: { ... }
      outputs?: { ... }
      error_output?: { ... }
      retry_strategy?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    }>
    resume_token?: string
    trigger_context?: Record<string, string>
    version?: number
    trigger_event?: {
      type?: { ... }
      org_id: { ... }
  // ...
}
```

### `StartExecutionRequest`

```ts
type StartExecutionRequest = {
  entity_id: string
  flow_id: string
  workflow_context?: {
    workflow_exec_id: string
    workflow_exec_task_id?: string
    workflow_role: "trigger_workflow" | "run_task_automation"
    _execution_chain?: {
      parent_execution_id?: { ... }
      parent_task_id?: { ... }
      depth?: { ... }
    }
  }
  flow_execution_id?: string
  flow_automation_task_id?: string
}
```

### `PatchBulkJobRequest`

```ts
type PatchBulkJobRequest = {
  action: "APPROVE" | "CANCEL"
  task_token: string
}
```

### `BulkTriggerRequest`

```ts
type BulkTriggerRequest = {
  flow_id: string
  entities_refs: Array<{
    entity_id: string
    entity_schema: string
  }>
  trigger_context?: Record<string, string>
} | {
  flow_id: string
  entities_query: string
  trigger_context?: Record<string, string>
} | {
  flow_id: string
  entities_filter: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $not?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
  }>
  trigger_context?: Record<string, string>
}
```

### `EntityRef`

```ts
type EntityRef = {
  entity_id: string
  entity_schema: string
}
```

### `BulkTriggerJob`

```ts
type BulkTriggerJob = {
  job_id: string
  org_id: string
  flow_id: string
  status: "approval" | "querying_entities" | "entities_loaded" | "executing" | "monitoring" | "send_report" | "finished" | "failed" | "cancelled"
  created_by: string
  created_at: string // date-time
  updated_at: string // date-time
  approved_at?: string // date-time
  trigger_context?: Record<string, string>
  task_token?: string
  report_file_entity_id?: string
  entity_query?: {
    type: "refs" | "query" | "filter"
    data: Array<{
      entity_id: { ... }
      entity_schema: { ... }
    }> | string | Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
  }
  pagination_state?: {
    page_size?: number
    pages_processed?: number
    total_processed?: number
    stable_query_id?: string
    search_after?: string | number[]
    has_more?: boolean
  }
  execution_summary?: Array<{
    entity_id: string
    entity_schema?: string
    execution_id?: string
    execution_status: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
    timestamp?: string // date-time
    error?: string
  }>
}
```

### `ExecItem`

Execution item for bulk trigger automation. It maps each entity to its automation execution id & status

```ts
type ExecItem = {
  entity_id: string
  entity_schema?: string
  execution_id?: string
  execution_status: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
  timestamp?: string // date-time
  error?: string
}
```

### `JobId`

Job ID for tracking the status of bulk trigger automation executions

```ts
type JobId = string
```

### `EntityId`

```ts
type EntityId = string
```

### `ActivityId`

```ts
type ActivityId = string
```

### `OrganizationId`

```ts
type OrganizationId = string
```

### `TriggerContext`

Additional contextual data for a bulk trigger automation. This would normally include additional entity IDs you'd need after a listener picks up an event.

```ts
type TriggerContext = Record<string, string>
```

### `AutomationTrigger`

```ts
type AutomationTrigger = {
  id?: string // uuid
}
```

### `FlowsTrigger`

```ts
type FlowsTrigger = {
  id?: string // uuid
  type: "flows_trigger"
  configuration?: {
    journey_id?: string // uuid
  }
}
```

### `JourneySubmitTrigger`

```ts
type JourneySubmitTrigger = {
  id?: string // uuid
  type: "journey_submission"
  configuration: {
    source_id: string // uuid
  }
}
```

### `FrontendSubmitTrigger`

```ts
type FrontendSubmitTrigger = {
  id?: string // uuid
  type: "frontend_submission"
  configuration: {
    source_id?: string
  }
}
```

### `ApiSubmissionTrigger`

```ts
type ApiSubmissionTrigger = {
  id?: string // uuid
  type: "api_submission"
  configuration: {
    source_id?: string
  }
}
```

### `NewEmailThreadTrigger`

```ts
type NewEmailThreadTrigger = {
  id?: string // uuid
  type: "new_email_thread"
  configuration: {
    shared_inbox_ids?: string[]
    direction: "INBOUND" | "OUTBOUND" | "BOTH"
  }
}
```

### `ReceivedEmailTrigger`

```ts
type ReceivedEmailTrigger = {
  id?: string // uuid
  type: "received_email"
  configuration: {
    message_type?: "RECEIVED"
  }
}
```

### `EntityOperationTrigger`

- If provides filter_config, executes an automation based on the filtered configuration when an entity event occurs.
- The conditions on a filter follows the event bridge patterns - `https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html`
  | Comparison             | Example

```ts
type EntityOperationTrigger = {
  id?: string // uuid
  type: "entity_operation"
  configuration: {
    schema?: string
    operations?: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity"[]
    include_activities?: string[]
    exclude_activities?: string[]
    filter_config?: {
      operation?: { ... }
      activity?: { ... }
    }
    ecp_config?: {
      origin?: { ... }
      portal_id?: { ... }
      file_config?: { ... }
    }
  }
}
```

### `ActivityTrigger`

```ts
type ActivityTrigger = {
  id?: string // uuid
  type: "activity"
  configuration: {
    schema?: string
    types?: "CreateMeterReading" | "UpdateMeterReading" | "DocDownloadedFromPortal" | "PortalUserResetPassword" | "PortalUserResetForgotPassword" | "SelfAssignmentFromPortal" | string[]
  }
}
```

### `EntityOperation`

```ts
type EntityOperation = "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity"
```

### `EntitySearchFilter`

A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.

```ts
type EntitySearchFilter = Array<{
  term?: Record<string, string | number | boolean>
  terms?: Record<string, string | number | boolean[]>
  ids?: {
    values?: string[]
  }
  range?: Record<string, {
    gt?: string | number | boolean
    gte?: string | number | boolean
    lt?: string | number | boolean
    lte?: string | number | boolean
    format?: string
    relation?: "INTERSECTS" | "CONTAINS" | "WITHIN"
    time_zone?: string
  }>
  exists?: {
    field: string
  }
  $and?: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $not?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
  }>
  $or?: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
  // ...
}
```

### `EntitySearchFilterValue`

A filter field value.

```ts
type EntitySearchFilterValue = string | number | boolean
```

### `EntityManualTrigger`

```ts
type EntityManualTrigger = {
  id?: string // uuid
  type: "entity_manual"
  configuration: {
    schema?: string
  }
}
```

### `TriggerCondition`

```ts
type TriggerCondition = {
  source: string
  comparison: "equals" | "any_of" | "not_empty" | "is_empty"
  value?: string | number | string[] | number[]
}
```

### `Comparison`

```ts
type Comparison = "equals" | "any_of" | "not_empty" | "is_empty"
```

### `FilterConditionOnEvent`

```ts
type FilterConditionOnEvent = {
  $or?: Array<{
    $or?: Array<{
      $or?: { ... }
    } | Record<string, Array<string | {
      equals-ignore-case?: { ... }
    } | {
      anything-but?: { ... }
    } | {
      numeric?: { ... }
    } | {
      exists?: { ... }
    } | {
      prefix?: { ... }
    } | {
      suffix?: { ... }
    } | {
      wildcard?: { ... }
    }>>>
  } | Record<string, Array<string | {
    equals-ignore-case?: string
  } | {
    anything-but?: string[]
  } | {
    numeric?: string | number[]
  } | {
    exists?: boolean
  } | {
    prefix?: string
  } | {
    suffix?: string
  } | {
    wildcard?: string
  }>>>
} | Record<string, Array<string | {
  equals-ignore-case?: string
} | {
  anything-but?: string[]
} | {
  numeric?: string | number[]
} | {
  exists?: boolean
} | {
  prefix?: string
} | {
  suffix?: string
} | {
  wildcard?: string
}>>
```

### `EqualsIgnoreCaseCondition`

```ts
type EqualsIgnoreCaseCondition = {
  equals-ignore-case?: string
}
```

### `AnythingButCondition`

```ts
type AnythingButCondition = {
  anything-but?: string[]
}
```

### `NumericCondition`

```ts
type NumericCondition = {
  numeric?: string | number[]
}
```

### `ExistsCondition`

```ts
type ExistsCondition = {
  exists?: boolean
}
```

### `PrefixCondition`

```ts
type PrefixCondition = {
  prefix?: string
}
```

### `SuffixCondition`

```ts
type SuffixCondition = {
  suffix?: string
}
```

### `WildcardCondition`

```ts
type WildcardCondition = {
  wildcard?: string
}
```

### `OrCondition`

```ts
type OrCondition = {
  $or?: Array<{
    $or?: Array<{
      $or?: { ... }
    } | Record<string, Array<string | {
      equals-ignore-case?: { ... }
    } | {
      anything-but?: { ... }
    } | {
      numeric?: { ... }
    } | {
      exists?: { ... }
    } | {
      prefix?: { ... }
    } | {
      suffix?: { ... }
    } | {
      wildcard?: { ... }
    }>>>
  } | Record<string, Array<string | {
    equals-ignore-case?: string
  } | {
    anything-but?: string[]
  } | {
    numeric?: string | number[]
  } | {
    exists?: boolean
  } | {
    prefix?: string
  } | {
    suffix?: string
  } | {
    wildcard?: string
  }>>>
}
```

### `DiffAdded`

```ts
type DiffAdded = {
  $or?: Array<{
    $or?: Array<{
      $or?: { ... }
    } | Record<string, Array<string | {
      equals-ignore-case?: { ... }
    } | {
      anything-but?: { ... }
    } | {
      numeric?: { ... }
    } | {
      exists?: { ... }
    } | {
      prefix?: { ... }
    } | {
      suffix?: { ... }
    } | {
      wildcard?: { ... }
    }>>>
  } | Record<string, Array<string | {
    equals-ignore-case?: string
  } | {
    anything-but?: string[]
  } | {
    numeric?: string | number[]
  } | {
    exists?: boolean
  } | {
    prefix?: string
  } | {
    suffix?: string
  } | {
    wildcard?: string
  }>>>
} | Record<string, Array<string | {
  equals-ignore-case?: string
} | {
  anything-but?: string[]
} | {
  numeric?: string | number[]
} | {
  exists?: boolean
} | {
  prefix?: string
} | {
  suffix?: string
} | {
  wildcard?: string
}>>
```

### `DiffUpdated`

```ts
type DiffUpdated = {
  $or?: Array<{
    $or?: Array<{
      $or?: { ... }
    } | Record<string, Array<string | {
      equals-ignore-case?: { ... }
    } | {
      anything-but?: { ... }
    } | {
      numeric?: { ... }
    } | {
      exists?: { ... }
    } | {
      prefix?: { ... }
    } | {
      suffix?: { ... }
    } | {
      wildcard?: { ... }
    }>>>
  } | Record<string, Array<string | {
    equals-ignore-case?: string
  } | {
    anything-but?: string[]
  } | {
    numeric?: string | number[]
  } | {
    exists?: boolean
  } | {
    prefix?: string
  } | {
    suffix?: string
  } | {
    wildcard?: string
  }>>>
} | Record<string, Array<string | {
  equals-ignore-case?: string
} | {
  anything-but?: string[]
} | {
  numeric?: string | number[]
} | {
  exists?: boolean
} | {
  prefix?: string
} | {
  suffix?: string
} | {
  wildcard?: string
}>>
```

### `DiffDeleted`

```ts
type DiffDeleted = {
  $or?: Array<{
    $or?: Array<{
      $or?: { ... }
    } | Record<string, Array<string | {
      equals-ignore-case?: { ... }
    } | {
      anything-but?: { ... }
    } | {
      numeric?: { ... }
    } | {
      exists?: { ... }
    } | {
      prefix?: { ... }
    } | {
      suffix?: { ... }
    } | {
      wildcard?: { ... }
    }>>>
  } | Record<string, Array<string | {
    equals-ignore-case?: string
  } | {
    anything-but?: string[]
  } | {
    numeric?: string | number[]
  } | {
    exists?: boolean
  } | {
    prefix?: string
  } | {
    suffix?: string
  } | {
    wildcard?: string
  }>>>
} | Record<string, Array<string | {
  equals-ignore-case?: string
} | {
  anything-but?: string[]
} | {
  numeric?: string | number[]
} | {
  exists?: boolean
} | {
  prefix?: string
} | {
  suffix?: string
} | {
  wildcard?: string
}>>
```

### `OrConditionForDiff`

```ts
type OrConditionForDiff = {
  $or?: unknown | unknown | unknown[]
}
```

### `EntityItemSnapshot`

```ts
type EntityItemSnapshot = {
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `RetryReq`

```ts
type RetryReq = {
  condition_id?: string
  retry_strategy?: "RETRY_AND_RESUME" | "RETRY_AND_STOP" | "RETRY_ALL_PARENT_CONDITION_ACTIONS"
}
```

### `ResumeToken`

A unique token to resume a paused automation execution

```ts
type ResumeToken = string
```

### `ResumeReq`

```ts
type ResumeReq = {
  resume_token: string
}
```

### `ResumeResp`

```ts
type ResumeResp = {
  execution: {
    id: string
    execution_status?: "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot"
    entity_id: string
    activity_id?: string
    entity_snapshot?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
    }
    org_id: string
    flow_id: string
    flow_name?: string
    created_at?: string // date-time
    updated_at?: string // date-time
    current_action_id?: string
    conditions?: Array<{
      id?: { ... }
      schedule_id?: { ... }
      evaluationResult?: { ... }
      statements?: { ... }
    }>
    schedules?: Array<{
      id: { ... }
      scheduleApiId?: { ... }
      numberOfUnits?: { ... }
      timePeriod?: { ... }
      timeRelation?: { ... }
      source: { ... }
    }>
    actions: Array<{
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      id?: { ... }
      flow_action_id?: { ... }
      name?: { ... }
      type?: { ... }
      config?: { ... }
      allow_failure?: { ... }
      created_automatically?: { ... }
      is_bulk_action?: { ... }
      reason?: { ... }
      condition_id?: { ... }
      schedule_id?: { ... }
      execution_status?: { ... }
      started_at?: { ... }
      updated_at?: { ... }
      outputs?: { ... }
      error_output?: { ... }
      retry_strategy?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    } | {
      type?: { ... }
      config?: { ... }
    }>
    resume_token?: string
    trigger_context?: Record<string, string>
    version?: number
    trigger_event?: {
      type?: { ... }
      org_id: { ... }
      entity_id: { ... }
  // ...
}
```

### `ErrorObject`

```ts
type ErrorObject = {
  status?: number
  error?: string
}
```
