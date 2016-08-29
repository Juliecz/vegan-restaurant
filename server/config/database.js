/**
 * Created by yuliya on 16.3.16.
 */
var mongoose = require('mongoose');

var config = require('./config');
var mongoURI = process.env.MONGODB_URI || config.mongoose.uri;
var dbMongo = mongoose.createConnection(mongoURI);
dbMongo.on('error', console.error);
dbMongo.once('open', function() {
    console.log('Connected to database');
});

module.exports = dbMongo;