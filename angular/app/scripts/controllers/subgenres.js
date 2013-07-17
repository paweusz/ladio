'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Genres) {
    var genreId = $routeParams.genreId;
    $scope.genre = Genres.genre(genreId);
    $scope.subgenres = Genres.subGenres(genreId);
    $scope.isGenre = true;
    $scope.isSubGenre = false;
  });
