require('dotenv').config();

const startServer = require('./server');
const { initializeDatabase } = require('./utils/db');
const startNgrok = require('./utils/startNgrok');

(async () => {
    initializeDatabase();
    startServer();
    startNgrok();
})();