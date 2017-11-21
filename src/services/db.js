const config = require('../../config').get().db;
const Sequelize = require('sequelize');
const connection = new Sequelize(config.name, config.username, config.password, config.settings);

module.exports = {
    testConnection,
    getConnection
};

function testConnection() {
    return connection.authenticate();
}

function getConnection() {
    return connection;
}