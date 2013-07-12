'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres, Pls) {
    var genreId = $routeParams.genreId;
    var subGenreId = $routeParams.subGenreId;

    $scope.genre = Genres.genre(genreId);
    $scope.subGenre = Genres.subGenre(genreId, subGenreId);
    $scope.stations = Genres.stations($routeParams.genreId, $routeParams.subGenreId);

    $scope.currentStationId = null;
    $scope.streams = [];

    $scope.play = function() {
      var streamUrl = this.station.streamurl;
      console.debug('play ' + streamUrl);
      if (streamUrl.match(/.pls$/)) {
        $scope.streams = Pls.streams(streamUrl);
      } else {
        $scope.streams = [{url: streamUrl}];
      }
      
      $scope.currentStationId = this.station.id;
    };

    $scope.playingCss = function() {
      return $scope.currentStationId === this.station.id ? 'playing' : '';
    };

    $scope.stationCss = function() {
      return this.station.status === 0 ? 'disabled' : '';
    };

  });
