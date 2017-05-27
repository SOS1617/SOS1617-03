/*global angular*/
/*global echarts*/
angular
    .module("GroupThreeApp")
    .controller("EslCountriesGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.countries = [];
        $scope.years = [];
        $scope.eslmale = [];
        $scope.eslfemale = [];
        $scope.esltotal = [];
        $scope.eslobjective = [];
        
        $scope.gini = [];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.countries.push(capitalizeFirstLetter($scope.data[i].country));
                $scope.years.push($scope.data[i].year);
                $scope.eslmale.push(Number($scope.data[i].eslmale));
                $scope.eslfemale.push(Number($scope.data[i].eslfemale));
                $scope.esltotal.push(Number($scope.data[i].esltotal));
                $scope.eslobjective.push(Number($scope.data[i].eslobjective));
                $scope.gini.push(null);
                
                console.log($scope.data[i].country);
            }
        });
        
        $http.get("https://restcountries.eu/rest/v2/all").then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                
                if(capitalizeFirstLetter($scope.data[i].name) == "Spain"){
                    $scope.gini.splice(0,1,Number($scope.data[i].gini));
                    $scope.gini.splice(1,1,Number($scope.data[i].gini));
                    console.log($scope.data[i].gini);
                } else if(capitalizeFirstLetter($scope.data[i].name) == "France"){
                    $scope.gini.splice(2,1,Number($scope.data[i].gini));
                    $scope.gini.splice(3,1,Number($scope.data[i].gini));
                    console.log($scope.data[i].gini);
                } else if(capitalizeFirstLetter($scope.data[i].name) == "Italy"){
                    $scope.gini.splice(4,1,Number($scope.data[i].gini));
                    $scope.gini.splice(5,1,Number($scope.data[i].gini));
                    console.log($scope.data[i].gini);
                }
            }
        });
        
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            //Echarts
            var myChart = echarts.init(document.getElementById('echarts'));

                // specify chart configuration item and data
            var option2 = {
                backgroundColor: '#0f375f',
                title: {
                    text: 'ECharts',
                    textStyle:{
                        color: '#ccc'
                    }
                },
                tooltip: {},
                legend: {
                    data:['ESL Total','ESL Objective','GINI'],
                    textStyle: {
                        color: '#ccc'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: $scope.categorias,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                yAxis: {
                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                series: [{
                    name: 'ESL Total',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 15,
                    data: $scope.esltotal
                }, {
                    name: 'ESL Objective',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}])
                        }
                    },
                    data: $scope.eslobjective
                }, {
                    name: 'ESL Total',
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                                {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                {offset: 1, color: 'rgba(20,200,212,0)'}])
                        }
                    },
                    z: -12,
                    data: $scope.esltotal
                }, {
                    name: 'ESL Total',
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: '#0f375f'
                        }
                    },
                    symbolRepeat: true,
                    symbolSize: [12, 4],
                        symbolMargin: 1,
                    z: -10,
                    data: $scope.esltotal
                },{
                    name: 'GINI',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 15,
                    data: $scope.gini
                }]
            };

            // use configuration item and data specified to show chart
            myChart.setOption(option2);


        });   
    }]);