import {Http} from "./http.js";

const http = new Http('https://readlater-server.herokuapp.com/items');

export class ReadItem {
    constructor(id, name, tags, url) {
        this.id = id;
        this.name = name;
        this.tags = tags.split('#').splice(1);
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
            this.items = []; // если нет в локал стораж берем у сервера.
            this.itemsCopy = [];
        }
    }

    add(item) {
        this.items.push(item);
        http.add(item);
        this.itemsCopy.push(item);
        this.save();
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            http.removeById(this.itemsCopy.indexOf(item)+1);
            this.items.splice(index, 1);
        }
        this.save();
    }

    save() {
        localStorage.setItem('readItemList', JSON.stringify(this.items));
    }
}

export class SearchItemList {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }
}