'use strict';

angular.module('radioApp')
  .controller('GenresCtrl', function ($scope, $location, Genres) {

    Genres.genres().success(function(data) {
      console.debug('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      console.error('Error fetching genres data. ' + status);
      $scope.genres = [];
    });
    
    $scope.select = function(genre) {
      $location.path('/genres/' + genre.id + '/subgenres');
    };

  });
