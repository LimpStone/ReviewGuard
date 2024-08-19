
const product ={
  ID : 'None'
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'APPLICATION_RUNNING' && message.status === true) {
    chrome.action.setBadgeBackgroundColor({ color:[0, 255, 0, 255] }); // Green
    chrome.action.setBadgeText({ text: "ON" });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { //Query to get the current window active tab[0]
      if (tabs[0]) {
        console.log("Analiazing URL");
        const tab = tabs[0];
        const objectIdMatch = tab.url.match(/MLM[-\s]?([A-Z0-9]+)/);
        const objectId = objectIdMatch ? `MLM${objectIdMatch[1]}` : null;
        if (objectIdMatch) {
          product.ID = objectId;
          console.log("Object ID found:", objectId);
          chrome.tabs.sendMessage(tab.id, {
            type: 'URL_UPDATED',
            objectId: objectId
          });
          sendResponse(product);
          return false;
        } else {
          console.log("No Object ID found in URL.");
        }
      }    
    });
  }else{
    chrome.action.setBadgeBackgroundColor({ color:[0, 255, 0, 0] }); // Green
    chrome.action.setBadgeText({ text: "" });
  }
  return true; 
});
