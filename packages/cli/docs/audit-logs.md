# Audit Log

- **Base URL:** `https://audit-logs.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/audit-logs](https://docs.epilot.io/api/audit-logs)

Service for managing and retrieving auditing logs in the scope of an organization

## Quick Start

```bash
# List available operations
epilot audit-logs

# Call an operation
epilot audit-logs getLogs
```

## Operations

**Events**
- [`getLogs`](#getlogs) — Retrieve Audit Log events. Optionally, you can filter them by organization.

**Audit Log**
- [`getLogById`](#getlogbyid) — Retrieve Audit Log events

### `getLogs`

Retrieve Audit Log events. Optionally, you can filter them by organization.

`POST /v1/logs`

**Request Body**

**Sample Call**

```bash
epilot audit-logs getLogs
```

With request body:

```bash
epilot audit-logs getLogs \
  -d '{
  "limit": 50,
  "page": 0,
  "timestamp": "2021-06-01T12:00:00Z",
  "service_name": "workflows",
  "event_name": "deleteWorkflow",
  "outcome": "success",
  "method": "POST",
  "user": {
    "email": "max.mustermann@mail.com",
    "user_id": 123456
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot audit-logs getLogs
```

With JSONata filter:

```bash
epilot audit-logs getLogs --jsonata 'logs'
```

<details>
<summary>Sample Response</summary>

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
        "trigger_type": "user"
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
      "source_url": "string"
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `logId` | path | string | Yes | ID of the log event |

**Sample Call**

```bash
epilot audit-logs getLogById \
  -p logId=2843c005-c5b0-4df2-94ee-1ca2ddd998ac
```

Using positional args for path parameters:

```bash
epilot audit-logs getLogById 2843c005-c5b0-4df2-94ee-1ca2ddd998ac
```

With JSONata filter:

```bash
epilot audit-logs getLogById -p logId=2843c005-c5b0-4df2-94ee-1ca2ddd998ac --jsonata 'log'
```

<details>
<summary>Sample Response</summary>

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
    "source_url": "string"
  }
}
```

</details>

---
