const logger = require('../services/logger');
const jwt = require('../services/jwt');
const publicKey = require('../../config').getKeys().publicKey;

module.exports = function (req, res, next) {
    let token;
    //Try to extract JWT from header
    try {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw 'No JWT Supplied';
        }
    } catch (e) {
        //Ignore if no token found
        return next();
    }
    //Decode token
    return jwt.decode(token)
        .then(data => {
            //Attach payload to req.user for future use
            req.user = data;
        })
        .catch(err => {
            //If there is an error decoding the JWT, don't attach any user data, log issue
            logger.warn(`Bad JWT supplied. Reason: ${JSON.stringify(err, null, 4)}`);
        })
        .then(next);
}