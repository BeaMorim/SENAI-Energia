app 
    .factory('spreadsheetFactory', function($http, config) {
       
        var _getAppliances = function() {
            return $http({
                method: 'GET',
                url: config.baseUrl + '/equipments'
            })
        }

        var _getCompanies = function() {
            return $http({
                method: 'GET',
                url: config.baseUrl + '/companies'
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
            getAppliances: _getAppliances,
            getCompanies: _getCompanies,
            getTimeIntervals: _getTimeIntervals,
            monthlyCalculation: _monthlyCalculation
        }
    })