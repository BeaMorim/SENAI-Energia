app 
    .factory('spreadsheetFactory', function($http, config) {
       
        var getCompanies = function() {
            return $http({
                method: 'GET',
                url: config.baseUrl + '/companies'
            })
        }

        var _companiesList = getCompanies()
            .then(function(promisse) {
                energyCompanies = promisse.data.companies;
                return energyCompanies;
            })
            .catch(function() {
                return energyCompanies;
            })

        var _getAppliances = function() {
            return $http({
                method: 'GET',
                url: config.baseUrl + '/equipments'
            })
        }

        var _getTimeIntervals = function(companyId) {
            return $http({
                method: 'GET',
                url: config.baseUrl + '/timeintervals/' + companyId
            })
        }

        var _monthlyCalculation = function(register) {
            return $http({
                method: 'POST',
                url: config.baseUrl + '/calculate',
                data: register
            })
        }

        return {
            companiesList: _companiesList,
            getAppliances: _getAppliances,
            getTimeIntervals: _getTimeIntervals,
            monthlyCalculation: _monthlyCalculation
        }
    })