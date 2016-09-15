angular.module('veganapp.public')
    .controller('contactCtrl', function($scope) {
        

});
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