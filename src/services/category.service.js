'use strict'

const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");
const {category} = require('../models/category.model');
class CategoryService{

    static createCategory = async ({category_name}) => {
        const findCategory = await category.findOne({category_name});
        if(findCategory) throw new ApiError(StatusCodes.CONFLICT,'Error: Category is existed!');
        return await category.create({
            category_name
        });
    }

    static getCategoryById = async (id) => {
        const findCategory = await category.findOne({_id: id}).lean();
        if(!findCategory) throw new ApiError(StatusCodes.NOT_FOUND,'Error: Category is not found!');
        return findCategory;
    }

    static getCategories = async () => {
        return await category.find({}).lean();
    }
}

module.exports = CategoryService;