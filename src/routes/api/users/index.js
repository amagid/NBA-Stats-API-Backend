const requireAuthorization = require('../../../middlewares/requireAuthorization');
const Users = require('./users');

module.exports = function(router) {
    router.get('/info', (req, res) => Users.get(req.params.userId));

    router.get('/game-queries', (req, res) => Users.getGameQueries(req.user.user_id));

    router.get('/team-queries', (req, res) => Users.getTeamQueries(req.user.user_id));

    router.get('/player-queries', (req, res) => Users.getPlayerQueries(req.user.user_id));
};