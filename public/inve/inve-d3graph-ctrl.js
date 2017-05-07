 $(document).ready(function () {                
                        
            
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