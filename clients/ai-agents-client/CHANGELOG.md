# @epilot/address-client

## 0.4.0

### Minor Changes

- Agents API v2 Sessions operations (`createSession`, `listSessions`, `getSession`, `renameSession`, `deleteSession`, `listSessionEvents`, `sendSessionEvent`, `getSessionFileUrl`, `createSessionUpload`, `revokeSessionAgents`, `runScript`, `getScriptRun`, `applyScriptRun`), used by the Luna panel and the epilot MCP; deployed on dev only for now, and never offered to agents (`x-epilot-agent: { expose: false }`)
- Up to date with the deployed spec: the Agent Auth and customer chat conversation operations and the customer chat `followUps` setting are added; `createKnowledgeFileUpload`, `listKnowledgeSources`, `getKnowledgeSource` and `deleteKnowledgeSource`, which the API no longer has, are removed

## 0.3.0

### Minor Changes

- `executeAgent` accepts `mode: sync`, which runs a direct skill inside the request and returns the completed execution

## 0.1.0

### Minor Changes

- Added execution

## 0.2.2

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 0.2.1

### Patch Changes

- Mark access as public for all packages

## 0.2.0

### Minor Changes

- Minor version bump for all client packages
