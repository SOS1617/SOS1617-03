angular
    .module("GroupThreeApp")
    .controller("InveProxyGraphCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Graph Controller initialized");

        
        $scope.apikey = "apisupersecreta";
        $scope.incidence = [];
        $scope.dataHS  = {};
        $scope.dataIE = {};
        var dataCacheHS = {};
        var dataCacheIE = {};
        $scope.categorias = [];
        $scope.categorias1 = [];
        $scope.population = [];
        $scope.riskpoverty = [];
        $scope.inveducation = [];


        
       function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }


            /////HIV-STATS/////

                
            $http.get("../api/v2/investmentseducation/proxy?apikey=" + $scope.apikey).then(function(response) {
                
                dataCacheHS = response.data;
                $scope.dataHS  = dataCacheHS ;
                
                for(var i=0; i<5; i++){
                 $scope.categorias.push($scope.dataHS[i].country + " " +  $scope.dataHS[i].year);
                 $scope.incidence.push(Number($scope.dataHS[i].incidence));
                }
                

            /////INVESTMENTS IN EDUCATION/////
            
            $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response) {

                
                dataCacheIE = response.data;
                $scope.data = dataCacheIE;
                
                for(var i=0; i<5; i++){
                     $scope.categorias1.push($scope.data[i].country + " " +  $scope.data[i].year);
                     $scope.population.push(Number($scope.data[i].population));
                     $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                     $scope.inveducation.push(Number($scope.data[i].inveducation));
                }


                    ////HIGHCHART////

                   Highcharts.chart('container',{
                title: {
                    text: 'HVI-Stats integrated with Investments Education'
                },
                chart: {
                    type: 'line'
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
                    y: 30,
                    x: 0
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            capitalizeFirstLetter(this.x) + ': ' + this.y;
                    }
                },
                series:[{
                    name: 'Population',
                    data: $scope.population
                },
                {
                    name: 'Incidence',
                    data: $scope.incidence
                }]
            });
                
            });
         
     });
               

}]);