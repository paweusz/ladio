'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres, Pls) {
    $scope.stations = Genres.stations($routeParams.genreId, $routeParams.subGenreId);
    $scope.currentStationId = null;
    $scope.streams = [];

    $scope.play = function() {
      var streamUrl = this.station.streamurl;
      console.debug('play ' + streamUrl);
      $scope.streams = Pls.streams(streamUrl);
      
      $scope.currentStationId = this.station.id;
    };

    $scope.playingCss = function() {
      return $scope.currentStationId === this.station.id ? 'playing' : '';
    };

    $scope.stationCss = function() {
      return this.station.status === 0 ? 'disabled' : '';
    };

  });
