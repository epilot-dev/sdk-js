import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  authorizeClient,
  getActionConfig,
  getEntityContext,
  getSession,
  initialize,
  isInitialized,
  on,
  onVisibilityChange,
  send,
  updateActionConfig,
  updateContentHeight,
  __reset,
} from './app-bridge';
import {
  AppBridgeNotInitializedError,
  AppBridgeTimeoutError,
} from './errors';

describe('app-bridge', () => {
  let messageHandlers: Map<string, (event: MessageEvent) => void>;
  let postMessageMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    __reset();
    messageHandlers = new Map();

    // Mock window.addEventListener
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'message') {
        messageHandlers.set(event, handler as (event: MessageEvent) => void);
      }
    });

    vi.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      if (event === 'message') {
        messageHandlers.delete(event);
      }
    });

    // Mock window.parent.postMessage
    postMessageMock = vi.fn();
    vi.stubGlobal('parent', { postMessage: postMessageMock });

    // Mock document.body.scrollHeight
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 500,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  const simulateParentMessage = (event: string, data: Record<string, unknown>) => {
    const handler = messageHandlers.get('message');
    if (handler) {
      handler({
        data: { event, ...data },
        source: window.parent,
      } as MessageEvent);
    }
  };

  describe('initialize', () => {
    it('should send app-bridge:init message and resolve with session', async () => {
      const initPromise = initialize();

      // Simulate parent response
      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'en' });
      }, 10);

      const session = await initPromise;

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'app-bridge:init',
          contentHeight: 500,
        }),
        '*',
      );
      expect(session).toEqual({ token: 'test-token', lang: 'en' });
    });

    it('should return cached session on subsequent calls', async () => {
      const initPromise = initialize();

      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'en' });
      }, 10);

      const session1 = await initPromise;
      const session2 = await initialize();

      expect(session1).toBe(session2);
      expect(postMessageMock).toHaveBeenCalledTimes(1);
    });

    it('should deduplicate concurrent initialization calls', async () => {
      const promise1 = initialize();
      const promise2 = initialize();

      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'en' });
      }, 10);

      const [session1, session2] = await Promise.all([promise1, promise2]);

      expect(session1).toBe(session2);
      expect(postMessageMock).toHaveBeenCalledTimes(1);
    });

    it('should respect custom contentHeight option', async () => {
      const initPromise = initialize({ contentHeight: 1000 });

      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'en' });
      }, 10);

      await initPromise;

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({ contentHeight: 1000 }),
        '*',
      );
    });

    it('should timeout if no response received', async () => {
      await expect(initialize({ timeout: 50 })).rejects.toThrow(AppBridgeTimeoutError);
    });
  });

  describe('getSession', () => {
    it('should throw if not initialized', () => {
      expect(() => getSession()).toThrow(AppBridgeNotInitializedError);
    });

    it('should return session after initialization', async () => {
      const initPromise = initialize();

      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'de' });
      }, 10);

      await initPromise;

      const session = getSession();
      expect(session).toEqual({ token: 'test-token', lang: 'de' });
    });
  });

  describe('isInitialized', () => {
    it('should return false before initialization', () => {
      expect(isInitialized()).toBe(false);
    });

    it('should return true after initialization', async () => {
      const initPromise = initialize();

      setTimeout(() => {
        simulateParentMessage('app-bridge:init', { token: 'test-token', lang: 'en' });
      }, 10);

      await initPromise;

      expect(isInitialized()).toBe(true);
    });
  });

  describe('getEntityContext', () => {
    it('should request and return entity context', async () => {
      const contextPromise = getEntityContext();

      setTimeout(() => {
        simulateParentMessage('init-context', {
          context: {
            entityId: '123',
            schema: 'contact',
            capability: { name: 'my-capability' },
          },
        });
      }, 10);

      const context = await contextPromise;

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'init-context',
        }),
        '*',
      );
      expect(context).toEqual({
        entityId: '123',
        schema: 'contact',
        capability: { name: 'my-capability' },
      });
    });

    it('should timeout if no response', async () => {
      await expect(getEntityContext({ timeout: 50 })).rejects.toThrow(AppBridgeTimeoutError);
    });
  });

  describe('updateContentHeight', () => {
    it('should send update-content-height message', () => {
      updateContentHeight(800);

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'update-content-height',
          contentHeight: 800,
        }),
        '*',
      );
    });
  });

  describe('onVisibilityChange', () => {
    it('should subscribe to visibility changes', () => {
      const handler = vi.fn();
      onVisibilityChange(handler);

      simulateParentMessage('visibility-change', { isVisible: false });

      expect(handler).toHaveBeenCalledWith(false);
    });

    it('should return unsubscribe function', () => {
      const handler = vi.fn();
      const unsubscribe = onVisibilityChange(handler);

      unsubscribe();

      simulateParentMessage('visibility-change', { isVisible: true });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('getActionConfig', () => {
    it('should request and return action config', async () => {
      interface MyConfig {
        subscriptionId: string;
      }

      const configPromise = getActionConfig<MyConfig>();

      setTimeout(() => {
        simulateParentMessage('init-action-config', {
          config: {
            custom_action_config: { subscriptionId: 'sub-123' },
            description: 'Test action',
          },
        });
      }, 10);

      const config = await configPromise;

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'init-action-config',
        }),
        '*',
      );
      expect(config.custom_action_config?.subscriptionId).toBe('sub-123');
      expect(config.description).toBe('Test action');
    });
  });

  describe('updateActionConfig', () => {
    it('should send update-action-config message', () => {
      updateActionConfig({ webhookUrl: 'https://example.com' });

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'update-action-config',
          config: { webhookUrl: 'https://example.com' },
        }),
        '*',
      );
    });

    it('should include wait_for_callback option', () => {
      updateActionConfig({ webhookUrl: 'https://example.com' }, { waitForCallback: true });

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'update-action-config',
          config: { webhookUrl: 'https://example.com' },
          wait_for_callback: true,
        }),
        '*',
      );
    });
  });

  describe('on', () => {
    it('should subscribe to custom events', () => {
      const handler = vi.fn();
      on('custom-event', handler);

      simulateParentMessage('custom-event', { value: 42 });

      expect(handler).toHaveBeenCalledWith(expect.objectContaining({ value: 42 }));
    });

    it('should return unsubscribe function', () => {
      const handler = vi.fn();
      const unsubscribe = on('custom-event', handler);

      unsubscribe();

      simulateParentMessage('custom-event', { value: 42 });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('send', () => {
    it('should send custom messages', () => {
      send('custom-event', { action: 'test' });

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'app-bridge',
          event: 'custom-event',
          action: 'test',
        }),
        '*',
      );
    });
  });

  describe('authorizeClient', () => {
    it('should set Authorization header from session object', () => {
      const mockClient = {
        defaults: {
          headers: {
            common: {} as Record<string, unknown>,
          },
        },
      };

      authorizeClient(mockClient, { token: 'test-token', lang: 'en' });

      expect(mockClient.defaults.headers.common.Authorization).toBe('Bearer test-token');
    });

    it('should set Authorization header from token string', () => {
      const mockClient = {
        defaults: {
          headers: {
            common: {} as Record<string, unknown>,
          },
        },
      };

      authorizeClient(mockClient, 'my-token');

      expect(mockClient.defaults.headers.common.Authorization).toBe('Bearer my-token');
    });

    it('should preserve existing headers', () => {
      const mockClient = {
        defaults: {
          headers: {
            common: {
              'X-Custom-Header': 'custom-value',
            } as Record<string, unknown>,
          },
        },
      };

      authorizeClient(mockClient, 'test-token');

      expect(mockClient.defaults.headers.common.Authorization).toBe('Bearer test-token');
      expect(mockClient.defaults.headers.common['X-Custom-Header']).toBe('custom-value');
    });
  });
});
