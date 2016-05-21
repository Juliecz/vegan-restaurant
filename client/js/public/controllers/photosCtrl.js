/**
 * Created by yuliya on 12.11.15.
 */
routeApp
    .controller('photosCtrl', function($scope, $location) {

        $scope.obraz = [
            { id:1, source: '/public/img/reWalls.com-6532.jpg'},
            { id:2, source: '/public/img/reWalls1.jpg'},
            { id:3, source: '/public/img/reWalls2.jpg'},
            { id:4, source: '/public/img/reWalls3.jpg'},
            { id:5, source: '/public/img/ja.jpg'}
        ];
        $scope.imgEvent = function () {
            console.log('bla');
            console.log(document.getElementsByTagName('img'));
            // style="width:{{20}}%; height:{{20}}%"
        };
        /*$scope.$watch(function () {
                return window.innerWidth;
            },
            function (value) {
                console.log(value);
            });
        //$scope.addEventListener('renderId', renderId, false);*/
        $scope.styleImgW=20;
        $scope.styleImgH=20;
        $scope.changeScreen = function () {
            console.log("Screen: "+screen.width);
            $(window).on("resize", function (){
                console.log("Window "+window.innerWidth);
                if (window.innerWidth < 450) {
                    $scope.styleImgW = 100;
                    $scope.styleImgH = 100;
                }
                else {
                    $scope.styleImgW = 20;
                    $scope.styleImgH = 20;
                }
            });
        };
    });
routeApp
    .run(['$window', function($window) {
    $window.onload = function() {
        //addEventListener('imgsize', imgsize, false);
    };
}]);