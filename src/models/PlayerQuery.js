const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();
const APIError = require('../APIError');

//Define model
const PlayerQuery = db.define('player_queries', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },

    url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },

    player1Id: {
        type: Sequelize.DataTypes.STRING,
        field: 'player1_id'
    },

    player2Id: {
        type: Sequelize.DataTypes.STRING,
        field: 'player2_id'
    },

    command: {
        type: Sequelize.DataTypes.STRING
    },

    searchDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: 'search_date'
    }
});

//Set associations
const User = require('./User');
User.hasMany(PlayerQuery);

//Additional methods
module.exports = Object.assign(PlayerQuery, {
    upsertSearch
});

function upsertSearch(userId, url, command, data) {
    //Sanitize player1Id with valid value if not supplied
    if (!data.player1Id) {
        data.player1Id = null;
    }
    //Sanitize player2Id with valid value if not supplied
    if (!data.player2Id) {
        data.player2Id = null;
    }
    return PlayerQuery.find({
            where: {
                userId,
                url
            }
        })
        .then(query => {
            if (!query) {
                return PlayerQuery.create({
                    userId,
                    url,
                    command,
                    player1Id: data.player1Id,
                    player2Id: data.player2Id,
                    searchDate: (new Date).toISOString()
                });
            } else {
                return PlayerQuery.update({
                    searchDate: (new Date).toISOString()
                }, {
                    where: {
                        userId,
                        url
                    }
                });
            }
        })
        .then(created => {
            return {
                rowCreated: !!created,
                rowUpdated: !created
            }
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Query Save Failed', err);
        });
}