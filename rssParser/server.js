var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var Client = require('node-rest-client').Client;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

var allFeeds = [];

app.get("/addfeed", function (req, res) {
    var url = req.query.a;
    allFeeds.push(url);
    res.end("1");
});

app.get("/getallfeeds", function (req, res) {
    res.send(JSON.stringify(allFeeds)); // send response body
});

app.get("/getrss", function (req, res) {
    var url = req.query.a;
      console.log(url);
    var client = new Client();
    client.get(url, function (data, response) {
      // parsed response body as js object
      console.log(data);
      res.send(data); // send response body
    });
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
