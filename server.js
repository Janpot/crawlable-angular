/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, nomen: true */
/*global */

'use strict';

var express        = require('express'),
    staticRenderer = require('./staticRenderer'),
    port           = process.env.PORT || 3000;

var server = express();
server.configure(function () {
  
  server.use(staticRenderer({
    host: 'http://localhost:' + port,
    stripScripts: true
  }));
  
  server.use(express.static(__dirname + '/app'));
  
  server.get('/xhr', function (req, res) {
    res.send(200, 'Hello world!');
  });
  
});

server.listen(port);

console.log('For the application, visit: http://localhost:3000/#!/home');
console.log('For the snapshot, visit: http://localhost:3000/?_escaped_fragment_=/home');