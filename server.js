const app = require('./src/app');

const PORT = 3005

const server = app.listen(PORT, () => {
    console.log(`server is starting on http://localhost:${PORT}`)
});

// process.on('SIGINT', () => {
//     server.close(() => {
//         console.log('exit server');
//     })
// })
