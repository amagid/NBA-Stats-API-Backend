const assert = require('chai').assert;
const Players = require('../src/routes/api/players/players');

describe('Players', function () {
    describe('getAll', function () {
        it('should return a list of players with 3 attributes: value, name, and id', function (done) {
            Players.getAll().then(players => {
                if (players.length) {
                    if (players[0].hasOwnProperty('value') &&
                        players[0].hasOwnProperty('name') &&
                        players[0].hasOwnProperty('id')) {
                        return done();
                    }
                    throw new Error(`Malformed Players. Given:\n${JSON.stringify(players[0], null, 4)}`);
                }
                throw new Error("No Players Retrieved")
            }).catch(err => {
                throw new Error(`Error Running Function:\n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
    
    describe('get', function () {
        it('should return a single player with 8 attributes: assists, blocks, rebounds, steals, turnovers, points, three, and free', function (done) {
            Players.get('LeBron James').then(player => {
                if (player) {
                    if (player.hasOwnProperty('assists') &&
                        player.hasOwnProperty('blocks') &&
                        player.hasOwnProperty('rebounds') &&
                        player.hasOwnProperty('steals') &&
                        player.hasOwnProperty('turnovers') &&
                        player.hasOwnProperty('points') &&
                        player.hasOwnProperty('three') &&
                        player.hasOwnProperty('free')) {
                        return done();
                    }
                    throw new Error(`Malformed Player. Given:\n${JSON.stringify(player, null, 4)}`);
                }
                throw new Error(`Player not found or no data returned.`);
            }).catch(err => {
                throw new Error(`Error Running Function:\n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
    describe('compare', function () {
        it('should return a list of players with 3 attributes: value, name, and id', function (done) {
            Players.getAll().then(players => {
                if (players.length) {
                    if (players[0].hasOwnProperty('value') &&
                        players[0].hasOwnProperty('name') &&
                        players[0].hasOwnProperty('id')) {
                        return done();
                    }
                    throw new Error(`Malformed Players. Given:\n${JSON.stringify(players[0], null, 4)}`);
                }
                throw new Error("No Players Retrieved")
            }).catch(err => {
                throw new Error(`Error Running Function:\n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
});