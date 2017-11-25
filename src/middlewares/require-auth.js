const jwt = require('../services/jwt');
const publicKey = require('../../config').getKeys().publicKey;

module.exports = requireAuthentication;


function requireAuthentication(req, res, next) {
    let token;
    //Try to extract JWT from header
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (e) {
        //Respond with error state if the JWT wasn't valid
        return res.status(400).json({message: 'Invalid or No JWT Supplied'});
    }
    //Decode token
    return jwt.decode(token)
        .then(data => {
            //Attach payload to req.user for future use
            req.user = data;
            next();
        })
        .catch(err => {
            //If there is an error decoding the JWT, send appropriate error status
            res.status(err.status || 500).json(err);
        });
}