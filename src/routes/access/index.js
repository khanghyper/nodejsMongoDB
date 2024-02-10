'use strict'

const express = require('express');
const access = require('../../controllers/access.controller');
const asyncHandle = require('../../middlewares/asyncHandle.middleware');
const {authentication} = require("../../auth/authUtils");

const router = express.Router();

//signup
router.post('/user/signup', asyncHandle(access.signUp));
router.post('/user/login', asyncHandle(access.login));

// authentication
router.use(authentication);

router.post('/user/logout', asyncHandle(access.logout));
router.post('/user/refreshToken', asyncHandle(access.handleRefreshToken));

module.exports = router;