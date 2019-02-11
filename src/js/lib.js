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
        //TODO: добавление эл-та
        this.items.push(item);
        this.save();
    }

    remove(item) {
        //TODO: удаление эл-та
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.save();
    }

    save() {
        //TODO: сохраняем localStorage
        localStorage.setItem('readItemList', JSON.stringify(this.items));
    }
}