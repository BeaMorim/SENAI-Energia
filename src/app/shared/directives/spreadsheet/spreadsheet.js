app
    .directive('spreadsheet', function() {
        return {
            templateUrl: "app/shared/directives/spreadsheet/spreadsheet.template.html",
            controller: "spreadsheetController"
        }
    })

    .controller('spreadsheetController', [ '$scope', 'spreadsheetFactory', function($scope, spreadsheetFactory) {

        $scope.registers = [];
        $scope.lastId = 0;
        
        $scope.addRegister = function() {
            var newRegister = {id: $scope.lastId};
            $scope.lastId ++;
            $scope.registers.push(newRegister)
        }

        $scope.removeRegister = function(removeItem) {
            let index = $scope.registers.indexOf(removeItem);
            $scope.registers.splice(index, 1);
        }

        $scope.teste = function() {
            console.log('xxx')
        }


        
        
        

        spreadsheetFactory.getTimeIntervals(1)
            .then(function(promisse) {
                // console.log(promisse.data.timeIntervals)
            })
            .catch(function() {

            })

        var register = {
            power: 5,
            quantity: 3,
            time: 80,
            startUse: '11:11:00',
            daysOfUse: 30,
            companyId: 5
        }

        spreadsheetFactory.monthlyCalculation(register)
            .then(function(promisse) {
                // console.log(promisse.data.conventionalRateMonth)
                // console.log(promisse.data.whiteRateMonth)
            })

    }])