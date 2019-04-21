export class ReadItem {
    constructor(name, tags, url) {
        this.name = name;
        this.tags = tags.split('#').splice(1);
        this.url = url;
        this.done = false;
        this.id = id;
    }
}

export class ReadItemList {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('readItemList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = []; // если нет в локал стораж берем у сервера.
        }
    }

    add(item) {
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

export class SearchItemList {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }
}

// export class ArchiveItemList {
//     constructor() {
//         const savedItems = JSON.parse(localStorage.getItem('archiveItemList'));
//         if (savedItems !== null) {
//             this.items = savedItems;
//         } else {
//             this.items = [];
//         }
//     }
//
//     add(item) {
//         this.items.push(item);
//         this.save();
//     }
//
//     remove(item) {
//         const index = this.items.indexOf(item);
//         if (index !== -1) {
//             this.items.splice(index, 1);
//         }
//         this.save();
//     }
//
//     save() {
//         localStorage.setItem('archiveItemList', JSON.stringify(this.items));
//     }
// }