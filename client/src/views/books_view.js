const PubSub = require('../helpers/pub_sub.js');

class BookView {

  constructor(container){
    this.container = container;
  }

  bindEvent(){
    PubSub.subscribe('Books:books-data-loaded', (event) => {
      const books = event.detail;
      this.render(books);
    })
  }

  render(books){
    this.clearBooks();

    books.forEach((book) => {
      const bookCard = this.createBookCard(book);
      this.container.appendChild(bookCard);
    });
  }

  clearBooks(){
  this.container.innerHTML = '';
  }

  createBookCard(book){
    const header = document.createElement('div');
    header.classList.add("header");

    const title = document.createElement('a');
    title.innerHTML = `${book.title}`;
    title.onclick = function(){
      document.getElementById('update-form').elements['id'].value = book.id;
      document.getElementById('update-form').elements['title'].value = book.title;
      document.getElementById('update-form').elements['publication-date'].value = book.publication_date;
      document.getElementById('update-form').elements['main-character'].value = book.main_character;
      document.getElementById('delete-form').elements['title'].value = book.title;
    }
    header.appendChild(title);

    const meta = document.createElement('div');
    meta.classList.add('meta');
    meta.innerHTML = `<span>Publication Date: ${book.publication_date} | Main character: ${book.main_character}</span>`;

    const content = document.createElement('div');
    content.classList.add("content");

    const card = document.createElement('div');
    card.classList.add("ui");
    card.classList.add("card");

    // const updateButton = document.createElement('button');
    //
    //
    // const deleteButton = document.createElement('button')

    content.appendChild(header);
    content.appendChild(meta);
    card.appendChild(content);

    return card;
  }


}

module.exports = BookView;
