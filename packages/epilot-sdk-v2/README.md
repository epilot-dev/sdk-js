# @epilot/sdk

Single-package epilot SDK with all API clients. Registry-based architecture with lazy-loaded OpenAPI specs, full types, tree-shakeable imports, and overrides.

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

Operations are forwarded to a lazy singleton — the OpenAPI spec is loaded and the client initialized on first use, then cached.

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

### Interceptors

Use interceptors for custom request/response processing:

```ts
import { epilot } from '@epilot/sdk'

epilot.interceptors.request((config) => {
  config.headers['x-trace-id'] = generateTraceId()
  return config
})
```

### Backend Internal Calls (Pass Headers)

```ts
import { epilot } from '@epilot/sdk'

const setupInternalClient = (incomingHeaders: Record<string, string>) => {
  epilot.authorize(() => incomingHeaders.authorization.replace('Bearer ', ''))

  epilot.headers({
    'x-ivy-org-id': incomingHeaders['x-ivy-org-id'],
    'x-epilot-org-id': incomingHeaders['x-epilot-org-id'],
    'x-epilot-user-id': incomingHeaders['x-epilot-user-id'],
  })
}
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

### CLI

```bash
# Apply all overrides from .epilot/sdk-overrides.json
npx epilot-sdk override

# Override a single API
npx epilot-sdk override entity ./my-local-entity-spec.yaml

# Regenerate types after spec changes
npx epilot-sdk typegen
```

## Migration from `@epilot/*-client`

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

// After (Client, OperationMethods, PathsDictionary are re-exported)
import type { Client } from '@epilot/sdk/entity'
```

## API Reference

Full API documentation: [https://docs.epilot.io/api](https://docs.epilot.io/api)

See [docs/index.md](./docs/index.md) for a full list of all 46 API clients with their operations.

## Available APIs

| API | Import | Docs |
| --- | ------ | ---- |
| `epilot.accessToken` | `@epilot/sdk/access-token` | [docs](./docs/access-token.md) |
| `epilot.address` | `@epilot/sdk/address` | [docs](./docs/address.md) |
| `epilot.addressSuggestions` | `@epilot/sdk/address-suggestions` | [docs](./docs/address-suggestions.md) |
| `epilot.aiAgents` | `@epilot/sdk/ai-agents` | [docs](./docs/ai-agents.md) |
| `epilot.app` | `@epilot/sdk/app` | [docs](./docs/app.md) |
| `epilot.auditLogs` | `@epilot/sdk/audit-logs` | [docs](./docs/audit-logs.md) |
| `epilot.automation` | `@epilot/sdk/automation` | [docs](./docs/automation.md) |
| `epilot.billing` | `@epilot/sdk/billing` | [docs](./docs/billing.md) |
| `epilot.blueprintManifest` | `@epilot/sdk/blueprint-manifest` | [docs](./docs/blueprint-manifest.md) |
| `epilot.consent` | `@epilot/sdk/consent` | [docs](./docs/consent.md) |
| `epilot.customerPortal` | `@epilot/sdk/customer-portal` | [docs](./docs/customer-portal.md) |
| `epilot.dataManagement` | `@epilot/sdk/data-management` | [docs](./docs/data-management.md) |
| `epilot.deduplication` | `@epilot/sdk/deduplication` | [docs](./docs/deduplication.md) |
| `epilot.design` | `@epilot/sdk/design` | [docs](./docs/design.md) |
| `epilot.discussion` | `@epilot/sdk/discussion` | [docs](./docs/discussion.md) |
| `epilot.document` | `@epilot/sdk/document` | [docs](./docs/document.md) |
| `epilot.emailSettings` | `@epilot/sdk/email-settings` | [docs](./docs/email-settings.md) |
| `epilot.emailTemplate` | `@epilot/sdk/email-template` | [docs](./docs/email-template.md) |
| `epilot.entity` | `@epilot/sdk/entity` | [docs](./docs/entity.md) |
| `epilot.entityMapping` | `@epilot/sdk/entity-mapping` | [docs](./docs/entity-mapping.md) |
| `epilot.environments` | `@epilot/sdk/environments` | [docs](./docs/environments.md) |
| `epilot.erpIntegration` | `@epilot/sdk/erp-integration` | [docs](./docs/erp-integration.md) |
| `epilot.eventCatalog` | `@epilot/sdk/event-catalog` | [docs](./docs/event-catalog.md) |
| `epilot.file` | `@epilot/sdk/file` | [docs](./docs/file.md) |
| `epilot.iban` | `@epilot/sdk/iban` | [docs](./docs/iban.md) |
| `epilot.journey` | `@epilot/sdk/journey` | [docs](./docs/journey.md) |
| `epilot.kanban` | `@epilot/sdk/kanban` | [docs](./docs/kanban.md) |
| `epilot.message` | `@epilot/sdk/message` | [docs](./docs/message.md) |
| `epilot.metering` | `@epilot/sdk/metering` | [docs](./docs/metering.md) |
| `epilot.notes` | `@epilot/sdk/notes` | [docs](./docs/notes.md) |
| `epilot.notification` | `@epilot/sdk/notification` | [docs](./docs/notification.md) |
| `epilot.organization` | `@epilot/sdk/organization` | [docs](./docs/organization.md) |
| `epilot.partnerDirectory` | `@epilot/sdk/partner-directory` | [docs](./docs/partner-directory.md) |
| `epilot.permissions` | `@epilot/sdk/permissions` | [docs](./docs/permissions.md) |
| `epilot.pricing` | `@epilot/sdk/pricing` | [docs](./docs/pricing.md) |
| `epilot.pricingTier` | `@epilot/sdk/pricing-tier` | [docs](./docs/pricing-tier.md) |
| `epilot.purpose` | `@epilot/sdk/purpose` | [docs](./docs/purpose.md) |
| `epilot.sandbox` | `@epilot/sdk/sandbox` | [docs](./docs/sandbox.md) |
| `epilot.submission` | `@epilot/sdk/submission` | [docs](./docs/submission.md) |
| `epilot.targeting` | `@epilot/sdk/targeting` | [docs](./docs/targeting.md) |
| `epilot.templateVariables` | `@epilot/sdk/template-variables` | [docs](./docs/template-variables.md) |
| `epilot.user` | `@epilot/sdk/user` | [docs](./docs/user.md) |
| `epilot.validationRules` | `@epilot/sdk/validation-rules` | [docs](./docs/validation-rules.md) |
| `epilot.webhooks` | `@epilot/sdk/webhooks` | [docs](./docs/webhooks.md) |
| `epilot.workflow` | `@epilot/sdk/workflow` | [docs](./docs/workflow.md) |
| `epilot.workflowDefinition` | `@epilot/sdk/workflow-definition` | [docs](./docs/workflow-definition.md) |
