angular
    .module("GroupThreeApp")
    .controller("ResWeatherCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        $scope.temperatureSpain={};
        $scope.temperatureFinland={};
        var dataCache = {};
        $scope.resultSpain=0;
        $scope.resultFinland=0;

         
         $http.get("https://simple-weather.p.mashape.com/weatherdata?lat=40.0&lng=-3.0&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             $scope.temperatureSpain = Number(dataCache.query.results.channel.item.forecast[0].high);
                          console.log($scope.data);
                          console.log($scope.temperatureSpain);




         
                  $http.get("https://simple-weather.p.mashape.com/weatherdata?lat=61.0&lng=25&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             $scope.temperatureFinland = Number(dataCache.query.results.channel.item.forecast[0].high);
                          console.log($scope.data);
                          console.log($scope.temperatureFinland);




         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
            
             for (var i=0; i<$scope.data.length; i++){
                 if($scope.data[i].country == "Spain" && $scope.data[i].year == "2015"){
                     $scope.resultSpain = Number($scope.data[i].science);
                 }
                 
                 
             }
         

               


         });
         
                           $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
            
             for (var i=0; i<$scope.data.length; i++){
                 if($scope.data[i].country == "Finland" && $scope.data[i].year == "2015"){
                     $scope.resultFinland = Number($scope.data[i].science);
                 }
                 
                 
             }


console.log($scope.temperatureFinland);

        var trace1 = {
              x: ["Finland", "Spain"], 
              y: [$scope.resultFinland, $scope.resultSpain], 
              type: 'scatter',
              name: 'Science result'
            };
            
        var trace2 = {
              x: ["Finland","Spain"], 
              y: [$scope.temperatureFinland, $scope.temperatureSpain], 
              type: 'bar',
              name: 'Temperature'
            };
            
            var data = [trace1, trace2];
            var layout = {
    title: 'Comparison temperature and marks on science',
    showlegend: true
};
            Plotly.newPlot('resweatherchart', data, layout);
            
                           });
                  });
         });
            }]);

