/**
 * Created by yuliya on 11.11.15.
 */
//angular.module('veganapp.public')
angular.module('veganapp.public')
    .controller('homeCtrl', function($scope) {
        $scope.today = new Date();
        $scope.week = [
            {
                day: 'Ponděli',
                id: 1,
                from: '08:00',
                to: '23:00'
            }, {
                day: 'Útery',
                id: 2,
                from: '08:00',
                to: '23:00'
            }, {
                day: 'Středa',
                id: 3,
                from: '08:00',
                to: '23:00'
            }, {
                day: 'Čtvrtek',
                id: 4,
                from: '08:00',
                to: '23:00'
            },
            {
                day: 'Pátek',
                id: 5,
                from: '08:00',
                to: '23:00'
            }, {
                day: 'Sobota',
                id: 6,
                from: '08:00',
                to: '23:00'
            }, {
                day: 'Neděle',
                id: 0,
                from: '08:00',
                to: '23:00'
            }];

});