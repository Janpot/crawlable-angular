/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, nomen: true */
/*global */

'use strict';

var jsdom = require('jsdom');

module.exports = function init(config) {
  return function (req, res, next) {
    var path = req.query._escaped_fragment_;
    
    if (path) {
      var url = config.host + '/#!' + path;
      var doc = jsdom.env({
        url: url,
        features: {
          FetchExternalResources: ["script"],
          ProcessExternalResources: ["script"]
        },
        done: function (errors, window) {
          if (errors) {
            // TO DO: analyze errors and send meaningful http response codes
            res.send(500, errors);
          } else {
            // TO DO: investigate ways to communicate between server and DOM
            // to signal rendering is finished
            setTimeout(function () {
              if (config.stripScripts) {
                var scripts = window.document.querySelectorAll('script');
                var i;
                for (i = 0; i < scripts.length; i += 1) {
                  var script = scripts[i];
                  script.parentNode.removeChild(script);
                }
              }
              // TO DO: cache this
              var html = window.document.innerHTML;
              res.send(200, html);
            }, 10000);
          }
        }
      });
    } else {
      next();
    }
  };
};
