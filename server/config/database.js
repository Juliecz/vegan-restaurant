/**
 * Created by yuliya on 16.3.16.
 */
var mongoose = require('mongoose');

var config = require('./config');
//var __db = mongoose.connection;
var dbMongo = mongoose.createConnection(config.mongoose.uri);
dbMongo.on('error', console.error);
dbMongo.once('open', function() {
    console.log('Connected to database');
});

module.exports = dbMongo;