'use strict'

const {Schema, model} = require('mongoose');
const slugify = require('slugify');

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
    book_slug: String,
    // book_price: {
    //     type: Number,
    //     require: true
    // },
    book_quantity: {
        type: Number,
        require: true
    },
    book_category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    book_rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Error: Rating must be above 1.0'],
        max: [5, 'Error: Rating must be above 5.0'],
        set: (val) => Math.round(val * 10)/10
    }
    // product_shop: String,
    // book_attributes: {
    //     type: Schema.Types.Mixed,
    //     require: true
    // }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

// doccument middleware: run before .save() and .create()
bookSchema.pre('save',function (next){
    this.book_slug = slugify(this.book_name, {lower: true, locale: 'vi',replacement: "-"});
    next();
})

// create index for search
bookSchema.index({book_name: 'text', book_description: 'text'});


module.exports = {
    book: model(DOCUMENT_NAME, bookSchema)
}

