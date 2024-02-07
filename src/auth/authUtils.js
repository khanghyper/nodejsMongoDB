'use strict'

const jwt = require('jsonwebtoken');
const asyncHandle = require('../middlewares/asyncHandle.middleware');
const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");
const {findByUserId} = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}
const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = await jwt.sign(payload, publicKey, {
        expiresIn: '2 days'
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
        expiresIn: '7 days'
    });

    return {
        accessToken, refreshToken
    }
}

const authentication = asyncHandle(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if(!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Invalid request!');

    const keyStore = await findByUserId(userId);
    if(!keyStore) throw new ApiError(StatusCodes.NOT_FOUND, 'Error: Not found keystore');

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Invalid request');

    try{
        jwt.verify(accessToken, keyStore.publicKey, function(err, decodeUser) {
            if(err) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Error: You are not authenticated!')
            if(userId !== decodeUser.userId) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Error: Invalid userId');
            req.keyStore = keyStore;
            return next();
        })
    }catch (error) {
        throw error;
    }
})


module.exports = {
    createTokenPair,
    authentication
}