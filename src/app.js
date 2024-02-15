const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression');
const initRouter = require('./routes');
const cors = require('cors');

const app = express();

//init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// app.use(cors());

//init db
require('./db/init.mongodb');
const { checkOverLoad } = require('./helpers/check.connect');
// checkOverLoad();

//init routes
app.use('/', initRouter);

//handle error
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.log(error)
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Error: Internal Server Error!'
    })
}) 


module.exports = app;