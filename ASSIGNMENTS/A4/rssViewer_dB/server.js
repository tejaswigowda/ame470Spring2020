var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;
var MS = require("mongoskin");

var db = MS.db("mongodb://127.0.0.1:27017/rssParser")
/*
db.collection("data").remove({}, function(err, result){
  if(!err){
    console.log("success");
  }
});


db.collection("data").insert({id:1213, url:"https://rss.itunes.apple.com/api/v1/us/apple-music/coming-soon/all/10/explicit.json"}, function(err, result){
  if(!err){
    console.log("success");
  }
});

db.collection("data").find().toArray(function(err, result){
  console.log(err, result)
});

*/
var Client = require('node-rest-client').Client;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

var allFeeds = [];

app.get("/addfeed", function (req, res) {
    var url = req.query.a;
    var x = {
      id:new Date().getTime(),
      url: url
    }

  db.collection("data").insert(x, function(err, result){
    if(!err){
      res.end("1");
    }
  });
});

app.get("/getallfeeds", function (req, res) {
  db.collection("data").find().toArray(function(err, result){
      res.send(JSON.stringify(result)); // send response body
  });
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
