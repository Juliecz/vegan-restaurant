var connection = require('../config/database'),
    dailyMenuSchema = require('../models/dailyMenu');
DailyMenu = connection.model('DailyMenu', dailyMenuSchema);

exports.findAll = function (req, res, next) {
    DailyMenu.find(function(err, data) {
        if (err) res.send(err);
        res.json(data);
    });
};
exports.findById = function (req, res) {
    DailyMenu.findById(req.params.id, function (err, data) {
        if (err) { res.send(err);}
        else { res.json(data); }
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
exports.editFood = function (req, res) {
    DailyMenu.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, result) {
        if(err) { console.log(err); res.send(err);}
        else {
            /*DailyMenu.find(function(err, data) {
                if (err) {console.log(err); res.send(err);}
                res.json(data);
            });*/
        }
    });
};
exports.deleteFood = function (req, res) {
    DailyMenu.findByIdAndRemove(req.params.id, function (err, result) {
        if(err) { res.send(err);}
        else {
            DailyMenu.find(function(err, data) {
                if (err) { res.send(err);}
                res.json(data);
            });
        }
    });
};
exports.createFood = function (req, res) {
    var price = Number(req.body.price);
    var drink = DailyMenu({
        foodName: req.body.foodName,
        foodDescription: req.body.foodDescription,
        foodType: req.body.foodType,
        foodSort: req.body.foodSort,
        day: req.body.day,
        price: price
    });
     drink.save(function (err, menu) {
         if(err) { res.send(err); }
         else {
             DailyMenu.find(function(err, data) {
                 if (err) res.send(err);
                 res.json(data);
             });
        }
     });
};