const baseUrl = require('../../config').get().urls.baseUrl;
const Promise = require('bluebird');
const logger = require('../services/logger');
const doSearchSave = require('./do-search-save');

module.exports = attachResponsePromise;

//ResponsePromise middleware function - accepts promises and translates them into HTTP responses.
function attachResponsePromise(req, res, next) {
    //Attach function to res object
    res.promise = response => {
        //Wait for input promise to resolve
        return Promise.resolve(response)
            .then(result => {
                //If we got a result and that result is a redirect
                if (result && result.redirectUrl) {
                    //Redirect user to appropriate location
                    res.redirect(baseUrl + result.redirectUrl);
                } else {
                    //Otherwise, assume 200 status and return the result, wrap in {message: ''} if result is a string
                    res.status(200).json(typeof result === 'string' ? { message: result } : result);
                }
            })
            .catch(error => {
                //Error codes can be anything 4xx or 5xx, so add a warning message to server logs
                logger.warn(error);
                //Send error to user. Default to 500 status if no status and 'Unknown Error' if no message
                res.status(error.status || error.statusCode || 500).json({ message: error.message || 'Unknown Error' });
            })
            .catch(error => {
                //If there was an error in the previous block, this is an internal server error that we need to deal with
                //Log the error in the Exceptions log
                logger.error(error);
                //Respond with 500, 'Unknown Error', and the original error just for good measure
                res.status(500).json({ message: 'Unknown Error', error });
            })
            .then(() => {
                //Now that the result has been successfully dealt with, save the search
                //TODO: Only save if the response was 200 status
                doSearchSave(req, res);
            });
    };
    next();
}