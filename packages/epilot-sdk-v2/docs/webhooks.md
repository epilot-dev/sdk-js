# Webhooks

- **Base URL:** `https://webhooks.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/webhooks](https://docs.epilot.io/api/webhooks)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.webhooks.getPublicKey(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/webhooks'

const webhooksClient = getClient()
authorize(webhooksClient, () => '<token>')
const { data } = await webhooksClient.getPublicKey(...)
```

## Operations

**webhooks**
- [`getPublicKey`](#getpublickey)
- [`getConfiguredEvents`](#getconfiguredevents)
- [`getConfigs`](#getconfigs)
- [`createConfig`](#createconfig)
- [`getConfig`](#getconfig)
- [`updateConfig`](#updateconfig)
- [`deleteConfig`](#deleteconfig)
- [`triggerWebhook`](#triggerwebhook)
- [`batchReplayEvents`](#batchreplayevents)
- [`getEventById`](#geteventbyid)
- [`replayEvent`](#replayevent)
- [`getWebhookExample`](#getwebhookexample)

**Events**
- [`getWebhookEventsV2`](#getwebhookeventsv2)

**Schemas**
- [`PublicKeyResponse`](#publickeyresponse)
- [`SearchOptions`](#searchoptions)
- [`EventListResponse`](#eventlistresponse)
- [`HttpMethod`](#httpmethod)
- [`AuthType`](#authtype)
- [`Filter`](#filter)
- [`WebhookCondition`](#webhookcondition)
- [`WebhookConditionGroup`](#webhookconditiongroup)
- [`Auth`](#auth)
- [`BasicAuthConfig`](#basicauthconfig)
- [`OAuthConfig`](#oauthconfig)
- [`ApiKeyConfig`](#apikeyconfig)
- [`WebhookConfig`](#webhookconfig)
- [`EventConfigResp`](#eventconfigresp)
- [`EventConfigEntry`](#eventconfigentry)
- [`ErrorResp`](#errorresp)
- [`TriggerWebhookResp`](#triggerwebhookresp)
- [`PayloadConfiguration`](#payloadconfiguration)
- [`CustomHeader`](#customheader)
- [`CustomOAuthParameter`](#customoauthparameter)
- [`Metadata`](#metadata)
- [`ExecutionPayload`](#executionpayload)
- [`WebhookEvent`](#webhookevent)
- [`ExampleRequest`](#examplerequest)
- [`ExampleResponse`](#exampleresponse)
- [`BatchReplayRequest`](#batchreplayrequest)

### `getPublicKey`

Returns the platform-level Ed25519 public key used to verify
asymmetric (v1a) webhook signatures. This endpoint is unauthenticated since the public key is not a secret, but the orgId parameter is requ

`GET /v1/webhooks/.well-known/public-key`

```ts
const { data } = await client.getPublicKey({
  orgId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getConfiguredEvents()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getConfigs({
  eventName: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createConfig(
  null,
  {
    eventName: 'CustomerRequest_Created',
    url: 'https://my-partner-service.api.com',
    httpMethod: 'POST',
    enabled: true,
    auth: {
      authType: 'BASIC',
      basicAuthConfig: {
        username: 'secretUsername',
        password: 'secret7825@!'
      }
    },
    filter: {
      keyToFilter: 'customer_request.productId',
      supportedValues: ['2324245', '5253642']
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getConfig({
  configId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateConfig(
  {
    configId: 'example',
  },
  {
    eventName: 'CustomerRequest_Created',
    url: 'https://my-partner-service.api.com',
    httpMethod: 'POST',
    enabled: true,
    auth: {
      authType: 'BASIC',
      basicAuthConfig: {
        username: 'secretUsername',
        password: 'secret7825@!'
      }
    },
    filter: {
      keyToFilter: 'customer_request.productId',
      supportedValues: ['2324245', '5253642']
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteConfig({
  configId: 'example',
})
```

---

### `triggerWebhook`

triggers a webhook event either async or sync

`POST /v1/webhooks/configs/{configId}/trigger`

```ts
const { data } = await client.triggerWebhook(
  {
    sync: true,
    configId: 'example',
  },
  {
    metadata: {
      action: 'Manual triggered by user with id 123456',
      origin: 'string',
      creation_timestamp: 'string',
      webhook_id: 'string',
      webhook_name: 'string',
      automation_name: 'string',
      organization_id: 'string',
      user_id: 'string',
      correlation_id: 'string',
      execution_id: 'string',
      action_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.batchReplayEvents(
  {
    configId: 'example',
  },
  {
    eventIds: ['2f1b7cf8-ff55-4359-966f-e56f39a52c94', '48c984bf-466b-470b-b743-d07cea168243']
  },
)
```

---

### `getEventById`

Get a webhook event by its id

`GET /v1/webhooks/configs/{configId}/events/{eventId}`

```ts
const { data } = await client.getEventById({
  configId: 'example',
  eventId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.replayEvent({
  configId: 'example',
  eventId: 'example',
})
```

---

### `getWebhookExample`

Generate an example payload for a webhook configuration based on trigger type

`POST /v1/webhooks/configs/{configId}/example`

```ts
const { data } = await client.getWebhookExample(
  {
    configId: 'example',
  },
  {
    automation_id: 'automation_123'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getWebhookEventsV2(
  {
    configId: 'example',
  },
  {
    limit: 25,
    cursor: {
      created_at: '2025-10-31T12:34:56Z',
      event_id: 'evt_1234567890abcdef'
    },
    timestamp: {
      from: '2025-10-01T00:00:00Z',
      to: '2025-10-31T23:59:59Z'
    },
    event_id: 'evt_1234567890abcdef',
    status: 'succeeded'
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `PublicKeyResponse`

```ts
type PublicKeyResponse = {
  public_key: string
  algorithm: string
  issuer?: string
}
```

### `SearchOptions`

```ts
type SearchOptions = {
  limit?: number
  cursor?: {
    created_at?: string // date-time
    event_id?: string
  }
  timestamp?: {
    from?: string // date-time
    to?: string // date-time
  }
  event_id?: string
  status?: "succeeded" | "failed" | "skipped"
}
```

### `EventListResponse`

```ts
type EventListResponse = {
  data?: Array<{
    event_id: string
    org_id: string
    webhook_config_id: string
    url?: string
    created_at?: string
    event_name?: string
    http_response?: {
      status_code?: { ... }
      message?: { ... }
      body?: { ... }
      code?: { ... }
    }
    metadata?: {
      action?: { ... }
      origin?: { ... }
      creation_timestamp?: { ... }
      webhook_id?: { ... }
      webhook_name?: { ... }
      automation_name?: { ... }
      organization_id: { ... }
      user_id?: { ... }
      correlation_id?: { ... }
      execution_id?: { ... }
      action_id?: { ... }
    }
    status?: "succeeded" | "failed" | "in_progress" | "skipped"
    http_method?: "GET" | "POST" | "PUT"
    payload?: string
  }>
  next_cursor?: {
    created_at?: string // date-time
    event_id?: string
  }
  has_more?: boolean
}
```

### `HttpMethod`

```ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
```

### `AuthType`

```ts
type AuthType = "BASIC" | "OAUTH_CLIENT_CREDENTIALS" | "API_KEY" | "NONE"
```

### `Filter`

```ts
type Filter = {
  keyToFilter: string
  supportedValues: string[]
}
```

### `WebhookCondition`

A condition that must be met for the webhook to fire.

```ts
type WebhookCondition = {
  field: string
  operation: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
  values?: string[]
  field_type?: "string" | "number" | "boolean" | "date" | "datetime"
  is_array_field?: boolean
  repeatable_item_op?: boolean
}
```

### `WebhookConditionGroup`

A group of conditions with a logical operator. Multiple conditions are AND-ed by default.

```ts
type WebhookConditionGroup = {
  conditions?: Array<{
    field: string
    operation: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty"
    values?: string[]
    field_type?: "string" | "number" | "boolean" | "date" | "datetime"
    is_array_field?: boolean
    repeatable_item_op?: boolean
  }>
  logical_operator?: "AND" | "OR"
}
```

### `Auth`

```ts
type Auth = {
  authType: "BASIC" | "OAUTH_CLIENT_CREDENTIALS" | "API_KEY" | "NONE"
  basicAuthConfig?: {
    username: string
    password?: string
    passwordIsEnvVar?: boolean
  }
  oauthConfig?: {
    clientId: string
    clientSecret?: string
    clientSecretIsEnvVar?: boolean
    endpoint: string
    httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
    customParameterList?: Array<{
      type: { ... }
      key: { ... }
      value: { ... }
    }>
  }
  apiKeyConfig?: {
    keyName: string
    keyValue?: string
    keyValueIsEnvVar?: boolean
  }
}
```

### `BasicAuthConfig`

To be sent only if authType is BASIC

```ts
type BasicAuthConfig = {
  username: string
  password?: string
  passwordIsEnvVar?: boolean
}
```

### `OAuthConfig`

To be sent only if authType is OAUTH_CLIENT_CREDENTIALS

```ts
type OAuthConfig = {
  clientId: string
  clientSecret?: string
  clientSecretIsEnvVar?: boolean
  endpoint: string
  httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
  customParameterList?: Array<{
    type: "body" | "query" | "header"
    key: string
    value: string
  }>
}
```

### `ApiKeyConfig`

To be sent only if authType is API_KEY

```ts
type ApiKeyConfig = {
  keyName: string
  keyValue?: string
  keyValueIsEnvVar?: boolean
}
```

### `WebhookConfig`

```ts
type WebhookConfig = {
  id?: string
  name: string
  eventName: string
  url?: string
  creationTime?: string
  httpMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
  enabled?: boolean
  auth?: {
    authType: "BASIC" | "OAUTH_CLIENT_CREDENTIALS" | "API_KEY" | "NONE"
    basicAuthConfig?: {
      username: { ... }
      password?: { ... }
      passwordIsEnvVar?: { ... }
    }
    oauthConfig?: {
      clientId: { ... }
      clientSecret?: { ... }
      clientSecretIsEnvVar?: { ... }
      endpoint: { ... }
      httpMethod: { ... }
      customParameterList?: { ... }
    }
    apiKeyConfig?: {
      keyName: { ... }
      keyValue?: { ... }
      keyValueIsEnvVar?: { ... }
    }
  }
  filter?: {
    keyToFilter: string
    supportedValues: string[]
  }
  payloadConfiguration?: {
    hydrate_entity?: boolean
    include_relations?: boolean
    include_activity?: boolean
    include_changed_attributes?: boolean
    custom_headers?: Record<string, string>
  }
  enableStaticIP?: boolean
  protected?: boolean
  secureProxy?: {
    integration_id: string // uuid
    use_case_slug: string
  }
  status?: "active" | "inactive" | "incomplete"
  jsonataExpression?: string
  filterConditions?: {
    conditions?: Array<{
      field: { ... }
      operation: { ... }
      values?: { ... }
      field_type?: { ... }
      is_array_field?: { ... }
      repeatable_item_op?: { ... }
    }>
    logical_operator?: "AND" | "OR"
  }
  _manifest?: string // uuid[]
  signingSecret?: string
}
```

### `EventConfigResp`

```ts
type EventConfigResp = Array<{
  eventName?: string
  eventLabel?: string
}>
```

### `EventConfigEntry`

```ts
type EventConfigEntry = {
  eventName?: string
  eventLabel?: string
}
```

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
}
```

### `TriggerWebhookResp`

```ts
type TriggerWebhookResp = {
  status_code?: string
  message?: string
  body?: object
  code?: string
  status?: "succeeded" | "failed"
  start_date?: string
  end_date?: string
  event_id: string
}
```

### `PayloadConfiguration`

Configuration for the webhook payload

```ts
type PayloadConfiguration = {
  hydrate_entity?: boolean
  include_relations?: boolean
  include_activity?: boolean
  include_changed_attributes?: boolean
  custom_headers?: Record<string, string>
}
```

### `CustomHeader`

Object representing custom headers as key-value pairs.

```ts
type CustomHeader = Record<string, string>
```

### `CustomOAuthParameter`

Custom key/value pair of either type body, query or header

```ts
type CustomOAuthParameter = {
  type: "body" | "query" | "header"
  key: string
  value: string
}
```

### `Metadata`

Contains the metadata about the configured event

```ts
type Metadata = {
  action?: string
  origin?: string
  creation_timestamp?: string
  webhook_id?: string
  webhook_name?: string
  automation_name?: string
  organization_id: string
  user_id?: string
  correlation_id?: string
  execution_id?: string
  action_id?: string
}
```

### `ExecutionPayload`

Payload for triggering a webhook

```ts
type ExecutionPayload = {
  metadata: {
    action?: string
    origin?: string
    creation_timestamp?: string
    webhook_id?: string
    webhook_name?: string
    automation_name?: string
    organization_id: string
    user_id?: string
    correlation_id?: string
    execution_id?: string
    action_id?: string
  }
}
```

### `WebhookEvent`

```ts
type WebhookEvent = {
  event_id: string
  org_id: string
  webhook_config_id: string
  url?: string
  created_at?: string
  event_name?: string
  http_response?: {
    status_code?: number
    message?: string
    body?: object
    code?: string
  }
  metadata?: {
    action?: string
    origin?: string
    creation_timestamp?: string
    webhook_id?: string
    webhook_name?: string
    automation_name?: string
    organization_id: string
    user_id?: string
    correlation_id?: string
    execution_id?: string
    action_id?: string
  }
  status?: "succeeded" | "failed" | "in_progress" | "skipped"
  http_method?: "GET" | "POST" | "PUT"
  payload?: string
}
```

### `ExampleRequest`

```ts
type ExampleRequest = {
  automation_id?: string
}
```

### `ExampleResponse`

```ts
type ExampleResponse = {
  metadata?: {
    action?: string
    origin?: string
    creation_timestamp?: string
    webhook_id?: string
    webhook_name?: string
    automation_name?: string
    organization_id: string
    user_id?: string
    correlation_id?: string
    execution_id?: string
    action_id?: string
  }
  entity?: Record<string, unknown>
  relations?: Record<string, unknown>[]
}
```

### `BatchReplayRequest`

```ts
type BatchReplayRequest = {
  eventIds: string[]
}
```
