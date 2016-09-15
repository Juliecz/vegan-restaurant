var Menu = require('../models/menu');

exports.render = function (req, res, next) {
    res.render('index', { title: 'Vegan Restaurant'});
};