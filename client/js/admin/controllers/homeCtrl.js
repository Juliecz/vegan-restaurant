/**
 * Created by yuliya on 14.11.15.
 */
angular.module('veganapp.admin')
    .controller('homeCtrlA', ['$scope', '$http', '$stateParams', 'authProvider', 'reservationFactory', 'userFactory', function($scope, $http, $stateParams, authProvider, reservationFactory, userFactory){
        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            if (mm<10) { return [dd, '.0', mm, '.', yyyy].join(''); }
            return [dd, '.', mm, '.', yyyy].join('');
        };
        $scope.firstDay = function () {
            var date = new Date(),
                day = date.getDay(),
                d = date.getDate() - day + (day == 0 ? -6:1);
            return new Date(date.setDate(d));
        };
        $scope.dis = true;
        $scope.myInfo = function () {
            authProvider.isLoggedIn()
                .then(function (data) {
                    console.log(data);

                    userFactory.getUserById(data.data)
                        .success(function (data) {
                            $scope.me = {
                                id: data._id,
                                uzivJm: data.username,
                                jm: data.name,
                                prijm: data.surname,
                                role: data.role,
                                email: data.email,
                                phone: data.phone,
                                phoneM: data.phoneMessage,
                                emailM: data.emailMessage,
                                password: data.password
                            };
                        });
                });
        };
        $scope.myInfo();
        $scope.send = function (id, me) {
            if ($scope.me.passwStare !== '' || $scope.me.passwNove !== '') {
                if($scope.me.passwStare !== $scope.me.password) {
                    $scope.message = 'Zadejte správné heslo';
                    return 0;
                }
                else {
                    $scope.me.password = $scope.me.passwNove;
                }
            }
            if (!$scope.dis) {
                userFactory.updateUser(id, me).success(function (err, data) {
                    //$scope.myInfo();
                    $scope.dis = true;
                    console.log(err);
                    console.log('data ' , data);
                });
            }
        };
        $scope.navstevy = 0;
        $scope.rezervace = 0;
        reservationFactory.getForDay(new Date().ddmmyyyy()).success(function (data) {
            $scope.rezervace = data.length;
        });

        /*$scope.canvas =
        angular.element('canvas');
        $scope.chart = new Chart($scope.canvas, {
            type: 'line',
            data: {
                labels: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
                datasets: [{
                    data: ar,
                    backgroundColor: [ 'rgba(255, 99, 132, 0.2)' ],
                    borderColor: [ 'rgba(255,99,132,1)' ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });*/

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
