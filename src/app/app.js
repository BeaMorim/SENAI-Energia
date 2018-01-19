var app = angular.module('senaiEnergia', ['ngMaterial', 'ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/planilha");

        $stateProvider
            .state('landingPage', {
                url: "/",
                templateUrl: "app/shared/templates/landingPage.html"
            })
            .state('rateCalculation', {
                url: "/planilha",
                templateUrl: "app/shared/templates/taxCalculation.html"
            })
    });