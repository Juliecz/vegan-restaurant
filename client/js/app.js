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
        $state.go('public.home');
    })
    .run(['$location', '$state', function ($location, $state) {
        //$location.path('/');
        //$state.go('public.home');
    }]);
