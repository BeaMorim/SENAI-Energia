app 
    .controller('taxCalculationController', function($scope, $mdDialog) {

        $scope.openModal = function() {
            $mdDialog.show({
                templateUrl: 'app/shared/directives/modal/modal.template.html',
                parent: angular.element(document.body),
                controller: modalController,
                clickOutsideToClose: false
            })
            .then(function(energyCompany) {
                //armazenar a companhia de energia escolhida
            })
        }

        function modalController($scope, $mdDialog) {

            $scope.hideModal = function() {
                $mdDialog.hide();
            };

        }

    })
    
    .directive('taxCalculation', function() {
        return {
            templateUrl: "app/shared/directives/taxCalculation/taxCalculation.template.html",
            controller: "taxCalculationController"
        }
    })