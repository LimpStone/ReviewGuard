chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] }); // Green
  chrome.action.setBadgeText({ text: "ON" });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // RED
  chrome.action.setBadgeText({ text: "OFF" });
});

const product ={
  ID : 'None'
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'APPLICATION_RUNNING' && message.status === true) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { //Query to get the current window active tab[0]
      if (tabs[0]) {
        console.log("Analiazing URL");
        const tab = tabs[0];
        const objectIdMatch = tab.url.match(/MLM[A-Z0-9]+/);
        if (objectIdMatch) {
          product.ID = objectIdMatch[0];
          console.log("Object ID found:", objectIdMatch[0]);
          chrome.tabs.sendMessage(tab.id, {
            type: 'URL_UPDATED',
            objectId: objectIdMatch[0]
          });
          sendResponse(product);
          return false;
        } else {
          console.log("No Object ID found in URL.");
        }
      }    
    });
  }
  return true; 
});
