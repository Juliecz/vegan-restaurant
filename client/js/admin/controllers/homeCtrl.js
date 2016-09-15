angular.module('veganapp.admin')
    .controller('homeCtrlA', ['$scope', '$http', '$stateParams', 'authProvider', 'reservationFactory', 'userFactory', function($scope, $http, $stateParams, authProvider, reservationFactory, userFactory){
        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            if (mm<10) { mm = '0'+mm; }
            if (dd<10) { dd = '0'+dd; }            
            return [dd, '.', mm, '.', yyyy].join('');
        };
        $scope.firstDay = function () {
            var date = new Date(),
                day = date.getDay(),
                d = date.getDate() - day + (day === 0 ? -6:1);
            return new Date(date.setDate(d));
        };
        $scope.dis = true;
        $scope.myInfo = function () {
            authProvider.isLoggedIn()
                .then(function (data) {
                    //console.log(data);

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
                                emailM: data.emailMessage,
                                password: data.password,
                                emailMTmp:data.emailMessage
                            };
                        });
                });
        };
        $scope.myInfo();
        $scope.send = function (id, me) {
            if (($scope.me.passwStare !== '' || $scope.me.passwNove !== '') && ($scope.me.passwStare && $scope.me.passwNove)) {
                if($scope.me.passwStare !== $scope.me.password) {
                    $scope.message = '* Zadejte správné heslo';
                    return 0;
                }
                else {
                    $scope.me.password = $scope.me.passwNove;
                }
            }
            if (!$scope.dis) {
                userFactory.updateUser(id, me).success(function (err, data) {
                    $scope.dis = true;
                });
                $scope.me.passwStare = '';
                $scope.me.passwNove = '';
                $scope.message = '';
            }
        };
        $scope.navstevy = 0;
        $scope.rezervace = 0;
        reservationFactory.getForDay(new Date().ddmmyyyy()).success(function (data) {
            $scope.rezervace = data.length;
        });
        $scope.zrusit = function () {
            $scope.message = '';
            $scope.me.passwStare = '';
            $scope.me.passwNove = '';
            $scope.dis = true;
            $scope.me.emailMTmp = $scope.me.emailM;
        };

}]);

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
