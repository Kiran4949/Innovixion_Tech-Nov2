document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var taskId = Date.now(); // Unique identifier for each task

    var taskText = document.createTextNode(taskInput.value);

    var editButton = document.createElement('button');
    editButton.appendChild(document.createTextNode('Edit'));
    editButton.classList.add('edit-button');
    editButton.onclick = function () {
        editTask(taskId);
    };

    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.onclick = function () {
        deleteTask(taskId);
    };

    var listItem = document.createElement('li');
    listItem.setAttribute('data-task-id', taskId);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    saveTask(taskId, taskInput.value);

    taskInput.value = '';
}

function editTask(taskId) {
    var taskText = prompt('Edit the task:', getTaskText(taskId));

    if (taskText !== null) {
        updateTask(taskId, taskText);
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        var listItem = document.querySelector(`li[data-task-id="${taskId}"]`);
        listItem.remove();
        removeTask(taskId);
    }
}

function saveTask(taskId, task) {
    var tasks = getTasks();
    tasks.push({ id: taskId, text: task });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(taskId, taskText) {
    var tasks = getTasks();
    var taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].text = taskText;

        var listItem = document.querySelector(`li[data-task-id="${taskId}"]`);
        listItem.firstChild.textContent = taskText;

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(taskId) {
    var tasks = getTasks();
    var index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function getTaskText(taskId) {
    var tasks = getTasks();
    var task = tasks.find(task => task.id === taskId);
    return task ? task.text : '';
}

function getTasks() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    var tasks = getTasks();
    var taskList = document.getElementById('taskList');

    tasks.forEach(function (task) {
        var listItem = document.createElement('li');
        listItem.setAttribute('data-task-id', task.id);

        var taskText = document.createTextNode(task.text);

        var editButton = document.createElement('button');
        editButton.appendChild(document.createTextNode('Edit'));
        editButton.classList.add('edit-button');
        editButton.onclick = function () {
            editTask(task.id);
        };

        var deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.onclick = function () {
            deleteTask(task.id);
        };

        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}
