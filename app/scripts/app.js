'use strict';

angular.module('radioApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/genres'
      })
      .when('/genres', {
        templateUrl: 'views/genres.html',
        controller: 'GenresCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
