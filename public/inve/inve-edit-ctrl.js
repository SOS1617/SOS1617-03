angular
    .module("GroupThreeApp")
    .controller("InveEditCtrl",["$scope","$http","$routeParams","$location",function ($scope, $http, $routeParams, $location){
        
        console.log("Edit Controller initialized");
        $scope.apikey = "apisupersecreta";
        
        function refresh(){
            $http
            .get("/api/v2/investmentseducation/"+$routeParams.country + "/" + $routeParams.year+ "?" + "apikey=" + $scope.apikey)
            .then(function (response){
                console.log("Data received " + JSON.stringify(response.data,null,2));
                $scope.updatedInvestmentsEducation = response.data;
            }); 
        }
        
        $scope.editData = function(data) {

        var oldCountry = data.country;
        var oldYear = data.year;
        delete data._id;
        delete data.oldCountry;
        delete data.oldYear;

        //data.year = Number(data.year);
        $http
            .put("../api/v2/investmentseducation/" + data.country + "/" + data.year + "?" + "apikey=" + $scope.apikey, data)
            .then(function(response) {
                console.log("Data " + data.country + " edited!");
                Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                //refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                refresh();
            });
            $location.path("/inve/");
    };
    refresh();

}]);