'use strict'

const userModel = require('../models/user.model');

const findByEmail = async ({email}) => {
    const foundUser = await userModel.findOne({email}).lean();
    return foundUser;
}

module.exports = {
    findByEmail
}