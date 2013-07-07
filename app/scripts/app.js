'use strict';

angular.module('radioApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/genres.html',
        controller: 'GenresCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
