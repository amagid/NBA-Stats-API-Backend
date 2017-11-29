const Python = require('../../../services/python');
const APIError = require('../../../APIError');

module.exports = {
    getAll,
    get,
    compare
};

function getAll() {
    return Python.run('teamId.py')
        .then(teams => {
            if (!teams) {
                throw APIError(404, 'No Teams Found');
            }
            return teams;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error retrieving Teams', err);
        });
}

function get(teamId, dataType) {
    return Python.run('Team.py', ['get', teamId, dataType])
        .then(team => {
            if (!team) {
                throw APIError(404, 'Team Not Found');
            }
            return team;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error retrieving Team', err);
        });
}

function compare(team1Id, team2Id, dataType) {
    return Python.run('Team.py', ['compare', team1Id, team2Id, dataType])
        .then(comparison => {
            if (!comparison) {
                throw APIError(400, 'Bad Data');
            }
            return comparison;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error Comparing Teams', err);
        });
}