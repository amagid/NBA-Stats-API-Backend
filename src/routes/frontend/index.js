const config = require('../../../config').get();
const basePath = config.appRoot + '/webapp/public';

module.exports = function (router) {
    router.get('/', (req, res) => res.sendFile(basePath + '/index.html'));

    router.get('/teams', (req, res) => res.sendFile(basePath + '/teams.html'));

    router.get('/players', (req, res) => res.sendFile(basePath + '/index.html'));

    router.get('/games', (req, res) => res.sendFile(basePath + '/games.html'));
};