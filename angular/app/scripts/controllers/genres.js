'use strict';

angular.module('ladioApp')
  .controller('GenresCtrl', function ($scope, $location, GenresSvc) {

    GenresSvc.genres().success(function(data) {
      console.debug('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      console.error('Error fetching genres data. (' + status + ':' + data + ')');
      $scope.genres = [];
    });

    $scope.select = function(genre) {
      $location.path('/genres/' + genre.id + '/subgenres');
    };

  });
