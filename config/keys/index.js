'use strict';
const fs = require('fs');
const path = require('path');

function getKeys() {
    const privateKey = fs.readFileSync(path.join(__dirname, 'jwt-private.key')).toString();
    const publicKey = fs.readFileSync(path.join(__dirname, 'jwt-public.key')).toString();
    return {
        privateKey,
        publicKey
    };
}

module.exports = {
    getKeys
};