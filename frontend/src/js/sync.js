import {Http} from "./http.js";
import {ReadItemList} from "./lib.js";

const http = new Http('https://nodejs-read-later.herokuapp.com/items');

const readItemList = new ReadItemList();

export class Sync {
    async pushStorage() {
        try {
            const items = readItemList.items;
            await http.getAll();
            for (const item of items) {
                await http.add(item);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    async clearStorage() {
        try {
            await http.deleteAll()
        }
        catch (e) {
            console.log(e)
        }
    }

}
