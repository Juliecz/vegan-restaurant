/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('tablesCtrl', ['$scope', 'getTable', function($scope, getTable) {
        /*if (window.innerWidth>=1050) {     $('#tableArea').css('width', '80%'); }
        else {
            $('#tableArea').css('width', '100%');
        }*/
        
        //if (window.innerWidth <= 380 ) { $('#restaurantMapId').css('width', 'window.innerWidth-20');}
    
        /*$scope.today = function() {
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
        }*/
        getTable.getTables().success(function (data, status) {
            //$scope.dataTable = data;
            $scope.tables = data;
        });
    
        $scope.myNumber = 5;
        $scope.getNumber = function(num) {
            return new Array(num);
        };
        //creating calendar
        $scope.showSecondTable = false;
        $scope.month = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
        $scope.weeks = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        $scope.today = new Date();
        $scope.todayChosen = new Date();
        //$scope.selected = $scope.todayChosen.getDate();
        $scope.Calendar = new Calendar(1);
        $scope.mdays = $scope.Calendar.monthDays( $scope.today.getFullYear(), $scope.today.getMonth());
        $scope.filterDay = function (den) {
            if(den === 0) { return false; }
            return true;
        };
        $scope.firstDayInWeek = $scope.Calendar.weekStartDate($scope.today);
        $scope.lastDayInWeek = new Date($scope.firstDayInWeek.getFullYear(), $scope.firstDayInWeek.getMonth(), $scope.firstDayInWeek.getDate()+7);
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
        $scope.showMonth = function () {
            $scope.showSecondTable = false;
        };
    }]);