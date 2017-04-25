angular.module("InvestmentsEducationApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl : "list.html",
        controller : "InveListCtrl"
    })
    .when("/investmentseducation/:country/:year",{
        templateUrl : "edit.html",
        controller : "InveEditCtrl"
    });
    
    
    console.log("App initialized and configured");
    
});

