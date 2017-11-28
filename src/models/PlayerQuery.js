const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

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
        type: Sequelize.DataTypes.INTEGER,
        field: 'player1_id'
    },

    player2Id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'player2_id'
    },

    command: {
        type: Sequelize.DataTypes.STRING
    },
    
    searchDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    }
});

//Set associations
const User = require('./User');
User.hasMany(PlayerQuery);

//Additional methods
module.exports = Object.assign(PlayerQuery, {
    upsertSearch
});

function upsertSearch(user_id, url, command, data) {
    //Sanitize player1Id with valid value if not supplied
    if (!data.player1Id) {
        data.player1Id = null;
    }
    //Sanitize player2Id with valid value if not supplied
    if (!data.player2Id) {
        data.player2Id = null;
    }
    return PlayerQuery.upsert({
        user_id,
        url,
        command,
        player1Id: data.player1Id,
        player2Id: data.player2Id,
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