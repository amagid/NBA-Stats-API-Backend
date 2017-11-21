const config = require('../../config').get().password;
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = {
    matches
    hash
};

const matches = Promise.promisify(bcrypt.compare);

function hashFunc(password, callback) {
    return bcrypt.hash(password, config.saltRounds, callback);    
}

const hash = Promise.promisify(hashFunc);