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
    },

    category: {
        type: Sequelize.DataTypes.ENUM('p', 't', 'g'),
        allowNull: false
    }
});

//Set associations
const User = require('./User');
User.hasMany(TeamQuery);

//Additional methods
module.exports = Object.assign(TeamQuery, {

});