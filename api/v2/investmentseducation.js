var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbIvan, BASE_API_PATH, checkApiKeyFunction) {


// Proxy g09

app.get(BASE_API_PATH + "/investmentseducation/proxy", (req, res) => {
    if (!checkApiKeyFunction(req, res)) return;
    var http = require('http');
    
    var options = {
        host:'sos1617-09.herokuapp.com',   
        path:'/api/v1/hiv-stats?apikey=manuel' 
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



//Load initial data

app.get(BASE_API_PATH + "/investmentseducation/loadInitialData",function(request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    dbIvan.find({}).toArray(function(err,countries){
        
         if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    
      if (countries.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

              var countr = [{
                "country": "spain", 
                "year":"2014", 
                "population": "46",
                "riskpoverty":"22", 
                "inveducation": 46
            },
            {
                "country": "unitedkingdom",
                "year": "2014",
                "population": "64", 
                "riskpoverty": "20",
                "inveducation": 117
            },
            {"country": "italy",
            "year":"2014",
            "population": "60",
            "riskpoverty":"19",
            "inveducation": 67
            },
            {
                "country": "germany",
                "year":"2014",
                "population": "80",
                "riskpoverty":"16",
                "inveducation": 136
            },
            {
                "country": "greece",
                "year":"2014",
                "population": "10",
                "riskpoverty":"22",
                "inveducation": 7
            },
            {
                "country": "france",
                "year":"2012",
                "population": "30",
                "riskpoverty":"10",
                "inveducation": 30
            },
            {
                "country": "spain",
                "year":"2016",
                "population": "50",
                "riskpoverty":"20",
                "inveducation": 20
            }];
        dbIvan.insert(countr);
        response.sendStatus(201); //Created
    } else {
        console.log('INFO: DB has ' + countries.length + ' countries ');
        response.sendStatus(409); //Conflict
    }
});
});



// GET a collection
app.get(BASE_API_PATH + "/investmentseducation", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    console.log("INFO: New GET request to /investmentseducation");
    
         /*PRUEBA DE BUSQUEDA */
            var limit = parseInt(request.query.limit, 10);
            var offset = parseInt(request.query.offset, 10);
            var from = parseInt(request.query.from, 10);
            var to = parseInt(request.query.to, 10);
            var aux = [];
            var aux2= [];

            
            if (limit && offset >=0) {
            dbIvan.find({}).toArray(function(err, countries) {    // .skip(offset).limit(limit)
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                     response.sendStatus(500); // internal server error
                } else {
                     if (countries.length === 0) {
                            response.sendStatus(404);
                        }
                    console.log("INFO: Sending countries: " + JSON.stringify(countries, 2, null));
                    if (from && to) {

                            aux = search(countries, aux, from, to);
                            if (aux.length > 0) {
                                aux2 = aux.slice(offset, offset+limit);
                                console.log("INFO: Sending investmentseducation with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                                console.log("INFO: Sending investmentseducation with from and to and limit and offset: " + JSON.stringify(countries, 2, null));
                                console.log("INFO: Sending investmentseducation with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                                response.send(aux2);
                            }
                            else {
                                response.sendStatus(404); // No content 
                            }
                        }
                        else {
                            response.send(countries);
                        }
                }
            });
            
            }
            else {

                dbIvan.find({}).toArray(function(err, countries) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (countries.length === 0) {
                            response.sendStatus(404); // not found
                            return;
                        }
                        
                        if (from && to) {
                            aux = search(countries, aux, from, to);
                            if (aux.length > 0) {
                                response.send(aux);
                                console.log("INFO: Sending earlyleavers with from and to but without limit and offset: " + JSON.stringify(countries, 2, null));
                            }
                            else {
                                response.sendStatus(404); //No content
                            }
                        }
                        else {
                            response.send(countries);
                            console.log("INFO: Sending investmentseducation: " + JSON.stringify(countries, 2, null));
                        }
                    }
                });
            }
    /*    
    dbIvan.find({}).toArray( function (err, countries) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending countries: " + JSON.stringify(countries, 2, null));
            response.send(countries);
        }
    });*/
});


// SEARCH FUNCTION

var search = function(resources, res, from, to) {

    var from = parseInt(from);
    var to = parseInt(to);

    for (var j = 0; j < resources.length; j++) {
        var auxyear = resources[j].year;
        if (to >= auxyear && from <= auxyear) {

            res.push(resources[j]);
        }
    }

    return res;

};

// GET a collection de un mismo año 

app.get(BASE_API_PATH + "/investmentseducation/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var year = request.params.year;
    var country = request.params.year;

    if(isNaN(request.params.year.charAt(0))){
        

            if (!country) {
        console.log("WARNING: New GET request to /investmentseducation/:country without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /investmentseducation/" + country);
        dbIvan.find({country:country}).toArray(function (err, investmentseducation) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (investmentseducation.length > 0) { 
                    var investmentseducationP = investmentseducation; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending country: " + JSON.stringify(investmentseducationP, 2, null));
                    response.send(investmentseducationP);
                } else {
                    console.log("WARNING: There are not any investmentseducation with country " + country);
                    response.sendStatus(404); // not found
                
                }
        });

}
    }else{

    if (!year) {
        console.log("WARNING: New GET request to /investmentseducation/:year without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /investmentseducation/" + year);
        dbIvan.find({year:year}).toArray(function (err, investmentseducation) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (investmentseducation.length > 0) { 
                    var investmentseducationP = investmentseducation; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending result: " + JSON.stringify(investmentseducationP, 2, null));
                    response.send(investmentseducationP);
                } else {
                    console.log("WARNING: There are not any investmentseducation with year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
    
}});

// Get a un recurso concreto
app.get(BASE_API_PATH + "/investmentseducation/:country/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    
    if (!country || !year) {
        console.log("WARNING: New GET request to /investmentseducation/:country without name or without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /investmentseducation/" + country + "/" + year);
        dbIvan.find({country:country, $and:[{year:year}]}).toArray(function (err, investmentseducation) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (investmentseducation.length > 0) { 
                    var investmentseducationP = investmentseducation[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending earlyleaver: " + JSON.stringify(investmentseducationP, 2, null));
                    response.send(investmentseducationP);
                } else {
                    console.log("WARNING: There are not any investment education with country " + country +  " and year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
});



//POST over a collection
app.post(BASE_API_PATH + "/investmentseducation", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var newCountrie = request.body;
    if (!newCountrie) {
        console.log("WARNING: New POST request to /investmentseducation/ without countrie, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /investmentseducation with body: " + JSON.stringify(newCountrie, 2, null));
        if (!newCountrie.country || !newCountrie.year || !newCountrie.population || !newCountrie.riskpoverty || !newCountrie.inveducation) {
            console.log("WARNING: The countrie " + JSON.stringify(newCountrie, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // unprocessable entity
        } else {
            dbIvan.find({country:newCountrie.country, $and:[{year:newCountrie.year}]}).toArray( function (err, countries) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var countriesBeforeInsertion = countries.filter((countrie) => {
                        return (countrie.country.localeCompare(newCountrie.country, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (countriesBeforeInsertion.length > 0) {
                        console.log("WARNING: The countrie " + JSON.stringify(newCountrie, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding countrie " + JSON.stringify(newCountrie, 2, null));
                        dbIvan.insert(newCountrie);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});



//POST over a single resource
app.post(BASE_API_PATH + "/investmentseducation/:country/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var name = request.params.country;
    var year = request.params.year;
    console.log("WARNING: New POST request to /investmentseducation/" + name + " and year " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});




//PUT over a collection
app.put(BASE_API_PATH + "/investmentseducation", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    console.log("WARNING: New PUT request to /countriesIvn, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/investmentseducation/:country/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var updatedCountry = request.body;
    var country = request.params.country;
	var year = request.params.year;
    if (!updatedCountry) {
        console.log("WARNING: New PUT request to /investmentseducation/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /investmentseducation/" + country + " with data " + JSON.stringify(updatedCountry, 2, null));
        if (!updatedCountry.country || !updatedCountry.year || !updatedCountry.population || !updatedCountry.riskpoverty || !updatedCountry.inveducation
           || updatedCountry.country !== country || updatedCountry.year !== year) {
            console.log("WARNING: The country " + JSON.stringify(updatedCountry, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // unprocessable entity
        } else {
            dbIvan.find({country:updatedCountry.country, $and:[{year:updatedCountry.year}]}).toArray( function (err, countries) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if(countries.length > 0) {
						dbIvan.update({country: updatedCountry.country, year: updatedCountry.year}, updatedCountry);
                        console.log("INFO: Modifying country with country " + country + " with data " + JSON.stringify(updatedCountry, 2, null));
                        response.send(updatedCountry); // return the updated contact
                    } else{
                        console.log("WARNING: There are not any country with country " + country);
                        response.sendStatus(404); // not found
					}
                }
            )}
        }
    });


//DELETE over a collection
app.delete(BASE_API_PATH + "/investmentseducation", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    console.log("INFO: New DELETE request to /investmentseducation");
    dbIvan.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the countries (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no contacts to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/investmentseducation/:country/:year", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    if (!country || !year) {
        console.log("WARNING: New DELETE request to /investmentseducation/:country/:year without country and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /investmentseducation/" + country + "and year" + year);
        dbIvan.remove({country: country, $and: [{year:year}]}, {}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Countries removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The contact with country " + country + "and year" + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no contacts to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});
};
