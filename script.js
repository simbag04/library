let library = [];
const main = document.querySelector('.main');
const button = document.querySelector("#add-book");
const form = document.querySelector(".form");
const body = document.querySelector(".body");
const newBookButton = document.querySelector(".new-book");
const cancelButton = document.querySelector("#cancel");
const nameInput = document.querySelector("#name");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

// BOOK CLASS
function Book(name, author, pages, read)
{
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBookToLibrary = function ()
{
    library[library.length] = this;
}

function displayBook(book)
{
    let card = document.createElement('div');
    card.classList.add('info-card');
    card.classList.add("" + library.length - 1);

    let name = document.createElement('div');
    name.textContent = "Name: " + book.name;
    name.classList.add("info-card-text");

    let author = document.createElement('div');
    author.textContent = "Author: " + book.author;
    author.classList.add("info-card-text");

    let pages = document.createElement('div');
    pages.textContent = "Pages: " + book.pages;
    pages.classList.add("info-card-text");

    // toggle read button
    let readButton = document.createElement('button');
    readButton.textContent = "Read";
    readButton.classList.add("read");
    readButton.classList.add("" + library.length - 1);
    readButton.classList.add("info-card-button");
    
    let text = book.read === true ? "Read" : "Not Read";
    let background = book.read === true ? "#9BC53D" : "#C3423F";
    readButton.style['background-color'] = background; 
    readButton.textContent = text; 

    // toggle read button event listener
    readButton.addEventListener('click', () => {
        let classes = readButton.classList;
        let index = classes[1];
        let book = library[index];
        let status = book.read;
        book.read = status === true ? false : true;
        let text = book.read === true ? "Read" : "Not Read";
        let background = book.read === true ? "#9BC53D" : "#C3423F";
        readButton.style['background-color'] = background; 
        readButton.textContent = text;      
    })

    // remove button
    let remove = document.createElement('button');
    remove.textContent = "Remove";
    remove.classList.add("remove");
    remove.classList.add("" + library.length - 1);
    remove.classList.add("info-card-button");

    // remove button event listener
    remove.addEventListener('click', () => {
        let classes = remove.classList;
        let index = classes[1];
        library[index] = null;
        remove.parentElement.remove();
    })

    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    card.appendChild(remove);
    main.appendChild(card);
}

button.addEventListener('click', () => {
    // event.preventDefault();

    const name = nameInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    nameInput.value="";
    authorInput.value="";
    pagesInput.value="";
    readInput.checked = false;

    const new_book = new Book(name, author, pages, read);
    new_book.addBookToLibrary();

    form.style['visibility'] = "hidden";
    body.style['opacity'] = "100%";

    displayBook(new_book);
})

newBookButton.addEventListener('click', () => {
    body.style['opacity'] = "50%";
    form.style['visibility'] = "visible";
})

cancelButton.addEventListener('click', () =>{
    body.style['opacity'] = "100%";
    form.style['visibility'] = "hidden";
})
