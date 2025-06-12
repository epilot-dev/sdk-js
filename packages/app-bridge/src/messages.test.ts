import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';

import { sendMessageToParent, subscribeToParentMessages } from './messages';

describe('messages', () => {
  let originalPostMessage: Window['postMessage'];

  beforeEach(() => {
    originalPostMessage = window.parent.postMessage;
    window.parent.postMessage = vi.fn();
  });

  afterEach(() => {
    window.parent.postMessage = originalPostMessage;
  });

  describe('sendMessageToParent', () => {
    it('should send a message to the parent window', () => {
      const event = 'testEvent';
      const detail = { data: 'testData' };

      sendMessageToParent(event, detail);

      expect(window.parent.postMessage).toHaveBeenCalledWith({ event, source: 'app-bridge', ...detail }, '*');
    });
  });

  describe('subscribeToParentMessages', () => {
    let originalAddEventListener: Window['addEventListener'];
    let originalRemoveEventListener: Window['removeEventListener'];

    beforeEach(() => {
      originalAddEventListener = window.addEventListener;
      originalRemoveEventListener = window.removeEventListener;
      window.addEventListener = vi.fn();
      window.removeEventListener = vi.fn();
    });

    afterEach(() => {
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;
    });

    it('should subscribe to specific events', () => {
      const handler = vi.fn();
      const unsubscribe = subscribeToParentMessages('specificEvent', handler);

      const eventListener = (window.addEventListener as Mock).mock.calls[0][1];

      const messageEvent = new MessageEvent('message', {
        data: { event: 'specificEvent' },
        source: window.parent,
      });

      eventListener(messageEvent);

      expect(handler).toHaveBeenCalledWith(messageEvent);

      // Test unsubscribe
      unsubscribe();
      expect(window.removeEventListener).toHaveBeenCalledWith('message', eventListener);
    });

    it('should subscribe to wildcard suffix events', () => {
      const handler = vi.fn();
      const unsubscribe = subscribeToParentMessages('prefix-*', handler);

      const eventListener = (window.addEventListener as Mock).mock.calls[0][1];

      const messageEvent = new MessageEvent('message', {
        data: { event: 'prefix-123' },
        source: window.parent,
      });

      eventListener(messageEvent);

      expect(handler).toHaveBeenCalledWith(messageEvent);

      // Test unsubscribe
      unsubscribe();
      expect(window.removeEventListener).toHaveBeenCalledWith('message', eventListener);
    });

    it('should subscribe to all events with *', () => {
      const handler = vi.fn();
      const unsubscribe = subscribeToParentMessages('*', handler);

      const eventListener = (window.addEventListener as Mock).mock.calls[0][1];

      const messageEvent = new MessageEvent('message', {
        data: { event: 'anyEvent' },
        source: window.parent,
      });

      eventListener(messageEvent);

      expect(handler).toHaveBeenCalledWith(messageEvent);

      // Test unsubscribe
      unsubscribe();
      expect(window.removeEventListener).toHaveBeenCalledWith('message', eventListener);
    });
  });
});
