const Players = require('./players');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise(Players.getAll()));

    router.get('/:playerId/', (req, res) => res.promise(Players.get(req.params.playerId)));

    router.get('/:player1Id/compare/:player2Id', (req, res) => res.promise(Players.compare(req.params.player1Id, req.params.player2Id)));
};