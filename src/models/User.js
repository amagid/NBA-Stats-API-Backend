const Sequelize = require('sequelize');
const db = require('../services/db').getConnection();
const APIError = require('../APIError');

const User = db.define('users', {
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

    verified: {
        type: Sequelize.DataTypes.BOOLEAN
    },

    fname: {
        type: Sequelize.DataTypes.STRING
    },

    lname: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    classMethods: {
        findByEmail,
        validateUser
    }
});

function findByEmail(email) {
    return User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            return user.dataValues;
        });
}

function findByToken(token) {
    return User.findOne({
        where: {
            token,
            verified: false
        }
    })
    .then(user => {
        if (!user) {
            throw APIError(400, 'Invalid Token');
        }
        return user.dataValues;
    });
}

function validateUser(userid) {
    //Search database for user to see if they exist
    return User.findById(userid)
        .catch(err => {
            //Throw error if something goes wrong with query
            throw APIError(err.status || 500, err.message || 'User Find Failed', err);
        })
        .then(user => {
            //If no user found, throw 404
            if (!user) {
                throw APIError(404, 'User Not Found');
            }
            //Otherwise, return userValid = true
            return {
                userValid: true
            };
        });
}

module.exports = Object.assign(User, {
    findByEmail,
    findByToken,
    validateUser
});