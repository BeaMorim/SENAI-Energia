app 
    .controller('rateCalculationController', function($scope, spreadsheetFactory, $mdDialog) {

        $scope.electricalAppliances = [];
        $scope.companyId = 1;

        $scope.init = function(){
            openModal();
            getAppliances();
        }

        var openModal = function() {
            $mdDialog.show({
                templateUrl: 'app/shared/directives/modal/modal.template.html',
                parent: angular.element(document.body),
                controller: modalController,
                clickOutsideToClose: false
            })
            .then(function(energyCompany) {
                $scope.companyId = energyCompany;
            })
        }

        var getAppliances = function() {
            spreadsheetFactory.getAppliances()
                .then(function(promisse) {
                    $scope.electricalAppliances = promisse.data.equipments;
                })
        }

        function modalController($scope, $mdDialog) {
            $scope.hideModal = function() {
                $mdDialog.hide($scope.energyCompanySelected.id);
            };

            $scope.getCompanies = function() {
                spreadsheetFactory.companiesList
                    .then(function(promisse) {
                        $scope.energyCompanies = promisse;
                    })
            }
        }

    })
    
    .directive('taxCalculation', function() {
        return {
            templateUrl: "app/shared/directives/taxCalculation/taxCalculation.template.html",
            controller: "taxCalculationController"
        }
    })