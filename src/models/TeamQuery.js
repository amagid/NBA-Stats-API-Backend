const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();
const APIError = require('../APIError');

//Define model
const TeamQuery = db.define('team_queries', {
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

    dataType: {
        type: Sequelize.DataTypes.STRING,
        field: 'data_type'
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
User.hasMany(TeamQuery);

//Additional methods
module.exports = Object.assign(TeamQuery, {
    upsertSearch
});

function upsertSearch(userId, url, command, data) {
    //Sanitize team1Id with valid value if not supplied
    if (!data.team1Id) {
        data.team1Id = null;
    }
    //Sanitize team2Id with valid value if not supplied
    if (!data.team2Id) {
        data.team2Id = null;
    }
    //Sanitize dataType with valid value if not supplied
    if (!data.dataType) {
        data.dataType = null;
    }
    return TeamQuery.find({
            where: {
                userId,
                url
            }
        })
        .then(query => {
            if (!query) {
                return TeamQuery.create({
                    userId,
                    url,
                    command,
                    team1Id: data.team1Id,
                    team2Id: data.team2Id,
                    dataType: data.dataType,
                    searchDate: (new Date).toISOString()
                });
            } else {
                return TeamQuery.update({
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