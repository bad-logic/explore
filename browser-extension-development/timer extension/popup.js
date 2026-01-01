const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');
const timerElement = document.getElementById('timer');

const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

start.addEventListener('click', () => {
  chrome.storage.local.set({
    start: 1,
  });
});

stop.addEventListener('click', () => {
  chrome.storage.local.set({
    start: 0,
  });
});

reset.addEventListener('click', () => {
  chrome.storage.local.set({
    timer: 0,
    start: 0,
  });
});

chrome.storage.sync.get(['name'], (res) => {
  const name = res.name ?? 'user';
  nameElement.textContent = `Hello, ${name}`;
});

function updateTimerElement() {
  chrome.storage.local.get(['timer'], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `The timer is at ${time} seconds`;
  });
  const currentTime = new Date().toLocaleTimeString();

  timeElement.textContent = `The time is: ${currentTime}`;
}

updateTimerElement();

setInterval(updateTimerElement, 1000);

// chrome.action.setBadgeText(
//   {
//     text: 'TIME',
//   },
//   () => {
//     console.log('Finished setting badge text.');
//   }
// );
