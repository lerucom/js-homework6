export class ReadItem {
    constructor(name, tags, url) {
        this.name = name;
        this.tags = tags.split(',');
        this.url = url;
        this.done = false;
    }
}

export class ReadItemList {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('readItemList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {
        //TODO: нельзя добавить, если ссылка уже есть в Read или Archive
        this.items.push(item);
        this.save();
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.save();
    }

    save() {
        localStorage.setItem('readItemList', JSON.stringify(this.items));
    }
}

export class ArchiveItemList {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('archiveItemList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) {
        //TODO: нельзя добавить, если ссылка уже есть в Read или Archive
        this.items.push(item);
        this.save();
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.save();
    }

    save() {
        localStorage.setItem('archiveItemList', JSON.stringify(this.items));
    }
}