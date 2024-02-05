'use strict'

const express = require('express');
const accessRoute = require('./access');
const {apiKey, permission} = require("../auth/checkAuth");
const asyncHandle = require('../middlewares/asyncHandle.middleware');

const router = express.Router();

//check apikey

router.use(asyncHandle(apiKey));

//check permission
router.use(permission('2'));

router.use('/v1/api', accessRoute);

module.exports = router;