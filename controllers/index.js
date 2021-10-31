// book.js
// Inderpal Singh
// 301166561
// BookList App

exports.home = function (req, res, next) {
  res.render('index', { title: 'Home' });
};
