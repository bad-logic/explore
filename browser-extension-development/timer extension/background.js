chrome.alarms.create('timer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['start', 'timer'], (res) => {
    const time = res.timer ?? 0;
    chrome.action.setBadgeText({
      text: `${time}`,
    });
    const start = +res.start ?? 0;
    if (!start) return;
    chrome.storage.local.set({
      timer: time + 1,
    });

    chrome.storage.sync.get(['interval'], (res) => {
      const interval = +res.interval ?? 1000;
      if (time % interval == 0) {
        this.registration.showNotification('Chrome Timer Extension', {
          body: `${interval} seconds has passed since last notification`,
          icon: 'icon.png',
        });
      }
    });
  });
});
