/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('tablesCtrl', ['$scope', 'getTable', function($scope, getTable) {
    /*if (window.innerWidth>=1050) {     $('#tableArea').css('width', '80%'); }
    else {
        $('#tableArea').css('width', '100%');
    }*/



    if (window.innerWidth <= 380 ) { $('#restaurantMapId').css('width', 'window.innerWidth-20');}

    $scope.today = function() {
        $scope.data = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.data = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.setDate = function(year, month, day) {
        $scope.data = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }

    getTable.getTables().success(function (data, status) {
        $scope.dataTable = data;
        console.log(status);
        console.log($scope.dataTable);
    });

    $scope.myNumber = 5;
    $scope.getNumber = function(num) {
        return new Array(num);
    };

}]);