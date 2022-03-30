class Task {
    constructor (content) {
        this.content = content;
        this.isCompleted = false;
    }
}

class ToDoList {
    constructor () {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.activeTasks = [];
        this.completedTasks = [];
        this.tasksContainer = document.getElementById('todo-items');
        this.doneTaskClass = 'todo-item-completed';

        this.init();
    }

    addTask () {
        const button = document.getElementById('todo-button-add');
        const input = document.getElementById('todo-input');

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
            this.renderTasks(this.tasks);

            return;
        }

        //TODO: add better error method
        alert('Type something!');
    }

    createTasksList (tasksArray) {
        this.tasksContainer.innerHTML = '';

        tasksArray.forEach((task, taskIndex) => {
            const taskItem = document.createElement('li');
            const taskContent = document.createElement('span');
            const taskActions = document.createElement('div');

            const doneButton = document.createElement('button');
            const removeButton = document.createElement('button');

            taskItem.classList.add('todo-item');
            taskContent.classList.add('todo-item-content');
            taskActions.classList.add('todo-item-actions');

            taskContent.innerHTML = task.content;

            doneButton.setAttribute('class', 'todo-task-button todo-done-button')
            doneButton.innerHTML = 'Done';

            doneButton.addEventListener('click', (e) => {
                e.currentTarget.parentNode.parentNode.classList.add(this.doneTaskClass);
                taskActions.removeChild(doneButton);
                task.isCompleted = true;
                this.addToLocalStorage();
                this.renderTasks(this.tasks);
            })

            removeButton.setAttribute('class', 'todo-task-button todo-remove-button')
            removeButton.innerHTML = 'Delete';
            
            removeButton.addEventListener('click', () => {
                this.tasksContainer.removeChild(taskItem);
                this.tasks.splice(taskIndex, 1);
                this.addToLocalStorage();
                this.renderTasks(this.tasks);
            })
            

            if (task.isCompleted) {
                taskItem.classList.add(this.doneTaskClass);
                taskActions.append(removeButton);
            }

            if (!task.isCompleted) {
                taskActions.append(doneButton, removeButton);
            }

            taskItem.append(taskContent, taskActions);
            this.tasksContainer.append(taskItem);
        })
    }

    tasksFilters () {
        const showAll = document.getElementById('todo-show-all');
        const showActive = document.getElementById('todo-show-active');
        const showCompleted = document.getElementById('todo-show-completed');
        const clearCompleted = document.getElementById('todo-clear-completed');

        showAll.addEventListener('click', (e) => {
            e.preventDefault();

            this.renderTasks(this.tasks);
        })

        showActive.addEventListener('click', (e) => {
            e.preventDefault();
        
            this.activeTasks = this.tasks.filter((task) => task.isCompleted === false);
            this.renderTasks(activeTasks);
        })

        showCompleted.addEventListener('click', (e) => {
            e.preventDefault();

            //TODO: Fix duplicated arrays

            this.completedTasks = this.tasks.filter((task) => task.isCompleted === true);
            this.renderTasks(this.completedTasks);
        })

        clearCompleted.addEventListener('click', (e) => {
            e.preventDefault();

            const completedTasks = this.tasks.filter((task) => task.isCompleted === true);
            const completedTaskItems = this.tasksContainer.querySelector(`.${ this.doneTaskClass }`);

            completedTasks.forEach(completedTask => {
                this.tasks.splice(this.tasks.findIndex(task => task.content === completedTask.content), 1);
            })

            if (completedTaskItems) {
                //TODO: Remove nodes
            }

            this.addToLocalStorage();
            this.renderTasks(this.tasks);
        })
    }

    addToLocalStorage () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks (tasksArray) {
        this.tasksFilters();
        this.createTasksList(tasksArray);
    }

    init () {
        this.addTask();
        this.renderTasks(this.tasks);
    }

    //TODO: Left task counter
}

const toDoList = new ToDoList();
