# AI Agents API - OpenAPI 3.0

**API Name:** `ai-agents`
**Base URL:** `https://ai-agents.sls.epilot.io`

API for configuring and invoking AI agents in epilot platform

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listAgents` | GET | `/v1/agents` | List all agent configurations |
| `createAgent` | POST | `/v1/agents` | Create Agent definition |
| `getAgentById` | GET | `/v1/agents/{agent_id}` | Get the agent configuration by ID |
| `updateAgentById` | PUT | `/v1/agents/{agent_id}` | Update the agent configuration by ID |
| `deleteAgentById` | DELETE | `/v1/agents/{agent_id}` | Delete the agent configuration by ID |
| `executeAgent` | POST | `/v1/agents/{agent_id}/execute` | Execute an agent |
| `listExecutions` | GET | `/v1/executions` | List executions |
| `getExecution` | GET | `/v1/executions/{execution_id}` | Get execution by ID |
| `cancelExecution` | DELETE | `/v1/executions/{execution_id}` | Cancel execution |
| `getExecutionTrace` | GET | `/v1/executions/{execution_id}/trace` | Get execution trace/iterations |
| `approveExecution` | POST | `/v1/executions/{execution_id}/approve` | Approve pending action |
| `rejectExecution` | POST | `/v1/executions/{execution_id}/reject` | Reject pending action |

## Usage

```bash
epilot ai-agents listAgents
```
