const jwt = require('../services/jwt');
const publicKey = require('../../config').getKeys().publicKey;
const User = require('../models/User');
const APIError = require('../APIError');

module.exports = requireAuthentication;


function requireAuthentication(req, res, next) {
    if (!req.user) {
        return res.status(400).json({message: 'Invalid or No JWT Supplied'});
    } else if (!req.user.user_id) {
        return res.status(400).json({message: 'Bad User Data'});
    }

    return User.validateUser(req.user.user_id)
        .then(result => {
            if (result.userValid) {
                return next();
            } else {
                throw APIError(404, 'Invalid User');
            }
        })
        .catch(err => {
            return res.status(err.status || 500).json({ message: err.message || 'User Validation Failed', additionalData: err });
        });
}