const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();
const APIError = require('../../APIError');

const User = module.exports = db.define('users', {
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
}, {
    classMethods: {
        findByEmail
    }
});

function findByEmail(email) {
    return User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            return user;
        });
}