angular.module("GroupThreeApp", ["ngRoute"]).config(function($routeProvider) {
    
    $routeProvider
    
        .when("/", {
            templateUrl: "main.html"
        })

        .when("/esl", {
            templateUrl: "/esl/list.html",
            controller: "EslListCtrl"
        })
        .when("/esl/:country/:year", {
            templateUrl: "/esl/edit.html",
            controller: "EslEditCtrl"
        })

        .when("/inve", {
            templateUrl: "/inve/list.html",
            controller: "InveListCtrl"
        })
        .when("/inve/:country/:year", {
            templateUrl: "/inve/edit.html",
            controller: "InveEditCtrl"
        })

    .when("/res", {
            templateUrl: "/res/list.html",
            controller: "ResListCtrl"
        })
        .when("/res/:country/:year", {
            templateUrl: "/res/edit.html",
            controller: "ResEditCtrl"
        });

    console.log("App initialized and configured");
});