angular
    .module("GroupThreeApp")
    .controller("ResWeatherCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};

         
         $http.get("https://sos1617-06.herokuapp.com/api/v1/gdp-per-capita?apikey=secret").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){

              
             }
             


         });
         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             

               


         });
         
         

                console.log("Controller intialized");
                $http
                    .get("https://sos1617-06.herokuapp.com/api/v1/gdp-per-capita?apikey=secret")
                    .then(function(response) {



                    });
            }]);

