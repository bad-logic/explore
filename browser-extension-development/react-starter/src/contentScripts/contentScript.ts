chrome.runtime.sendMessage('From content scripts', (res) => {
  console.log({ res });
});
