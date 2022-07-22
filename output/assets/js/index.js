class Subject {
    constructor () {
        this.tasks = [];
        this.observers = [];
    }

    isSubscribed (f) {
        return this.observers.filter(observer => observer.name === f.name).length;
    }

    subscribe (f) {
        if (this.isSubscribed(f)) return;
        this.observers.push(f);
    }

    unsubscribe (f) {
        return this.observers.filter(observer => observer.name !== f.name);
    }

    notify () {
        this.observers.forEach(observer => observer());
    }

    addTask (t) {
        this.tasks.unshift(t);
        this.notify();
    }

    removeTask (id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.notify();
    }

    removeCompleted () {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.notify();
    }

    changeTaskComplete (t) {
        t.completed = !t.completed;
        this.notify();
    }

    getTasks () {
        return this.tasks;
    }
}

class Task {
    constructor (content) {
        this.id = new Date().getTime();
        this.content = content;
        this.completed = false;
    }
}

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

class LocalStorage {
    constructor (subject, item) {
        this.subject = subject;
        this.item = item;

        this.subject.tasks = this._getData();
        this.subject.subscribe(this._saveData.bind(this));
    }

    _saveData () {
        localStorage.setItem(this.item, JSON.stringify(this.subject.tasks));
    }

    _getData () {
        return JSON.parse(localStorage.getItem(this.item)) || [];
    }
}

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

