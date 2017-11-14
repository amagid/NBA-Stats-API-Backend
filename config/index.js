'use strict';
const dev = require('./development');
const prod = require('./production');
const keys = require('./keys');

/**
 * Gets the current configuration
 * 
 * @return {Object} The current configuration.
 */
function get() {
    if (process.env.type === 'development') {
        return dev;
    } else if (process.env.type === 'production') {
        return prod;
    } else {
        return dev;
    }
}

function set(prop, value) {
    if (process.env.type === 'development') {
        dev[prop] = value;
    } else if (process.env.type === 'production') {
        prod[prop] = value;
    } else {
        dev[prop] = value;
    }
}

module.exports = {
    get,
    getKeys: keys.getKeys,
    set
};