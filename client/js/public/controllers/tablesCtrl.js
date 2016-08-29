/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('tablesCtrl', ['$scope', 'tablesFactory', 'reservationFactory', function($scope, tablesFactory, reservationFactory) {
        $scope.tableObj = [];
        $scope.prijataRezervace = false;
        $scope.availability = [];
        tablesFactory.getTables().success(function (data, status) {
            for (var i=0; i<data.length; i++) {
                $scope.availability.push({
                    table: data[i],
                    free: true,
                    checked: false
                });
            }
        });

        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            if (mm<10) { mm = '0'+mm; }
            if (dd<10) { dd = '0'+dd; }
            return [dd, '.', mm, '.', yyyy].join('');
        };

        $scope.today = new Date();
        $scope.datum = new Date(); //todo ???
        $scope.reservation = {
            day: $scope.today.getDate(),
            month: $scope.today.getMonth(),
            year: $scope.today.getFullYear(),
            datum: $scope.today.ddmmyyyy()
        };

        if ((new Date()).getHours()>=21 && (new Date()).getMinutes()>30) {
            var date1 = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()+1);
            $scope.reservation.datum = date1.ddmmyyyy();
        }
        reservationFactory.getForDay($scope.reservation.datum)
            .success(function (data) {
                $scope.reservations = data;
            });

        $scope.k = 0;
        $scope.setTable = function (selected, newT, volnyStul) {
            $scope.k++;
            var b = false;
            if($scope.k%2 === 0) { return true;}
            if (volnyStul) {
                if (selected != newT) {
                    $scope.reservation.table = newT;
                }
                else if(selected === newT) {
                    delete $scope.reservation.table;
                }
            }
            else {
                delete $scope.reservation.table;

            }

        };
        $scope.reservedTable = function () {
            angular.forEach($scope.availability, function (item) {
                if ($scope.reservation.table === item.table._id && item.free) {
                    b = true;
                    return 0;
                }
            });
        };
        $scope.updateTables = function (p, tables) {
            angular.forEach(tables, function (stul, index) {
                if(p != index) {
                    stul.checked = false;
                    $scope.reservation.tableNum = p;
                }
            });
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

        $scope.checkAvailability = function () {
            angular.forEach($scope.availability, function (item) {
                item.free = true;
            });
            angular.forEach($scope.availability, function (item) {
                angular.forEach($scope.reservations, function (rezervace) {
                    if (item.table._id === rezervace.table) {
                        //console.log(rezervace, '\n', typeof $scope.reservation.startTime);
                        var start = new Date(rezervace.startDate),
                            end = new Date(rezervace.endDate);

                        if (($scope.reservation.startTime>=start.getHours() && $scope.reservation.startTime < end.getHours()) || ($scope.reservation.endTime > start.getHours() && $scope.reservation.endTime<= end.getHours()) || ($scope.reservation.startTime <= start.getHours() && $scope.reservation.endTime >= end.getHours())) {
                            item.free = false;
                        }
                    }
                });
            });
        };
        //check if date was changed
        $scope.$watch('reservation.datum', function () {
            console.log($scope.reservation.datum);
            reservationFactory.getForDay($scope.reservation.datum)
                .success(function (data) {
                    $scope.reservations = data;
                    if ($scope.reservation.startTime !== '') {
                        $scope.checkAvailability();
                    }
                });
            angular.forEach($scope.availability, function (item) {
                item.checked = false;
            });
        }, true);
        //check if start time was changed
        $scope.$watch('reservation.startTime', function () {
            $scope.checkAvailability();
        });
        //check if end time was changed
        $scope.$watch('reservation.endTime', function () {
            $scope.checkAvailability();
        });
        $scope.sendReservation = function (reservation) {
            if ($scope.reservation.table === '' || !$scope.reservation.table) {
                $scope.message = '* Vyberte stůl';
                return 0;
            }
            var arr = reservation.datum.split('.');
            var startDate = new Date(arr[2], arr[1]-1, arr[0], reservation.startTime),
                endDate = new Date(arr[2], arr[1]-1, arr[0], reservation.endTime);
            reservationFactory.createReservation(reservation, startDate, endDate)
                .success(function (err, status) {
                    delete $scope.reservation.startTime;
                    delete $scope.reservation.endTime;
                    delete $scope.reservation.jmeno;
                    delete $scope.reservation.prijmeni;
                    delete $scope.reservation.tel;
                    delete $scope.reservation.email;
                    delete $scope.reservation.table;
                    delete $scope.message;
                    angular.forEach($scope.availability, function (item) {
                        item.checked = false;
                    });
                    $scope.prijataRezervace = true;

                });
        };
        
    }]);