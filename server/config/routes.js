
var index = require('../controllers/index'),
    admin = require('../controllers/admin'),
    menu = require('../controllers/menu'),
    users = require('../controllers/user'),
    tables = require('../controllers/table'),
    dailyMenu = require('../controllers/dailyMenu'),
    auth = require('../controllers/authenticate'),
    passport = require('passport');

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
    app.get('/api/dailymenu', dailyMenu.findAll);
    app.get('/api/dailymenu/day', dailyMenu.enumDay);
    app.get('/api/dailymenu/type', dailyMenu.enumType);
    app.get('/api/dailymenu/sort', dailyMenu.enumSort);
    app.get('/api/user', auth.checkAuthenticate, users.findAll);
    app.get('/api/table', tables.findAll);
    
    // TODO routes user
    /*app.get('/api/user/:id', );
    app.post('/api/user', ); //create user
    app.get('/api/user/:id', ); //details of an user
    app.put('/api/user/:id', ); //update
    app.delete('/api/user/:id', ); //delete
    */
    app.post('/api/login', passport.authenticate('local'), auth.login);
    app.get('/api/logged', auth.logged);
    app.get('/api/logout', auth.logout);

};
