document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    // Fetch all tasks
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        });

    // Add a new task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, completed: false })
        })
            .then(response => response.json())
            .then(task => {
                addTaskToDOM(task);
                taskForm.reset();
            });
    });

    // Add task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.title}</strong>: ${task.description}
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Delete a task
    window.deleteTask = function (id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                const li = document.querySelector(`li[data-id="${id}"]`);
                if (li) {
                    li.remove();
                }
            });
    };
});