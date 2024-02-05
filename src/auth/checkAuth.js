'use strict'

const ApiError = require('../core/error.response');

const {findById} = require("../services/apiKey.service");
const {StatusCodes} = require("http-status-codes");
const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if(!key) throw new ApiError(StatusCodes.FORBIDDEN, 'Error: Forbiden!');

    const objKey = await findById(key);

    // console.log('check objkey =>>>', objKey)

    if(!objKey) throw new ApiError(StatusCodes.FORBIDDEN, 'Error: Forbiden!');

    req.objKey = objKey;
    next();
}

const permission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permission) throw new ApiError(StatusCodes.FORBIDDEN, 'Error: Permission denined!');

        const isValidatePermission = req.objKey.permission.includes(permission);

        if(!isValidatePermission) throw new ApiError(StatusCodes.FORBIDDEN, 'Error: Permission denined!');
        next();
    }
}

module.exports = {
    apiKey,
    permission
}