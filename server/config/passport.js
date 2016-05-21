var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');//mongoose.model('User'),
    config = require('./config');

module.exports = function (passport) {
    passport.serializeUser( function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //local strategy
    passport.use(new LocalStrategy({usernameField: 'username',
    passwordField: 'password'},
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if(err) return done(err);
            if(!user) return done(null, false, {message: 'Incorrect username'});
            if(!user.authenticate(password)) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
            
        });
    }));
};