
var index = require('../controllers/index'),
    admin = require('../controllers/admin'),
    menu = require('../controllers/menu'),
    users = require('../controllers/user'),
    tables = require('../controllers/table'),
    dailyMenu = require('../controllers/dailyMenu'),
    drinks = require('../controllers/drinkMenu'),
    auth = require('../controllers/authenticate'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport) {

    app.get('/', index.render);
    //TODO admin route
    app.get('/admin', admin.render);

    app.get('/api/menu', menu.findAll);
    app.post('/api/menu', menu.createFood);
    app.get('/api/menu/type', menu.enumType);
    app.get('/api/menu/sort', menu.enumSort);
    app.put('/api/menu/:id', menu.editFood);
    app.delete('/api/menu/:id', menu.deleteFood);

    app.get('/api/drinkmenu', drinks.findAll);
    app.get('/api/drinkmenu/sort', drinks.enumSort);
    app.get('/api/drinkmenu/id/:id', drinks.getById);
    app.put('/api/drinkmenu/:id', drinks.editDrink);
    app.post('/api/drinkmenu', drinks.createDrink);
    app.delete('/api/drinkmenu/:id', drinks.deleteDrink);


    app.get('/api/dailymenu', dailyMenu.findAll);
    app.get('/api/dailymenu/id/:id', dailyMenu.findById);
    app.get('/api/dailymenu/day', dailyMenu.enumDay);
    app.get('/api/dailymenu/type', dailyMenu.enumType);
    app.get('/api/dailymenu/sort', dailyMenu.enumSort);
    app.put('/api/dailymenu/:id', dailyMenu.editFood);
    app.delete('/api/dailymenu/:id', dailyMenu.deleteFood);
    app.post('/api/dailymenu', dailyMenu.createFood);

    app.get('/api/user', auth.checkAuthenticate, users.findAll); //all users
    app.get('/api/table', tables.findAll);
    
    // TODO routes user
    app.get('/api/user/:id', users.findUserById);
    /*app.post('/api/user', ); //create user
    app.get('/api/user/:id', ); //details of an user
    app.put('/api/user/:id', ); //update
    app.delete('/api/user/:id', ); //delete
    */
    app.post('/api/login', passport.authenticate('local'), auth.login);
    app.get('/api/logged', auth.logged);
    app.get('/api/logout', auth.logout);

};
