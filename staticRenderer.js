/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, nomen: true */
/*global */

'use strict';

var jsdom = require('jsdom');

module.exports = function init(config) {
  if (!config || typeof config.host !== 'string') {
    throw new Error('"config.host" is required.');
  }
  
  return function (req, res, next) {
    
    function processSnapshot(window) {
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
    }
    
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
            
            var timeout = setTimeout(function () {
              processSnapshot(window);
            }, config.timeout || 10000);
            
            window._onSnapshotReady = function (error) {
              if (timeout) {
                clearTimeout(timeout);
                timeout = null;
              }
              
              if (error) {
                res.send(error);
              } else {
                processSnapshot(window);
              }
              
              window._onSnapshotReady = null;
            };
            
          }
        }
      });
    } else {
      next();
    }
  };
};
