'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres) {
    $scope.stations = Genres.stations($routeParams.genreId, $routeParams.subGenreId);
    $scope.currentStationId = null;

    $scope.play = function() {
      $scope.currentStationId = this.station.id;
      console.debug('play ' + this.currentStationId);
    };

    $scope.isPlaying = function() {
      return $scope.currentStationId === this.station.id ? 'playing' : '';
    };

  });
