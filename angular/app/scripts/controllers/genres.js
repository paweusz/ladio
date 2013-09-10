'use strict';

angular.module('ladioApp')
  .controller('GenresCtrl', function ($scope, $location, GenresSvc, $log) {

    GenresSvc.genres().success(function(data) {
      $log.log('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      $log.error('Error fetching genres data. (' + status + ':' + data + ')');
      $scope.genres = [];
    });

    $scope.select = function(genre) {
      $location.path('/genres/' + genre.id + '/subgenres');
    };

  });
