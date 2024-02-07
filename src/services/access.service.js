'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData, createPairKey} = require('../utils');
const ApiError = require('../core/error.response');
const {StatusCodes} = require("http-status-codes");
const {findByEmail} = require("./user.service");


class AccessService {

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeTokenById(keyStore._id);
        return {
            message: 'Logout successfully!'
        }
    }

    static login = async ({email, password, refreshToken = null}) => {
        const foundUser = await findByEmail({email});
        if(!foundUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Error: User is not registed!');

        const matchPassword = bcrypt.compare(password, foundUser.password);
        if(!matchPassword) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Error: Password incorrect!');

        const {publicKey, privateKey } = createPairKey();

        const tokens = await createTokenPair({userId: foundUser._id, email}, publicKey, privateKey);

        await KeyTokenService.createTokenKey({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey, userId: foundUser._id
        })

        return {
            message: 'Login successfully!',
            data: {
                user: getInfoData(['_id,', 'name', 'email'], foundUser),
                tokens
            }
        }
    }

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
                const {publicKey, privateKey } = createPairKey();


                const keyStore = await KeyTokenService.createTokenKey({
                    userId: user._id,
                    publicKey,
                    privateKey
                });


                if (!keyStore) throw new ApiError(StatusCodes.BAD_REQUEST, 'Error: Keys are wrong!');

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