 angular
    .module("GroupThreeApp")
    .controller("InveD3GraphCtrl",["$scope","$http",function ($scope, $http){
        
        
        var sample_data = [
    {"value": 100, "name": "alpha"},
    {"value": 70, "name": "beta"},
    {"value": 40, "name": "gamma"},
    {"value": 15, "name": "delta"},
    {"value": 5, "name": "epsilon"},
    {"value": 1, "name": "zeta"}
  ]
  var visualization = d3plus.viz()
    .container("#viz")  
    .data(sample_data)  
    .type("tree_map")   
    .id("name")         
    .size("value")      
    .background("#000000")  // set background to black to highlight margin
    .margin(50)             // will take pixel value or standard CSS string
    .draw()             
        
        /*
        console.log("Graph Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.population = [];
         $scope.riskpoverty = [];
         $scope.inveducation = [];
         $scope.countries = [];

        
         
         
         
         $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;

             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 
                 $scope.population.push(Number($scope.data[i].population));
                 $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                 $scope.inveducation.push(Number($scope.data[i].inveducation));
                 $scope.countries.push($scope.data[i].country);

                 console.log($scope.data[i].country);
             }
             var d3data = [['country','inveducation']];
         var d3inve = $scope.inveducation;
         var d3cat = $scope.categorias;
         
         response.data.forEach(function (x){
                    d3data.push([x.countries, x.inveducation]);
                    d3cat.push([x.categorias])
                    d3inve.push([Number(x.inveducation)])
                    
                    var sample_data = d3data;
                    
                    
                
         });
         
         
                 
                             });
         

                
     /*             

var d3data = [['country','inveducation']];
               var d3coun = $scope.countries;
               var d3inve = $scope.d3inveducation;
        
                 response.data.forEach(function (x){
                    d3data.push([x.country, x.inveducation]);
                    d3coun.push([x.country])
                    d3inve.push([Number(x.inveducation)])
                    
                      var visualization = d3plus.viz()
                                     .container("#viz")  
                                     .data(d3data)  
                                     .type("tree_map")   
                                     .id(toString(d3coun))         
                                     .size(parseInt(d3inve))      
                                     .background("#000000")  // set background to black to highlight margin
                                     .margin(50)             // will take pixel value or standard CSS string
                                     .draw()
                    
                    
                     });*/
   
            
            
            
            
                  
                     
        
             
             
             
             
             
         }]);
         
         
         
         
 
 
 
 
 
 