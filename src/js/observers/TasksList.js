class TasksList {
    constructor (subject) {
        this.subject = subject;

        this.renderTasks();
        this.subject.subscribe(this.renderTasks.bind(this));
    }

    renderTasks (tasks = this.subject.getTasks()) {
        const tasksContainer = document.getElementById('todo-items');

        tasksContainer.innerHTML = '';

        tasks.forEach((task) => {
            const taskItem = document.createElement('li');
            const taskContent = document.createElement('span');
            const taskActions = document.createElement('div');

            const doneButton = document.createElement('button');
            const doneTaskClass = 'todo-item-completed';
            const removeButton = document.createElement('button');

            taskItem.classList.add('todo-item');
            taskContent.classList.add('todo-item-content');
            taskActions.classList.add('todo-item-actions');

            taskContent.innerText = task.content;

            doneButton.setAttribute('class', 'todo-task-button todo-done-button')
            doneButton.innerHTML = 'Done';

            doneButton.addEventListener('click', () => {
                this.subject.changeTaskComplete(task);
            });

            removeButton.setAttribute('class', 'todo-task-button todo-remove-button')
            removeButton.innerHTML = 'Delete';

            removeButton.addEventListener('click', () => {
                this.subject.removeTask(task.id);
            })

            if (task.completed) {
                taskItem.classList.add(doneTaskClass);
                taskActions.append(removeButton);
            }

            if (!task.completed) {
                taskActions.append(doneButton, removeButton);
            }

            taskItem.append(taskContent, taskActions);
            tasksContainer.append(taskItem);
        });
    }
}
