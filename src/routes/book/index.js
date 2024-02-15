'use strict'

const express = require('express');
const asyncHandle = require('../../middlewares/asyncHandle.middleware');
const book = require('../../controllers/book.controller');

const router = express.Router();

router.get('/book', asyncHandle(book.getBooks));
router.post('/book/create', asyncHandle(book.createBook));
router.get('/book/search', asyncHandle(book.searchBook));
router.get('/book/:id', asyncHandle(book.getBookById));


module.exports = router;
