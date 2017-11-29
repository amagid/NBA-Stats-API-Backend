const saveSearch = require('../../../middlewares/save-search');
const Players = require('./players');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise(Players.getAll()));

    router.get('/:player1Id/', saveSearch, (req, res) => res.promise(Players.get(req.params.player1Id)));

    router.get('/:player1Id/compare/:player2Id', saveSearch, (req, res) => res.promise(Players.compare(req.params.player1Id, req.params.player2Id)));
};