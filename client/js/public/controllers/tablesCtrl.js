/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('tablesCtrl', ['$scope', 'getTable', 'reservationFactory', function($scope, getTable, reservationFactory) {
        $scope.tableObj = [];
        getTable.getTables().success(function (data, status) {
            //$scope.dataTable = data;
            //$scope.tables = data;
            for (var i=0; i<data.length; i++) {
                $scope.tableObj.push({
                    table: data[i],
                    checked: false
                });
            }
            console.log($scope.tableObj);
        });
        $scope.updateTables = function (p, tables) {
            angular.forEach(tables, function (stul, index) {
                if(p != index) {
                    stul.checked = false;
                }
            });
        };
        $scope.myNumber = 5;
        $scope.getNumber = function(num) {
            return new Array(num);
        };
        //creating calendar
        $scope.showSecondTable = false;
        $scope.month = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
        $scope.weeks = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        $scope.today = new Date();
        //$scope.todayChosen = new Date();
        //$scope.selected = $scope.todayChosen.getDate();
        $scope.Calendar = new Calendar(1);
        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
        $scope.filterDay = function (den) {
            if(den === 0) { return false; }
            return true;
        };
        $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.lastDayInWeek = new Date($scope.firstDayInWeek.getFullYear(), $scope.firstDayInWeek.getMonth(), $scope.firstDayInWeek.getDate()+7);

        $scope.reservation = {
            day: $scope.today.getDate(),
            month: $scope.today.getMonth(),
            year: $scope.today.getFullYear()
        };

        $scope.changeTime = function () {
            if (!$scope.reservation.endTime || parseInt($scope.reservation.endTime)<=parseInt($scope.reservation.startTime)) {
                $scope.reservation.endTime = (parseInt($scope.reservation.startTime) + 1).toString();
            }
        };
        $scope.checkendTime = function () {
            var start = parseInt($scope.reservation.startTime),
                end = parseInt($scope.reservation.endTime);
            if (end<=start) {
                start = end-1;
                $scope.reservation.startTime = start.toString();
            }
        };
        
        $scope.nextMonth = function (month) {
            if (month < 11) {
                if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month+1)) {
                    var posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month+1);
                    $scope.today.setDate(posledni);
                    $scope.selected = posledni;
                }
                $scope.today.setMonth(month + 1);
                $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
            }
            else if(month === 11) {
                $scope.today.setMonth(0);
                $scope.today.setFullYear($scope.today.getFullYear()+1);
                $scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
            }
        };
        $scope.prevMonth = function (month) {
            var dnesni = new Date();
            var posledni;
            if ($scope.today.getFullYear() >= dnesni.getFullYear()) {
                if(month > dnesni.getMonth() &&  $scope.today.getFullYear() === dnesni.getFullYear()) {
                    if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month-1)) {
                        posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month-1);
                        $scope.today.setDate(posledni);
                        $scope.selected = posledni;
                    }
                    $scope.today.setMonth(month-1);
                    $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
                }
                else if($scope.today.getFullYear() > dnesni.getFullYear()) {
                    if (month === 0 ){
                        $scope.today.setMonth(11);
                        $scope.today.setFullYear($scope.today.getFullYear()-1);
                        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
                    }
                    else {
                        if ($scope.today.getDate() > $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month-1)) {
                            posledni = $scope.Calendar.lastDayInMonth($scope.today.getFullYear(), month-1);
                            $scope.today.setDate(posledni);
                            $scope.selected = posledni;
                        }
                        $scope.today.setMonth(month-1);
                        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
                    }
                }
              }
        };
        $scope.onclickDate = function (den, mesic, rok) {
            $scope.datum = new Date(rok, mesic, den);
            $scope.selected = den;
            //$scope.showSecondTable = true;
            $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
            //$scope.firstDayInWeek.setDate($scope.firstDayInWeek.getDate()+1);
            $scope.lastDayInWeek.setDate($scope.firstDayInWeek.getDate()+6);

            $scope.reservation = {
                day: $scope.datum.getDate(),
                month: $scope.datum.getMonth(),
                year: $scope.datum.getFullYear()
            };
        };
        $scope.dnes = function (den, mesic, rok) {
            var d = new Date();
            if( d.getDate() === den && d.getMonth()===mesic && d.getFullYear()===rok) {
                return d.getDate();
            }
            return -1;
        };
        $scope.showMonth = function () {
            $scope.showSecondTable = false;
        };
        
        $scope.sendReservation = function (reservation) {
            var startDate = new Date(reservation.year, reservation.month, reservation.day, reservation.startTime),
                  endDate = new Date(reservation.year, reservation.month, reservation.day, reservation.endTime);
            reservationFactory.createReservation($scope.reservation, startDate, endDate);
            console.log(startDate, '____', endDate);
        };
        
    }]);