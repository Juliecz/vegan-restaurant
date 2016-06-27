angular.module('veganapp.admin')
    .controller('reservationCtrl', ['$scope', 'getTable', function($scope, getTable){
            
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
        };
        $scope.month = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
        $scope.weeks = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        $scope.today = new Date();
        $scope.activeTab = $scope.today.getDate();
        $scope.Calendar = new Calendar(1);
        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
        console.log($scope.mdays);
        $scope.startDayWeek = $scope.Calendar.weekStartDate($scope.today);
        getTable.getTables()
            .success(function (data) {
                 $scope.tables = data;
        });
        $scope.arr = [0,1,2,3,4,5,6];

        $scope.todayChosen = new Date();
        //$scope.selected = $scope.todayChosen.getDate();
        $scope.filterDay = function (den) {
            if(den === 0) { return false; }
            return true;
        };
        $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.lastDayInWeek = new Date($scope.firstDayInWeek.getFullYear(), $scope.firstDayInWeek.getMonth(), $scope.firstDayInWeek.getDate()+7);
        $scope.nextMonth = function (month) {
                if (month < 11) {
                        if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month + 1)) {
                                var posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month + 1);
                                $scope.today.setDate(posledni);
                                $scope.selected = posledni;
                        }
                        $scope.today.setMonth(month + 1);
                        $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
                }
                else if (month === 11) {
                        $scope.today.setMonth(0);
                        $scope.today.setFullYear($scope.today.getFullYear() + 1);
                        $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
                }
        };
            $scope.prevMonth = function (month) {
                    var dnesni = new Date();
                    var posledni;
                    if ($scope.today.getFullYear() >= dnesni.getFullYear()) {
                            if (month > dnesni.getMonth() && $scope.today.getFullYear() === dnesni.getFullYear()) {
                                    if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month - 1)) {
                                            posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month - 1);
                                            $scope.today.setDate(posledni);
                                            $scope.selected = posledni;
                                    }
                                    $scope.today.setMonth(month - 1);
                                    $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
                            }
                            else if ($scope.today.getFullYear() > dnesni.getFullYear()) {
                                    if (month === 0) {
                                            $scope.today.setMonth(11);
                                            $scope.today.setFullYear($scope.today.getFullYear() - 1);
                                            $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
                                    }
                                    else {
                                            if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month - 1)) {
                                                    posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month - 1);
                                                    $scope.today.setDate(posledni);
                                                    $scope.selected = posledni;
                                            }
                                            $scope.today.setMonth(month - 1);
                                            $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
                                    }
                            }
                    }
            };
            $scope.onclickDate = function (den, mesic, rok) {
                    $scope.today = new Date(rok, mesic, den);
                    $scope.selected = den;
                    $scope.showSecondTable = true;
                    $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
                    //$scope.firstDayInWeek.setDate($scope.firstDayInWeek.getDate()+1);
                    $scope.lastDayInWeek.setDate($scope.firstDayInWeek.getDate()+6);
            };
            $scope.dnes = function (den, mesic, rok) {
                    var d = new Date();
                    if( d.getDate() === den && d.getMonth()===mesic && d.getFullYear()===rok) {
                            return d.getDate();
                    }
                    return -1;
            };

}]);