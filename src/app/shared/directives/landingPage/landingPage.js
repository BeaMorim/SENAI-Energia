app
    .controller('landingPageController', function($scope) {
        $scope.whiteRates = [
            {
              value: 0.35,
              intervals: [
                  {
                    startTime: "00:00",
                    endTime: "16:29",
                  }, 
                  {
                    startTime: "21:31",
                    endTime: "23:59",
                  }
              ]
            },
            {
                value: 0.49,
                intervals: [
                    {
                      startTime: "16:30",
                      endTime: "17:29",
                    }, 
                    {
                      startTime: "20:31",
                      endTime: "21:30",
                    }
                ]
              },
          ];

          $scope.conventionalRates = [
            {
              value: 0.35,
              intervals: [
                  {
                    startTime: "00:00",
                    endTime: "16:29",
                  }, 
                  {
                    startTime: "21:31",
                    endTime: "23:59",
                  }
              ]
            }
          ];
    })