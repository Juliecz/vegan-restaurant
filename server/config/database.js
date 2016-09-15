var mongoose = require('mongoose'),
    config = require('./config'),
    mongoURI = process.env.MONGODB_URI || config.mongoose.uri,
    dbMongo = mongoose.createConnection(mongoURI);
dbMongo.on('error', console.error);
dbMongo.once('open', function() {
    console.log('Connected to database');
});

module.exports = dbMongo;