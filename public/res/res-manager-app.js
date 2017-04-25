angular.module("ResultsManagerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "list.html",
            controller : "ListCtrl"
        })
        .when("/result/:country/:year",{
            templateUrl : "edit.html",
            controller : "EditCtrl"
        });
    console.log("App initialized");
});
