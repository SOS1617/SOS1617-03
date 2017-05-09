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
         var pais1 = [];
         var pais2 = [];
         var inve1 = [];
         var inve2 = [];
         
        
         
         
         
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
             
             //aux////
             for(var i=0; i<response.data.length; i++){
                pais1 = $scope.data[0].country;
                pais2 = $scope.data[1].country;
                pais3 = $scope.data[2].country;
                pais4 = $scope.data[3].country;
                inve1 = Number($scope.data[0].inveducation);
                inve2 = Number($scope.data[1].inveducation);
                inve3 = Number($scope.data[2].inveducation);
                inve4 = Number($scope.data[3].inveducation); 
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
            
            /*
            var d3inveducation = datosinversiones;
            var paises = datospaises;
            var datosD3 = auxd3;
    
            var r = 300;
            
            var canvas = d3.select("body").append("svg")  //body
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
                
            */
           
            ////////////2ª Forma/////////////////////
           
           $(document).ready(function () {
 
           
            var canvasWidth = 300, //width
                      canvasHeight = 300,   //height
                      outerRadius = 100,   //radius
                      color = d3.scale.category20(); //construccion rango de colores
                            
                              var dataSet = [
                          {"country": pais1, "inveducation":inve1}, 
                          {"country": pais2, "inveducation":inve2}, 
                          {"country": pais3, "inveducation":inve3}, 
                          {"country": pais4, "inveducation":inve4}];
                          
              var body = document.getElementById("d3pie");      
                                                    
              var vis = d3.select(body)  ///"body"
                  .append("svg:svg") //creamos un SVG element dentro de el <body>
                    .data([dataSet]) //asociamos los datos con el elemento
                    .attr("width", canvasWidth) //lo modificamos con las medidas definidas
                    .attr("height", canvasHeight) 
                    .append("svg:g") //creamos un grupo donde guardar la circunferencia
                      .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") //Colocacion del centr
            
                // Creamos un <path> para usar nuestros datos en un arco
                var arc = d3.svg.arc()
                  .outerRadius(outerRadius);
            
                var pie = d3.layout.pie() //Esto creará un arco de datos para nosotros dado una lista de valores
                  .value(function(d) { return d.inveducation; }) // Valor por el que se va a construit
                  .sort( function(d) { return null; } );
            
                // Selecciona todos los elementos <g> 
                var arcs = vis.selectAll("g.slice")
                  // Asocia una circunferencia de datos 
                  .data(pie)
                  // crea un <g> para cada objeto en la matriz de datos
                  .enter()
                  // Con cada trozo se asocia un objeto)
                  .append("svg:g")
                  .attr("class", "slice");  
            
                arcs.append("svg:path")
                  //Un color diferente para cada trozo
                  .attr("fill", function(d, i) { return color(i); } )
                  //Crea la circunferencia con cada dato encima de cada trozo correspondiente
                  .attr("d", arc);
            
                // Añadimos un legendLabel para cada trozo...
                arcs.append("svg:text")
                  .attr("transform", function(d) { //Colocamos estos labels fuera de los trozos
                    d.outerRadius = outerRadius + 50; // Modificacion coordenadas
                    d.innerRadius = outerRadius + 45; // 
                    return "translate(" + arc.centroid(d) + ")";
                  })
                  .attr("text-anchor", "middle") 
                  .style("fill", "Purple")
                  .style("font", "bold 12px Arial")
                  .text(function(d, i) { return dataSet[i].country; }); //A cada label le colocamos el nombre del pais correspondiente
            
                // Se agrega un valor de investments a los arcos más grandes, se traduce al centro del arco y se gira.
                arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
                  .attr("dy", ".35em")
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    d.outerRadius = outerRadius; // Set Outer Coordinate
                    d.innerRadius = outerRadius/2; // Set Inner Coordinate
                    return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
                  })
                  .style("fill", "White")
                  .style("font", "bold 12px Arial")
                  .text(function(d) { return d.data.inveducation; });
            
                // Calcula el ángulo de un arco, convirtiendo de radianes en grados.
                function angle(d) {
                  var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                  return a > 90 ? a - 180 : a;
                }     
                
                
                    /*
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
           
           });
                                  
            });        
                        
        
  ///////////////////////////////////////////////////         
                        
                     
        
             
             
             
             
             
         }]);
         
         
         
         