'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres, Pls) {
    var genreId = $routeParams.genreId;
    var subGenreId = $routeParams.subGenreId;

    $scope.genre = Genres.genre(genreId);
    $scope.subGenre = Genres.subGenre(genreId, subGenreId);
    $scope.stations = Genres.stations($routeParams.genreId, $routeParams.subGenreId);
    $scope.isGenre = true;
    $scope.isSubGenre = true;

    $scope.currentStationId = null;
    $scope.streams = [];

    $scope.play = function() {
      var streamUrl = this.station.streamurl;
      console.debug('play ' + streamUrl);

      function prepareStreams(streams, stream) {
        streams.push(stream);
        //Shoutcast server trick
        if (stream.match(/\/$/)) {
          streams.push(stream + ';');
        } else {
          streams.push(stream + '/;');
        }
      }

      var streams = [];
      if (streamUrl.match(/.pls$/)) {
        Pls.streams(streamUrl, function(plsStreams) {
          angular.forEach(plsStreams, function(plsStream) {
            prepareStreams(streams, plsStream.url);
          });
        });
      } else {
        prepareStreams(streams, streamUrl);
      }
      $scope.streams = streams;

      $scope.currentStationId = this.station.id;
    };

    $scope.stop = function() {
      var streamUrl = this.station.streamurl;
      console.debug('stop ' + streamUrl);
    };
    
    $scope.playingCss = function() {
      return $scope.currentStationId === this.station.id ? 'playing' : '';
    };

    $scope.stationCss = function() {
      return this.station.status === 0 ? 'disabled' : '';
    };

  });
