'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");

class AccessService {

    static signUp = async ({ name, email, password }) => {
        // try {
            const isUserExisted = await userModel.findOne({ email }).lean();

            if (isUserExisted) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: User is already registed!');

            const passwordHashed = await bcrypt.hash(password, 10);

            const user = await userModel.create({
                name, email, password: passwordHashed, roles: ['admin']
            });

            if (user) {
                // created privateKey, publicKey
                const publicKey = crypto.randomBytes(64).toString('hex');
                const privateKey = crypto.randomBytes(64).toString('hex');


                const keyStore = await KeyTokenService.createTokenKey({
                    userId: user._id,
                    publicKey,
                    privateKey
                });


                if (!keyStore) throw new ApiError(StatusCodes.NOT_FOUND, 'Error: keys is not founded!');

                // create token pair
                const tokens = await createTokenPair({ userId: user._id, email }, publicKey, privateKey);
                return {
                    code: 201,
                    data: {
                        user: getInfoData(['_id,', 'name', 'email'], user),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                data: null
            }
        // } catch (error) {
        //     return {
        //         code: 'abx',
        //         message: error.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService;