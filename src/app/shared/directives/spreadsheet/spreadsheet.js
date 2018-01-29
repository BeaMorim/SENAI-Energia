app
    .directive('spreadsheet', function() {
        return {
            templateUrl: "app/shared/directives/spreadsheet/spreadsheet.template.html",
            controller: "spreadsheetController"
        }
    })

    .controller('spreadsheetController', [ '$scope', 'spreadsheetFactory', '$filter', function($scope, spreadsheetFactory, $filter) {

        $scope.measures = [ "W", "kW"]
        $scope.registers = [];
        $scope.lastId = 1;

        
        $scope.addRegister = function() {
            var newRegister = {id: $scope.lastId, companyId: $scope.companyId};
            $scope.lastId ++;
            $scope.registers.push(newRegister)
        }

        $scope.removeRegister = function(removeItem) {
            let index = $scope.registers.indexOf(removeItem);
            $scope.registers.splice(index, 1);
        }

        $scope.setMeasure = function(register) {
            if(register.measure == null) {
                register.measure = $scope.measures[0];
            }
        }

        $scope.getPower = function(register) {
            $scope.electricalAppliances.map(item => {
                if( item.name == register.applianceSearchText ) {
                    register.power = item.eletricPower;
                    register.measure = $scope.measures[0];
                }
            });

            $scope.autoSave(register);
        }

        var convertPower = function(register) {
            var newPower;

            if(register.measure == "W")
                newPower = register.power;
            else if(register.measure == "kW")
                newPower = register.power*1000;

            return newPower;
        }

        var formatSchedule = function(time) {
            return $filter('date')(time, 'HH:mm:ss');
        }

        var formatTime = function(time) {
            var periods = formatSchedule(time).split(':');
            return Number(periods[0]*60) + Number(periods[1]);
        }

        var formatNumber = function(number) {
            return (number < 0 ? 0 : number)
        }

        var formatDaysOfMonth = function(days) {
            if(days > 31)
                return 31;
            else if(days < 0)
                return 0;
            else    
                return days;
        }

        $scope.autoSave = function(register) {

            register.power = formatNumber(register.power);
            register.quantity = formatNumber(register.quantity);
            register.daysOfUse = formatDaysOfMonth(register.daysOfUse);

            if( register.power != null && register.quantity != null && register.daysOfUse != null && register.startUse != null && register.time != null) {

                var newRegister = angular.copy(register);
                newRegister.power = convertPower(newRegister)
                newRegister.startUse = formatSchedule(newRegister.startUse);
                newRegister.time = formatTime(newRegister.time);

                spreadsheetFactory.monthlyCalculation(newRegister)
                    .then(function(promisse) {
                        register.costConventionalRate = promisse.data.conventionalRateMonth;
                        register.costWhiteRate = promisse.data.whiteRateMonth;
                        $scope.totalCostCalculation(register);
                    })
            }
        }

        $scope.totalCostCalculation = function(register) {
            $scope.totalCostWhiteRate = 0;
            $scope.totalCostConventionalRate = 0;

            $scope.registers.map(item => {
                $scope.totalCostWhiteRate += item.costWhiteRate;
                $scope.totalCostConventionalRate += item.costConventionalRate;
            })
            
        }


    }])