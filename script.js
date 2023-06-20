document.getElementById('new-task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var taskName = document.getElementById('new-task-name').value;
    var subtaskName = document.getElementById('new-subtask-name').value;
    var taskNote = document.getElementById('new-task-note').value;
    var taskDate = document.getElementById('new-task-date').value;

    var taskList = document.getElementById('task-list');

    var taskElement = document.createElement('div');
    taskElement.className = 'task';

    var checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.addEventListener('change', function() {
        if (checkboxElement.checked) {
            taskNameElement.style.textDecoration = 'line-through';
            taskNameElement.style.color = '#aaa';
        } else {
            taskNameElement.style.textDecoration = 'none';
            taskNameElement.style.color = '#000';
        }
    });
    taskElement.appendChild(checkboxElement);

    var taskNameElement = document.createElement('div');
    taskNameElement.textContent = taskName;
    taskElement.appendChild(taskNameElement);

    var subtaskElement = document.createElement('div');
    subtaskElement.className = 'subtask';
    subtaskElement.textContent = subtaskName;
    taskElement.appendChild(subtaskElement);

    var noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.textContent = taskNote;
    taskElement.appendChild(noteElement);

    var dateElement = document.createElement('div');
    dateElement.className = 'date';
    dateElement.textContent = taskDate;
    taskElement.appendChild(dateElement);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskElement);
    });
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);

    document.getElementById('new-task-name').value = '';
    document.getElementById('new-subtask-name').value = '';
    document.getElementById('new-task-note').value = '';
    document.getElementById('new-task-date').value = '';
});
