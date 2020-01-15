var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8081;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

app.get("/hello", function (req, res) {
    var name = req.query.name;
    res.send("hello "+ name); // send response body
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);