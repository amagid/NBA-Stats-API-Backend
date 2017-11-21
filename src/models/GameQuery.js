const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

//Define model
const GameQuery = module.exports = db.define('game_queries', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    game_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    game2_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    command: {
        type: Sequelize.DataTypes.STRING
    }
});

//Set associations
const User = require('./User');
User.hasMany(GameQuery);