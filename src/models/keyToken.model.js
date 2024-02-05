'use strict'

const {Schema, model, default: mongoose} = require('mongoose');

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    publicKey: {
        type: String,
        require: true,
    },
    privateKey: {
        type: String,
        require: true,
    },
    refreshToken: {
        type: Array,
        default: []
    }
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);