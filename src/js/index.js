class Task {
    constructor (content) {
        this.content = content;
        this.isCompleted = false;
    }
}

class ToDoList {
    constructor () {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.completed = [];

        this.init();
    }

    addTask (content) {
        if (content !== '') {
            this.tasks.push(new Task(content));
            this.addToLocalStorage();
            this.renderList(this.tasks);

            return;
        }

        //TODO: add error method
    }

    renderList (tasksArray) {
        const tasksList = document.getElementById('todo-items');

        tasksArray.forEach(task => {
            console.log(task);
            const taskItem = document.createElement('li');

            taskItem.innerHTML = task.content;

            tasksList.append(taskItem);
        })
    }

    addToLocalStorage (element) {
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

    render (tasksArray) {
        this.renderList(tasksArray);
    }

    init () {
        this.render(this.tasks);
        this.bind();
    }
}

const toDoList = new ToDoList();
