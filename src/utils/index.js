'use strict'

const _ = require('lodash');
const crypto = require("crypto");

const getInfoData = (fields = [], object = {}) => {
    return _.pick(object, fields);
}

const createPairKey = () =>{
    const publicKey = crypto.randomBytes(64).toString('hex');
    const privateKey = crypto.randomBytes(64).toString('hex');

    return {
        publicKey,
        privateKey
    }
}

const getSortBy = (sort) =>{
    const sortBy = {};
    const properties = sort.split(",");

    properties.forEach((property) => {
        const key = property.replace(/^-/, "");
        const value = property.startsWith("-") ? -1 : 1;
        sortBy[key] = value;
    });

    return sortBy;
}

const getPrice = (minPrice, maxPrice) => {
    
}

module.exports = {
    getInfoData,
    createPairKey,
    getSortBy
}