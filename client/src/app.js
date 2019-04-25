const Books = require('./models/books.js');
const BookView = require('./views/books_view.js');
const BooksFormView = require('./views/books_form_view.js');
const BooksDeleteFormView = require('./views/books_delete_form_view.js');
const BooksUpdateFormView = require('./views/books_update_form_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const bookContainer = document.querySelector('#book-container');
  const bookView = new BookView(bookContainer);
  bookView.bindEvent();

  const formElement = document.querySelector('#book-form');
  const bookFormView = new BooksFormView(formElement);
  bookFormView.bindEvent();

  const deleteElement = document.querySelector('#delete-form');
  const deleteFormView = new BooksDeleteFormView(deleteElement);
  deleteFormView.bindEvent();

  const updateElement = document.querySelector('#update-form');
  const updateFormView = new BooksUpdateFormView(updateElement);
  updateFormView.bindEvent();

  const books = new Books();
  books.getData();
});
