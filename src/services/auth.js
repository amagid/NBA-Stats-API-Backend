const config = require('../../config').get().password;
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const User = require('../models/User');
const JWTService = require('./jwt');

const hashPassword = Promise.promisify(hashFunc);

module.exports = {
    attemptLogin,
    hashPassword
};

const checkPassword = Promise.promisify(bcrypt.compare);

function hashFunc(password, callback) {
    return bcrypt.hash(password, config.saltRounds, callback);    
}

function attemptLogin(email, password) {
    return User.findByEmail(email)
        .then(user => {
            return Promise.all([user, checkPassword(password, user.password)]);
        })
        .spread((user, match) => {
            if (!match) {
                throw APIError(401, "Incorrect Password");
            }
            return JWTService.generate({user_id: user.id});
        });
}