const nameInput = document.getElementById('name-input');
const intervalInput = document.getElementById('interval-input');

const saveBtn = document.getElementById('save-btn');
chrome.storage.sync.get(['name', 'interval'], (res) => {
  nameInput.value = res.name ?? '';
  intervalInput.value = res.interval ?? 1000;
});

saveBtn.addEventListener('click', () => {
  chrome.storage.sync.set({
    name: nameInput.value,
    interval: intervalInput.value,
  });
});
