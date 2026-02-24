/**
 * @epilot/app-bridge - High-Level API
 *
 * Framework-agnostic, Promise-based API for communicating with
 * the parent epilot application.
 */

import { sendMessageToParent, subscribeToParentMessages } from './messages';
import { AppBridgeTimeoutError, AppBridgeNotInitializedError } from './errors';
import type {
  AppBridgeSession,
  InitOptions,
  RequestOptions,
  UpdateConfigOptions,
  EntityContext,
  ActionConfig,
  MessageHandler,
  VisibilityHandler,
  Unsubscribe,
} from './types';

// =============================================================================
// Module State
// =============================================================================

/** Current session data (null if not initialized) */
let session: AppBridgeSession | null = null;

/** In-flight initialization promise (for deduplication) */
let initPromise: Promise<AppBridgeSession> | null = null;

/** Default timeout for requests */
const DEFAULT_TIMEOUT = 5000;

// =============================================================================
// Internal Helpers
// =============================================================================

/**
 * Send a request and wait for a response with timeout handling.
 * @internal
 */
function request<T>(
  event: string,
  payload: Record<string, unknown> = {},
  options: RequestOptions = {},
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT } = options;

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      unsubscribe();
      reject(new AppBridgeTimeoutError(event, timeout));
    }, timeout);

    const unsubscribe = subscribeToParentMessages(event, (msgEvent: MessageEvent) => {
      clearTimeout(timeoutId);
      unsubscribe();
      // Strip internal fields (event, source) from response
      const { event: _event, source: _source, ...data } = msgEvent.data || {};
      resolve(data as T);
    });

    sendMessageToParent(event, payload);
  });
}

// =============================================================================
// Initialization
// =============================================================================

/**
 * Initialize the app bridge and establish connection with the parent app.
 *
 * Returns a session containing the authentication token and user language.
 * Safe to call multiple times - subsequent calls return the cached session.
 *
 * @param options - Initialization options
 * @returns Session data with token and language
 *
 * @example
 * ```typescript
 * import { initialize } from '@epilot/app-bridge';
 *
 * const { token, lang } = await initialize();
 *
 * // Use token for API calls
 * apiClient.setAuthToken(token);
 *
 * // Set UI language
 * i18n.setLanguage(lang);
 * ```
 */
export async function initialize(options: InitOptions = {}): Promise<AppBridgeSession> {
  // Return cached session if already initialized
  if (session) {
    return session;
  }

  // Return in-flight initialization if one exists (deduplication)
  if (initPromise) {
    return initPromise;
  }

  const contentHeight = options.contentHeight ?? document.body.scrollHeight;

  initPromise = request<AppBridgeSession>(
    'app-bridge:init',
    { contentHeight },
    { timeout: options.timeout },
  )
    .then((result) => {
      session = result;
      return result;
    })
    .catch((error) => {
      initPromise = null;
      throw error;
    });

  return initPromise;
}

/**
 * Get the current session data.
 *
 * @throws {AppBridgeNotInitializedError} If called before initialize()
 * @returns Current session data
 *
 * @example
 * ```typescript
 * import { initialize, getSession } from '@epilot/app-bridge';
 *
 * await initialize();
 *
 * // Later in the app...
 * const { token } = getSession();
 * ```
 */
export function getSession(): AppBridgeSession {
  if (!session) {
    throw new AppBridgeNotInitializedError();
  }
  return session;
}

/**
 * Check if the app bridge has been initialized.
 *
 * @returns true if initialized, false otherwise
 *
 * @example
 * ```typescript
 * if (!isInitialized()) {
 *   await initialize();
 * }
 * ```
 */
export function isInitialized(): boolean {
  return session !== null;
}

// =============================================================================
// Entity Surface API
// =============================================================================

/**
 * Get the entity context for entity tab/capability surfaces.
 *
 * Returns context including the entity ID, schema, and capability configuration.
 *
 * @param options - Request options
 * @returns Entity context data
 *
 * @example
 * ```typescript
 * import { initialize, getEntityContext } from '@epilot/app-bridge';
 *
 * await initialize();
 *
 * const { entityId, schema } = await getEntityContext();
 * console.log(`Viewing ${schema} entity: ${entityId}`);
 *
 * // Fetch entity data from API
 * const entity = await api.getEntity(schema, entityId);
 * ```
 */
export async function getEntityContext(options?: RequestOptions): Promise<EntityContext> {
  const response = await request<{ context: EntityContext }>('init-context', {}, options);
  return response.context;
}

/**
 * Update the content height reported to the parent app.
 *
 * The parent app uses this to resize the iframe appropriately.
 * Call this whenever your content height changes.
 *
 * @param height - Content height in pixels
 *
 * @example
 * ```typescript
 * import { updateContentHeight } from '@epilot/app-bridge';
 *
 * // After rendering content
 * updateContentHeight(document.body.scrollHeight);
 *
 * // Or with a specific element
 * const container = document.getElementById('app');
 * updateContentHeight(container.scrollHeight);
 * ```
 */
export function updateContentHeight(height: number): void {
  sendMessageToParent('update-content-height', { contentHeight: height });
}

