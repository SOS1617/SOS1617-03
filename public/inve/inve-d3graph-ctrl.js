 angular
    .module("GroupThreeApp")
    .controller("InveD3GraphCtrl",["$scope","$http",function ($scope, $http){
        
        console.log("Graph Controller initialized");
    
        $scope.apikey = "apisupersecreta";
        $scope.data = {};
        var dataCache = {};
         $scope.categorias = [];
         $scope.population = [];
         $scope.riskpoverty = [];
         $scope.inveducation = [];
         $scope.d3inveducation = [];
         $scope.countries = [];
         
         
        
         
         
         
         $http.get("../api/v2/investmentseducation?apikey=" + $scope.apikey).then(function(response){
             dataCache = response.data;
             $scope.data = dataCache;
             $scope.d3data = dataCache;
             
             for(var i=0; i<response.data.length; i++){
                 $scope.categorias.push($scope.data[i].country + " " +  $scope.data[i].year);
                 $scope.population.push(Number($scope.data[i].population));
                 $scope.riskpoverty.push(Number($scope.data[i].riskpoverty));
                 $scope.inveducation.push(Number($scope.data[i].inveducation));
                 $scope.d3inveducation.push(Number($scope.data[i].inveducation));

                 console.log($scope.data[i].country);
             }
             
             var categorias = $scope.categorias;
             var inversiones = $scope.d3inveducation;
             
             var visualization = d3plus.viz()
                                     .container("#viz")  
                                     .data(d3data)  
                                     .type("tree_map")   
                                     .id(categorias)         
                                     .size(parseInt(inversiones))      
                                     .background("#000000")  // set background to black to highlight margin
                                     .margin(50)             // will take pixel value or standard CSS string
                                     .draw()
                    return visualization;


         });


   
                
                        
        
  ///////////////////////////////////////////////////         
                        
                     
        
             
             
             
             
             
         }]);
         
         
         
         
 
 
 
 
 
 /*$(document).ready(function () {                
                        
            
                         var visualization = d3plus.viz()
                                     .container("#viz")  
                                     .data(auxdata)  
                                     .type("tree_map")   
                                     .id("name")         
                                     .size("value")      
                                     .background("#000000")  // set background to black to highlight margin
                                     .margin(50)             // will take pixel value or standard CSS string
                                     .draw()
                    return visualization;
            
         }); 
         
         
                     
        ////////// //////// D3 /////////////// 

        
        
        var d3data = [['country','inveducation']];
        var d3coun = $scope.countries;
        var d3inve = $scope.d3inveducation;
        
                 response.data.forEach(function (x){
                    d3data.push([x.country, x.inveducation]);
                    d3coun.push([x.country])
                    d3inve.push([Number(x.inveducation)])
                     });

        
                  /*      
                  var visualization = d3plus.viz()
                                     .container("#viz")  
                                     .data(d3data)  
                                     .type("tree_map")   
                                     .id(toString("country"))         
                                     .size(parseInt(d3inve))      
                                     .background("#000000")  // set background to black to highlight margin
                                     .margin(50)             // will take pixel value or standard CSS string
                                     .draw()  */