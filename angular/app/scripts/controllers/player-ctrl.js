'use strict';

angular.module('ladioApp')
  .controller('PlayerCtrl', function ($scope, $log, $timeout, Pls, StatSvc) {

    $scope.State = {
      STOPPED: 0,
      CONNECTING: 1,
      PLAYING: 2,
      ERROR: 3
    };

    $scope.Events = {
      STREAMS_CHANGED: 'STREAMS_CHANGED',
      PLAYING_STARTED: 'PLAYING_STARTED',
      HIDE_POPUPS_REQ: 'HIDE_POPUPS_REQ'
    };

    $scope.currentStation = {
      station: null,
      streams: null,
      state: $scope.State.STOPPED,
      wasPlayed: false
    };

    $scope.playerPopups = {
      alert: false,
      connecting: false
    };

    function playStreams(streamUrl) {
      var streams = [];
      if (streamUrl.match(/.pls$/)) {
        Pls.streams(streamUrl).success(function(plsStreams) {
          $log.log('Pls fetched.');
          angular.forEach(plsStreams, function(plsStream) {
            streams.push(plsStream.url);
          });
          $scope.$broadcast($scope.Events.STREAMS_CHANGED);
        }).error(function(data, status) {
          $log.error('Error fetching pls data. (' + status + ':' + data + ')');
          $scope.playingError();
        });
      } else {
        streams.push(streamUrl);
        $timeout(function() {
          $scope.$broadcast($scope.Events.STREAMS_CHANGED);
        });
      }
      return streams;
    }
    
    function playOrStop(station) {
      var cs = $scope.currentStation;
      if (!station) {
        station = cs.station;
      }

      if (!!cs.station && cs.station.id === station.id) {//Clicked the same station
        switch (cs.state) {
        case $scope.State.CONNECTING:
          cs.streams = [];
          cs.station = null;
          cs.state = $scope.State.STOPPED;
          return;
        case $scope.State.PLAYING:
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
      cs.wasPlayed = false;
      cs.state = $scope.State.CONNECTING;
      cs.streams = playStreams(station.streamurl);

      setConnectingVisible(true);
      $timeout(function() {
        setConnectingVisible(false);
      }, 1500);
    }

    function setAlertVisible(visible) {
      $scope.playerPopups.alert = visible;
    }
    
    function setConnectingVisible(visible) {
      $scope.playerPopups.connecting = visible;
    }
    
    $scope.playingStarted = function() {
      var cs = $scope.currentStation;

      cs.state = $scope.State.PLAYING;

      if (!cs.wasPlayed) {
        StatSvc.stationPlayed(cs.station);
        $scope.$broadcast($scope.Events.PLAYING_STARTED);
        cs.wasPlayed = true;
      }

      setAlertVisible(false);
    };
    
    $scope.playingError = function() {
      $scope.currentStation.state = $scope.State.ERROR;
      $scope.currentStation.streams = null;
      setAlertVisible(true);
    };
    
    $scope.playingStalled = function() {
      $scope.currentStation.state = $scope.State.CONNECTING;
    };
    
    $scope.playingResumed = function() {
      $scope.currentStation.state = $scope.State.PLAYING;
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

    $scope.hidePopups = function() {
      setAlertVisible(false);
      $scope.$broadcast($scope.Events.HIDE_POPUPS_REQ);
    };
    
  });
