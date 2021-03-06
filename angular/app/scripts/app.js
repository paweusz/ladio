'use strict';

angular.module('ladioApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<div></div>',
        controller: function($scope, $location, StateSvc) {
          $location.path(StateSvc.getLastURL());
        }
      })
      .when('/genres', {
        templateUrl: 'views/genres.html',
        controller: 'GenresCtrl'
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
      .when('/recent', {
        templateUrl: 'views/recent.html',
        controller: 'RecentCtrl'
      })
      .when('/starred', {
        templateUrl: 'views/starred.html',
        controller: 'StarredCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
