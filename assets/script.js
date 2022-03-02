    var TODOListApp = (function () {
        var taskArray = [];
        const taskList = document.getElementById('items-list');
        const addTaskInput = document.getElementById('add');
        const counter = document.getElementById('task-counter');

        console.log('working');
        // console.log(taskArray);

        // 1. add task to dom
        function addTaskDOM(task) {
            const ul = document.createElement('ul');

            ul.innerHTML = `
            <input type="checkbox" id="${task.id}"  ${task.completed ? 'checked':''} class="check-btn"/>
            <label for="${task.id}" id="task-text" class="checkbox">${task.text}</label>
                <img src="./assets/bin.svg" class="delete" data-id="${task.id}"/>
                `;
            taskList.append(ul);

        }


        // 2. RenderList
        function renderList() {
            taskList.innerHTML = '';

            for (let i = 0; i < taskArray.length; i++) {
                addTaskDOM(taskArray[i]);
            }
            counter.innerHTML = taskArray.length;
        }

        // 3 mark Complete Task
        function markTaskComplete(taskId) {
            const task = taskArray.filter(function (task) {
                return task.id == taskId;
            });

            if (task.length > 0) {
                const currentTask = task[0];
                currentTask.completed = !currentTask.completed;
                renderList();
                // alert("toggled successfully")
                return;
            }
            alert('Could not toggle the task');
        }

        // 3.1 mark all complete
        function markAllComplete() {
            const task = taskArray;
            if (task.length > 0) {
                for (let i = 0; i < task.length; i++) {
                    let currentTask = task[i];
                    currentTask.completed = true;
                }
                renderList();
                return;
            }
        }

        // 4. delete task
        function deleteTask(taskId) {
            const newTasks = taskArray.filter(function (task) {
                return task.id !== taskId;
            });

            taskArray = newTasks;
            renderList();
        }

        // 4.1 delete completed task
        function deleteAllTask() {
            const task = [];
            if (taskArray.length > 0) {
                for (let i = 0; i < taskArray.length; i++) {
                    let currentTask = taskArray[i];
                    if (currentTask.completed == false) {
                        task.push(currentTask);
                    }
                }
                taskArray = task;
                renderList();
                return;
            }
        }

        // 5.add task
        function addTask(task) {
            if (task) {
                taskArray.push(task);
                renderList();
                // alert('Task added successfully');
                return;
            }
        }

        // 6. handle keypress input (enter)
        function handleInputKeyPress(event) {
            if (event.key == 'Enter') {
                const text = event.target.value;
                fillingData(text);
                event.target.value = '';

            }
        }

        //6.1 handling data
        function fillingData(text) {
            // console.log(text);

            // if nothing entered
            if (!text) {
                alert("Task cannot be empty");
                return;
            }

            const task = {
                text: text,
                id: Date.now().toString(),
                completed: false
            }
            console.log(task);
            addTask(task);

        }
        // 7. handle clicks
        function handleClickListener(event) {
            const target = event.target;
            console.log(target);

            if (target.className == 'delete') {
                const taskId = target.dataset.id;
                deleteTask(taskId);
                return;

            } else if (target.className == 'check-btn') {
                const taskId = target.id;
                markTaskComplete(taskId);
                return;
            } else if (target.id == 'complete-all') {
                markAllComplete();
                return;
            } else if (target.id == 'clear-completed') {
                deleteAllTask();
            } else if (target.id == 'all') {
                renderList();
            } else if (target.id == 'uncomplete') {
                const originalArray = taskArray;
                const tasks = taskArray.filter((task) => {
                    return task.completed == false;
                });
                taskArray = tasks;
                renderList();
                taskArray = originalArray;
                return;
            } else if (target.id == 'completed') {
                const originalArray = taskArray;
                const tasks = taskArray.filter((task) => {
                    return task.completed == true;
                });
                taskArray = tasks;
                renderList();
                taskArray = originalArray;
                return;
            } else if (target.id == 'submit-btn') {
                const text = addTaskInput.value;
                fillingData(text);
                addTaskInput.value = '';
            }

        }

        // 8. initialize app
        function initializeApp() {
            addTaskInput.addEventListener('keyup', handleInputKeyPress);
            document.addEventListener('click', handleClickListener);
        }


        return {
            initialize: initializeApp()
        }
    })();