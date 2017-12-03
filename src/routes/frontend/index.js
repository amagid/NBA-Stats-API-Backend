const config = require('../../../config').get();
const basePath = config.appRoot + '/webapp/public';

module.exports = function (router) {
    router.get('/', (req, res) => res.sendFile(basePath + '/login.html'));

    router.get('/teams', (req, res) => res.sendFile(basePath + '/teams.html'));

    router.get('/players', (req, res) => res.sendFile(basePath + '/index.html'));

    router.get('/games', (req, res) => res.sendFile(basePath + '/games.html'));

    router.get('/register', (req, res) => res.sendFile(basePath + '/register.html'));

    router.get('/login', (req, res) => res.sendFile(basePath + '/login.html'));

    router.get('/account', (req, res) => res.sendFile(basePath + '/account.html'))
};
