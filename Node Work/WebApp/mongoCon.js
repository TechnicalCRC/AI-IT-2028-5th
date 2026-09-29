let { MongoClient } = require("mongodb");

let client = new MongoClient('mongodb://localhost:27017');

module.exports.client = client;
module.exports.dbName = 'AI&IT';
