---
"@epilot/workflow-client": minor
---

Add `runTaskAgent` and surface `trigger_mode` on `AiAgentTask`

- New `POST /v2/flows/executions/{execution_id}/tasks/{task_id}/agent:run` operation (`runTaskAgent`). Dispatches the configured AI agent for a manual-trigger AI task after an explicit user action.
- `AiAgentTask` now exposes the optional `trigger_mode` field (`'manual' | 'automatic'`), mirroring `AutomationTask`. Undefined is treated as automatic by the backend (no data migration needed).
