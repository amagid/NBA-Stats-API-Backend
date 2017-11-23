const Promise = require('bluebird');
const logger = require('../services/logger');

module.exports = attachResponsePromise;

function attachResponsePromise(req, res, next) {
    res.promise = response => {
        return Promise.resolve(response)
            .then(result => {
                res.status(200).json(typeof result === 'string' ? { message: result } : result);
            })
            .catch(error => {
                logger.warn(error);
                res.status(error.status || error.statusCode || 500).json({ message: error.message || 'Unknown Error' });
            })
            .catch(error => {
                logger.error(error);
                res.status(500).json({ message: 'Unknown Error', error });
            });
    };
    next();
}