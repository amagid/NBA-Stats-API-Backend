const RouteHandlers = {
    players,
    teams,
    games
};

module.exports = function(req, res, next) {
    const { originalUrl, params } = req;
    const originalUrlParts = originalUrl.split('/');
    //Isolate command based on baseUrl and params
    RouteHandlers[originalUrlParts[2]](originalUrlParts, params);
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