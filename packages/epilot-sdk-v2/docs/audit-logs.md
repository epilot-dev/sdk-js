# Audit Log

**Base URL:** `https://audit-logs.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/audit-logs](https://docs.epilot.io/api/audit-logs)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.auditLogs.getLogs(...)

// Or get the client explicitly
const auditLogsClient = await epilot.auditLogs.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/audit-logs'

const auditLogsClient = await getClient()
authorize(auditLogsClient, () => '<token>')
const { data } = await auditLogsClient.getLogs(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/audit-logs'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Events**
- [`getLogs`](#getlogs)

**Audit Log**
- [`getLogById`](#getlogbyid)

### `getLogs`

Retrieve Audit Log events. Optionally, you can filter them by organization.

`POST /v1/logs`

```ts
const { data } = await client.getLogs(
  null,
  {
    limit: 50,
    page: 0,
    timestamp: '2021-06-01T12:00:00Z',
    service_name: 'workflows',
    event_name: 'deleteWorkflow',
    outcome: 'success',
    method: 'POST',
    user: {
      email: 'max.mustermann@mail.com',
      user_id: 123456
    }
  },
)
```

**Response**

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
      "caller": {},
      "http": {},
      "detail": "{\"workflow_id\": \"123456\"}",
      "activity": "Workflow with ID 123456 was deleted",
      "source_url": "string"
    }
  ],
  "total": 1
}
```

---

### `getLogById`

Retrieve Audit Log events

`GET /v1/logs/{logId}`

```ts
const { data } = await client.getLogById({
  logId: 'example',
})
```

**Response**

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
      "trigger_type": "user"
    },
    "http": {
      "method": "GET",
      "ip": null,
      "headers": {},
      "query": {},
      "pathParams": {},
      "path": "/v1/logs",
      "domainName": "audit-logs.sls.epilot.io"
    },
    "detail": "{\"workflow_id\": \"123456\"}",
    "activity": "Workflow with ID 123456 was deleted",
    "source_url": "string"
  }
}
```

---

## Schemas

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
  trigger_type?: "user" | "api" | "automation"
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
    trigger_type?: "user" | "api" | "automation"
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
}
```
