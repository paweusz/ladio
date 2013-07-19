'use strict';

angular.module('radioApp')
  .controller('GenresCtrl', function ($scope, Genres) {
    Genres.genres().success(function(data) {
      console.debug('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      console.error('Error fetching genres data. ' + status);
    });

    $scope.isGenre = false;
    $scope.isSubGenre = false;
  });
