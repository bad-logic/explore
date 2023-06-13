const nameInput = document.getElementById('name-input');

const saveBtn = document.getElementById('save-btn');
chrome.storage.sync.get(['name'], (res) => {
  nameInput.value = res.name ?? '';
});

saveBtn.addEventListener('click', () => {
  chrome.storage.sync.set(
    {
      name: nameInput.value,
    },
    () => {
      console.log(`name set to ${nameInput.value}`);
    }
  );
});
