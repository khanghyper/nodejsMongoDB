const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression');
const initRouter = require('./routes');

const app = express();

//init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

//init db
require('./db/init.mongodb');
const { checkOverLoad } = require('./helpers/check.connect');
// checkOverLoad();

//init routes
app.use('/', initRouter);

//handle error

module.exports = app;