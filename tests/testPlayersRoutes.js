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
});