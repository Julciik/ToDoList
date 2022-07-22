class TasksFilters {
    constructor (subject) {
        this.subject = subject;
        this.tasksList = new TasksList(subject);

        this._renderFilters();
        this.subject.subscribe(this._renderFilters.bind(this));
    }

    _renderFilters() {
        this._renderShowAll();
        this._renderActive();
        this._renderCompleted();
    }

    _renderShowAll () {
        const showAll = document.getElementById('todo-show-all');

        showAll.addEventListener('click', (e) => {
            e.preventDefault();

            this.tasksList.renderTasks();
        })
    }

    _renderActive () {
        const showActive = document.getElementById('todo-show-active');
        const activeTasks = this.subject.getTasks().filter(task => !task.completed);

        showActive.addEventListener('click', (e) => {
            e.preventDefault();

            this.tasksList.renderTasks(activeTasks);
        })
    }

    _renderCompleted () {
        const showCompleted = document.getElementById('todo-show-completed');
        const completedTasks = this.subject.getTasks().filter(task => task.completed);

        showCompleted.addEventListener('click', (e) => {
            e.preventDefault();

            this.tasksList.renderTasks(completedTasks);
        })
    }
}
