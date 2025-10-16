const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('boton');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

boton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        const task = { text, completed: false };
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = "";
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        updateLocalStorage();
    }
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(addTaskToDOM);
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}