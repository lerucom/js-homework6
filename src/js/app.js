import {ReadItem, ReadItemList, ArchiveItemList, SearchItemList} from "./lib.js";

const readTabEl = document.querySelector('#readTab');
const archiveTabEl = document.querySelector('#archiveTab');
const searchTabEl = document.querySelector('#searchTab');
const listItemsEl = document.querySelector('#list-items');

const linkNameEl = document.querySelector('#link-name');
const linkTagsEl = document.querySelector('#link-tags');
const linkUrlEl = document.querySelector('#link-url');
const linkAddBtnEl = document.querySelector('#link-add-btn');
const formEl = document.querySelector('#link-add-form');
const searchFormEl = document.querySelector('#search-form');
const searchInputEl = document.querySelector('#search-name');
const searchBtnEl = document.querySelector('#search-btn');

const readItemList = new ReadItemList();
const archiveItemList = new ArchiveItemList();
const searchItemList = new SearchItemList();

readTabEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    archiveTabEl.parentElement.classList.remove('active');
    searchTabEl.parentElement.classList.remove('active');
    readTabEl.parentElement.classList.add('active');
    formEl.classList.replace('d-none', 'd-flex');
    searchFormEl.classList.replace('d-flex', 'd-none');
    rebuildTreeReadTab(listItemsEl, readItemList);
});

archiveTabEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    readTabEl.parentElement.classList.remove('active');
    searchTabEl.parentElement.classList.remove('active');
    archiveTabEl.parentElement.classList.add('active');
    formEl.classList.replace('d-flex', 'd-none');
    searchFormEl.classList.replace('d-flex', 'd-none');
    rebuildTreeArchiveTab(listItemsEl, archiveItemList);
});

searchTabEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    readTabEl.parentElement.classList.remove('active');
    archiveTabEl.parentElement.classList.remove('active');
    searchTabEl.parentElement.classList.add('active');
    formEl.classList.replace('d-flex', 'd-none');
    searchFormEl.classList.replace('d-none', 'd-flex');
    rebuildTreeSearchTab(listItemsEl, searchItemList);
});

linkAddBtnEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    validate(formEl);
    if ((linkNameEl.value.trim() !== '') && (linkUrlEl.value.trim() !== '')) {
        if ((linkTagsEl.value[0] === '#') && (linkTagsEl.value.length > 1)) {
            if (!(readItemList.items.some((obj) => {
                return obj.url === linkUrlEl.value.trim();
            })) && !(archiveItemList.items.some((obj) => {
                return obj.url === linkUrlEl.value.trim();
            }))) {
                const readItem = new ReadItem(linkNameEl.value.trim(),
                    linkTagsEl.value.replace(/\s/g, ''),
                    linkUrlEl.value.trim());

                readItemList.add(readItem);

                linkNameEl.value = '';
                linkTagsEl.value = '';
                linkUrlEl.value = '';
                rebuildTreeReadTab(listItemsEl, readItemList);
            }
        }
    }
});

searchBtnEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    searchItemList.items = [];
    validate(searchFormEl);
    if ((searchInputEl.value.trim() !== '') && (searchInputEl.value.trim().length >= 2)) {

        const searchValue = searchInputEl.value.trim().toLowerCase();
        const arrayOfItems = readItemList.items.concat(archiveItemList.items);

        arrayOfItems.forEach((obj) => {
            if ((obj.name.toLowerCase().includes(searchValue)) || (obj.tags.indexOf(searchValue) !== -1)) {
                searchItemList.add(obj);
            }
        });

        rebuildTreeSearchTab(listItemsEl, searchItemList);
    }
});

function validate(form) {
    const elems = form.elements;

    if (elems.length === 4) {

        resetError(elems.linkName);
        if (!elems.linkName.value) {
            showError(elems.linkName);
        }

        resetError(elems.linkTags);
        if ((elems.linkTags.value[0] !== '#') || (elems.linkTags.value.length < 2)) {
            showError(elems.linkTags);
        }

        resetError(elems.linkUrl);
        if (!elems.linkUrl.value) {
            showError(elems.linkUrl);
        }
    } else {
        resetError(elems.searchName);
        if ((!elems.searchName.value) || (elems.searchName.value.length < 2)) {
            showError(elems.searchName);
        }
    }
}

function resetError(container) {
    container.classList.remove('border', 'border-danger');
}

function showError(container) {
    container.classList.add('border', 'border-danger');
}

function rebuildTreeReadTab(container, list) {
    container.innerHTML = '';

    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item bg-light p-3 mb-1 rounded';
        if (item.tags.length === 3) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else if (item.tags.length === 4) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <span class="badge badge-info mx-1">${item.tags[3]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox"><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        }

        const checkboxEl = liEl.querySelector('[data-id=checkbox]');
        checkboxEl.addEventListener('click', (evt) => {
            item.done = !item.done;
            checkboxEl.setAttribute('checked', 'true');
            archiveItemList.add(item);
            readItemList.remove(item);
            rebuildTreeReadTab(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            readItemList.remove(item);
            rebuildTreeReadTab(container, list);
        });

        container.appendChild(liEl);
    }
}

function rebuildTreeArchiveTab(container, list) {
    container.innerHTML = '';

    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item bg-light p-3 mb-1 rounded';
        if (item.tags.length === 3) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox" checked><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else if (item.tags.length === 4) {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox" checked><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <span class="badge badge-info mx-1">${item.tags[3]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        } else {
            liEl.innerHTML = `
            <input class="mx-1" data-id="checkbox" type="checkbox" checked><a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <button data-id="remove" class="btn btn-light btn-sm float-right p-0">&#10006;</button>
        `;
        }

        const checkboxEl = liEl.querySelector('[data-id=checkbox]');
        checkboxEl.addEventListener('click', (evt) => {
            item.done = !item.done;
            checkboxEl.setAttribute('checked', 'true');
            readItemList.add(item);
            archiveItemList.remove(item);
            rebuildTreeArchiveTab(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            archiveItemList.remove(item);
            rebuildTreeArchiveTab(container, list);
        });

        container.appendChild(liEl);
    }
}

function rebuildTreeSearchTab(container, list) {
    container.innerHTML = '';

    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item bg-light p-3 mb-1 rounded';
        if (item.tags.length === 3) {
            liEl.innerHTML = `<a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>`;
        } else if (item.tags.length === 4) {
            liEl.innerHTML = `<a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>
            <span class="badge badge-info mx-1">${item.tags[2]}</span>
            <span class="badge badge-info mx-1">${item.tags[3]}</span>`;
        } else {
            liEl.innerHTML = `<a href="${item.url}" class="badge badge-light mx-1" target="_blank">${item.name}</a>
            <span class="badge badge-info mx-1">${item.tags[1]}</span>`;
        }

        container.appendChild(liEl);
    }
}
