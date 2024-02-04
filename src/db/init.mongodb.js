'use strict'

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');

const connectString = 'mongodb://localhost:27017';

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString).then(_ => console.log('Connected Mongodb success', countConnect()))
            .catch(err => console.log('Error connect'));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;