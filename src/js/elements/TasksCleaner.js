class TasksCleaner {
    constructor (subject) {
        this.subject = subject;

        this._renderCleaner();
    }

    _renderCleaner () {
        const clearCompleted = document.getElementById('todo-clear-completed');

        clearCompleted.addEventListener('click', (e) => {
            e.preventDefault();

            const oldLength =  this.subject.getTasks().length;
            this.subject.removeCompleted();

            if (oldLength === this.subject.getTasks().length) {
                alert('No task has been completed!');
            }
        })
    }
}
