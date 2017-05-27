angular
    .module("GroupThreeApp")
    .controller("AnalyticsCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Chart Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.categorias2 = [];
         $scope.categorias3 = [];
         $scope.reading = [];
         $scope.science = [];
         $scope.math = [];
         $scope.eslmale = [];
         $scope.eslfemale = [];
         $scope.esltotal = [];
         $scope.eslobjective = [];
         $scope.population = [];
         $scope.riskpoverty = [];
         $scope.inveducation = [];
         
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
             


         });

                console.log("Controller intialized");
                $http
                    .get("../api/v2/results?apikey=" + $scope.apikey)
                    .then(function(response) {
                        console.log("hola" + response.data);
                        
                        
                $http
                    .get("../api/v2/investmentseducation?apikey=" + $scope.apikey)
                    .then(function(response){
                        
                             dataCache = response.data;
             $scope.data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.categorias2.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.population.push(Number($scope.data[i].population));
                 $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                 $scope.inveducation.push(Number($scope.data[i].inveducation));


                 console.log($scope.data[i].country);
             }        
                        
                        
                        
                        
                  
                $http
                    .get("../api/v2/earlyleavers?apikey=" + $scope.apikey)
                    .then(function(response){
                                     dataCache = response.data;
             $scope.data = dataCache;

             for(var i=0; i<response.data.length; i++){
                 $scope.categorias3.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.eslmale.push(Number($scope.data[i].eslmale));
                 $scope.eslfemale.push(Number($scope.data[i].eslfemale));
                 $scope.esltotal.push(Number($scope.data[i].esltotal));
                 $scope.eslobjective.push(Number($scope.data[i].eslobjective));


             }
             $scope.categoriasTotal = $scope.categorias.concat($scope.categorias2);
             $scope.categoriasTotal = $scope.categoriasTotal.concat($scope.categorias3);
                        console.log($scope.categorias);
                        console.log($scope.categorias2);
                        console.log($scope.categorias3);
                        console.log($scope.categoriasTotal);
                    Highcharts.chart('analyticschart', {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'PISA results + Early leavers + investment education'
                                },
                                xAxis: {

                                    categories: $scope.categoriasTotal
                                
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
                                }, {
                                    name : 'Population',
                                    data: $scope.population
                                },{
                                    name : 'Risk Poverty',
                                    data: $scope.riskpoverty
                                }, {
                                    name : 'Invest Education',
                                    data: $scope.inveducation
                                }, {
                                    name : 'ESL Male',
                                    data: $scope.eslmale
                                }, {
                                    name : 'ESL Female',
                                    data: $scope.eslfemale
                                }, {
                                    name : 'ESL Total',
                                    data: $scope.esltotal
                                }, {
                                    name : 'ESL Objective',
                                    data: $scope.eslobjective
                                
                                }]
                            });
                        
                    });
                    });
                    });
            }]);

