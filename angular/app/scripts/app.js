'use strict';

angular.module('radioApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/genres/:genreId/subgenres', {
        templateUrl: 'views/subgenres.html',
        controller: 'SubGenresCtrl'
      })
      .when('/genres/:genreId/stations', {
        templateUrl: 'views/stations.html',
        controller: 'StationsCtrl'
      })
      .when('/genres/:genreId/subgenres/:subGenreId/stations', {
        templateUrl: 'views/stations.html',
        controller: 'StationsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
