let tasks = [];

const time = document.getElementById('time');

function updateTime() {
  chrome.storage.local.get(['timer', 'timeOption'], (res) => {
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, 0);
    const seconds = res.timer % 60 !== 0 ? `${60 - (res.timer % 60)}`.padStart(2, '0') : `00`;
    time.textContent = `${minutes}:${seconds}`;
  });
}

updateTime();
setInterval(updateTime, 100);

function renderTask(taskIndex) {
  const taskRow = document.createElement('div');

  const text = document.createElement('input');
  text.value = tasks[taskIndex];
  text.type = 'text';
  text.placeholder = 'Enter a task ...';
  text.className = 'task-input';
  text.addEventListener('change', () => {
    tasks[taskIndex] = text.value;
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'x';
  deleteBtn.className = 'task-btn-delete';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskIndex);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById('task-container');
  taskContainer.appendChild(taskRow);
}

function renderTasks() {
  const taskContainer = document.getElementById('task-container');
  taskContainer.textContent = '';
  tasks.forEach((task, index) => {
    renderTask(index);
  });
}

function addTask() {
  const taskIndex = tasks.length;
  tasks.push('');
  renderTask(taskIndex);
}

function deleteTask(taskIndex) {
  tasks.splice(taskIndex, 1);
  renderTasks();
}

function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

chrome.storage.sync.get(['tasks'], (res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => addTask());
const saveTaskBtn = document.getElementById('save-task-btn');
saveTaskBtn.addEventListener('click', () => saveTasks());
const startTimerBtn = document.getElementById('start-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

startTimerBtn.addEventListener('click', () => {
  chrome.storage.local.get(['isRunning'], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning ? 'Pause Timer' : 'Start Timer';
      }
    );
  });
});

resetTimerBtn.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = 'Start Timer';
    }
  );
});
