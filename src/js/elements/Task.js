class Task {
    constructor (content) {
        this.id = new Date().getTime();
        this.content = content;
        this.completed = false;
    }
}
