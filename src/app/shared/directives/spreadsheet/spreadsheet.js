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
        $scope.totalConsumption = 0;
        $scope.totalCostWhiteRate = 0;
        $scope.totalCostConventionalRate = 0;


        $scope.getCompanies = function() {
            spreadsheetFactory.companiesList
                .then(function(promisse) {
                    $scope.energyCompanies = promisse;
                    $scope.energyCompanySelected = $scope.energyCompanies[0];
                })
        }
        
        $scope.addRegister = function() {
            var newRegister = {
                id: $scope.lastId, 
                companyId: $scope.companyId,
                costConventionalRate: 0,
                costWhiteRate: 0
            };
            $scope.lastId ++;
            $scope.registers.push(newRegister)
            
        }

        $scope.removeRegister = function(removeItem) {
            let index = $scope.registers.indexOf(removeItem);
            $scope.registers.splice(index, 1);
            console.log($scope.registers)
            $scope.recalculateSpreadsheet();
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

            return parseInt(newPower);
        }

        var formatSchedule = function(time) {
            return $filter('date')(time, 'HH:mm:ss');
        }

        var formatTime = function(time) {
            var periods = formatSchedule(time).split(':');
            return Number(periods[0]*60) + Number(periods[1]);
        }

        var formatNumber = function(number) {
            return (number < 0 ? 0 : parseInt(number))
        }

        var formatDaysOfMonth = function(days) {
            if(days > 31)
                return 31;
            else if(days < 0)
                return 0;
            else    
                return parseInt(days);
        }

        $scope.autoSave = function(register) {

            register.power = formatNumber(register.power);
            register.quantity = formatNumber(register.quantity);
            register.daysOfUse = formatDaysOfMonth(register.daysOfUse);

            if( register.power != null && register.quantity != null && register.daysOfUse != null && register.startUse != null && register.time != null) {

                let newRegister = angular.copy(register);
                newRegister.power = convertPower(newRegister)
                newRegister.startUse = formatSchedule(newRegister.startUse);
                newRegister.time = formatTime(newRegister.time);

                spreadsheetFactory.monthlyCalculation(newRegister)
                    .then(function(promisse) {
                        register.costConventionalRate = promisse.data.conventionalRateMonth;
                        register.costWhiteRate = promisse.data.whiteRateMonth;
                        $scope.totalCostCalculation();
                        $scope.totalConsumptionCalculation()
                    })
                    .catch(function() {
                        register.costConventionalRate = 0;
                        register.costWhiteRate = 0;
                        $scope.totalCostCalculation();
                        $scope.totalConsumptionCalculation()
                    })
            }
        }

        $scope.totalCostCalculation = function() {
            let totalCostWhiteRate = 0;
            let totalCostConventionalRate = 0;

            $scope.registers.map(item => {
                totalCostWhiteRate += item.costWhiteRate;
                totalCostConventionalRate += item.costConventionalRate;
            })

            $scope.totalCostWhiteRate = totalCostWhiteRate.toFixed(2);
            $scope.totalCostConventionalRate = totalCostConventionalRate.toFixed(2);
            
        }

        $scope.recalculateSpreadsheet = function() {
            $scope.companyId = $scope.energyCompanySelected.id;
            if($scope.registers.length == 0) {
                $scope.totalCostWhiteRate = 0;
                $scope.totalCostConventionalRate = 0;
                $scope.totalConsumption = 0;
            } else {
                $scope.registers.map(item => {
                    item.companyId = $scope.companyId;
                    $scope.autoSave(item); 
                })
            }
        }

        $scope.totalConsumptionCalculation = function() {
            let totalConsuption = 0;
            $scope.registers.map(item => {
                if( !Number.isNaN(item.power) && !Number.isNaN(item.quantity) && !Number.isNaN(item.time) && !Number.isNaN(item.daysOfUse) )
                    totalConsuption += (item.power*item.quantity*(formatTime(item.time)/60)*item.daysOfUse)/1000;
            })
            $scope.totalConsumption = totalConsuption.toFixed(2);
        }


    }])