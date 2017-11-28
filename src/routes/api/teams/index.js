const Teams = require('./teams');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise(Teams.getAll()));

    router.get('/:teamId/:dataType',
                (req, res) => res.promise(Teams.get(req.params.teamId, req.params.dataType)));

    router.get('/:team1Id/compare/:team2Id/:dataType',
                (req, res) => res.promise(Teams.compare(req.params.team1Id, req.params.team2Id, req.params.dataType)));
};