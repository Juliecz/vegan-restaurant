var local = require('passport-local').Strategy,
    passport = require('passport');
exports.login = function(req, res) {
    console.log(req.body);
    //res.redirect('/api/user');
    res.send(req.body);
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.checkAuthenticate = function (req, res, next) {
    if (!req.isAuthenticated()) {
        //TODO choose
        // TODO if role is user or admin then localhost:3000/api/user is not available
        //res.send(401); ___ 
        res.render('404');
        //res.redirect('/');
    }
    else {
        next();
    }
};
exports.logged = function (req, res) {
    //todo comment
    if (req.isAuthenticated()) {
        console.log('Logged: ', req.session.passport.user); //TODO user id
    }
    else {
        console.log('Not logged');
    }
    res.send(req.isAuthenticated() ? req.session.passport.user : 0);
};