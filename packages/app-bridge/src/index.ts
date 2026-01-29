/**
 * @epilot/app-bridge
 *
 * Extend epilot XRM with custom App UI components.
 *
 * @example High-level API (recommended)
 * ```typescript
 * import { initialize, getEntityContext, updateContentHeight } from '@epilot/app-bridge';
 *
 * // Initialize and get auth token
 * const { token, lang } = await initialize();
 *
 * // Get entity context (for entity surfaces)
 * const { entityId, schema } = await getEntityContext();
 *
 * // Update content height
 * updateContentHeight(document.body.scrollHeight);
 * ```
 *
 * @example Low-level API (for custom messaging)
 * ```typescript
 * import { init, epilot } from '@epilot/app-bridge';
 *
 * init();
 *
 * epilot.subscribeToParentMessages('custom-event', (event) => {
 *   console.log(event.data);
 * });
 *
 * epilot.sendMessageToParent('custom-response', { value: 42 });
 * ```
 */

import { epilot } from './epilot';
import { logger } from './utils';

// =============================================================================
// Legacy API (backwards compatible)
// =============================================================================

/**
 * Initialize the app bridge (legacy API).
 *
 * Sends initialization message to parent and sets up global epilot object.
 * For new projects, consider using the Promise-based `initialize()` instead.
 *
 * @deprecated Use `initialize()` for Promise-based initialization with session data
 *
 * @example
 * ```typescript
 * import { init, epilot } from '@epilot/app-bridge';
 *
 * init();
 *
 * epilot.subscribeToParentMessages('app-bridge:init', (event) => {
 *   const { token, lang } = event.data;
 * });
 * ```
 */
export const init = () => {
  // make epilot object available in global
  if (window && !('epilot' in window)) {
    Object.assign(window, { epilot });
  }

  epilot.sendMessageToParent('app-bridge:init', {
    contentHeight: document.body.scrollHeight,
  });

  logger.info(
    `
                %c█████████████████
             ██████████████████████
           ███████████████████████████
          █████████████████████████████
         ███████████████████████████████
          █████          ███████████████
                            █████████████
          ████████            ████████████
      █████████████             ██████████
    █████████████               █████████
  █████████████                   ███████
 ████████████                     ██████  █████
████████████                      ██████  ██████
███████████                               ███████
███████████                               ███████
███████████                             █████████
███████████                             █████████
███████████                           ███████████
███████████        ███              █████████████
████████████      ███████████████████████████████
█████████████     ██████████████████████████████
  █████████████    ████████████████████████████
   ██████████████    ████████████████████████
      █████████████    ████████████████████
          █████████        ███████████


                    %cepilot
                   App Bridge
              ©️ 2026 epilot.cloud

  `,
    'color:#005EB4;font-weight:bold;',
    'font-weight:bold;',
    'font-weight:normal',
  );
};

/**
 * Low-level messaging API.
 *
 * Provides direct access to postMessage communication with the parent app.
 *
 * @example
 * ```typescript
 * import { epilot } from '@epilot/app-bridge';
 *
 * // Subscribe to messages
 * const unsubscribe = epilot.subscribeToParentMessages('my-event', (event) => {
 *   console.log(event.data);
 * });
 *
 * // Send messages
 * epilot.sendMessageToParent('my-response', { value: 42 });
 *
 * // Cleanup
 * unsubscribe();
 * ```
 */
export { epilot };

// Re-export low-level messaging primitives for advanced use cases
export { sendMessageToParent, subscribeToParentMessages, APP_BRIDGE_SOURCE } from './messages';

// =============================================================================
// High-Level API (recommended)
// =============================================================================

// Initialization
export { initialize, getSession, isInitialized } from './app-bridge';

// Entity surface API
export { getEntityContext, updateContentHeight, onVisibilityChange } from './app-bridge';

// Action config surface API
export { getActionConfig, updateActionConfig } from './app-bridge';

// Generic event API (escape hatch)
export { on, send } from './app-bridge';

// Client authorization
export { authorizeClient } from './app-bridge';
export type { AuthorizableClient } from './app-bridge';

// =============================================================================
// Types
// =============================================================================

export type {
  // Session types
  AppBridgeSession,
  InitOptions,
  RequestOptions,
  UpdateConfigOptions,
  // Entity surface types
  EntityCapability,
  EntityContext,
  // Action config types
  ActionConfig,
  // Event types
  MessageHandler,
  VisibilityHandler,
  Unsubscribe,
  // Internal types (for advanced use)
  AppBridgeEventMap,
} from './types';

// =============================================================================
// Errors
// =============================================================================

export {
  AppBridgeError,
  AppBridgeTimeoutError,
  AppBridgeNotInitializedError,
} from './errors';
