const saveSearch = require('../../../middlewares/save-search');
const Games = require('./games');

module.exports = function(router) {
    router.get('/:team1Id/:team2Id/:year', saveSearch,
                (req, res) => res.promise(Games.get(req.params.year, req.params.team1Id, req.params.team2Id)));

    router.get('/compare/:baseTeamId/:team1Id/:team1Year/:team2Id/:team2Year', saveSearch,
                (req, res) => res.promise(Games.tripleCompare(req.params)));
};
