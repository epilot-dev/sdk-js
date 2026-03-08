<h1 align="center"><img alt="epilot" src="./logo.png" width="200"><br>epilot SDK</h1>

<p align="center">
  <a href="https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI"><img src="https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@epilot/sdk"><img src="https://img.shields.io/npm/v/@epilot/sdk.svg" alt="npm version"></a>
  <a href="https://github.com/epilot-dev/sdk-js/blob/main/"><img src="http://img.shields.io/:license-mit-blue.svg" alt="License"></a>
</p>

<p align="center">JavaScript/TypeScript SDK for epilot APIs. Full types, tree-shakeable imports, and lazy-loaded OpenAPI specs.</p>

Full API documentation: [https://docs.epilot.io/api](https://docs.epilot.io/api)

## Install

```bash
npm i @epilot/sdk axios openapi-client-axios
```

## Quick Start

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-bearer-token>')

const { data: entity } = await epilot.entity.createEntity(
  { slug: 'contact' },
  { first_name: 'John', last_name: 'Doe' },
)

const { data: file } = await epilot.file.getFile({ id: 'file-123' })

const { data: executions } = await epilot.workflow.getExecutions()
```

API clients are built on [openapi-client-axios](https://openapistack.co/docs/openapi-client-axios/intro/), which generates fully typed operation methods on top of regular [axios](https://axios-http.com/docs/intro) instances. All standard axios features (interceptors, defaults, config) work as expected. Each operation is forwarded to a lazy singleton — the spec is loaded and the client initialized on first use, then cached.

## API Reference

| API | Import | Docs |
| --- | ------ | ---- |
| `epilot.accessToken` | `@epilot/sdk/access-token` | [docs](./packages/epilot-sdk-v2/docs/access-token.md) |
| `epilot.address` | `@epilot/sdk/address` | [docs](./packages/epilot-sdk-v2/docs/address.md) |
| `epilot.addressSuggestions` | `@epilot/sdk/address-suggestions` | [docs](./packages/epilot-sdk-v2/docs/address-suggestions.md) |
| `epilot.aiAgents` | `@epilot/sdk/ai-agents` | [docs](./packages/epilot-sdk-v2/docs/ai-agents.md) |
| `epilot.app` | `@epilot/sdk/app` | [docs](./packages/epilot-sdk-v2/docs/app.md) |
| `epilot.auditLogs` | `@epilot/sdk/audit-logs` | [docs](./packages/epilot-sdk-v2/docs/audit-logs.md) |
| `epilot.automation` | `@epilot/sdk/automation` | [docs](./packages/epilot-sdk-v2/docs/automation.md) |
| `epilot.billing` | `@epilot/sdk/billing` | [docs](./packages/epilot-sdk-v2/docs/billing.md) |
| `epilot.blueprintManifest` | `@epilot/sdk/blueprint-manifest` | [docs](./packages/epilot-sdk-v2/docs/blueprint-manifest.md) |
| `epilot.consent` | `@epilot/sdk/consent` | [docs](./packages/epilot-sdk-v2/docs/consent.md) |
| `epilot.customerPortal` | `@epilot/sdk/customer-portal` | [docs](./packages/epilot-sdk-v2/docs/customer-portal.md) |
| `epilot.dataManagement` | `@epilot/sdk/data-management` | [docs](./packages/epilot-sdk-v2/docs/data-management.md) |
| `epilot.deduplication` | `@epilot/sdk/deduplication` | [docs](./packages/epilot-sdk-v2/docs/deduplication.md) |
| `epilot.design` | `@epilot/sdk/design` | [docs](./packages/epilot-sdk-v2/docs/design.md) |
| `epilot.discussion` | `@epilot/sdk/discussion` | [docs](./packages/epilot-sdk-v2/docs/discussion.md) |
| `epilot.document` | `@epilot/sdk/document` | [docs](./packages/epilot-sdk-v2/docs/document.md) |
| `epilot.emailSettings` | `@epilot/sdk/email-settings` | [docs](./packages/epilot-sdk-v2/docs/email-settings.md) |
| `epilot.emailTemplate` | `@epilot/sdk/email-template` | [docs](./packages/epilot-sdk-v2/docs/email-template.md) |
| `epilot.entity` | `@epilot/sdk/entity` | [docs](./packages/epilot-sdk-v2/docs/entity.md) |
| `epilot.entityMapping` | `@epilot/sdk/entity-mapping` | [docs](./packages/epilot-sdk-v2/docs/entity-mapping.md) |
| `epilot.environments` | `@epilot/sdk/environments` | [docs](./packages/epilot-sdk-v2/docs/environments.md) |
| `epilot.erpIntegration` | `@epilot/sdk/erp-integration` | [docs](./packages/epilot-sdk-v2/docs/erp-integration.md) |
| `epilot.eventCatalog` | `@epilot/sdk/event-catalog` | [docs](./packages/epilot-sdk-v2/docs/event-catalog.md) |
| `epilot.file` | `@epilot/sdk/file` | [docs](./packages/epilot-sdk-v2/docs/file.md) |
| `epilot.iban` | `@epilot/sdk/iban` | [docs](./packages/epilot-sdk-v2/docs/iban.md) |
| `epilot.journey` | `@epilot/sdk/journey` | [docs](./packages/epilot-sdk-v2/docs/journey.md) |
| `epilot.kanban` | `@epilot/sdk/kanban` | [docs](./packages/epilot-sdk-v2/docs/kanban.md) |
| `epilot.message` | `@epilot/sdk/message` | [docs](./packages/epilot-sdk-v2/docs/message.md) |
| `epilot.metering` | `@epilot/sdk/metering` | [docs](./packages/epilot-sdk-v2/docs/metering.md) |
| `epilot.notes` | `@epilot/sdk/notes` | [docs](./packages/epilot-sdk-v2/docs/notes.md) |
| `epilot.notification` | `@epilot/sdk/notification` | [docs](./packages/epilot-sdk-v2/docs/notification.md) |
| `epilot.organization` | `@epilot/sdk/organization` | [docs](./packages/epilot-sdk-v2/docs/organization.md) |
| `epilot.partnerDirectory` | `@epilot/sdk/partner-directory` | [docs](./packages/epilot-sdk-v2/docs/partner-directory.md) |
| `epilot.permissions` | `@epilot/sdk/permissions` | [docs](./packages/epilot-sdk-v2/docs/permissions.md) |
| `epilot.pricing` | `@epilot/sdk/pricing` | [docs](./packages/epilot-sdk-v2/docs/pricing.md) |
| `epilot.pricingTier` | `@epilot/sdk/pricing-tier` | [docs](./packages/epilot-sdk-v2/docs/pricing-tier.md) |
| `epilot.purpose` | `@epilot/sdk/purpose` | [docs](./packages/epilot-sdk-v2/docs/purpose.md) |
| `epilot.sandbox` | `@epilot/sdk/sandbox` | [docs](./packages/epilot-sdk-v2/docs/sandbox.md) |
| `epilot.submission` | `@epilot/sdk/submission` | [docs](./packages/epilot-sdk-v2/docs/submission.md) |
| `epilot.targeting` | `@epilot/sdk/targeting` | [docs](./packages/epilot-sdk-v2/docs/targeting.md) |
| `epilot.templateVariables` | `@epilot/sdk/template-variables` | [docs](./packages/epilot-sdk-v2/docs/template-variables.md) |
| `epilot.user` | `@epilot/sdk/user` | [docs](./packages/epilot-sdk-v2/docs/user.md) |
| `epilot.validationRules` | `@epilot/sdk/validation-rules` | [docs](./packages/epilot-sdk-v2/docs/validation-rules.md) |
| `epilot.webhooks` | `@epilot/sdk/webhooks` | [docs](./packages/epilot-sdk-v2/docs/webhooks.md) |
| `epilot.workflow` | `@epilot/sdk/workflow` | [docs](./packages/epilot-sdk-v2/docs/workflow.md) |
| `epilot.workflowDefinition` | `@epilot/sdk/workflow-definition` | [docs](./packages/epilot-sdk-v2/docs/workflow-definition.md) |

## Packages

| Package | Description |
| ------- | ----------- |
| [`@epilot/sdk`](./packages/epilot-sdk-v2) | JavaScript/TypeScript SDK for epilot APIs |
| [`@epilot/app-sdk`](./packages/app-sdk) | SDK to build Apps for epilot XRM |
| [`@epilot/app-bridge`](./packages/app-bridge) | App bridge for communication between epilot apps and the host |

## Codebase Structure

```
sdk-js/
├── clients/                    # 46 API client packages (source specs + types)
├── packages/
│   ├── epilot-sdk-v2/          # @epilot/sdk
│   ├── app-sdk/                # @epilot/app-sdk
│   └── app-bridge/             # @epilot/app-bridge
└── scripts/                    # code generation scripts
```

## Explicit Client Access

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-token>')

// Get the cached singleton client
const entityClient = await epilot.entity.getClient()
const { data } = await entityClient.getEntity({ slug: 'contact', id: '123' })

// Create a fresh (non-singleton) client instance
const freshClient = await epilot.entity.createClient()
authorize(freshClient, () => '<my-token>')
```

## Tree-Shakeable Imports

Import only what you need. Other APIs never touch your bundle.

```ts
import { getClient, authorize } from '@epilot/sdk/entity'

const entityClient = await getClient()
authorize(entityClient, () => '<my-token>')

const { data } = await entityClient.getEntity({ slug: 'contact', id: '123' })

// Or use the handle for direct operation forwarding
import { entity } from '@epilot/sdk/entity'
const { data } = await entity.getEntity({ slug: 'contact', id: '123' })
```

## Types

Each API subpath re-exports all schema types generated from the OpenAPI spec. Import them directly:

```ts
import type { Entity, EntitySchema, RelationAttribute } from '@epilot/sdk/entity'
import type { FileItem } from '@epilot/sdk/file'
import type { AutomationFlow } from '@epilot/sdk/automation'
```

The `Client`, `OperationMethods`, and `PathsDictionary` types are also available for typing client instances:

```ts
import type { Client } from '@epilot/sdk/entity'

const entityClient: Client = await epilot.entity.getClient()
```

## Headers

### Global Headers

Set default headers applied to all clients. Useful for `x-epilot-org-id`, `x-epilot-user-id`, etc.

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-token>')
epilot.headers({
  'x-epilot-org-id': 'org-123',
  'x-epilot-user-id': 'user-456',
})

const { data } = await epilot.entity.searchEntities(...)
```

### Standard Axios Headers

Use standard axios `defaults.headers.common` on individual clients:

```ts
const entityClient = await epilot.entity.getClient()
entityClient.defaults.headers.common['x-epilot-org-id'] = 'org-123'
```

## Auth Patterns

`authorize()` accepts a string or a function. The function form is preferred — it is called on every request, so tokens stay fresh.

```ts
import { authorize } from '@epilot/sdk'
import { getClient } from '@epilot/sdk/entity'

// Per-client — function predicate (recommended)
const entityClient = await getClient()
authorize(entityClient, () => '<my-token>')

// Per-client — async function (e.g. OAuth / session)
authorize(entityClient, async () => {
  return await getTokenFromSession()
})

// Per-client — static string (sets default header once)
authorize(entityClient, 'my-static-api-token')
```

```ts
// Global — applies to all clients resolved from the SDK
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-token>')
epilot.authorize(async () => await getTokenFromSession())
epilot.authorize('my-static-api-token')
```

## Fresh Client Instance

```ts
import { createClient, authorize } from '@epilot/sdk/entity'

const entityClient = await createClient()
authorize(entityClient, () => '<my-token>')
entityClient.defaults.headers.common['x-epilot-org-id'] = 'org-123'
```

## Multiple SDK Instances

```ts
import { createSDK } from '@epilot/sdk'

const sdk1 = createSDK()
sdk1.authorize(() => '<token-for-org-1>')
sdk1.headers({ 'x-epilot-org-id': 'org-1' })

const sdk2 = createSDK()
sdk2.authorize(() => '<token-for-org-2>')
sdk2.headers({ 'x-epilot-org-id': 'org-2' })
```


## Interceptors

Use axios interceptors for custom request/response processing. Since clients are axios instances, you can use `client.interceptors` directly:

```ts
entityClient.interceptors.response.use((response) => {
  console.debug(`${response.config.method?.toUpperCase()} ${response.config.url}`, {
    status: response.status,
    data: response.data,
  })
  return response
})
```

Or register global interceptors applied to all clients:

```ts
epilot.interceptors.request((config) => {
  config.headers['x-correlation-id'] = generateTraceId()
  return config
})
```

## Auto-Retry (429 Too Many Requests)

The SDK automatically retries requests that receive a `429 Too Many Requests` response. It respects the `Retry-After` header (in seconds) to determine how long to wait before retrying.

Enabled by default with up to 3 retries.

```ts
import { epilot } from '@epilot/sdk'

// Customize retry behavior
epilot.retry({ maxRetries: 5, defaultDelayMs: 2000 })

// Disable retries
epilot.retry({ maxRetries: 0 })
```

| Option | Default | Description |
| --- | --- | --- |
| `maxRetries` | `3` | Maximum number of retries. Set to `0` to disable. |
| `defaultDelayMs` | `1000` | Fallback delay in ms when `Retry-After` header is missing. |

For individually imported clients (tree-shakeable imports), apply the interceptor manually:

```ts
import { getClient, authorize } from '@epilot/sdk/entity'
import { applyRetryInterceptor } from '@epilot/sdk'

const entityClient = await getClient()
authorize(entityClient, () => '<my-token>')
applyRetryInterceptor({ client: entityClient, config: { maxRetries: 3 } })
```

## Large Response Handling (413 Payload Too Large)

epilot APIs use a [large response middleware](https://github.com/epilot-dev/aws-lambda-utility-middlewares) to work around the AWS Lambda 6MB response limit. When a response exceeds ~5.1MB, the API uploads the payload to S3 and returns a presigned URL instead.

The SDK handles this transparently — it sends the opt-in `Accept` header and automatically fetches the full payload from S3 when a large response URL is returned. Enabled by default.

```ts
import { epilot } from '@epilot/sdk'

// Disable large response handling
epilot.largeResponse({ enabled: false })
```

For individually imported clients (tree-shakeable imports), apply the interceptor manually:

```ts
import { getClient, authorize } from '@epilot/sdk/entity'
import { applyLargeResponseInterceptor } from '@epilot/sdk'

const entityClient = await getClient()
authorize(entityClient, () => '<my-token>')
applyLargeResponseInterceptor({ client: entityClient, config: { enabled: true } })
```

## Overrides & Custom APIs

Override built-in API specs or register custom APIs via `.epilot/sdk-overrides.json`. This is useful for testing new versions of an API spec or getting the latest types without waiting for an SDK release.

```json
{
  "entity": "./specs/entity-openapi.json",
  "pricing": "https://my-dev-server.com/openapi.json",
  "myNewApi": "./specs/my-new-api-openapi.json"
}
```

```ts
// Built-in API with overridden spec
const { data } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })
```

### Override Commands

```bash
# Apply all overrides from .epilot/sdk-overrides.json
npx epilot-sdk override

