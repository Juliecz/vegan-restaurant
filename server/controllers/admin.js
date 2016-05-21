/**
 * Created by yuliya on 15.3.16.
 */
var //findUsers = require('../services'),
    User = require('../models/user');

exports.render = function (req, res, next) {
    res.render('admin', { title: 'Vegan Restaurant'});
};