const basePath = __dirname + '../../webapp';

module.exports = function (router) {
    router.get('/', (req, res) => res.sendFile(basePath + '/index.html'));

    router.get('/teams', (req, res) => res.sendFile(basePath + '/public/teams.html'));

    router.get('/players', (req, res) => res.sendFile(basePath + '/public/index.html'));

    router.get('/games', (req, res) => res.sendFile(basePath + '/public/games.html'));
};