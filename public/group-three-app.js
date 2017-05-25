angular.module("GroupThreeApp", ["ngRoute"]).config(function($routeProvider) {
    
    $routeProvider
    
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/integrations", {
            templateUrl: "integrations.html"
        })
        
        .when("/governance", {
            templateUrl: "governance.html"
        })

        .when("/esl", {
            templateUrl: "/esl/list.html",
            controller: "EslListCtrl"
        })
        .when("/esl/:country/:year", {
            templateUrl: "/esl/edit.html",
            controller: "EslEditCtrl"
        })
        .when("/esl/graph", {
            templateUrl: "/esl/graph.html",
            controller: "EslGraphCtrl"
        })
        .when("/esl/graphcors", {
            templateUrl: "/esl/graphcors.html",
            controller: "EslCorsGraphCtrl"
        })
        .when("/esl/graphproxy", {
            templateUrl: "/esl/graphproxy.html",
            controller: "EslProxyGraphCtrl"
        })
        

        .when("/inve", {
            templateUrl: "/inve/list.html",
            controller: "InveListCtrl"
        })
        .when("/inve/:country/:year", {
            templateUrl: "/inve/edit.html",
            controller: "InveEditCtrl"
        })
        
        .when("/inve/graph",{
            templateUrl: "/inve/graph.html",
            controller: "InveGraphCtrl"
        })
        
        .when("/inve/cors-graph",{
            templateUrl: "/inve/cors-graph.html",
            controller: "InveCorsGraphCtrl"
        })
        
        .when("/inve/proxy-graph",{
            templateUrl: "/inve/proxy-graph.html",
            controller: "InveProxyGraphCtrl"
        })
        
        .when("/inve/externals-graphs",{
            templateUrl: "/inve/externals-graphs.html",
            controller: "InveExternalsGraphsCtrl"
        })
        
     

    .when("/res", {
            templateUrl: "/res/list.html",
            controller: "ResListCtrl"
        })
        .when("/res/:country/:year", {
            templateUrl: "/res/edit.html",
            controller: "ResEditCtrl"
        })

        .when("/res/reschart",{
            templateUrl: "/res/chart.html",
            controller: "ResChartCtrl"
        })
        .when("/res/resproxychart",{
            templateUrl: "/res/proxychart.html",
            controller:"ResProxyChartCtrl"
        })
        .when("/res/resweatherchart",{
            templateUrl:"/res/resweatherchart.html",
            controller: "ResWeatherCtrl"
        })
        .when("/res/resexternalchart",{
            templateUrl:"/res/resexternalchart.html",
            controller: "ResExternalChartCtrl"
        });

    console.log("App initialized and configured");
});