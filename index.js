

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var publicFolder = path.join(__dirname, 'public');

var earlyleaversAPI = require('./apis/earlyleavers.js');
var resultsAPI = require('./apis/results.js');
var investmentseducationAPI = require('./apis/investmentseducation.js');

var app = express();


var MongoClient = require('mongodb').MongoClient;
var mdbURL = "mongodb://admin:admin@ds137230.mlab.com:37230/sos03";

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";
var dbRuben;
var dbRaul;
var dbIvan;



/////////////
var API_KEY = "secret";

// Helper method to check for apikey
var checkApiKeyFunction = function(request, response) {
    if (!request.query.apikey) {
        console.error('WARNING: No apikey was sent!');
        response.sendStatus(401);
        return false;
    }
    if (request.query.apikey !== API_KEY) {
        console.error('WARNING: Incorrect apikey was used!');
        response.sendStatus(403);
        return false;
    }
    return true;
};

app.use(bodyParser.json()); 
app.use(helmet());

MongoClient.connect(mdbURL,{native_parser:true}, function(err,database){
    
    if(err){
        console.log("CAN NOT CONNECT TO DB: " +err);
        process.exit(1);
    }
    
    dbRuben = database.collection("results");
    dbRaul = database.collection("earlyleavers");
    dbIvan = database.collection("investmentseducation");
    
    resultsAPI.register(app, dbRuben, BASE_API_PATH, checkApiKeyFunction);

    earlyleaversAPI.register(app, dbRaul, BASE_API_PATH, checkApiKeyFunction);

    investmentseducationAPI.register(app, dbIvan, BASE_API_PATH, checkApiKeyFunction);


    app.listen(port, () => {
       console.log("Magic is happening on port " + port);
    
});

});

app.use("/",express.static(publicFolder));

app.use("/api/v1/tests", express.static(path.join(__dirname , "public/tests.html")));