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
- [`testOAuth`](#testoauth)
- [`triggerWebhook`](#triggerwebhook)
- [`batchReplayEvents`](#batchreplayevents)
- [`getEventById`](#geteventbyid)
- [`replayEvent`](#replayevent)
- [`getConfigRevisions`](#getconfigrevisions)
- [`getConfigRevision`](#getconfigrevision)
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
- [`WebhookConfigRevisionList`](#webhookconfigrevisionlist)
- [`WebhookConfigRevision`](#webhookconfigrevision)
- [`WebhookConfigRevisionDetail`](#webhookconfigrevisiondetail)
- [`WebhookConfigRevisionConflict`](#webhookconfigrevisionconflict)
- [`WebhookConfigRevisionChange`](#webhookconfigrevisionchange)
- [`WebhookEventAttempt`](#webhookeventattempt)
- [`WebhookEvent`](#webhookevent)
- [`ExampleRequest`](#examplerequest)
- [`ExampleResponse`](#exampleresponse)
- [`TestOAuthResponse`](#testoauthresponse)
- [`ReplayRequest`](#replayrequest)
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
    "name": "Customer Request Created Webhook",
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
    name: 'Customer Request Created Webhook',
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
  "name": "Customer Request Created Webhook",
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
  "name": "Customer Request Created Webhook",
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
    based_on_revision_id: 'example',
    restored_from_revision_id: 'example',
  },
  {
    name: 'Customer Request Created Webhook',
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
  "name": "Customer Request Created Webhook",
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

### `testOAuth`

Tests the OAuth client credentials configuration for a saved webhook by attempting
a token exchange against the configured OAuth endpoint. Returns success with token
metadata (e.g. expires_in, token_t

`POST /v1/webhooks/configs/{configId}/test-oauth`

```ts
const { data } = await client.testOAuth({
  configId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "success": true,
  "expires_in": 3600,
  "token_type": "Bearer",
  "message": "OAuth token exchange successful"
}
```

</details>

---

### `triggerWebhook`

Triggers a webhook event either async or sync

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
    eventIds: ['2f1b7cf8-ff55-4359-966f-e56f39a52c94', '48c984bf-466b-470b-b743-d07cea168243'],
    reapply_transform: false
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
  "payload": "string",
  "original_payload": "string",
  "retry_attempt": 0,
  "next_retry_at": "1970-01-01T00:00:00.000Z",
  "max_retry_attempts": 0,
  "attempts": [
    {
      "retry_attempt": 0,
      "status": "succeeded",
      "created_at": "2021-04-27T12:01:13.000Z",
      "status_code": 0,
      "message": "string",
      "code": "string",
      "next_retry_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "can_reapply_transform": true,
  "can_reapply_transform_reason": "available"
}
```

</details>

---

### `replayEvent`

Replay a webhook event

`POST /v1/webhooks/configs/{configId}/events/{eventId}/replay`

```ts
const { data } = await client.replayEvent(
  {
    configId: 'example',
    eventId: 'example',
  },
  {
    reapply_transform: false
  },
)
```

---

### `getConfigRevisions`

List the change history of a webhook configuration, newest first. Each revision records who made the change and which fields changed, with before/after values. Secret values (passwords, API keys, clie

`GET /v1/webhooks/configs/{configId}/revisions`

```ts
const { data } = await client.getConfigRevisions({
  configId: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "revision_id": "MjAyNi0xMS0wOVQxNDozMjowMC4wMDBaIzdoajI4YWFz",
      "created_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string",
      "source": "create",
      "restored_from": {
        "revision_id": "string",
        "created_at": "1970-01-01T00:00:00.000Z"
      },
      "changes": [
        {
          "field": "url",
          "kind": "added",
          "key": "string",
          "before": {},
          "after": {},
          "redacted": true
        }
      ],
      "truncated": true
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getConfigRevision`

One revision of a webhook configuration, including the configuration as it was after that change. Secret values are never included. Used to review or restore an earlier version.

`GET /v1/webhooks/configs/{configId}/revisions/{revisionId}`

```ts
const { data } = await client.getConfigRevision({
  configId: 'example',
  revisionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "revision_id": "MjAyNi0xMS0wOVQxNDozMjowMC4wMDBaIzdoajI4YWFz",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "source": "create",
  "restored_from": {
    "revision_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z"
  },
  "changes": [
    {
      "field": "url",
      "kind": "added",
      "key": "string",
      "before": {},
      "after": {},
      "redacted": true
    }
  ],
  "truncated": true,
  "configuration": {}
}
```

</details>

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
      "payload": "string",
      "original_payload": "string",
      "retry_attempt": 0,
      "next_retry_at": "1970-01-01T00:00:00.000Z",
      "max_retry_attempts": 0,
      "attempts": [
        {
          "retry_attempt": 0,
          "status": "succeeded",
          "created_at": "2021-04-27T12:01:13.000Z",
          "status_code": 0,
          "message": "string",
          "code": "string",
          "next_retry_at": "1970-01-01T00:00:00.000Z"
        }
      ],
      "can_reapply_transform": true,
      "can_reapply_transform_reason": "available"
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
  status?: "succeeded" | "failed" | "skipped" | "retrying"
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
    status?: "succeeded" | "failed" | "in_progress" | "skipped" | "retrying"
    http_method?: "GET" | "POST" | "PUT"
    payload?: string
    original_payload?: string
    retry_attempt?: number
    next_retry_at?: string // date-time
    max_retry_attempts?: number
    attempts?: Array<{
      retry_attempt: { ... }
      status: { ... }
      created_at?: { ... }
      status_code?: { ... }
      message?: { ... }
      code?: { ... }
      next_retry_at?: { ... }
    }>
    can_reapply_transform?: boolean
    can_reapply_transform_reason?: "available" | "no_transform_configured" | "no_original_source"
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

A condition that must be met for the webhook to fire. A condition is EITHER a classic field + operation comparison OR a single jsonata_expression evaluated against the event payload — the two forms are mutually exclusive.

```ts
type WebhookCondition = {
  field?: string
  operation?: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty" | "length_equals" | "length_not_equals" | "length_greater_than" | "length_less_than" | "length_greater_than_or_equals" | "length_less_than_or_equals"
  values?: string[]
  field_type?: "string" | "number" | "boolean" | "date" | "datetime"
  is_array_field?: boolean
  repeatable_item_op?: boolean
  jsonata_expression?: string
}
```

### `WebhookConditionGroup`

A group of conditions with a logical operator. Multiple conditions are AND-ed by default.

```ts
type WebhookConditionGroup = {
  conditions?: Array<{
    field?: string
    operation?: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty" | "length_equals" | "length_not_equals" | "length_greater_than" | "length_less_than" | "length_greater_than_or_equals" | "length_less_than_or_equals"
    values?: string[]
    field_type?: "string" | "number" | "boolean" | "date" | "datetime"
    is_array_field?: boolean
    repeatable_item_op?: boolean
    jsonata_expression?: string
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
  eventVersion?: string
  url?: string
  creationTime?: string
  updatedTime?: string
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
    apply_changesets?: boolean
    custom_headers?: Record<string, string>
  }
  enableStaticIP?: boolean
  protected?: boolean
  secureProxy?: {
    integration_id: string // uuid
    use_case_slug: string
  }
  integrationId?: string // uuid
  status?: "active" | "inactive" | "incomplete"
  jsonataExpression?: string
  deliveryMode?: "json_base64" | "binary_multipart"
  multipartConfig?: {
    fileFieldName?: string
    fileFieldStrategy?: "single" | "multi"
    fileSource?: string
    extraFields?: Record<string, string>
  }
  retryPolicy?: {
    enabled: boolean
    maxAttempts?: number
  }
  filterConditions?: {
    conditions?: Array<{
      field?: { ... }
      operation?: { ... }
      values?: { ... }
      field_type?: { ... }
      is_array_field?: { ... }
      repeatable_item_op?: { ... }
      jsonata_expression?: { ... }
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
  apply_changesets?: boolean
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

### `WebhookConfigRevisionList`

```ts
type WebhookConfigRevisionList = {
  results: Array<{
    revision_id: string
    created_at: string // date-time
    created_by?: string
    source: "create" | "update" | "restore"
    restored_from?: {
      revision_id: { ... }
      created_at: { ... }
    }
    changes: Array<{
      field: { ... }
      kind: { ... }
      key?: { ... }
      before?: { ... }
      after?: { ... }
      redacted?: { ... }
    }>
    truncated?: boolean
  }>
  next_cursor?: string
}
```

### `WebhookConfigRevision`

One saved change to a webhook configuration.

```ts
type WebhookConfigRevision = {
  revision_id: string
  created_at: string // date-time
  created_by?: string
  source: "create" | "update" | "restore"
  restored_from?: {
    revision_id: string
    created_at: string // date-time
  }
  changes: Array<{
    field: string
    kind: "added" | "removed" | "changed"
    key?: string
    before?: unknown
    after?: unknown
    redacted?: boolean
  }>
  truncated?: boolean
}
```

### `WebhookConfigRevisionDetail`

```ts
type WebhookConfigRevisionDetail = {
  revision_id: string
  created_at: string // date-time
  created_by?: string
  source: "create" | "update" | "restore"
  restored_from?: {
    revision_id: string
    created_at: string // date-time
  }
  changes: Array<{
    field: string
    kind: "added" | "removed" | "changed"
    key?: string
    before?: unknown
    after?: unknown
    redacted?: boolean
  }>
  truncated?: boolean
  configuration: Record<string, unknown>
}
```

### `WebhookConfigRevisionConflict`

```ts
type WebhookConfigRevisionConflict = {
  message: string
  latest_revision?: {
    revision_id: string
    created_at: string // date-time
    created_by?: string
    source: "create" | "update" | "restore"
    restored_from?: {
      revision_id: { ... }
      created_at: { ... }
    }
    changes: Array<{
      field: { ... }
      kind: { ... }
      key?: { ... }
      before?: { ... }
      after?: { ... }
      redacted?: { ... }
    }>
    truncated?: boolean
  }
}
```

### `WebhookConfigRevisionChange`

```ts
type WebhookConfigRevisionChange = {
  field: string
  kind: "added" | "removed" | "changed"
  key?: string
  before?: unknown
  after?: unknown
  redacted?: boolean
}
```

### `WebhookEventAttempt`

Summary of a single delivery attempt of a webhook event.

```ts
type WebhookEventAttempt = {
  retry_attempt: number
  status: "succeeded" | "failed" | "skipped" | "retrying"
  created_at?: string
  status_code?: number
  message?: string
  code?: string
  next_retry_at?: string // date-time
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
  status?: "succeeded" | "failed" | "in_progress" | "skipped" | "retrying"
  http_method?: "GET" | "POST" | "PUT"
  payload?: string
  original_payload?: string
  retry_attempt?: number
  next_retry_at?: string // date-time
  max_retry_attempts?: number
  attempts?: Array<{
    retry_attempt: number
    status: "succeeded" | "failed" | "skipped" | "retrying"
    created_at?: string
    status_code?: number
    message?: string
    code?: string
    next_retry_at?: string // date-time
  }>
  can_reapply_transform?: boolean
  can_reapply_transform_reason?: "available" | "no_transform_configured" | "no_original_source"
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

### `TestOAuthResponse`

```ts
type TestOAuthResponse = {
  success: boolean
  expires_in?: number
  token_type?: string
  message: string
}
```

### `ReplayRequest`

```ts
type ReplayRequest = {
  reapply_transform?: boolean
}
```

### `BatchReplayRequest`

```ts
type BatchReplayRequest = {
  eventIds: string[]
  reapply_transform?: boolean
}
```