/**
 * Subscribe to visibility changes (for entity tab surfaces).
 *
 * The parent app sends visibility updates when the user switches tabs.
 *
 * @param handler - Callback invoked when visibility changes
 * @returns Unsubscribe function
 *
 * @example
 * ```typescript
 * import { onVisibilityChange } from '@epilot/app-bridge';
 *
 * const unsubscribe = onVisibilityChange((isVisible) => {
 *   if (isVisible) {
 *     // Tab became visible - refresh data
 *     refreshData();
 *   }
 * });
 *
 * // Later: cleanup
 * unsubscribe();
 * ```
 */
export function onVisibilityChange(handler: VisibilityHandler): Unsubscribe {
  return subscribeToParentMessages('visibility-change', (msgEvent: MessageEvent) => {
    handler(msgEvent.data?.isVisible ?? false);
  });
}

// =============================================================================
// Action Config Surface API
// =============================================================================

/**
 * Get the action configuration for automation action surfaces.
 *
 * Returns the current configuration including any custom config set by the app.
 *
 * @template T - Type of the custom_action_config object
 * @param options - Request options
 * @returns Action configuration
 *
 * @example
 * ```typescript
 * import { initialize, getActionConfig } from '@epilot/app-bridge';
 *
 * interface MyActionConfig {
 *   webhookUrl: string;
 *   enabled: boolean;
 * }
 *
 * await initialize();
 *
 * const config = await getActionConfig<MyActionConfig>();
 * console.log(config.custom_action_config?.webhookUrl);
 * ```
 */
export async function getActionConfig<T = Record<string, unknown>>(
  options?: RequestOptions,
): Promise<ActionConfig<T>> {
  const response = await request<{ config: ActionConfig<T> }>('init-action-config', {}, options);
  return response.config;
}

/**
 * Update the action configuration.
 *
 * Sends updated configuration to the parent automation app.
 *
 * @template T - Type of the configuration object
 * @param config - New configuration values
 * @param options - Update options
 *
 * @example
 * ```typescript
 * import { updateActionConfig } from '@epilot/app-bridge';
 *
 * // Simple update
 * updateActionConfig({ webhookUrl: 'https://example.com/webhook' });
 *
 * // With async callback support
 * updateActionConfig(
 *   { webhookUrl: 'https://example.com/webhook' },
 *   { waitForCallback: true }
 * );
 * ```
 */
export function updateActionConfig<T = Record<string, unknown>>(
  config: T,
  options?: UpdateConfigOptions,
): void {
  sendMessageToParent('update-action-config', {
    config,
    wait_for_callback: options?.waitForCallback,
  });
}

// =============================================================================
// Generic Event API (Escape Hatch)
// =============================================================================

/**
 * Subscribe to custom events from the parent app.
 *
 * Use this for custom events not covered by the high-level API.
 *
 * @template T - Expected data type
 * @param event - Event name (supports wildcards, e.g., 'custom-*')
 * @param handler - Callback invoked when event is received
 * @returns Unsubscribe function
 *
 * @example
 * ```typescript
 * import { on } from '@epilot/app-bridge';
 *
 * const unsubscribe = on<{ action: string }>('custom-event', (data) => {
 *   console.log('Received:', data.action);
 * });
 *
 * // Cleanup
 * unsubscribe();
 * ```
 */
export function on<T = unknown>(event: string, handler: MessageHandler<T>): Unsubscribe {
  return subscribeToParentMessages(event, (msgEvent: MessageEvent) => {
    handler(msgEvent.data as T);
  });
}

/**
 * Send a custom message to the parent app.
 *
 * Use this for custom messages not covered by the high-level API.
 *
 * @param event - Event name
 * @param data - Data to send
 *
 * @example
 * ```typescript
 * import { send } from '@epilot/app-bridge';
 *
 * send('custom-event', { action: 'save', value: 42 });
 * ```
 */
export function send(event: string, data?: Record<string, unknown>): void {
  sendMessageToParent(event, data);
}

// =============================================================================
// Client Authorization
// =============================================================================

/**
 * Interface for SDK clients that can be authorized.
 * Compatible with @epilot/\*-client packages from sdk-js.
 */
export interface AuthorizableClient {
  defaults: {
    headers: {
      common?: Record<string, unknown>;
    };
  };
}

/**
 * Authorize an SDK client with the current session token.
 *
 * Works with any @epilot/\*-client package from sdk-js.
 *
 * @param client - The SDK client to authorize
 * @param sessionOrToken - Either an AppBridgeSession or a token string
 *
 * @example
 * ```typescript
 * import { getClient } from '@epilot/file-client';
 * import { initialize, authorizeClient } from '@epilot/app-bridge';
 *
 * const session = await initialize();
 * const client = getClient();
 *
 * authorizeClient(client, session);
 *
 * // Now the client is authorized
 * await client.uploadFile(...);
 * ```
 *
 * @example
 * ```typescript
 * // You can also pass just the token
 * authorizeClient(client, session.token);
 *
 * // Or use getSession() if already initialized
 * authorizeClient(client, getSession());
 * ```
 */
export function authorizeClient(
  client: AuthorizableClient,
  sessionOrToken: AppBridgeSession | string,
): void {
  const token = typeof sessionOrToken === 'string' ? sessionOrToken : sessionOrToken.token;

  client.defaults.headers.common = {
    ...client.defaults.headers.common,
    Authorization: `Bearer ${token}`,
  };
}

// =============================================================================
// Testing Utilities
// =============================================================================

/**
 * Reset the module state. Only use in tests.
 * @internal
 */
export function __reset(): void {
  session = null;
  initPromise = null;
}
