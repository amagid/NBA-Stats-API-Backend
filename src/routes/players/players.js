const Promise = require('bluebird');
const Python = require('../../services/python');

module.exports = {
    getAll
};

function getAll() {
    return Python.run('playerId.py').spread(function(players) {
        return players;
    });
}