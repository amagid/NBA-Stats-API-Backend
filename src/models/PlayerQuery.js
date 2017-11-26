const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

//Define model
const PlayerQuery = db.define('player_queries', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    player_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    player2_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    command: {
        type: Sequelize.DataTypes.STRING
    }
});

//Set associations
const User = require('./User');
User.hasMany(PlayerQuery);

//Additional methods
module.exports = Object.assign(PlayerQuery, {

});