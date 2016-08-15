angular.module('veganapp.public', ['veganapp.system']);
angular.module('veganapp.admin', ['veganapp.system']);

var myApp = angular.module('veganapp', [
    'veganapp.public', 
    'veganapp.admin', 
    'veganapp.system']);

myApp
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.when('/public', '/public/home');
        $stateProvider 
            .state('root', {
                views: {
                    'main': { 
                        controller: ['$state', '$injector', function ($state, $injector) {
                            //return $state.go('public.home');
                        }]
                    }
                }
            });
            $urlRouterProvider.otherwise('/home');
         }])
        
    .controller('contentCtrl', function($scope, $location, $state) {
        //console.log($location.absUrl());
        //console.log($state.current);
        //TODO delete function setContent
        $scope.setContent = function () {
            /*var currentUrl = $location.absUrl();
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
             }*
             return templateFile;*/
        };
        $(window).resize(function () {
            /*var sirka = $('.navbar-fixed-left').css('width').replace(/[^-\d\.]/g, '');
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

            }*/
        });
    })
    .run(['$location', '$state', function ($location, $state) {
        //$location.path('/');
        //$state.go('public.home');
    }]);
