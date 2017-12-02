const User = require('./user');

module.exports = function(router) {
    router.get('/info', (req, res) => res.promise(User.get(req.user.user_id)));

    router.get('/game-queries', (req, res) => res.promise(User.getGameQueries(req.user.user_id)));

    router.get('/team-queries', (req, res) => res.promise(User.getTeamQueries(req.user.user_id)));

    router.get('/player-queries', (req, res) => res.promise(User.getPlayerQueries(req.user.user_id)));
};