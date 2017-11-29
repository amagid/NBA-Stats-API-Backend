module.exports = function(req, res, next) {
    req.saveSearch = true;
    next();
};