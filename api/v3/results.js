var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbRuben, BASE_API_PATH3, checkApiKeyFunction) {

//Load Initial Data
app.get(BASE_API_PATH3 + "/results/loadInitialData",function(request, response) {
   //  if (!checkApiKeyFunction(request, response)) return;
    dbRuben.find({}).toArray(function(err,results){
       
         if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    
      if (results.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

              var results = [{
                "country": "Spain",
                "year": "2012",
                "science": "496",
                "reading": "488",
                "math": "484"
              },
              {
                "country": "Belgium",
                "year": "2012",
                "math": "515",
                "reading": "509",
                "science": "505"
              },
              {
                "country": "Switzerland",
                "year": "2012",
                "math": "531",
                "reading": "509",
                "science": "515"
              },
              {
                "country": "Poland",
                "year": "2012",
                "math": "518",
                "reading": "518",
                "science": "526"
              },
              {
                "country": "United Kingdom",
                "year": "2012",
                "math": "494",
                "reading": "499",
                "science": "514"
              },
              {
                "country": "Finland",
                "math": "519",
                "reading": "524",
                "science": "545",
                "year": "2012"
              },
              {
                "country": "Spain",
                "math": "486",
                "reading": "496",
                "science": "493",
                "year": "2015"
              },
              {
                "country": "Finland",
                "math": "511",
                "reading": "526",
                "science": "531",
                "year": "2015"
              },
              {
                "country": "Holland",
                "year": "2012",
                "science": "522",
                "reading": "511",
                "math": "523"
              },
              {
                "country": "Switzerland",
                "year": "2015",
                "science": "506",
                "reading": "492",
                "math": "521"
              },
              {
                "country": "Poland",
                "year": "2015",
                "science": "501",
                "reading": "506",
                "math": "504"
              },
              {
                "country": "United Kingdom",
                "year": "2015",
                "science": "509",
                "reading": "498",
                "math": "492"
              },
              {
                "country": "Spain",
                "year": "2009",
                "reading": "481",
                "math": "483",
                "science": "491"
              },
              {
                "country": "Finland",
                "year": "2009",
                "reading": "532",
                "math": "540",
                "science": "553"
              },
              {
                "country": "United Kingdom",
                "year": "2009",
                "reading": "495",
                "math": "496",
                "science": "514"
              },
              {
                "country": "France",
                "year": "2009",
                "reading": "497",
                "math": "498",
                "science": "499"
              },
              {
                "country": "Germany",
                "year": "2009",
                "reading": "499",
                "math": "512",
                "science": "521"
              },
              {
                "country": "Holland",
                "year": "2009",
                "reading": "510",
                "math": "526",
                "science": "523"
              },
              {
                "country": "Italy",
                "year": "2009",
                "reading": "485",
                "math": "482",
                "science": "492"
              },
              {
                "country": "France",
                "year": "2012",
                "math": "495",
                "reading": "505",
                "science": "499"
              },
              {
                "country": "Germany",
                "year": "2012",
                "math": "514",
                "reading": "508",
                "science": "524"
              },
              {
                "country": "Italy",
                "year": "2012",
                "math": "485",
                "reading": "490",
                "science": "494"
              },
              {
                "country": "Portugal",
                "year": "2012",
                "math": "487",
                "reading": "488",
                "science": "489"
              },
              {
                "country": "Portugal",
                "year": "2015",
                "math": "492",
                "reading": "498",
                "science": "501"
              },
              {
                "country": "France",
                "year": "2015",
                "math": "493",
                "reading": "499",
                "science": "495"
              },
              {
                "country": "Germany",
                "year": "2015",
                "math": "506",
                "reading": "509",
                "science": "509"
              },
              {
                "country": "Italy",
                "year": "2015",
                "math": "490",
                "reading": "485",
                "science": "481"
  }];
        
    dbRuben.insert(results);
    response.sendStatus(200); //Ok
      } else {
        console.log('INFO: DB has ' + results.length + ' results ');
        response.sendStatus(200); //Ok
    }
});
});



// GET a collection


app.get(BASE_API_PATH3 + "/results", function (request, response) {
   // if (!checkApiKeyFunction(request, response)) return;
    
    console.log("INFO: New GET request to /results");
           var limit = parseInt(request.query.limit);
          var offset = parseInt(request.query.offset);

            var from = parseInt(request.query.from);
            var to = parseInt(request.query.to);
            var aux = [];
            var aux2= [];
            if (limit && offset>=0) {
             //   aux= buscador(dbRuben.find({}).toArray(), aux, from, to);
                dbRuben.find({}).toArray(function(err, results) {    // .skip(offset).limit(limit)
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }else {
                        if (results.length === 0) {
                            response.sendStatus(404);

                        }
                        if (from && to) {

                           aux = buscador(results, aux, from, to);
                            if (aux.length > 0) {
                        aux2 = aux.slice(offset, offset+limit);
                            
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(results, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                                response.send(aux2);

                            


                            }
                            else {
                                response.sendStatus(404); // No encuentra nada con esos filtros
                            }
                        }else {
                            response.send(results);
                          console.log("INFO: Sending results without from and to: " + JSON.stringify(results, 2, null));

                        }
                    }
                });
            } else {

                dbRuben.find({}).toArray(function(err, results) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (results.length === 0) {
                            response.sendStatus(404);
                            return;
                        }
                        if (from && to) {

                            aux = buscador(results, aux, from, to);
                            if (aux.length > 0) {
                                response.send(aux);
                             console.log("INFO: Sending results with from and to but without limit and offset: " + JSON.stringify(results, 2, null));

                            }
                            else {
                                response.sendStatus(404); //Está el from y el to pero está mal hecho
                            }
                        }
                        else {
                            response.send(results);
                            console.log("INFO: Sending results: " + JSON.stringify(results, 2, null));

                        }
                    }
                });
            }
});

            
// GET a collection de un mismo año 

