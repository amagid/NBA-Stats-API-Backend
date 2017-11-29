const express = require('express');
const mountGames = require('./games');
const mountTeams = require('./teams');
const mountPlayers = require('./players');
const mountUsers = require('./users');
const requireAuthorization = require('../../middlewares/require-auth');
var router = express.Router();

module.exports = addRoutes;

function addRoutes(router) {
    //Create routers
    const games = express.Router(),
        teams = express.Router(),
        players = express.Router(),
        users = express.Router();

    //Mount all sub-api-endpoints onto routers
    mountGames(games);
    mountTeams(teams);
    mountPlayers(players);
    mountUsers(users);

    //Mount routers onto parent router
    router.use('/games', games);
    router.use('/teams', teams);
    router.use('/players', players);

    //Require authorization for all /users routes
    router.use('/user', requireAuthorization);
    router.use('/user', users);
};
