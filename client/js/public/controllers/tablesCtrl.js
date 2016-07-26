/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('tablesCtrl', ['$scope', 'getTable', 'reservationFactory', function($scope, getTable, reservationFactory) {
        $scope.tableObj = [];
        $scope.availability = [];
        getTable.getTables().success(function (data, status) {
            //todo
            // $scope.dataTable = data;
            //$scope.tables = data;
            for (var i=0; i<data.length; i++) {
                $scope.tableObj.push({
                    table: data[i],
                    checked: false
                });
                $scope.availability.push({
                    table: data[i]._id,
                    free: true
                });
            }
        });
        $scope.updateTables = function (p, tables) {
            angular.forEach(tables, function (stul, index) {
                if(p != index) {
                    stul.checked = false;
                }
            });
        };
        //$scope.myNumber = 5;
        /*$scope.getNumber = function(num) {
            return new Array(num);
        };*/
        //creating calendar
        //$scope.showSecondTable = false;
        /*$scope.month = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
        $scope.weeks = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        */
        $scope.today = new Date();
        $scope.datum = new Date();
        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            return [dd, '.', mm, '.', yyyy].join('');
        };
        $scope.date1 = (new Date()).ddmmyyyy();

        /*$scope.Calendar = new Calendar(1);
        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
        $scope.filterDay = function (den) {
            if(den === 0) { return false; }
            return true;
        };
        $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.lastDayInWeek = new Date($scope.firstDayInWeek.getFullYear(), $scope.firstDayInWeek.getMonth(), $scope.firstDayInWeek.getDate()+7);
*/
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
        /*
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

        $scope.reservationsForCurrentDay = function () {
            $scope.resForCurrentDay = [];
            reservationFactory.getReservations().success(function (data) {
                for (var i=0; i<data.length; i++) {
                    var datum = new Date(data[i].startDate);
                    if ($scope.datum.getDate() == datum.getDate() && $scope.datum.getMonth() == datum.getMonth() && $scope.datum.getFullYear() == datum.getFullYear()) {
                        $scope.resForCurrentDay.push(data[i]);
                    }
                }
                if($scope.resForCurrentDay.length>0) {
                    console.log('ano');
                    $scope.checkReservation($scope.resForCurrentDay);
                }
                else { console.log('ne'); }
            });

        };
        */
        $scope.checkReservation = function (resForDay) {
            for (var i=0; i<$scope.availability.length; i++) {
                for (var j=0; j<resForDay.length; j++) {
                    if ($scope.availability[i].table === resForDay[j].table) {
                        console.log($scope.availability[i].table, '____', resForDay[j].table);
                    }
                }

            }
        };
        $scope.checkReservation($scope.reservation);
        $scope.sendReservation = function (reservation) {
            var startDate = new Date(reservation.year, reservation.month, reservation.day, reservation.startTime),
                  endDate = new Date(reservation.year, reservation.month, reservation.day, reservation.endTime);
            reservationFactory.createReservation($scope.reservation, startDate, endDate);
        };
        
    }]);