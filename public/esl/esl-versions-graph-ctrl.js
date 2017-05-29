/* global Highcharts */
/* global angular */
angular
    .module("GroupThreeApp")
    .controller("EslVersionsGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.eslmale = [];
        $scope.eslfemale = [];
        $scope.esltotal = [];
        $scope.eslobjective = [];
        
        $scope.incomemillion = [];
        $scope.incomeratio = [];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.eslmale.push(Number($scope.data[i].eslmale));
                $scope.eslfemale.push(Number($scope.data[i].eslfemale));
                $scope.esltotal.push(Number($scope.data[i].esltotal));
                $scope.eslobjective.push(Number($scope.data[i].eslobjective));
                $scope.incomemillion.push(null);
                $scope.incomeratio.push(null);
                
                console.log($scope.data[i].country);
            }
        });
        
        $http.get("https://sos1617-01.herokuapp.com/api/v2/gvg?apikey=sos161701").then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                
                if($scope.categorias.indexOf(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year)==-1){
                    $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                    $scope.eslmale.push(null);
                    $scope.eslfemale.push(null);
                    $scope.esltotal.push(null);
                    $scope.eslobjective.push(null);
                    $scope.incomemillion.push(Number($scope.data[i].income_million));
                    $scope.incomeratio.push(Number($scope.data[i].income_ratio));
                
                    console.log($scope.data[i].country);
                    
                }else{
                    var index = $scope.categorias.indexOf(capitalizeFirstLetter(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year));
                    $scope.educationgdpperc.splice(index,1,Number($scope.data[i].income_million));
                    $scope.educationprimarypercapita.splice(index,1,Number($scope.data[i].income_ratio));
                }
            }
        });
            
        console.log("Controller initialized");
        $http.get("https://sos1617-01.herokuapp.com/api/v2/gvg?apikey=sos161701").then(function(response){
            
            
            Highcharts.chart('container', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Highcharts'
                },
                subtitle: {
                    text: 'Source: G01 - GVG'
                },
                xAxis: {
                    categories: $scope.categorias
                },
                yAxis: {
                    title: {
                        text: 'Ratio in %'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        },
                        dataLabels: {
                            enabled: true
                        }
                    },
                    series: {
                        connectNulls: true
                    }
                },
                series:[{
                    name: 'ESL Male',
                    /*marker: {
                        symbol: 'square'
                    },*/
                    data: $scope.eslmale
                }, {
                    name: 'ESL Female',
                   /*marker: {
                        symbol: 'square'
                    },*/
                    data: $scope.eslfemale
                }, {
                    name: 'ESL Total',
                    /*marker: {
                        symbol: 'square'
                    },*/
                    data: $scope.esltotal
                }, {
                    name: 'ESL Objective',
                    /*marker: {
                        symbol: 'square'
                    },*/
                    data: $scope.eslobjective
                },{
                    name: 'Income Ratio',
                    data: $scope.incomeratio
                }/*,{
                    name: 'Income Million',
                    data: $scope.incomemillion
                }*/]
                
            });
            
        });
    }]);