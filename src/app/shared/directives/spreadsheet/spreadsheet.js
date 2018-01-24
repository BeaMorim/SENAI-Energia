app
    .directive('spreadsheet', function() {
        return {
            templateUrl: "app/shared/directives/spreadsheet/spreadsheet.template.html",
            controller: "spreadsheetController"
        }
    })

    .controller('spreadsheetController', [ '$scope', 'spreadsheetFactory', function($scope, spreadsheetFactory) {
        $scope.teste = "teste"

        $scope.registers = ["teste1", "teste2", "teste3", "teste4", "teste12", "teste22", "teste32", "teste42"];

        spreadsheetFactory.getAppliances()
            .then(function(promisse) {
                console.log(promisse.data.equipments)
            })
            .catch(function() {
                //instanciar array vazio
            })
        
        spreadsheetFactory.getCompanies()
            .then(function(promisse) {
                console.log(promisse.data.companies)
            })
            .catch(function() {
                //intanciar array
            })

        spreadsheetFactory.getTimeIntervals(1)
            .then(function(promisse) {
                console.log(promisse.data.timeIntervals)
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
                console.log(promisse.data.conventionalRateMonth)
                console.log(promisse.data.whiteRateMonth)
            })

    }])