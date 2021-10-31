const ObjectID = require('mongodb').ObjectId;
// create a reference to the model
let Book = require('../models/book');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function (req, res, next) {
  Book.find((err, bookList) => {
    // console.log(bookList);
    if (err) {
      return console.error(err);
    } else {
      res.render('book/list', {
        title: 'Book List',
        books: bookList,
      });
    }
  });
};

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, bookToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render('book/details', {
        title: 'Book Details',
        book: bookToShow,
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  res.render('book/add_edit', { title: 'Add a Book', book: '' });
};

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {
  const newBook = new Book(req.body);
  Book.create(newBook);
  res.redirect('/book/list');
};

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, bookEditDisplay) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('book/add_edit', {
        title: 'Edit Book',
        book: bookEditDisplay,
      });
    }
  });
};

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  const updatedBook = new Book({ _id: id, ...req.body });
  console.log(updatedBook);
  Book.updateOne(
    { _id: new ObjectID(id) },
    { $set: { ...updatedBook } },
    (err, res) => {
      if (err) {
        return console.error(err);
      }
    }
  );
  res.redirect('/book/list');
};

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
  // ADD YOUR CODE HERE
};
