'use strict'

const {book} = require('../models/book.model');
const categoryService = require('./category.service');
const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");
const {getSortBy} = require('../utils');

class BookService {
    // constructor({book_name, book_thumb, book_images, book_description, book_price, book_quantity, book_category}) {
    //     this.book_name = book_name;
    //     this.book_thumb = book_thumb;
    //     this.book_images = book_images;
    //     this.book_description = book_description;
    //     this.book_price = book_price;
    //     this.book_quantity = book_quantity;
    //     this.book_category = book_category;
    // }

    static createBook = async ({book_name, book_thumb, book_images, book_description, book_price, book_quantity, book_category}) => {
        const foundCategory = await categoryService.findCategoryById(book_category);
        if(!foundCategory) throw new ApiError(StatusCodes.NOT_FOUND, 'Error: Category is not found!');

        const foundBook = await BookService.foundBookByName(book_name);
        if(foundBook) throw new ApiError(StatusCodes.CONFLICT, 'Error: Book is existed!');

        return await book.create({book_name, book_thumb, book_images, book_description, book_price, book_quantity, book_category});
    }

    static foundBookByName = async (book_name) => {
        return await book.findOne({book_name});
    }

    static getBooks = async ({limit, page, sort, ...query}) => {
        if(!limit) limit = 6;
        if(!page) page = 1;

        let sortBy = sort ? getSortBy(sort) : {_id: 1};
        let offset = (+page - 1) * (+limit);
        const count = await BookService.getCountBook();
        return {
            count,
            page: +page,
            limit: +limit,
            book: await book.find({...query})
                .populate('book_category', 'category_name')
                .skip(offset)
                .limit(limit)
                .sort(sortBy)
                .lean()
                .exec()
        }
    }

    static getBookById = async (id) => {
        return await book.findOne({_id: id});
    }


    static getCountBook = async () => {
        const findBooks = await book.find({});
        return findBooks.length;
    }

    static searchProducts = async (keySearch) => {
        const regexSearch = new RegExp(keySearch);
        console.log('check regex =>', regexSearch);
        const result = await book.find({
            $text: { $search: regexSearch}
        }, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}}).lean();

        return result;
    }

}

module.exports = BookService;