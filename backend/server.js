const app = require('./app');

const PORT = process.env.PORT;

const startServer = () => {
    app.listen(PORT, async () => {
        console.log('Server is running on port ' + PORT);
    });
};

module.exports = startServer;