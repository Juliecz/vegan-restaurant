/**
 * Created by yuliya on 11.11.15.
 */
angular.module('veganapp.public')
    .controller('contactCtrl', function($scope) {
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
//todo rewrite this
function initialize() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var praha = new google.maps.LatLng(50.0311522, 14.4885689);
    var mapOptions = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: praha
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: praha,
        map: map,
        title: "Veganska restaurace",
        animation: google.maps.Animation.DROP
    });

    directionsDisplay.setMap(map, marker);

 }