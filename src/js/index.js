class Task {
    constructor (content) {
        this.content = content;
        this.isCompleted = false;
    }
}

class ToDoList {
    constructor (tasksContainer) {
        this.tasksContainer = tasksContainer;
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this._activeTasks = [];
        this._completedTasks = [];

        this.bindAddTaskButton();
        this.createTasksFilters();
        this.createTasksList(this.tasks);
    }

    get activeTasks () {
        this._activeTasks = this.tasks.filter((task) => task.isCompleted === false);
        return this._activeTasks;
    }

    get completedTasks () {
        this._completedTasks = this.tasks.filter((task) => task.isCompleted === true);
        return this._completedTasks;
    }

    bindAddTaskButton () {
        const button = document.getElementById('todo-button-add');
        const input = document.getElementById('todo-input');

        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.saveTask(input.value);
                input.value = '';
            }
        })

        button.addEventListener('click', () => {
            this.saveTask(input.value);
            input.value = '';
        })
    }

    saveTask (content) {
        if (content !== '') {
            const task = new Task(content);
            this.tasks.unshift(task);
            this.addToLocalStorage();
            this.createTasksList(this.tasks);

            return;
        }

        alert('Type something!');
    }

    createTasksList (tasksArray) {
        this.createActiveTasksCounter();
        this.tasksContainer.innerHTML = '';

        tasksArray.forEach((task, taskIndex) => {
            const taskItem = document.createElement('li');
            const taskContent = document.createElement('span');
            const taskActions = document.createElement('div');

            const doneButton = document.createElement('button');
            const doneTaskClass = 'todo-item-completed';
            const removeButton = document.createElement('button');

            taskItem.classList.add('todo-item');
            taskContent.classList.add('todo-item-content');
            taskActions.classList.add('todo-item-actions');

            taskContent.innerHTML = task.content;

            doneButton.setAttribute('class', 'todo-task-button todo-done-button')
            doneButton.innerHTML = 'Done';

            doneButton.addEventListener('click', (e) => {
                e.currentTarget.parentNode.parentNode.classList.add(doneTaskClass);
                taskActions.removeChild(doneButton);
                task.isCompleted = true;
                this.addToLocalStorage();
                this.createTasksList(this.tasks);
            })

            removeButton.setAttribute('class', 'todo-task-button todo-remove-button')
            removeButton.innerHTML = 'Delete';
            
            removeButton.addEventListener('click', () => {
                this.tasksContainer.removeChild(taskItem);
                this.tasks.splice(taskIndex, 1);
                this.addToLocalStorage();
                this.createTasksList(this.tasks);
            })

            if (task.isCompleted) {
                taskItem.classList.add(doneTaskClass);
                taskActions.append(removeButton);
            }

            if (!task.isCompleted) {
                taskActions.append(doneButton, removeButton);
            }

            taskItem.append(taskContent, taskActions);
            this.tasksContainer.append(taskItem);
        })
    }

    createTasksFilters () {
        const showAll = document.getElementById('todo-show-all');
        const showActive = document.getElementById('todo-show-active');
        const showCompleted = document.getElementById('todo-show-completed');
        const clearCompleted = document.getElementById('todo-clear-completed');

        showAll.addEventListener('click', (e) => {
            e.preventDefault();
            this.createTasksList(this.tasks);
        })

        showActive.addEventListener('click', (e) => {
            e.preventDefault();
            this.createTasksList(this.activeTasks);
        })

        showCompleted.addEventListener('click', (e) => {
            e.preventDefault();
            this.createTasksList(this.completedTasks);
        })

        clearCompleted.addEventListener('click', (e) => {
            e.preventDefault();

            if (this.completedTasks.length) {
                this.completedTasks.forEach(completedTask => {
                    this.tasks.splice(this.tasks.findIndex(task => task.content === completedTask.content), 1);
                })

                this.addToLocalStorage();
                this.createTasksList(this.tasks);

                return;
            }

            alert('All tasks have active status!');
        })
    }

    addToLocalStorage () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    createActiveTasksCounter () {
        const counter = document.getElementById('todo-counter-content');
        let amount = this.activeTasks.length;

        switch (amount) {
            case 0:
                counter.innerHTML = 'All tasks completed!';
                break;
            case 1:
                counter.innerHTML = `${amount} task left`;
                break;
            default:
                counter.innerHTML = `${amount} tasks left`;
        }
    }
}

const toDoContainer = document.getElementById('todo-items');
const toDoList = new ToDoList(toDoContainer);
