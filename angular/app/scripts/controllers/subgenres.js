'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Genres) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    Genres.genre($scope.genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. ' + data.status);
    });
    
    Genres.subGenres($scope.genreId).success(function(data) {
      console.debug('Subgenres fetched.');
      $scope.subgenres = data;
    }).error(function(data, status) {
      console.error('Error fetching subgenres data. ' + status);
    });

  });
