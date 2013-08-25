'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, $filter, Genres) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    Genres.genre($scope.genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. (' + data.status + ':' + data.data + ')');
    });

    if ($routeParams.subGenreId) {
      $scope.subGenreId = parseInt($routeParams.subGenreId, 10);
      Genres.subGenre($scope.genreId, $scope.subGenreId).then(function(subGenre) {
        console.debug('Subgenre fetched. ' + subGenre.name);
        $scope.subGenre = subGenre;
      }, function(data) {
        console.debug('Error fetching subgenre. (' + data.status + ':' + data.data + ')');
      });
    } else {
      $scope.subGenreId = $scope.genreId;
      $scope.subGenre = {id: -1};
    }
    
    Genres.stations($scope.subGenreId).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = $filter('orderBy')(stations,
        function(station) {
          return station.name.trim();
        });
    }, function(data) {
      console.error('Error fetching stations data. (' + data.status + ':' + data.data + ')');
      $scope.stations = [];
    });

  });
