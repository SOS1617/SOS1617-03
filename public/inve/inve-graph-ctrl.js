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
         $scope.d3data = [];
         var auxd3 = [];
         var datosinversiones = [];
         var datospaises = [];
         var auxauxd3 = [];
         
        
         
         
         
         $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;

             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.population.push(Number($scope.data[i].population));
                 $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                 $scope.inveducation.push(Number($scope.data[i].inveducation));

                 console.log($scope.data[i].country);
             }
             
             ////aux for /////
             for(var i=0; i<response.data.length; i++){
                 $scope.d3inveducation.push($scope.data[i].inveducation);
                 $scope.d3data.push($scope.data[i].country + " " +  $scope.data[i].year);
                 datosinversiones = $scope.d3inveducation;
                 datospaises = $scope.d3data;
                 auxd3 = (datospaises,datosinversiones);
                 auxauxd3 = $scope.data[i];
             }
             


         });
         
          //////////// HIGHCHARTS ////////////////////
         
                console.log("Controller intialized");
                $http
                    .get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response) {
                     
                       $(document).ready(function () {

                            // Build the chart
                            Highcharts.chart('container', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Spain in 2014'
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: false
                                        },
                                        showInLegend: true
                                    }
                                },
                                series: [{
                                    name: $scope.data[0].country + " " +  $scope.data[0].year,
                                    colorByPoint: true,
                                    data: [{
                                        name: 'Population (mm)',
                                        y: Number($scope.data[0].population)
                                    }, {
                                        name: 'Inv education (mm)',
                                        y: Number($scope.data[0].inveducation),
                                        sliced: true,
                                        selected: true
                                    }, {
                                        name: 'Risk poverty (%)',
                                        y: Number($scope.data[0].riskpoverty)
                                    }]
                                }]
                            });
                            /*
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
                                name: 'Population(mm)',
                                data: $scope.population 
                        
                            }, {
                                name: 'Risk of poverty(%)',
                                data: $scope.riskpoverty 
                        
                            }, {
                                name: 'Investment in eduaction(mm)',
                                data: $scope.inveducation
                        
                            }]
                            */
                            
                            
                        })
                   
                   
                        
            /////// GEOCHART //////////
                       
             google.charts.load('current', {
                            'packages': ['controls','geochart']
                        });
             google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                
                 var myData = [['Country','Risk of poverty', 'Year']];
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
                    region: '150',
                    colorAxis: {colors: ['green', 'orange' , 'red']}
                }
              });
                 dashboard.bind(yearSelector, chart);
                 dashboard.draw(data, options);
            }
            
            
            ////////////////////D3///////////////////////7
            
            
            ////////1ª Forma ////////////////////////
            
            var d3inveducation = datosinversiones;
            var paises = datospaises;
            var datosD3 = auxd3;
            
            
            
            var r = 300;
            
            var canvas = d3.select("body").append("svg")
                            .attr("width", 1500)
                            .attr("height", 1500);
            
            var color = d3.scale.category10();
            
            
            var group = canvas.append("g")
                              .attr("transform", "translate(300,300)");
            
            var arc = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(r);
                        
            var pie = d3.layout.pie()
                        .value(function(d){ return d;});
            var arcs = group.selectAll(".arc")
                            .data(pie(d3inveducation))  //datosinversiones
                            .enter()
                            .append("g")
                            .attr("class", "arc")
                            
            arcs.append("path")
                .attr("d", arc)
                .attr("fill", function(d){ return color(d.data); });
                
            arcs.append("text")
                .attr("transform", function(d){ return "translate(" + arc.centroid(d) + ")";})
                .text(function (d){ return d.data;});
            
            ////////////2ª Forma/////////////////////
             
                      /*          
                    var pie = d3.layout.pie()
                      .value(function(d) { return d; })
                    
                    //connect our data to the slices
                    var slices = pie(d3inveducation);
                    
                    //size of the pie chart
                    var arc = d3.svg.arc()
                      .innerRadius(0)
                      .outerRadius(100);
                    
                    // another helper that returns a color based on an ID, category10
                    var color = d3.scale.category10();
                    
                    
                    var svg = d3.select('svg.pie');
                    var g = svg.append('g')
                      .attr('transform', 'translate(200, 100)')
                    
                    g.selectAll('path.slice')
                      .data(slices)
                        .enter()
                          .append('path')
                            .attr('class', 'slice')
                            .attr('d', arc)
                            .attr('fill', function(d) {
                              return color(d.data.product);
                            });
                    
                    // building a legend
                    svg.append('g')
                      .attr('class', 'legend')
                        .selectAll('text')
                        .data(paises)
                          .enter()
                            .append('text')
                              .text(function(d) { return '• ' + d.data; })
                              .attr('fill', function(d) { return color(d.data); })
                              .attr('y', function(d, i) { return 20 * (i + 1); })
            */
            ///////////3ª Forma ///////////////////////
            /*
            var datos = auxauxd3;
            
            // margin
            var margin = {top: 20, right: 20, bottom: 20, left: 20},
                width = 500 - margin.right - margin.left,
                height = 500 - margin.top - margin.bottom,
                radius = width/2;
            
            // color range
            var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
            
            // pie chart arc. Need to create arcs before generating pie
            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);
            
            // donut chart arc
            var arc2 = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 70);
            
            // arc for the labels position
            var labelArc = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);
            
            // generate pie chart and donut chart
            var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d.count; });
            
            // define the svg for pie chart
            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            // define the svg donut chart
            var svg2 = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            // import data 
            d3.json(datos, function(error, data) {
             // if (error) throw error;
                
                // parse data
                data.forEach(function(d) {
                    d.inveducation = +d.inveducation;
                    d.country = d.country;
                })
            
              // "g element is a container used to group other SVG elements"
              var g = svg.selectAll(".arc")
                  .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc");
            
              // append path 
              g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.country); })
                // transition 
                .transition()
                  .ease(d3.easeLinear)
                  .duration(2000)
                  .attrTween("d", tweenPie);
                    
              // append text
              g.append("text")
                .transition()
                  .ease(d3.easeLinear)
                  .duration(2000)
                .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .text(function(d) { return d.data.country; });
                
            
                // "g element is a container used to group other SVG elements"
              var g2 = svg2.selectAll(".arc2")
                  .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc2");
            
               // append path 
              g2.append("path")
                  .attr("d", arc2)
                  .style("fill", function(d) { return color(d.data.country); })
                .transition()
                  .ease(d3.easeLinear)
                  .duration(2000)
                  .attrTween("d", tweenDonut);
                    
               // append text
              g2.append("text")
                .transition()
                  .ease(d3.easeLinear)
                  .duration(2000)
                .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .text(function(d) { return d.data.country; });
                
            });
            */
           
                                  
            });        
                        
        
  ///////////////////////////////////////////////////         
                        
                     
        
             
             
             
             
             
         }]);
         
         
         
         