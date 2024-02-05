'use strict'

const express = require('express');
const accessRoute = require('./access');
const {apiKey, permission} = require("../auth/checkAuth");

const router = express.Router();

//check apikey

router.use(apiKey);

//check permission
router.use(permission('1'));

router.use('/v1/api', accessRoute);

module.exports = router;