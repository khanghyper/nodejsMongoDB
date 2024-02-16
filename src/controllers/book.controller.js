'use strict'

const BookService = require('../services/book.service');

class BookController {

    static createBook = async (req, res, next) => {
        const result = await BookService.createBook(req.body);
        return res.status(201).json({
            message: 'Create Book successfully!',
            data: result
        })
    }

    static getBooks = async (req, res, next) => {
        const result = await BookService.getBooks(req.query);
        return res.status(200).json({
            message: 'Get Books successfully!',
            data: result
        })
    }

    static getBookById = async (req, res, next) => {
        return res.status(200).json({
            message: 'Get Book successfully!',
            data: await BookService.getBookById(req.params.id)
        })
    }

    static searchBook = async (req, res, next) => {
        return res.status(200).json({
            message: 'Get Book successfully!',
            data: await BookService.searchProducts(req.query.keySearch)
        })
    }

    static delBook = async (req, res, next) => {
        return res.status(200).json(await BookService.deleteBook(req.params.id));
    }

    static updateBook = async (req, res, next) => {
        return res.status(200).json(await BookService.updateBook({id: req.params.id, payload: req.body}));
    }
}

module.exports = BookController;