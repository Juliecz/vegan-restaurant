var mongoose = require('mongoose'),
    connection = require('../config/database');
var tableSchema = new mongoose.Schema({
    name: {
        type: Number,
        required: true,
        unique: true
    },
    seatingNum: {
        type: String,
        required: true,
        enum: ["two", "four", "six"]
    }
});
/*
var Table = connection.model('Table', tableSchema);

var tab = new Table({
    name: 12,
    seatingNum: "two",
    smoking: true
});
tab.save(function (err, tab) {
    if(err) return console.log(err);
    console.dir(arguments);
    console.log('inserting to db admin');
});*/

module.exports = tableSchema;