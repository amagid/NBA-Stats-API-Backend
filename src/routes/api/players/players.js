const Promise = require('bluebird');
const Python = require('../../../services/python');
const APIError = require('../../../APIError');

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
    if (!playerId) {
        return Promise.reject(APIError(400, "No Player Supplied"));
    }
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
    })
    .catch(err => {
        if (err.message.indexOf("404") !== -1) {
            throw APIError(404, "Player Not Found");
        }
        throw APIError(500, "Unknown Error", err);
    });
}

function compare(player1Id, player2Id) {
    if (!player1Id || !player2Id) {
        return Promise.reject(APIError(400, 'Player(s) missing'));
    }
    return Python.run('Player.py', ['compare', player1Id, player2Id]).then(function(comparison) {
        return comparison;
    })
    .catch(err => {
        if (err.message.indexOf("404") !== -1) {
            throw APIError(404, "Player(s) not found");
        }
        throw APIError(500, "Unknown Error", err);
    });
}