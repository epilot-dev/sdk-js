# Audit Log

- **Base URL:** `https://audit-logs.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/audit-logs](https://docs.epilot.io/api/audit-logs)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.auditLogs.getLogs(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/audit-logs'

const auditLogsClient = getClient()
authorize(auditLogsClient, () => '<token>')
const { data } = await auditLogsClient.getLogs(...)
```

## Operations

**Events**
- [`getLogs`](#getlogs)

**Audit Log**
- [`getLogById`](#getlogbyid)

**Schemas**
- [`CallerType`](#callertype)
- [`SearchOptions`](#searchoptions)
- [`HttpContext`](#httpcontext)
- [`Caller`](#caller)
- [`AgentCaller`](#agentcaller)
- [`Event`](#event)

### `getLogs`

Retrieve Audit Log events. Optionally, you can filter them by organization.

`POST /v1/logs`

```ts
const { data } = await client.getLogs(
  null,
  {
    limit: 50,
    page: 0,
    timestamp: {
      from: '2021-06-01T12:00:00Z',
      to: '2021-06-30T23:59:59Z'
    },
    service_name: 'workflows',
    event_name: 'deleteWorkflow',
    outcome: 'success',
    method: 'POST',
    caller_type: 'user',
    visibility: 'customer',
    resource_id: '550e8400-e29b-41d4-a716-446655440000',
    resource_type: 'blueprint',
    action: 'blueprint.resource_added',
    user: {
      email: 'max.mustermann@mail.com',
      user_id: 123456
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "logs": [
    {
      "id": "2843c005-c5b0-4df2-94ee-1ca2ddd998ac",
      "org_id": 123456,
      "service_name": "workflows",
      "event_name": "deleteWorkflow",
      "status_code": 200,
      "timestamp": "2021-06-01T12:00:00Z",
      "caller": {
        "user_email": "max.mustermann@mail.com",
        "user_id": 123456,
        "trigger_type": "user",
        "token_id": "agent_V1StGXR8Z5jdHi6B",
        "token_type": "api",
        "token_name": "Agent: Claude · Contract review",
        "agent": {
          "agent_id": "string",
          "host_id": "string",
          "agent_name": "Claude",
          "host_name": "string",
          "client": "string",
          "purpose": "Contract review",
          "user_id": "string",
          "run_id": "string",
          "channel": "chat"
        }
      },
      "http": {
        "method": "GET",
        "ip": null,
        "headers": {
          "Authorization": "Bearer token"
        },
        "query": {
          "limit": 50,
          "page": 0
        },
        "pathParams": {
          "eventId": "2843c005-c5b0-4df2-94ee-1ca2ddd998ac"
        },
        "path": "/v1/logs",
        "domainName": "audit-logs.sls.epilot.io"
      },
      "detail": "{\"workflow_id\": \"123456\"}",
      "activity": "Workflow with ID 123456 was deleted",
      "source_url": "string",
      "resource_id": "550e8400-e29b-41d4-a716-446655440000",
      "resource_type": "blueprint",
      "action": "blueprint.resource_added",
      "visibility": "customer"
    }
  ],
  "total": 1
}
```

</details>

---

### `getLogById`

Retrieve Audit Log events

`GET /v1/logs/{logId}`

```ts
const { data } = await client.getLogById({
  logId: 'example',
  visibility: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "log": {
    "id": "2843c005-c5b0-4df2-94ee-1ca2ddd998ac",
    "org_id": 123456,
    "service_name": "workflows",
    "event_name": "deleteWorkflow",
    "status_code": 200,
    "timestamp": "2021-06-01T12:00:00Z",
    "caller": {
      "user_email": "max.mustermann@mail.com",
      "user_id": 123456,
      "trigger_type": "user",
      "token_id": "agent_V1StGXR8Z5jdHi6B",
      "token_type": "api",
      "token_name": "Agent: Claude · Contract review",
      "agent": {
        "agent_id": "string",
        "host_id": "string",
        "agent_name": "Claude",
        "host_name": "string",
        "client": "string",
        "purpose": "Contract review",
        "user_id": "string",
        "run_id": "string",
        "channel": "chat"
      }
    },
    "http": {
      "method": "GET",
      "ip": null,
      "headers": {
        "Authorization": "Bearer token"
      },
      "query": {
        "limit": 50,
        "page": 0
      },
      "pathParams": {
        "eventId": "2843c005-c5b0-4df2-94ee-1ca2ddd998ac"
      },
      "path": "/v1/logs",
      "domainName": "audit-logs.sls.epilot.io"
    },
    "detail": "{\"workflow_id\": \"123456\"}",
    "activity": "Workflow with ID 123456 was deleted",
    "source_url": "string",
    "resource_id": "550e8400-e29b-41d4-a716-446655440000",
    "resource_type": "blueprint",
    "action": "blueprint.resource_added",
    "visibility": "customer"
  }
}
```

</details>

---

## Schemas

### `CallerType`

```ts
type CallerType = "user" | "api" | "automation" | "agent"
```

### `SearchOptions`

```ts
type SearchOptions = {
  limit?: number
  page?: number
  timestamp?: {
    from?: string
    to?: string
  }
  service_name?: string
  event_name?: string
  outcome?: "success" | "failure"
  method?: string
  caller_type?: "user" | "api" | "automation" | "agent" | "user" | "api" | "automation" | "agent"[]
  visibility?: "customer" | "internal" | "all"
  resource_id?: string
  resource_type?: string
  action?: string
  user?: {
    email?: string
    user_id?: string
  }
}
```

### `HttpContext`

```ts
type HttpContext = {
  method?: string
  ip?: string
  headers?: object
  query?: object
  pathParams?: object
  path?: string
  domainName?: string
}
```

### `Caller`

```ts
type Caller = {
  user_email?: string
  user_id?: string
  trigger_type?: "user" | "api" | "automation" | "agent"
  token_id?: string
  token_type?: string
  token_name?: string
  agent?: {
    agent_id?: string
    host_id?: string
    agent_name?: string
    host_name?: string
    client?: string
    purpose?: string
    user_id?: string
    run_id?: string
    channel?: string
  }
}
```

### `AgentCaller`

AI agent that made the call. Only present when trigger_type is `agent`.

```ts
type AgentCaller = {
  agent_id?: string
  host_id?: string
  agent_name?: string
  host_name?: string
  client?: string
  purpose?: string
  user_id?: string
  run_id?: string
  channel?: string
}
```

### `Event`

```ts
type Event = {
  id?: string // uuid
  org_id?: string
  service_name?: string
  event_name?: string
  status_code?: number
  timestamp?: string
  caller?: {
    user_email?: string
    user_id?: string
    trigger_type?: "user" | "api" | "automation" | "agent"
    token_id?: string
    token_type?: string
    token_name?: string
    agent?: {
      agent_id?: { ... }
      host_id?: { ... }
      agent_name?: { ... }
      host_name?: { ... }
      client?: { ... }
      purpose?: { ... }
      user_id?: { ... }
      run_id?: { ... }
      channel?: { ... }
    }
  }
  http?: {
    method?: string
    ip?: string
    headers?: object
    query?: object
    pathParams?: object
    path?: string
    domainName?: string
  }
  detail?: string
  activity?: string
  source_url?: string
  resource_id?: string
  resource_type?: string
  action?: string
  visibility?: "customer" | "internal"
}
```