# Override a single API
npx epilot-sdk override entity ./my-local-entity-spec.yaml

# Regenerate types after spec changes
npx epilot-sdk typegen
```

<details>
<summary>Migration from <code>@epilot/*-client</code></summary>

### Singleton import

```ts
// Before
import { getClient } from '@epilot/entity-client'
const entityClient = getClient()

// After
import { getClient } from '@epilot/sdk/entity'
const entityClient = await getClient()
```

### Fresh client

```ts
// Before
import { createClient } from '@epilot/entity-client'
const entityClient = createClient()

// After
import { createClient } from '@epilot/sdk/entity'
const entityClient = await createClient()
```

### Types

```ts
// Before
import type { Client, Components } from '@epilot/entity-client'
type MyEntity = Components.Schemas.Entity

// After
import type { Client, Entity } from '@epilot/sdk/entity'
```

</details>

<details>
<summary>Client Lifecycle</summary>

When you call `authorize()`, `headers()`, `retry()`, `largeResponse()`, or `interceptors`, the SDK invalidates all cached client instances. The next operation call creates a fresh client with the updated configuration.

**Proxy operations are always up to date** — calls like `epilot.entity.getEntity(...)` re-resolve the client on every invocation, so they always use the latest config.

**Direct `getClient()` references can go stale** — if you hold a reference and then change config, your reference still points to the old client:

```ts
const entityClient = await epilot.entity.getClient()

epilot.authorize('new-token') // invalidates all cached clients

// entityClient still has the old token
// epilot.entity.getEntity(...) will use a new client with the new token
```

If you need a long-lived reference that survives config changes, call `getClient()` again after changing config — or use proxy operations directly.

</details>

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for internal development and publishing instructions.

