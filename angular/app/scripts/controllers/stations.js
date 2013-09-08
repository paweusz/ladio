'use strict';

angular.module('ladioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, $filter, $log, GenresSvc) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    GenresSvc.genre($scope.genreId).then(function(genre) {
      $log.log('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      $log.error('Error fetching genre. (' + data.status + ':' + data.data + ')');
    });

    if ($routeParams.subGenreId) {
      $scope.subGenreId = parseInt($routeParams.subGenreId, 10);
      GenresSvc.subGenre($scope.genreId, $scope.subGenreId).then(function(subGenre) {
        $log.log('Subgenre fetched. ' + subGenre.name);
        $scope.subGenre = subGenre;
      }, function(data) {
        $log.error('Error fetching subgenre. (' + data.status + ':' + data.data + ')');
      });
    } else {
      $scope.subGenreId = $scope.genreId;
      $scope.subGenre = {id: -1};
    }

    var stations = [];
    GenresSvc.stations($scope.subGenreId).then(function(fetched) {
      $log.log('Stations fetched.');
      stations = $filter('orderBy')(fetched,
        function(station) {
          return station.name.trim();
        });
      $scope.stations = stations;
    }, function(data) {
      $log.error('Error fetching stations data. (' + data.status + ':' + data.data + ')');
      $scope.stations = [];
    });

    $scope.filtering = {
      filterValue: ''
    };
    $scope.$watch('filtering.filterValue', function(search) {
      $scope.stations = $filter('SearchFilter')(stations, search);
    });

  });
