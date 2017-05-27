angular
    .module("GroupThreeApp")
    .controller("ResCurrencyCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        $scope.resultFinland=[];
         $scope.resultSpain=[];
        var dataCache = {};


         
         $http.get("https://currencyconverter.p.mashape.com/?from=ESP&from_amount=1000&to=FIM&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
            $scope.Spaincurrency= $scope.data.from_amount;
            $scope.Finlandcurrency= $scope.data.to_amount;


        console.log($scope.data);





         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
                 for (var i=0; i<$scope.data.length; i++){
                 if($scope.data[i].country == "Finland" && $scope.data[i].year == "2015"){
                     $scope.resultFinland = Number($scope.data[i].math);
                 }
                 
                 
             }
             
                          for (var i=0; i<$scope.data.length; i++){
                 if($scope.data[i].country == "Spain" && $scope.data[i].year == "2015"){
                     $scope.resultSpain = Number($scope.data[i].science);
                 }
                 
                 
             }
         
         

               console.log($scope.Spaincurrency);
               console.log($scope.Finlandcurrency);





var trace1 = {
  x: ['Finland','Spain'], 
  y: [$scope.Finlandcurrency, $scope.Spaincurrency], 
  name: 'Value of currency', 
  type: 'bar'
};

var trace2 = {
  x: ['Finland', 'Spain'], 
  y: [$scope.resultFinland, $scope.resultSpain], 
  name: 'Pisa Result(math)', 
  type: 'bar'
};

var data = [trace1, trace2];

var layout = {barmode: 'group'};

Plotly.newPlot('respopulationchart', data, layout);
         });
         

                  });

            }]);

