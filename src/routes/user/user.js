const APIError = require('../../APIError');
const Users = require('../../models/User');
const GameQuery = require('../../models/GameQuery');
const TeamQuery = require('../../models/TeamQuery');
const PlayerQuery = require('../../models/PlayerQuery');

module.exports = {
    get,
    getGameQueries,
    getTeamQueries,
    getPlayerQueries
};

function get(userId) {
    return Users.findById(userId)
        .then(user => {
            //Throw 404 if no user returned
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            //Only return name
            return {
                fname: user.dataValues.fname,
                lname: user.dataValues.lname
            };
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'User Find Failed', err);
        });
}

function getGameQueries(userId) {
    return Users.findById(userId, {
            include: [{
                model: GameQuery
            }]
        })
        .then(user => {
            const gameQueries = [];
            for (let i = 0; i < user.dataValues.game_queries.length; i++) {
                gameQueries.push({
                    url: user.dataValues.game_queries[i].url,
                    searchDate: user.dataValues.game_queries[i].searchDate,
                    command: _formatCommand(user.dataValues.game_queries[i].command)
                });
            }
            return gameQueries;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Game Query Find Failed', err);
        });
}

function getTeamQueries(userId) {
    return Users.findById(userId, {
            include: [{
                model: TeamQuery
            }]
        })
        .then(user => {
            const teamQueries = [];
            for (let i = 0; i < user.dataValues.team_queries.length; i++) {
                teamQueries.push({
                    url: user.dataValues.team_queries[i].url,
                    searchDate: user.dataValues.team_queries[i].searchDate,
                    command: _formatCommand(user.dataValues.team_queries[i].command)
                });
            }
            return teamQueries;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Game Query Find Failed', err);
        });
}

function getPlayerQueries(userId) {
    return Users.findById(userId, {
            include: [{
                model: PlayerQuery
            }]
        })
        .then(user => {
            const playerQueries = [];
            for (let i = 0; i < user.dataValues.player_queries.length; i++) {
                playerQueries.push({
                    url: user.dataValues.player_queries[i].url,
                    searchDate: user.dataValues.player_queries[i].searchDate,
                    command: _formatCommand(user.dataValues.player_queries[i].command)
                });
            }
            return playerQueries;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Game Query Find Failed', err);
        });
}

function _formatCommand(str) {
    return str.toLowerCase().replace(/_/g, ' ').replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase();
    });
}