'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Genres) {
    $scope.genreId = $routeParams.genreId;
    $scope.subgenres = Genres.subGenres($scope.genreId);
  });
