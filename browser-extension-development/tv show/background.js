chrome.runtime.onInstalled.addListener((details) => {
  console.log({ details });

  chrome.storage.local.set({
    shows: [],
  });

  chrome.contextMenus.create({
    title: 'Search Tv Show',
    id: 'contextMenu1',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.create({
    title: 'Read the selected text',
    id: 'contextMenu2',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    console.log({ event });

    if (event.menuItemId === 'contextMenu1') {
      // chrome.search.query({
      //   disposition: 'NEW_TAB',
      //   text: `imdb ${event.selectionText}`,
      // });

      // chrome.tabs.query(
      //   {
      //     currentWindow: true,
      //   },
      //   (tabs) => {
      //     console.log({ tabs });
      //   }
      // );

      // chrome.tabs.create({
      //   active: true,
      //   url: `https://www.imdb.com/find?q=${event.selectionText}`,
      // });

      fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (event.menuItemId === 'contextMenu2') {
      chrome.tts.speak(event.selectionText, {
        lang: 'en-US',
        rate: 1,
      });
    }
  });
});

console.log('background script running');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log({ message, sender, sendResponse });
  sendResponse('hello there');
  chrome.tabs.sendMessage(sender.tab.id, 'Got your message from background');
});
