/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, nomen: true */
/*global */

'use strict';

var jsdom = require('jsdom');

// basic caching
var cache = {};

module.exports = function init(config) {
  if (!config || typeof config.host !== 'string') {
    throw new Error('"config.host" is required.');
  }
  
  return function (req, res, next) {
    var path = req.query._escaped_fragment_;
    
    if (!path) {
      next();
      return;
    }
      
    var url = config.host + '/#!' + path;
    
    var cached = cache[url];
    if (cached) {
      res.send(200, cached);
      return;
    }
    
    var doc = jsdom.env({
      url: url,
      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"]
      },
      done: function (errors, window) {
        if (errors) {
          res.send(500, errors);
          return;
        }
          
        var timeout = setTimeout(function () {
          window._onSnapshotReady = null;
          res.send(504);
        }, config.timeout || 10000);
        
        window._onSnapshotReady = function (error) {
          window._onSnapshotReady = null;
          
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          
          if (error) {
            res.send(error);
            return;
          }
          
          if (config.stripScripts) {
            var scripts = window.document.querySelectorAll('script');
            var i;
            for (i = 0; i < scripts.length; i += 1) {
              var script = scripts[i];
              script.parentNode.removeChild(script);
            }
          }
          
          var html = window.document.innerHTML;
          cache[url] = html;
          res.send(200, html);
        };
        
      }
    });
  };
};
