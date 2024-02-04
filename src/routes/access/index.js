'use strict'

const express = require('express');
const access = require('../../controllers/access.controller');

const router = express.Router();

router.post('/user/signup', access.signUp);

module.exports = router;