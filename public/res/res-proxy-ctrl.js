angular
    .module("GroupThreeApp")
    .controller("ResProxyChartCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.countriesext = [];
         $scope.mycountries= [];
         $scope.reading = [];
         $scope.science = [];
         $scope.math = [];
         $scope.male_unemployment_ratio= [];
         $scope.female_unemployment_ratio= [];
         
         

      
         
         
    $http.get("/resproxy").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<4; i++){
                 $scope.countriesext.push($scope.data[i].country);
                $scope.male_unemployment_ratio.push(Number($scope.data[i].male_unemployment_ratio));
              $scope.female_unemployment_ratio.push(Number($scope.data[i].female_unemployment_ratio));




                 console.log($scope.data[i].country);
             }
             


         });
         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = response.data;
             
             for(var i=0; i<response.data.length; i++){
                 if($scope.data[i].country == "Germany"){
                 $scope.mycountries.push($scope.data[i].country);
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));
                 break;
                 }
                 }
                              for(var i=0; i<response.data.length; i++){
                 if($scope.data[i].country == "Spain"){
                   $scope.mycountries.push($scope.data[i].country);
                    $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));
                 break;
                 }
                 }
                              for(var i=0; i<response.data.length; i++){
                 if($scope.data[i].country == "Italy"){
                $scope.mycountries.push($scope.data[i].country);
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));
                 break;
                 }
                 }
                              for(var i=0; i<response.data.length; i++){
                 if($scope.data[i].country == "France"){
                 $scope.mycountries.push($scope.data[i].country);
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));
                 break;
                 }
                 }

             console.log($scope.female_unemployment_ratio);


         });
         
         

                console.log("Controller intialized");
                $http
                    .get("/resProxy")
                    .then(function(response) {
                        console.log("hola" + response.data);
Highcharts.chart('reschartproxy', {
    colorAxis: {
        minColor: '#00FF00',
        maxColor: '#FF0000'
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'Germany',
            value: $scope.reading[0]+$scope.math[0]+$scope.science[0],
            colorValue:  ($scope.male_unemployment_ratio[0] + $scope.female_unemployment_ratio[0]) / 2
        }, {
            name: 'Spain',
            value:  $scope.reading[1]+$scope.math[1]+$scope.science[1],
            colorValue: ($scope.male_unemployment_ratio[1] + $scope.female_unemployment_ratio[1]) /2
        }, {
            name: 'Italy',
            value:  $scope.reading[2]+$scope.math[2]+$scope.science[2],
            colorValue: ($scope.male_unemployment_ratio[2] + $scope.female_unemployment_ratio[2]) /2
        }, {
            name: 'France',
            value:  $scope.reading[3]+$scope.math[3]+$scope.science[3],
            colorValue: ($scope.male_unemployment_ratio[3] + $scope.female_unemployment_ratio[3]) /2
        }]
    }],
    title: {
        text: 'Chart unemployment and PISA results'
    },
        subtitle:{
        text: 'Big square = better marks in PISA exams (Total)  ||   Color = High/Low Unemployment (%)'
    }
});

                    });
            }]);

