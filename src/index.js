const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();

const prepareAndStartServer = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

prepareAndStartServer();