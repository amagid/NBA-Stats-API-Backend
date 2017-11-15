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
                    throw new Error(`Malformed Player. Received:\n${JSON.stringify(player, null, 4)}`);
                }
                throw new Error(`Player not found or no data returned.`);
            }).catch(err => {
                throw new Error(`Error Running Function:\n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
    
    describe('get', function () {
        it('should return an APIError with a 404 status code when an invalid player name is supplied', function (done) {
            Players.get('LeBron Jamesssssssss').then(player => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(player, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 404) {
                    return done();
                }
                throw new Error(`Incorrect Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
    
    describe('get', function () {
        it('should return an APIError with a 400 status code when no player name is supplied', function (done) {
            Players.get().then(player => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(player, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Incorrect Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return the name of the superior player', function (done) {
            Players.compare('Alex Abrines', 'LeBron James').then(betterPlayer => {
                if (betterPlayer === 'LeBron James') {
                    return done();
                } else if (betterPlayer === 'Alex Abrines') {
                    throw new Error("Incorrect Player Returned.");
                } else {
                    throw new Error(`Malformed Return Value. Received: \n${JSON.stringify(betterPlayer, null, 4)}`);
                }
            }).catch(err => {
                throw new Error(`Error Running Function:\n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 404 status code', function (done) {
            Players.compare('Alex Abrinessssss', 'LeBron James').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 404) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 404 status code', function (done) {
            Players.compare('Alex Abrines', 'LeBron Jamessssssssssss').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 404) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 404 status code', function (done) {
            Players.compare('Alex Abrinessssss', 'LeBron Jamessssssssssss').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 404) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 400 status code', function (done) {
            Players.compare(null, 'LeBron James').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 400 status code', function (done) {
            Players.compare('LeBron James').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should return an APIError with a 400 status code', function (done) {
            Players.compare().then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should prioritize the 400 status code over the 404, because it should not run the script if a player is missing', function (done) {
            Players.compare('LeBron Jamessssssss').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });

    describe('compare', function () {
        it('should prioritize the 400 status code over the 404, because it should not run the script if a player is missing', function (done) {
            Players.compare(null, 'LeBron Jamessssssss').then(betterPlayer => {
                throw new Error(`Promise was resolved, should have been rejected. Fulfillment value:\n${JSON.stringify(betterPlayer, null, 4)}`);
            }).catch(err => {
                if (err && err.status === 400) {
                    return done();
                }
                throw new Error(`Improper Error Response. Received: \n${JSON.stringify(err, null, 4)}`);
            });
        });
    });
});