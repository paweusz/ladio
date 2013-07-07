'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres) {
    $scope.stations = Genres.stations($routeParams.genreId, $routeParams.subGenreId);
  });
