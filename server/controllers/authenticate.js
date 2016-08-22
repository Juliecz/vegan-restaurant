var local = require('passport-local').Strategy,
    passport = require('passport');
exports.login = function(req, res) {
    console.log(req.body);
    res.send(req.body);
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.checkAuthenticate = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('404');
    }
    else {
        next();
    }
};
exports.logged = function (req, res) {
    //todo comment
    if (req.isAuthenticated()) {
        res.send(req.session.passport.user);
    }
    else {
        res.sendStatus(401)
    }
};