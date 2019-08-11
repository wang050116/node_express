// simple sample
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Node');
}).listen(8080);
console.log('服务器已打开，可以运行 http://localhost:8080');