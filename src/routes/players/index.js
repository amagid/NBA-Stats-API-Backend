const Players = require('./players');

module.exports = function(router) {
    router.get('/', (req, res) => res.promise('You\'re a dipshit'));
};