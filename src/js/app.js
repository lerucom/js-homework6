import {ReadItem, ReadItemList} from "./lib.js";

const readTabEl = document.querySelector('#readTab');
const alreadyReadTabEl = document.querySelector('#archiveTab');
const searchEl = document.querySelector('#searchTab');

const linkNameEl = document.querySelector('#link-name');
const linkTagsEl = document.querySelector('#link-tags');
const linkUrlEl = document.querySelector('#link-url');
const linkAddBtnEl = document.querySelector('#link-add-btn');

const readItemList = new ReadItemList();
// TODO: rebuildTree

linkAddBtnEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    //TODO: validate form
    //TODO: условие что input'ы не пустые, tags с #

    const readItem = new ReadItem(linkNameEl.value, linkTagsEl.value, linkUrlEl.value);
    readItemList.add(readItem);
    linkNameEl.value = '';
    linkTagsEl.value = '';
    linkUrlEl.value = '';
    //TODO: rebuildTree
    console.log(readItemList.items);
});

function rebuildTree(container, list) {
    container.innerHTML = '';
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item bg-light p-3 mb-1 rounded';
        liEl.innerHTML = `
            
        `;
    }
}

