angular
    .module("GroupThreeApp")
    .controller("InveGraphCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Graph Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.population = [];
         $scope.riskpoverty = [];
         $scope.inveducation = [];
         $scope.d3inveducation = [];
         $scope.countries = [];
         
         
        
         
         
         
         $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             $scope.d3data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.population.push(Number($scope.data[i].population));
                 $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                 $scope.inveducation.push(Number($scope.data[i].inveducation));
                 $scope.d3inveducation.push(Number($scope.data[i].inveducation));

                 console.log($scope.data[i].country);
             }
             


         });
         
          //////////// HIGHCHARTS ////////////////////
         
                console.log("Controller intialized");
                $http
                    .get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response) {
                     
                        Highcharts.chart('container1', {
                            
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Highcharts'
                            },
                            xAxis: {
                                categories: $scope.categorias
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Comparisons of figures'
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: 'Population',
                                data: $scope.population 
                        
                            }, {
                                name: 'Risk of poverty',
                                data: $scope.riskpoverty 
                        
                            }, {
                                name: 'Investment in eduaction',
                                data: $scope.inveducation
                        
                            }]
                        })
                   
                   
                        
            /////// GEOCHART //////////
                       
             google.charts.load('current', {
                            'packages': ['controls','geochart']
                        });
             google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                
                 var myData = [['Country','Mark', 'Year']];
                 response.data.forEach(function (x){
                    myData.push([x.country, Number(x.riskpoverty), Number(x.year)]);
                     });
                 
                 var data = google.visualization.arrayToDataTable(myData);
                 var options = {
                    colorAxis: {colors: ['green', 'orange' , 'red']}
                 };
                   var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));
            
                   var yearSelector = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'filter',
                options: {
                        filterColumnIndex: 2,
                  ui: {
                    allowTyping: false,
                    allowMultiple: false,
                    allowNone: false
                  }
                }
              });
                 var chart = new google.visualization.ChartWrapper({
                chartType: 'GeoChart',
                containerId: 'map',
                options: {
                    displayMode: 'regions',
                    colorAxis: {colors: ['green', 'orange' , 'red']}
                }
              });
                 dashboard.bind(yearSelector, chart);
                 dashboard.draw(data, options);
            }
                        
            });        
                        
        
  ///////////////////////////////////////////////////         
                        
                     
        
             
             
             
             
             
         }]);
         
         
         
         