app.get(BASE_API_PATH3 + "/results/:year", function (request, response) {
  //  if (!checkApiKeyFunction(request, response)) return;
    var year = request.params.year;
    var country = request.params.year;

    if(isNaN(request.params.year.charAt(0))){
        

            if (!country) {
        console.log("WARNING: New GET request to /results/:country without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /results/" + country);
        dbRuben.find({country:country}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any result with country " + country);
                    response.sendStatus(404); // not found
                
                }
        });

}
    }else{

    if (!year) {
        console.log("WARNING: New GET request to /results/:year without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /results/" + year);
        dbRuben.find({year:year}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any result with year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
    
}});



// Get a un recurso concreto
app.get(BASE_API_PATH3 + "/results/:country/:year", function (request, response) {
   // if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    if (!country || !year) {
        console.log("WARNING: New GET request to /results/:country without name or without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /results/" + country + "/" + year);
        dbRuben.find({country:country, $and:[{year:year}]}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any country with name " + country +  "and year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
});

//POST a una colección

app.post(BASE_API_PATH3 + "/results", function (request, response) {
   // if (!checkApiKeyFunction(request, response)) return;
    var newResult = request.body;
    if (!newResult) {
        console.log("WARNING: New POST request to /contacts/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /results with body: " + JSON.stringify(newResult, 2, null));
        if (!newResult.country || !newResult.year || !newResult.science || !newResult.math || !newResult.reading) {
            console.log("WARNING: The contact " + JSON.stringify(newResult, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbRuben.find({country:newResult.country, $and:[{year:newResult.year}]}).toArray(function (err, results) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var resultsBeforeInsertion = results.filter((result) => {
                        return (result.country.localeCompare(result.country, "en", {'sensitivity': 'base'}) === 0);
                      
                      
                     
});

                    if (resultsBeforeInsertion.length > 0) {
                        console.log("WARNING: The result " + JSON.stringify(newResult, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding result " + JSON.stringify(newResult, 2, null));
                        dbRuben.insert(newResult);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//Post a un recurso (PROHIBIDO)

app.post(BASE_API_PATH3 + "/results/:country/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    console.log("WARNING: New POST request to /country/" + country + " and year " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});



//Put a una coleccion (Prohibido)
app.put(BASE_API_PATH3 + "/results", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    console.log("WARNING: New PUT request to /results, sending 405...");
    response.sendStatus(405); // method not allowed
});


// Delete a un recurso concreto

app.delete(BASE_API_PATH3 + "/results/:country/:year", function (request, response) {
   // if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    if (!country || !year) {
        console.log("WARNING: New DELETE request to /contacts/:country/:year without country and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /results/" + country + " and year " + year);
        dbRuben.remove({country:country, $and:[{year:year}]}, {}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Results removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The result with country " + country + "and year " + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no countries to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//PUT sobre un recurso concreto


app.put(BASE_API_PATH3 + "/results/:country/:year", function (request, response) {
  //  if (!checkApiKeyFunction(request, response)) return;
    var updatedResult = request.body;
    var country = request.params.country;
    var year = request.params.year;
    if (!updatedResult) {
        console.log("WARNING: New PUT request to /results/ without result, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /results/" + country + " with data " + JSON.stringify(updatedResult, 2, null));
        if (!updatedResult.country || !updatedResult.year || !updatedResult.science || !updatedResult.math || !updatedResult.reading || updatedResult.country !== country || updatedResult.year !== year) {
            console.log("WARNING: The result " + JSON.stringify(updatedResult, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbRuben.find({country:country, $and:[{year:year}]}).toArray(function (err, results) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if (results.length > 0) {
                        dbRuben.update({country: country, year: year}, updatedResult);
                        console.log("INFO: Modifying result with country " + country + " with data " + JSON.stringify(updatedResult, 2, null));
                        response.send(updatedResult); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any result with country " + country);
                        response.sendStatus(404); // not found
                    }
                }
            )}
        }
    });


// Funcion auxiliar

var buscador = function(base, conjuntoauxiliar, desde, hasta) {

    var from = parseInt(desde);
    var to = parseInt(hasta);


    for (var j = 0; j < base.length; j++) {
        var anyo = base[j].year;
        if (to >= anyo && from <= anyo) {

            conjuntoauxiliar.push(base[j]);
        }
    }

    return conjuntoauxiliar;

};

app.get("/resProxy", (req, res) => {

    var http = require('http');
    
    var options = {
        host:'sos1617-01.herokuapp.com',   
        path:'/api/v2/youthunemploymentstats?apikey=sos161701' 
    };
    
    callback = function(response){
        var str = '';
        
        response.on('data', function(chunk){
           str += chunk; 
        });
        
        response.on('end', function(){
           res.send(str); 
        });
    };
    
    http.request(options, callback).end();
});



//DELETE a una coleccion
app.delete(BASE_API_PATH3 + "/results", function (request, response) {
   // if (!checkApiKeyFunction(request, response)) return;
    console.log("INFO: New DELETE request to /results");
    dbRuben.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the results (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no results to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});
};


