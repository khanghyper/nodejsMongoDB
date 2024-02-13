'use strict'

const {Schema, model} = require('mongoose');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema({
    product_name: {
        type: String,
        require: true
    },
    product_thumb: {
        type: String,
        require: true
    },
    product_description: String,
    product_price: {
        type: Number,
        require: true
    },
    product_quantity: {
        type: Number,
        require: true
    },
    product_type: {
        type: String,
        require: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    // product_shop: String,
    product_attributes: {
        type: Schema.Types.Mixed,
        require: true
    }
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

const clothingSchema = new Schema({
    brand: {
        type: String,
        require: true
    },
    size: String,
    material: String,
},{
    collection: 'clothes',
    timestamps: true
});

const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        require: true
    },
    model: String,
    color: String,
},{
    collection: 'electronics',
    timestamps: true
});

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothings', clothingSchema),
    electronic: model('Electronics', electronicSchema)
}

