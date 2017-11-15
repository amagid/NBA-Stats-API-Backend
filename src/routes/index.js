const express = require('express');
const mountAPI = require('./api');
const mountFrontend = require('./frontend');
var router = express.Router();

module.exports = addRoutes;

function addRoutes(router) {
    const api = express.Router(),
        frontend = express.Router();

    mountAPI(api);
    mountFrontend(frontend);

    router.use('/api', api);
    router.use('/', frontend);
};
