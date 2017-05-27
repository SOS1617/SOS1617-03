var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbRaul, BASE_API_PATH3, checkApiKeyFunction) {

//Load Initial Data

app.get(BASE_API_PATH3 + "/earlyleavers/loadInitialData",function(request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    dbRaul.find({}).toArray(function(err,earlyleavers){
        
         if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    
      if (earlyleavers.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

              var earlyleavers = [{
                "country": "spain",
                "year": "2014",
                "eslmale": "25.6",
                "eslfemale": "18.1",
                "esltotal": "21.9",
                "eslobjective": "15"
            },
            {
                "country": "spain",
                "year": "2015",
                "eslmale": "24",
                "eslfemale": "15.8",
                "esltotal": "20",
                "eslobjective": "15"
            },
            {
                "country": "france",
                "year": "2014",
                "eslmale": "10.2",
                "eslfemale": "7.9",
                "esltotal": "9",
                "eslobjective": "9.5"
            },
            {
                "country": "france",
                "year": "2015",
                "eslmale": "10.1",
                "eslfemale": "8.5",
                "esltotal": "9.3",
                "eslobjective": "9.5"
            },
            {
                "country": "italy",
                "year": "2014",
                "eslmale": "17.7",
                "eslfemale": "12.2",
                "esltotal": "15",
                "eslobjective": "16"
            },
            {
                "country": "italy",
                "year": "2015",
                "eslmale": "17.5",
                "eslfemale": "11.8",
                "esltotal": "14.7",
                "eslobjective": "16"
            }];
        
    dbRaul.insert(earlyleavers);
    response.sendStatus(200); //Ok
      } else {
        console.log('INFO: DB has ' + earlyleavers.length + ' objects ');
        response.sendStatus(200); //Ok
    }
});
});

/*
//Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /earlyleavers");
    response.redirect(301, BASE_API_PATH + "/earlyleavers");
});
*/


// GET Collection (WITH SEARCH)

app.get(BASE_API_PATH3 + "/earlyleavers", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    
    console.log("INFO: New GET request to /earlyleavers");
    var limit = parseInt(request.query.limit, 10);
    var offset = parseInt(request.query.offset, 10);

    var from = parseInt(request.query.from, 10);
    var to = parseInt(request.query.to, 10);
    var aux = [];
    var aux2= [];
    if (limit && offset>=0) {
        dbRaul.find({}).toArray(function(err, earlyleavers) {    // .skip(offset).limit(limit)
            if (err) {
                console.error('ERROR from database');
                response.sendStatus(500); // internal server error
            }else {
                if (earlyleavers.length === 0) {
                    response.sendStatus(404);

                }
                if (from && to) {
                    aux = buscador(earlyleavers, aux, from, to);
                    if (aux.length > 0) {
                        aux2 = aux.slice(offset, offset+limit);
                            
                        console.log("INFO: Sending earlyleavers with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                        console.log("INFO: Sending earlyleavers with from and to and limit and offset: " + JSON.stringify(earlyleavers, 2, null));
                        console.log("INFO: Sending earlyleavers with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                        response.send(aux2);

                    } else {
                        response.sendStatus(404); // No encuentra nada con esos filtros
                    
                        
                    }
                    
                } else {
                    response.send(earlyleavers);
                    console.log("INFO: Sending earlyleavers without from and to: " + JSON.stringify(earlyleavers, 2, null));

                }
            }
        });
        
    } else {
        dbRaul.find({}).toArray(function(err, earlyleavers) {
            if (err) {
                console.error('ERROR from database');
                response.sendStatus(500); // internal server error
            
            } else {
                if (earlyleavers.length === 0) {
                    response.sendStatus(404);
                    return;
                }
                
                if (from && to) {
                    aux = buscador(earlyleavers, aux, from, to);
                    
                    if (aux.length > 0) {
                        response.send(aux);
                        console.log("INFO: Sending earlyleavers with from and to but without limit and offset: " + JSON.stringify(earlyleavers, 2, null));

                    } else {
                        response.sendStatus(404); //Está el from y el to pero está mal hecho
                    }
                
                } else {
                    response.send(earlyleavers);
                    console.log("INFO: Sending earlyleavers: " + JSON.stringify(earlyleavers, 2, null));

                }
            }
        });
    }
});


// Search

var buscador = function(base, conjuntoauxiliar, desde, hasta) {

    var from = parseInt(desde, 10);
    var to = parseInt(hasta, 10);

    for (var j = 0; j < base.length; j++) {
        var anyo = base[j].year;
        
        if (to >= anyo && from <= anyo) {
            conjuntoauxiliar.push(base[j]);
        }
    }
    return conjuntoauxiliar;
};


// GET Items by year 

app.get(BASE_API_PATH3 + "/earlyleavers/:year", function (request, response) {
    var year = request.params.year;
    var country = request.params.year;
    //if (!checkApiKeyFunction(request, response)) return;
    
    if(isNaN(request.params.year.charAt(0))){
        if (!country) {
            console.log("WARNING: New GET request to /earlyleavers/:country without name, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New GET request to /earlyleavers/" + country);
            
            dbRaul.find({country:country}).toArray(function (err, earlyleavers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                
                } else if (earlyleavers.length > 0) { 
                    var earlyleaver = earlyleavers; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending earlyleaver: " + JSON.stringify(earlyleaver, 2, null));
                    response.send(earlyleaver);
                
                } else {
                    console.log("WARNING: There are not any earlyleaver with country " + country);
                    response.sendStatus(404); // not found
                }
        });

}
    }else{

    if (!year) {
        console.log("WARNING: New GET request to /earlyleavers/:year without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /earlyleavers/" + year);
        dbRaul.find({year:year}).toArray(function (err, earlyleavers) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (earlyleavers.length > 0) { 
                    var earlyleaver = earlyleavers; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending result: " + JSON.stringify(earlyleaver, 2, null));
                    response.send(earlyleaver);
                } else {
                    console.log("WARNING: There are not any earlyleaver with year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
    
}});


// GET Item by country and year

app.get(BASE_API_PATH3 + "/earlyleavers/:country/:year", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    if (!country || !year) {
        console.log("WARNING: New GET request to /earlyleavers/:country without name or without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /earlyleavers/" + country + "/" + year);
        dbRaul.find({country:country, $and:[{year:year}]}).toArray(function (err, earlyleavers) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (earlyleavers.length > 0) { 
                    var earlyleaver = earlyleavers[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending earlyleaver: " + JSON.stringify(earlyleaver, 2, null));
                    response.send(earlyleaver);
                } else {
                    console.log("WARNING: There are not any earlyleaver with country " + country +  "and year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}
});

//POST Collection

app.post(BASE_API_PATH3 + "/earlyleavers", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    var newEarlyleaver = request.body;
    if (!newEarlyleaver) {
        console.log("WARNING: New POST request to /earlyleavers/ without earlyleaver, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /earlyleavers with body: " + JSON.stringify(newEarlyleaver, 2, null));
        if (!newEarlyleaver.country || !newEarlyleaver.year || !newEarlyleaver.eslmale || !newEarlyleaver.eslfemale || !newEarlyleaver.esltotal || !newEarlyleaver.eslobjective) {
            console.log("WARNING: The earlyleaver " + JSON.stringify(newEarlyleaver, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbRaul.find({country:newEarlyleaver.country, $and:[{year:newEarlyleaver.year}]}).toArray(function (err, earlyleavers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var earlyleaversBeforeInsertion = earlyleavers.filter((earlyleaver) => {
                        return (earlyleaver.country.localeCompare(earlyleaver.country, "en", {'sensitivity': 'base'}) === 0);
                      
                      
                     
});

                    if (earlyleaversBeforeInsertion.length > 0) {
                        console.log("WARNING: The earlyleaver " + JSON.stringify(newEarlyleaver, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding earlyleaver " + JSON.stringify(newEarlyleaver, 2, null));
                        dbRaul.insert(newEarlyleaver);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST Item (FORBIDDEN)

app.post(BASE_API_PATH3 + "/earlyleavers/:country/:year", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    console.log("WARNING: New POST request to /earlyleavers/" + country + " and year " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});



//PUT Collection (FORBIDDEN)
app.put(BASE_API_PATH3 + "/earlyleavers", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    console.log("WARNING: New PUT request to /earlyleavers, sending 405...");
    response.sendStatus(405); // method not allowed
});


//DELETE Item

app.delete(BASE_API_PATH3 + "/earlyleavers/:country/:year", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    var country = request.params.country;
    var year = request.params.year;
    if (!country || !year) {
        console.log("WARNING: New DELETE request to /earlyleavers/:country/:year without country and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /earlyleavers/" + country + " and year " + year);
        dbRaul.remove({country:country, $and:[{year:year}]}, {}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Earlyleavers removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The earlyleavers with country " + country + " and year " + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no countries to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//PUT Item


app.put(BASE_API_PATH3 + "/earlyleavers/:country/:year", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    var updatedEarlyleaver = request.body;
    var country = request.params.country;
    var year = request.params.year;
    if (!updatedEarlyleaver) {
        console.log("WARNING: New PUT request to /earlyleavers/ without earlyleaver, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /earlyleavers/" + country + " with data " + JSON.stringify(updatedEarlyleaver, 2, null));
        if (!updatedEarlyleaver.country || !updatedEarlyleaver.year || !updatedEarlyleaver.eslmale || !updatedEarlyleaver.eslfemale ||
                    !updatedEarlyleaver.esltotal || !updatedEarlyleaver.eslobjective || updatedEarlyleaver.country !== country || updatedEarlyleaver.year !== year) { //keep an eye on this
            console.log("WARNING: The earlyleaver " + JSON.stringify(updatedEarlyleaver, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            dbRaul.find({country:updatedEarlyleaver.country, $and:[{year:updatedEarlyleaver.year}]}).toArray(function (err, earlyleavers) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if (earlyleavers.length > 0) {
                        dbRaul.update({country: updatedEarlyleaver.country, year: updatedEarlyleaver.year}, updatedEarlyleaver);
                        console.log("INFO: Modifying earlyleaver with country " + country + " with data " + JSON.stringify(updatedEarlyleaver, 2, null));
                        response.send(updatedEarlyleaver); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any earlyleavers with country " + country);
                        response.sendStatus(404); // not found
                    }
                }
            )}
        }
    });

//DELETE Collection
app.delete(BASE_API_PATH3 + "/earlyleavers", function (request, response) {
    //if (!checkApiKeyFunction(request, response)) return;
    console.log("INFO: New DELETE request to /earlyleavers");
    dbRaul.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the earlyleavers (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no earlyleavers to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


// Proxy

app.get("/proxyRaul", (req, res) => {
    var http = require('http');
    
    var options = {
        host:'sos1617-06.herokuapp.com',   
        path:'/api/v1/education?apikey=secret' 
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

};
