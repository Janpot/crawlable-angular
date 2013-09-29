/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, white: true, nomen: true, browser: true */
/*global angular*/

angular.module('app', ['ngRoute'])

  .provider('snapshot', function () {
    'use strict';
    
    function signalReady(error) {
      if (angular.isFunction(window._onSnapshotReady)) {
        window._onSnapshotReady(error);
        if (error) {
          throw 'kill';
        }
      }
    }
    
    this.notFound = function () {
      signalReady(404);
    };
    
    this.$get = function() {
      return {
        ready: function ready() {
          setTimeout(signalReady, 0);
        }
      };
    };
    
  })

  .config(function (
    $locationProvider,
    $routeProvider,
    snapshotProvider
  ) {
    'use strict';
    
    // Use hashbangs
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'home'
    });
    
    $routeProvider.otherwise({
      redirectTo: function () {
        snapshotProvider.notFound();
        return '/home';
      }
    });
    
  })

  .controller('home', function (
    $scope,
    $http,
    snapshot
  ) {
    'use strict';
    
    $scope.result = $http.get('xhr');
    
    $scope.result.then(function () {
      snapshot.ready();
    });
    
  });