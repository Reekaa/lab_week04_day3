const Books = require('../models/books.js');

class BooksFormView{

  constructor(element){
    this.element = element;
  }

  bindEvent() {
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const newBook = {};
      newBook.title = evt.target['title'].value;
      newBook.publication_date = evt.target['publication-date'].value;
      newBook.main_character = evt.target['main-character'].value;

      const books = new Books();
      books.postBook(newBook);

      this.element.reset();
    });
  }
}

module.exports = BooksFormView;
