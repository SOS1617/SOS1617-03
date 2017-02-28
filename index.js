var express = require("express");
var moment = require("moment");
var port = (process.env.PORT || 16778);

var app = express();

var time = moment().utcOffset(+1).format('Do MMMM of YYYY, HH:mm:ss');

app.get("/time",(request,response) => {
    response.send("<html><body><h1>"+time+"</h1></body></html>")
});

app.listen(port,(err) => {
    if(!err)
        console.log("Server listening in port "+ port);
    else
        console.log("ERROR starting server: "+ err);
});