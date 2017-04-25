angular.module("InvestmentsEducationApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl : "list.html",
        controller : "ListCtrl"
    })
    .when("/investmentseducation/:country/:year",{
        templateUrl : "edit.html",
        controller : "EditCtrl"
    });
    
    
    console.log("App initialized and configured");
    
});

