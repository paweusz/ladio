'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Genres) {

    var genreId = parseInt($routeParams.genreId, 10);

    Genres.genre(genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. ' + data.status);
    });
    
    Genres.subGenres(genreId).success(function(data) {
      console.debug('Subgenres fetched.');
      $scope.subgenres = data;
    }).error(function(data, status) {
      console.error('Error fetching subgenres data. ' + status);
    });

    Genres.stations($routeParams.genreId, $routeParams.subGenreId).success(function(data) {
      console.debug('Stations fetched.');
      $scope.stations = data;
    }).error(function(data, status) {
      console.error('Error fetching stations data. ' + status);
    });

  });
