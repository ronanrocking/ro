function book(Title, Author, Pages, Read){
    this.title = Title;
    this.author = Author;
    this.pages = Pages;
    this.read = Read;
}

const library = [];

function addtolib(title, author, pages, read){
    const obj = new book(title, author, pages, read);
    library.push(obj);
}

function getdata(){
    const bookName = document.getElementById("bookname").value;
    const Author = document.getElementById("author").value;
    const Pages = document.getElementById("pages").value;

    addtolib(bookName, Author, Pages);

    console.log('hello', library);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", getdata);
});