(function init () {
    const subject = new Subject();

    const taskInput = new TaskInput(subject);
    const tasksCleaner = new TasksCleaner(subject);

    const localStorage = new LocalStorage(subject, 'tasks');
    const tasksList = new TasksList(subject);
    const tasksCounter = new TasksCounter(subject);
    const tasksFilters = new TasksFilters(subject);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YmplY3RzL1N1YmplY3QuanMiLCJlbGVtZW50cy9UYXNrLmpzIiwiZWxlbWVudHMvVGFza0lucHV0LmpzIiwiZWxlbWVudHMvVGFza3NDbGVhbmVyLmpzIiwib2JzZXJ2ZXJzL0xvY2FsU3RvcmFnZS5qcyIsIm9ic2VydmVycy9UYXNrc0NvdW50ZXIuanMiLCJvYnNlcnZlcnMvVGFza3NGaWx0ZXJzLmpzIiwib2JzZXJ2ZXJzL1Rhc2tzTGlzdC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgfVxuXG4gICAgaXNTdWJzY3JpYmVkIChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5maWx0ZXIob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIubmFtZSA9PT0gZi5uYW1lKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlIChmKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3Vic2NyaWJlZChmKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKGYpO1xuICAgIH1cblxuICAgIHVuc3Vic2NyaWJlIChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5maWx0ZXIob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIubmFtZSAhPT0gZi5uYW1lKTtcbiAgICB9XG5cbiAgICBub3RpZnkgKCkge1xuICAgICAgICB0aGlzLm9ic2VydmVycy5mb3JFYWNoKG9ic2VydmVyID0+IG9ic2VydmVyKCkpO1xuICAgIH1cblxuICAgIGFkZFRhc2sgKHQpIHtcbiAgICAgICAgdGhpcy50YXNrcy51bnNoaWZ0KHQpO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sgKGlkKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suaWQgIT09IGlkKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9XG5cbiAgICByZW1vdmVDb21wbGV0ZWQgKCkge1xuICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodGFzayA9PiAhdGFzay5jb21wbGV0ZWQpO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVRhc2tDb21wbGV0ZSAodCkge1xuICAgICAgICB0LmNvbXBsZXRlZCA9ICF0LmNvbXBsZXRlZDtcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICAgIH1cbn1cbiIsImNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJjbGFzcyBUYXNrSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yIChzdWJqZWN0KSB7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG5cbiAgICAgICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIF9iaW5kRXZlbnRzICgpIHtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tYnV0dG9uLWFkZCcpO1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWlucHV0Jyk7XG5cbiAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKGlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdC5hZGRUYXNrKHRhc2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZGRlZCB0YXNrIScsIHRoaXMuc3ViamVjdCk7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWxlcnQoJ1R5cGUgc29tZXRoaW5nIScpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImNsYXNzIFRhc2tzQ2xlYW5lciB7XG4gICAgY29uc3RydWN0b3IgKHN1YmplY3QpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcblxuICAgICAgICB0aGlzLl9yZW5kZXJDbGVhbmVyKCk7XG4gICAgfVxuXG4gICAgX3JlbmRlckNsZWFuZXIgKCkge1xuICAgICAgICBjb25zdCBjbGVhckNvbXBsZXRlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWNsZWFyLWNvbXBsZXRlZCcpO1xuXG4gICAgICAgIGNsZWFyQ29tcGxldGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3Qgb2xkTGVuZ3RoID0gIHRoaXMuc3ViamVjdC5nZXRUYXNrcygpLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5yZW1vdmVDb21wbGV0ZWQoKTtcblxuICAgICAgICAgICAgaWYgKG9sZExlbmd0aCA9PT0gdGhpcy5zdWJqZWN0LmdldFRhc2tzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vIHRhc2sgaGFzIGJlZW4gY29tcGxldGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImNsYXNzIExvY2FsU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IgKHN1YmplY3QsIGl0ZW0pIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcblxuICAgICAgICB0aGlzLnN1YmplY3QudGFza3MgPSB0aGlzLl9nZXREYXRhKCk7XG4gICAgICAgIHRoaXMuc3ViamVjdC5zdWJzY3JpYmUodGhpcy5fc2F2ZURhdGEuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgX3NhdmVEYXRhICgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5pdGVtLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN1YmplY3QudGFza3MpKTtcbiAgICB9XG5cbiAgICBfZ2V0RGF0YSAoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuaXRlbSkpIHx8IFtdO1xuICAgIH1cbn1cbiIsImNsYXNzIFRhc2tzQ291bnRlciB7XG4gICAgY29uc3RydWN0b3IgKHN1YmplY3QpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcblxuICAgICAgICB0aGlzLl9yZW5kZXJDb3VudGVyKCk7XG4gICAgICAgIHRoaXMuc3ViamVjdC5zdWJzY3JpYmUodGhpcy5fcmVuZGVyQ291bnRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyQ291bnRlciAoKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1jb3VudGVyJyk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhc2tzID0gdGhpcy5zdWJqZWN0LmdldFRhc2tzKCkuZmlsdGVyKHRhc2sgPT4gIXRhc2suY29tcGxldGVkKTtcblxuICAgICAgICBsZXQgYW1vdW50ID0gYWN0aXZlVGFza3MubGVuZ3RoO1xuXG4gICAgICAgIHN3aXRjaCAoYW1vdW50KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY291bnRlci5pbm5lckhUTUwgPSAnQWxsIHRhc2tzIGNvbXBsZXRlZCEnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGNvdW50ZXIuaW5uZXJIVE1MID0gYCR7YW1vdW50fSB0YXNrIGxlZnRgO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb3VudGVyLmlubmVySFRNTCA9IGAke2Ftb3VudH0gdGFza3MgbGVmdGA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJjbGFzcyBUYXNrc0ZpbHRlcnMge1xuICAgIGNvbnN0cnVjdG9yIChzdWJqZWN0KSB7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMudGFza3NMaXN0ID0gbmV3IFRhc2tzTGlzdChzdWJqZWN0KTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJGaWx0ZXJzKCk7XG4gICAgICAgIHRoaXMuc3ViamVjdC5zdWJzY3JpYmUodGhpcy5fcmVuZGVyRmlsdGVycy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyRmlsdGVycygpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2hvd0FsbCgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJBY3RpdmUoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyQ29tcGxldGVkKCk7XG4gICAgfVxuXG4gICAgX3JlbmRlclNob3dBbGwgKCkge1xuICAgICAgICBjb25zdCBzaG93QWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tc2hvdy1hbGwnKTtcblxuICAgICAgICBzaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50YXNrc0xpc3QucmVuZGVyVGFza3MoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfcmVuZGVyQWN0aXZlICgpIHtcbiAgICAgICAgY29uc3Qgc2hvd0FjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLXNob3ctYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhc2tzID0gdGhpcy5zdWJqZWN0LmdldFRhc2tzKCkuZmlsdGVyKHRhc2sgPT4gIXRhc2suY29tcGxldGVkKTtcblxuICAgICAgICBzaG93QWN0aXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50YXNrc0xpc3QucmVuZGVyVGFza3MoYWN0aXZlVGFza3MpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIF9yZW5kZXJDb21wbGV0ZWQgKCkge1xuICAgICAgICBjb25zdCBzaG93Q29tcGxldGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tc2hvdy1jb21wbGV0ZWQnKTtcbiAgICAgICAgY29uc3QgY29tcGxldGVkVGFza3MgPSB0aGlzLnN1YmplY3QuZ2V0VGFza3MoKS5maWx0ZXIodGFzayA9PiB0YXNrLmNvbXBsZXRlZCk7XG5cbiAgICAgICAgc2hvd0NvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudGFza3NMaXN0LnJlbmRlclRhc2tzKGNvbXBsZXRlZFRhc2tzKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCJjbGFzcyBUYXNrc0xpc3Qge1xuICAgIGNvbnN0cnVjdG9yIChzdWJqZWN0KSB7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICB0aGlzLnN1YmplY3Quc3Vic2NyaWJlKHRoaXMucmVuZGVyVGFza3MuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MgKHRhc2tzID0gdGhpcy5zdWJqZWN0LmdldFRhc2tzKCkpIHtcbiAgICAgICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1pdGVtcycpO1xuXG4gICAgICAgIHRhc2tzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgdGFza0FjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgY29uc3QgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgZG9uZVRhc2tDbGFzcyA9ICd0b2RvLWl0ZW0tY29tcGxldGVkJztcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1jb250ZW50Jyk7XG4gICAgICAgICAgICB0YXNrQWN0aW9ucy5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tYWN0aW9ucycpO1xuXG4gICAgICAgICAgICB0YXNrQ29udGVudC5pbm5lclRleHQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGRvbmVCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2RvLXRhc2stYnV0dG9uIHRvZG8tZG9uZS1idXR0b24nKVxuICAgICAgICAgICAgZG9uZUJ1dHRvbi5pbm5lckhUTUwgPSAnRG9uZSc7XG5cbiAgICAgICAgICAgIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0LmNoYW5nZVRhc2tDb21wbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZW1vdmVCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2RvLXRhc2stYnV0dG9uIHRvZG8tcmVtb3ZlLWJ1dHRvbicpXG4gICAgICAgICAgICByZW1vdmVCdXR0b24uaW5uZXJIVE1MID0gJ0RlbGV0ZSc7XG5cbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3QucmVtb3ZlVGFzayh0YXNrLmlkKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoZG9uZVRhc2tDbGFzcyk7XG4gICAgICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kKHJlbW92ZUJ1dHRvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGFzay5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrQWN0aW9ucy5hcHBlbmQoZG9uZUJ1dHRvbiwgcmVtb3ZlQnV0dG9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFza0l0ZW0uYXBwZW5kKHRhc2tDb250ZW50LCB0YXNrQWN0aW9ucyk7XG4gICAgICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmQodGFza0l0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIoZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXQgPSBuZXcgVGFza0lucHV0KHN1YmplY3QpO1xuICAgIGNvbnN0IHRhc2tzQ2xlYW5lciA9IG5ldyBUYXNrc0NsZWFuZXIoc3ViamVjdCk7XG5cbiAgICBjb25zdCBsb2NhbFN0b3JhZ2UgPSBuZXcgTG9jYWxTdG9yYWdlKHN1YmplY3QsICd0YXNrcycpO1xuICAgIGNvbnN0IHRhc2tzTGlzdCA9IG5ldyBUYXNrc0xpc3Qoc3ViamVjdCk7XG4gICAgY29uc3QgdGFza3NDb3VudGVyID0gbmV3IFRhc2tzQ291bnRlcihzdWJqZWN0KTtcbiAgICBjb25zdCB0YXNrc0ZpbHRlcnMgPSBuZXcgVGFza3NGaWx0ZXJzKHN1YmplY3QpO1xufSkoKTtcbiJdfQ==
