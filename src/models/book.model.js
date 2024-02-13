'use strict'

const {Schema, model} = require('mongoose');

const DOCUMENT_NAME = 'Book';
const COLLECTION_NAME = 'Books';

const bookSchema = new Schema({
    book_name: {
        type: String,
        require: true
    },
    book_thumb: {
        type: String,
        require: true
    },
    book_images: {
        type: [String],
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'book_images must be an array with at least one image URL'
    },
    book_description: String,
    book_price: {
        type: Number,
        require: true
    },
    book_quantity: {
        type: Number,
        require: true
    },
    book_category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    // product_shop: String,
    // book_attributes: {
    //     type: Schema.Types.Mixed,
    //     require: true
    // }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});


module.exports = {
    book: model(DOCUMENT_NAME, bookSchema)
}

