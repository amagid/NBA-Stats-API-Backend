const PythonShell = require('python-shell');
const pythonConfig = require('../../config').get().python;
pythonConfig.scriptPath = __dirname + pythonConfig.scriptPath;

module.exports = {
    run
};

function run(filename, args = []) {

    return new Promise(function(resolve, reject) {
        PythonShell.run(filename, Object.assign({args}, pythonConfig), function(err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(JSON.parse(results));
        });
    });
}