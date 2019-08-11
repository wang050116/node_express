// index.js
const http = require('http');
const nUrl = require('url');
const config = require('./config');
const controller = require('./controller');
const route = require('./route').map(item => { 
  console.log(`route ${item.method}:${item.path}`);
  let tuple = item.impl.split('.');
  item.impl = controller[tuple[0]][tuple[1]];
    return item;
});

const server = http.createServer((req, res) => {
  let method = req.method;
  let url = nUrl.parse(req.url);

  let matchRoute = route.find(item => {
      return item.method === method && item.path === url.pathname;
  });

  if (matchRoute) {
      matchRoute.impl(req, res);
      return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});