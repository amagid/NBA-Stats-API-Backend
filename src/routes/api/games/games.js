const Python = require('../../../services/python');
const APIError = require('../../../APIError');

module.exports = {
    tripleCompare,
    get

};

function get(year, team1Name, team2Name) {
    return Python.run('game.py', ['get', team1Name, team2Name, year])
        .then(game => {
            if (!game) {
                throw APIError(404, 'Game not found');
            }
            return game;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error retrieving Game', err);
        });
}

function tripleCompare(params) {
    const { baseTeamId, team1Id, team1Year, team2Id, team2Year } = params;
    return Python.run('game.py', ['compare', baseTeamId, team1Id, team2Id, team1Year, team2Year])
        .then(comparison => {
            if (!comparison) {
                throw APIError(404, 'Game Info Not Found');
            }
            return comparison;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error Comparing Games', err);
        });
}