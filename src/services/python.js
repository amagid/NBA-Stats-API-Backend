const PythonShell = require('python-shell');

module.exports = {
    run
};

function run(filename, args = []) {
    return new Promise(function(resolve, reject) {
        PythonShell.run('../../python/' + filename, args, function(err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(JSON.parse(results));
        });
    });
}