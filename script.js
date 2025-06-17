// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add = 'remove-btn';

        // Remove the task when the button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key in the input field
        taskInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    });    // Wait for the DOM to fully load before running the script
    document.addEventListener('DOMContentLoaded', function () {
        // Select DOM elements
        const addButton = document.getElementById('add-task-btn');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
    
        // Load tasks from Local Storage and display them
        function loadTasks() {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.forEach(taskText => addTask(taskText, false));
        }
    
        // Save the current tasks array to Local Storage
        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    
        // Add a new task to the DOM and optionally to Local Storage
        function addTask(taskText, save = true) {
            // If called from button/input, get value from input
            if (typeof taskText !== 'string') {
                taskText = taskInput.value.trim();
            }
    
            // Check if input is empty
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
    
            // Create a new list item
            const li = document.createElement('li');
            li.textContent = taskText;
    
            // Create a remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';
    
            // Remove the task when the button is clicked
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                // Remove from Local Storage
                let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                tasks = tasks.filter(t => t !== taskText || taskList.querySelectorAll('li').length === 0);
                saveTasks(tasks);
            };
    
            // Append the remove button to the list item
            li.appendChild(removeBtn);
    
            // Add the list item to the task list
            taskList.appendChild(li);
    
            // Save to Local Storage if needed
            if (save) {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                tasks.push(taskText);
                saveTasks(tasks);
            }
    
            // Clear the input field if the task was added by user
            if (save) {
                taskInput.value = "";
            }
        }
    
        // Add event listener for the Add Task button
        addButton.addEventListener('click', () => addTask());
    
        // Add event listener for Enter key in the input field
        taskInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    
        // Load tasks from Local Storage on page load
        loadTasks();
    });