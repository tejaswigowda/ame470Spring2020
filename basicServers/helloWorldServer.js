var http = require("http");

var cb = function (req, res) { // req -> request object; res -> response object
	   res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
	   res.end("hello world ame470!"); // send response body
	}

var server = http.createServer( cb ); // create an http server


server.listen(1234, "127.0.0.1"); // make server listen to port 1234
console.log("Server running at: "+ "http://127.0.0.1:1234");
