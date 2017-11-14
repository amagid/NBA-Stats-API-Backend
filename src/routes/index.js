const express = require('express');
const mountGames = require('./games');
const mountTeams = require('./teams');
const mountPlayers = require('./players');
var router = express.Router();
var path = require('path');

module.exports = addRoutes;

function addRoutes(router) {
    const games = express.Router(),
        teams = express.Router(),
        players = express.Router();

    mountGames(games);
    mountTeams(teams);
    mountPlayers(players);

    router.use('/games', games);
    router.use('/teams', teams);
    router.use('/players', players);
};
