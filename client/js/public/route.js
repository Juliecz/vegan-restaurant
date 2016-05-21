var routeApp = angular.module('public', ['ui.router', 'ui.bootstrap']);
routeApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('public/home');

    $stateProvider
        .state('public', {
            abstract: true,
            //name: 'public',
            url: '/public',
            views: {
                //'header' : { templateUrl: '/public/views/header.html'},
                'main': { templateUrl: '/views/public/content.html'}//'<div ui-view="public"></div>' }
            }
        })
        .state('public.home', {
            url: '/home',
            views: {
             'public' : { templateUrl: '/views/public/home.html' }
             },
            controller: 'homeCtrlP'
        })
        .state('public.menu', {
            url: '/menu',
            views: {
                'public' : { templateUrl: '/views/public/menu.html' }
            },
            controller: 'menuCtrl'
        })
        .state('public.contact', {
            url: '/contact',
            views: {
                'public' : { templateUrl: '/views/public/contact.html' }
            },
            controller: 'contactCtrl'
        })
        .state('public.reservation', {
            url: '/reservation',
            views: {
                'public' : { templateUrl: '/views/public/tables.html' }
            },
            controller: 'tablesCtrl'
        });
}]);


routeApp.controller('headCtrl', function($scope) {
    /*$(window).scroll(function(){
        if ($(this).scrollTop()>150) {
            $('.navbar').addClass('navbar-fixed-top');
            $('li:hidden').show('fast');
        }
        else {
            $('.navbar').removeClass('navbar-fixed-top');
            $('li:last').hide();
        }
    });*/
});
/*myApp*/ routeApp.run(['$state', '$location', function ($state, $location) {
    $state.go('public.home');
}]);

myApp.controller('contentCtrl', function($scope, $location, $state) {
    console.log($location.absUrl());
    console.log($state.current);
    $scope.setContent = function () {
        var currentUrl = $location.absUrl();
        var templateFile = "";
        if(currentUrl.indexOf('localhost:3000/#/public')>-1) {
            templateFile = '/views/public/content.html';
        }
        /*else if (currentUrl.indexOf('localhost:3000/#/admin')>-1) {
            templateFile = '/admin/views/content.html';
        }
        else if(currentUrl.indexOf('login')>-1){
            templateFile = '/admin/views/login.html';
            //console.log('login page');
        }
        else {
            window.location = 'http://localhost:3000/#/public/home';
            templateFile = '/public/views/content.html';
        }*/
        return templateFile;
    };
    $(window).resize(function () {
        var sirka = $('.navbar-fixed-left').css('width').replace(/[^-\d\.]/g, '');
        if (sirka == 140) {
            $('#homeAdmin').css('margin-left', '145px');
            $('.nameClass').css('display', 'block');
        }
        else if (sirka <= 110) {
            $('.nameClass').css('display', 'none');
        }
        else {
            $('#homeAdmin').css('margin-left', '16%');
            $('.nameClass').css('display', 'block');

        }
    });
});