let library = [];

// DOM elements
const main = document.querySelector('.main');
const form = document.querySelector(".form");
const formDiv = document.querySelector('.add-form')
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
    // create new card
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
    
    // set read button style
    let text = book.read === true ? "Read" : "Not Read";
    let background = book.read === true ? "#9BC53D" : "#C3423F";
    readButton.style['background-color'] = background; 
    readButton.textContent = text; 

    // toggle read button event listener
    readButton.addEventListener('click', () => {

        // fix library index
        let classes = readButton.classList;
        let index = classes[1];
        let book = library[index];

        // set read button style
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

    // append elements to DOM
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    card.appendChild(remove);
    main.appendChild(card);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get fields
    const name = nameInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    // reset fields
    nameInput.value="";
    authorInput.value="";
    pagesInput.value="";
    readInput.checked = false;

    // add to library
    const new_book = new Book(name, author, pages, read);
    new_book.addBookToLibrary();

    // reset style
    formDiv.style['visibility'] = "hidden";
    body.style['opacity'] = "100%";

    // display book
    displayBook(new_book);
})

newBookButton.addEventListener('click', () => {
    body.style['opacity'] = "50%";
    formDiv.style['visibility'] = "visible";
})

cancelButton.addEventListener('click', () =>{
    body.style['opacity'] = "100%";
    formDiv.style['visibility'] = "hidden";
})
