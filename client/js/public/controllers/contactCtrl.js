/**
 * Created by yuliya on 11.11.15.
 */
angular.module('veganapp.public')
    .controller('contactCtrl', function($scope) {
    initH1();

});
//todo rewrite this
function initialize() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var praha = new google.maps.LatLng(50.03855328103505, 14.512730911374092);
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

function initH1()
{
    document.getElementById('h1Kontrola').innerHTML = 'caaaaau';
}