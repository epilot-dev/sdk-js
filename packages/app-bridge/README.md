# @epilot/app-bridge

Extend epilot XRM with custom App UI components embedded in iframes.

```bash
npm i @epilot/app-bridge
```

## Overview

App Bridge enables communication between epilot apps embedded in iframes and the parent epilot application. It provides:

- **Authentication** - Receive OAuth tokens for epilot API calls
- **Localization** - Access user's language preference
- **Context** - Get entity or action configuration data
- **Messaging** - Two-way communication with the parent app

## Quick Start

```typescript
import { initialize, getEntityContext, updateContentHeight } from '@epilot/app-bridge';

async function main() {
  // Initialize and get authentication
  const { token, lang } = await initialize();

  // Configure your API client
  apiClient.setAuthToken(token);

  // Get entity context (for entity surfaces)
  const { entityId, schema } = await getEntityContext();

  // Fetch and render data
  const entity = await apiClient.getEntity(schema, entityId);
  render(entity);

  // Update iframe height
  updateContentHeight(document.body.scrollHeight);
}

main();
```

## Surfaces

App Bridge supports different "surfaces" - contexts where your app can be embedded within epilot.

### Entity Capability

A collapsible section within an entity detail view.

```typescript
import { initialize, getEntityContext, updateContentHeight } from '@epilot/app-bridge';

const { token } = await initialize();
const { entityId, schema, capability } = await getEntityContext();

// entityId: "a1b2c3d4-..."
// schema: "contact" | "order" | ...
// capability: { name: "my-capability", app_id: "..." }
```

**Context Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | `string` | The entity ID being viewed |
| `schema` | `string` | Entity schema slug (e.g., `'contact'`, `'order'`) |
| `capability` | `EntityCapability` | Capability configuration from app manifest |
| `capability.name` | `string?` | Capability identifier |
| `capability.app_id` | `string?` | Associated app ID |

### Entity Tab

A tab within the entity detail view.

```typescript
import { initialize, getEntityContext, onVisibilityChange } from '@epilot/app-bridge';

const { token } = await initialize();
const { entityId, schema, isVisible } = await getEntityContext();

// Subscribe to visibility changes
onVisibilityChange((visible) => {
  if (visible) {
    refreshData(); // Refresh when tab becomes visible
  }
});
```

**Context Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | `string` | The entity ID being viewed |
| `schema` | `string` | Entity schema slug |
| `capability` | `EntityCapability` | Capability configuration |
| `isVisible` | `boolean` | Whether the tab is currently visible/active |

### Flow Action Config

Configuration UI for custom automation actions.

```typescript
import { initialize, getActionConfig, updateActionConfig } from '@epilot/app-bridge';

interface MyActionConfig {
  webhookUrl: string;
  enabled: boolean;
}

const { token } = await initialize();
const config = await getActionConfig<MyActionConfig>();

// Read existing config
console.log(config.custom_action_config?.webhookUrl);

// Update config when user makes changes
updateActionConfig<MyActionConfig>({
  webhookUrl: 'https://example.com/webhook',
  enabled: true,
});

// For async actions that need callback
updateActionConfig(
  { webhookUrl: 'https://example.com' },
  { waitForCallback: true }
);
```

**Config Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `config.custom_action_config` | `T` | Custom configuration set by your app |
| `config.description` | `string?` | Action description |
| `config.app_id` | `string?` | Associated app ID |

**Update Options:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `T` | New configuration values |
| `waitForCallback` | `boolean?` | If true, automation waits for async callback |

## API Reference

### Initialization

#### `initialize(options?): Promise<AppBridgeSession>`

Initialize the app bridge and get authentication data.

```typescript
const { token, lang } = await initialize();
// token: OAuth access token for epilot APIs
// lang: User's language preference ('en', 'de', etc.)
```

Options:
- `contentHeight?: number` - Initial content height (default: `document.body.scrollHeight`)
- `timeout?: number` - Timeout in ms (default: 5000)

#### `getSession(): AppBridgeSession`

Get the current session (throws if not initialized).

```typescript
const { token, lang } = getSession();
```

#### `isInitialized(): boolean`

Check if the app bridge has been initialized.

```typescript
if (!isInitialized()) {
  await initialize();
}
```

### Entity Surface API

#### `getEntityContext(options?): Promise<EntityContext>`

Get the entity context for entity tab/capability surfaces.

```typescript
const { entityId, schema, capability, isVisible } = await getEntityContext();
```

#### `updateContentHeight(height: number): void`

Update the content height reported to the parent app.

```typescript
// After rendering content
updateContentHeight(document.body.scrollHeight);

// With ResizeObserver for dynamic content
const observer = new ResizeObserver((entries) => {
  updateContentHeight(entries[0].contentRect.height);
});
observer.observe(document.getElementById('app'));
```

#### `onVisibilityChange(handler): Unsubscribe`

