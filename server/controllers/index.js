/**
 * Created by yuliya on 15.3.16.
 */
var Menu = require('../models/menu');

exports.render = function (req, res, next) {
    res.render('index', { title: 'Vegan Restaurant'});
};