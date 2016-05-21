/**
 * Created by yuliya on 12.11.15.
 */
routeApp.controller('menuCtrlP', ['$scope', '$http', 'menuPublic', function($scope, $http, menuPublic) {

    $scope.tridaVar = [];
    menuPublic.getMenu().success(function (data, status) {
        $scope.data = data;
        console.log('data: ', status);
        console.log($scope.data);
    });
    menuPublic.getSort().success(function (data, status) {
        $scope.trida = data;
        console.log(status);
        console.log($scope.trida);
        $scope.amount = $scope.trida.length;
        if ($scope.trida) {
            for (var i = 0; i < $scope.trida.length; i++) {
                console.log(i);
                if ($scope.trida[i] == 'predkrm') {
                    $scope.tridaVar.push({
                        name: 'predkrm',
                        text: 'Předkrmy'
                    });
                }
                else if ($scope.trida[i] == 'hlavni') {
                    $scope.tridaVar.push({
                        name: 'hlavni',
                        text: 'Hlavní chody'
                    });
                }
                else if ($scope.trida[i] == 'salat') {
                    $scope.tridaVar.push({
                        name: 'salat',
                        text: 'Saláty'
                    });

                }
                else if ($scope.trida[i] == 'dezert') {
                    $scope.tridaVar.push({
                        name: 'dezert',
                        text: 'Dezerty'
                    });
                }
            }
        }

    });
}]);