angular
    .module("GroupThreeApp")
    .controller("EslCorsGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.eslmale = [];
        $scope.eslfemale = [];
        $scope.esltotal = [];
        $scope.eslobjective = [];
        
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
                
                console.log($scope.data[i].country);
            }
        });    
            
        console.log("Controller initialized");
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            
            Highcharts.chart('container',{
                title: {
                    text: 'Highcharts'
                },
                chart: {
                    type: 'bar'
                },
                xAxis: {
                    categories: $scope.categorias
                },
                legend: {
                    layout: 'vertical',
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    //align: 'left',
                    verticalAlign: 'top',
                    align: 'right',
                    y: 60,
                    x: -60
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            capitalizeFirstLetter(this.x) + ': ' + this.y;
                    }
                },
                series:[{
                    name: 'ESL Male',
                    data: $scope.eslmale
                }, {
                    name: 'ESL Female',
                    data: $scope.eslfemale
                }, {
                    name: 'ESL Total',
                    data: $scope.esltotal
                }, {
                    name: 'ESL Objective',
                    data: $scope.eslobjective
                }]
            });
            
        });
    }]);