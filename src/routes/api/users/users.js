const APIError = require('../../../APIError');
const Users = require('../../../models/User');
const GameQuery = require('../../../models/GameQuery');
const TeamQuery = require('../../../models/TeamQuery');
const PlayerQuery = require('../../../models/PlayerQuery');

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
            console.log(user);
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Game Query Find Failed', err);
        });
}