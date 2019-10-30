const mongoose = require('mongoose');
const dbName = 'taskmanager';
const dbUrl = "mongodb://localhost:27017";

module.exports = {
    mongoose,
    dbName,
    dbUrl
}