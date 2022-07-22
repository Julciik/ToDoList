class TaskInput {
    constructor (subject) {
        this.subject = subject;

        this._bindEvents();
    }

    _bindEvents () {
        const addButton = document.getElementById('todo-button-add');
        const input = document.getElementById('todo-input');

        addButton.addEventListener('click', () => {
            if (input.value) {
                const task = new Task(input.value);

                this.subject.addTask(task);
                console.log('Added task!', this.subject);
                input.value = '';

                return;
            }

            alert('Type something!');
        })
    }
}
