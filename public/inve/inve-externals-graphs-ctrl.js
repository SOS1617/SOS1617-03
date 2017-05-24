angular
    .module("GroupThreeApp")
    .controller("InveExternalsGraphsCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Graph Controller initialized");

        
        $scope.apikey = "apisupersecreta";
        $scope.latitude = [];  ///// []
        $scope.dataAPI1 = [];  ///// []
        $scope.dataAPI2 = [];
        $scope.res = [];
        $scope.number = [];
        $scope.dataIE = {};
        var dataCacheAPI1 = {};
        var dataCacheAPI2 = {};
        var dataCacheIE = {};
        var res = {};
        $scope.categorias = [];
        $scope.categorias1 = [];
        $scope.countries = [];
        $scope.population = [];
        $scope.riskpoverty = [];
        $scope.inveducation = [];


        
       function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            
            

            /////API1/////
            
  ///https://numbersapi.p.mashape.com/6/21/date?fragment=true&json=true&mashape-key=oz6U9F2JarmshGsOl9ZxXvOG8CEsp1DFgAmjsnmEE7ChuL3GIB
                
     $http.get("https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=New+York&mashape-key=oz6U9F2JarmshGsOl9ZxXvOG8CEsp1DFgAmjsnmEE7ChuL3GIB")
                .then(function(response){
                
                dataCacheAPI1 = response.data["Results"]; /////response.data
                $scope.dataAPI1 = dataCacheAPI1;
                
                for(var i=0; i<5; i++){
                /// $scope.categorias.push($scope.dataAPI1[i].year);
                //$scope.latitude.push(Number($scope.dataAPI1[0].number));
               // $scope.latitude.push(response.data.number);
                $scope.latitude.push(Math.abs(Number($scope.dataAPI1[i]["lat"])));

                }
                

            /////INVESTMENTS IN EDUCATION/////
            
            $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response) {

                
                dataCacheIE = response.data;
                $scope.data = dataCacheIE;
                
                for(var i=0; i<5; i++){
                     $scope.categorias1.push($scope.data[i].country + " " +  $scope.data[0].year);
                     $scope.countries.push($scope.data[i].country);
                     $scope.population.push(Number($scope.data[i].population));
                     $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                     $scope.inveducation.push(Number($scope.data[i].inveducation));
                }

            /////////API2//////////////////////
                
            $http.get("https://numbersapi.p.mashape.com/6/21/date?fragment=true&json=true&mashape-key=oz6U9F2JarmshGsOl9ZxXvOG8CEsp1DFgAmjsnmEE7ChuL3GIB")
                .then(function(response){
                    $scope.number.push(Number(response.data.number));
                    
               


                    ////HIGHCHARTs////
                    /*
                    Highcharts.chart('container',{
                        title: {
                            text: 'INVESTMENTS IN EDUCATION integrated with external API1'
                        },
                        chart: {
                            type: 'area'
                        },
                        xAxis: {
                            categories: $scope.categorias1
                        },
                        legend: {
                            layout: 'vertical',
                            floating: true,
                            backgroundColor: '#FFFFFF',
                            //align: 'left',
                            verticalAlign: 'top',
                            align: 'right',
                            y: 20,
                            x: 0
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                   this.x + ': ' + this.y;
                            }
                        },
                        series:[{
                            name: 'Population',
                            data: $scope.population,
                        },
                        {
                            name: 'Risk poverty',
                            data: $scope.riskpoverty,
                        },
                        {
                            name: 'Investments in eduaction',
                            data: $scope.inveducation,
                        },
                        {
                            name: 'Latitude',
                            data: $scope.latitude,
                        }]
                    });*/
                
                /*
                Highcharts.chart('container2', {
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
                                        y: Number($scope.population[0])
                                    }, {
                                        name: 'Inv education (mm)',
                                        y: Number($scope.inveducation[0]),
                                        sliced: true,
                                        selected: true
                                    }, {
                                        name: 'Number',
                                        y: Number($scope.number)
                                    }]
                                }]
                            });
                            */
                            
                            //////dygraphs //////////////

                          var fila1 = [2012,Number($scope.inveducation[0]),Number($scope.latitude[0])];
                          var fila2 = [2013,Number($scope.inveducation[1]),Number($scope.latitude[1])];
                          var fila3 = [2014,Number($scope.inveducation[2]),Number($scope.latitude[2])];
                             var g = new Dygraph(

                                // containing div
                                document.getElementById("graph"),
                                [
                            fila1,
                            fila2,
                            fila3
                              ],
                              {
                                labels: [ "country", "inveducation" , "latitude"]
                              });    
                              
                              
                /////////////CHART JS //////////////////////////////              
                
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                    labels: ['Spain 2014', 'France 2014'],
                    datasets: [{
                      label: 'numbers',
                      data: [Number($scope.number), Number($scope.number)],
                      backgroundColor: "rgba(153,255,51,0.6)"
                    }, {
                      label: 'inveducation',
                      data: [Number($scope.inveducation[0]),Number($scope.inveducation[1])],
                      backgroundColor: "rgba(255,153,0,0.6)"
                    }]
                  }
                });               
            
                //////////////////////////////////////////////////
                
                });   
            });
         
     });
               

}]);