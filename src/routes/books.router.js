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