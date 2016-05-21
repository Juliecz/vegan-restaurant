var connection = require('../config/database'),
    dailyMenuSchema = require('../models/dailyMenu');
DailyMenu = connection.model('DailyMenu', dailyMenuSchema);

exports.findAll = function (req, res, next) {
    DailyMenu.find(function(err, data) {
        if (err) res.send(err);
        console.log(data);
        res.json(data);
    });
};

exports.enumDay = function (req, res) {
    var arr = DailyMenu.schema.path('day').enumValues;
    res.send(JSON.stringify(arr));
};
exports.enumSort = function (req, res) {
    var arr = DailyMenu.schema.path('foodSort').enumValues;
    res.send(JSON.stringify(arr));
};
exports.enumType = function (req, res) {
    var arr = DailyMenu.schema.path('foodType').enumValues;
    res.send(JSON.stringify(arr));
};