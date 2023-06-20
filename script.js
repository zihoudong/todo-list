// 从localStorage中获取待办事项
var todos = JSON.parse(localStorage.getItem('todos')) || [];

// 渲染待办事项
function renderTodos() {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    var sortSelect = document.getElementById('sort-select');
    var searchInput = document.getElementById('search-input');
    var dates = [...new Set(todos.map(todo => todo.date))]; // 获取所有的日期
    if (sortSelect.value === 'asc') {
        dates.sort((a, b) => new Date(a) - new Date(b)); // 日期升序排序
    } else {
        dates.sort((a, b) => new Date(b) - new Date(a)); // 日期降序排序
    }
    dates.forEach(function(date) {
        var dateItem = document.createElement('div');
        var dateTitle = document.createElement('h2');
        dateTitle.textContent = date;
        dateTitle.addEventListener('click', function() {
            var todoItems = dateItem.getElementsByClassName('todo-item');
            for (var i = 0; i < todoItems.length; i++) {
                var display = todoItems[i].style.display;
                todoItems[i].style.display = display === 'none' ? 'block' : 'none';
            }
        });
        dateItem.appendChild(dateTitle);
        todos.filter(todo => todo.date === date && todo.text.includes(searchInput.value)).forEach(function(todo) {
            var todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            var todoText = document.createElement('p');
            todoText.textContent = todo.text + ' - ' + todo.description;
            if (todo.completed) {
                todoText.style.textDecoration = 'line-through';
            }
            todoText.addEventListener('click', function() {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            });
            var deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                var index = todos.indexOf(todo);
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            var editButton = document.createElement('button');
            editButton.textContent = '编辑';
            editButton.addEventListener('click', function(event) {
                event.stopPropagation();
                var editText = prompt('请输入新的待办事项', todo.text);
                var editDate = prompt('请输入新的日期', todo.date);
                var editDescription = prompt('请输入新的描述', todo.description);
                if (editText !== null) todo.text = editText;
                if (editDate !== null) todo.date = editDate;
                if (editDescription !== null) todo.description = editDescription;
                saveTodos();
                renderTodos();
            });
            todoItem.appendChild(todoText);
            todoItem.appendChild(deleteButton);
            todoItem.appendChild(editButton);
            dateItem.appendChild(todoItem);
        });
        todoList.appendChild(dateItem);
    });
}

// 保存待办事项到localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

document.getElementById('add-todo').addEventListener('click', function() {
    var todoInput = document.getElementById('todo-input');
    var dateInput = document.getElementById('date-input');
    var descriptionInput = document.getElementById('description-input');
    todos.push({
        text: todoInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
        completed: false
    });
    saveTodos();
    renderTodos();
    todoInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';
});

document.getElementById('sort-select').addEventListener('change', renderTodos);
document.getElementById('search-input').addEventListener('input', renderTodos);

// 初始渲染待办事项
renderTodos();
