'use strict'

const {clothing, electronic, product} = require('../models/product.model');
const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");

class ProductFactory {
    static createProduct = async ({type, payload}) => {
        switch (type) {
            case 'Electronic' :
                return new Electronic(payload).createProduct();
            case 'Clothing':
                return new Clothing(payload).createProduct();
            default:
                throw new ApiError(StatusCodes.BAD_REQUEST, `Error: Invalid Product ${type}`);
        }
    }
}

class Product {
    constructor({product_name, product_thumb,product_description, product_price, product_quantity, product_type, product_attributes }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_attributes = product_attributes;
    }

    createProduct = async () => {
        return await product.create(this);
    }
}

class Clothing extends Product {
    createProduct = async () => {
        const newClothing = await clothing.create(this.product_attributes);
        if(!newClothing) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Create new clothing error!');

        const newProduct = await super.createProduct();
        if(!newProduct) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Create new Product error!');

        return newProduct;
    }
}

class Electronic extends Product {
    createProduct = async () => {
        const newElectronic = await electronic.create(this.product_attributes);
        if(!newElectronic) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Create new electronic error!');

        const newProduct = await super.createProduct();
        if(!newProduct) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Create new Product error!');

        return newProduct;
    }
}

module.exports = ProductFactory;