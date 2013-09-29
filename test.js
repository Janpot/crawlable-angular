/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, nomen: true */
/*global */

'use strict';

var jsdom = require('jsdom');

jsdom.env('<html></html>', {
  done: function (errors, window) {
    window.location.path = '/helloo';
    console.log(window.location.href);
  }
});

console.log(setImmediate);