var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbIvan, BASE_API_PATH, checkApiKeyFunction) {

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
                "population": "46.48",
                "riskpoverty":"22.2", 
                "inveducation": "46789.6"
            },
            {
                "country": "unitedkingdom",
                "year": "2014",
                "population": "64.613", 
                "riskpoverty": "20.8",
                "inveducation": "117116.4"
            },
            {
                "country": "unitedstates",
                "year":"2014", 
                "population": "318.907",
                "riskpoverty":"13.5",
                "inveducation": "582356"
            },
            {"country": "italy",
            "year":"2014",
            "population": "60.789,",
            "riskpoverty":"19.9",
            "inveducation": "67799.8"
            },
            {"country": "brasil",
            "year":"2012",
            "population": "80.00",
            "riskpoverty":"30",
            "inveducation": "76994.8"
            },
            {
                "country": "germany",
                "year":"2014",
                "population": "80.982",
                "riskpoverty":"16.7",
                "inveducation": "136.487.3"
            }];
        dbIvan.insert(countr);
        response.sendStatus(200); //Ok
    } else {
        console.log('INFO: DB has ' + countries.length + ' countries ');
        response.sendStatus(200); //Ok
    }
});
});



// GET a collection
app.get(BASE_API_PATH + "/investmentseducation", function (request, response) {
    if (!checkApiKeyFunction(request, response)) return;
    console.log("INFO: New GET request to /investmentseducation");
    
         /*PRUEBA DE BUSQUEDA */
            var limit = parseInt(request.query.limit);
            var offset = parseInt(request.query.offset);
            var from = request.query.from;
            var to = request.query.to;
            var aux = [];
            
            if (limit && offset >=0) {
            dbIvan.find({}).skip(offset).limit(limit).toArray(function(err, countries) {
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
                                response.send(aux);
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
                            response.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(countries, 2, null));
                        if (from && to) {
                            aux = search(countries, aux, from, to);
                            if (aux.length > 0) {
                                response.send(aux);
                            }
                            else {
                                response.sendStatus(404); //No content
                            }
                        }
                        else {
                            response.send(countries);
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
                    console.log("WARNING: There are not any investment educarion with country " + country +  "and year " + year);
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
