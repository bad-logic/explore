console.log('hello from content script');

const aTags = document.getElementsByTagName('a');

console.log({ aTags });

chrome.runtime.sendMessage(null, aTags, (res) => {
  console.log({ res });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log({ msg, sender, sendResponse });
});
