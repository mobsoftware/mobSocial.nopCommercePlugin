var dtpAppDirectives = angular.module('ngDateTimePicker', []);

dtpAppDirectives.directive("datetimepicker", ["$compile", "$rootScope", function($compile, $rootScope) {
        return {
            restrict: "E",
            scope: {
                minDate: "@",
                maxDate: "@",
                currentDate: "=",
                includeTime: "@"
            },
            template: "<div class='datepicker-container'><input readonly type='text' ng-focus='expandMe();' class='datepicker-input' ng-model='currentDate' /> <button class='ng-hide datepicker-close' ng-click='closeMe();'>&#10006;</button><br/></div>",
            replace: true,
            link: function($scope, $elem, $attr) {
                //let's add the current scope to root scope to maintain the list of all the datetime pickers on the page
                if (!$rootScope.DateTimePickerScopes) {
                    $rootScope.DateTimePickerScopes = [];
                }
                $rootScope.DateTimePickerScopes.push($scope);

                $scope.calLock = false;
                if ($scope.minDate === undefined) {
                    $scope._minDate = new Date(1970, 1, 1);
                }
                else {
                    $scope._minDate = new Date($scope.minDate);
                }

                if ($scope.maxDate === undefined) {
                    $scope._maxDate = new Date(2050, 1, 1);
                }
                else {
                    $scope._maxDate = new Date($scope.maxDate);
                }

                $scope._visibleMonth = $scope.currentDate.getMonth();
                $scope._visibleDay = $scope.currentDate.getDate();
                $scope._visibleYear = $scope.currentDate.getFullYear();
                $scope._visibleHour =  $scope.currentDate.getHours();
                $scope._visibleMinute =  $scope.currentDate.getMinutes();
                
                var daysInMonth = function(anyDateInMonth)
                {
                    var month = anyDateInMonth.getMonth();
                    month++;
                    return new Date(anyDateInMonth.getFullYear(), month, 0).getDate();
                };

                var getCalendar = function(date) {
                    if ($scope.calLock)
                        return;
                    $scope.calLock = true;
                    var monthStart = 0, monthEnd = 11;
                    var dayMin = 1, dayMax = 31;
                    
                    if ($scope._minDate.getFullYear() === parseInt($scope._visibleYear)) {
                        monthStart = $scope._minDate.getMonth();
                        if (parseInt($scope._visibleMonth) < monthStart) {
                            $scope._visibleMonth = monthStart;
                            date.setMonth(monthStart);
                        }
                        else if (parseInt($scope._visibleMonth) === monthStart) {
                            dayMin = $scope._minDate.getDate();
                        }
                    }

                    if ($scope._maxDate.getFullYear() === parseInt($scope._visibleYear)) {
                        monthEnd = $scope._maxDate.getMonth();
                        
                        if ($scope._visibleMonth > monthEnd) {
                            $scope._visibleMonth = monthEnd;
                            date.setMonth(monthEnd);
                        }
                        else if (parseInt($scope._visibleMonth) === monthEnd) {
                            dayMax = $scope._maxDate.getDate();
                        }
                    }

                    var day = date.getDay();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    var d = date;
                    var monthArray = new Array();
                    monthArray[0] = "January";
                    monthArray[1] = "February";
                    monthArray[2] = "March";
                    monthArray[3] = "April";
                    monthArray[4] = "May";
                    monthArray[5] = "June";
                    monthArray[6] = "July";
                    monthArray[7] = "August";
                    monthArray[8] = "September";
                    monthArray[9] = "October";
                    monthArray[10] = "November";
                    monthArray[11] = "December";

                    var days = daysInMonth(d);
                    var first_day = (new Date(year, month, 1)).getDay();
                    var day = new Array();
                    day[0] = 'Su';
                    day[1] = 'Mo';
                    day[2] = 'Tu';
                    day[3] = 'We';
                    day[4] = 'Th';
                    day[5] = 'Fr';
                    day[6] = 'Sa';
                    
                    var monthSelect = " <select ng-model='_visibleMonth'>";
                    for (var i = monthStart; i <= monthEnd; i++) {
                        monthSelect += "<option value='" + i + "'>" + monthArray[i] + "</option>"
                    }
                    monthSelect += "</select>";

                    var yearSelect = " <select ng-model='_visibleYear'>";
                    for (var i = $scope._minDate.getFullYear(); i <= $scope._maxDate.getFullYear(); i++) {
                        yearSelect += "<option value='" + i + "'>" + i + "</option>"
                    }
                    yearSelect += "</select>";
                    
                    var hourSelect, minSelect;
                    if($scope.includeTime){
                        hourSelect = " Hours: <select ng-model='_visibleHour'>";
                        for (var i = 0; i <= 23; i++) {
                            var hour = ("0" + i).slice(-2);
                            hourSelect += "<option value='" + i + "'>" + hour + "</option>"
                        }
                        hourSelect += "</select>";
                        
                        minSelect = " Minutes: <select ng-model='_visibleMinute'>";
                        for (var i = 0; i < 60; i+=5) {
                            var min = ("0" + i).slice(-2);
                            minSelect += "<option value='" + i + "'>" + min + "</option>"
                        }
                        minSelect += "</select>";                        
                        
                    }
                    var year_html = "<tr><th colspan='7'><a class='datepicker-prev' ng-click='previousMonth()'>&laquo;</a> " + monthSelect + yearSelect  + " <a class='datepicker-next' ng-click='nextMonth()'>&raquo;</a></th></tr>";
                    var day_html = '<tr class="month_row">';
                    for (var i = 0; i < 7; i++)
                        day_html += '<td>' + day[i] + '</td>';
                    day_html += '</tr>';

                    var dates_str = '<tr>';
                    for (var pos = 0; pos < first_day; pos++)
                    {
                        dates_str += "<td></td>";
                    }
                    
                    for (var day_val = 1; day_val <= days; day_val++)
                    {
                        if (day_val < dayMin || day_val > dayMax) {
                            dates_str += "<td><a class='disabled'>" + day_val + "</a></td>";
                        }
                        else {
                            var isCurrentDate = "";
                            if(day_val === parseInt($scope._visibleDay) && $scope.currentDate.getFullYear() === parseInt($scope._visibleYear) && $scope.currentDate.getMonth() === parseInt($scope._visibleMonth)){
                                isCurrentDate = "isCurrentDate";
                            }
                            
                            dates_str += "<td class='" + isCurrentDate + "'><a href=''  ng-click='setDate(" + day_val + ")'>" + day_val + "</a></td>";

                        }

                        first_day++;
                        if (first_day === 7)
                        {
                            first_day = 0;
                            dates_str += "</tr><tr>";
                        }
                    }
                    dates_str += "</tr>";
                    var time_html = "<tr class='time_row'><td colspan='7'>" + hourSelect + minSelect + "</td></tr>";
                    
                    var close_button = "" ; //+ "<tr class='time_row'><td colspan='7'><button ng-click='closeMe()'>Close</button></td></tr>";
                    var cal_string = "<table>" + year_html + day_html + dates_str + time_html + close_button + "</table>";

                    $scope.calLock = false;

                    return cal_string;
                };

                $scope.previousMonth = function() {
                    $scope._visibleMonth = parseInt($scope._visibleMonth) - 1;
                    if ($scope._visibleMonth === -1) {
                        $scope._visibleMonth = 11;
                        $scope._visibleYear -= 1;
                    }
                    $scope.reloadDate();
                };
                $scope.nextMonth = function() {
                    $scope._visibleMonth = parseInt($scope._visibleMonth) + 1;
                    if ($scope._visibleMonth === 12) {
                        $scope._visibleMonth = 0;
                        $scope._visibleYear += 1;
                    }
                    $scope.reloadDate();
                };
                $scope.setDate = function(day) {
                    $scope.currentDate = new Date($scope._visibleYear, $scope._visibleMonth, day, $scope._visibleHour, $scope._visibleMinute, 0);
                    $scope._visibleDay = day;                    
                    $scope.closeMe();
                };

                $scope.reloadDate = function() {
                    var expectedDate = new Date($scope._visibleYear, $scope._visibleMonth, $scope._visibleDay);
                   
                    if(expectedDate.getMonth() < $scope._minDate.getMonth() && expectedDate.getYear() === $scope._minDate.getYear()){
                        $scope.calLock = true;
                        $scope._visibleMonth = $scope._minDate.getMonth();
                        $scope.calLock = false;
                        return;
                    }
                    if(expectedDate.getMonth() > $scope._maxDate.getMonth() && expectedDate.getYear() === $scope._maxDate.getYear()){
                        $scope.calLock = true;
                        $scope._visibleMonth = $scope._maxDate.getMonth();
                        $scope.calLock = false;
                        return;
                    }
                    $scope._datePickerArea.html(getCalendar(expectedDate, $scope));
                    $compile($scope._datePickerArea)($scope);
                };
                
                $scope.expandMe = function () {
                    //we should close the other opened pickers before opening a new one
                    for (var i = 0; i < $rootScope.DateTimePickerScopes.length; i++) {
                        $rootScope.DateTimePickerScopes[i].closeMe();
                    }

                    $elem.find("button").removeClass("ng-hide");
                    $scope.reloadDate();
                    $scope._datePickerArea.css("display", "block").addClass("datepicker-expanded");
                };
                $scope.closeMe = function(){
                    $elem.find("button").addClass("ng-hide");
                    $scope._visibleDay = $scope.currentDate.getDate();
                    $scope._visibleMonth = $scope.currentDate.getMonth();
                    $scope._visibleYear = $scope.currentDate.getFullYear();
                    $scope._datePickerArea.css("display", "none").removeClass("datepicker-expanded");
                };
                var datePickerArea = angular.element("<div class='datepicker-area'></div>");
                $scope._datePickerArea = datePickerArea;
                $elem.append(datePickerArea);

                $scope.$watchGroup(['_visibleYear', '_visibleMonth'], function(newVal, oldVal) {
                    $scope.reloadDate();
                });
                

            }
        };
    }]);

