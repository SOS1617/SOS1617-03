angular
    .module("GroupThreeApp")
    .controller("EslGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "apisupersecreta";
        
        $http.get("/api/v2/earlyleavers/"+ "?" + "apikey=" + $scope.apikey).then(function(res){
            console.log(res.data);
            /*Highcharts.chart('container',{
                title: {
                    text: 'Highcharts'
                },
                chart: {
                    type: 'bar'
                },
                xAxis: {
                    categories: res.country
                },
                legend: {
                    layout: 'vertical',
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    //align: 'left',
                    verticalAlign: 'top',
                    y: 60,
                    x: -60
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                    }
                },
                series:[{
                    data: res.esltotal.map(function(d){return Number(d.esltotal);})
                }]
            });*/
            
            google.charts.load('current', {
                'packages': ['geochart']
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
                function drawRegionsMap() {
                    var myData = [['Country', 'ESLObjective']];
                    res.data.forEach(function (d){
                        myData.push([d.country,d.eslobjective]);
                    });
                    var data = google.visualization.arrayToDataTable(myData);
                    var options = {
                        
                    };
                    var chart = new google.visualization.GeoChart(document.getElementById('map'));
                    chart.draw(data, options);
                }
            });
    }]);