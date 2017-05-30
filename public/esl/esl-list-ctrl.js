/* global angular */
/* global Materialize */
/* global $ */

var aux;

angular.module("GroupThreeApp").
    controller("EslListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Controller initialized");

    $scope.apikey = "apisupersecreta";

    $scope.data = {};
    var dataCache = {};
    
    var limit;
    var offset;
    $scope.limit;
    $scope.offset = 0;

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
            .get("../api/v2/earlyleavers" + "?apikey=" + $scope.apikey + "&from=2010&to=2017" + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                console.log("offset" + $scope.offset);
                console.log("limit" + $scope.limit);
                limit = $scope.limit;
                offset = $scope.offset;
                $scope.data = response.data;
            }, function error(response) {
                if (response.apikey != $scope.apikey & response.status == 403) {
                    console.log("Incorrect apikey. Error ->" + response.status);
                    Materialize.toast('<i class="material-icons">error_outline</i> Api key incorrect. Cannot get data', 4000);
                    //sweetAlert("Incorrect apikey!!!");
                }
                else if (response.status == 401) {
                    console.log("Empty Apikey. Error ->" + response.status);
                    Materialize.toast('<i class="material-icons">error_outline</i> Api key not defined. Cannot get data', 4000);
                    //sweetAlert("Empty apikey!!!");
                }

            });
        };

    var refresh = $scope.refresh = function() {

        $http
            .get("../api/v2/earlyleavers" + "?" + "apikey=" + $scope.apikey)
            .then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.data = response.data;
                aux =1;
            }, function(response) {
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
                aux=0;
            });
    };

    $scope.addData = function() {
        $http
            .post("../api/v2/earlyleavers" + "?" + "apikey=" + $scope.apikey, $scope.newData)
            .then(function(response) {
                console.log("Data added!");
                Materialize.toast('<i class="material-icons">done</i> ' + $scope.newData.country + ' has been added succesfully!', 4000);
                refresh();
            }, function(response) {
                switch (response.status) {
                    case 409:
                        Materialize.toast('<i class="material-icons">error_outline</i> This element already exist!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                        break;
                }
            });
    };

    /*$scope.editDataModal = function(data) {
        data["oldCountry"] = data["country"];
        data["oldYear"] = data["year"];
        $scope.editDataUnit = data;
        $('#editModal').modal('open');
    };*/

    $scope.searches = function(){
        $http
            .get("../api/v2/earlyleavers" + "?" + "apikey=" + $scope.apikey + "&from=" + $scope.newData.from + "&to=" + $scope.newData.to)
            .then(function(response) {
                console.log("The between year: " + $scope.newData.from + " and year " + $scope.newData.to + " works correctly.");
                $scope.data = response.data;
            });
    };
    
    $scope.deleteData = function(data) {
        $http
            .delete("../api/v2/earlyleavers/" + data.country + "/" + data.year + "?" + "apikey=" + $scope.apikey)
            .then(function(response) {
                console.log("Data " + data.country + " deleted!");
                Materialize.toast('<i class="material-icons">done</i> ' + data.country + ' has been deleted succesfully!', 4000);
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("../api/v2/earlyleavers" + "?" + "apikey=" + $scope.apikey)
            .then(function(response) {
                console.log("All data deleted!");
                Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };

    $scope.loadInitialData = function() {
        //refresh();
        if (//$scope.data.length == -1
                aux==0) {
            $http
                .get("../api/v2/earlyleavers/loadInitialData" + "?" + "apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("Initial data loaded");
                    Materialize.toast('<i class="material-icons">done</i> Loaded inital data succesfully!', 4000);
                    refresh();
                }, function(response) {
                    Materialize.toast('<i class="material-icons">error_outline</i> Error adding initial data!', 4000);
                });
        }
        else {
            Materialize.toast('<i class="material-icons">error_outline</i> There are already data in the DB', 4000);
            console.log("List must be empty!");
        }
    };
    
    $('#apikeyModal').modal({
        complete: function() {

            $http
                .get("../api/v2/earlyleavers" + "?" + "apikey=" + $scope.apikey)
                .then(function(response) {
                    Materialize.toast('<i class="material-icons">done</i> Api key changed successfully!', 4000);
                    dataCache = response.data;
                    $scope.refresh();
                }, function(response) {
                    dataCache = {};
                    $scope.refresh();
                    switch (response.status) {
                        case 401:
                            Materialize.toast('<i class="material-icons">error_outline</i> Api key not defined. Cannot get data', 4000);
                            break;
                        case 403:
                            Materialize.toast('<i class="material-icons">error_outline</i> Api key incorrect. Cannot get data', 4000);
                            break;
                        default:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                            break;
                    }
                });
            console.log("Api key changed!");
        }
    });

    refresh();

    $(document).ready(function() {
        $('.modal').modal({
            ready: function(modal, trigger) {
                Materialize.updateTextFields();
            },
            complete: function() {
                refresh();
            }
        });
        $(".button-collapse").sideNav();
    });
}]);