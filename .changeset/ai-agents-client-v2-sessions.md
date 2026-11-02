---
"@epilot/ai-agents-client": minor
---

Regenerate from the AI Agents API spec: add the Agents API v2 Sessions operations (`createSession`, `listSessions`, `getSession`, `renameSession`, `deleteSession`, `listSessionEvents`, `sendSessionEvent`, `getSessionFileUrl`, `createSessionUpload`, `revokeSessionAgents`, `runScript`, `getScriptRun`, `applyScriptRun`), used by the Luna panel and the epilot MCP; they are deployed on dev only for now. Also brings the client up to the deployed spec: adds the Agent Auth and customer chat conversation operations and the customer chat `followUps` setting, and drops `createKnowledgeFileUpload`, `listKnowledgeSources`, `getKnowledgeSource` and `deleteKnowledgeSource`, which the API no longer has.
