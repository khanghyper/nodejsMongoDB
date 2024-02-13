'use strict'

const {book} = require('../models/book.model');
class Book {
    constructor({book_name, book_thumb, book_images, book_description, book_price, book_quantity, book_category}) {
        this.book_name = book_name;
        this.book_thumb = book_thumb;
        this.book_images = book_images;
        this.book_description = book_description;
        this.book_price = book_price;
        this.book_quantity = book_quantity;
        this.book_category = book_category;
    }

    createBook = async () => {

    }
}