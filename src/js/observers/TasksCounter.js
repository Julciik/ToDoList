class TasksCounter {
    constructor (subject) {
        this.subject = subject;

        this._renderCounter();
        this.subject.subscribe(this._renderCounter.bind(this));
    }

    _renderCounter () {
        const counter = document.getElementById('todo-counter');
        const activeTasks = this.subject.getTasks().filter(task => !task.completed);

        let amount = activeTasks.length;

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
