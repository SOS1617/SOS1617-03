angular
    .module("GroupThreeApp")
    .controller("InveCorsGraphCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Graph Controller initialized");

        
        $scope.apikey = "apisupersecreta";
        $scope.smiyear = [];
        $scope.dataSMI = {};
        $scope.dataIE = {};
        var dataCacheSMI = {};
        var dataCacheIE = {};
        $scope.categorias = [];
        $scope.categorias1 = [];
        $scope.population = [];
        $scope.riskpoverty = [];
        $scope.inveducation = [];


        
       function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }


            /////MINIMUM SALARY/////

                
     $http.get("https://sos1617-02.herokuapp.com/api/v1/smi-stats?apikey=rXD8D2b1vP").then(function(response){
                
                dataCacheSMI = response.data;
                $scope.dataSMI = dataCacheSMI;
                
                for(var i=0; i<5; i++){
                 $scope.categorias.push($scope.dataSMI[i].country + " " +  $scope.dataSMI[i].year);
                 $scope.smiyear.push(Number($scope.dataSMI[i]["smi-year"]));
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
                            text: 'INVESTMENTS IN EDUCATION integrated with HIV-STATS'
                        },
                        chart: {
                            type: 'area'
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
                            name: 'SMI-year',
                            data: $scope.smiyear,
                        }]
                    });});
         
     });
               

}]);