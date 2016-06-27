var connection = require('../config/database'),
    menuSchema = require('../models/menu');
    Menu = connection.model('Menu', menuSchema);

function findAllFunc(res) {
    Menu.find(function(err, data) {
        if (err) res.send(err);
        res.json(data);
    });
}

exports.findAll = function (req, res, next) {
    findAllFunc(res);
};

exports.createFood = function (req, res, next) {
    var price = Number(req.body.price);
    var menu = Menu({
        foodName: req.body.foodName,
        foodDescription: req.body.foodDescription,
        foodType: req.body.foodType,
        foodSort: req.body.foodSort,
        price: price
    });
    menu.save(function (err, menu) {
        if(err) { res.send(err); }
        else {
            console.log(menu);
            findAllFunc(res);
        }
        });
};

exports.enumType = function (req, res, next) {
    var arr = Menu.schema.path('foodType').enumValues;
    res.send(JSON.stringify(arr));
};
exports.enumSort = function (req, res, next) {
    var arr = Menu.schema.path('foodSort').enumValues;
    res.send(JSON.stringify(arr));
};

exports.deleteFood = function (req, res, next) {
    Menu.findByIdAndRemove(req.params.id, function (err) {
        if(err) { console.log(err); res.send(err); }
        else {  findAllFunc(res); }
    });
    //console.log('Data req body: ', req.params.id);
};
exports.editFood = function (req, res) {
    Menu.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err, result) {
        if(err) { console.log(err); res.send(err);}
        else {
            findAllFunc(res);
        }
    });
    //console.log('Edit food params ', req.params, 'Req body: ', req.body);
};