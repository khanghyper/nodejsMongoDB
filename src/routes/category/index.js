'use strict'

const express = require('express');
const asyncHandle = require('../../middlewares/asyncHandle.middleware');
const category = require('../../controllers/category.controller');

const router = express.Router();

router.get('/category', asyncHandle(category.getCategories));
router.post('/category/create', asyncHandle(category.createCategory));
router.get('/category/:id', asyncHandle(category.getCategoryById));

module.exports = router;
