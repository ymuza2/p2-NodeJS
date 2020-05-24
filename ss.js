

/*

router.index.js
--------------------
const { Router } = require('express');
const router = Router();
const authors = require('./authors.router');
const books = require('./books.router');

router.use('/api', authors);
router.use('/api', books);

module.exports = router;

********************************************



authors.router.js
--------------------------------------

const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const authors = require("../../authors.json");

router.get("/authors", (req, res) => {
  res.json(authors);
});

router.post("/authors", (req, res) => {
  const { id, name, lastname } = req.body;
  if (id && name && lastname) {
    const newAuthor = { ...req.body };
    authors.push(newAuthor);
    res.json({ added: "ok" });
  } else {
    res.status(400).json({ statusCode: "Bad Request" });
  }
});

router.put("/authors/:id", (req, res) => {
  const AuthorID = req.params.id;
  const { id, name, lastname } = req.body;
  console.log(name);
  _.each(authors, (author) => {
    if (author.id == AuthorID) {
      author.name = name ? name : author.name;
      author.lastname = lastname ? lastname : author.lastname;

      res.json({ modified: "ok" });
    } else {
      res.status(400).json({
        statusCode: "Bad Request, author data could not be modified.",
      });
    }
  });
});

router.delete("/authors/:id", (req, res) => {
    const id = req.params.id;
    _.remove(authors, (author) => {
      return author.id == id;
    });
    res.json(authors);
});

/*router.delete("/authors/:id", (req, res) => {
  const id = req.params.id;
  _.remove(authors, (author) => {
    return author.id == id;
  });
  res.json(authors);
});

module.exports = router;
*****************************
books.router.js
------------------
const { Router } = require('express');
const router = Router();
const _ = require('lodash'); 
const books = require('../../books.json');


router.get('/books', (req, res)=>{
res.json(books);
});


router.post('/books', (req, res)=>{
    const {isbn, title, author} =req.body;
    if(isbn && title && author){
        const newBook = {...req.body};
        books.push(newBook);
        res.json({'added':'ok'});
    }
    else{
        res.status(400).json({'statusCode':'Bad Request'});
    }

});

router.put('/books/:isbn', (req, res) => { 
    const isbnToFind = req.params.isbn;
    const {isbn, title, author} = req.body;
    console.log(title);
    
    _.each(books, (book) => {
        if(book.isbn == isbnToFind){
            book.title = title ? title : book.title;
            book.author = author ? author : book.author;
            res.json({'modified': 'ok'});
        }
        else{
            res.status(400).json({'statusCode':'Bad Request, book data could not be modified.'});
        }
    });
});


    router.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;  
    _.remove(books, (book) =>{  
        return book.isbn == isbn 
    })
    res.json(books);
});


module.exports = router;
**********************************

index.html
-----------------
const express = require('express');
const app = express(); 
const morgan = require('morgan');
const router = require('./routes/routes.index');

app.set('port', 3000);

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(router);

app.listen(app.get('port'), () =>{
    console.log(`Server listen on port ${app.get('port')}`);

});

************************************* */


