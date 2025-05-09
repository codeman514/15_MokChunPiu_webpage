const http = require('http');
const fs = require('fs');
const url = require('url');
var server = http.createServer(function OnRequest(req, res) 
{
    if(req.url === "/" && req.method === "GET")
        {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/home.html').pipe(res);
        }
    if(req.url === "/china" && req.method === "GET")
        {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/china.html').pipe(res);
        }
});
server.listen(3000, "0.0.0.0");
console.log("Open at port 3000");