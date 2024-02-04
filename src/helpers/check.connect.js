'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const _SECONDS = 5000;


// count connection
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connection: ${numConnection}`);

}

// check overload
const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numCores * 5;

        console.log(`active connection: ${numConnection}`);
        console.log(`memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnection > maxConnections){
            console.log('connection overload!');
        }

    }, _SECONDS);
}

module.exports = {
    countConnect,
    checkOverLoad
}