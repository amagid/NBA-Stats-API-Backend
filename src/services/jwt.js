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
            console.log(token);
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'JWT Creation Failed', err);
        });
}

function decode(token) {
    return decodeJWT(token, publicKey, {algorithms:['RS256']})
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'JWT Invalid', err);
        });
}