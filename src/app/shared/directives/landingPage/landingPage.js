app     
    .controller('landingPageController', function($scope, spreadsheetFactory) {

        $scope.getCompanies = function() {
            spreadsheetFactory.companiesList
                .then(function(promisse) {
                    $scope.energyCompanies = promisse;
                    $scope.energyCompanySelected = $scope.energyCompanies[0];
                })
        }
        
    })