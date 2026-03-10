# AI Agents API - OpenAPI 3.0

- **Base URL:** `https://ai-agents.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/ai-agents](https://docs.epilot.io/api/ai-agents)

API for configuring and invoking AI agents in epilot platform

## Quick Start

```bash
# List available operations
epilot ai-agents

# Call an operation
epilot ai-agents listAgents
```

## Operations

**Agents Configuration**
- [`listAgents`](#listagents) — Lists agents from both system skills and custom agents.
- [`createAgent`](#createagent) — Creates a new custom agent. System skills cannot be created via this endpoint.
- [`getAgentById`](#getagentbyid) — Retrieves an agent by ID. Supports both:
- [`updateAgentById`](#updateagentbyid) — Updates a custom agent. System skills cannot be updated via this endpoint.
- [`deleteAgentById`](#deleteagentbyid) — Deletes a custom agent. System skills cannot be deleted via this endpoint.

**Agent Execution**
- [`executeAgent`](#executeagent) — Executes an agent (system skill or custom agent).
- [`listExecutions`](#listexecutions) — GET /v1/executions
- [`getExecution`](#getexecution) — GET /v1/executions/{execution_id}
- [`cancelExecution`](#cancelexecution) — DELETE /v1/executions/{execution_id}
- [`getExecutionTrace`](#getexecutiontrace) — Returns the step-by-step reasoning and tool calls for ReAct mode executions. Returns empty iterations array for direct m
- [`approveExecution`](#approveexecution) — Approves a pending tool action when execution is in waiting_approval status
- [`rejectExecution`](#rejectexecution) — Rejects a pending tool action when execution is in waiting_approval status

### `listAgents`

Lists agents from both system skills and custom agents.

`GET /v1/agents`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `source` | query | "system" \| "custom" | No | Filter by agent source (system = pre-built skills, custom = user-created) |
| `availability` | query | "flows" \| "copilot" \| "all" | No | Filter by availability context (flows, copilot) |
| `entity_schema` | query | string | No | Filter by allowed entity schema (e.g., "message" for email-related skills) |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents listAgents
```

With JSONata filter:

```bash
epilot ai-agents listAgents --jsonata 'agents'
```

<details>
<summary>Sample Response</summary>

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
        "max_tokens": 4096
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

### `createAgent`

Creates a new custom agent. System skills cannot be created via this endpoint.

