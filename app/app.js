/*jslint es5: true, devel: true, node: true, indent: 2, vars: true, white: true, nomen: true, browser: true */
/*global angular*/

angular.module('app', [])
  .config(function (
    $locationProvider,
    $routeProvider
  ) {
    'use strict';
    
    // Use hashbangs
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'home'
    });
    
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
    
  })

  .controller('home', function (
    $scope,
    $http
  ) {
    'use strict';
    
    $scope.result = $http.get('xhr');
    
  });