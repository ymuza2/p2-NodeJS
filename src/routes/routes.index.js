const { Router } = require('express');
const router = Router();
const authors = require('./authors.router');
const books = require('./books.router');

router.use('/api', authors);
router.use('/api', books);

module.exports = router;