'use strict';

angular.module('ladioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, $location, $log, GenresSvc) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    GenresSvc.genre($scope.genreId).then(function(genre) {
      $log.log('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      $log.error('Error fetching genre. (' + data.status + ':' + data.data + ')');
    });

    GenresSvc.subGenres($scope.genreId).success(function(data) {
      $log.log('Subgenres fetched.');
      $scope.subgenres = data;
    }).error(function(data, status) {
      $log.error('Error fetching subgenres data. (' + status + ':' + data + ')');
      $scope.subgenres = [];
    });

    $scope.selectStations = function() {
      $location.path('/genres/' + $scope.genreId + '/stations');
    };

    $scope.select = function(subgenre) {
      $location.path('/genres/' + $scope.genreId + '/subgenres/' + subgenre.id + '/stations');
    };

  });
