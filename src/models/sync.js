const User = require('./User');
const PlayerQuery = require('./PlayerQuery');
const TeamQuery = require('./TeamQuery');
const GameQuery = require('./GameQuery');

module.exports = sync;

function sync() {
    return User.sync()
    .then(() => PlayerQuery.sync)
    .then(() => TeamQuery.sync)
    .then(() => GameQuery.sync);
}