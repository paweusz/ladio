'use strict';

angular.module('ladioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, $location, GenresSvc) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    GenresSvc.genre($scope.genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. (' + data.status + ':' + data.data + ')');
    });

    GenresSvc.subGenres($scope.genreId).success(function(data) {
      console.debug('Subgenres fetched.');
      $scope.subgenres = data;
    }).error(function(data, status) {
      console.error('Error fetching subgenres data. (' + status + ':' + data + ')');
      $scope.subgenres = [];
    });

    $scope.stations = function() {
      $location.path('/genres/' + $scope.genreId + '/stations');
    };

    $scope.select = function(subgenre) {
      $location.path('/genres/' + $scope.genreId + '/subgenres/' + subgenre.id + '/stations');
    };

  });
