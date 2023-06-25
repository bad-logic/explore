const time = document.getElementById('time-option');
const saveButton = document.getElementById('save-btn');

time.addEventListener('change', (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    time.value = 25;
  }
});

saveButton.addEventListener('click', (event) => {
  chrome.storage.local.set({
    timeOption: time.value,
    isRunning: false,
    timer: 0,
  });
});

chrome.storage.local.get(['timeOption'], (res) => {
  time.value = res.timeOption;
});
