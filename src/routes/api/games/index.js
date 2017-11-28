const Games = require('./games');

module.exports = function(router) {
    router.get('/:year/:team1Name/:team2Name',
                (req, res) => res.promise(Games.get(req.params.year, req.params.team1Name, req.params.team2Name)));

    router.get('/compare/:baseTeamId/:team1Id/:team1Year/:team2Id/:team2Year',
                (req, res) => res.promise(Games.tripleCompare(req.params)));
};