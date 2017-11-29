const requireAuthorization = require('../../../middlewares/requireAuthorization');
const Users = require('./users');

module.exports = function(router) {
    router.get('/:userId', (req, res) => Users.get(req.params.userId));

    router.get('/:userId/game-queries', (req, res) => Users.getGameQueries(req.params.userId));

    router.get('/:userId/team-queries', (req, res) => Users.getTeamQueries(req.params.userId));

    router.get('/:userId/player-queries', (req, res) => Users.getPlayerQueries(req.params.userId));
};