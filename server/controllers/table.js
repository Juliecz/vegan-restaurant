var connection = require('../config/database'),
    tableSchema = require('../models/table');
Table = connection.model('Table', tableSchema);

exports.findAll = function (req, res, next) {
    Table.find(function(err, data) {
        if (err) res.send(err);
        res.json(data);
    });
};
exports.findById = function (req, res) {
    Table.findById(req.params.id, function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
};