'use strict'

const express = require('express');
const access = require('../../controllers/access.controller');
const asyncHandle = require('../../middlewares/asyncHandle.middleware');

const router = express.Router();


router.post('/user/signup', asyncHandle(access.signUp));

module.exports = router;