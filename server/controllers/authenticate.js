/**
 * Created by yuliya on 20.5.16.
 */

exports.login = function(req, res) {
        res.send(req.user);
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.checkAuthenticate = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else { next();}
};
exports.logged = function (req, res) {
    res.send(res.send(req.isAuthenticated() ? req.user : 0));
};