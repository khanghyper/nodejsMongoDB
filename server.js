const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.DEV_APP_PORT || 3002;

const server = app.listen(PORT, () => {
    console.log(`server is starting on http://localhost:${PORT}`)
});

// process.on('SIGINT', () => {
//     server.close(() => {
//         console.log('exit server');
//     })
// })
