const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const {PORT} = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);
    
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    if(process.env.SYNC_DB) {
        db.sequelize.sync({alter: true});
    }
}

prepareAndStartServer();