`POST /v1/agents`

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents createAgent
```

With request body:

```bash
epilot ai-agents createAgent \
  -d '{
  "name": "Email Reply Generator",
  "description": "string",
  "category": "message",
  "icon": "mail-reply",
  "system_prompt": "string",
  "tools": ["entity.search", "message.draft"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096
  },
  "max_iterations": 10,
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
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot ai-agents createAgent
```

With JSONata filter:

```bash
epilot ai-agents createAgent --jsonata 'agent_id'
```

<details>
<summary>Sample Response</summary>

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
    "max_tokens": 4096
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

### `getAgentById`

Retrieves an agent by ID. Supports both:

`GET /v1/agents/{agent_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `agent_id` | path | string | Yes |  |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents getAgentById \
  -p agent_id=skill:email-categorizer
```

Using positional args for path parameters:

```bash
epilot ai-agents getAgentById skill:email-categorizer
```

With JSONata filter:

```bash
epilot ai-agents getAgentById -p agent_id=skill:email-categorizer --jsonata 'agent_id'
```

<details>
<summary>Sample Response</summary>

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
    "max_tokens": 4096
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

Updates a custom agent. System skills cannot be updated via this endpoint.

`PUT /v1/agents/{agent_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `agent_id` | path | string | Yes |  |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents updateAgentById \
  -p agent_id=skill:email-categorizer
```

With request body:

```bash
epilot ai-agents updateAgentById \
  -p agent_id=skill:email-categorizer \
  -d '{
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096
  },
  "max_iterations": 1,
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
  }
}'
```

Using positional args for path parameters:

```bash
epilot ai-agents updateAgentById skill:email-categorizer
```

Using stdin pipe:

```bash
cat body.json | epilot ai-agents updateAgentById -p agent_id=skill:email-categorizer
```

With JSONata filter:

```bash
epilot ai-agents updateAgentById -p agent_id=skill:email-categorizer --jsonata 'agent_id'
```

<details>
<summary>Sample Response</summary>

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
    "max_tokens": 4096
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

Deletes a custom agent. System skills cannot be deleted via this endpoint.

`DELETE /v1/agents/{agent_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `agent_id` | path | string | Yes |  |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents deleteAgentById \
  -p agent_id=skill:email-categorizer
```

Using positional args for path parameters:

```bash
epilot ai-agents deleteAgentById skill:email-categorizer
```

With JSONata filter:

```bash
epilot ai-agents deleteAgentById -p agent_id=skill:email-categorizer --jsonata '$'
```

---

### `executeAgent`

Executes an agent (system skill or custom agent).

`POST /v1/agents/{agent_id}/execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `agent_id` | path | string | Yes |  |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents executeAgent \
  -p agent_id=skill:email-categorizer
```

With request body:

```bash
epilot ai-agents executeAgent \
  -p agent_id=skill:email-categorizer \
  -d '{
  "input": {
    "entity_id": "string",
    "entity_schema": "string",
    "workflow_id": "string",
    "workflow_execution_id": "string",
    "task_id": "string",
    "custom_data": {},
    "flow_context": [
      {
        "entity_id": "string",
        "entity_schema": "string"
      }
    ]
  },
  "parameters": {},
  "execution_mode_override": "automatic",
  "execution_context": "flows",
  "callback_url": "https://example.com/path",
  "timeout_ms": 30000
}'
```

Using positional args for path parameters:

```bash
epilot ai-agents executeAgent skill:email-categorizer
```

Using stdin pipe:

```bash
cat body.json | epilot ai-agents executeAgent -p agent_id=skill:email-categorizer
```

With JSONata filter:

```bash
epilot ai-agents executeAgent -p agent_id=skill:email-categorizer --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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
      "action": {},
      "source": {},
      "target": {},
      "changes": [],
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
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listExecutions`

`GET /v1/executions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `agent_id` | query | string | No | Filter by agent ID |
| `status` | query | "pending" \| "running" \| "waiting_approval" \| "completed" \| "failed" \| "cancelled" | No | Filter by status |
| `limit` | query | number | No | Maximum number of executions to return |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents listExecutions
```

With JSONata filter:

```bash
epilot ai-agents listExecutions --jsonata 'executions'
```

<details>
<summary>Sample Response</summary>

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
      "result": {},
      "error": {},
      "pending_action": {},
      "metrics": {},
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getExecution`

`GET /v1/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string (uuid) | Yes |  |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents getExecution \
  -p execution_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot ai-agents getExecution 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot ai-agents getExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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
      "action": {},
      "source": {},
      "target": {},
      "changes": [],
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
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `cancelExecution`

`DELETE /v1/executions/{execution_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string (uuid) | Yes |  |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents cancelExecution \
  -p execution_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot ai-agents cancelExecution 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot ai-agents cancelExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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
      "action": {},
      "source": {},
      "target": {},
      "changes": [],
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
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getExecutionTrace`

Returns the step-by-step reasoning and tool calls for ReAct mode executions. Returns empty iterations array for direct m

`GET /v1/executions/{execution_id}/trace`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string (uuid) | Yes |  |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents getExecutionTrace \
  -p execution_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot ai-agents getExecutionTrace 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot ai-agents getExecutionTrace -p execution_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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

Approves a pending tool action when execution is in waiting_approval status

`POST /v1/executions/{execution_id}/approve`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string (uuid) | Yes |  |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents approveExecution \
  -p execution_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot ai-agents approveExecution 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot ai-agents approveExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot ai-agents approveExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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
      "action": {},
      "source": {},
      "target": {},
      "changes": [],
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
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `rejectExecution`

Rejects a pending tool action when execution is in waiting_approval status

`POST /v1/executions/{execution_id}/reject`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `execution_id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot ai-agents rejectExecution \
  -p execution_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot ai-agents rejectExecution 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot ai-agents rejectExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot ai-agents rejectExecution -p execution_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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
      "action": {},
      "source": {},
      "target": {},
      "changes": [],
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
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---
