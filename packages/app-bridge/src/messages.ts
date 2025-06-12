type MessageHandler = (event: MessageEvent) => void;

export const APP_BRIDGE_SOURCE = 'app-bridge';

export const sendMessageToParent = (event: string, detail?: Record<string, unknown>) => {
  window.parent.postMessage({ ...detail, source: APP_BRIDGE_SOURCE, event }, '*');
};

export const subscribeToParentMessages = (event: string, handler: MessageHandler) => {
  const messageListener = (msgEvent: MessageEvent) => {
    const incomingEvent = msgEvent.data?.event;

    if (msgEvent.source === window.parent) {
      if (
        event === '*' ||
        incomingEvent === event ||
        (event.endsWith('*') && incomingEvent.startsWith(event.slice(0, -1)))
      ) {
        handler(msgEvent);
      }
    }
  };

  window.addEventListener('message', messageListener);

  return () => {
    window.removeEventListener('message', messageListener);
  };
};
