document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ type: 'APLICATION_RUNING' }, (response) => {
      const objectIdElement = document.getElementById('object-id');
      if (response && response.objectId) {
        objectIdElement.textContent = response.objectId;
      } else {
        objectIdElement.textContent = 'No object ID found';
      }
    });
  });