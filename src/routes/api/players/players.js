const Promise = require('bluebird');
const Python = require('../../../services/python');

module.exports = {
    getAll
};

function getAll() {
    return Python.run('playerId.py').then(function(players) {
        for (let i = 0; i < players.length; i++) {
            players[i].value = players[i].name.toLowerCase();
        }
        return players;
    });
}