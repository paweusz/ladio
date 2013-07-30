'use strict';

angular.module('radioApp')
  .controller('PlayerCtrl', function ($scope, Pls, Stat) {

    $scope.State = {
      SUSPENDED: 0,
      PLAYING: 1
    };

    function prepareStreams(streams, stream) {
      streams.push(stream);
      //Shoutcast server trick
      if (stream.match(/\/$/)) {
        streams.push(stream + ';');
      } else {
        streams.push(stream + '/;');
      }
    }
    
    function playStreams(streamUrl) {
      var streams = [];
      if (streamUrl.match(/.pls$/)) {
        Pls.streams(streamUrl).success(function(plsStreams) {
          console.debug('Pls fetched.');
          angular.forEach(plsStreams, function(plsStream) {
            prepareStreams(streams, plsStream.url);
          });
        }).error(function(data, status) {
          console.error('Error fetching pls data. ' + status);
        });
      } else {
        prepareStreams(streams, streamUrl);
      }
      return streams;
    }
    
    function play(station) {
      $scope.currentStation = {
        station: station,
        streams: playStreams(station.streamurl),
        state: $scope.State.SUSPENDED
      };
    }
    
    function stop() {
      $scope.currentStation = null;
    }
    
    function playOrStop(station) {
      if (!$scope.currentStation || $scope.currentStation && $scope.currentStation.station.id !== station.id) {
        play(station);
      } else {
        stop();
      }
    }
    
    $scope.playingStarted = function() {
      $scope.currentStation.state = $scope.State.PLAYING;
      Stat.stationPlayed($scope.currentStation.station);
    };
    
    $scope.playingSuspended = function() {
      $scope.currentStation.state = $scope.State.SUSPENDED;
    };

    $scope.playingError = function() {
      $scope.currentStation = null;
    };
    
    $scope.play = function(station) {
      console.debug('Station changed to ' + station.name);
      playOrStop(station);
    };

    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      var currentStation = $scope.currentStation;
      if (currentStation && currentStation.station.id === this.station.id) {
        if (currentStation.state === $scope.State.PLAYING) {
          classes.push('playing');
        } else if (currentStation.state === $scope.State.SUSPENDED) {
          classes.push('suspended');
        }
      }
      return classes.join(' ');
    };
    
    $scope.isPanelVisible = function() {
      return false;
    };

    stop();

  });
