angular
    .module("GroupThreeApp")
    .controller("ResProxyChartCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.reading = [];
         $scope.science = [];
         $scope.math = [];
         $scope.male_unemployment_ratio= [];
         $scope.female_unemployment_ratio= [];
         
         

      
         
         
         $http.get("../resproxy").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                $scope.male_unemployment_ratio.push(Number($scope.data[i].male_unemployment_ratio));
              $scope.female_unemployment_ratio.push(Number($scope.data[i].female_unemployment_ratio));




                 console.log($scope.data[i]);
             }
             


         });
         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = response.data;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));



             }
             


         });
         
         

                console.log("Controller intialized");
                $http
                    .get("https://sos1617-01.herokuapp.com/api/v2/youthunemploymentstats?apikey=sos161701")
                    .then(function(response) {
                        console.log("hola" + response.data);
Highcharts.chart('reschartproxy', {
    colorAxis: {
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'A',
            value: 6,
            colorValue: 1
        }, {
            name: 'B',
            value: 6,
            colorValue: 2
        }, {
            name: 'C',
            value: 4,
            colorValue: 3
        }, {
            name: 'D',
            value: 3,
            colorValue: 4
        }, {
            name: 'E',
            value: 2,
            colorValue: 5
        }, {
            name: 'F',
            value: 2,
            colorValue: 6
        }, {
            name: 'G',
            value: 1,
            colorValue: 7
        }]
    }],
    title: {
        text: 'Highcharts Treemap'
    }
});

                    });
            }]);

