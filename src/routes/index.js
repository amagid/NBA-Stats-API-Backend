const express = require('express');
const mountAPI = require('./api');
const mountFrontend = require('./frontend');
const mountAuth = require('./auth');
var router = express.Router();

module.exports = addRoutes;

function addRoutes(router) {
    const api = express.Router(),
        frontend = express.Router(),
        auth = express.Router();

    mountAPI(api);
    mountFrontend(frontend);
    mountAuth(auth);

    router.use('/api', api);
    router.use('/', frontend);
    router.use('/auth', auth);
};
