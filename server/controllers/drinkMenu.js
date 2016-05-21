var connection = require('../config/database'),
    drinkMenuSchema = require('../models/drinkMenu');
Drink = connection.model('Drink', drinkMenuSchema);

exports.findAll = function (req, res, next) {
    Drink.find(function(err, data) {
        if (err) res.send(err);
        console.log(data);
        res.json(data);
    });
};