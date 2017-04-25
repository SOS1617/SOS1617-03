angular.module("EarlyleaverManagerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "list.html",
            controller : "ListCtrl"
        })
        .when("/earlyleaver/:country/:year",{
            templateUrl : "edit.html",
            controller : "EditCtrl"
        });
    console.log("App initialized");
});

