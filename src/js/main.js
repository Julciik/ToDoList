(function init () {
    const subject = new Subject();

    const taskInput = new TaskInput(subject);
    const tasksCleaner = new TasksCleaner(subject);

    const localStorage = new LocalStorage(subject, 'tasks');
    const tasksList = new TasksList(subject);
    const tasksCounter = new TasksCounter(subject);
    const tasksFilters = new TasksFilters(subject);
})();
