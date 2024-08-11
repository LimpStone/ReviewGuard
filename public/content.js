chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in content script:", message);
    if (message.type === 'URL_UPDATED' && message.objectId) {
      window.postMessage({ type: 'FROM_EXTENSION', objectId: message.objectId }, '*');
    }
  });