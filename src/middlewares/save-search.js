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
    if (originalUrlParts.length === 3) {
        //Players.getAll()
    } else if (originalUrlParts[4] === 'compare') {
        //Players.compare
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}

function teams(baseUrlParts, params) {
    if (originalUrlParts.length === 3) {
        //Teams.getAll()
    } else if (originalUrlParts[4] === 'compare') {
        //Teams.compare
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}

function games(baseUrlParts, params) {
    if (originalUrlParts.length === 3) {
        //Games.getAll()
    } else if (originalUrlParts[4] === 'compare') {
        //Games.compare
    } else {
        logger.error(`ROUTE NOT FOUND: ${originalUrlParts.join('/')}`);
    }
}