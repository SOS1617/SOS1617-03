angular.module("ResultsManagerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "list.html",
            controller : "ResListCtrl"
        })
        .when("/results/:country/:year",{
            templateUrl : "edit.html",
            controller : "ResEditCtrl"
        });
    console.log("App initialized");
});
