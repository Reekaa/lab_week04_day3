const Books = require('../models/books.js');

class BooksDeleteFormView{

  constructor(element){
    this.element = element;
  }

  bindEvent() {
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const titleToDelete = evt.target['title'].value;
      console.log('inside delete');
      const books = new Books();
      books.deleteBook(titleToDelete);

      this.element.reset();
    });
  }
}

module.exports = BooksDeleteFormView;
