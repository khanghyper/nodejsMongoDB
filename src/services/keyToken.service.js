'use strict'

const keyTokenModel = require('../models/keyToken.model');
const {Types} = require('mongoose');

class KeyTokenService {

    static updateTokenByRefreshToken = async (refreshToken, newRefreshToken) => {
        await keyTokenModel.updateOne({refreshToken: refreshToken}, {
            $set: {
                refreshToken: newRefreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        });
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({refreshTokensUsed: refreshToken}).lean();
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({refreshToken}).lean();
    }

    static createTokenKey = async ({userId, publicKey, privateKey, refreshToken}) => {
        // const tokens = await keyTokenModel.create({
        //     user: userId,
        //     publicKey,
        //     privateKey
        // });

        const filter = { user: userId},
            update = {publicKey, privateKey, refreshTokensUsed: [], refreshToken},
            options = { upsert: true, new: true};
        const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

        return tokens ? tokens.publicKey : null;
    }

    static findByUserId = async (userId) =>{
        return await keyTokenModel.findOne({user: new Types.ObjectId(userId)}).lean();
    }

    static removeTokenById = async ({ id }) => {
        const result = await keyTokenModel.deleteOne({
            _id: new Types.ObjectId(id)
        })
        return result;
    }

    static deleteKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({user: userId});
    }
}

module.exports = KeyTokenService;