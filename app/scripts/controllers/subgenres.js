'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Genres) {
    $scope.subgenres = Genres.subGenres($routeParams.genreId);
  });
