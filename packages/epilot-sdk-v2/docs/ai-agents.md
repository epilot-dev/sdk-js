# AI Agents API

- **Base URL:** `https://ai-agents.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/ai-agents](https://docs.epilot.io/api/ai-agents)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.aiAgents.createAgent(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/ai-agents'

const aiAgentsClient = getClient()
authorize(aiAgentsClient, () => '<token>')
const { data } = await aiAgentsClient.createAgent(...)
```

## Operations

**Agents Configuration**
- [`createAgent`](#createagent)
- [`listAgents`](#listagents)
- [`getAgentById`](#getagentbyid)
- [`updateAgentById`](#updateagentbyid)
- [`deleteAgentById`](#deleteagentbyid)

**Agent Execution**
- [`executeAgent`](#executeagent)
- [`executeAgentStream`](#executeagentstream)
- [`listExecutions`](#listexecutions)
- [`getExecution`](#getexecution)
- [`cancelExecution`](#cancelexecution)
- [`getExecutionTrace`](#getexecutiontrace)
- [`approveExecution`](#approveexecution)
- [`rejectExecution`](#rejectexecution)
- [`streamExecution`](#streamexecution)

**Chat**
- [`chat`](#chat)

**Conversations**
- [`listConversations`](#listconversations)
- [`getConversation`](#getconversation)
- [`deleteConversation`](#deleteconversation)
- [`submitConversationFeedback`](#submitconversationfeedback)

**Schemas**
- [`AgentId`](#agentid)
- [`CreateAgentRequest`](#createagentrequest)
- [`UpdateAgentRequest`](#updateagentrequest)
- [`AgentDefinition`](#agentdefinition)
- [`ListAgentsResponse`](#listagentsresponse)
- [`ListExecutionsResponse`](#listexecutionsresponse)
- [`ApproveExecutionRequest`](#approveexecutionrequest)
- [`RejectExecutionRequest`](#rejectexecutionrequest)
- [`ExecuteAgentRequest`](#executeagentrequest)
- [`ExecutionResponse`](#executionresponse)
- [`ExecutionIterationProjection`](#executioniterationprojection)
- [`ExecutionTrace`](#executiontrace)
- [`ExecutionIteration`](#executioniteration)
- [`PendingAction`](#pendingaction)
- [`ExecutionError`](#executionerror)
- [`ExecutionMetrics`](#executionmetrics)
- [`ToolPreview`](#toolpreview)
- [`PreviewActionType`](#previewactiontype)
- [`PreviewEntity`](#previewentity)
- [`PreviewChange`](#previewchange)
- [`PreviewValue`](#previewvalue)
- [`ToolDefinition`](#tooldefinition)
- [`SkillCategory`](#skillcategory)
- [`AgentSource`](#agentsource)
- [`SkillAvailability`](#skillavailability)
- [`ExecutionContext`](#executioncontext)
- [`ExecutionPattern`](#executionpattern)
- [`ExecutionMode`](#executionmode)
- [`ExecutionStatus`](#executionstatus)
- [`ParameterType`](#parametertype)
- [`InputParameterDefinition`](#inputparameterdefinition)
- [`InputParametersSchema`](#inputparametersschema)
- [`ModelConfig`](#modelconfig)
- [`Error`](#error)
- [`ChatRequest`](#chatrequest)
- [`ChatMessage`](#chatmessage)
- [`StreamingOptions`](#streamingoptions)
- [`StreamEvent`](#streamevent)
- [`ExecutionResult`](#executionresult)
- [`ConversationItem`](#conversationitem)
- [`MessageItem`](#messageitem)
- [`MessageFeedback`](#messagefeedback)
- [`SubmitFeedbackRequest`](#submitfeedbackrequest)
- [`ListConversationsResponse`](#listconversationsresponse)
- [`ConversationWithMessages`](#conversationwithmessages)

### `createAgent`

Create Agent definition

`POST /v1/agents`

```ts
const { data } = await client.createAgent(
  null,
  {
    name: 'Email Reply Generator',
    description: 'string',
    category: 'message',
    icon: 'mail-reply',
    system_prompt: 'string',
    tools: ['entity.search', 'message.draft'],
    model_config: {
      model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      temperature: 0.7,
      max_tokens: 4096,
      thinking: false,
      thinking_budget: 10000
    },
    max_iterations: 10,
    execution_pattern: 'direct',
    execution_mode: 'automatic',
    output_schema: {},
    input_parameters_schema: {
      type: 'object',
      parameters: [
        {
          name: 'target_schema',
          label: 'Target Schema',
          type: 'entity-schema',
          description: 'Entity type to create'
        },
        {
          name: 'confidence_threshold',
          label: 'Confidence Threshold',
          type: 'number',
          minimum: 0,
          maximum: 1,
          default: 0.8
        },
        /* ... 1 more */
      ],
      required: ['target_schema']
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `listAgents`

List all agent configurations

`GET /v1/agents`

```ts
const { data } = await client.listAgents({
  source: 'example',
  availability: 'example',
  entity_schema: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agents": [
    {
      "agent_id": "skill:email-categorizer",
      "org_id": "string",
      "name": "string",
      "description": "string",
      "category": "message",
      "icon": "string",
      "source": "system",
      "availability": ["flows", "copilot"],
      "allowed_entity_schemas": ["message"],
      "system_prompt": "string",
      "tools": ["string"],
      "model_config": {
        "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "temperature": 0.7,
        "max_tokens": 4096,
        "thinking": false,
        "thinking_budget": 10000
      },
      "max_iterations": 0,
      "execution_pattern": "direct",
      "execution_mode": "automatic",
      "output_schema": {},
      "input_parameters_schema": {
        "type": "object",
        "parameters": [
          {
            "name": "target_schema",
            "label": "Target Schema",
            "type": "entity-schema",
            "description": "Entity type to create"
          },
          {
            "name": "confidence_threshold",
            "label": "Confidence Threshold",
            "type": "number",
            "minimum": 0,
            "maximum": 1,
            "default": 0.8
          }
        ],
        "required": ["target_schema"]
      },
      "version": 0,
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getAgentById`

Get the agent configuration by ID

`GET /v1/agents/{agent_id}`

```ts
const { data } = await client.getAgentById({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `updateAgentById`

Update the agent configuration by ID

`PUT /v1/agents/{agent_id}`

```ts
const { data } = await client.updateAgentById(
  {
    agent_id: 'example',
  },
  {
    name: 'string',
    description: 'string',
    category: 'message',
    icon: 'string',
    system_prompt: 'string',
    tools: ['string'],
    model_config: {
      model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      temperature: 0.7,
      max_tokens: 4096,
      thinking: false,
      thinking_budget: 10000
    },
    max_iterations: 1,
    execution_pattern: 'direct',
    execution_mode: 'automatic',
    output_schema: {},
    input_parameters_schema: {
      type: 'object',
      parameters: [
        {
          name: 'target_schema',
          label: 'Target Schema',
          type: 'entity-schema',
          description: 'Entity type to create'
        },
        {
          name: 'confidence_threshold',
          label: 'Confidence Threshold',
          type: 'number',
          minimum: 0,
          maximum: 1,
          default: 0.8
        },
        /* ... 1 more */
      ],
      required: ['target_schema']
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `deleteAgentById`

Delete the agent configuration by ID

`DELETE /v1/agents/{agent_id}`

```ts
const { data } = await client.deleteAgentById({
  agent_id: 'example',
})
```

---

### `executeAgent`

Execute an agent

`POST /v1/agents/{agent_id}/execute`

```ts
const { data } = await client.executeAgent(
  {
    agent_id: 'example',
  },
  {
    input: {
      entity_id: 'string',
      entity_schema: 'string',
      workflow_id: 'string',
      workflow_execution_id: 'string',
      task_id: 'string',
      custom_data: {},
      flow_context: [
        {
          entity_id: 'string',
          entity_schema: 'string'
        }
      ]
    },
    parameters: {},
    execution_mode_override: 'automatic',
    execution_context: 'flows',
    callback_url: 'https://example.com/path',
    timeout_ms: 30000
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {}
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    }
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `executeAgentStream`

Execute an agent with streaming response

`POST /v1/agents/{agent_id}/execute/stream`

```ts
const { data } = await client.executeAgentStream(
  {
    agent_id: 'example',
  },
  {
    input: {
      entity_id: 'string',
      entity_schema: 'string',
      workflow_id: 'string',
      workflow_execution_id: 'string',
      task_id: 'string',
      custom_data: {},
      flow_context: [
        {
          entity_id: 'string',
          entity_schema: 'string'
        }
      ]
    },
    parameters: {},
    execution_mode_override: 'automatic',
    execution_context: 'flows',
    callback_url: 'https://example.com/path',
    timeout_ms: 30000
  },
)
```

---

### `listExecutions`

List executions

`GET /v1/executions`

```ts
const { data } = await client.listExecutions({
  agent_id: 'example',
  status: 'example',
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "executions": [
    {
      "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "agent_id": "skill:email-categorizer",
      "agent_source": "system",
      "agent_name": "string",
      "execution_context": "flows",
      "org_id": "string",
      "status": "pending",
      "input": {},
      "parameters": {},
      "result": {
        "response": "string",
        "structured_output": {}
      },
      "error": {
        "code": "TIMEOUT",
        "message": "string",
        "details": {}
      },
      "pending_action": {
        "tool": "string",
        "input": {},
        "description": "string",
        "preview": {
          "action": {
            "type": "move",
            "verb": "Move Thread"
          },
          "source": {
            "type": "inbox",
            "id": "string",
            "name": "Support Inbox",
            "schema": "string",
            "icon": "string",
            "url": "string"
          },
          "target": {
            "type": "inbox",
            "id": "string",
            "name": "Support Inbox",
            "schema": "string",
            "icon": "string",
            "url": "string"
          },
          "changes": [
            {
              "field": "string",
              "label": "string",
              "from": {
                "type": "text",
                "value": {},
                "values": ["string"],
                "id": "string",
                "name": "string",
                "schema": "string",
                "color": "success"
              },
              "to": {
                "type": "text",
                "value": {},
                "values": ["string"],
                "id": "string",
                "name": "string",
                "schema": "string",
                "color": "success"
              }
            }
          ],
          "metadata": {},
          "summary": "This email discusses solar panel installation and should be handled by the Service team."
        }
      },
      "metrics": {
        "total_tokens": 0,
        "input_tokens": 0,
        "output_tokens": 0,
        "total_cost_usd": 0,
        "duration_ms": 0,
        "iteration_count": 0
      },
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "iterations": [
        {
          "index": 0,
          "tool": "string",
          "status": "running",
          "timestamp": "1970-01-01T00:00:00.000Z"
        }
      ]
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getExecution`

Get execution by ID

`GET /v1/executions/{execution_id}`

```ts
const { data } = await client.getExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {}
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    }
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `cancelExecution`

Cancel execution

`DELETE /v1/executions/{execution_id}`

```ts
const { data } = await client.cancelExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {}
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    }
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getExecutionTrace`

Get execution trace/iterations

`GET /v1/executions/{execution_id}/trace`

```ts
const { data } = await client.getExecutionTrace({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "iterations": [
    {
      "iteration_index": 0,
      "thought": "string",
      "action": {
        "tool": "string",
        "input": {}
      },
      "observation": {},
      "timestamp": "1970-01-01T00:00:00.000Z",
      "tokens_used": 0,
      "latency_ms": 0
    }
  ],
  "total_iterations": 0
}
```

</details>

---

### `approveExecution`

Approve pending action

`POST /v1/executions/{execution_id}/approve`

```ts
const { data } = await client.approveExecution(
  {
    execution_id: 'example',
  },
  {
    reason: 'string',
    approved_action_ids: ['string'],
    rejected_action_ids: ['string'],
    share_scope: 'primary_only'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {}
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    }
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `rejectExecution`

Reject pending action

`POST /v1/executions/{execution_id}/reject`

```ts
const { data } = await client.rejectExecution(
  {
    execution_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {}
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    }
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `streamExecution`

Reconnect to execution stream

`GET /v1/executions/{execution_id}/stream`

```ts
const { data } = await client.streamExecution({
  execution_id: 'example',
  from_sequence: 1,
})
```

---

### `chat`

Streaming chat with AI agent

`POST /v1/chat`

```ts
const { data } = await client.chat(
  null,
  {
    agentId: 'string',
    message: 'string',
    conversationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    clientHistory: [
      {
        role: 'user',
        content: 'string',
        tool_calls: [
          {
            id: 'string',
            name: 'string',
            input: {},
            output: 'string'
          }
        ]
      }
    ],
    context: {
      entityId: 'string',
      customData: {}
    },
    streaming: {
      mode: 'updates',
      streamTokens: false,
      includeMetadata: false
    }
  },
)
```

---

### `listConversations`

List conversations

`GET /v1/conversations`

```ts
const { data } = await client.listConversations({
  agent_id: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversations": [
    {
      "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "string",
      "agent_id": "string",
      "title": "string",
      "message_count": 0,
      "last_message": "string",
      "last_message_at": "1970-01-01T00:00:00.000Z",
      "context": {
        "entityId": "string",
        "customData": {}
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getConversation`

Get conversation with messages

`GET /v1/conversations/{conversation_id}`

```ts
const { data } = await client.getConversation({
  conversation_id: 'example',
  message_limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "conversation": {
    "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "user_id": "string",
    "agent_id": "string",
    "title": "string",
    "message_count": 0,
    "last_message": "string",
    "last_message_at": "1970-01-01T00:00:00.000Z",
    "context": {
      "entityId": "string",
      "customData": {}
    },
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z"
  },
  "messages": [
    {
      "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "role": "user",
      "content": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "tool_calls": [
        {
          "id": "string",
          "name": "string",
          "input": {},
          "output": "string"
        }
      ],
      "token_count": 0,
      "trace_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feedback": {
        "rating": "up",
        "comment": "string",
        "user_id": "string",
        "submitted_at": "1970-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

</details>

---

### `deleteConversation`

Delete conversation

`DELETE /v1/conversations/{conversation_id}`

```ts
const { data } = await client.deleteConversation({
  conversation_id: 'example',
})
```

---

### `submitConversationFeedback`

Submit feedback for an assistant turn

`POST /v1/conversations/{conversation_id}/feedback`

```ts
const { data } = await client.submitConversationFeedback(
  {
    conversation_id: 'example',
  },
  {
    trace_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    rating: 'up',
    comment: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "feedback": {
    "rating": "up",
    "comment": "string",
    "user_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

## Schemas

### `AgentId`

Agent identifier. Can be either:
- System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
- Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"


```ts
type AgentId = string
```

### `CreateAgentRequest`

```ts
type CreateAgentRequest = {
  name: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  system_prompt: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
}
```

### `UpdateAgentRequest`

```ts
type UpdateAgentRequest = {
  name?: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  system_prompt?: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern?: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
}
```

### `AgentDefinition`

```ts
type AgentDefinition = {
  agent_id?: string
  org_id?: string
  name?: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  source?: "system" | "custom"
  availability?: "flows" | "copilot" | "portals" | "all"[]
  allowed_entity_schemas?: string[]
  system_prompt?: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern?: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
  version?: number
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: string
}
```

### `ListAgentsResponse`

```ts
type ListAgentsResponse = {
  agents?: Array<{
    agent_id?: string
    org_id?: string
    name?: string
    description?: string
    category?: "message" | "entity" | "document" | "classification" | "custom"
    icon?: string
    source?: "system" | "custom"
    availability?: "flows" | "copilot" | "portals" | "all"[]
    allowed_entity_schemas?: string[]
    system_prompt?: string
    tools?: string[]
    model_config?: {
      model_id?: { ... }
      temperature?: { ... }
      max_tokens?: { ... }
      thinking?: { ... }
      thinking_budget?: { ... }
    }
    max_iterations?: number
    execution_pattern?: "direct" | "react"
    execution_mode?: "automatic" | "approval" | "draft"
    output_schema?: object
    input_parameters_schema?: {
      type: { ... }
      parameters: { ... }
      required?: { ... }
    }
    version?: number
    created_at?: string // date-time
    updated_at?: string // date-time
    created_by?: string
  }>
  next_cursor?: string
}
```

### `ListExecutionsResponse`

```ts
type ListExecutionsResponse = {
  executions?: Array<{
    execution_id?: string // uuid
    agent_id?: string
    agent_source?: "system" | "custom"
    agent_name?: string
    execution_context?: "flows" | "copilot" | "api"
    org_id?: string
    status?: "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
    input?: object
    parameters?: object
    result?: {
      response?: { ... }
      structured_output?: { ... }
    }
    error?: {
      code?: { ... }
      message?: { ... }
      details?: { ... }
    }
    pending_action?: {
      tool?: { ... }
      input?: { ... }
      description?: { ... }
      preview?: { ... }
    }
    metrics?: {
      total_tokens?: { ... }
      input_tokens?: { ... }
      output_tokens?: { ... }
      total_cost_usd?: { ... }
      duration_ms?: { ... }
      iteration_count?: { ... }
    }
    started_at?: string // date-time
    completed_at?: string // date-time
    iterations?: Array<{
      index?: { ... }
      tool?: { ... }
      status?: { ... }
      timestamp?: { ... }
    }>
  }>
  next_cursor?: string
}
```

### `ApproveExecutionRequest`

```ts
type ApproveExecutionRequest = {
  reason?: string
  approved_action_ids?: string[]
  rejected_action_ids?: string[]
  share_scope?: "primary_only" | "primary_and_relations"
}
```

### `RejectExecutionRequest`

```ts
type RejectExecutionRequest = {
  reason: string
}
```

### `ExecuteAgentRequest`

```ts
type ExecuteAgentRequest = {
  input?: {
    entity_id?: string
    entity_schema?: string
    workflow_id?: string
    workflow_execution_id?: string
    task_id?: string
    custom_data?: Record<string, unknown>
    flow_context?: Array<{
      entity_id: { ... }
      entity_schema: { ... }
    }>
  }
  parameters?: Record<string, unknown>
  execution_mode_override?: "automatic" | "approval" | "draft"
  execution_context?: "flows" | "copilot" | "api"
  callback_url?: string // uri
  timeout_ms?: number
}
```

### `ExecutionResponse`

```ts
type ExecutionResponse = {
  execution_id?: string // uuid
  agent_id?: string
  agent_source?: "system" | "custom"
  agent_name?: string
  execution_context?: "flows" | "copilot" | "api"
  org_id?: string
  status?: "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
  input?: object
  parameters?: object
  result?: {
    response?: string
    structured_output?: object
  }
  error?: {
    code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR"
    message?: string
    details?: object
  }
  pending_action?: {
    tool?: string
    input?: object
    description?: string
    preview?: {
      action?: { ... }
      source?: { ... }
      target?: { ... }
      changes?: { ... }
      metadata?: { ... }
      summary?: { ... }
    }
  }
  metrics?: {
    total_tokens?: number
    input_tokens?: number
    output_tokens?: number
    total_cost_usd?: number
    duration_ms?: number
    iteration_count?: number
  }
  started_at?: string // date-time
  completed_at?: string // date-time
  iterations?: Array<{
    index?: number
    tool?: string
    status?: "running" | "completed"
    timestamp?: string // date-time
  }>
}
```

### `ExecutionIterationProjection`

```ts
type ExecutionIterationProjection = {
  index?: number
  tool?: string
  status?: "running" | "completed"
  timestamp?: string // date-time
}
```

### `ExecutionTrace`

```ts
type ExecutionTrace = {
  execution_id?: string // uuid
  iterations?: Array<{
    iteration_index?: number
    thought?: string
    action?: {
      tool?: { ... }
      input?: { ... }
    }
    observation?: object
    timestamp?: string // date-time
    tokens_used?: number
    latency_ms?: number
  }>
  total_iterations?: number
}
```

### `ExecutionIteration`

```ts
type ExecutionIteration = {
  iteration_index?: number
  thought?: string
  action?: {
    tool?: string
    input?: object
  }
  observation?: object
  timestamp?: string // date-time
  tokens_used?: number
  latency_ms?: number
}
```

### `PendingAction`

Action waiting for approval (when status=waiting_approval)

```ts
type PendingAction = {
  tool?: string
  input?: object
  description?: string
  preview?: {
    action?: {
      type: { ... }
      verb: { ... }
    }
    source?: {
      type?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      icon?: { ... }
      url?: { ... }
    }
    target?: {
      type?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      icon?: { ... }
      url?: { ... }
    }
    changes?: Array<{
      field?: { ... }
      label?: { ... }
      from?: { ... }
      to?: { ... }
    }>
    metadata?: Record<string, {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }>
    summary?: string
  }
}
```

### `ExecutionError`

```ts
type ExecutionError = {
  code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR"
  message?: string
  details?: object
}
```

### `ExecutionMetrics`

```ts
type ExecutionMetrics = {
  total_tokens?: number
  input_tokens?: number
  output_tokens?: number
  total_cost_usd?: number
  duration_ms?: number
  iteration_count?: number
}
```

### `ToolPreview`

Structured preview data for approval UI. Provides a generic format that any tool can populate.

```ts
type ToolPreview = {
  action?: {
    type: "move" | "create" | "update" | "delete" | "apply" | "send" | "link" | "unlink" | "batch_approval"
    verb: string
  }
  source?: {
    type?: string
    id?: string
    name?: string
    schema?: string
    icon?: string
    url?: string
  }
  target?: {
    type?: string
    id?: string
    name?: string
    schema?: string
    icon?: string
    url?: string
  }
  changes?: Array<{
    field?: string
    label?: string
    from?: {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }
    to?: {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }
  }>
  metadata?: Record<string, {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }>
  summary?: string
}
```

### `PreviewActionType`

Type of action being previewed

```ts
type PreviewActionType = "move" | "create" | "update" | "delete" | "apply" | "send" | "link" | "unlink" | "batch_approval"
```

### `PreviewEntity`

Entity reference for preview display

```ts
type PreviewEntity = {
  type?: string
  id?: string
  name?: string
  schema?: string
  icon?: string
  url?: string
}
```

### `PreviewChange`

A single field change in the preview

```ts
type PreviewChange = {
  field?: string
  label?: string
  from?: {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }
  to?: {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }
}
```

### `PreviewValue`

Typed value for preview display

```ts
type PreviewValue = {
  type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
  value?: unknown
  values?: string[]
  id?: string
  name?: string
  schema?: string
  color?: "success" | "warning" | "error" | "info"
}
```

### `ToolDefinition`

```ts
type ToolDefinition = {
  tool_id?: string
  name?: string
  description?: string
  category?: "entity" | "message" | "taxonomy" | "rag" | "workflow"
  parameters?: object
  returns?: object
  requires_approval?: boolean
  enabled?: boolean
}
```

### `SkillCategory`

```ts
type SkillCategory = "message" | "entity" | "document" | "classification" | "custom"
```

### `AgentSource`

- system: Pre-built by epilot (system skills)
- custom: Created by organization


```ts
type AgentSource = "system" | "custom"
```

### `SkillAvailability`

Where the skill/agent is available:
- flows: Available in workflow automations
- copilot: Available as a sub-agent in copilot
- portals: Available in end-user self-service portals
- all: Available everywhere


```ts
type SkillAvailability = "flows" | "copilot" | "portals" | "all"
```

### `ExecutionContext`

Where the execution was triggered from:
- flows: Triggered from workflow automation
- copilot: Triggered from copilot assistant
- api: Direct API call


```ts
type ExecutionContext = "flows" | "copilot" | "api"
```

### `ExecutionPattern`

- direct: Single LLM call, no tools
- react: Multi-step reasoning with tool use


```ts
type ExecutionPattern = "direct" | "react"
```

### `ExecutionMode`

- automatic: Execute without human intervention
- approval: Pause for human approval before tool execution
- draft: Execute but mark output as draft for review


```ts
type ExecutionMode = "automatic" | "approval" | "draft"
```

### `ExecutionStatus`

```ts
type ExecutionStatus = "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
```

### `ParameterType`

Base types:
- text: Text input field
- textarea: Multi-line text input field
- number: Numeric input field
- boolean: Toggle switch
- select: Dropdown selection (requires enum array)

Custom types (domain-specific):
- entity-schema: Entity schema selector (fetches from Entity API)
- entity-attribute

```ts
type ParameterType = "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria"
```

### `InputParameterDefinition`

```ts
type InputParameterDefinition = {
  name: string
  label: string
  type: "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria"
  description?: string
  default?: unknown
  multi?: boolean
  dependsOn?: string
  visibleWhen?: Record<string, unknown[]>
  enum?: string[]
  minimum?: number
  maximum?: number
  step?: number
  minLength?: number
  maxLength?: number
  schemaFilter?: string[]
  attributeTypeFilter?: string[]
  hidden?: boolean
}
```

### `InputParametersSchema`

```ts
type InputParametersSchema = {
  type: "object"
  parameters: Array<{
    name: string
    label: string
    type: "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria"
    description?: string
    default?: unknown
    multi?: boolean
    dependsOn?: string
    visibleWhen?: Record<string, unknown[]>
    enum?: string[]
    minimum?: number
    maximum?: number
    step?: number
    minLength?: number
    maxLength?: number
    schemaFilter?: string[]
    attributeTypeFilter?: string[]
    hidden?: boolean
  }>
  required?: string[]
}
```

### `ModelConfig`

```ts
type ModelConfig = {
  model_id?: string
  temperature?: number
  max_tokens?: number
  thinking?: boolean
  thinking_budget?: number
}
```

### `Error`

```ts
type Error = {
  error?: string
  message?: string
  details?: object
}
```

### `ChatRequest`

```ts
type ChatRequest = {
  agentId: string
  message: string
  conversationId?: string // uuid
  clientHistory?: Array<{
    role: "user" | "assistant" | "tool" | "system"
    content: string
    tool_calls?: Array<{
      id?: { ... }
      name?: { ... }
      input?: { ... }
      output?: { ... }
    }>
  }>
  context?: {
    entityId?: string
    customData?: Record<string, unknown>
  }
  streaming?: {
    mode?: "updates" | "messages"
    streamTokens?: boolean
    includeMetadata?: boolean
  }
}
```

### `ChatMessage`

```ts
type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system"
  content: string
  tool_calls?: Array<{
    id?: string
    name?: string
    input?: object
    output?: string
  }>
}
```

### `StreamingOptions`

```ts
type StreamingOptions = {
  mode?: "updates" | "messages"
  streamTokens?: boolean
  includeMetadata?: boolean
}
```

### `StreamEvent`

Server-Sent Event for streaming responses

```ts
type StreamEvent = {
  type?: "token" | "agent_step" | "tool_call" | "tool_result" | "complete" | "error" | "metadata" | "needs_approval"
  content?: string
  index?: number
  tool?: string
  input?: object
  output?: string
  callId?: string
  result?: {
    response?: string
    structured_output?: object
    status?: "completed" | "failed" | "max_iterations" | "rejected"
    metrics?: {
      total_tokens?: { ... }
      input_tokens?: { ... }
      output_tokens?: { ... }
      total_cost_usd?: { ... }
      duration_ms?: { ... }
      iteration_count?: { ... }
    }
  }
  error?: {
    code?: string
    message?: string
  }
  conversationId?: string // uuid
}
```

### `ExecutionResult`

```ts
type ExecutionResult = {
  response?: string
  structured_output?: object
  status?: "completed" | "failed" | "max_iterations" | "rejected"
  metrics?: {
    total_tokens?: number
    input_tokens?: number
    output_tokens?: number
    total_cost_usd?: number
    duration_ms?: number
    iteration_count?: number
  }
}
```

### `ConversationItem`

```ts
type ConversationItem = {
  conversation_id?: string // uuid
  user_id?: string
  agent_id?: string
  title?: string
  message_count?: number
  last_message?: string
  last_message_at?: string // date-time
  context?: {
    entityId?: string
    customData?: object
  }
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `MessageItem`

```ts
type MessageItem = {
  conversation_id?: string // uuid
  role?: "user" | "assistant" | "tool" | "system"
  content?: string
  timestamp?: string // date-time
  tool_calls?: Array<{
    id?: string
    name?: string
    input?: object
    output?: string
  }>
  token_count?: number
  trace_id?: string // uuid
  feedback?: {
    rating: "up" | "down"
    comment?: string
    user_id: string
    submitted_at: string // date-time
  }
}
```

### `MessageFeedback`

```ts
type MessageFeedback = {
  rating: "up" | "down"
  comment?: string
  user_id: string
  submitted_at: string // date-time
}
```

### `SubmitFeedbackRequest`

```ts
type SubmitFeedbackRequest = {
  trace_id: string // uuid
  rating: "up" | "down"
  comment?: string
}
```

### `ListConversationsResponse`

```ts
type ListConversationsResponse = {
  conversations?: Array<{
    conversation_id?: string // uuid
    user_id?: string
    agent_id?: string
    title?: string
    message_count?: number
    last_message?: string
    last_message_at?: string // date-time
    context?: {
      entityId?: { ... }
      customData?: { ... }
    }
    created_at?: string // date-time
    updated_at?: string // date-time
  }>
  next_cursor?: string
}
```

### `ConversationWithMessages`

```ts
type ConversationWithMessages = {
  conversation?: {
    conversation_id?: string // uuid
    user_id?: string
    agent_id?: string
    title?: string
    message_count?: number
    last_message?: string
    last_message_at?: string // date-time
    context?: {
      entityId?: { ... }
      customData?: { ... }
    }
    created_at?: string // date-time
    updated_at?: string // date-time
  }
  messages?: Array<{
    conversation_id?: string // uuid
    role?: "user" | "assistant" | "tool" | "system"
    content?: string
    timestamp?: string // date-time
    tool_calls?: Array<{
      id?: { ... }
      name?: { ... }
      input?: { ... }
      output?: { ... }
    }>
    token_count?: number
    trace_id?: string // uuid
    feedback?: {
      rating: { ... }
      comment?: { ... }
      user_id: { ... }
      submitted_at: { ... }
    }
  }>
}
```
