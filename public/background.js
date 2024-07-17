chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] }); // Green
    chrome.action.setBadgeText({ text: "ON" }); 
  });
  
chrome.action.onClicked.addListener((tab) => {
    chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // RED
    chrome.action.setBadgeText({ text: "OFF" }); 
  });