var app = angular.module('senaiEnergia', ['ngMaterial', 'ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('landingPage', {
                url: "/",
                templateUrl: "app/shared/directives/landingPage/landingPage.template.html",
                controller: "landingPageController"
            })
            .state('rateCalculation', {
                url: "/planilha",
                templateUrl: "app/shared/directives/rateCalculation/rateCalculation.template.html",
                controller: "rateCalculationController"
            })
    })

    