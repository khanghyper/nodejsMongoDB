'use strict'

const {Schema, model} = require('mongoose');

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});


module.exports = {
    category: model(DOCUMENT_NAME, categorySchema)
}

