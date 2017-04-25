angular.module("EarlyleaverManagerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "list.html",
            controller : "EslListCtrl"
        })
        .when("/:country/:year",{
            templateUrl : "edit.html",
            controller : "EslEditCtrl"
        });
    console.log("App initialized");
});

