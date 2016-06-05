/**
 * Created by yuliya on 14.11.15.
 */
angular.module('veganapp.admin')
    .controller('homeCtrlA', ['$scope', '$http', '$stateParams', 'authProvider', function($scope, $http, $stateParams, authProvider){
        /*$scope.ifAuth = function () {
            var check;
            authProvider.isLoggedIn()
                .then(function (data) {
                    check = data;
                }); 
            return check;
        };
        console.log('IF AUTH FUNCTION: ', $scope.ifAuth());
        $scope.test = 'my admin test';
        console.log('State home params: ', $stateParams.user);
        //divMenuAdmin1(50);
    
        /*
        $scope.navigationLeft = function () {
            if (window.innerWidth<820) {
                menuWidth = angular.element("#right");
                console.log(menuWidth.offsetWidth);
            }
        };
        $scope.navigationLeft();
        //$scope.loginPost = loginPost();
*/
}]);

/*function divMenuAdmin1(wLeft) {

    var wAll = $(document).width();
    var hAll = $(document).height();
    if (wLeft==50) {$('.nameMenu').empty();}
    else {
        $('.nameMenu:eq(0)').text('  Home');
        $('.nameMenu:eq(1)').text('  Users');
        $('.nameMenu:eq(2)').text('  Menu')
    }
    var class1 = (wLeft==50) ? "glyphicon glyphicon-menu-right" : "glyphicon glyphicon-menu-left";
    $('#spanMenuAdmin').attr('class', class1); //sipky

    $("#left").css({"width": wLeft+"px", "height": hAll});
    $("#right").css({"width": wAll-wLeft+"px", "height": hAll});
    $('#spanMenuAdmin').css({"float": "right"});
    console.log(window.location.pathname);
    console.log(window.location.href);
}
function divMenuAdmin() {

    var wAll = $(document).width();
    var s = $("#left").width();
    var wLeft = (wAll*0.2).toFixed();//(wAll>=700) ? wAll : 0.4*wAll;
    var w = (s==50) ? wLeft : 50;
    $("#left").css("width", w+'px');
    divMenuAdmin1(w);
    //console.log('w ',w);
}

$(window).resize(function () {
    var wLeft = $("#left").width();
    var wAll = $(window).width();
    if (wLeft==50) {
        divMenuAdmin1(wLeft);
    }
    else {
        divMenuAdmin1(wAll*0.2);
    }
 });
*/
//TODO change function
function loginPost()
{
    $(document).ready(function() {
        var user, pass;
        $('#submit').click(function() {
            user = $('#username').val();
            pass = $('#password').val();
            $.post('http://localhost:3000/admin', {user: user, password: pass}, function(data){

            });
        });
    });
}
