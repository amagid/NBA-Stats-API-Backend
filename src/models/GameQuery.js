const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

//Define model
const GameQuery = db.define('game_queries', {
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

    team1Id: {
        type: Sequelize.DataTypes.STRING,
        field: 'team1_id'
    },

    team2Id: {
        type: Sequelize.DataTypes.STRING,
        field: 'team2_id'
    },

    team3Id: {
        type: Sequelize.DataTypes.STRING,
        field: 'team3_id'
    },

    year1: {
        type: Sequelize.DataTypes.INTEGER
    },

    year2: {
        type: Sequelize.DataTypes.INTEGER
    },

    command: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },

    searchDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: 'search_date'
    }
}, {
    uniqueKeys: {
        userUrls: {
            fields: ['user_id', 'url']
        }
    }
});

//Set associations
const User = require('./User');
User.hasMany(GameQuery);

//Additional methods
module.exports = Object.assign(GameQuery, {
    upsertSearch
});

function upsertSearch(userId, url, command, data) {
    //sanitize team1Id with valid value if not supplied
    if (!data.team1Id) {
        data.team1Id = null;
    }
    //sanitize team2Id with valid value if not supplied
    if (!data.team2Id) {
        data.team2Id = null;
    }
    //sanitize team3Id with valid value if not supplied
    if (!data.team3Id) {
        data.team3Id = null;
    }
    //sanitize year1 with valid value if not supplied
    if (!data.year1) {
        data.year1 = null;
    }
    //sanitize year2 with valid value if not supplied
    if (!data.year2) {
        data.year2 = null;
    }
    return GameQuery.find({
            where: {
                userId,
                url
            }
        })
        .then(query => {
            if (!query) {
                return GameQuery.create({
                    userId,
                    url,
                    command,
                    team1Id: data.team1Id,
                    team2Id: data.team2Id,
                    team3Id: data.team3Id,
                    year1: data.year1,
                    year2: data.year2,
                    searchDate: (new Date).toISOString()
                });
            } else {
                return GameQuery.update({
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