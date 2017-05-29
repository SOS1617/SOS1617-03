/* global Highcharts */
/* global angular */
/* global google */
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
        
        $scope.versiones = [];
        
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
        
        $http.get("https://latest-browsers-api.now.sh/").then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            $scope.versiones.push(Number($scope.data.versions.safari));
            $scope.versiones.push(Number($scope.data.versions.opera));
            $scope.versiones.push(Number($scope.data.versions.firefox));
            $scope.versiones.push(Number($scope.data.versions.ie_mob));
            $scope.versiones.push(Number($scope.data.versions.edge));
            $scope.versiones.push(Number($scope.data.versions.chrome));
            
            console.log($scope.versiones);
        });
            
        console.log("Controller initialized");
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            google.charts.load('current', {packages: ['corechart', 'line']});
            google.charts.setOnLoadCallback(drawCurveTypes);

            function drawCurveTypes() {
                var myData = [['Categories','ESL Total', 'Version']];
                /*response.data.forEach(function (d){
                    myData.push([capitalizeFirstLetter(d.country), Number(d.esltotal), Number(d.versiones)]);
                });*/
                
                for(var i=0; i<6; i++){
                    
                    myData.push([$scope.categorias[i], $scope.esltotal[i], $scope.versiones[i]]);
                }
                    
                var data = google.visualization.arrayToDataTable(myData);

                var options = {
                    hAxis: {
                        title: 'Valores'
                    },
                    vAxis: {
                        title: 'Paises'
                    },
                    series: {
                        1: {curveType: 'function'}
                    }
                };

                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                chart.draw(data, options);
                }
            
        });
    }]);