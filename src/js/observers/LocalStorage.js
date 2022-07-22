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
