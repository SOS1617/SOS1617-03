angular
    .module("GroupThreeApp")
    .controller("ResChartCtrl",["$scope","$http",function ($scope, $http){
        
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
                    Highcharts.chart('reschart', {
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
                        
                        
                        
                        
                        
                        
       google.charts.load('current', {
                            'packages': ['controls','geochart']
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
     function drawRegionsMap() {
     var myData = [['Country','Mark', 'Year']];
     
     response.data.forEach(function (d){
              myData.push([d.country, Number(d.reading)+ Number(d.science) + Number(d.math), Number(d.year)]);
                     });
                    
     var data = google.visualization.arrayToDataTable(myData);
     var options = {
                 

        colorAxis: {colors: ['red', 'yellow' , 'green']}
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
    

        colorAxis: {colors: ['red', 'yellow' , 'green']}
    }
  });
     dashboard.bind(yearSelector, chart);
     dashboard.draw(data, options);
                        }
                        
                        
                        
                        
                        
                        
                        
                        
     //dygraphs
                   
                        
 $(document).ready(function () {
     
     var saco2009Science = [2009];
     var saco2012Science = [2012];
     var saco2015Science = [2015];
     var saco2009Reading = [2009];
     var saco2012Reading = [2012];
     var saco2015Reading = [2015];
     var saco2009Math = [2009];
     var saco2012Math = [2012];
     var saco2015Math = [2015];
     var sacoScience =[];
     var sacoReading = [];
     var sacoMath = [];
      var blockRedraw = false;
      
      
      
          
      
          response.data.forEach(function (d){
                          if(Number(d.year) == 2009 && (d.country == "Spain")){
              
              saco2009Science.push(Number(d.science));
              saco2009Reading.push(Number(d.reading));
              saco2009Math.push(Number(d.math));
              
            }
            if(Number(d.year) == 2012 && (d.country == "Spain")){
              
              saco2012Science.push(Number(d.science));
              saco2012Reading.push(Number(d.reading));
              saco2012Math.push(Number(d.math));
              
            }
            
            if(Number(d.year) == 2015  && (d.country == "Spain")){
                saco2015Science.push(Number(d.science));
                saco2015Reading.push(Number(d.reading));
                saco2015Math.push(Number(d.math));
            }
            
            

          
          });
          
          response.data.forEach(function(d){
                                       if(Number(d.year) == 2009  && (d.country == "Finland")){
                saco2009Science.push(Number(d.science));
                 saco2009Reading.push(Number(d.reading));
              saco2009Math.push(Number(d.math));
            }
                         if(Number(d.year) == 2012  && (d.country == "Finland")){
                saco2012Science.push(Number(d.science));
                 saco2012Reading.push(Number(d.reading));
              saco2012Math.push(Number(d.math));
            }
            if(Number(d.year) == 2015  && (d.country == "Finland")){
                saco2015Science.push(Number(d.science));
                saco2015Reading.push(Number(d.reading));
                saco2015Math.push(Number(d.math));
            } 
          });
          
          sacoScience.push(saco2009Science,saco2012Science, saco2015Science);
          sacoReading.push(saco2009Reading,saco2012Reading, saco2015Reading);
          sacoMath.push(saco2009Math,saco2012Math,saco2015Math);

              
       console.log(sacoScience);
       console.log(sacoReading);
       console.log(sacoMath);
      
var g1 = new Dygraph(document.getElementById("dygraphsScience"),sacoScience,
{
    labels: ["Date","Spain","Finland"],
    title: "Comparative chart of Spain/Finland in Science",
    labelsDiv: "scienceLegend",
    fillGraph: true
              });
    
var g2 = new Dygraph(document.getElementById("dygraphsReading"),sacoReading,
{
    labels: ["Date","Spain","Finland"],
    title: "Comparative chart of Spain/Finland in Reading",
    labelsDiv: "readingLegend",
    fillGraph: true

              });
              
var g3 = new Dygraph(document.getElementById("dygraphsMath"),sacoMath,
{
    labels: ["Date","Spain","Finland"],
    title: "Comparative chart of Spain/Finland in Math",
    labelsDiv: "mathLegend",
    fillGraph: true

              });
    
     
      var sync = Dygraph.synchronize(g1,g2,g3);
      
      function update() {
        var zoom = document.getElementById('chk-zoom').checked;
        var selection = document.getElementById('chk-selection').checked;
        sync.detach();
        sync = Dygraph.synchronize(g1,g2,g3, {
          zoom: zoom,
          selection: selection
        });
      }
      $('#chk-zoom, #chk-selection').change(update);
    }
);
                        
                        
                        
                    });
            }]);




    
    






















