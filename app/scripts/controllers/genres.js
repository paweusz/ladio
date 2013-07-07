'use strict';

angular.module('radioApp')
  .controller('GenresCtrl', function ($scope, Dirble) {
    $scope.genres = Dirble.genres();
  });
