# Webhooks

- **Base URL:** `https://webhooks.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/webhooks](https://docs.epilot.io/api/webhooks)

Service for configuring webhooks on different events

## Quick Start

```bash
# List available operations
epilot webhooks

# Call an operation
epilot webhooks getPublicKey -p orgId=123e4567-e89b-12d3-a456-426614174000
```

## Operations

**webhooks**
- [`getPublicKey`](#getpublickey) — Returns the platform-level Ed25519 public key used to verify
- [`getConfiguredEvents`](#getconfiguredevents) — Retrieve events that can trigger webhooks
- [`getConfigs`](#getconfigs) — Search Webhook Client Configs
- [`createConfig`](#createconfig) — Create Webhook Client Config
- [`getConfig`](#getconfig) — Get webhook config by id
- [`updateConfig`](#updateconfig) — Update Webhook Client Config
- [`deleteConfig`](#deleteconfig) — Delete Webhook Client Config
- [`triggerWebhook`](#triggerwebhook) — Trigger a webhook
- [`batchReplayEvents`](#batchreplayevents) — Replay a batch of webhook events
- [`getEventById`](#geteventbyid) — Get a webhook event by its id
- [`replayEvent`](#replayevent) — Replay a webhook event
- [`getWebhookExample`](#getwebhookexample) — Generate an example payload for a webhook configuration based on trigger type

**Events**
- [`getWebhookEventsV2`](#getwebhookeventsv2) — List webhook events and filter them by status, timestamp, etc.

### `getPublicKey`

Returns the platform-level Ed25519 public key used to verify

`GET /v1/webhooks/.well-known/public-key`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | query | string | Yes | Organization ID to retrieve the public key for. |

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
epilot webhooks getPublicKey \
  -p orgId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot webhooks getPublicKey -p orgId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'public_key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "public_key": "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA...\n-----END PUBLIC KEY-----\n",
  "algorithm": "ed25519",
  "issuer": "epilot"
}
```

</details>

---

### `getConfiguredEvents`

Retrieve events that can trigger webhooks

`GET /v1/webhooks/configured-events`

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
epilot webhooks getConfiguredEvents
```

With JSONata filter:

```bash
epilot webhooks getConfiguredEvents --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "eventName": "customer_request_created",
    "eventLabel": "Customer Request Created"
  }
]
```

</details>

---

### `getConfigs`

Search Webhook Client Configs

`GET /v1/webhooks/configs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `eventName` | query | string | No | Filter configurations by event Name |

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
epilot webhooks getConfigs
```

With JSONata filter:

```bash
epilot webhooks getConfigs --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "eventName": "CustomerRequest_Created",
    "url": "https://my-partner-service.api.com",
    "httpMethod": "POST",
    "enabled": true,
    "auth": {
      "authType": "BASIC",
      "basicAuthConfig": {
        "username": "secretUsername",
        "password": "secret7825@!"
      }
    },
    "filter": {
      "keyToFilter": "customer_request.productId",
      "supportedValues": ["2324245", "5253642"]
    }
  }
]
```

</details>

---

### `createConfig`

Create Webhook Client Config

`POST /v1/webhooks/configs`

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
epilot webhooks createConfig
```

With request body:

```bash
epilot webhooks createConfig \
  -d '{
  "eventName": "CustomerRequest_Created",
  "url": "https://my-partner-service.api.com",
  "httpMethod": "POST",
  "enabled": true,
  "auth": {
    "authType": "BASIC",
    "basicAuthConfig": {
      "username": "secretUsername",
      "password": "secret7825@!"
    }
  },
  "filter": {
    "keyToFilter": "customer_request.productId",
    "supportedValues": ["2324245", "5253642"]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks createConfig
```

With JSONata filter:

```bash
epilot webhooks createConfig --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "eventName": "CustomerRequest_Created",
  "url": "https://my-partner-service.api.com",
  "httpMethod": "POST",
  "enabled": true,
  "auth": {
    "authType": "BASIC",
    "basicAuthConfig": {
      "username": "secretUsername",
      "password": "secret7825@!"
    }
  },
  "filter": {
    "keyToFilter": "customer_request.productId",
    "supportedValues": ["2324245", "5253642"]
  }
}
```

</details>

---

### `getConfig`

Get webhook config by id

`GET /v1/webhooks/configs/{configId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |

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
epilot webhooks getConfig \
  -p configId=7hj28aasgag2gha2
```

Using positional args for path parameters:

```bash
epilot webhooks getConfig 7hj28aasgag2gha2
```

With JSONata filter:

