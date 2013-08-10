'use strict';

angular.module('radioApp')
  .controller('PlayerCtrl', function ($scope, Pls, Stat) {

    $scope.State = {
      STOPPED: 0,
      CONNECTING: 1,
      PLAYING: 2,
      ERROR: 3
    };

    $scope.currentStation = {
      station: null,
      streams: null,
      state: $scope.State.STOPPED
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
    
    function playOrStop(station) {
      var cs = $scope.currentStation;
      if (!station) {
        station = cs.station;
      }

      if (cs.station && cs.station.id === station.id) {//Clicked the same station
        switch (cs.state) {
        case $scope.State.PLAYING:
        case $scope.State.CONNECTING:
          $scope.$broadcast('rd-player.pauseReq');
          cs.state = $scope.State.STOPPED;
          return;
        case $scope.State.STOPPED:
          $scope.$broadcast('rd-player.playReq');
          cs.state = $scope.State.CONNECTING;
          return;
        }
      }

      //Prepare playing of new station
      cs.station = station;
      cs.state = $scope.State.CONNECTING;
      cs.streams = playStreams(station.streamurl);
    }
    
    $scope.playingStarted = function() {
      $scope.currentStation.state = $scope.State.PLAYING;
      Stat.stationPlayed($scope.currentStation.station);
    };
    
    $scope.playingError = function() {
      $scope.currentStation.state = $scope.State.ERROR;
      $scope.currentStation.streams = null;
    };
    
    $scope.play = function(station) {
      playOrStop(station);
    };
    
    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      var cs = $scope.currentStation;
      if (cs.station && cs.station.id === this.station.id) {
        if (cs.state === $scope.State.PLAYING) {
          classes.push('playing');
        } else if (cs.state === $scope.State.CONNECTING) {
          classes.push('connecting');
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
      } else if (cs.state === $scope.State.CONNECTING) {
        classes.push('connecting');
      } else if (cs.state === $scope.State.STOPPED && cs.station) {
        classes.push('stopped');
      } else if (cs.state === $scope.State.ERROR) {
        classes.push('error');
      }
      return classes.join(' ');
    };
    
  });
