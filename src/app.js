'use strict';
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const configModule = require('../config');
configModule.set('appRoot', path.resolve(__dirname));
const config = require('../config').get();
const logger = require('./services/logger');
const routes = require('./routes');
const bodyParser = require('body-parser');
const responsePromise = require('./middlewares/response-promise');
const morgan = require('morgan');
const cors = require('cors');
const DBSync = require('models/sync');
const db = require('services/mysql');
app.use(express.static(path.join(__dirname, '/webapp/public')));

setUpAPI();
setUpDB();
setUpServer();

function setUpAPI() {
    //General middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(responsePromise);
    //Mount routes
    const router = express.Router();
    routes(router);
    app.use('/', router);
}

function setUpDB() {
    DBSync();
    db.testConnection()
        .then(() => {
            logger.info('DB Connection Established');
        })
        .catch((err) => {
            logger.error(`DB Connection FAILED. Reason:\n\n${JSON.stringify(err, null, 4)}`);
            process.exit(1);
        });
}

function setUpServer() {
    const server = http.Server(app);

    server.listen(process.env.PORT || config.app.port);
    logger.info(`Server listening on port ${process.env.PORT || config.app.port}`);

}