```bash
epilot webhooks getConfig -p configId=7hj28aasgag2gha2 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "eventName": "CustomerRequest_Created",
  "url": "https://my-partner-service.api.com",
  "httpMethod": "POST",
  "enabled": true,
  "auth": {
    "authType": "BASIC",
    "basicAuthConfig": {
      "username": "secretUsername",
      "password": "secret7825@!"
    }
  },
  "filter": {
    "keyToFilter": "customer_request.productId",
    "supportedValues": ["2324245", "5253642"]
  }
}
```

</details>

---

### `updateConfig`

Update Webhook Client Config

`PUT /v1/webhooks/configs/{configId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid (length 6) to identify the webhook configuration. |

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
epilot webhooks updateConfig \
  -p configId=7hj28a
```

With request body:

```bash
epilot webhooks updateConfig \
  -p configId=7hj28a \
  -d '{
  "eventName": "CustomerRequest_Created",
  "url": "https://my-partner-service.api.com",
  "httpMethod": "POST",
  "enabled": true,
  "auth": {
    "authType": "BASIC",
    "basicAuthConfig": {
      "username": "secretUsername",
      "password": "secret7825@!"
    }
  },
  "filter": {
    "keyToFilter": "customer_request.productId",
    "supportedValues": ["2324245", "5253642"]
  }
}'
```

Using positional args for path parameters:

```bash
epilot webhooks updateConfig 7hj28a
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks updateConfig -p configId=7hj28a
```

With JSONata filter:

```bash
epilot webhooks updateConfig -p configId=7hj28a --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "eventName": "CustomerRequest_Created",
  "url": "https://my-partner-service.api.com",
  "httpMethod": "POST",
  "enabled": true,
  "auth": {
    "authType": "BASIC",
    "basicAuthConfig": {
      "username": "secretUsername",
      "password": "secret7825@!"
    }
  },
  "filter": {
    "keyToFilter": "customer_request.productId",
    "supportedValues": ["2324245", "5253642"]
  }
}
```

</details>

---

### `deleteConfig`

Delete Webhook Client Config

`DELETE /v1/webhooks/configs/{configId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Id of the config to de deleted. |

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
epilot webhooks deleteConfig \
  -p configId=CustomerRequest
```

Using positional args for path parameters:

```bash
epilot webhooks deleteConfig CustomerRequest
```

With JSONata filter:

```bash
epilot webhooks deleteConfig -p configId=CustomerRequest --jsonata '$'
```

---

### `triggerWebhook`

Trigger a webhook

`POST /v1/webhooks/configs/{configId}/trigger`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `sync` | query | boolean | No | If set to true, the webhook will be triggered synchronously. Otherwise, it will be triggered asynchronously. |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |

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
epilot webhooks triggerWebhook \
  -p configId=7hj28aasgag2gha2
```

With request body:

```bash
epilot webhooks triggerWebhook \
  -p configId=7hj28aasgag2gha2 \
  -d '{
  "metadata": {
    "action": "Manual triggered by user with id 123456",
    "origin": "string",
    "creation_timestamp": "string",
    "webhook_id": "string",
    "webhook_name": "string",
    "automation_name": "string",
    "organization_id": "string",
    "user_id": "string",
    "correlation_id": "string",
    "execution_id": "string",
    "action_id": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot webhooks triggerWebhook 7hj28aasgag2gha2
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks triggerWebhook -p configId=7hj28aasgag2gha2
```

With JSONata filter:

```bash
epilot webhooks triggerWebhook -p configId=7hj28aasgag2gha2 --jsonata 'status_code'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status_code": "string",
  "message": "string",
  "body": {},
  "code": "string",
  "status": "succeeded",
  "start_date": "string",
  "end_date": "string",
  "event_id": "string"
}
```

</details>

---

### `batchReplayEvents`

Replay a batch of webhook events

`POST /v1/webhooks/configs/{configId}/events/replay-batch`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |

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
epilot webhooks batchReplayEvents \
  -p configId=7hj28aasgag2gha2 \
  -d '{"eventIds":["2f1b7cf8-ff55-4359-966f-e56f39a52c94","48c984bf-466b-470b-b743-d07cea168243"]}'
```

Using positional args for path parameters:

```bash
epilot webhooks batchReplayEvents 7hj28aasgag2gha2
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks batchReplayEvents -p configId=7hj28aasgag2gha2
```

With JSONata filter:

```bash
epilot webhooks batchReplayEvents -p configId=7hj28aasgag2gha2 --jsonata '$'
```

---

### `getEventById`

Get a webhook event by its id

