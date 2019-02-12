import {ReadItem, ReadItemList} from "./lib.js";

const readTabEl = document.querySelector('#readTab');
const alreadyReadTabEl = document.querySelector('#archiveTab');
const searchEl = document.querySelector('#searchTab');
const listItemsEl = document.querySelector('#list-items');

const linkNameEl = document.querySelector('#link-name');
const linkTagsEl = document.querySelector('#link-tags');
const linkUrlEl = document.querySelector('#link-url');
const linkAddBtnEl = document.querySelector('#link-add-btn');
const formEl = document.getElementById('link-add-form');

const readItemList = new ReadItemList();
rebuildTree(listItemsEl, readItemList);

linkAddBtnEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    //TODO: условие что input'ы не пустые, tags с #
    validate(formEl);
    if ((linkNameEl.value.trim() !== '') && (linkUrlEl.value.trim() !== '')) {

    const readItem = new ReadItem(linkNameEl.value.trim(),
        linkTagsEl.value.replace(/\s/g, ''),
        linkUrlEl.value.trim());

    readItemList.add(readItem);

    linkNameEl.value = '';
    linkTagsEl.value = '';
    linkUrlEl.value = '';
    rebuildTree(listItemsEl, readItemList);
}});

function validate(form) {
    const elems = form.elements;

    resetError(elems.linkName);
    if (!elems.linkName.value) {
        showError(elems.linkName);
    }
    resetError(elems.linkTags);
    if (!elems.linkTags.value) {
        showError(elems.linkTags);
    }
    resetError(elems.linkUrl);
    if (!elems.linkUrl.value) {
        showError(elems.linkUrl);
    }
}

function resetError(container) {
    container.classList.remove('border', 'border-danger');
}

function showError(container) {
    container.classList.add('border', 'border-danger');
}

function rebuildTree(container, list) {
    container.innerHTML = '';

    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item bg-light p-3 mb-1 rounded';
        if (item.tags.length === 2) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[0]}</span>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else if (item.tags.length === 3) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[0]}</span>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        }

        const checkboxEl = liEl.querySelector('[data-id=checkbox]');
        checkboxEl.addEventListener('click', (evt) => {
            item.done = !item.done;
            //TODO: вырезать item из readTab и вставить в archiveTab
            rebuildTree(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            readItemList.remove(item);
            rebuildTree(container, list);
        });

        container.appendChild(liEl);
    }
}