Subscribe to visibility changes (for entity tabs).

```typescript
const unsubscribe = onVisibilityChange((isVisible) => {
  if (isVisible) {
    refreshData();
  }
});

// Cleanup
unsubscribe();
```

### Action Config API

#### `getActionConfig<T>(options?): Promise<ActionConfig<T>>`

Get the action configuration for automation surfaces.

```typescript
interface ZapierConfig {
  subscriptionId: string;
}

const config = await getActionConfig<ZapierConfig>();
console.log(config.custom_action_config?.subscriptionId);
```

#### `updateActionConfig<T>(config, options?): void`

Update the action configuration.

```typescript
updateActionConfig({ subscriptionId: 'sub-123' });

// With async callback
updateActionConfig(
  { subscriptionId: 'sub-123' },
  { waitForCallback: true }
);
```

### Generic Event API

For custom events not covered by the high-level API.

#### `on<T>(event, handler): Unsubscribe`

Subscribe to custom events.

```typescript
const unsubscribe = on<{ action: string }>('custom-event', (data) => {
  console.log(data.action);
});
```

#### `send(event, data?): void`

Send custom messages.

```typescript
send('custom-response', { value: 42 });
```

## Client Authorization

Easily authorize any `@epilot/*-client` package from sdk-js:

```typescript
import { getClient } from '@epilot/file-client';
import { initialize, authorizeClient } from '@epilot/app-bridge';

// Initialize and get session
const session = await initialize();

// Create and authorize client
const fileClient = getClient();
authorizeClient(fileClient, session);

// Now the client is authorized for API calls
await fileClient.uploadFile(...);
```

You can also pass just the token string:

```typescript
import { getClient } from '@epilot/entity-client';
import { getSession, authorizeClient } from '@epilot/app-bridge';

const entityClient = getClient();
authorizeClient(entityClient, getSession().token);
```

### Authorizing Multiple Clients

```typescript
import { getClient as getFileClient } from '@epilot/file-client';
import { getClient as getEntityClient } from '@epilot/entity-client';
import { initialize, authorizeClient } from '@epilot/app-bridge';

const session = await initialize();

const fileClient = getFileClient();
const entityClient = getEntityClient();

// Authorize all clients with the same session
authorizeClient(fileClient, session);
authorizeClient(entityClient, session);
```

## Legacy API

For backwards compatibility, the low-level API is still available:

```typescript
import { init, epilot } from '@epilot/app-bridge';

init();

epilot.subscribeToParentMessages('app-bridge:init', (event) => {
  const { token, lang } = event.data;
});

epilot.sendMessageToParent('custom-event', { value: 42 });
```

## Error Handling

```typescript
import {
  initialize,
  AppBridgeTimeoutError,
  AppBridgeNotInitializedError,
} from '@epilot/app-bridge';

try {
  await initialize({ timeout: 3000 });
} catch (error) {
  if (error instanceof AppBridgeTimeoutError) {
    console.error('Initialization timed out');
  }
}

try {
  getSession();
} catch (error) {
  if (error instanceof AppBridgeNotInitializedError) {
    await initialize();
  }
}
```

## TypeScript Support

All types are exported for TypeScript users:

```typescript
import type {
  AppBridgeSession,
  EntityContext,
  EntityCapability,
  ActionConfig,
  InitOptions,
  RequestOptions,
  UpdateConfigOptions,
} from '@epilot/app-bridge';
```

## Complete Examples

### Entity Capability App

```typescript
import { initialize, getEntityContext, updateContentHeight } from '@epilot/app-bridge';

async function main() {
  // Initialize
  const { token, lang } = await initialize();

  // Setup API client
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  i18n.changeLanguage(lang);

  // Get entity context
  const { entityId, schema } = await getEntityContext();

  // Fetch and display data
  const entity = await apiClient.get(`/entities/${schema}/${entityId}`);
  renderEntity(entity.data);

  // Handle dynamic height
  const observer = new ResizeObserver((entries) => {
    updateContentHeight(entries[0].contentRect.height);
  });
  observer.observe(document.getElementById('app')!);
}

main().catch(console.error);
```

### Automation Action Config App

```typescript
import { initialize, getActionConfig, updateActionConfig } from '@epilot/app-bridge';

interface WebhookConfig {
  url: string;
  headers: Record<string, string>;
}

async function main() {
  const { token } = await initialize();

  // Load existing config
  const { custom_action_config } = await getActionConfig<WebhookConfig>();

  // Render form with existing values
  const urlInput = document.getElementById('url') as HTMLInputElement;
  urlInput.value = custom_action_config?.url ?? '';

  // Handle form changes
  urlInput.addEventListener('change', () => {
    updateActionConfig<WebhookConfig>({
      url: urlInput.value,
      headers: custom_action_config?.headers ?? {},
    });
  });
}

main().catch(console.error);
```

## License

MIT
