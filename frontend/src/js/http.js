// сервер на чистом js, так писать не нужно и создавать файл
export class Http {
    constructor(url) {
        this.url = url;
    }

    getAll() {
        return fetch(this.url); // fetch - что это
    }

    save(item) {
        return fetch(this.url, {
           body: JSON.stringify(item),
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           }
        });
    }

    removeById(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        });
    }
}
