const Python = require('../../../services/python');

module.exports = {
    getAll,
    get,
    compare
};

function getAll() {
    return Python.run('teamId.py')
        .then(teams => {
            if (!teams) {
                throw APIError(404, 'No Teams Found');
            }
            return teams;
        })
        .catch(err => {
            throw APIError(err.status || 500, err.message || 'Error retrieving Teams', err);
        });
}