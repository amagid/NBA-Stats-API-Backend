const express = require('express');
const mountAPI = require('./api');
const mountFrontend = require('./frontend');
const mountAuth = require('./auth');
const mountUser = require('./user');
const requireAuthorization = require('../middlewares/require-auth');
var router = express.Router();

module.exports = addRoutes;

function addRoutes(router) {
    const api = express.Router(),
        frontend = express.Router(),
        auth = express.Router(),
        user = express.Router();

    mountAPI(api);
    mountFrontend(frontend);
    mountAuth(auth);
    mountUser(user);

    router.use('/api', api);
    router.use('/', frontend);
    router.use('/auth', auth);

    //Require authorization for all /users routes
    router.use('/user', requireAuthorization);
    router.use('/user', user);
};
