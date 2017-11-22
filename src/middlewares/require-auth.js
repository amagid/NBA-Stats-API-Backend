const jwt = require('../services/jwt');

module.exports = requireAuthentication;

function requireAuthentication(req, res, next) {
    const token = req.headers.Authorization.split(' ')[1];
    return jwt.decode(token)
        .then(data => {
            req.user = data;
            next();
        })
        .catch(err => {
            res.status(err.status || 500).json(err);
        });
}