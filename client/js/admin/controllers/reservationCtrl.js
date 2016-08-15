angular.module('veganapp.admin')
    .controller('reservationCtrl', ['$scope', 'getTable', 'reservationFactory', function ($scope, getTable, reservationFactory) {

        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
        };
        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            return [dd, '.', mm, '.', yyyy].join('');
        };
        Date.prototype.hhmm = function () {
            var hh = this.getHours();
            var mm = this.getMinutes();
            if (mm < 10) {
                return [hh, ':0', mm].join('');
            }
            else { return [hh, ':', mm].join(''); }
        };
        $scope.tableObj = [];
        $scope.Filter = {
            ByDate: '',
            validDate: '',
            ByText: ''
        };

        //$scope.month = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
        //$scope.weeks = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        $scope.today = new Date();
        $scope.activeTab = $scope.today.getDate();
        //$scope.Calendar = new Calendar(1);
        //$scope.mdays = $scope.Calendar.monthDays($scope.today.getFullYear(), $scope.today.getMonth());
        //console.log($scope.mdays);
        //$scope.startDayWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.getTables = function () {
            getTable.getTables()
            .success(function (data) {
                $scope.tables = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.tableObj.push({
                        table: data[i],
                        checked: false
                    });
                }
            });
        };
        $scope.showReservations = function (rezervace) {
            if ($scope.Filter.ByDate !== '') {
                var arr = $scope.Filter.ByDate.split('.');
                var dateFilter = new Date(arr[2], arr[1]-1, arr[0]);
                var date = new Date(rezervace.startDate.getFullYear(), rezervace.startDate.getMonth(), rezervace.startDate.getDate());
                return rezervace.startDate.getFullYear() === dateFilter.getFullYear()
                    && rezervace.startDate.getMonth() == dateFilter.getMonth()
                    && rezervace.startDate.getDate() === dateFilter.getDate();
            }
            if($scope.Filter.validDate === '') {
                if ($scope.Filter.ByDate === '') {
                    return rezervace.startDate >= (new Date());
                }
            }
            else if ($scope.Filter.validDate === 'prev') {
                return rezervace.startDate < (new Date());
            }
            //return $scope.Filter.ByDate === rezervace.startDate.ddmmyyyy();
        };
        $scope.getTables();
        $scope.allReservations = function () {
            $scope.reservations = [];
            reservationFactory.getReservations()
                .success(function (data) {

                    for (var i = 0; i < data.length; i++) {
                        $scope.reservations.push({
                            _id: data[i]._id,
                            name: data[i].name,
                            surname: data[i].surname,
                            table: data[i].table,
                            startDate: new Date(data[i].startDate),
                            endDate: new Date(data[i].endDate),
                            phone: data[i].phone,
                            email: data[i].email
                        });
                        if ($scope.tableObj.length > 0) {
                            for (var j = 0; j < $scope.tableObj.length; j++) {
                                if ($scope.tableObj[j].table._id === data[i].table) {
                                    $scope.reservations[i].tableNum = $scope.tableObj[j].table.name;
                                    break;
                                }
                            }
                        }
                        else {
                            $scope.getTables();
                            for (var j = 0; j < $scope.tableObj.length; j++) {
                                if ($scope.tableObj[j].table._id === data[i].table) {
                                    $scope.reservations[i].tableNum = $scope.tableObj[j].table.name;
                                    break;
                                }
                            }
                        }
                    }
                    console.log($scope.reservations);
                });
        };
        $scope.allReservations();
        $scope.updateTables = function (p, tables) {
            angular.forEach(tables, function (stul, index) {
                if (p != index) {
                    stul.checked = false;
                }
            });
        };
        $scope.changeTime = function (edit) {
            if (!edit.endTime || parseInt(edit.endTime)<=parseInt(edit.startTime)) {
                edit.endTime = (parseInt(edit.startTime) + 1).toString();
            }
        };
        $scope.checkendTime = function (edit) {
            var start = parseInt(edit.startTime),
                end = parseInt(edit.endTime);
            if (end<=start) {
                start = end-1;
                edit.startTime = start.toString();
            }
        };
        $scope.editRes = function (id) {
            for (var i=0; i<$scope.reservations.length; i++) {
                if ($scope.reservations[i]._id == id) {
                    $scope.upravit = $scope.reservations[i];
                    $scope.upravit.datum = $scope.reservations[i].startDate.ddmmyyyy();

                    break;
                }
                //console.log($scope.reservations[i].name);
            }
        };
        //$scope.arr = [0,1,2,3,4,5,6];

        //$scope.todayChosen = new Date();
        //$scope.selected = $scope.todayChosen.getDate();
        /*$scope.filterDay = function (den) {
            if (den === 0) {
                return false;
            }
            return true;
        };
        /*$scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.lastDayInWeek = new Date($scope.firstDayInWeek.getFullYear(), $scope.firstDayInWeek.getMonth(), $scope.firstDayInWeek.getDate() + 7);
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
        };*/
        $scope.onclickDate = function (den, mesic, rok) {
            $scope.today = new Date(rok, mesic, den);
            $scope.selected = den;
            $scope.showSecondTable = true;
            $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
            //$scope.firstDayInWeek.setDate($scope.firstDayInWeek.getDate()+1);
            $scope.lastDayInWeek.setDate($scope.firstDayInWeek.getDate() + 6);
        };
        $scope.dnes = function (den, mesic, rok) {
            var d = new Date();
            if (d.getDate() === den && d.getMonth() === mesic && d.getFullYear() === rok) {
                return d.getDate();
            }
            return -1;
        };
        $scope.deleteReservation = function (id) {
            reservationFactory.deleteReservation(id).success(function (err) {
                if (err) console.log(err);
            });
            $scope.allReservations();
        };

    }]);