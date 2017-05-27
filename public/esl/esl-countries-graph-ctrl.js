/*global angular*/
/*global google*/
angular
    .module("GroupThreeApp")
    .controller("EslCountriesGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.eslmale = [];
        $scope.eslfemale = [];
        $scope.esltotal = [];
        $scope.eslobjective = [];
        
        $scope.capital = [];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.eslmale.push(Number($scope.data[i].eslmale));
                $scope.eslfemale.push(Number($scope.data[i].eslfemale));
                $scope.esltotal.push(Number($scope.data[i].esltotal));
                $scope.eslobjective.push(Number($scope.data[i].eslobjective));
                $scope.capital.push(null);
                
                console.log($scope.data[i].country);
            }
        });
        
        $http.get("https://restcountries.eu/rest/v2/all").then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                
                if(capitalizeFirstLetter($scope.data[i].name) == "Spain"){
                    $scope.capital.splice(0,1,Number($scope.data[i].capital));
                    $scope.capital.splice(1,1,Number($scope.data[i].capital));
                }else if(capitalizeFirstLetter($scope.data[i].name) == "France"){
                    $scope.capital.splice(2,1,Number($scope.data[i].capital));
                    $scope.capital.splice(3,1,Number($scope.data[i].capital));
                }else if(capitalizeFirstLetter($scope.data[i].name) == "Italy"){
                    $scope.capital.splice(4,1,Number($scope.data[i].capital));
                    $scope.capital.splice(5,1,Number($scope.data[i].capital));
                }
            }
        });
            
    }]);