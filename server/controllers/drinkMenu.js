var connection = require('../config/database'),
    drinkMenuSchema = require('../models/drinkMenu');
Drink = connection.model('Drink', drinkMenuSchema);

function FindAll(res) {
    Drink.find(function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
}
exports.findAll = function (req, res, next) {
    FindAll(res);
};
exports.getById = function (req, res) {
    Drink.findById(req.params.id, function (err, data) {
        if(err) { res.send(err); }
        else { res.json(data); }
    });
};
exports.createDrink = function (req, res) {
    var drink = Drink({
        drinkName: req.body.drinkName,
        drinkDescription: req.body.drinkDescription,
        drinkType: req.body.drinkType,
        drinkSort: req.body.drinkSort,
        price: req.body.price
    });
    drink.save(function (err, menu) {
        if(err) { res.send(err); }
        else { FindAll(res); }
    });
};
exports.deleteDrink = function (req, res) {
    Drink.findByIdAndRemove(req.params.id, function (err) {
        if (err) { res.send(err);}
        else { FindAll(res);}
    });
};
exports.editDrink = function (req, res) {
    Drink.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err) {
        if (err) res.send(err);
        else FindAll(res);
    });
};
exports.enumSort = function (req, res, next) {
    var arr = Drink.schema.path('drinkSort').enumValues;
    res.send(JSON.stringify(arr));
    //res.sendStatus(404);
};