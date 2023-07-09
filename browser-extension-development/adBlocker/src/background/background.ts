// ad urls list https://easylist.to/

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log({ details });
    // const adUrls = [`*://*.googleadservices.com/*`, `*://*.tpc.googlesyndication.com/*`, '*://*.g.doubleclick.net/*'];
    const filters = ['googleadservices', 'tpc.googlesyndication', 'g.doubleclick'];
    let cancel = false;
    for (const filter of filters) {
      if (details.url.indexOf(filter) != -1) {
        cancel = true;
      }
    }
    return {
      cancel,
    };
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking'] // this request must be completed before it goes through. blocks request from going though in parallel
);
