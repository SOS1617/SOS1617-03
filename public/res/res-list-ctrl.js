/* global angular */
/* global Materialize */
/* global $ */
var previousPage;
var nextPage;
var setPage;
var aux;
angular.module("GroupThreeApp").
controller("ResListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Controller initialized");
    $scope.url = "/api/v2/results";
    $scope.apikey = "apisupersecreta";
    $scope.search = {};
    $scope.searchAdd = {};
    $scope.data = {};
    var dataCache = {};
    var limit;
    var offset;
    var modifier = "";
    var properties = "";

    var dataCache = {};
    $scope.offset = 0;
    var elementsPerPage = 8;

        $scope.siguiente = function() {
            $scope.offset = (parseInt($scope.offset) + parseInt($scope.limit));

            $scope.paginacion();
        };
        $scope.anterior = function() {
            if($scope.offset-$scope.limit>=0){
            $scope.offset = $scope.offset - $scope.limit;
            }
            $scope.paginacion();
        };


        $scope.paginacion = function() {
            $scope.data = {};

            $http
                .get($scope.url + "?apikey=" + $scope.apikey + "&from=2010&to=2017&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    console.log("offset" + $scope.offset);
                    console.log("limit" + $scope.limit);
                    limit = $scope.limit;
                    offset = $scope.offset;
                    $scope.data = response.data;
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                        sweetAlert("Incorrect apikey!!!");
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                        sweetAlert("Empty apikey!!!");

                    }

                });
        };

        $scope.refresh = function() {
            $http
                .get("../api/v2/results" + "?" + "apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("Data received:" + JSON.stringify(response.data, null, 2));
                    $scope.data = response.data;
                    aux =1;

                },  function(response) {
                     aux=0;
                switch (response.status) {
                    case 401:
                        $scope.data = {};
                        Materialize.toast('<i class="material-icons">error_outline</i> Api key not defined. Cannot get data', 4000);
                        break;
                    case 403:
                        $scope.data = {};
                        Materialize.toast('<i class="material-icons">error_outline</i> Api key incorrect. Cannot get data', 4000);
                        break;
                    case 404:
                        $scope.data = {};
                        Materialize.toast('<i class="material-icons">error_outline</i> No data found!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                        break;
                }
               
            });
    };

        $('#apikeyModal').modal({
        complete: function() {

            $http
                .get("../api/v1/results" + "?" + "apikey=" + $scope.apikey)
                .then(function(response) {
                    Materialize.toast('<i class="material-icons">done</i> Api key changed successfully!', 4000);
                    $scope.maxPages = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);
                    dataCache = response.data;
                    $scope.refresh();
                }, function(response) {
                    $scope.maxPages = 1;
                    dataCache = {};
                    $scope.refreshPage();
                    switch (response.status) {
                        case 401:
                            dataCache = {};
                            $scope.refreshPage();
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                            break;
                        case 403:
                             dataCache = {};
                            $scope.refreshPage();
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                            break;
                        case 404:
                            $scope.maxPages = 1;
                            dataCache = {};
                            $scope.refreshPage();
                            Materialize.toast('<i class="material-icons">error_outline</i> No data found!', 4000);
                        break;                        default:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                            break;
                    }
                });
            console.log("Api key changed!");
        }
    });

    $scope.addData = function() {
        $http
            .post("../api/v2/results" + "?" + "apikey=" + $scope.apikey, $scope.newData)
            .then(function(response) {
                console.log("Data added!");
                Materialize.toast('<i class="material-icons">done</i> ' + $scope.newData.country + ' has been added succesfully!', 4000);
                $scope.refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
            });
    };

    $scope.editDataModal = function(data) {
        data["oldCountry"] = data["country"];
        data["oldYear"] = data["year"];
        $scope.editDataUnit = data;
        $('#editModal').modal('open');
    };

    $scope.editData = function(data) {

        var oldCountry = data.oldCountry;
        var oldYear = data.oldYear;
        delete data._id;
        delete data.oldCountry;
        delete data.oldYear;

        //data.year = Number(data.year);
        $http
            .put("../api/v2/results/" + oldCountry + "/" + oldYear + "?" + "apikey=" + $scope.apikey, data)
            .then(function(response) {
                console.log("Data " + data.country + " edited!");
                Materialize.toast('<i class="material-icons">done</i> ' + oldCountry + ' has been edited succesfully!', 4000);
                $scope.refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                $scope.refresh();
            });
    };


     $scope.searches = function(){
            $http
                .get($scope.url+"?apikey="+$scope.apikey+"&from="+$scope.newData.from+"&to="+$scope.newData.to)
                .then(function(response){
                    console.log("The between year: "+$scope.newData.from +" and year "+ $scope.newData.to+ " works correctly");
                  $scope.data = response.data;

              
                });
        };
        
        
    $scope.deleteData = function(data) {
        $http
            .delete("../api/v2/results/" + data.country + "/" + data.year + "?" + "apikey=" + $scope.apikey)
            .then(function(response) {
                console.log("Data " + data.country + " deleted!");
                Materialize.toast('<i class="material-icons">done</i> ' + data.country + ' has been deleted succesfully!', 4000);
                $scope.refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("../api/v2/results" + "?" + "apikey=" + $scope.apikey)
            .then(function(response) {
                console.log("All data deleted!");
                Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!!', 4000);
                $scope.refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };

    $scope.loadInitialData = function() {
        if (aux==0) {
            $http
                .get("../api/v2/results/loadInitialData" + "?" + "apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("Initial data loaded");
                    Materialize.toast('<i class="material-icons">done</i> Loaded inital data succesfully!', 4000);
                    $scope.refresh();
                }, function(response) {
                    Materialize.toast('<i class="material-icons">error_outline</i> Error adding initial data!', 4000);
                });
        }
        else {
            Materialize.toast('<i class="material-icons">error_outline</i> There are already data in the DB', 4000);
            console.log("List must be empty!");
        }
    };


    $scope.refresh();

    $(document).ready(function() {
        $('.modal').modal({
            ready: function(modal, trigger) {
                Materialize.updateTextFields();
            },
            complete: function() {
                $scope.refresh();
            }
        });
        $(".button-collapse").sideNav();
    });
}]);