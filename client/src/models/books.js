const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

class Books{
  constructor(){
    this.data = null
  };

  getData(){
    const url = `http://localhost:3000/books`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Books:books-data-loaded', this.data);
      })
      .catch((message) => {
        console.error(message);
      });
  }

  postBook(book){
    const url = `http://localhost:3000/books`;
    const request = new RequestHelper(url);
    request.post(book)
      .then((books) => {
        PubSub.publish('Books:books-data-loaded', books);
      })
      .catch(console.error);
  }

  deleteBook(title){
    const url = `http://localhost:3000/books/title/${title}`;
    const request = new RequestHelper(url);
    request.delete()
      .then((books) => {
        PubSub.publish('Books:books-data-loaded', books);
      })
      .catch(console.error);
  }

  updateBook(id, book){
    const url = `http://localhost:3000/books/${id}`;
    const request = new RequestHelper(url);
    request.put(book)
      .then((books) => {
        PubSub.publish('Books:books-data-loaded', books);
      })
      .catch(console.error);
  }


}

module.exports = Books;
