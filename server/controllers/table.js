/**
 * Created by yuliya on 13.4.16.
 */
var connection = require('../config/database'),
    tableSchema = require('../models/table');
Table = connection.model('Table', tableSchema);

exports.findAll = function (req, res, next) {
    Table.find(function(err, data) {
        if (err) res.send(err);
        console.log(data);
        res.json(data);
    });
};