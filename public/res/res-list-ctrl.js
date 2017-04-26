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
    $scope.currentPage = 1;
    $scope.maxPages = 1;
    $scope.pages = [];
    $scope.pagesLeft = [];
    $scope.pagesMid = [];
    $scope.pagesRight = [];

    var modifier = "";
    var properties = "";

    var dataCache = {};
    var currentPage = 1;
    var maxPages = 1;

    var elementsPerPage = 8;

    function setPagination() {
        var pagesNearby = 2;
        $scope.pagesLeft = [];
        $scope.pagesMid = [];
        $scope.pagesRight = [];
        if ($scope.maxPages <= pagesNearby * 2) {
            for (var i = 1; i <= $scope.maxPages; i++) $scope.pagesLeft.push(i);
        }
        else if ($scope.currentPage >= 0 && $scope.currentPage <= pagesNearby) {
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesLeft.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesMid.push(i);
        }
        else if ($scope.currentPage >= $scope.maxPages - pagesNearby + 1 && $scope.currentPage <= $scope.maxPages) {
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesMid.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesRight.push(i);
        }
        else {
            
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesLeft.push(i);
            for (var i = Math.max($scope.currentPage - 1, pagesNearby + 1); i <= Math.min($scope.currentPage + 1, $scope.maxPages - pagesNearby); i++) $scope.pagesMid.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesRight.push(i);
            if (($scope.pagesLeft[$scope.pagesLeft.length - 1] == $scope.pagesMid[0] - 1) && ($scope.pagesMid[$scope.pagesMid.length - 1] == $scope.pagesRight[0] - 1)) {
                $scope.pagesMid = $scope.pagesMid.concat($scope.pagesRight);
                $scope.pagesLeft = $scope.pagesLeft.concat($scope.pagesMid);
                $scope.pagesMid = [];
                $scope.pagesRight = [];
            }
            else if ($scope.pagesLeft[$scope.pagesLeft.length - 1] == $scope.pagesMid[0] - 1) {
                $scope.pagesLeft = $scope.pagesLeft.concat($scope.pagesMid);
                $scope.pagesMid = [];
            }
            else if ($scope.pagesMid[$scope.pagesMid.length - 1] == $scope.pagesRight[0] - 1) {
                $scope.pagesRight = $scope.pagesMid.concat($scope.pagesRight);
                $scope.pagesMid = [];
            }
        }
    }


    $scope.setPage = function(page) {
        $scope.currentPage = page;
        $scope.refreshPage();
    };

    $scope.previousPage = function() {
        $scope.currentPage--;
        $scope.refreshPage();
    };

    $scope.nextPage = function() {
        $scope.currentPage++;
        $scope.refreshPage();
    };

    $scope.refreshPage = function() {
        if ($scope.currentPage <= 0) $scope.currentPage = 1;
        if ($scope.currentPage > $scope.maxPages) $scope.currentPage = $scope.maxPages;
        setPagination();
        if (dataCache.length > elementsPerPage) {
            $scope.data = dataCache.slice(Number(($scope.currentPage - 1) * elementsPerPage), Number(($scope.currentPage) * elementsPerPage));
        }
        else {
            $scope.data = dataCache;
        }
    };
    var refresh = $scope.refresh = function() {



        $http
            .get("../api/v2/results" + modifier + "?" + "apikey=" + $scope.apikey + "&" + properties)
            .then(function(response) {
                $scope.maxPages = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);

                dataCache = response.data;
                 $scope.refreshPage();

                aux = 1;
            }, function(response) {

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
                        break;  
                        default:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                            break;
                    }
                    aux = 0;
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
                    $scope.refreshPage();
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
                refresh();
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
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                refresh();
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
                refresh();
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
                refresh();
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