const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();

//Define model
const TeamQuery = module.exports = db.define('team_queries', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },

    team_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    team2_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    team3_id: {
        type: Sequelize.DataTypes.INTEGER
    },

    command: {
        type: Sequelize.DataTypes.STRING
    }
});

//Set associations
const User = require('./User');
User.hasMany(TeamQuery);