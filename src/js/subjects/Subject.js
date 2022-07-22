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
