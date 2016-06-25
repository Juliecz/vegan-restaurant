
var connection = require('../config/database'),
    userSchema = require('../models/user');
    User = connection.model('User', userSchema);

exports.findAll = function (req, res, next) {
    User.find(function(err, data) {
        if (err) res.send(err);
        console.log(data);
        res.json(data);
    });
};
exports.findUserById = function (req, res) {
    User.findById(req.params.id, function (err, data) {
        if(err) { res.send(err); }
        else { res.json(data); }
    });
};