const Games = require('./games');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise('You\'re a dipshit'));
};