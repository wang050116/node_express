// index.js
// import require 2 modules
const http = require('http');
const nUrl = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
  let method = req.method;
  let url = nUrl.parse(req.url);
  if (method == 'GET' && url.pathname == '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hellow World');
    return;
  }

  if (method == 'GET' && url.pathname == '/api/user') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      code: 0,
      msg: '',
      result: {
        username: 'shasharonman'
      }
    }));
    return;
  }
  // not match brach
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});