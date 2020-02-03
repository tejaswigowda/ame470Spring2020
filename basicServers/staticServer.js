var express = require("express");
var server = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8081;

server.get("/", function (req, res) {
      res.redirect("/index.html");
});

server.get("/hello", function (req, res) {
    var name = req.query.name;
    res.send("hello "+ name); // send response body
});

server.use(methodOverride());
server.use(bodyParser());
server.use(express.static(__dirname + '/'));
server.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
server.listen(port);
