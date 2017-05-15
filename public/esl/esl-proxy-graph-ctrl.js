angular
    .module("GroupThreeApp")
    .controller("EslProxyGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.eslmale = [];
        $scope.eslfemale = [];
        $scope.esltotal = [];
        $scope.eslobjective = [];
        
        $scope.educationgdpperc = [];
        $scope.educationprimarypercapita = [];
        $scope.educationsecondarypercapita = [];
        $scope.educationtertiarypercapita = [];
        
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
                $scope.educationgdpperc.push(null);
                $scope.educationprimarypercapita.push(null);
                $scope.educationsecondarypercapita.push(null);
                $scope.educationtertiarypercapita.push(null);
                
                console.log($scope.data[i].country);
            }
        });
        
        $http.get("/proxyRaul").then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<7; i++){
                if($scope.categorias.indexOf(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year)==-1){
                    $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                    $scope.eslmale.push(null);
                    $scope.eslfemale.push(null);
                    $scope.esltotal.push(null);
                    $scope.eslobjective.push(null);
                    $scope.educationgdpperc.push(Number($scope.data[i]["education-gdp-perc"]));
                    $scope.educationprimarypercapita.push(Number($scope.data[i]["education-primary-per-capita"]));
                    $scope.educationsecondarypercapita.push(Number($scope.data[i]["education-secondary-per-capita"]));
                    $scope.educationtertiarypercapita.push(Number($scope.data[i]["education-tertiary-per-capita"]));
                
                console.log($scope.data[i].country); 
                }else{
                    var index = $scope.categorias.indexOf(capitalizeFirstLetter(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year));
                    $scope.educationgdpperc.splice(index,1,Number($scope.data[index]["education-gdp-perc"]));
                    $scope.educationprimarypercapita.splice(index,1,Number($scope.data[index]["education-primary-per-capita"]));
                    $scope.educationsecondarypercapita.splice(index,1,Number($scope.data[index]["education-secondary-per-capita"]));
                    $scope.educationtertiarypercapita.splice(index,1,Number($scope.data[index]["education-tertiary-per-capita"]));
                }
                
            }
        });
            
        console.log("Controller initialized");
        $http.get("/proxyRaul").then(function(response){
            
            
            Highcharts.chart('container', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Highcharts'
                },
                subtitle: {
                    text: 'Source: Group 6'
                },
                xAxis: {
                    categories: $scope.categorias
                },
                yAxis: {
                    title: {
                        text: 'Ratio in %'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    },
                    series: {
                        connectNulls: true,
                        fillOpacity: 0.20
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
                },{
                    name: 'Education GDP',
                    data: $scope.educationgdpperc
                },{
                    name: 'Education Primary Per Capita',
                    data: $scope.educationprimarypercapita
                }
                ,{
                    name: 'Education Secondary Per Capita',
                    data: $scope.educationsecondarypercapita
                }
                /*,{
                    name: 'Education Tertiary Per Capita',
                    data: $scope.educationtertiarypercapita
                }*/]
            });
            
        });
    }]);