angular
    .module("GroupThreeApp")
    .controller("ResExternalChartCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.reading = [];
         $scope.science = [];
         $scope.math = [];
         
         $http.get("../api/v2/results?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.reading.push(Number($scope.data[i].reading));
                 $scope.science.push(Number($scope.data[i].science));
                 $scope.math.push(Number($scope.data[i].math));


                 console.log($scope.data[i].country);
             }
             


         })

                console.log("Controller intialized");
                $http
                    .get("../api/v2/results?apikey=" + $scope.apikey)
                    .then(function(response) {
                        console.log("hola" + response.data);
                    Highcharts.chart('reschartexternal', {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'PISA results'
                                },
                                xAxis: {
                                  
                                    categories: $scope.categorias
                                
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Comparison between countries'
                                    },
                                    stackLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                        }
                                    }
                                },
                                legend: {
                                    align: 'right',
                                    x: -30,
                                    verticalAlign: 'top',
                                    y: 25,
                                    floating: true,
                                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                                    borderColor: '#CCC',
                                    borderWidth: 1,
                                    shadow: false
                                },
                                tooltip: {
                                    headerFormat: '<b>{point.x}</b><br/>',
                                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                                },
                                plotOptions: {
                                    column: {
                                        stacking: 'normal',
                                        dataLabels: {
                                            enabled: true,
                                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                        }
                                    }
                                },
                                series: [{
                                    name: 'Reading',
                                    data: $scope.reading
                                }, {
                                    name: 'Science',
                                    data: $scope.science
                                }, {
                                    name: 'Math',
                                    data: $scope.math
                                }]
                            });
                    });
            }]);
