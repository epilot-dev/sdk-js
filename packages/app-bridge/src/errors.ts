/**
 * @epilot/app-bridge - Error Classes
 *
 * Custom error classes for app-bridge operations.
 */

/**
 * Base error class for all app-bridge errors
 */
export class AppBridgeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppBridgeError';

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when a request times out waiting for a response
 *
 * @example
 * ```typescript
 * try {
 *   await appBridge.getEntityContext({ timeout: 1000 });
 * } catch (error) {
 *   if (error instanceof AppBridgeTimeoutError) {
 *     console.log('Request timed out:', error.event);
 *   }
 * }
 * ```
 */
export class AppBridgeTimeoutError extends AppBridgeError {
  /** The event that timed out */
  readonly event: string;
  /** The timeout duration in milliseconds */
  readonly timeout: number;

  constructor(event: string, timeout: number) {
    super(`Request '${event}' timed out after ${timeout}ms`);
    this.name = 'AppBridgeTimeoutError';
    this.event = event;
    this.timeout = timeout;
  }
}

/**
 * Error thrown when attempting to use the app bridge before initialization
 *
 * @example
 * ```typescript
 * try {
 *   const session = appBridge.getSession();
 * } catch (error) {
 *   if (error instanceof AppBridgeNotInitializedError) {
 *     await appBridge.initialize();
 *   }
 * }
 * ```
 */
export class AppBridgeNotInitializedError extends AppBridgeError {
  constructor() {
    super(
      'AppBridge is not initialized. Call appBridge.initialize() first.',
    );
    this.name = 'AppBridgeNotInitializedError';
  }
}
