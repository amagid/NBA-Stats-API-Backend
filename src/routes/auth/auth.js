const User = require('../../models/User');
const authService = require('../../services/auth');
const emailService = require('../../services/email');
const APIError = require('../../APIError');
const uuid = require('uuid');

module.exports = {
    login,
    checkUserData,
    signup,
    verifyEmail
};

function login(email, password) {
    return authService.attemptLogin(email, password);
}

//Check if user data from JWT is valid
function checkUserData(userData) {
    //If we have an id and it's a number, check to see if it corresponds to a User in the db
    if (userData && userData.user_id && typeof userData.user_id === 'number') {
        return User.validateUser(userData.user_id);
    }
    //Otherwise, the data is invalid
    return Promise.reject(APIError(400, 'Invalid User Data'));
}

function signup(email, password, fname, lname) {
    return authService.hashPassword(password)
        .then(hash => {
            return User.create({
                    email,
                    password: hash,
                    fname,
                    lname
                })
                .then(user => {
                    const token = uuid.v4();
                    return Promise.all([emailService.sendVerificationEmail(user.dataValues, token),
                                        User.update({ token }, { where: { id: user.id } })]);
                })
                .spread((emailResult, updateResult) => {
                    return emailResult;
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        throw APIError(400, 'Email Already In Use');
                    } else if (err.message === 'Validation error') {
                        throw APIError(400, 'Invalid Data')
                    }
                    throw APIError(err.status || 500, err.message || 'User Creation Failed', err);
                });
        });
}

function verifyEmail(token) {
    return User.findByToken(token)
        .then(user => {
            if (!user || user.verified) {
                throw APIError(404, 'Invalid Token');
            }
            return User.update({ token: null, verified: true }, { where: { id: user.id } });
        })
        .then(() => {
            return { message: 'Verification Complete'};
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'User Find Failed', err);
        });
}