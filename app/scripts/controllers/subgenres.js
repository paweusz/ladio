'use strict';

angular.module('radioApp')
  .controller('SubGenresCtrl', function ($scope, $routeParams, Dirble) {
    $scope.subgenres = Dirble.subGenres($routeParams.genreId);
  });
