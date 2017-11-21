const config = require('../../config').get().db;
const Sequelize = require('sequelize');
const connection = new Sequelize(db.name, db.username, db.password, db.settings);

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