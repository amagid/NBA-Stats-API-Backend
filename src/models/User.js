const Sequelize = require('sequelize');
const db = require('../services/db');

db.define('users', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.DataTypes.STRING
    },

    token: {
        type: Sequelize.DataTypes.STRING,
        unique: true
    },

    fname: {
        type: Sequelize.DataTypes.STRING
    },

    lname: {
        type: Sequelize.DataTypes.STRING
    }
});