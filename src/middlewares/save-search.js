const PlayerQueries = require('../models/PlayerQuery');
const TeamQueries = require('../models/TeamQuery');
const GameQueries = require('../models/GameQuery');

const RouteHandlers = {
    players,
    teams,
    games
};

module.exports = function(req, res, next) {
    //If no user id, user is not logged in, so we should not save the query
    if (!req.user.user_id) {
        return next();
    }
    //Extract url info from req
    const { originalUrl, params } = req;
    //Split url into components for analysis
    const originalUrlParts = originalUrl.split('/');
    //Remove empty parts of url 
    for (let i = 0; i < originalUrlParts.length; i++) {
        if (!originalUrlParts[i]) {
            originalUrlParts.splice(i, 1);
            i--;
        }
    }
    //Isolate command based on baseUrl and params
    return RouteHandlers[originalUrlParts[1]](req.user.user_id, originalUrlParts, params);
}

function players(userId, originalUrlParts, params) {
    //Figure out which command we need
    let command = null;
    if (originalUrlParts.length === 2) {
        //Players.getAll()
        command = 'get_all';
    } else if (originalUrlParts.length === 3 && params.player1Id) {
        //Players.get()
        command = 'get';
    } else if (originalUrlParts[3] === 'compare') {
        //Players.compare()
        command = 'compare';
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }

    //Do the upsert
    return PlayerQueries.upsertSearch(userId, originalUrlParts.join('/'), params)
        .catch(err => {
            logger.error(JSON.stringify(err));
        });
}

function teams(user_id, originalUrlParts, params) {
    //Figure out which command we need
    let command = null;
    if (originalUrlParts.length === 2) {
        //teams.getAll()
        command = 'get_all';
    } else if (originalUrlParts.length === 3 && params.team1Id) {
        //teams.get()
        command = 'get';
    } else if (originalUrlParts[3] === 'compare') {
        //teams.compare()
        command = 'compare';
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }

    //Do the upsert
    return TeamQueries.upsertSearch(userId, originalUrlParts.join('/'), params)
        .catch(err => {
            logger.error(JSON.stringify(err));
        });
}

function games(user_id, originalUrlParts, params) {
    //Figure out which command we need
    let command = null;
    if (originalUrlParts.length === 2) {
        //games.getAll()
        command = 'get_all';
    } else if (originalUrlParts.length === 3 && params.game1Id) {
        //games.get()
        command = 'get';
    } else if (originalUrlParts[3] === 'compare') {
        //games.compare()
        command = 'compare';
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }

    //Do the upsert
    return GameQueries.upsertSearch(userId, originalUrlParts.join('/'), params)
        .catch(err => {
            logger.error(JSON.stringify(err));
        });
}