`GET /v1/webhooks/configs/{configId}/events/{eventId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |
| `eventId` | path | string | Yes | Event id |

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
epilot webhooks getEventById \
  -p configId=7hj28aasgag2gha2 \
  -p eventId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot webhooks getEventById 7hj28aasgag2gha2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot webhooks getEventById -p configId=7hj28aasgag2gha2 -p eventId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'event_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "event_id": "string",
  "org_id": "string",
  "webhook_config_id": "string",
  "url": "string",
  "created_at": "2021-04-27T12:01:13.000Z",
  "event_name": "string",
  "http_response": {
    "status_code": 0,
    "message": "string",
    "body": {},
    "code": "string"
  },
  "metadata": {
    "action": "Manual triggered by user with id 123456",
    "origin": "string",
    "creation_timestamp": "string",
    "webhook_id": "string",
    "webhook_name": "string",
    "automation_name": "string",
    "organization_id": "string",
    "user_id": "string",
    "correlation_id": "string",
    "execution_id": "string",
    "action_id": "string"
  },
  "status": "succeeded",
  "http_method": "GET",
  "payload": "string"
}
```

</details>

---

### `replayEvent`

Replay a webhook event

`POST /v1/webhooks/configs/{configId}/events/{eventId}/replay`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |
| `eventId` | path | string | Yes | Event id |

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
epilot webhooks replayEvent \
  -p configId=7hj28aasgag2gha2 \
  -p eventId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot webhooks replayEvent 7hj28aasgag2gha2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot webhooks replayEvent -p configId=7hj28aasgag2gha2 -p eventId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getWebhookExample`

Generate an example payload for a webhook configuration based on trigger type

`POST /v1/webhooks/configs/{configId}/example`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |

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
epilot webhooks getWebhookExample \
  -p configId=7hj28aasgag2gha2 \
  -d '{"automation_id":"automation_123"}'
```

Using positional args for path parameters:

```bash
epilot webhooks getWebhookExample 7hj28aasgag2gha2
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks getWebhookExample -p configId=7hj28aasgag2gha2
```

With JSONata filter:

```bash
epilot webhooks getWebhookExample -p configId=7hj28aasgag2gha2 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "metadata": {
    "action": "Manual triggered by user with id 123456",
    "origin": "string",
    "creation_timestamp": "string",
    "webhook_id": "string",
    "webhook_name": "string",
    "automation_name": "string",
    "organization_id": "string",
    "user_id": "string",
    "correlation_id": "string",
    "execution_id": "string",
    "action_id": "string"
  },
  "entity": {},
  "relations": [
    {}
  ]
}
```

</details>

---

### `getWebhookEventsV2`

List webhook events and filter them by status, timestamp, etc.

`POST /v2/webhooks/configs/{configId}/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `configId` | path | string | Yes | Short uuid to identify the webhook configuration. |

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
epilot webhooks getWebhookEventsV2 \
  -p configId=7hj28aasgag2gha2
```

With request body:

```bash
epilot webhooks getWebhookEventsV2 \
  -p configId=7hj28aasgag2gha2 \
  -d '{
  "limit": 25,
  "cursor": {
    "created_at": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  },
  "timestamp": {
    "from": "2025-10-01T00:00:00Z",
    "to": "2025-10-31T23:59:59Z"
  },
  "event_id": "evt_1234567890abcdef",
  "status": "succeeded"
}'
```

Using positional args for path parameters:

```bash
epilot webhooks getWebhookEventsV2 7hj28aasgag2gha2
```

Using stdin pipe:

```bash
cat body.json | epilot webhooks getWebhookEventsV2 -p configId=7hj28aasgag2gha2
```

With JSONata filter:

```bash
epilot webhooks getWebhookEventsV2 -p configId=7hj28aasgag2gha2 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "event_id": "string",
      "org_id": "string",
      "webhook_config_id": "string",
      "url": "string",
      "created_at": "2021-04-27T12:01:13.000Z",
      "event_name": "string",
      "http_response": {
        "status_code": 0,
        "message": "string",
        "body": {},
        "code": "string"
      },
      "metadata": {
        "action": "Manual triggered by user with id 123456",
        "origin": "string",
        "creation_timestamp": "string",
        "webhook_id": "string",
        "webhook_name": "string",
        "automation_name": "string",
        "organization_id": "string",
        "user_id": "string",
        "correlation_id": "string",
        "execution_id": "string",
        "action_id": "string"
      },
      "status": "succeeded",
      "http_method": "GET",
      "payload": "string"
    }
  ],
  "next_cursor": {
    "created_at": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  },
  "has_more": true
}
```

</details>

---

## Deprecated Operations

- ~~`getWehookEvents`~~ GET `/v1/webhooks/configs/{configId}/events`
