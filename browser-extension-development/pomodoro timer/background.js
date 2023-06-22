chrome.alarms.create('pomodoroTimer', {
  periodInMinutes: 1 / 60,
});

chrome.storage.local.get(['timer', 'isRunning'], (res) => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 0,
    isRunning: 'isRunning' in res ? res.isRunning : 0,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTimer') {
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      let isRunning = true;
      if (res.isRunning) {
        let timer = res.timer + 1;
        if (timer === 25 * 60) {
          this.registration.showNotification('Podomoro Timer', {
            body: `25 minutes has passed`,
            icon: 'icon.png',
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});
