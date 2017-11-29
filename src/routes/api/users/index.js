const Users = require('./users');

module.exports = function(router) {
    router.get('/info', (req, res) => res.promise(Users.get(req.user.user_id)));

    router.get('/game-queries', (req, res) => res.promise(Users.getGameQueries(req.user.user_id)));

    router.get('/team-queries', (req, res) => res.promise(Users.getTeamQueries(req.user.user_id)));

    router.get('/player-queries', (req, res) => res.promise(Users.getPlayerQueries(req.user.user_id)));
};