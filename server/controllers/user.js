
var connection = require('../config/database'),
    userSchema = require('../models/user');
    User = connection.model('User', userSchema);

function randomPassword() {
    var charts = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var password = '';
    var lengthPass = 7;
    for (var i=0; i<lengthPass; i++) {
        var rand = Math.floor(Math.random()*charts.length);
        password += charts.substring(rand, rand+1);
    }
    return password;
}
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
exports.createUser = function (req, res) {
    var p = randomPassword();
    var user = User({
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        password: p,
        emailMessage: true
    });
    user.save(function (err, user) {
        if (err) { console.log(err); res.send(err); }
        else {
            User.find(function(err, data) {
                if (err) res.send(err);
                console.log(data);
                res.json(data);
            });
        }
    });
};
exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) { console.log(err); res.send(err); }
    });
};
exports.editUser = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if(err) { console.log(err); res.send(err);}
    });
};