class Task {
    constructor (content) {
        this.content = content;
        this.isCompleted = false;
    }

    // set id (value) {
    //     this._id = value;
    // }

    // get id () {
    //     return this._id;
    // }
}

class ToDoList {
    constructor () {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.completed = [];
        this.tasksContainer = document.getElementById('todo-items');

        this.init();
    }

    addTask (content) {
        if (content !== '') {
            const task = new Task(content);
            this.tasks.push(task);
            this.addToLocalStorage();
            this.renderTasks(this.tasks);

            return;
        }

        //TODO: add better error method
        alert('Type something!');
    }

    renderTasks (tasksArray) {
        const taskItemClass = 'todo-item';

        this.tasksContainer.innerHTML = '';

        tasksArray.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(taskItemClass);
            taskItem.innerHTML = task.content;
            
            taskItem.append(this.renderRemoveButton());
            this.tasksContainer.append(taskItem);
        })
    }

    renderRemoveButton () {
        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'todo-remove-button')
        //TODO: Add svg icon
        removeButton.innerHTML = 'Delete';

        // removeButton.addEventListener('click', function () {
        
        // })

        return removeButton;
    }

    addToLocalStorage () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    bind () {
        const button = document.getElementById('todo-button-add');
        const input = document.getElementById('todo-input');

        button.addEventListener('click', () => {
            this.addTask(input.value);
            input.value = '';
        })
    }

    init () {
        this.renderTasks(this.tasks);
        this.bind();
    }
}

const toDoList = new ToDoList();
