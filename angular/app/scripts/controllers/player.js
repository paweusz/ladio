'use strict';

angular.module('radioApp')
  .controller('PlayerCtrl', function ($scope, Pls, Stat) {

    $scope.State = {
      STOPPED: 0,
      SUSPENDED: 1,
      PLAYING: 2,
      ERROR: 3
    };

    $scope.currentStation = {
      station: null,
      streams: [],
      state: null
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
      var cs = $scope.currentStation;
      cs.station = station;
      cs.streams = playStreams(station.streamurl);
      cs.state = $scope.State.SUSPENDED;
    }
    
    function stop() {
      var cs = $scope.currentStation;
      cs.state = $scope.State.STOPPED;
      cs.streams = [];
    }
    
    function playOrStop(station) {
      var cs = $scope.currentStation;
      if (!station) {
        station = cs.station;
      }
      if (cs.station && cs.station.id === station.id) {//Clicked the same station
        if (cs.state === $scope.State.PLAYING || cs.state === $scope.State.SUSPENDED) {
          stop();
          return;
        }
      }
      play(station);
    }
    
    $scope.playingStarted = function() {
      $scope.currentStation.state = $scope.State.PLAYING;
      Stat.stationPlayed($scope.currentStation.station);
    };
    
    $scope.playingSuspended = function() {
      $scope.currentStation.state = $scope.State.SUSPENDED;
    };

    $scope.playingError = function() {
      $scope.currentStation.state = $scope.State.ERROR;
    };
    
    $scope.play = function(station) {
      playOrStop(station);
    };
    
    $scope.stop = stop;

    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      var cs = $scope.currentStation;
      if (cs.station && cs.station.id === this.station.id) {
        if (cs.state === $scope.State.PLAYING) {
          classes.push('playing');
        } else if (cs.state === $scope.State.SUSPENDED) {
          classes.push('suspended');
        } else if (cs.state === $scope.State.ERROR) {
          classes.push('error');
        }
      }
      return classes.join(' ');
    };
    
    $scope.stateCss = function() {
      var classes = [];
      var cs = $scope.currentStation;
      if (cs.state === $scope.State.PLAYING) {
        classes.push('playing');
      } else if (cs.state === $scope.State.SUSPENDED) {
        classes.push('suspended');
      } else if (cs.state === $scope.State.STOPPED && cs.station) {
        classes.push('stopped');
      } else if (cs.state === $scope.State.ERROR) {
        classes.push('error');
      }
      return classes.join(' ');
    };
    
    $scope.isPanelVisible = function() {
      return false;
    };

    stop();

  });
