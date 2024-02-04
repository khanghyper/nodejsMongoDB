'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {
            const isUserExisted = await userModel.findOne({ email }).lean();

            if (isUserExisted) {
                return {
                    code: 'abx',
                    message: 'User is already existed!'
                }
            }

            const passwordHashed = await bcrypt.hash(password, 10);

            const user = await userModel.create({
                name, email, password: passwordHashed, roles: ['admin']
            });

            if (user) {
                // created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                });

                const publicKeyString = await KeyTokenService.createTokenKey({
                    userId: user._id,
                    publicKey
                });

                if (!publicKeyString) {
                    return {
                        code: 'abx',
                        message: 'publicKey error'
                    }
                }

                // create token pair
                const tokens = await createTokenPair({userId: user._id, email}, publicKey, privateKey);
                return {
                    code: 201,
                    data: {
                        user,
                        tokens
                    }
                }
            }
        return {
            code: 200,
            data: null
        }
        } catch (error) {
            return {
                code: 'abx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;