'use strict';

angular.module('radioApp')
  .controller('GenresCtrl', function ($scope, Genres) {
    $scope.genres = Genres.genres();
  });
