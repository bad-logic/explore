chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log({ msg, sender });
  sendResponse('From the background script');
});
