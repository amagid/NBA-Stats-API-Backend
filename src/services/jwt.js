const APIError = require('../APIError');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const {privateKey, publicKey} = require('../../config').getKeys();

const makeJWT = Promise.promisify(jwt.sign);
const decodeJWT = Promise.promisify(jwt.verify);

module.exports = {
    generate,
    decode
};

function generate(data) {
    return makeJWT(data, privateKey, {algorithm: 'RS256'})
        .then(token => {
            return { token };
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'JWT Creation Failed', err);
        });
}

/**
 * Decode a JWT and return payload
 * 
 * @param {any} token The JWT to decode
 * @returns {Promise<Object>} A Promise containing the payload from the JWT
 */
function decode(token) {
    //Decode the JWT using the RS256 algorithm
    return decodeJWT(token, publicKey, {algorithms:['RS256']})
        .catch(err => {
            //Translate various jsonwebtoken errors to our format
            if (err.message === 'invalid signature') {
                throw APIError(400, 'JWT Invalid', err);
            } else if (err.message === 'jwt must be provided') {
                throw APIError(400, 'No JWT Provided', err);
            } else if (err.message === 'invalid token') {
                throw APIError(400, 'Invalid JWT', err);
            }
            //General case
            throw APIError(err.status || 500, err.message || 'JWT Invalid', err);
        });
}