const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression');


const app = express();

//init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

//init db
require('./db/init.mongodb');
const { checkOverLoad } = require('./helpers/check.connect');
// checkOverLoad();

//init routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hello world'
    })
})

//handle error

module.exports = app;