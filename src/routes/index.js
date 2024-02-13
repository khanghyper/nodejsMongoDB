'use strict'

const express = require('express');
const accessRoute = require('./access');
const categoryRoute = require('./category');
const {apiKey, permission} = require("../auth/checkAuth");
const asyncHandle = require('../middlewares/asyncHandle.middleware');

const router = express.Router();

//check apikey

router.use('/v1/api', categoryRoute);


router.use(asyncHandle(apiKey));

//check permission
router.use(permission('1'));

router.use('/v1/api', accessRoute);

module.exports = router;