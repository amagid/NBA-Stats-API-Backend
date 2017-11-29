const saveSearch = require('../../../middlewares/save-search');
const Teams = require('./teams');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise(Teams.getAll()));

    router.get('/:team1Id/:dataType', saveSearch,
                (req, res) => res.promise(Teams.get(req.params.team1Id, req.params.dataType)));

    router.get('/:team1Id/compare/:team2Id/:dataType', saveSearch,
                (req, res) => res.promise(Teams.compare(req.params.team1Id, req.params.team2Id, req.params.dataType)));
};