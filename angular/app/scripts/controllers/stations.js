'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    Genres.genre($scope.genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. ' + data.status);
    });

    if ($routeParams.subGenreId) {
      $scope.subGenreId = parseInt($routeParams.subGenreId, 10);
      Genres.subGenre($scope.genreId, $scope.subGenreId).then(function(subGenre) {
        console.debug('Subgenre fetched. ' + subGenre.name);
        $scope.subGenre = subGenre;
      }, function(data) {
        console.debug('Error fetching subgenre. ' + data.status);
      });
    } else {
      $scope.subGenreId = $scope.genreId;
      $scope.subGenre = {
        name: 'Stations'
      };
    }
    
    Genres.stations($scope.subGenreId).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = stations;
    }, function(data) {
      console.error('Error fetching stations data. ' + data.status);
      $scope.stations = [];
    });

  });
