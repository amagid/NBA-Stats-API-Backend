const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

//Define model
const TeamQuery = db.define('team_queries', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    
    searchDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    }
});

//Set associations
const User = require('./User');
User.hasMany(TeamQuery);

//Additional methods
module.exports = Object.assign(TeamQuery, {
    upsertSearch
});

function upsertSearch(user_id, url) {
    return TeamQuery.upsert({
        user_id,
        url,
        searchDate: (new Date).toISOString()
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