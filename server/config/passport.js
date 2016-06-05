var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    connection = require('../config/database'),
    userSchema = require('../models/user'),
    User = connection.model('User', userSchema);
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
    passport.use(new LocalStrategy({username: 'username', password: 'password'},
        function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if(err) { console.log('Chyba: local strategy'); return done(err); }
                if(!user) {
                    return done(null, false, {message: 'Incorrect username'});
                }
                if(user.password !== password) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            });
        }));
};
