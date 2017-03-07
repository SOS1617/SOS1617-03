var express = require("express");
var moment = require("moment");
var port = (process.env.PORT || 16778);
var path = require("path");
//ESTO ES UNA PRUEBA DE IVÁN

var app = express();
var publicFolder = path.join(__dirname, 'public');

var time = moment().utcOffset(+1).format('Do MMMM of YYYY, HH:mm:ss');

app.use("/",express.static(publicFolder));

app.get("/time",(request,response) => {
    response.send("<html><body><h1>"+time+"</h1></body></html>")
});

app.listen(port,(err) => {
    if(!err)
        console.log("Server listening in port "+ port);
    else
        console.log("ERROR starting server: "+ err);
});