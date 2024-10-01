const cards = document.querySelector(`.cards`);

const addButton = document.querySelector(`.add`);

addButton.addEventListener(`click`, showDialog);

const dialog = document.querySelector(`dialog`);

const modalButton = document.querySelector(`dialog button`);

const myLibrary = [];

let i = 0;

for (const book of myLibrary) {
    const card = document.createElement(`div`);
    card.setAttribute(`class`, `card`);
    cards.insertBefore(card, addButton);
    const properties = document.createElement(`ul`);
    card.appendChild(properties);
    const removeButton = document.createElement(`button`);
    removeButton.innerText = `remove`;
    removeButton.setAttribute(`class`, `remove`);
    removeButton.setAttribute(`data-index`, `${i}`);
    removeButton.addEventListener(`click`, () =>{
        myLibrary.splice(removeButton.dataset.index, 1);
        createLibrary();
    });
    card.appendChild(removeButton);
    for (const property in book) {
        const prop = document.createElement(`li`);
        properties.appendChild(prop);
        prop.textContent = `${property}: ${book[property]}`;
    }
    i++;
}

function Book(author, title, pages, status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function() {
    this.status = (this.status === 'read') ? 'not read' : 'read';
    createLibrary(); // Refresh to show updated status
}

function showDialog() {
    dialog.showModal();
    modalButton.addEventListener(`click`, addBookToLibrary);
}

function addBookToLibrary() {
    const author = document.querySelector(`#author`).value;
    const title = document.querySelector(`#title`).value;
    const pages = document.querySelector(`#pages`).value;
    const status = document.querySelector(`#status`).value;
    const book = new Book(author, title, pages, status);
    myLibrary.push(book);
    createLibrary();
    dialog.close();
}

function createLibrary(){
    while (cards.firstChild) {
        if (cards.firstChild === addButton) {
            break;
        }
        cards.removeChild(cards.firstChild);
    }
    i = 0;
    for (const book of myLibrary) {
        const card = document.createElement(`div`);
        card.setAttribute(`class`, `card`);
        cards.insertBefore(card, addButton);
        const properties = document.createElement(`ul`);
        card.appendChild(properties);
        const removeButton = document.createElement(`button`);
        removeButton.innerText = `remove`;
        removeButton.setAttribute(`class`, `remove`);
        removeButton.setAttribute(`data-index`, `${i}`);
        removeButton.addEventListener(`click`, () =>{
            myLibrary.splice(removeButton.dataset.index, 1);
            createLibrary();
        });
        card.appendChild(removeButton);
        for (const property in book) {
            if (property === `changeStatus`) {
                continue;
            }
            const prop = document.createElement(`li`);
            properties.appendChild(prop);
            prop.textContent = `${property}: ${book[property]}`;
            if (property === `status`) {
                prop.setAttribute(`class`, `status`)
                prop.addEventListener(`click`, () => {
                    book.changeStatus(); // Change status when clicked
                });
            }   
        }
        i++;
    }
}

