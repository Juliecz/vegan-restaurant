var User = require('../models/user');

exports.render = function (req, res, next) {
    res.render('admin', { title: 'Vegan Restaurant'});
};