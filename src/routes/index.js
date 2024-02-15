'use strict'

const express = require('express');
const accessRoute = require('./access');
const categoryRoute = require('./category');
const bookRoute = require('./book');
const {apiKey, permission} = require("../auth/checkAuth");
const asyncHandle = require('../middlewares/asyncHandle.middleware');

const router = express.Router();

router.use('/v1/api', categoryRoute);
router.use('/v1/api', bookRoute);

//check apikey

router.use(asyncHandle(apiKey));

//check permission
router.use(permission('1'));

router.use('/v1/api', accessRoute);

module.exports = router;