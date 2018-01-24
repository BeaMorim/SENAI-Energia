app     
    .controller('landingPageController', function($scope, spreadsheetFactory) {

        $scope.getCompanies = function() {
            spreadsheetFactory.companiesList
                .then(function(promisse) {
                    $scope.energyCompanies = promisse;
                    $scope.energyCompanySelected = $scope.energyCompanies[0];
                })
        }

        $scope.getTimeIntervals = function() {
            spreadsheetFactory.getTimeIntervals($scope.energyCompanySelected.id)
                .then(function(promisse) {
                    let timeIntervalsList = promisse.data.timeIntervals
                    $scope.rates = {
                        whiteRates: arrayReduce(timeIntervalsList, 'Branca'),
                        conventionalRates: arrayReduce(timeIntervalsList, 'Convencional')
                    }
                    console.log($scope.rates)
                })
        }

        var arrayReduce = (array, tipoTarifa) => {
            return array.reduce((anterior, atual, indice, array) => {
                if (atual.type === tipoTarifa) {
                    var hasSome = anterior.some(row => {
                        if (row.value === atual.value) {
                            row.ranges.push({
                                start: atual.startTime,
                                end: atual.endTime
                            })
                            return true;
                        }
                        return false;
                    })
        
                    if (hasSome) return anterior;
        
                    return anterior.concat({
                        value: atual.value,
                        ranges: [
                            {
                                start: atual.startTime,
                                end: atual.endTime
                            }
                        ]
                    });
                } else {
                    return anterior;
                }
            }, [])
        };
        
    })