'use strict'

const CategoryService = require('../services/category.service');

class CategoryController {
    static getCategories = async (req, res, next) => {
        const result = await CategoryService.getCategories();
        return res.status(200).json({
            message: 'Get categories successfully!',
            data: result
        });
    }

    static getCategoryById = async (req, res, next) => {
        const result = await CategoryService.getCategoryById(req.params.id);
        return res.status(200).json({
            message: 'Get category successfully!',
            data: result
        })
    }

    static createCategory = async (req, res, next) => {
        const result = await CategoryService.createCategory(req.body);
        return res.status(201).json({
            message: 'Create category succesfully!',
            data: result
        });
    }


}

module.exports = CategoryController;