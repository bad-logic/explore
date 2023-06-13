chrome.alarms.create('timer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer'], (res) => {
    const time = res.timer ?? 0;
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    if (time % 10 == 0) {
      this.registration.showNotification('Chrome Timer Extension', {
        body: '10 second has passed since last notification',
        icon: 'icon.png',
      });
    }
  });
});
