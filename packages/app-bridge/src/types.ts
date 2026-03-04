/**
 * @epilot/app-bridge - Type Definitions
 *
 * This module contains all type definitions for the app-bridge package,
 * including surface contexts, session data, and event payloads.
 */

// =============================================================================
// Session Types
// =============================================================================

/**
 * Session data received after app-bridge initialization.
 * Contains authentication token and user locale preferences.
 */
export interface AppBridgeSession {
  /** OAuth access token for epilot API calls */
  token: string;
  /** User's language preference (e.g., 'en', 'de') */
  lang: string;
}

/**
 * Options for initializing the app bridge
 */
export interface InitOptions {
  /** Initial content height to report to parent (defaults to document.body.scrollHeight) */
  contentHeight?: number;
  /** Timeout in milliseconds for initialization (default: 5000) */
  timeout?: number;
}

/**
 * Options for request operations
 */
export interface RequestOptions {
  /** Timeout in milliseconds (default: 5000) */
  timeout?: number;
}

/**
 * Options for updating action configuration
 */
export interface UpdateConfigOptions {
  /** If true, the automation will wait for an async callback before proceeding */
  waitForCallback?: boolean;
}

// =============================================================================
// Entity Surface Types
// =============================================================================

/**
 * Entity capability metadata from the app manifest.
 * Defines how the capability is configured and rendered.
 */
export interface EntityCapability {
  /** Capability name/identifier */
  name?: string;
  /** Associated app ID */
  app_id?: string;
  /** Additional capability-specific configuration */
  [key: string]: unknown;
}

/**
 * Context data for entity tab and entity capability surfaces.
 *
 * @example
 * ```typescript
 * const context = await appBridge.getEntityContext();
 * console.log(context.entityId); // '123e4567-e89b-12d3-a456-426614174000'
 * console.log(context.schema);   // 'contact'
 * ```
 */
export interface EntityContext {
  /** The unique ID of the entity being viewed */
  entityId: string;
  /** Entity schema slug (e.g., 'contact', 'order', 'opportunity') */
  schema: string;
  /** Capability configuration (for entity_capability surface) */
  capability?: EntityCapability;
  /** Whether the tab/capability is currently visible (for entity_tab surface) */
  isVisible?: boolean;
}

// =============================================================================
// Page Surface Types
// =============================================================================

/**
 * Context data for custom page surfaces.
 *
 * @example
 * ```typescript
 * const context = await getPageContext();
 * console.log(context.slug);    // 'zapier'
 * console.log(context.subPath); // '/connections'
 * console.log(context.path);    // '/app/zapier/connections'
 * ```
 */
export interface PageContext {
  /** The page slug from the URL */
  slug: string;
  /** Sub-path after the slug (e.g., "/settings/advanced") */
  subPath: string;
  /** Full path (e.g., "/app/my-app/settings/advanced") */
  path: string;
}

/**
 * Payload received from init-page-context response
 * @internal
 */
export interface PageContextPayload {
  context: PageContext;
}

// =============================================================================
// Action Config Surface Types
// =============================================================================

/**
 * Configuration for automation flow actions.
 *
 * @template T - Type of the custom_action_config object
 *
 * @example
 * ```typescript
 * interface ZapierConfig {
 *   subscriptionId: string;
 * }
 *
 * const config = await appBridge.getActionConfig<ZapierConfig>();
 * console.log(config.custom_action_config?.subscriptionId);
 * ```
 */
export interface ActionConfig<T = Record<string, unknown>> {
  /** Custom configuration set by the app */
  custom_action_config?: T;
  /** Action description shown in the automation UI */
  description?: string;
  /** Associated app ID */
  app_id?: string;
  /** Additional configuration fields */
  [key: string]: unknown;
}

// =============================================================================
// Event Types
// =============================================================================

/**
 * Handler function for message events
 */
export type MessageHandler<T = unknown> = (data: T) => void;

/**
 * Visibility change handler
 */
export type VisibilityHandler = (isVisible: boolean) => void;

/**
 * Unsubscribe function returned by event subscriptions
 */
export type Unsubscribe = () => void;

// =============================================================================
// Internal Event Payloads (for type-safe messaging)
// =============================================================================

/**
 * Payload sent with app-bridge:init event
 * @internal
 */
export interface InitPayload {
  contentHeight: number;
}

/**
 * Payload received from app-bridge:init response
 * @internal
 */
export interface InitResponsePayload {
  token: string;
  lang: string;
}

/**
 * Payload received from init-context response
 * @internal
 */
export interface EntityContextPayload {
  context: EntityContext;
}

/**
 * Payload received from init-action-config response
 * @internal
 */
export interface ActionConfigPayload<T = Record<string, unknown>> {
  config: ActionConfig<T>;
}

/**
 * Payload sent with update-action-config event
 * @internal
 */
export interface UpdateActionConfigPayload<T = unknown> {
  config: T;
  wait_for_callback?: boolean;
}

/**
 * Payload sent with update-content-height event
 * @internal
 */
export interface UpdateContentHeightPayload {
  contentHeight: number;
}

/**
 * Map of all known app-bridge events and their payloads.
 * Used for type-safe event handling.
 */
export interface AppBridgeEventMap {
  'app-bridge:init': {
    outgoing: InitPayload;
    incoming: InitResponsePayload;
  };
  'init-context': {
    outgoing: Record<string, never>;
    incoming: EntityContextPayload;
  };
  'init-action-config': {
    outgoing: Record<string, never>;
    incoming: ActionConfigPayload;
  };
  'update-action-config': {
    outgoing: UpdateActionConfigPayload;
    incoming: never;
  };
  'update-content-height': {
    outgoing: UpdateContentHeightPayload;
    incoming: never;
  };
  'init-page-context': {
    outgoing: Record<string, never>;
    incoming: PageContextPayload;
  };
  'navigate': {
    outgoing: { subPath: string };
    incoming: never;
  };
  'location-change': {
    outgoing: never;
    incoming: { subPath: string };
  };
}
