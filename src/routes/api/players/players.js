const Promise = require('bluebird');
const Python = require('../../../services/python');

module.exports = {
    getAll,
    get,
    compare
};

function getAll() {
    return Python.run('playerId.py').then(function(players) {
        for (let i = 0; i < players.length; i++) {
            players[i].value = players[i].name.toLowerCase();
        }
        return players;
    });
}

function get(playerId) {
    return Python.run('Player.py', ['get', playerId]).then(function(player) {
        return {
            assists: player.AST,
            blocks: player.BLK,
            rebounds: player.REB,
            steals: player.STL,
            turnovers: player.TOV,
            points: player.PTS,
            three: player.FG3_PCT,
            free: player.FT_PCT
        };
    });
}

function compare(player1Id, player2Id) {
    return Python.run('Player.py', ['compare', player1Id, player2Id]).then(function(comparison) {
        return comparison;
    });
}