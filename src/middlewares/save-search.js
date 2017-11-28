const RouteHandlers = {
    players,
    teams,
    games
};

module.exports = function(req, res, next) {
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
    RouteHandlers[originalUrlParts[1]](originalUrlParts, params);
}

function players(originalUrlParts, params) {
    if (originalUrlParts.length === 2) {
        //Players.getAll()
    } else if (originalUrlParts.length === 3 && params.player1Id) {
        //Players.get()
    } else if (originalUrlParts[3] === 'compare') {
        //Players.compare()
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}

function teams(originalUrlParts, params) {
    if (originalUrlParts.length === 2) {
        //teams.getAll()
    } else if (originalUrlParts.length === 3 && params.team1Id) {
        //teams.get()
    } else if (originalUrlParts[3] === 'compare') {
        //teams.compare()
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}

function games(originalUrlParts, params) {
    if (originalUrlParts.length === 2) {
        //games.getAll()
    } else if (originalUrlParts.length === 3 && params.game1Id) {
        //games.get()
    } else if (originalUrlParts[3] === 'compare') {
        //games.compare()
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}