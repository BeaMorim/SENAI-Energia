app
    .directive('spreadsheet', function() {
        return {
            templateUrl: "app/shared/directives/spreadsheet/spreadsheet.template.html",
            controller: "spreadsheetController"
        }
    })

    .controller('spreadsheetController', [ '$scope', function($scope) {
        $scope.teste = "teste"

        $scope.registers = ["teste1", "teste2", "teste3", "teste4"];

    }])