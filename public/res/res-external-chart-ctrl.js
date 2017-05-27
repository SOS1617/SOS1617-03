angular
    .module("GroupThreeApp")
    .controller("ResExternalChartCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
        $scope.gdp_per_capita_growth = [];
        $scope.gdp_per_capita = [];
        $scope.gdp_per_capita_ppp = [];
         $scope.reading = [];
         $scope.science = [];
         $scope.math = [];
         
         $http.get("https://sos1617-06.herokuapp.com/api/v1/gdp-per-capita?apikey=secret").then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 if($scope.data[i].country != "morocco"){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.gdp_per_capita.push(Number($scope.data[i]["gdp-per-capita"]));
                 $scope.gdp_per_capita_ppp.push(Number($scope.data[i]["gdp-per-capita-ppp"]));
                 $scope.gdp_per_capita_growth.push(Number($scope.data[i]["gdp-per-capita-growth"]));

}
                 console.log($scope.data[i].country);
             }
             


         });
         
                  $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 if(($scope.data[i].country == "Poland" && $scope.data[i].year == "2015" )|| ($scope.data[i].country == "Spain" && $scope.data[i].year == "2015")){
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));
}

                  console.log($scope.data[i].country);

             }
             


         });
         
         

                console.log("Controller intialized");
                $http
                    .get("https://sos1617-06.herokuapp.com/api/v1/gdp-per-capita?apikey=secret")
                    .then(function(response) {
                        console.log("hola" + response.data);


Highcharts.chart('reschartexternal', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Comparison between Pisa Results and GDP per capita'
    },
    xAxis: [{
        categories: $scope.categorias,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
          //  format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        title: {
            text: 'GDP per capita',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        opposite: true

    }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
            text: 'PISA results',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
         //   format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }

    }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
            text: 'GDP per capita, PPP',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
          //  format: '{value} mb',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'PISA results',
        type: 'spline',
        yAxis: 1,
        data: $scope.science,


    }, {
        name: 'GDP per capita',
        type: 'spline',
        yAxis: 2,
        data: $scope.gdp_per_capita,
        marker: {
            enabled: false
        },
        dashStyle: 'shortdot',


    }, {
        name: 'GDP per capita, PPP',
        type: 'spline',
        data: $scope.gdp_per_capita_ppp,

    }]
});
                    });
            }]);

